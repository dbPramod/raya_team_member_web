import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Badge, Modal } from 'react-bootstrap';
import { STRINGS } from '../../constants/strings';
import CustomSelect from '../../components/common/CustomSelect';
import CustomDatePicker from '../../components/common/CustomDatePicker';
const Settings = () => {
    const { SETTINGS } = STRINGS;
    const [editingSection, setEditingSection] = useState(null);
    const [notifications, setNotifications] = useState(true);
    const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddKidModal, setShowAddKidModal] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [newKidGender, setNewKidGender] = useState('');
    const [newKidBirthday, setNewKidBirthday] = useState('');

    const timezones = [
        'Pacific Time - US & Canada',
        'Alaska Time',
        'Hawaii–Aleutian Time',
        'Mountain Time',
        'Central Time',
        'Eastern Time',
        'Atlantic Time',
        'Newfoundland Time'
    ];
    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' }
    ];
    const departmentOptions = [
        { value: 'Development', label: 'Development' },
        { value: 'Design', label: 'Design' },
        { value: 'Product', label: 'Product' }
    ];
    const countryCodeOptions = [
        { value: '+1', label: '+1' },
        { value: '+91', label: '+91' }
    ];

    const [userProfile, setUserProfile] = useState({
        name: 'Sapphire Bright',
        role: 'UI/UX Designer',
        type: 'Full-time',
        department: 'Development',
        hiringDate: '2023-03-23',
        joinedDate: '03/23/2023',
        email: 'sarahjohnson@gmail.com',
        phone: '+1 9223-343-968',
        gender: 'Female',
        address: '203, Senfer , street,',
        dob: '2000-03-23',
        spouseName: 'Neel Johnson',
        anniversary: '2024-09-16',
        familyGender: 'Male',
        kids: [
            { id: 1, name: 'Olivia Johnson', birthday: '2023-04-04', gender: 'Female' }
        ],
        petName: 'Roli',
        petAge: '2 years',
        timezone: 'Pacific Time - US & Canada',
        favorites: {
            flower: 'Rose',
            cake: 'Chocolate',
            store: 'FnP Store',
            business: 'Willow Creek Crafts',
            restaurant: 'The Gilded Spoon'
        }
    });

    const handleEdit = (section) => {
        setEditingSection(section);
    };

    const handleCancel = () => {
        setEditingSection(null);
    };

    const handleSave = () => {
        // Save logic here
        setEditingSection(null);
    };

    const handleAddKid = (kidData) => {
        setUserProfile({
            ...userProfile,
            kids: [...userProfile.kids, { id: Date.now(), ...kidData }]
        });
        setShowAddKidModal(false);
        setNewKidGender('');
        setNewKidBirthday('');
    };

    const handleKidChange = (id, field, value) => {
        setUserProfile({
            ...userProfile,
            kids: userProfile.kids.map(kid => kid.id === id ? { ...kid, [field]: value } : kid)
        });
    };

    const renderEditIcon = (section) => (
        editingSection === section ? null : (
            <div className="edit-icon-container ms-auto pointer" onClick={() => handleEdit(section)}>
                <i className="bi bi-pencil-square text-secondary opacity-50 fs-5"></i>
            </div>
        )
    );

    const renderEditActions = () => (
        <div className="d-flex justify-content-end gap-3 mt-4">
            <button
                type="button"
                className="btn btn-light px-4 py-2 rounded-3 border fw-medium"
                onClick={handleCancel}
            >
                {SETTINGS.BUTTONS.CANCEL}
            </button>
            <button
                type="button"
                className="btn px-4 py-2 rounded-3 fw-medium text-white shadow-sm"
                style={{ backgroundColor: '#4a8b8f' }}
                onClick={handleSave}
            >
                {SETTINGS.BUTTONS.CHANGE}
            </button>
        </div>
    );

    const renderChangePasswordModal = () => (
        <Modal
            show={showPasswordModal}
            onHide={() => setShowPasswordModal(false)}
            centered
            contentClassName="rounded-4 border-0 shadow custom-modal"
            size="md"
        >
            <Modal.Header className="border-0 pb-0 pt-2 px-3 position-relative d-flex justify-content-end">
                <button
                    type="button"
                    className="btn-close shadow-none"
                    onClick={() => setShowPasswordModal(false)}
                    aria-label="Close"
                    style={{ fontSize: '0.8rem' }}
                ></button>
            </Modal.Header>
            <Modal.Body className="px-5 pb-5 pt-0">
                <div className="text-center mb-4">
                    <h4 className="fw-bold m-0" style={{ color: '#0f1d3a' }}>{SETTINGS.CHANGE_PASSWORD_MODAL.TITLE}</h4>
                </div>
                <Form className="text-start">
                    <Form.Group className="mb-3">
                        <Form.Label className="text-muted small fw-medium mb-1">{SETTINGS.CHANGE_PASSWORD_MODAL.NEW_PASSWORD_LABEL}</Form.Label>
                        <div className="position-relative">
                            <Form.Control
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder={SETTINGS.CHANGE_PASSWORD_MODAL.NEW_PASSWORD_PLACEHOLDER}
                                className="bg-light border-0 py-2 rounded-3 pe-5 shadow-none"
                            />
                            <i
                                className={`bi ${showNewPassword ? 'bi-eye' : 'bi-eye-slash'} position-absolute top-50 end-0 translate-middle-y me-3 text-muted pointer`}
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            ></i>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className="text-muted small fw-medium mb-1">{SETTINGS.CHANGE_PASSWORD_MODAL.CONFIRM_PASSWORD_LABEL}</Form.Label>
                        <div className="position-relative">
                            <Form.Control
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder={SETTINGS.CHANGE_PASSWORD_MODAL.CONFIRM_PASSWORD_PLACEHOLDER}
                                className="bg-light border-0 py-2 rounded-3 pe-5 shadow-none"
                            />
                            <i
                                className={`bi ${showConfirmPassword ? 'bi-eye' : 'bi-eye-slash'} position-absolute top-50 end-0 translate-middle-y me-3 text-muted pointer`}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            ></i>
                        </div>
                    </Form.Group>
                    <button
                        type="button"
                        className="btn w-100 py-2 rounded-3 fw-medium text-white shadow-sm"
                        style={{ backgroundColor: '#4a8b8f' }}
                    >
                        {SETTINGS.CHANGE_PASSWORD_MODAL.BUTTON}
                    </button>
                </Form>
            </Modal.Body>
        </Modal>
    );

    const renderDeleteAccountModal = () => (
        <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
            contentClassName="rounded-4 border-0 shadow custom-modal"
            size="md"
        >
            <Modal.Header className="border-0 pb-0 pt-2 px-3 position-relative d-flex justify-content-end">
                <button
                    type="button"
                    className="btn-close shadow-none"
                    onClick={() => setShowDeleteModal(false)}
                    aria-label="Close"
                    style={{ fontSize: '0.8rem' }}
                ></button>
            </Modal.Header>
            <Modal.Body className="px-5 pb-5 pt-0 text-center">
                <div className="mb-4">
                    <h4 className="fw-bold m-0" style={{ color: '#0f1d3a' }}>{SETTINGS.DELETE_ACCOUNT_MODAL.TITLE}</h4>
                </div>
                <div className="mb-4">
                    <p className="fw-medium mb-2" style={{ color: '#495057' }}>{SETTINGS.DELETE_ACCOUNT_MODAL.MESSAGE}</p>
                    <p className="small text-muted mb-0 px-2" style={{ lineHeight: '1.5' }}>
                        {SETTINGS.DELETE_ACCOUNT_MODAL.WARNING}
                    </p>
                </div>
                <div className="d-flex gap-3 justify-content-center">
                    <button
                        type="button"
                        className="btn btn-outline-secondary py-2 px-4 rounded-3 fw-medium"
                        style={{ minWidth: '120px', borderColor: '#adb5bd', color: '#6c757d' }}
                        onClick={() => setShowDeleteModal(false)}
                    >
                        {SETTINGS.DELETE_ACCOUNT_MODAL.CANCEL_BUTTON}
                    </button>
                    <button
                        type="button"
                        className="btn py-2 px-4 rounded-3 fw-medium text-white shadow-sm"
                        style={{ backgroundColor: '#d9534f', minWidth: '120px' }}
                    >
                        {SETTINGS.DELETE_ACCOUNT_MODAL.DELETE_BUTTON}
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );

    const renderAddKidModal = () => (
        <Modal
            show={showAddKidModal}
            onHide={() => {
                setShowAddKidModal(false);
                setNewKidGender('');
                setNewKidBirthday('');
            }}
            centered
            contentClassName="rounded-4 border-0 shadow custom-modal"
            size="md"
        >
            <Modal.Header className="border-0 pb-0 pt-2 px-3 position-relative d-flex justify-content-end">
                <button
                    type="button"
                    className="btn-close shadow-none"
                    onClick={() => setShowAddKidModal(false)}
                    aria-label="Close"
                    style={{ fontSize: '0.8rem' }}
                ></button>
            </Modal.Header>
            <Modal.Body className="px-5 pb-5 pt-0">
                <div className="text-center mb-4">
                    <h4 className="fw-bold m-0" style={{ color: '#0f1d3a' }}>Add Kid's Information</h4>
                </div>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    handleAddKid({
                        name: formData.get('name'),
                        gender: formData.get('gender'),
                        birthday: newKidBirthday
                    });
                }}>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-muted small fw-medium mb-1">Kid's Name</Form.Label>
                        <Form.Control
                            name="name"
                            placeholder="Enter kid's name"
                            className="bg-light border-0 py-2 rounded-3 shadow-none"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-muted small fw-medium mb-1">Gender</Form.Label>
                        <CustomSelect
                            name="gender"
                            value={newKidGender}
                            options={genderOptions}
                            onChange={(event) => setNewKidGender(event.target.value)}
                            placeholder="Select Gender"
                            className="settings-custom-select"
                        />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className="text-muted small fw-medium mb-1">Birthday</Form.Label>
                        <CustomDatePicker
                            name="birthday"
                            value={newKidBirthday}
                            onChange={(event) => setNewKidBirthday(event.target.value)}
                            placeholder="Select birthday"
                            className="settings-custom-select"
                            triggerClassName="bg-light border-0 py-2 rounded-3 shadow-none"
                            icon="bi-calendar3"
                        />
                    </Form.Group>
                    <button
                        type="submit"
                        className="btn w-100 py-2 rounded-3 fw-medium text-white shadow-sm"
                        style={{ backgroundColor: '#4a8b8f' }}
                    >
                        Add Kid
                    </button>
                </Form>
            </Modal.Body>
        </Modal>
    );

    return (
        <Container fluid className="settings-container pb-5">
            {renderChangePasswordModal()}
            {renderDeleteAccountModal()}
            {renderAddKidModal()}
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 pt-2 flex-wrap gap-3">
                <h2 className="fw-bold m-0" style={{ color: '#0f1d3a' }}>{SETTINGS.TITLE}</h2>
                <div className="d-flex gap-2 gap-sm-3 flex-wrap">
                    <button
                        className="btn btn-outline-primary border-secondary text-dark rounded-3 px-3 px-sm-4 py-2 bg-white shadow-sm fw-medium small"
                        style={{ borderColor: '#dee2e6 !important' }}
                        onClick={() => setShowPasswordModal(true)}
                    >
                        {SETTINGS.BUTTONS.CHANGE_PASSWORD}
                    </button>
                    <button
                        className="btn btn-link text-danger text-decoration-none bg-danger bg-opacity-10 rounded-3 px-3 px-sm-4 py-2 border-0 fw-medium small"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        {SETTINGS.BUTTONS.DELETE_ACCOUNT}
                    </button>
                </div>
            </div>

            <div className="settings-content pe-2">
                {/* Profile Summary Section */}
                <div className="settings-section rounded-4 p-4 mb-4 settings-section-popover" style={{ backgroundColor: '#f0f7ff' }}>
                    {editingSection === 'profile' ? (
                        <Card className="border-0 shadow-sm rounded-4 overflow-visible">
                            <Card.Body className="p-4">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="profile-img-large me-4 position-relative">
                                        <img
                                            src="https://i.pravatar.cc/150?u=sapphire"
                                            alt={userProfile.name}
                                            className="rounded-circle shadow-sm"
                                            width="100"
                                            height="100"
                                        />
                                    </div>
                                    <div className="d-flex gap-3">
                                        <button className="btn btn-light border px-3 py-2 rounded-3 text-muted small fw-medium">
                                            {SETTINGS.PROFILE.REMOVE_PHOTO}
                                        </button>
                                        <button className="btn btn-outline-primary px-3 py-2 rounded-3 small fw-medium">
                                            {SETTINGS.PROFILE.CHANGE_PHOTO}
                                        </button>
                                    </div>
                                </div>
                                <Form>
                                    <Row className="gy-4">
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.PROFILE.NAME_LABEL}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder={SETTINGS.PROFILE.NAME_PLACEHOLDER}
                                                    value={userProfile.name}
                                                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                                                    className="bg-light border-0 py-2 rounded-3"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.PROFILE.HIRING_DATE_LABEL}</Form.Label>
                                                <div className="position-relative">
                                                    <CustomDatePicker
                                                        value={userProfile.hiringDate}
                                                        onChange={(e) => setUserProfile({ ...userProfile, hiringDate: e.target.value })}
                                                        placeholder={SETTINGS.PROFILE.HIRING_DATE_PLACEHOLDER}
                                                        className="settings-custom-select"
                                                        triggerClassName="bg-light border-0 py-2 rounded-3 shadow-none"
                                                        icon="bi-calendar3"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.PROFILE.DEPARTMENT_LABEL}</Form.Label>
                                                <div className="position-relative">
                                                    <CustomSelect
                                                        options={departmentOptions}
                                                        value={userProfile.department}
                                                        onChange={(e) => setUserProfile({ ...userProfile, department: e.target.value })}
                                                        placeholder={SETTINGS.PROFILE.DEPARTMENT_PLACEHOLDER}
                                                        className="settings-custom-select"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {renderEditActions()}
                                </Form>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                            <Card.Body className="p-4 d-flex align-items-center">
                                <div className="profile-img-large me-4">
                                    <img
                                        src="https://i.pravatar.cc/150?u=sapphire"
                                        alt={userProfile.name}
                                        className="rounded-circle shadow-sm"
                                        width="100"
                                        height="100"
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <h3 className="fw-bold mb-1" style={{ color: '#0f1d3a' }}>{userProfile.name}</h3>
                                    <p className="text-muted mb-1 fs-5 fw-medium">{userProfile.role}</p>
                                    <p className="text-muted small mb-0">{userProfile.type}</p>
                                </div>
                                <div className="text-end">
                                    {renderEditIcon('profile')}
                                    <div className="mt-4 pt-2">
                                        <span className="text-muted small d-block">{SETTINGS.PROFILE.JOINED_ON}</span>
                                        <span className="fw-bold" style={{ color: '#0f1d3a' }}>{userProfile.joinedDate}</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </div>

                {/* Personal Details Section */}
                <div className="settings-section rounded-4 p-4 mb-4 settings-section-popover" style={{ backgroundColor: '#f0f7ff' }}>
                    <div className="d-flex align-items-center mb-3">
                        <h5 className="fw-bold m-0" style={{ color: '#0f1d3a' }}>{SETTINGS.PERSONAL.TITLE}</h5>
                        {renderEditIcon('personal')}
                    </div>
                    {editingSection === 'personal' ? (
                        <Card className="border-0 shadow-sm rounded-4 overflow-visible">
                            <Card.Body className="p-4">
                                <Form>
                                    <Row className="gy-4">
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.PERSONAL.EMAIL}</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder={SETTINGS.PERSONAL.EMAIL_PLACEHOLDER}
                                                    value={userProfile.email}
                                                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                                                    className="bg-light border-0 py-2 rounded-3"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.PERSONAL.PHONE}</Form.Label>
                                                <div className="d-flex gap-2">
                                                    <div style={{ minWidth: '86px' }}>
                                                        <CustomSelect
                                                            options={countryCodeOptions}
                                                            value={userProfile.phone.split(' ')[0]}
                                                            onChange={(e) => setUserProfile({ ...userProfile, phone: `${e.target.value} ${userProfile.phone.split(' ')[1] || ''}`.trim() })}
                                                            className="settings-custom-select settings-country-code-select"
                                                            fullWidth={false}
                                                        />
                                                    </div>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder={SETTINGS.PERSONAL.PHONE_PLACEHOLDER}
                                                        value={userProfile.phone.split(' ')[1] || ''}
                                                        onChange={(e) => setUserProfile({ ...userProfile, phone: `${userProfile.phone.split(' ')[0]} ${e.target.value}` })}
                                                        className="bg-light border-0 py-2 flex-grow-1 rounded-3"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.PERSONAL.GENDER}</Form.Label>
                                                <CustomSelect
                                                    options={genderOptions.filter((option) => option.value !== 'Other')}
                                                    value={userProfile.gender}
                                                    onChange={(e) => setUserProfile({ ...userProfile, gender: e.target.value })}
                                                    placeholder={SETTINGS.PERSONAL.GENDER_PLACEHOLDER}
                                                    className="settings-custom-select"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.PERSONAL.DOB}</Form.Label>
                                                <div className="position-relative">
                                                    <CustomDatePicker
                                                        value={userProfile.dob}
                                                        onChange={(e) => setUserProfile({ ...userProfile, dob: e.target.value })}
                                                        placeholder={SETTINGS.PERSONAL.DOB_PLACEHOLDER}
                                                        className="settings-custom-select"
                                                        triggerClassName="bg-light border-0 py-2 rounded-3 shadow-none"
                                                        icon="bi-calendar3"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={8}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.PERSONAL.ADDRESS}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder={SETTINGS.PERSONAL.ADDRESS_PLACEHOLDER}
                                                    value={userProfile.address}
                                                    onChange={(e) => setUserProfile({ ...userProfile, address: e.target.value })}
                                                    className="bg-light border-0 py-2 rounded-3"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {renderEditActions()}
                                </Form>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                            <Card.Body className="p-4">
                                <Row className="gy-4">
                                    <Col md={4}>
                                        <label className="text-muted small d-block mb-1">{SETTINGS.PERSONAL.EMAIL}</label>
                                        <span className="fw-medium text-dark">{userProfile.email}</span>
                                    </Col>
                                    <Col md={4}>
                                        <label className="text-muted small d-block mb-1">{SETTINGS.PERSONAL.PHONE}</label>
                                        <span className="fw-medium text-dark">{userProfile.phone}</span>
                                    </Col>
                                    <Col md={4}>
                                        <label className="text-muted small d-block mb-1">{SETTINGS.PERSONAL.GENDER}</label>
                                        <span className="fw-medium text-dark">{userProfile.gender}</span>
                                    </Col>
                                    <Col md={4}>
                                        <label className="text-muted small d-block mb-1">{SETTINGS.PERSONAL.ADDRESS}</label>
                                        <span className="fw-medium text-dark">{userProfile.address}</span>
                                    </Col>
                                    <Col md={4}>
                                        <label className="text-muted small d-block mb-1">{SETTINGS.PERSONAL.DOB}</label>
                                        <span className="fw-medium text-dark">{userProfile.dob}</span>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )}
                </div>

                {/* Family Details Section */}
                <div className="settings-section rounded-4 p-4 mb-4 settings-section-popover" style={{ backgroundColor: '#f0f7ff' }}>
                    <div className="d-flex align-items-center mb-3">
                        <h5 className="fw-bold m-0" style={{ color: '#0f1d3a' }}>{SETTINGS.FAMILY.TITLE}</h5>
                        {renderEditIcon('family')}
                    </div>
                    {editingSection === 'family' ? (
                        <Card className="border-0 shadow-sm rounded-4 overflow-visible">
                            <Card.Body className="p-4">
                                <Form>
                                    <Row className="gy-4 mb-4">
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.FAMILY.SPOUSE_NAME}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder={SETTINGS.FAMILY.SPOUSE_PLACEHOLDER}
                                                    value={userProfile.spouseName}
                                                    onChange={(e) => setUserProfile({ ...userProfile, spouseName: e.target.value })}
                                                    className="bg-light border-0 py-2 rounded-3"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.FAMILY.GENDER}</Form.Label>
                                                <CustomSelect
                                                    options={genderOptions.filter((option) => option.value !== 'Other')}
                                                    value={userProfile.familyGender}
                                                    onChange={(e) => setUserProfile({ ...userProfile, familyGender: e.target.value })}
                                                    placeholder={SETTINGS.FAMILY.GENDER_PLACEHOLDER}
                                                    className="settings-custom-select"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.FAMILY.ANNIVERSARY}</Form.Label>
                                                <div className="position-relative">
                                                    <CustomDatePicker
                                                        value={userProfile.anniversary}
                                                        onChange={(e) => setUserProfile({ ...userProfile, anniversary: e.target.value })}
                                                        placeholder={SETTINGS.FAMILY.ANNIVERSARY_PLACEHOLDER}
                                                        className="settings-custom-select"
                                                        triggerClassName="bg-light border-0 py-2 rounded-3 shadow-none"
                                                        icon="bi-calendar3"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <div className="d-flex align-items-center gap-2 mb-4">
                                        <label className="text-muted small mb-0 fw-medium">{SETTINGS.FAMILY.KIDS_NAME}</label>
                                        <i className="bi bi-plus-circle text-primary pointer" onClick={() => {
                                            setNewKidGender('');
                                            setNewKidBirthday('');
                                            setShowAddKidModal(true);
                                        }}></i>
                                    </div>

                                    {userProfile.kids.map((kid, index) => (
                                        <Row key={kid.id} className="gy-4 mb-4 pb-3 border-bottom border-light border-opacity-50">
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="text-muted small mb-2">Kid's Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={kid.name}
                                                        onChange={(e) => handleKidChange(kid.id, 'name', e.target.value)}
                                                        className="bg-light border-0 py-2 rounded-3"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="text-muted small mb-2">Gender</Form.Label>
                                                    <CustomSelect
                                                        options={genderOptions}
                                                        value={kid.gender}
                                                        onChange={(e) => handleKidChange(kid.id, 'gender', e.target.value)}
                                                        className="settings-custom-select"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="text-muted small mb-2">Birthday</Form.Label>
                                                    <CustomDatePicker
                                                        value={kid.birthday}
                                                        onChange={(e) => handleKidChange(kid.id, 'birthday', e.target.value)}
                                                        placeholder="Select birthday"
                                                        className="settings-custom-select"
                                                        triggerClassName="bg-light border-0 py-2 rounded-3 shadow-none"
                                                        icon="bi-calendar3"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    ))}

                                    <Row className="gy-4">
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.FAMILY.PET_NAME}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder={SETTINGS.FAMILY.PET_NAME_PLACEHOLDER}
                                                    value={userProfile.petName}
                                                    onChange={(e) => setUserProfile({ ...userProfile, petName: e.target.value })}
                                                    className="bg-light border-0 py-2 rounded-3"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.FAMILY.PET_AGE}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder={SETTINGS.FAMILY.PET_AGE_PLACEHOLDER}
                                                    value={userProfile.petAge}
                                                    onChange={(e) => setUserProfile({ ...userProfile, petAge: e.target.value })}
                                                    className="bg-light border-0 py-2 rounded-3"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {renderEditActions()}
                                </Form>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                            <Card.Body className="p-4">
                                <Row className="gy-4 mb-4">
                                    <Col md={4}>
                                        <label className="text-muted small d-block mb-1">{SETTINGS.FAMILY.SPOUSE_NAME}</label>
                                        <span className="fw-medium text-dark">{userProfile.spouseName}</span>
                                    </Col>
                                    <Col md={4}>
                                        <label className="text-muted small d-block mb-1">{SETTINGS.FAMILY.ANNIVERSARY}</label>
                                        <span className="fw-medium text-dark">{userProfile.anniversary}</span>
                                    </Col>
                                    <Col md={4}>
                                        <label className="text-muted small d-block mb-1">{SETTINGS.FAMILY.GENDER}</label>
                                        <span className="fw-medium text-dark">{userProfile.familyGender}</span>
                                    </Col>
                                </Row>
                                {userProfile.kids.map((kid) => (
                                    <Row key={kid.id} className="gy-4 mb-4 pb-3 border-bottom border-light border-opacity-50 last-child-no-border">
                                        <Col md={4}>
                                            <label className="text-muted small d-block mb-1">{SETTINGS.FAMILY.KIDS_NAME}</label>
                                            <span className="fw-medium text-dark">{kid.name}</span>
                                        </Col>
                                        <Col md={4}>
                                            <label className="text-muted small d-block mb-1">{SETTINGS.FAMILY.KIDS_BIRTHDAY}</label>
                                            <span className="fw-medium text-dark">{kid.birthday}</span>
                                        </Col>
                                        <Col md={4}>
                                            <label className="text-muted small d-block mb-1">{SETTINGS.FAMILY.GENDER}</label>
                                            <span className="fw-medium text-dark">{kid.gender}</span>
                                        </Col>
                                    </Row>
                                ))}
                                <Row className="gy-4">
                                    <Col md={4}>
                                        <label className="text-muted small d-block mb-1">{SETTINGS.FAMILY.PET_NAME}</label>
                                        <span className="fw-medium text-dark">{userProfile.petName}</span>
                                    </Col>
                                    <Col md={4}>
                                        <label className="text-muted small d-block mb-1">{SETTINGS.FAMILY.PET_AGE}</label>
                                        <span className="fw-medium text-dark">{userProfile.petAge}</span>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )}
                </div>

                {/* Notification Preferences Section */}
                <div className="settings-section rounded-4 p-4 mb-4 settings-section-popover" style={{ backgroundColor: '#f0f7ff' }}>
                    <div className="d-flex align-items-center mb-3">
                        <h5 className="fw-bold m-0" style={{ color: '#0f1d3a' }}>{SETTINGS.NOTIFICATIONS.TITLE}</h5>
                    </div>
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                        <Card.Body className="p-4 py-3 d-flex align-items-center justify-content-between">
                            <div>
                                <label className="text-muted small d-block mb-1">{SETTINGS.NOTIFICATIONS.TASK_UPDATE.LABEL}</label>
                                <span className="fw-medium text-dark">{SETTINGS.NOTIFICATIONS.TASK_UPDATE.DESC}</span>
                            </div>
                            <Form.Check
                                type="switch"
                                id="notification-switch"
                                checked={notifications}
                                onChange={() => setNotifications(!notifications)}
                                className="custom-switch-lg"
                            />
                        </Card.Body>
                    </Card>
                </div>

                {/* Application Preference Section */}
                <div className="settings-section rounded-4 p-4 mb-4" style={{ backgroundColor: '#f0f7ff' }}>
                    <div className="d-flex align-items-center mb-3">
                        <h5 className="fw-bold m-0" style={{ color: '#0f1d3a' }}>{SETTINGS.APPLICATION.TITLE}</h5>
                        {renderEditIcon('application')}
                    </div>
                    {editingSection === 'application' ? (
                        <Card className="border-0 shadow-sm rounded-4 overflow-visible">
                            <Card.Body className="p-4">
                                <Form>
                                    <div className="mb-4">
                                        <label className="text-muted small fw-bold mb-3 text-uppercase" style={{ letterSpacing: '0.05em' }}>{SETTINGS.APPLICATION.TIMEZONE}</label>
                                        <div className="position-relative">
                                            <div
                                                className="bg-light border-0 py-3 px-4 rounded-3 d-flex justify-content-between align-items-center pointer transition-all"
                                                onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
                                                style={{
                                                    backgroundColor: '#f8fafc',
                                                    color: userProfile.timezone ? '#0f172a' : '#94a3b8',
                                                    fontWeight: userProfile.timezone ? '500' : '400'
                                                }}
                                            >
                                                <span>{userProfile.timezone || 'Select time zone'}</span>
                                                <i className={`bi bi-chevron-${isTimezoneOpen ? 'up' : 'down'} text-muted`}></i>
                                            </div>

                                            {isTimezoneOpen && (
                                                <div
                                                    className="position-absolute w-100 mt-2 bg-white rounded-3 shadow-lg overflow-hidden"
                                                    style={{ zIndex: 1000, border: '1px solid #f1f5f9' }}
                                                >
                                                    <div className="py-1">
                                                        {timezones.map((tz) => (
                                                            <div
                                                                key={tz}
                                                                className="px-4 py-3 pointer dropdown-item-custom transition-all"
                                                                style={{
                                                                    backgroundColor: userProfile.timezone === tz ? '#f0f9fa' : 'transparent',
                                                                    color: userProfile.timezone === tz ? '#40878e' : '#334155',
                                                                    fontWeight: userProfile.timezone === tz ? '600' : '400'
                                                                }}
                                                                onClick={() => {
                                                                    setUserProfile({ ...userProfile, timezone: tz });
                                                                    setIsTimezoneOpen(false);
                                                                }}
                                                            >
                                                                {tz}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {renderEditActions()}
                                </Form>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                            <Card.Body className="p-4 py-3">
                                <label className="text-muted small d-block mb-1">{SETTINGS.APPLICATION.TIMEZONE}</label>
                                <span className="fw-medium text-dark">{userProfile.timezone}</span>
                            </Card.Body>
                        </Card>
                    )}
                </div>

                {/* Favorites Section */}
                <div className="settings-section rounded-4 p-4 mb-4" style={{ backgroundColor: '#f0f7ff' }}>
                    <div className="d-flex align-items-center mb-3">
                        <h5 className="fw-bold m-0" style={{ color: '#0f1d3a' }}>{SETTINGS.FAVORITES.TITLE}</h5>
                        {editingSection !== 'favorites' && renderEditIcon('favorites')}
                    </div>
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                        <Card.Body className="p-4">
                            {editingSection === 'favorites' ? (
                                <Form>
                                    <Row className="gy-4 mb-4">
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.FAVORITES.FLOWER}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={userProfile.favorites.flower}
                                                    className="bg-light border-0 py-2 rounded-3"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.FAVORITES.CAKE}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={userProfile.favorites.cake}
                                                    className="bg-light border-0 py-2 rounded-3"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.FAVORITES.STORE}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder={SETTINGS.FAVORITES.PLACEHOLDERS.STORE}
                                                    className="bg-light border-0 py-2 rounded-3"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="gy-4 mb-4">
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.FAVORITES.BUSINESS}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder={SETTINGS.FAVORITES.PLACEHOLDERS.BUSINESS}
                                                    className="bg-light border-0 py-2 rounded-3"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label className="text-muted small mb-2">{SETTINGS.FAVORITES.RESTAURANT}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder={SETTINGS.FAVORITES.PLACEHOLDERS.RESTAURANT}
                                                    className="bg-light border-0 py-2 rounded-3"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div className="d-flex justify-content-end gap-3 mt-2">
                                        <button
                                            type="button"
                                            className="btn btn-light px-4 py-2 rounded-3 border fw-medium"
                                            onClick={handleCancel}
                                        >
                                            {SETTINGS.BUTTONS.CANCEL}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn px-4 py-2 rounded-3 fw-medium text-white shadow-sm"
                                            style={{ backgroundColor: '#4a8b8f' }}
                                            onClick={handleSave}
                                        >
                                            {SETTINGS.BUTTONS.CHANGE}
                                        </button>
                                    </div>
                                </Form>
                            ) : (
                                <Row className="gy-4">
                                    <Col md={4}>
                                        <label className="text-muted small d-block mb-1">{SETTINGS.FAVORITES.FLOWER}</label>
                                        <span className="fw-medium text-dark">{userProfile.favorites.flower}</span>
                                    </Col>
                                    <Col md={4}>
                                        <label className="text-muted small d-block mb-1">{SETTINGS.FAVORITES.CAKE}</label>
                                        <span className="fw-medium text-dark">{userProfile.favorites.cake}</span>
                                    </Col>
                                    <Col md={4}>
                                        <label className="text-muted small d-block mb-1">{SETTINGS.FAVORITES.STORE}</label>
                                        <span className="fw-medium text-dark">{userProfile.favorites.store}</span>
                                    </Col>
                                    <Col md={4}>
                                        <label className="text-muted small d-block mb-1">{SETTINGS.FAVORITES.BUSINESS}</label>
                                        <span className="fw-medium text-dark">{userProfile.favorites.business}</span>
                                    </Col>
                                    <Col md={4}>
                                        <label className="text-muted small d-block mb-1">{SETTINGS.FAVORITES.RESTAURANT}</label>
                                        <span className="fw-medium text-dark">{userProfile.favorites.restaurant}</span>
                                    </Col>
                                </Row>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Container>
    );
};

export default Settings;
