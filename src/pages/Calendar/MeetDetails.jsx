import React from 'react';
const MeetDetails = ({ meet, onBack }) => {
    // For mock purposes, using static bullet points matching the Figma design screenshot
    const notes = [
        "Phase 1 gave us a clear idea about what to expect from the project",
        "Phase 2 was executed very effectively, with thorough preparation and a clear understanding of the objectives. The groundwork laid during the planning stage helped streamline the execution process, minimize challenges, and ensure timely progress.",
        "Attention to detail and proactive coordination contributed to smoother workflows and better alignment across tasks.",
        "Overall, the strong preparation played a key role in the successful completion of Phase 2 and set a solid foundation for the upcoming phases.",
        "Planning for Phase 3 and 4 should begin next week.",
        "Stakeholder feedback will be crucial as we transition into these next phases, ensuring that all perspectives are considered.",
        "We will leverage lessons learned from the previous phases to optimize our strategies and enhance collaboration."
    ];

    const attendees = [
        { id: 1, name: 'Emerald Muse', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Azure Gale', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Emerald Muse', avatar: 'https://i.pravatar.cc/150?u=3' },
        { id: 4, name: 'Amber Bliss', avatar: 'https://i.pravatar.cc/150?u=4' },
        { id: 5, name: 'Emerald Muse', avatar: 'https://i.pravatar.cc/150?u=5' },
        { id: 6, name: 'Earl Mathew', avatar: 'https://i.pravatar.cc/150?u=6' },
    ];

    return (
        <div className="meet-details-container">
            <div className="d-flex align-items-center mb-4">
                <button className="btn btn-link text-dark text-decoration-none p-0 me-3" onClick={onBack}>
                    <i className="bi bi-arrow-left fs-5"></i>
                </button>
                <h1 className="md-page-title m-0">Member name - {meet?.title?.split(' - ')[1] || 'Planning and Progress'}</h1>
            </div>

            <div className="md-content-grid">
                <div className="md-notes-card">
                    <h3 className="md-card-title">Notes</h3>
                    <ul className="md-notes-list">
                        {notes.map((note, idx) => (
                            <li key={idx}>{note}</li>
                        ))}
                    </ul>
                </div>

                <div className="md-attendees-section">
                    <h3 className="md-card-title">People attended</h3>
                    <div className="md-attendees-card">
                        {attendees.map((person, idx) => (
                            <div key={person.id} className={`md-attendee-row ${idx === attendees.length - 1 ? 'last' : ''}`}>
                                <img src={person.avatar} alt={person.name} className="md-attendee-avatar" />
                                <span className="md-attendee-name">{person.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetDetails;
