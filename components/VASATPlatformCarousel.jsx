'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const slides = [
  {
    id: 'intro',
    number: '01',
    type: 'intro',
    eyebrow: 'Application platform for government and enterprise',
    title: 'Build complex digital services on a stronger foundation.',
    description:
      'Vasat brings together security, data, workflows, geospatial tools, integrations, storage and administration—so organisations can deliver tailored applications faster.',
  },
  {
    id: 'security',
    number: '02',
    type: 'security',
    eyebrow: 'Security built into the platform',
    title: 'Secure access without rebuilding authentication.',
    description:
      'VASAT provides the authentication, access-control and monitoring foundations needed to protect government and enterprise applications.',
    groups: [
      {
        label: 'OAuth2 Support',
        detail: 'Authorization Code, Client Credentials, Password, Implicit and Refresh Token flows.',
      },
      {
        label: 'Single Sign-On',
        detail: 'Third-party authentication through Google, Facebook, Twitter, Amazon Cognito and Azure Active Directory.',
      },
      {
        label: 'Additional Protection',
        detail: 'Powerful ACLs, IP restrictions, RSA-signed packets and security-event logging.',
      },
    ],
  },
  {
    id: 'llm-ready',
    number: '03',
    type: 'llm',
    eyebrow: 'LLM-ready solutions',
    title: 'Use your data with the AI provider you choose.',
    description:
      'VASAT provides the application, data and integration foundation needed to build secure AI-powered solutions without locking the organisation into a single model provider.',
    groups: [
      {
        label: 'Provider Flexibility',
        detail: 'Integrate with services such as Amazon Bedrock and Microsoft Foundry, including Azure OpenAI.',
      },
      {
        label: 'Your Data, Your Context',
        detail: 'Connect approved business data, documents and application services to create more relevant, organisation-specific AI experiences.',
      },
      {
        label: 'Infrastructure Ready',
        detail: "Use VASAT's cloud-ready, modular architecture, APIs, access controls and data integrations as the foundation for LLM-powered applications.",
      },
    ],
  },
  {
    id: 'jobs-automation',
    number: '04',
    type: 'workflow',
    eyebrow: 'Background jobs & automation',
    title: 'Turn complex processing into dependable workflows.',
    description:
      'VASAT provides the foundation for running long-running and recurring operations outside the main application flow—helping organisations automate data processing, system maintenance and operational tasks.',
    groups: [
      {
        label: 'Processing Jobs',
        detail: 'Structure long-running, data-heavy or batch operations as defined jobs that can run independently from the user-facing application.',
      },
      {
        label: 'Execution Agents',
        detail: 'Use dedicated VASAT agents to perform processing work independently across application services.',
      },
      {
        label: 'Scheduled Tasks',
        detail: 'Run custom batch jobs automatically using configurable, cron-style schedules, or trigger them when the application requires them.',
      },
    ],
  },
  {
    id: 'inspection',
    number: '05',
    eyebrow: 'Operational understanding',
    title: 'Connect mapped locations with useful information.',
    description:
      'GMS allows users to inspect structures, selected areas and geospatial features within their real-world surroundings, supporting clearer planning and analysis.',
    image: '/images/vasat-carousel/building-analysis.png',
    alt: 'GMS showing a building inspection view with selected structures, measurements and spatial context.',
    productLabel: 'GMS — Powered by VASAT',
  },
  {
    id: 'datasets',
    number: '06',
    eyebrow: 'Data-driven applications',
    title: 'Turn large datasets into accessible spatial information.',
    description:
      'Display boundaries, select individual features and inspect associated attributes directly within a browser-based workspace.',
    image: '/images/vasat-carousel/vector-dataset.png',
    alt: 'GMS displaying a structured vector dataset with selectable features, boundaries and associated attribute information.',
    productLabel: 'GMS — Powered by VASAT',
  },
];

