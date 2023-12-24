import React from "react";

import styles from "./Coment.module.css"


const Coment = ({coment}) => { // обертаєм елемент в observe() щоб відслідковувать змінні в реальному часі   

    return(
        <div>
            Комент {coment.id}
        </div>
    );
};

export default Coment;