import { Sprite } from "../../components";
import Web3 from "web3";
import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const Landing = () => {
  const [count, setCount] = useState(1);
  const [walletAddress, setWallet] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [headerMsg, setHeaderMsg] = React.useState("");
  const web3 = new Web3(window.ethereum);

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts"
        });
        const networkId = await window.ethereum.request({
          method: "net_version"
        });
        if (networkId == 137) {
          if (addressArray.length > 0) {
            return {
              address: addressArray[0],
              status: "👆🏽 Write a message in the text-field above."
            };
          } else {
            return {
              address: "",
              status: "🦊 Connect to Metamask using the top right button."
            };
          }
        } else {
          setHeaderMsg("Change network to Polygon.(Matic Mainnet)");
          return {
            address: "",
            status: "🦊 Change network to Polygon.(Matic Mainnet)"
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        )
      };
    }
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0]
        };

        const networkId = await window.ethereum.request({
          method: "net_version"
        });

        if (networkId == 137) {
        } else {
          setHeaderMsg("Change network to Polygon.(Matic Mainnet)");
        }

        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        )
      };
    }
  };

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
          href="javascript:void(0)"
          target="_blank"
          rel="referrer noopener"
          className={`opensea`}
        >
          <Sprite id="opensea" width={56} height={56} />
        </a>
      </div>
      <div className="mint-section">
        <img src={"assets/images/Mint-Section.png"} alt="mint-section" />
        <div className="mint-content">
          <Typography
            variant="h4"
            style={{ color: "#2B7055" }}
            fontWeight={"bold"}
          >
            Mint is Live
          </Typography>
          <div className="count">
            <div onClick={() => setCount(count <= 1 ? count : count - 1)}>
              -
            </div>
            <div>{count}</div>
            <div onClick={() => setCount(count >= 10 ? count : count + 1)}>
              +
            </div>
          </div>
          <span style={{ opacity: "0.5", cursor: "not-allowed" }}>
            <Sprite id="mint-button" width={230} height={70} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Landing;

