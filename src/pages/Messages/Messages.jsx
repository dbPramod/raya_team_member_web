import React, { useState } from 'react';
import RoomInfo from './RoomInfo';
const MOCK_ROOMS = [
    { id: '1', name: 'Digital Wizards', subtitle: '27 Members', avatar: 'J&J', color: '#dc2626' },
    { id: '2', name: 'InnovateTech Solutions', subtitle: '89 Members', avatar: 'IT', color: '#1e3a8a' },
    { id: '3', name: 'Code Craze', subtitle: '95 Members', avatar: 'CC', color: '#ea580c' },
    { id: '4', name: 'Robert Parker', subtitle: '34 Members', unread: 2, avatar: 'RP', color: '#ffffff', textColor: '#0f1d3a', border: true },
    { id: '5', name: 'Tom Hardy', subtitle: '42 Members', avatar: 'TH', color: '#facc15' },
    { id: '6', name: 'Franz Kafka', subtitle: '58 Members', avatar: 'FK', color: '#000000' },
    { id: '7', name: 'Stan Smith', subtitle: '63 Members', avatar: 'SS', color: '#2563eb' },
    { id: '8', name: 'George Orwell', subtitle: '71 Members', time: '16:45', avatar: 'GO', color: '#000000' }
];

const MOCK_TEAM = [
    { id: 't1', name: 'John Doe', subtitle: 'How are you doing?', avatar: 'https://i.pravatar.cc/150?u=12' },
    { id: 't2', name: 'Travis Barker', subtitle: 'you: See you tomorrow!', avatar: 'https://i.pravatar.cc/150?u=13', active: true },
    { id: 't3', name: 'Kate Rose', subtitle: 'you: See you tomorrow!', avatar: 'https://i.pravatar.cc/150?u=14' },
    { id: 't4', name: 'Robert Parker', subtitle: 'Awesome!', unread: 2, avatar: 'https://i.pravatar.cc/150?u=15' },
    { id: 't5', name: 'Tom Hardy', subtitle: 'Smells like design spirit..', avatar: 'https://i.pravatar.cc/150?u=16' },
    { id: 't6', name: 'Franz Kafka', subtitle: 'Are you interested in insectitides for..', avatar: 'https://i.pravatar.cc/150?u=17' },
    { id: 't7', name: 'Stan Smith', subtitle: 'Want to see this kicks rn', avatar: 'https://i.pravatar.cc/150?u=18' },
    { id: 't7', name: 'Stan Smith', subtitle: 'Want to see this kicks rn', avatar: 'https://i.pravatar.cc/150?u=18' },
    { id: 't7', name: 'Stan Smith', subtitle: 'Want to see this kicks rn', avatar: 'https://i.pravatar.cc/150?u=18' },
    { id: 't7', name: 'Stan Smith', subtitle: 'Want to see this kicks rn', avatar: 'https://i.pravatar.cc/150?u=18' }
];

