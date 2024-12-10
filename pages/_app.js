import "../styles/globals.css";

//INTERNAL IMPORT
import { CONTEXT_Provider } from "../context/index";
import toast, { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CONTEXT_Provider>
        <Component {...pageProps} />
      </CONTEXT_Provider>
      <Toaster />

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
