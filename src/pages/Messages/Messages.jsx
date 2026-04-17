import React, { useEffect, useRef, useState } from 'react';
import RoomInfo from './RoomInfo';
import CustomToast from '../../components/common/CustomToast';

const MOCK_ROOMS = [
    { id: '1', name: 'Digital Wizards', subtitle: '27 Members', avatar: 'J&J', color: '#dc2626' },
    { id: '2', name: 'InnovateTech Solutions', subtitle: '89 Members', avatar: 'IT', color: '#1e3a8a' },
    { id: '3', name: 'Code Craze', subtitle: '95 Members', avatar: 'CC', color: '#ea580c' },
    { id: '4', name: 'Robert Parker', subtitle: '34 Members', unread: 2, avatar: 'RP', color: '#ffffff', textColor: 'var(--color-navy-primary)', border: true },
    { id: '5', name: 'Tom Hardy', subtitle: '42 Members', avatar: 'TH', color: '#facc15' },
    { id: '6', name: 'Franz Kafka', subtitle: '58 Members', avatar: 'FK', color: '#000000' },
    { id: '7', name: 'Stan Smith', subtitle: '63 Members', avatar: 'SS', color: '#2563eb' },
    { id: '8', name: 'George Orwell', subtitle: '71 Members', time: '16:45', avatar: 'GO', color: '#000000' }
];

const MOCK_TEAM = [
    { id: 't1', name: 'John Doe', subtitle: 'How are you doing?', avatar: 'https://i.pravatar.cc/150?u=12' },
    { id: 't2', name: 'Travis Barker', subtitle: 'you: See you tomorrow!', avatar: 'https://i.pravatar.cc/150?u=13' },
    { id: 't3', name: 'Kate Rose', subtitle: 'you: See you tomorrow!', avatar: 'https://i.pravatar.cc/150?u=14' },
    { id: 't4', name: 'Robert Parker', subtitle: 'Awesome!', unread: 2, avatar: 'https://i.pravatar.cc/150?u=15' },
    { id: 't5', name: 'Tom Hardy', subtitle: 'Smells like design spirit..', avatar: 'https://i.pravatar.cc/150?u=16' },
    { id: 't6', name: 'Franz Kafka', subtitle: 'Are you interested in insectitides for..', avatar: 'https://i.pravatar.cc/150?u=17' },
    { id: 't7', name: 'Stan Smith', subtitle: 'Want to see this kicks rn', avatar: 'https://i.pravatar.cc/150?u=18' },
    { id: 't8', name: 'George Orwell', subtitle: 'Can you review this copy?', avatar: 'https://i.pravatar.cc/150?u=19' },
    { id: 't9', name: 'Nina Brooks', subtitle: 'The deck is ready.', avatar: 'https://i.pravatar.cc/150?u=20' },
    { id: 't10', name: 'Liam Carter', subtitle: 'Lunch later?', avatar: 'https://i.pravatar.cc/150?u=21' }
];

const TEAM_MEMBER_PROFILE = {
    t1: { role: 'Frontend Developer', email: 'john.doe@swannave.com', phone: '+1 555-0121', location: 'Austin, TX', joined: 'Feb 2024', status: 'Online', about: 'Focuses on UI architecture and accessibility.' },
    t2: { role: 'Product Designer', email: 'travis.barker@swannave.com', phone: '+1 555-0122', location: 'San Diego, CA', joined: 'Jun 2023', status: 'Online', about: 'Design systems and interaction flows for mobile and web.' },
    t3: { role: 'QA Analyst', email: 'kate.rose@swannave.com', phone: '+1 555-0123', location: 'Seattle, WA', joined: 'Nov 2022', status: 'Away', about: 'Owns test coverage and release quality checks.' },
    t4: { role: 'Team Lead', email: 'robert.parker@swannave.com', phone: '+1 555-0124', location: 'Boston, MA', joined: 'Jan 2022', status: 'Busy', about: 'Coordinates team priorities and sprint planning.' },
    t5: { role: 'Visual Designer', email: 'tom.hardy@swannave.com', phone: '+1 555-0125', location: 'Chicago, IL', joined: 'Apr 2024', status: 'Online', about: 'Brand visuals, layouts, and marketing creatives.' },
    t6: { role: 'Backend Engineer', email: 'franz.kafka@swannave.com', phone: '+1 555-0126', location: 'New York, NY', joined: 'Mar 2021', status: 'Offline', about: 'API reliability, database modeling, and performance.' },
    t7: { role: 'Marketing Specialist', email: 'stan.smith@swannave.com', phone: '+1 555-0127', location: 'Denver, CO', joined: 'Jul 2023', status: 'Online', about: 'Campaign strategy, copywriting, and growth insights.' },
    t8: { role: 'Content Strategist', email: 'george.orwell@swannave.com', phone: '+1 555-0128', location: 'Portland, OR', joined: 'Sep 2022', status: 'Online', about: 'Editorial planning and cross-channel messaging.' },
    t9: { role: 'Project Manager', email: 'nina.brooks@swannave.com', phone: '+1 555-0129', location: 'Atlanta, GA', joined: 'Dec 2020', status: 'Away', about: 'Roadmap tracking and stakeholder communication.' },
    t10: { role: 'Operations Associate', email: 'liam.carter@swannave.com', phone: '+1 555-0130', location: 'Phoenix, AZ', joined: 'May 2024', status: 'Online', about: 'Internal process coordination and scheduling.' }
};

