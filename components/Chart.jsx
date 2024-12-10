import React from "react";

const Chart = () => {
  return (
    <div id="chart" className="chart-area pt-140">
      <div className="container">
        <div className="chart-inner-wrap">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="chart-wrap">
                <div className="chart">
                  <canvas id="doughnutChart"></canvas>
                </div>
                <div className="chart-tab">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="funding-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#funding-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="funding-tab-pane"
                        aria-selected="true"
                      >
                        Token Allocation
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="distribution-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#distribution-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="distribution-tab-pane"
                        aria-selected="false"
                      >
                        Utility Allocation
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="funding-tab-pane"
                      role="tabpanel"
                      aria-labelledby="funding-tab"
                      tabIndex="0"
                    >
                      <div className="chart-list">
                        <ul className="list-wrap">
                          <li>Airdrops: 70% (140,000,000 TNTC)</li>
                          <li>Ecosystem Development: 15% (30,000,000 TNTC)</li>
                          <li>Team and Advisors: 10% (20,000,000 TNTC)</li>
                          <li>Liquidity & Exchange Listings: 5% (10,000,000 TNTC)</li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="distribution-tab-pane"
                      role="tabpanel"
                      aria-labelledby="distribution-tab"
                      tabIndex="0"
                    >
                      <div className="chart-list">
                        <ul className="list-wrap">
                          <li>DeFi: Staking and liquidity rewards</li>
                          <li>Governance: Voting on project decisions</li>
                          <li>Gaming and NFTs: In-game purchases and NFT transactions</li>
                          <li>Community Growth: Incentivized participation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right-side-content">
                {/* <img src="assets/img/images/chart_img.png" alt="Chart Illustration" /> */}
                <p>
                  Tinseltoken (TNTC) empowers the community with <br />
                  decentralized, fair, and accessible blockchain technology.
                </p>
                <ul className="list-wrap">
                  <li>
                    <span>1</span>Total Supply: 200,000,000 TNTC
                  </li>
                  <li>
                    <span>2</span>Symbol: TNTC
                  </li>
                  <li>
                    <span>3</span>Blockchain: BSC
                  </li>
                  <li>
                    <span>4</span>Smart Contract Type: ERC20
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
