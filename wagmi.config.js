import { createConfig, http } from 'wagmi';
import {bsc, bscTestnet, polygon, polygonAmoy } from 'wagmi/chains';
import { 
  rainbowWallet,
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
  coinbaseWallet,
  argentWallet,
  ledgerWallet,
  safeWallet,
  braveWallet,
  imTokenWallet,
  injectedWallet,
  omniWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';

const projectId = 'c87b9758c721b75cf076ef3cc19ddd58'; // Get from https://cloud.walletconnect.com/

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        trustWallet,
        rainbowWallet,
        walletConnectWallet,
        coinbaseWallet,
        argentWallet,
        ledgerWallet,
        safeWallet,
        braveWallet,
        imTokenWallet,
        injectedWallet,
        omniWallet,
      ],
    },
  ],
  {
    projectId,
    appName: 'Tinseltoken',
  }
);

export const config = createConfig({
  connectors,
  chains: [bsc, bscTestnet, polygon, polygonAmoy],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
  },
});