const INITIAL_CHAT_BY_ID = {
    t1: [
        { type: 'text', text: 'How are you doing?', sender: 'them', showAvatar: true, avatarUrl: 'https://i.pravatar.cc/150?u=12' }
    ],
    t2: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80' },
        { type: 'link', text: 'https://dribbble.com/shots/17742253-ui-kit-designjam' },
        { type: 'text', text: 'See you at office tomorrow!', sender: 'them' },
        { type: 'text', text: 'Thank you for work, see you!', sender: 'me' },
        { type: 'text', text: 'Hello! Have you seen my backpack anywhere in office?', sender: 'them', showAvatar: true, avatarUrl: 'https://i.pravatar.cc/150?u=13' },
        { type: 'text', text: 'Not yet, I will check near the meeting rooms.', sender: 'me' }
    ],
    t3: [
        { type: 'text', text: 'See you tomorrow!', sender: 'me' }
    ],
    t4: [
        { type: 'text', text: 'Awesome!', sender: 'them', showAvatar: true, avatarUrl: 'https://i.pravatar.cc/150?u=15' }
    ],
    t5: [
        { type: 'text', text: 'Smells like design spirit..', sender: 'them', showAvatar: true, avatarUrl: 'https://i.pravatar.cc/150?u=16' }
    ],
    t6: [
        { type: 'text', text: 'Are you interested in insectitides for..', sender: 'them', showAvatar: true, avatarUrl: 'https://i.pravatar.cc/150?u=17' }
    ],
    t7: [
        { type: 'text', text: 'Want to see this kicks rn', sender: 'them', showAvatar: true, avatarUrl: 'https://i.pravatar.cc/150?u=18' }
    ],
    t8: [
        { type: 'text', text: 'Can you review this copy?', sender: 'them', showAvatar: true, avatarUrl: 'https://i.pravatar.cc/150?u=19' }
    ],
    t9: [
        { type: 'text', text: 'The deck is ready.', sender: 'them', showAvatar: true, avatarUrl: 'https://i.pravatar.cc/150?u=20' }
    ],
    t10: [
        { type: 'text', text: 'Lunch later?', sender: 'them', showAvatar: true, avatarUrl: 'https://i.pravatar.cc/150?u=21' }
    ],
    1: [
        { type: 'text', text: 'Morning team, standup starts in 10 minutes.', sender: 'them' }
    ],
    2: [
        { type: 'text', text: 'Sprint planning notes are posted in the channel.', sender: 'them' }
    ],
    3: [
        { type: 'text', text: 'Code Craze demo is locked for Friday.', sender: 'them' }
    ],
    4: [
        { type: 'text', text: 'Can someone help with the onboarding checklist?', sender: 'them' }
    ],
    5: [
        { type: 'text', text: 'Tom Hardy joined the room.', sender: 'them' }
    ],
    6: [
        { type: 'text', text: 'Franz Kafka shared a document.', sender: 'them' }
    ],
    7: [
        { type: 'text', text: 'Stan Smith: Want to review the kicks concept?', sender: 'them' }
    ],
    8: [
        { type: 'text', text: 'George Orwell renamed the room topic.', sender: 'them' }
    ]
};

