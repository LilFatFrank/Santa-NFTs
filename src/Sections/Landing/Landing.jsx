import { Sprite } from "../../components";

const Landing = () => {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <img
        src={`assets/images/Landing.png`}
        alt={"landing"}
        className={`img`}
      />
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px"
        }}
      >
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
      </div>
    </div>
  );
};

export default Landing;
