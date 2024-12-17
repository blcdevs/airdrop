import "../styles/globals.css";
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {bsc } from 'wagmi/chains';

//INTERNAL IMPORT
import { CONTEXT_Provider } from "../context/index";
import { config } from '../wagmi.config';
import toast, { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <>
     <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
            modalSize="compact"
            showRecentTransactions={true}
            theme={darkTheme()}
            addDappInfo={true}
            appInfo={{
              appName: 'Tinseltoken',
            }}
            // Add these new props
            coolMode
            initialChain={bsc} // Set your default chain

          // Remove the autoConnect prop to prevent automatic connection
        >
          <CONTEXT_Provider>
            <Component {...pageProps} />
          </CONTEXT_Provider>
          <Toaster />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>

      <script src="assets/js/vendor/jquery-3.6.0.min.js"></script>
      <script src="assets/js/bootstrap.min.js"></script>
      <script src="assets/js/jquery.countdown.min.js"></script>
      <script src="assets/js/jquery.appear.js"></script>
      <script src="assets/js/slick.min.js"></script>
      <script src="assets/js/ajax-form.js"></script>
      <script src="assets/js/jquery.easing.js"></script>
      <script src="assets/js/chart.min.js"></script>
      <script src="assets/js/custom-chart.js"></script>
      <script src="assets/js/wow.min.js"></script>
      <script src="assets/js/main.js"></script>
    </>
  );
}
