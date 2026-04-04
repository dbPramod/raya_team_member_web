import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './KPIs.css';

/* ══════════════════════════════════════════════
   SVG Bar Chart Component
══════════════════════════════════════════════ */
const BarChart = ({ data, maxValue, yPrefix }) => {
    const W = 700, H = 220;
    const pad = { top: 12, right: 16, bottom: 28, left: 42 };
    const innerW = W - pad.left - pad.right;
    const innerH = H - pad.top - pad.bottom;
    const groupW = innerW / data.length;
    const barW = Math.min(groupW * 0.28, 18);
    const gap = 3;
    const ticks = [0, 20, 40, 60, 80, 100];

    return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Y-axis grid + labels */}
            {ticks.map((t) => {
                const y = pad.top + innerH - (t / maxValue) * innerH;
                return (
                    <g key={t}>
                        <line x1={pad.left} y1={y} x2={pad.left + innerW} y2={y}
                            stroke="#e8edf2" strokeWidth="1" />
                        <text x={pad.left - 6} y={y + 4} textAnchor="end"
                            fontSize="9.5" fill="#94a3b8" fontFamily="Plus Jakarta Sans, sans-serif">
                            {yPrefix}{t}
                        </text>
                    </g>
                );
            })}

            {/* Bars */}
            {data.map((d, i) => {
                const cx = pad.left + i * groupW + groupW / 2;
                const aH = (d.actual / maxValue) * innerH;
                const gH = (d.goal / maxValue) * innerH;
                const aX = cx - barW - gap / 2;
                const gX = cx + gap / 2;

                return (
                    <g key={i}>
                        {/* Actual bar */}
                        <rect x={aX} y={pad.top + innerH - aH}
                            width={barW} height={aH}
                            fill="#1a3a6b" rx="3" />
                        {/* Goal bar */}
                        <rect x={gX} y={pad.top + innerH - gH}
                            width={barW} height={gH}
                            fill="#7bc8cd" rx="3" />
                        {/* X label */}
                        <text x={cx} y={H - 6} textAnchor="middle"
                            fontSize="9" fill="#94a3b8" fontFamily="Plus Jakarta Sans, sans-serif">
                            {d.label}
                        </text>
                    </g>
                );
            })}

            {/* Y-axis line */}
            <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + innerH}
                stroke="#e2e8f0" strokeWidth="1" />
        </svg>
    );
};

/* ══════════════════════════════════════════════
   Shared Progress Bar Component
══════════════════════════════════════════════ */
const ProgressBar = ({ percent, rangeStart, rangeEnd }) => (
    <>
        <div className="kpi-progress-wrapper">
            <div className="kpi-progress-track">
                <div className="kpi-progress-fill"
                    style={{ width: `${Math.min(Math.max(percent, 0), 100)}%` }}>
                    <div className="kpi-flag">{percent} %</div>
                </div>
            </div>
        </div>
        <div className="kpi-range">
            <span>{rangeStart}</span>
            <span>{rangeEnd}</span>
        </div>
    </>
);

/* ══════════════════════════════════════════════
   KPI Progress Card (main list)
══════════════════════════════════════════════ */
const KPICard = ({ kpi, onLeaderboard }) => (
    <div className="kpi-card">
        <div className="kpi-card-header">
            <h6 className="kpi-card-title">
                {kpi.title}{' '}
                <span style={{ fontWeight: 400, color: '#475569' }}>({kpi.unit})</span>
            </h6>
            <button className="btn-leaderboard" onClick={() => onLeaderboard(kpi)}>
                Leaderboard
            </button>
        </div>
        <div className="kpi-card-body">
            <div className="kpi-progress-label">Progress</div>
            <ProgressBar
                percent={kpi.progress}
                rangeStart={kpi.rangeStart}
                rangeEnd={kpi.rangeEnd}
            />
        </div>
    </div>
);

