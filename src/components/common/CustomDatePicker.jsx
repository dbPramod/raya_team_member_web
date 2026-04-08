import React, { useEffect, useMemo, useRef, useState } from 'react';

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const YEAR_RANGE = Array.from({ length: 81 }, (_, index) => 1980 + index);

const parseDateValue = (value) => {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

const formatDateValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (value) => {
  const parsedDate = parseDateValue(value);

  if (!parsedDate) {
    return '';
  }

  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
};

const isSameDate = (date, comparisonDate) => (
  date.getFullYear() === comparisonDate.getFullYear()
  && date.getMonth() === comparisonDate.getMonth()
  && date.getDate() === comparisonDate.getDate()
);

const CustomDatePicker = ({
  value = '',
  onChange,
  name,
  placeholder = 'Select date',
  className = '',
  menuClassName = '',
  triggerClassName = '',
  disabled = false,
  error = '',
  icon = 'bi-calendar3',
  fullWidth = true
}) => {
  const containerRef = useRef(null);
  const selectedDate = parseDateValue(value);
  const today = new Date();

  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(selectedDate || today);
  const [openHeaderMenu, setOpenHeaderMenu] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      setViewDate(selectedDate);
    }
  }, [value]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setOpenHeaderMenu(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const cells = [];

    for (let index = firstDayIndex - 1; index >= 0; index -= 1) {
      cells.push({
        key: `prev-${index}`,
        label: daysInPrevMonth - index,
        muted: true,
        date: new Date(year, month - 1, daysInPrevMonth - index)
      });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push({
        key: `current-${day}`,
        label: day,
        muted: false,
        date: new Date(year, month, day)
      });
    }

    while (cells.length % 7 !== 0) {
      const nextDay = cells.length - (firstDayIndex + daysInMonth) + 1;
      cells.push({
        key: `next-${nextDay}`,
        label: nextDay,
        muted: true,
        date: new Date(year, month + 1, nextDay)
      });
    }

    return cells;
  }, [viewDate]);

  const handleDateSelect = (date) => {
    onChange?.({ target: { name, value: formatDateValue(date) } });
    setIsOpen(false);
    setOpenHeaderMenu(null);
  };

  return (
    <div
      ref={containerRef}
      className={`custom-date-picker ${isOpen ? 'open' : ''} ${fullWidth ? 'w-100' : ''} ${error ? 'has-error' : ''} ${className}`.trim()}
    >
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <button
        type="button"
        className={`custom-date-picker-trigger ${triggerClassName}`.trim()}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        disabled={disabled}
      >
        <span className="custom-date-picker-icon-wrap">
          <i className={`bi ${icon}`}></i>
        </span>
        <span className={`custom-date-picker-label ${value ? 'selected' : 'placeholder'}`}>
          {formatDisplayDate(value) || placeholder}
        </span>
        <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'} custom-date-picker-chevron`}></i>
      </button>

      {isOpen ? (
        <div className={`custom-date-picker-menu ${menuClassName}`.trim()}>
          <div className="custom-date-picker-header">
            <button type="button" className="custom-date-picker-nav" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}>
              <i className="bi bi-chevron-left"></i>
            </button>
            <div className="custom-date-picker-controls">
              <div className="custom-date-picker-header-select">
                <button
                  type="button"
                  className={`custom-date-picker-select month ${openHeaderMenu === 'month' ? 'open' : ''}`}
                  onClick={() => setOpenHeaderMenu((current) => (current === 'month' ? null : 'month'))}
                >
                  <span>{MONTH_NAMES[viewDate.getMonth()]}</span>
                  <i className={`bi bi-chevron-${openHeaderMenu === 'month' ? 'up' : 'down'}`}></i>
                </button>
                {openHeaderMenu === 'month' ? (
                  <div className="custom-date-picker-select-menu month">
                    {MONTH_NAMES.map((month, index) => (
                      <button
                        key={month}
                        type="button"
                        className={`custom-date-picker-select-option ${viewDate.getMonth() === index ? 'selected' : ''}`}
                        onClick={() => {
                          setViewDate(new Date(viewDate.getFullYear(), index, 1));
                          setOpenHeaderMenu(null);
                        }}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="custom-date-picker-header-select">
                <button
                  type="button"
                  className={`custom-date-picker-select year ${openHeaderMenu === 'year' ? 'open' : ''}`}
                  onClick={() => setOpenHeaderMenu((current) => (current === 'year' ? null : 'year'))}
                >
                  <span>{viewDate.getFullYear()}</span>
                  <i className={`bi bi-chevron-${openHeaderMenu === 'year' ? 'up' : 'down'}`}></i>
                </button>
                {openHeaderMenu === 'year' ? (
                  <div className="custom-date-picker-select-menu year">
                    {YEAR_RANGE.map((year) => (
                      <button
                        key={year}
                        type="button"
                        className={`custom-date-picker-select-option ${viewDate.getFullYear() === year ? 'selected' : ''}`}
                        onClick={() => {
                          setViewDate(new Date(year, viewDate.getMonth(), 1));
                          setOpenHeaderMenu(null);
                        }}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <button type="button" className="custom-date-picker-nav" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>

          <div className="custom-date-picker-weekdays">
            {WEEK_DAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="custom-date-picker-grid">
            {calendarDays.map((day) => {
              const isSelected = selectedDate ? isSameDate(day.date, selectedDate) : false;
              const isToday = isSameDate(day.date, today);

              return (
                <button
                  key={day.key}
                  type="button"
                  className={`custom-date-picker-day ${day.muted ? 'muted' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`.trim()}
                  onClick={() => handleDateSelect(day.date)}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {error ? <div className="custom-date-picker-error">{error}</div> : null}
    </div>
  );
};

export default CustomDatePicker;
