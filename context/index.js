import React, { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import toast from "react-hot-toast";
import { useAccount, useDisconnect, useConnect } from 'wagmi';
import { parseErrorMsg } from "../Utils/index";

//INTERNAL IMPORT
import {
  getBalance,
  AirdropContract,
  airdrop_ADDRESS,
  iphone_ADDRESS,
  IphoneContract,
  web3Provider,
  handleNetworkSwitch,
} from "./constants";

export const CONTEXT = React.createContext();

export const CONTEXT_Provider = ({ children }) => {
  const DAPP_NAME = "Airdrop Dapp";
  const [loader, setLoader] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState();
  const [airdropBalance, setAirdropBalance] = useState();
  const [claimStatus, setClaimStatus] = useState(false);
  const [allUers, setAllUers] = useState([]);
  const [airdropFee, setAirdropFee] = useState("");
  const [contractBalEther, setContractBalEther] = useState();
  const [airdropPerUser, setAirdropPerUser] = useState();
  const [contractOwnerAddr, setContractOwnerAddr] = useState();
  const [connectedTokenAddr, setConnectedTokenAddr] = useState();
  const [count, setCount] = useState(0);

  // Wagmi hooks
  const { address: wagmiAddress, isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { connectAsync, connectors } = useConnect();

  //NOTIFICATION
  const notifyError = (msg) => toast.error(msg, { duration: 4000 });
  const notifySuccess = (msg) => toast.success(msg, { duration: 4000 });

   //CONNECT WALLET
   const connect = async () => {
    try {
      // First, check network
      await handleNetworkSwitch();

      // If already connected via Wagmi, return
      if (isConnected) {
        setAddress(wagmiAddress);
        return;
      }

      // Try to connect with the first available connector
      const result = await connectAsync({ 
        connector: connectors[0],
      });

      if (result.account) {
        setAddress(result.account);
      } else {
        notifyError("Sorry, you have No account");
      }
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
    }
  };

   //CHECH IF WALLET CONNECTED
   const checkIfWalletConnected = async () => {
    try {
      if (isConnected && wagmiAddress) {
        return wagmiAddress;
      }
      return null;
    } catch (error) {
      notifyError("Something went wrong");
      console.log(error);
    }
  };

  const fetchInitialData = async () => {
    try {
      if (address) {
        setLoader(true);
        //GET USER ACCOUNT
        const account = await checkIfWalletConnected();
        //GET USER BALANCE
        const balance = await getBalance();
        setBalance(ethers.utils.formatEther(balance.toString()));
        setAddress(account);

        //TBCDistributor_CONTRACT
        const AIRDROP_CONTRACT = await AirdropContract();

        //TOKEN CONTRACT
        const liveTokenAddr = await AIRDROP_CONTRACT._tokenContract();
        setConnectedTokenAddr(liveTokenAddr);

        //CONTRACT OWNER ADDRESS
        const contractOwner = await AIRDROP_CONTRACT.owner();
        setContractOwnerAddr(contractOwner);

        //AIRDROP BLANCE CHECK
        const contractTokenBal = await AIRDROP_CONTRACT.tokenBalance(
          iphone_ADDRESS
        );
        setAirdropBalance(
          ethers.utils.formatEther(contractTokenBal.toString())
        );
        console.log(ethers.utils.formatEther(contractTokenBal.toString()));

        //FEE
        const fee = await AIRDROP_CONTRACT._fee();
        setAirdropFee(ethers.utils.formatEther(fee));

        //CONTRACT BALANCE
        const contractBalanceBal = await AIRDROP_CONTRACT.contractBalance();
        setContractBalEther(ethers.utils.formatEther(contractBalanceBal));

        //AIRDROP AMOUNT PER USER
        const airdropAmountUser = await AIRDROP_CONTRACT._airdropAmount();
        setAirdropPerUser(ethers.utils.formatEther(airdropAmountUser));

        //GET ALL  USERS
        const getAllUsers = await AIRDROP_CONTRACT.getAllAirdrops();

        const parsedAllUsers = getAllUsers.map((user, i) => ({
          id: user[0].toNumber(),
          useraddress: user[1],
          name: user[2],
          twitterId: user[3],
          // linkedInUrl: user[4],
          // instagramUrl: user[5],
          email: user[6],
          timestamp: new Date(user[7].toNumber() * 1000).toDateString(),
        }));

        console.log(parsedAllUsers);

        setAllUers(parsedAllUsers);

        //TOKEN CONTRACT BALANCE
        const TOKEN_CONTRACT = await IphoneContract();
        const selectedTokenBal = await TOKEN_CONTRACT.balanceOf(account);

        const tokenClaimUserBal = ethers.utils.formatEther(
          selectedTokenBal.toString()
        );

        if (tokenClaimUserBal <= 1) {
          const filteredCampaigns = getAllUsers.filter((user) =>
            user.useraddress.toLowerCase() === account.toLowerCase()
              ? setClaimStatus(true)
              : setClaimStatus(false)
          );
        } else {
          setClaimStatus(true);
        }

        setLoader(false);
      }
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
    }
  };

 // Effect to update address when Wagmi connection changes
 useEffect(() => {
  if (isConnected && wagmiAddress) {
    setAddress(wagmiAddress);
  } else {
    setAddress("");
  }
}, [isConnected, wagmiAddress]);

const disconnect = async () => {
  try {
    await disconnectAsync();
    setAddress("");
  } catch (error) {
    console.error("Disconnection error", error);
  }
};

useEffect(() => {
  fetchInitialData();
}, [address, count]);

  const claimAirdrop = async (user) => {
    try {
      setLoader(true);
      //DATA
      const { name, twitterId, email } = user;
      //GET USER ACCOUNT
      const account = await checkIfWalletConnected();
      const PROVIDER = await web3Provider();
      const signer = PROVIDER.getSigner();
      const AIRDROP_CONTRACT = await AirdropContract();

      const feeCharge = await AIRDROP_CONTRACT._fee();

      const claim = await AIRDROP_CONTRACT.connect(signer).dropTokens(
        name,
        twitterId,
        // linkedInUrl,
        // instagramUrl,
        email,
        {
          value: feeCharge.toString(),
          gasLimit: ethers.utils.hexlify(1000000),
        }
      );
      await claim.wait();

      setLoader(false);
      notifySuccess("Liqudity add Successfully ");
      setCount(count + 1);
      // window.location.reload();
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
    }
  };

  //ADMIN FUNCTION
  const SET_TOKEN_CONTRACT = async (tokenContract) => {
    try {
      setLoader(true);

      //GET USER ACCOUNT
      const account = await checkIfWalletConnected();
      const PROVIDER = await web3Provider();
      const signer = PROVIDER.getSigner();
      const AIRDROP_CONTRACT = await AirdropContract();

      const transaction = await AIRDROP_CONTRACT.connect(
        signer
      ).setTokenContract(tokenContract, {
        gasLimit: ethers.utils.hexlify(1000000),
      });
      await transaction.wait();

      setLoader(false);
      notifySuccess("Token Contract Updated");
      setCount(count + 1);
      // window.location.reload();
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
    }
  };

  const SET_AIRDROP_AMOUNT = async (airdropAmount) => {
    try {
      setLoader(true);

      //GET USER ACCOUNT
      const account = await checkIfWalletConnected();
      const PROVIDER = await web3Provider();
      const signer = PROVIDER.getSigner();
      const AIRDROP_CONTRACT = await AirdropContract();

      const airdropUpdate = ethers.utils.parseUnits(
        airdropAmount.toString(),
        "ether"
      );

      const transaction = await AIRDROP_CONTRACT.connect(
        signer
      ).setAirdropAmount(airdropUpdate, {
        gasLimit: ethers.utils.hexlify(1000000),
      });
      await transaction.wait();

      setLoader(false);
      notifySuccess("Airdrop Amount Updated");
      setCount(count + 1);
      // window.location.reload();
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
    }
  };

  const SET_FEE = async (fee) => {
    try {
      setLoader(true);

      //GET USER ACCOUNT
      const account = await checkIfWalletConnected();
      const PROVIDER = await web3Provider();
      const signer = PROVIDER.getSigner();
      const AIRDROP_CONTRACT = await AirdropContract();

      const airdropFee = ethers.utils.parseUnits(fee.toString(), "ether");

      const transaction = await AIRDROP_CONTRACT.connect(signer).setFee(
        airdropFee,
        {
          gasLimit: ethers.utils.hexlify(1000000),
        }
      );
      await transaction.wait();

      setLoader(false);
      notifySuccess("Airdrop Fee Updated");
      setCount(count + 1);
      // window.location.reload();
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
    }
  };

  const WITHDRAW_TOKENS = async (withdrawTokens) => {
    try {
      setLoader(true);

      //GET USER ACCOUNT
      const account = await checkIfWalletConnected();
      const PROVIDER = await web3Provider();
      const signer = PROVIDER.getSigner();
      const AIRDROP_CONTRACT = await AirdropContract();

      const transaction = await AIRDROP_CONTRACT.connect(signer).withdrawTokens(
        withdrawTokens.beneficiary,
        withdrawTokens.tokenAddr,
        {
          gasLimit: ethers.utils.hexlify(1000000),
        }
      );
      await transaction.wait();

      setLoader(false);
      notifySuccess("Withdraw Airdrop Tokens Successfully");
      setCount(count + 1);
      // window.location.reload();
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
    }
  };

  const WITHDRAW_ETHER = async (beneficiary) => {
    try {
      setLoader(true);

      //GET USER ACCOUNT
      const account = await checkIfWalletConnected();
      const PROVIDER = await web3Provider();
      const signer = PROVIDER.getSigner();
      const AIRDROP_CONTRACT = await AirdropContract();

      const transaction = await AIRDROP_CONTRACT.connect(signer).withdrawEther(
        beneficiary,
        {
          gasLimit: ethers.utils.hexlify(1000000),
        }
      );
      await transaction.wait();

      setLoader(false);
      notifySuccess("Withdraw Ether Successfully");
      setCount(count + 1);
      // window.location.reload();
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
    }
  };

  const SINGLE_TRANSAACTION = async (_id) => {
    try {
      console.log(_id);
      setLoader(true);

      //GET USER ACCOUNT
      const AIRDROP_CONTRACT = await AirdropContract();

      const transaction = await AIRDROP_CONTRACT.airdropInfos(Number(_id));

      console.log(transaction);

      const transactionData = {
        id: transaction[0].toNumber(),
        useraddress: transaction[1],
        name: transaction[2],
        twitterId: transaction[3],
        // linkedInUrl: transaction[4],
        // instagramUrl: transaction[5],
        email: transaction[6],
        timestamp: new Date(transaction[7].toNumber() * 1000).toDateString(),
      };

      setLoader(false);
      notifySuccess("Withdraw Ether Successfully");

      return transactionData;
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
    }
  };

  //TRANSFER TOKEN
  const TRANSFER_TOKEN = async (transfer) => {
    try {
      setLoader(true);
      //DATA
      const { address, amount } = transfer;
      console.log(address, amount);
      //GET USER ACCOUNT
      const account = await checkIfWalletConnected();
      const PROVIDER = await web3Provider();
      const signer = PROVIDER.getSigner();
      const TOKEN_CONTRACT = await IphoneContract();
      const transferAmount = ethers.utils.parseUnits(
        amount.toString(),
        "ether"
      );
      const claim = await TOKEN_CONTRACT.connect(signer).transfer(
        address,
        transferAmount,
        {
          gasLimit: ethers.utils.hexlify(1000000),
        }
      );
      await claim.wait();

      setLoader(false);
      notifySuccess("Liqudity add Successfully ");
      setCount(count + 1);
      // window.location.reload();
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
    }
  };
  return (
    <CONTEXT.Provider
      value={{
        connect,
        disconnect,
        notifyError,
        notifySuccess,
        claimAirdrop,
        SET_TOKEN_CONTRACT,
        SET_AIRDROP_AMOUNT,
        SET_FEE,
        WITHDRAW_TOKENS,
        WITHDRAW_ETHER,
        SINGLE_TRANSAACTION,
        TRANSFER_TOKEN,
        address,
        loader,
        claimStatus,
        DAPP_NAME,
        balance,
        //ADMIN
        contractOwnerAddr,
        airdropPerUser,
        contractBalEther,
        connectedTokenAddr,
        airdropBalance,
        airdropFee,
        allUers,
      }}
    >
      {children}
    </CONTEXT.Provider>
  );
};
