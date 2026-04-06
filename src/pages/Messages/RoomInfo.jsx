import React from 'react';
const MOCK_MEMBERS = [
    { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=12', role: 'Group Admin' },
    { id: 2, name: 'Robert Parker', avatar: 'https://i.pravatar.cc/150?u=15' },
    { id: 3, name: 'Travis Barker', avatar: 'https://i.pravatar.cc/150?u=13' },
    { id: 4, name: 'Robert Parker', avatar: 'https://i.pravatar.cc/150?u=15' }
];

const RoomInfo = ({ room, onBack }) => {
    return (
        <div className="room-info-pane">
            <div className="ri-header">
                <button className="btn btn-link text-dark text-decoration-none p-0 me-3" onClick={onBack}>
                    <i className="bi bi-arrow-left fs-5"></i>
                </button>
                <h4 className="ri-title m-0">Room Info</h4>
            </div>

            <div className="ri-body custom-scrollbar">
                <div className="ri-profile-section text-center">
                    <div className="ri-avatar-large" style={{ backgroundColor: room?.color || '#dc2626' }}>
                        {room?.avatar || 'J&J'}
                    </div>
                    <h2 className="ri-room-name">{room?.name || 'Digital Wizards'}</h2>
                </div>

                <div className="ri-members-card">
                    <div className="ri-card-header">
                        <h4 className="m-0">Members</h4>
                        <span className="text-secondary">{room?.subtitle || '27 Members'} in group</span>
                    </div>
                    <div className="ri-members-list">
                        {MOCK_MEMBERS.map((member, idx) => (
                            <div key={`${member.id}-${idx}`} className="ri-member-row">
                                <div className="d-flex align-items-center">
                                    <img src={member.avatar} alt={member.name} className="ri-member-avatar" />
                                    <span className="ri-member-name">{member.name}</span>
                                </div>
                                {member.role === 'Group Admin' && (
                                    <span className="ri-role-badge">{member.role}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomInfo;
