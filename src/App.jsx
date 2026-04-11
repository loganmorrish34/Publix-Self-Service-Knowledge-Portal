import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Search,
  Moon,
  Sun,
  User,
  ShieldCheck,
  FileText,
  Send,
  Wrench,
  Laptop,
  KeyRound,
  Printer,
  Wifi,
  LayoutDashboard,
  Ticket,
  CheckCircle2,
  Mail,
  MonitorSmartphone,
} from "lucide-react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loginMessage, setLoginMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [ticketCounter, setTicketCounter] = useState(1004);
  const [tickets, setTickets] = useState([
    {
      id: "INC1001",
      type: "Incident",
      title: "Password reset assistance",
      status: "Open",
      urgency: "Medium",
      created: "Today",
    },
    {
      id: "REQ1002",
      type: "Request",
      title: "Printer setup request",
      status: "In Progress",
      urgency: "Low",
      created: "Yesterday",
    },
    {
      id: "INC1003",
      type: "Incident",
      title: "WiFi issue in back office",
      status: "Resolved",
      urgency: "High",
      created: "2 days ago",
    },
  ]);

  const [loginForm, setLoginForm] = useState({
    employeeId: "",
    password: "",
  });

  const [form, setForm] = useState({
    employeeId: "",
    email: "",
    issueType: "password",
    urgency: "medium",
    description: "",
    requestType: "incident",
  });

  const articles = [
    {
      id: 1,
      title: "How to reset your password",
      category: "Account",
      icon: KeyRound,
      body: "Use the password reset option from the sign in panel. Verify your employee ID, confirm your email, and create a new secure password.",
      steps: [
        "Open the employee sign in panel",
        "Select Forgot Password",
        "Enter your employee ID and company email",
        "Complete the verification step",
        "Create a new secure password",
      ],
    },
    {
      id: 2,
      title: "Printer troubleshooting basics",
      category: "Hardware",
      icon: Printer,
      body: "Check power, paper, toner, cable connection, and printer queue before opening an incident.",
      steps: [
        "Confirm the printer is on",
        "Check paper and toner",
        "Verify network or USB connection",
        "Clear the print queue",
        "Restart the printer and try again",
      ],
    },
    {
      id: 3,
      title: "Fix slow WiFi or connection drops",
      category: "Network",
      icon: Wifi,
      body: "Reconnect to the approved network, restart the device, and test another application to confirm the problem.",
      steps: [
        "Disconnect and reconnect to WiFi",
        "Restart the device",
        "Forget and rejoin the network if needed",
        "Test another application",
        "Submit a report if the issue continues",
      ],
    },
    {
      id: 4,
      title: "Laptop startup and performance basics",
      category: "Device",
      icon: Laptop,
      body: "Restart the laptop, close unused apps, confirm storage space, and install updates.",
      steps: [
        "Restart the laptop",
        "Close unused apps and tabs",
        "Check available storage",
        "Install pending updates",
        "Submit an incident if performance remains poor",
      ],
    },
    {
      id: 5,
      title: "POS sign in issue quick guide",
      category: "Account",
      icon: MonitorSmartphone,
      body: "Verify credentials, confirm the terminal is connected, and retry sign in before escalating.",
      steps: [
        "Confirm your user ID",
        "Check terminal network connection",
        "Restart the terminal if allowed",
        "Attempt sign in again",
        "Report the issue with store number and terminal ID",
      ],
    },
    {
      id: 6,
      title: "Email access troubleshooting",
      category: "Device",
      icon: Mail,
      body: "Check password accuracy, sync settings, and whether the mailbox is reachable from another device.",
      steps: [
        "Verify your password",
        "Restart the mail app",
        "Check internet connection",
        "Test webmail if available",
        "Submit a request if access still fails",
      ],
    },
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesText =
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.body.toLowerCase().includes(query.toLowerCase()) ||
        article.category.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || article.category.toLowerCase() === selectedCategory;
      return matchesText && matchesCategory;
    });
  }, [articles, query, selectedCategory]);

  const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const updateLoginForm = (key, value) => setLoginForm((prev) => ({ ...prev, [key]: value }));

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginMessage(`Demo sign in successful for employee ${loginForm.employeeId || "user"}.`);
  };

  const handleSubmitTicket = (kind) => {
    const prefix = kind === "Request" ? "REQ" : "INC";
    const newId = `${prefix}${ticketCounter}`;
    const issueLabel =
      form.issueType === "password"
        ? "Password or sign in"
        : form.issueType === "device"
          ? "Device issue"
          : form.issueType === "network"
            ? "Network issue"
            : "Printer issue";

    const newTicket = {
      id: newId,
      type: kind,
      title: issueLabel,
      status: "Open",
      urgency: form.urgency.charAt(0).toUpperCase() + form.urgency.slice(1),
      created: "Just now",
    };

    setTickets((prev) => [newTicket, ...prev]);
    setTicketCounter((prev) => prev + 1);
    setSubmitMessage(`${kind} submitted successfully. Reference number: ${newId}`);
    setActiveTab("tickets");
    setForm({
      employeeId: "",
      email: "",
      issueType: "password",
      urgency: "medium",
      description: "",
      requestType: "incident",
    });
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <style>{styles}</style>
      <div className="page-shell">
        <header className="topbar">
          <div className="brand-wrap">
            <div className="logo-box">P</div>
            <div>
              <h1>Publix IT Self Service Portal</h1>
              <p>Knowledge articles, employee access, and incident reporting</p>
            </div>
          </div>

          <div className="top-actions">
            <label className="mode-toggle">
              <span>Dark mode</span>
              <button
                className={darkMode ? "toggle on" : "toggle"}
                onClick={() => setDarkMode(!darkMode)}
                type="button"
                aria-label="Toggle dark mode"
              >
                <span className="toggle-knob" />
              </button>
            </label>
            <button className="primary-btn" onClick={() => setActiveTab("signin")}>Employee Sign In</button>
          </div>
        </header>

        <nav className="nav-tabs">
          <NavButton icon={LayoutDashboard} label="Home" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
          <NavButton icon={FileText} label="Knowledge Base" active={activeTab === "knowledge"} onClick={() => setActiveTab("knowledge")} />
          <NavButton icon={Send} label="Submit Ticket" active={activeTab === "report"} onClick={() => setActiveTab("report")} />
          <NavButton icon={Ticket} label="My Tickets" active={activeTab === "tickets"} onClick={() => setActiveTab("tickets")} />
          <NavButton icon={User} label="Sign In" active={activeTab === "signin"} onClick={() => setActiveTab("signin")} />
        </nav>

        {(activeTab === "home" || activeTab === "signin" || activeTab === "knowledge" || activeTab === "report") && (
          <section className="hero-grid">
            <div className="hero-card card">
              <div className="badge">Internal Support Portal</div>
              <h2>Solve common IT problems faster with self service support</h2>
              <p>
                Search helpful knowledge articles, review step by step fixes, sign in as an employee, and create an incident or request when you still need help.
              </p>
              <div className="hero-actions">
                <button className="primary-btn" onClick={() => setActiveTab("knowledge")}>Browse Articles</button>
                <button className="secondary-btn" onClick={() => setActiveTab("report")}>Create Report</button>
              </div>
              <div className="stats-grid">
                <StatCard number="24/7" label="Portal access" />
                <StatCard number="6" label="Knowledge categories" />
                <StatCard number="1" label="Unified support entry point" />
              </div>
            </div>

            <div className="signin-card card green-card">
              <h3>Employee Sign In</h3>
              <p>Example employee sign in area</p>
              <form onSubmit={handleLogin} className="form-stack">
                <label>
                  <span>Employee ID</span>
                  <input
                    value={loginForm.employeeId}
                    onChange={(e) => updateLoginForm("employeeId", e.target.value)}
                    placeholder="Enter employee ID"
                  />
                </label>
                <label>
                  <span>Password</span>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => updateLoginForm("password", e.target.value)}
                    placeholder="Enter password"
                  />
                </label>
                <div className="signin-meta">
                  <span>Secure employee access</span>
                  <span className="linkish">Forgot password?</span>
                </div>
                <button className="white-btn" type="submit">Sign In</button>
                {loginMessage && (
                  <div className="success-box light-success">
                    <CheckCircle2 size={18} />
                    <span>{loginMessage}</span>
                  </div>
                )}
              </form>
            </div>
          </section>
        )}

        {(activeTab === "home" || activeTab === "knowledge") && (
          <section className="content-grid">
            <div className="card section-card">
              <div className="section-head">
                <div>
                  <h3>Knowledge Articles</h3>
                  <p>Search articles to find fast solutions before creating a support ticket</p>
                </div>
              </div>

              <div className="search-row">
                <div className="search-box">
                  <Search size={18} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search password, printer, WiFi, laptop"
                  />
                </div>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="all">All</option>
                  <option value="account">Account</option>
                  <option value="hardware">Hardware</option>
                  <option value="network">Network</option>
                  <option value="device">Device</option>
                </select>
              </div>

              <div className="articles-grid">
                {filteredArticles.map((article) => {
                  const Icon = article.icon;
                  return (
                    <div key={article.id} className="article-card">
                      <div className="article-top">
                        <span className="badge small">{article.category}</span>
                        <div className="icon-chip">
                          <Icon size={18} />
                        </div>
                      </div>
                      <h4>{article.title}</h4>
                      <p>{article.body}</p>
                      <ol>
                        {article.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  );
                })}
              </div>
            </div>

            {(activeTab === "home" || activeTab === "report") && (
              <div className="card section-card">
                <div className="section-head">
                  <div>
                    <h3>Report an Issue</h3>
                    <p>Create an incident or service request if self service did not solve the problem</p>
                  </div>
                </div>

                <div className="tab-row">
                  <button
                    className={form.requestType === "incident" ? "tab-btn active" : "tab-btn"}
                    onClick={() => updateForm("requestType", "incident")}
                    type="button"
                  >
                    Incident
                  </button>
                  <button
                    className={form.requestType === "request" ? "tab-btn active" : "tab-btn"}
                    onClick={() => updateForm("requestType", "request")}
                    type="button"
                  >
                    Request
                  </button>
                </div>

                <div className="form-stack">
                  <label>
                    <span>Employee ID</span>
                    <input value={form.employeeId} onChange={(e) => updateForm("employeeId", e.target.value)} placeholder="Enter employee ID" />
                  </label>
                  <label>
                    <span>Company Email</span>
                    <input value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="name@publix.com" />
                  </label>

                  <div className="two-col">
                    <label>
                      <span>Issue Type</span>
                      <select value={form.issueType} onChange={(e) => updateForm("issueType", e.target.value)}>
                        <option value="password">Password or sign in</option>
                        <option value="device">Device issue</option>
                        <option value="network">Network issue</option>
                        <option value="printer">Printer issue</option>
                      </select>
                    </label>
                    <label>
                      <span>Urgency</span>
                      <select value={form.urgency} onChange={(e) => updateForm("urgency", e.target.value)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </label>
                  </div>

                  <label>
                    <span>Description</span>
                    <textarea
                      value={form.description}
                      onChange={(e) => updateForm("description", e.target.value)}
                      placeholder="Describe the issue, what you already tried, and where it happened"
                    />
                  </label>

                  <button
                    className="primary-btn full"
                    onClick={() => handleSubmitTicket(form.requestType === "request" ? "Request" : "Incident")}
                    type="button"
                  >
                    {form.requestType === "request" ? "Submit Request" : "Submit Incident"}
                  </button>

                  {submitMessage && (
                    <div className="success-box">
                      <CheckCircle2 size={18} />
                      <span>{submitMessage}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {activeTab === "report" && (
          <section className="single-section">
            <div className="card section-card wide-card">
              <div className="section-head">
                <div>
                  <h3>Submit a Ticket</h3>
                  <p>Use this form to submit an incident or service request to IT support</p>
                </div>
              </div>

              <div className="tab-row max-tabs">
                <button
                  className={form.requestType === "incident" ? "tab-btn active" : "tab-btn"}
                  onClick={() => updateForm("requestType", "incident")}
                  type="button"
                >
                  Incident
                </button>
                <button
                  className={form.requestType === "request" ? "tab-btn active" : "tab-btn"}
                  onClick={() => updateForm("requestType", "request")}
                  type="button"
                >
                  Request
                </button>
              </div>

              <div className="form-grid">
                <label>
                  <span>Employee ID</span>
                  <input value={form.employeeId} onChange={(e) => updateForm("employeeId", e.target.value)} placeholder="Enter employee ID" />
                </label>
                <label>
                  <span>Company Email</span>
                  <input value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="name@publix.com" />
                </label>
                <label>
                  <span>Issue Type</span>
                  <select value={form.issueType} onChange={(e) => updateForm("issueType", e.target.value)}>
                    <option value="password">Password or sign in</option>
                    <option value="device">Device issue</option>
                    <option value="network">Network issue</option>
                    <option value="printer">Printer issue</option>
                  </select>
                </label>
                <label>
                  <span>Urgency</span>
                  <select value={form.urgency} onChange={(e) => updateForm("urgency", e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>
                <label className="span-all">
                  <span>Description</span>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateForm("description", e.target.value)}
                    placeholder="Describe the issue, what you already tried, and where it happened"
                  />
                </label>
              </div>

              <div className="form-footer">
                <button
                  className="primary-btn"
                  onClick={() => handleSubmitTicket(form.requestType === "request" ? "Request" : "Incident")}
                  type="button"
                >
                  {form.requestType === "request" ? "Submit Request" : "Submit Incident"}
                </button>
              </div>

              {submitMessage && (
                <div className="success-box spaced-top">
                  <CheckCircle2 size={18} />
                  <span>{submitMessage}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "tickets" && (
          <section className="single-section">
            <div className="card section-card wide-card">
              <div className="section-head">
                <div>
                  <h3>My Tickets</h3>
                  <p>Track submitted incidents and service requests</p>
                </div>
              </div>

              <div className="tickets-list">
                {tickets.map((ticket) => (
                  <div className="ticket-card" key={ticket.id}>
                    <div>
                      <div className="ticket-id-row">
                        <span className="badge small">{ticket.type}</span>
                        <strong>{ticket.id}</strong>
                      </div>
                      <h4>{ticket.title}</h4>
                      <p>Created {ticket.created}</p>
                    </div>
                    <div className="ticket-meta">
                      <span className={`status-pill ${ticket.status.toLowerCase().replace(/\s/g, "-")}`}>{ticket.status}</span>
                      <span className="urgency-pill">{ticket.urgency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="feature-strip">
          <FeatureCard icon={Wrench} title="Self service first" text="Guide associates through common fixes before opening a case." />
          <FeatureCard icon={ShieldCheck} title="Secure employee access" text="Dedicated sign in area for employee use and protected support actions." />
          <FeatureCard icon={FileText} title="Knowledge driven support" text="Organize helpful articles by category and connect them to reporting flows." />
        </section>
      </div>
    </div>
  );
}

function NavButton({ icon: Icon, label, active, onClick }) {
  return (
    <button className={active ? "nav-btn active" : "nav-btn"} onClick={onClick} type="button">
      <Icon size={16} />
      <span>{label}</span>
    </button>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="stat-card">
      <h4>{number}</h4>
      <p>{label}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className="card feature-card">
      <div className="feature-icon">
        <Icon size={20} />
      </div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

const styles = `
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Inter, Arial, sans-serif;
    background: #edf3ef;
    color: #16201a;
  }
  .dark body, .app.dark {
    background: #0f1512;
    color: #ecf5ee;
  }
  .page-shell {
    max-width: 1280px;
    margin: 0 auto;
    padding: 24px;
  }
  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    padding: 8px 0 20px;
  }
  .brand-wrap {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .brand-wrap h1 {
    margin: 0;
    font-size: 28px;
  }
  .brand-wrap p {
    margin: 6px 0 0;
    color: #5b6b60;
    font-size: 15px;
  }
  .dark .brand-wrap p { color: #a7b9ad; }
  .logo-box {
    width: 50px;
    height: 50px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    font-weight: 800;
    font-size: 28px;
    color: white;
    background: linear-gradient(135deg, #179447, #13743a);
    box-shadow: 0 16px 30px rgba(24, 112, 54, 0.18);
  }
  .top-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .mode-toggle {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
  }
  .toggle {
    width: 54px;
    height: 32px;
    border: none;
    border-radius: 999px;
    background: #d4ded6;
    position: relative;
    cursor: pointer;
  }
  .toggle.on { background: #19964a; }
  .toggle-knob {
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background: white;
    position: absolute;
    left: 4px;
    top: 4px;
    transition: transform 0.2s ease;
  }
  .toggle.on .toggle-knob { transform: translateX(22px); }
  .primary-btn, .secondary-btn, .white-btn, .nav-btn, .tab-btn {
    border: none;
    border-radius: 18px;
    cursor: pointer;
    transition: 0.2s ease;
    font-weight: 700;
  }
  .primary-btn {
    background: #1f974a;
    color: white;
    padding: 14px 22px;
  }
  .primary-btn:hover { background: #17773a; }
  .secondary-btn {
    background: white;
    color: #1a231d;
    border: 1px solid #d8e2da;
    padding: 14px 18px;
  }
  .dark .secondary-btn {
    background: #18201b;
    color: #eef6ef;
    border-color: #2c3a31;
  }
  .white-btn {
    background: white;
    color: #1f974a;
    padding: 14px 20px;
  }
  .white-btn:hover { background: #eff8f1; }
  .nav-tabs {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 26px;
  }
  .nav-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: white;
    color: #1b261f;
    border: 1px solid #dce6de;
  }
  .nav-btn.active {
    background: #1f974a;
    color: white;
    border-color: #1f974a;
  }
  .dark .nav-btn {
    background: #18201b;
    color: #edf5ef;
    border-color: #2b3930;
  }
  .dark .nav-btn.active {
    background: #1f974a;
    border-color: #1f974a;
  }
  .card {
    background: rgba(255,255,255,0.95);
    border-radius: 30px;
    box-shadow: 0 16px 40px rgba(31, 52, 37, 0.08);
  }
  .dark .card {
    background: #161d18;
    box-shadow: none;
    border: 1px solid #26342b;
  }
  .hero-grid, .content-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 20px;
  }
  .hero-card, .section-card, .signin-card {
    padding: 34px;
  }
  .hero-card h2 {
    font-size: 64px;
    line-height: 0.95;
    margin: 14px 0 10px;
    letter-spacing: -1.8px;
    max-width: 700px;
  }
  .hero-card p {
    font-size: 18px;
    line-height: 1.5;
    color: #536358;
    max-width: 760px;
  }
  .dark .hero-card p, .dark .section-head p, .dark .article-card p, .dark .feature-card p, .dark .ticket-card p {
    color: #aab9af;
  }
  .badge {
    display: inline-block;
    background: #d7eadc;
    color: #206f40;
    padding: 10px 16px;
    border-radius: 999px;
    font-weight: 700;
  }
  .badge.small { padding: 8px 14px; font-size: 14px; }
  .hero-actions {
    display: flex;
    gap: 12px;
    margin: 26px 0 22px;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  .stat-card {
    background: #f4f8f5;
    border-radius: 22px;
    padding: 24px;
  }
  .dark .stat-card { background: #1d2620; }
  .stat-card h4 {
    margin: 0 0 8px;
    font-size: 28px;
    color: #1f974a;
  }
  .stat-card p { margin: 0; color: #5c6a60; }
  .dark .stat-card p { color: #a7b7ab; }
  .green-card {
    background: linear-gradient(180deg, #209748, #187c3d);
    color: white;
  }
  .green-card p { color: #ecfff1; }
  .form-stack {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-top: 18px;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-weight: 700;
  }
  input, select, textarea {
    width: 100%;
    border-radius: 18px;
    border: 1px solid #d5dfd8;
    padding: 15px 16px;
    font-size: 16px;
    background: white;
    color: #18211b;
  }
  .dark input, .dark select, .dark textarea {
    background: #111713;
    color: #eff7f0;
    border-color: #304036;
  }
  .green-card input {
    background: rgba(255,255,255,0.15);
    border-color: rgba(255,255,255,0.2);
    color: white;
  }
  .green-card input::placeholder { color: #dff4e6; }
  textarea {
    min-height: 130px;
    resize: vertical;
  }
  .signin-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    color: #ecfff1;
  }
  .linkish { text-decoration: underline; cursor: pointer; }
  .section-head h3, .signin-card h3 {
    margin: 0;
    font-size: 22px;
  }
  .section-head p, .signin-card p {
    margin: 8px 0 0;
    color: #57675d;
    font-size: 16px;
  }
  .search-row {
    display: grid;
    grid-template-columns: 1.2fr 220px;
    gap: 14px;
    margin: 22px 0 18px;
  }
  .search-box {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #d5dfd8;
    background: white;
    border-radius: 18px;
    padding: 0 14px;
  }
  .dark .search-box { background: #111713; border-color: #304036; }
  .search-box input {
    border: none;
    padding-left: 0;
    background: transparent;
  }
  .articles-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
  .article-card {
    background: #f4f8f5;
    border-radius: 24px;
    padding: 20px;
  }
  .dark .article-card { background: #1c251f; }
  .article-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .icon-chip {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 14px;
    background: #dff1e4;
    color: #1f974a;
  }
  .article-card h4, .feature-card h4, .ticket-card h4 {
    margin: 8px 0;
    font-size: 18px;
  }
  .article-card p {
    line-height: 1.55;
    margin-bottom: 12px;
  }
  .article-card ol {
    margin: 0;
    padding-left: 20px;
    line-height: 1.75;
  }
  .tab-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 20px 0;
  }
  .max-tabs { max-width: 420px; }
  .tab-btn {
    padding: 14px 16px;
    background: #e3e9e4;
    color: #1c241e;
  }
  .tab-btn.active {
    background: #1f974a;
    color: white;
  }
  .dark .tab-btn { background: #222d25; color: #edf6ef; }
  .two-col, .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .form-grid .span-all { grid-column: 1 / -1; }
  .full { width: 100%; }
  .success-box {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #dff1e4;
    color: #175e34;
    border-radius: 18px;
    padding: 14px 16px;
    font-weight: 700;
  }
  .light-success {
    background: rgba(255,255,255,0.16);
    color: white;
  }
  .single-section { margin-top: 8px; }
  .wide-card { padding: 34px; }
  .form-footer { margin-top: 18px; }
  .spaced-top { margin-top: 18px; }
  .tickets-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 22px;
  }
  .ticket-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 20px 22px;
    border-radius: 22px;
    background: #f4f8f5;
  }
  .dark .ticket-card { background: #1c251f; }
  .ticket-id-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ticket-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .status-pill, .urgency-pill {
    padding: 9px 12px;
    border-radius: 999px;
    font-weight: 700;
    font-size: 14px;
  }
  .status-pill.open { background: #fff3d9; color: #8f5b00; }
  .status-pill.in-progress { background: #ddeafd; color: #245cb3; }
  .status-pill.resolved { background: #dff1e4; color: #1d6e3c; }
  .urgency-pill { background: #eef2ee; color: #385043; }
  .dark .urgency-pill { background: #2b362f; color: #d8e6dc; }
  .feature-strip {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  .feature-card { padding: 24px; }
  .feature-icon {
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    background: #dff1e4;
    color: #1f974a;
    margin-bottom: 14px;
  }
  @media (max-width: 1100px) {
    .hero-grid, .content-grid, .feature-strip, .stats-grid, .articles-grid, .form-grid, .two-col {
      grid-template-columns: 1fr;
    }
    .hero-card h2 { font-size: 48px; }
  }
  @media (max-width: 760px) {
    .page-shell { padding: 16px; }
    .topbar {
      flex-direction: column;
      align-items: flex-start;
    }
    .top-actions {
      width: 100%;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .search-row {
      grid-template-columns: 1fr;
    }
    .hero-card h2 { font-size: 38px; }
    .hero-card, .section-card, .signin-card, .wide-card { padding: 22px; }
    .ticket-card {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default App;
