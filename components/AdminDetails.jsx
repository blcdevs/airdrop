import React from "react";
import { shortenAddress } from "../Utils/index";

const AdminDetails = ({ transactionDetails, setTransactionDetails }) => {
  return (
    <section id="contact" class="document-area">
      <div class="container">
        <div class="document-inner-wrap">
          <div class="row">
            <div class="col-lg-8">
              <div class="document-form-wrap">
                <h4 class="title">Transaction ID: {transactionDetails.id} </h4>
                <div>
                  <div class="row">
                    <div class="">
                      <div class="form-grp">
                        <input
                          disabled
                          placeholder={shortenAddress(
                            transactionDetails.useraddress
                          )}
                        />
                      </div>
                    </div>
                    <div class="">
                      <div class="form-grp">
                        <input
                          disabled
                          placeholder={transactionDetails.email}
                        />
                      </div>
                    </div>
                    <div class="">
                      <div class="form-grp">
                        <input disabled placeholder={transactionDetails.name} />
                      </div>
                    </div>
                    <div class="">
                      <div class="form-grp">
                        <input
                          disabled
                          placeholder={transactionDetails.timestamp}
                        />
                      </div>
                    </div>
                  </div>

                  <button onClick={() => setTransactionDetails()} class="btn">
                    Close X
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDetails;
