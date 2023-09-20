import { useState } from "react";
import IconDelete from "./IconDelete";

const CardCollapse = ({ header, content, className, children, handleDelete }: any) => {
  const [hidden, setHiden] = useState<Boolean>(false);
  const handleCollapse = (e : any) => {
    e.preventDefault()
    setHiden(!hidden);
  };
  return (
    <div className="flex w-full gap-2">
      <div
        className={
          className +
          ' w-full relative border-2 mb-2' +
          (!hidden ? '' : ' border-b-0')
        }
      >
        <a className="absolute right-2 top-3" onClick={handleCollapse}>
          {hidden ? '+' : '-'}
        </a>
        <div className="header border-b-2 py-4 px-2">{header}</div>
        {!hidden && <div className="content px-2 py-2">{children}</div>}
      </div>
      <button className="fhover:text-primary" onClick={handleDelete}>
        <IconDelete />
      </button>
    </div>
  );
};

export default CardCollapse;