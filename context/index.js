'use client';
import React, { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import toast from "react-hot-toast";
import { useAccount, useDisconnect, useConnect, useWalletClient } from 'wagmi';


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
  const { data: walletClient } = useWalletClient();


  //NOTIFICATION
  const notifyError = (msg) => toast.error(msg, { duration: 4000 });
  const notifySuccess = (msg) => toast.success(msg, { duration: 4000 });

//CONNECT WALLET
const DEBUG = true;

const debugLog = (...args) => {
  if (DEBUG) {
    console.log('[Referral Debug]:', ...args);
  }
};

const connect = async () => {
  try {
    setLoader(true);
    
    if (window.connectionTimeout) {
      clearTimeout(window.connectionTimeout);
    }

    const timeoutDuration = 30000;
    window.connectionTimeout = setTimeout(() => {
      setLoader(false);
      notifyError("Connection timed out. Please try again.");
    }, timeoutDuration);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isDappBrowser = window.ethereum && window.ethereum.isTrust || 
                         window.ethereum && window.ethereum.isMetaMask;

    await handleNetworkSwitch();

    // Get referrer from URL if exists
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = urlParams.get('ref');
    debugLog("Referrer from URL:", referrer);

    let connectedAddress;

    if (isConnected && wagmiAddress) {
      connectedAddress = wagmiAddress;
      clearTimeout(window.connectionTimeout);
      setLoader(false);
      setAddress(wagmiAddress);
    } else {
      try {
        if (isMobile && !isDappBrowser) {
          const walletConnectConnector = connectors.find(
            (connector) => connector.id === 'walletConnect'
          );
          
          if (!walletConnectConnector) {
            throw new Error("WalletConnect not available");
          }

          const result = await connectAsync({ 
            connector: walletConnectConnector,
            chainId: 97
          });
          
          if (result?.account) {
            connectedAddress = result.account;
            setAddress(result.account);
          }
        } else {
          const provider = await web3Provider();
          const accounts = await provider.send("eth_requestAccounts", []);
          
          if (accounts[0]) {
            connectedAddress = accounts[0];
            setAddress(accounts[0]);
          }
        }

        if (!connectedAddress) {
          throw new Error("Failed to get connected address");
        }

        // Handle referral after successful wallet connection
        if (connectedAddress && referrer) {
          await handleReferral(referrer, connectedAddress);
        }

        notifySuccess("Wallet connected successfully!");
        return connectedAddress;

      } catch (error) {
        if (error.message.includes("User rejected")) {
          notifyError("Connection rejected by user");
        } else if (error.message.includes("missing provider")) {
          notifyError("Please install a wallet or scan the QR code with your wallet app");
        } else {
          notifyError(error.message || "Failed to connect wallet");
        }
        throw error;
      }
    }
  } catch (error) {
    console.error("Connection error:", error);
    const errorMsg = parseErrorMsg(error);
    notifyError(errorMsg || "Failed to connect wallet");
  } finally {
    setLoader(false);
    if (window.connectionTimeout) {
      clearTimeout(window.connectionTimeout);
    }
  }
};

const handleReferral = async (referrer, userAddress) => {
  try {
    debugLog('Starting referral process');
    debugLog('Referrer:', referrer);
    debugLog('User:', userAddress);

    if (!ethers.utils.isAddress(referrer) || 
        referrer.toLowerCase() === userAddress.toLowerCase()) {
      debugLog("Invalid referrer address");
      return;
    }

    const contract = await AirdropContract();
    const provider = await web3Provider();
    const signer = provider.getSigner();
    
    // Check if already referred
    const isReferred = await contract.isAlreadyReferred(userAddress);
    debugLog("Is already referred:", isReferred);
    
    if (!isReferred) {
      debugLog("Registering referral for:", referrer);
      const registerTx = await contract.connect(signer).registerReferral(referrer);
      debugLog("Waiting for transaction...");
      await registerTx.wait();
      notifySuccess("Referral registered successfully!");
    } else {
      debugLog("User already referred");
      notifyError("You have already been referred by someone");
    }
  } catch (error) {
    console.error("Referral registration error:", error);
    notifyError("Failed to register referral: " + error.message);
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
  
       // Add retry logic
    const retryOperation = async (operation, maxRetries = 3) => {
      for (let i = 0; i < maxRetries; i++) {
        try {
          return await operation();
        } catch (error) {
          if (i === maxRetries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
        }
      }
    };

    // Create an AbortController for cancelling fetch operations
    const controller = new AbortController();
    const signal = controller.signal;


      // Set timeout for entire operation
    const timeoutId = setTimeout(() => {
      controller.abort();
      setLoader(false);
      notifyError("Operation timed out. Please try again.");
    }, 30000);

  
      try {
        // Batch all initial queries together with retry logic
        const [account, balance, AIRDROP_CONTRACT] = await retryOperation(async () => {
          return await Promise.race([
            Promise.all([
              checkIfWalletConnected(),
              getBalance(),
              AirdropContract(),
            ]),
            timeout(15000)
          ]);
        });
  
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
              // Inside fetchInitialData function
            const parsedAllUsers = getAllUsers
            .filter(user => user && Array.isArray(user) && user.length >= 8) // Validate array structure
            .map((user) => {
              try {
                return {
                  id: user[0] ? user[0].toNumber() : 0,
                  useraddress: user[1] || "",
                  twitterId: user[3] || "",
                  email: user[6] || "",
                  timestamp: user[7] ? new Date(user[7].toNumber() * 1000).toDateString() : new Date().toDateString(),
                };
              } catch (error) {
                console.error("Error parsing user data:", error);
                return null;
              }
            })
            .filter(Boolean); // Remove any null entries from failed parsing

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
          setClaimStatus(false);
        }
  
      } finally {
        clearTimeout(timeoutId);
      }
  
      setLoader(false);
  
    } catch (error) {
      setLoader(false);
      
      // Enhanced error handling
    if (error.message === 'Timeout') {
      notifyError("Connection timed out. Please try again.");
    } else if (error.code === 'NETWORK_ERROR') {
      notifyError("Network error. Please check your connection.");
    } else if (error.code === 'USER_REJECTED') {
      notifyError("Operation cancelled by user.");
    } else if (error.message.includes('user rejected') || error.message.includes('User rejected')) {
      notifyError("Transaction rejected by user.");
    } else if (error.message.includes('insufficient funds')) {
      notifyError("Insufficient funds for transaction.");
    } else {
      notifyError("Failed to load data. Please refresh and try again.");
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

const claimAirdrop = async (user) => {
  try {
    setLoader(true);
    
    if (!isConnected || !wagmiAddress) {
      notifyError("Please connect your wallet first");
      setLoader(false);
      return;
    }

    const {twitterId, email } = user;

    try {
      // Get the contract instance using your existing helper
      const AIRDROP_CONTRACT = await AirdropContract();
      
      if (!AIRDROP_CONTRACT) {
        throw new Error("Failed to get contract instance");
      }

      // Get fee amount
      const feeCharge = await AIRDROP_CONTRACT._fee();

      // Get provider and signer
      const PROVIDER = await web3Provider();
      const signer = PROVIDER.getSigner();

      // Call the contract method
      const claim = await AIRDROP_CONTRACT.connect(signer).dropTokens(
        twitterId,
        email,
        {
          value: feeCharge.toString(),
          gasLimit: ethers.utils.hexlify(1000000),
        }
      );

      await claim.wait();

      notifySuccess("Airdrop claimed successfully!");
      setCount(prev => prev + 1);

    } catch (error) {
      console.error("Transaction error:", error);
      throw error;
    }

  } catch (error) {
    const errorMsg = parseErrorMsg(error);
    notifyError(errorMsg || "Failed to claim airdrop");
    console.log(error);
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
