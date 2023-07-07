import { useState, useEffect } from "react";

export const useUsernameValidation = ({
  
    registerUsername = "",
    requiredLength = 8,
      
    }) => {
        const [validLength, setValidLength] = useState(null);
        const [hasNumber, setHasNumber] = useState(null);
        const [upperCase, setUpperCase] = useState(null);
        const [lowerCase, setLowerCase] = useState(null);
      
    useEffect(() => {
      
        setValidLength(registerUsername.length >= requiredLength ? true : false);
        setUpperCase(registerUsername.toLowerCase() !== registerUsername);
        setLowerCase(registerUsername.toUpperCase() !== registerUsername);
        setHasNumber(/\d/.test(registerUsername));
      
    }, [registerUsername, requiredLength]);
      
    return [validLength, hasNumber, upperCase, lowerCase];
};