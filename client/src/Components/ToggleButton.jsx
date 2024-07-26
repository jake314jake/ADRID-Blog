import React from 'react';
import PropTypes from 'prop-types';

const ToggleButton = ({ isActive, onClick, activeText, inactiveText }) => {
    return (
        <button className={`toggle-button ${isActive ? 'active' : 'inactive'}`} onClick={onClick}>
            {isActive ? activeText : inactiveText}
        </button>
    );
};

ToggleButton.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    activeText: PropTypes.string.isRequired,
    inactiveText: PropTypes.string.isRequired,
};

export default ToggleButton;
