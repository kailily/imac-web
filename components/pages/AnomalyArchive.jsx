// Anomaly Archive List Page
function AnomalyArchivePage({ routeQuery }) {
  const { navigate } = useRouter();
  const [filter, setFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");

  const anomalies = [
    {
      id: "LOA-0001",
      name: "灰港仓库",
      nameEn: "Harbor Warehouse",
      level: "doomed",
      levelText: "厄运级",
      category: "LO",
      categoryName: "地点类",
      org: "衔尾蛇事务所",
      status: "active",
      statusText: "活跃",
      survival: "11%",
      firstRecord: "安珀历元年",
      featured: true,
    },
    {
      id: "LOA-0073",
      name: "赤月学院",
      nameEn: "Crimson Moon Academy",
      level: "abyssal",
      levelText: "深渊级",
      accessLevel: "internal",
      category: "LO",
      categoryName: "地点类",
      org: "衔尾蛇事务所",
      status: "active",
      statusText: "活跃",
      survival: "1.9%",
      firstRecord: "安珀历28年",
      featured: true,
    },
    {
      id: "SPA-0021",
      name: "无尽楼梯",
      nameEn: "Endless Stairwell",
      level: "hazardous",
      levelText: "危险级",
      category: "SP",
      categoryName: "空间类",
      org: "边界研究院",
      status: "active",
      statusText: "活跃",
      survival: "23%",
      firstRecord: "安珀历12年",
      featured: false,
    },
    {
      id: "TMA-0045",
      name: "雾中列车",
      nameEn: "Fog Train",
      level: "doomed",
      levelText: "厄运级",
      category: "TM",
      categoryName: "时间类",
      org: "长桥会社",
      status: "active",
      statusText: "活跃",
      survival: "8%",
      firstRecord: "安珀历19年",
      featured: false,
    },
    {
      id: "TMB-0117",
      name: "冰封哨站",
      nameEn: "Frozen Outpost",
      level: "hazardous",
      levelText: "危险级",
      category: "TM",
      categoryName: "时间类",
      org: "北境守望",
      status: "resolved",
      statusText: "已解决",
      survival: "31%",
      firstRecord: "安珀历15年",
      featured: false,
    },
    {
      id: "SPB-0089",
      name: "镜像医院",
      nameEn: "Mirror Hospital",
      level: "doomed",
      levelText: "厄运级",
      category: "SP",
      categoryName: "空间类",
      org: "晨星团",
      status: "active",
      statusText: "活跃",
      survival: "12%",
      firstRecord: "安珀历22年",
      featured: false,
    },
    {
      id: "CGA-0003",
      name: "回音巷",
      nameEn: "Echo Alley",
      level: "ordinary",
      levelText: "常规级",
      category: "CG",
      categoryName: "认知类",
      org: "悬铃木学会",
      status: "resolved",
      statusText: "已解决",
      survival: "67%",
      firstRecord: "安珀历9年",
      featured: false,
    },
    {
      id: "LOB-0201",
      name: "极光洞穴",
      nameEn: "Aurora Cave",
      level: "abyssal",
      levelText: "深渊级",
      category: "LO",
      categoryName: "地点类",
      org: "白夜哨站",
      status: "active",
      statusText: "活跃",
      survival: "0.7%",
      firstRecord: "安珀历6年",
      featured: false,
    },
    {
      id: "PHA-0001",
      name: "空白地带",
      nameEn: "The Void",
      level: "unknown",
      levelText: "未知级",
      category: "PH",
      categoryName: "物理类",
      org: "IMAC 直辖",
      status: "quarantined",
      statusText: "隔离中",
      survival: "—",
      firstRecord: "安珀历元年",
      featured: false,
    },
    {
      id: "PHA-0182",
      name: "洛林裂隙",
      nameEn: "Lorraine Rift",
      level: "doomed",
      levelText: "厄运级",
      category: "PH",
      categoryName: "物理类",
      org: "BRI/晨星团联合",
      status: "active",
      statusText: "活跃",
      survival: "38%",
      firstRecord: "安珀历9年",
      featured: false,
    },
    // 以下为已处置异常（个人中心任务历史提及，纳入归档，详情待补）
    {
      id: "LOA-1045",
      name: "失物公寓",
      nameEn: "Lost & Found Apartments",
      level: "hazardous",
      levelText: "危险级",
      category: "LO",
      categoryName: "地点类",
      org: "衔尾蛇事务所",
      status: "resolved",
      statusText: "已解决",
      survival: "62%",
      firstRecord: "安珀历37年",
      featured: false,
    },
    {
      id: "SPB-0890",
      name: "镜像走廊",
      nameEn: "Mirror Corridor",
      level: "doomed",
      levelText: "厄运级",
      category: "SP",
      categoryName: "空间类",
      org: "衔尾蛇事务所",
      status: "resolved",
      statusText: "已解决",
      survival: "18%",
      firstRecord: "安珀历36年",
      featured: false,
    },
    {
      id: "CGA-0502",
      name: "无声剧场",
      nameEn: "Silent Theater",
      level: "hazardous",
      levelText: "危险级",
      category: "CG",
      categoryName: "认知类",
      org: "悬铃木学会",
      status: "resolved",
      statusText: "已解决",
      survival: "41%",
      firstRecord: "安珀历35年",
      featured: false,
    },
    {
      id: "CGA-0713",
      name: "旧图书馆",
      nameEn: "Old Library",
      level: "hazardous",
      levelText: "危险级",
      category: "CG",
      categoryName: "认知类",
      org: "悬铃木学会",
      status: "resolved",
      statusText: "已解决",
      survival: "55%",
      firstRecord: "安珀历34年",
      featured: false,
    },
    {
      id: "PHB-0815",
      name: "重力偏移区",
      nameEn: "Gravity Shift Zone",
      level: "doomed",
      levelText: "厄运级",
      category: "PH",
      categoryName: "物理类",
      org: "晨星团",
      status: "resolved",
      statusText: "已解决",
      survival: "23%",
      firstRecord: "安珀历33年",
      featured: false,
    },
    {
      id: "PHA-0728",
      name: "冰下断层",
      nameEn: "Subglacial Fault",
      level: "hazardous",
      levelText: "危险级",
      category: "PH",
      categoryName: "物理类",
      org: "北境守望",
      status: "resolved",
      statusText: "已解决",
      survival: "38%",
      firstRecord: "安珀历32年",
      featured: false,
    },
    {
      id: "SPA-1120",
      name: "回声走廊",
      nameEn: "Echo Corridor",
      level: "ordinary",
      levelText: "常规级",
      category: "SP",
      categoryName: "空间类",
      org: "边界研究院",
      status: "resolved",
      statusText: "已解决",
      survival: "76%",
      firstRecord: "安珀历31年",
      featured: false,
    },
    {
      id: "CGB-0427",
      name: "记忆回廊",
      nameEn: "Memory Gallery",
      level: "doomed",
      levelText: "厄运级",
      category: "CG",
      categoryName: "认知类",
      org: "边界研究院",
      status: "resolved",
      statusText: "已解决",
      survival: "19%",
      firstRecord: "安珀历30年",
      featured: false,
    },
    {
      id: "SPA-0421",
      name: "灰松岭循环路段",
      nameEn: "Huisong Ridge Loop",
      level: "ordinary",
      levelText: "常规级",
      category: "SP",
      categoryName: "空间类",
      org: "北境守望",
      status: "resolved",
      statusText: "已解决",
      survival: "100%",
      firstRecord: "安珀历38年",
      featured: false,
    },
  ];

  const getInitialCat = () => {
    try {
      let queryStr = routeQuery || "";
      // fallback: read directly from hash
      if (!queryStr) {
        const hash = window.location.hash.slice(1) || "/";
        const qIdx2 = hash.indexOf("?");
        if (qIdx2 >= 0) queryStr = hash.substring(qIdx2 + 1);
      }
      if (queryStr) {
        const params = new URLSearchParams(queryStr);
        const cat = params.get("cat");
        if (cat && ["SP","TM","PH","CG","EN","LO","OB"].includes(cat.toUpperCase())) {
          return cat.toUpperCase();
        }
      }
    } catch(e) {}
    return "all";
  };

  const [catFilter, setCatFilter] = React.useState(getInitialCat);

  const categoryFilters = [
    { key: "all", label: "全部", code: "ALL", color: "var(--text-tertiary)" },
    { key: "SP", label: "空间类", code: "SP", color: "#4a7cb4" },
    { key: "TM", label: "时间类", code: "TM", color: "#7a3ab4" },
    { key: "PH", label: "物理类", code: "PH", color: "#c49a2c" },
    { key: "CG", label: "认知类", code: "CG", color: "#c4782c" },
    { key: "EN", label: "实体类", code: "EN", color: "#c42828" },
    { key: "LO", label: "地点类", code: "LO", color: "#d46828" },
    { key: "OB", label: "物品类", code: "OB", color: "#6a8ca8" },
  ];

  const getCategoryColor = (code) => {
    const map = {
      SP: "#4a7cb4", TM: "#7a3ab4", PH: "#c49a2c",
      CG: "#c4782c", EN: "#c42828", LO: "#d46828", OB: "#6a8ca8",
    };
    return map[code] || "var(--text-tertiary)";
  };

  const filteredAnomalies = anomalies.filter((a) => {
    if (filter !== "all" && a.level !== filter) return false;
    if (catFilter !== "all" && a.category !== catFilter) return false;
    if (search && !a.name.includes(search) && !a.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const levelFilters = [
    { key: "all", label: "全部" },
    { key: "ordinary", label: "常规级" },
    { key: "hazardous", label: "危险级" },
    { key: "doomed", label: "厄运级" },
    { key: "abyssal", label: "深渊级" },
    { key: "unknown", label: "未知级" },
  ];

  return (
    <>
      <style>{`
        .archive-page {
          padding-top: 64px;
          background-color: var(--bg-primary);
          min-height: 100vh;
        }
        .archive-auth-bar {
          background-color: var(--bg-deep);
          border-bottom: 1px solid var(--border-color);
          padding: 12px 0;
          position: sticky;
          top: 64px;
          z-index: 100;
        }
        .archive-auth-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .archive-auth-status {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
        }
        .archive-auth-status .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--level-ordinary);
        }
        .archive-auth-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .archive-logout {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .archive-logout:hover { color: var(--accent-red-bright); }
        .archive-header {
          padding: 60px 0 30px;
          border-bottom: 1px solid var(--border-color);
        }
        .archive-title {
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }
        .archive-subtitle {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 16px;
        }
        .archive-stats {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
        }
        .archive-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .archive-stat-num {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .archive-stat-label {
          font-size: 12px;
          color: var(--text-tertiary);
        }
        .archive-stat-num.red { color: var(--accent-red-bright); }
        .archive-stat-num.purple { color: var(--level-unknown); }
        .archive-filters {
          padding: 24px 0;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .archive-filter-tabs {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        .archive-cat-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .archive-cat-tab {
          padding: 8px 14px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: var(--bg-deep);
        }
        .archive-cat-tab .cat-code {
          font-weight: 700;
          font-size: 12px;
        }
        .archive-cat-tab:hover {
          color: var(--text-primary);
          border-color: var(--border-light);
        }
        .archive-cat-tab.active {
          color: var(--text-primary);
          border-color: var(--cat-color, var(--accent-red-bright));
          background-color: rgba(196, 40, 40, 0.06);
        }
        .archive-cat-tab.active .cat-code {
          color: var(--cat-color, var(--accent-red-bright));
        }
        .archive-filter-tab {
          padding: 6px 14px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.05em;
        }
        .archive-filter-tab:hover {
          color: var(--text-primary);
          border-color: var(--border-light);
        }
        .archive-filter-tab.active {
          color: var(--accent-red-bright);
          border-color: var(--accent-red-bright);
          background-color: rgba(196, 40, 40, 0.08);
        }
        .archive-search {
          position: relative;
        }
        .archive-search-input {
          width: 240px;
          padding: 8px 14px 8px 34px;
          background-color: var(--bg-deep);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 13px;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 0.2s ease;
        }
        .archive-search-input:focus {
          border-color: var(--accent-red-bright);
        }
        .archive-search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: var(--text-muted);
        }
        .archive-list {
          padding: 20px 0 80px;
          display: flex;
          flex-direction: column;
          gap: 1px;
          background-color: var(--border-color);
          border: 1px solid var(--border-color);
          border-top: none;
        }
        .archive-list-header {
          display: grid;
          grid-template-columns: 120px 110px 1.5fr 100px 1.2fr 100px 100px;
          gap: 16px;
          padding: 14px 20px;
          background-color: var(--bg-deep);
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .archive-row {
          display: grid;
          grid-template-columns: 120px 110px 1.5fr 100px 1.2fr 100px 100px;
          gap: 16px;
          padding: 18px 20px;
          background-color: var(--bg-card);
          align-items: center;
          cursor: pointer;
          transition: background-color 0.2s ease;
          position: relative;
        }
        .archive-row:hover {
          background-color: var(--bg-tertiary);
        }
        .archive-row.featured {
          border-left: 3px solid var(--accent-red-bright);
        }
        .archive-row-id {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.05em;
        }
        .archive-row-cat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .archive-row-cat-tag {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .archive-row-cat-name {
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.05em;
        }
        .archive-row-name-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .archive-row-name {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .archive-row-name-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .archive-row-level {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
        }
        .level-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .archive-row-org {
          font-size: 13px;
          color: var(--text-secondary);
        }
        .archive-row-status {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.05em;
        }
        .status-active { color: var(--level-hazardous); }
        .status-resolved { color: var(--level-ordinary); }
        .status-quarantined { color: var(--level-unknown); }
        .archive-row-survival {
          font-family: var(--font-mono);
          font-size: 13px;
          text-align: right;
          font-weight: 700;
        }
        .archive-row-arrow {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          opacity: 0;
          transition: all 0.2s ease;
        }
        .archive-row:hover .archive-row-arrow {
          opacity: 1;
          right: 16px;
        }
        @media (max-width: 1024px) {
          .archive-list-header, .archive-row {
            grid-template-columns: 100px 1.5fr 90px 1fr 80px;
          }
          .archive-list-header > :last-child, .archive-row > :last-child {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .archive-auth-inner, .container { padding: 0 16px; }
          .archive-header { padding: 40px 0 20px; }
          .archive-title { font-size: 26px; }
          .archive-list-header { display: none; }
          .archive-row {
            grid-template-columns: 1fr;
            gap: 8px;
            padding: 16px;
          }
          .archive-row-id { font-size: 12px; }
          .archive-row-name { font-size: 18px; }
          .archive-search-input { width: 200px; }
        }
      `}</style>

      <div className="archive-page">
        {/* Auth Status Bar */}
        <div className="archive-auth-bar">
          <div className="archive-auth-inner">
            <div className="archive-auth-status">
              <div className="dot"></div>
              <span>已认证 · 访问级别：标准 / ACCESS LEVEL: STANDARD</span>
            </div>
            <div className="archive-auth-actions">
              <span className="archive-logout" onClick={() => navigate("/")}>退出认证</span>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Header */}
          <div className="archive-header">
            <h1 className="archive-title">异常信息数据库</h1>
            <div className="archive-subtitle">ANOMALY INFORMATION DATABASE · IMAC CENTRAL DATABASE</div>
            <div className="archive-stats">
              <div className="archive-stat">
                <span className="archive-stat-num">20,000+</span>
                <span className="archive-stat-label">已记录异常</span>
              </div>
              <div className="archive-stat">
                <span className="archive-stat-num red">47</span>
                <span className="archive-stat-label">深渊级</span>
              </div>
              <div className="archive-stat">
                <span className="archive-stat-num purple">3</span>
                <span className="archive-stat-label">未知级</span>
              </div>
              <div className="archive-stat">
                <span className="archive-stat-num">8</span>
                <span className="archive-stat-label">认证组织</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="archive-cat-tabs">
            {categoryFilters.map((f) => (
              <span
                key={f.key}
                className={`archive-cat-tab ${catFilter === f.key ? "active" : ""}`}
                style={{ "--cat-color": f.color }}
                onClick={() => setCatFilter(f.key)}
              >
                <span className="cat-code">{f.code}</span>
                <span>{f.label}</span>
              </span>
            ))}
          </div>

          <div className="archive-filters">
            <div className="archive-filter-tabs">
              {levelFilters.map((f) => (
                <span
                  key={f.key}
                  className={`archive-filter-tab ${filter === f.key ? "active" : ""}`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </span>
              ))}
            </div>
            <div className="archive-search">
              <svg className="archive-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7"/>
                <path d="M21 21L16.65 16.65"/>
              </svg>
              <input
                type="text"
                className="archive-search-input"
                placeholder="搜索编号或名称..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* List */}
          <div className="archive-list">
            <div className="archive-list-header">
              <span>编号</span>
              <span>类别</span>
              <span>名称</span>
              <span>等级</span>
              <span>管辖组织</span>
              <span>状态</span>
              <span style={{ textAlign: "right" }}>生还率</span>
            </div>
            {filteredAnomalies.map((a) => {
              const isAbyssal = a.level === "abyssal";
              return (
                <Restricted
                  key={a.id}
                  level={a.accessLevel || "internal"}
                  label={a.accessLevel === "topsecret" ? "绝密级" : "机密级"}
                  compact
                >
                    <div
                      className="archive-row"
                      style={{ borderLeft: `3px solid ${a.level === "ordinary" ? "#4a7c59" : a.level === "hazardous" ? "#c49a2c" : a.level === "doomed" ? "#d46828" : a.level === "abyssal" ? "#c42828" : a.level === "unknown" ? "#7a3ab0" : "var(--accent-red-bright)"}` }}
                      onClick={() => navigate(`/anomaly/${a.id}`)}
                    >
                      <div className="archive-row-id mono">{a.id}</div>
                      <div className="archive-row-cat mono">
                        <span className="archive-row-cat-tag" style={{ color: getCategoryColor(a.category) }}>
                          {a.category}
                        </span>
                        <span className="archive-row-cat-name">{a.categoryName}</span>
                      </div>
                      <div className="archive-row-name-group">
                      <span className="archive-row-name">{a.name}</span>
                      <span className="archive-row-name-en">{a.nameEn.toUpperCase()}</span>
                    </div>
                    <div className={`archive-row-level level-text-${a.level}`}>
                      <span className={`level-dot level-${a.level}`}></span>
                      {a.levelText}
                    </div>
                    <div className="archive-row-org">{a.org}</div>
                    <div className={`archive-row-status status-${a.status}`}>
                      {a.status === "active" && "● 活跃"}
                      {a.status === "resolved" && "● 已解决"}
                      {a.status === "quarantined" && "● 隔离中"}
                    </div>
                    <div className={`archive-row-survival ${parseFloat(a.survival) < 10 ? "level-text-abyssal" : parseFloat(a.survival) < 30 ? "level-text-hazardous" : "level-text-ordinary"}`} style={{"--s": a.survival}}>
                      {a.survival}
                    </div>
                    <span className="archive-row-arrow">→</span>
                  </div>
                </Restricted>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

window.AnomalyArchivePage = AnomalyArchivePage;
