import { useState, useEffect } from "react";

export const useNumberValidation = ({
  
    registerNumber = "",
      
    }) => {
        const [validNumber, setValidNumber] = useState(null);
      
    useEffect(() => {
      
        setValidNumber(/^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/.test(registerNumber));
      
    }, [registerNumber]);
      
    return [validNumber];
};
