const capabilities = [
  {
    title: "Geospatial applications",
    body: "Map infrastructure, assets, incidents and field activity using location-aware data.",
    tags: ["GIS", "PostGIS", "Spatial data"],
  },
  {
    title: "Workflow automation",
    body: "Move work from intake through review, assignment, escalation and completion.",
    tags: ["Jobs", "Scheduling", "Flows"],
  },
  {
    title: "Identity and access",
    body: "Control user, team, contractor and service access across complex applications.",
    tags: ["SSO", "OAuth", "ACL"],
  },
  {
    title: "Data and integrations",
    body: "Connect applications, databases and external systems through reusable APIs.",
    tags: ["REST", "GraphQL", "SDKs"],
  },
  {
    title: "Notifications",
    body: "Deliver email, push and real-time updates to the people responsible for action.",
    tags: ["Email", "Push", "WebSockets"],
  },
  {
    title: "Storage and administration",
    body: "Manage files, images, configuration, data and browser-based administration.",
    tags: ["Storage", "Documents", "Admin UI"],
  },
];

const useCases = [
  ["Road defect management", "Locate, prioritise and track road repairs from detection through completion."],
  ["Government asset management", "Create a trusted view of assets, condition, location and work history."],
  ["Field inspections", "Capture structured evidence, location and status from mobile teams."],
  ["Permit processing", "Digitise applications, assessment, approvals and applicant updates."],
  ["Incident management", "Coordinate intake, triage, ownership, communication and resolution."],
  ["Citizen service portals", "Give residents secure access to requests, updates and documents."],
];

const workflow = [
  "A camera, sensor, inspector or citizen identifies a possible defect.",
  "The issue is submitted with coordinates, imagery and severity.",
  "The defect appears on an interactive map.",
  "Council staff verify and prioritise it.",
  "Repair work is assigned to the correct team.",
  "Completion evidence is uploaded and dashboards update.",
];

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <p className="section-lead">{body}</p> : null}
    </div>
  );
}

