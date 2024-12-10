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
  NoPage,
} from "../components/index";
import { CONTEXT } from "../context/index";

const airdrop = () => {
  const { loader, airdropBalance } = useContext(CONTEXT);
  console.log(airdropBalance);
  return (
    <>
      {airdropBalance == 0 ? (
        <NoPage title={"Airdrop is Closed"} />
      ) : (
        <div>
          <Header />
          <main>
            <Banner
              title={"Airdrop"}
              type={"Claim"}
              action={"Fee Airdrop Tokens"}
            />
            <Verify />
            <Document />
          </main>
          <Footer />

          {loader && (
            <div className="new_loader">
              <Loader />
            </div>
          )}
          <Scrollup />
        </div>
      )}
    </>
  );
};

export default airdrop;
