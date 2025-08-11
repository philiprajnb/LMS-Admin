import React from "react";
import styles from "../Cards/Cards.module.css"

const Card = (props) => {

  return (
      <>
        <div className={`card border-primary mb-3 rounded shadow cursor-pointer ${styles.flipper} ${props.active?styles.isFlipped:null} `} style={{minHeight:props.minHeight}} title={props.title} onClick={(e)=>{props.onCardClick()}} >
            <div className={"card-body text-center"}>
                <h1>{props.number}</h1>
                <p className={"card-text"}>{props.name}</p>
             </div>
        </div>
      </>
    );
};

export default Card;