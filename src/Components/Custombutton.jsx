const Custombutton = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`rounded-[10px] px-5 py-2 font-epilogue text-[16px] font-semibold leading-[35px] text-white ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Custombutton