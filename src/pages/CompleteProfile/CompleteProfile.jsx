import { useMemo, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import appLogo from '../../assets/images/applogo.png';
import { STRINGS } from '../../constants/strings';
import { Country, State, City } from 'country-state-city';
import 'react-phone-input-2/lib/style.css';

import StepOne from './StepOne';
import StepTwo from './StepTwo';

const CompleteProfile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [step, setStep] = useState(1);

    const [selectedCountry, setSelectedCountry] = useState('US');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [selectedTimezone, setSelectedTimezone] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [hiringDate, setHiringDate] = useState(null);

    // Custom dropdown open states
    const [openDropdown, setOpenDropdown] = useState(null); // 'gender' | 'timezone' | 'country' | 'state' | 'city'
    const [dropdownSearch, setDropdownSearch] = useState({
        country: '',
        state: '',
        city: ''
    });

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
    const [phone, setPhone] = useState('1');
    const [phoneCountry, setPhoneCountry] = useState('us');
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
    const [spouseName, setSpouseName] = useState('');
    const [spouseGender, setSpouseGender] = useState('');
    const [anniversaryDate, setAnniversaryDate] = useState(null);

    const countriesList = useMemo(() => {
        const allCountries = Country.getAllCountries();
        const priorityCountries = ['US', 'CA'];
        const pinnedCountries = priorityCountries
            .map((countryCode) => allCountries.find((country) => country.isoCode === countryCode))
            .filter(Boolean);
        const remainingCountries = allCountries.filter((country) => !priorityCountries.includes(country.isoCode));
        return [...pinnedCountries, ...remainingCountries];
    }, []);
    const statesList = useMemo(
        () => (selectedCountry ? State.getStatesOfCountry(selectedCountry) : []),
        [selectedCountry]
    );
    const citiesList = useMemo(
        () => (selectedCountry && selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : []),
        [selectedCountry, selectedState]
    );
    const getDialCodeByCountry = (countryCode) => countriesList.find((country) => country.isoCode === countryCode)?.phonecode || '';

    const handleCountryChange = (countryCode, updatePhone = true) => {
        setSelectedCountry(countryCode);
        setSelectedState('');
        setSelectedCity('');

        if (countryCode) {
            setPhoneCountry(countryCode.toLowerCase());
            if (updatePhone) {
                setPhone(getDialCodeByCountry(countryCode));
            }
        }
    };

    const handleStateChange = (stateCode) => {
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
        else {
            const digitsOnly = phone.replace(/\D/g, '');
            const dialCode = getDialCodeByCountry(selectedCountry).replace(/\D/g, '');
            const subscriberNumber = digitsOnly.startsWith(dialCode) ? digitsOnly.slice(dialCode.length) : digitsOnly;

            if (subscriberNumber.length !== 10) newErrors.phone = ERRORS.PHONE_INVALID;
        }

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

        if (isMarried === 'Yes') {
            if (!spouseName.trim()) newErrors.spouseName = ERRORS.NAME_REQUIRED;
            if (!spouseGender || spouseGender === STRINGS.COMPLETE_PROFILE.GENDER.PLACEHOLDER) newErrors.spouseGender = ERRORS.GENDER_REQUIRED;
            if (!anniversaryDate) newErrors.anniversaryDate = ERRORS.SELECTION_REQUIRED;
        }

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
                    isMarried, spouseName, spouseGender, anniversaryDate, hasKids, hasPets, favoriteFlower, favoriteCake, favoriteOnlineStore, favoriteLocalBusiness, favoriteRestaurant
                });
                navigate('/');
            }
        }
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
                {step === 1 ? (
                    <StepOne
                        STRINGS={STRINGS}
                        COMPLETE_PROFILE={STRINGS.COMPLETE_PROFILE}
                        name={name} setName={setName}
                        gender={gender} setGender={setGender}
                        birthDate={birthDate} setBirthDate={setBirthDate}
                        phone={phone} setPhone={setPhone}
                        phoneCountry={phoneCountry} setPhoneCountry={setPhoneCountry}
                        hiringDate={hiringDate} setHiringDate={setHiringDate}
                        selectedTimezone={selectedTimezone} setSelectedTimezone={setSelectedTimezone}
                        address={address} setAddress={setAddress}
                        selectedCountry={selectedCountry} handleCountryChange={handleCountryChange}
                        selectedState={selectedState} handleStateChange={handleStateChange}
                        selectedCity={selectedCity} setSelectedCity={setSelectedCity}
                        zipCode={zipCode} setZipCode={setZipCode}
                        errors={errors}
                        handleContinue={handleContinue}
                        navigate={navigate}
                        fileInputRef={fileInputRef}
                        handleFileChange={handleFileChange}
                        handleUploadClick={handleUploadClick}
                        handleRemoveImage={handleRemoveImage}
                        profileImage={profileImage}
                        openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}
                        dropdownSearch={dropdownSearch} setDropdownSearch={setDropdownSearch}
                        countriesList={countriesList} statesList={statesList} citiesList={citiesList}
                        TIMEZONES={TIMEZONES}
                    />
                ) : (
                    <StepTwo
                        COMPLETE_PROFILE={STRINGS.COMPLETE_PROFILE}
                        isMarried={isMarried} setIsMarried={setIsMarried}
                        spouseName={spouseName} setSpouseName={setSpouseName}
                        spouseGender={spouseGender} setSpouseGender={setSpouseGender}
                        anniversaryDate={anniversaryDate} setAnniversaryDate={setAnniversaryDate}
                        hasKids={hasKids} setHasKids={setHasKids}
                        hasPets={hasPets} setHasPets={setHasPets}
                        favoriteFlower={favoriteFlower} setFavoriteFlower={setFavoriteFlower}
                        favoriteCake={favoriteCake} setFavoriteCake={setFavoriteCake}
                        favoriteOnlineStore={favoriteOnlineStore} setFavoriteOnlineStore={setFavoriteOnlineStore}
                        favoriteLocalBusiness={favoriteLocalBusiness} setFavoriteLocalBusiness={setFavoriteLocalBusiness}
                        favoriteRestaurant={favoriteRestaurant} setFavoriteRestaurant={setFavoriteRestaurant}
                        errors={errors} setErrors={setErrors}
                        handleContinue={handleContinue}
                        setStep={setStep}
                        openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}
                        dropdownSearch={dropdownSearch} setDropdownSearch={setDropdownSearch}
                    />
                )}
            </Container>

        </div>
    );
};

export default CompleteProfile;
