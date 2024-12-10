import React, { useContext } from "react";

//INTERNAL IMPORT
import {
  Banner,
  Document,
  Footer,
  AdminAnalytic,
  Header,
  Admin,
  Loader,
  Scrollup,
  NoPage,
} from "../components/index";
import { CONTEXT } from "../context/index";

const airdrop = () => {
  const { loader, address, contractOwnerAddr } = useContext(CONTEXT);

  return (
    <>
      {" "}
      {address.toLowerCase() == contractOwnerAddr?.toLowerCase() ? (
        <div>
          <Header />
          <main>
            <Banner
              title={"Admin"}
              type={"Control"}
              action={"Token Drop Details access"}
            />
            <AdminAnalytic />
            <Admin />
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
      ) : (
        <NoPage />
      )}
    </>
  );
};

export default airdrop;
