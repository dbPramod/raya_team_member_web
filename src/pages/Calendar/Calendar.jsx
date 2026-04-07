import React, { useState, useMemo } from 'react';
import { Container, Modal } from 'react-bootstrap';
import MeetHistory from './MeetHistory';
const MOCK_EVENTS = [
    { id: 1, date: 1, month: 0, year: 2026, text: 'New Year', type: 'blue' },
    { id: 2, date: 9, month: 0, year: 2026, text: 'Team Meet', type: 'blue' },
    { id: 3, date: 12, month: 0, year: 2026, text: 'Team Meeting', type: 'blue', startHour: 10, startMin: 0, endHour: 11, endMin: 30 },
    { id: 4, date: 14, month: 0, year: 2026, text: 'Deadline - Project A', type: 'pink', startHour: 11, startMin: 0, endHour: 12, endMin: 0 },
    { id: 5, date: 15, month: 0, year: 2026, text: 'Final Presentation', type: 'pink', startHour: 10, startMin: 0, endHour: 11, endMin: 0 },
    { id: 6, date: 15, month: 0, year: 2026, text: 'New Project', type: 'pink', startHour: 11, startMin: 0, endHour: 12, endMin: 0 },
    { id: 7, date: 19, month: 0, year: 2026, text: 'DISC assessnment', type: 'pink' },
    { id: 8, date: 23, month: 0, year: 2026, text: 'Leave', type: 'yellow' },
    { id: 9, date: 6, month: 1, year: 2026, text: 'Company Retreat', type: 'yellow' }
];

