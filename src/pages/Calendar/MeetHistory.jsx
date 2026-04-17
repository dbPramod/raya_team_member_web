import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import MeetDetails from './MeetDetails';
const MOCK_MEET_HISTORY = [
    {
        id: 1,
        date: '12/01/2026',
        title: 'Sapphire Project - Planning and Progress',
        desc: 'Phase 2 was executed very effectively, with thorough preparation and a clear understanding of the objectives. The groundwork laid during the planning stage helped streamline the execution process, minimize challenges, and ensure timely progress.',
        action: 'Add Notes'
    },
    {
        id: 2,
        date: '20/12/2025',
        title: 'Jade Project - Team Meet',
        desc: 'Attention to detail and proactive coordination contributed to smoother workflows and better alignment across tasks. Overall, the strong preparation played a key role in the successful completion of Phase 2 and set a solid foundation for the upcoming phases.',
        action: 'View'
    },
    {
        id: 3,
        date: '21/10/2025',
        title: 'Ruby Project - Presentation',
        desc: 'Attention to detail and proactive coordination contributed to smoother workflows and better alignment across tasks. Overall, the strong preparation played a key role in the successful completion of Phase 2 and set a solid foundation for the upcoming phases.',
        action: 'View'
    },
    {
        id: 4,
        date: '12/01/2025',
        title: 'Sapphire Project - Planning and Progress',
        desc: 'Phase 2 was executed very effectively, with thorough preparation and a clear understanding of the objectives. The groundwork laid during the planning stage helped streamline the execution process, minimize challenges, and ensure timely progress.',
        action: 'View'
    }
];

const MeetHistory = ({ onBack }) => {
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [noteContent, setNoteContent] = useState('');
    const [selectedMeet, setSelectedMeet] = useState(null);

    if (selectedMeet) {
        return <MeetDetails meet={selectedMeet} onBack={() => setSelectedMeet(null)} />;
    }

    return (
        <div className="meet-history-container">
            <div className="d-flex align-items-center mb-4">
                <button className="btn btn-link text-dark text-decoration-none p-0 me-3" onClick={onBack}>
                    <i className="bi bi-arrow-left fs-5"></i>
                </button>
                <h1 className="calendar-page-title m-0">Meet History</h1>
            </div>
            <div className="meet-history-list">
                {MOCK_MEET_HISTORY.map(history => (
                    <div key={history.id} className="meet-history-card">
                        <div className="mhc-header">
                            <span className="mhc-date">Date: {history.date}</span>
                            <div className="mhc-avatars">
                                <img src="https://i.pravatar.cc/150?u=1" className="mhc-avatar" alt="Avatar 1" />
                                <img src="https://i.pravatar.cc/150?u=2" className="mhc-avatar" alt="Avatar 2" />
                                <img src="https://i.pravatar.cc/150?u=3" className="mhc-avatar" alt="Avatar 3" />
                            </div>
                        </div>
                        <div className="mhc-body">
                            <div className="mhc-content">
                                <h4 className="mhc-title">{history.title}</h4>
                                <p className="mhc-desc">{history.desc}</p>
                            </div>
                            <div className="mhc-actions">
                                <button
                                    className={`mhc-btn btn-mhc-outline`}
                                    onClick={() => {
                                        if (history.action === 'Add Notes') {
                                            setShowNotesModal(true);
                                        } else {
                                            setSelectedMeet(history);
                                        }
                                    }}
                                >
                                    {history.action}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Add Notes Modal ── */}
            <Modal show={showNotesModal} onHide={() => setShowNotesModal(false)} centered size="md" className="timeoff-modal view-leave-modal" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <div className="rto-modal-header border-bottom-0 pb-0">
                    <button className="rto-close-btn" onClick={() => setShowNotesModal(false)}>
                        <i className="bi bi-x"></i>
                    </button>
                    <h5 className="rto-modal-title">Add Notes</h5>
                </div>

                <div className="rto-modal-body pt-3">
                    <div className="rto-field mb-4">
                        <label className="rto-label">Notes</label>
                        <textarea
                            className="form-control border-0 bg-light p-3 rounded-3"
                            placeholder="Add notes..."
                            rows="4"
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                            style={{ fontSize: '0.9rem', color: 'var(--color-navy-primary)', resize: 'none' }}
                        ></textarea>
                    </div>
                </div>

                <div className="rto-modal-footer vlm-footer pb-4 pt-0" style={{ fontFamily: "'DM Sans', sans-serif !important" }}>
                    <button className="rto-btn-cancel vlm-btn" onClick={() => setShowNotesModal(false)}>Cancel</button>
                    <button className="rto-btn-apply vlm-btn" onClick={() => setShowNotesModal(false)}>Add</button>
                </div>
            </Modal>
        </div>
    );
};

export default MeetHistory;
