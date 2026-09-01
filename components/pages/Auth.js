// Unified authentication page - 4 tier system
function AuthPage() {
  const {
    navigate
  } = useRouter();
  const {
    setAuth,
    logout,
    authLevel,
    levels,
    currentLevelInfo
  } = useAuth();
  const [selectedTier, setSelectedTier] = React.useState(null);
  const [formData, setFormData] = React.useState({});
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tiers = [{
    key: "public",
    label: "普通公民",
    level: "public",
    desc: "公开级，无需认证",
    color: levels.PUBLIC.color,
    content: ["首页全部内容", "应急指南", "异常科普", "公开新闻报道", "组织公开简介"],
    icon: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2 M12 7a4 4 0 110 8 4 4 0 010-8z",
    fields: [],
    submitLabel: "以公开身份访问"
  }, {
    key: "media",
    label: "注册媒体人员",
    level: "media",
    desc: "受限级，需媒体认证码",
    color: levels.MEDIA.color,
    content: ["公开级全部内容", "新闻报道规范", "三层审定流程", "五不披露原则", "组织非敏感数据"],
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
    fields: [{
      key: "mediaCode",
      label: "媒体认证码",
      type: "text",
      placeholder: "MED-XXXX-XXXX"
    }, {
      key: "organization",
      label: "所属媒体机构",
      type: "text",
      placeholder: "例如：鸣海新闻社"
    }],
    submitLabel: "媒体人员认证"
  }, {
    key: "internal",
    label: "溯界者 / 内部人员",
    level: "internal",
    desc: "机密级，需人员编号+密码",
    color: levels.INTERNAL.color,
    content: ["受限级全部内容", "异常信息数据库（常规至深渊级）", "组织内部详情", "装备说明", "同化风险详情"],
    icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z",
    fields: [{
      key: "staffId",
      label: "人员编号",
      type: "text",
      placeholder: "IMAC-OA-0312"
    }, {
      key: "password",
      label: "密码",
      type: "password",
      placeholder: "请输入密码"
    }],
    submitLabel: "内部人员认证"
  }, {
    key: "topsecret",
    label: "IMAC 管理员",
    level: "topsecret",
    desc: "绝密级，需管理员密钥",
    color: levels.TOPSECRET.color,
    content: ["机密级全部内容", "未知级异常完整档案", "所有组织完整内部数据", "进入记录原始数据", "IMAC 核心决策文件"],
    icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    fields: [{
      key: "adminId",
      label: "管理员编号",
      type: "text",
      placeholder: "IMAC-ADM-0001"
    }, {
      key: "token",
      label: "密钥令牌",
      type: "password",
      placeholder: "请输入动态密钥"
    }],
    submitLabel: "管理员认证"
  }];
  const currentTier = tiers.find(t => t.key === selectedTier);
  const handleSubmit = e => {
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

    // 匹配本地注册信息（纯前端演示：注册数据仅存于本机 localStorage）
    let identity;
    if (currentTier.level === "internal") {
      let registered = null;
      try {
        registered = JSON.parse(localStorage.getItem("imac_registered_profile") || "null");
      } catch (err) {}
      if (registered && registered.imacId) {
        const sid = (formData.staffId || "").trim().toUpperCase();
        const rid = String(registered.imacId).toUpperCase();
        if (sid === rid && formData.password === registered.password) {
          identity = {
            tier: "internal",
            name: registered.realName || currentTier.label,
            codename: registered.codename || "",
            staffId: registered.imacId,
            organization: registered.organization || "",
            rank: registered.rank || "见习",
            contact: registered.contact || ""
          };
        } else if (sid === rid) {
          setError("密码错误，请使用注册时设置的密码");
          return;
        }
      }
    }
    if (!identity) {
      identity = {
        tier: currentTier.key,
        name: currentTier.label,
        ...formData
      };
    }
    setAuth(currentTier.level, identity);
    const levelLabel = levels[currentTier.level.toUpperCase()]?.label || currentLevelInfo.label;
    if (identity.name && identity.name !== currentTier.label) {
      setSuccess(`认证成功，欢迎回来，${identity.name}`);
    } else {
      setSuccess(`认证成功，已获得${levelLabel}权限`);
    }
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
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
      `), /*#__PURE__*/React.createElement("div", {
    className: "auth-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-top-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-top-label"
  }, "IMAC ACCESS CONTROL"), /*#__PURE__*/React.createElement("h1", {
    className: "auth-top-title"
  }, "\u8EAB\u4EFD\u8BA4\u8BC1"), /*#__PURE__*/React.createElement("p", {
    className: "auth-top-desc"
  }, "IMAC \u5185\u5BB9\u8BBF\u95EE\u91C7\u7528\u5206\u7EA7\u673A\u5BC6\u4F53\u7CFB\u3002\u4E0D\u540C\u8EAB\u4EFD\u53EF\u8BBF\u95EE\u7684\u5185\u5BB9\u8303\u56F4\u4E0D\u540C\u3002 \u8BF7\u9009\u62E9\u60A8\u7684\u8EAB\u4EFD\u7C7B\u578B\u5E76\u5B8C\u6210\u8BA4\u8BC1\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "auth-current-status",
    style: {
      borderColor: currentLevelInfo.color,
      color: currentLevelInfo.color
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      backgroundColor: currentLevelInfo.color
    }
  }), "\u5F53\u524D\u6743\u9650\uFF1A", currentLevelInfo.label, " / ", currentLevelInfo.en, authLevel !== "public" && /*#__PURE__*/React.createElement("button", {
    onClick: handleLogout
  }, "\u9000\u51FA\u8BA4\u8BC1"))), /*#__PURE__*/React.createElement("div", {
    className: "auth-tiers"
  }, tiers.map(tier => /*#__PURE__*/React.createElement("div", {
    key: tier.key,
    className: `auth-tier-card ${selectedTier === tier.key ? "active" : ""}`,
    style: {
      "--tier-color": tier.color
    },
    onClick: () => {
      setSelectedTier(tier.key);
      setError("");
      setSuccess("");
    }
  }, /*#__PURE__*/React.createElement("svg", {
    className: "auth-tier-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: tier.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "auth-tier-label"
  }, tier.label), /*#__PURE__*/React.createElement("div", {
    className: "auth-tier-desc"
  }, tier.desc), /*#__PURE__*/React.createElement("span", {
    className: "auth-tier-badge"
  }, levels[tier.level.toUpperCase()].en)))), !currentTier && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "40px",
      border: "1px dashed var(--border-color)",
      color: "var(--text-tertiary)",
      fontSize: "13px",
      maxWidth: "500px",
      width: "100%"
    }
  }, "\u8BF7\u5728\u4E0A\u65B9\u9009\u62E9\u60A8\u7684\u8EAB\u4EFD\u7C7B\u578B\u5F00\u59CB\u8BA4\u8BC1"), currentTier && /*#__PURE__*/React.createElement("div", {
    className: "auth-form-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-form-title",
    style: {
      color: currentTier.color
    }
  }, currentTier.label, "\u8BA4\u8BC1"), /*#__PURE__*/React.createElement("p", {
    className: "auth-form-subtitle"
  }, "\u8BA4\u8BC1\u540E\u53EF\u83B7\u5F97\u4EE5\u4E0B\u8BBF\u95EE\u6743\u9650\uFF1A"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      marginBottom: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, currentTier.content.map((c, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "13px",
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: currentTier.color,
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })), c))), error && /*#__PURE__*/React.createElement("div", {
    className: "auth-error"
  }, error), success && /*#__PURE__*/React.createElement("div", {
    className: "auth-success"
  }, success), currentTier.fields.length > 0 ? /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, currentTier.fields.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.key,
    className: "auth-form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "auth-form-label"
  }, f.label), /*#__PURE__*/React.createElement("input", {
    className: "auth-form-input",
    type: f.type,
    placeholder: f.placeholder,
    value: formData[f.key] || "",
    onChange: e => setFormData({
      ...formData,
      [f.key]: e.target.value
    })
  }))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "auth-submit-btn"
  }, currentTier.submitLabel)) : /*#__PURE__*/React.createElement("button", {
    className: "auth-submit-btn",
    onClick: handleSubmit
  }, currentTier.submitLabel), /*#__PURE__*/React.createElement("div", {
    className: "auth-disclaimer"
  }, "\u672C\u9875\u9762\u4E3A\u6F14\u793A\u7CFB\u7EDF\uFF0C\u8BA4\u8BC1\u7ED3\u679C\u4EC5\u5728\u672C\u5730\u5B58\u50A8\uFF08localStorage\uFF09\u3002", /*#__PURE__*/React.createElement("br", null), "\u5A92\u4F53\u7EA7\uFF1A\u4EFB\u610F\u8BA4\u8BC1\u7801\u5747\u53EF\u901A\u8FC7\u3002", /*#__PURE__*/React.createElement("br", null), "\u673A\u5BC6\u7EA7\uFF1A\u4EFB\u610F IMAC-\u7EC4\u7EC7\u7F29\u5199-\u7F16\u53F7 \u5747\u53EF\u901A\u8FC7\u3002", /*#__PURE__*/React.createElement("br", null), "\u7EDD\u5BC6\u7EA7\uFF1A\u5BC6\u94A5\u4E3A TOPSECRET\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "auth-register-entry"
  }, /*#__PURE__*/React.createElement("span", null, "\u5DF2\u662F\u6EAF\u754C\u8005\u4F46\u6CA1\u6709\u8D26\u53F7\uFF1F"), /*#__PURE__*/React.createElement("button", {
    className: "auth-register-link",
    onClick: () => navigate("/register")
  }, "\u6CE8\u518C\u6EAF\u754C\u8005\u8D26\u53F7 \u2192")))));
}
window.AuthPage = AuthPage;