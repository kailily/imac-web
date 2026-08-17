// Footer
function Footer() {
  const {
    navigate
  } = useRouter();
  const quickLinks = [{
    label: "应急指南",
    onClick: () => {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("hotline-section");
        if (el) el.scrollIntoView({
          behavior: "smooth"
        });
      }, 100);
    }
  }, {
    label: "新闻中心",
    onClick: () => navigate("/news")
  }, {
    label: "溯界者",
    onClick: () => navigate("/join")
  }, {
    label: "溯界者注册",
    onClick: () => navigate("/register")
  }, {
    label: "成员组织",
    onClick: () => navigate("/organizations")
  }, {
    label: "关于我们",
    onClick: () => {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("about-imac");
        if (el) el.scrollIntoView({
          behavior: "smooth"
        });
      }, 100);
    }
  }];
  const contacts = [{
    label: "异常紧急热线",
    value: "99（全球通用）"
  }, {
    label: "公众咨询邮箱",
    value: "public@imac.int"
  }, {
    label: "媒体联络",
    value: "press@imac.int"
  }, {
    label: "总部地址",
    value: "洛林自由市 · 第一大道"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .footer {
          background-color: var(--bg-deep);
          border-top: 2px solid var(--accent-red);
          position: relative;
          margin-top: auto;
        }
        .footer-top {
          padding: 60px 0 40px;
          border-bottom: 1px solid var(--border-color);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr;
          gap: 50px;
        }
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
        }
        .footer-logo-mark {
          width: 48px;
          height: 48px;
          color: var(--accent-red-bright);
        }
        .footer-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .footer-logo-main {
          font-family: var(--font-mono);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.15em;
        }
        .footer-logo-sub {
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.3em;
        }
        .footer-tagline {
          font-family: var(--font-serif);
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-top: 8px;
          font-style: italic;
        }
        .footer-hotline {
          margin-top: 20px;
          padding: 20px;
          background-color: rgba(139, 26, 26, 0.1);
          border: 1px solid rgba(196, 40, 40, 0.3);
          text-align: center;
        }
        .footer-hotline-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          margin-bottom: 8px;
        }
        .footer-hotline-number {
          font-family: var(--font-serif);
          font-size: 42px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
          letter-spacing: 0.05em;
        }
        .footer-hotline-desc {
          font-size: 11px;
          color: var(--text-tertiary);
          margin-top: 6px;
        }
        .footer-column-title {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .footer-column-title::before {
          content: "";
          width: 4px;
          height: 16px;
          background-color: var(--accent-red-bright);
        }
        .footer-links-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-link {
          font-size: 13px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-link::before {
          content: ">";
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
        }
        .footer-link:hover {
          color: var(--accent-red-bright);
        }
        .footer-link:hover::before {
          color: var(--accent-red-bright);
        }
        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .contact-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .contact-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .contact-value {
          font-size: 13px;
          color: var(--text-secondary);
        }
        .footer-bottom {
          padding: 24px 0;
        }
        .footer-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
        }
        .footer-copyright {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .footer-class-bar {
          width: 100%;
          padding: 12px 20px;
          background-color: rgba(139, 26, 26, 0.05);
          border: 1px solid var(--border-color);
          text-align: center;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }
        .footer-class-bar .accent {
          color: var(--accent-red-bright);
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-brand { grid-column: auto; }
          .footer-bottom-row { flex-direction: column; align-items: flex-start; }
        }
      `), /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-logo",
    onClick: () => navigate("/")
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-logo-mark"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 40 40",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 2L36 11V29L20 38L4 29V11L20 2Z",
    stroke: "currentColor",
    strokeWidth: "1.5",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 2L20 38",
    stroke: "currentColor",
    strokeWidth: "1",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "20",
    r: "5",
    stroke: "currentColor",
    strokeWidth: "1.5",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "20",
    r: "2",
    fill: "currentColor"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "footer-logo-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "footer-logo-main"
  }, "IMAC"), /*#__PURE__*/React.createElement("span", {
    className: "footer-logo-sub"
  }, "\u56FD\u9645\u5F02\u5E38\u7BA1\u7406\u8054\u76DF"))), /*#__PURE__*/React.createElement("p", {
    className: "footer-tagline"
  }, "\u4FE1\u606F\u65E0\u6761\u4EF6\u5171\u4EAB \xB7 \u6807\u51C6\u65E0\u6761\u4EF6\u7EDF\u4E00 \xB7 \u54CD\u5E94\u65E0\u6761\u4EF6\u534F\u4F5C"), /*#__PURE__*/React.createElement("div", {
    className: "footer-hotline"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-hotline-label"
  }, "ANOMALY EMERGENCY HOTLINE"), /*#__PURE__*/React.createElement("div", {
    className: "footer-hotline-number"
  }, "99"), /*#__PURE__*/React.createElement("div", {
    className: "footer-hotline-desc"
  }, "24\u5C0F\u65F6 \xB7 \u5168\u7403\u901A\u7528"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "footer-column-title"
  }, "\u5FEB\u901F\u94FE\u63A5"), /*#__PURE__*/React.createElement("div", {
    className: "footer-links-list"
  }, quickLinks.map(link => /*#__PURE__*/React.createElement("span", {
    key: link.label,
    className: "footer-link",
    onClick: link.onClick
  }, link.label)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "footer-column-title"
  }, "\u8054\u7CFB\u65B9\u5F0F"), /*#__PURE__*/React.createElement("div", {
    className: "contact-list"
  }, contacts.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.label,
    className: "contact-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "contact-label"
  }, c.label), /*#__PURE__*/React.createElement("span", {
    className: "contact-value"
  }, c.value))))))), /*#__PURE__*/React.createElement("div", {
    className: "footer-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-bottom-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "footer-copyright"
  }, "\xA9 \u56FD\u9645\u5F02\u5E38\u7BA1\u7406\u8054\u76DF IMAC \xB7 \u5B89\u73C0\u538639\u5E74 \xB7 \u7248\u6743\u6240\u6709"), /*#__PURE__*/React.createElement("span", {
    className: "footer-copyright"
  }, "International Anomaly Management Coalition \xB7 All Rights Reserved")), /*#__PURE__*/React.createElement("div", {
    className: "footer-class-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "PUBLIC ACCESS \xB7 \u516C\u5F00\u8BBF\u95EE\u7EA7"), " \xA0|\xA0 \u672C\u9875\u9762\u5185\u5BB9\u7ECF IMAC \u4FE1\u606F\u534F\u8C03\u529E\u516C\u5BA4\u5BA1\u5B9A \xA0|\xA0 INFO-REG.PUB.001 \xA0|\xA0 VERSION 39.2")))));
}
window.Footer = Footer;