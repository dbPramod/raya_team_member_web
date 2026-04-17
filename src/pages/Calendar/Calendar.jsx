import React, { useEffect, useMemo, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import MeetHistory from './MeetHistory';
import CustomDatePicker from '../../components/common/CustomDatePicker';

const INITIAL_EVENTS = [
    { id: 1, day: 1, month: 0, year: 2026, title: 'New Year', type: 'blue', notes: '', isUserCreated: false },
    { id: 2, day: 9, month: 0, year: 2026, title: 'Team Meet', type: 'blue', notes: '', isUserCreated: false },
    { id: 3, day: 12, month: 0, year: 2026, title: 'Team Meeting', type: 'blue', startHour: 10, startMin: 0, endHour: 11, endMin: 30, notes: '', isUserCreated: false },
    { id: 4, day: 14, month: 0, year: 2026, title: 'Deadline - Project A', type: 'pink', startHour: 11, startMin: 0, endHour: 12, endMin: 0, notes: '', isUserCreated: false },
    { id: 5, day: 15, month: 0, year: 2026, title: 'Final Presentation', type: 'pink', startHour: 10, startMin: 0, endHour: 11, endMin: 0, notes: '', isUserCreated: false },
    { id: 6, day: 15, month: 0, year: 2026, title: 'New Project', type: 'pink', startHour: 11, startMin: 0, endHour: 12, endMin: 0, notes: '', isUserCreated: false },
    { id: 7, day: 19, month: 0, year: 2026, title: 'DISC Assessment', type: 'pink', notes: '', isUserCreated: false },
    { id: 8, day: 23, month: 0, year: 2026, title: 'Leave', type: 'yellow', notes: '', isUserCreated: false },
    { id: 9, day: 6, month: 1, year: 2026, title: 'Company Retreat', type: 'yellow', notes: '', isUserCreated: false }
];

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const YEAR_OPTIONS = [2024, 2025, 2026, 2027, 2028];

const formatEventTime = (event) => {
    if (event.startHour === undefined || event.endHour === undefined) {
        return 'All day';
    }

    const toLabel = (hour, minute) => {
        const meridiem = hour >= 12 ? 'pm' : 'am';
        const safeHour = hour % 12 || 12;
        return `${safeHour}:${String(minute).padStart(2, '0')} ${meridiem}`;
    };

    return `${toLabel(event.startHour, event.startMin)} - ${toLabel(event.endHour, event.endMin)}`;
};

const toDateValue = (year, month, day) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

const parseTimeValue = (timeValue) => {
    if (!timeValue) {
        return null;
    }

    const [hour, minute] = timeValue.split(':').map(Number);
    if (Number.isNaN(hour) || Number.isNaN(minute)) {
        return null;
    }

    return { hour, minute };
};

const getEventType = (title) => {
    const normalizedTitle = title.toLowerCase();

    if (normalizedTitle.includes('leave') || normalizedTitle.includes('retreat') || normalizedTitle.includes('holiday')) {
        return 'yellow';
    }

    if (normalizedTitle.includes('deadline') || normalizedTitle.includes('presentation') || normalizedTitle.includes('launch')) {
        return 'pink';
    }

    return 'blue';
};

const Calendar = () => {
    const [today] = useState(new Date());
    const [events, setEvents] = useState(INITIAL_EVENTS);
    const [displayMonth, setDisplayMonth] = useState(today.getMonth());
    const [displayYear, setDisplayYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(today.getDate());
    const [viewType, setViewType] = useState('monthly');
    const [showMeetHistory, setShowMeetHistory] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventForm, setEventForm] = useState({ title: '', date: '', time: '', notes: '' });

    const monthDaysCount = useMemo(() => new Date(displayYear, displayMonth + 1, 0).getDate(), [displayMonth, displayYear]);

    useEffect(() => {
        if (selectedDate > monthDaysCount) {
            setSelectedDate(monthDaysCount);
        }
    }, [monthDaysCount, selectedDate]);

    const selectedDateValue = toDateValue(displayYear, displayMonth, selectedDate);

    const selectedDayEvents = useMemo(
        () => events.filter((event) => event.day === selectedDate && event.month === displayMonth && event.year === displayYear),
        [displayMonth, displayYear, events, selectedDate]
    );

    const nextScheduledEvent = useMemo(() => {
        const sorted = [...events]
            .filter((event) => event.startHour !== undefined)
            .sort((left, right) => {
                const leftDate = new Date(left.year, left.month, left.day, left.startHour, left.startMin);
                const rightDate = new Date(right.year, right.month, right.day, right.startHour, right.startMin);
                return leftDate - rightDate;
            });

        return sorted.find((event) => {
            const eventDate = new Date(event.year, event.month, event.day, event.startHour, event.startMin);
            return eventDate >= today;
        }) || sorted[0] || null;
    }, [events, today]);

    const calendarWeeks = useMemo(() => {
        const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(displayYear, displayMonth, 0).getDate();
        const startDay = new Date(displayYear, displayMonth, 1).getDay();
        const startOffset = startDay === 0 ? 6 : startDay - 1;
        const cells = [];

        for (let index = startOffset - 1; index >= 0; index -= 1) {
            cells.push({
                day: daysInPrevMonth - index,
                month: displayMonth === 0 ? 11 : displayMonth - 1,
                year: displayMonth === 0 ? displayYear - 1 : displayYear,
                isCurrentMonth: false
            });
        }

        for (let day = 1; day <= daysInMonth; day += 1) {
            cells.push({ day, month: displayMonth, year: displayYear, isCurrentMonth: true });
        }

        const totalCells = cells.length > 35 ? 42 : 35;
        let nextDay = 1;
        while (cells.length < totalCells) {
            cells.push({
                day: nextDay,
                month: displayMonth === 11 ? 0 : displayMonth + 1,
                year: displayMonth === 11 ? displayYear + 1 : displayYear,
                isCurrentMonth: false
            });
            nextDay += 1;
        }

        const weeks = [];
        for (let index = 0; index < cells.length; index += 7) {
            weeks.push(cells.slice(index, index + 7));
        }

        return weeks;
    }, [displayMonth, displayYear]);

    const selectedWeek = useMemo(
        () => calendarWeeks.find((week) => week.some((cell) => cell.isCurrentMonth && cell.day === selectedDate)) || calendarWeeks[0],
        [calendarWeeks, selectedDate]
    );

    const yearlySummary = useMemo(
        () => MONTH_NAMES.map((monthName, monthIndex) => {
            const monthEvents = events.filter((event) => event.month === monthIndex && event.year === displayYear);
            return {
                monthName,
                total: monthEvents.length,
                highlighted: monthEvents.slice(0, 3)
            };
        }),
        [displayYear, events]
    );

    const handleOpenAddEvent = (day = null, presetTime = '') => {
        if (day) {
            setEventForm({
                title: '',
                date: toDateValue(displayYear, displayMonth, day),
                time: presetTime,
                notes: ''
            });
        } else {
            setEventForm({
                title: '',
                date: selectedDateValue,
                time: presetTime,
                notes: ''
            });
        }

        setShowAddEventModal(true);
    };

    const handlePrevMonth = () => {
        if (displayMonth === 0) {
            setDisplayMonth(11);
            setDisplayYear((year) => year - 1);
            return;
        }

        setDisplayMonth((month) => month - 1);
    };

    const handleNextMonth = () => {
        if (displayMonth === 11) {
            setDisplayMonth(0);
            setDisplayYear((year) => year + 1);
            return;
        }

        setDisplayMonth((month) => month + 1);
    };

    const handleSelectDay = (cell) => {
        setDisplayMonth(cell.month);
        setDisplayYear(cell.year);
        setSelectedDate(cell.day);
    };

    const handleOpenHourlyView = (cell) => {
        handleSelectDay(cell);
        setViewType('weekly');
    };

    const handleGoToToday = () => {
        setDisplayMonth(today.getMonth());
        setDisplayYear(today.getFullYear());
        setSelectedDate(today.getDate());
        setViewType('monthly');
    };

    const handleAddEvent = () => {
        if (!eventForm.title.trim() || !eventForm.date) {
            return;
        }

        const [year, month, day] = eventForm.date.split('-').map(Number);
        const parsedTime = parseTimeValue(eventForm.time);
        const nextEvent = {
            id: Date.now(),
            day,
            month: month - 1,
            year,
            title: eventForm.title.trim(),
            type: getEventType(eventForm.title),
            notes: eventForm.notes.trim(),
            isUserCreated: true
        };

        if (parsedTime) {
            nextEvent.startHour = parsedTime.hour;
            nextEvent.startMin = parsedTime.minute;
            nextEvent.endHour = parsedTime.hour + 1;
            nextEvent.endMin = parsedTime.minute;
        }

        setEvents((currentEvents) => [...currentEvents, nextEvent]);
        setDisplayYear(year);
        setDisplayMonth(month - 1);
        setSelectedDate(day);
        setShowAddEventModal(false);
        setEventForm({ title: '', date: '', time: '', notes: '' });
    };

    const handleDeleteEvent = (eventId) => {
        setEvents((currentEvents) => currentEvents.filter((event) => event.id !== eventId || !event.isUserCreated));
        setSelectedEvent(null);
    };

    if (showMeetHistory) {
        return (
            <Container fluid className="calendar-page-container px-4 py-4">
                <MeetHistory onBack={() => setShowMeetHistory(false)} />
            </Container>
        );
    }

    return (
        <Container fluid className="calendar-page-container px-4 py-4">
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

            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-4 px-1">
                <div className="d-flex align-items-center flex-wrap gap-3">
                    <button
                        type="button"
                        className="cal-indicator-box flex-shrink-0 cal-indicator-button"
                        onClick={handleGoToToday}
                        title="Go to today"
                    >
                        <div className="cal-ind-month">{MONTH_NAMES[today.getMonth()].substring(0, 3).toUpperCase()}</div>
                        <div className="cal-ind-day">{today.getDate()}</div>
                    </button>
                    <div className="flex-grow-1">
                        <h4 className="cal-current-title m-0">
                            {viewType === 'yearly' ? `${displayYear} Overview` : `${MONTH_NAMES[displayMonth]} ${selectedDate}`}
                        </h4>
                        <div className="cal-current-subtitle">
                            {viewType === 'yearly'
                                ? `${events.filter((event) => event.year === displayYear).length} total events in ${displayYear}`
                                : `${selectedDayEvents.length} event${selectedDayEvents.length === 1 ? '' : 's'} scheduled on this day`}
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center flex-wrap gap-3 w-sm-100 justify-content-md-end">
                    <div className="cal-active-meeting-badge flex-shrink-0 w-100 w-md-auto text-center">
                        {nextScheduledEvent
                            ? `${nextScheduledEvent.title}: ${formatEventTime(nextScheduledEvent)}`
                            : 'No scheduled meetings'}
                    </div>

                    <div className="cal-nav-controls d-flex align-items-center flex-wrap gap-2 justify-content-center">
                        <button className="btn-cal-nav" onClick={handlePrevMonth}><i className="bi bi-arrow-left"></i></button>
                        <div className="cal-nav-month fw-bold" style={{ minWidth: '80px', textAlign: 'center' }}>{MONTH_NAMES[displayMonth].substring(0, 3)}</div>
                        <button className="btn-cal-nav" onClick={handleNextMonth}><i className="bi bi-arrow-right"></i></button>

                        <select
                            className="form-select cal-nav-year border-0 shadow-none bg-light"
                            value={displayYear}
                            onChange={(event) => setDisplayYear(parseInt(event.target.value, 10))}
                            style={{ width: '90px', borderRadius: '8px' }}
                        >
                            {YEAR_OPTIONS.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="calendar-grid-wrapper bg-white table-responsive-custom">
                {viewType === 'monthly' ? (
                    <div className="calendar-grid-header">
                        {WEEK_DAYS.map((day, index) => (
                            <div key={day} className={`cal-head-cell ${index === 0 ? 'active' : ''}`}>
                                {day}
                            </div>
                        ))}
                    </div>
                ) : null}

                <div className="calendar-grid-body">
                    {viewType === 'yearly' ? (
                        <div className="calendar-yearly-grid">
                            {yearlySummary.map((month) => (
                                <div key={month.monthName} className="calendar-year-card">
                                    <div className="calendar-year-card-header">
                                        <h5>{month.monthName}</h5>
                                        <span>{month.total} event{month.total === 1 ? '' : 's'}</span>
                                    </div>
                                    <div className="calendar-year-card-body">
                                        {month.highlighted.length ? month.highlighted.map((event) => (
                                            <button
                                                key={event.id}
                                                type="button"
                                                className={`calendar-year-pill type-${event.type}`}
                                                onClick={() => {
                                                    setDisplayMonth(event.month);
                                                    setDisplayYear(event.year);
                                                    setSelectedDate(event.day);
                                                    setViewType('monthly');
                                                }}
                                            >
                                                {event.day} {event.title}
                                            </button>
                                        )) : <span className="calendar-year-empty">No events scheduled</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : viewType === 'weekly' ? (
                        <div className="weekly-timeline-view">
                            <div className="timeline-header-row">
                                <div className="time-col-header"></div>
                                {selectedWeek.map((cell, index) => (
                                    <div
                                        key={`${cell.year}-${cell.month}-${cell.day}`}
                                        className={`day-col-header ${cell.isCurrentMonth && cell.day === selectedDate ? 'active' : ''}`}
                                    >
                                        {cell.day} {WEEK_DAYS[index]}
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
                                            {selectedWeek.map((cell, cellIndex) => (
                                                <div
                                                    key={`${cell.year}-${cell.month}-${cell.day}-${hour}-${cellIndex}`}
                                                    className="hour-cell"
                                                    onClick={() => {
                                                        setDisplayMonth(cell.month);
                                                        setDisplayYear(cell.year);
                                                        setSelectedDate(cell.day);
                                                        const slotTime = `${String(hour).padStart(2, '0')}:00`;
                                                        handleOpenAddEvent(cell.day, slotTime);
                                                    }}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <div className="timeline-events-overlay">
                                    <div className="time-col-spacer"></div>
                                    <div className="events-cols">
                                        {selectedWeek.map((cell) => {
                                            const dayEvents = events.filter((event) => (
                                                event.day === cell.day
                                                && event.month === cell.month
                                                && event.year === cell.year
                                                && event.startHour !== undefined
                                            ));

                                            return (
                                                <div key={`${cell.year}-${cell.month}-${cell.day}`} className="event-col">
                                                    {dayEvents.map((event) => {
                                                        const startOffsetHours = (event.startHour + event.startMin / 60) - 7;
                                                        const durationHours = (event.endHour + event.endMin / 60) - (event.startHour + event.startMin / 60);
                                                        const top = startOffsetHours * 60;
                                                        const height = durationHours * 60;

                                                        return (
                                                            <div
                                                                key={event.id}
                                                                className={`timeline-event type-${event.type}`}
                                                                style={{ top: `${top}px`, height: `${height}px` }}
                                                                onClick={(clickEvent) => {
                                                                    clickEvent.stopPropagation();
                                                                    setSelectedEvent(event);
                                                                }}
                                                            >
                                                                <div className="evt-title">{event.title}</div>
                                                                <div className="evt-time">{formatEventTime(event)}</div>
                                                                <button className="btn-evt-notes" onClick={(clickEvent) => {
                                                                    clickEvent.stopPropagation();
                                                                    setSelectedEvent(event);
                                                                }}>
                                                                    <i className="bi bi-card-text"></i> View
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
                        calendarWeeks.map((week, weekIndex) => (
                            <div key={`week-${weekIndex}`} className="cal-week-row">
                                {week.map((cell, cellIndex) => {
                                    const dayEvents = events.filter((event) => event.day === cell.day && event.month === cell.month && event.year === cell.year);
                                    const isToday = cell.day === today.getDate() && cell.month === today.getMonth() && cell.year === today.getFullYear();
                                    const isSelected = cell.day === selectedDate && cell.month === displayMonth && cell.year === displayYear;

                                    return (
                                        <div
                                            key={`cell-${weekIndex}-${cellIndex}`}
                                            className={`cal-day-cell ${!cell.isCurrentMonth ? 'out-of-month' : ''} ${isSelected ? 'active-day' : ''}`}
                                            onClick={() => handleSelectDay(cell)}
                                            onDoubleClick={() => handleOpenHourlyView(cell)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className={`cal-day-number ${isToday || isSelected ? 'active' : ''}`}>{cell.day}</div>
                                            <div className="cal-events-container">
                                                {dayEvents.slice(0, 3).map((event) => (
                                                    <button
                                                        key={event.id}
                                                        type="button"
                                                        className={`cal-event-pill type-${event.type}`}
                                                        onClick={(clickEvent) => {
                                                            clickEvent.stopPropagation();
                                                            setSelectedEvent(event);
                                                        }}
                                                    >
                                                        {event.title}
                                                    </button>
                                                ))}
                                                {dayEvents.length > 3 ? (
                                                    <button
                                                        type="button"
                                                        className="cal-event-more"
                                                        onClick={(clickEvent) => {
                                                            clickEvent.stopPropagation();
                                                            handleSelectDay(cell);
                                                        }}
                                                    >
                                                        +{dayEvents.length - 3} more
                                                    </button>
                                                ) : null}
                                            </div>
                                            {cell.isCurrentMonth ? (
                                                <button
                                                    type="button"
                                                    className="calendar-add-mini"
                                                    onClick={(clickEvent) => {
                                                        clickEvent.stopPropagation();
                                                        setSelectedDate(cell.day);
                                                        handleOpenAddEvent(cell.day);
                                                    }}
                                                >
                                                    <i className="bi bi-plus"></i>
                                                </button>
                                            ) : null}
                                        </div>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="calendar-day-summary mt-4">
                <div className="calendar-day-summary-header">
                    <div>
                        <h5 className="mb-1">Selected Day</h5>
                        <span>{MONTH_NAMES[displayMonth]} {selectedDate}, {displayYear}</span>
                    </div>
                    <button className="btn-calendar-primary" onClick={() => handleOpenAddEvent(selectedDate)}>
                        <i className="bi bi-plus me-1"></i> Add Event
                    </button>
                </div>
                <div className="calendar-day-summary-list">
                    {selectedDayEvents.length ? selectedDayEvents.map((event) => (
                        <button
                            key={event.id}
                            type="button"
                            className={`calendar-day-summary-item type-${event.type}`}
                            onClick={() => setSelectedEvent(event)}
                        >
                            <div>
                                <div className="calendar-day-summary-title">{event.title}</div>
                                <div className="calendar-day-summary-time">{formatEventTime(event)}</div>
                            </div>
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    )) : <div className="calendar-day-summary-empty">No events planned for this day yet.</div>}
                </div>
            </div>

            <Modal show={showAddEventModal} onHide={() => setShowAddEventModal(false)} centered size="md" className="timeoff-modal view-leave-modal" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
                            onChange={(event) => setEventForm({ ...eventForm, title: event.target.value })}
                            style={{ fontSize: '0.9rem', color: 'var(--color-navy-primary)', fontWeight: '500' }}
                        />
                    </div>

                    <div className="rto-field mb-3">
                        <label className="rto-label">Date</label>
                        <CustomDatePicker
                            value={eventForm.date}
                            onChange={(event) => setEventForm({ ...eventForm, date: event.target.value })}
                            placeholder="Select date"
                            className="timeoff-date-picker"
                            triggerClassName="rto-date-trigger bg-light border-0"
                        />
                    </div>

                    <div className="rto-field mb-3">
                        <label className="rto-label">Time</label>
                        {/* {eventForm.time ? (
                            <div className="calendar-time-selected-chip mb-2">
                                Selected time: {eventForm.time}
                            </div>
                        ) : null} */}
                        <div className="rto-date-input bg-light border-0">
                            <i className="bi bi-clock rto-cal-icon"></i>
                            <input
                                type="time"
                                className={`rto-input ${eventForm.time ? 'has-value' : ''}`}
                                value={eventForm.time}
                                onChange={(event) => setEventForm({ ...eventForm, time: event.target.value })}
                            />
                            {!eventForm.time && <span className="rto-placeholder">03:00 pm</span>}
                        </div>
                    </div>

                    <div className="rto-field mb-4">
                        <label className="rto-label">Notes</label>
                        <textarea
                            className="form-control border-0 bg-light p-3 rounded-3"
                            placeholder="Add notes"
                            rows="4"
                            value={eventForm.notes}
                            onChange={(event) => setEventForm({ ...eventForm, notes: event.target.value })}
                            style={{ fontSize: '0.9rem', color: 'var(--color-navy-primary)', resize: 'none' }}
                        ></textarea>
                    </div>
                </div>

                <div className="rto-modal-footer vlm-footer pb-4 pt-0">
                    <button className="rto-btn-cancel vlm-btn" onClick={() => setShowAddEventModal(false)}>Cancel</button>
                    <button className="rto-btn-apply vlm-btn" onClick={handleAddEvent}>Add</button>
                </div>
            </Modal>

            <Modal show={Boolean(selectedEvent)} onHide={() => setSelectedEvent(null)} centered size="md" className="timeoff-modal view-leave-modal" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <div className="rto-modal-header border-bottom-0 pb-0">
                    <button className="rto-close-btn" onClick={() => setSelectedEvent(null)}>
                        <i className="bi bi-x"></i>
                    </button>
                    <h5 className="rto-modal-title">Event Details</h5>
                </div>

                {selectedEvent ? (
                    <div className="rto-modal-body pt-3">
                        <div className="calendar-event-details">
                            <div className={`calendar-event-details-badge type-${selectedEvent.type}`}>{selectedEvent.title}</div>
                            <div className="calendar-event-details-row">
                                <span>Date</span>
                                <strong>{MONTH_NAMES[selectedEvent.month]} {selectedEvent.day}, {selectedEvent.year}</strong>
                            </div>
                            <div className="calendar-event-details-row">
                                <span>Time</span>
                                <strong>{formatEventTime(selectedEvent)}</strong>
                            </div>
                            <div className="calendar-event-details-notes">
                                <span>Notes</span>
                                <p>{selectedEvent.notes || 'No notes added yet.'}</p>
                            </div>
                            {selectedEvent.isUserCreated ? (
                                <div className="calendar-event-details-actions">
                                    <button
                                        type="button"
                                        className="calendar-event-delete-btn"
                                        onClick={() => handleDeleteEvent(selectedEvent.id)}
                                    >
                                        <i className="bi bi-trash3"></i> Delete Event
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : null}
            </Modal>
        </Container>
    );
};

export default Calendar;