function ComparisonSlider({ beforeImage, afterImage, beforeLabel, afterLabel, alt }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const clamp = (v) => Math.max(0, Math.min(100, v));

  const getPercent = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    return clamp(((clientX - rect.left) / rect.width) * 100);
  }, []);

  useEffect(() => {
    const onMove = (e) => { if (dragging.current) setPosition(getPercent(e.clientX)); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [getPercent]);

  // Non-passive touch listener so we can prevent scroll while dragging
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onTouchMove = (e) => {
      if (!dragging.current) return;
      setPosition(getPercent(e.touches[0].clientX));
      e.preventDefault();
      e.stopPropagation();
    };
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => el.removeEventListener('touchmove', onTouchMove);
  }, [getPercent]);

  return (
    <div
      ref={containerRef}
      className="cs-slider"
      onTouchStart={(e) => { dragging.current = true; e.stopPropagation(); }}
      onTouchEnd={(e) => { dragging.current = false; e.stopPropagation(); }}
    >
      <img src={beforeImage} alt={alt} className="cs-img" draggable={false} />
      <img
        src={afterImage}
        alt=""
        aria-hidden="true"
        className="cs-img cs-img-after"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        draggable={false}
      />
      <span className="cs-tag cs-tag-before">{beforeLabel}</span>
      <span
        className="cs-tag cs-tag-after"
        style={{ opacity: position > 28 ? 1 : 0 }}
      >
        {afterLabel}
      </span>
      <div
        className="cs-handle"
        style={{ left: `${position}%` }}
        role="slider"
        aria-label="Drag to compare standard and classified point cloud views"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onMouseDown={(e) => { dragging.current = true; e.preventDefault(); }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPosition((p) => clamp(p - 5));
          if (e.key === 'ArrowRight') setPosition((p) => clamp(p + 5));
          if (e.key === 'Home') setPosition(0);
          if (e.key === 'End') setPosition(100);
        }}
      />
    </div>
  );
}

