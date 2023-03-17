type SwitchType = {
  id: string;
  label?: string;
  name?: string;
  disabled?: boolean;
  value: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onToggle?: (value: boolean) => void;
};

export const Switch: React.FC<SwitchType> = ({
  id,
  disabled,
  value,
  onChange = () => {},
  name,
  onToggle,
  label,
}) => {
  return (
    <div className="d-flex align-items-center">
      <div
        className={
          "m-switch" + (value ? " on" : "") + (disabled ? " disabled" : "")
        }
      >
        <input
          type="checkbox"
          id={id}
          disabled={disabled}
          checked={value}
          onChange={(e) => (onToggle ? onToggle(!value) : onChange(e))}
          value={value}
          name={name}
        />
        <label htmlFor={id}>
          <div className="switch-container">
            <div className="switch-round"></div>
          </div>
        </label>
      </div>
      {label && <div className="switch-label ml-2">{label}</div>}
    </div>
  );
};
