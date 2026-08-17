// Unified authentication page - 4 tier system
function AuthPage() {
  const { navigate } = useRouter();
  const { setAuth, logout, authLevel, levels, currentLevelInfo } = useAuth();
  const [selectedTier, setSelectedTier] = React.useState(null);
  const [formData, setFormData] = React.useState({});
   const [error, setError] = React.useState("");
   const [success, setSuccess] = React.useState("");

   React.useEffect(() => {
     window.scrollTo(0, 0);
   }, []);

  const tiers = [
    {
      key: "public",
      label: "普通公民",
      level: "public",
      desc: "公开级，无需认证",
      color: levels.PUBLIC.color,
      content: ["首页全部内容", "应急指南", "异常科普", "公开新闻报道", "组织公开简介"],
      icon: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2 M12 7a4 4 0 110 8 4 4 0 010-8z",
      fields: [],
      submitLabel: "以公开身份访问",
    },
    {
      key: "media",
      label: "注册媒体人员",
      level: "media",
      desc: "受限级，需媒体认证码",
      color: levels.MEDIA.color,
      content: ["公开级全部内容", "新闻报道规范", "三层审定流程", "五不披露原则", "组织非敏感数据"],
      icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
      fields: [
        { key: "mediaCode", label: "媒体认证码", type: "text", placeholder: "MED-XXXX-XXXX" },
        { key: "organization", label: "所属媒体机构", type: "text", placeholder: "例如：鸣海新闻社" },
      ],
      submitLabel: "媒体人员认证",
    },
    {
      key: "internal",
      label: "溯界者 / 内部人员",
      level: "internal",
      desc: "机密级，需人员编号+密码",
      color: levels.INTERNAL.color,
      content: ["受限级全部内容", "异常信息数据库（常规至厄运级）", "组织内部详情", "装备说明", "同化风险详情"],
      icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z",
      fields: [
        { key: "staffId", label: "人员编号", type: "text", placeholder: "IMAC-OA-0312" },
        { key: "password", label: "密码", type: "password", placeholder: "请输入密码" },
      ],
      submitLabel: "内部人员认证",
    },
    {
      key: "topsecret",
      label: "IMAC 管理员",
      level: "topsecret",
      desc: "绝密级，需管理员密钥",
      color: levels.TOPSECRET.color,
      content: ["机密级全部内容", "深渊级异常完整档案", "所有组织完整内部数据", "进入记录原始数据", "IMAC 核心决策文件"],
      icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
      fields: [
        { key: "adminId", label: "管理员编号", type: "text", placeholder: "IMAC-ADM-0001" },
        { key: "token", label: "密钥令牌", type: "password", placeholder: "请输入动态密钥" },
      ],
      submitLabel: "管理员认证",
    },
  ];

  const currentTier = tiers.find(t => t.key === selectedTier);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentTier) return;

    if (currentTier.level === "public") {
      setAuth("public", null);
      setSuccess("已切换为公开身份");
      setTimeout(() => navigate("/"), 800);
      return;
    }

    // Mock validation
    const fields = currentTier.fields;
    let valid = true;
    fields.forEach(f => {
      if (!formData[f.key]) valid = false;
    });

    if (!valid) {
      setError("请填写所有必填字段");
      return;
    }

    // Demo: accept any input for media/internal, for topsecret require "TOPSECRET"
    if (currentTier.level === "topsecret" && formData.token !== "TOPSECRET") {
      setError("管理员密钥错误。提示：测试密钥为 TOPSECRET");
      return;
    }

    const identity = {
      tier: currentTier.key,
      name: currentTier.label,
      ...formData,
    };

    setAuth(currentTier.level, identity);
    const levelLabel = levels[currentTier.level.toUpperCase()]?.label || currentLevelInfo.label;
    setSuccess(`认证成功，已获得${levelLabel}权限`);

    setTimeout(() => {
      if (currentTier.level === "internal" || currentTier.level === "topsecret") {
        navigate("/portal");
      } else {
        navigate("/");
      }
    }, 1200);
  };

  const handleLogout = () => {
    logout();
    setSelectedTier(null);
    setFormData({});
    setError("");
    setSuccess("已退出认证");
  };

  return (
    <>
      <style>{`
        .auth-page {
          min-height: 100vh;
          padding: 100px 0 80px;
          background: linear-gradient(135deg, #0e0e12 0%, #161014 50%, #120e16 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .auth-top-info {
          text-align: center;
          margin-bottom: 40px;
        }
        .auth-top-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          margin-bottom: 10px;
        }
        .auth-top-title {
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .auth-top-desc {
          font-size: 14px;
          color: var(--text-secondary);
          max-width: 500px;
          line-height: 1.7;
        }
        .auth-current-status {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border: 1px solid;
          margin-top: 20px;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.1em;
        }
        .auth-current-status .dot {
          width: 8px; height: 8px; border-radius: 50%;
        }
        .auth-current-status button {
          margin-left: 12px;
          background: transparent;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          text-decoration: underline;
          font-size: 11px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }

        .auth-tiers {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background-color: var(--border-color);
          border: 1px solid var(--border-color);
          max-width: 900px;
          width: 100%;
          margin-bottom: 40px;
        }
        .auth-tier-card {
          background-color: var(--bg-card);
          padding: 22px 18px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        .auth-tier-card:hover {
          background-color: rgba(18, 18, 22, 0.9);
        }
        .auth-tier-card.active {
          background-color: rgba(139, 26, 26, 0.08);
        }
        .auth-tier-card.active::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background-color: var(--tier-color);
        }
        .auth-tier-icon {
          width: 32px; height: 32px;
          color: var(--tier-color);
          margin-bottom: 14px;
        }
        .auth-tier-label {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .auth-tier-desc {
          font-size: 11px;
          color: var(--text-tertiary);
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .auth-tier-badge {
          display: inline-block;
          padding: 3px 8px;
          border: 1px solid var(--tier-color);
          color: var(--tier-color);
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
        }
        .auth-tiers-features {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
        }
        .auth-tiers-features span {
          font-size: 10px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }

        .auth-form-panel {
          max-width: 500px;
          width: 100%;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 32px;
        }
        .auth-form-title {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .auth-form-subtitle {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.6;
        }
        .auth-form-group {
          margin-bottom: 16px;
        }
        .auth-form-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .auth-form-input {
          width: 100%;
          padding: 10px 14px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 14px;
          font-family: var(--font-mono);
          outline: none;
          transition: border-color 0.2s ease;
        }
        .auth-form-input:focus {
          border-color: var(--accent-red-bright);
        }
        .auth-submit-btn {
          width: 100%;
          padding: 12px;
          background-color: var(--accent-red-bright);
          border: none;
          color: #fff;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
          margin-top: 8px;
        }
        .auth-submit-btn:hover {
          background-color: #d43a3a;
        }
        .auth-error {
          padding: 10px 14px;
          background-color: rgba(196, 40, 40, 0.1);
          border: 1px solid rgba(196, 40, 40, 0.3);
          color: var(--accent-red-bright);
          font-size: 12px;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .auth-success {
          padding: 10px 14px;
          background-color: rgba(74, 124, 89, 0.1);
          border: 1px solid rgba(74, 124, 89, 0.3);
          color: var(--level-ordinary);
          font-size: 12px;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .auth-disclaimer {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
          font-size: 11px;
          color: var(--text-tertiary);
          line-height: 1.6;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .auth-register-entry {
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .auth-register-entry span {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .auth-register-link {
          background: none;
          border: none;
          color: var(--accent-red-bright);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          transition: opacity 0.2s ease;
        }
        .auth-register-link:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
        @media (max-width: 900px) {
          .auth-tiers { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .auth-tiers { grid-template-columns: 1fr; }
          .auth-form-panel { padding: 24px; }
          .auth-top-title { font-size: 26px; }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-top-info">
          <div className="auth-top-label">IMAC ACCESS CONTROL</div>
          <h1 className="auth-top-title">身份认证</h1>
          <p className="auth-top-desc">
            IMAC 内容访问采用分级机密体系。不同身份可访问的内容范围不同。
            请选择您的身份类型并完成认证。
          </p>
          <div
            className="auth-current-status"
            style={{ borderColor: currentLevelInfo.color, color: currentLevelInfo.color }}
          >
            <span className="dot" style={{ backgroundColor: currentLevelInfo.color }}></span>
            当前权限：{currentLevelInfo.label} / {currentLevelInfo.en}
            {authLevel !== "public" && (
              <button onClick={handleLogout}>退出认证</button>
            )}
          </div>
        </div>

        <div className="auth-tiers">
          {tiers.map((tier) => (
            <div
              key={tier.key}
              className={`auth-tier-card ${selectedTier === tier.key ? "active" : ""}`}
              style={{ "--tier-color": tier.color }}
              onClick={() => {
                setSelectedTier(tier.key);
                setError("");
                setSuccess("");
              }}
            >
              <svg className="auth-tier-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d={tier.icon}/>
              </svg>
              <div className="auth-tier-label">{tier.label}</div>
              <div className="auth-tier-desc">{tier.desc}</div>
              <span className="auth-tier-badge">{levels[tier.level.toUpperCase()].en}</span>
            </div>
          ))}
        </div>

        {!currentTier && (
          <div style={{
            textAlign: "center",
            padding: "40px",
            border: "1px dashed var(--border-color)",
            color: "var(--text-tertiary)",
            fontSize: "13px",
            maxWidth: "500px",
            width: "100%",
          }}>
            请在上方选择您的身份类型开始认证
          </div>
        )}

        {currentTier && (
          <div className="auth-form-panel">
            <div className="auth-form-title" style={{ color: currentTier.color }}>
              {currentTier.label}认证
            </div>
            <p className="auth-form-subtitle">
              认证后可获得以下访问权限：
            </p>
            <ul style={{
              listStyle: "none",
              padding: 0,
              marginBottom: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}>
              {currentTier.content.map((c, i) => (
                <li key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={currentTier.color} strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {c}
                </li>
              ))}
            </ul>

            {error && <div className="auth-error">{error}</div>}
            {success && <div className="auth-success">{success}</div>}

            {currentTier.fields.length > 0 ? (
              <form onSubmit={handleSubmit}>
                {currentTier.fields.map((f) => (
                  <div key={f.key} className="auth-form-group">
                    <label className="auth-form-label">{f.label}</label>
                    <input
                      className="auth-form-input"
                      type={f.type}
                      placeholder={f.placeholder}
                      value={formData[f.key] || ""}
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    />
                  </div>
                ))}
                <button type="submit" className="auth-submit-btn">
                  {currentTier.submitLabel}
                </button>
              </form>
            ) : (
              <button className="auth-submit-btn" onClick={handleSubmit}>
                {currentTier.submitLabel}
              </button>
            )}

             <div className="auth-disclaimer">
               本页面为演示系统，认证结果仅在本地存储（localStorage）。<br/>
               媒体级：任意认证码均可通过。<br/>
               机密级：任意 IMAC-组织缩写-编号 均可通过。<br/>
               绝密级：密钥为 TOPSECRET。
             </div>
             <div className="auth-register-entry">
               <span>已是溯界者但没有账号？</span>
               <button className="auth-register-link" onClick={() => navigate("/register")}>
                 注册溯界者账号 →
               </button>
             </div>
          </div>
        )}
      </div>
    </>
  );
}

window.AuthPage = AuthPage;
