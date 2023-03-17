import React from 'react';

type TextAreaType = {
    name?: string,
    id?: string,
    className?: string,
    disabled?: boolean,
    label: string,
    placeholder?: string,
    value: any,
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>,
    error?: string,
    rows?: number
}

export const TextArea: React.FC<TextAreaType> = ({ name = "", id = "", className = "", disabled, label, error, placeholder, value, rows = 4, onChange }) => {

    return (
        <div className="m-input-textarea">
            <label htmlFor={id}>{label}</label>
            <textarea rows={rows} id={id} className={className} disabled={disabled}
                value={value} onChange={onChange} name={name}
                placeholder={placeholder} />
            <div className='error-message'>{error}</div>
        </div>
    )
}