import React, { useContext } from "react";

//INTERNAL IMPORT
import {
  Chart,
  Contribution,
  Document,
  Download,
  Faq,
  Feature,
  FeatureTwo,
  Footer,
  Header,
  Hero,
  Scrollup,
  Loader,
} from "../components/index";
import { CONTEXT } from "../context/index";

const index = () => {
  const { loader } = useContext(CONTEXT);
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Contribution />
        <Feature />
        {/* <FeatureTwo /> */}
        <Chart />
        {/* <Faq /> */}
        <Download />
        {/* <Document /> */}
      </main>
      <Footer />
      {loader && (
        <div className="new_loader">
          <Loader />
        </div>
      )}
      <Scrollup />
    </div>
  );
};

export default index;
