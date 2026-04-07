# Swann Ave — Raya Team Member Web App

A premium, full-featured team member management web application built with **React + Vite**. Designed with a polished, modern UI using Bootstrap, custom CSS animations, and a responsive-first layout.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 18](https://react.dev/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Styling | [Bootstrap 5](https://getbootstrap.com/) + Custom CSS (`global.css`) |
| Routing | [React Router v6](https://reactrouter.com/) |
| Icons | [Bootstrap Icons](https://icons.getbootstrap.com/) |
| Fonts | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (via Google Fonts) |

---

## 📁 Project Structure

```
src/
├── assets/
│   └── styles/
│       ├── global.css         # All consolidated component styles + media queries
│       └── variables.css      # CSS design tokens (colors, spacing)
├── components/
│   ├── common/
│   │   ├── AnimatedCounter.jsx   # Animated number count-up widget
│   │   └── FoundationModal.jsx   # "View Foundation" modal (Mission, Vision, Values)
│   └── layout/
│       ├── MainLayout.jsx         # App shell: Sidebar + Navbar + Footer + Content
│       ├── Navbar.jsx             # Responsive top bar with search and profile
│       ├── Sidebar.jsx            # Navigation sidebar
│       └── Footer.jsx             # Footer with "View Foundation" trigger
├── pages/
│   ├── Auth/                  # Login / Authentication screens
│   ├── Calendar/              # Calendar view with weekly/monthly modes
│   ├── Dashboard/             # Main dashboard with animated widgets
│   ├── KPIs/                  # KPI tracking and history
│   ├── Messages/              # Real-time messaging UI
│   ├── ProjectsTasks/         # Project list, filtering, and task detail
│   ├── Search/                # Global search results page
│   ├── Settings/              # User profile and editable personal details
│   ├── SwannOS/               # Swann OS DISC chart and personality module
│   ├── TimeOff/               # Leave requests, stats, and approval management
│   └── Training/
│       ├── Training.jsx        # Card-based course list with status columns
│       ├── TrainingDetail.jsx  # Course detail with embedded HTML5 video player
│       └── TrainingCertificate.jsx # Certification display page
└── routes/
    └── AppRoutes.jsx           # Centralized route definitions
```

---

## 🎨 Design System

The app uses a unified design language defined in `src/assets/styles/variables.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--primary-color` | `#40878E` | Teal — primary actions, active states |
| `--secondary-color` | `#0f1d3a` | Navy — sidebar, headings |
| `--bg-light` | `#f8fafc` | Page backgrounds |
| `--text-dark` | `#1e293b` | Body text |

All interactive elements follow a **premium design philosophy**:
- Smooth CSS transitions (`cubic-bezier` easing)
- `translateY` lift + shadow on hover
- Entrance animations (`fadeInUp` keyframes) for staggered page loads
- Status-based color coding (Teal = complete, Orange = in-progress, Grey = not started)

---

## 📱 Responsive Design

The application is fully responsive across desktop, tablet, and mobile (tested at **360px**):

- **Sidebar**: Fixed overlay on mobile, toggled via hamburger menu
- **Navbar**: Full-width search bar always visible; icon row compacted on small screens
- **Projects & Tasks**: Full-width immersive grid; no max-width constraints
- **Training Cards**: Three-column kanban-style layout collapses to single column on mobile
- **Time Off**: Stats cards stack vertically; data table scrolls horizontally
- **Messages**: Sidebar/chat pane swap on mobile; full-screen chat experience

---

## ✨ Key Features

### Dashboard
- Animated entrance effects for all widgets (staggered `fadeInUp`)
- `AnimatedCounter` for Mental Health Index score
- Interactive leaderboard and progress tracking

### Training Module
- Kanban-style columns: **Not Started**, **In Progress**, **Completed**
- Functional **HTML5 video player** in course detail (`TrainingDetail.jsx`)
- Premium hover animations on action buttons (Start / Resume / View Certificate)
- Certificate generation page (`TrainingCertificate.jsx`)

### Projects & Tasks
- Interactive stat cards for filtering by status (Scheduled / In-Progress / Completed)
- Project detail view with task list, attachments, and progress tracking

### Time Off
- Leave request modal with date pickers, Full/Half day checkboxes
- Filterable leave history table (filter by Availed, Remaining, Total)
- Status badges (Approved, Applied, Rejected, Request Change)

### Messages
- Multi-room chat with sidebar navigation
- Room info panel with member list
- Image, link, and text bubble support

### Settings
- Editable personal, family, and account details
- Kids info management with Add Kid modal
- Notification and privacy toggles

---

## 🛠️ Getting Started

### Prerequisites
- Node.js `>= 18`
- npm `>= 9`

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 🗂️ Routing Overview

| Route | Page |
|-------|------|
| `/` | Login / Auth |
| `/dashboard` | Dashboard |
| `/training` | Training Module |
| `/training/detail` | Course Detail (with Video) |
| `/training/certificate` | Training Certificate |
| `/projects` | Projects & Tasks |
| `/timeoff` | Time Off |
| `/calendar` | Calendar |
| `/messages` | Messages |
| `/kpis` | KPIs |
| `/settings` | Settings |
| `/search` | Search Results |
| `/swanno` | Swann OS |

---

## 📝 Notes

- All component-level CSS is consolidated into `src/assets/styles/global.css` for easy maintenance.
- CSS custom properties (variables) are defined in `variables.css` and imported globally.
- No external state management library is used — local `useState` / `useEffect` are sufficient for current scope.
- For larger teams, consider migrating to React Query or Zustand for server state management.

---

© 2026 Swann Ave. All rights reserved.
