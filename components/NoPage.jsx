import React, { useContext } from "react";

//INTERNAL IMPORT
import {
  Banner,
  Document,
  Footer,
  Header,
  Verify,
  Loader,
  Scrollup,
} from "../components/index";
import { CONTEXT } from "../context/index";

const NoPage = ({ title }) => {
  const { loader } = useContext(CONTEXT);
  return (
    <div>
      <Header />
      <main>
        <Banner
          title={title || "Go Back"}
          type={"To"}
          action={"Home Page"}
          path={"/"}
        />

        <div className="daulat_margin_bottom">
          <Document />
        </div>
      </main>
      <Footer />

      <Scrollup />
    </div>
  );
};

export default NoPage;
