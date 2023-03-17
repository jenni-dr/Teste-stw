import React, { useState } from "react";
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
  readonly?:boolean;
  onEnterPresses?: (e: React.KeyboardEvent) => void;
  value: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
};

export const Input: React.FC<InputType> = ({
  type = "text",
  name = "",
  id = `${Date.now()}`,
  className = "",
  disabled,
  label,
  error,
  placeholder,
  mask,
  onEnterPresses = () => { },
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={"m-input-text" + (disabled ? " disabled" : "")}>
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
          onBlur={() => { }}
        />
      ) : (
        <>
          <input
            id={id}
            className={className}
            disabled={disabled}
            value={value}
            onChange={onChange}
            name={name}
            type={showPassword ? "text" : type}
            placeholder={placeholder}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onEnterPresses(e);
              }
            }}
          />
          {type === 'password' &&
            <div style={{position: 'absolute', marginLeft:'-50px',marginTop:'8px', background:'none'}} className="m-btn-icon noselect" onClick={() => setShowPassword(pass => !pass)}>
              <i className="material-icons">{!showPassword ? 'visibility_off' : 'visibility'}</i>
            </div>
          }
        </>
      )}
      <div className="error-message">{error}</div>
    </div>
  );
};
