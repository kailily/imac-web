// Footer
function Footer() {
  const { navigate } = useRouter();

  const quickLinks = [
    { label: "应急指南", onClick: () => { navigate("/"); setTimeout(() => { const el = document.getElementById("hotline-section"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 100); } },
    { label: "新闻中心", onClick: () => navigate("/news") },
    { label: "溯界者", onClick: () => navigate("/join") },
    { label: "溯界者注册", onClick: () => navigate("/register") },
    { label: "成员组织", onClick: () => navigate("/organizations") },
    { label: "关于我们", onClick: () => { navigate("/"); setTimeout(() => { const el = document.getElementById("about-imac"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 100); } },
  ];

  const contacts = [
    { label: "异常紧急热线", value: "99（全球通用）" },
    { label: "公众咨询邮箱", value: "public@imac.int" },
    { label: "媒体联络", value: "press@imac.int" },
    { label: "总部地址", value: "中立城 · 第一大道" },
  ];

  return (
    <>
      <style>{`
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
      `}</style>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="footer-logo" onClick={() => navigate("/")}>
                  <div className="footer-logo-mark">
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 2L36 11V29L20 38L4 29V11L20 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M20 2L20 38" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                      <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <circle cx="20" cy="20" r="2" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="footer-logo-text">
                    <span className="footer-logo-main">IMAC</span>
                    <span className="footer-logo-sub">国际异常管理联盟</span>
                  </div>
                </div>
                <p className="footer-tagline">
                  信息无条件共享 · 标准无条件统一 · 响应无条件协作
                </p>
                <div className="footer-hotline">
                  <div className="footer-hotline-label">ANOMALY EMERGENCY HOTLINE</div>
                  <div className="footer-hotline-number">99</div>
                  <div className="footer-hotline-desc">24小时 · 全球通用</div>
                </div>
              </div>

              <div>
                <h4 className="footer-column-title">快速链接</h4>
                <div className="footer-links-list">
                  {quickLinks.map((link) => (
                    <span key={link.label} className="footer-link" onClick={link.onClick}>
                      {link.label}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="footer-column-title">联系方式</h4>
                <div className="contact-list">
                  {contacts.map((c) => (
                    <div key={c.label} className="contact-item">
                      <span className="contact-label">{c.label}</span>
                      <span className="contact-value">{c.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-row">
              <span className="footer-copyright">
                © 国际异常管理联盟 IMAC · 安珀历39年 · 版权所有
              </span>
              <span className="footer-copyright">
                International Anomaly Management Coalition · All Rights Reserved
              </span>
            </div>
            <div className="footer-class-bar">
              <span className="accent">PUBLIC ACCESS · 公开访问级</span> &nbsp;|&nbsp;
              本页面内容经 IMAC 信息协调办公室审定 &nbsp;|&nbsp;
              INFO-REG.PUB.001 &nbsp;|&nbsp;
              VERSION 39.2
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

window.Footer = Footer;
