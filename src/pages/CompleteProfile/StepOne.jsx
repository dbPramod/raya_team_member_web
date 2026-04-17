import { Form, Badge } from 'react-bootstrap';
import PhoneInputModule from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import CustomDropdown from '../../components/common/CustomDropdown';
import { UploadProfileIcon, CalendarAltIcon } from '../../constants/svgImages';

const PhoneInput = PhoneInputModule.default || PhoneInputModule;

const StepOne = ({
    STRINGS,
    COMPLETE_PROFILE,
    name, setName,
    gender, setGender,
    birthDate, setBirthDate,
    phone, setPhone,
    phoneCountry, setPhoneCountry,
    hiringDate, setHiringDate,
    selectedTimezone, setSelectedTimezone,
    address, setAddress,
    selectedCountry, handleCountryChange,
    selectedState, handleStateChange,
    selectedCity, setSelectedCity,
    zipCode, setZipCode,
    errors,
    handleContinue,
    navigate,
    fileInputRef,
    handleFileChange,
    handleUploadClick,
    handleRemoveImage,
    profileImage,
    openDropdown, setOpenDropdown,
    dropdownSearch, setDropdownSearch,
    countriesList, statesList, citiesList,
    TIMEZONES
}) => {
    return (
        <div className="mx-auto d-flex flex-column" style={{ maxWidth: '600px', minHeight: 'auto' }}>
            <div className="text-center mb-4 flex-shrink-0">
                <Badge
                    bg="transparent"
                    text="navy"
                    className="px-3 py-2 fw-semibold mb-4 text-uppercase border"
                    style={{ fontSize: '0.75rem', borderColor: 'var(--color-navy-primary)', borderRadius: '4px', letterSpacing: '0.5px', color: 'var(--color-navy-primary)' }}
                >
                    {COMPLETE_PROFILE.STEP_1}
                </Badge>
                <h2 className="fw-bold mb-2" style={{ color: 'var(--color-text-black)', fontSize: '28px' }}>{COMPLETE_PROFILE.TITLE}</h2>
                <p className="mb-4" style={{ color: 'var(--color-text-gray-light)', fontSize: '13px' }}>{COMPLETE_PROFILE.SUBTITLE1}</p>
            </div>

            <Form className="mt-2 d-flex flex-column overflow-hidden flex-grow-1" style={{ maxHeight: 'calc(100vh - 250px)' }}>
                <div className="flex-grow-1 overflow-auto pe-3 custom-scrollbar mb-4">
                    {/* Name */}
                    <Form.Group className="mb-4 complete-profile-field-layer">
                        <Form.Label className="fw-medium small mb-2" style={{ color: 'var(--color-text-black)' }}>{COMPLETE_PROFILE.NAME.LABEL}</Form.Label>
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
                    <CustomDropdown
                        id="gender"
                        label={COMPLETE_PROFILE.GENDER.LABEL}
                        value={gender}
                        placeholder={COMPLETE_PROFILE.GENDER.PLACEHOLDER}
                        options={COMPLETE_PROFILE.GENDER.OPTIONS}
                        onSelect={setGender}
                        error={errors.gender}
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                        dropdownSearch={dropdownSearch}
                        setDropdownSearch={setDropdownSearch}
                    />

                    {/* Profile Photo Upload */}
                    <Form.Group className="mb-4 complete-profile-field-layer" style={{ color: 'var(--color-text-black)' }}>
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
                                        <img src={UploadProfileIcon} alt="Upload" />
                                    </div>
                                    <p className="small text-nowrap" style={{ color: 'var(--color-text-slate)' }}>{COMPLETE_PROFILE.SUBTITLE2}</p>
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
                    <Form.Group className="mb-4 complete-profile-field-layer">
                        <Form.Label className="fw-medium small mb-2" style={{ color: 'var(--color-text-black)' }}>{COMPLETE_PROFILE.BIRTH_DATE.LABEL}</Form.Label>
                        <CustomDatePicker
                            value={birthDate ? birthDate.toISOString().split('T')[0] : ''}
                            onChange={(e) => setBirthDate(e.target.value ? new Date(e.target.value) : null)}
                            placeholder={COMPLETE_PROFILE.BIRTH_DATE.PLACEHOLDER}
                            error={errors.birthDate}
                            defaultViewDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
                            className="complete-profile-date-picker"
                            triggerClassName="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                            icon={CalendarAltIcon}
                        />
                    </Form.Group>

                    {/* Phone Number */}
                    <Form.Group className="mb-4 complete-profile-field-layer phone-field-layer">
                        <Form.Label className="fw-medium small mb-2" style={{ color: 'var(--color-text-black)' }}>{COMPLETE_PROFILE.PHONE.LABEL}</Form.Label>
                        <div className={`complete-profile-phone-wrap ${errors.phone ? 'has-error' : ''}`}>
                            <PhoneInput
                                country={phoneCountry}
                                value={phone}
                                enableSearch
                                searchPlaceholder="Search country"
                                preferredCountries={['us', 'ca']}
                                onChange={(value, countryData) => {
                                    setPhone(value);
                                    if (countryData?.countryCode) {
                                        setPhoneCountry(countryData.countryCode);
                                        handleCountryChange(countryData.countryCode.toUpperCase(), false);
                                    }
                                }}
                                countryCodeEditable={false}
                                inputProps={{
                                    name: 'phone'
                                }}
                                placeholder={COMPLETE_PROFILE.PHONE.PLACEHOLDER}
                                containerClass="complete-profile-phone-container"
                                buttonClass="complete-profile-phone-button"
                                inputClass="complete-profile-phone-input"
                                dropdownClass="complete-profile-phone-dropdown"
                            />
                        </div>
                        {errors.phone ? <div className="text-danger small mt-1">{errors.phone}</div> : null}
                    </Form.Group>

                    {/* Hiring Date */}
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-medium small mb-2" style={{ color: 'var(--color-text-black)' }}>{COMPLETE_PROFILE.HIRING_DATE.LABEL}</Form.Label>
                        <CustomDatePicker
                            value={hiringDate ? hiringDate.toISOString().split('T')[0] : ''}
                            onChange={(e) => setHiringDate(e.target.value ? new Date(e.target.value) : null)}
                            placeholder={COMPLETE_PROFILE.HIRING_DATE.PLACEHOLDER}
                            error={errors.hiringDate}
                            className="complete-profile-date-picker"
                            triggerClassName="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                            icon={CalendarAltIcon}
                        />
                    </Form.Group>

                    {/* Time Zone */}
                    <CustomDropdown
                        id="timezone"
                        label={COMPLETE_PROFILE.TIMEZONE.LABEL}
                        value={selectedTimezone}
                        placeholder={COMPLETE_PROFILE.TIMEZONE.PLACEHOLDER}
                        options={TIMEZONES}
                        onSelect={setSelectedTimezone}
                        error={errors.selectedTimezone}
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                        dropdownSearch={dropdownSearch}
                        setDropdownSearch={setDropdownSearch}
                    />

                    {/* Address */}
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-medium small mb-2" style={{ color: 'var(--color-text-black)' }}>{COMPLETE_PROFILE.ADDRESS.LABEL}</Form.Label>
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
                    <CustomDropdown
                        id="country"
                        label={COMPLETE_PROFILE.COUNTRY.LABEL}
                        value={selectedCountry}
                        placeholder={COMPLETE_PROFILE.COUNTRY.PLACEHOLDER}
                        options={countriesList}
                        onSelect={handleCountryChange}
                        error={errors.selectedCountry}
                        labelKey="name"
                        valueKey="isoCode"
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                        dropdownSearch={dropdownSearch}
                        setDropdownSearch={setDropdownSearch}
                    />


                    {/* State */}
                    <CustomDropdown
                        id="state"
                        label={COMPLETE_PROFILE.STATE.LABEL}
                        value={selectedState}
                        placeholder={COMPLETE_PROFILE.STATE.PLACEHOLDER}
                        options={statesList}
                        onSelect={handleStateChange}
                        error={errors.selectedState}
                        disabled={!selectedCountry}
                        labelKey="name"
                        valueKey="isoCode"
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                        dropdownSearch={dropdownSearch}
                        setDropdownSearch={setDropdownSearch}
                    />



                    {/* City */}
                    <CustomDropdown
                        id="city"
                        label={COMPLETE_PROFILE.CITY.LABEL}
                        value={selectedCity}
                        placeholder={COMPLETE_PROFILE.CITY.PLACEHOLDER}
                        options={citiesList}
                        onSelect={(val) => setSelectedCity(val)}
                        error={errors.selectedCity}
                        disabled={!selectedState}
                        labelKey="name"
                        valueKey="name"
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                        dropdownSearch={dropdownSearch}
                        setDropdownSearch={setDropdownSearch}
                    />

                    {/* ZIP Code */}
                    <Form.Group className="mb-5">
                        <Form.Label className="fw-medium small mb-2" style={{ color: 'var(--color-text-black)' }}>{COMPLETE_PROFILE.ZIP.LABEL}</Form.Label>
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
                            type="button"
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
                            style={{ backgroundColor: 'var(--color-teal-brand)' }}
                        >
                            {COMPLETE_PROFILE.BUTTONS.CONTINUE} <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default StepOne;
