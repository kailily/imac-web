// Anomaly Info Section - What is Anomaly
function AnomalyInfo() {
  const features = [
    {
      num: "01",
      title: "规则的绝对性",
      en: "ABSOLUTE RULES",
      desc: "每一个异常都有一套绝对的行为准则，进入者必须严格遵守。违反规则必触发惩罚，由异常本身执行，不受外力干预——没有豁免，没有例外。",
    },
    {
      num: "02",
      title: "规则的可解读性",
      en: "INTERPRETABLE",
      desc: "规则存在缝隙与例外，措辞往往存在歧义。通过逻辑推演可以找到漏洞与生存空间。",
    },
    {
      num: "03",
      title: "规则的叙事锚点",
      en: "NARRATIVE ANCHOR",
      desc: "每个异常都有一个核心故事。找到锚点才能真正理解异常，破坏锚点才可能解决异常。",
    },
    {
      num: "04",
      title: "规则的自我维护",
      en: "SELF-MAINTENANCE",
      desc: "异常会主动驱逐破坏规则者。高危级别异常中，严重违规将立即触发致命惩罚。",
    },
  ];

  return (
    <>
      <style>{`
        .anomaly-info-section {
          background-color: var(--bg-primary);
        }
        .anomaly-info-body {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: start;
        }
        .anomaly-text-block {
          position: sticky;
          top: 100px;
        }
        .anomaly-text-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .anomaly-text-label::before {
          content: "";
          width: 20px;
          height: 1px;
          background-color: var(--accent-red-bright);
        }
        .anomaly-text-title {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 24px;
          line-height: 1.4;
        }
        .anomaly-text-desc {
          font-size: 14px;
          line-height: 1.9;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }
        .anomaly-text-desc strong {
          color: var(--text-primary);
          font-weight: 500;
        }
        .anomaly-quote {
          margin-top: 32px;
          padding: 20px 24px;
          border-left: 2px solid var(--accent-red-bright);
          background-color: rgba(139, 26, 26, 0.05);
        }
        .anomaly-quote-text {
          font-family: var(--font-serif);
          font-size: 15px;
          color: var(--text-primary);
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 8px;
        }
        .anomaly-quote-author {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .feature-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 28px 24px;
          position: relative;
          transition: border-color 0.3s ease;
        }
        .feature-card:hover {
          border-color: var(--border-light);
        }
        .feature-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 12px; height: 12px;
          border-top: 2px solid var(--steel-blue);
          border-left: 2px solid var(--steel-blue);
        }
        .feature-num {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }
        .feature-title {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }
        .feature-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .feature-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        @media (max-width: 1024px) {
          .anomaly-info-body { grid-template-columns: 1fr; gap: 40px; }
          .anomaly-text-block { position: static; }
        }
        @media (max-width: 640px) {
          .features-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <section id="anomaly-info" className="section anomaly-info-section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-group">
              <span className="section-number mono">02 /</span>
              <h2 className="section-title-cn">关于异常</h2>
              <span className="section-title-en">ABOUT ANOMALY</span>
            </div>
            <span className="classification public">PUBLIC / 公开级</span>
          </div>

          <div className="anomaly-info-body">
            <div className="anomaly-text-block">
              <div className="anomaly-text-label">Definition · 定义</div>
              <h3 className="anomaly-text-title">什么是异常？</h3>
              <p className="anomaly-text-desc">
                <strong>异常（Anomaly）</strong>是真实存在的、可进入的、可测量的三维规则封闭空间。
                它们凭空出现在现实世界中——可能是一座从未有过的建筑、一条走不出去的街道、
                一个不断循环的地铁站台。
              </p>
              <p className="anomaly-text-desc">
                异常内部拥有自洽的物理法则与行为规则。任何进入者都必须遵循这些规则，
                违反者将触发惩罚——从轻微的身体不适，到精神污染，直至立即死亡。
              </p>
              <p className="anomaly-text-desc">
                异常不是超自然现象。它们是可观测、可记录、可研究的客观存在。
                只是我们目前还没有完全理解它们的来源与本质。
              </p>

              <div className="anomaly-quote">
                <p className="anomaly-quote-text">
                  "异常不是敌人。它是一个按照自己规则运行的封闭系统。
                  理解规则，你就能活下来；找到锚点，你就能走出来。"
                </p>
                <div className="anomaly-quote-author">— IMAC 首席研究员 海伦·凯恩博士</div>
              </div>
            </div>

            <div className="features-grid">
              {features.map((f) => (
                <div key={f.num} className="feature-card">
                  <div className="feature-num mono">{f.num}</div>
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-en">{f.en}</div>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.AnomalyInfo = AnomalyInfo;
