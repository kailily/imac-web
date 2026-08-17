// Emergency Guide + News Center
function EmergencyGuide() {
  const rules = [{
    num: "01",
    title: "保持冷静，不要跑",
    desc: "恐慌是最危险的。异常不会因为你跑得快就放过你，反而可能因为你的慌乱触发更多规则。"
  }, {
    num: "02",
    title: "观察你周围的环境",
    desc: "在做任何事之前，先看清楚你在哪里、有什么东西、有什么不对劲的地方。信息是生存的基础。"
  }, {
    num: "03",
    title: "不要碰明显异常的东西",
    desc: "如果某样东西看起来就不属于这里，不要好奇去碰。好奇心在异常里不是美德，是致命的。"
  }, {
    num: '04',
    title: '规则不需要解释',
    desc: '规则就是规则。不要问「为什么」，先遵守。理解规则是第二步，活下来才是第一步。'
  }, {
    num: "05",
    title: "尝试与其他被困者交流",
    desc: "你不是一个人。分享信息、互相照应，能大幅提高生存几率。但也不要轻信任何人。"
  }, {
    num: "06",
    title: "不要主动伤害他人",
    desc: "异常中的死亡不会被现实世界的法律追究，但任何伤害行为都可能违反异常的隐藏规则。"
  }, {
    num: '07',
    title: '区分「NPC」',
    desc: '异常中的人形存在不全是和你一样的被困者。学会识别它们，不要跟它们走，不要信它们的话。'
  }, {
    num: "08",
    title: "保存体力，等待救援",
    desc: "专业的溯界者正在来的路上。你的任务不是解决异常，而是尽可能久地活下来。"
  }, {
    num: '09',
    title: '如果看到「出口」，先观察再通过',
    desc: '真正的出口很少标着「出口」两个字。而标着「出口」的东西，很可能是陷阱。'
  }, {
    num: "10",
    title: "活下来，然后告诉别人你看到了什么",
    desc: "你的经历是宝贵的数据。你活下来的意义，不仅是为了你自己，也是为了下一个人。"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .guide-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
        }
        .guide-intro {
          max-width: 700px;
          margin-bottom: 40px;
          font-size: 14px;
          line-height: 1.9;
          color: var(--text-secondary);
        }
        .guide-intro strong {
          color: var(--text-primary);
        }
        .guide-core-label {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          margin-bottom: 8px;
        }
        .guide-core-title {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
        }
        .guide-rules-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .guide-rule-card {
          display: flex;
          gap: 20px;
          padding: 24px 20px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          transition: border-color 0.3s ease;
          position: relative;
        }
        .guide-rule-card:hover {
          border-color: var(--accent-red);
        }
        .guide-rule-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 10px; height: 10px;
          border-top: 2px solid var(--accent-red);
          border-left: 2px solid var(--accent-red);
        }
        .rule-num-display {
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
          flex-shrink: 0;
          width: 50px;
          opacity: 0.6;
        }
        .rule-content {
          flex: 1;
        }
        .rule-title {
          font-family: var(--font-serif);
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .rule-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .guide-hotline {
          margin-top: 50px;
          padding: 40px;
          background-color: rgba(139, 26, 26, 0.08);
          border: 1px solid var(--accent-red);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
          position: relative;
        }
        .guide-hotline::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 20px; height: 20px;
          border-top: 3px solid var(--accent-red-bright);
          border-left: 3px solid var(--accent-red-bright);
        }
        .guide-hotline::after {
          content: "";
          position: absolute;
          bottom: 0; right: 0;
          width: 20px; height: 20px;
          border-bottom: 3px solid var(--accent-red-bright);
          border-right: 3px solid var(--accent-red-bright);
        }
        .hotline-text {
          flex: 1;
        }
        .hotline-label {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          margin-bottom: 8px;
        }
        .hotline-number {
          font-family: var(--font-serif);
          font-size: 48px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
          letter-spacing: 0.05em;
        }
        .hotline-desc {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 10px;
        }
        .hotline-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 16px 24px;
          border: 2px solid var(--accent-red-bright);
        }
        .hotline-badge-text {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          text-align: center;
        }
        @media (max-width: 1024px) {
          .guide-rules-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .hotline-number { font-size: 36px; }
          .guide-hotline { padding: 28px 20px; flex-direction: column; align-items: flex-start; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    id: "guide",
    className: "section guide-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-number mono"
  }, "07 /"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title-cn"
  }, "\u516C\u6C11\u5F02\u5E38\u5E94\u6025\u6307\u5357"), /*#__PURE__*/React.createElement("span", {
    className: "section-title-en"
  }, "CITIZEN ANOMALY GUIDE")), /*#__PURE__*/React.createElement("span", {
    className: "classification public"
  }, "PUBLIC / \u516C\u5F00\u7EA7")), /*#__PURE__*/React.createElement("div", {
    className: "guide-core-label"
  }, "IMAC \u7EDF \u4E00 \u6807 \u51C6 \xB7 \u6838 \u5FC3 \u5341 \u6761"), /*#__PURE__*/React.createElement("h3", {
    className: "guide-core-title"
  }, "\u5168\u7403\u901A\u7528 \xB7 \u8BF7\u52A1\u5FC5\u7262\u8BB0"), /*#__PURE__*/React.createElement("p", {
    className: "guide-intro"
  }, "\u4EE5\u4E0B\u5341\u6761\u4E3A IMAC \u7EDF\u4E00\u53D1\u5E03\u7684\u516C\u6C11\u5F02\u5E38\u5E94\u6025\u57FA\u672C\u539F\u5219\uFF0C\u9002\u7528\u4E8E\u6240\u6709\u7C7B\u578B\u7684\u5F02\u5E38\u4E8B\u4EF6\u3002 \u5982\u679C\u4F60\u6216\u4F60\u8EAB\u8FB9\u7684\u4EBA\u610F\u5916\u8FDB\u5165\u5F02\u5E38\uFF0C\u8BF7\u4FDD\u6301\u51B7\u9759\uFF0C\u6309\u987A\u5E8F\u9075\u5FAA\u4EE5\u4E0B\u539F\u5219\u3002", /*#__PURE__*/React.createElement("strong", null, "\u8BB0\u4F4F\uFF1A\u4F60\u7684\u9996\u8981\u76EE\u6807\u4E0D\u662F\u7834\u89E3\u5F02\u5E38\uFF0C\u800C\u662F\u6D3B\u4E0B\u6765\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "guide-rules-grid"
  }, rules.map(rule => /*#__PURE__*/React.createElement("div", {
    key: rule.num,
    className: "guide-rule-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rule-num-display"
  }, rule.num), /*#__PURE__*/React.createElement("div", {
    className: "rule-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rule-title"
  }, rule.title), /*#__PURE__*/React.createElement("p", {
    className: "rule-desc"
  }, rule.desc))))), /*#__PURE__*/React.createElement("div", {
    className: "guide-hotline"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-label"
  }, "ANOMALY EMERGENCY HOTLINE \xB7 \u5F02\u5E38\u7D27\u6025\u70ED\u7EBF"), /*#__PURE__*/React.createElement("div", {
    className: "hotline-number mono"
  }, "99"), /*#__PURE__*/React.createElement("p", {
    className: "hotline-desc"
  }, "\u5168\u7403\u901A\u7528\u524D\u7F00 \xB7 24\u5C0F\u65F6\u5168\u5929\u5019 \xB7 \u76F4\u63A5\u62E8\u6253 99 \u5E76\u8BF4\u660E\u6240\u5728\u4F4D\u7F6E\u4E0E\u5F02\u5E38\u60C5\u51B5")), /*#__PURE__*/React.createElement("div", {
    className: "hotline-badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hotline-badge-text"
  }, "24 HOURS"), /*#__PURE__*/React.createElement("span", {
    className: "hotline-badge-text"
  }, "GLOBAL"), /*#__PURE__*/React.createElement("span", {
    className: "hotline-badge-text"
  }, "FREE"))))));
}
window.EmergencyGuide = EmergencyGuide;

