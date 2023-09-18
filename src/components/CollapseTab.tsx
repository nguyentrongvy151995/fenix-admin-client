import { useState } from "react";
type CollapseTab = {
    header: string;
    content: string
}
export default function CollapseTab({header, content} : CollapseTab){
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      <div className="h-96 border border-gray-300 py-4 flex flex-col justify-between transition-all duration-500 cursor-pointer">
        <h1 className="text-xl">
            {header}
        </h1>
        <div>
            {content}
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-32 border border-gray-300 py-4 flex flex-col justify-between transition-all duration-500 cursor-pointer">
        <h1 className="text-xl">{header}</h1>
      </div>
    );
  }
};