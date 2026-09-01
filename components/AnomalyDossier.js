// AnomalyDossier - 通用异常档案模板组件
// 通过 data props 渲染完整异常档案（参考 LOA-0073 赤月学院档案结构）
function AnomalyDossier({
  data
}) {
  const {
    navigate
  } = useRouter();
  const detailCss = `
    .detail-page {
      padding-top: 64px;
      background-color: #08080a;
      min-height: 100vh;
    }
    .detail-auth-bar {
      background-color: var(--bg-deep);
      border-bottom: 1px solid var(--border-color);
      padding: 12px 0;
      position: sticky;
      top: 64px;
      z-index: 100;
    }
    .detail-auth-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .detail-auth-status {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-secondary);
    }
    .detail-auth-status .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--level-ordinary);
    }
    .detail-breadcrumbs {
      padding: 24px 0;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .detail-crumb {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-tertiary);
      cursor: pointer;
      letter-spacing: 0.1em;
      transition: color 0.2s ease;
    }
    .detail-crumb:hover { color: var(--accent-red-bright); }
    .detail-crumb.current {
      color: var(--text-primary);
      cursor: default;
    }
    .detail-crumb-sep {
      color: var(--text-muted);
      font-size: 12px;
    }
    .detail-body {
      padding: 40px 0 80px;
      position: relative;
    }
    .detail-file-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 2px solid var(--accent-red);
      flex-wrap: wrap;
      gap: 20px;
    }
    .detail-title-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .detail-file-id {
      font-family: var(--font-mono);
      font-size: 16px;
      font-weight: 700;
      color: var(--accent-red-bright);
      letter-spacing: 0.1em;
    }
    .detail-title {
      font-family: var(--font-serif);
      font-size: 42px;
      font-weight: 900;
      color: var(--text-primary);
      letter-spacing: 0.08em;
    }
    .detail-title-en {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--text-tertiary);
      letter-spacing: 0.2em;
    }
    .detail-info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 40px;
      background-color: rgba(20, 20, 24, 0.5);
      border: 1px solid var(--border-color);
    }
    .detail-info-table th, .detail-info-table td {
      padding: 14px 20px;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
      font-size: 14px;
    }
    .detail-info-table th {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 500;
      color: var(--text-tertiary);
      letter-spacing: 0.15em;
      text-transform: uppercase;
      background-color: rgba(139, 26, 26, 0.08);
      width: 18%;
      border-right: 1px solid var(--border-color);
    }
    .detail-info-table tr:last-child th,
    .detail-info-table tr:last-child td {
      border-bottom: none;
    }
    .level-badge-inline {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 4px 14px;
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.1em;
    }
    .level-badge-inline::before {
      content: "";
      width: 8px;
      height: 8px;
      background-color: currentColor;
      box-shadow: 0 0 8px currentColor;
    }
    .status-text {
      font-family: var(--font-mono);
      letter-spacing: 0.1em;
    }
    .status-active-text {
      color: var(--level-hazardous);
      font-family: var(--font-mono);
      letter-spacing: 0.1em;
    }
    .status-resolved-text {
      color: var(--level-ordinary);
      font-family: var(--font-mono);
      letter-spacing: 0.1em;
    }
    .survival-rate-red {
      color: var(--accent-red-bright);
      font-family: var(--font-mono);
      font-weight: 700;
    }
    .file-section { margin-bottom: 36px; }
    .file-section-header {
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 16px; padding-bottom: 10px;
      border-bottom: 1px solid var(--border-color);
    }
    .file-section-num {
      font-family: var(--font-mono); font-size: 12px;
      color: var(--accent-red-bright); letter-spacing: 0.1em;
      width: 40px;
    }
    .file-section-title {
      font-family: var(--font-serif); font-size: 20px;
      font-weight: 700; color: var(--text-primary);
    }
    .file-section-text {
      font-size: 14px; line-height: 1.9;
      color: var(--text-secondary); padding-left: 52px;
    }
    .file-section-text p { margin-bottom: 12px; }
    .file-section-text p:last-child { margin-bottom: 0; }
    .file-section-text strong { color: var(--text-primary); font-weight: 500; }
    .rules-list {
      display: flex; flex-direction: column; gap: 12px;
      padding-left: 52px;
    }
    .rule-item {
      display: flex; gap: 16px;
      padding: 16px 20px;
      background-color: rgba(20, 20, 24, 0.4);
      border-left: 3px solid;
    }
    .rule-item.verified { border-left-color: var(--level-ordinary); }
    .rule-item.speculated { border-left-color: var(--text-muted); }
    .rule-num {
      font-family: var(--font-serif); font-size: 24px;
      font-weight: 700; color: var(--text-tertiary);
      line-height: 1; flex-shrink: 0; width: 36px;
    }
    .rule-content { flex: 1; }
    .rule-title {
      font-size: 15px; font-weight: 600;
      color: var(--text-primary); margin-bottom: 4px;
      display: flex; align-items: center; gap: 10px;
    }
    .rule-tag {
      font-family: var(--font-mono); font-size: 10px;
      padding: 2px 8px; letter-spacing: 0.1em;
      border: 1px solid;
    }
    .rule-item.verified .rule-tag {
      color: var(--level-ordinary); border-color: var(--level-ordinary);
    }
    .rule-item.speculated .rule-tag {
      color: var(--text-muted); border-color: var(--text-muted);
    }
    .rule-desc {
      font-size: 13px; color: var(--text-secondary); line-height: 1.7;
    }
    .speculated-list {
      padding-left: 52px; list-style: none;
    }
    .speculated-list li {
      position: relative; padding-left: 20px;
      font-size: 13px; color: var(--text-tertiary); line-height: 1.8;
    }
    .speculated-list li::before {
      content: "?"; position: absolute; left: 0; top: 0;
      font-family: var(--font-mono); font-size: 12px;
      color: var(--text-muted);
    }
    .entry-records {
      width: calc(100% - 52px);
      margin-left: 52px;
      border-collapse: collapse;
      font-size: 13px;
    }
    .entry-records th {
      font-family: var(--font-mono); font-size: 11px;
      font-weight: 500; color: var(--text-tertiary);
      letter-spacing: 0.1em; text-transform: uppercase;
      padding: 12px 14px; text-align: left;
      border-bottom: 1px solid var(--border-color);
      background-color: rgba(139, 26, 26, 0.05);
    }
    .entry-records td {
      padding: 12px 14px;
      border-bottom: 1px solid rgba(42, 42, 50, 0.5);
      color: var(--text-secondary);
    }
    .entry-records tr:hover td {
      background-color: rgba(255, 255, 255, 0.02);
    }
    .entry-records .term {
      font-family: var(--font-serif); font-weight: 600;
      color: var(--text-primary);
    }
    .entry-records .count { font-family: var(--font-mono); }
    .entry-records .death { color: var(--accent-red-bright); }
    .entry-records .mixed { color: var(--level-hazardous); }
    .entry-records .assim { color: var(--level-unknown); }
    .entry-records .active { color: var(--accent-red-bright); }
    .entry-records .safe { color: var(--level-ordinary); }
    .current-tag {
      background-color: rgba(196, 40, 40, 0.15);
      border: 1px solid var(--accent-red-bright);
      color: var(--accent-red-bright);
      font-family: var(--font-mono);
      font-size: 9px;
      padding: 1px 5px;
      margin-left: 8px;
      letter-spacing: 0.1em;
      vertical-align: middle;
    }
    .current-members-row td {
      padding: 0 !important;
      border-bottom: 1px solid var(--border-color) !important;
      background-color: rgba(196, 40, 40, 0.04) !important;
    }
    .current-members-label {
      padding: 16px 20px 10px;
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-tertiary);
      letter-spacing: 0.2em;
    }
    .current-members-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      padding: 0 20px 20px;
    }
    .member-card {
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      padding: 12px 14px;
      position: relative;
      transition: all 0.2s ease;
    }
    .member-card.member-leader {
      border-color: var(--accent-red-bright);
      background: linear-gradient(135deg, rgba(196, 40, 40, 0.1), var(--bg-card));
    }
    .member-card.member-civilian {
      border-style: dashed;
      border-color: rgba(196, 154, 44, 0.5);
      background: linear-gradient(135deg, rgba(196, 154, 44, 0.05), var(--bg-card));
    }
    .member-name {
      font-family: var(--font-serif);
      font-size: 15px;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .member-leader-tag {
      font-family: var(--font-mono);
      font-size: 9px;
      font-weight: 600;
      color: var(--accent-red-bright);
      border: 1px solid var(--accent-red-bright);
      padding: 1px 5px;
      letter-spacing: 0.1em;
      line-height: 1.4;
    }
    .member-civilian-tag {
      font-family: var(--font-mono);
      font-size: 9px;
      font-weight: 500;
      color: #c49a2c;
      border: 1px solid rgba(196, 154, 44, 0.6);
      padding: 1px 5px;
      letter-spacing: 0.1em;
      line-height: 1.4;
    }
    .member-civilian .member-rank { color: #c49a2c; }
    .member-rank {
      font-size: 11px;
      color: var(--accent-red-bright);
      font-family: var(--font-mono);
      letter-spacing: 0.05em;
      margin-bottom: 6px;
    }
    .member-org { font-size: 11px; color: var(--text-tertiary); margin-bottom: 2px; }
    .member-role { font-size: 11px; color: var(--text-secondary); }
    .phenomena-list {
      padding-left: 52px; list-style: none;
    }
    .phenomena-list li {
      position: relative; padding-left: 24px;
      font-size: 13px; color: var(--text-secondary);
      line-height: 1.8; margin-bottom: 8px;
    }
    .phenomena-list li::before {
      content: "◆"; position: absolute; left: 0; top: 0;
      color: var(--accent-red-bright); font-size: 10px;
    }
    .phenomena-list strong { color: var(--text-primary); }
    .note-box {
      margin-left: 52px;
      padding: 20px 24px;
      background-color: rgba(139, 26, 26, 0.05);
      border: 1px solid rgba(196, 40, 40, 0.3);
      position: relative;
    }
    .note-box::before {
      content: "IMAC NOTE";
      position: absolute; top: -10px; left: 20px;
      background-color: #08080a;
      padding: 0 10px;
      font-family: var(--font-mono); font-size: 10px;
      color: var(--accent-red-bright); letter-spacing: 0.15em;
    }
    .note-text {
      font-size: 13px; color: var(--text-secondary);
      line-height: 1.8; font-style: italic;
    }
    .action-list {
      padding-left: 52px; list-style: none;
    }
    .action-list li {
      position: relative; padding-left: 24px;
      font-size: 13px; color: var(--text-secondary);
      line-height: 1.8; margin-bottom: 8px;
    }
    .action-list li::before {
      content: "→"; position: absolute; left: 0; top: 0;
      color: var(--level-hazardous); font-family: var(--font-mono);
    }
    .internal-note {
      margin-left: 52px; margin-top: 20px;
      padding: 20px 24px;
      background-color: rgba(122, 58, 176, 0.05);
      border: 1px solid rgba(122, 58, 176, 0.3);
      position: relative;
    }
    .internal-note::before {
      content: "内部评估 · INTERNAL";
      position: absolute; top: -10px; left: 20px;
      background-color: #08080a;
      padding: 0 10px;
      font-family: var(--font-mono); font-size: 10px;
      color: var(--level-unknown); letter-spacing: 0.15em;
    }
    .internal-note-text {
      font-size: 13px; color: var(--text-secondary); line-height: 1.8;
    }
    .internal-note-signature {
      margin-top: 12px; text-align: right;
      font-family: var(--font-serif); font-size: 13px;
      color: var(--text-tertiary); font-style: italic;
    }
    .file-footer {
      margin-top: 50px; padding-top: 20px;
      border-top: 2px solid var(--accent-red);
      display: flex; justify-content: space-between;
      align-items: center; flex-wrap: wrap; gap: 16px;
    }
    .file-meta {
      font-family: var(--font-mono); font-size: 11px;
      color: var(--text-muted); letter-spacing: 0.1em;
    }
    .file-archive-notice {
      margin-top: 18px;
      padding: 14px 18px;
      border: 1px solid rgba(196, 40, 40, 0.25);
      background: rgba(196, 40, 40, 0.04);
      font-size: 12px;
      color: var(--text-tertiary);
      line-height: 1.7;
    }
    .file-archive-signature {
      margin-top: 6px;
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--accent-red-bright);
      text-align: right;
      letter-spacing: 0.05em;
    }
    .stair-map {
      margin-left: 52px;
      border: 1px solid var(--border-color);
      background: linear-gradient(180deg, #0c0c10, #0a0a0e);
      padding: 16px;
    }
    @media (max-width: 1024px) {
      .file-section-text, .rules-list,
      .speculated-list, .phenomena-list, .action-list, .note-box, .internal-note, .stair-map {
        padding-left: 0; margin-left: 0;
      }
      .entry-records { margin-left: 0; width: 100%; }
      .detail-info-table th { width: 25%; }
    }
    @media (max-width: 768px) {
      .detail-title { font-size: 28px; }
      .detail-file-header { flex-direction: column; align-items: flex-start; }
      .detail-info-table { display: block; overflow-x: auto; }
      .entry-records { display: block; overflow-x: auto; white-space: nowrap; }
      .detail-auth-inner, .container { padding: 0 16px; }
      .current-members-grid { grid-template-columns: 1fr 1fr; }
      /* 备注 / 内部评估：移动端紧凑排版，标签不溢出 */
      .note-box, .internal-note { padding: 16px 14px; }
      .note-box::before, .internal-note::before { left: 12px; }
      .note-text, .internal-note-text { font-size: 13px; line-height: 1.7; }
      .action-list { padding-left: 0; }
      .action-list li { padding-left: 22px; font-size: 13px; line-height: 1.7; }
      .internal-note-signature { text-align: left; margin-top: 14px; }
    }
    @media (max-width: 480px) {
      .note-box, .internal-note { padding: 14px 12px; }
      .note-box::before, .internal-note::before { top: -8px; padding: 0 8px; font-size: 9px; }
      .note-text, .internal-note-text { font-size: 12.5px; line-height: 1.75; }
    }
  `;

  // 组装信息表行
  const infoRows = data.info || [];
  let sectionNo = 0;
  const nextNum = () => {
    sectionNo += 1;
    return String(sectionNo).padStart(2, "0");
  };

  // 等级/状态颜色映射（等级与状态按各自类型着色）
  const levelColors = {
    safe: "#3fb8a4",
    ordinary: "#4a7c59",
    hazardous: "#c49a2c",
    doomed: "#d46828",
    abyssal: "#c42828",
    unknown: "#7a3ab0"
  };
  const statusColors = {
    active: "#c42828",
    resolved: "#4a7c59",
    dormant: "#6a7a8c",
    safe: "#4a7c59",
    applied: "#3fb8a4",
    quarantined: "#7a3ab0"
  };
  const renderCell = v => {
    if (v && typeof v === "object") {
      if (v.levelKey) {
        const c = levelColors[v.levelKey] || "#c42828";
        return /*#__PURE__*/React.createElement("span", {
          className: "level-badge-inline",
          style: {
            backgroundColor: c + "26",
            border: "1px solid " + c,
            color: c
          }
        }, v.text);
      }
      if (v.statusKey) {
        const c = statusColors[v.statusKey] || "#c42828";
        return /*#__PURE__*/React.createElement("span", {
          className: "status-text",
          style: {
            color: c
          }
        }, v.text);
      }
    }
    return v;
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, detailCss), /*#__PURE__*/React.createElement("div", {
    className: "detail-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-auth-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-auth-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-auth-status"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, "\u5DF2\u8BA4\u8BC1 \xB7 \u8BBF\u95EE\u7EA7\u522B\uFF1A\u6807\u51C6 / ACCESS LEVEL: STANDARD")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      color: "var(--text-muted)",
      cursor: "pointer",
      letterSpacing: "0.1em"
    },
    onClick: () => navigate("/")
  }, "\u9000\u51FA\u8BA4\u8BC1"))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-breadcrumbs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-crumb",
    onClick: () => navigate("/")
  }, "\u9996\u9875"), /*#__PURE__*/React.createElement("span", {
    className: "detail-crumb-sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "detail-crumb",
    onClick: () => navigate("/database")
  }, "\u5F02\u5E38\u4FE1\u606F\u6570\u636E\u5E93"), /*#__PURE__*/React.createElement("span", {
    className: "detail-crumb-sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "detail-crumb current"
  }, data.id, " ", data.name)), /*#__PURE__*/React.createElement("div", {
    className: "detail-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-file-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-file-id"
  }, data.id), /*#__PURE__*/React.createElement("h1", {
    className: "detail-title"
  }, data.name), /*#__PURE__*/React.createElement("span", {
    className: "detail-title-en"
  }, data.nameEn)), /*#__PURE__*/React.createElement("div", {
    className: "stamp"
  }, data.stamp || "机密 · CONFIDENTIAL")), /*#__PURE__*/React.createElement("table", {
    className: "detail-info-table"
  }, /*#__PURE__*/React.createElement("tbody", null, infoRows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("th", null, r[0]), /*#__PURE__*/React.createElement("td", null, renderCell(r[1])), /*#__PURE__*/React.createElement("th", null, r[2]), /*#__PURE__*/React.createElement("td", null, renderCell(r[3])))), data.extraRow && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, data.extraRow.label), /*#__PURE__*/React.createElement("td", {
    style: {
      color: "var(--accent-red-bright)"
    },
    colSpan: 3
  }, data.extraRow.value)))), data.discovery && /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 ", nextNum()), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u53D1\u73B0\u7ECF\u8FC7")), /*#__PURE__*/React.createElement("div", {
    className: "file-section-text"
  }, data.discovery.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i
  }, p)))), data.features && /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 ", nextNum()), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u57FA\u672C\u7279\u5F81")), /*#__PURE__*/React.createElement("div", {
    className: "file-section-text"
  }, data.features.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    dangerouslySetInnerHTML: {
      __html: p
    }
  })))), data.mapNode && /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 ", nextNum()), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u5185\u90E8\u73AF\u5883 \xB7 \u7ED3\u6784\u793A\u610F\u56FE"), data.mapTag && /*#__PURE__*/React.createElement("span", {
    className: "tag danger"
  }, data.mapTag)), data.mapNode), data.verifiedRules && data.verifiedRules.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 ", nextNum()), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u5DF2\u786E\u8BA4\u89C4\u5219"), /*#__PURE__*/React.createElement("span", {
    className: "tag verified"
  }, "\u5DF2\u9A8C\u8BC1 \xB7 VERIFIED")), /*#__PURE__*/React.createElement("div", {
    className: "rules-list"
  }, data.verifiedRules.map(rule => /*#__PURE__*/React.createElement("div", {
    key: rule.num,
    className: "rule-item verified"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rule-num"
  }, rule.num), /*#__PURE__*/React.createElement("div", {
    className: "rule-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rule-title"
  }, "\u89C4\u5219", rule.num, "\uFF1A", rule.title, /*#__PURE__*/React.createElement("span", {
    className: "rule-tag"
  }, "\u5DF2\u9A8C\u8BC1")), /*#__PURE__*/React.createElement("p", {
    className: "rule-desc"
  }, rule.desc)))))), data.speculatedRules && data.speculatedRules.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 ", nextNum()), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u63A8\u6D4B\u89C4\u5219"), /*#__PURE__*/React.createElement("span", {
    className: "tag pending"
  }, "\u5F85\u9A8C\u8BC1 \xB7 UNCONFIRMED")), /*#__PURE__*/React.createElement("ul", {
    className: "speculated-list"
  }, data.speculatedRules.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, r)))), data.entryRecords && data.entryRecords.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 ", nextNum()), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u8FDB\u5165\u8BB0\u5F55")), /*#__PURE__*/React.createElement("table", {
    className: "entry-records"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u6279\u6B21"), /*#__PURE__*/React.createElement("th", null, "\u5E74\u4EFD"), /*#__PURE__*/React.createElement("th", null, "\u8FDB\u5165\u4EBA\u6570"), /*#__PURE__*/React.createElement("th", null, "\u4E3B\u5BFC\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("th", null, "\u7ED3\u679C"))), /*#__PURE__*/React.createElement("tbody", null, data.entryRecords.map(rec => /*#__PURE__*/React.createElement(React.Fragment, {
    key: rec.term
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    className: "term"
  }, rec.term, rec.current && /*#__PURE__*/React.createElement("span", {
    className: "current-tag"
  }, "\u5F53\u524D")), /*#__PURE__*/React.createElement("td", null, rec.year), /*#__PURE__*/React.createElement("td", {
    className: "count"
  }, rec.count), /*#__PURE__*/React.createElement("td", null, rec.org), /*#__PURE__*/React.createElement("td", {
    className: rec.status
  }, rec.result)), rec.current && rec.members && /*#__PURE__*/React.createElement("tr", {
    className: "current-members-row"
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: 5
  }, /*#__PURE__*/React.createElement("div", {
    className: "current-members-label"
  }, "\u961F\u5458\u6784\u6210 \xB7 TEAM ROSTER"), /*#__PURE__*/React.createElement("div", {
    className: "current-members-grid"
  }, rec.members.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `member-card ${m.isLeader ? "member-leader" : ""} ${m.orgType === "civilian" ? "member-civilian" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "member-name"
  }, m.name, m.isLeader && /*#__PURE__*/React.createElement("span", {
    className: "member-leader-tag"
  }, "\u961F\u957F"), m.orgType === "civilian" && /*#__PURE__*/React.createElement("span", {
    className: "member-civilian-tag"
  }, "\u5E73\u6C11")), /*#__PURE__*/React.createElement("div", {
    className: "member-rank"
  }, m.rank), /*#__PURE__*/React.createElement("div", {
    className: "member-org"
  }, m.org), /*#__PURE__*/React.createElement("div", {
    className: "member-role"
  }, m.role))))))))))), data.phenomena && data.phenomena.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 ", nextNum()), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u7279\u6B8A\u73B0\u8C61")), /*#__PURE__*/React.createElement("ul", {
    className: "phenomena-list"
  }, data.phenomena.map((p, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    dangerouslySetInnerHTML: {
      __html: p
    }
  })))), data.imacNote && /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 ", nextNum()), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u5907\u6CE8")), /*#__PURE__*/React.createElement("div", {
    className: "note-box"
  }, /*#__PURE__*/React.createElement("p", {
    className: "note-text"
  }, data.imacNote), data.suggestedActions && data.suggestedActions.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "14px",
      paddingTop: "12px",
      borderTop: "1px dashed rgba(196, 40, 40, 0.2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      color: "var(--accent-red-bright)",
      letterSpacing: "0.15em",
      marginBottom: "8px"
    }
  }, "\u5EFA\u8BAE\u540E\u7EED\u884C\u52A8"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: "20px",
      listStyle: "none"
    }
  }, data.suggestedActions.map((a, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      position: "relative",
      paddingLeft: "18px",
      fontSize: "12px",
      color: "var(--text-secondary)",
      lineHeight: "1.8"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      color: "var(--level-hazardous)",
      fontFamily: "var(--font-mono)"
    }
  }, "\u2192"), a))))), data.internalNode && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "20px"
    }
  }, data.internalNode)), /*#__PURE__*/React.createElement("div", {
    className: "file-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-meta"
  }, "FILE ID: ", data.id, " / VER: ", data.ver || "39.2", " / CLASSIFICATION: ", data.classification || "CONFIDENTIAL"), /*#__PURE__*/React.createElement("div", {
    className: "file-meta"
  }, "LAST UPDATED: ", data.updated)), /*#__PURE__*/React.createElement("div", {
    className: "file-archive-notice"
  }, "\u672C\u6863\u6848\u5DF2\u7EB3\u5165 IMAC \u5168\u7403\u5F02\u5E38\u4FE1\u606F\u603B\u5E93\uFF0C\u672A\u7ECF IMAC \u8054\u5408\u884C\u52A8\u6307\u6325\u4E2D\u5FC3\u6388\u6743\uFF0C\u4E0D\u5F97\u64C5\u81EA\u590D\u5236\u6216\u4F20\u64AD\u3002", /*#__PURE__*/React.createElement("div", {
    className: "file-archive-signature"
  }, "\u2014\u2014 IMAC \u5F02\u5E38\u4FE1\u606F\u603B\u5E93 \xB7 ", data.archiveDate || "安珀历39年春"))))));
}
window.AnomalyDossier = AnomalyDossier;