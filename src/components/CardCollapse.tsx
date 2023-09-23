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
          ' w-full relative border-indigo-600 border-stroke border mb-2 rounded-md'
        }
      >
        <a
          className="absolute right-2 top-3 cursor-pointer caret-transparent text-[32px] text-white"
          onClick={handleCollapse}
        >
          {hidden ? '+' : '-'}
        </a>
        <div
          className={
            'header py-4 px-2 bg-[#3b50e0] text-[#fff] uppercase font-semibold caret-transparent cursor-pointer' +
            (!hidden ? ' border-b' : '')
          }
          onClick={handleCollapse}
        >
          {header}
        </div>
        <div className={'content py-2 ' + (hidden && 'hidden')}>{children}</div>
      </div>
      <button className="fhover:text-primary" onClick={handleDelete}>
        <IconDelete />
      </button>
    </div>
  );
};

export default CardCollapse;