function MapPreview() {
  return (
    <div className="map-preview" aria-label="Conceptual road defect operations dashboard">
      <div className="map-canvas" aria-hidden="true">
        <span className="road road-one" />
        <span className="road road-two" />
        <span className="road road-three" />
        <span className="pin pin-one" />
        <span className="pin pin-two" />
        <span className="pin pin-three" />
        <span className="pin pin-four" />
      </div>
      <aside className="map-panel">
        <p className="card-label">Selected defect</p>
        <h3>Road surface damage</h3>
        <dl>
          <div><dt>Priority</dt><dd><span className="status">High</span></dd></div>
          <div><dt>Status</dt><dd>Awaiting review</dd></div>
          <div><dt>Location</dt><dd>George Street</dd></div>
        </dl>
        <button className="button button-primary" type="button">Assign repair</button>
      </aside>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Application platform for government and enterprise</p>
            <h1>Build complex digital services on a stronger foundation.</h1>
            <p className="hero-lead">
              Vasat brings together security, data, workflows, geospatial tools,
              integrations, storage and administration—so organisations can deliver
              tailored applications faster.
            </p>
            <div className="button-row">
              <a className="button button-primary" href="#capabilities">Explore capabilities</a>
              <a className="button button-secondary" href="#solutions">View use cases</a>
            </div>
          </div>
          <MapPreview />
        </div>
      </section>

      <section className="section section-muted" id="platform">
        <div className="container">
          <SectionHeading
            eyebrow="The platform"
            title="One platform. Many possible solutions."
            body="Vasat provides reusable services that can be combined around the needs of each application, organisation and user group."
          />
          <div className="three-column-grid">
            <article className="feature-panel">
              <span className="feature-number">01</span>
              <h3>Modular by design</h3>
              <p>Use only the capabilities required for the solution being delivered.</p>
            </article>
            <article className="feature-panel">
              <span className="feature-number">02</span>
              <h3>Built to integrate</h3>
              <p>Connect existing systems, external services, data sources and interfaces.</p>
            </article>
            <article className="feature-panel">
              <span className="feature-number">03</span>
              <h3>Flexible to deploy</h3>
              <p>Support cloud and on-premises delivery patterns based on project needs.</p>
            </article>
          </div>

          <div className="architecture-flow">
            <div className="architecture-card">
              <span>1</span>
              <h3>User experiences</h3>
              <p>Web applications, mobile experiences and administration.</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="architecture-card">
              <span>2</span>
              <h3>Vasat services</h3>
              <p>Identity, GIS, workflows, storage, notifications and APIs.</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="architecture-card">
              <span>3</span>
              <h3>Connected systems</h3>
              <p>Databases, cloud services, external APIs and operational tools.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="capabilities">
        <div className="container">
          <SectionHeading
            eyebrow="Capabilities"
            title="Building blocks for secure, data-driven applications."
            body="The website explains the client outcome first, then gives technical teams access to implementation details."
          />
          <div className="three-column-grid">
            {capabilities.map((item) => (
              <article className="content-card" key={item.title}>
                <div className="icon-tile" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="tag-row">
                  {item.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="solutions">
        <div className="container">
          <SectionHeading
            eyebrow="Featured use case"
            title="Identify, locate and resolve road defects faster."
            body="Vasat can power the secure application, geospatial data, workflow, storage and administration layer surrounding a road-defect detection solution."
          />
          <div className="road-layout">
            <ol className="workflow-list">
              {workflow.map((item, index) => (
                <li key={item}>
                  <span>{index + 1}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
            <MapPreview />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="More use cases"
            title="See what organisations can build with Vasat."
            body="Start with an operational problem, then explore the platform capabilities that support the solution."
          />
          <div className="three-column-grid">
            {useCases.map(([title, body]) => (
              <article className="content-card use-case-card" key={title}>
                <p className="card-label">Use case</p>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted" id="industries">
        <div className="container">
          <SectionHeading
            eyebrow="Industries"
            title="Designed for complex operational environments."
          />
          <div className="industry-row">
            {["Local government", "State government", "Utilities", "Infrastructure", "Enterprise operations"].map((industry) => (
              <span className="industry-pill" key={industry}>{industry}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="resources">
        <div className="container">
          <SectionHeading
            eyebrow="Resources"
            title="Choose the level of detail you need."
            body="Decision-makers, solution teams and developers should each have a clear path through the website."
          />
          <div className="three-column-grid">
            <article className="content-card resource-card">
              <p className="card-label">For decision-makers</p>
              <h3>Platform overview</h3>
              <p>Understand the value, capabilities and types of solutions Vasat can support.</p>
              <a className="button button-secondary" href="#platform">Explore platform</a>
            </article>
            <article className="content-card resource-card">
              <p className="card-label">For solution teams</p>
              <h3>Architecture and security</h3>
              <p>Review deployment, integrations, identity, data and platform architecture.</p>
              <a className="button button-secondary" href="#security">Review architecture</a>
            </article>
            <article className="content-card resource-card">
              <p className="card-label">For developers</p>
              <h3>Developer documentation</h3>
              <p>Access installation, models, sites, APIs, SDKs and implementation guides.</p>
              <a className="button button-primary" href="https://vasat.io/docs/" target="_blank" rel="noreferrer">
                Open developer docs
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="section security-section" id="security">
        <div className="container">
          <SectionHeading
            eyebrow="Security and deployment"
            title="Designed for controlled access and flexible delivery."
            body="Security and deployment controls should be presented clearly without making unsupported compliance claims."
          />
          <div className="three-column-grid">
            <article className="security-card">
              <h3>Identity and access</h3>
              <p>Authentication, single sign-on, roles, ACLs and service access.</p>
            </article>
            <article className="security-card">
              <h3>Audit and controls</h3>
              <p>Security events, access restrictions and operational accountability.</p>
            </article>
            <article className="security-card">
              <h3>Deployment choice</h3>
              <p>Cloud and on-premises patterns aligned to project requirements.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section demo-section" id="demo">
        <div className="container demo-grid">
          <div>
            <p className="eyebrow">Talk to the Vasat team</p>
            <h2>Explore how Vasat could support your project.</h2>
            <p className="section-lead">
              Tell the team about the service, workflow or operational challenge you are trying to improve.
            </p>
            <div className="expectation-card">
              <h3>What to expect</h3>
              <p>A focused discussion about users, workflows, data, integrations, deployment, security and desired outcomes.</p>
            </div>
          </div>

          <form className="demo-form">
            <div className="form-grid">
              <label>First name<input name="firstName" autoComplete="given-name" required /></label>
              <label>Last name<input name="lastName" autoComplete="family-name" required /></label>
              <label>Work email<input type="email" name="email" autoComplete="email" required /></label>
              <label>Organisation<input name="organisation" autoComplete="organization" /></label>
              <label>
                Industry
                <select name="industry" defaultValue="">
                  <option value="" disabled>Select an industry</option>
                  <option>Local government</option>
                  <option>State government</option>
                  <option>Utilities</option>
                  <option>Infrastructure</option>
                  <option>Enterprise</option>
                </select>
              </label>
              <label>
                Project stage
                <select name="stage" defaultValue="">
                  <option value="" disabled>Select a stage</option>
                  <option>Exploring options</option>
                  <option>Planning</option>
                  <option>Procurement</option>
                  <option>Active delivery</option>
                </select>
              </label>
              <label className="full-width">
                What are you trying to build or improve?
                <textarea name="challenge" rows="6" required />
              </label>
            </div>
            <button className="button button-primary form-submit" type="submit">
              Request a conversation
            </button>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="brand footer-brand">
            <img className="brand-logo" src="https://vasat.io/images/home/logo-vasat.png" alt="VASAT" />
          </div>
          <p>A modular application platform for government and enterprise solutions.</p>
          <div className="footer-links">
            <a href="#platform">Platform</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#solutions">Solutions</a>
            <a href="https://vasat.io/docs/" target="_blank" rel="noreferrer">Developer docs</a>
          </div>
        </div>
      </footer>
    </>
  );
}
