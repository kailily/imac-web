function RegisterPage() {
  const {
    navigate
  } = useRouter();
  const [formData, setFormData] = React.useState({
    realName: "",
    codename: "",
    imacId: "",
    organization: "",
    rank: "见习",
    password: "",
    confirmPassword: "",
    contact: "",
    agreement: false
  });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const organizations = ["衔尾蛇事务所", "北境守望", "边界研究院", "晨星团", "第四面墙", "悬铃木学会", "白夜哨站", "长桥会社"];
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
    setFormData({
      ...formData,
      [key]: value
    });
    if (errors[key]) {
      setErrors({
        ...errors,
        [key]: ""
      });
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
  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      // 保存注册信息到本地（纯前端演示：信息仅保留在本机浏览器 localStorage，不上传任何服务器）
      try {
        localStorage.setItem("imac_registered_profile", JSON.stringify({
          realName: formData.realName.trim(),
          codename: formData.codename.trim(),
          imacId: formData.imacId.trim().toUpperCase(),
          organization: formData.organization,
          rank: formData.rank,
          contact: formData.contact.trim(),
          password: formData.password
        }));
      } catch (err) {}
      setSubmitted(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };
  const inputClass = key => `reg-input ${errors[key] ? "error" : ""}`;
  return /*#__PURE__*/React.createElement("div", {
    className: "register-page"
  }, /*#__PURE__*/React.createElement("style", null, `
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
      `), /*#__PURE__*/React.createElement("div", {
    className: "register-watermark"
  }, "IMAC CONFIDENTIAL"), /*#__PURE__*/React.createElement("div", {
    className: "register-container"
  }, submitted ? /*#__PURE__*/React.createElement("div", {
    className: "reg-success-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-success-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("h2", {
    className: "reg-success-title"
  }, "\u6CE8\u518C\u7533\u8BF7\u5DF2\u63D0\u4EA4"), /*#__PURE__*/React.createElement("p", {
    className: "reg-success-desc"
  }, "\u60A8\u7684\u6EAF\u754C\u8005\u8D26\u53F7\u6CE8\u518C\u7533\u8BF7\u5DF2\u63D0\u4EA4\u81F3 IMAC \u4E2D\u592E\u6570\u636E\u5E93\u6838\u9A8C\u3002 \u7CFB\u7EDF\u5C06\u5728 24 \u5C0F\u65F6\u5185\u5B8C\u6210\u8EAB\u4EFD\u6BD4\u5BF9\uFF0C\u7ED3\u679C\u5C06\u901A\u8FC7\u5185\u90E8\u901A\u8BAF\u6E20\u9053\u901A\u77E5\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "reg-success-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u7533\u8BF7\u7F16\u53F7"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, "REG-", Math.floor(Math.random() * 9000 + 1000), "-", formData.imacId.slice(-4).toUpperCase() || "XXXX")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u6EAF\u754C\u8005\u4EE3\u53F7"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, formData.codename || "—")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u6240\u5C5E\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, formData.organization || "—")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u72B6\u6001"), /*#__PURE__*/React.createElement("span", {
    className: "info-val",
    style: {
      color: "var(--level-ordinary)"
    }
  }, "\u6838\u9A8C\u4E2D"))), /*#__PURE__*/React.createElement("div", {
    className: "reg-success-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "reg-btn-primary",
    onClick: () => navigate("/auth")
  }, "\u8FD4\u56DE\u767B\u5F55"), /*#__PURE__*/React.createElement("button", {
    className: "reg-btn-secondary",
    onClick: () => navigate("/")
  }, "\u8FD4\u56DE\u9996\u9875"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "reg-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-classification-tag"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "CONFIDENTIAL \xB7 \u673A\u5BC6\u7EA7"), /*#__PURE__*/React.createElement("div", {
    className: "reg-label"
  }, "ANOMALIST ACCOUNT REGISTRATION"), /*#__PURE__*/React.createElement("h1", {
    className: "reg-title"
  }, "\u6EAF\u754C\u8005\u8D26\u53F7\u6CE8\u518C"), /*#__PURE__*/React.createElement("p", {
    className: "reg-subtitle"
  }, "\u672C\u9875\u9762\u7528\u4E8E\u5DF2\u901A\u8FC7 IMAC \u8BA4\u8BC1\u7684\u6EAF\u754C\u8005\u6CE8\u518C\u5185\u90E8\u7CFB\u7EDF\u8D26\u53F7\u3002 \u6CE8\u518C\u9700\u63D0\u4F9B\u771F\u5B9E\u8EAB\u4EFD\u4FE1\u606F\uFF0C\u6240\u6709\u6570\u636E\u7ECF IMAC \u4E2D\u592E\u6570\u636E\u5E93\u6838\u9A8C\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "reg-tip"
  }, "\u5C1A\u672A\u6210\u4E3A\u6EAF\u754C\u8005\uFF1F", /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/join")
  }, "\u524D\u5F80\"\u52A0\u5165\u6211\u4EEC\"\u4E86\u89E3\u7533\u8BF7\u6D41\u7A0B"))), /*#__PURE__*/React.createElement("form", {
    className: "reg-form-card",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-section-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "reg-section-num"
  }, "1"), /*#__PURE__*/React.createElement("span", {
    className: "reg-section-name"
  }, "\u57FA\u672C\u4FE1\u606F"), /*#__PURE__*/React.createElement("span", {
    className: "reg-section-en"
  }, "BASIC INFO")), /*#__PURE__*/React.createElement("div", {
    className: "reg-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u771F\u5B9E\u59D3\u540D"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputClass("realName"),
    value: formData.realName,
    onChange: e => handleChange("realName", e.target.value),
    placeholder: "\u8BF7\u8F93\u5165\u771F\u5B9E\u59D3\u540D"
  }), errors.realName && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.realName)), /*#__PURE__*/React.createElement("div", {
    className: "reg-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u4EE3\u53F7 / \u547C\u53F7"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputClass("codename"),
    value: formData.codename,
    onChange: e => handleChange("codename", e.target.value),
    placeholder: "\u884C\u52A8\u4E2D\u4F7F\u7528\u7684\u4EE3\u53F7"
  }), errors.codename && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.codename)), /*#__PURE__*/React.createElement("div", {
    className: "reg-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "IMAC \u7F16\u53F7"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputClass("imacId"),
    value: formData.imacId,
    onChange: e => handleChange("imacId", e.target.value),
    placeholder: "IMAC-OA-0312"
  }), /*#__PURE__*/React.createElement("span", {
    className: "reg-field-hint"
  }, "\u683C\u5F0F\uFF1AIMAC-\u6240\u5C5E\u7EC4\u7EC7\u7F29\u5199-\u7F16\u53F7\uFF0C\u7531\u6240\u5C5E\u7EC4\u7EC7\u5206\u914D"), errors.imacId && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.imacId)), /*#__PURE__*/React.createElement("div", {
    className: "reg-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u6240\u5C5E\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("select", {
    className: `reg-select ${errors.organization ? "error" : ""}`,
    value: formData.organization,
    onChange: e => handleChange("organization", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u8BF7\u9009\u62E9"), organizations.map(org => /*#__PURE__*/React.createElement("option", {
    key: org,
    value: org
  }, org))), errors.organization && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.organization)), /*#__PURE__*/React.createElement("div", {
    className: "reg-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u804C\u7EA7"), /*#__PURE__*/React.createElement("select", {
    className: "reg-select",
    value: formData.rank,
    onChange: e => handleChange("rank", e.target.value)
  }, ranks.map(r => /*#__PURE__*/React.createElement("option", {
    key: r,
    value: r
  }, r))), /*#__PURE__*/React.createElement("span", {
    className: "reg-field-hint"
  }, "\u6CE8\u518C\u8D26\u53F7\u9ED8\u8BA4\u804C\u7EA7\u4E3A\u300C\u89C1\u4E60\u300D"), errors.rank && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.rank)), /*#__PURE__*/React.createElement("div", {
    className: "reg-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u8054\u7CFB\u65B9\u5F0F"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputClass("contact"),
    value: formData.contact,
    onChange: e => handleChange("contact", e.target.value),
    placeholder: "\u90AE\u7BB1\u6216\u5185\u90E8\u901A\u8BAF\u53F7"
  }), errors.contact && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.contact)))), /*#__PURE__*/React.createElement("div", {
    className: "reg-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-section-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "reg-section-num"
  }, "2"), /*#__PURE__*/React.createElement("span", {
    className: "reg-section-name"
  }, "\u8D26\u53F7\u5B89\u5168"), /*#__PURE__*/React.createElement("span", {
    className: "reg-section-en"
  }, "SECURITY")), /*#__PURE__*/React.createElement("div", {
    className: "reg-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-field reg-grid-full"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u8BBE\u7F6E\u5BC6\u7801"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    className: inputClass("password"),
    value: formData.password,
    onChange: e => handleChange("password", e.target.value),
    placeholder: "\u81F3\u5C118\u4F4D\uFF0C\u5EFA\u8BAE\u5305\u542B\u5927\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u548C\u7B26\u53F7"
  }), /*#__PURE__*/React.createElement("div", {
    className: "reg-strength-bar"
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: i < passwordStrength ? "active" : ""
  }))), /*#__PURE__*/React.createElement("div", {
    className: "reg-strength-text"
  }, "\u5BC6\u7801\u5F3A\u5EA6\uFF1A", formData.password ? strengthLabels[passwordStrength] : "请输入密码"), errors.password && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.password)), /*#__PURE__*/React.createElement("div", {
    className: "reg-field reg-grid-full"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u786E\u8BA4\u5BC6\u7801"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    className: inputClass("confirmPassword"),
    value: formData.confirmPassword,
    onChange: e => handleChange("confirmPassword", e.target.value),
    placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801"
  }), errors.confirmPassword && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.confirmPassword)))), /*#__PURE__*/React.createElement("div", {
    className: "reg-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-checkbox-field",
    style: {
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "reg-agreement",
    checked: formData.agreement,
    onChange: e => handleChange("agreement", e.target.checked)
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "reg-agreement",
    className: "reg-checkbox-label"
  }, "\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F", /*#__PURE__*/React.createElement("a", null, "\u300AIMAC \u6EAF\u754C\u8005\u4FDD\u5BC6\u534F\u8BAE\u300B"), "\u53CA", /*#__PURE__*/React.createElement("a", null, "\u300A\u5F02\u5E38\u884C\u52A8\u5B89\u5168\u51C6\u5219\u300B"), "\uFF0C \u627F\u8BFA\u6240\u586B\u4FE1\u606F\u771F\u5B9E\u6709\u6548\uFF0C\u613F\u610F\u63A5\u53D7\u8EAB\u4EFD\u6838\u9A8C\u53CA\u76F8\u5E94\u7EAA\u5F8B\u7EA6\u675F\u3002")), errors.agreement && /*#__PURE__*/React.createElement("div", {
    className: "reg-error-text",
    style: {
      marginBottom: "12px"
    }
  }, errors.agreement), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "reg-submit-btn"
  }, "\u63D0 \u4EA4 \u6CE8 \u518C"))), /*#__PURE__*/React.createElement("div", {
    className: "reg-footer-links"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/auth")
  }, "\u5DF2\u6709\u8D26\u53F7\uFF1F\u8FD4\u56DE\u767B\u5F55"), /*#__PURE__*/React.createElement("span", {
    className: "divider"
  }, "|"), /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/join")
  }, "\u8FD8\u4E0D\u662F\u6EAF\u754C\u8005\uFF1F\u4E86\u89E3\u52A0\u5165\u6D41\u7A0B")))));
}
window.RegisterPage = RegisterPage;