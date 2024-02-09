import React, { useState } from "react";

const SortInput = ({ options, defaultOption, onSortChange }) => {
    const [selectedSort, setSelectedSort] = useState(defaultOption);
    const handleSortChange = (e) => {
        const selectedOption = e.target.value;
        setSelectedSort(selectedOption);

        onSortChange(selectedOption);
    };

    return (
        <div className="d-flex flex-column">
            <label htmlFor="sortSelect">Sort by:</label>
            <select id="sortSelect" onChange={handleSortChange} value={selectedSort}>
                <option value="">-- Select Sorting Option --</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SortInput