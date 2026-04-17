import { useState } from 'react';
import { Form, Badge } from 'react-bootstrap';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import CustomDropdown from '../../components/common/CustomDropdown';
import { checkmarkIcon, uncheckmarkIcon, DeleteIcon } from '../../constants/svgImages';


const StepTwo = ({
    COMPLETE_PROFILE,
    isMarried, setIsMarried,
    spouseName, setSpouseName,
    spouseGender, setSpouseGender,
    anniversaryDate, setAnniversaryDate,
    hasKids, setHasKids,
    hasPets, setHasPets,
    favoriteFlower, setFavoriteFlower,
    favoriteCake, setFavoriteCake,
    favoriteOnlineStore, setFavoriteOnlineStore,
    favoriteLocalBusiness, setFavoriteLocalBusiness,
    favoriteRestaurant, setFavoriteRestaurant,
    errors, setErrors,
    handleContinue,
    setStep,
    openDropdown, setOpenDropdown,
    dropdownSearch, setDropdownSearch
}) => {
    const { LIFESTYLE, FAVORITES, BUTTONS } = COMPLETE_PROFILE;

    const [kids, setKids] = useState([{ name: '', gender: '', birthday: null }]);

    const addKid = () => setKids([...kids, { name: '', gender: '', birthday: null }]);

    const updateKid = (index, field, value) => {
        const newKids = [...kids];
        newKids[index][field] = value;
        setKids(newKids);
    };

    const removeKid = (indexToRemove) => {
        setKids(kids.filter((_, index) => index !== indexToRemove));
    };

    const [pets, setPets] = useState([{ name: '', age: '' }]);

    const addPet = () => setPets([...pets, { name: '', age: '' }]);

    const updatePet = (index, field, value) => {
        const newPets = [...pets];
        newPets[index][field] = value;
        setPets(newPets);
    };

    const removePet = (indexToRemove) => {
        setPets(pets.filter((_, index) => index !== indexToRemove));
    };

    const renderRadioGroup = (label, value, setter, error) => (
        <Form.Group className="mb-4">
            <Form.Label className="fw-medium small mb-3 d-block text-dark" style={{ fontSize: '14px', color: 'var(--color-text-dark)' }}>{label}</Form.Label>
            <div className="d-flex gap-4" style={{ fontSize: '14px', color: 'var(--color-text-dark)' }}>
                <label className="d-flex align-items-center gap-2 mb-0" style={{ cursor: 'pointer' }}>
                    <input
                        type="radio"
                        className="d-none"
                        name={label}
                        checked={value === 'Yes'}
                        onChange={() => { setter('Yes'); setErrors(prev => ({ ...prev, [error]: null })); }}
                    />
                    <img src={value === 'Yes' ? checkmarkIcon : uncheckmarkIcon} alt="radio" width="20" height="20" />
                    <span>{LIFESTYLE.YES}</span>
                </label>
                <label className="d-flex align-items-center gap-2 mb-0" style={{ cursor: 'pointer' }}>
                    <input
                        type="radio"
                        className="d-none"
                        name={label}
                        checked={value === 'No'}
                        onChange={() => { setter('No'); setErrors(prev => ({ ...prev, [error]: null })); }}
                    />
                    <img src={value === 'No' ? checkmarkIcon : uncheckmarkIcon} alt="radio" width="20" height="20" />
                    <span>{LIFESTYLE.NO}</span>
                </label>
            </div>
            {errors[error] && <div className="text-danger small mt-2">{errors[error]}</div>}
        </Form.Group>
    );

    return (
        <div className="mx-auto d-flex flex-column" style={{ maxWidth: '600px', minHeight: 'auto' }}>
            <div className="text-center mb-4 flex-shrink-0">
                <Badge
                    bg="transparent"
                    text="navy"
                    className="px-3 py-2 fw-semibold mb-4 text-uppercase border"
                    style={{ fontSize: '0.75rem', borderColor: 'var(--color-navy-primary)', borderRadius: '4px', letterSpacing: '0.5px', color: 'var(--color-navy-primary)' }}
                >
                    {COMPLETE_PROFILE.STEP_2}
                </Badge>
                <h2 className="fw-bold mb-2" style={{ color: 'var(--color-text-dark)', fontSize: '28px' }}>{COMPLETE_PROFILE.TITLE}</h2>
                <p className="mb-4" style={{ color: '#545F71', fontSize: '13px' }}>{COMPLETE_PROFILE.SUBTITLE2}</p>
            </div>

            <Form className="mt-2 d-flex flex-column overflow-hidden flex-grow-1" style={{ maxHeight: 'calc(100vh - 250px)' }}>
                <div className="flex-grow-1 overflow-auto pe-3 custom-scrollbar mb-4">
                    {renderRadioGroup(LIFESTYLE.MARRIED, isMarried, (val) => {
                        setIsMarried(val);
                        if (val === 'No') {
                            setSpouseName('');
                            setSpouseGender('');
                            setAnniversaryDate(null);
                        }
                    }, 'isMarried')}

                    {isMarried === 'Yes' && (
                        <div className="ms-3 mb-4 p-3 ">
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-medium small mb-2 text-dark">{COMPLETE_PROFILE.FAMILY.SPOUSE_NAME.LABEL}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={COMPLETE_PROFILE.FAMILY.SPOUSE_NAME.PLACEHOLDER}
                                    value={spouseName}
                                    onChange={(e) => setSpouseName(e.target.value)}
                                    isInvalid={!!errors.spouseName}
                                    className="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                                    style={{ fontSize: '0.95rem' }}
                                />
                                <Form.Control.Feedback type="invalid">{errors.spouseName}</Form.Control.Feedback>
                            </Form.Group>

                            <CustomDropdown
                                id="spouseGender"
                                label={COMPLETE_PROFILE.FAMILY.GENDER.LABEL}
                                value={spouseGender}
                                placeholder={COMPLETE_PROFILE.FAMILY.GENDER.PLACEHOLDER}
                                options={COMPLETE_PROFILE.GENDER.OPTIONS}
                                onSelect={setSpouseGender}
                                error={errors.spouseGender}
                                openDropdown={openDropdown}
                                setOpenDropdown={setOpenDropdown}
                                dropdownSearch={dropdownSearch}
                                setDropdownSearch={setDropdownSearch}
                            />
                            <Form.Group className="mb-0">
                                <Form.Label className="fw-medium small mb-2 text-dark ">{COMPLETE_PROFILE.FAMILY.ANNIVERSARY.LABEL}</Form.Label>
                                <CustomDatePicker
                                    value={anniversaryDate ? anniversaryDate.toISOString().split('T')[0] : ''}
                                    onChange={(e) => setAnniversaryDate(e.target.value ? new Date(e.target.value) : null)}
                                    placeholder={COMPLETE_PROFILE.FAMILY.ANNIVERSARY.PLACEHOLDER}
                                    error={errors.anniversaryDate}
                                    className="complete-profile-date-picker"
                                    triggerClassName="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                                    icon="bi-calendar-heart"
                                />
                            </Form.Group>
                        </div>
                    )}

                    {renderRadioGroup(LIFESTYLE.KIDS, hasKids, (val) => {
                        setHasKids(val);
                        if (val === 'No') {
                            setKids([{ name: '', gender: '', birthday: null }]);
                        }
                    }, 'hasKids')}

                    {hasKids === 'Yes' && (
                        <div className="mb-4">
                            {kids.map((kid, index) => (
                                <div key={index} className="position-relative p-4 mb-3 rounded-4 shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', border: '1px solid rgba(255, 255, 255, 0.7)' }}>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h6 className="mb-0 fw-bold" style={{ color: 'var(--color-navy-primary)' }}>Child {index + 1}</h6>
                                    </div>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-medium small mb-2 text-dark ">Kids Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter kids name"
                                            value={kid.name}
                                            onChange={(e) => updateKid(index, 'name', e.target.value)}
                                            className="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                                            style={{ fontSize: '0.95rem' }}
                                        />
                                    </Form.Group>

                                    <CustomDropdown
                                        id={`kidGender-${index}`}
                                        label="Gender"
                                        value={kid.gender}
                                        placeholder="Select gender"
                                        options={COMPLETE_PROFILE.GENDER.OPTIONS}
                                        onSelect={(val) => updateKid(index, 'gender', val)}
                                        openDropdown={openDropdown}
                                        setOpenDropdown={setOpenDropdown}
                                        dropdownSearch={dropdownSearch}
                                        setDropdownSearch={setDropdownSearch}
                                    />

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-medium small mb-2 text-dark ">Kid's Birthday</Form.Label>
                                        <CustomDatePicker
                                            value={kid.birthday ? kid.birthday.toISOString().split('T')[0] : ''}
                                            onChange={(e) => updateKid(index, 'birthday', e.target.value ? new Date(e.target.value) : null)}
                                            placeholder="Select date"
                                            className="complete-profile-date-picker"
                                            triggerClassName="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                                            icon="bi-calendar"
                                        />
                                    </Form.Group>

                                    {kids.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeKid(index)}
                                            className="w-100 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 transition-all"
                                            style={{
                                                backgroundColor: '#FFF5F5',
                                                border: '1px solid #F87171',
                                                color: '#EF4444',
                                                fontSize: '0.9rem',
                                                fontWeight: '500'
                                            }}
                                        >
                                            Remove <img src={DeleteIcon} alt="delete" width="16" height="16" />
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addKid}
                                className="w-100 py-3 rounded-4 bg-white shadow-sm border-0 text-center mt-2 d-flex justify-content-center align-items-center gap-2 transition-all hover-scale"
                                style={{ color: 'var(--color-teal-brand)', fontWeight: '600' }}
                            >
                                <i className="bi bi-plus-circle fs-5"></i> Add Kid
                            </button>
                        </div>
                    )}
                    {renderRadioGroup(LIFESTYLE.PETS, hasPets, (val) => {
                        setHasPets(val);
                        if (val === 'No') {
                            setPets([{ name: '', age: '' }]);
                        }
                    }, 'hasPets')}

                    {hasPets === 'Yes' && (
                        <div className="mb-4">
                            {pets.map((pet, index) => (
                                <div key={index} className="position-relative p-4 mb-3 rounded-4 shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', border: '1px solid rgba(255, 255, 255, 0.7)' }}>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h6 className="mb-0 fw-bold" style={{ color: 'var(--color-navy-primary)' }}>Pet {index + 1}</h6>
                                    </div>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-medium small mb-2 text-dark ">Pets Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter pets name"
                                            value={pet.name}
                                            onChange={(e) => updatePet(index, 'name', e.target.value)}
                                            className="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                                            style={{ fontSize: '0.95rem' }}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-medium small mb-2 text-dark">Pets age</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter age"
                                            value={pet.age}
                                            onChange={(e) => updatePet(index, 'age', e.target.value)}
                                            className="py-3 px-4 border-white shadow-sm rounded-3 bg-white"
                                            style={{ fontSize: '0.95rem' }}
                                        />
                                    </Form.Group>

                                    {pets.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removePet(index)}
                                            className="w-100 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 transition-all"
                                            style={{
                                                backgroundColor: '#FFF5F5',
                                                border: '1px solid #F87171',
                                                color: '#EF4444',
                                                fontSize: '0.9rem',
                                                fontWeight: '500'
                                            }}
                                        >
                                            Remove <img src={DeleteIcon} alt="delete" width="16" height="16" />
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addPet}
                                className="w-100 py-3 rounded-4 bg-white shadow-sm border-0 text-center mt-2 d-flex justify-content-center align-items-center gap-2 transition-all hover-scale"
                                style={{ color: 'var(--color-teal-brand)', fontWeight: '600' }}
                            >
                                <i className="bi bi-plus-circle fs-5"></i> Add Pet
                            </button>
                        </div>
                    )}

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-medium small mb-2 text-dark ">{FAVORITES.FLOWER.LABEL}</Form.Label>
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
                        <Form.Label className="fw-medium small mb-2 text-dark">{FAVORITES.CAKE.LABEL}</Form.Label>
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
                        <Form.Label className="fw-medium small mb-2 text-dark">{FAVORITES.STORE.LABEL}</Form.Label>
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
                        <Form.Label className="fw-medium small mb-2 text-dark">{FAVORITES.BUSINESS.LABEL}</Form.Label>
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
                        <Form.Label className="fw-medium small mb-2 text-dark">{FAVORITES.RESTAURANT.LABEL}</Form.Label>
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
                            style={{ backgroundColor: 'var(--color-teal-brand)' }}
                        >
                            {BUTTONS.CONTINUE} <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default StepTwo;