function SecurityVisual() {
  const acc = '#6ab04c';
  const cx = 320, cy = 180, r = 50;
  const lx = 95, rx = 545;
  const pillW = 138, pillH = 30;
  const pillRight = lx + pillW / 2;  // 164
  const pillLeft  = rx - pillW / 2;  // 476
  const font = 'Inter, ui-sans-serif, system-ui, sans-serif';

  const providers = [
    { id: 'p1', label: 'OAuth 2.0',      y: 70  },
    { id: 'p2', label: 'Google SSO',     y: 125 },
    { id: 'p3', label: 'Amazon Cognito', y: 180 },
    { id: 'p4', label: 'Azure AD',       y: 235 },
    { id: 'p5', label: 'Facebook',       y: 290 },
  ];

  const services = [
    { id: 's1', label: 'Web Application', y: 70  },
    { id: 's2', label: 'API Gateway',     y: 125 },
    { id: 's3', label: 'Admin Portal',    y: 180 },
    { id: 's4', label: 'ACL / IP Filter', y: 235 },
    { id: 's5', label: 'Security Events', y: 290 },
  ];

  // Circle-surface intersection points for lines from (164,y) → circle(320,180,r=50)
  // and circle → (476,y). Pre-computed: unit vector × r offset from centre.
  const leftPts  = [[279,151],[273,163],[270,180],[273,197],[279,209]];
  const rightPts = [[361,151],[367,163],[370,180],[367,197],[361,209]];

  return (
    <svg
      viewBox="0 0 640 360"
      width="100%"
      style={{ display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="VASAT security architecture: identity providers on the left connect to VASAT core, which protects application services on the right"
    >
      <defs>
        <radialGradient id="secGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={acc} stopOpacity="0.14"/>
          <stop offset="100%" stopColor={acc} stopOpacity="0"/>
        </radialGradient>
        <pattern id="secDots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="11" cy="11" r="0.7" fill="rgba(255,255,255,0.04)"/>
        </pattern>
      </defs>

      {/* Background */}
      <rect width="640" height="360" fill="#0d1318"/>
      <rect width="640" height="360" fill="url(#secDots)"/>

      {/* Ambient glow around centre */}
      <ellipse cx={cx} cy={cy} rx="130" ry="110" fill="url(#secGlow)"/>

      {/* Provider → VASAT lines */}
      {providers.map((p, i) => (
        <line key={p.id}
          x1={pillRight} y1={p.y}
          x2={leftPts[i][0]} y2={leftPts[i][1]}
          stroke="rgba(106,176,76,0.28)" strokeWidth="1.5" strokeDasharray="5 4"
        />
      ))}

      {/* VASAT → service lines */}
      {services.map((s, i) => (
        <line key={s.id}
          x1={rightPts[i][0]} y1={rightPts[i][1]}
          x2={pillLeft} y2={s.y}
          stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="5 4"
        />
      ))}

      {/* Endpoint dots where lines meet the circle */}
      {leftPts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={acc} fillOpacity="0.55"/>
      ))}
      {rightPts.map(([x, y], i) => (
        <circle key={`r${i}`} cx={x} cy={y} r="2" fill="rgba(255,255,255,0.2)"/>
      ))}

      {/* Provider pills */}
      {providers.map((p) => (
        <g key={p.id}>
          <rect x={lx - pillW/2} y={p.y - pillH/2} width={pillW} height={pillH} rx={7}
            fill="#131b22" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <text x={lx} y={p.y + 4} textAnchor="middle"
            fontFamily={font} fontSize="10" fontWeight="600" fill="#c8d4db">{p.label}</text>
        </g>
      ))}

      {/* Service pills */}
      {services.map((s) => (
        <g key={s.id}>
          <rect x={rx - pillW/2} y={s.y - pillH/2} width={pillW} height={pillH} rx={7}
            fill="#131b22" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <text x={rx} y={s.y + 4} textAnchor="middle"
            fontFamily={font} fontSize="10" fontWeight="600" fill="#c8d4db">{s.label}</text>
        </g>
      ))}

      {/* Outer halo rings */}
      <circle cx={cx} cy={cy} r={r + 16} fill="none" stroke="rgba(106,176,76,0.06)" strokeWidth="14"/>
      <circle cx={cx} cy={cy} r={r + 3}  fill="none" stroke="rgba(106,176,76,0.18)" strokeWidth="1"/>

      {/* Main VASAT node */}
      <circle cx={cx} cy={cy} r={r} fill="#0f1520" stroke={acc} strokeWidth="1.5"/>

      {/* Shield icon */}
      <path
        d={`M${cx} ${cy-28} l14 6v12c0 8-6 14-14 17-8-3-14-9-14-17v-12z`}
        fill="none" stroke={acc} strokeWidth="1.5"
        strokeLinejoin="round" strokeLinecap="round"
      />

      {/* VASAT label */}
      <text x={cx} y={cy + 24} textAnchor="middle"
        fontFamily={font} fontSize="10" fontWeight="800" fill="white" letterSpacing="3">
        VASAT
      </text>

      {/* Column section labels */}
      <text x={lx} y="38" textAnchor="middle"
        fontFamily={font} fontSize="7.5" fontWeight="700" fill="#6e8694" letterSpacing="1.5">
        IDENTITY PROVIDERS
      </text>
      <text x={rx} y="38" textAnchor="middle"
        fontFamily={font} fontSize="7.5" fontWeight="700" fill="#6e8694" letterSpacing="1.5">
        PROTECTED SERVICES
      </text>
    </svg>
  );
}

