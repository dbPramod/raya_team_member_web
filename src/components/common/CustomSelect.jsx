import React, { useEffect, useMemo, useRef, useState } from 'react';

const normalizeOption = (option) => {
  if (typeof option === 'string') {
    return { value: option, label: option };
  }

  return option;
};

const CustomSelect = ({
  options = [],
  value = '',
  onChange,
  placeholder = 'Select option',
  name,
  className = '',
  menuClassName = '',
  optionClassName = '',
  disabled = false,
  fullWidth = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const normalizedOptions = useMemo(() => options.map(normalizeOption), [options]);
  const selectedOption = normalizedOptions.find((option) => option.value === value);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = (nextValue) => {
    onChange?.({ target: { value: nextValue, name } });
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`custom-pop-select ${fullWidth ? 'w-100' : ''} ${disabled ? 'disabled' : ''} ${className}`.trim()}
    >
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <button
        type="button"
        className={`custom-pop-select-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        disabled={disabled}
      >
        <span className={`custom-pop-select-label ${selectedOption ? 'selected' : 'placeholder'}`}>
          {selectedOption?.label || placeholder}
        </span>
        <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'} custom-pop-select-icon`}></i>
      </button>

      {isOpen ? (
        <div className={`custom-pop-select-menu ${menuClassName}`.trim()}>
          {normalizedOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`custom-pop-select-option ${value === option.value ? 'selected' : ''} ${optionClassName}`.trim()}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CustomSelect;