function formatEventTime(ev) {
    if (!ev.startHour) return '';
    const formatH = (h, m) => {
        const ampm = h >= 12 ? 'pm' : 'am';
        const hr = h % 12 || 12;
        const mn = m < 10 ? `0${m}` : m;
        return `${hr}:${mn} ${ampm}`;
    }
    return `${formatH(ev.startHour, ev.startMin)} - ${formatH(ev.endHour, ev.endMin)}`;
}

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar = () => {
    // Current date object to represent today
    const [today] = useState(new Date());

    // UI selections
    const [displayMonth, setDisplayMonth] = useState(today.getMonth());
    const [displayYear, setDisplayYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(today.getDate());
    const [viewType, setViewType] = useState('monthly'); // 'monthly', 'weekly', 'yearly'
    const [showMeetHistory, setShowMeetHistory] = useState(false);

    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [eventForm, setEventForm] = useState({ title: '', date: '', time: '' });

    const handleOpenAddEvent = (day = null) => {
        if (day) {
            const m = String(displayMonth + 1).padStart(2, '0');
            const d = String(day).padStart(2, '0');
            setEventForm({ title: '', date: `${displayYear}-${m}-${d}`, time: '' });
        } else {
            setEventForm({ title: '', date: '', time: '' });
        }
        setShowAddEventModal(true);
    };

    const handlePrevMonth = () => {
        if (displayMonth === 0) {
            setDisplayMonth(11);
            setDisplayYear(y => y - 1);
        } else {
            setDisplayMonth(m => m - 1);
        }
    };

    const handleNextMonth = () => {
        if (displayMonth === 11) {
            setDisplayMonth(0);
            setDisplayYear(y => y + 1);
        } else {
            setDisplayMonth(m => m + 1);
        }
    };

    // Calculate Grid Cells
    const calendarWeeks = useMemo(() => {
        const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(displayYear, displayMonth, 0).getDate();

        let startDay = new Date(displayYear, displayMonth, 1).getDay(); // 0 is Sunday
        let startOffset = startDay === 0 ? 6 : startDay - 1; // Align to Mon..Sun

        const cells = [];
        // Prev month overflowing days
        for (let i = startOffset - 1; i >= 0; i--) {
            cells.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
        }
        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            cells.push({ day: i, isCurrentMonth: true });
        }
        // Next month overflowing days
        const totalCells = cells.length > 35 ? 42 : 35;
        let nextDay = 1;
        while (cells.length < totalCells) {
            cells.push({ day: nextDay++, isCurrentMonth: false });
        }

        const weeks = [];
        for (let i = 0; i < cells.length; i += 7) {
            weeks.push(cells.slice(i, i + 7));
        }
        return weeks;
    }, [displayMonth, displayYear]);

    return (
        <Container fluid className="calendar-page-container px-4 py-4">
            {showMeetHistory ? (
                <MeetHistory onBack={() => setShowMeetHistory(false)} />
            ) : (
                <>
                    {/* Top Bar */}
                    <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-4 px-1">
                        <div className="d-flex align-items-center flex-wrap gap-3 gap-md-4">
                            <h1 className="calendar-page-title m-0">Calendar</h1>
                            <div className="cal-view-toggles d-flex bg-light p-1 rounded-3 border-light shadow-sm flex-wrap">
                                <button className={`btn-view-toggle flex-fill ${viewType === 'monthly' ? 'active' : ''}`} onClick={() => setViewType('monthly')}>Monthly</button>
                                <button className={`btn-view-toggle flex-fill ${viewType === 'weekly' ? 'active' : ''}`} onClick={() => setViewType('weekly')}>Weekly</button>
                                <button className={`btn-view-toggle flex-fill ${viewType === 'yearly' ? 'active' : ''}`} onClick={() => setViewType('yearly')}>Yearly</button>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2 mt-0">
                            <button className="btn-calendar-outline flex-grow-1" onClick={() => setShowMeetHistory(true)}>Meet History</button>
                            <button className="btn-calendar-primary flex-grow-1" onClick={() => handleOpenAddEvent()}>
                                <i className="bi bi-plus me-1"></i> Add Event
                            </button>
                        </div>
                    </div>

                    {/* Secondary Bar */}
                    <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-4 px-1">
                        <div className="d-flex align-items-center flex-wrap gap-3">
                            <div className="cal-indicator-box flex-shrink-0">
                                <div className="cal-ind-month">{MONTH_NAMES[today.getMonth()].substring(0, 3).toUpperCase()}</div>
                                <div className="cal-ind-day">{today.getDate()}</div>
                            </div>
                            <div className="flex-grow-1">
                                <h4 className="cal-current-title m-0">
                                    {MONTH_NAMES[displayMonth]} {displayYear === today.getFullYear() && displayMonth === today.getMonth() ? selectedDate : "1"}
                                </h4>
                                <div className="cal-current-subtitle">
                                    {MONTH_NAMES[displayMonth]} 1 - {MONTH_NAMES[displayMonth]} {new Date(displayYear, displayMonth + 1, 0).getDate()} {displayYear}
                                </div>
                            </div>
                        </div>

                        <div className="d-flex align-items-center flex-wrap gap-3 w-sm-100 justify-content-md-end">
                            <div className="cal-active-meeting-badge flex-shrink-0 w-100 w-md-auto text-center">
                                Team Meeting: 10:00 am - 11:00 am
                            </div>

                            <div className="cal-nav-controls d-flex align-items-center flex-wrap gap-2 justify-content-center">
                                <button className="btn-cal-nav" onClick={handlePrevMonth}><i className="bi bi-arrow-left"></i></button>
                                <div className="cal-nav-month fw-bold" style={{ minWidth: '80px', textAlign: 'center' }}>{MONTH_NAMES[displayMonth].substring(0, 3)}</div>
                                <button className="btn-cal-nav" onClick={handleNextMonth}><i className="bi bi-arrow-right"></i></button>

                                <select
                                    className="form-select cal-nav-year border-0 shadow-none bg-light"
                                    value={displayYear}
                                    onChange={(e) => setDisplayYear(parseInt(e.target.value))}
                                    style={{ width: '90px', borderRadius: '8px' }}
                                >
                                    {[2024, 2025, 2026, 2027, 2028].map(y => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="calendar-grid-wrapper bg-white table-responsive-custom">
                        {/* Header Row */}
                        <div className="calendar-grid-header">
                            {WEEK_DAYS.map((d, i) => (
                                <div key={d} className={`cal-head-cell ${i === 0 ? 'active' : ''}`}>
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Body */}
                        <div className="calendar-grid-body">
                            {viewType === 'yearly' ? (
                                <div className="p-5 text-center text-muted">
                                    <i className="bi bi-calendar3 fs-1 mb-3 d-block text-black-50"></i>
                                    <h5>Yearly View</h5>
                                    <p>Overview of {displayYear} will be displayed here.</p>
                                </div>
                            ) : viewType === 'weekly' ? (
                                <div className="weekly-timeline-view">
                                    <div className="timeline-header-row">
                                        <div className="time-col-header"></div>
                                        {(calendarWeeks.find(week => week.some(c => c.isCurrentMonth && c.day === selectedDate)) || calendarWeeks[0]).map((cell, i) => (
                                            <div key={i} className={`day-col-header ${cell.isCurrentMonth && cell.day === selectedDate ? 'active' : ''}`}>
                                                {cell.day} {WEEK_DAYS[i]}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="timeline-body">
                                        {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((hour) => (
                                            <div key={hour} className="timeline-hour-row">
                                                <div className="time-label">
                                                    {hour === 12 ? '12:00 pm' : hour > 12 ? `0${hour - 12}:00 pm` : `${hour < 10 ? '0' : ''}${hour}:00 am`}
                                                </div>
                                                <div className="hour-grid-cells">
                                                    {[0, 1, 2, 3, 4, 5, 6].map(cIdx => (
                                                        <div
                                                            key={cIdx}
                                                            className="hour-cell"
                                                            onClick={() => {
                                                                const week = calendarWeeks.find(w => w.some(c => c.isCurrentMonth && c.day === selectedDate)) || calendarWeeks[0];
                                                                const cell = week[cIdx];
                                                                if (cell.isCurrentMonth) {
                                                                    setSelectedDate(cell.day);
                                                                }
                                                            }}
                                                        ></div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="timeline-events-overlay">
                                            <div className="time-col-spacer"></div>
                                            <div className="events-cols">
                                                {(calendarWeeks.find(week => week.some(c => c.isCurrentMonth && c.day === selectedDate)) || calendarWeeks[0]).map((cell, cIdx) => {
                                                    const events = cell.isCurrentMonth ? MOCK_EVENTS.filter(e => e.date === cell.day && e.month === displayMonth && e.year === displayYear && e.startHour) : [];
                                                    return (
                                                        <div key={cIdx} className="event-col">
                                                            {events.map(ev => {
                                                                const startOffsetHours = (ev.startHour + ev.startMin / 60) - 7;
                                                                const durationHours = (ev.endHour + ev.endMin / 60) - (ev.startHour + ev.startMin / 60);
                                                                const top = startOffsetHours * 60;
                                                                const height = durationHours * 60;

                                                                return (
                                                                    <div
                                                                        key={ev.id}
                                                                        className={`timeline-event type-${ev.type}`}
                                                                        style={{ top: `${top}px`, height: `${height}px` }}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            // Optional: opening notes or event logic here
                                                                        }}
                                                                    >
                                                                        <div className="evt-title">{ev.text}</div>
                                                                        <div className="evt-time">
                                                                            {formatEventTime(ev)}
                                                                        </div>
                                                                        <button className="btn-evt-notes" onClick={(e) => e.stopPropagation()}>
                                                                            <i className="bi bi-card-text"></i> Add Notes
                                                                        </button>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                calendarWeeks.map((week, wIdx) => (
                                    <div key={`week-${wIdx}`} className="cal-week-row">
                                        {week.map((cell, cIdx) => {
                                            // Modified to exclude events with startHour from monthly view pills or just keep them
                                            const events = cell.isCurrentMonth ? MOCK_EVENTS.filter(e => e.date === cell.day && e.month === displayMonth && e.year === displayYear && !e.startHour) : [];
                                            const isActive = cell.isCurrentMonth && cell.day === selectedDate && displayMonth === today.getMonth() && displayYear === today.getFullYear();

                                            return (
                                                <div
                                                    key={`cell-${wIdx}-${cIdx}`}
                                                    className={`cal-day-cell ${!cell.isCurrentMonth ? 'out-of-month' : ''} ${isActive ? 'active-day' : ''}`}
                                                    onClick={() => {
                                                        if (cell.isCurrentMonth) {
                                                            setSelectedDate(cell.day);
                                                        }
                                                    }}
                                                    style={{ cursor: cell.isCurrentMonth ? 'pointer' : 'default' }}
                                                >
                                                    <div className={`cal-day-number ${isActive ? 'active' : ''}`}>{cell.day}</div>
                                                    <div className="cal-events-container">
                                                        {events.map(ev => (
                                                            <div key={ev.id} className={`cal-event-pill type-${ev.type}`}>
                                                                {ev.text}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* ── Add Event Modal ── */}
            <Modal show={showAddEventModal} onHide={() => setShowAddEventModal(false)} centered size="md" className="timeoff-modal view-leave-modal" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <div className="rto-modal-header border-bottom-0 pb-0">
                    <button className="rto-close-btn" onClick={() => setShowAddEventModal(false)}>
                        <i className="bi bi-x"></i>
                    </button>
                    <h5 className="rto-modal-title">Add Event</h5>
                </div>

                <div className="rto-modal-body pt-3">
                    <div className="rto-field mb-3">
                        <label className="rto-label">Event</label>
                        <input
                            type="text"
                            className="form-control border-0 bg-light py-2 px-3 rounded-3"
                            placeholder="Event"
                            value={eventForm.title}
                            onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                            style={{ fontSize: '0.9rem', color: '#0f1d3a', fontWeight: '500' }}
                        />
                    </div>

                    <div className="rto-field mb-3">
                        <label className="rto-label">Date</label>
                        <div className="rto-date-input bg-light border-0">
                            <i className="bi bi-calendar3 rto-cal-icon"></i>
                            <input
                                type="date"
                                className={`rto-input ${eventForm.date ? 'has-value' : ''}`}
                                value={eventForm.date}
                                onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                            />
                            {!eventForm.date && <span className="rto-placeholder">Select date</span>}
                        </div>
                    </div>

                    <div className="rto-field mb-4">
                        <label className="rto-label">Time</label>
                        <div className="rto-date-input bg-light border-0">
                            <i className="bi bi-clock rto-cal-icon"></i>
                            <input
                                type="time"
                                className={`rto-input ${eventForm.time ? 'has-value' : ''}`}
                                value={eventForm.time}
                                onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                            />
                            {!eventForm.time && <span className="rto-placeholder">03:00 pm</span>}
                        </div>
                    </div>
                </div>

                <div className="rto-modal-footer vlm-footer pb-4 pt-0">
                    <button className="rto-btn-cancel vlm-btn" onClick={() => setShowAddEventModal(false)}>Cancel</button>
                    <button className="rto-btn-apply vlm-btn" onClick={() => setShowAddEventModal(false)}>Add</button>
                </div>
            </Modal>
        </Container>
    );
};

export default Calendar;
