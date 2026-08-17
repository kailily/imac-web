// Training Records page
function TrainingPage() {
  const {
    navigate
  } = useRouter();
  const {
    canAccess,
    authLevel
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
    }, /*#__PURE__*/React.createElement("h2", null, "\u6743\u9650\u4E0D\u8DB3"), /*#__PURE__*/React.createElement("p", null, "\u6B64\u9875\u9762\u4EC5\u9650\u5185\u90E8\u4EBA\u5458\u8BBF\u95EE\u3002"), /*#__PURE__*/React.createElement("button", {
      className: "btn-primary",
      onClick: () => navigate("/auth")
    }, "\u524D\u5F80\u8BA4\u8BC1"))));
  }
  const isTopSecret = authLevel === "topsecret";
  const certifications = [{
    name: "异常分类学认证",
    level: "L3",
    issuer: "BRI · 边界研究院",
    date: "安珀历38年"
  }, {
    name: "规则解析方法论",
    level: "L2",
    issuer: "晨星团",
    date: "安珀历38年"
  }, {
    name: "战术撤退实操",
    level: "L3",
    issuer: "衔尾蛇事务所",
    date: "安珀历37年"
  }, {
    name: "心理防护训练",
    level: "L2",
    issuer: "悬铃木学会",
    date: "安珀历38年"
  }, {
    name: "联合行动指挥认证",
    level: "L2",
    issuer: "长桥会社",
    date: "安珀历39年"
  }];
  const trainingTimeline = [{
    date: "安珀历39年·秋",
    name: "第十一届赤月学院战前特训",
    result: "通过",
    issuer: "衔尾蛇事务所",
    desc: "为期四周的高强度针对性训练，含模拟实战、规则推演、心理强化三个模块。"
  }, {
    date: "安珀历39年·夏",
    name: "XDPS v4.2 协议栈升级培训",
    result: "优秀",
    issuer: "IMAC技术局",
    desc: "新协议栈操作规范与应急排障，考核成绩94分。"
  }, {
    date: "安珀历39年·春",
    name: "同化识别复训",
    result: "通过",
    issuer: "悬铃木学会",
    desc: "年度强制复训，含同化阶段识别、早期干预手段、自我监测方法。"
  }, {
    date: "安珀历38年·冬",
    name: "联合行动指挥进阶课程",
    result: "良好",
    issuer: "长桥会社",
    desc: "多国联合作战指挥流程、JRP规程实操、跨组织协调模拟。"
  }, {
    date: "安珀历38年·秋",
    name: "高级规则解析训练",
    result: "通过",
    issuer: "晨星团",
    desc: "复杂物理型异常的数学模型建立与边界预测方法。"
  }, {
    date: "安珀历37年·冬",
    name: "新人基础训练",
    result: "优秀",
    issuer: "IMAC训练协调部",
    desc: "为期三个月的基础训练，涵盖体能、规则认知、战术基础、心理建设四大模块。综合排名第7/120。"
  }];
  const upcoming = [{
    date: "安珀历39年·10月",
    title: "同化识别年度复训",
    type: "强制",
    days: 3
  }, {
    date: "安珀历39年·11月",
    title: "赤月学院第十一届出征前心理强化",
    type: "专项",
    days: 7
  }, {
    date: "安珀历39年·12月",
    title: "心理评估L3认证培训",
    type: "选修",
    days: 14
  }];
  const recommended = [{
    title: "认知类异常深度干预",
    org: "悬铃木学会",
    level: "L3",
    duration: "21天"
  }, {
    title: "极地生存与异常适应",
    org: "北境守望",
    level: "L2",
    duration: "30天"
  }, {
    title: "异常实体谈判技巧",
    org: "第四面墙",
    level: "L2",
    duration: "14天"
  }];
  const aitfProgress = 78;
  const aitfModules = [{
    name: "核心理论模块",
    done: true
  }, {
    name: "战术实操模块",
    done: true
  }, {
    name: "心理建设模块",
    done: true
  }, {
    name: "规则解析模块",
    done: true
  }, {
    name: "联合行动模块",
    done: false
  }, {
    name: "指挥进阶模块",
    done: false
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .training-page {
          background-color: var(--bg-deep);
          color: var(--text-primary);
          min-height: calc(100vh - 64px);
          padding-top: 80px;
          padding-bottom: 60px;
        }
        .training-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        .training-breadcrumb .crumb-link {
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
        .training-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 28px;
          margin-bottom: 28px;
        }
        .info-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          margin-bottom: 28px;
        }
        .info-card:last-child { margin-bottom: 0; }
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
        .cert-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cert-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px;
          background-color: rgba(18, 18, 22, 0.6);
          border: 1px solid var(--border-color);
        }
        .cert-item-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cert-item-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .cert-item-meta {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .cert-level {
          padding: 4px 10px;
          border: 1px solid var(--level-ordinary);
          color: var(--level-ordinary);
          font-family: var(--font-mono);
          font-size: 11px;
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
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .timeline-result {
          font-size: 10px;
          padding: 2px 8px;
          border: 1px solid var(--level-ordinary);
          color: var(--level-ordinary);
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }
        .timeline-result.good { border-color: var(--level-ordinary); color: var(--level-ordinary); }
        .timeline-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-top: 6px;
        }
        .timeline-issuer {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          margin-top: 4px;
        }

        /* AITF progress */
        .aitf-card {
          padding: 24px;
        }
        .aitf-title {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .aitf-subtitle {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 20px;
        }
        .aitf-progress-bar {
          height: 8px;
          background-color: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-color);
          position: relative;
          margin-bottom: 12px;
        }
        .aitf-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-red), var(--accent-red-bright));
          width: 78%;
        }
        .aitf-progress-label {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          margin-bottom: 20px;
        }
        .aitf-modules {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .aitf-module {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--text-secondary);
        }
        .aitf-module-check {
          width: 16px; height: 16px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
        }
        .aitf-module-check.done {
          border-color: var(--level-ordinary);
          color: var(--level-ordinary);
          background: rgba(74, 124, 89, 0.1);
        }
        .aitf-module-check.pending {
          border-color: var(--text-muted);
          color: var(--text-muted);
        }

        /* Upcoming */
        .upcoming-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .upcoming-item {
          padding: 14px 16px;
          background-color: rgba(18, 18, 22, 0.6);
          border: 1px solid var(--border-color);
          border-left: 3px solid var(--level-hazardous);
        }
        .upcoming-date {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--level-hazardous);
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }
        .upcoming-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 6px;
        }
        .upcoming-meta {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--text-tertiary);
        }
        .upcoming-tag {
          padding: 2px 8px;
          border: 1px solid;
          font-size: 10px;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .upcoming-tag.mandatory { border-color: var(--accent-red-bright); color: var(--accent-red-bright); }
        .upcoming-tag.special { border-color: var(--level-doomsday); color: var(--level-doomsday); }
        .upcoming-tag.elective { border-color: var(--text-muted); color: var(--text-muted); }

        /* Recommended */
        .rec-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .rec-item {
          padding: 12px 14px;
          border: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .rec-item:hover { border-color: var(--accent-red-bright); }
        .rec-item-name { font-size: 13px; color: var(--text-primary); margin-bottom: 4px; }
        .rec-item-meta { font-size: 10px; color: var(--text-tertiary); font-family: var(--font-mono); }

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
          .training-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .page-title { font-size: 24px; }
          .cert-item { flex-direction: column; align-items: flex-start; gap: 8px; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "training-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "training-breadcrumb"
  }, /*#__PURE__*/React.createElement("span", {
    className: "crumb-link",
    onClick: () => navigate("/portal")
  }, "\u5185\u90E8\u6307\u6325\u4E2D\u5FC3"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, "\u57F9\u8BAD\u8BB0\u5F55")), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "\u57F9\u8BAD\u8BB0\u5F55"), /*#__PURE__*/React.createElement("div", {
    className: "page-title-en"
  }, "TRAINING RECORDS"), /*#__PURE__*/React.createElement("div", {
    className: "training-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u5F53\u524D\u8BA4\u8BC1\u8D44\u8D28"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "CERTIFICATIONS")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      color: "var(--text-tertiary)"
    }
  }, certifications.length, " \u9879\u6709\u6548")), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cert-list"
  }, certifications.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cert-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cert-item-info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cert-item-name"
  }, c.name), /*#__PURE__*/React.createElement("span", {
    className: "cert-item-meta"
  }, c.issuer, " \xB7 ", c.date)), /*#__PURE__*/React.createElement("span", {
    className: "cert-level"
  }, c.level)))))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u57F9\u8BAD\u5386\u53F2"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "TRAINING HISTORY"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline"
  }, trainingTimeline.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "timeline-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline-dot"
  }), /*#__PURE__*/React.createElement("div", {
    className: "timeline-date"
  }, t.date), /*#__PURE__*/React.createElement("div", {
    className: "timeline-title"
  }, t.name, /*#__PURE__*/React.createElement("span", {
    className: `timeline-result ${t.result === "优秀" ? "good" : ""}`
  }, t.result)), /*#__PURE__*/React.createElement("div", {
    className: "timeline-issuer"
  }, t.issuer), /*#__PURE__*/React.createElement("div", {
    className: "timeline-desc"
  }, t.desc))))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "AITF \u8FBE\u6807\u8FDB\u5EA6"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "FRAMEWORK PROGRESS"))), /*#__PURE__*/React.createElement("div", {
    className: "aitf-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aitf-progress-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aitf-progress-fill",
    style: {
      width: `${aitfProgress}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "aitf-progress-label"
  }, /*#__PURE__*/React.createElement("span", null, "\u603B\u4F53\u8FDB\u5EA6"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)",
      fontWeight: 600
    }
  }, aitfProgress, "%")), /*#__PURE__*/React.createElement("div", {
    className: "aitf-modules"
  }, aitfModules.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "aitf-module"
  }, /*#__PURE__*/React.createElement("span", {
    className: `aitf-module-check ${m.done ? "done" : "pending"}`
  }, m.done ? "✓" : "○"), /*#__PURE__*/React.createElement("span", null, m.name)))))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u5F85\u5B8C\u6210 / \u5373\u5C06\u5230\u671F"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "UPCOMING"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "upcoming-list"
  }, upcoming.map((u, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "upcoming-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "upcoming-date"
  }, u.date), /*#__PURE__*/React.createElement("div", {
    className: "upcoming-title"
  }, u.title), /*#__PURE__*/React.createElement("div", {
    className: "upcoming-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: `upcoming-tag ${u.type === "强制" ? "mandatory" : u.type === "专项" ? "special" : "elective"}`
  }, u.type), /*#__PURE__*/React.createElement("span", null, u.days, " \u5929"))))))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u63A8\u8350\u8BFE\u7A0B"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "RECOMMENDED"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rec-list"
  }, recommended.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rec-item"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "rec-item-name"
  }, r.title), /*#__PURE__*/React.createElement("div", {
    className: "rec-item-meta"
  }, r.org, " \xB7 ", r.level, " \xB7 ", r.duration)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      fontSize: "12px"
    }
  }, "\u2192")))))))), /*#__PURE__*/React.createElement("button", {
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
window.TrainingPage = TrainingPage;