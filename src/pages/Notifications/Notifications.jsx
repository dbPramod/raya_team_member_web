import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const MOCK_NOTIFICATIONS = [
    { id: 1, title: 'New Task Assigned', desc: 'Sapphire Bright new policies update.', time: '1 min ago', unread: true },
    { id: 2, title: 'Meet Scheduled', desc: 'Meet scheduled on 15th Jan for discussing presentation.', time: '1 day ago', unread: true },
    { id: 3, title: 'New Feature Released', desc: 'A new feature is now available on the platform. Explore it to improve your workflow.', time: '1 month ago', unread: false },
    { id: 4, title: 'Data Backup Completed', desc: 'System data has been successfully backed up.', time: '1 month ago', unread: false },
    { id: 5, title: 'Security Update Applied', desc: 'A security update has been successfully applied across the platform.', time: '1 month ago', unread: false }
];

const Notifications = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    return (
        <Container fluid className="notifications-page-container px-0 py-2">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2">
                <div className="d-flex align-items-center">
                    <button className="btn btn-link text-dark text-decoration-none p-0 me-3" onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left fs-4"></i>
                    </button>
                    <h2 className="notifications-title m-0">Notifications</h2>
                </div>
                <button className="btn btn-link text-decoration-none p-0 notif-read-all" onClick={markAllRead}>
                    Read All
                </button>
            </div>

            <div className="notifications-list">
                {notifications.map(notif => (
                    <div key={notif.id} className={`notification-card ${notif.unread ? 'unread' : 'read'}`}>
                        <div className="notif-icon-wrapper">
                            <i className="bi bi-bell"></i>
                        </div>
                        <div className="notif-content">
                            <h5 className="notif-item-title">{notif.title}</h5>
                            <p className="notif-item-desc">{notif.desc}</p>
                            <span className="notif-item-time">{notif.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Notifications;
