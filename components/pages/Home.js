// Home Page - citizen-facing portal redesign
function HomePage() {
  const {
    navigate
  } = useRouter();
  const introFeatures = [{
    icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z M12 22V12 M2 7l10 5 10-5",
    title: "规则是绝对的",
    desc: "进入异常后必须遵守它的规则，违反就会触发惩罚。没有例外，也没有「主角光环」。"
  }, {
    icon: "M9 18l6-6-6-6",
    title: "规则是可以读懂的",
    desc: "异常的规则往往藏在细节里。通过观察和推理，普通人也能找到活下去的办法。"
  }, {
    icon: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z",
    title: "每个异常都有核心",
    desc: "异常的核心被称为「叙事锚点」——找到它、破坏它，异常就会消失。"
  }, {
    icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
    title: "有专业人员处理",
    desc: "全球有8个认证组织、1200余名专业溯界者在专门应对异常。遇到异常交给他们就好。"
  }];
  const levels = [{
    key: "ordinary",
    cn: "常规级",
    en: "ORDINARY",
    publicDesc: "规则简单明确，存活率高。普通人如果冷静应对，通常可以自行撤离。",
    color: "var(--level-ordinary)"
  }, {
    key: "hazardous",
    cn: "危险级",
    en: "HAZARDOUS",
    publicDesc: "规则复杂，容易踩坑。不要停留，尽快离开并拨打99，交给专业人员处理。",
    color: "var(--level-hazardous)"
  }, {
    key: "doomed",
    cn: "厄运级",
    en: "DOOMED",
    publicDesc: "极度危险，平民切勿靠近。这类异常死亡率极高，必须由专业团队处理。",
    color: "var(--level-doomed)"
  }, {
    key: "abyssal",
    cn: "深渊级",
    en: "ABYSSAL",
    publicDesc: "最高危等级。即使是训练有素的专业人员也难以生还。区域严格封锁。",
    color: "var(--level-abyssal)"
  }, {
    key: "unknown",
    cn: "未知级",
    en: "UNKNOWN",
    publicDesc: "信息不足，无法评估。遇到任何疑似未知级异常，立即远离并报告。",
    color: "var(--level-unknown)"
  }];
  const quickGuide = [{
    num: "01",
    icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z M12 22V12",
    title: "保持冷静",
    desc: "越慌越容易出错。先停下来，深呼吸。"
  }, {
    num: "02",
    icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 100-6 3 3 0 000 6z",
    title: "观察环境",
    desc: "注意周围有什么不对劲的地方。"
  }, {
    num: "03",
    icon: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
    title: "不要触碰异常物品",
    desc: "任何看起来反常的东西，都别碰。"
  }, {
    num: "04",
    icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
    title: "拨打99报警",
    desc: "全球通用异常热线，24小时在线。"
  }];
  const newsItems = [{
    title: "北境守望成功解决山区常规级异常",
    date: "安珀历39年·春 · 白松城",
    source: "北境守望公关部",
    desc: "白松城以南山区循环路段异常于昨日被成功解决，7名被困平民安全撤离，本次行动无溯界者伤亡。",
    level: "public"
  }, {
    title: "IMAC发布新版公民应急指南",
    date: "安珀历39年·春 · 洛林自由市",
    source: "IMAC信息协调办公室",
    desc: "国际异常管理联盟今日发布2024版公民应急指南，新增城市地铁异常应对章节，面向全球公众免费发放。",
    level: "public"
  }, {
    title: "边界研究院公布年度异常统计报告",
    date: "安珀历39年·冬 · 洛林自由市",
    source: "边界研究院BRI",
    desc: "BRI发布年度异常现象统计分析，全球异常出现频率与去年基本持平，新发现异常327起，其中常规级占比74%。",
    level: "public"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        /* HERO */
        .hp-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 65px;
          overflow: hidden;
          background: linear-gradient(135deg, #0e0e12 0%, #1a1216 50%, #16141a 100%);
        }
        .hp-hero::before {
          content: "";
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 30% 30%, rgba(196, 40, 40, 0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 70% 70%, rgba(74, 88, 104, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }
        .hp-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 70px 70px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
        }
        .hp-hero-inner { position: relative; z-index: 1; width: 100%; padding: 80px 0; }
        .hp-hero-content {
          /* 不再限制宽度，让下方的快速卡片/统计卡片横向铺满容器 */
          margin: 0 auto;
          text-align: center;
        }
        .hp-hero-badge {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 6px 16px;
          background-color: rgba(196, 40, 40, 0.1);
          border: 1px solid rgba(196, 40, 40, 0.3);
          margin-bottom: 28px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.15em;
          justify-content: center;
        }
        .hp-hero-badge-dot {
          width: 8px; height: 8px;
          background-color: var(--level-ordinary);
          border-radius: 50%;
          box-shadow: 0 0 6px var(--level-ordinary);
        }
        .hp-hero-title {
          font-family: var(--font-serif);
          font-size: clamp(36px, 5.5vw, 64px);
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1.2;
          letter-spacing: 0.04em;
          margin: 0 auto 20px;
          max-width: 820px;
        }
        .hp-hero-title .accent {
          color: var(--accent-red-bright);
        }
        .hp-hero-desc {
          font-size: 17px;
          line-height: 1.8;
          color: var(--text-secondary);
          margin: 0 auto 36px;
          max-width: 580px;
        }
        .hp-hero-actions {
          display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 48px;
          justify-content: center;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px;
          background-color: var(--accent-red-bright);
          border: 2px solid var(--accent-red-bright);
          color: #fff;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          background-color: transparent;
          color: var(--accent-red-bright);
        }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px;
          background-color: transparent;
          border: 2px solid var(--text-secondary);
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          border-color: var(--text-primary);
          color: var(--text-primary);
        }
        .btn-hotline {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px;
          background-color: rgba(196, 40, 40, 0.15);
          border: 2px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-hotline:hover {
          background-color: var(--accent-red-bright);
          color: #fff;
        }
        .hp-quick-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 20px;
          width: 100%;
        }
        .hp-quick-card {
          background-color: rgba(18, 18, 22, 0.7);
          backdrop-filter: blur(4px);
          border: 1px solid var(--border-color);
          padding: 36px 40px;
          min-height: 190px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          text-align: center;
        }
        .hp-quick-card:hover {
          border-color: var(--accent-red-bright);
          transform: translateY(-2px);
        }
        .hp-quick-head {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-bottom: 2px;
        }
        .hp-quick-icon {
          width: 48px; height: 48px;
          color: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .hp-quick-title {
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .hp-quick-desc {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .hp-quick-arrow {
          margin-top: 8px;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-align: center;
        }
        .hp-hero-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-top: 56px;
          width: 100%;
        }
        .hp-stat {
          position: relative;
          background: linear-gradient(135deg, rgba(20, 14, 16, 0.85) 0%, rgba(12, 10, 14, 0.9) 100%);
          border: 1px solid rgba(120, 40, 48, 0.3);
          padding: 24px 28px;
          min-height: 108px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: default;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .hp-stat::before {
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--stat-accent, var(--accent-red-bright));
        }
        .hp-stat::after {
          content: "";
          position: absolute;
          top: 0; right: 0;
          width: 24px; height: 24px;
          border-top: 1px solid var(--stat-accent, var(--accent-red-bright));
          border-right: 1px solid var(--stat-accent, var(--accent-red-bright));
          opacity: 0.6;
        }
        .hp-stat:hover {
          border-color: var(--stat-accent, var(--accent-red-bright));
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--stat-accent, rgba(196, 40, 40, 0.2));
        }
        .hp-stat-icon {
          width: 36px; height: 36px;
          color: var(--stat-accent, var(--accent-red-bright));
          opacity: 0.85;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hp-stat-icon svg { width: 100%; height: 100%; stroke: currentColor; fill: none; stroke-width: 1.5; }
        .hp-stat-info { flex: 1; display: flex; flex-direction: column; gap: 5px; min-width: 0; }
        .hp-stat-num {
          font-family: var(--font-mono);
          font-size: 28px;
          font-weight: 700;
          color: var(--stat-accent, var(--text-primary));
          line-height: 1;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }
        .hp-stat-label {
          font-size: 11px;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          letter-spacing: 0.06em;
          line-height: 1.3;
          /* 允许换行，确保标签信息完整展示 */
          white-space: normal;
          overflow: visible;
          text-overflow: clip;
        }
        .hp-stat-corner {
          position: absolute;
          bottom: 6px; right: 8px;
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-tertiary);
          opacity: 0.5;
          letter-spacing: 0.15em;
        }
        .hp-scroll-indicator {
          position: absolute;
          bottom: 30px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column;
          align-items: center; gap: 8px;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
        }
        .hp-scroll-line {
          width: 1px; height: 36px;
          background: linear-gradient(to bottom, var(--text-muted), transparent);
          animation: scroll-fade 2s ease-in-out infinite;
        }
        @keyframes scroll-fade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        /* Anomaly Intro */
        .hp-section {
          padding: 90px 0;
          position: relative;
        }
        .hp-section-header {
          margin-bottom: 50px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .hp-section-title-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .hp-section-title-group.centered {
          align-items: center;
          text-align: center;
        }
        .hp-section-title-group.centered .hp-section-subtitle {
          max-width: 560px;
          margin: 0 auto;
        }
        .hp-section-label {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .hp-section-title {
          font-family: var(--font-serif);
          font-size: 42px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .hp-section-subtitle {
          font-size: 17px;
          color: var(--text-secondary);
          max-width: 500px;
          line-height: 1.7;
        }

        .intro-body {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 60px;
          align-items: start;
        }
        .intro-text p {
          font-size: 15px;
          line-height: 1.9;
          color: var(--text-secondary);
          margin-bottom: 18px;
        }
        .intro-text p strong {
          color: var(--text-primary);
          font-weight: 600;
        }
        .intro-reassurance {
          margin-top: 24px;
          padding: 20px 24px;
          background-color: rgba(74, 124, 89, 0.08);
          border: 1px solid rgba(74, 124, 89, 0.3);
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .intro-reassurance-icon {
          width: 24px; height: 24px;
          color: var(--level-ordinary);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .intro-reassurance-text {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .intro-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .intro-feature {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: border-color 0.3s ease;
        }
        .intro-feature:hover {
          border-color: var(--steel-blue-light);
        }
        .intro-feature-head {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .intro-feature-icon {
          width: 24px; height: 24px;
          color: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .intro-feature-title {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .intro-feature-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
          padding-left: 36px;
        }

        /* Levels - citizen friendly */
        .levels-citizen {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background-color: var(--border-color);
          border: 1px solid var(--border-color);
        }
        .level-card-c {
          background-color: var(--bg-card);
          padding: 28px 22px;
          border-top: 3px solid;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .level-card-c .level-name {
          font-family: var(--font-serif);
          font-size: 19px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .level-card-c .level-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }
        .level-card-c .level-public-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          flex: 1;
        }
        .levels-bottom-note {
          margin-top: 28px;
          text-align: center;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .levels-bottom-note strong {
          color: var(--accent-red-bright);
          font-weight: 600;
        }

        /* Quick guide */
        .guide-quick-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }
        .guide-quick-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 28px 24px 26px;
          text-align: left;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          overflow: hidden;
        }
        .guide-quick-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent-red-bright);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .guide-quick-card:hover {
          border-color: var(--accent-red-bright);
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(196, 40, 40, 0.15);
        }
        .guide-quick-card:hover::before { opacity: 1; }
        .guide-quick-num {
          font-family: var(--font-serif);
          font-size: 46px;
          font-weight: 700;
          color: var(--accent-red-bright);
          line-height: 1;
          opacity: 0.85;
          letter-spacing: -0.02em;
        }
        .guide-quick-title {
          font-family: var(--font-serif);
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
          margin: 0;
        }
        .guide-quick-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
        }
        .guide-full-btn-wrap {
          text-align: center;
        }

        /* Hotline section */
        .hotline-section {
          padding: 0;
          background: linear-gradient(135deg, rgba(139, 26, 26, 0.1) 0%, rgba(92, 15, 15, 0.05) 100%);
          border-top: 2px solid var(--accent-red-bright);
          border-bottom: 2px solid var(--accent-red-bright);
        }
        .hotline-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .hotline-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 40px;
          padding: 56px 0 32px;
        }
        .hotline-left {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .hotline-icon-lg {
          width: 80px; height: 80px;
          border-radius: 50%;
          background-color: rgba(196, 40, 40, 0.15);
          border: 2px solid var(--accent-red-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .hotline-icon-lg svg { width: 46px; height: 46px; }
        .hotline-text h2 {
          font-family: var(--font-serif);
          font-size: 30px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .hotline-text p {
          font-size: 16px;
          color: var(--text-secondary);
        }
        .hotline-number {
          font-family: var(--font-serif);
          font-size: 88px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
          letter-spacing: 0.05em;
        }
        .hotline-number-label {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          text-align: right;
          margin-top: 8px;
        }
        .hotline-steps {
          display: flex;
          gap: 20px;
          width: 100%;
          padding: 32px 28px 36px;
          border: 1px solid rgba(196, 40, 40, 0.3);
          background: rgba(196, 40, 40, 0.04);
          margin-top: 28px;
        }
        .hotline-step {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .hotline-step-num {
          width: 38px; height: 38px;
          border-radius: 50%;
          background-color: var(--bg-card);
          border: 1.5px solid var(--accent-red-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 15px;
          font-weight: 700;
          color: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .hotline-step-text {
          font-size: 16px;
          color: var(--text-secondary);
        }
        .hotline-step-text strong {
          color: var(--text-primary);
          display: block;
          margin-bottom: 2px;
        }
        .hotline-app-tip {
          margin-top: 16px;
          padding: 12px 20px;
          border: 1px dashed rgba(196, 40, 40, 0.35);
          background: rgba(196, 40, 40, 0.04);
          font-size: 13px;
          color: var(--text-secondary);
          text-align: center;
        }

        /* Orgs map section */
        .orgs-map-section {
          background-color: var(--bg-secondary);
        }
        .orgs-map-wrap {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 24px;
          align-items: start;
        }
        .orgs-list-side {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .orgs-list-item {
          padding: 12px 16px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.2s ease;
        }
        .orgs-list-item:hover, .orgs-list-item.active {
          border-color: var(--accent-red-bright);
          background-color: rgba(139, 26, 26, 0.05);
        }
        .orgs-list-abbr {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--steel-blue);
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--steel-blue-light);
          flex-shrink: 0;
        }
        .orgs-list-item.active .orgs-list-abbr {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }
        .orgs-list-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
        }
        .orgs-list-hq {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }

        /* News */
        .news-citizen-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .news-citizen-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          overflow: hidden;
          transition: border-color 0.3s ease;
          cursor: pointer;
        }
        .news-citizen-card:hover {
          border-color: var(--border-light);
        }
        .news-citizen-bar {
          height: 3px;
          background: linear-gradient(90deg, var(--accent-red-bright), var(--steel-blue));
        }
        .news-citizen-body {
          padding: 24px;
        }
        .news-citizen-source {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 10px;
        }
        .news-citizen-title {
          font-family: var(--font-serif);
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.5;
          margin-bottom: 10px;
        }
        .news-citizen-date {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          margin-bottom: 14px;
        }
        .news-citizen-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* About IMAC */
        .about-imac {
          background-color: var(--bg-secondary);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 30px;
          margin-top: 30px;
        }
        .about-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 32px 28px;
          position: relative;
        }
        .about-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 12px; height: 12px;
          border-top: 2px solid var(--accent-red);
          border-left: 2px solid var(--accent-red);
        }
        .about-card-num {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.15em;
          margin-bottom: 16px;
        }
        .about-card-title {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .about-card-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .about-footer-text {
          margin-top: 40px;
          text-align: center;
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Boundary Walker Intro */
        .walker-intro-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 50px;
          align-items: start;
        }
        .walker-intro-text {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.9;
          margin-bottom: 16px;
        }
        .walker-intro-text strong {
          color: var(--text-primary);
          font-weight: 600;
        }
        .walker-quote {
          position: relative;
          margin-top: 28px;
          padding: 24px 28px;
          background: rgba(139, 26, 26, 0.06);
          border-left: 3px solid var(--accent-red-bright);
        }
        .walker-quote-mark {
          font-family: var(--font-serif);
          font-size: 48px;
          color: var(--accent-red-bright);
          line-height: 0.6;
          opacity: 0.5;
          margin-bottom: 8px;
        }
        .walker-quote-text {
          font-family: var(--font-serif);
          font-size: 17px;
          font-style: italic;
          color: var(--text-primary);
          line-height: 1.7;
          margin: 0;
        }
        .walker-quote-author {
          margin-top: 12px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .walker-intro-stats {
          padding: 28px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .walker-stat-item .walker-stat-num {
          font-family: var(--font-serif);
          font-size: 42px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
          margin-bottom: 6px;
        }
        .walker-stat-item .walker-stat-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .walker-stat-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }
        .walker-stat-mini-num {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .walker-stat-mini-label {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .walker-ranks {
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }
        .walker-ranks-title {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 14px;
        }
        .walker-ranks-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }
        .walker-rank {
          padding: 5px 10px;
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          font-size: 11px;
          color: var(--text-secondary);
        }
        .walker-rank.rank-landmark {
          background: linear-gradient(90deg, rgba(122, 58, 176, 0.2), rgba(122, 58, 176, 0.05));
          border-color: #7a3ab0;
          color: #b88ed9;
          font-weight: 600;
        }
        .walker-rank-arrow {
          color: var(--text-muted);
          font-size: 11px;
        }

        @media (max-width: 1280px) {
          .hp-hero-stats-row { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .hp-quick-cards { gap: 14px; }
        }
        @media (max-width: 1024px) {
          .intro-body { grid-template-columns: 1fr; gap: 40px; }
          .levels-citizen { grid-template-columns: repeat(3, 1fr); }
          .guide-quick-grid { grid-template-columns: repeat(2, 1fr); }
          .hp-quick-cards { grid-template-columns: 1fr; }
          .orgs-map-wrap { grid-template-columns: 1fr; }
          .news-citizen-grid { grid-template-columns: 1fr; }
          .about-grid { grid-template-columns: 1fr; }
          .walker-intro-grid { grid-template-columns: 1fr; gap: 36px; }
          .hotline-number { font-size: 56px; }
        }
        @media (max-width: 768px) {
          .hp-section { padding: 60px 0; }
          .hp-section-title { font-size: 26px; }
          .hp-hero-title { font-size: 36px; }
          .hp-hero-desc { font-size: 15px; }
          .intro-features { grid-template-columns: 1fr; }
          .levels-citizen { grid-template-columns: 1fr 1fr; }
          .guide-quick-grid { grid-template-columns: 1fr 1fr; }
          .hotline-inner { flex-direction: column; align-items: flex-start; text-align: left; padding: 40px 0 24px; }
          .hotline-number { font-size: 48px; }
          .hotline-steps { flex-direction: column; gap: 14px; padding: 20px; }
          .hotline-left { flex-direction: column; align-items: flex-start; }
          .hp-hero-stats-row { grid-template-columns: 1fr 1fr; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    className: "hp-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-hero-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container hp-hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-hero-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-hero-badge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-hero-badge-dot"
  }), /*#__PURE__*/React.createElement("span", null, "IMAC \xB7 \u516C\u6C11\u5B89\u5168\u95E8\u6237")), /*#__PURE__*/React.createElement("h1", {
    className: "hp-hero-title"
  }, "\u4E86\u89E3\u5F02\u5E38\uFF0C", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "\u4FDD\u62A4\u81EA\u5DF1\u548C\u8EAB\u8FB9\u7684\u4EBA")), /*#__PURE__*/React.createElement("p", {
    className: "hp-hero-desc"
  }, "\u56FD\u9645\u5F02\u5E38\u7BA1\u7406\u8054\u76DF\uFF08IMAC\uFF09\u662F\u5168\u7403\u7EDF\u4E00\u7684\u5F02\u5E38\u7BA1\u7406\u534F\u8C03\u673A\u6784\u3002 \u6211\u4EEC\u7684\u4F7F\u547D\u662F\u8BA9\u6BCF\u4E00\u4E2A\u4EBA\u90FD\u80FD\u8BA4\u8BC6\u5F02\u5E38\u3001\u77E5\u9053\u5982\u4F55\u907F\u9669\u3001\u5E76\u5728\u9700\u8981\u65F6\u83B7\u5F97\u4E13\u4E1A\u5E2E\u52A9\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "hp-hero-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => navigate("/guide")
  }, "\u67E5\u770B\u5E94\u6025\u6307\u5357", /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14 M12 5l7 7-7 7"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "btn-hotline",
    onClick: () => {
      const el = document.getElementById("hotline-section");
      if (el) el.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
  })), "\u5F02\u5E38\u70ED\u7EBF 99")), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-cards"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-card",
    onClick: () => {
      const el = document.getElementById("anomaly-intro");
      if (el) el.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-head"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "hp-quick-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12.01",
    y2: "8"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-title"
  }, "\u4EC0\u4E48\u662F\u5F02\u5E38\uFF1F")), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-desc"
  }, "\u8BA4\u8BC6\u5F02\u5E38\u7684\u56DB\u4E2A\u6838\u5FC3\u7279\u5F81\uFF0C\u544A\u522B\u6050\u60E7\u4E0E\u8BEF\u89E3"), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-arrow"
  }, "\u4E86\u89E3\u66F4\u591A \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-card",
    onClick: () => navigate("/guide")
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-head"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "hp-quick-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "9",
    x2: "12",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17",
    x2: "12.01",
    y2: "17"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-title"
  }, "\u9047\u5230\u5F02\u5E38\u600E\u4E48\u529E\uFF1F")), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-desc"
  }, "\u6838\u5FC3\u5341\u6761\u6307\u5357\uFF0C\u5173\u952E\u65F6\u523B\u80FD\u6551\u547D"), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-arrow"
  }, "\u67E5\u770B\u6307\u5357 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-card",
    onClick: () => {
      const el = document.getElementById("hotline-section");
      if (el) el.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-head"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "hp-quick-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-title"
  }, "\u5F02\u5E38\u70ED\u7EBF 99")), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-desc"
  }, "24\u5C0F\u65F6\u5168\u7403\u901A\u7528\uFF0C\u514D\u8D39\uFF0C\u65E0\u9700\u533A\u53F7"), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-arrow"
  }, "\u7ACB\u5373\u62E8\u6253 \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "hp-hero-stats-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat",
    style: {
      '--stat-accent': '#c42828'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2L2 7l10 5 10-5-10-5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 17l10 5 10-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 12l10 5 10-5"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-num"
  }, "20,000+"), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-label"
  }, "\u5DF2\u8BB0\u5F55\u5F02\u5E38")), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-corner"
  }, "ANO-001")), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat",
    style: {
      '--stat-accent': '#6b8cae'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 21v-2a4 4 0 00-3-3.87"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 3.13a4 4 0 010 7.75"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-num"
  }, "8"), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-label"
  }, "\u8BA4\u8BC1\u6210\u5458\u7EC4\u7EC7")), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-corner"
  }, "ORG-008")), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat",
    style: {
      '--stat-accent': '#d4902e'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-num"
  }, "1,247"), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-label"
  }, "\u5728\u518C\u6EAF\u754C\u8005")), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-corner"
  }, "WKR-1247")), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat",
    style: {
      '--stat-accent': '#4a7c59'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0022 16.92z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-num"
  }, "99"), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-label"
  }, "\u5168\u7403\u7EDF\u4E00\u70ED\u7EBF")), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-corner"
  }, "HOTLINE"))))), /*#__PURE__*/React.createElement("div", {
    className: "hp-scroll-indicator"
  }, /*#__PURE__*/React.createElement("span", null, "SCROLL"), /*#__PURE__*/React.createElement("div", {
    className: "hp-scroll-line"
  }))), /*#__PURE__*/React.createElement("section", {
    id: "anomaly-intro",
    className: "hp-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-title-group centered"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-section-label"
  }, "01 / WHAT IS ANOMALY"), /*#__PURE__*/React.createElement("h2", {
    className: "hp-section-title"
  }, "\u8BA4\u8BC6\u5F02\u5E38")), /*#__PURE__*/React.createElement("p", {
    className: "hp-section-subtitle"
  }, "\u5F02\u5E38\u4E0D\u662F\u8D85\u81EA\u7136\u73B0\u8C61\uFF0C\u4E5F\u4E0D\u662F\u90FD\u5E02\u4F20\u8BF4\u3002\u5B83\u4EEC\u662F\u53EF\u6D4B\u91CF\u3001\u53EF\u7814\u7A76\u3001\u53EF\u5E94\u5BF9\u7684\u5BA2\u89C2\u5B58\u5728\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "intro-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "intro-text"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "\u5F02\u5E38"), "\u662F\u7A81\u7136\u51FA\u73B0\u5728\u73B0\u5B9E\u4E16\u754C\u4E2D\u7684\u300C\u89C4\u5219\u5C01\u95ED\u7A7A\u95F4\u300D\u3002 \u5B83\u4EEC\u53EF\u80FD\u662F\u4E00\u5EA7\u51ED\u7A7A\u51FA\u73B0\u7684\u5EFA\u7B51\u3001\u4E00\u6761\u8D70\u4E0D\u51FA\u53BB\u7684\u8857\u9053\u3001\u4E00\u4E2A\u4E0D\u65AD\u5FAA\u73AF\u7684\u5730\u94C1\u7AD9\u53F0\u3002"), /*#__PURE__*/React.createElement("p", null, "\u6BCF\u4E00\u4E2A\u5F02\u5E38\u5185\u90E8\u90FD\u6709\u81EA\u5DF1\u7684\u89C4\u5219\u3002\u8FDB\u5165\u8005\u5FC5\u987B\u9075\u5B88\u8FD9\u4E9B\u89C4\u5219\uFF0C \u8FDD\u53CD\u5C31\u4F1A\u89E6\u53D1\u60E9\u7F5A\u2014\u2014\u4ECE\u8EAB\u4F53\u4E0D\u9002\u5230\u76F4\u63A5\u6D88\u5931\uFF0C\u4E25\u91CD\u7A0B\u5EA6\u56E0\u5F02\u5E38\u800C\u5F02\u3002"), /*#__PURE__*/React.createElement("p", null, "\u597D\u6D88\u606F\u662F\uFF1A", /*#__PURE__*/React.createElement("strong", null, "\u5F02\u5E38\u662F\u53EF\u4EE5\u88AB\u7406\u89E3\u3001\u88AB\u89E3\u51B3\u7684"), "\u3002 \u5168\u7403\u6709\u4E13\u4E1A\u7684\u56E2\u961F\u5728\u7814\u7A76\u5F02\u5E38\u3001\u5E94\u5BF9\u5F02\u5E38\u3002\u666E\u901A\u4EBA\u53EA\u8981\u638C\u63E1\u6B63\u786E\u7684\u77E5\u8BC6\uFF0C \u7EDD\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u90FD\u80FD\u5B89\u5168\u64A4\u79BB\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "intro-reassurance"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "intro-reassurance-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 11.08V12a10 10 0 11-5.93-9.14"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "22 4 12 14.01 9 11.01"
  })), /*#__PURE__*/React.createElement("p", {
    className: "intro-reassurance-text"
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--level-ordinary)"
    }
  }, "\u8BF7\u8BB0\u4F4F\uFF1A"), "\u5927\u591A\u6570\u5F02\u5E38\u662F\u5E38\u89C4\u7EA7\uFF0C\u666E\u901A\u4EBA\u51B7\u9759\u5E94\u5BF9\u5C31\u6709\u5F88\u5927\u673A\u4F1A\u5B89\u5168\u64A4\u79BB\u3002 \u9047\u5230\u5F02\u5E38\u4E0D\u8981\u614C\uFF0C\u5148\u62E8\u625399\uFF0C\u4E13\u4E1A\u4EBA\u5458\u4F1A\u6765\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "intro-features"
  }, introFeatures.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "intro-feature"
  }, /*#__PURE__*/React.createElement("div", {
    className: "intro-feature-head"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "intro-feature-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: f.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "intro-feature-title"
  }, f.title)), /*#__PURE__*/React.createElement("p", {
    className: "intro-feature-desc"
  }, f.desc))))))), /*#__PURE__*/React.createElement("section", {
    className: "hp-section",
    style: {
      backgroundColor: "var(--bg-secondary)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-section-label"
  }, "02 / THREAT LEVEL"), /*#__PURE__*/React.createElement("h2", {
    className: "hp-section-title"
  }, "\u5F02\u5E38\u6709\u591A\u5371\u9669\uFF1F")), /*#__PURE__*/React.createElement("p", {
    className: "hp-section-subtitle"
  }, "IMAC\u5C06\u5F02\u5E38\u5206\u4E3A\u4E94\u4E2A\u5371\u9669\u7B49\u7EA7\u3002\u5BF9\u666E\u901A\u4EBA\u6765\u8BF4\uFF0C\u4E86\u89E3\u7B49\u7EA7\u610F\u5473\u7740\u77E5\u9053\u5E94\u8BE5\u8FDC\u79BB\u5230\u4EC0\u4E48\u7A0B\u5EA6\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "levels-citizen"
  }, levels.map(lv => /*#__PURE__*/React.createElement("div", {
    key: lv.key,
    className: "level-card-c",
    style: {
      borderTopColor: lv.color
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "level-en"
  }, lv.en), /*#__PURE__*/React.createElement("div", {
    className: "level-name",
    style: {
      color: lv.color
    }
  }, lv.cn), /*#__PURE__*/React.createElement("p", {
    className: "level-public-desc"
  }, lv.publicDesc)))), /*#__PURE__*/React.createElement("div", {
    className: "levels-bottom-note"
  }, /*#__PURE__*/React.createElement("strong", null, "\u65E0\u8BBA\u54EA\u4E2A\u7B49\u7EA7\uFF0C\u53D1\u73B0\u5F02\u5E38\u8BF7\u7ACB\u5373\u8FDC\u79BB\u5E76\u62E8\u6253 99\u3002"), /*#__PURE__*/React.createElement("br", null), "\u4E0D\u8981\u597D\u5947\u3001\u4E0D\u8981\u9760\u8FD1\u3001\u4E0D\u8981\u62CD\u7167\u53D1\u793E\u4EA4\u5A92\u4F53\u2014\u2014\u4F60\u7684\u5B89\u5168\u6BD4\u4EC0\u4E48\u90FD\u91CD\u8981\u3002"))), /*#__PURE__*/React.createElement("section", {
    className: "hp-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-title-group centered"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-section-label"
  }, "03 / EMERGENCY GUIDE"), /*#__PURE__*/React.createElement("h2", {
    className: "hp-section-title"
  }, "\u9047\u5230\u5F02\u5E38\u600E\u4E48\u529E\uFF1F")), /*#__PURE__*/React.createElement("p", {
    className: "hp-section-subtitle"
  }, "\u8BB0\u4F4F\u8FD9\u56DB\u6B65\uFF0C\u5173\u952E\u65F6\u523B\u80FD\u6551\u547D\u3002\u5B8C\u6574\u7248\u5341\u6761\u8BF7\u67E5\u770B\u5E94\u6025\u6307\u5357\u8BE6\u60C5\u9875\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "guide-quick-grid"
  }, quickGuide.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.num,
    className: "guide-quick-card",
    onClick: () => navigate("/guide")
  }, /*#__PURE__*/React.createElement("div", {
    className: "guide-quick-num"
  }, "0", g.num), /*#__PURE__*/React.createElement("h3", {
    className: "guide-quick-title"
  }, g.title), /*#__PURE__*/React.createElement("p", {
    className: "guide-quick-desc"
  }, g.desc)))), /*#__PURE__*/React.createElement("div", {
    className: "guide-full-btn-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    onClick: () => navigate("/guide")
  }, "\u67E5\u770B\u5B8C\u6574\u5341\u6761\u5E94\u6025\u6307\u5357 \u2192")))), /*#__PURE__*/React.createElement("section", {
    id: "hotline-section",
    className: "hotline-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-icon-lg"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hotline-text"
  }, /*#__PURE__*/React.createElement("h2", null, "\u53D1\u73B0\u7591\u4F3C\u5F02\u5E38\uFF1F\u4FDD\u6301\u8DDD\u79BB\uFF0C\u7ACB\u5373\u62E8\u6253"), /*#__PURE__*/React.createElement("p", null, "\u6240\u6709\u88AB\u6536\u7F16\u7EC4\u7EC7\u5F00\u8BBE24\u5C0F\u65F6\u5F02\u5E38\u70ED\u7EBF\uFF0C\u53F7\u7801\u300C99\u300D\u5F00\u5934\uFF0C\u5168\u7403\u901A\u7528\u524D\u7F00"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hotline-number"
  }, "99"), /*#__PURE__*/React.createElement("div", {
    className: "hotline-number-label"
  }, "ANOMALY EMERGENCY HOTLINE"))), /*#__PURE__*/React.createElement("div", {
    className: "hotline-steps"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-num"
  }, "1"), /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-text"
  }, /*#__PURE__*/React.createElement("strong", null, "\u4FDD\u6301\u8DDD\u79BB\uFF0C\u4E0D\u8981\u89E6\u78B0"), "\u8FDC\u79BB\u5F02\u5E38\u533A\u57DF\uFF0C\u5207\u52FF\u89E6\u78B0\u4EFB\u4F55\u5F02\u5E38\u7269\u54C1")), /*#__PURE__*/React.createElement("div", {
    className: "hotline-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-num"
  }, "2"), /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-text"
  }, /*#__PURE__*/React.createElement("strong", null, "\u62E8\u6253\u5F02\u5E38\u70ED\u7EBF"), "\u63D0\u4F9B\u4F4D\u7F6E\u548C\u5916\u89C2\u63CF\u8FF0")), /*#__PURE__*/React.createElement("div", {
    className: "hotline-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-num"
  }, "3"), /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-text"
  }, /*#__PURE__*/React.createElement("strong", null, "\u6309\u6307\u5F15\u64A4\u79BB"), "\u4F9D\u7167\u63A5\u7EBF\u5458\u6307\u793A\u64A4\u79BB\u81F3\u5B89\u5168\u533A\u57DF")), /*#__PURE__*/React.createElement("div", {
    className: "hotline-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-num"
  }, "4"), /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-text"
  }, /*#__PURE__*/React.createElement("strong", null, "\u4E0D\u4F20\u64AD\u4F4D\u7F6E\u4FE1\u606F"), "\u4E0D\u5411\u4ED6\u4EBA\u900F\u9732\u5F02\u5E38\u7684\u5177\u4F53\u4F4D\u7F6E"))), /*#__PURE__*/React.createElement("div", {
    className: "hotline-app-tip"
  }, "\u5B89\u73C0\u538630\u5E74\u540E\uFF0C\u90E8\u5206\u57CE\u5E02\u8BD5\u70B9\u300C\u5F02\u5E38\u9884\u8B66APP\u300D\uFF0C\u5B9E\u65F6\u63A8\u9001\u5468\u8FB9\u5F02\u5E38\u98CE\u9669\u8BC4\u4F30\u3002"))), /*#__PURE__*/React.createElement("section", {
    id: "news",
    className: "hp-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-section-label"
  }, "04 / NEWS CENTER"), /*#__PURE__*/React.createElement("h2", {
    className: "hp-section-title"
  }, "\u6700\u65B0\u52A8\u6001")), /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: "pointer",
      color: "var(--accent-red-bright)",
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      letterSpacing: "0.1em"
    },
    onClick: () => navigate("/news")
  }, "\u67E5\u770B\u66F4\u591A \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "news-citizen-grid"
  }, newsItems.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "news-citizen-card",
    onClick: () => navigate("/news")
  }, /*#__PURE__*/React.createElement("div", {
    className: "news-citizen-bar"
  }), /*#__PURE__*/React.createElement("div", {
    className: "news-citizen-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "news-citizen-source"
  }, n.source.toUpperCase()), /*#__PURE__*/React.createElement("h3", {
    className: "news-citizen-title"
  }, n.title), /*#__PURE__*/React.createElement("div", {
    className: "news-citizen-date"
  }, n.date), /*#__PURE__*/React.createElement("p", {
    className: "news-citizen-desc"
  }, n.desc))))))), /*#__PURE__*/React.createElement("section", {
    id: "boundary-walker",
    className: "hp-section",
    style: {
      backgroundColor: "var(--bg-secondary)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-section-label"
  }, "05 / BOUNDARY WALKER"), /*#__PURE__*/React.createElement("h2", {
    className: "hp-section-title"
  }, "\u6EAF\u754C\u8005")), /*#__PURE__*/React.createElement("p", {
    className: "hp-section-subtitle"
  }, "\u6CA1\u6709\u8D85\u80FD\u529B\uFF0C\u6CA1\u6709\u7279\u6B8A\u88C5\u5907\u2014\u2014\u4ED6\u4EEC\u4EE5\u4E25\u683C\u8BAD\u7EC3\u548C\u4EBA\u6027\u4E3A\u951A\u70B9\uFF0C\u6CBF\u7740\u5F02\u5E38\u7684\u8109\u7EDC\u8FFD\u6EAF\u6E90\u5934\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "walker-intro-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-intro-main"
  }, /*#__PURE__*/React.createElement("p", {
    className: "walker-intro-text"
  }, /*#__PURE__*/React.createElement("strong", null, "\u6EAF\u754C\u8005"), "\u662F\u4E13\u95E8\u5904\u7406\u5F02\u5E38\u4E8B\u4EF6\u7684\u4E13\u4E1A\u4EBA\u5458\u3002\u4ED6\u4EEC\u4E0D\u662F\u8D85\u4EBA\uFF0C\u4E5F\u6CA1\u6709\u8D85\u80FD\u529B\u2014\u2014 \u4ED6\u4EEC\u53EA\u662F\u7ECF\u8FC7\u6700\u4E25\u82DB\u8BAD\u7EC3\u3001\u6700\u6E05\u695A\u5F02\u5E38\u89C4\u5219\u3001\u6700\u61C2\u5F97\u5982\u4F55\u6D3B\u7740\u8D70\u51FA\u6765\u7684\u666E\u901A\u4EBA\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "walker-intro-text"
  }, "\u6BCF\u4E00\u6B21\u8FDB\u5165\u5F02\u5E38\uFF0C\u4ED6\u4EEC\u90FD\u8D70\u5728\u5DF2\u77E5\u89C4\u5219\u7684\u8FB9\u7F18\u3002\u4ED6\u4EEC\u7684\u5DE5\u4F5C\u4E0D\u662F\u8DE8\u8D8A\u8FB9\u754C\uFF0C \u800C\u662F\u8FFD\u6EAF\u8FB9\u754C\u2014\u2014\u627E\u5230\u5F02\u5E38\u7684\u6E90\u5934\uFF0C\u6478\u6E05\u5B83\u7684\u89C4\u5219\uFF0C\u7136\u540E\u628A\u6DF1\u6E0A\u7684\u6765\u8DEF\uFF0C\u8D70\u6210\u5F52\u9014\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "walker-quote"
  }, /*#__PURE__*/React.createElement("p", {
    className: "walker-quote-text"
  }, "\u6211\u4EEC\u4E0D\u662F\u5728\u8DE8\u8D8A\u8FB9\u754C\uFF0C\u6211\u4EEC\u662F\u5728\u8FFD\u6EAF\u8FB9\u754C\u2014\u2014\u628A\u6DF1\u6E0A\u6765\u8DEF\uFF0C\u8D70\u6210\u5F52\u9014\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "walker-quote-author"
  }, "\u2014 \u827E\u4F26\xB7\u7EF4\u65AF\u7279\uFF0C\u9996\u4EFB IMAC \u884C\u52A8\u603B\u534F\u8C03\u5B98"))), /*#__PURE__*/React.createElement("div", {
    className: "walker-intro-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-num"
  }, "1,247"), /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-label"
  }, "\u5168\u7403\u5728\u518C\u6EAF\u754C\u8005")), /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini-num"
  }, "38%"), /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini-label"
  }, "\u519B\u8B66\u80CC\u666F")), /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini-num"
  }, "42%"), /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini-label"
  }, "\u793E\u4F1A\u62DB\u52DF")), /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini-num"
  }, "20%"), /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini-label"
  }, "\u5B66\u672F\u79D1\u7814"))), /*#__PURE__*/React.createElement("div", {
    className: "walker-ranks"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-ranks-title"
  }, "\u804C\u7EA7\u4F53\u7CFB"), /*#__PURE__*/React.createElement("div", {
    className: "walker-ranks-list"
  }, /*#__PURE__*/React.createElement("span", {
    className: "walker-rank"
  }, "\u89C1\u4E60"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank-arrow"
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank"
  }, "\u6EAF\u754C\u8005"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank-arrow"
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank"
  }, "\u8D44\u6DF1"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank-arrow"
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank"
  }, "\u9996\u5E2D"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank-arrow"
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank rank-landmark"
  }, "\u754C\u6807"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: "36px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => navigate("/join")
  }, "\u4E86\u89E3\u66F4\u591A / \u52A0\u5165\u6211\u4EEC", /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14 M12 5l7 7-7 7"
  })))))), /*#__PURE__*/React.createElement("section", {
    id: "organizations",
    className: "hp-section orgs-map-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-section-label"
  }, "06 / MEMBER ORGANIZATIONS"), /*#__PURE__*/React.createElement("h2", {
    className: "hp-section-title"
  }, "\u5168\u7403\u6210\u5458\u7EC4\u7EC7")), /*#__PURE__*/React.createElement("p", {
    className: "hp-section-subtitle"
  }, "\u516B\u4E2A\u8BA4\u8BC1\u6210\u5458\u7EC4\u7EC7\u8986\u76D6\u5168\u7403\u4E3B\u8981\u5F02\u5E38\u9AD8\u53D1\u533A\u57DF\uFF0C\u968F\u65F6\u54CD\u5E94\u3002")), /*#__PURE__*/React.createElement(OrganizationsMap, {
    compact: true,
    onOrgClick: org => navigate(`/org/${org.slug}`)
  }))), /*#__PURE__*/React.createElement("section", {
    id: "about-imac",
    className: "hp-section about-imac"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-section-label"
  }, "07 / ABOUT IMAC"), /*#__PURE__*/React.createElement("h2", {
    className: "hp-section-title"
  }, "\u5173\u4E8E\u56FD\u9645\u5F02\u5E38\u7BA1\u7406\u8054\u76DF"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "16px",
      color: "var(--text-secondary)",
      lineHeight: "1.9",
      maxWidth: "780px",
      margin: "0 auto 40px",
      textAlign: "center"
    }
  }, "IMAC \u662F\u5168\u7403\u7EDF\u4E00\u7684\u5F02\u5E38\u7BA1\u7406\u534F\u8C03\u673A\u6784\u3002\u6211\u4EEC\u4E0D\u76F4\u63A5\u5904\u7406\u5F02\u5E38\u2014\u2014 \u6211\u4EEC\u5236\u5B9A\u6807\u51C6\u3001\u534F\u8C03\u8D44\u6E90\u3001\u5EFA\u7ACB\u4FE1\u606F\u5171\u4EAB\u673A\u5236\uFF0C\u8BA9\u5168\u4E16\u754C\u7684\u4E13\u4E1A\u529B\u91CF\u80FD\u591F\u9AD8\u6548\u534F\u4F5C\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "about-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-card-num"
  }, "MISSION \xB7 01"), /*#__PURE__*/React.createElement("div", {
    className: "about-card-title"
  }, "\u4FE1\u606F\u65E0\u6761\u4EF6\u5171\u4EAB"), /*#__PURE__*/React.createElement("p", {
    className: "about-card-desc"
  }, "\u6240\u6709\u8BA4\u8BC1\u7EC4\u7EC7\u5FC5\u987B\u5171\u4EAB\u5F02\u5E38\u6570\u636E\u4E0E\u7814\u7A76\u6210\u679C\u3002 \u4FE1\u606F\u58C1\u5792\u662F\u6700\u5927\u7684\u654C\u4EBA\u2014\u2014\u6BCF\u4E00\u6B21\u9690\u7792\uFF0C\u90FD\u53EF\u80FD\u8BA9\u66F4\u591A\u4EBA\u4ED8\u51FA\u751F\u547D\u7684\u4EE3\u4EF7\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "about-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-card-num"
  }, "STANDARD \xB7 02"), /*#__PURE__*/React.createElement("div", {
    className: "about-card-title"
  }, "\u6807\u51C6\u65E0\u6761\u4EF6\u7EDF\u4E00"), /*#__PURE__*/React.createElement("p", {
    className: "about-card-desc"
  }, "\u7EDF\u4E00\u7684\u5F02\u5E38\u8BC4\u7EA7\u3001\u7EDF\u4E00\u7684\u5E94\u5BF9\u6D41\u7A0B\u3001\u7EDF\u4E00\u7684\u4FE1\u606F\u62AB\u9732\u89C4\u8303\u3002 \u65E0\u8BBA\u4F60\u5728\u4E16\u754C\u7684\u54EA\u4E2A\u89D2\u843D\uFF0C\u9047\u5230\u5F02\u5E38\u65F6\u9762\u5BF9\u7684\u90FD\u662F\u540C\u4E00\u5957\u4E13\u4E1A\u4F53\u7CFB\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "about-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-card-num"
  }, "COOPERATION \xB7 03"), /*#__PURE__*/React.createElement("div", {
    className: "about-card-title"
  }, "\u54CD\u5E94\u65E0\u6761\u4EF6\u534F\u4F5C"), /*#__PURE__*/React.createElement("p", {
    className: "about-card-desc"
  }, "\u8DE8\u56FD\u5F02\u5E38\u4E8B\u4EF6\u4E2D\uFF0C\u6240\u6709\u7EC4\u7EC7\u5FC5\u987B\u670D\u4ECEIMAC\u7EDF\u4E00\u8C03\u5EA6\u3002 \u56FD\u754C\u548C\u653F\u6CBB\u5728\u4EBA\u7684\u751F\u547D\u9762\u524D\uFF0C\u6C38\u8FDC\u6392\u5728\u7B2C\u4E8C\u4F4D\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "about-footer-text"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: "pointer",
      color: "var(--accent-red-bright)",
      borderBottom: "1px solid var(--accent-red-bright)",
      paddingBottom: "2px"
    },
    onClick: () => navigate("/organizations")
  }, "\u67E5\u770B\u5168\u74038\u4E2A\u8BA4\u8BC1\u6210\u5458\u7EC4\u7EC7 \u2192")))));
}
window.HomePage = HomePage;