// Mission History page for internal staff
function MissionsPage() {
  const { navigate } = useRouter();
  const { canAccess, authLevel } = useAuth();
  const [filter, setFilter] = React.useState("all");
  const [expandedId, setExpandedId] = React.useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!canAccess("internal")) {
    return (
      <div className="portal-denied">
        <div className="container">
          <div className="denied-box">
            <h2>权限不足</h2>
            <p>此页面仅限内部人员访问。</p>
            <button className="btn-primary" onClick={() => navigate("/auth")}>前往认证</button>
          </div>
        </div>
      </div>
    );
  }

  const isTopSecret = authLevel === "topsecret";

  const missions = [
    {
      id: "M-3908",
      code: "PHA-0182",
      name: "洛林自由市边境裂隙",
      type: "联合响应",
      date: "安珀历39年·秋·06",
      role: "总指挥",
      result: "进行中",
      resultClass: "ongoing",
      duration: "持续中",
      note: "多国联合三级响应，现场情况稳定，预计两周内完成封堵。",
    },
    {
      id: "M-3907",
      code: "LOA-0073",
      name: "赤月学院 · 第十一届行动",
      type: "联合响应",
      date: "安珀历39年·夏·12",
      role: "副指挥",
      result: "进行中",
      resultClass: "ongoing",
      duration: "持续中",
      note: "衔尾蛇事务所主导，已完成主体区域测绘，核心区域待突破。",
      featured: true,
    },
    {
      id: "M-3906",
      code: "CGA-0199",
      name: "回音巷认知异常",
      type: "常规调查",
      date: "安珀历39年·夏·03",
      role: "队员",
      result: "已解决",
      resultClass: "resolved",
      duration: "7 天",
      note: "成功解析叙事型规则，引导平民安全撤离，无人员伤亡。",
    },
    {
      id: "M-3905",
      code: "SPA-0312",
      name: "鸣海城地铁循环事件",
      type: "紧急支援",
      date: "安珀历38年·冬·21",
      role: "总指挥",
      result: "已解决",
      resultClass: "resolved",
      duration: "14 天",
      note: "空间折叠型异常，指挥27人小队完成1,200名平民撤离，生存率98.7%。",
    },
    {
      id: "M-3804",
      code: "TMB-0089",
      name: "白松城冻土层时间停滞",
      type: "常规调查",
      date: "安珀历38年·秋·15",
      role: "副指挥",
      result: "已解决",
      resultClass: "resolved",
      duration: "21 天",
      note: "时间流速异常，内部3天对应外部21天。成功建立锚点并撤出全部人员。",
    },
    {
      id: "M-3803",
      code: "ENA-0067",
      name: "雾中列车实体事件",
      type: "紧急支援",
      date: "安珀历38年·夏·08",
      role: "队员",
      result: "部分解决",
      resultClass: "partial",
      duration: "11 天",
      note: "实体暂时被压制但未消灭，列车仍在固定路线行驶，平民已疏散。",
    },
    {
      id: "M-3802",
      code: "PHB-0256",
      name: "引力井物理异常",
      type: "常规调查",
      date: "安珀历38年·春·19",
      role: "队员",
      result: "已解决",
      resultClass: "resolved",
      duration: "9 天",
      note: "局部重力反转，物理法则扭曲。晨星团支援提供数学模型，成功定位核心。",
    },
    {
      id: "M-3701",
      code: "SPA-0021",
      name: "无尽楼梯空间异常",
      type: "常规调查",
      date: "安珀历37年·冬·02",
      role: "队员",
      result: "已解决",
      resultClass: "resolved",
      duration: "5 天",
      note: "首次独立完成异常规则解析，获当月最佳新人提名。",
    },
  ];

  const filtered = missions.filter((m) => {
    if (filter === "all") return true;
    if (filter === "resolved") return m.result === "已解决";
    if (filter === "joint") return m.type === "联合响应";
    if (filter === "abyssal") return m.featured;
    return true;
  });

  const filters = [
    { key: "all", label: "全部" },
    { key: "resolved", label: "已解决" },
    { key: "joint", label: "联合行动" },
    { key: "abyssal", label: "深渊级" },
  ];

  const total = missions.length;
  const resolved = missions.filter((m) => m.result === "已解决").length;
  const successRate = Math.round((resolved / total) * 100);
  const avgDuration = "12 天";

  return (
    <>
      <style>{`
        .missions-page {
          background-color: var(--bg-deep);
          color: var(--text-primary);
          min-height: calc(100vh - 64px);
          padding-top: 80px;
          padding-bottom: 60px;
        }
        .mission-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        .mission-breadcrumb .crumb-link {
          cursor: pointer;
          color: var(--accent-red-bright);
        }
        .page-title {
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .page-title-en {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          margin-bottom: 28px;
        }
        .mission-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }
        .summary-card {
          padding: 20px 24px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
        }
        .summary-card-num {
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
        }
        .summary-card-label {
          font-size: 11px;
          color: var(--text-tertiary);
          margin-top: 8px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }
        .filter-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .filter-tab {
          padding: 8px 18px;
          font-size: 12px;
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          background-color: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .filter-tab:hover { border-color: var(--accent-red-bright); color: var(--accent-red-bright); }
        .filter-tab.active {
          background-color: var(--accent-red-bright);
          border-color: var(--accent-red-bright);
          color: #fff;
        }
        .mission-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 28px;
        }
        .mission-item {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mission-item:hover { border-color: var(--accent-red-bright); }
        .mission-item-head {
          display: grid;
          grid-template-columns: 120px 1.5fr 100px 140px 120px 100px 24px;
          gap: 16px;
          padding: 18px 24px;
          align-items: center;
        }
        .mission-code {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent-red-bright);
          letter-spacing: 0.05em;
        }
        .mission-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .mission-type {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .mission-date {
          font-size: 12px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .mission-role {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .mission-result {
          font-size: 11px;
          font-weight: 600;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .mission-result.resolved { color: var(--level-ordinary); }
        .mission-result.partial { color: var(--level-hazardous); }
        .mission-result.ongoing { color: var(--level-doomsday); }
        .mission-arrow {
          color: var(--text-muted);
          transition: transform 0.2s ease;
        }
        .mission-item.expanded .mission-arrow { transform: rotate(180deg); color: var(--accent-red-bright); }
        .mission-detail {
          padding: 0 24px 20px;
          border-top: 1px solid var(--border-color);
          display: none;
        }
        .mission-item.expanded .mission-detail { display: block; }
        .mission-detail-inner {
          padding-top: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .mission-detail-section h4 {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .mission-detail-section p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
        }
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background-color: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .back-btn:hover {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }
        @media (max-width: 1024px) {
          .mission-item-head {
            grid-template-columns: 100px 1fr 80px 100px 24px;
          }
          .mission-role, .mission-type { display: none; }
        }
        @media (max-width: 640px) {
          .mission-summary { grid-template-columns: 1fr 1fr; }
          .mission-item-head {
            grid-template-columns: auto 1fr auto 24px;
            gap: 10px;
            padding: 14px 16px;
          }
          .mission-date { display: none; }
          .mission-code { font-size: 11px; }
          .mission-name { font-size: 13px; }
          .page-title { font-size: 24px; }
          .mission-detail-inner { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="missions-page">
        <div className="container">
          <div className="mission-breadcrumb">
            <span className="crumb-link" onClick={() => navigate("/portal")}>内部指挥中心</span>
            <span>/</span>
            <span>任务历史</span>
          </div>

          <h1 className="page-title">任务历史</h1>
          <div className="page-title-en">MISSION HISTORY</div>

          <div className="mission-summary">
            <div className="summary-card">
              <div className="summary-card-num">{total}</div>
              <div className="summary-card-label">总任务数</div>
            </div>
            <div className="summary-card">
              <div className="summary-card-num">{successRate}%</div>
              <div className="summary-card-label">任务成功率</div>
            </div>
            <div className="summary-card">
              <div className="summary-card-num">{avgDuration}</div>
              <div className="summary-card-label">平均任务时长</div>
            </div>
          </div>

          <div className="filter-bar">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`filter-tab ${filter === f.key ? "active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="mission-list">
            {filtered.map((m) => (
              <div
                key={m.id}
                className={`mission-item ${expandedId === m.id ? "expanded" : ""}`}
                onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}
              >
                <div className="mission-item-head">
                  <span className="mission-code">{m.code}</span>
                  <span className="mission-name">{m.name}</span>
                  <span className="mission-type">{m.type}</span>
                  <span className="mission-date">{m.date}</span>
                  <span className="mission-role">{m.role}</span>
                  <span className={`mission-result ${m.resultClass}`}>{m.result}</span>
                  <svg className="mission-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                <div className="mission-detail">
                  <div className="mission-detail-inner">
                    <div className="mission-detail-section">
                      <h4>任务编号</h4>
                      <p>{m.id}</p>
                    </div>
                    <div className="mission-detail-section">
                      <h4>担任角色</h4>
                      <p>{m.role}</p>
                    </div>
                    <div className="mission-detail-section">
                      <h4>任务时长</h4>
                      <p>{m.duration}</p>
                    </div>
                    <div className="mission-detail-section">
                      <h4>任务结果</h4>
                      <p style={{ color: m.resultClass === "resolved" ? "var(--level-ordinary)" : m.resultClass === "partial" ? "var(--level-hazardous)" : "var(--level-doomsday)" }}>{m.result}</p>
                    </div>
                    <div className="mission-detail-section" style={{ gridColumn: "1 / -1" }}>
                      <h4>任务备注</h4>
                      <p>{m.note}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="back-btn" onClick={() => navigate("/portal")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5 M12 19l-7-7 7-7"/>
            </svg>
            返回指挥中心
          </button>
        </div>
      </div>
    </>
  );
}

window.MissionsPage = MissionsPage;
