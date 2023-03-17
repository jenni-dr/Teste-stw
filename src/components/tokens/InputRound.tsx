import React from "react";
import MaskedInput, { Mask } from "react-text-mask";

type InputType = {
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  mask?: Mask;
  onEnterPresses?: (e: React.KeyboardEvent) => void;
  value: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
};

export const InputRound: React.FC<InputType> = ({
  type = "text",
  name = "",
  id = `${Date.now()}`,
  className = "",
  disabled,
  label,
  error,
  placeholder,
  mask,
  onEnterPresses = () => {},
  value,
  onChange,
}) => {
  return (
    <div className={"m-input-text " + (disabled ? " disabled" : "")}>
      <label htmlFor={id}>{label}</label>
      {mask ? (
        <MaskedInput
          mask={mask}
          placeholder={placeholder}
          guide={false}
          id={id}
          className={className}
          disabled={disabled}
          type={type}
          onChange={onChange}
          value={value}
          name={name}
          onBlur={() => {}}
        />
      ) : (
        <input
          style={{ borderRadius: "48px", paddingLeft:'50px',marginBottom:'20px', background:'white' }}
          id={id}
          className={className}
          disabled={disabled}
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          placeholder={placeholder}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onEnterPresses(e);
            }
          }}
        />
      )}
      {/* <div style={{ position: "absolute", top: "1.20rem", left: '2rem'}}>
        <i className="material-icons">search</i>
      </div> */}
      
      <div className="error-message">{error}</div>
    </div>
  );
};
