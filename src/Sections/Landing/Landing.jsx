import { Sprite } from "../../components";
import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/data/dataActions";
import configResponse from "../../config/config.json";
import { connect } from "../../redux/blockchain/blockchainActions";

const Landing = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const [claimingNft, setClaimingNft] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState();

  useEffect(() => {
    SET_CONFIG(configResponse);
    dispatch(connect());
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (val) => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", (val) => {
        window.location.reload();
      });
    }
  }, []);

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mintSanta(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei
      })
      .once("error", (err) => {
        console.log(err);
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount <= 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount >= 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <img
        src={`assets/images/Landing.png`}
        alt={"landing"}
        className={`img`}
      />
      <div className={`landing-links`}>
        <a
          href="http://discord.gg/x5efkZhTm4"
          target="_blank"
          rel="referrer noopener"
        >
          <Sprite id="discord" width={56} height={56} />
        </a>
        <a
          href="https://twitter.com/secretsanta_nft"
          target="_blank"
          rel="referrer noopener"
        >
          <Sprite id="twitter" width={56} height={56} />
        </a>
        <a
          href="https://opensea.io/collection/secretsantanft"
          target="_blank"
          rel="referrer noopener"
        >
          <Sprite id="opensea" width={56} height={56} />
        </a>
      </div>
      <div className="mint-section">
        <img src={"assets/images/Mint-Section.png"} alt="mint-section" />
        <div className="mint-content">
          <Typography
            variant="h4"
            style={{ color: "#2B7055", fontFamily: "'Candy Beans'" }}
            fontWeight={"bold"}
          >
            Mint is Live
          </Typography>
          <div className="count">
            <div
              onClick={() => {
                decrementMintAmount();
              }}
            >
              -
            </div>
            <div>{mintAmount}</div>
            <div
              onClick={() => {
                incrementMintAmount();
              }}
            >
              +
            </div>
          </div>
          <span
            style={{
              position: "relative",
              ...(claimingNft ||
              !(window.ethereum?.chainId && window.ethereum?.chainId === "0x89")
                ? { opacity: "0.5", cursor: "not-allowed" }
                : { cursor: "pointer" })
            }}
            onClick={
              claimingNft ||
              !(window.ethereum?.chainId && window.ethereum?.chainId === "0x89")
                ? undefined
                : () => {
                    claimNFTs();
                    getData();
                  }
            }
          >
            {window.ethereum?.chainId &&
            window.ethereum?.chainId === "0x89" ? null : (
              <span style={{ position: "absolute", top: "-20px" }}>
                Please switch to Matic Mainnet
              </span>
            )}
            <Sprite id="mint-button" width={230} height={70} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
