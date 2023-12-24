import React, { useState } from "react";
import PaginationBtn from "../PaginationBtn/PaginationBtn";


const BtnPageList = ({ activePage, pageCount, changePageFunc }) => {
  const [customPage, setCustomPage] = useState("");
  // {/* index === 1 || index >= activePage - 3 || index != activePage || index <= activePage + 3 || index === pageCount  */}
  
  return (
    <div>
      {Array.from({ length: pageCount }).map((_, index) => 

      index + 1 === 1 || index + 1 <= activePage + 1 && index + 1 >=activePage - 3 && index + 1 != activePage || index + 1 >= activePage + 1 && index + 1 <=activePage + 3 ||  index + 1 === pageCount
      ? (
        <PaginationBtn key={index + 1} btnNumber={index + 1} funcOnClick={() => changePageFunc(index + 1)} />
      ): null
      )}
      
      <input
        type="text"
        placeholder="Go to page"
        value={customPage}
        onChange={(elem) => setCustomPage(elem.target.value)}
      />
      <button onClick={() => 
      {
        setCustomPage("");
        changePageFunc(parseInt(customPage));
      }}>Go</button>

    </div>
  );  
};

export default BtnPageList;
