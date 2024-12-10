import React, { useState, useEffect, useContext } from "react";
import { BsCloudUploadFill } from "react-icons/bs";

//INTERNAL IMPORT
import { AdminInput, AdminDetails } from "./index";
import { CONTEXT } from "../context/index";
import { shortenAddress } from "../Utils/index";

const Admin = () => {
  const handleImage = () => {
    let url = `airdrop.png`;
    saveAs(url, `@theblockchaincoders`);
  };

  const {
    claimAirdrop,
    notifyError,
    address,
    connect,
    loader,
    claimStatus,
    SET_TOKEN_CONTRACT,
    SET_AIRDROP_AMOUNT,
    SET_FEE,
    WITHDRAW_TOKENS,
    WITHDRAW_ETHER,
    SINGLE_TRANSAACTION,
    airdropPerUser,
    contractBalEther,
    connectedTokenAddr,
    airdropBalance,
    airdropFee,
    allUers,
    TRANSFER_TOKEN,
  } = useContext(CONTEXT);

  //STATE VARIABLE
  const [tokenContract, setTokenContract] = useState();
  const [airdropamount, setAirdropamount] = useState();
  const [fee, setFee] = useState();
  const [withdrawEther, setWithdrawEther] = useState();
  const [withdrawTokens, setWithdrawTokens] = useState({
    beneficiary: "",
    tokenAddr: "",
  });

  const [transfer, setTransfer] = useState({
    address: "",
    amount: "",
  });
  const [transactionID, setTransactionID] = useState();
  const [transactionDetails, setTransactionDetails] = useState();

  const handleFormFieldChange = (fieldName, e) => {
    setWithdrawTokens({ ...withdrawTokens, [fieldName]: e.target.value });
  };

  useEffect(() => {
    const loadToken = async () => {
      if (transactionID) {
        const singleData = await SINGLE_TRANSAACTION(transactionID);
        console.log(singleData);

        setTransactionDetails(singleData);
      }
    };

    loadToken();
  }, [transactionID]);

  return (
    <section class="contact-area pt-140 pb-140">
      <div class="container">
        <div class="contact-info-wrap">
          <div class="row justify-content-center">
            {/* SET_TOKEN_CONTRACT */}
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="contact-info-item">
                <div class="icon">
                  <i class="fas ">
                    <BsCloudUploadFill />
                  </i>
                </div>
                <div class="content">
                  <h6 class="title">Token Contract </h6>
                  <AdminInput
                    name={"Token Address"}
                    placeholder={` ${shortenAddress(connectedTokenAddr)}`}
                    handleClick={(e) => setTokenContract(e.target.value)}
                  />
                  <button
                    onClick={() => SET_TOKEN_CONTRACT(tokenContract)}
                    class="btn margin-btn-new"
                  >
                    Update Token Address
                  </button>
                </div>
              </div>
            </div>
            {/* SET_AIRDROP_AMOUNT */}
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="contact-info-item">
                <div class="icon">
                  <i class="fas ">
                    <BsCloudUploadFill />
                  </i>
                </div>
                <div class="content">
                  <h6 class="title">Airdrop Amount </h6>
                  <AdminInput
                    name={"Airdrop Claim Amount"}
                    placeholder={`${airdropPerUser || 0} Matic`}
                    handleClick={(e) => setAirdropamount(e.target.value)}
                  />
                  <button
                    onClick={() => SET_AIRDROP_AMOUNT(airdropamount)}
                    class="btn margin-btn-new"
                  >
                    Update Clain Airdrop
                  </button>
                </div>
              </div>
            </div>
            {/* SET_FEE */}
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="contact-info-item">
                <div class="icon">
                  <i class="fas ">
                    <BsCloudUploadFill />
                  </i>
                </div>
                <div class="content">
                  <h6 class="title">Airdrop Fee </h6>
                  <AdminInput
                    name={"Airdrop Charge"}
                    placeholder={`${airdropFee || 0} Matic`}
                    handleClick={(e) => setFee(e.target.value)}
                  />
                  <button
                    onClick={() => SET_FEE(fee)}
                    class="btn margin-btn-new"
                  >
                    Update Fee For Airdrop
                  </button>
                </div>
              </div>
            </div>
            {/* WITHDRAW_ETHER */}
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="contact-info-item">
                <div class="icon">
                  <i class="fas ">
                    <BsCloudUploadFill />
                  </i>
                </div>
                <div class="content">
                  <h6 class="title">Withdraw Ether </h6>
                  <AdminInput
                    name={"Receiving Address"}
                    placeholder={`${contractBalEther || 0} Matic`}
                    handleClick={(e) => setWithdrawEther(e.target.value)}
                  />
                  <button
                    onClick={() => WITHDRAW_ETHER(withdrawEther)}
                    class="btn margin-btn-new"
                  >
                    Withdraw Ether
                  </button>
                </div>
              </div>
            </div>
            {/* WITHDRAW_TOKENS */}
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="contact-info-item">
                <div class="icon">
                  <i class="fas ">
                    <BsCloudUploadFill />
                  </i>
                </div>
                <div class="content">
                  <h6 class="title">Withdraw Tokens </h6>
                  <AdminInput
                    name={"Receiving Address"}
                    handleClick={(e) => handleFormFieldChange("beneficiary", e)}
                  />
                  <AdminInput
                    name={"Token Address"}
                    handleClick={(e) => handleFormFieldChange("tokenAddr", e)}
                  />
                  <button
                    onClick={() => WITHDRAW_TOKENS(withdrawTokens)}
                    class="btn margin-btn-new"
                  >
                    Withdraw Tokens
                  </button>
                </div>
              </div>
            </div>
            {/* SINGLE_TRANSAACTION */}
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="contact-info-item">
                <div class="icon">
                  <i class="fas ">
                    <BsCloudUploadFill />
                  </i>
                </div>
                <div class="content">
                  <h6 class="title">Single Transaction </h6>
                  <AdminInput
                    name={"Transaction ID"}
                    placeholder={`_Id`}
                    handleClick={(e) => setTransactionID(e.target.value)}
                  />
                  <button
                    onClick={() => SINGLE_TRANSAACTION(transactionID)}
                    class="btn margin-btn-new"
                  >
                    Single Transaction
                  </button>
                </div>
              </div>
            </div>
            {/* Transfer Token */}
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="contact-info-item">
                <div class="icon">
                  <i class="fas ">
                    <BsCloudUploadFill />
                  </i>
                </div>
                <div class="content">
                  <h6 class="title">Transfer Token </h6>
                  <AdminInput
                    name={"To"}
                    placeholder={`address`}
                    handleClick={(e) =>
                      setTransfer({ ...transfer, address: e.target.value })
                    }
                  />
                  <AdminInput
                    name={"Quentity"}
                    placeholder={`amount`}
                    handleClick={(e) =>
                      setTransfer({ ...transfer, amount: e.target.value })
                    }
                  />
                  <button
                    onClick={() => TRANSFER_TOKEN(transfer)}
                    class="btn margin-btn-new"
                  >
                    Transfer Token
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {transactionDetails && (
        <div className="new_loader">
          <AdminDetails
            transactionDetails={transactionDetails}
            setTransactionDetails={setTransactionDetails}
          />
        </div>
      )}
    </section>
  );
};

export default Admin;
