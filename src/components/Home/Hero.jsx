import { useState } from "react";
import {
    ArrowRight,
    CirclePlay,
    Search,
    Sparkles,
    Check,
    Mic2,
    CalendarDays,
    Users,
    Bell,
    X,
} from "lucide-react";

import { Reveal } from "./Reveal";

export function Hero() {
    const [demoOpen, setDemoOpen] = useState(false);

    return (
        <section className="hero-section" id="top">
            <div className="hero-bg-grid" />

            {/* Hero Content */}
            <div className="hero-copy">
                <Reveal>
                    <div className="eyebrow">
                        <span className="eyebrow-dot" />
                        The intelligent meeting workspace
                    </div>
                </Reveal>

                <Reveal delay={80}>
                    <h1>
                        Meetings in.
                        <br />
                        <em>Momentum</em> out.
                    </h1>
                </Reveal>

                <Reveal delay={160}>
                    <p className="hero-description">
                        Upload any recording or transcript. MeetMind transcribes,
                        summarizes, extracts action items, assigns tasks, and lets you
                        search every meeting with AI — so nothing falls through the cracks.
                    </p>
                </Reveal>

                <Reveal delay={240}>
                    <div className="hero-buttons" id="signup">
                        <a className="button button-orange" href="#how">
                            Start for free
                            <ArrowRight size={17} />
                        </a>

                        <button
                            className="play-button"
                            onClick={() => setDemoOpen(true)}
                        >
                            <CirclePlay size={20} />
                            See how it works
                        </button>
                    </div>
                </Reveal>

                <Reveal delay={320}>
                    <div className="hero-proof">
                        <div className="avatar-stack">
                            <span>JR</span>
                            <span>MC</span>
                            <span>AK</span>
                            <span>+2k</span>
                        </div>

                        <span>Loved by teams who get things done</span>
                    </div>
                </Reveal>
            </div>

            {/* Product Preview */}
            <div
                className="hero-visual"
                aria-label="MeetMind product preview"
            >
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />

                <div className="dashboard-window">
                    {/* Window Header */}
                    <div className="window-top">
                        <div className="window-brand">
                            <span className="mini-mark" />
                            MeetMind
                        </div>

                        <div className="window-search">
                            <Search size={13} />
                            Search anything
                        </div>

                        <div className="window-user">JC</div>
                    </div>

                    <div className="dashboard-body">
                        {/* Sidebar */}
                        <aside className="dashboard-sidebar">
                            <div className="sidebar-label">Workspace</div>

                            <div className="sidebar-active">
                                <span>⊞</span>
                                Dashboard
                            </div>

                            <div>
                                <Mic2 size={13} />
                                Meetings
                            </div>

                            <div>
                                <Check size={13} />
                                Tasks
                            </div>

                            <div>
                                <Sparkles size={13} />
                                AI Search
                            </div>

                            <div>
                                <CalendarDays size={13} />
                                Calendar
                            </div>

                            <div>
                                <Users size={13} />
                                Workspace
                            </div>

                            <div className="sidebar-tip">
                                <small>PRO TIP</small>

                                <p>
                                    Invite your team to unlock shared meeting memory.
                                </p>

                                <button>Invite teammates</button>
                            </div>
                        </aside>

                        {/* Dashboard Content */}
                        <div className="dashboard-content">
                            {/* Heading */}
                            <div className="content-heading">
                                <div>
                                    <span className="dash-kicker">
                                        OVERVIEW · THIS WEEK
                                    </span>

                                    <h3>
                                        Good afternoon, <b>Jane.</b>
                                    </h3>

                                    <p>
                                        You have 3 meetings today and 14 open action items.
                                    </p>
                                </div>

                                <button className="upload-button">
                                    <span>＋</span>
                                    Upload a meeting
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="stat-grid">
                                <div className="stat-card">
                                    <span className="stat-icon">
                                        <Mic2 size={13} />
                                    </span>

                                    <small>
                                        Total meetings <b>+12%</b>
                                    </small>

                                    <strong>128</strong>
                                </div>

                                <div className="stat-card stat-dark">
                                    <span className="stat-icon orange-icon">
                                        <Check size={13} />
                                    </span>

                                    <small>
                                        Pending tasks <b>-3 this week</b>
                                    </small>

                                    <strong>14</strong>
                                </div>

                                <div className="stat-card">
                                    <span className="stat-icon">
                                        <Sparkles size={13} />
                                    </span>

                                    <small>
                                        AI searches <b>+28%</b>
                                    </small>

                                    <strong>42</strong>
                                </div>
                            </div>

                            {/* Charts and Deadlines */}
                            <div className="data-row">
                                {/* Chart */}
                                <div className="chart-card">
                                    <div className="card-heading">
                                        <div>
                                            <span className="dash-kicker">
                                                LAST 7 DAYS
                                            </span>

                                            <h4>Meeting activity</h4>
                                        </div>

                                        <span className="legend">
                                            <i />
                                            Meetings
                                            <i className="gray-dot" />
                                            Minutes
                                        </span>
                                    </div>

                                    <div className="chart">
                                        <div className="grid-line one" />
                                        <div className="grid-line two" />
                                        <div className="grid-line three" />

                                        <svg
                                            viewBox="0 0 470 115"
                                            preserveAspectRatio="none"
                                        >
                                            <defs>
                                                <linearGradient
                                                    id="area"
                                                    x1="0"
                                                    x2="0"
                                                    y1="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="0"
                                                        stopColor="#ff4d0a"
                                                        stopOpacity=".22"
                                                    />

                                                    <stop
                                                        offset="1"
                                                        stopColor="#ff4d0a"
                                                        stopOpacity="0"
                                                    />
                                                </linearGradient>
                                            </defs>

                                            <path
                                                className="area-path"
                                                d="M0,84 C45,58 75,43 111,50 S161,92 190,72 S221,26 248,31 S305,55 335,73 S389,108 470,110 V115 H0 Z"
                                            />

                                            <path
                                                className="line-path"
                                                d="M0,84 C45,58 75,43 111,50 S161,92 190,72 S221,26 248,31 S305,55 335,73 S389,108 470,110"
                                            />

                                            <circle
                                                cx="248"
                                                cy="31"
                                                r="4"
                                            />
                                        </svg>

                                        <div className="chart-labels">
                                            <span>Mon</span>
                                            <span>Tue</span>
                                            <span>Wed</span>
                                            <span>Thu</span>
                                            <span>Fri</span>
                                            <span>Sat</span>
                                            <span>Sun</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Deadlines */}
                                <div className="deadline-card">
                                    <div className="card-heading">
                                        <div>
                                            <span className="dash-kicker">
                                                COMING UP
                                            </span>

                                            <h4>Deadlines</h4>
                                        </div>

                                        <Bell size={16} />
                                    </div>

                                    <ul>
                                        <li>
                                            <i />

                                            <div>
                                                <b>Ship login redesign</b>
                                                <span>Mansi · Due tomorrow</span>
                                            </div>
                                        </li>

                                        <li>
                                            <i />

                                            <div>
                                                <b>Northwind proposal</b>
                                                <span>Jane · Due Fri</span>
                                            </div>
                                        </li>

                                        <li>
                                            <i />

                                            <div>
                                                <b>Q1 marketing report</b>
                                                <span>Nina · Due Mar 3</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Recent Meetings */}
                            <div className="recent-card">
                                <div className="card-heading">
                                    <h4>Recent meetings</h4>
                                    <span>VIEW ALL →</span>
                                </div>

                                <div className="meeting-item">
                                    <strong>W</strong>

                                    <div>
                                        <b>Weekly Sprint Planning</b>
                                        <span>Today, 10:00 AM · 45 min</span>
                                    </div>

                                    <div className="meeting-tag">
                                        <Sparkles size={12} />
                                        Summary ready
                                    </div>
                                </div>

                                <div className="meeting-item">
                                    <strong className="green-avatar">
                                        N
                                    </strong>

                                    <div>
                                        <b>Northwind project kickoff</b>
                                        <span>Yesterday, 2:30 PM · 31 min</span>
                                    </div>

                                    <div className="meeting-tag">
                                        <Check size={12} />
                                        4 tasks found
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating AI Summary */}
                <div className="floating-note note-top">
                    <span className="note-icon">
                        <Sparkles size={14} />
                    </span>

                    <div>
                        <small>AI SUMMARY READY</small>
                        <b>3 decisions found</b>
                    </div>
                </div>

                {/* Floating Action Item */}
                <div className="floating-note note-bottom">
                    <span className="note-icon note-check">
                        <Check size={15} />
                    </span>

                    <div>
                        <small>ACTION ITEM</small>
                        <b>Assigned to Mansi</b>
                    </div>

                    <span className="note-avatar">MC</span>
                </div>
            </div>

            {/* Demo Modal */}
            {demoOpen && (
                <div
                    className="modal-backdrop"
                    onClick={() => setDemoOpen(false)}
                >
                    <div
                        className="demo-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="modal-close"
                            onClick={() => setDemoOpen(false)}
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>

                        <div className="modal-play">
                            <CirclePlay size={34} />
                        </div>

                        <span className="eyebrow">
                            A better meeting rhythm
                        </span>

                        <h2>
                            Every conversation has a next step.
                        </h2>

                        <p>
                            MeetMind listens, understands, and helps your team
                            turn good meetings into meaningful progress.
                        </p>

                        <a
                            className="button button-orange"
                            href="#how"
                            onClick={() => setDemoOpen(false)}
                        >
                            Start for free
                            <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Hero;