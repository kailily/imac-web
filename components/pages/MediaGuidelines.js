// Media Guidelines Page
function MediaGuidelinesPage() {
  const {
    navigate
  } = useRouter();
  const principles = [{
    num: "01",
    title: "不提及异常内部的具体规则",
    desc: "规则是异常最核心的信息，公开规则可能导致模仿行为、好奇心驱使的主动进入，以及别有用心者的利用。报道中应模糊化处理，如使用「特定行为要求」「内部约束」等替代表述。"
  }, {
    num: "02",
    title: "不描述惩罚或死亡的具体方式",
    desc: "对惩罚机制和死亡方式的具体描述会引发公众恐慌、激发不良模仿，以及对受害者的二次伤害。一律使用「人员失踪」「未成功撤离」「伤亡」等中性表述。"
  }, {
    num: "03",
    title: "不暴露溯界者进入异常时的具体装备和战术",
    desc: "具体的装备清单和战术流程属于组织机密，公开可能让潜在威胁方获得可乘之机。可使用「专业设备」「标准作业流程」等概括性表述。"
  }, {
    num: "04",
    title: "不披露异常入口的精确地理位置",
    desc: "精确地理位置的披露可能引发好奇人群聚集、自媒体探访，甚至破坏周边居民正常生活。仅表述至城市一级即可，必要时可使用模糊的区域名称。"
  }, {
    num: "05",
    title: "不使用可能引发模仿行为的细节描述",
    desc: "某些异常的触发条件与特定行为相关，详细描述可能导致易感人群主动触发。所有可能被复制的行为细节一律删除或彻底改写。"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .guidelines-page {
          padding-top: 64px;
          background-color: var(--bg-primary);
          min-height: 100vh;
        }
        .guidelines-auth-bar {
          background-color: var(--bg-deep);
          border-bottom: 1px solid var(--border-color);
          padding: 12px 0;
          position: sticky;
          top: 64px;
          z-index: 100;
        }
        .guidelines-auth-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .guidelines-auth-status {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-mono); font-size: 11px;
          color: var(--text-secondary);
        }
        .guidelines-auth-status .dot {
          width: 8px; height: 8px; border-radius: 50%;
          background-color: var(--steel-blue-light);
        }
        .guidelines-logout {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--text-tertiary); letter-spacing: 0.1em; cursor: pointer;
          transition: color 0.2s ease;
        }
        .guidelines-logout:hover { color: var(--steel-blue-light); }
        .guidelines-header {
          padding: 60px 0 30px;
          border-bottom: 1px solid var(--border-color);
        }
        .guidelines-breadcrumb {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-muted); letter-spacing: 0.1em;
          margin-bottom: 20px; cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .guidelines-breadcrumb:hover { color: var(--steel-blue-light); }
        .guidelines-title {
          font-family: var(--font-serif); font-size: 36px;
          font-weight: 900; color: var(--text-primary);
          letter-spacing: 0.08em; margin-bottom: 8px;
        }
        .guidelines-subtitle {
          font-family: var(--font-mono); font-size: 13px;
          color: var(--text-tertiary); letter-spacing: 0.15em;
          margin-bottom: 16px;
        }
        .guidelines-desc {
          max-width: 640px;
          font-size: 14px; color: var(--text-secondary); line-height: 1.8;
        }
        .guidelines-section {
          padding: 60px 0;
          border-bottom: 1px solid var(--border-color);
        }
        .guidelines-section:last-child { border-bottom: none; }
        .guidelines-section-title {
          font-family: var(--font-serif); font-size: 26px;
          font-weight: 700; color: var(--text-primary);
          margin-bottom: 8px;
          display: flex; align-items: center; gap: 14px;
        }
        .guidelines-section-title::before {
          content: "";
          width: 4px; height: 26px;
          background-color: var(--steel-blue-light);
        }
        .guidelines-section-en {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-tertiary); letter-spacing: 0.15em;
          text-transform: uppercase; margin-bottom: 30px;
          padding-left: 18px;
        }
        /* Three layers */
        .three-layers {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background-color: var(--border-color);
          border: 1px solid var(--border-color);
        }
        .layer-card {
          background-color: var(--bg-card);
          padding: 32px 28px;
        }
        .layer-num {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--steel-blue-light); letter-spacing: 0.1em;
          margin-bottom: 16px;
        }
        .layer-title {
          font-family: var(--font-serif); font-size: 20px;
          font-weight: 700; color: var(--text-primary);
          margin-bottom: 4px;
        }
        .layer-en {
          font-family: var(--font-mono); font-size: 10px;
          color: var(--text-tertiary); letter-spacing: 0.15em;
          margin-bottom: 16px;
        }
        .layer-desc {
          font-size: 13px; color: var(--text-secondary); line-height: 1.7;
        }
        .layer-responsibility {
          margin-top: 16px; padding-top: 14px;
          border-top: 1px dashed var(--border-color);
          font-size: 12px; color: var(--text-muted);
          font-family: var(--font-mono); letter-spacing: 0.05em;
        }
        /* Five principles */
        .principles-list {
          display: flex; flex-direction: column; gap: 0;
        }
        .principle-item {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 32px;
          padding: 28px 0;
          border-bottom: 1px solid var(--border-color);
          align-items: flex-start;
        }
        .principle-item:first-child { border-top: 1px solid var(--border-color); }
        .principle-num {
          font-family: var(--font-serif); font-size: 48px;
          font-weight: 900; color: var(--accent-red-bright);
          line-height: 1; text-align: center;
          padding-top: 4px;
        }
        .principle-content { display: flex; flex-direction: column; gap: 8px; }
        .principle-title {
          font-family: var(--font-serif); font-size: 20px;
          font-weight: 700; color: var(--text-primary);
        }
        .principle-desc {
          font-size: 14px; color: var(--text-secondary); line-height: 1.8;
        }
        /* Encouraged */
        .encouraged-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
        }
        .encouraged-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 24px 20px;
          display: flex; gap: 16px; align-items: flex-start;
        }
        .encouraged-icon {
          width: 36px; height: 36px;
          color: var(--level-ordinary);
          flex-shrink: 0;
        }
        .encouraged-title {
          font-size: 15px; font-weight: 600;
          color: var(--text-primary); margin-bottom: 6px;
        }
        .encouraged-desc {
          font-size: 12px; color: var(--text-secondary); line-height: 1.6;
        }
        /* Strategy */
        .strategy-box {
          background-color: rgba(74, 88, 104, 0.08);
          border: 1px solid var(--steel-blue-dark);
          padding: 36px 32px;
          position: relative;
        }
        .strategy-label {
          position: absolute; top: -12px; left: 24px;
          background-color: var(--bg-primary);
          padding: 0 14px;
          font-family: var(--font-mono); font-size: 10px;
          color: var(--steel-blue-light); letter-spacing: 0.15em;
        }
        .strategy-title {
          font-family: var(--font-serif); font-size: 22px;
          font-weight: 700; color: var(--text-primary);
          margin-bottom: 16px;
        }
        .strategy-text {
          font-size: 14px; color: var(--text-secondary); line-height: 1.9;
        }
        .strategy-text p { margin-bottom: 12px; }
        .strategy-text p:last-child { margin-bottom: 0; }
        .strategy-text strong { color: var(--text-primary); }
        .strategy-key {
          margin-top: 20px; padding-top: 16px;
          border-top: 1px dashed var(--border-color);
          display: flex; flex-wrap: wrap; gap: 10px;
        }
        .strategy-key span {
          padding: 5px 14px;
          background-color: rgba(74, 88, 104, 0.15);
          border: 1px solid var(--steel-blue-dark);
          font-family: var(--font-mono); font-size: 11px;
          color: var(--steel-blue-light); letter-spacing: 0.05em;
        }
        .guidelines-back-wrap {
          padding: 40px 0 60px;
          text-align: center;
        }
        .guidelines-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--steel-blue-light); letter-spacing: 0.15em;
          cursor: pointer;
          border-bottom: 1px solid var(--steel-blue-light);
          padding-bottom: 2px;
        }
        @media (max-width: 1024px) {
          .three-layers { grid-template-columns: 1fr; }
          .encouraged-grid { grid-template-columns: 1fr; }
          .principle-item { grid-template-columns: 60px 1fr; gap: 20px; }
          .principle-num { font-size: 36px; }
        }
        @media (max-width: 768px) {
          .guidelines-title { font-size: 26px; }
          .guidelines-section { padding: 40px 0; }
          .guidelines-section-title { font-size: 22px; }
          .principle-item { grid-template-columns: 1fr; gap: 8px; }
          .principle-num { font-size: 28px; text-align: left; }
          .strategy-box { padding: 24px 20px; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "guidelines-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "guidelines-auth-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "guidelines-auth-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "guidelines-auth-status"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, "\u5A92\u4F53\u8BA4\u8BC1 \xB7 \u5DF2\u767B\u5F55 / MEDIA CREDENTIAL: VERIFIED")), /*#__PURE__*/React.createElement("span", {
    className: "guidelines-logout",
    onClick: () => navigate("/")
  }, "\u9000\u51FA"))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "guidelines-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "guidelines-breadcrumb",
    onClick: () => navigate("/")
  }, "\u2190 \u8FD4\u56DE\u9996\u9875"), /*#__PURE__*/React.createElement("h1", {
    className: "guidelines-title"
  }, "\u5F02\u5E38\u62A5\u9053\u5BA1\u5B9A\u89C4\u8303"), /*#__PURE__*/React.createElement("div", {
    className: "guidelines-subtitle"
  }, "REPORTING GUIDELINES \xB7 IMAC INFORMATION COORDINATION OFFICE"), /*#__PURE__*/React.createElement("p", {
    className: "guidelines-desc"
  }, "\u672C\u89C4\u8303\u7531 IMAC \u4FE1\u606F\u534F\u8C03\u529E\u516C\u5BA4\u5236\u5B9A\uFF0C\u6240\u6709\u8BA4\u8BC1\u5A92\u4F53\u6210\u5458\u53CA\u7EC4\u7EC7\u516C\u5173\u90E8\u95E8\u5747\u9700\u9075\u5B88\u3002 \u89C4\u8303\u65E8\u5728\u5E73\u8861\u516C\u4F17\u77E5\u60C5\u6743\u4E0E\u793E\u4F1A\u7A33\u5B9A\uFF0C\u907F\u514D\u56E0\u4FE1\u606F\u62AB\u9732\u4E0D\u5F53\u9020\u6210\u6B21\u751F\u707E\u5BB3\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "guidelines-section"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "guidelines-section-title"
  }, "\u4E09\u5C42\u5BA1\u5B9A\u673A\u5236"), /*#__PURE__*/React.createElement("div", {
    className: "guidelines-section-en"
  }, "THREE-TIER REVIEW SYSTEM"), /*#__PURE__*/React.createElement("div", {
    className: "three-layers"
  }, /*#__PURE__*/React.createElement("div", {
    className: "layer-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "layer-num mono"
  }, "TIER 01"), /*#__PURE__*/React.createElement("div", {
    className: "layer-title"
  }, "\u7EC4\u7EC7\u5185\u90E8\u521D\u5BA1"), /*#__PURE__*/React.createElement("div", {
    className: "layer-en"
  }, "ORGANIZATIONAL REVIEW"), /*#__PURE__*/React.createElement("p", {
    className: "layer-desc"
  }, "\u7531\u4E8B\u53D1\u5730\u6240\u5C5E\u8BA4\u8BC1\u7EC4\u7EC7\u7684\u516C\u5173\u90E8\u95E8\u8FDB\u884C\u7B2C\u4E00\u7EA7\u5BA1\u6838\u3002 \u6838\u5BF9\u4E8B\u5B9E\u51C6\u786E\u6027\u3001\u5220\u9664\u654F\u611F\u4FE1\u606F\u3001\u786E\u4FDD\u4E0D\u8FDD\u53CD\u4E94\u6761\u4E0D\u62AB\u9732\u539F\u5219\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "layer-responsibility"
  }, "\u8D23\u4EFB\u4E3B\u4F53\uFF1A\u5404\u8BA4\u8BC1\u7EC4\u7EC7\u516C\u5173\u90E8")), /*#__PURE__*/React.createElement("div", {
    className: "layer-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "layer-num mono"
  }, "TIER 02"), /*#__PURE__*/React.createElement("div", {
    className: "layer-title"
  }, "IMAC \u590D\u5BA1"), /*#__PURE__*/React.createElement("div", {
    className: "layer-en"
  }, "IMAC COORDINATION REVIEW"), /*#__PURE__*/React.createElement("p", {
    className: "layer-desc"
  }, "IMAC \u4FE1\u606F\u534F\u8C03\u529E\u516C\u5BA4\u8FDB\u884C\u7B2C\u4E8C\u7EA7\u5BA1\u6838\u3002 \u7EDF\u4E00\u8868\u8FF0\u53E3\u5F84\u3001\u534F\u8C03\u8DE8\u533A\u57DF\u5F71\u54CD\u3001\u8BC4\u4F30\u5BF9\u516C\u4F17\u60C5\u7EEA\u7684\u6574\u4F53\u5F71\u54CD\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "layer-responsibility"
  }, "\u8D23\u4EFB\u4E3B\u4F53\uFF1AIMAC \u4FE1\u606F\u534F\u8C03\u529E")), /*#__PURE__*/React.createElement("div", {
    className: "layer-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "layer-num mono"
  }, "TIER 03"), /*#__PURE__*/React.createElement("div", {
    className: "layer-title"
  }, "\u6240\u5728\u56FD\u7EC8\u5BA1"), /*#__PURE__*/React.createElement("div", {
    className: "layer-en"
  }, "NATIONAL REGULATORY REVIEW"), /*#__PURE__*/React.createElement("p", {
    className: "layer-desc"
  }, "\u4E8B\u53D1\u5730\u6240\u5728\u56FD\u4FE1\u606F\u76D1\u7BA1\u90E8\u95E8\u8FDB\u884C\u6700\u7EC8\u7EA7\u5BA1\u6838\u3002 \u7ED3\u5408\u672C\u5730\u6CD5\u5F8B\u6CD5\u89C4\u548C\u793E\u4F1A\u72B6\u51B5\uFF0C\u51B3\u5B9A\u53D1\u5E03\u8303\u56F4\u548C\u63AA\u8F9E\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "layer-responsibility"
  }, "\u8D23\u4EFB\u4E3B\u4F53\uFF1A\u5404\u56FD\u4FE1\u606F\u76D1\u7BA1\u90E8\u95E8")))), /*#__PURE__*/React.createElement("div", {
    className: "guidelines-section",
    style: {
      backgroundColor: "var(--bg-secondary)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "guidelines-section-title"
  }, "\u4E94\u6761\u4E0D\u62AB\u9732\u539F\u5219"), /*#__PURE__*/React.createElement("div", {
    className: "guidelines-section-en"
  }, "FIVE NON-DISCLOSURE PRINCIPLES"), /*#__PURE__*/React.createElement("div", {
    className: "principles-list"
  }, principles.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.num,
    className: "principle-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "principle-num"
  }, p.num), /*#__PURE__*/React.createElement("div", {
    className: "principle-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "principle-title"
  }, p.title), /*#__PURE__*/React.createElement("p", {
    className: "principle-desc"
  }, p.desc)))))), /*#__PURE__*/React.createElement("div", {
    className: "guidelines-section"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "guidelines-section-title"
  }, "\u9F13\u52B1\u62A5\u9053\u5185\u5BB9"), /*#__PURE__*/React.createElement("div", {
    className: "guidelines-section-en"
  }, "ENCOURAGED CONTENT"), /*#__PURE__*/React.createElement("div", {
    className: "encouraged-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "encouraged-card"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "encouraged-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "9",
    x2: "12",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17",
    x2: "12.01",
    y2: "17"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "encouraged-title"
  }, "\u5B89\u5168\u63D0\u9192"), /*#__PURE__*/React.createElement("p", {
    className: "encouraged-desc"
  }, "\u53D1\u5E03\u5B89\u5168\u63D0\u793A\u3001\u64A4\u79BB\u6307\u5F15\u3001\u9632\u8303\u77E5\u8BC6\u7B49\u6709\u52A9\u4E8E\u516C\u4F17\u4FDD\u62A4\u81EA\u8EAB\u5B89\u5168\u7684\u5185\u5BB9\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "encouraged-card"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "encouraged-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "encouraged-title"
  }, "\u5F02\u5E38\u70ED\u7EBF"), /*#__PURE__*/React.createElement("p", {
    className: "encouraged-desc"
  }, "\u53CD\u590D\u5F3A\u8C03\u5168\u7403\u7EDF\u4E00\u5F02\u5E38\u70ED\u7EBF 99\uFF0C\u9F13\u52B1\u516C\u4F17\u53D1\u73B0\u53EF\u7591\u73B0\u8C61\u53CA\u65F6\u62A5\u544A\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "encouraged-card"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "encouraged-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "encouraged-title"
  }, "\u4E13\u4E1A\u4EBA\u5458\u5F62\u8C61"), /*#__PURE__*/React.createElement("p", {
    className: "encouraged-desc"
  }, "\u4F20\u9012\u6EAF\u754C\u8005\u7684\u4E13\u4E1A\u3001\u514B\u5236\u3001\u53EF\u9760\u5F62\u8C61\uFF0C\u5EFA\u7ACB\u516C\u4F17\u5BF9\u4E13\u4E1A\u5904\u7F6E\u4F53\u7CFB\u7684\u4FE1\u4EFB\u3002"))))), /*#__PURE__*/React.createElement("div", {
    className: "guidelines-section",
    style: {
      backgroundColor: "var(--bg-secondary)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "guidelines-section-title"
  }, "\u804C\u4E1A\u5316\u53D9\u4E8B\u7B56\u7565"), /*#__PURE__*/React.createElement("div", {
    className: "guidelines-section-en"
  }, "PROFESSIONAL NARRATIVE STRATEGY"), /*#__PURE__*/React.createElement("div", {
    className: "strategy-box"
  }, /*#__PURE__*/React.createElement("span", {
    className: "strategy-label"
  }, "CORE CONCEPT"), /*#__PURE__*/React.createElement("div", {
    className: "strategy-title"
  }, "\u628A\u5F02\u5E38\u5904\u7406\u300C\u53BB\u795E\u79D8\u5316\u300D"), /*#__PURE__*/React.createElement("div", {
    className: "strategy-text"
  }, /*#__PURE__*/React.createElement("p", null, "\u300C\u804C\u4E1A\u5316\u53D9\u4E8B\u300D\u662F IMAC \u4FE1\u606F\u6218\u7565\u7684\u6838\u5FC3\u539F\u5219\u3002\u5176\u8981\u4E49\u5728\u4E8E\uFF1A", /*#__PURE__*/React.createElement("strong", null, "\u5C06\u5F02\u5E38\u73B0\u8C61\u4ECE\u300C\u8D85\u81EA\u7136\u6050\u6016\u6545\u4E8B\u300D\u8F6C\u5316\u4E3A\u300C\u53EF\u88AB\u7406\u89E3\u3001\u53EF\u88AB\u4E13\u4E1A\u529B\u91CF\u5904\u7406\u7684\u975E\u5E38\u89C4\u4E8B\u4EF6\u300D"), "\u3002"), /*#__PURE__*/React.createElement("p", null, "\u516C\u4F17\u5BF9\u672A\u77E5\u7684\u6050\u60E7\u8FDC\u5927\u4E8E\u5BF9\u5DF2\u77E5\u5371\u9669\u7684\u6050\u60E7\u3002\u901A\u8FC7\u5C06\u5F02\u5E38\u7BA1\u7406\u6846\u67B6\u5316\u4E3A\u4E00\u79CD \u300C\u7279\u6B8A\u7684\u516C\u5171\u670D\u52A1\u300D\u2014\u2014\u7C7B\u4F3C\u6D88\u9632\u3001\u5E94\u6025\u6551\u63F4\u3001\u533B\u7597\u6025\u6551\u2014\u2014\u53EF\u4EE5\u5927\u5E45\u964D\u4F4E\u516C\u4F17\u7684 \u7126\u8651\u611F\u548C\u975E\u7406\u6027\u884C\u4E3A\uFF0C\u540C\u65F6\u4E3A\u6EAF\u754C\u8005\u548C\u8BA4\u8BC1\u7EC4\u7EC7\u5EFA\u7ACB\u5E94\u6709\u7684\u804C\u4E1A\u5C0A\u91CD\u3002"), /*#__PURE__*/React.createElement("p", null, "\u5728\u62A5\u9053\u4E2D\uFF0C\u5E94\u5F3A\u8C03\u4EE5\u4E0B\u53D9\u4E8B\u6846\u67B6\uFF1A\u5F02\u5E38\u662F\u4E00\u79CD\u53EF\u88AB\u7814\u7A76\u3001\u53EF\u88AB\u5E94\u5BF9\u3001\u53EF\u88AB\u89E3\u51B3\u7684\u73B0\u8C61\uFF1B \u6EAF\u754C\u8005\u662F\u53D7\u8FC7\u4E25\u683C\u8BAD\u7EC3\u7684\u4E13\u4E1A\u4EBA\u5458\uFF1B\u5168\u7403\u6709\u5B8C\u5584\u7684\u534F\u4F5C\u4F53\u7CFB\u5728\u4FDD\u969C\u516C\u4F17\u5B89\u5168\uFF1B \u5927\u591A\u6570\u5F02\u5E38\u5BF9\u666E\u901A\u4EBA\u7684\u5A01\u80C1\u662F\u53EF\u63A7\u7684\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "strategy-key"
  }, /*#__PURE__*/React.createElement("span", null, "\u53BB\u6050\u6016\u5316"), /*#__PURE__*/React.createElement("span", null, "\u4E13\u4E1A\u5316"), /*#__PURE__*/React.createElement("span", null, "\u53EF\u4FE1\u8D56"), /*#__PURE__*/React.createElement("span", null, "\u5168\u7403\u534F\u4F5C"), /*#__PURE__*/React.createElement("span", null, "\u79D1\u5B66\u6846\u67B6"), /*#__PURE__*/React.createElement("span", null, "\u516C\u4F17\u53C2\u4E0E")))), /*#__PURE__*/React.createElement("div", {
    className: "guidelines-back-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "guidelines-back",
    onClick: () => navigate("/")
  }, "\u2190 \u8FD4\u56DE\u9996\u9875")))));
}
window.MediaGuidelinesPage = MediaGuidelinesPage;