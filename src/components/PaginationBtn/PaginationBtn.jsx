import React from "react";

import { Link } from "react-router-dom";

const PaginationBtn = ({ btnNumber, funcOnClick}) => {    

    return(
        <>
            <button onClick={funcOnClick}>*{btnNumber}*</button>
        </>
    );
};

export default PaginationBtn;