/* ══════════════════════════════════════════════
   Leaderboard View
══════════════════════════════════════════════ */
const LeaderboardView = ({ kpi, onBack }) => {
    const you = { name: 'You', img: 'https://i.pravatar.cc/150?u=sapphire', progress: kpi.progress, rank: 4 };
    const members = [
        { rank: 1, name: 'Isla Rose', img: 'https://i.pravatar.cc/150?u=isla', progress: 15, rangeStart: '0', rangeEnd: '2000' },
        { rank: 2, name: 'Carter Lee', img: 'https://i.pravatar.cc/150?u=carter', progress: 40, rangeStart: '0', rangeEnd: '300' },
        { rank: 3, name: 'Avery Green', img: 'https://i.pravatar.cc/150?u=avery', progress: 28, rangeStart: '0', rangeEnd: '500' },
        { rank: 4, name: 'You', img: 'https://i.pravatar.cc/150?u=sapphire', progress: kpi.progress, rangeStart: kpi.rangeStart, rangeEnd: kpi.rangeEnd },
        { rank: 5, name: 'Jordan Blake', img: 'https://i.pravatar.cc/150?u=jordan', progress: 10, rangeStart: '0', rangeEnd: '800' },
        { rank: 6, name: 'Taylor Kim', img: 'https://i.pravatar.cc/150?u=taylor', progress: 8, rangeStart: '0', rangeEnd: '600' },
        { rank: 7, name: 'Morgan Reed', img: 'https://i.pravatar.cc/150?u=morgan', progress: 5, rangeStart: '0', rangeEnd: '400' },
    ];
    return (
        <div className="leaderboard-view">
            <div className="leaderboard-header">
                <button className="btn-back" onClick={onBack}><i className="bi bi-arrow-left"></i></button>
                <h1 className="leaderboard-page-title">{kpi.title} ({kpi.unit})</h1>
            </div>
            <div className="leaderboard-section-title">Leaderboard</div>
            <div className="leaderboard-you-card">
                <div className="leaderboard-you-top">
                    <div className="leaderboard-you-info">
                        <img src={you.img} alt="You" />
                        <span className="leaderboard-you-name">You</span>
                    </div>
                    <span className="badge-rank">Rank {you.rank}</span>
                </div>
                <ProgressBar percent={you.progress} rangeStart="0 %" rangeEnd="100 %" />
            </div>
            <div className="leaderboard-scroll-list">
                {members.map((m) => (
                    <div key={m.rank} className="lb-member-card">
                        <div className="lb-rank-badge">{m.rank}</div>
                        <div className="lb-member-content">
                            <div className="lb-member-top">
                                <img src={m.img} alt={m.name} />
                                <span className="lb-member-name">{m.name}</span>
                            </div>
                            <ProgressBar percent={m.progress} rangeStart={m.rangeStart} rangeEnd={m.rangeEnd} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ══════════════════════════════════════════════
   KPI History View
══════════════════════════════════════════════ */
const serviceSalesData = [
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
];

const packagesSoldData = [
    { label: '20-21', actual: 55, goal: 85 },
    { label: '21-22', actual: 65, goal: 95 },
    { label: '22-23', actual: 28, goal: 60 },
    { label: '23-24', actual: 38, goal: 70 },
    { label: '24-25', actual: 55, goal: 85 },
];

const retailSalesData = [
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
];

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

const KPIHistoryView = ({ onBack }) => (
    <div>
        {/* Header */}
        <div className="leaderboard-header">
            <button className="btn-back" onClick={onBack}>
                <i className="bi bi-arrow-left"></i>
            </button>
            <h1 className="leaderboard-page-title">KPI History</h1>
        </div>

        {/* Service Sales Chart */}
        <div className="history-chart-card">
            <div className="history-chart-header">
                <span className="history-chart-title">Service Sales ($)</span>
                <ChartLegend />
            </div>
            <div className="history-chart-body">
                <BarChart data={serviceSalesData} maxValue={100} yPrefix="$" />
            </div>
        </div>

        {/* Packages Sold Chart */}
        <div className="history-chart-card">
            <div className="history-chart-header">
                <span className="history-chart-title">Packages Sold (#)</span>
                <ChartLegend />
            </div>
            <div className="history-chart-body">
                <BarChart data={packagesSoldData} maxValue={100} yPrefix="" />
            </div>
        </div>

        {/* Retail Sales Chart */}
        <div className="history-chart-card">
            <div className="history-chart-header">
                <span className="history-chart-title">Retail Sales ($)</span>
                <ChartLegend />
            </div>
            <div className="history-chart-body">
                <BarChart data={retailSalesData} maxValue={100} yPrefix="$" />
            </div>
        </div>

        <div className="kpi-footer">
            <button className="btn-view-foundation">View Foundation</button>
        </div>
    </div>
);

/* ══════════════════════════════════════════════
   KPI Data
══════════════════════════════════════════════ */
const kpiData = [
    { title: 'Packages Sold', unit: '#', progress: 15, rangeStart: '0', rangeEnd: '1000' },
    { title: 'Service Sales', unit: '$', progress: 20, rangeStart: '0 %', rangeEnd: '100 %' },
    { title: 'Retail Sales', unit: '$', progress: 35, rangeStart: '0 %', rangeEnd: '100 %' },
    { title: 'Customer Satisfaction', unit: '#', progress: 72, rangeStart: '0', rangeEnd: '100' },
    { title: 'Upsell Rate', unit: '%', progress: 48, rangeStart: '0 %', rangeEnd: '100 %' },
];

/* ══════════════════════════════════════════════
   KPIs Page
══════════════════════════════════════════════ */
const KPIs = () => {
    const navigate = useNavigate();
    const [activeLeaderboard, setActiveLeaderboard] = useState(null);

    if (activeLeaderboard) {
        return (
            <Container fluid className="kpis-container px-4 py-3">
                <LeaderboardView kpi={activeLeaderboard} onBack={() => setActiveLeaderboard(null)} />
            </Container>
        );
    }

    return (
        <Container fluid className="kpis-container px-4 py-3">
            {/* Page Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-2">
                    <h1 className="kpi-page-title">KPIs</h1>
                    <i className="bi bi-question-circle kpi-help-icon"></i>
                </div>
                <button className="btn-history" onClick={() => navigate('/kpis/history')}>
                    <i className="bi bi-arrow-clockwise"></i>
                    History
                </button>
            </div>

            <p className="kpi-section-title">KPIs Assigned to You</p>

            {kpiData.map((kpi, idx) => (
                <KPICard key={idx} kpi={kpi} onLeaderboard={setActiveLeaderboard} />
            ))}
        </Container>
    );
};

export default KPIs;
