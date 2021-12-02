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
        <a href="javascript:void(0)">
          <Sprite id="discord" width={56} height={56} />
        </a>
        <a href="javascript:void(0)">
          <Sprite id="twitter" width={56} height={56} />
        </a>
      </div>
    </div>
  );
};

export default Landing;
