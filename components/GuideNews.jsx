// Emergency Guide + News Center
function EmergencyGuide() {
  const rules = [
    { num: "01", title: "保持冷静，不要跑", desc: "恐慌是最危险的。异常不会因为你跑得快就放过你，反而可能因为你的慌乱触发更多规则。" },
    { num: "02", title: "观察你周围的环境", desc: "在做任何事之前，先看清楚你在哪里、有什么东西、有什么不对劲的地方。信息是生存的基础。" },
    { num: "03", title: "不要碰明显异常的东西", desc: "如果某样东西看起来就不属于这里，不要好奇去碰。好奇心在异常里不是美德，是致命的。" },
    { num: '04', title: '规则不需要解释', desc: '规则就是规则。不要问「为什么」，先遵守。理解规则是第二步，活下来才是第一步。' },
    { num: "05", title: "尝试与其他被困者交流", desc: "你不是一个人。分享信息、互相照应，能大幅提高生存几率。但也不要轻信任何人。" },
    { num: "06", title: "不要主动伤害他人", desc: "异常中的死亡不会被现实世界的法律追究，但任何伤害行为都可能违反异常的隐藏规则。" },
    { num: '07', title: '区分「NPC」', desc: '异常中的人形存在不全是和你一样的被困者。学会识别它们，不要跟它们走，不要信它们的话。' },
    { num: "08", title: "保存体力，等待救援", desc: "专业的溯界者正在来的路上。你的任务不是解决异常，而是尽可能久地活下来。" },
    { num: '09', title: '如果看到「出口」，先观察再通过', desc: '真正的出口很少标着「出口」两个字。而标着「出口」的东西，很可能是陷阱。' },
    { num: "10", title: "活下来，然后告诉别人你看到了什么", desc: "你的经历是宝贵的数据。你活下来的意义，不仅是为了你自己，也是为了下一个人。" },
  ];

  return (
    <>
      <style>{`
        .guide-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
        }
        .guide-intro {
          max-width: 700px;
          margin-bottom: 40px;
          font-size: 14px;
          line-height: 1.9;
          color: var(--text-secondary);
        }
        .guide-intro strong {
          color: var(--text-primary);
        }
        .guide-core-label {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          margin-bottom: 8px;
        }
        .guide-core-title {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
        }
        .guide-rules-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .guide-rule-card {
          display: flex;
          gap: 20px;
          padding: 24px 20px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          transition: border-color 0.3s ease;
          position: relative;
        }
        .guide-rule-card:hover {
          border-color: var(--accent-red);
        }
        .guide-rule-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 10px; height: 10px;
          border-top: 2px solid var(--accent-red);
          border-left: 2px solid var(--accent-red);
        }
        .rule-num-display {
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
          flex-shrink: 0;
          width: 50px;
          opacity: 0.6;
        }
        .rule-content {
          flex: 1;
        }
        .rule-title {
          font-family: var(--font-serif);
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .rule-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .guide-hotline {
          margin-top: 50px;
          padding: 40px;
          background-color: rgba(139, 26, 26, 0.08);
          border: 1px solid var(--accent-red);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
          position: relative;
        }
        .guide-hotline::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 20px; height: 20px;
          border-top: 3px solid var(--accent-red-bright);
          border-left: 3px solid var(--accent-red-bright);
        }
        .guide-hotline::after {
          content: "";
          position: absolute;
          bottom: 0; right: 0;
          width: 20px; height: 20px;
          border-bottom: 3px solid var(--accent-red-bright);
          border-right: 3px solid var(--accent-red-bright);
        }
        .hotline-text {
          flex: 1;
        }
        .hotline-label {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          margin-bottom: 8px;
        }
        .hotline-number {
          font-family: var(--font-serif);
          font-size: 48px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
          letter-spacing: 0.05em;
        }
        .hotline-desc {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 10px;
        }
        .hotline-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 16px 24px;
          border: 2px solid var(--accent-red-bright);
        }
        .hotline-badge-text {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          text-align: center;
        }
        @media (max-width: 1024px) {
          .guide-rules-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .hotline-number { font-size: 36px; }
          .guide-hotline { padding: 28px 20px; flex-direction: column; align-items: flex-start; }
        }
      `}</style>
      <section id="guide" className="section guide-section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-group">
              <span className="section-number mono">07 /</span>
              <h2 className="section-title-cn">公民异常应急指南</h2>
              <span className="section-title-en">CITIZEN ANOMALY GUIDE</span>
            </div>
            <span className="classification public">PUBLIC / 公开级</span>
          </div>

          <div className="guide-core-label">IMAC 统 一 标 准 · 核 心 十 条</div>
          <h3 className="guide-core-title">全球通用 · 请务必牢记</h3>
          <p className="guide-intro">
            以下十条为 IMAC 统一发布的公民异常应急基本原则，适用于所有类型的异常事件。
            如果你或你身边的人意外进入异常，请保持冷静，按顺序遵循以下原则。
            <strong>记住：你的首要目标不是破解异常，而是活下来。</strong>
          </p>

          <div className="guide-rules-grid">
            {rules.map((rule) => (
              <div key={rule.num} className="guide-rule-card">
                <div className="rule-num-display">{rule.num}</div>
                <div className="rule-content">
                  <div className="rule-title">{rule.title}</div>
                  <p className="rule-desc">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="guide-hotline">
            <div className="hotline-text">
              <div className="hotline-label">ANOMALY EMERGENCY HOTLINE · 异常紧急热线</div>
              <div className="hotline-number mono">99</div>
              <p className="hotline-desc">全球通用前缀 · 24小时全天候 · 直接拨打 99 并说明所在位置与异常情况</p>
            </div>
            <div className="hotline-badge">
              <span className="hotline-badge-text">24 HOURS</span>
              <span className="hotline-badge-text">GLOBAL</span>
              <span className="hotline-badge-text">FREE</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.EmergencyGuide = EmergencyGuide;

// News Center
function NewsCenter() {
  const noDisclosurePrinciples = [
    "不披露异常的具体位置与进入方式",
    "不披露未公开的规则细节",
    "不披露溯界者的真实姓名与个人信息",
    "不公布涉及深渊级及以上异常的详细内容",
    "不传播可能引起公众恐慌的未经证实信息",
  ];

  return (
    <>
      <style>{`
        .news-section {
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-color);
        }
        .news-body {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }
        .news-main-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 40px;
          position: relative;
        }
        .news-main-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 18px; height: 18px;
          border-top: 2px solid var(--accent-red);
          border-left: 2px solid var(--accent-red);
        }
        .news-main-card::after {
          content: "";
          position: absolute;
          bottom: 0; right: 0;
          width: 18px; height: 18px;
          border-bottom: 2px solid var(--accent-red);
          border-right: 2px solid var(--accent-red);
        }
        .news-category {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .news-category::before {
          content: "▎";
          font-size: 14px;
        }
        .news-title {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.5;
          margin-bottom: 16px;
        }
        .news-meta {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }
        .news-meta-item {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .news-meta-item .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: var(--text-muted);
        }
        .news-body-text {
          font-size: 14px;
          line-height: 1.9;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }
        .news-body-text p {
          margin-bottom: 14px;
        }
        .news-body-text p:last-child {
          margin-bottom: 0;
        }
        .news-quote {
          margin: 24px 0;
          padding: 20px 24px;
          border-left: 3px solid var(--steel-blue);
          background-color: rgba(74, 88, 104, 0.05);
        }
        .news-quote-text {
          font-family: var(--font-serif);
          font-size: 15px;
          color: var(--text-primary);
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 8px;
        }
        .news-quote-author {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .news-safe-note {
          margin-top: 24px;
          padding: 16px 20px;
          background-color: rgba(74, 124, 89, 0.08);
          border: 1px solid rgba(74, 124, 89, 0.3);
          font-size: 13px;
          color: var(--level-ordinary);
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .news-safe-note::before {
          content: "✓";
          font-weight: 700;
          flex-shrink: 0;
        }
        /* Sidebar */
        .news-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .sidebar-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 24px 20px;
          position: relative;
        }
        .sidebar-title {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sidebar-title::before {
          content: "";
          width: 4px;
          height: 16px;
          background-color: var(--accent-red-bright);
        }
        .three-layers {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .layer-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: var(--text-secondary);
        }
        .layer-num {
          width: 24px;
          height: 24px;
          border: 1px solid var(--steel-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--steel-blue-light);
          flex-shrink: 0;
        }
        .no-disclosure-list {
          list-style: none;
          counter-reset: nd-counter;
        }
        .no-disclosure-list li {
          counter-increment: nd-counter;
          position: relative;
          padding-left: 28px;
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 10px;
        }
        .no-disclosure-list li::before {
          content: counter(nd-counter, decimal-leading-zero);
          position: absolute;
          left: 0;
          top: 0;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
        }
        .sidebar-note {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px dashed var(--border-color);
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          line-height: 1.6;
        }
        @media (max-width: 1024px) {
          .news-body { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .news-main-card { padding: 28px 20px; }
          .news-title { font-size: 20px; }
        }
      `}</style>
      <section id="news" className="section news-section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-group">
              <span className="section-number mono">08 /</span>
              <h2 className="section-title-cn">新闻中心</h2>
              <span className="section-title-en">NEWS CENTER</span>
            </div>
            <span className="classification public">PUBLIC / 公开级</span>
          </div>

          <div className="news-body">
            {/* Main News */}
            <article className="news-main-card">
              <div className="news-category">新闻简讯 · PRESS RELEASE</div>
              <h3 className="news-title">
                北境守望成功解决山区常规级异常<br/>
                周边居民已安全撤离
              </h3>
              <div className="news-meta">
                <span className="news-meta-item">安珀历38年 · 冬</span>
                <span className="news-meta-item"><span className="dot"></span>白松城电</span>
                <span className="news-meta-item"><span className="dot"></span>来源：北境守望公关部</span>
              </div>

              <div className="news-body-text">
                <p>
                  据北境守望官方消息，位于白松城以南约120公里处的山区循环路段异常已于昨日被成功解决。
                  该异常于两周前被当地登山者首次报告，表现为一段约3公里长的山间公路陷入空间循环，
                  行驶车辆无法离开。经初步评估为常规级异常。
                </p>
                <p>
                  北境守望派出四名溯界者组成的小队进入异常，经过72小时的连续作业，
                  成功找到并破坏了异常的核心叙事锚点——一座被遗忘的山区护林站。
                  异常空间随后自然消散，所有被困人员安全撤离。
                </p>
                <p>
                  本次行动无溯界者伤亡。被困的七名平民中，六人身体状况良好，
                  一人出现轻度定向障碍，已送往附近医院观察。
                </p>
              </div>

              <div className="news-quote">
                <p className="news-quote-text">
                  "这是一次教科书级别的常规级异常处置。北境守望的溯界者们展现了极高的专业素养。
                  我们再次提醒广大公众：如遇异常，请立即拨打 99 热线，不要尝试自行进入。"
                </p>
                <div className="news-quote-author">— 北境守望发言人 · 艾琳·莫罗娃</div>
              </div>

              <div className="news-safe-note">
                <div>
                  <strong>IMAC 安全提醒：</strong>冬季为山区异常高发期，请市民尽量避免在恶劣天气下前往未开发山区。
                  如发现道路出现异常循环或环境突变，请立即停车并拨打 99 求助。
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="news-sidebar">
              <div className="sidebar-card">
                <h4 className="sidebar-title">报道审定机制</h4>
                <div className="three-layers">
                  <div className="layer-item">
                    <span className="layer-num">01</span>
                    <span>组织内部信息官初审</span>
                  </div>
                  <div className="layer-item">
                    <span className="layer-num">02</span>
                    <span>区域协调办公室复核</span>
                  </div>
                  <div className="layer-item">
                    <span className="layer-num">03</span>
                    <span>IMAC 信息协调部终审</span>
                  </div>
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-tertiary)", lineHeight: "1.7" }}>
                  所有面向公众的异常相关报道，均需经过"三层审定"机制后方可发布。
                  未经审定的信息泄露将被视为违规行为。
                </p>
              </div>

              <div className="sidebar-card">
                <h4 className="sidebar-title">五不披露原则</h4>
                <ol className="no-disclosure-list">
                  {noDisclosurePrinciples.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
                <div className="sidebar-note">
                  PRINCIPLE OF NON-DISCLOSURE<br/>
                  IMAC INFO-REG.ART.07
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

window.NewsCenter = NewsCenter;
