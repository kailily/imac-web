// Hero Section
function Hero() {
  const stats = [{
    value: "20,000+",
    label: "已记录异常事件",
    en: "RECORDED ANOMALIES"
  }, {
    value: "1,247",
    label: "在册溯界者",
    en: "REGISTERED WALKERS"
  }, {
    value: "8",
    label: "认证成员组织",
    en: "MEMBER ORGANIZATIONS"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
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
      `), /*#__PURE__*/React.createElement("section", {
    id: "home",
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-top-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero-doc-id mono"
  }, "DOC.IMAC.PUB.001 \xB7 VERSION 39.2"), /*#__PURE__*/React.createElement("span", {
    className: "classification public"
  }, "PUBLIC ACCESS")), /*#__PURE__*/React.createElement("div", {
    className: "hero-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-subtitle"
  }, "\u56FD\u9645\u5F02\u5E38\u7BA1\u7406\u8054\u76DF"), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title-cn"
  }, "\u56FD\u9645\u5F02\u5E38\u7BA1\u7406\u8054\u76DF"), /*#__PURE__*/React.createElement("div", {
    className: "hero-title-en"
  }, "International Anomaly Management Coalition")), /*#__PURE__*/React.createElement("div", {
    className: "hero-tagline"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-tagline-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, "\u4FE1\u606F\u65E0\u6761\u4EF6\u5171\u4EAB")), /*#__PURE__*/React.createElement("div", {
    className: "hero-tagline-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, "\u6807\u51C6\u65E0\u6761\u4EF6\u7EDF\u4E00")), /*#__PURE__*/React.createElement("div", {
    className: "hero-tagline-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, "\u54CD\u5E94\u65E0\u6761\u4EF6\u534F\u4F5C"))), /*#__PURE__*/React.createElement("p", {
    className: "hero-desc"
  }, "\u81EA\u5B89\u73C0\u5386\u5143\u5E74\"\u5927\u88C2\u9699\"\u4E8B\u4EF6\u4EE5\u6765\uFF0C\u5F02\u5E38\u5728\u5168\u7403\u8303\u56F4\u5185\u6301\u7EED\u51FA\u73B0\u3002\u5404\u56FD\u72EC\u7ACB\u5E94\u5BF9\u4F53\u7CFB\u6807\u51C6\u4E0D\u4E00\u3001\u4FE1\u606F\u58C1\u5792\u4E25\u91CD\uFF0C\u5BFC\u81F4\u5927\u91CF\u672C\u53EF\u907F\u514D\u7684\u4F24\u4EA1\u3002 IMAC \u4F5C\u4E3A\u5168\u7403\u7EDF\u4E00\u7684\u5F02\u5E38\u7BA1\u7406\u534F\u8C03\u673A\u6784\uFF0C\u81F4\u529B\u4E8E\u5EFA\u7ACB\u6807\u51C6\u5316\u7684\u5F02\u5E38\u8BC4\u7EA7\u3001\u8BB0\u5F55\u3001\u5E94\u5BF9\u4E0E\u5584\u540E\u4F53\u7CFB\uFF0C \u534F\u8C03\u516B\u5927\u8BA4\u8BC1\u6210\u5458\u7EC4\u7EC7\u7684\u8DE8\u56FD\u54CD\u5E94\u884C\u52A8\uFF0C\u7EC8\u7ED3\u6DF7\u4E71\uFF0C\u5B88\u62A4\u8FB9\u754C\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stats"
  }, stats.map((stat, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "hero-stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-value mono"
  }, stat.value), /*#__PURE__*/React.createElement("div", {
    className: "stat-label-cn"
  }, stat.label), /*#__PURE__*/React.createElement("div", {
    className: "stat-label-en"
  }, stat.en))))), /*#__PURE__*/React.createElement("div", {
    className: "hero-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-scroll-indicator"
  }, /*#__PURE__*/React.createElement("span", null, "SCROLL"), /*#__PURE__*/React.createElement("div", {
    className: "hero-scroll-line"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hero-classification"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-class-label"
  }, "Classification Level"), /*#__PURE__*/React.createElement("span", {
    className: "classification public"
  }, "PUBLIC ACCESS / \u516C\u5F00\u8BBF\u95EE\u7EA7"))));
}
window.Hero = Hero;

// Threat Level Section (moved here since it's referenced in App)
function ThreatLevel() {
  const levels = [{
    key: "ordinary",
    cn: "常规级",
    en: "ORDINARY",
    desc: "规则单一、逻辑清晰。进入门槛低，平民生还率较高，一般不会造成大规模伤亡。",
    tags: ["规则清晰", "低死亡率", "可预测"]
  }, {
    key: "hazardous",
    cn: "危险级",
    en: "HAZARDOUS",
    desc: "多层陷阱与误导并存，空间轻度扭曲，具有排他性，进入者面临显著生存压力。",
    tags: ["空间扭曲", "误导陷阱", "需专业人员"]
  }, {
    key: "doomed",
    cn: "厄运级",
    en: "DOOMED",
    desc: "规则具有叙事性，强制嵌入异常剧本，NPC与同化风险高发，生还率急剧下降。",
    tags: ["叙事规则", "同化风险", "NPC交互"]
  }, {
    key: "abyssal",
    cn: "深渊级",
    en: "ABYSSAL",
    desc: "规则不可逆，空间具有自我意识与进化能力。绝大部分进入者无人生还。",
    tags: ["自我进化", "极高致死率", "接近无解"]
  }, {
    key: "unknown",
    cn: "未知级",
    en: "UNKNOWN",
    desc: "规则完全不可知。存在本身对现实构成结构性威胁，仅作为特殊评级使用。",
    tags: ["不可测量", "现实威胁", "最高戒备"]
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
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
      `), /*#__PURE__*/React.createElement("section", {
    id: "threat-level",
    className: "section threat-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-number mono"
  }, "03 /"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title-cn"
  }, "\u5F02\u5E38\u5A01\u80C1\u7B49\u7EA7"), /*#__PURE__*/React.createElement("span", {
    className: "section-title-en"
  }, "ATL \xB7 Anomaly Threat Level")), /*#__PURE__*/React.createElement("span", {
    className: "classification restricted"
  }, "RESTRICTED / \u9650\u5236\u7EA7")), /*#__PURE__*/React.createElement("div", {
    className: "threat-grid"
  }, levels.map((level, i) => /*#__PURE__*/React.createElement("div", {
    key: level.key,
    className: `threat-card ${level.key}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `level-bar level-${level.key}`
  }), /*#__PURE__*/React.createElement("div", {
    className: "threat-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "threat-rank"
  }, "LEVEL ", String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    className: "threat-card-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: `threat-name-cn level-text-${level.key}`
  }, level.cn), /*#__PURE__*/React.createElement("span", {
    className: "threat-name-en"
  }, level.en)), /*#__PURE__*/React.createElement("p", {
    className: "threat-desc"
  }, level.desc), /*#__PURE__*/React.createElement("div", {
    className: "threat-tags"
  }, level.tags.map(tag => /*#__PURE__*/React.createElement("span", {
    key: tag,
    className: "threat-tag"
  }, tag))))))))));
}
window.ThreatLevel = ThreatLevel;