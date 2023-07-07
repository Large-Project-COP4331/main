import { useState, useEffect } from "react";

export const useEmailValidation = ({
  
    registerEmail = "",
    //requiredLength = 8,
      
    }) => {
        const [validEmail, setValidEmail] = useState(null);
        //const [validLength, setValidLength] = useState(null);
        //const [hasNumber, setHasNumber] = useState(null);
        //const [upperCase, setUpperCase] = useState(null);
        //const [lowerCase, setLowerCase] = useState(null);
        //const [specialChar, setSpecialChar] = useState(null);
      
    useEffect(() => {
      
        setValidEmail(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(registerEmail));
        //setValidLength(registerEmail.length >= requiredLength ? true : false);
        //setUpperCase(registerEmail.toLowerCase() !== registerEmail);
        //setLowerCase(registerEmail.toUpperCase() !== registerEmail);
        //setHasNumber(/\d/.test(registerEmail));
        //setSpecialChar(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(registerEmail));
      
    }, [registerEmail]);
      
    return [validEmail];
};