import { useMemo, useState } from 'react'

const articles = [
  {
    id: 1,
    title: 'How to reset your password',
    category: 'Account',
    body:
      'Use the password reset option from the sign in panel. Verify your employee ID, confirm your email, and create a new secure password.',
    steps: [
      'Open the employee sign in panel',
      'Select Forgot Password',
      'Enter your employee ID and company email',
      'Complete the verification step',
      'Create a new secure password',
    ],
  },
  {
    id: 2,
    title: 'Printer troubleshooting basics',
    category: 'Hardware',
    body:
      'Check power, paper, toner, cable connection, and printer queue before opening an incident.',
    steps: [
      'Confirm the printer is on',
      'Check paper and toner',
      'Verify network or USB connection',
      'Clear the print queue',
      'Restart the printer and try again',
    ],
  },
  {
    id: 3,
    title: 'Fix slow WiFi or dropped connection',
    category: 'Network',
    body:
      'Reconnect to the approved network, restart the device, and test another tool to see if the issue is local or broader.',
    steps: [
      'Disconnect and reconnect to WiFi',
      'Restart your device',
      'Forget and rejoin the network if needed',
      'Test another website or internal tool',
      'Submit an incident if multiple users are affected',
    ],
  },
  {
    id: 4,
    title: 'Laptop startup and performance tips',
    category: 'Device',
    body:
      'Restart the laptop, close unused apps, and install updates. Many common issues can be resolved with these quick checks.',
    steps: [
      'Restart the laptop',
      'Close unused browser tabs and apps',
      'Check storage space',
      'Install pending updates',
      'Report the issue if performance stays slow',
    ],
  },
]

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [ticketType, setTicketType] = useState('Incident')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    employeeId: '',
    email: '',
    issueType: 'Password or sign in',
    urgency: 'Medium',
    description: '',
  })

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.body.toLowerCase().includes(search.toLowerCase()) ||
        article.category.toLowerCase().includes(search.toLowerCase())

      const matchesCategory = category === 'All' || article.category === category
      return matchesSearch && matchesCategory
    })
  }, [search, category])

  function updateForm(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <header className="topbar">
        <div>
          <div className="brand-row">
            <div className="brand-icon">P</div>
            <div>
              <h1>Publix IT Self Service Portal</h1>
              <p>Knowledge articles, employee access, and incident reporting</p>
            </div>
          </div>
        </div>

        <div className="topbar-actions">
          <label className="toggle-wrap">
            <span>Dark mode</span>
            <button
              type="button"
              className={darkMode ? 'toggle active' : 'toggle'}
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle dark mode"
            >
              <span className="toggle-knob" />
            </button>
          </label>
          <button className="primary-button" type="button">Employee Sign In</button>
        </div>
      </header>

      <main className="page-shell">
        <section className="hero-grid">
          <div className="card hero-card">
            <span className="pill">Internal Support Portal</span>
            <h2>Solve common IT problems faster with self service support</h2>
            <p>
              Search helpful knowledge articles, review step by step fixes, sign in as an employee,
              and create an incident or request when you still need help.
            </p>
            <div className="hero-buttons">
              <button className="primary-button" type="button">Browse Articles</button>
              <button className="secondary-button" type="button">Create Report</button>
            </div>
            <div className="stats-grid">
              <div className="stat-box">
                <strong>24/7</strong>
                <span>Portal access</span>
              </div>
              <div className="stat-box">
                <strong>4</strong>
                <span>Knowledge categories</span>
              </div>
              <div className="stat-box">
                <strong>1</strong>
                <span>Unified support entry point</span>
              </div>
            </div>
          </div>

          <div className="card signin-card">
            <h3>Employee Sign In</h3>
            <p>Example employee sign in area</p>
            <label>
              Employee ID
              <input type="text" placeholder="Enter employee ID" />
            </label>
            <label>
              Password
              <input type="password" placeholder="Enter password" />
            </label>
            <div className="signin-row">
              <span>Secure employee access</span>
              <a href="#">Forgot password?</a>
            </div>
            <button className="light-button" type="button">Sign In</button>
          </div>
        </section>

        <section className="content-grid">
          <div className="card knowledge-card">
            <div className="section-heading">
              <h3>Knowledge Articles</h3>
              <p>Search articles to find fast solutions before creating a support ticket</p>
            </div>

            <div className="filter-row">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search password, printer, WiFi, laptop"
              />

              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option>All</option>
                <option>Account</option>
                <option>Hardware</option>
                <option>Network</option>
                <option>Device</option>
              </select>
            </div>

            <div className="article-grid">
              {filteredArticles.map((article) => (
                <article className="article-card" key={article.id}>
                  <div className="article-top">
                    <span className="article-badge">{article.category}</span>
                    <h4>{article.title}</h4>
                  </div>
                  <p>{article.body}</p>
                  <ol>
                    {article.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </article>
              ))}
              {filteredArticles.length === 0 && (
                <div className="empty-state">No articles matched your search.</div>
              )}
            </div>
          </div>

          <div className="card report-card">
            <div className="section-heading">
              <h3>Report an Issue</h3>
              <p>Create an incident or service request if self service did not solve the problem</p>
            </div>

            <div className="tab-row">
              <button
                type="button"
                className={ticketType === 'Incident' ? 'tab active' : 'tab'}
                onClick={() => setTicketType('Incident')}
              >
                Incident
              </button>
              <button
                type="button"
                className={ticketType === 'Request' ? 'tab active' : 'tab'}
                onClick={() => setTicketType('Request')}
              >
                Request
              </button>
            </div>

            <form className="report-form" onSubmit={handleSubmit}>
              <label>
                Employee ID
                <input
                  type="text"
                  value={form.employeeId}
                  onChange={(event) => updateForm('employeeId', event.target.value)}
                  placeholder="Enter employee ID"
                />
              </label>

              <label>
                Company Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateForm('email', event.target.value)}
                  placeholder="name@publix.com"
                />
              </label>

              <div className="two-column">
                <label>
                  Issue Type
                  <select
                    value={form.issueType}
                    onChange={(event) => updateForm('issueType', event.target.value)}
                  >
                    <option>Password or sign in</option>
                    <option>Device issue</option>
                    <option>Network issue</option>
                    <option>Printer issue</option>
                  </select>
                </label>

                <label>
                  Urgency
                  <select
                    value={form.urgency}
                    onChange={(event) => updateForm('urgency', event.target.value)}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </label>
              </div>

              <label>
                Description
                <textarea
                  value={form.description}
                  onChange={(event) => updateForm('description', event.target.value)}
                  placeholder="Describe the issue, what you already tried, and where it happened"
                />
              </label>

              <button className="primary-button wide-button" type="submit">
                Submit {ticketType}
              </button>
            </form>

            {submitted && (
              <div className="success-box">
                Your {ticketType.toLowerCase()} was submitted successfully. This is a sample success message for your project demo.
              </div>
            )}
          </div>
        </section>

        <section className="feature-grid">
          <div className="card feature-card">
            <h3>Self service first</h3>
            <p>Help associates solve common problems before calling the help desk.</p>
          </div>
          <div className="card feature-card">
            <h3>Secure employee access</h3>
            <p>Give employees a dedicated sign in area and a cleaner support experience.</p>
          </div>
          <div className="card feature-card">
            <h3>Knowledge driven reporting</h3>
            <p>Connect article guidance with ticket creation when issues need extra help.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
