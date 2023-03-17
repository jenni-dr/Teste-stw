import React from "react";

type CheckboxType = {
  oncolor?: boolean;
  id: string;
  label: string;
  style?: any;
  name?: string;
  value: boolean | any;
  onToggle?: (value: boolean) => void;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};
export const Checkbox: React.FC<CheckboxType> = ({
  oncolor,
  disabled,
  id,
  label,
  style,
  name,
  value = false,
  onChange = () => {},
  onToggle,
}) => {
  return (
    <div className={"m-checkbox" + (oncolor ? " oncolor" : "")} style={style}>
      <input
        id={id}
        disabled={disabled}
        type="checkbox"
        name={name}
        value={value}
        checked={value}
        onChange={(e) => (onToggle ? onToggle(!value) : onChange(e))}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
