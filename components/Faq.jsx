import React from "react";
import { FaArrowDown } from "react-icons/fa";

const Faq = () => {
  return (
    <section id="faq" class="faq-area">
      <div class="container">
        <div class="faq-inner-wrap">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-title text-center mb-70">
                <h2 class="title">Ask Quick Question</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="faq-wrap">
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item active">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        What cryptocurrencies can I use to purchase?
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <p>
                          LessAccounting is 100% web-based, meaning it can be
                          accessed from anywhere and there’s no software to
                          install on your computer. You can easily use
                          LessAccounting on your iPhone or any Android mobile
                          device with our cloud accounting.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        What is the ICO?
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <p>
                          LessAccounting is 100% web-based, meaning it can be
                          accessed from anywhere and there’s no software to
                          install on your computer. You can easily use
                          LessAccounting on your iPhone or any Android mobile
                          device with our cloud accounting.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        How can I connect API with my Current Site
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <p>
                          LessAccounting is 100% web-based, meaning it can be
                          accessed from anywhere and there’s no software to
                          install on your computer. You can easily use
                          LessAccounting on your iPhone or any Android mobile
                          device with our cloud accounting.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        What is the Payment Mathod
                      </button>
                    </h2>
                    <div
                      id="collapseFour"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <p>
                          LessAccounting is 100% web-based, meaning it can be
                          accessed from anywhere and there’s no software to
                          install on your computer. You can easily use
                          LessAccounting on your iPhone or any Android mobile
                          device with our cloud accounting.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapseFive"
                      >
                        What makes Less Accounting better than the rest?
                      </button>
                    </h2>
                    <div
                      id="collapseFive"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <p>
                          LessAccounting is 100% web-based, meaning it can be
                          accessed from anywhere and there’s no software to
                          install on your computer. You can easily use
                          LessAccounting on your iPhone or any Android mobile
                          device with our cloud accounting.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
