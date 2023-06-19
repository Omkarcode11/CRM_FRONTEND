import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function Error() {
  let code = localStorage.getItem("Error") || 404


  return (
    <div>
      <img className="w-100 h-75" src="/11104.jpg" />
      <h1 className="text-center">{code}</h1>
    </div>
  );
}

export default Error;