const MOCK_CHAT = [
    { type: 'image', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80' },
    { type: 'link', text: 'https://dribbble.com/shots/17742253-ui-kit-designjam' },
    { type: 'text', text: 'See you at office tomorrow!', sender: 'them' },
    { type: 'text', text: 'Thank you for work, see you!', sender: 'me' },
    { type: 'text', text: 'Hello! Have you seen my backpack anywhere in office?', sender: 'them', showAvatar: true, avatarUrl: 'https://i.pravatar.cc/150?u=99' },
    { type: 'text', text: 'Hello! Have you seen my backpack anywhere in office?', sender: 'them', showAvatar: true, avatarUrl: 'https://i.pravatar.cc/150?u=99' },
    { type: 'text', text: 'Hello! Have you seen my backpack anywhere in office?', sender: 'them', showAvatar: true, avatarUrl: 'https://i.pravatar.cc/150?u=99' }
];

const Messages = () => {
    const [tab, setTab] = useState('Team');
    const [showRoomInfo, setShowRoomInfo] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);

    return (
        <div className={`messages-page-wrapper ${(isChatActive || (showRoomInfo && tab === 'Rooms')) ? 'chat-active' : ''}`}>
            <div className="msg-sidebar">
                <h2 className="msg-title">Messages</h2>
                <div className="msg-tab-toggle">
                    <button
                        className={`msg-tab-btn ${tab === 'Team' ? 'active' : ''}`}
                        onClick={() => setTab('Team')}
                    >Team</button>
                    <button
                        className={`msg-tab-btn ${tab === 'Rooms' ? 'active' : ''}`}
                        onClick={() => setTab('Rooms')}
                    >Rooms</button>
                </div>

                {tab === 'Team' ? (
                    <div className="msg-search-box">
                        <i className="bi bi-search text-muted"></i>
                        <input type="text" placeholder="Search..." />
                    </div>
                ) : (
                    <div className="msg-search-box hidden-spacer" style={{ visibility: 'hidden' }}>
                        <input type="text" />
                    </div>
                )}

                <div className="msg-list-wrapper custom-scrollbar">
                    {(tab === 'Rooms' ? MOCK_ROOMS : MOCK_TEAM).map((item) => (
                        <div 
                            key={item.id} 
                            className={`msg-list-item ${item.active ? 'active-chat' : ''}`}
                            onClick={() => setIsChatActive(true)}
                        >
                            {item.avatar.startsWith('http') ? (
                                <img src={item.avatar} alt={item.name} className="msg-list-avatar" />
                            ) : (
                                <div
                                    className="msg-list-avatar-text"
                                    style={{
                                        backgroundColor: item.color,
                                        color: item.textColor || 'white',
                                        border: item.border ? '1px solid #e2e8f0' : 'none'
                                    }}
                                >
                                    {item.avatar}
                                </div>
                            )}
                            <div className="msg-list-info">
                                <div className="msg-list-name">{item.name}</div>
                                <div className="msg-list-sub">{item.subtitle}</div>
                            </div>
                            <div className="msg-list-meta">
                                {item.unread && <span className="msg-badge">{item.unread}</span>}
                                {item.time && <span className="msg-time">{item.time}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showRoomInfo && tab === 'Rooms' ? (
                <RoomInfo room={MOCK_ROOMS[0]} onBack={() => {
                    setShowRoomInfo(false);
                    setIsChatActive(false);
                }} />
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
                            <div className="d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={() => setShowRoomInfo(true)}>
                                <div className="msg-list-avatar-text me-3" style={{ backgroundColor: '#dc2626', color: 'white', width: '48px', height: '48px' }}>J&J</div>
                                <div>
                                    <h5 className="m-0 fw-bold text-dark">Digital Wizards</h5>
                                    <span className="text-secondary small">27 Members</span>
                                </div>
                            </div>
                        ) : (
                        <div className="d-flex align-items-center">
                            <img src="https://i.pravatar.cc/150?u=13" alt="Avatar" className="msg-list-avatar me-3" style={{ width: '48px', height: '48px' }} />
                            <h5 className="m-0 fw-bold text-dark">Travis Barker</h5>
                        </div>
                    )}
                </div>

                <div className="msg-chat-history custom-scrollbar">
                    {MOCK_CHAT.map((msg, i) => {
                        if (msg.type === 'image') {
                            return (
                                <div key={i} className="msg-bubble-container them">
                                    <div className="msg-bubble img-bubble">
                                        <img src={msg.url} alt="attachment" />
                                    </div>
                                </div>
                            )
                        }
                        if (msg.type === 'link') {
                            return (
                                <div key={i} className="msg-bubble-container them mt-1">
                                    <div className="msg-bubble link-bubble">
                                        {msg.text}
                                    </div>
                                </div>
                            )
                        }
                        return (
                            <div key={i} className={`msg-bubble-container ${msg.sender} ${msg.showAvatar ? 'with-avatar' : ''}`}>
                                {msg.showAvatar && <img src={msg.avatarUrl} alt="av" className="msg-sender-avatar" />}
                                <div className={`msg-bubble text-bubble ${msg.sender}`}>
                                    {msg.text}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="msg-input-area">
                    <button className="msg-icon-btn"><i className="bi bi-paperclip"></i></button>
                    <input type="text" className="msg-input-field" placeholder="Type your message here.." />
                    <button className="msg-send-btn"><i className="bi bi-send"></i></button>
                </div>
            </div>
            )}
        </div>
    );
};

export default Messages;
