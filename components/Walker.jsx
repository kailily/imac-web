// Walker (Boundary Walker) Section
function Walker() {
  const ranks = [
    { cn: "见习", en: "Initiate", percent: "35%", desc: "通过基础选拔与三个月理论训练，尚未独立执行任务", color: "var(--steel-blue-light)" },
    { cn: "溯界者", en: "Walker", percent: "40%", desc: "完成十四个月全科目训练，可独立执行常规级至危险级任务", color: "var(--level-ordinary)" },
    { cn: "资深溯界者", en: "Senior Walker", percent: "18%", desc: "至少三年实战经验，可执行厄运级任务，拥有团队指挥权", color: "var(--level-hazardous)" },
    { cn: "首席溯界者", en: "Chief Walker", percent: "5%", desc: "各组织最高战力，可领导深渊级行动，全球不足六十人", color: "var(--level-doomed)" },
    { cn: "界标", en: "Landmark", percent: "<30人", desc: "传说级称号，以个人存在即为现实锚点。全球不足三十人", color: "var(--level-abyssal)" },
  ];

  const sources = [
    { cn: "军队系统", en: "Military", percent: "45%", desc: "特种部队、工程兵、医疗兵等军事背景人员，纪律与执行力强" },
    { cn: "警务系统", en: "Law Enforcement", percent: "30%", desc: "刑侦、特警、谈判专家，擅长现场勘查与人际博弈" },
    { cn: "社会招募与幸存者计划", en: "Civilian & Survivor", percent: "25%", desc: "学者、工程师、医生及异常幸存者，提供多元视角与第一手经验" },
  ];

  const equipment = [
    { name: "个人记录器", en: "Personal Recorder", desc: "实时记录所见所闻，是事后重建现场的核心依据", icon: "M4 4h16v16H4z M4 9h16 M9 4v16" },
    { name: "异常通讯器", en: "Anomaly Comm", desc: "在部分异常中维持有限通讯，内置加密与应急信标", icon: "M12 18h.01 M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
    { name: "身份信标", en: "ID Beacon", desc: "持续发射身份编码，防止在叙事类异常中被规则改写身份", icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z M12 22V12 M2 7l10 5 10-5" },
    { name: "个人锚定物", en: "Anchor Object", desc: "溯界者最珍视的私人物品，在同化危机中作为最后的自我锚点", icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" },
  ];

  const assimilationStages = [
    { stage: "第一阶段", name: "规则适应", desc: "进入者开始无意识地遵守异常规则，将其视为理所当然", level: "低" },
    { stage: "第二阶段", name: "身份模糊", desc: "对自身身份的认知出现动摇，开始接受异常分配的角色设定", level: "中" },
    { stage: "第三阶段", name: "规则认同", desc: "从心理上认同异常的叙事逻辑，主动维护规则，终止行动资格", level: "高" },
    { stage: "第四阶段", name: "异常融合", desc: "完全融入异常，成为异常的一部分。理论上不可逆转", level: "致命" },
  ];

  return (
    <>
      <style>{`
        .walker-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }
        .walker-quote-block {
          max-width: 900px;
          margin: 0 auto 60px;
          text-align: center;
          padding: 40px 20px;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          position: relative;
        }
        .walker-quote-block::before, .walker-quote-block::after {
          content: "";
          position: absolute;
          width: 40px;
          height: 40px;
          border: 1px solid var(--accent-red);
        }
        .walker-quote-block::before {
          top: -1px; left: -1px;
          border-right: none;
          border-bottom: none;
        }
        .walker-quote-block::after {
          bottom: -1px; right: -1px;
          border-left: none;
          border-top: none;
        }
        .walker-quote-mark {
          font-family: var(--font-serif);
          font-size: 60px;
          color: var(--accent-red);
          line-height: 1;
          margin-bottom: 10px;
          opacity: 0.5;
        }
        .walker-quote-text {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.6;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }
        .walker-quote-author {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }
        .walker-main {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 60px;
          margin-bottom: 80px;
        }
        .walker-desc-title {
          font-family: var(--font-serif);
          font-size: 22px;
          color: var(--text-primary);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .walker-desc-title::before {
          content: "";
          width: 4px;
          height: 20px;
          background-color: var(--accent-red-bright);
        }
        .walker-desc-text {
          font-size: 14px;
          line-height: 1.9;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }
        .walker-desc-text strong {
          color: var(--text-primary);
          font-weight: 500;
        }
        /* Rank timeline */
        .rank-timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .rank-item {
          display: grid;
          grid-template-columns: 80px 1fr 100px;
          align-items: center;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 1px solid var(--border-color);
          position: relative;
        }
        .rank-item:first-child {
          border-top: 1px solid var(--border-color);
        }
        .rank-badge {
          width: 60px;
          height: 60px;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          position: relative;
          background-color: var(--bg-card);
        }
        .rank-badge-num {
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 700;
          line-height: 1;
        }
        .rank-badge-label {
          font-family: var(--font-mono);
          font-size: 8px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 2px;
        }
        .rank-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .rank-name {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .rank-name-en {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          font-weight: 400;
        }
        .rank-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .rank-percent {
          text-align: right;
        }
        .rank-percent-num {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          line-height: 1;
        }
        .rank-percent-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          margin-top: 4px;
        }
        /* Sources */
        .sources-section {
          margin-bottom: 80px;
        }
        .sources-title {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sources-title::before {
          content: "§";
          color: var(--accent-red-bright);
          font-size: 16px;
        }
        .sources-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .source-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 28px 24px;
          position: relative;
        }
        .source-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--steel-blue);
        }
        .source-percent {
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 8px;
        }
        .source-name {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .source-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 14px;
        }
        .source-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        /* Equipment */
        .equipment-section {
          margin-bottom: 80px;
        }
        .equipment-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .equipment-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 24px 20px;
          text-align: center;
          transition: border-color 0.3s ease;
        }
        .equipment-card:hover {
          border-color: var(--steel-blue);
        }
        .equipment-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 16px;
          color: var(--steel-blue-light);
        }
        .equipment-icon svg {
          width: 100%;
          height: 100%;
        }
        .equipment-name {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .equipment-en {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .equipment-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        /* Assimilation warning */
        .assimilation-section {
          position: relative;
        }
        .assimilation-box {
          border: 1px solid var(--accent-red-bright);
          padding: 36px 32px;
          background-color: rgba(139, 26, 26, 0.05);
          position: relative;
          animation: assimilation-pulse 3s ease-in-out infinite;
        }
        @keyframes assimilation-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(196, 40, 40, 0); }
          50% { box-shadow: 0 0 20px 2px rgba(196, 40, 40, 0.1); }
        }
        .assimilation-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(196, 40, 40, 0.3);
        }
        .assimilation-title {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .assimilation-warning-icon {
          width: 28px;
          height: 28px;
          color: var(--accent-red-bright);
        }
        .assimilation-title-text {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--accent-red-bright);
        }
        .assimilation-subtext {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }
        .assimilation-stages {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .assim-stage {
          background-color: rgba(10, 10, 12, 0.5);
          border-left: 3px solid;
          padding: 20px 16px;
          position: relative;
        }
        .assim-stage-1 { border-color: var(--level-ordinary); }
        .assim-stage-2 { border-color: var(--level-hazardous); }
        .assim-stage-3 { border-color: var(--level-doomed); }
        .assim-stage-4 { border-color: var(--level-abyssal); }
        .assim-stage-num {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .assim-stage-name {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .assim-stage-level {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          margin-bottom: 10px;
        }
        .stage-1 .assim-stage-level { color: var(--level-ordinary); }
        .stage-2 .assim-stage-level { color: var(--level-hazardous); }
        .stage-3 .assim-stage-level { color: var(--level-doomed); }
        .stage-4 .assim-stage-level { color: var(--level-abyssal); }
        .assim-stage-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .assim-footer-note {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px dashed rgba(196, 40, 40, 0.3);
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .assim-footer-note::before {
          content: "!";
          width: 18px;
          height: 18px;
          border: 1.5px solid var(--accent-red-bright);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
        }
        @media (max-width: 1024px) {
          .walker-main { grid-template-columns: 1fr; gap: 40px; }
          .equipment-grid { grid-template-columns: repeat(2, 1fr); }
          .assimilation-stages { grid-template-columns: repeat(2, 1fr); }
          .sources-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .walker-quote-text { font-size: 18px; }
          .rank-item { grid-template-columns: 60px 1fr; }
          .rank-percent { grid-column: 2; text-align: left; }
          .equipment-grid { grid-template-columns: 1fr 1fr; }
          .assimilation-stages { grid-template-columns: 1fr; }
          .assimilation-box { padding: 24px 20px; }
        }
      `}</style>
      <section id="walker" className="section walker-section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-group">
              <span className="section-number mono">04 /</span>
              <h2 className="section-title-cn">溯界者</h2>
              <span className="section-title-en">BOUNDARY WALKER</span>
            </div>
            <span className="classification confidential">CONFIDENTIAL / 机密级</span>
          </div>

          <div className="walker-quote-block">
            <div className="walker-quote-mark">"</div>
            <p className="walker-quote-text">
              我们不是在跨越边界，我们是在追溯边界——<br/>
              把深渊来路，走成归途。
            </p>
            <div className="walker-quote-author">— 艾伦·维斯特 · 首席溯界者 · 界标</div>
          </div>

          <div className="walker-main">
            <div>
              <h3 className="walker-desc-title">职业概述</h3>
              <p className="walker-desc-text">
                <strong>溯界者</strong>是进入异常、调查异常、解决异常的专业人员。
                他们没有超能力，不是天选之子，只是经过严格筛选和系统化训练的普通人。
              </p>
              <p className="walker-desc-text">
                溯界者的核心武器不是体能或装备，而是<strong>观察力、逻辑推演能力和稳定的心智</strong>。
                在规则封闭的空间内，人性是他们最后的锚点——也是对抗同化的唯一防线。
              </p>
              <p className="walker-desc-text">
                每一位溯界者都清楚：自己可能在下一次任务中再也走不出来。
                但正是因为他们愿意走进黑暗，边界之外的世界才能保持正常。
              </p>
              <p className="walker-desc-text" style={{ color: "var(--accent-red-bright)", fontStyle: "italic" }}>
                "记住你是谁。记住你从哪里来。"
                <br/>
                <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>—— 溯界者入队誓言最后一句</span>
              </p>
            </div>

            <div>
              <div className="sources-title">职级体系 · RANK SYSTEM</div>
              <div className="rank-timeline">
                {ranks.map((rank, i) => (
                  <div key={rank.en} className="rank-item">
                    <div className="rank-badge" style={{ borderColor: rank.color, color: rank.color }}>
                      <span className="rank-badge-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="rank-badge-label" style={{ color: rank.color }}>RANK</span>
                    </div>
                    <div className="rank-info">
                      <div className="rank-name">
                        {rank.cn}
                        <span className="rank-name-en">{rank.en}</span>
                      </div>
                      <div className="rank-desc">{rank.desc}</div>
                    </div>
                    <div className="rank-percent">
                      <div className="rank-percent-num" style={{ color: rank.color }}>{rank.percent}</div>
                      <div className="rank-percent-label">占比</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sources-section">
            <div className="sources-title">人员来源通道 · RECRUITMENT CHANNELS</div>
            <div className="sources-grid">
              {sources.map((s) => (
                <div key={s.en} className="source-card">
                  <div className="source-percent">{s.percent}</div>
                  <div className="source-name">{s.cn}</div>
                  <div className="source-en">{s.en}</div>
                  <p className="source-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="equipment-section">
            <div className="sources-title">标准装备 · STANDARD EQUIPMENT</div>
            <div className="equipment-grid">
              {equipment.map((eq) => (
                <div key={eq.en} className="equipment-card">
                  <div className="equipment-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d={eq.icon}/>
                    </svg>
                  </div>
                  <div className="equipment-name">{eq.name}</div>
                  <div className="equipment-en">{eq.en}</div>
                  <p className="equipment-desc">{eq.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="assimilation-section">
            <div className="assimilation-box">
              <div className="assimilation-header">
                <div className="assimilation-title">
                  <svg className="assimilation-warning-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <div>
                    <div className="assimilation-title-text">同化警告</div>
                    <div className="assimilation-subtext">ASSIMILATION WARNING · 四阶段模型</div>
                  </div>
                </div>
                <span className="classification eyes-only">CRITICAL</span>
              </div>

              <div className="assimilation-stages">
                {assimilationStages.map((s, i) => (
                  <div key={s.name} className={`assim-stage assim-stage-${i + 1} stage-${i + 1}`}>
                    <div className="assim-stage-num mono">{s.stage}</div>
                    <div className="assim-stage-name">{s.name}</div>
                    <div className="assim-stage-level">风险：{s.level}</div>
                    <p className="assim-stage-desc">{s.desc}</p>
                  </div>
                ))}
              </div>

              <div className="assim-footer-note">
                IMAC 第17号通令：同化进入第三阶段者，立即终止一切行动资格，强制进入观察与治疗程序。
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.Walker = Walker;