function LLMVisual() {
  const acc = '#6ab04c';
  const font = 'Inter, ui-sans-serif, system-ui, sans-serif';
  const muted = '#6e8694';

  // Layout
  const lx = 93, rx = 548;
  const dpw = 148, dph = 32, ppw = 158, pph = 32;
  const bx = 212, by = 102, bw = 216, bh = 156;
  const bcx = bx + bw / 2; // 320
  const bRight = bx + bw;  // 428

  // Shared y-positions for data sources and providers
  const ys = [118, 178, 238];

  const sources   = ['Documents & Files', 'Application Data', 'Business Context'];
  const providers = ['Amazon Bedrock', 'Microsoft Foundry', 'Azure OpenAI'];

  // Internal tag row
  const tags = ['APIs', 'Security', 'Data'];
  const tagW = 52, tagH = 19, tagGap = 8;
  const tagStartX = 234; // bcx - (3*tagW + 2*tagGap)/2 = 320 - 86

  return (
    <svg viewBox="0 0 640 360" width="100%" style={{ display: 'block' }}
      xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Architecture diagram: your data connects to the VASAT platform, which routes to your preferred LLM provider such as Amazon Bedrock or Microsoft Foundry">
      <defs>
        <radialGradient id="llmGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={acc} stopOpacity="0.1"/>
          <stop offset="100%" stopColor={acc} stopOpacity="0"/>
        </radialGradient>
        <pattern id="llmDots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="11" cy="11" r="0.7" fill="rgba(255,255,255,0.04)"/>
        </pattern>
      </defs>

      {/* Background */}
      <rect width="640" height="360" fill="#0d1318"/>
      <rect width="640" height="360" fill="url(#llmDots)"/>

      {/* VASAT ambient glow */}
      <rect x={bx - 24} y={by - 24} width={bw + 48} height={bh + 48} rx="24"
        fill="url(#llmGlow)"/>

      {/* Left data → VASAT lines */}
      {ys.map((y) => (
        <line key={`dl${y}`}
          x1={lx + dpw / 2} y1={y} x2={bx} y2={y}
          stroke="rgba(106,176,76,0.3)" strokeWidth="1.5" strokeDasharray="5 4"
        />
      ))}

      {/* VASAT → provider lines */}
      {ys.map((y) => (
        <line key={`pl${y}`}
          x1={bRight} y1={y} x2={rx - ppw / 2} y2={y}
          stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="5 4"
        />
      ))}

      {/* VASAT box */}
      <rect x={bx} y={by} width={bw} height={bh} rx="13"
        fill="#0f1520" stroke={acc} strokeWidth="1.5"/>

      {/* VASAT label */}
      <text x={bcx} y="152" textAnchor="middle"
        fontFamily={font} fontSize="16" fontWeight="800" fill={acc} letterSpacing="2">
        VASAT
      </text>

      {/* Box separator */}
      <line x1={bx + 25} y1="165" x2={bRight - 25} y2="165"
        stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>

      {/* Box subtitle */}
      <text x={bcx} y="182" textAnchor="middle" fontFamily={font} fontSize="8.5" fill={muted}>
        {'Application & Integration'}
      </text>
      <text x={bcx} y="196" textAnchor="middle" fontFamily={font} fontSize="8.5" fill={muted}>
        Platform
      </text>

      {/* Internal feature tags */}
      {tags.map((tag, i) => {
        const tx = tagStartX + i * (tagW + tagGap);
        return (
          <g key={tag}>
            <rect x={tx} y="219" width={tagW} height={tagH} rx="4"
              fill="rgba(106,176,76,0.08)" stroke="rgba(106,176,76,0.22)" strokeWidth="1"/>
            <text x={tx + tagW / 2} y="232" textAnchor="middle"
              fontFamily={font} fontSize="8" fontWeight="600" fill="rgba(106,176,76,0.85)">
              {tag}
            </text>
          </g>
        );
      })}

      {/* Connection dots on box edges */}
      {ys.map((y) => (
        <circle key={`lc${y}`} cx={bx} cy={y} r="2.5" fill={acc} fillOpacity="0.55"/>
      ))}
      {ys.map((y) => (
        <circle key={`rc${y}`} cx={bRight} cy={y} r="2" fill="rgba(255,255,255,0.2)"/>
      ))}

      {/* Data source pills */}
      {sources.map((label, i) => (
        <g key={label}>
          <rect x={lx - dpw / 2} y={ys[i] - dph / 2} width={dpw} height={dph} rx="7"
            fill="#131b22" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <text x={lx} y={ys[i] + 4} textAnchor="middle"
            fontFamily={font} fontSize="10" fontWeight="600" fill="#c8d4db">{label}</text>
        </g>
      ))}

      {/* Provider pills */}
      {providers.map((label, i) => (
        <g key={label}>
          <rect x={rx - ppw / 2} y={ys[i] - pph / 2} width={ppw} height={pph} rx="7"
            fill="#131b22" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <text x={rx} y={ys[i] + 4} textAnchor="middle"
            fontFamily={font} fontSize="10" fontWeight="600" fill="#c8d4db">{label}</text>
        </g>
      ))}

      {/* Section labels */}
      <text x={lx} y="35" textAnchor="middle"
        fontFamily={font} fontSize="7.5" fontWeight="700" fill={muted} letterSpacing="1.5">
        YOUR DATA
      </text>
      <text x={rx} y="35" textAnchor="middle"
        fontFamily={font} fontSize="7.5" fontWeight="700" fill={muted} letterSpacing="1.5">
        LLM PROVIDERS
      </text>

      {/* Provider note */}
      <text x={rx} y="293" textAnchor="middle"
        fontFamily={font} fontSize="7.5" fill={muted} letterSpacing="0.5">
        example providers shown
      </text>
    </svg>
  );
}

