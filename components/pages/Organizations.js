// Organizations list page with map + list interaction
function OrganizationsPage() {
  const {
    navigate
  } = useRouter();
  const [selectedOrg, setSelectedOrg] = React.useState(null);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .org-page-hero {
          padding-top: 120px;
          padding-bottom: 40px;
          background: linear-gradient(180deg, #0e0e12 0%, #131318 100%);
          border-bottom: 1px solid var(--border-color);
        }
        .org-page-title {
          font-family: var(--font-serif);
          font-size: 40px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .org-page-subtitle {
          font-size: 15px;
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.7;
        }
        .org-page-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          margin-bottom: 14px;
        }
        .orgs-page-main {
          padding: 50px 0 80px;
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 30px;
        }
        .orgs-page-map-side {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .orgs-page-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .orgs-page-list-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .orgs-page-list-item:hover, .orgs-page-list-item.active {
          border-color: var(--accent-red-bright);
          background-color: rgba(139, 26, 26, 0.06);
        }
        .orgs-page-badge {
          width: 44px; height: 44px;
          border: 1.5px solid;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .orgs-page-list-info { flex: 1; }
        .orgs-page-list-name {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 2px;
        }
        .orgs-page-list-meta {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .orgs-page-list-arrow {
          color: var(--text-tertiary);
          font-size: 11px;
          font-family: var(--font-mono);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .orgs-page-list-item:hover .orgs-page-list-arrow {
          opacity: 1;
        }
        .org-detail-panel {
          margin-top: 16px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 28px 24px;
        }
        .org-detail-head {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .org-detail-badge-lg {
          width: 64px; height: 64px;
          border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .org-detail-name-group h2 {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .org-detail-name-group .en {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .org-detail-rows {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
        }
        .org-detail-row {
          display: flex;
          gap: 14px;
          font-size: 13px;
        }
        .org-detail-row .label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          min-width: 70px;
          padding-top: 2px;
        }
        .org-detail-row .value {
          color: var(--text-secondary);
          flex: 1;
        }
        .org-detail-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 18px;
        }
        .org-detail-btn {
          display: block;
          width: 100%;
          padding: 12px;
          text-align: center;
          background: transparent;
          border: 1.5px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .org-detail-btn:hover {
          background-color: var(--accent-red-bright);
          color: #fff;
        }
        @media (max-width: 1024px) {
          .orgs-page-main { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .org-page-title { font-size: 30px; }
          .org-detail-head { flex-direction: column; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    className: "org-page-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-page-label"
  }, "MEMBER ORGANIZATIONS \xB7 \u6210\u5458\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("h1", {
    className: "org-page-title"
  }, "\u5168\u7403\u6210\u5458\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("p", {
    className: "org-page-subtitle"
  }, "\u56FD\u9645\u5F02\u5E38\u7BA1\u7406\u8054\u76DF\u6709\u516B\u4E2A\u8BA4\u8BC1\u6210\u5458\u7EC4\u7EC7\uFF0C\u8986\u76D6\u5168\u7403\u4E3B\u8981\u5F02\u5E38\u9AD8\u53D1\u533A\u57DF\u3002 \u6BCF\u4E2A\u7EC4\u7EC7\u90FD\u6709\u5176\u72EC\u7279\u7684\u5386\u53F2\u80CC\u666F\u3001\u884C\u4E8B\u98CE\u683C\u548C\u4E13\u4E1A\u7279\u957F\uFF0C\u4F46\u90FD\u9075\u5FAA\u540C\u4E00\u5957\u6807\u51C6\u4E0E\u534F\u4F5C\u673A\u5236\u3002"))), /*#__PURE__*/React.createElement("section", {
    className: "orgs-page-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      display: "contents"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "orgs-page-map-side"
  }, /*#__PURE__*/React.createElement(OrganizationsMap, {
    selectedOrg: selectedOrg,
    setSelectedOrg: setSelectedOrg,
    onOrgClick: org => setSelectedOrg(org.slug)
  })), /*#__PURE__*/React.createElement("div", {
    className: "orgs-page-list"
  }, ORGANIZATIONS.map(org => /*#__PURE__*/React.createElement("div", {
    key: org.slug,
    className: `orgs-page-list-item ${selectedOrg === org.slug ? "active" : ""}`,
    onClick: () => setSelectedOrg(org.slug)
  }, /*#__PURE__*/React.createElement("div", {
    className: "orgs-page-badge",
    style: {
      borderColor: org.color,
      color: org.color
    }
  }, org.abbr), /*#__PURE__*/React.createElement("div", {
    className: "orgs-page-list-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "orgs-page-list-name"
  }, org.name), /*#__PURE__*/React.createElement("div", {
    className: "orgs-page-list-meta"
  }, org.hq, " \xB7 ", org.region)), /*#__PURE__*/React.createElement("span", {
    className: "orgs-page-list-arrow"
  }, "\u2192")))))));
}
window.OrganizationsPage = OrganizationsPage;