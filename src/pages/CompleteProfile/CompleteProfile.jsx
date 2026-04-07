import { useState, useRef } from 'react';
import { Container, Row, Col, Form, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import appLogo from '../../assets/images/applogo.png';
import locationData from '../../data/locationData.json';
import { STRINGS } from '../../constants/strings';

/**
 * [CRITICAL] 
 * I have moved the location data into 'src/data/locationData.json' 
 * as requested to keep this component clean and maintainable.
 */

const CompleteProfile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [step, setStep] = useState(1);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [timezones, setTimezones] = useState([]);
    const [selectedTimezone, setSelectedTimezone] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [hiringDate, setHiringDate] = useState(null);

    // Custom dropdown open states
    const [openDropdown, setOpenDropdown] = useState(null); // 'gender' | 'timezone' | 'country' | 'state' | 'city'

    const TIMEZONES = [
        'Pacific Time - US & Canada',
        'Mountain Time',
        'Central Time',
        'Eastern Time',
        'Atlantic Time',
        'Alaska Time',
        'Hawaii–Aleutian Time',
        'Newfoundland Time',
        '(GMT+00:00) London',
        '(GMT+05:30) India Standard Time',
        '(GMT+08:00) Beijing',
        '(GMT+09:00) Tokyo',
    ];

    // Validation States
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [phonePrefix, setPhonePrefix] = useState('+1');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [errors, setErrors] = useState({});

    // Step 2 States
    const [isMarried, setIsMarried] = useState('');
    const [hasKids, setHasKids] = useState('');
    const [hasPets, setHasPets] = useState('');
    const [favoriteFlower, setFavoriteFlower] = useState('');
    const [favoriteCake, setFavoriteCake] = useState('');
    const [favoriteOnlineStore, setFavoriteOnlineStore] = useState('');
    const [favoriteLocalBusiness, setFavoriteLocalBusiness] = useState('');
    const [favoriteRestaurant, setFavoriteRestaurant] = useState('');

    const countriesList = locationData.country;
    const statesList = selectedCountry ? locationData.states[selectedCountry] : [];
    const citiesList = selectedState ? (locationData.cities?.[selectedState] || []) : [];

    const handleCountryChange = (e) => {
        const countryCode = e.target.value;
        setSelectedCountry(countryCode);
        setSelectedState('');
        setSelectedCity('');

        // NOTE: Dynamic timezone fetching is disabled until @countrystatecity/timezones is installed.
        /*
        if (countryCode) {
            try {
                const tzData = await getTimezonesByCountry(countryCode);
                setTimezones(tzData || []);
            } catch (error) {
                console.error("Failed to fetch timezones:", error);
                setTimezones([]);
            }
        } else {
            setTimezones([]);
        }
        */
    };

    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        console.log('State selection changed to:', stateCode);
        setSelectedState(stateCode);
        setSelectedCity('');
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = (e) => {
        e.stopPropagation();
        setProfileImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };
    const validateStep1 = () => {
        const newErrors = {};
        const { ERRORS } = STRINGS.COMPLETE_PROFILE;
        if (!name.trim()) newErrors.name = ERRORS.NAME_REQUIRED;
        else if (name.trim().length < 2) newErrors.name = ERRORS.NAME_MIN;

        if (!gender || gender === STRINGS.COMPLETE_PROFILE.GENDER.PLACEHOLDER) newErrors.gender = ERRORS.GENDER_REQUIRED;
        if (!birthDate) newErrors.birthDate = ERRORS.BIRTH_DATE_REQUIRED;

        if (!phone.trim()) newErrors.phone = ERRORS.PHONE_REQUIRED;
        else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) newErrors.phone = ERRORS.PHONE_INVALID;

        if (!hiringDate) newErrors.hiringDate = ERRORS.HIRING_DATE_REQUIRED;
        if (!selectedTimezone || selectedTimezone === STRINGS.COMPLETE_PROFILE.TIMEZONE.PLACEHOLDER) newErrors.selectedTimezone = ERRORS.TIMEZONE_REQUIRED;
        if (!address.trim()) newErrors.address = ERRORS.ADDRESS_REQUIRED;

        if (!selectedCountry) newErrors.selectedCountry = ERRORS.COUNTRY_REQUIRED;
        if (!selectedState) newErrors.selectedState = ERRORS.STATE_REQUIRED;
        if (!selectedCity) newErrors.selectedCity = ERRORS.CITY_REQUIRED;

        if (!zipCode.trim()) newErrors.zipCode = ERRORS.ZIP_REQUIRED;
        else if (zipCode.trim().length < 5) newErrors.zipCode = ERRORS.ZIP_INVALID;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        const { ERRORS } = STRINGS.COMPLETE_PROFILE;

        if (!isMarried) newErrors.isMarried = ERRORS.SELECTION_REQUIRED;
        if (!hasKids) newErrors.hasKids = ERRORS.SELECTION_REQUIRED;
        if (!hasPets) newErrors.hasPets = ERRORS.SELECTION_REQUIRED;

        // Favorites are optional for now, but we can add validation here if needed

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = () => {
        if (step === 1) {
            if (validateStep1()) {
                setStep(2);
                setErrors({});
            }
        } else {
            if (validateStep2()) {
                // Final submission logic
                console.log('Final Data:', {
                    name, gender, birthDate, phone, hiringDate, selectedTimezone, address, selectedCountry, selectedState, selectedCity, zipCode,
                    isMarried, hasKids, hasPets, favoriteFlower, favoriteCake, favoriteOnlineStore, favoriteLocalBusiness, favoriteRestaurant
                });
                navigate('/');
            }
        }
    };

    // Reusable custom dropdown renderer
    const renderCustomDropdown = ({
        id, label, value, placeholder, options, onSelect, error, disabled = false, labelKey, valueKey
    }) => {
        const isOpen = openDropdown === id;
        const toggle = () => {
            if (!disabled) setOpenDropdown(isOpen ? null : id);
        };
        const displayLabel = value
            ? (labelKey ? options.find(o => o[valueKey] === value)?.[labelKey] || value : value)
            : placeholder;
        return (
            <Form.Group className="mb-4">
                <Form.Label className="fw-medium small mb-2">{label}</Form.Label>
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
                            {options.map((opt) => {
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
                                        onClick={() => { onSelect(optValue); setOpenDropdown(null); }}
                                    >
                                        {optLabel}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                {error && <div className="text-danger small mt-1">{error}</div>}
            </Form.Group>
        );
    };

    const renderStepOne = () => {
        const { COMPLETE_PROFILE } = STRINGS;
        return (
            <div className="mx-auto d-flex flex-column" style={{ maxWidth: '600px', minHeight: 'auto' }}>
                <div className="text-center mb-4 flex-shrink-0">
                    <Badge
                        pill
                        className="py-2 px-3 fw-medium border border-dark border-opacity-25 bg-transparent text-dark mb-4"
                        style={{ letterSpacing: '1px', fontSize: '0.75rem' }}
                    >
                        {COMPLETE_PROFILE.STEP_1}
                    </Badge>
                    <h2 className="fw-bold mb-2" style={{ color: '#0f1d3a', fontSize: '2.25rem' }}>{COMPLETE_PROFILE.TITLE}</h2>
                    <p className="text-muted small">{COMPLETE_PROFILE.SUBTITLE}</p>
                </div>

                <Form className="mt-2 d-flex flex-column overflow-hidden flex-grow-1" style={{ maxHeight: 'calc(100vh - 250px)' }}>
                    <div className="flex-grow-1 overflow-auto pe-3 custom-scrollbar mb-4">
                        {/* Name */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-medium small mb-2">{COMPLETE_PROFILE.NAME.LABEL}</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                isInvalid={!!errors.name}
                                placeholder={COMPLETE_PROFILE.NAME.PLACEHOLDER}
                                className="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                                style={{ fontSize: '0.95rem' }}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Gender */}
                        {renderCustomDropdown({
                            id: 'gender',
                            label: COMPLETE_PROFILE.GENDER.LABEL,
                            value: gender,
                            placeholder: COMPLETE_PROFILE.GENDER.PLACEHOLDER,
                            options: COMPLETE_PROFILE.GENDER.OPTIONS,
                            onSelect: setGender,
                            error: errors.gender
                        })}

                        {/* Profile Photo Upload */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-medium small mb-2">{COMPLETE_PROFILE.PHOTO.LABEL}</Form.Label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                hidden
                                accept="image/*"
                            />
                            <div
                                onClick={handleUploadClick}
                                className="border border-2 border-dashed rounded-4 p-4 text-center bg-white bg-opacity-50 pointer transition-all shadow-sm overflow-hidden"
                                style={{ borderColor: '#D1D5DB', minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            >
                                {!profileImage ? (
                                    <div>
                                        <div className="mb-3">
                                            <i className="bi bi-upload fs-3 text-muted"></i>
                                        </div>
                                        <p className="small text-muted mb-0">{COMPLETE_PROFILE.PHOTO.HINT}</p>
                                    </div>
                                ) : (
                                    <div className="position-relative w-100 h-100 py-2">
                                        <img
                                            src={profileImage}
                                            alt="Profile Preview"
                                            className="rounded-3 shadow-sm"
                                            style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'cover' }}
                                        />
                                        <button
                                            onClick={handleRemoveImage}
                                            className="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle translate-middle mt-2 me-n2 shadow-sm"
                                            style={{ width: '24px', height: '24px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <i className="bi bi-x fs-6"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Form.Group>

                        {/* Birth Date */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-medium small mb-2">{COMPLETE_PROFILE.BIRTH_DATE.LABEL}</Form.Label>
                            <div className="position-relative">
                                <Form.Control
                                    type="date"
                                    value={birthDate ? birthDate.toISOString().split('T')[0] : ''}
                                    onChange={(e) => setBirthDate(e.target.value ? new Date(e.target.value) : null)}
                                    isInvalid={!!errors.birthDate}
                                    className="py-3 px-4 border-white shadow-sm rounded-3 bg-white ps-5"
                                    style={{ fontSize: '0.95rem' }}
                                />
                                <i className="bi bi-calendar position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                                <Form.Control.Feedback type="invalid">{errors.birthDate}</Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        {/* Phone Number */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-medium small mb-2">{COMPLETE_PROFILE.PHONE.LABEL}</Form.Label>
                            <Row className="gx-2">
                                <Col xs={4}>
                                    <Form.Select
                                        value={phonePrefix}
                                        onChange={(e) => setPhonePrefix(e.target.value)}
                                        className="py-3 px-2 border-white shadow-sm rounded-3 bg-white text-muted"
                                        style={{ fontSize: '0.85rem' }}
                                    >
                                        {countriesList.map(c => (
                                            <option key={c.isoCode} value={c.phoneCode}>
                                                {c.flag} {c.phoneCode}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col xs={8}>
                                    <Form.Control
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        isInvalid={!!errors.phone}
                                        placeholder={COMPLETE_PROFILE.PHONE.PLACEHOLDER}
                                        className="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                                        style={{ fontSize: '0.95rem' }}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                                </Col>
                            </Row>
                        </Form.Group>

                        {/* Hiring Date */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-medium small mb-2">{COMPLETE_PROFILE.HIRING_DATE.LABEL}</Form.Label>
                            <div className="position-relative">
                                <Form.Control
                                    type="date"
                                    value={hiringDate ? hiringDate.toISOString().split('T')[0] : ''}
                                    onChange={(e) => setHiringDate(e.target.value ? new Date(e.target.value) : null)}
                                    isInvalid={!!errors.hiringDate}
                                    className="py-3 px-4 border-white shadow-sm rounded-3 bg-white ps-5"
                                    style={{ fontSize: '0.95rem' }}
                                />
                                <i className="bi bi-calendar-event position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                                <Form.Control.Feedback type="invalid">{errors.hiringDate}</Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        {/* Time Zone */}
                        {renderCustomDropdown({
                            id: 'timezone',
                            label: COMPLETE_PROFILE.TIMEZONE.LABEL,
                            value: selectedTimezone,
                            placeholder: COMPLETE_PROFILE.TIMEZONE.PLACEHOLDER,
                            options: TIMEZONES,
                            onSelect: setSelectedTimezone,
                            error: errors.selectedTimezone
                        })}

                        {/* Address */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-medium small mb-2">{COMPLETE_PROFILE.ADDRESS.LABEL}</Form.Label>
                            <Form.Control
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                isInvalid={!!errors.address}
                                placeholder={COMPLETE_PROFILE.ADDRESS.PLACEHOLDER}
                                className="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                                style={{ fontSize: '0.95rem' }}
                            />
                            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                        </Form.Group>


                        {/* Country */}
                        {renderCustomDropdown({
                            id: 'country',
                            label: COMPLETE_PROFILE.COUNTRY.LABEL,
                            value: selectedCountry,
                            placeholder: COMPLETE_PROFILE.COUNTRY.PLACEHOLDER,
                            options: countriesList,
                            onSelect: (val) => { handleCountryChange({ target: { value: val } }); },
                            error: errors.selectedCountry,
                            labelKey: 'name',
                            valueKey: 'isoCode'
                        })}


                        {/* State */}
                        {renderCustomDropdown({
                            id: 'state',
                            label: COMPLETE_PROFILE.STATE.LABEL,
                            value: selectedState,
                            placeholder: COMPLETE_PROFILE.STATE.PLACEHOLDER,
                            options: statesList,
                            onSelect: (val) => { handleStateChange({ target: { value: val } }); },
                            error: errors.selectedState,
                            disabled: !selectedCountry,
                            labelKey: 'name',
                            valueKey: 'isoCode'
                        })}



                        {/* City */}
                        {renderCustomDropdown({
                            id: 'city',
                            label: COMPLETE_PROFILE.CITY.LABEL,
                            value: selectedCity,
                            placeholder: COMPLETE_PROFILE.CITY.PLACEHOLDER,
                            options: citiesList,
                            onSelect: setSelectedCity,
                            error: errors.selectedCity,
                            disabled: !selectedState
                        })}

                        {/* ZIP Code */}
                        <Form.Group className="mb-5">
                            <Form.Label className="fw-medium small mb-2">{COMPLETE_PROFILE.ZIP.LABEL}</Form.Label>
                            <Form.Control
                                type="text"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                isInvalid={!!errors.zipCode}
                                placeholder={COMPLETE_PROFILE.ZIP.PLACEHOLDER}
                                className="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                                style={{ fontSize: '0.95rem' }}
                            />
                            <Form.Control.Feedback type="invalid">{errors.zipCode}</Form.Control.Feedback>
                        </Form.Group>



                        {/* Relocated Navigation Buttons */}
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-2">
                            <button
                                onClick={() => navigate('/login')}
                                className="btn btn-outline-secondary px-5 py-2 rounded-3 border-secondary border-opacity-50 fs-5 text-muted d-flex align-items-center gap-2"
                                style={{ color: '#6B7280' }}
                            >
                                <i className="bi bi-chevron-left"></i> {COMPLETE_PROFILE.BUTTONS.BACK}
                            </button>
                            <button
                                type="button"
                                onClick={handleContinue}
                                className="btn border-0 px-5 py-2 rounded-3 fs-5 text-white d-flex align-items-center gap-2 shadow-sm"
                                style={{ backgroundColor: '#40878E' }}
                            >
                                {COMPLETE_PROFILE.BUTTONS.CONTINUE} <i className="bi bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    };
    const renderStepTwo = () => {
        const { COMPLETE_PROFILE } = STRINGS;
        const { LIFESTYLE, FAVORITES, BUTTONS } = COMPLETE_PROFILE;

        const renderRadioGroup = (label, value, setter, error) => (
            <Form.Group className="mb-4">
                <Form.Label className="fw-medium small mb-3 d-block text-dark opacity-75">{label}</Form.Label>
                <div className="d-flex gap-4">
                    <Form.Check
                        type="radio"
                        label={LIFESTYLE.YES}
                        name={label}
                        id={`${label}-yes`}
                        checked={value === 'Yes'}
                        onChange={() => { setter('Yes'); setErrors(prev => ({ ...prev, [error]: null })); }}
                        className="custom-radio"
                        isInvalid={!!errors[error]}
                    />
                    <Form.Check
                        type="radio"
                        label={LIFESTYLE.NO}
                        name={label}
                        id={`${label}-no`}
                        checked={value === 'No'}
                        onChange={() => { setter('No'); setErrors(prev => ({ ...prev, [error]: null })); }}
                        className="custom-radio"
                        isInvalid={!!errors[error]}
                    />
                </div>
                {errors[error] && <div className="text-danger small mt-2">{errors[error]}</div>}
            </Form.Group>
        );

        return (
            <div className="mx-auto d-flex flex-column" style={{ maxWidth: '600px', minHeight: 'auto' }}>
                <div className="text-center mb-4 flex-shrink-0">
                    <Badge
                        pill
                        className="py-2 px-3 fw-medium border border-dark border-opacity-25 bg-transparent text-dark mb-4"
                        style={{ letterSpacing: '1px', fontSize: '0.75rem' }}
                    >
                        {COMPLETE_PROFILE.STEP_2}
                    </Badge>
                    <h2 className="fw-bold mb-2" style={{ color: '#0f1d3a', fontSize: '2.25rem' }}>{COMPLETE_PROFILE.TITLE}</h2>
                    <p className="text-muted small">{COMPLETE_PROFILE.SUBTITLE}</p>
                </div>

                <Form className="mt-2 d-flex flex-column overflow-hidden flex-grow-1" style={{ maxHeight: 'calc(100vh - 250px)' }}>
                    <div className="flex-grow-1 overflow-auto pe-3 custom-scrollbar mb-4">
                        {renderRadioGroup(LIFESTYLE.MARRIED, isMarried, setIsMarried, 'isMarried')}
                        {renderRadioGroup(LIFESTYLE.KIDS, hasKids, setHasKids, 'hasKids')}
                        {renderRadioGroup(LIFESTYLE.PETS, hasPets, setHasPets, 'hasPets')}

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-medium small mb-2 text-dark opacity-75">{FAVORITES.FLOWER.LABEL}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={FAVORITES.FLOWER.PLACEHOLDER}
                                value={favoriteFlower}
                                onChange={(e) => setFavoriteFlower(e.target.value)}
                                className="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                                style={{ fontSize: '0.95rem' }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-medium small mb-2 text-dark opacity-75">{FAVORITES.CAKE.LABEL}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={FAVORITES.CAKE.PLACEHOLDER}
                                value={favoriteCake}
                                onChange={(e) => setFavoriteCake(e.target.value)}
                                className="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                                style={{ fontSize: '0.95rem' }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-medium small mb-2 text-dark opacity-75">{FAVORITES.STORE.LABEL}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={FAVORITES.STORE.PLACEHOLDER}
                                value={favoriteOnlineStore}
                                onChange={(e) => setFavoriteOnlineStore(e.target.value)}
                                className="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                                style={{ fontSize: '0.95rem' }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-medium small mb-2 text-dark opacity-75">{FAVORITES.BUSINESS.LABEL}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={FAVORITES.BUSINESS.PLACEHOLDER}
                                value={favoriteLocalBusiness}
                                onChange={(e) => setFavoriteLocalBusiness(e.target.value)}
                                className="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                                style={{ fontSize: '0.95rem' }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-medium small mb-2 text-dark opacity-75">{FAVORITES.RESTAURANT.LABEL}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={FAVORITES.RESTAURANT.PLACEHOLDER}
                                value={favoriteRestaurant}
                                onChange={(e) => setFavoriteRestaurant(e.target.value)}
                                className="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                                style={{ fontSize: '0.95rem' }}
                            />
                        </Form.Group>

                        {/* Navigation Buttons */}
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-2">
                            <button
                                type="button"
                                onClick={() => { setStep(1); setErrors({}); }}
                                className="btn btn-outline-secondary px-5 py-2 rounded-3 border-secondary border-opacity-50 fs-5 text-muted d-flex align-items-center gap-2"
                                style={{ color: '#6B7280' }}
                            >
                                <i className="bi bi-chevron-left"></i> {BUTTONS.BACK}
                            </button>
                            <button
                                type="button"
                                onClick={handleContinue}
                                className="btn border-0 px-5 py-2 rounded-3 fs-5 text-white d-flex align-items-center gap-2 shadow-sm"
                                style={{ backgroundColor: '#40878E' }}
                            >
                                {BUTTONS.CONTINUE} <i className="bi bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    };


    return (
        <div className="min-vh-100 bg-login-gradient p-4 p-md-5 overflow-auto">
            {/* Logo */}
            <div className="mb-5 ms-md-4">
                <img
                    src={appLogo}
                    alt="Swann Ave"
                    height="32"
                    className="pointer"
                    onClick={() => navigate('/')}
                />
            </div>

            <Container className="mt-5">
                {step === 1 ? renderStepOne() : renderStepTwo()}
            </Container>

            <style>{`
                .pointer { cursor: pointer; }
                .border-dashed { border-style: dashed !important; }
                .form-control:focus, .form-select:focus {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    border-color: #fff;
                }
                .text-navy { color: #0f1d3a; }
                .bg-teal { background-color: #40878E; }
                .react-datepicker-wrapper { width: 100%; }
                .react-datepicker__input-container input {
                    width: 100%;
                    font-size: 0.95rem;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 0, 0, 0.2);
                }

                .custom-radio .form-check-input {
                    width: 24px;
                    height: 24px;
                    margin-top: 0.1rem;
                    cursor: pointer;
                    border: 2px solid #dee2e6;
                }
                .custom-radio .form-check-input:checked {
                    background-color: #4a8b8f;
                    border-color: #4a8b8f;
                }
                .custom-radio .form-check-label {
                    cursor: pointer;
                    margin-left: 0.5rem;
                    color: #495057;
                }
            `}</style>
        </div>
    );
};

export default CompleteProfile;
