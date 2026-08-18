// Personal Profile page for internal staff
function ProfilePage() {
  const { navigate } = useRouter();
  const { canAccess, authLevel, identity, currentLevelInfo } = useAuth();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!canAccess("internal")) {
    return (
      <div className="portal-denied">
        <div className="container">
          <div className="denied-box">
            <h2>权限不足</h2>
            <p>此页面仅限内部人员访问。请先完成身份认证。</p>
            <button className="btn-primary" onClick={() => navigate("/auth")}>前往认证</button>
          </div>
        </div>
      </div>
    );
  }

  const isTopSecret = authLevel === "topsecret";
  const codename = isTopSecret ? "桥柱" : "赤鸦";
  const realName = isTopSecret ? "Z" : "林深";
  const rank = isTopSecret ? "界标" : "资深溯界者";
  const org = isTopSecret ? "长桥会社 / IMAC总部" : "衔尾蛇事务所";
  const staffId = isTopSecret ? "IMAC-LBC-0001" : "IMAC-OA-0312";
  const avatarLetter = codename.charAt(0);

  const promotions = [
    { date: "安珀历33年", title: "认证见习溯界者", desc: "通过新人训练与基础考核" },
    { date: "安珀历34年", title: "晋升溯界者", desc: "完成首次独立外勤任务" },
    { date: "安珀历36年", title: "晋升资深溯界者", desc: "累计参与行动21次，成功解决12例异常" },
  ];
  if (isTopSecret) {
    promotions.push({ date: "安珀历38年", title: "晋升首席溯界者", desc: "担任赤月学院行动副指挥" });
    promotions.push({ date: "安珀历39年", title: "授予界标职级", desc: "双城事件现场总指挥，获IMAC最高荣誉" });
  }

  const stats = [
    { label: "参与行动", value: isTopSecret ? "89" : "47", unit: "次" },
    { label: "成功解决", value: isTopSecret ? "62" : "31", unit: "例" },
    { label: "异常接触时长", value: isTopSecret ? "2,340" : "986", unit: "小时" },
    { label: "累计外勤天数", value: isTopSecret ? "412" : "187", unit: "天" },
  ];

  return (
    <>
      <style>{`
        .profile-page {
          background-color: var(--bg-deep);
          color: var(--text-primary);
          min-height: calc(100vh - 64px);
          padding-top: 80px;
          padding-bottom: 60px;
        }
        .profile-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        .profile-breadcrumb .crumb-link {
          cursor: pointer;
          color: var(--accent-red-bright);
        }
        .profile-breadcrumb .crumb-link:hover { text-decoration: underline; }
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
          margin-bottom: 32px;
        }
        .profile-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 28px;
          margin-bottom: 28px;
        }
        .profile-sidebar {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 32px 24px;
          text-align: center;
        }
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin: 0 auto 20px;
          background: radial-gradient(circle, rgba(196, 40, 40, 0.3), rgba(10, 10, 12, 0.8));
          border: 3px solid var(--accent-red-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 48px;
          font-weight: 900;
          color: var(--accent-red-bright);
          box-shadow: 0 0 40px rgba(196, 40, 40, 0.3);
        }
        .profile-codename {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .profile-rank-badge {
          display: inline-block;
          padding: 4px 12px;
          border: 1px solid var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.15em;
          color: var(--accent-red-bright);
          margin-bottom: 16px;
        }
        .profile-rank-badge.landmark {
          border-color: #7a3ab0;
          color: #b88ed9;
          background: rgba(122, 58, 176, 0.1);
        }
        .profile-id {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
        }
        .profile-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 12px;
          font-size: 12px;
          color: var(--level-ordinary);
        }
        .profile-status-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background-color: var(--level-ordinary);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .profile-main {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .info-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
        }
        .info-card-head {
          padding: 16px 24px;
          border-bottom: 1px solid var(--border-color);
          background: linear-gradient(90deg, rgba(196, 40, 40, 0.08), transparent);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .info-card-title {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 600;
        }
        .info-card-title-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-left: 10px;
        }
        .info-card-body {
          padding: 24px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .info-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .info-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .info-value {
          font-size: 14px;
          color: var(--text-primary);
        }
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .stat-box {
          padding: 20px;
          background-color: rgba(18, 18, 22, 0.6);
          border: 1px solid var(--border-color);
          text-align: center;
        }
        .stat-box-num {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
        }
        .stat-box-unit {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .stat-box-label {
          font-size: 11px;
          color: var(--text-tertiary);
          margin-top: 8px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }
        .timeline {
          position: relative;
          padding-left: 28px;
        }
        .timeline::before {
          content: "";
          position: absolute;
          left: 8px;
          top: 4px;
          bottom: 4px;
          width: 1px;
          background: var(--border-color);
        }
        .timeline-item {
          position: relative;
          padding-bottom: 24px;
        }
        .timeline-item:last-child { padding-bottom: 0; }
        .timeline-dot {
          position: absolute;
          left: -24px;
          top: 4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: var(--accent-red-bright);
          border: 2px solid var(--bg-deep);
        }
        .timeline-date {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }
        .timeline-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .timeline-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
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
          .profile-grid { grid-template-columns: 1fr; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .info-grid { grid-template-columns: 1fr; }
          .stats-row { grid-template-columns: 1fr 1fr; }
          .page-title { font-size: 24px; }
        }
        @media (max-width: 480px) {
          .stats-row { grid-template-columns: 1fr; }
          .info-card { padding: 18px 14px; }
          .profile-sidebar { padding: 24px 16px; }
        }
      `}</style>

      <div className="profile-page">
        <div className="container">
          <div className="profile-breadcrumb">
            <span className="crumb-link" onClick={() => navigate("/portal")}>内部指挥中心</span>
            <span>/</span>
            <span>个人档案</span>
          </div>

          <h1 className="page-title">个人档案</h1>
          <div className="page-title-en">PERSONNEL FILE</div>

          <div className="profile-grid">
            <div className="profile-sidebar">
              <div className="profile-avatar">{avatarLetter}</div>
              <div className="profile-codename">{codename}</div>
              <div className={`profile-rank-badge ${isTopSecret ? "landmark" : ""}`}>
                {isTopSecret ? "LANDMARK · 界标" : "SENIOR · 资深溯界者"}
              </div>
              <div className="profile-id">{staffId}</div>
              <div className="profile-status">
                <div className="profile-status-dot"></div>
                <span>在岗 · 待命</span>
              </div>
            </div>

            <div className="profile-main">
              {/* Personal Stats */}
              <div className="info-card">
                <div className="info-card-head">
                  <div>
                    <span className="info-card-title">个人统计</span>
                    <span className="info-card-title-en">SERVICE RECORD</span>
                  </div>
                </div>
                <div className="info-card-body">
                  <div className="stats-row">
                    {stats.map((s, i) => (
                      <div key={i} className="stat-box">
                        <div className="stat-box-num">{s.value}<span style={{ fontSize: "14px", marginLeft: "2px" }}>{s.unit}</span></div>
                        <div className="stat-box-label">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="info-card">
                <div className="info-card-head">
                  <div>
                    <span className="info-card-title">基本信息</span>
                    <span className="info-card-title-en">BASIC INFORMATION</span>
                  </div>
                </div>
                <div className="info-card-body">
                  <div className="info-grid">
                    <div className="info-item"><span className="info-label">真实姓名</span><span className="info-value">{realName}</span></div>
                    <div className="info-item"><span className="info-label">代号/呼号</span><span className="info-value">{codename}</span></div>
                    <div className="info-item"><span className="info-label">IMAC编号</span><span className="info-value">{staffId}</span></div>
                    <div className="info-item"><span className="info-label">职级</span><span className="info-value">{rank}</span></div>
                    <div className="info-item"><span className="info-label">所属组织</span><span className="info-value">{org}</span></div>
                    <div className="info-item"><span className="info-label">权限等级</span><span className="info-value" style={{ color: currentLevelInfo.color }}>{currentLevelInfo.label} · {currentLevelInfo.en}</span></div>
                    <div className="info-item"><span className="info-label">当前状态</span><span className="info-value" style={{ color: "var(--level-ordinary)" }}>● 在岗·待命</span></div>
                    <div className="info-item"><span className="info-label">认证日期</span><span className="info-value">安珀历33年</span></div>
                  </div>
                </div>
              </div>

              {/* Promotion Timeline */}
              <div className="info-card">
                <div className="info-card-head">
                  <div>
                    <span className="info-card-title">职级晋升记录</span>
                    <span className="info-card-title-en">PROMOTION HISTORY</span>
                  </div>
                </div>
                <div className="info-card-body">
                  <div className="timeline">
                    {promotions.map((p, i) => (
                      <div key={i} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-date">{p.date}</div>
                        <div className="timeline-title">{p.title}</div>
                        <div className="timeline-desc">{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Organization & Emergency */}
              <div className="info-card">
                <div className="info-card-head">
                  <div>
                    <span className="info-card-title">所属组织 & 紧急联系人</span>
                    <span className="info-card-title-en">ORG & EMERGENCY CONTACT</span>
                  </div>
                </div>
                <div className="info-card-body">
                  <div className="info-grid">
                    <div className="info-item"><span className="info-label">直属上级</span><span className="info-value">{isTopSecret ? "IMAC理事会" : "指挥官·吴峰"}</span></div>
                    <div className="info-item"><span className="info-label">所属小队</span><span className="info-value">{isTopSecret ? "联合指挥部" : "第三行动队"}</span></div>
                    <div className="info-item"><span className="info-label">紧急联系人</span><span className="info-value">林女士（家属）</span></div>
                    <div className="info-item"><span className="info-label">联系电话</span><span className="info-value">已加密存储</span></div>
                    <div className="info-item"><span className="info-label">血型</span><span className="info-value">O 型 Rh+</span></div>
                    <div className="info-item"><span className="info-label">过敏史</span><span className="info-value">青霉素</span></div>
                  </div>
                </div>
              </div>
            </div>
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

window.ProfilePage = ProfilePage;
