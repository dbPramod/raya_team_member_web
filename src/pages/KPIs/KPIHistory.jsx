import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
/* ══════════════════════════════════════════════
   SVG Grouped Bar Chart
══════════════════════════════════════════════ */
const BarChart = ({ data, maxValue, yPrefix }) => {
    const W = 700, H = 230;
    const pad = { top: 14, right: 16, bottom: 30, left: 44 };
    const innerW = W - pad.left - pad.right;
    const innerH = H - pad.top - pad.bottom;
    const groupW = innerW / data.length;
    const barW = Math.min(groupW * 0.28, 18);
    const gap = 3;
    const ticks = [0, 20, 40, 60, 80, 100];

    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            style={{ width: '100%', height: 'auto', display: 'block' }}
        >
            {/* Grid lines + Y-axis labels */}
            {ticks.map((t) => {
                const y = pad.top + innerH - (t / maxValue) * innerH;
                return (
                    <g key={t}>
                        <line
                            x1={pad.left} y1={y}
                            x2={pad.left + innerW} y2={y}
                            stroke="#edf1f6" strokeWidth="1"
                        />
                        <text
                            x={pad.left - 6} y={y + 4}
                            textAnchor="end" fontSize="9.5" fill="#94a3b8"
                            fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                            {yPrefix}{t}
                        </text>
                    </g>
                );
            })}

            {/* Grouped bars + X-axis labels */}
            {data.map((d, i) => {
                const cx = pad.left + i * groupW + groupW / 2;
                const aH = (d.actual / maxValue) * innerH;
                const gH = (d.goal / maxValue) * innerH;

                return (
                    <g key={i}>
                        {/* Actual bar */}
                        <rect
                            x={cx - barW - gap / 2}
                            y={pad.top + innerH - aH}
                            width={barW} height={aH}
                            fill="#1a3a6b" rx="3"
                        />
                        {/* Goal bar */}
                        <rect
                            x={cx + gap / 2}
                            y={pad.top + innerH - gH}
                            width={barW} height={gH}
                            fill="#7bc8cd" rx="3"
                        />
                        {/* X label */}
                        <text
                            x={cx} y={H - 7}
                            textAnchor="middle" fontSize="9" fill="#94a3b8"
                            fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                            {d.label}
                        </text>
                    </g>
                );
            })}

            {/* Y-axis line */}
            <line
                x1={pad.left} y1={pad.top}
                x2={pad.left} y2={pad.top + innerH}
                stroke="#e2e8f0" strokeWidth="1"
            />
        </svg>
    );
};

/* ══════════════════════════════════════════════
   Legend Component
══════════════════════════════════════════════ */
const ChartLegend = () => (
    <div className="history-legend">
        <span className="legend-item">
            <span className="legend-dot actual" /> Actual
        </span>
        <span className="legend-item">
            <span className="legend-dot goal" /> Goal
        </span>
    </div>
);

