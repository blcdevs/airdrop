import React from "react";
import { saveAs } from "file-saver";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { useForm, ValidationError } from "@formspree/react";
import toast from "react-hot-toast";

const Document = () => {
  //NOTIFICATION
  const notifyError = (msg) => toast.error(msg, { duration: 4000 });
  const notifySuccess = (msg) => toast.success(msg, { duration: 4000 });

  const [state, handleSubmit] = useForm("mzbnzpqr");
  if (state.succeeded) {
    return notifySuccess("Successfully send");
  }

  const handlePDF = () => {
    let url = `roadmap.pdf`;
    saveAs(url, `@theblockchaincoders`);
  };
  return (
    <section id="contact" class="document-area">
      <div class="container">
        <div class="document-inner-wrap">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-title text-center mb-60">
                <h2 class="title">Have Any Questions?</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-8">
              <div class="document-form-wrap">
                <h4 class="title">Get In Touch Now</h4>
                <form onSubmit={handleSubmit}>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-grp">
                        <input
                          type="text"
                          id="email"
                          name="name"
                          placeholder="Your Name"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-grp">
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Your Email"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-grp">
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Enter you message....."
                    ></textarea>
                  </div>
                  <button type="submit" disabled={state.submitting} class="btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="document-wrap">
                <h4 class="title">Read Documents</h4>
                <ul class="list-wrap">
                  <li>
                    <a href="#">
                      <span class="icon">
                        <i class="fas ">
                          <BsFileEarmarkPdf />
                        </i>
                      </span>
                      Whitepaper
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span class="icon">
                        <i class="fas ">
                          <BsFileEarmarkPdf />
                        </i>
                      </span>
                      Token Sale Terms
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span class="icon">
                        <i class="fas ">
                          <BsFileEarmarkPdf />
                        </i>
                      </span>
                      Presentation
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span class="icon">
                        <i class="fas ">
                          <BsFileEarmarkPdf />
                        </i>
                      </span>
                      Lightpaper
                    </a>
                  </li>
                </ul>
                <a onClick={() => handlePDF()} class="btn">
                  Download All
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="document-shape">
        <img
          src="assets/img/images/document_shape.png"
          alt=""
          class="alltuchtopdown"
        />
      </div>
    </section>
  );
};

export default Document;
