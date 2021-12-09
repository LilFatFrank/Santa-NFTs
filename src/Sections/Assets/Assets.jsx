import { Sprite } from '../../components'

const Assets = () => {
  return (
    <div style={{ position: "relative", top: "-15px" }}>
      <img src={`assets/images/Assets.png`} alt="assets" className={`img`} />
      <div className={`solamas-animation-content`}>
        <div className={`rowContainer`}>
          <div className={`row animate`}>
            <img src={"assets/images/1.png"} alt={"santa-nft"} />
            <img src={"assets/images/2.png"} alt={"santa-nft"} />
            <img src={"assets/images/5.png"} alt={"santa-nft"} />
            <img src={"assets/images/6.png"} alt={"santa-nft"} />
            <img src={"assets/images/7.png"} alt={"santa-nft"} />
            <img src={"assets/images/8.png"} alt={"santa-nft"} />
            <img src={"assets/images/9.png"} alt={"santa-nft"} />
            <img src={"assets/images/10.png"} alt={"santa-nft"} />
            <img src={"assets/images/11.png"} alt={"santa-nft"} />
            <img src={"assets/images/14.png"} alt={"santa-nft"} />
            <img src={"assets/images/15.png"} alt={"santa-nft"} />
            <img src={"assets/images/16.png"} alt={"santa-nft"} />
            <img src={"assets/images/17.png"} alt={"santa-nft"} />
            <img src={"assets/images/19.png"} alt={"santa-nft"} />
            <img src={"assets/images/20.png"} alt={"santa-nft"} />
            <img src={"assets/images/23.png"} alt={"santa-nft"} />
            <img src={"assets/images/24.png"} alt={"santa-nft"} />
            <img src={"assets/images/25.png"} alt={"santa-nft"} />
            <img src={"assets/images/27.png"} alt={"santa-nft"} />
            <img src={"assets/images/28.png"} alt={"santa-nft"} />
            <img src={"assets/images/30.png"} alt={"santa-nft"} />
            <img src={"assets/images/31.png"} alt={"santa-nft"} />
            <img src={"assets/images/33.png"} alt={"santa-nft"} />
            <img src={"assets/images/34.png"} alt={"santa-nft"} />
            <img src={"assets/images/35.png"} alt={"santa-nft"} />
            <img src={"assets/images/36.png"} alt={"santa-nft"} />
            <img src={"assets/images/37.png"} alt={"santa-nft"} />
            <img src={"assets/images/38.png"} alt={"santa-nft"} />
            <img src={"assets/images/40.png"} alt={"santa-nft"} />
          </div>
        </div>
      </div>
      <span className={`mint-button`}>
        <Sprite id="mint-button" width={250} height={70} />
      </span>
    </div>
  );
};

export default Assets;
