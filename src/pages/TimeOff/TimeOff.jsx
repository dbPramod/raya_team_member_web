import React, { useState } from 'react';
import { Container, Modal, Form, Row, Col } from 'react-bootstrap';
/* ══════════════════════════════════════════════
   Status Badge
══════════════════════════════════════════════ */
const StatusBadge = ({ status }) => {
    const map = {
        'Request Change': 'request-change',
        'Applied': 'applied',
        'Approved': 'approved',
        'Rejected': 'rejected',
    };
    return (
        <span className={`status-badge ${map[status] || 'request-change'}`}>
            {status}
        </span>
    );
};

/* ══════════════════════════════════════════════
   Leave Request Modal
══════════════════════════════════════════════ */
const RequestModal = ({ show, onHide }) => {
    const [form, setForm] = useState({
        to: '', from: '', reason: '', fullDay: false, halfDay: false, halfDayType: 'first'
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            // mutually exclusive checkboxes
            ...(name === 'fullDay' && checked ? { halfDay: false } : {}),
            ...(name === 'halfDay' && checked ? { fullDay: false } : {}),
        }));
    };

    const handleApply = () => {
        // TODO: submit to API
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered size="md" className="timeoff-modal">
            {/* Header — white, centered title, X button */}
            <div className="rto-modal-header">
                <button className="rto-close-btn" onClick={onHide}>
                    <i className="bi bi-x"></i>
                </button>
                <h5 className="rto-modal-title">Request Time Off</h5>
            </div>

            {/* Body */}
            <div className="rto-modal-body">
                {/* To Date */}
                <div className="rto-field">
                    <label className="rto-label">To</label>
                    <div className="rto-date-input">
                        <i className="bi bi-calendar3 rto-cal-icon"></i>
                        <input
                            type="date"
                            name="to"
                            value={form.to}
                            onChange={handleChange}
                            className={`rto-input ${form.to ? 'has-value' : ''}`}
                            placeholder="Select date"
                        />
                        {!form.to && <span className="rto-placeholder">Select date</span>}
                    </div>
                </div>

                {/* From Date */}
                <div className="rto-field">
                    <label className="rto-label">From</label>
                    <div className="rto-date-input">
                        <i className="bi bi-calendar3 rto-cal-icon"></i>
                        <input
                            type="date"
                            name="from"
                            value={form.from}
                            onChange={handleChange}
                            className={`rto-input ${form.from ? 'has-value' : ''}`}
                            placeholder="Select date"
                        />
                        {!form.from && <span className="rto-placeholder">Select date</span>}
                    </div>
                </div>

                {/* Reason */}
                <div className="rto-field">
                    <label className="rto-label">Reason</label>
                    <textarea
                        name="reason"
                        value={form.reason}
                        onChange={handleChange}
                        className="rto-textarea"
                        placeholder="Flu recover"
                        rows={3}
                    />
                </div>

                {/* Day Type Checkboxes */}
                <div>
                    <div className="rto-checkboxes mb-2">
                        <label className="rto-check-label">
                            <input
                                type="checkbox"
                                name="fullDay"
                                checked={form.fullDay}
                                onChange={handleChange}
                                className="rto-checkbox"
                            />
                            Full Day
                        </label>
                        <label className="rto-check-label">
                            <input
                                type="checkbox"
                                name="halfDay"
                                checked={form.halfDay}
                                onChange={handleChange}
                                className="rto-checkbox"
                            />
                            Half Day
                        </label>
                    </div>

                    {form.halfDay && (
                        <div className="rto-half-day-options">
                            <label className="rto-radio-label">
                                <input
                                    type="radio"
                                    name="halfDayType"
                                    value="first"
                                    checked={form.halfDayType === 'first'}
                                    onChange={handleChange}
                                    className="rto-radio"
                                />
                                First Half
                            </label>
                            <label className="rto-radio-label">
                                <input
                                    type="radio"
                                    name="halfDayType"
                                    value="second"
                                    checked={form.halfDayType === 'second'}
                                    onChange={handleChange}
                                    className="rto-radio"
                                />
                                Second Half
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="rto-modal-footer">
                <button className="rto-btn-cancel" onClick={onHide}>Cancel</button>
                <button className="rto-btn-apply" onClick={handleApply}>Apply</button>
            </div>
        </Modal>
    );
};

/* ══════════════════════════════════════════════
   View / Request Change Modal
══════════════════════════════════════════════ */
const ViewLeaveModal = ({ show, onHide, data }) => {
    const [form, setForm] = useState({ to: '', from: '' });

    React.useEffect(() => {
        if (show) setForm({ to: '', from: '' });
    }, [show, data]);

    if (!data) return null;

    const isRequestChange = data.status === 'Request Change';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Modal show={show} onHide={onHide} centered size="md" className="timeoff-modal view-leave-modal">
            <div className="rto-modal-header">
                <button className="rto-close-btn" onClick={onHide}>
                    <i className="bi bi-x"></i>
                </button>
                <h5 className="rto-modal-title">{isRequestChange ? 'Request Change' : 'Leave Details'}</h5>
            </div>

            <div className="rto-modal-body">
                <div className="vlm-details-list">
                    <div className="vlm-detail-row">
                        <span className="vlm-detail-label">Status</span>
                        <span className="vlm-detail-value"><StatusBadge status={data.status} /></span>
                    </div>
                    <div className="vlm-detail-row">
                        <span className="vlm-detail-label">Reason</span>
                        <span className="vlm-detail-value">{data.reason}</span>
                    </div>
                    <div className="vlm-detail-row">
                        <span className="vlm-detail-label">Approved by</span>
                        <span className="vlm-detail-value">Business owner</span>
                    </div>
                    <div className="vlm-detail-row">
                        <span className="vlm-detail-label">From</span>
                        <span className="vlm-detail-value">{data.from}</span>
                    </div>
                    <div className="vlm-detail-row">
                        <span className="vlm-detail-label">To</span>
                        <span className="vlm-detail-value">{data.to}</span>
                    </div>
                </div>

                {isRequestChange && (
                    <div className="vlm-new-dates-section">
                        <h6 className="vlm-section-title">New Dates</h6>

                        <div className="rto-field">
                            <label className="rto-label">To</label>
                            <div className="rto-date-input">
                                <i className="bi bi-calendar3 rto-cal-icon"></i>
                                <input
                                    type="date"
                                    name="to"
                                    value={form.to}
                                    onChange={handleChange}
                                    className={`rto-input ${form.to ? 'has-value' : ''}`}
                                    placeholder="Select date"
                                />
                                {!form.to && <span className="rto-placeholder">Select date</span>}
                            </div>
                        </div>

                        <div className="rto-field">
                            <label className="rto-label">From</label>
                            <div className="rto-date-input">
                                <i className="bi bi-calendar3 rto-cal-icon"></i>
                                <input
                                    type="date"
                                    name="from"
                                    value={form.from}
                                    onChange={handleChange}
                                    className={`rto-input ${form.from ? 'has-value' : ''}`}
                                    placeholder="Select date"
                                />
                                {!form.from && <span className="rto-placeholder">Select date</span>}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {isRequestChange && (
                <div className="rto-modal-footer vlm-footer">
                    <button className="rto-btn-cancel vlm-btn" onClick={onHide}>Cancel</button>
                    <button className="rto-btn-apply vlm-btn" onClick={onHide}>Apply</button>
                </div>
            )}
        </Modal>
    );
};

/* ══════════════════════════════════════════════
   Data
══════════════════════════════════════════════ */
const leaves = [
    { reason: 'Flu recovery', from: '12/03/2025', to: '12/03/2025', days: 2, status: 'Request Change' },
    { reason: 'Going out of station', from: '06/01/2025', to: '06/01/2025', days: 4, status: 'Request Change' },
    { reason: 'Flu recovery', from: '12/03/2025', to: '12/03/2025', days: 2, status: 'Applied' },
    { reason: 'Going out of station', from: '06/01/2025', to: '06/01/2025', days: 4, status: 'Request Change' },
    { reason: 'Flu recovery', from: '12/03/2025', to: '12/03/2025', days: 2, status: 'Approved' },
    { reason: 'Going out of station', from: '06/01/2025', to: '06/01/2025', days: 4, status: 'Request Change' },
    { reason: 'Flu recovery', from: '12/03/2025', to: '12/03/2025', days: 2, status: 'Rejected' },
    { reason: 'Going out of station', from: '06/01/2025', to: '06/01/2025', days: 4, status: 'Approved' },
    { reason: 'Flu recovery', from: '12/03/2025', to: '12/03/2025', days: 2, status: 'Applied' },
];

const stats = [
    { num: 4, label: 'Leave Availed', type: 'availed' },
    { num: 11, label: 'Remaining', type: 'remaining' },
    { num: 15, label: 'Total', type: 'total' },
];

/* ══════════════════════════════════════════════
   Time Off Page
══════════════════════════════════════════════ */
const TimeOff = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState('total'); // 'availed' | 'remaining' | 'total'
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    const handleViewClick = (leave) => {
        setSelectedLeave(leave);
        setShowViewModal(true);
    };

    /* Filter logic */
    const filteredLeaves = leaves.filter((row) => {
        if (activeFilter === 'availed') return row.status === 'Approved';
        if (activeFilter === 'remaining') return ['Request Change', 'Applied'].includes(row.status);
        return true; // 'total' → show all
    });

    const handleStatClick = (type) => {
        setActiveFilter(prev => prev === type ? 'total' : type);
    };

    return (
        <Container fluid className="timeoff-container px-4 py-3">

            {/* ── Header ── */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-2">
                    <h1 className="timeoff-page-title">Time Off</h1>
                    <i className="bi bi-question-circle timeoff-help-icon"></i>
                </div>
                <button
                    className="btn-request-timeoff"
                    onClick={() => setShowModal(true)}
                >
                    <i className="bi bi-plus-lg"></i>
                    Request Time Off
                </button>
            </div>

            {/* ── Stats Cards ── */}
            <div className="timeoff-stats-row mb-4">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className={`timeoff-stat-card ${s.type} ${activeFilter === s.type ? 'stat-active' : ''}`}
                        onClick={() => handleStatClick(s.type)}
                        title={`Filter by ${s.label}`}
                    >
                        <div className="timeoff-stat-number">{s.num}</div>
                        <div className="timeoff-stat-label">{s.label}</div>
                        {activeFilter === s.type && s.type !== 'total' && (
                            <div className="stat-active-hint">Click to clear</div>
                        )}
                    </div>
                ))}
            </div>

            {/* ── Leave Table ── */}
            <div className="timeoff-table-wrapper mb-4">
                {/* Filter label */}
                {activeFilter !== 'total' && (
                    <div className="filter-active-bar">
                        <i className="bi bi-funnel-fill"></i>
                        Showing: <strong>{stats.find(s => s.type === activeFilter)?.label}</strong>
                        <button className="btn-clear-filter" onClick={() => setActiveFilter('total')}>
                            <i className="bi bi-x"></i> Clear
                        </button>
                    </div>
                )}
                <table className="timeoff-table">
                    <thead>
                        <tr>
                            <th>Reason</th>
                            <th>From</th>
                            <th>To</th>
                            <th style={{ textAlign: 'center' }}>Days</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeaves.length > 0 ? filteredLeaves.map((row, idx) => (
                            <tr key={idx}>
                                <td className="td-reason">{row.reason}</td>
                                <td className="td-date">{row.from}</td>
                                <td className="td-date">{row.to}</td>
                                <td className="td-days">{row.days}</td>
                                <td>
                                    <StatusBadge status={row.status} />
                                </td>
                                <td>
                                    <button className="btn-view-row" onClick={() => handleViewClick(row)}>View</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} className="text-center py-4" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>



            {/* ── Request Modal ── */}
            <RequestModal
                show={showModal}
                onHide={() => setShowModal(false)}
            />

            {/* ── View/Request Change Modal ── */}
            <ViewLeaveModal
                show={showViewModal}
                onHide={() => setShowViewModal(false)}
                data={selectedLeave}
            />
        </Container>
    );
};

export default TimeOff;
