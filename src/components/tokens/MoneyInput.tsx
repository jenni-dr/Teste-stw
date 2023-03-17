import React from 'react';
import { Money } from '../../services';

type MoneyInputType = {
    name?: string,
    id?: string,
    className?: string,
    disabled?: boolean,
    label: string,
    placeholder?: string,
    onEnterPresses?: (e: React.KeyboardEvent) => void,
    value: any,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    error?: string
}

export const MoneyInput: React.FC<MoneyInputType> = (
    {
        name = "", id = "", className = "", disabled, label,
        error, placeholder, onEnterPresses = () => { },
        value, onChange
    }) => {

    function getRawValue(value: string) {
        if (!value) {
            return 0
        }
        let val: number | string = value.replace(/\D/g, '');
        val = Number(val);
        return val / 100
    }

    function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.value = `${getRawValue(e.target.value)}`;
        onChange(e);
    }

    return (
        <div className="m-input-text">
            <label htmlFor={id}>{label}</label>
            <input id={id} className={className} disabled={disabled}
                value={Money.floatToMoneyWithCurrency(value && !isNaN(value) ? Number(value) : value)} onChange={inputChange} name={name}
                type="text" placeholder={placeholder} onKeyPress={e => {
                    if (e.key === 'Enter') {
                        onEnterPresses(e);
                    }
                }} />
            <div className='error-message'>{error}</div>
        </div>
    )
}