/* import React, { useEffect } from "react";
import Helmet from "../component/common/Helmet";
import FooterTwo from "../component/footer/FooterTwo";
import Web3 from "web3";

import "react-vertical-timeline-component/style.min.css";

import Terminal, { ColorMode, LineType } from "react-terminal-ui";

import Contract from "../contract/SHELLCMD.json";

const baseData = [
  {
    type: LineType.Output,
    value: "type help for commands..",
  },
  { type: LineType.Output, value: "\n" },
];
const Mint = () => {
  const [walletAddress, setWallet] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [headerMsg, setHeaderMsg] = React.useState("");

  const contract_address = "0xed27be5d31861d9276304cbf5c0d45786cfafdc1";
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(Contract, contract_address);

  const [terminalLineData, setTerminalLineData] = React.useState(baseData);

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
    checkAnySale();
  }, []);

  const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        const networkId = await window.ethereum.request({
          method: "net_version",
        });

        if (networkId == 137) {
          if (addressArray.length > 0) {
            return {
              address: addressArray[0],
              status: "👆🏽 Write a message in the text-field above.",
            };
          } else {
            return {
              address: "",
              status: "🦊 Connect to Metamask using the top right button.",
            };
          }
        } else {
          setHeaderMsg("Change network to Polygon.(Matic Mainnet)");
          return {
            address: "",
            status: "🦊 Change network to Polygon.(Matic Mainnet)",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };

        const networkId = await window.ethereum.request({
          method: "net_version",
        });

        if (networkId == 137) {
        } else {
          setHeaderMsg("Change network to Polygon.(Matic Mainnet)");
        }

        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const mintCommand = async (amount) => {
    var commandPrice = await contract.methods.commandPrice().call();
    commandPrice = commandPrice / 1000000000000000000;

    const mint = await contract.methods
      .mintCommand(amount)
      .send({
        gasLimit: "1285000",
        to: contract_address,
        from: walletAddress,
        value: web3.utils.toWei((commandPrice * amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err.code);

        const code = err.code;
        if (code == 4001) {
          setHeaderMsg("Transaction has been rejected!");
        } else {
          setHeaderMsg("Sorry, Something went wrong. Try again.");
        }

        return err;
      })
      .then((receipt) => {
        console.log(receipt);
        console.log(
          "WOW, you own now a command. go visit Opensea.io to view it."
        );
        return receipt;
      });
    console.log("mint", mint);
  };

  // const totalSupply = await getTotalSupply();
  // console.log("totalSupply", totalSupply);
  const getTotalSupply = async () => {
    const totalSupply = await contract.methods.totalSupply().call();
    return totalSupply;
  };

  // const cmdPrice = await getCommandPrice();
  // console.log("command price", cmdPrice);
  const getCommandPrice = async () => {
    const commandPrice = await contract.methods.commandPrice().call();
    var price = commandPrice / 1000000000000000000 + " Matic";
    return price;
  };

  const getMyTokens = async (address) => {
    const tokens = await contract.methods.tokensOfOwner(address).call();
    return tokens;
  };

  const checkWhitelistSale = async () => {
    const whitelistSale = await contract.methods.whitelistSaleIsActive().call();
    return whitelistSale;
  };

  const checkCommunitySale = async () => {
    const communitySale = await contract.methods.communitySaleIsActive().call();
    return communitySale;
  };

  const checkPublicSale = async () => {
    const publicSale = await contract.methods.saleIsActive().call();
    return publicSale;
  };

  const checkAnySale = async () => {
    const publicSale = await checkPublicSale();
    const whitelistSale = await checkWhitelistSale();
    const communitySale = await checkCommunitySale();

    console.log(
      "publicSale",
      publicSale,
      "whitelistSale",
      whitelistSale,
      "communitySale",
      communitySale
    );

    if (!publicSale && !whitelistSale && !communitySale) {
      const msg = (
        <p>
          No sale is active yet. ~$ GoTo
          <a target="_blank" href={`https://discord.gg/8WfkW9q7Qd`}>
            <h5 color="#ffffff">Discord</h5>
          </a>
        </p>
      );
      setHeaderMsg(msg);
      return;
    } else if (!publicSale && !whitelistSale && communitySale) {
      setHeaderMsg(
        "Community sale is active and Command Price = 85 matic (0.033 ETH)"
      );
    } else if (!publicSale && whitelistSale && !communitySale) {
      setHeaderMsg(
        "Whitelisted sale is active and Command Price = 140 matic (0.055 ETH), Make sure you are whitelisted."
      );
    } else if (publicSale && !whitelistSale && !communitySale) {
      setHeaderMsg(
        "Public sale is active and Command Price = 195 matic (0.077 ETH)"
      );
    }
  };

  const addCommands = async (command) => {
    if (!walletAddress) {
      alert("Please connect the wallet");
      return;
    }
    const trim_command = command.trim();
    if (trim_command == "clear") {
      setTerminalLineData(baseData);
      return;
    } else if (trim_command == "help") {
      const input = {
        type: LineType.Input,
        value: trim_command,
      };
      const output = {
        type: LineType.Output,
        value: "Here is the list of commands ....",
      };
      const output1 = {
        type: LineType.Output,
        value: "Minting -> mint  number of tokens eg: mint 2",
      };
      const output2 = {
        type: LineType.Output,
        value: "My Tokens -> mytokens",
      };
      const output3 = {
        type: LineType.Output,
        value: "Command Price -> cmd price",
      };
      const output4 = {
        type: LineType.Output,
        value: "Current supply -> supply",
      };
      const output5 = {
        type: LineType.Output,
        value: "Clear screen -> clear",
      };

      setTerminalLineData([
        ...terminalLineData,
        input,
        output,
        output1,
        output2,
        output3,
        output4,
        output5,
      ]);
    } else if (trim_command == "supply") {
      const input = {
        type: LineType.Input,
        value: trim_command,
      };
      setTerminalLineData([...terminalLineData, input]);

      const output = {
        type: LineType.Output,
        value: "Current Supply is " + (await getTotalSupply()),
      };

      setTerminalLineData([...terminalLineData, input, output]);
    } else if (trim_command == "cmd price") {
      const input = {
        type: LineType.Input,
        value: trim_command,
      };
      setTerminalLineData([...terminalLineData, input]);

      const output = {
        type: LineType.Output,
        value: "Command Price is " + (await getCommandPrice()),
      };

      setTerminalLineData([...terminalLineData, input, output]);
    } else if (trim_command == "mytokens") {
      const input = {
        type: LineType.Input,
        value: trim_command,
      };
      setTerminalLineData([...terminalLineData, input]);

      const tokens = await getMyTokens(walletAddress);

      const output = {
        type: LineType.Output,
        value: "Total tokens = " + tokens.length,
      };
      const output1 = {
        type: LineType.Output1,
        value: tokens.toString(),
      };

      setTerminalLineData([...terminalLineData, input, output, output1]);
    } else if (trim_command.match(/^mint ([1-9]+)$/)) {
      var match = trim_command.match(/^mint ([1-9]+)$/);
      const number = match[1];

      const input = {
        type: LineType.Input,
        value: trim_command,
      };
      setTerminalLineData([...terminalLineData, input]);

      const msg = await mintCommand(number);
      console.log("msg", msg);

      const output = {
        type: LineType.Output,
        value: "number " + number,
      };

      setTerminalLineData([...terminalLineData, input, output]);
    } else {
      const input = {
        type: LineType.Input,
        value: trim_command,
      };
      const output = {
        type: LineType.Output,
        value: "command not found " + "'" + trim_command + "'",
      };
      setTerminalLineData([...terminalLineData, input, output]);
      return;
    }
  };

  var name = "Wallet : ";

  if (walletAddress) {
    name = name + walletAddress;
  } else {
    name = "Please connect the wallet";
  }

  return (
    <div className="active-dark bg_color--6">
      <Helmet pageTitle="Shell Commands NFT" />
      <div className="container">
        <br></br>
        <h1 align="center" style={{ color: "white" }}>
          Shell Commands NFT
        </h1>
        {walletAddress == "" ? (
          <p align="center" style={{ color: "white" }}>
            <button
              id="walletButton"
              align="center"
              onClick={connectWalletPressed}
            >
              <p align="center" style={{ color: "white" }}>
                Connect Wallet
              </p>
            </button>
          </p>
        ) : (
          <p align="center" style={{ color: "white" }}>
            {headerMsg}
          </p>
        )}

        <Terminal
          name={name}
          colorMode={ColorMode.Dark}
          lineData={terminalLineData}
          onInput={(terminalInput) =>
            // console.log(`New terminal input received: '${terminalInput}'`)
            addCommands(terminalInput)
          }
        />
      </div>

      <FooterTwo />
    </div>
  );
};

export default Mint; */
