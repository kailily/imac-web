function RegisterPage() {
  const { navigate } = useRouter();
  const [formData, setFormData] = React.useState({
    realName: "",
    codename: "",
    imacId: "",
    organization: "",
    rank: "见习",
    password: "",
    confirmPassword: "",
    contact: "",
    agreement: false,
  });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const organizations = [
    "衔尾蛇事务所",
    "北境守望",
    "边界研究院 BRI",
    "晨星团",
    "第四面墙",
    "悬铃木学会",
    "白夜哨站",
    "长桥会社",
  ];

  const ranks = ["见习", "溯界者"];

  // 密码强度计算
  const passwordStrength = (() => {
    const pwd = formData.password || "";
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (pwd.length >= 12) score++;
    return Math.min(score, 4);
  })();

  const strengthLabels = ["极弱", "弱", "一般", "强", "极强"];
  const strengthColors = ["#5a5a5a", "#c44040", "#c97a2a", "#2e8b57", "#2e8b57"];

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    if (errors[key]) {
      setErrors({ ...errors, [key]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.realName.trim()) newErrors.realName = "请输入真实姓名";
    if (!formData.codename.trim()) newErrors.codename = "请输入代号";
    if (!formData.imacId.trim()) {
      newErrors.imacId = "请输入IMAC编号";
    } else if (!/^IMAC-[A-Z0-9]+-\d+$/i.test(formData.imacId.trim())) {
      newErrors.imacId = "IMAC编号格式应为 IMAC-组织缩写-编号，如 IMAC-OA-0312";
    }
    if (!formData.organization) newErrors.organization = "请选择所属组织";
    if (!formData.password) {
      newErrors.password = "请设置密码";
    } else if (formData.password.length < 8) {
      newErrors.password = "密码长度至少8位";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "请再次输入密码";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "两次输入的密码不一致";
    }
    if (!formData.contact.trim()) newErrors.contact = "请输入联系方式";
    if (!formData.agreement) newErrors.agreement = "请阅读并同意相关协议";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const inputClass = (key) =>
    `reg-input ${errors[key] ? "error" : ""}`;

  return (
    <div className="register-page">
      <style>{`
        .register-page {
          min-height: 100vh;
          padding-top: 64px;
          padding-bottom: 60px;
          background-color: #07070a;
          background-image:
            linear-gradient(rgba(196, 40, 40, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196, 40, 40, 0.04) 1px, transparent 1px);
          background-size: 50px 50px;
          color: var(--text-primary);
          position: relative;
        }
        .register-page::before {
          content: "";
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px;
          background-color: var(--accent-red-bright);
          box-shadow: 0 0 8px rgba(196, 40, 40, 0.5);
          z-index: 1000;
        }
        .register-watermark {
          position: fixed;
          top: 50%; right: -80px;
          transform: translateY(-50%) rotate(90deg);
          font-family: var(--font-mono);
          font-size: 180px;
          font-weight: 900;
          color: rgba(196, 40, 40, 0.03);
          letter-spacing: 0.05em;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .register-container {
          max-width: 720px;
          margin: 0 auto;
          padding: 40px 24px;
          position: relative;
          z-index: 1;
        }
        .reg-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .reg-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--accent-red-bright);
          margin-bottom: 12px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .reg-label::before, .reg-label::after {
          content: "";
          width: 28px; height: 1px;
          background-color: var(--accent-red-bright);
          opacity: 0.5;
        }
        .reg-title {
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin: 0 0 12px;
          color: var(--text-primary);
        }
        .reg-subtitle {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto;
        }
        .reg-tip {
          margin-top: 14px;
          font-size: 12px;
          color: var(--text-tertiary);
        }
        .reg-tip a {
          color: var(--accent-red-bright);
          text-decoration: none;
          cursor: pointer;
        }
        .reg-tip a:hover { text-decoration: underline; }

        .reg-classification-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background-color: rgba(196, 40, 40, 0.1);
          border: 1px solid rgba(196, 40, 40, 0.3);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.15em;
          margin-bottom: 16px;
        }
        .reg-classification-tag .dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background-color: var(--accent-red-bright);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .reg-form-card {
          background-color: rgba(12, 12, 16, 0.85);
          border: 1px solid var(--border-color);
          backdrop-filter: blur(4px);
        }
        .reg-form-card::before {
          content: "";
          display: block;
          height: 3px;
          background-color: var(--accent-red-bright);
        }

        .reg-section {
          padding: 28px 32px;
          border-bottom: 1px solid var(--border-color);
        }
        .reg-section:last-of-type { border-bottom: none; }

        .reg-section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(196, 40, 40, 0.2);
        }
        .reg-section-num {
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          background-color: var(--accent-red-bright);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
        }
        .reg-section-name {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .reg-section-en {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }

        .reg-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 20px;
        }
        .reg-grid-full { grid-column: 1 / -1; }

        .reg-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .reg-label-text {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .reg-label-text .req { color: var(--accent-red-bright); margin-right: 4px; }
        .reg-input, .reg-select, .reg-textarea {
          width: 100%;
          padding: 10px 12px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 13px;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          box-sizing: border-box;
        }
        .reg-textarea { resize: vertical; min-height: 72px; }
        .reg-input:focus, .reg-select:focus, .reg-textarea:focus {
          border-color: var(--accent-red-bright);
          box-shadow: 0 0 0 2px rgba(196, 40, 40, 0.15);
        }
        .reg-input.error, .reg-select.error, .reg-textarea.error {
          border-color: var(--accent-red-bright);
        }
        .reg-field-hint {
          font-size: 11px;
          color: var(--text-tertiary);
          line-height: 1.4;
        }
        .reg-error-text {
          font-size: 11px;
          color: var(--accent-red-bright);
          line-height: 1.4;
        }

        .reg-strength-bar {
          display: flex;
          gap: 4px;
          margin-top: 4px;
        }
        .reg-strength-bar span {
          flex: 1;
          height: 4px;
          background-color: var(--bg-tertiary);
          transition: background-color 0.2s;
        }
        .reg-strength-bar span.active { background-color: var(--accent-red-bright); }
        .reg-strength-text {
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-tertiary);
          margin-top: 4px;
        }

        .reg-checkbox-field {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 14px 16px;
          background-color: rgba(196, 40, 40, 0.04);
          border: 1px solid rgba(196, 40, 40, 0.15);
        }
        .reg-checkbox-field input[type="checkbox"] {
          margin-top: 2px;
          accent-color: var(--accent-red-bright);
          cursor: pointer;
        }
        .reg-checkbox-label {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .reg-checkbox-label a {
          color: var(--accent-red-bright);
          text-decoration: none;
          cursor: pointer;
        }
        .reg-checkbox-label a:hover { text-decoration: underline; }

        .reg-submit-btn {
          width: 100%;
          padding: 14px;
          background-color: var(--accent-red-bright);
          border: none;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .reg-submit-btn:hover { background-color: #d43a3a; }
        .reg-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .reg-footer-links {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .reg-footer-links a {
          color: var(--accent-red-bright);
          text-decoration: none;
          cursor: pointer;
          margin: 0 4px;
        }
        .reg-footer-links a:hover { text-decoration: underline; }
        .reg-footer-links .divider {
          color: var(--border-color);
          margin: 0 8px;
        }

        /* 成功状态 */
        .reg-success-card {
          text-align: center;
          padding: 60px 40px;
          background-color: rgba(12, 12, 16, 0.85);
          border: 1px solid var(--border-color);
        }
        .reg-success-card::before {
          content: "";
          display: block;
          height: 3px;
          background-color: var(--level-ordinary);
          margin: -60px -40px 40px;
        }
        .reg-success-icon {
          width: 72px; height: 72px;
          margin: 0 auto 24px;
          border-radius: 50%;
          background-color: rgba(46, 139, 87, 0.1);
          border: 2px solid var(--level-ordinary);
          display: flex; align-items: center; justify-content: center;
        }
        .reg-success-icon svg {
          width: 36px; height: 36px;
          stroke: var(--level-ordinary);
        }
        .reg-success-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-primary);
        }
        .reg-success-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 420px;
          margin: 0 auto 28px;
        }
        .reg-success-info {
          text-align: left;
          padding: 16px 20px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          max-width: 360px;
          margin: 0 auto 28px;
          font-family: var(--font-mono);
          font-size: 12px;
          line-height: 2;
        }
        .reg-success-info .info-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
        }
        .reg-success-info .info-key { color: var(--text-tertiary); }
        .reg-success-info .info-val { color: var(--text-primary); }
        .reg-success-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .reg-btn-secondary {
          padding: 10px 24px;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .reg-btn-secondary:hover {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }
        .reg-btn-primary {
          padding: 10px 24px;
          background-color: var(--accent-red-bright);
          border: none;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        .reg-btn-primary:hover { background-color: #d43a3a; }

        @media (max-width: 640px) {
          .reg-grid { grid-template-columns: 1fr; }
          .reg-section { padding: 20px; }
          .reg-title { font-size: 24px; }
          .register-container { padding: 24px 16px; }
          .reg-success-card { padding: 40px 20px; }
          .reg-success-card::before { margin: -40px -20px 28px; }
        }
      `}</style>

      <div className="register-watermark">IMAC CONFIDENTIAL</div>

      <div className="register-container">
        {submitted ? (
          <div className="reg-success-card">
            <div className="reg-success-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className="reg-success-title">注册申请已提交</h2>
            <p className="reg-success-desc">
              您的溯界者账号注册申请已提交至 IMAC 中央数据库核验。
              系统将在 24 小时内完成身份比对，结果将通过内部通讯渠道通知。
            </p>
            <div className="reg-success-info">
              <div className="info-row">
                <span className="info-key">申请编号</span>
                <span className="info-val">REG-{Math.floor(Math.random() * 9000 + 1000)}-{formData.imacId.slice(-4).toUpperCase() || "XXXX"}</span>
              </div>
              <div className="info-row">
                <span className="info-key">溯界者代号</span>
                <span className="info-val">{formData.codename || "—"}</span>
              </div>
              <div className="info-row">
                <span className="info-key">所属组织</span>
                <span className="info-val">{formData.organization || "—"}</span>
              </div>
              <div className="info-row">
                <span className="info-key">状态</span>
                <span className="info-val" style={{ color: "var(--level-ordinary)" }}>核验中</span>
              </div>
            </div>
            <div className="reg-success-actions">
              <button className="reg-btn-primary" onClick={() => navigate("/auth")}>
                返回登录
              </button>
              <button className="reg-btn-secondary" onClick={() => navigate("/")}>
                返回首页
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="reg-header">
              <div className="reg-classification-tag">
                <span className="dot"></span>
                CONFIDENTIAL · 机密级
              </div>
              <div className="reg-label">ANOMALIST ACCOUNT REGISTRATION</div>
              <h1 className="reg-title">溯界者账号注册</h1>
              <p className="reg-subtitle">
                本页面用于已通过 IMAC 认证的溯界者注册内部系统账号。
                注册需提供真实身份信息，所有数据经 IMAC 中央数据库核验。
              </p>
              <div className="reg-tip">
                尚未成为溯界者？<a onClick={() => navigate("/join")}>前往"加入我们"了解申请流程</a>
              </div>
            </div>

            <form className="reg-form-card" onSubmit={handleSubmit}>
              {/* 基本信息 */}
              <div className="reg-section">
                <div className="reg-section-title">
                  <span className="reg-section-num">1</span>
                  <span className="reg-section-name">基本信息</span>
                  <span className="reg-section-en">BASIC INFO</span>
                </div>
                <div className="reg-grid">
                  <div className="reg-field">
                    <label className="reg-label-text"><span className="req">*</span>真实姓名</label>
                    <input
                      type="text"
                      className={inputClass("realName")}
                      value={formData.realName}
                      onChange={(e) => handleChange("realName", e.target.value)}
                      placeholder="请输入真实姓名"
                    />
                    {errors.realName && <span className="reg-error-text">{errors.realName}</span>}
                  </div>
                  <div className="reg-field">
                    <label className="reg-label-text"><span className="req">*</span>代号 / 呼号</label>
                    <input
                      type="text"
                      className={inputClass("codename")}
                      value={formData.codename}
                      onChange={(e) => handleChange("codename", e.target.value)}
                      placeholder="行动中使用的代号"
                    />
                    {errors.codename && <span className="reg-error-text">{errors.codename}</span>}
                  </div>
                  <div className="reg-field">
                    <label className="reg-label-text"><span className="req">*</span>IMAC 编号</label>
                    <input
                      type="text"
                      className={inputClass("imacId")}
                      value={formData.imacId}
                      onChange={(e) => handleChange("imacId", e.target.value)}
                      placeholder="IMAC-OA-0312"
                    />
                    <span className="reg-field-hint">格式：IMAC-所属组织缩写-编号，由所属组织分配</span>
                    {errors.imacId && <span className="reg-error-text">{errors.imacId}</span>}
                  </div>
                  <div className="reg-field">
                    <label className="reg-label-text"><span className="req">*</span>所属组织</label>
                    <select
                      className={`reg-select ${errors.organization ? "error" : ""}`}
                      value={formData.organization}
                      onChange={(e) => handleChange("organization", e.target.value)}
                    >
                      <option value="">请选择</option>
                      {organizations.map((org) => (
                        <option key={org} value={org}>{org}</option>
                      ))}
                    </select>
                    {errors.organization && <span className="reg-error-text">{errors.organization}</span>}
                  </div>
                  <div className="reg-field">
                    <label className="reg-label-text"><span className="req">*</span>职级</label>
                    <select
                      className="reg-select"
                      value={formData.rank}
                      onChange={(e) => handleChange("rank", e.target.value)}
                    >
                      {ranks.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    <span className="reg-field-hint">注册账号默认职级为「见习」</span>
                    {errors.rank && <span className="reg-error-text">{errors.rank}</span>}
                  </div>
                  <div className="reg-field">
                    <label className="reg-label-text"><span className="req">*</span>联系方式</label>
                    <input
                      type="text"
                      className={inputClass("contact")}
                      value={formData.contact}
                      onChange={(e) => handleChange("contact", e.target.value)}
                      placeholder="邮箱或内部通讯号"
                    />
                    {errors.contact && <span className="reg-error-text">{errors.contact}</span>}
                  </div>
                </div>
              </div>

              {/* 账号安全 */}
              <div className="reg-section">
                <div className="reg-section-title">
                  <span className="reg-section-num">2</span>
                  <span className="reg-section-name">账号安全</span>
                  <span className="reg-section-en">SECURITY</span>
                </div>
                <div className="reg-grid">
                  <div className="reg-field reg-grid-full">
                    <label className="reg-label-text"><span className="req">*</span>设置密码</label>
                    <input
                      type="password"
                      className={inputClass("password")}
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      placeholder="至少8位，建议包含大小写字母、数字和符号"
                    />
                    <div className="reg-strength-bar">
                      {[0, 1, 2, 3].map((i) => (
                        <span key={i} className={i < passwordStrength ? "active" : ""}></span>
                      ))}
                    </div>
                    <div className="reg-strength-text">
                      密码强度：{formData.password ? strengthLabels[passwordStrength] : "请输入密码"}
                    </div>
                    {errors.password && <span className="reg-error-text">{errors.password}</span>}
                  </div>
                  <div className="reg-field reg-grid-full">
                    <label className="reg-label-text"><span className="req">*</span>确认密码</label>
                    <input
                      type="password"
                      className={inputClass("confirmPassword")}
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      placeholder="请再次输入密码"
                    />
                    {errors.confirmPassword && <span className="reg-error-text">{errors.confirmPassword}</span>}
                  </div>
                </div>
              </div>

              {/* 协议 + 提交 */}
              <div className="reg-section">
                <div className="reg-checkbox-field" style={{ marginBottom: "20px" }}>
                  <input
                    type="checkbox"
                    id="reg-agreement"
                    checked={formData.agreement}
                    onChange={(e) => handleChange("agreement", e.target.checked)}
                  />
                  <label htmlFor="reg-agreement" className="reg-checkbox-label">
                    我已阅读并同意<a>《IMAC 溯界者保密协议》</a>及<a>《异常行动安全准则》</a>，
                    承诺所填信息真实有效，愿意接受身份核验及相应纪律约束。
                  </label>
                </div>
                {errors.agreement && (
                  <div className="reg-error-text" style={{ marginBottom: "12px" }}>{errors.agreement}</div>
                )}
                <button type="submit" className="reg-submit-btn">
                  提 交 注 册
                </button>
              </div>
            </form>

            <div className="reg-footer-links">
              <a onClick={() => navigate("/auth")}>已有账号？返回登录</a>
              <span className="divider">|</span>
              <a onClick={() => navigate("/join")}>还不是溯界者？了解加入流程</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

window.RegisterPage = RegisterPage;
