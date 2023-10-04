import React from 'react';

type RadioButtonProps = {
    label: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
};

export default function BARadioButton(props: RadioButtonProps) {
    const {label, name, value, checked, onChange} = props
    return (
        <label className="flex items-center space-x-2 ">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
                className="text-teal-700"
            />
            <span className="text-white text-xl p-1">{label}</span>
        </label>
    );
};

