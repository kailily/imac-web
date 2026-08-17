// Personal Profile page for internal staff
function ProfilePage() {
  const {
    navigate
  } = useRouter();
  const {
    canAccess,
    authLevel,
    identity,
    currentLevelInfo
  } = useAuth();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!canAccess("internal")) {
    return /*#__PURE__*/React.createElement("div", {
      className: "portal-denied"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "denied-box"
    }, /*#__PURE__*/React.createElement("h2", null, "\u6743\u9650\u4E0D\u8DB3"), /*#__PURE__*/React.createElement("p", null, "\u6B64\u9875\u9762\u4EC5\u9650\u5185\u90E8\u4EBA\u5458\u8BBF\u95EE\u3002\u8BF7\u5148\u5B8C\u6210\u8EAB\u4EFD\u8BA4\u8BC1\u3002"), /*#__PURE__*/React.createElement("button", {
      className: "btn-primary",
      onClick: () => navigate("/auth")
    }, "\u524D\u5F80\u8BA4\u8BC1"))));
  }
  const isTopSecret = authLevel === "topsecret";
  const codename = isTopSecret ? "桥柱" : "赤鸦";
  const realName = isTopSecret ? "Z" : "林深";
  const rank = isTopSecret ? "界标" : "资深溯界者";
  const org = isTopSecret ? "长桥会社 / IMAC总部" : "衔尾蛇事务所";
  const staffId = isTopSecret ? "IMAC-LBC-0001" : "IMAC-OA-0312";
  const avatarLetter = codename.charAt(0);
  const promotions = [{
    date: "安珀历33年",
    title: "认证见习溯界者",
    desc: "通过新人训练与基础考核"
  }, {
    date: "安珀历34年",
    title: "晋升溯界者",
    desc: "完成首次独立外勤任务"
  }, {
    date: "安珀历36年",
    title: "晋升资深溯界者",
    desc: "累计参与行动21次，成功解决12例异常"
  }];
  if (isTopSecret) {
    promotions.push({
      date: "安珀历38年",
      title: "晋升首席溯界者",
      desc: "担任赤月学院行动副指挥"
    });
    promotions.push({
      date: "安珀历39年",
      title: "授予界标职级",
      desc: "双城事件现场总指挥，获IMAC最高荣誉"
    });
  }
  const stats = [{
    label: "参与行动",
    value: isTopSecret ? "89" : "47",
    unit: "次"
  }, {
    label: "成功解决",
    value: isTopSecret ? "62" : "31",
    unit: "例"
  }, {
    label: "异常接触时长",
    value: isTopSecret ? "2,340" : "986",
    unit: "小时"
  }, {
    label: "累计外勤天数",
    value: isTopSecret ? "412" : "187",
    unit: "天"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
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
      `), /*#__PURE__*/React.createElement("div", {
    className: "profile-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-breadcrumb"
  }, /*#__PURE__*/React.createElement("span", {
    className: "crumb-link",
    onClick: () => navigate("/portal")
  }, "\u5185\u90E8\u6307\u6325\u4E2D\u5FC3"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, "\u4E2A\u4EBA\u6863\u6848")), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "\u4E2A\u4EBA\u6863\u6848"), /*#__PURE__*/React.createElement("div", {
    className: "page-title-en"
  }, "PERSONNEL FILE"), /*#__PURE__*/React.createElement("div", {
    className: "profile-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-avatar"
  }, avatarLetter), /*#__PURE__*/React.createElement("div", {
    className: "profile-codename"
  }, codename), /*#__PURE__*/React.createElement("div", {
    className: `profile-rank-badge ${isTopSecret ? "landmark" : ""}`
  }, isTopSecret ? "LANDMARK · 界标" : "SENIOR · 资深溯界者"), /*#__PURE__*/React.createElement("div", {
    className: "profile-id"
  }, staffId), /*#__PURE__*/React.createElement("div", {
    className: "profile-status"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-status-dot"
  }), /*#__PURE__*/React.createElement("span", null, "\u5728\u5C97 \xB7 \u5F85\u547D"))), /*#__PURE__*/React.createElement("div", {
    className: "profile-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u4E2A\u4EBA\u7EDF\u8BA1"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "SERVICE RECORD"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stats-row"
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "stat-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-box-num"
  }, s.value, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "14px",
      marginLeft: "2px"
    }
  }, s.unit)), /*#__PURE__*/React.createElement("div", {
    className: "stat-box-label"
  }, s.label)))))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u57FA\u672C\u4FE1\u606F"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "BASIC INFORMATION"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u771F\u5B9E\u59D3\u540D"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, realName)), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u4EE3\u53F7/\u547C\u53F7"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, codename)), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "IMAC\u7F16\u53F7"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, staffId)), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u804C\u7EA7"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, rank)), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u6240\u5C5E\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, org)), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u6743\u9650\u7B49\u7EA7"), /*#__PURE__*/React.createElement("span", {
    className: "info-value",
    style: {
      color: currentLevelInfo.color
    }
  }, currentLevelInfo.label, " \xB7 ", currentLevelInfo.en)), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u5F53\u524D\u72B6\u6001"), /*#__PURE__*/React.createElement("span", {
    className: "info-value",
    style: {
      color: "var(--level-ordinary)"
    }
  }, "\u25CF \u5728\u5C97\xB7\u5F85\u547D")), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u8BA4\u8BC1\u65E5\u671F"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, "\u5B89\u73C0\u538633\u5E74"))))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u804C\u7EA7\u664B\u5347\u8BB0\u5F55"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "PROMOTION HISTORY"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline"
  }, promotions.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "timeline-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline-dot"
  }), /*#__PURE__*/React.createElement("div", {
    className: "timeline-date"
  }, p.date), /*#__PURE__*/React.createElement("div", {
    className: "timeline-title"
  }, p.title), /*#__PURE__*/React.createElement("div", {
    className: "timeline-desc"
  }, p.desc)))))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u6240\u5C5E\u7EC4\u7EC7 & \u7D27\u6025\u8054\u7CFB\u4EBA"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "ORG & EMERGENCY CONTACT"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u76F4\u5C5E\u4E0A\u7EA7"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, isTopSecret ? "IMAC理事会" : "指挥官·吴峰")), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u6240\u5C5E\u5C0F\u961F"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, isTopSecret ? "联合指挥部" : "第三行动队")), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u7D27\u6025\u8054\u7CFB\u4EBA"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, "\u6797\u5973\u58EB\uFF08\u5BB6\u5C5E\uFF09")), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u8054\u7CFB\u7535\u8BDD"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, "\u5DF2\u52A0\u5BC6\u5B58\u50A8")), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u8840\u578B"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, "O \u578B Rh+")), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u8FC7\u654F\u53F2"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, "\u9752\u9709\u7D20"))))))), /*#__PURE__*/React.createElement("button", {
    className: "back-btn",
    onClick: () => navigate("/portal")
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5 M12 19l-7-7 7-7"
  })), "\u8FD4\u56DE\u6307\u6325\u4E2D\u5FC3"))));
}
window.ProfilePage = ProfilePage;