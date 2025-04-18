
import React from 'react';

type FilterGroupProps = {
    title: string;
    options: string[];
    selected: string;
    onChange: (value: string) => void;
};

const FilterGroup: React.FC<FilterGroupProps> = ({ title, options, selected, onChange }) => {
    return (
        <div style={{ marginBottom: 20 }}>
            <h4 style={{ fontWeight: 'bold', marginBottom: "10px" }}>{title}</h4>
            {options.map(option => (
                <div key={option} >
                    <label style={{ cursor: 'pointer' }}>
                        <input
                            type="radio"
                            name={title}
                            value={option}
                            checked={selected === option}
                            onChange={() => onChange(option)}
                        />
                        {' '}{option}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default FilterGroup;
