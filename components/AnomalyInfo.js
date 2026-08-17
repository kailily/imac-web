// Anomaly Info Section - What is Anomaly
function AnomalyInfo() {
  const features = [{
    num: "01",
    title: "规则的绝对性",
    en: "ABSOLUTE RULES",
    desc: "违反规则必触发惩罚，由异常本身执行，不受外力干预。没有豁免，没有例外。"
  }, {
    num: "02",
    title: "规则的可解读性",
    en: "INTERPRETABLE",
    desc: "规则存在缝隙与例外，措辞往往存在歧义。通过逻辑推演可以找到漏洞与生存空间。"
  }, {
    num: "03",
    title: "规则的叙事锚点",
    en: "NARRATIVE ANCHOR",
    desc: "每个异常都有一个核心故事。找到锚点才能真正理解异常，破坏锚点才可能解决异常。"
  }, {
    num: "04",
    title: "规则的自我维护",
    en: "SELF-MAINTENANCE",
    desc: "异常会主动驱逐破坏规则者。高危级别异常中，严重违规将立即触发致命惩罚。"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .anomaly-info-section {
          background-color: var(--bg-primary);
        }
        .anomaly-info-body {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: start;
        }
        .anomaly-text-block {
          position: sticky;
          top: 100px;
        }
        .anomaly-text-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .anomaly-text-label::before {
          content: "";
          width: 20px;
          height: 1px;
          background-color: var(--accent-red-bright);
        }
        .anomaly-text-title {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 24px;
          line-height: 1.4;
        }
        .anomaly-text-desc {
          font-size: 14px;
          line-height: 1.9;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }
        .anomaly-text-desc strong {
          color: var(--text-primary);
          font-weight: 500;
        }
        .anomaly-quote {
          margin-top: 32px;
          padding: 20px 24px;
          border-left: 2px solid var(--accent-red-bright);
          background-color: rgba(139, 26, 26, 0.05);
        }
        .anomaly-quote-text {
          font-family: var(--font-serif);
          font-size: 15px;
          color: var(--text-primary);
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 8px;
        }
        .anomaly-quote-author {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .feature-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 28px 24px;
          position: relative;
          transition: border-color 0.3s ease;
        }
        .feature-card:hover {
          border-color: var(--border-light);
        }
        .feature-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 12px; height: 12px;
          border-top: 2px solid var(--steel-blue);
          border-left: 2px solid var(--steel-blue);
        }
        .feature-num {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }
        .feature-title {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }
        .feature-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .feature-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        @media (max-width: 1024px) {
          .anomaly-info-body { grid-template-columns: 1fr; gap: 40px; }
          .anomaly-text-block { position: static; }
        }
        @media (max-width: 640px) {
          .features-grid { grid-template-columns: 1fr; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    id: "anomaly-info",
    className: "section anomaly-info-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-number mono"
  }, "02 /"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title-cn"
  }, "\u5173\u4E8E\u5F02\u5E38"), /*#__PURE__*/React.createElement("span", {
    className: "section-title-en"
  }, "ABOUT ANOMALY")), /*#__PURE__*/React.createElement("span", {
    className: "classification public"
  }, "PUBLIC / \u516C\u5F00\u7EA7")), /*#__PURE__*/React.createElement("div", {
    className: "anomaly-info-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "anomaly-text-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "anomaly-text-label"
  }, "Definition \xB7 \u5B9A\u4E49"), /*#__PURE__*/React.createElement("h3", {
    className: "anomaly-text-title"
  }, "\u4EC0\u4E48\u662F\u5F02\u5E38\uFF1F"), /*#__PURE__*/React.createElement("p", {
    className: "anomaly-text-desc"
  }, /*#__PURE__*/React.createElement("strong", null, "\u5F02\u5E38\uFF08Anomaly\uFF09"), "\u662F\u771F\u5B9E\u5B58\u5728\u7684\u3001\u53EF\u8FDB\u5165\u7684\u3001\u53EF\u6D4B\u91CF\u7684\u4E09\u7EF4\u89C4\u5219\u5C01\u95ED\u7A7A\u95F4\u3002 \u5B83\u4EEC\u51ED\u7A7A\u51FA\u73B0\u5728\u73B0\u5B9E\u4E16\u754C\u4E2D\u2014\u2014\u53EF\u80FD\u662F\u4E00\u5EA7\u4ECE\u672A\u6709\u8FC7\u7684\u5EFA\u7B51\u3001\u4E00\u6761\u8D70\u4E0D\u51FA\u53BB\u7684\u8857\u9053\u3001 \u4E00\u4E2A\u4E0D\u65AD\u5FAA\u73AF\u7684\u5730\u94C1\u7AD9\u53F0\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "anomaly-text-desc"
  }, "\u5F02\u5E38\u5185\u90E8\u62E5\u6709\u81EA\u6D3D\u7684\u7269\u7406\u6CD5\u5219\u4E0E\u884C\u4E3A\u89C4\u5219\u3002\u4EFB\u4F55\u8FDB\u5165\u8005\u90FD\u5FC5\u987B\u9075\u5FAA\u8FD9\u4E9B\u89C4\u5219\uFF0C \u8FDD\u53CD\u8005\u5C06\u89E6\u53D1\u60E9\u7F5A\u2014\u2014\u4ECE\u8F7B\u5FAE\u7684\u8EAB\u4F53\u4E0D\u9002\uFF0C\u5230\u7CBE\u795E\u6C61\u67D3\uFF0C\u76F4\u81F3\u7ACB\u5373\u6B7B\u4EA1\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "anomaly-text-desc"
  }, "\u5F02\u5E38\u4E0D\u662F\u8D85\u81EA\u7136\u73B0\u8C61\u3002\u5B83\u4EEC\u662F\u53EF\u89C2\u6D4B\u3001\u53EF\u8BB0\u5F55\u3001\u53EF\u7814\u7A76\u7684\u5BA2\u89C2\u5B58\u5728\u3002 \u53EA\u662F\u6211\u4EEC\u76EE\u524D\u8FD8\u6CA1\u6709\u5B8C\u5168\u7406\u89E3\u5B83\u4EEC\u7684\u6765\u6E90\u4E0E\u672C\u8D28\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "anomaly-quote"
  }, /*#__PURE__*/React.createElement("p", {
    className: "anomaly-quote-text"
  }, "\"\u5F02\u5E38\u4E0D\u662F\u654C\u4EBA\u3002\u5B83\u662F\u4E00\u4E2A\u6309\u7167\u81EA\u5DF1\u89C4\u5219\u8FD0\u884C\u7684\u5C01\u95ED\u7CFB\u7EDF\u3002 \u7406\u89E3\u89C4\u5219\uFF0C\u4F60\u5C31\u80FD\u6D3B\u4E0B\u6765\uFF1B\u627E\u5230\u951A\u70B9\uFF0C\u4F60\u5C31\u80FD\u8D70\u51FA\u6765\u3002\""), /*#__PURE__*/React.createElement("div", {
    className: "anomaly-quote-author"
  }, "\u2014 IMAC \u9996\u5E2D\u7814\u7A76\u5458 \u6D77\u4F26\xB7\u51EF\u6069\u535A\u58EB"))), /*#__PURE__*/React.createElement("div", {
    className: "features-grid"
  }, features.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.num,
    className: "feature-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-num mono"
  }, f.num), /*#__PURE__*/React.createElement("div", {
    className: "feature-title"
  }, f.title), /*#__PURE__*/React.createElement("div", {
    className: "feature-en"
  }, f.en), /*#__PURE__*/React.createElement("p", {
    className: "feature-desc"
  }, f.desc))))))));
}
window.AnomalyInfo = AnomalyInfo;