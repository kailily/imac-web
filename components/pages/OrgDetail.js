// Organization detail page
function OrgDetailPage({
  orgSlug
}) {
  const {
    navigate
  } = useRouter();
  const org = ORGANIZATIONS.find(o => o.slug === orgSlug);
  if (!org) {
    return /*#__PURE__*/React.createElement("div", {
      className: "container",
      style: {
        padding: "120px 0",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        color: "var(--text-primary)",
        fontFamily: "var(--font-serif)",
        marginBottom: "16px"
      }
    }, "\u7EC4\u7EC7\u4E0D\u5B58\u5728"), /*#__PURE__*/React.createElement("button", {
      onClick: () => navigate("/organizations"),
      className: "btn-primary"
    }, "\u8FD4\u56DE\u7EC4\u7EC7\u5217\u8868"));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .org-detail-hero {
          padding-top: 120px;
          padding-bottom: 60px;
          background: linear-gradient(180deg, #0e0e12 0%, #131318 100%);
          border-bottom: 1px solid var(--border-color);
          position: relative;
          overflow: hidden;
        }
        .org-detail-hero::before {
          content: "";
          position: absolute;
          top: 0; right: 0;
          width: 500px; height: 500px;
          background: radial-gradient(circle, var(--org-color-bg) 0%, transparent 70%);
          opacity: 0.15;
          pointer-events: none;
        }
        .breadcrumb {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        .breadcrumb a {
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .breadcrumb a:hover { color: var(--accent-red-bright); }
        .breadcrumb .sep { margin: 0 8px; opacity: 0.5; }
        .breadcrumb .current { color: var(--text-primary); }
        .org-detail-hero-body {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 40px;
        }
        .org-badge-xl {
          width: 120px; height: 120px;
          border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-mono);
          font-size: 28px;
          font-weight: 700;
          flex-shrink: 0;
          position: relative;
        }
        .org-badge-xl::before {
          content: "";
          position: absolute;
          top: -8px; left: -8px; right: -8px; bottom: -8px;
          border: 1px dashed;
          opacity: 0.4;
        }
        .org-badge-xl::after {
          content: "";
          position: absolute;
          top: -16px; left: -16px; right: -16px; bottom: -16px;
          border: 1px solid;
          opacity: 0.15;
        }
        .org-detail-title-group { flex: 1; }
        .org-detail-cn-name {
          font-family: var(--font-serif);
          font-size: 42px;
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 8px;
          letter-spacing: 0.05em;
        }
        .org-detail-en-name {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          margin-bottom: 20px;
        }
        .org-detail-meta-row {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }
        .org-meta-item .label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          margin-bottom: 6px;
        }
        .org-meta-item .value {
          font-size: 15px;
          color: var(--text-primary);
          font-weight: 500;
        }
        .org-content-section {
          padding: 60px 0;
        }
        .org-content-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 50px;
          align-items: start;
        }
        .org-content-main { display: flex; flex-direction: column; gap: 50px; }
        .org-section { }
        .org-section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
        }
        .org-section-title-bar {
          width: 3px;
          height: 20px;
          background-color: var(--accent-red-bright);
        }
        .org-section-title h3 {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .org-section-title .en {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }
        .org-intro-text p {
          font-size: 15px;
          line-height: 1.9;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }
        .org-intro-text p:last-child { margin-bottom: 0; }
        .specialty-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .specialty-tag {
          padding: 8px 16px;
          border: 1px solid var(--border-color);
          font-size: 13px;
          color: var(--text-secondary);
          background-color: var(--bg-card);
          transition: all 0.2s ease;
        }
        .specialty-tag:hover {
          border-color: var(--org-color);
          color: var(--text-primary);
        }
        .composition-bars {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .comp-bar-item { }
        .comp-bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }
        .comp-bar-label .pct {
          font-family: var(--font-mono);
          font-weight: 600;
          color: var(--text-primary);
        }
        .comp-bar-track {
          height: 6px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
        }
        .comp-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--org-color), var(--accent-red-bright));
          transition: width 1s ease;
        }
        .cases-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .case-item {
          padding: 22px 24px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-left: 3px solid;
        }
        .case-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 10px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .case-title {
          font-family: var(--font-serif);
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .case-year {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .case-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .walkers-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .walker-card {
          display: flex;
          gap: 18px;
          padding: 20px 22px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }
        .walker-card:hover {
          border-color: var(--border-light);
        }
        .walker-avatar {
          width: 56px; height: 56px;
          flex-shrink: 0;
          border: 2px solid var(--org-color);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--org-color);
          position: relative;
          background: radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%);
        }
        .walker-avatar::before {
          content: "";
          position: absolute;
          inset: -6px;
          border: 1px dashed var(--org-color);
          border-radius: 50%;
          opacity: 0.4;
        }
        .walker-body { flex: 1; }
        .walker-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 6px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .walker-codename {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .walker-rank {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--org-color);
          letter-spacing: 0.15em;
          padding: 2px 8px;
          border: 1px solid var(--org-color);
        }
        .walker-name {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 10px;
          font-family: var(--font-mono);
        }
        .walker-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 10px;
        }
        .walker-tag {
          padding: 2px 8px;
          font-size: 10px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .walker-feat {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        .org-sidebar {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .sidebar-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 20px;
        }
        .sidebar-card h4 {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-color);
        }
        .sidebar-contact-row {
          display: flex;
          gap: 12px;
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 10px;
        }
        .sidebar-contact-row:last-child { margin-bottom: 0; }
        .sidebar-contact-row .label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          min-width: 50px;
        }
        .sidebar-btn {
          display: block;
          width: 100%;
          padding: 12px;
          text-align: center;
          background: transparent;
          border: 1.5px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 6px;
        }
        .sidebar-btn:hover {
          background-color: var(--accent-red-bright);
          color: #fff;
        }
        .sidebar-btn.secondary {
          border-color: var(--text-muted);
          color: var(--text-secondary);
        }
        .sidebar-btn.secondary:hover {
          border-color: var(--text-primary);
          color: var(--text-primary);
          background-color: transparent;
        }

        .org-back-map-wrap {
          text-align: center;
          padding: 0 24px 80px;
        }
        .org-back-map {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 32px;
          background: transparent;
          border: 1.5px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .org-back-map:hover {
          background-color: var(--accent-red-bright);
          color: #fff;
        }

        @media (max-width: 1024px) {
          .org-content-grid { grid-template-columns: 1fr; }
          .org-sidebar { position: static; }
        }
        @media (max-width: 768px) {
          .org-detail-hero-body { flex-direction: column; }
          .org-detail-cn-name { font-size: 32px; }
          .org-detail-meta-row { gap: 20px; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    style: {
      "--org-color": org.color,
      "--org-color-bg": org.color
    }
  }, /*#__PURE__*/React.createElement("section", {
    className: "org-detail-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "breadcrumb"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/")
  }, "\u9996\u9875"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\u203A"), /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/organizations")
  }, "\u7EC4\u7EC7\u673A\u6784"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\u203A"), /*#__PURE__*/React.createElement("span", {
    className: "current"
  }, org.name)), /*#__PURE__*/React.createElement("div", {
    className: "org-detail-hero-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-badge-xl",
    style: {
      borderColor: org.color,
      color: org.color
    }
  }, org.abbr), /*#__PURE__*/React.createElement("div", {
    className: "org-detail-title-group"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "org-detail-cn-name"
  }, org.name), /*#__PURE__*/React.createElement("div", {
    className: "org-detail-en-name"
  }, org.en.toUpperCase()), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "15px",
      color: "var(--text-secondary)",
      lineHeight: "1.8",
      maxWidth: "600px"
    }
  }, org.desc), /*#__PURE__*/React.createElement("div", {
    className: "org-detail-meta-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-meta-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "\u603B\u90E8\u4F4D\u7F6E"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, org.hqDetail || org.hq, org.hqEn ? " · " + org.hqEn : "")), /*#__PURE__*/React.createElement("div", {
    className: "org-meta-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "\u7BA1\u8F96\u533A\u57DF"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, org.region)), /*#__PURE__*/React.createElement("div", {
    className: "org-meta-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "\u6210\u7ACB\u65F6\u95F4"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, org.founded)), /*#__PURE__*/React.createElement("div", {
    className: "org-meta-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "\u7EC4\u7EC7\u7F16\u53F7"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "IMAC-MB-", String(ORGANIZATIONS.indexOf(org) + 1).padStart(2, "0")))))))), /*#__PURE__*/React.createElement("section", {
    className: "org-content-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-content-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-content-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-section-title"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-section-title-bar"
  }), /*#__PURE__*/React.createElement("h3", null, "\u7EC4\u7EC7\u7B80\u4ECB"), /*#__PURE__*/React.createElement("span", {
    className: "en"
  }, "ORGANIZATION PROFILE")), /*#__PURE__*/React.createElement("div", {
    className: "org-intro-text"
  }, org.descLong.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i
  }, p)))), /*#__PURE__*/React.createElement("div", {
    className: "org-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-section-title"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-section-title-bar"
  }), /*#__PURE__*/React.createElement("h3", null, "\u64C5\u957F\u9886\u57DF"), /*#__PURE__*/React.createElement("span", {
    className: "en"
  }, "SPECIALTIES")), /*#__PURE__*/React.createElement("div", {
    className: "specialty-tags"
  }, org.specialties.map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "specialty-tag"
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "org-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-section-title"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-section-title-bar"
  }), /*#__PURE__*/React.createElement("h3", null, "\u4EBA\u5458\u6784\u6210"), /*#__PURE__*/React.createElement("span", {
    className: "en"
  }, "PERSONNEL COMPOSITION")), /*#__PURE__*/React.createElement("div", {
    className: "composition-bars"
  }, org.composition.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "comp-bar-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "comp-bar-label"
  }, /*#__PURE__*/React.createElement("span", null, c.label), /*#__PURE__*/React.createElement("span", {
    className: "pct"
  }, c.percent, "%")), /*#__PURE__*/React.createElement("div", {
    className: "comp-bar-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "comp-bar-fill",
    style: {
      width: `${c.percent}%`
    }
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "org-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-section-title"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-section-title-bar"
  }), /*#__PURE__*/React.createElement("h3", null, "\u8457\u540D\u6848\u4F8B"), /*#__PURE__*/React.createElement("span", {
    className: "en"
  }, "NOTABLE CASES")), /*#__PURE__*/React.createElement("div", {
    className: "cases-list"
  }, org.cases.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "case-item",
    style: {
      borderLeftColor: org.color
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-title"
  }, c.title), /*#__PURE__*/React.createElement("div", {
    className: "case-year"
  }, c.year)), /*#__PURE__*/React.createElement("p", {
    className: "case-desc"
  }, c.desc))))), /*#__PURE__*/React.createElement("div", {
    className: "org-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-section-title"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-section-title-bar"
  }), /*#__PURE__*/React.createElement("h3", null, "\u77E5\u540D\u6EAF\u754C\u8005"), /*#__PURE__*/React.createElement("span", {
    className: "en"
  }, "NOTABLE BOUNDARY WALKERS")), /*#__PURE__*/React.createElement("div", {
    className: "walkers-list"
  }, org.walkers && org.walkers.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "walker-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-avatar"
  }, w.code.charAt(0)), /*#__PURE__*/React.createElement("div", {
    className: "walker-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-codename"
  }, w.code), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank"
  }, w.rank)), /*#__PURE__*/React.createElement("div", {
    className: "walker-name"
  }, w.name), /*#__PURE__*/React.createElement("div", {
    className: "walker-tags"
  }, w.tags.map((t, j) => /*#__PURE__*/React.createElement("span", {
    key: j,
    className: "walker-tag"
  }, t))), /*#__PURE__*/React.createElement("p", {
    className: "walker-feat"
  }, w.feat))))))), /*#__PURE__*/React.createElement("aside", {
    className: "org-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-card"
  }, /*#__PURE__*/React.createElement("h4", null, "\u8054\u7CFB\u65B9\u5F0F"), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-contact-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "\u70ED\u7EBF\u5206\u673A"), /*#__PURE__*/React.createElement("span", null, org.contact.phone)), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-contact-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "\u529E\u516C\u5730\u5740"), /*#__PURE__*/React.createElement("span", null, org.contact.address)), /*#__PURE__*/React.createElement("button", {
    className: "sidebar-btn",
    onClick: () => navigate("/join")
  }, "\u52A0\u5165\u8BE5\u7EC4\u7EC7 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-card"
  }, /*#__PURE__*/React.createElement("h4", null, "\u66F4\u591A\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, ORGANIZATIONS.filter(o => o.slug !== org.slug).slice(0, 4).map(o => /*#__PURE__*/React.createElement("div", {
    key: o.slug,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "8px 10px",
      cursor: "pointer",
      border: "1px solid var(--border-color)",
      transition: "all 0.2s ease"
    },
    onClick: () => navigate(`/org/${o.slug}`),
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = o.color;
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = "var(--border-color)";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      fontWeight: "700",
      color: o.color,
      width: "30px",
      textAlign: "center"
    }
  }, o.abbr), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "12px",
      color: "var(--text-secondary)"
    }
  }, o.name)))), /*#__PURE__*/React.createElement("button", {
    className: "sidebar-btn secondary",
    onClick: () => navigate("/organizations")
  }, "\u67E5\u770B\u5168\u90E8 8 \u4E2A\u7EC4\u7EC7")))))), /*#__PURE__*/React.createElement("div", {
    className: "org-back-map-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    className: "org-back-map",
    onClick: () => navigate("/organizations")
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5 M12 19l-7-7 7-7"
  })), "\u8FD4\u56DE\u7EC4\u7EC7\u5730\u56FE"))));
}
window.OrgDetailPage = OrgDetailPage;