const getPreviewText = (messages = []) => {
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage) {
        return 'No messages yet';
    }

    if (lastMessage.type === 'image') {
        return lastMessage.sender === 'me' ? 'you: Sent an image' : 'Sent an image';
    }

    if (lastMessage.type === 'file') {
        return lastMessage.sender === 'me' ? `you: ${lastMessage.name}` : lastMessage.name;
    }

    if (lastMessage.type === 'link') {
        return lastMessage.sender === 'me' ? `you: ${lastMessage.text}` : lastMessage.text;
    }

    return lastMessage.sender === 'me' ? `you: ${lastMessage.text}` : lastMessage.text;
};

const formatFileSize = (size) => {
    if (!size) {
        return '0 KB';
    }

    if (size < 1024 * 1024) {
        return `${Math.max(1, Math.round(size / 1024))} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const isUrlMessage = (value) => /^(https?:\/\/|www\.)\S+$/i.test(value.trim());

const normalizeUrl = (value) => {
    const trimmedValue = value.trim();
    return /^https?:\/\//i.test(trimmedValue) ? trimmedValue : `https://${trimmedValue}`;
};

const Messages = () => {
    const [tab, setTab] = useState('Team');
    const [showRoomInfo, setShowRoomInfo] = useState(false);
    const [showMemberInfo, setShowMemberInfo] = useState(false);
    const [showMemberPreview, setShowMemberPreview] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);
    const [selectedTeamId, setSelectedTeamId] = useState('t2');
    const [selectedRoomId, setSelectedRoomId] = useState('1');
    const [messageText, setMessageText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [chatById, setChatById] = useState(INITIAL_CHAT_BY_ID);
    const [showAttachmentPicker, setShowAttachmentPicker] = useState(false);
    const [copiedLink, setCopiedLink] = useState('');
    const [toastState, setToastState] = useState({
        show: false,
        title: '',
        message: '',
        variant: 'info'
    });
    const chatEndRef = useRef(null);
    const galleryInputRef = useRef(null);
    const cameraInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const toastTimeoutRef = useRef(null);

    const selectedId = tab === 'Rooms' ? selectedRoomId : selectedTeamId;
    const selectedList = tab === 'Rooms' ? MOCK_ROOMS : MOCK_TEAM;
    const selectedItem = selectedList.find((item) => item.id === selectedId) || selectedList[0];
    const selectedMemberProfile = TEAM_MEMBER_PROFILE[selectedTeamId] || {};
    const currentChat = chatById[selectedId] || [];

    const filteredItems = selectedList.filter((item) => {
        if (tab === 'Rooms') {
            return true;
        }

        const normalizedQuery = searchTerm.trim().toLowerCase();

        if (!normalizedQuery) {
            return true;
        }

        return item.name.toLowerCase().includes(normalizedQuery);
    });

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentChat, selectedId]);

    useEffect(() => () => {
        if (toastTimeoutRef.current) {
            window.clearTimeout(toastTimeoutRef.current);
        }
    }, []);

    const showToast = (title, message, variant = 'info') => {
        if (toastTimeoutRef.current) {
            window.clearTimeout(toastTimeoutRef.current);
        }

        setToastState({
            show: true,
            title,
            message,
            variant
        });

        toastTimeoutRef.current = window.setTimeout(() => {
            setToastState((prev) => ({ ...prev, show: false }));
        }, 2200);
    };

    const handleSelectConversation = (itemId) => {
        setIsChatActive(true);
        setShowRoomInfo(false);
        setShowMemberInfo(false);

        if (tab === 'Rooms') {
            setSelectedRoomId(itemId);
            return;
        }

        setSelectedTeamId(itemId);
    };

    const handleTabChange = (nextTab) => {
        setTab(nextTab);
        setShowRoomInfo(false);
        setShowMemberInfo(false);
        setIsChatActive(false);
        setMessageText('');
        setShowAttachmentPicker(false);
    };

    const appendMessage = (nextMessage) => {
        setChatById((prev) => ({
            ...prev,
            [selectedId]: [...(prev[selectedId] || []), nextMessage]
        }));
        setIsChatActive(true);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();

        const trimmedMessage = messageText.trim();

        if (!trimmedMessage) {
            return;
        }

        if (isUrlMessage(trimmedMessage)) {
            appendMessage({
                type: 'link',
                text: normalizeUrl(trimmedMessage),
                sender: 'me'
            });
        } else {
            appendMessage({ type: 'text', text: trimmedMessage, sender: 'me' });
        }
        setMessageText('');
    };

    const handleCopyLink = async (linkUrl) => {
        try {
            await navigator.clipboard.writeText(linkUrl);
            setCopiedLink(linkUrl);
            showToast('Link copied', 'The link has been copied to your clipboard.', 'success');
            window.setTimeout(() => {
                setCopiedLink((currentValue) => (currentValue === linkUrl ? '' : currentValue));
            }, 1500);
        } catch (error) {
            showToast('Copy failed', 'Clipboard access was blocked by the browser.', 'error');
        }
    };

    const handleAttachmentSelection = (event, attachmentType) => {
        const selectedFiles = Array.from(event.target.files || []);

        if (!selectedFiles.length) {
            return;
        }

        selectedFiles.forEach((file) => {
            if (attachmentType === 'gallery' || attachmentType === 'camera') {
                appendMessage({
                    type: 'image',
                    url: URL.createObjectURL(file),
                    sender: 'me',
                    name: file.name || 'Photo attachment'
                });
                return;
            }

            appendMessage({
                type: 'file',
                sender: 'me',
                name: file.name,
                size: formatFileSize(file.size),
                extension: file.name.split('.').pop()?.toUpperCase() || 'FILE',
                url: URL.createObjectURL(file)
            });
        });

        event.target.value = '';
        setShowAttachmentPicker(false);
        showToast(
            attachmentType === 'camera' ? 'Photo attached' : attachmentType === 'gallery' ? 'Images attached' : 'Files attached',
            `${selectedFiles.length} item${selectedFiles.length > 1 ? 's were' : ' was'} added to the conversation.`,
            'success'
        );
    };

    return (
        <div className={`messages-page-wrapper ${(isChatActive || (showRoomInfo && tab === 'Rooms')) ? 'chat-active' : ''}`}>
            <CustomToast
                show={toastState.show}
                title={toastState.title}
                message={toastState.message}
                variant={toastState.variant}
                onClose={() => setToastState((prev) => ({ ...prev, show: false }))}
            />
            <div className="msg-sidebar">
                <h2 className="msg-title">Messages</h2>
                <div className="msg-tab-toggle">
                    <button
                        className={`msg-tab-btn ${tab === 'Team' ? 'active' : ''}`}
                        onClick={() => handleTabChange('Team')}
                    >
                        Team
                    </button>
                    <button
                        className={`msg-tab-btn ${tab === 'Rooms' ? 'active' : ''}`}
                        onClick={() => handleTabChange('Rooms')}
                    >
                        Rooms
                    </button>
                </div>

                {tab === 'Team' ? (
                    <div className="msg-search-box">
                        <i className="bi bi-search text-muted"></i>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>
                ) : (
                    <div className="msg-search-box hidden-spacer" style={{ visibility: 'hidden' }}>
                        <input type="text" readOnly />
                    </div>
                )}

                <div className="msg-list-wrapper custom-scrollbar">
                    {filteredItems.map((item) => {
                        const itemMessages = chatById[item.id] || [];
                        const isActive = item.id === selectedId;

                        return (
                            <div
                                key={item.id}
                                className={`msg-list-item ${isActive ? 'active-chat' : ''}`}
                                onClick={() => handleSelectConversation(item.id)}
                            >
                                {item.avatar.startsWith('http') ? (
                                    <img src={item.avatar} alt={item.name} className="msg-list-avatar" />
                                ) : (
                                    <div
                                        className="msg-list-avatar-text"
                                        style={{
                                            backgroundColor: item.color,
                                            color: item.textColor || 'white',
                                            border: item.border ? '1px solid var(--color-gray-light)' : 'none'
                                        }}
                                    >
                                        {item.avatar}
                                    </div>
                                )}
                                <div className="msg-list-info">
                                    <div className="msg-list-name">{item.name}</div>
                                    <div className="msg-list-sub">{getPreviewText(itemMessages) || item.subtitle}</div>
                                </div>
                                <div className="msg-list-meta">
                                    {item.unread && <span className="msg-badge">{item.unread}</span>}
                                    {item.time && <span className="msg-time">{item.time}</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {showRoomInfo && tab === 'Rooms' ? (
                <RoomInfo
                    room={selectedItem}
                    onBack={() => {
                        setShowRoomInfo(false);
                        setIsChatActive(false);
                    }}
                />
            ) : showMemberInfo && tab === 'Team' ? (
                <div className="member-info-pane">
                    <div className="ri-header">
                        <button className="btn btn-link text-dark text-decoration-none p-0 me-3" onClick={() => setShowMemberInfo(false)}>
                            <i className="bi bi-arrow-left fs-5"></i>
                        </button>
                        <h4 className="ri-title m-0">Member Profile</h4>
                    </div>
                    <div className="ri-body custom-scrollbar">
                        <div className="member-profile-content">
                            <div className="ri-profile-section text-center">
                                <img src={selectedItem?.avatar} alt={selectedItem?.name} className="member-profile-avatar" />
                                <h2 className="ri-room-name">{selectedItem?.name}</h2>
                                <p className="member-profile-role">{selectedMemberProfile.role || 'Team Member'}</p>
                                <span className={`member-status-pill ${selectedMemberProfile.status?.toLowerCase() || 'online'}`}>
                                    {selectedMemberProfile.status || 'Online'}
                                </span>
                                {/* <button
                                    type="button"
                                    className="member-preview-btn"
                                    onClick={() => setShowMemberPreview(true)}
                                >
                                    View Preview
                                </button> */}
                            </div>

                            <div className="ri-members-card member-details-card">
                                <div className="ri-card-header">
                                    <h4 className="m-0">Details</h4>
                                </div>
                                <div className="member-detail-list">
                                    <div className="member-detail-row">
                                        <span>Email</span>
                                        <strong>{selectedMemberProfile.email || 'member@swannave.com'}</strong>
                                    </div>
                                    <div className="member-detail-row">
                                        <span>Phone</span>
                                        <strong>{selectedMemberProfile.phone || '+1 555-0000'}</strong>
                                    </div>
                                    <div className="member-detail-row">
                                        <span>Location</span>
                                        <strong>{selectedMemberProfile.location || 'United States'}</strong>
                                    </div>
                                    <div className="member-detail-row">
                                        <span>Joined</span>
                                        <strong>{selectedMemberProfile.joined || '2024'}</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="ri-members-card member-about-card">
                                <div className="ri-card-header">
                                    <h4 className="m-0">About</h4>
                                </div>
                                <div className="member-about-body">
                                    <p className="member-about-text mb-0">
                                        {selectedMemberProfile.about || 'Actively collaborating with the team and supporting project delivery.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showMemberPreview ? (
                        <div className="member-preview-overlay" onClick={() => setShowMemberPreview(false)}>
                            <div className="member-preview-modal" onClick={(event) => event.stopPropagation()}>
                                <button
                                    type="button"
                                    className="member-preview-close"
                                    onClick={() => setShowMemberPreview(false)}
                                    aria-label="Close preview"
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                                <img src={selectedItem?.avatar} alt={selectedItem?.name} className="member-preview-avatar" />
                                <h4 className="member-preview-name">{selectedItem?.name}</h4>
                                <p className="member-preview-role">{selectedMemberProfile.role || 'Team Member'}</p>
                                <span className={`member-status-pill ${selectedMemberProfile.status?.toLowerCase() || 'online'}`}>
                                    {selectedMemberProfile.status || 'Online'}
                                </span>
                                <div className="member-preview-about">
                                    {selectedMemberProfile.about || 'Actively collaborating with the team and supporting project delivery.'}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : (
                <div className="msg-main-pane">
                    <div className="msg-header d-flex align-items-center">
                        <button
                            className="btn btn-link text-dark d-md-none me-3 p-0"
                            onClick={() => setIsChatActive(false)}
                        >
                            <i className="bi bi-arrow-left fs-4"></i>
                        </button>
                        {tab === 'Rooms' ? (
                            <div
                                className="d-flex align-items-center"
                                style={{ cursor: 'pointer' }}
                                onClick={() => setShowRoomInfo(true)}
                            >
                                <div
                                    className="msg-list-avatar-text me-3"
                                    style={{
                                        backgroundColor: selectedItem?.color || '#dc2626',
                                        color: selectedItem?.textColor || 'white',
                                        width: '48px',
                                        height: '48px',
                                        border: selectedItem?.border ? '1px solid var(--color-gray-light)' : 'none'
                                    }}
                                >
                                    {selectedItem?.avatar || 'J&J'}
                                </div>
                                <div>
                                    <h5 className="m-0 fw-bold text-dark">{selectedItem?.name || 'Digital Wizards'}</h5>
                                    <span className="text-secondary small">{selectedItem?.subtitle || '27 Members'}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center">
                                <div
                                    className="d-flex align-items-center"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setShowMemberInfo(true)}
                                >
                                    <img
                                        src={selectedItem?.avatar}
                                        alt={selectedItem?.name || 'Avatar'}
                                        className="msg-list-avatar me-3"
                                        style={{ width: '48px', height: '48px' }}
                                    />
                                    <div>
                                        <h5 className="m-0 fw-bold text-dark">{selectedItem?.name || 'Travis Barker'}</h5>
                                        <span className="text-secondary small">View profile</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="msg-chat-history custom-scrollbar">
                        {currentChat.map((msg, index) => {
                            if (msg.type === 'image') {
                                return (
                                    <div key={`${selectedId}-${index}`} className={`msg-bubble-container ${msg.sender || 'them'}`}>
                                        <div className="msg-bubble img-bubble">
                                            <img src={msg.url} alt={msg.name || 'attachment'} />
                                        </div>
                                    </div>
                                );
                            }

                            if (msg.type === 'file') {
                                return (
                                    <div key={`${selectedId}-${index}`} className={`msg-bubble-container ${msg.sender || 'them'}`}>
                                        <a
                                            className={`msg-bubble file-bubble ${msg.sender || 'them'}`}
                                            href={msg.url}
                                            download={msg.name}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <div className="msg-file-icon">
                                                <i className="bi bi-file-earmark-arrow-down"></i>
                                            </div>
                                            <div className="msg-file-meta">
                                                <span className="msg-file-name">{msg.name}</span>
                                                <span className="msg-file-sub">{msg.extension} • {msg.size}</span>
                                            </div>
                                        </a>
                                    </div>
                                );
                            }

                            if (msg.type === 'link') {
                                return (
                                    <div key={`${selectedId}-${index}`} className={`msg-bubble-container ${msg.sender || 'them'} mt-1`}>
                                        <div className={`msg-bubble link-bubble ${msg.sender || 'them'}`}>
                                            <a href={msg.text} target="_blank" rel="noreferrer" className="msg-link-anchor">
                                                {msg.text}
                                            </a>
                                            <button
                                                type="button"
                                                className="msg-link-copy-btn"
                                                onClick={() => handleCopyLink(msg.text)}
                                            >
                                                {copiedLink === msg.text ? 'Copied' : 'Copy'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={`${selectedId}-${index}`}
                                    className={`msg-bubble-container ${msg.sender} ${msg.showAvatar ? 'with-avatar' : ''}`}
                                >
                                    {msg.showAvatar && <img src={msg.avatarUrl} alt="av" className="msg-sender-avatar" />}
                                    <div className={`msg-bubble text-bubble ${msg.sender}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={chatEndRef} />
                    </div>

                    <form className="msg-input-area" onSubmit={handleSendMessage}>
                        <div className="msg-attachment-wrapper">
                            <button
                                type="button"
                                className={`msg-icon-btn ${showAttachmentPicker ? 'active' : ''}`}
                                aria-label="Attach file"
                                onClick={() => setShowAttachmentPicker((prev) => !prev)}
                            >
                                <i className="bi bi-paperclip"></i>
                            </button>
                            {showAttachmentPicker && (
                                <div className="msg-attachment-picker">
                                    <button type="button" className="msg-attachment-option" onClick={() => galleryInputRef.current?.click()}>
                                        <i className="bi bi-image"></i>
                                        Gallery
                                    </button>
                                    <button type="button" className="msg-attachment-option" onClick={() => cameraInputRef.current?.click()}>
                                        <i className="bi bi-camera"></i>
                                        Camera
                                    </button>
                                    <button type="button" className="msg-attachment-option" onClick={() => fileInputRef.current?.click()}>
                                        <i className="bi bi-folder2-open"></i>
                                        Files
                                    </button>
                                </div>
                            )}
                            <input
                                ref={galleryInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                hidden
                                onChange={(event) => handleAttachmentSelection(event, 'gallery')}
                            />
                            <input
                                ref={cameraInputRef}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                hidden
                                onChange={(event) => handleAttachmentSelection(event, 'camera')}
                            />
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                hidden
                                onChange={(event) => handleAttachmentSelection(event, 'file')}
                            />
                        </div>
                        <input
                            type="text"
                            className="msg-input-field"
                            placeholder="Type your message here.."
                            value={messageText}
                            onChange={(event) => setMessageText(event.target.value)}
                        />
                        <button type="submit" className="msg-send-btn" aria-label="Send message">
                            <i className="bi bi-send"></i>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Messages;
