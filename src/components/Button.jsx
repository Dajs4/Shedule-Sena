import React from "react";
import '../styles/Button.css'

function Button ({ onClick, children, type = "button", disabled = false, className = "" }){
    return (
      <button type={type} onClick={onClick} disabled={disabled} className={`boton ${className}`.trim()}>
        {children}
      </button>
    );
};
  
export default Button;