/* ══════════════════════════════════════════════
   Chart Data
══════════════════════════════════════════════ */
const charts = [
    {
        title: 'Service Sales ($)',
        yPrefix: '$',
        maxValue: 100,
        data: [
            { label: 'JAN', actual: 60, goal: 65 },
            { label: 'FEB', actual: 45, goal: 55 },
            { label: 'MAR', actual: 62, goal: 80 },
            { label: 'APR', actual: 68, goal: 92 },
            { label: 'MAY', actual: 55, goal: 60 },
            { label: 'JUN', actual: 28, goal: 75 },
            { label: 'JUL', actual: 65, goal: 88 },
            { label: 'AUG', actual: 62, goal: 90 },
            { label: 'SEP', actual: 45, goal: 85 },
            { label: 'OCT', actual: 28, goal: 70 },
            { label: 'NOV', actual: 50, goal: 82 },
            { label: 'DEC', actual: 48, goal: 80 },
        ],
    },
    {
        title: 'Packages Sold (#)',
        yPrefix: '',
        maxValue: 100,
        data: [
            { label: '20-21', actual: 55, goal: 85 },
            { label: '21-22', actual: 65, goal: 95 },
            { label: '22-23', actual: 28, goal: 60 },
            { label: '23-24', actual: 38, goal: 70 },
            { label: '24-25', actual: 55, goal: 85 },
        ],
    },
    {
        title: 'Retail Sales ($)',
        yPrefix: '$',
        maxValue: 100,
        data: [
            { label: 'JAN', actual: 40, goal: 70 },
            { label: 'FEB', actual: 55, goal: 65 },
            { label: 'MAR', actual: 70, goal: 80 },
            { label: 'APR', actual: 45, goal: 90 },
            { label: 'MAY', actual: 60, goal: 75 },
            { label: 'JUN', actual: 35, goal: 68 },
            { label: 'JUL', actual: 72, goal: 85 },
            { label: 'AUG', actual: 50, goal: 88 },
            { label: 'SEP', actual: 42, goal: 78 },
            { label: 'OCT', actual: 30, goal: 65 },
            { label: 'NOV', actual: 58, goal: 80 },
            { label: 'DEC', actual: 65, goal: 90 },
        ],
    },
    {
        title: 'Customer Satisfaction (#)',
        yPrefix: '',
        maxValue: 100,
        data: [
            { label: 'JAN', actual: 72, goal: 80 },
            { label: 'FEB', actual: 68, goal: 78 },
            { label: 'MAR', actual: 75, goal: 82 },
            { label: 'APR', actual: 80, goal: 85 },
            { label: 'MAY', actual: 70, goal: 80 },
            { label: 'JUN', actual: 65, goal: 78 },
            { label: 'JUL', actual: 78, goal: 83 },
            { label: 'AUG', actual: 82, goal: 86 },
            { label: 'SEP', actual: 74, goal: 80 },
            { label: 'OCT', actual: 69, goal: 78 },
            { label: 'NOV', actual: 76, goal: 82 },
            { label: 'DEC', actual: 80, goal: 85 },
        ],
    },
    {
        title: 'Upsell Rate (%)',
        yPrefix: '',
        maxValue: 100,
        data: [
            { label: 'JAN', actual: 48, goal: 60 },
            { label: 'FEB', actual: 42, goal: 58 },
            { label: 'MAR', actual: 55, goal: 62 },
            { label: 'APR', actual: 50, goal: 65 },
            { label: 'MAY', actual: 45, goal: 60 },
            { label: 'JUN', actual: 38, goal: 58 },
            { label: 'JUL', actual: 52, goal: 63 },
            { label: 'AUG', actual: 58, goal: 66 },
            { label: 'SEP', actual: 44, goal: 60 },
            { label: 'OCT', actual: 40, goal: 58 },
            { label: 'NOV', actual: 50, goal: 62 },
            { label: 'DEC', actual: 55, goal: 65 },
        ],
    },
];

/* ══════════════════════════════════════════════
   KPI History Page
══════════════════════════════════════════════ */
const KPIHistory = () => {
    const navigate = useNavigate();

    return (
        <Container fluid className="kpi-history-container px-4 py-3">
            {/* Header */}
            <div className="kpi-history-header">
                <button className="btn-back" onClick={() => navigate('/kpis')}>
                    <i className="bi bi-arrow-left"></i>
                </button>
                <h1 className="kpi-history-title">KPI History</h1>
            </div>

            {/* Chart Cards */}
            {charts.map((chart, idx) => (
                <div key={idx} className="history-chart-card">
                    <div className="history-chart-header">
                        <span className="history-chart-title">{chart.title}</span>
                        <ChartLegend />
                    </div>
                    <div className="history-chart-body">
                        <BarChart
                            data={chart.data}
                            maxValue={chart.maxValue}
                            yPrefix={chart.yPrefix}
                        />
                    </div>
                </div>
            ))}

            {/* Footer */}
            {/* <div className="kpi-history-footer">
                <button className="btn-view-foundation">View Foundation</button>
            </div> */}
        </Container>
    );
};

export default KPIHistory;
