import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { walletConnect } from '@wagmi/connectors'; // Updated import
import { createConfig } from 'wagmi';
// import { bsc } from 'wagmi/chains';
import { bscTestnet } from 'wagmi/chains';




//INTERNAL IMPORT
import airdrop from "./airdrop.json";
import iphone from "./iphone.json";

export const airdrop_ADDRESS = "0x0DD3627cF04E01675Bba3D6Af743AE37113235C6";
const airdrop_ABI = airdrop.abi;

//IPHONE
export const iphone_ADDRESS = "0x83B54268CB2FCafc2C982f946224cfe398993CbF";
const iphone_ABI = iphone.abi;

const fetchContract = (signer, ABI, ADDRESS) =>
  new ethers.Contract(ADDRESS, ABI, signer);

//NETWORK
const networks = {
  polygon_amoy: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Polygon Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  },
  polygon_mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },

    rpcUrls: ["https://rpc.ankr.com/bsc"],
    blockExplorerUrls: ["https://bscscan.com"],
  },


  bsc_testnet: {
    chainId: `0x${Number(97).toString(16)}`,
    chainName: "Binance Smart Chain TestNet",
    nativeCurrency: {
      name: "Binance Smart Chain TestNet",
      symbol: "tBNB", // Use TBNB for TestNet to avoid conflicts
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  
  base_mainnet: {
    chainId: `0x${Number(8453).toString(16)}`,
    chainName: "Base Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_sepolia: {
    chainId: `0x${Number(84532).toString(16)}`,
    chainName: "Base Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = "bscTestnet";
  await changeNetwork({ networkName });
};

export const web3Provider = async () => {
  try {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isDappBrowser = window.ethereum && (window.ethereum.isTrust || 
                         window.ethereum.isMetaMask);
    
    // For mobile web browsers (non-dApp browsers)
    if (isMobile && !isDappBrowser) {
      const projectId = 'c87b9758c721b75cf076ef3cc19ddd58';
      
      // Force WalletConnect for mobile web browsers
      const wcProvider = await walletConnect({
        projectId,
        chains: [bscTestnet],
        showQrModal: true,
        qrModalOptions: { themeMode: "dark" },
        metadata: {
          name: 'Tinseltoken',
          description: 'Tinseltoken Airdrop',
          url: 'https://thetinseltoken.com',
          icons: ['https://tntc.netlify.app/assets/img/logo/logo.png']
        }
      });

      // Add event listeners for WalletConnect
      wcProvider.on("disconnect", () => {
        window.location.reload();
      });

      if (!wcProvider.provider) {
        throw new Error("Please install a Web3 wallet or use WalletConnect");
      }

      return new ethers.providers.Web3Provider(wcProvider.provider);
    }
    
    // For dApp browsers and desktop
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Add listeners for connection changes
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
      
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });

      return provider;
    }
    
    throw new Error("No Web3 provider found. Please install a wallet or use WalletConnect");
  } catch (error) {
    console.error("Web3Provider Error:", error);
    throw error;
  }
};

// Update AirdropContract to use the new web3Provider
export const AirdropContract = async () => {
  try {
    const provider = await web3Provider();
    const signer = provider.getSigner();
    return fetchContract(signer, airdrop_ABI, airdrop_ADDRESS);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Update IphoneContract similarly
export const IphoneContract = async () => {
  try {
    const provider = await web3Provider();
    const signer = provider.getSigner();
    return fetchContract(signer, iphone_ABI, iphone_ADDRESS);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBalance = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    return await signer.getBalance();
  } catch (error) {
    console.log(error);
  }
};


export const addTNTCTokenToMetaMask = async () => {
  if (window.ethereum) {
    const tokenAddress = "0x83B54268CB2FCafc2C982f946224cfe398993CbF"; // TNTC contract address
    const tokenSymbol = "TNTC"; // Symbol for your token
    const tokenDecimals = 18; // Decimals for TNTC token (adjust if needed)
    const tokenImage = "https://tntc.netlify.app/assets/img/logo/logo.png"; // Replace with actual image URL

    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "BEP20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        return "Token added!";
      } else {
        return "Token not added";
      }
    } catch (error) {
      console.error(error);
      return "Failed to add token";
    }
  } else {
    return "Wallet not found, please copy and link and use within the dapp browser";
  }
};
