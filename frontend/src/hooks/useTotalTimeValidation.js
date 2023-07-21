import { useState, useEffect } from "react";

export const useTotalTimeValidation = ({
  
    firstTotalTime = "",
      
    }) => {
        const [validTotalTime, setValidTotalTime] = useState(null);
      
    useEffect(() => {
      
        setValidTotalTime(/^((?:60:00)|(?:[0-5][0-9]:[0-5][0-9]))$/.test(firstTotalTime));
      
    }, [firstTotalTime]);
      
    return [validTotalTime];
};