export default function VASATPlatformCarousel() {
  const [current, setCurrent] = useState(0);
  const paused = useRef(false);
  const sectionRef = useRef(null);
  const touchStartX = useRef(null);

  const goNext = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const goPrev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);
  const goTo = useCallback((i) => setCurrent(i), []);

  // Autoplay — restarts the 7-second window after every slide change
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = setInterval(() => {
      if (!paused.current && !document.hidden) {
        setCurrent((c) => (c + 1) % slides.length);
      }
    }, 7000);
    return () => clearInterval(id);
  }, [current]);

  // Keyboard navigation scoped to when focus is inside the section
  useEffect(() => {
    const onKey = (e) => {
      if (!sectionRef.current?.contains(document.activeElement)) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const slide = slides[current];

  return (
    <section
      className="csl-section"
      ref={sectionRef}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onFocus={() => { paused.current = true; }}
      onBlur={() => { paused.current = false; }}
      aria-roledescription="carousel"
      aria-label="VASAT platform demonstration"
    >
      <div className="container">

        <div
          className={`csl-card${slide.type === 'intro' ? ' csl-card--intro' : ''}`}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(delta) > 48) delta > 0 ? goNext() : goPrev();
            touchStartX.current = null;
          }}
        >
          {/* Text */}
          <div className={`csl-content${slide.type === 'intro' ? ' csl-content--intro' : ''}`} key={`content-${current}`}>
            <span className="csl-num">{slide.number}</span>
            <p className="csl-eyebrow">{slide.eyebrow}</p>
            {slide.type === 'intro' ? (
              <h2 className="csl-intro-title">{slide.title}</h2>
            ) : (
              <h3 className="csl-title">{slide.title}</h3>
            )}
            <p className="csl-desc">{slide.description}</p>
            {slide.groups && (
              <div className="csl-groups">
                {slide.groups.map((g) => (
                  <div key={g.label} className="csl-group">
                    <p className="csl-group-label">{g.label}</p>
                    <p className="csl-group-detail">{g.detail}</p>
                  </div>
                ))}
              </div>
            )}
            {slide.type === 'intro' && (
              <div className="csl-btn-row">
                <a className="button button-primary" href="#capabilities">Explore capabilities</a>
                <a className="button button-secondary csl-btn-secondary" href="#solutions">View use cases</a>
              </div>
            )}
          </div>

          {/* Media (non-intro slides only) */}
          {slide.type !== 'intro' && (
            <div className="csl-media" key={`media-${current}`}>
              {slide.type === 'security' ? (
                <SecurityVisual />
              ) : slide.type === 'llm' ? (
                <LLMVisual />
              ) : slide.type === 'comparison' ? (
                <ComparisonSlider
                  beforeImage={slide.beforeImage}
                  afterImage={slide.afterImage}
                  beforeLabel={slide.beforeLabel}
                  afterLabel={slide.afterLabel}
                  alt={slide.alt}
                />
              ) : (
                <img src={slide.image} alt={slide.alt} className="csl-img" />
              )}
              {slide.productLabel && <span className="csl-product-label">{slide.productLabel}</span>}
            </div>
          )}
        </div>

        <div className="csl-nav" role="group" aria-label="Carousel controls">
          <button className="csl-btn" onClick={goPrev} aria-label="Previous slide">&#8592;</button>
          <div className="csl-tabs" role="tablist" aria-label="Carousel slides">
            {slides.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === current}
                aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                className={`csl-tab${i === current ? ' csl-tab-active' : ''}`}
                onClick={() => goTo(i)}
              >
                {s.number}
              </button>
            ))}
          </div>
          <button className="csl-btn" onClick={goNext} aria-label="Next slide">&#8594;</button>
        </div>

        <div className="csl-footer">
          <p>
            GMS is one example of what can be delivered through VASAT. The framework can be
            configured around different datasets, workflows and organisational requirements.
          </p>
          <a className="button button-primary" href="#demo">Discuss your use case</a>
        </div>

      </div>
    </section>
  );
}
