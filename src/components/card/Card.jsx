import React from "react";
import './Card.css'

function Card({ color, heading, data,text }) {
  return (
    <div className={`container text-center bg-${color} text-${text} m-2 border rounded countCard`}>
      <h4 className="pt-3">{heading}</h4>
      <p className="h5 pb-2">{data}</p>
    </div>
  );
}

export default Card;
