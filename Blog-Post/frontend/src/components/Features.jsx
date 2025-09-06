import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";

const Features = () => {
  const [showSidebarFeature, setShowSidebarFeature] = useState(false);

  const handleSidebarFeature = () => {
    setShowSidebarFeature(!showSidebarFeature);
  };

  return (
    <section>
      <nav className="flex flex-col sm:flex-row items-center justify-center gap-15 text-center mt-8 backhro">
        <div className="flex sm:hidden items-center justify-center gap-3 underline mr-auto pl-[60px] cursor-pointer" onClick={handleSidebarFeature}>
          <h1 className="font-semibold text-[20px]">FEATURES</h1>
          <IoIosArrowDown size={24} />
        </div>

        <div id="features" className={`${ showSidebarFeature ? "flex" : "hidden"} flex-col sm:flex sm:flex-row items-start sm:items-center justify-start sm:justify-center sm:gap-18 gap-5 text-left sm:text-center mt-[-40px] sm:mt-0 sm:mr-0 sm:pl-0 mr-auto pl-[60px]`}>
            <span className="cursor-pointer hover:underline underline-offset-3 hover:font-semibold">HOME</span>
            <span className="cursor-pointer hover:underline underline-offset-3 hover:font-semibold">FOLLOWING</span>
            <span className="cursor-pointer hover:underline underline-offset-3 hover:font-semibold">GROUP</span>
            <span className="cursor-pointer hover:underline underline-offset-3 hover:font-semibold">NEWS</span>
            <span className="cursor-pointer hover:underline underline-offset-3 hover:font-semibold">YOU</span>
        </div>
      </nav>
    </section>
  );
};

export default Features;