// News Center
function NewsCenter() {
  const noDisclosurePrinciples = ["不披露异常的具体位置与进入方式", "不披露未公开的规则细节", "不披露溯界者的真实姓名与个人信息", "不公布涉及深渊级及以上异常的详细内容", "不传播可能引起公众恐慌的未经证实信息"];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .news-section {
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-color);
        }
        .news-body {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }
        .news-main-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 40px;
          position: relative;
        }
        .news-main-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 18px; height: 18px;
          border-top: 2px solid var(--accent-red);
          border-left: 2px solid var(--accent-red);
        }
        .news-main-card::after {
          content: "";
          position: absolute;
          bottom: 0; right: 0;
          width: 18px; height: 18px;
          border-bottom: 2px solid var(--accent-red);
          border-right: 2px solid var(--accent-red);
        }
        .news-category {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .news-category::before {
          content: "▎";
          font-size: 14px;
        }
        .news-title {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.5;
          margin-bottom: 16px;
        }
        .news-meta {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }
        .news-meta-item {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .news-meta-item .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: var(--text-muted);
        }
        .news-body-text {
          font-size: 14px;
          line-height: 1.9;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }
        .news-body-text p {
          margin-bottom: 14px;
        }
        .news-body-text p:last-child {
          margin-bottom: 0;
        }
        .news-quote {
          margin: 24px 0;
          padding: 20px 24px;
          border-left: 3px solid var(--steel-blue);
          background-color: rgba(74, 88, 104, 0.05);
        }
        .news-quote-text {
          font-family: var(--font-serif);
          font-size: 15px;
          color: var(--text-primary);
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 8px;
        }
        .news-quote-author {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .news-safe-note {
          margin-top: 24px;
          padding: 16px 20px;
          background-color: rgba(74, 124, 89, 0.08);
          border: 1px solid rgba(74, 124, 89, 0.3);
          font-size: 13px;
          color: var(--level-ordinary);
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .news-safe-note::before {
          content: "✓";
          font-weight: 700;
          flex-shrink: 0;
        }
        /* Sidebar */
        .news-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .sidebar-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 24px 20px;
          position: relative;
        }
        .sidebar-title {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sidebar-title::before {
          content: "";
          width: 4px;
          height: 16px;
          background-color: var(--accent-red-bright);
        }
        .three-layers {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .layer-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: var(--text-secondary);
        }
        .layer-num {
          width: 24px;
          height: 24px;
          border: 1px solid var(--steel-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--steel-blue-light);
          flex-shrink: 0;
        }
        .no-disclosure-list {
          list-style: none;
          counter-reset: nd-counter;
        }
        .no-disclosure-list li {
          counter-increment: nd-counter;
          position: relative;
          padding-left: 28px;
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 10px;
        }
        .no-disclosure-list li::before {
          content: counter(nd-counter, decimal-leading-zero);
          position: absolute;
          left: 0;
          top: 0;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
        }
        .sidebar-note {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px dashed var(--border-color);
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          line-height: 1.6;
        }
        @media (max-width: 1024px) {
          .news-body { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .news-main-card { padding: 28px 20px; }
          .news-title { font-size: 20px; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    id: "news",
    className: "section news-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-number mono"
  }, "08 /"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title-cn"
  }, "\u65B0\u95FB\u4E2D\u5FC3"), /*#__PURE__*/React.createElement("span", {
    className: "section-title-en"
  }, "NEWS CENTER")), /*#__PURE__*/React.createElement("span", {
    className: "classification public"
  }, "PUBLIC / \u516C\u5F00\u7EA7")), /*#__PURE__*/React.createElement("div", {
    className: "news-body"
  }, /*#__PURE__*/React.createElement("article", {
    className: "news-main-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "news-category"
  }, "\u65B0\u95FB\u7B80\u8BAF \xB7 PRESS RELEASE"), /*#__PURE__*/React.createElement("h3", {
    className: "news-title"
  }, "\u5317\u5883\u5B88\u671B\u6210\u529F\u89E3\u51B3\u5C71\u533A\u5E38\u89C4\u7EA7\u5F02\u5E38", /*#__PURE__*/React.createElement("br", null), "\u5468\u8FB9\u5C45\u6C11\u5DF2\u5B89\u5168\u64A4\u79BB"), /*#__PURE__*/React.createElement("div", {
    className: "news-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "news-meta-item"
  }, "\u5B89\u73C0\u538638\u5E74 \xB7 \u51AC"), /*#__PURE__*/React.createElement("span", {
    className: "news-meta-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "\u767D\u677E\u57CE\u7535"), /*#__PURE__*/React.createElement("span", {
    className: "news-meta-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "\u6765\u6E90\uFF1A\u5317\u5883\u5B88\u671B\u516C\u5173\u90E8")), /*#__PURE__*/React.createElement("div", {
    className: "news-body-text"
  }, /*#__PURE__*/React.createElement("p", null, "\u636E\u5317\u5883\u5B88\u671B\u5B98\u65B9\u6D88\u606F\uFF0C\u4F4D\u4E8E\u767D\u677E\u57CE\u4EE5\u5357\u7EA6120\u516C\u91CC\u5904\u7684\u5C71\u533A\u5FAA\u73AF\u8DEF\u6BB5\u5F02\u5E38\u5DF2\u4E8E\u6628\u65E5\u88AB\u6210\u529F\u89E3\u51B3\u3002 \u8BE5\u5F02\u5E38\u4E8E\u4E24\u5468\u524D\u88AB\u5F53\u5730\u767B\u5C71\u8005\u9996\u6B21\u62A5\u544A\uFF0C\u8868\u73B0\u4E3A\u4E00\u6BB5\u7EA63\u516C\u91CC\u957F\u7684\u5C71\u95F4\u516C\u8DEF\u9677\u5165\u7A7A\u95F4\u5FAA\u73AF\uFF0C \u884C\u9A76\u8F66\u8F86\u65E0\u6CD5\u79BB\u5F00\u3002\u7ECF\u521D\u6B65\u8BC4\u4F30\u4E3A\u5E38\u89C4\u7EA7\u5F02\u5E38\u3002"), /*#__PURE__*/React.createElement("p", null, "\u5317\u5883\u5B88\u671B\u6D3E\u51FA\u56DB\u540D\u6EAF\u754C\u8005\u7EC4\u6210\u7684\u5C0F\u961F\u8FDB\u5165\u5F02\u5E38\uFF0C\u7ECF\u8FC772\u5C0F\u65F6\u7684\u8FDE\u7EED\u4F5C\u4E1A\uFF0C \u6210\u529F\u627E\u5230\u5E76\u7834\u574F\u4E86\u5F02\u5E38\u7684\u6838\u5FC3\u53D9\u4E8B\u951A\u70B9\u2014\u2014\u4E00\u5EA7\u88AB\u9057\u5FD8\u7684\u5C71\u533A\u62A4\u6797\u7AD9\u3002 \u5F02\u5E38\u7A7A\u95F4\u968F\u540E\u81EA\u7136\u6D88\u6563\uFF0C\u6240\u6709\u88AB\u56F0\u4EBA\u5458\u5B89\u5168\u64A4\u79BB\u3002"), /*#__PURE__*/React.createElement("p", null, "\u672C\u6B21\u884C\u52A8\u65E0\u6EAF\u754C\u8005\u4F24\u4EA1\u3002\u88AB\u56F0\u7684\u4E03\u540D\u5E73\u6C11\u4E2D\uFF0C\u516D\u4EBA\u8EAB\u4F53\u72B6\u51B5\u826F\u597D\uFF0C \u4E00\u4EBA\u51FA\u73B0\u8F7B\u5EA6\u5B9A\u5411\u969C\u788D\uFF0C\u5DF2\u9001\u5F80\u9644\u8FD1\u533B\u9662\u89C2\u5BDF\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "news-quote"
  }, /*#__PURE__*/React.createElement("p", {
    className: "news-quote-text"
  }, "\"\u8FD9\u662F\u4E00\u6B21\u6559\u79D1\u4E66\u7EA7\u522B\u7684\u5E38\u89C4\u7EA7\u5F02\u5E38\u5904\u7F6E\u3002\u5317\u5883\u5B88\u671B\u7684\u6EAF\u754C\u8005\u4EEC\u5C55\u73B0\u4E86\u6781\u9AD8\u7684\u4E13\u4E1A\u7D20\u517B\u3002 \u6211\u4EEC\u518D\u6B21\u63D0\u9192\u5E7F\u5927\u516C\u4F17\uFF1A\u5982\u9047\u5F02\u5E38\uFF0C\u8BF7\u7ACB\u5373\u62E8\u6253 99 \u70ED\u7EBF\uFF0C\u4E0D\u8981\u5C1D\u8BD5\u81EA\u884C\u8FDB\u5165\u3002\""), /*#__PURE__*/React.createElement("div", {
    className: "news-quote-author"
  }, "\u2014 \u5317\u5883\u5B88\u671B\u53D1\u8A00\u4EBA \xB7 \u827E\u7433\xB7\u83AB\u7F57\u5A03")), /*#__PURE__*/React.createElement("div", {
    className: "news-safe-note"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "IMAC \u5B89\u5168\u63D0\u9192\uFF1A"), "\u51AC\u5B63\u4E3A\u5C71\u533A\u5F02\u5E38\u9AD8\u53D1\u671F\uFF0C\u8BF7\u5E02\u6C11\u5C3D\u91CF\u907F\u514D\u5728\u6076\u52A3\u5929\u6C14\u4E0B\u524D\u5F80\u672A\u5F00\u53D1\u5C71\u533A\u3002 \u5982\u53D1\u73B0\u9053\u8DEF\u51FA\u73B0\u5F02\u5E38\u5FAA\u73AF\u6216\u73AF\u5883\u7A81\u53D8\uFF0C\u8BF7\u7ACB\u5373\u505C\u8F66\u5E76\u62E8\u6253 99 \u6C42\u52A9\u3002"))), /*#__PURE__*/React.createElement("aside", {
    className: "news-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-card"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "sidebar-title"
  }, "\u62A5\u9053\u5BA1\u5B9A\u673A\u5236"), /*#__PURE__*/React.createElement("div", {
    className: "three-layers"
  }, /*#__PURE__*/React.createElement("div", {
    className: "layer-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "layer-num"
  }, "01"), /*#__PURE__*/React.createElement("span", null, "\u7EC4\u7EC7\u5185\u90E8\u4FE1\u606F\u5B98\u521D\u5BA1")), /*#__PURE__*/React.createElement("div", {
    className: "layer-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "layer-num"
  }, "02"), /*#__PURE__*/React.createElement("span", null, "\u533A\u57DF\u534F\u8C03\u529E\u516C\u5BA4\u590D\u6838")), /*#__PURE__*/React.createElement("div", {
    className: "layer-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "layer-num"
  }, "03"), /*#__PURE__*/React.createElement("span", null, "IMAC \u4FE1\u606F\u534F\u8C03\u90E8\u7EC8\u5BA1"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "12px",
      color: "var(--text-tertiary)",
      lineHeight: "1.7"
    }
  }, "\u6240\u6709\u9762\u5411\u516C\u4F17\u7684\u5F02\u5E38\u76F8\u5173\u62A5\u9053\uFF0C\u5747\u9700\u7ECF\u8FC7\"\u4E09\u5C42\u5BA1\u5B9A\"\u673A\u5236\u540E\u65B9\u53EF\u53D1\u5E03\u3002 \u672A\u7ECF\u5BA1\u5B9A\u7684\u4FE1\u606F\u6CC4\u9732\u5C06\u88AB\u89C6\u4E3A\u8FDD\u89C4\u884C\u4E3A\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-card"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "sidebar-title"
  }, "\u4E94\u4E0D\u62AB\u9732\u539F\u5219"), /*#__PURE__*/React.createElement("ol", {
    className: "no-disclosure-list"
  }, noDisclosurePrinciples.map((item, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, item))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-note"
  }, "PRINCIPLE OF NON-DISCLOSURE", /*#__PURE__*/React.createElement("br", null), "IMAC INFO-REG.ART.07")))))));
}
window.NewsCenter = NewsCenter;