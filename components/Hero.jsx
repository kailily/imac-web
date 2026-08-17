// Hero Section
function Hero() {
  const stats = [
    { value: "20,000+", label: "已记录异常事件", en: "RECORDED ANOMALIES" },
    { value: "1,247", label: "在册溯界者", en: "REGISTERED WALKERS" },
    { value: "8", label: "认证成员组织", en: "MEMBER ORGANIZATIONS" },
  ];

  return (
    <>
      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 65px;
          overflow: hidden;
          background-color: var(--bg-deep);
        }
        .hero::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background:
            radial-gradient(ellipse at center top, rgba(196, 40, 40, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(74, 88, 104, 0.06) 0%, transparent 40%);
          pointer-events: none;
        }
        .hero-grid {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          z-index: 1;
          width: 100%;
        }
        .hero-top-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
        }
        .hero-doc-id {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }
        .hero-main {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 60px;
        }
        .hero-subtitle {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--accent-red-bright);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .hero-subtitle::before {
          content: "";
          width: 40px;
          height: 1px;
          background-color: var(--accent-red-bright);
        }
        .hero-title-cn {
          font-family: var(--font-serif);
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: 0.08em;
          line-height: 1.15;
        }
        .hero-title-en {
          font-family: var(--font-mono);
          font-size: clamp(14px, 1.5vw, 18px);
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .hero-tagline {
          margin-top: 12px;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }
        .hero-tagline-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          color: var(--text-secondary);
        }
        .hero-tagline-item .dot {
          width: 6px;
          height: 6px;
          background-color: var(--accent-red-bright);
          transform: rotate(45deg);
        }
        .hero-desc {
          max-width: 640px;
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-top: 8px;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background-color: var(--border-color);
          border: 1px solid var(--border-color);
        }
        .hero-stat-card {
          background-color: var(--bg-secondary);
          padding: 32px 28px;
          position: relative;
        }
        .hero-stat-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 8px; height: 8px;
          border-top: 2px solid var(--accent-red);
          border-left: 2px solid var(--accent-red);
        }
        .stat-value {
          font-family: var(--font-serif);
          font-size: 42px;
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 12px;
        }
        .stat-label-cn {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        .stat-label-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .hero-bottom {
          position: absolute;
          bottom: 40px;
          left: 40px;
          right: 40px;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .hero-scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
        }
        .hero-scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--text-muted), transparent);
          animation: scroll-fade 2s ease-in-out infinite;
        }
        @keyframes scroll-fade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .hero-classification {
          position: absolute;
          bottom: 30px;
          right: 40px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        .hero-class-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        @media (max-width: 1024px) {
          .hero-stats { grid-template-columns: 1fr; }
          .hero-tagline { gap: 20px; }
        }
        @media (max-width: 768px) {
          .hero { min-height: auto; padding: 100px 0 60px; }
          .hero-stats { margin-bottom: 60px; }
          .stat-value { font-size: 32px; }
          .hero-bottom { position: static; padding: 0 16px; margin-top: 40px; }
          .hero-classification { position: static; align-items: flex-start; }
        }
      `}</style>
      <section id="home" className="hero">
        <div className="hero-grid"></div>
        <div className="container hero-inner">
          <div className="hero-top-meta">
            <span className="hero-doc-id mono">DOC.IMAC.PUB.001 · VERSION 39.2</span>
            <span className="classification public">PUBLIC ACCESS</span>
          </div>

          <div className="hero-main">
            <div className="hero-subtitle">国际异常管理联盟</div>
            <h1 className="hero-title-cn">国际异常管理联盟</h1>
            <div className="hero-title-en">International Anomaly Management Coalition</div>
          </div>

          <div className="hero-tagline">
            <div className="hero-tagline-item">
              <span className="dot"></span>
              <span>信息无条件共享</span>
            </div>
            <div className="hero-tagline-item">
              <span className="dot"></span>
              <span>标准无条件统一</span>
            </div>
            <div className="hero-tagline-item">
              <span className="dot"></span>
              <span>响应无条件协作</span>
            </div>
          </div>

          <p className="hero-desc">
            自安珀历元年"大裂隙"事件以来，异常在全球范围内持续出现。各国独立应对体系标准不一、信息壁垒严重，导致大量本可避免的伤亡。
            IMAC 作为全球统一的异常管理协调机构，致力于建立标准化的异常评级、记录、应对与善后体系，
            协调八大认证成员组织的跨国响应行动，终结混乱，守护边界。
          </p>
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-stats">
            {stats.map((stat, i) => (
              <div key={i} className="hero-stat-card">
                <div className="stat-value mono">{stat.value}</div>
                <div className="stat-label-cn">{stat.label}</div>
                <div className="stat-label-en">{stat.en}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-scroll-indicator">
            <span>SCROLL</span>
            <div className="hero-scroll-line"></div>
          </div>
        </div>

        <div className="hero-classification">
          <div className="hero-class-label">Classification Level</div>
          <span className="classification public">PUBLIC ACCESS / 公开访问级</span>
        </div>
      </section>
    </>
  );
}

window.Hero = Hero;

// Threat Level Section (moved here since it's referenced in App)
function ThreatLevel() {
  const levels = [
    {
      key: "ordinary",
      cn: "常规级",
      en: "ORDINARY",
      desc: "规则单一、逻辑清晰。进入门槛低，平民生还率较高，一般不会造成大规模伤亡。",
      tags: ["规则清晰", "低死亡率", "可预测"],
    },
    {
      key: "hazardous",
      cn: "危险级",
      en: "HAZARDOUS",
      desc: "多层陷阱与误导并存，空间轻度扭曲，具有排他性，进入者面临显著生存压力。",
      tags: ["空间扭曲", "误导陷阱", "需专业人员"],
    },
    {
      key: "doomed",
      cn: "厄运级",
      en: "DOOMED",
      desc: "规则具有叙事性，强制嵌入异常剧本，NPC与同化风险高发，生还率急剧下降。",
      tags: ["叙事规则", "同化风险", "NPC交互"],
    },
    {
      key: "abyssal",
      cn: "深渊级",
      en: "ABYSSAL",
      desc: "规则不可逆，空间具有自我意识与进化能力。绝大部分进入者无人生还。",
      tags: ["自我进化", "极高致死率", "接近无解"],
    },
    {
      key: "unknown",
      cn: "未知级",
      en: "UNKNOWN",
      desc: "规则完全不可知。存在本身对现实构成结构性威胁，仅作为特殊评级使用。",
      tags: ["不可测量", "现实威胁", "最高戒备"],
    },
  ];

  return (
    <>
      <style>{`
        .threat-section {
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }
        .threat-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }
        .threat-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .threat-card:hover {
          transform: translateY(-4px);
        }
        .threat-card:hover .level-bar {
          filter: brightness(1.3);
        }
        .threat-card.ordinary:hover {
          border-color: var(--level-ordinary);
          box-shadow: 0 8px 30px rgba(74, 124, 89, 0.15);
        }
        .threat-card.hazardous:hover {
          border-color: var(--level-hazardous);
          box-shadow: 0 8px 30px rgba(196, 154, 44, 0.15);
        }
        .threat-card.doomed:hover {
          border-color: var(--level-doomed);
          box-shadow: 0 8px 30px rgba(212, 104, 40, 0.15);
        }
        .threat-card.abyssal:hover {
          border-color: var(--level-abyssal);
          box-shadow: 0 8px 30px rgba(196, 40, 40, 0.2);
        }
        .threat-card.unknown:hover {
          border-color: var(--level-unknown);
          box-shadow: 0 8px 30px rgba(122, 58, 176, 0.2);
        }
        .threat-card-body {
          padding: 24px 20px;
        }
        .threat-card-header {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 16px;
        }
        .threat-rank {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }
        .threat-name-cn {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .threat-name-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-left: auto;
        }
        .threat-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 20px;
          min-height: 88px;
        }
        .threat-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .threat-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          border: 1px solid var(--border-light);
          padding: 3px 8px;
          letter-spacing: 0.05em;
        }
        @media (max-width: 1200px) {
          .threat-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .threat-grid { grid-template-columns: 1fr; }
          .threat-desc { min-height: auto; }
        }
      `}</style>
      <section id="threat-level" className="section threat-section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-group">
              <span className="section-number mono">03 /</span>
              <h2 className="section-title-cn">异常威胁等级</h2>
              <span className="section-title-en">ATL · Anomaly Threat Level</span>
            </div>
            <span className="classification restricted">RESTRICTED / 限制级</span>
          </div>

          <div className="threat-grid">
            {levels.map((level, i) => (
              <div key={level.key} className={`threat-card ${level.key}`}>
                <div className={`level-bar level-${level.key}`}></div>
                <div className="threat-card-body">
                  <div className="threat-rank">LEVEL {String(i + 1).padStart(2, "0")}</div>
                  <div className="threat-card-header">
                    <span className={`threat-name-cn level-text-${level.key}`}>{level.cn}</span>
                    <span className="threat-name-en">{level.en}</span>
                  </div>
                  <p className="threat-desc">{level.desc}</p>
                  <div className="threat-tags">
                    {level.tags.map((tag) => (
                      <span key={tag} className="threat-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

window.ThreatLevel = ThreatLevel;
