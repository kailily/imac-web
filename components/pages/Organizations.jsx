// Organizations list page with map + list interaction
function OrganizationsPage() {
  const { navigate } = useRouter();
  const [selectedOrg, setSelectedOrg] = React.useState(null);

  return (
    <>
      <style>{`
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
      `}</style>

      <section className="org-page-hero">
        <div className="container">
          <div className="org-page-label">MEMBER ORGANIZATIONS · 成员组织</div>
          <h1 className="org-page-title">全球成员组织</h1>
          <p className="org-page-subtitle">
            国际异常管理联盟有八个认证成员组织，覆盖全球主要异常高发区域。
            每个组织都有其独特的历史背景、行事风格和专业特长，但都遵循同一套标准与协作机制。
          </p>
        </div>
      </section>

      <section className="orgs-page-main">
        <div className="container" style={{ display: "contents" }}>
          <div className="orgs-page-map-side">
            <OrganizationsMap
              selectedOrg={selectedOrg}
              setSelectedOrg={setSelectedOrg}
              onOrgClick={(org) => setSelectedOrg(org.slug)}
            />
          </div>

          <div className="orgs-page-list">
            {ORGANIZATIONS.map((org) => (
              <div
                key={org.slug}
                className={`orgs-page-list-item ${selectedOrg === org.slug ? "active" : ""}`}
                onClick={() => setSelectedOrg(org.slug)}
              >
                <div className="orgs-page-badge" style={{ borderColor: org.color, color: org.color }}>
                  {org.abbr}
                </div>
                <div className="orgs-page-list-info">
                  <div className="orgs-page-list-name">{org.name}</div>
                  <div className="orgs-page-list-meta">
                    {org.hq} · {org.region}
                  </div>
                </div>
                <span className="orgs-page-list-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

window.OrganizationsPage = OrganizationsPage;
