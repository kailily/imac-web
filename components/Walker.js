// Walker (Boundary Walker) Section
function Walker() {
  const ranks = [{
    cn: "见习",
    en: "Initiate",
    percent: "35%",
    desc: "通过基础选拔与三个月理论训练，尚未独立执行任务",
    color: "var(--steel-blue-light)"
  }, {
    cn: "溯界者",
    en: "Walker",
    percent: "40%",
    desc: "完成十四个月全科目训练，可独立执行常规级至危险级任务",
    color: "var(--level-ordinary)"
  }, {
    cn: "资深溯界者",
    en: "Senior Walker",
    percent: "18%",
    desc: "至少三年实战经验，可执行厄运级任务，拥有团队指挥权",
    color: "var(--level-hazardous)"
  }, {
    cn: "首席溯界者",
    en: "Chief Walker",
    percent: "5%",
    desc: "各组织最高战力，可领导深渊级行动，全球不足六十人",
    color: "var(--level-doomed)"
  }, {
    cn: "界标",
    en: "Landmark",
    percent: "<30人",
    desc: "传说级称号，以个人存在即为现实锚点。全球不足三十人",
    color: "var(--level-abyssal)"
  }];
  const sources = [{
    cn: "军队系统",
    en: "Military",
    percent: "45%",
    desc: "特种部队、工程兵、医疗兵等军事背景人员，纪律与执行力强"
  }, {
    cn: "警务系统",
    en: "Law Enforcement",
    percent: "30%",
    desc: "刑侦、特警、谈判专家，擅长现场勘查与人际博弈"
  }, {
    cn: "社会招募与幸存者计划",
    en: "Civilian & Survivor",
    percent: "25%",
    desc: "学者、工程师、医生及异常幸存者，提供多元视角与第一手经验"
  }];
  const equipment = [{
    name: "个人记录器",
    en: "Personal Recorder",
    desc: "实时记录所见所闻，是事后重建现场的核心依据",
    icon: "M4 4h16v16H4z M4 9h16 M9 4v16"
  }, {
    name: "异常通讯器",
    en: "Anomaly Comm",
    desc: "在部分异常中维持有限通讯，内置加密与应急信标",
    icon: "M12 18h.01 M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
  }, {
    name: "身份信标",
    en: "ID Beacon",
    desc: "持续发射身份编码，防止在叙事类异常中被规则改写身份",
    icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z M12 22V12 M2 7l10 5 10-5"
  }, {
    name: "个人锚定物",
    en: "Anchor Object",
    desc: "溯界者最珍视的私人物品，在同化危机中作为最后的自我锚点",
    icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
  }];
  const assimilationStages = [{
    stage: "第一阶段",
    name: "规则适应",
    desc: "进入者开始无意识地遵守异常规则，将其视为理所当然",
    level: "低"
  }, {
    stage: "第二阶段",
    name: "身份模糊",
    desc: "对自身身份的认知出现动摇，开始接受异常分配的角色设定",
    level: "中"
  }, {
    stage: "第三阶段",
    name: "规则认同",
    desc: "从心理上认同异常的叙事逻辑，主动维护规则，终止行动资格",
    level: "高"
  }, {
    stage: "第四阶段",
    name: "异常融合",
    desc: "完全融入异常，成为异常的一部分。理论上不可逆转",
    level: "致命"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
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
      `), /*#__PURE__*/React.createElement("section", {
    id: "walker",
    className: "section walker-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-number mono"
  }, "04 /"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title-cn"
  }, "\u6EAF\u754C\u8005"), /*#__PURE__*/React.createElement("span", {
    className: "section-title-en"
  }, "BOUNDARY WALKER")), /*#__PURE__*/React.createElement("span", {
    className: "classification confidential"
  }, "CONFIDENTIAL / \u673A\u5BC6\u7EA7")), /*#__PURE__*/React.createElement("div", {
    className: "walker-quote-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-quote-mark"
  }, "\""), /*#__PURE__*/React.createElement("p", {
    className: "walker-quote-text"
  }, "\u6211\u4EEC\u4E0D\u662F\u5728\u8DE8\u8D8A\u8FB9\u754C\uFF0C\u6211\u4EEC\u662F\u5728\u8FFD\u6EAF\u8FB9\u754C\u2014\u2014", /*#__PURE__*/React.createElement("br", null), "\u628A\u6DF1\u6E0A\u6765\u8DEF\uFF0C\u8D70\u6210\u5F52\u9014\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "walker-quote-author"
  }, "\u2014 \u827E\u4F26\xB7\u7EF4\u65AF\u7279 \xB7 \u9996\u5E2D\u6EAF\u754C\u8005 \xB7 \u754C\u6807")), /*#__PURE__*/React.createElement("div", {
    className: "walker-main"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "walker-desc-title"
  }, "\u804C\u4E1A\u6982\u8FF0"), /*#__PURE__*/React.createElement("p", {
    className: "walker-desc-text"
  }, /*#__PURE__*/React.createElement("strong", null, "\u6EAF\u754C\u8005"), "\u662F\u8FDB\u5165\u5F02\u5E38\u3001\u8C03\u67E5\u5F02\u5E38\u3001\u89E3\u51B3\u5F02\u5E38\u7684\u4E13\u4E1A\u4EBA\u5458\u3002 \u4ED6\u4EEC\u6CA1\u6709\u8D85\u80FD\u529B\uFF0C\u4E0D\u662F\u5929\u9009\u4E4B\u5B50\uFF0C\u53EA\u662F\u7ECF\u8FC7\u4E25\u683C\u7B5B\u9009\u548C\u7CFB\u7EDF\u5316\u8BAD\u7EC3\u7684\u666E\u901A\u4EBA\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "walker-desc-text"
  }, "\u6EAF\u754C\u8005\u7684\u6838\u5FC3\u6B66\u5668\u4E0D\u662F\u4F53\u80FD\u6216\u88C5\u5907\uFF0C\u800C\u662F", /*#__PURE__*/React.createElement("strong", null, "\u89C2\u5BDF\u529B\u3001\u903B\u8F91\u63A8\u6F14\u80FD\u529B\u548C\u7A33\u5B9A\u7684\u5FC3\u667A"), "\u3002 \u5728\u89C4\u5219\u5C01\u95ED\u7684\u7A7A\u95F4\u5185\uFF0C\u4EBA\u6027\u662F\u4ED6\u4EEC\u6700\u540E\u7684\u951A\u70B9\u2014\u2014\u4E5F\u662F\u5BF9\u6297\u540C\u5316\u7684\u552F\u4E00\u9632\u7EBF\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "walker-desc-text"
  }, "\u6BCF\u4E00\u4F4D\u6EAF\u754C\u8005\u90FD\u6E05\u695A\uFF1A\u81EA\u5DF1\u53EF\u80FD\u5728\u4E0B\u4E00\u6B21\u4EFB\u52A1\u4E2D\u518D\u4E5F\u8D70\u4E0D\u51FA\u6765\u3002 \u4F46\u6B63\u662F\u56E0\u4E3A\u4ED6\u4EEC\u613F\u610F\u8D70\u8FDB\u9ED1\u6697\uFF0C\u8FB9\u754C\u4E4B\u5916\u7684\u4E16\u754C\u624D\u80FD\u4FDD\u6301\u6B63\u5E38\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "walker-desc-text",
    style: {
      color: "var(--accent-red-bright)",
      fontStyle: "italic"
    }
  }, "\"\u8BB0\u4F4F\u4F60\u662F\u8C01\u3002\u8BB0\u4F4F\u4F60\u4ECE\u54EA\u91CC\u6765\u3002\"", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "12px",
      color: "var(--text-tertiary)"
    }
  }, "\u2014\u2014 \u6EAF\u754C\u8005\u5165\u961F\u8A93\u8A00\u6700\u540E\u4E00\u53E5"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sources-title"
  }, "\u804C\u7EA7\u4F53\u7CFB \xB7 RANK SYSTEM"), /*#__PURE__*/React.createElement("div", {
    className: "rank-timeline"
  }, ranks.map((rank, i) => /*#__PURE__*/React.createElement("div", {
    key: rank.en,
    className: "rank-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rank-badge",
    style: {
      borderColor: rank.color,
      color: rank.color
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "rank-badge-num"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    className: "rank-badge-label",
    style: {
      color: rank.color
    }
  }, "RANK")), /*#__PURE__*/React.createElement("div", {
    className: "rank-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rank-name"
  }, rank.cn, /*#__PURE__*/React.createElement("span", {
    className: "rank-name-en"
  }, rank.en)), /*#__PURE__*/React.createElement("div", {
    className: "rank-desc"
  }, rank.desc)), /*#__PURE__*/React.createElement("div", {
    className: "rank-percent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rank-percent-num",
    style: {
      color: rank.color
    }
  }, rank.percent), /*#__PURE__*/React.createElement("div", {
    className: "rank-percent-label"
  }, "\u5360\u6BD4"))))))), /*#__PURE__*/React.createElement("div", {
    className: "sources-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sources-title"
  }, "\u4EBA\u5458\u6765\u6E90\u901A\u9053 \xB7 RECRUITMENT CHANNELS"), /*#__PURE__*/React.createElement("div", {
    className: "sources-grid"
  }, sources.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.en,
    className: "source-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "source-percent"
  }, s.percent), /*#__PURE__*/React.createElement("div", {
    className: "source-name"
  }, s.cn), /*#__PURE__*/React.createElement("div", {
    className: "source-en"
  }, s.en), /*#__PURE__*/React.createElement("p", {
    className: "source-desc"
  }, s.desc))))), /*#__PURE__*/React.createElement("div", {
    className: "equipment-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sources-title"
  }, "\u6807\u51C6\u88C5\u5907 \xB7 STANDARD EQUIPMENT"), /*#__PURE__*/React.createElement("div", {
    className: "equipment-grid"
  }, equipment.map(eq => /*#__PURE__*/React.createElement("div", {
    key: eq.en,
    className: "equipment-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "equipment-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: eq.icon
  }))), /*#__PURE__*/React.createElement("div", {
    className: "equipment-name"
  }, eq.name), /*#__PURE__*/React.createElement("div", {
    className: "equipment-en"
  }, eq.en), /*#__PURE__*/React.createElement("p", {
    className: "equipment-desc"
  }, eq.desc))))), /*#__PURE__*/React.createElement("div", {
    className: "assimilation-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "assimilation-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "assimilation-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "assimilation-title"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "assimilation-warning-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
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
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "assimilation-title-text"
  }, "\u540C\u5316\u8B66\u544A"), /*#__PURE__*/React.createElement("div", {
    className: "assimilation-subtext"
  }, "ASSIMILATION WARNING \xB7 \u56DB\u9636\u6BB5\u6A21\u578B"))), /*#__PURE__*/React.createElement("span", {
    className: "classification eyes-only"
  }, "CRITICAL")), /*#__PURE__*/React.createElement("div", {
    className: "assimilation-stages"
  }, assimilationStages.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    className: `assim-stage assim-stage-${i + 1} stage-${i + 1}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "assim-stage-num mono"
  }, s.stage), /*#__PURE__*/React.createElement("div", {
    className: "assim-stage-name"
  }, s.name), /*#__PURE__*/React.createElement("div", {
    className: "assim-stage-level"
  }, "\u98CE\u9669\uFF1A", s.level), /*#__PURE__*/React.createElement("p", {
    className: "assim-stage-desc"
  }, s.desc)))), /*#__PURE__*/React.createElement("div", {
    className: "assim-footer-note"
  }, "IMAC \u7B2C17\u53F7\u901A\u4EE4\uFF1A\u540C\u5316\u8FDB\u5165\u7B2C\u4E09\u9636\u6BB5\u8005\uFF0C\u7ACB\u5373\u7EC8\u6B62\u4E00\u5207\u884C\u52A8\u8D44\u683C\uFF0C\u5F3A\u5236\u8FDB\u5165\u89C2\u5BDF\u4E0E\u6CBB\u7597\u7A0B\u5E8F\u3002"))))));
}
window.Walker = Walker;