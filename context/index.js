'use client';
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
      // Clear any existing timeouts
      if (window.connectionTimeout) {
        clearTimeout(window.connectionTimeout);
      }
  
      setLoader(true);
      window.connectionTimeout = setTimeout(() => {
        setLoader(false);
        notifyError("Connection timed out. Please try again.");
      }, 15000); // Reduced timeout to 15 seconds
  
      // First, check network
      await handleNetworkSwitch();
  
      // If already connected via Wagmi, stop loading and return
      if (isConnected) {
        clearTimeout(window.connectionTimeout);
        setLoader(false);
        setAddress(wagmiAddress);
        return;
      }
  
      // Try to connect with WalletConnect for mobile
      const walletConnectConnector = connectors.find(
        (connector) => connector.id === 'walletConnect'
      );
  
      try {
        const result = walletConnectConnector 
          ? await connectAsync({ connector: walletConnectConnector })
          : await connectAsync({ connector: connectors[0] });
  
        if (result?.account) {
          setAddress(result.account);
        } else {
          throw new Error("No account found");
        }
      } catch (error) {
        throw error;
      } finally {
        clearTimeout(window.connectionTimeout);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.error("Connection error:", error);
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
    // Create a timeout promise
    const timeout = (ms) => new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), ms)
    );
  
    try {
      // Don't proceed if no address
      if (!address) return;
  
      setLoader(true);
  
      // Create an AbortController for cancelling fetch operations
      const controller = new AbortController();
      const signal = controller.signal;
  
      // Set timeout for entire operation
      const timeoutId = setTimeout(() => {
        controller.abort();
        setLoader(false);
        notifyError("Operation timed out. Please try again.");
      }, 30000); // 30 second timeout
  
      try {
        // Batch all initial queries together
        const [
          account,
          balance,
          AIRDROP_CONTRACT,
        ] = await Promise.race([
          Promise.all([
            checkIfWalletConnected(),
            getBalance(),
            AirdropContract(),
          ]),
          timeout(15000) // 15 second timeout for initial queries
        ]);
  
        if (!account) {
          throw new Error("No account found");
        }
  
        // Set initial state
        setBalance(ethers.utils.formatEther(balance.toString()));
        setAddress(account);
  
        // Batch contract queries together
        const [
          liveTokenAddr,
          contractOwner,
          contractTokenBal,
          fee,
          contractBalanceBal,
          airdropAmountUser,
          getAllUsers,
        ] = await Promise.race([
          Promise.all([
            AIRDROP_CONTRACT._tokenContract(),
            AIRDROP_CONTRACT.owner(),
            AIRDROP_CONTRACT.tokenBalance(iphone_ADDRESS),
            AIRDROP_CONTRACT._fee(),
            AIRDROP_CONTRACT.contractBalance(),
            AIRDROP_CONTRACT._airdropAmount(),
            AIRDROP_CONTRACT.getAllAirdrops(),
          ]),
          timeout(15000) // 15 second timeout for contract queries
        ]);
  
        // Update contract-related state
        setConnectedTokenAddr(liveTokenAddr);
        setContractOwnerAddr(contractOwner);
        setAirdropBalance(ethers.utils.formatEther(contractTokenBal.toString()));
        setAirdropFee(ethers.utils.formatEther(fee));
        setContractBalEther(ethers.utils.formatEther(contractBalanceBal));
        setAirdropPerUser(ethers.utils.formatEther(airdropAmountUser));
  
        // Parse users data
        const parsedAllUsers = getAllUsers.map((user) => ({
          id: user[0].toNumber(),
          useraddress: user[1],
          name: user[2],
          twitterId: user[3],
          email: user[6],
          timestamp: new Date(user[7].toNumber() * 1000).toDateString(),
        }));
  
        setAllUers(parsedAllUsers);
  
        // Get token balance and set claim status
        try {
          const TOKEN_CONTRACT = await IphoneContract();
          const selectedTokenBal = await TOKEN_CONTRACT.balanceOf(account);
          const tokenClaimUserBal = ethers.utils.formatEther(selectedTokenBal.toString());
  
          // Set claim status based on balance and user history
          const hasAlreadyClaimed = parsedAllUsers.some(
            user => user.useraddress.toLowerCase() === account.toLowerCase()
          );
  
          setClaimStatus(tokenClaimUserBal > 1 || hasAlreadyClaimed);
  
        } catch (error) {
          console.error("Error checking token balance:", error);
          // Don't fail completely if token balance check fails
          setClaimStatus(false);
        }
  
      } finally {
        clearTimeout(timeoutId);
      }
  
      setLoader(false);
  
    } catch (error) {
      setLoader(false);
      
      // Handle specific error types
      if (error.message === 'Timeout') {
        notifyError("Operation timed out. Please check your connection and try again.");
      } else if (error.code === 'NETWORK_ERROR') {
        notifyError("Network error. Please check your connection.");
      } else if (error.code === 'USER_REJECTED') {
        notifyError("Operation cancelled by user.");
      } else {
        const errorMsg = parseErrorMsg(error);
        notifyError(errorMsg || "Failed to load data. Please try again.");
      }
      
      console.error("Fetch Initial Data Error:", error);
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

const claimAirdrop = async (user, sendTransaction) => {
  try {
    setLoader(true);
    
    if (!isConnected || !wagmiAddress) {
      notifyError("Please connect your wallet first");
      setLoader(false);
      return;
    }

    const { name, twitterId, email } = user;

    // Get contract instance
    const AIRDROP_CONTRACT = await AirdropContract();
    const feeCharge = await AIRDROP_CONTRACT._fee();

    // Create transaction
    const tx = await sendTransaction({
      to: airdrop_ADDRESS,
      data: AIRDROP_CONTRACT.interface.encodeFunctionData('dropTokens', [
        name,
        twitterId,
        email
      ]),
      value: feeCharge.toString(),
    });

    if (tx) {
      await tx.wait(); // Wait for transaction confirmation
      notifySuccess("Airdrop claimed successfully!");
      setCount(prev => prev + 1);
    }

  } catch (error) {
    console.error("Claim Airdrop Error:", error);
    if (error.code === 4001) {
      notifyError("Transaction rejected by user");
    } else if (error.message.includes("user rejected")) {
      notifyError("Transaction cancelled");
    } else {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg || "Failed to claim airdrop");
    }
  } finally {
    setLoader(false);
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
