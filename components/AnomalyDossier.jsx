// AnomalyDossier - 通用异常档案模板组件
// 通过 data props 渲染完整异常档案（参考 LOA-0073 赤月学院档案结构）
function AnomalyDossier({ data }) {
  const { navigate } = useRouter();

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
    ordinary: "#4a7c59",
    hazardous: "#c49a2c",
    doomed: "#d46828",
    abyssal: "#c42828",
    unknown: "#7a3ab0",
  };
  const statusColors = {
    active: "#c42828",
    resolved: "#4a7c59",
    dormant: "#6a7a8c",
    safe: "#4a7c59",
    quarantined: "#7a3ab0",
  };
  const renderCell = (v) => {
    if (v && typeof v === "object") {
      if (v.levelKey) {
        const c = levelColors[v.levelKey] || "#c42828";
        return (
          <span className="level-badge-inline" style={{ backgroundColor: c + "26", border: "1px solid " + c, color: c }}>
            {v.text}
          </span>
        );
      }
      if (v.statusKey) {
        const c = statusColors[v.statusKey] || "#c42828";
        return <span className="status-text" style={{ color: c }}>{v.text}</span>;
      }
    }
    return v;
  };

  return (
    <>
      <style>{detailCss}</style>
      <div className="detail-page">
        <div className="detail-auth-bar">
          <div className="detail-auth-inner">
            <div className="detail-auth-status">
              <div className="dot"></div>
              <span>已认证 · 访问级别：标准 / ACCESS LEVEL: STANDARD</span>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", cursor: "pointer", letterSpacing: "0.1em" }} onClick={() => navigate("/")}>
              退出认证
            </span>
          </div>
        </div>

        <div className="container">
          <div className="detail-breadcrumbs">
            <span className="detail-crumb" onClick={() => navigate("/")}>首页</span>
            <span className="detail-crumb-sep">/</span>
            <span className="detail-crumb" onClick={() => navigate("/database")}>异常信息数据库</span>
            <span className="detail-crumb-sep">/</span>
            <span className="detail-crumb current">{data.id} {data.name}</span>
          </div>

          <div className="detail-body">
            <div className="detail-file-header">
              <div className="detail-title-group">
                <span className="detail-file-id">{data.id}</span>
                <h1 className="detail-title">{data.name}</h1>
                <span className="detail-title-en">{data.nameEn}</span>
              </div>
              <div className="stamp">{data.stamp || "机密 · CONFIDENTIAL"}</div>
            </div>

            <table className="detail-info-table">
              <tbody>
                {infoRows.map((r, i) => (
                  <tr key={i}>
                    <th>{r[0]}</th><td>{renderCell(r[1])}</td>
                    <th>{r[2]}</th><td>{renderCell(r[3])}</td>
                  </tr>
                ))}
                {data.extraRow && (
                  <tr>
                    <th>{data.extraRow.label}</th>
                    <td style={{ color: "var(--accent-red-bright)" }} colSpan={3}>{data.extraRow.value}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {data.discovery && (
              <div className="file-section">
                <div className="file-section-header">
                  <span className="file-section-num mono">§ {nextNum()}</span>
                  <span className="file-section-title">发现经过</span>
                </div>
                <div className="file-section-text">
                  {data.discovery.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            )}

            {data.features && (
              <div className="file-section">
                <div className="file-section-header">
                  <span className="file-section-num mono">§ {nextNum()}</span>
                  <span className="file-section-title">基本特征</span>
                </div>
                <div className="file-section-text">
                  {data.features.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
                </div>
              </div>
            )}

            {data.mapNode && (
              <div className="file-section">
                <div className="file-section-header">
                  <span className="file-section-num mono">§ {nextNum()}</span>
                  <span className="file-section-title">{data.mapTitle || "内部环境 · 结构示意图"}</span>
                  {data.mapTag && <span className="tag danger">{data.mapTag}</span>}
                </div>
                {data.mapNode}
              </div>
            )}

            {data.verifiedRules && data.verifiedRules.length > 0 && (
              <div className="file-section">
                <div className="file-section-header">
                  <span className="file-section-num mono">§ {nextNum()}</span>
                  <span className="file-section-title">已确认规则</span>
                  <span className="tag verified">已验证 · VERIFIED</span>
                </div>
                <div className="rules-list">
                  {data.verifiedRules.map((rule) => (
                    <div key={rule.num} className="rule-item verified">
                      <div className="rule-num">{rule.num}</div>
                      <div className="rule-content">
                        <div className="rule-title">
                          规则{rule.num}：{rule.title}
                          <span className="rule-tag">已验证</span>
                        </div>
                        <p className="rule-desc">{rule.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.speculatedRules && data.speculatedRules.length > 0 && (
              <div className="file-section">
                <div className="file-section-header">
                  <span className="file-section-num mono">§ {nextNum()}</span>
                  <span className="file-section-title">推测规则</span>
                  <span className="tag pending">待验证 · UNCONFIRMED</span>
                </div>
                <ul className="speculated-list">
                  {data.speculatedRules.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            )}

            {data.entryRecords && data.entryRecords.length > 0 && (
              <div className="file-section">
                <div className="file-section-header">
                  <span className="file-section-num mono">§ {nextNum()}</span>
                  <span className="file-section-title">{data.recordsTitle || "进入记录"}</span>
                </div>
                <table className="entry-records">
                  <thead>
                    <tr>
                      <th>批次</th><th>年份</th><th>进入人数</th><th>主导组织</th><th>结果</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.entryRecords.map((rec) => (
                      <React.Fragment key={rec.term}>
                        <tr>
                          <td className="term">{rec.term}{rec.current && <span className="current-tag">当前</span>}</td>
                          <td>{rec.year}</td>
                          <td className="count">{rec.count}</td>
                          <td>{rec.org}</td>
                          <td className={rec.status}>{rec.result}</td>
                        </tr>
                        {rec.current && rec.members && (
                          <tr className="current-members-row">
                            <td colSpan={5}>
                              <div className="current-members-label">队员构成 · TEAM ROSTER</div>
                              <div className="current-members-grid">
                                {rec.members.map((m, i) => (
                                  <div key={i} className={`member-card ${m.isLeader ? "member-leader" : ""} ${m.orgType === "civilian" ? "member-civilian" : ""}`}>
                                    <div className="member-name">
                                      {m.name}
                                      {m.isLeader && <span className="member-leader-tag">队长</span>}
                                      {m.orgType === "civilian" && <span className="member-civilian-tag">平民</span>}
                                    </div>
                                    <div className="member-rank">{m.rank}</div>
                                    <div className="member-org">{m.org}</div>
                                    <div className="member-role">{m.role}</div>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {data.phenomena && data.phenomena.length > 0 && (
              <div className="file-section">
                <div className="file-section-header">
                  <span className="file-section-num mono">§ {nextNum()}</span>
                  <span className="file-section-title">特殊现象</span>
                </div>
                <ul className="phenomena-list">
                  {data.phenomena.map((p, i) => <li key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
                </ul>
              </div>
            )}

            {data.imacNote && (data.survivalRate ?? 0) < 50 && (
              <div className="file-section">
                <div className="file-section-header">
                  <span className="file-section-num mono">§ {nextNum()}</span>
                  <span className="file-section-title">备注</span>
                </div>
                <div className="note-box">
                  <p className="note-text">{data.imacNote}</p>
                  {data.suggestedActions && data.suggestedActions.length > 0 && (
                    <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px dashed rgba(196, 40, 40, 0.2)" }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent-red-bright)", letterSpacing: "0.15em", marginBottom: "8px" }}>
                        建议后续行动
                      </div>
                      <ul style={{ margin: 0, paddingLeft: "20px", listStyle: "none" }}>
                        {data.suggestedActions.map((a, i) => (
                          <li key={i} style={{ position: "relative", paddingLeft: "18px", fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.8" }}>
                            <span style={{ position: "absolute", left: 0, color: "var(--level-hazardous)", fontFamily: "var(--font-mono)" }}>→</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {data.internalNode && (
                  <div style={{ marginTop: "20px" }}>{data.internalNode}</div>
                )}
              </div>
            )}

            <div className="file-footer">
              <div className="file-meta">FILE ID: {data.id} / VER: {data.ver || "39.2"} / CLASSIFICATION: {data.classification || "CONFIDENTIAL"}</div>
              <div className="file-meta">LAST UPDATED: {data.updated}</div>
            </div>

            <div className="file-archive-notice">
              本档案已纳入 IMAC 全球异常信息总库，未经 IMAC 联合行动指挥中心授权，不得擅自复制或传播。
              <div className="file-archive-signature">—— IMAC 异常信息总库 · {data.archiveDate || "安珀历39年春"}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

window.AnomalyDossier = AnomalyDossier;
