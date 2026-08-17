// Psychological Evaluation page
function PsychEvalPage() {
  const {
    navigate
  } = useRouter();
  const {
    canAccess
  } = useAuth();
  const [showBooking, setShowBooking] = React.useState(false);
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
  const metrics = [{
    name: "压力耐受性",
    value: 85,
    full: 100,
    color: "var(--level-ordinary)"
  }, {
    name: "共情节制",
    value: 72,
    full: 100,
    color: "#4a7cb4"
  }, {
    name: "身份稳定性",
    value: 91,
    full: 100,
    color: "var(--level-ordinary)"
  }, {
    name: "规则适应度",
    value: 78,
    full: 100,
    color: "#c49a2c"
  }, {
    name: "同化风险指数",
    value: 18,
    full: 100,
    color: "#c42828",
    inverse: true
  }];
  const history = [{
    date: "安珀历39年·夏·18",
    result: "正常",
    conclusion: "心理状态稳定，同化风险低，建议正常执行任务。",
    rater: "苏博士 · 悬铃木学会"
  }, {
    date: "安珀历39年·春·02",
    result: "正常",
    conclusion: "赤月学院行动前评估，状态良好，准予执行。",
    rater: "苏博士 · 悬铃木学会"
  }, {
    date: "安珀历38年·冬·15",
    result: "观察",
    conclusion: "长时间外勤后轻度解离倾向，建议休整两周。",
    rater: "苏博士 · 悬铃木学会"
  }, {
    date: "安珀历38年·秋·20",
    result: "正常",
    conclusion: "常规季度评估，各项指标正常。",
    rater: "刘医生 · IMAC医疗部"
  }];
  const stages = [{
    stage: "阶段零",
    name: "正常",
    desc: "同化风险极低，身份认知完整，可正常执行任务。",
    color: "var(--level-ordinary)",
    current: true
  }, {
    stage: "阶段一",
    name: "预警",
    desc: "出现轻度身份模糊或梦境异常，需要增加监测频率，不影响低风险任务。",
    color: "var(--level-hazardous)"
  }, {
    stage: "阶段二",
    name: "强制撤离",
    desc: "出现明显同化症状，记忆偏差或行为改变，立即撤离异常并接受干预。",
    color: "var(--level-doomsday)"
  }, {
    stage: "阶段三",
    name: "终止资格",
    desc: "同化程度不可逆转，身份持续漂移，永久解除溯界者资格并隔离观察。",
    color: "var(--level-abyssal)"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .psych-page {
          background-color: var(--bg-deep);
          color: var(--text-primary);
          min-height: calc(100vh - 64px);
          padding-top: 80px;
          padding-bottom: 60px;
        }
        .psych-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        .psych-breadcrumb .crumb-link {
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
        .psych-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
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
        .info-card-body { padding: 24px; }

        /* Status Banner */
        .status-banner {
          padding: 32px;
          background: linear-gradient(135deg, rgba(74, 124, 89, 0.15), rgba(74, 124, 89, 0.02));
          border: 1px solid rgba(74, 124, 89, 0.4);
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .status-banner-dot {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: var(--level-ordinary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0a0a0e;
          font-size: 24px;
          box-shadow: 0 0 30px rgba(74, 124, 89, 0.4);
          flex-shrink: 0;
        }
        .status-banner-text h2 {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          color: var(--level-ordinary);
          margin-bottom: 4px;
        }
        .status-banner-text p {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Metrics */
        .metrics-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .metric-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .metric-label {
          width: 100px;
          font-size: 13px;
          color: var(--text-secondary);
          flex-shrink: 0;
        }
        .metric-bar-wrap {
          flex: 1;
          height: 10px;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          position: relative;
        }
        .metric-bar-fill {
          height: 100%;
          transition: width 0.6s ease;
        }
        .metric-value {
          width: 48px;
          text-align: right;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-primary);
        }

        /* Latest eval */
        .eval-summary {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .eval-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .eval-meta-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }
        .eval-meta-value {
          font-size: 14px;
          color: var(--text-primary);
        }
        .eval-conclusion {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        /* Stages */
        .stages-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .stage-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px;
          border: 1px solid var(--border-color);
          background-color: rgba(18, 18, 22, 0.4);
        }
        .stage-item.current {
          border-color: var(--level-ordinary);
          background: rgba(74, 124, 89, 0.08);
        }
        .stage-code {
          padding: 4px 10px;
          border: 1px solid;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          flex-shrink: 0;
        }
        .stage-info {
          flex: 1;
        }
        .stage-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .stage-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* History */
        .history-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .history-item {
          padding: 16px 20px;
          border: 1px solid var(--border-color);
        }
        .history-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .history-date {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .history-result {
          font-size: 11px;
          padding: 2px 10px;
          border: 1px solid;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }
        .history-result.normal { border-color: var(--level-ordinary); color: var(--level-ordinary); }
        .history-result.watch { border-color: var(--level-hazardous); color: var(--level-hazardous); }
        .history-conclusion {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 6px;
        }
        .history-rater {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }

        /* Booking */
        .booking-card {
          text-align: center;
        }
        .booking-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(90deg, var(--accent-red), #8b1a1a);
          border: 1px solid var(--accent-red-bright);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s ease;
          font-family: var(--font-serif);
        }
        .booking-btn:hover { opacity: 0.9; }
        .booking-success {
          padding: 20px;
          background: rgba(74, 124, 89, 0.1);
          border: 1px solid var(--level-ordinary);
          color: var(--level-ordinary);
          font-size: 13px;
          line-height: 1.6;
          text-align: center;
        }
        .privacy-notice {
          margin-top: 14px;
          padding: 12px 16px;
          background: rgba(122, 58, 176, 0.06);
          border-left: 3px solid #7a3ab0;
          font-size: 11px;
          color: var(--text-tertiary);
          line-height: 1.6;
          font-family: var(--font-mono);
          letter-spacing: 0.02em;
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

        .notice-bar {
          padding: 14px 20px;
          background-color: rgba(139, 26, 26, 0.08);
          border: 1px solid rgba(196, 40, 40, 0.3);
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .notice-bar svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--accent-red-bright);
        }

        @media (max-width: 1024px) {
          .psych-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .page-title { font-size: 24px; }
          .eval-summary { grid-template-columns: 1fr; }
          .status-banner { flex-direction: column; align-items: flex-start; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "psych-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "psych-breadcrumb"
  }, /*#__PURE__*/React.createElement("span", {
    className: "crumb-link",
    onClick: () => navigate("/portal")
  }, "\u5185\u90E8\u6307\u6325\u4E2D\u5FC3"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, "\u5FC3\u7406\u8BC4\u4F30")), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "\u5FC3\u7406\u8BC4\u4F30"), /*#__PURE__*/React.createElement("div", {
    className: "page-title-en"
  }, "PSYCHOLOGICAL EVALUATION"), /*#__PURE__*/React.createElement("div", {
    className: "psych-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "status-banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "status-banner-dot"
  }, "\u2713"), /*#__PURE__*/React.createElement("div", {
    className: "status-banner-text"
  }, /*#__PURE__*/React.createElement("h2", null, "\u5F53\u524D\u72B6\u6001\uFF1A\u6B63\u5E38"), /*#__PURE__*/React.createElement("p", null, "\u540C\u5316\u98CE\u9669\u4F4E\uFF0C\u8EAB\u4EFD\u7A33\u5B9A\u6027\u826F\u597D\uFF0C\u53EF\u6267\u884C\u5168\u7B49\u7EA7\u4EFB\u52A1\u3002\u4E0B\u6B21\u8BC4\u4F30\uFF1A\u5B89\u73C0\u538639\u5E74\xB7\u51AC"))))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u6700\u8FD1\u4E00\u6B21\u8BC4\u4F30\u6458\u8981"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "LATEST EVALUATION"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eval-summary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eval-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eval-meta-label"
  }, "\u8BC4\u4F30\u65E5\u671F"), /*#__PURE__*/React.createElement("span", {
    className: "eval-meta-value"
  }, "\u5B89\u73C0\u538639\u5E74\xB7\u590F\xB718")), /*#__PURE__*/React.createElement("div", {
    className: "eval-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eval-meta-label"
  }, "\u8BC4\u4F30\u5E08"), /*#__PURE__*/React.createElement("span", {
    className: "eval-meta-value"
  }, "\u82CF\u535A\u58EB \xB7 \u60AC\u94C3\u6728\u5B66\u4F1A")), /*#__PURE__*/React.createElement("div", {
    className: "eval-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eval-meta-label"
  }, "\u8BC4\u4F30\u65B9\u5F0F"), /*#__PURE__*/React.createElement("span", {
    className: "eval-meta-value"
  }, "\u9762\u5BF9\u9762\u8BBF\u8C08 + \u91CF\u8868\u6D4B\u8BD5")), /*#__PURE__*/React.createElement("div", {
    className: "eval-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eval-meta-label"
  }, "\u603B\u4F53\u7ED3\u8BBA"), /*#__PURE__*/React.createElement("span", {
    className: "eval-meta-value",
    style: {
      color: "var(--level-ordinary)"
    }
  }, "\u6B63\u5E38 \xB7 \u51C6\u4E88\u6267\u884C\u5168\u7B49\u7EA7\u4EFB\u52A1"))), /*#__PURE__*/React.createElement("p", {
    className: "eval-conclusion"
  }, "\u88AB\u8BC4\u4F30\u8005\u5FC3\u7406\u72B6\u6001\u7A33\u5B9A\uFF0C\u8EAB\u4EFD\u8BA4\u77E5\u5B8C\u6574\uFF0C\u538B\u529B\u8010\u53D7\u826F\u597D\u3002\u8FD1\u671F\u53C2\u4E0E\u8D64\u6708\u5B66\u9662\u7B2C\u5341\u5C4A\u884C\u52A8\u9636\u6BB5\u6027\u4EFB\u52A1\u540E\uFF0C \u672A\u53D1\u73B0\u660E\u663E\u540C\u5316\u75C7\u72B6\u6216\u8BA4\u77E5\u504F\u5DEE\u3002\u68A6\u5883\u76D1\u6D4B\u6570\u636E\u6B63\u5E38\uFF0C\u672A\u51FA\u73B0\u53D9\u4E8B\u4FB5\u5165\u73B0\u8C61\u3002 \u5EFA\u8BAE\u7EF4\u6301\u6B63\u5E38\u4EFB\u52A1\u5B89\u6392\uFF0C\u4E0B\u5B63\u5EA6\u4F8B\u884C\u8BC4\u4F30\u6309\u671F\u8FDB\u884C\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u5404\u9879\u6307\u6807"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "METRICS"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metrics-list"
  }, metrics.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "metric-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "metric-label"
  }, m.name), /*#__PURE__*/React.createElement("div", {
    className: "metric-bar-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-bar-fill",
    style: {
      width: `${m.value}%`,
      backgroundColor: m.color,
      opacity: m.inverse ? 0.8 : 1
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "metric-value"
  }, m.value)))), /*#__PURE__*/React.createElement("div", {
    className: "notice-bar",
    style: {
      marginTop: "20px"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12.01",
    y2: "8"
  })), /*#__PURE__*/React.createElement("span", null, "\u6CE8\uFF1A\u540C\u5316\u98CE\u9669\u6307\u6570\u8D8A\u4F4E\u8D8A\u597D\uFF1B\u5176\u4F59\u6307\u6807\u8D8A\u9AD8\u8D8A\u597D\u3002")))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u8BC4\u4F30\u5386\u53F2"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "EVALUATION HISTORY"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "history-list"
  }, history.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "history-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "history-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "history-date"
  }, h.date), /*#__PURE__*/React.createElement("span", {
    className: `history-result ${h.result === "正常" ? "normal" : "watch"}`
  }, h.result)), /*#__PURE__*/React.createElement("div", {
    className: "history-conclusion"
  }, h.conclusion), /*#__PURE__*/React.createElement("div", {
    className: "history-rater"
  }, "\u8BC4\u4F30\u5E08\uFF1A", h.rater))))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u540C\u5316\u9636\u6BB5\u76D1\u6D4B"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "ASSIMILATION STAGES"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stages-list"
  }, stages.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `stage-item ${s.current ? "current" : ""}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "stage-code",
    style: {
      borderColor: s.color,
      color: s.color
    }
  }, s.stage), /*#__PURE__*/React.createElement("div", {
    className: "stage-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stage-name",
    style: {
      color: s.color
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    className: "stage-desc"
  }, s.desc)), s.current && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "10px",
      color: "var(--level-ordinary)",
      fontFamily: "var(--font-mono)"
    }
  }, "\u25CF \u5F53\u524D")))))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u5FC3\u7406\u54A8\u8BE2\u9884\u7EA6"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "BOOKING"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body booking-card"
  }, showBooking ? /*#__PURE__*/React.createElement("div", {
    className: "booking-success"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "24px",
      marginBottom: "10px",
      color: "var(--level-ordinary)"
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("strong", null, "\u5DF2\u63D0\u4EA4\u9884\u7EA6\u7533\u8BF7"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "12px",
      marginTop: "8px",
      display: "block",
      color: "var(--text-secondary)"
    }
  }, "IMAC\u5FC3\u7406\u90E8\u95E8\u5C06\u572848\u5C0F\u65F6\u5185\u5B89\u6392\u8BC4\u4F30\u5E08\u4E0E\u60A8\u786E\u8BA4\u65F6\u95F4")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "booking-btn",
    onClick: () => setShowBooking(true)
  }, "\u9884\u7EA6\u5FC3\u7406\u54A8\u8BE2"), /*#__PURE__*/React.createElement("div", {
    className: "privacy-notice"
  }, "\u5FC3\u7406\u8BC4\u4F30\u6570\u636E\u4EC5\u9650\u672C\u4EBA\u53CA IMAC \u5FC3\u7406\u90E8\u95E8\u8BBF\u95EE\u3002", /*#__PURE__*/React.createElement("br", null), "\u672A\u7ECF\u60A8\u4E66\u9762\u540C\u610F\uFF0C\u4EFB\u4F55\u7B2C\u4E09\u65B9\uFF08\u5305\u62EC\u6240\u5C5E\u7EC4\u7EC7\uFF09\u4E0D\u5F97\u67E5\u9605\u3002")))))), /*#__PURE__*/React.createElement("button", {
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
window.PsychEvalPage = PsychEvalPage;