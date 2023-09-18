import { useState } from "react";

const CardCollapse = ({ header, content, className, children }: any) => {
  const [hidden, setHiden] = useState<Boolean>(false);
  const handleCollapse = () => {
    setHiden(!hidden);
  };
  return (
    <div className={className + 'w-full border-2 relative'}>
      <button className="absolute right-2" onClick={handleCollapse}>
        {hidden ? '+' : '-'}
      </button>
      <div className="header border-b-2">{header}</div>
      {!hidden && <div className="content px-2 py-2">{children}</div>}
    </div>
  );
};

export default CardCollapse;