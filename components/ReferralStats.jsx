import React, { useContext, useEffect, useState } from 'react';
import { CONTEXT } from '../context';
import { ethers } from 'ethers';
import { FaUsers, FaCoins, FaShareAlt, FaSync } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { AirdropContract } from '../context/constants';

const ReferralStats = () => {
  const { 
    address,
    loader,
    notifySuccess,
    notifyError
  } = useContext(CONTEXT);

  const [stats, setStats] = useState({
    totalReferrals: 0,
    pendingRewards: "0",
    hasClaimed: false
  });
  
  const [referralLink, setReferralLink] = useState("");
  const [referralList, setReferralList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchReferralData = async () => {
    try {
      setIsLoading(true);
      const contract = await AirdropContract();
      
      console.log("Fetching referral stats for:", address);
      
      const [totalReferrals, pendingRewards, hasClaimed] = await contract.getReferralStats(address);
      console.log("Referral stats:", {
        totalReferrals: totalReferrals.toString(),
        pendingRewards: pendingRewards.toString(),
        hasClaimed
      });
      
      setStats({
        totalReferrals: totalReferrals.toNumber(),
        pendingRewards: ethers.utils.formatEther(pendingRewards),
        hasClaimed
      });

      // Fetch referral list
      if (totalReferrals.toNumber() > 0) {
        const referrals = [];
        for (let i = 0; i < totalReferrals.toNumber(); i++) {
          const referralAddress = await contract.userReferrals(address, i);
          if (referralAddress && ethers.utils.isAddress(referralAddress)) {
            referrals.push(referralAddress);
          }
        }
        console.log("Referral list:", referrals);
        setReferralList(referrals);
      }

      setReferralLink(`${window.location.origin}/?ref=${address}`);

    } catch (error) {
      console.error("Error fetching referral data:", error);
      notifyError("Failed to fetch referral data");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const refreshStats = async () => {
    if (!address || isRefreshing) return;
    
    try {
      setIsRefreshing(true);
      await fetchReferralData();
      notifySuccess("Referral stats refreshed!");
    } catch (error) {
      console.error("Error refreshing stats:", error);
      notifyError("Failed to refresh referral stats");
    }
  };
  
  const claimRewards = async () => {
    try {
      setIsLoading(true);
      const contract = await AirdropContract();
      
      const tx = await contract.claimReferralRewards();
      await tx.wait();
      
      notifySuccess("Rewards claimed successfully!");
      await fetchReferralData();
    } catch (error) {
      console.error("Error claiming rewards:", error);
      notifyError("Failed to claim rewards");
    } finally {
      setIsLoading(false);
    }
  };
  
  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyReferralLink = () => {
    try {
      navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied!");
    } catch (error) {
      console.error("Copy failed:", error);
      notifyError("Failed to copy link");
    }
  };

  useEffect(() => {
    const loadReferralData = async () => {
      if (address) {
        await fetchReferralData();
        if (initialLoad) {
          setInitialLoad(false);
        }
      }
    };

    if (address && (initialLoad || !loader)) {
      loadReferralData();
    }
  }, [address, loader, initialLoad]);

  return (
    <div className="referral-stats-container">
      <div className="referral-header">
        <h3>Your Referral Dashboard</h3>
        <div className="header-actions">
          <button 
            onClick={refreshStats}
            disabled={isRefreshing || isLoading}
            className="refresh-button"
          >
            <FaSync className={isRefreshing ? 'spinning' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <FaShareAlt className="share-icon" />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <div className="stat-info">
            <h4>Total Referrals</h4>
            <p>{stats.totalReferrals}</p>
          </div>
        </div>

        <div className="stat-card">
          <FaCoins className="stat-icon" />
          <div className="stat-info">
            <h4>Pending Rewards</h4>
            <p>{stats.pendingRewards} TNTC</p>
          </div>
        </div>
      </div>

      <div className="referral-link-section">
        <h4>Your Referral Link</h4>
        <div className="link-box">
          <input 
            type="text" 
            value={referralLink} 
            readOnly 
            placeholder="Connect wallet to get your referral link"
          />
          <button 
            onClick={copyReferralLink}
            disabled={!address}
          >
            Copy
          </button>
        </div>
      </div>

      {referralList.length > 0 && (
        <div className="referral-list-section">
          <h4>Your Referrals</h4>
          <div className="referral-list">
            {referralList.map((referralAddress, index) => (
              <div key={index} className="referral-item">
                {shortenAddress(referralAddress)}
              </div>
            ))}
          </div>
        </div>
      )}

      {parseFloat(stats.pendingRewards) > 0 && !stats.hasClaimed && (
        <button 
          className="claim-button"
          onClick={claimRewards}
          disabled={isLoading || loader}
        >
          {isLoading || loader ? "Processing..." : "Claim Rewards"}
        </button>
      )}

      {stats.hasClaimed && (
        <div className="claimed-message">
          <p>You have already claimed your rewards</p>
        </div>
      )}
    </div>
  );
};

export default ReferralStats;