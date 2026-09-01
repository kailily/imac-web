function Header({ scrolled, currentRoute }) {
  const { navigate } = useRouter();
  const { authLevel, logout, currentLevelInfo, canAccess, identity } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const mobileMenuRef = React.useRef(null);
  const userMenuRef = React.useRef(null);

  const isTopSecret = authLevel === "topsecret";
  const isInternal = canAccess("internal");

  // 代号/职级：登录注册身份优先，其次溯界者申请表，最后默认（纯前端本地数据）
  const headerAppProfile = (() => {
    try { return JSON.parse(localStorage.getItem("imac_application_profile") || "null"); } catch (e) { return null; }
  })();
  const headerCodename = identity?.codename || headerAppProfile?.codename || "赤鸦";
  const headerRank = identity?.rank || (isTopSecret ? "界标" : "资深溯界者");

  // 系统邮箱未读数（全局，从 localStorage 同步）
  const [unreadMailCount, setUnreadMailCount] = React.useState(() => {
    try {
      const total = 10;
      const readIds = JSON.parse(localStorage.getItem("mail_read_ids") || "[]");
      return Math.max(0, total - readIds.length);
    } catch (e) {
      return 4;
    }
  });

  React.useEffect(() => {
    const recalc = () => {
      try {
        const total = 10;
        const readIds = JSON.parse(localStorage.getItem("mail_read_ids") || "[]");
        setUnreadMailCount(Math.max(0, total - readIds.length));
      } catch (e) {
        setUnreadMailCount(0);
      }
    };
    const onStorage = (e) => {
      if (e.key === "mail_read_ids") recalc();
    };
    const onCustom = (e) => setUnreadMailCount(e.detail ?? 0);
    window.addEventListener("storage", onStorage);
    window.addEventListener("mail-unread-changed", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("mail-unread-changed", onCustom);
    };
  }, []);

  // 点击外部关闭两个下拉
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "首页", en: "Home", to: "/", match: ["/", ""], icon: "home" },
    { label: "异常科普", en: "About Anomaly", to: "/#anomaly-intro", match: [], icon: "book" },
    { label: "应急指南", en: "Guide", to: "/guide", match: ["/guide"], icon: "shield" },
    { label: "新闻中心", en: "News", to: "/news", match: ["/news", "/media-auth", "/media-guidelines"], icon: "news" },
    { label: "溯界者", en: "Anomalists", to: "/join", match: ["/join"], icon: "user" },
    { label: "成员组织", en: "Organizations", to: "/organizations", match: ["/organizations"], prefix: "/org/", icon: "org" },
    { label: "异常信息数据库", en: "Database", to: "/database", match: ["/database", "/anomaly-archive"], prefix: "/anomaly/", locked: true, required: "internal", icon: "db" },
    { label: "关于我们", en: "About", to: "/#about-imac", match: [], icon: "info" },
  ];

  const isActive = (item) => {
    const route = currentRoute || "/";
    if (item.match && item.match.includes(route)) return true;
    if (item.prefix && route.startsWith(item.prefix)) return true;
    return false;
  };

  const handleNavClick = (item, e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    if (item.locked && !canAccess(item.required)) {
      navigate("/auth");
      return;
    }
    if (item.to.startsWith("/#")) {
      if (currentRoute === "/" || currentRoute === "") {
        const id = item.to.slice(2);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const id = item.to.slice(2);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      navigate(item.to);
    }
  };

  const NavIcon = ({ name }) => {
    const icons = {
      home: <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>,
      book: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>,
      shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
      news: <><path d="M4 4h16v16H4z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="14" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></>,
      user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></>,
      org: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
      db: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5"/><path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3"/></>,
      info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    };
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {icons[name] || icons.info}
      </svg>
    );
  };

  return (
    <>
      <style>{`
        .header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          background-color: rgba(10, 10, 12, 0.9);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-color);
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .header.scrolled {
          background-color: rgba(10, 10, 12, 0.97);
          border-bottom-color: var(--accent-red);
        }
        .header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }
        .header-left {
          display: flex; align-items: center; gap: 12px; cursor: pointer;
        }
        .logo-mark { width: 36px; height: 36px; }
        .logo-text-group { display: flex; flex-direction: column; line-height: 1.2; }
        .logo-main {
          font-family: var(--font-serif);
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.05em;
        }
        .logo-sub {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
        }
        .header-nav {
          display: flex; align-items: center; gap: 22px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .nav-item {
          position: relative;
          font-size: 13px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.2s ease;
          padding: 4px 0;
          display: flex; align-items: center; gap: 6px;
          white-space: nowrap;
          text-decoration: none;
        }
        .nav-item:hover, .nav-item.active { color: var(--text-primary); }
        .nav-item.active::after { width: 100%; }
        .nav-item::after {
          content: "";
          position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px;
          background-color: var(--accent-red-bright);
          transition: width 0.3s ease;
        }
        .nav-item:hover::after { width: 100%; }
        .nav-item .lock-icon { width: 12px; height: 12px; color: var(--text-muted); }
        .header-right {
          display: flex; align-items: center; gap: 16px;
        }
        .hotline-mini {
          display: flex; align-items: center; gap: 8px;
          cursor: pointer;
        }
        .hotline-mini-icon {
          width: 28px; height: 28px;
          border-radius: 50%;
          background-color: rgba(196, 40, 40, 0.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent-red-bright);
        }
        .hotline-mini-text { display: flex; flex-direction: column; line-height: 1.2; }
        .hotline-mini-label {
          font-family: var(--font-mono); font-size: 9px;
          color: var(--text-tertiary); letter-spacing: 0.1em;
        }
        .hotline-mini-num {
          font-family: var(--font-serif); font-size: 15px;
          font-weight: 700; color: var(--accent-red-bright);
        }

        /* 用户菜单 */
        .user-menu-wrap {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .header-mailbox-btn {
          position: relative;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .header-mailbox-btn:hover {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }
        .mailbox-unread-dot {
          position: absolute;
          top: -5px;
          right: -5px;
          min-width: 16px;
          height: 16px;
          padding: 0 4px;
          border-radius: 8px;
          background: var(--accent-red-bright);
          color: #fff;
          font-size: 9px;
          font-family: var(--font-mono);
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }
        .user-menu-badge {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border: 1px solid currentColor;
          transition: opacity 0.2s ease;
          user-select: none;
        }
        .user-menu-badge:hover { opacity: 0.85; }
        .user-avatar {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(196, 40, 40, 0.3), rgba(196, 40, 40, 0.1));
          border: 1px solid currentColor;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-serif);
          font-size: 11px;
          font-weight: 700;
          color: inherit;
          flex-shrink: 0;
        }
        .auth-badge {
          display: flex; align-items: center; gap: 8px;
          cursor: pointer;
          padding: 6px 12px;
          border: 1px solid;
          transition: all 0.2s ease;
        }
        .auth-badge-dot {
          width: 8px; height: 8px; border-radius: 50%;
        }
        .auth-badge-label {
          font-size: 12px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
          white-space: nowrap;
        }

        /* 下拉面板通用样式 */
        .dropdown-panel {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 270px;
          background-color: #0d0d12;
          border: 1px solid var(--border-color);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
          z-index: 9999;
          animation: dropDown 0.18s ease;
          max-height: calc(100vh - 72px);
          overflow-y: auto;
          overflow-x: hidden;
        }
        @keyframes dropDown {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* 用户下拉 */
        .user-dropdown-header {
          padding: 14px 16px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          gap: 12px;
          align-items: center;
          background: linear-gradient(90deg, rgba(196, 40, 40, 0.08), transparent);
        }
        .user-dropdown-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 2px solid var(--accent-red-bright);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--accent-red-bright);
          background: radial-gradient(circle, rgba(196, 40, 40, 0.15), transparent);
          flex-shrink: 0;
        }
        .user-dropdown-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .user-dropdown-codename {
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .user-dropdown-rank {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
        .user-dropdown-body {
          padding: 6px 0;
        }
        .user-menu-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 16px;
          font-size: 13px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: background-color 0.15s ease;
        }
        .user-menu-item:hover {
          background-color: rgba(255, 255, 255, 0.04);
          color: var(--text-primary);
        }
        .user-menu-item .menu-label {
          display: flex; align-items: center; gap: 10px;
        }
        .user-menu-item .menu-icon {
          width: 16px; height: 16px;
          color: var(--text-tertiary);
        }
        .user-menu-item .menu-value {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .user-menu-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 4px 0;
        }
        .user-menu-portal-entry {
          background: linear-gradient(90deg, rgba(196, 40, 40, 0.12), transparent);
          color: var(--accent-red-bright) !important;
          font-weight: 600 !important;
        }
        .user-menu-portal-entry .menu-icon { color: var(--accent-red-bright) !important; }
        .user-menu-logout {
          color: var(--text-tertiary) !important;
          border-top: 1px solid var(--border-color);
          margin-top: 4px;
          padding-top: 10px !important;
        }

        /* 汉堡按钮 */
        .mobile-menu-btn {
          display: none;
          flex-direction: column; gap: 4px;
          cursor: pointer;
          padding: 6px;
          z-index: 1001;
        }
        .mobile-menu-btn span {
          width: 20px; height: 2px;
          background-color: var(--text-primary);
          transition: all 0.3s ease;
        }
        .mobile-menu-btn.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .mobile-menu-btn.open span:nth-child(2) { opacity: 0; }
        .mobile-menu-btn.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        /* 移动端下拉菜单 */
        .mobile-menu-wrap {
          position: relative;
          display: none;
        }
        .mobile-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 280px;
          background-color: #0d0d12;
          border: 1px solid var(--border-color);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
          z-index: 9999;
          animation: dropDown 0.18s ease;
          max-height: calc(100vh - 72px);
          overflow-y: auto;
          overflow-x: hidden;
        }
        .mobile-menu-user-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: linear-gradient(90deg, rgba(196, 40, 40, 0.08), transparent);
          border-bottom: 1px solid var(--border-color);
        }
        .mobile-menu-user-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(196, 40, 40, 0.3), rgba(196, 40, 40, 0.1));
          border: 2px solid var(--accent-red-bright);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .mobile-menu-user-info {
          display: flex; flex-direction: column; gap: 2px;
          min-width: 0;
        }
        .mobile-menu-user-name {
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .mobile-menu-user-meta {
          font-size: 10px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
        .mobile-menu-auth-entry {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 16px;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 13px;
          background: linear-gradient(90deg, rgba(196, 40, 40, 0.08), transparent);
          transition: all 0.2s ease;
        }
        .mobile-menu-auth-entry:hover {
          color: var(--accent-red-bright);
        }
        .mobile-menu-section-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          padding: 10px 16px 6px;
          text-transform: uppercase;
        }
        .mobile-nav-item {
          font-size: 13px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 16px;
          width: 100%;
          text-decoration: none;
          box-sizing: border-box;
        }
        .mobile-nav-item:hover, .mobile-nav-item.active {
          color: var(--text-primary);
          background-color: rgba(255, 255, 255, 0.03);
        }
        .mobile-nav-item .mobile-nav-label {
          display: flex; align-items: center; gap: 10px;
        }
        .mobile-nav-item .mobile-nav-icon {
          width: 16px; height: 16px;
          color: var(--text-tertiary);
        }
        .mobile-nav-item:hover .mobile-nav-icon { color: var(--text-primary); }
        .mobile-nav-item .mobile-nav-arrow {
          width: 14px; height: 14px;
          opacity: 0.3;
          color: var(--text-secondary);
        }
        .mobile-nav-item:hover .mobile-nav-arrow { opacity: 1; }
        .mobile-menu-footer {
          border-top: 1px solid var(--border-color);
          padding: 8px 0;
          margin-top: 4px;
        }
        .mobile-logout-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 16px;
          color: var(--text-tertiary);
          cursor: pointer;
          font-size: 13px;
          transition: all 0.15s ease;
          width: 100%;
          background: transparent;
          border: none;
          text-align: left;
          box-sizing: border-box;
        }
        .mobile-logout-btn:hover {
          color: var(--accent-red-bright);
          background-color: rgba(255, 255, 255, 0.03);
        }
        .mobile-logout-btn svg { width: 16px; height: 16px; }

        .header-red-line {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--accent-red-bright) 50%, transparent 100%);
        }

        @media (max-width: 1200px) {
          .header-nav { gap: 16px; }
          .nav-item { font-size: 12px; }
        }
        @media (max-width: 1080px) {
          .header-nav { display: none; }
          .mobile-menu-wrap { display: block; }
          .mobile-menu-btn { display: flex; }
          .header-inner { padding: 0 24px; }
          .hotline-mini-text { display: none; }
        }
        @media (max-width: 768px) {
          .header-inner { padding: 0 16px; height: 56px; }
          .logo-sub { display: none; }
          .auth-badge-label { display: none; }
          .hotline-mini { display: none; }
          .mobile-dropdown { width: calc(100vw - 32px); right: 0; }
        }
      `}</style>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <div className="header-left" onClick={() => navigate("/")}>
            <div className="logo-mark">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2L36 11V29L20 38L4 29V11L20 2Z" stroke="#c42828" strokeWidth="1.5" fill="none"/>
                <path d="M20 2L20 38" stroke="#c42828" strokeWidth="1" opacity="0.5"/>
                <circle cx="20" cy="20" r="5" stroke="#c42828" strokeWidth="1.5" fill="none"/>
                <circle cx="20" cy="20" r="2" fill="#c42828"/>
              </svg>
            </div>
            <div className="logo-text-group">
              <span className="logo-main">IMAC · 国际异常管理联盟</span>
              <span className="logo-sub">CITIZEN SAFETY PORTAL</span>
            </div>
          </div>

          <nav className="header-nav">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.to}`}
                className={`nav-item ${isActive(item) ? "active" : ""}`}
                onClick={(e) => handleNavClick(item, e)}
              >
                {item.label}
                {item.locked && !canAccess(item.required) && (
                  <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                )}
              </a>
            ))}
          </nav>

          <div className="header-right">
            <div className="hotline-mini" onClick={() => {
              if (currentRoute !== "/" && currentRoute !== "") navigate("/");
              setTimeout(() => {
                const el = document.getElementById("hotline-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}>
              <div className="hotline-mini-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div className="hotline-mini-text">
                <span className="hotline-mini-label">异常热线</span>
                <span className="hotline-mini-num">99</span>
              </div>
            </div>

              {authLevel === "public" ? (
                <div className="auth-badge" style={{ borderColor: "var(--text-muted)", color: "var(--text-secondary)" }} onClick={() => navigate("/auth")}>
                  <div className="auth-badge-dot" style={{ backgroundColor: currentLevelInfo.color }}></div>
                  <span className="auth-badge-label">登录 / 认证</span>
                </div>
              ) : isInternal ? (
                <div className="user-menu-wrap" ref={userMenuRef}>
                  <div className="header-mailbox-btn" onClick={() => { navigate("/mailbox"); setUserMenuOpen(false); }} title="系统邮箱">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <span className="mailbox-unread-dot" style={{ display: unreadMailCount > 0 ? "flex" : "none" }}>{unreadMailCount > 99 ? "99+" : unreadMailCount}</span>
                  </div>
                  <div
                    className="user-menu-badge"
                    style={{ borderColor: currentLevelInfo.color, color: currentLevelInfo.color }}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                  <div className="user-avatar">{(identity?.staffId || identity?.adminId || "X").charAt(0).toUpperCase()}</div>
                  <span className="auth-badge-label">{currentLevelInfo.label}</span>
                </div>
                {userMenuOpen && (
                  <div className="dropdown-panel">
                    <div className="user-dropdown-header">
                      <div className="user-dropdown-avatar">
                        {isTopSecret ? "Z" : headerCodename.charAt(0)}
                      </div>
                      <div className="user-dropdown-info">
                        <span className="user-dropdown-codename">
                          {isTopSecret ? "指挥官 Z" : headerCodename}
                          {isTopSecret && <span style={{ fontSize: "10px", color: "#a97bd4", marginLeft: "6px" }}>★ ADMIN</span>}
                        </span>
                        <span className="user-dropdown-rank">
                          {isTopSecret ? "界标·绝密级" : (headerRank + "·机密级")} · {identity?.organization || "衔尾蛇事务所"}
                        </span>
                        <span className="user-dropdown-rank">{identity?.staffId || identity?.adminId || "IMAC-0000"}</span>
                        <span className="user-dropdown-rank" style={{ color: "var(--level-ordinary)" }}>● 在岗</span>
                      </div>
                    </div>
                    <div className="user-dropdown-body">
                      <div className="user-menu-item user-menu-portal-entry" onClick={() => { navigate("/portal"); setUserMenuOpen(false); }}>
                        <span className="menu-label">
                          <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M3 3h18v18H3z"/>
                            <path d="M9 21V9h12"/>
                          </svg>
                          内部指挥中心
                        </span>
                        <span className="menu-value">/portal</span>
                      </div>
                      <div className="user-menu-item" onClick={() => { navigate("/database"); setUserMenuOpen(false); }}>
                        <span className="menu-label">
                          <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <ellipse cx="12" cy="5" rx="9" ry="3"/>
                            <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5"/>
                            <path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3"/>
                          </svg>
                          异常信息数据库
                        </span>
                        <span className="menu-value">20,000+</span>
                      </div>
                      <div className="user-menu-divider"></div>
                      <div className="user-menu-item" onClick={() => { navigate("/mailbox"); setUserMenuOpen(false); }}>
                        <span className="menu-label">
                          <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                          </svg>
                          系统邮箱
                        </span>
                        <span className="menu-value" style={{ color: "var(--accent-red-bright)", fontWeight: 600, opacity: unreadMailCount > 0 ? 1 : 0.5 }}>{unreadMailCount > 0 ? `${unreadMailCount} 封未读` : "全部已读"}</span>
                      </div>
                      <div className="user-menu-item" onClick={() => { navigate("/profile-center"); setUserMenuOpen(false); }}>
                        <span className="menu-label">
                          <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <circle cx="12" cy="8" r="4"/>
                            <path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>
                          </svg>
                          个人中心
                        </span>
                        <span className="menu-value">/profile-center</span>
                      </div>
                      {isTopSecret && (
                        <>
                          <div className="user-menu-divider"></div>
                          <div className="user-menu-item" style={{ color: "#a97bd4" }} onClick={() => { navigate("/admin"); setUserMenuOpen(false); }}>
                            <span className="menu-label">
                              <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M12 1v6m0 10v6m11-11h-6M7 12H1m17.07-7.07l-4.24 4.24M10.17 13.83l-4.24 4.24m13.58-4.24l-4.24-4.24M10.17 10.17L5.93 5.93"/>
                              </svg>
                              系统管理
                            </span>
                            <span className="menu-value" style={{ color: "#a97bd4" }}>/admin</span>
                          </div>
                        </>
                      )}
                      <div
                        className="user-menu-item user-menu-logout"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                          navigate("/");
                        }}
                      >
                        <span className="menu-label">
                          <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                            <polyline points="16 17 21 12 16 7"/>
                            <line x1="21" y1="12" x2="9" y2="12"/>
                          </svg>
                          退出登录
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-badge" style={{ borderColor: currentLevelInfo.color, color: currentLevelInfo.color }} onClick={() => navigate("/auth")}>
                <div className="auth-badge-dot" style={{ backgroundColor: currentLevelInfo.color }}></div>
                <span className="auth-badge-label">{currentLevelInfo.label}</span>
              </div>
            )}

            {/* 汉堡按钮 + 下拉菜单 */}
            <div className="mobile-menu-wrap" ref={mobileMenuRef}>
              <div
                className={`mobile-menu-btn ${mobileMenuOpen ? "open" : ""}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="菜单"
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              {mobileMenuOpen && (
                <div className="mobile-dropdown">
                  {/* 用户信息卡 / 登录入口 */}
                  {isInternal ? (
                    <div className="mobile-menu-user-card">
                      <div className="mobile-menu-user-avatar">
                        {isTopSecret ? "Z" : "赤"}
                      </div>
                      <div className="mobile-menu-user-info">
                        <span className="mobile-menu-user-name">
                          {isTopSecret ? "指挥官 Z" : "赤鸦"}
                          {isTopSecret && <span style={{ fontSize: "10px", color: "#a97bd4", marginLeft: "4px" }}>★</span>}
                        </span>
                        <span className="mobile-menu-user-meta">{identity?.staffId || identity?.adminId || "IMAC-0000"} · 在岗</span>
                        <span className="mobile-menu-user-meta" style={{ color: currentLevelInfo.color }}>{currentLevelInfo.label}</span>
                      </div>
                    </div>
                  ) : authLevel !== "public" ? (
                    <div className="mobile-menu-user-card">
                      <div className="mobile-menu-user-avatar" style={{ borderColor: currentLevelInfo.color, color: currentLevelInfo.color }}>
                        {currentLevelInfo.label.charAt(0)}
                      </div>
                      <div className="mobile-menu-user-info">
                        <span className="mobile-menu-user-name">{currentLevelInfo.label}</span>
                        <span className="mobile-menu-user-meta">{currentLevelInfo.desc || ""}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mobile-menu-auth-entry" onClick={() => { setMobileMenuOpen(false); navigate("/auth"); }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/>
                        <polyline points="10 17 15 12 10 7"/>
                        <line x1="15" y1="12" x2="3" y2="12"/>
                      </svg>
                      <span>登录 / 身份认证</span>
                    </div>
                  )}

                  <div className="mobile-menu-section-label">NAVIGATION</div>

                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={`#${item.to}`}
                      className={`mobile-nav-item ${isActive(item) ? "active" : ""}`}
                      onClick={(e) => handleNavClick(item, e)}
                    >
                      <span className="mobile-nav-label">
                        <span className="mobile-nav-icon">
                          <NavIcon name={item.icon} />
                        </span>
                        {item.label}
                        {item.locked && !canAccess(item.required) && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 13, height: 13, marginLeft: 4, opacity: 0.5 }}>
                            <rect x="3" y="11" width="18" height="11" rx="2"/>
                            <path d="M7 11V7a5 5 0 0110 0v4"/>
                          </svg>
                        )}
                      </span>
                      <svg className="mobile-nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </a>
                  ))}

                  <div className="mobile-menu-footer">
                    {isInternal && (
                      <>
                        <div className="mobile-nav-item" onClick={() => { navigate("/portal"); setMobileMenuOpen(false); }}>
                          <span className="mobile-nav-label">
                            <span className="mobile-nav-icon" style={{ color: "var(--accent-red-bright)" }}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M3 3h18v18H3z"/>
                                <path d="M9 21V9h12"/>
                              </svg>
                            </span>
                            <span style={{ color: "var(--accent-red-bright)", fontWeight: 600 }}>内部指挥中心</span>
                          </span>
                          <svg className="mobile-nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6"/>
                          </svg>
                        </div>
                      </>
                    )}
                    {authLevel !== "public" && (
                      <button
                        className="mobile-logout-btn"
                        onClick={() => { logout(); setMobileMenuOpen(false); navigate("/"); }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                          <polyline points="16 17 21 12 16 7"/>
                          <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        退出登录
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="header-red-line"></div>
      </header>
    </>
  );
}

window.Header = Header;
