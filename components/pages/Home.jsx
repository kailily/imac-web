// Home Page - citizen-facing portal redesign
function HomePage() {
  const { navigate } = useRouter();

  const introFeatures = [
    {
      icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z M12 22V12 M2 7l10 5 10-5",
      title: "规则是绝对的",
      desc: "进入异常后必须遵守它的规则，违反就会触发惩罚。没有例外，也没有「主角光环」。",
    },
    {
      icon: "M9 18l6-6-6-6",
      title: "规则是可以读懂的",
      desc: "异常的规则往往藏在细节里。通过观察和推理，普通人也能找到活下去的办法。",
    },
    {
      icon: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z",
      title: "每个异常都有核心",
      desc: "异常的核心被称为「叙事锚点」——找到它、破坏它，异常就会消失。",
    },
    {
      icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
      title: "有专业人员处理",
      desc: "全球有8个认证组织、1200余名专业溯界者在专门应对异常。遇到异常交给他们就好。",
    },
  ];

  const levels = [
    {
      key: "ordinary", cn: "常规级", en: "ORDINARY",
      publicDesc: "规则简单明确，存活率高。普通人如果冷静应对，通常可以自行撤离。",
      color: "var(--level-ordinary)",
    },
    {
      key: "hazardous", cn: "危险级", en: "HAZARDOUS",
      publicDesc: "规则复杂，容易踩坑。不要停留，尽快离开并拨打99，交给专业人员处理。",
      color: "var(--level-hazardous)",
    },
    {
      key: "doomed", cn: "厄运级", en: "DOOMED",
      publicDesc: "极度危险，平民切勿靠近。这类异常死亡率极高，必须由专业团队处理。",
      color: "var(--level-doomed)",
    },
    {
      key: "abyssal", cn: "深渊级", en: "ABYSSAL",
      publicDesc: "最高危等级。即使是训练有素的专业人员也难以生还。区域严格封锁。",
      color: "var(--level-abyssal)",
    },
    {
      key: "unknown", cn: "未知级", en: "UNKNOWN",
      publicDesc: "信息不足，无法评估。遇到任何疑似未知级异常，立即远离并报告。",
      color: "var(--level-unknown)",
    },
  ];

  const quickGuide = [
    {
      num: "01",
      icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z M12 22V12",
      title: "保持冷静",
      desc: "越慌越容易出错。先停下来，深呼吸。",
    },
    {
      num: "02",
      icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 100-6 3 3 0 000 6z",
      title: "观察环境",
      desc: "注意周围有什么不对劲的地方。",
    },
    {
      num: "03",
      icon: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
      title: "不要触碰异常物品",
      desc: "任何看起来反常的东西，都别碰。",
    },
    {
      num: "04",
      icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
      title: "拨打99报警",
      desc: "全球通用异常热线，24小时在线。",
    },
  ];

  const newsItems = [
    {
      title: "北境守望成功解决山区常规级异常",
      date: "安珀历39年·春 · 白松城",
      source: "北境守望公关部",
      desc: "白松城以南山区循环路段异常于昨日被成功解决，7名被困平民安全撤离，本次行动无溯界者伤亡。",
      level: "public",
    },
    {
      title: "IMAC发布新版公民应急指南",
      date: "安珀历39年·春 · 中立城",
      source: "IMAC信息协调办公室",
      desc: "国际异常管理联盟今日发布2024版公民应急指南，新增城市地铁异常应对章节，面向全球公众免费发放。",
      level: "public",
    },
    {
      title: "边界研究院公布年度异常统计报告",
      date: "安珀历39年·冬 · 洛林自由市",
      source: "边界研究院BRI",
      desc: "BRI发布年度异常现象统计分析，全球异常出现频率与去年基本持平，新发现异常327起，其中常规级占比74%。",
      level: "public",
    },
  ];

  return (
    <>
      <style>{`
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
          max-width: 720px;
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
          margin-bottom: 20px;
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
        }
        .hp-quick-card {
          background-color: rgba(18, 18, 22, 0.7);
          backdrop-filter: blur(4px);
          border: 1px solid var(--border-color);
          padding: 20px 22px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
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
          width: 28px; height: 28px;
          color: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .hp-quick-title {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .hp-quick-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .hp-quick-arrow {
          margin-top: auto;
          font-family: var(--font-mono);
          font-size: 11px;
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
          padding: 16px 18px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: default;
          display: flex;
          align-items: center;
          gap: 14px;
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
          width: 30px; height: 30px;
          color: var(--stat-accent, var(--accent-red-bright));
          opacity: 0.85;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hp-stat-icon svg { width: 100%; height: 100%; stroke: currentColor; fill: none; stroke-width: 1.5; }
        .hp-stat-info { flex: 1; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .hp-stat-num {
          font-family: var(--font-mono);
          font-size: 24px;
          font-weight: 700;
          color: var(--stat-accent, var(--text-primary));
          line-height: 1;
          letter-spacing: 0.02em;
        }
        .hp-stat-label {
          font-size: 10px;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          letter-spacing: 0.06em;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .hp-section-title {
          font-family: var(--font-serif);
          font-size: 34px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .hp-section-subtitle {
          font-size: 15px;
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
        .hotline-icon-lg svg { width: 36px; height: 36px; }
        .hotline-text h2 {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }
        .hotline-text p {
          font-size: 14px;
          color: var(--text-secondary);
        }
        .hotline-number {
          font-family: var(--font-serif);
          font-size: 72px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
          letter-spacing: 0.05em;
        }
        .hotline-number-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          text-align: right;
          margin-top: 6px;
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
          width: 32px; height: 32px;
          border-radius: 50%;
          background-color: var(--bg-card);
          border: 1.5px solid var(--accent-red-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          color: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .hotline-step-text {
          font-size: 14px;
          color: var(--text-secondary);
        }
        .hotline-step-text strong {
          color: var(--text-primary);
          display: block;
          margin-bottom: 2px;
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

        @media (max-width: 1024px) {
          .intro-body { grid-template-columns: 1fr; gap: 40px; }
          .levels-citizen { grid-template-columns: repeat(3, 1fr); }
          .guide-quick-grid { grid-template-columns: repeat(2, 1fr); }
          .hp-quick-cards { grid-template-columns: 1fr; }
          .hp-hero-stats-row { grid-template-columns: repeat(2, 1fr); gap: 14px; }
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
      `}</style>

      <section className="hp-hero">
        <div className="hp-hero-grid"></div>
        <div className="container hp-hero-inner">
          <div className="hp-hero-content">
            <div className="hp-hero-badge">
              <div className="hp-hero-badge-dot"></div>
              <span>IMAC · 公民安全门户</span>
            </div>
            <h1 className="hp-hero-title">
              了解异常，<br/>
              <span className="accent">保护自己和身边的人</span>
            </h1>
            <p className="hp-hero-desc">
              国际异常管理联盟（IMAC）是全球统一的异常管理协调机构。
              我们的使命是让每一个人都能认识异常、知道如何避险、并在需要时获得专业帮助。
            </p>
            <div className="hp-hero-actions">
              <button className="btn-primary" onClick={() => navigate("/guide")}>
                查看应急指南
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14 M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button className="btn-hotline" onClick={() => {
                const el = document.getElementById("hotline-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                异常热线 99
              </button>
            </div>

            <div className="hp-quick-cards">
              <div className="hp-quick-card" onClick={() => {
                const el = document.getElementById("anomaly-intro");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}>
                <div className="hp-quick-head">
                  <svg className="hp-quick-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  <div className="hp-quick-title">什么是异常？</div>
                </div>
                <div className="hp-quick-desc">认识异常的四个核心特征，告别恐惧与误解</div>
                <div className="hp-quick-arrow">了解更多 →</div>
              </div>
              <div className="hp-quick-card" onClick={() => navigate("/guide")}>
                <div className="hp-quick-head">
                  <svg className="hp-quick-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <div className="hp-quick-title">遇到异常怎么办？</div>
                </div>
                <div className="hp-quick-desc">核心十条指南，关键时刻能救命</div>
                <div className="hp-quick-arrow">查看指南 →</div>
              </div>
              <div className="hp-quick-card" onClick={() => {
                const el = document.getElementById("hotline-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}>
                <div className="hp-quick-head">
                  <svg className="hp-quick-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <div className="hp-quick-title">异常热线 99</div>
                </div>
                <div className="hp-quick-desc">24小时全球通用，免费，无需区号</div>
                <div className="hp-quick-arrow">立即拨打 →</div>
              </div>
            </div>

            <div className="hp-hero-stats-row">
              <div className="hp-stat" style={{ '--stat-accent': '#c42828' }}>
                <div className="hp-stat-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div className="hp-stat-info">
                  <div className="hp-stat-num">20,000+</div>
                  <div className="hp-stat-label">已记录异常</div>
                </div>
                <div className="hp-stat-corner">ANO-001</div>
              </div>
              <div className="hp-stat" style={{ '--stat-accent': '#6b8cae' }}>
                <div className="hp-stat-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                    <path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <div className="hp-stat-info">
                  <div className="hp-stat-num">8</div>
                  <div className="hp-stat-label">认证成员组织</div>
                </div>
                <div className="hp-stat-corner">ORG-008</div>
              </div>
              <div className="hp-stat" style={{ '--stat-accent': '#d4902e' }}>
                <div className="hp-stat-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="hp-stat-info">
                  <div className="hp-stat-num">1,247</div>
                  <div className="hp-stat-label">在册溯界者</div>
                </div>
                <div className="hp-stat-corner">WKR-1247</div>
              </div>
              <div className="hp-stat" style={{ '--stat-accent': '#4a7c59' }}>
                <div className="hp-stat-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0022 16.92z"/>
                  </svg>
                </div>
                <div className="hp-stat-info">
                  <div className="hp-stat-num">99</div>
                  <div className="hp-stat-label">全球统一热线</div>
                </div>
                <div className="hp-stat-corner">HOTLINE</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hp-scroll-indicator">
          <span>SCROLL</span>
          <div className="hp-scroll-line"></div>
        </div>
      </section>

      {/* Anomaly Intro */}
      <section id="anomaly-intro" className="hp-section">
        <div className="container">
          <div className="hp-section-header">
            <div className="hp-section-title-group centered">
              <span className="hp-section-label">01 / WHAT IS ANOMALY</span>
              <h2 className="hp-section-title">认识异常</h2>
            </div>
            <p className="hp-section-subtitle">
              异常不是超自然现象，也不是都市传说。它们是可测量、可研究、可应对的客观存在。
            </p>
          </div>

          <div className="intro-body">
            <div className="intro-text">
              <p>
                <strong>异常</strong>是突然出现在现实世界中的「规则封闭空间」。
                它们可能是一座凭空出现的建筑、一条走不出去的街道、一个不断循环的地铁站台。
              </p>
              <p>
                每一个异常内部都有自己的规则。进入者必须遵守这些规则，
                违反就会触发惩罚——从身体不适到直接消失，严重程度因异常而异。
              </p>
              <p>
                好消息是：<strong>异常是可以被理解、被解决的</strong>。
                全球有专业的团队在研究异常、应对异常。普通人只要掌握正确的知识，
                绝大多数情况下都能安全撤离。
              </p>
              <div className="intro-reassurance">
                <svg className="intro-reassurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <p className="intro-reassurance-text">
                  <strong style={{ color: "var(--level-ordinary)" }}>请记住：</strong>
                  大多数异常是常规级，普通人冷静应对就有很大机会安全撤离。
                  遇到异常不要慌，先拨打99，专业人员会来。
                </p>
              </div>
            </div>

            <div className="intro-features">
              {introFeatures.map((f, i) => (
                <div key={i} className="intro-feature">
                  <div className="intro-feature-head">
                    <svg className="intro-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d={f.icon}/>
                    </svg>
                    <div className="intro-feature-title">{f.title}</div>
                  </div>
                  <p className="intro-feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Threat Levels - citizen */}
      <section className="hp-section" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="hp-section-header">
            <div className="hp-section-title-group">
              <span className="hp-section-label">02 / THREAT LEVEL</span>
              <h2 className="hp-section-title">异常有多危险？</h2>
            </div>
            <p className="hp-section-subtitle">
              IMAC将异常分为五个危险等级。对普通人来说，了解等级意味着知道应该远离到什么程度。
            </p>
          </div>

          <div className="levels-citizen">
            {levels.map((lv) => (
              <div key={lv.key} className="level-card-c" style={{ borderTopColor: lv.color }}>
                <div className="level-en">{lv.en}</div>
                <div className="level-name" style={{ color: lv.color }}>{lv.cn}</div>
                <p className="level-public-desc">{lv.publicDesc}</p>
              </div>
            ))}
          </div>

          <div className="levels-bottom-note">
            <strong>无论哪个等级，发现异常请立即远离并拨打 99。</strong><br/>
            不要好奇、不要靠近、不要拍照发社交媒体——你的安全比什么都重要。
          </div>
        </div>
      </section>

      {/* Quick Guide */}
      <section className="hp-section">
        <div className="container">
          <div className="hp-section-header">
            <div className="hp-section-title-group centered">
              <span className="hp-section-label">03 / EMERGENCY GUIDE</span>
              <h2 className="hp-section-title">遇到异常怎么办？</h2>
            </div>
            <p className="hp-section-subtitle">
              记住这四步，关键时刻能救命。完整版十条请查看应急指南详情页。
            </p>
          </div>

          <div className="guide-quick-grid">
            {quickGuide.map((g) => (
              <div key={g.num} className="guide-quick-card" onClick={() => navigate("/guide")}>
                <div className="guide-quick-num">0{g.num}</div>
                <h3 className="guide-quick-title">{g.title}</h3>
                <p className="guide-quick-desc">{g.desc}</p>
              </div>
            ))}
          </div>

          <div className="guide-full-btn-wrap">
            <button className="btn-secondary" onClick={() => navigate("/guide")}>
              查看完整十条应急指南 →
            </button>
          </div>
        </div>
      </section>

      {/* Hotline Section */}
      <section id="hotline-section" className="hotline-section">
        <div className="container">
          <div className="hotline-inner">
            <div className="hotline-left">
              <div className="hotline-icon-lg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div className="hotline-text">
                <h2>发现疑似异常？保持距离，立即拨打</h2>
                <p>24小时 · 全球通用 · 免费 · 无需区号 · 任何手机均可接通</p>
              </div>
            </div>
            <div>
              <div className="hotline-number">99</div>
              <div className="hotline-number-label">ANOMALY EMERGENCY HOTLINE</div>
            </div>
          </div>

          <div className="hotline-steps">
            <div className="hotline-step">
              <div className="hotline-step-num">1</div>
              <div className="hotline-step-text">
                <strong>保持距离</strong>
                不要靠近，不要好奇，退到安全区域
              </div>
            </div>
            <div className="hotline-step">
              <div className="hotline-step-num">2</div>
              <div className="hotline-step-text">
                <strong>拨打 99</strong>
                描述你看到的情况，听从接线员指引
              </div>
            </div>
            <div className="hotline-step">
              <div className="hotline-step-num">3</div>
              <div className="hotline-step-text">
                <strong>安全撤离</strong>
                按照指引有序离开，不要返回取物品
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section id="news" className="hp-section">
        <div className="container">
          <div className="hp-section-header">
            <div className="hp-section-title-group">
              <span className="hp-section-label">04 / NEWS CENTER</span>
              <h2 className="hp-section-title">最新动态</h2>
            </div>
            <span style={{ cursor: "pointer", color: "var(--accent-red-bright)", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.1em" }}
              onClick={() => navigate("/news")}>
              查看更多 →
            </span>
          </div>

          <div className="news-citizen-grid">
            {newsItems.map((n, i) => (
              <div key={i} className="news-citizen-card" onClick={() => navigate("/news")}>
                <div className="news-citizen-bar"></div>
                <div className="news-citizen-body">
                  <div className="news-citizen-source">{n.source.toUpperCase()}</div>
                  <h3 className="news-citizen-title">{n.title}</h3>
                  <div className="news-citizen-date">{n.date}</div>
                  <p className="news-citizen-desc">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boundary Walker Intro */}
      <section id="boundary-walker" className="hp-section" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="hp-section-header">
            <div className="hp-section-title-group">
              <span className="hp-section-label">05 / BOUNDARY WALKER</span>
              <h2 className="hp-section-title">溯界者</h2>
            </div>
            <p className="hp-section-subtitle">
              没有超能力，没有特殊装备——他们以严格训练和人性为锚点，沿着异常的脉络追溯源头。
            </p>
          </div>

          <div className="walker-intro-grid">
            <div className="walker-intro-main">
              <p className="walker-intro-text">
                <strong>溯界者</strong>是专门处理异常事件的专业人员。他们不是超人，也没有超能力——
                他们只是经过最严苛训练、最清楚异常规则、最懂得如何活着走出来的普通人。
              </p>
              <p className="walker-intro-text">
                每一次进入异常，他们都走在已知规则的边缘。他们的工作不是跨越边界，
                而是追溯边界——找到异常的源头，摸清它的规则，然后把深渊的来路，走成归途。
              </p>
              <div className="walker-quote">
                <p className="walker-quote-text">
                  我们不是在跨越边界，我们是在追溯边界——把深渊来路，走成归途。
                </p>
                <div className="walker-quote-author">— 艾伦·维斯特，首任 IMAC 行动总协调官</div>
              </div>
            </div>

            <div className="walker-intro-stats">
              <div className="walker-stat-item">
                <div className="walker-stat-num">1,247</div>
                <div className="walker-stat-label">全球在册溯界者</div>
              </div>
              <div className="walker-stat-row">
                <div className="walker-stat-mini">
                  <div className="walker-stat-mini-num">38%</div>
                  <div className="walker-stat-mini-label">军警背景</div>
                </div>
                <div className="walker-stat-mini">
                  <div className="walker-stat-mini-num">42%</div>
                  <div className="walker-stat-mini-label">社会招募</div>
                </div>
                <div className="walker-stat-mini">
                  <div className="walker-stat-mini-num">20%</div>
                  <div className="walker-stat-mini-label">学术科研</div>
                </div>
              </div>
              <div className="walker-ranks">
                <div className="walker-ranks-title">职级体系</div>
                <div className="walker-ranks-list">
                  <span className="walker-rank">见习</span>
                  <span className="walker-rank-arrow">→</span>
                  <span className="walker-rank">溯界者</span>
                  <span className="walker-rank-arrow">→</span>
                  <span className="walker-rank">资深</span>
                  <span className="walker-rank-arrow">→</span>
                  <span className="walker-rank">首席</span>
                  <span className="walker-rank-arrow">→</span>
                  <span className="walker-rank rank-landmark">界标</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <button className="btn-primary" onClick={() => navigate("/join")}>
              了解更多 / 加入我们
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14 M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Organizations map */}
      <section id="organizations" className="hp-section orgs-map-section">
        <div className="container">
          <div className="hp-section-header">
            <div className="hp-section-title-group">
              <span className="hp-section-label">06 / MEMBER ORGANIZATIONS</span>
              <h2 className="hp-section-title">全球成员组织</h2>
            </div>
            <p className="hp-section-subtitle">
              八个认证成员组织覆盖全球主要异常高发区域，随时响应。
            </p>
          </div>

          <OrganizationsMap compact={true} onOrgClick={(org) => navigate(`/org/${org.slug}`)} />
        </div>
      </section>

      {/* About IMAC */}
      <section id="about-imac" className="hp-section about-imac">
        <div className="container">
          <div className="hp-section-header">
            <div className="hp-section-title-group">
              <span className="hp-section-label">07 / ABOUT IMAC</span>
              <h2 className="hp-section-title">关于国际异常管理联盟</h2>
            </div>
          </div>

          <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: "1.9", maxWidth: "780px", margin: "0 auto 40px", textAlign: "center" }}>
            IMAC 是全球统一的异常管理协调机构。我们不直接处理异常——
            我们制定标准、协调资源、建立信息共享机制，让全世界的专业力量能够高效协作。
          </p>

          <div className="about-grid">
            <div className="about-card">
              <div className="about-card-num">MISSION · 01</div>
              <div className="about-card-title">信息无条件共享</div>
              <p className="about-card-desc">
                所有认证组织必须共享异常数据与研究成果。
                信息壁垒是最大的敌人——每一次隐瞒，都可能让更多人付出生命的代价。
              </p>
            </div>
            <div className="about-card">
              <div className="about-card-num">STANDARD · 02</div>
              <div className="about-card-title">标准无条件统一</div>
              <p className="about-card-desc">
                统一的异常评级、统一的应对流程、统一的信息披露规范。
                无论你在世界的哪个角落，遇到异常时面对的都是同一套专业体系。
              </p>
            </div>
            <div className="about-card">
              <div className="about-card-num">COOPERATION · 03</div>
              <div className="about-card-title">响应无条件协作</div>
              <p className="about-card-desc">
                跨国异常事件中，所有组织必须服从IMAC统一调度。
                国界和政治在人的生命面前，永远排在第二位。
              </p>
            </div>
          </div>

          <div className="about-footer-text">
            <span style={{ cursor: "pointer", color: "var(--accent-red-bright)", borderBottom: "1px solid var(--accent-red-bright)", paddingBottom: "2px" }}
              onClick={() => navigate("/organizations")}>
              查看全球8个认证成员组织 →
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

window.HomePage = HomePage;
