import sprite from './icons/icons.svg';

const Sprite = (props) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      style={{ ...props.style }}
      className={`${props.className || ""}`}
    >
        <use href={`${sprite}#${props.id}`} />
    </svg>
  );
};

export default Sprite;
