import { useState, useEffect } from "react";

export const usePasswordValidation = ({
  
    registerPassword = "",
    requiredLength = 8,
      
    }) => {
        const [validLength, setValidLength] = useState(null);
        const [hasNumber, setHasNumber] = useState(null);
        const [upperCase, setUpperCase] = useState(null);
        const [lowerCase, setLowerCase] = useState(null);
        const [specialChar, setSpecialChar] = useState(null);
      
    useEffect(() => {
      
        setValidLength(registerPassword.length >= requiredLength ? true : false);
        setUpperCase(registerPassword.toLowerCase() !== registerPassword);
        setLowerCase(registerPassword.toUpperCase() !== registerPassword);
        setHasNumber(/\d/.test(registerPassword));
        setSpecialChar(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(registerPassword));
      
    }, [registerPassword, requiredLength]);
      
    return [validLength, hasNumber, upperCase, lowerCase, specialChar];
};