import React from "react";
 
const ToggleSwitch = ({isOn, handleToggle, onColor}) => {
    return (
        <>
          <input
            checked={isOn}
            onChange={handleToggle}
            className="react-switch-checkbox"
            id={`react-switch-new`}
            type="checkbox"
          />
          <label
            style={{ background: isOn && onColor }}
            className="react-switch-label"
            htmlFor={`react-switch-new`}
          >
            <span className='word'/>
            <span className={`react-switch-button`} />
          </label>
        </>
      );
};
 
export default ToggleSwitch;
