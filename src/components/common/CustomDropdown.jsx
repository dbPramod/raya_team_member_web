import { Form } from 'react-bootstrap';

const CustomDropdown = ({
    id, label, value, placeholder, options, onSelect, error, disabled = false, labelKey, valueKey, openDropdown, setOpenDropdown, dropdownSearch, setDropdownSearch
}) => {
    const isOpen = openDropdown === id;
    const searchValue = dropdownSearch[id] || '';
    const supportsSearch = ['country', 'state', 'city'].includes(id);

    const filteredOptions = supportsSearch
        ? options.filter((opt) => {
            const optionLabel = String(labelKey ? opt[labelKey] : opt).toLowerCase();
            return optionLabel.includes(searchValue.toLowerCase());
        })
        : options;

    const toggle = () => {
        if (!disabled) {
            setOpenDropdown(isOpen ? null : id);
            if (isOpen) {
                setDropdownSearch((prev) => ({ ...prev, [id]: '' }));
            }
        }
    };

    const displayLabel = value
        ? (labelKey ? options.find(o => o[valueKey] === value)?.[labelKey] || value : value)
        : placeholder;

    return (
        <Form.Group className="mb-4">
            <Form.Label className="fw-medium small mb-2" style={{ color: 'var(--color-text-black)' }}>{label}</Form.Label>
            <div className="position-relative">
                <div
                    className={`py-3 px-4 rounded-3 bg-white shadow-sm d-flex justify-content-between align-items-center pointer transition-all${disabled ? ' opacity-50' : ''}${error ? ' border border-danger' : ''}`}
                    onClick={toggle}
                    style={{ fontSize: '0.95rem', color: value ? '#0f172a' : '#6c757d', fontWeight: value ? '500' : '400', userSelect: 'none' }}
                >
                    <span>{displayLabel}</span>
                    <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'} text-muted`}></i>
                </div>
                {isOpen && (
                    <div
                        className="position-absolute w-100 mt-1 bg-white rounded-3 shadow-lg overflow-auto"
                        style={{ zIndex: 1050, border: '1px solid #f1f5f9', maxHeight: '220px' }}
                    >
                        {supportsSearch ? (
                            <div className="px-3 pt-3 pb-2 bg-white sticky-top">
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={(event) => setDropdownSearch((prev) => ({ ...prev, [id]: event.target.value }))}
                                    placeholder={`Search ${label.toLowerCase()}`}
                                    className="form-control border-0 shadow-none complete-profile-dropdown-search"
                                />
                            </div>
                        ) : null}
                        {filteredOptions.map((opt) => {
                            const optValue = valueKey ? opt[valueKey] : opt;
                            const optLabel = labelKey ? opt[labelKey] : opt;
                            const isSelected = value === optValue;
                            return (
                                <div
                                    key={optValue}
                                    className="px-4 py-3 pointer dropdown-item-custom"
                                    style={{
                                        backgroundColor: isSelected ? '#f0f9fa' : 'transparent',
                                        color: isSelected ? '#40878e' : '#334155',
                                        fontWeight: isSelected ? '600' : '400',
                                        fontSize: '0.95rem'
                                    }}
                                    onClick={() => {
                                        onSelect(optValue);
                                        setOpenDropdown(null);
                                        setDropdownSearch((prev) => ({ ...prev, [id]: '' }));
                                    }}
                                >
                                    {optLabel}
                                </div>
                            );
                        })}
                        {filteredOptions.length === 0 ? (
                            <div className="px-4 py-3 text-muted small">No results found.</div>
                        ) : null}
                    </div>
                )}
            </div>
            {error && <div className="text-danger small mt-1">{error}</div>}
        </Form.Group>
    );
};

export default CustomDropdown;
