function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Simple hash-based router context
const RouterContext = React.createContext();
function RouterProvider({
  children
}) {
  const [route, setRoute] = React.useState(window.location.hash.slice(1) || "/");
  React.useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.slice(1) || "/");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  const navigate = React.useCallback(path => {
    window.location.hash = path;
  }, []);
  const value = React.useMemo(() => ({
    route,
    navigate
  }), [route, navigate]);
  return /*#__PURE__*/React.createElement(RouterContext.Provider, {
    value: value
  }, children);
}
function useRouter() {
  return React.useContext(RouterContext);
}

// Link component
function Link({
  to,
  className,
  style,
  children,
  onClick,
  ...rest
}) {
  const {
    navigate
  } = useRouter();
  const handleClick = e => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };
  return /*#__PURE__*/React.createElement("a", _extends({
    href: `#${to}`,
    className: className,
    style: style,
    onClick: handleClick
  }, rest), children);
}
window.RouterProvider = RouterProvider;
window.useRouter = useRouter;
window.Link = Link;
window.RouterContext = RouterContext;;
// Auth Context - 4 tier permission system
const AuthContext = React.createContext();
const AUTH_LEVELS = {
  PUBLIC: {
    key: "public",
    label: "公开级",
    en: "PUBLIC",
    color: "#4a7c59"
  },
  MEDIA: {
    key: "media",
    label: "受限级",
    en: "RESTRICTED",
    color: "#c49a2c"
  },
  INTERNAL: {
    key: "internal",
    label: "机密级",
    en: "CONFIDENTIAL",
    color: "#c42828"
  },
  TOPSECRET: {
    key: "topsecret",
    label: "绝密级",
    en: "TOP SECRET",
    color: "#7a3ab0"
  }
};
const AUTH_STORAGE_KEY = "imac_auth_level";
const AUTH_IDENTITY_KEY = "imac_auth_identity";
function AuthProvider({
  children
}) {
  const [authLevel, setAuthLevel] = React.useState(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) || "public";
    } catch (e) {
      return "public";
    }
  });
  const [identity, setIdentity] = React.useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(AUTH_IDENTITY_KEY) || "null") || null;
      if (raw) {
        const id = raw.staffId || raw.adminId || "";
        // 数据迁移：编号统一为 IMAC-所属组织缩写-编号，旧格式（XDPS- 前缀或无组织缩写段）自动清除登录态
        if (id && !/^IMAC-[A-Z0-9]+-\d+$/i.test(id.trim())) {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          localStorage.removeItem(AUTH_IDENTITY_KEY);
          return null;
        }
      }
      return raw;
    } catch (e) {
      return null;
    }
  });
  const setAuth = React.useCallback((level, identityData) => {
    setAuthLevel(level);
    setIdentity(identityData || null);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, level);
      if (identityData) {
        localStorage.setItem(AUTH_IDENTITY_KEY, JSON.stringify(identityData));
      } else {
        localStorage.removeItem(AUTH_IDENTITY_KEY);
      }
    } catch (e) {}
  }, []);
  const logout = React.useCallback(() => {
    setAuthLevel("public");
    setIdentity(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_IDENTITY_KEY);
    } catch (e) {}
  }, []);
  const canAccess = React.useCallback(requiredLevel => {
    const order = ["public", "media", "internal", "topsecret"];
    const currentIdx = order.indexOf(authLevel);
    const requiredIdx = order.indexOf(requiredLevel);
    return currentIdx >= requiredIdx;
  }, [authLevel]);
  const value = React.useMemo(() => ({
    authLevel,
    identity,
    setAuth,
    logout,
    canAccess,
    levels: AUTH_LEVELS,
    currentLevelInfo: AUTH_LEVELS[authLevel.toUpperCase()] || AUTH_LEVELS.PUBLIC
  }), [authLevel, identity, setAuth, logout, canAccess]);
  return /*#__PURE__*/React.createElement(AuthContext.Provider, {
    value: value
  }, children);
}
function useAuth() {
  return React.useContext(AuthContext);
}

// Restricted content wrapper - shows locked overlay if insufficient permission
function Restricted({
  level,
  children,
  label,
  compact
}) {
  const {
    canAccess,
    authLevel,
    levels
  } = useAuth();
  const {
    navigate
  } = useRouter();
  if (canAccess(level)) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, children);
  }
  const requiredInfo = levels[level.toUpperCase()] || levels.PUBLIC;
  return /*#__PURE__*/React.createElement("div", {
    className: `restricted-overlay ${compact ? "compact" : ""}`,
    style: {
      position: "relative",
      overflow: "hidden",
      pointerEvents: compact ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      filter: "blur(3px) opacity(0.35)",
      pointerEvents: "none"
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "restricted-lock-panel",
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      backgroundColor: compact ? "transparent" : "rgba(10, 10, 12, 0.5)",
      backdropFilter: compact ? "none" : "blur(2px)",
      pointerEvents: "auto",
      cursor: "pointer"
    },
    onClick: () => navigate("/auth")
  }, /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#c42828",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 0110 0v4"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      color: "var(--text-tertiary)",
      letterSpacing: "0.1em",
      textAlign: "center"
    }
  }, label || `需${requiredInfo.label}权限`), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      color: "var(--accent-red-bright)",
      letterSpacing: "0.15em",
      borderBottom: "1px solid var(--accent-red-bright)",
      paddingBottom: "2px"
    }
  }, "\u767B\u5F55\u89E3\u9501 \u2192")));
}
window.AuthProvider = AuthProvider;
window.useAuth = useAuth;
window.Restricted = Restricted;
window.AuthContext = AuthContext;
window.AUTH_LEVELS = AUTH_LEVELS;;
function Header({
  scrolled,
  currentRoute
}) {
  const {
    navigate
  } = useRouter();
  const {
    authLevel,
    logout,
    currentLevelInfo,
    canAccess,
    identity
  } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const mobileMenuRef = React.useRef(null);
  const userMenuRef = React.useRef(null);
  const isTopSecret = authLevel === "topsecret";
  const isInternal = canAccess("internal");

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
    const onStorage = e => {
      if (e.key === "mail_read_ids") recalc();
    };
    const onCustom = e => setUnreadMailCount(e.detail ?? 0);
    window.addEventListener("storage", onStorage);
    window.addEventListener("mail-unread-changed", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("mail-unread-changed", onCustom);
    };
  }, []);

  // 点击外部关闭两个下拉
  React.useEffect(() => {
    const handleClickOutside = e => {
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
  const navItems = [{
    label: "首页",
    en: "Home",
    to: "/",
    match: ["/", ""],
    icon: "home"
  }, {
    label: "异常科普",
    en: "About Anomaly",
    to: "/#anomaly-intro",
    match: [],
    icon: "book"
  }, {
    label: "应急指南",
    en: "Guide",
    to: "/guide",
    match: ["/guide"],
    icon: "shield"
  }, {
    label: "新闻中心",
    en: "News",
    to: "/news",
    match: ["/news", "/media-auth", "/media-guidelines"],
    icon: "news"
  }, {
    label: "溯界者",
    en: "Anomalists",
    to: "/join",
    match: ["/join"],
    icon: "user"
  }, {
    label: "成员组织",
    en: "Organizations",
    to: "/organizations",
    match: ["/organizations"],
    prefix: "/org/",
    icon: "org"
  }, {
    label: "异常信息数据库",
    en: "Database",
    to: "/database",
    match: ["/database", "/anomaly-archive"],
    prefix: "/anomaly/",
    locked: true,
    required: "internal",
    icon: "db"
  }, {
    label: "关于我们",
    en: "About",
    to: "/#about-imac",
    match: [],
    icon: "info"
  }];
  const isActive = item => {
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
        if (el) el.scrollIntoView({
          behavior: "smooth"
        });
      } else {
        navigate("/");
        setTimeout(() => {
          const id = item.to.slice(2);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({
            behavior: "smooth"
          });
        }, 100);
      }
    } else {
      navigate(item.to);
    }
  };
  const NavIcon = ({
    name
  }) => {
    const icons = {
      home: /*#__PURE__*/React.createElement("path", {
        d: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      }),
      book: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
        d: "M4 19.5A2.5 2.5 0 016.5 17H20"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
      })),
      shield: /*#__PURE__*/React.createElement("path", {
        d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      }),
      news: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
        d: "M4 4h16v16H4z"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "8",
        y1: "9",
        x2: "16",
        y2: "9"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "8",
        y1: "13",
        x2: "14",
        y2: "13"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "8",
        y1: "17",
        x2: "12",
        y2: "17"
      })),
      user: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "8",
        r: "4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M4 21c0-4 4-7 8-7s8 3 8 7"
      })),
      org: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
        d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "9",
        cy: "7",
        r: "4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M23 21v-2a4 4 0 00-3-3.87"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M16 3.13a4 4 0 010 7.75"
      })),
      db: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("ellipse", {
        cx: "12",
        cy: "5",
        rx: "9",
        ry: "3"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3"
      })),
      info: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
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
      }))
    };
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, icons[name] || icons.info);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
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
      `), /*#__PURE__*/React.createElement("header", {
    className: `header ${scrolled ? "scrolled" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-left",
    onClick: () => navigate("/")
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-mark"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 40 40",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 2L36 11V29L20 38L4 29V11L20 2Z",
    stroke: "#c42828",
    strokeWidth: "1.5",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 2L20 38",
    stroke: "#c42828",
    strokeWidth: "1",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "20",
    r: "5",
    stroke: "#c42828",
    strokeWidth: "1.5",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "20",
    r: "2",
    fill: "#c42828"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "logo-text-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "logo-main"
  }, "IMAC \xB7 \u56FD\u9645\u5F02\u5E38\u7BA1\u7406\u8054\u76DF"), /*#__PURE__*/React.createElement("span", {
    className: "logo-sub"
  }, "CITIZEN SAFETY PORTAL"))), /*#__PURE__*/React.createElement("nav", {
    className: "header-nav"
  }, navItems.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.label,
    href: `#${item.to}`,
    className: `nav-item ${isActive(item) ? "active" : ""}`,
    onClick: e => handleNavClick(item, e)
  }, item.label, item.locked && !canAccess(item.required) && /*#__PURE__*/React.createElement("svg", {
    className: "lock-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 0110 0v4"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "header-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-mini",
    onClick: () => {
      if (currentRoute !== "/" && currentRoute !== "") navigate("/");
      setTimeout(() => {
        const el = document.getElementById("hotline-section");
        if (el) el.scrollIntoView({
          behavior: "smooth"
        });
      }, 100);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-mini-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hotline-mini-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hotline-mini-label"
  }, "\u5F02\u5E38\u70ED\u7EBF"), /*#__PURE__*/React.createElement("span", {
    className: "hotline-mini-num"
  }, "99"))), authLevel === "public" ? /*#__PURE__*/React.createElement("div", {
    className: "auth-badge",
    style: {
      borderColor: "var(--text-muted)",
      color: "var(--text-secondary)"
    },
    onClick: () => navigate("/auth")
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-badge-dot",
    style: {
      backgroundColor: currentLevelInfo.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "auth-badge-label"
  }, "\u767B\u5F55 / \u8BA4\u8BC1")) : isInternal ? /*#__PURE__*/React.createElement("div", {
    className: "user-menu-wrap",
    ref: userMenuRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-mailbox-btn",
    onClick: () => {
      navigate("/mailbox");
      setUserMenuOpen(false);
    },
    title: "\u7CFB\u7EDF\u90AE\u7BB1"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "22,6 12,13 2,6"
  })), /*#__PURE__*/React.createElement("span", {
    className: "mailbox-unread-dot",
    style: {
      display: unreadMailCount > 0 ? "flex" : "none"
    }
  }, unreadMailCount > 99 ? "99+" : unreadMailCount)), /*#__PURE__*/React.createElement("div", {
    className: "user-menu-badge",
    style: {
      borderColor: currentLevelInfo.color,
      color: currentLevelInfo.color
    },
    onClick: () => setUserMenuOpen(!userMenuOpen)
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-avatar"
  }, (identity?.staffId || identity?.adminId || "X").charAt(0).toUpperCase()), /*#__PURE__*/React.createElement("span", {
    className: "auth-badge-label"
  }, currentLevelInfo.label)), userMenuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dropdown-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-dropdown-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-dropdown-avatar"
  }, isTopSecret ? "Z" : "赤"), /*#__PURE__*/React.createElement("div", {
    className: "user-dropdown-info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "user-dropdown-codename"
  }, isTopSecret ? "指挥官 Z" : "赤鸦", isTopSecret && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "10px",
      color: "#a97bd4",
      marginLeft: "6px"
    }
  }, "\u2605 ADMIN")), /*#__PURE__*/React.createElement("span", {
    className: "user-dropdown-rank"
  }, isTopSecret ? "界标·绝密级" : "资深溯界者·机密级", " \xB7 ", identity?.organization || "衔尾蛇事务所"), /*#__PURE__*/React.createElement("span", {
    className: "user-dropdown-rank"
  }, identity?.staffId || identity?.adminId || "IMAC-0000"), /*#__PURE__*/React.createElement("span", {
    className: "user-dropdown-rank",
    style: {
      color: "var(--level-ordinary)"
    }
  }, "\u25CF \u5728\u5C97"))), /*#__PURE__*/React.createElement("div", {
    className: "user-dropdown-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-menu-item user-menu-portal-entry",
    onClick: () => {
      navigate("/portal");
      setUserMenuOpen(false);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "menu-label"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "menu-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 3h18v18H3z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 21V9h12"
  })), "\u5185\u90E8\u6307\u6325\u4E2D\u5FC3"), /*#__PURE__*/React.createElement("span", {
    className: "menu-value"
  }, "/portal")), /*#__PURE__*/React.createElement("div", {
    className: "user-menu-item",
    onClick: () => {
      navigate("/database");
      setUserMenuOpen(false);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "menu-label"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "menu-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "12",
    cy: "5",
    rx: "9",
    ry: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3"
  })), "\u5F02\u5E38\u4FE1\u606F\u6570\u636E\u5E93"), /*#__PURE__*/React.createElement("span", {
    className: "menu-value"
  }, "20,000+")), /*#__PURE__*/React.createElement("div", {
    className: "user-menu-divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "user-menu-item",
    onClick: () => {
      navigate("/mailbox");
      setUserMenuOpen(false);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "menu-label"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "menu-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "22,6 12,13 2,6"
  })), "\u7CFB\u7EDF\u90AE\u7BB1"), /*#__PURE__*/React.createElement("span", {
    className: "menu-value",
    style: {
      color: "var(--accent-red-bright)",
      fontWeight: 600,
      opacity: unreadMailCount > 0 ? 1 : 0.5
    }
  }, unreadMailCount > 0 ? `${unreadMailCount} 封未读` : "全部已读")), /*#__PURE__*/React.createElement("div", {
    className: "user-menu-item",
    onClick: () => {
      navigate("/profile-center");
      setUserMenuOpen(false);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "menu-label"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "menu-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 21c0-4 4-7 8-7s8 3 8 7"
  })), "\u4E2A\u4EBA\u4E2D\u5FC3"), /*#__PURE__*/React.createElement("span", {
    className: "menu-value"
  }, "/profile-center")), isTopSecret && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "user-menu-divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "user-menu-item",
    style: {
      color: "#a97bd4"
    },
    onClick: () => {
      navigate("/admin");
      setUserMenuOpen(false);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "menu-label"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "menu-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 1v6m0 10v6m11-11h-6M7 12H1m17.07-7.07l-4.24 4.24M10.17 13.83l-4.24 4.24m13.58-4.24l-4.24-4.24M10.17 10.17L5.93 5.93"
  })), "\u7CFB\u7EDF\u7BA1\u7406"), /*#__PURE__*/React.createElement("span", {
    className: "menu-value",
    style: {
      color: "#a97bd4"
    }
  }, "/admin"))), /*#__PURE__*/React.createElement("div", {
    className: "user-menu-item user-menu-logout",
    onClick: () => {
      logout();
      setUserMenuOpen(false);
      navigate("/");
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "menu-label"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "menu-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "16 17 21 12 16 7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "12",
    x2: "9",
    y2: "12"
  })), "\u9000\u51FA\u767B\u5F55"))))) : /*#__PURE__*/React.createElement("div", {
    className: "auth-badge",
    style: {
      borderColor: currentLevelInfo.color,
      color: currentLevelInfo.color
    },
    onClick: () => navigate("/auth")
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-badge-dot",
    style: {
      backgroundColor: currentLevelInfo.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "auth-badge-label"
  }, currentLevelInfo.label)), /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu-wrap",
    ref: mobileMenuRef
  }, /*#__PURE__*/React.createElement("div", {
    className: `mobile-menu-btn ${mobileMenuOpen ? "open" : ""}`,
    onClick: () => setMobileMenuOpen(!mobileMenuOpen),
    "aria-label": "\u83DC\u5355"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), mobileMenuOpen && /*#__PURE__*/React.createElement("div", {
    className: "mobile-dropdown"
  }, isInternal ? /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu-user-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu-user-avatar"
  }, isTopSecret ? "Z" : "赤"), /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu-user-info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mobile-menu-user-name"
  }, isTopSecret ? "指挥官 Z" : "赤鸦", isTopSecret && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "10px",
      color: "#a97bd4",
      marginLeft: "4px"
    }
  }, "\u2605")), /*#__PURE__*/React.createElement("span", {
    className: "mobile-menu-user-meta"
  }, identity?.staffId || identity?.adminId || "IMAC-0000", " \xB7 \u5728\u5C97"), /*#__PURE__*/React.createElement("span", {
    className: "mobile-menu-user-meta",
    style: {
      color: currentLevelInfo.color
    }
  }, currentLevelInfo.label))) : authLevel !== "public" ? /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu-user-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu-user-avatar",
    style: {
      borderColor: currentLevelInfo.color,
      color: currentLevelInfo.color
    }
  }, currentLevelInfo.label.charAt(0)), /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu-user-info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mobile-menu-user-name"
  }, currentLevelInfo.label), /*#__PURE__*/React.createElement("span", {
    className: "mobile-menu-user-meta"
  }, currentLevelInfo.desc || ""))) : /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu-auth-entry",
    onClick: () => {
      setMobileMenuOpen(false);
      navigate("/auth");
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "10 17 15 12 10 7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "12",
    x2: "3",
    y2: "12"
  })), /*#__PURE__*/React.createElement("span", null, "\u767B\u5F55 / \u8EAB\u4EFD\u8BA4\u8BC1")), /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu-section-label"
  }, "NAVIGATION"), navItems.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.label,
    href: `#${item.to}`,
    className: `mobile-nav-item ${isActive(item) ? "active" : ""}`,
    onClick: e => handleNavClick(item, e)
  }, /*#__PURE__*/React.createElement("span", {
    className: "mobile-nav-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mobile-nav-icon"
  }, /*#__PURE__*/React.createElement(NavIcon, {
    name: item.icon
  })), item.label, item.locked && !canAccess(item.required) && /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    style: {
      width: 13,
      height: 13,
      marginLeft: 4,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 0110 0v4"
  }))), /*#__PURE__*/React.createElement("svg", {
    className: "mobile-nav-arrow",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu-footer"
  }, isInternal && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav-item",
    onClick: () => {
      navigate("/portal");
      setMobileMenuOpen(false);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mobile-nav-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mobile-nav-icon",
    style: {
      color: "var(--accent-red-bright)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 3h18v18H3z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 21V9h12"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-red-bright)",
      fontWeight: 600
    }
  }, "\u5185\u90E8\u6307\u6325\u4E2D\u5FC3")), /*#__PURE__*/React.createElement("svg", {
    className: "mobile-nav-arrow",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  })))), authLevel !== "public" && /*#__PURE__*/React.createElement("button", {
    className: "mobile-logout-btn",
    onClick: () => {
      logout();
      setMobileMenuOpen(false);
      navigate("/");
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "16 17 21 12 16 7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "12",
    x2: "9",
    y2: "12"
  })), "\u9000\u51FA\u767B\u5F55")))))), /*#__PURE__*/React.createElement("div", {
    className: "header-red-line"
  })));
}
window.Header = Header;;
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
window.Footer = Footer;;
// WorldMap - SVG world map with organization markers
function WorldMap({
  orgs
}) {
  const [activeOrg, setActiveOrg] = React.useState(null);
  const [hoveredOrg, setHoveredOrg] = React.useState(null);
  const displayOrg = hoveredOrg || activeOrg;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .world-map-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background-color: #08080a;
          border: 1px solid var(--border-color);
          overflow: hidden;
        }
        .world-map-svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .map-marker {
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .map-marker:hover {
          transform: scale(1.3);
        }
        .map-marker.active circle {
          filter: drop-shadow(0 0 6px currentColor);
        }
        .map-tooltip {
          position: absolute;
          background-color: var(--bg-card);
          border: 1px solid var(--border-light);
          padding: 16px 18px;
          max-width: 260px;
          z-index: 10;
          pointer-events: none;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .map-tooltip.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .map-tooltip::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 10px; height: 10px;
          border-top: 2px solid var(--accent-red);
          border-left: 2px solid var(--accent-red);
        }
        .map-tooltip-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .map-tooltip-abbr {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid var(--steel-blue-light);
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--steel-blue-light);
        }
        .map-tooltip-name {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .map-tooltip-en {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .map-tooltip-hq {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }
        .map-tooltip-desc {
          font-size: 12px;
          color: var(--text-tertiary);
          line-height: 1.6;
          margin-bottom: 10px;
        }
        .map-tooltip-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .map-tooltip-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          padding: 2px 6px;
          border: 1px solid var(--steel-blue-dark);
          color: var(--steel-blue-light);
          letter-spacing: 0.05em;
        }
        .map-legend {
          position: absolute;
          bottom: 16px;
          left: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
        }
        .map-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .map-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent-red-bright);
        }
        .map-legend-dot.mobile {
          border: 1px dashed var(--accent-red-bright);
          background: none;
        }
        .map-grid-lines {
          opacity: 0.06;
        }
        @media (max-width: 768px) {
          .world-map-wrapper {
            aspect-ratio: 4 / 3;
          }
          .map-tooltip {
            max-width: 200px;
            padding: 12px 14px;
          }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "world-map-wrapper"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "world-map-svg",
    viewBox: "0 0 1000 562",
    preserveAspectRatio: "xMidYMid meet"
  }, /*#__PURE__*/React.createElement("g", {
    className: "map-grid-lines",
    stroke: "#fff",
    strokeWidth: "0.5",
    fill: "none"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "140",
    x2: "1000",
    y2: "140"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "281",
    x2: "1000",
    y2: "281"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "422",
    x2: "1000",
    y2: "422"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "250",
    y1: "0",
    x2: "250",
    y2: "562"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "500",
    y1: "0",
    x2: "500",
    y2: "562"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "750",
    y1: "0",
    x2: "750",
    y2: "562"
  })), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "#2a2a32",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M620,100 L720,80 L780,120 L800,180 L790,260 L750,320 L700,340 L650,320 L600,280 L580,220 L590,160 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M720,340 L760,330 L780,360 L760,390 L720,380 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M420,120 L580,100 L620,160 L600,220 L520,240 L440,220 L400,180 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M340,100 L420,90 L440,140 L420,200 L360,210 L320,180 L310,140 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M350,240 L440,230 L480,280 L470,380 L420,440 L360,430 L320,370 L310,300 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M80,80 L220,60 L280,100 L290,180 L260,260 L180,280 L100,260 L60,200 L50,140 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M200,280 L260,280 L270,320 L230,340 L200,320 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M220,360 L280,350 L300,400 L290,480 L250,520 L210,500 L200,440 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M780,380 L870,370 L900,410 L880,450 L820,460 L770,430 Z"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "500",
    cy: "50",
    rx: "400",
    ry: "30"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M600,500 L660,495 L680,520 L640,530 L590,520 Z"
  })), /*#__PURE__*/React.createElement("g", {
    className: `map-marker ${activeOrg === "oa" ? "active" : ""}`,
    style: {
      color: "var(--accent-red-bright)"
    },
    onClick: () => setActiveOrg(activeOrg === "oa" ? null : "oa"),
    onMouseEnter: () => setHoveredOrg("oa"),
    onMouseLeave: () => setHoveredOrg(null),
    transform: "translate(760, 200)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "9",
    fill: "currentColor",
    opacity: "0.2"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("text", {
    y: "-14",
    textAnchor: "middle",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    fontWeight: "700",
    fill: "#e8e8ec"
  }, "OA")), /*#__PURE__*/React.createElement("g", {
    className: `map-marker ${activeOrg === "nw" ? "active" : ""}`,
    style: {
      color: "var(--steel-blue-light)"
    },
    onClick: () => setActiveOrg(activeOrg === "nw" ? null : "nw"),
    onMouseEnter: () => setHoveredOrg("nw"),
    onMouseLeave: () => setHoveredOrg(null),
    transform: "translate(680, 90)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "9",
    fill: "currentColor",
    opacity: "0.2"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("text", {
    y: "-14",
    textAnchor: "middle",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    fontWeight: "700",
    fill: "#e8e8ec"
  }, "NW")), /*#__PURE__*/React.createElement("g", {
    className: `map-marker ${activeOrg === "bri" ? "active" : ""}`,
    style: {
      color: "#7a8a9c"
    },
    onClick: () => setActiveOrg(activeOrg === "bri" ? null : "bri"),
    onMouseEnter: () => setHoveredOrg("bri"),
    onMouseLeave: () => setHoveredOrg(null),
    transform: "translate(400, 160)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "9",
    fill: "currentColor",
    opacity: "0.2"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("text", {
    y: "-14",
    textAnchor: "middle",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    fontWeight: "700",
    fill: "#e8e8ec"
  }, "BRI")), /*#__PURE__*/React.createElement("g", {
    className: `map-marker ${activeOrg === "mc" ? "active" : ""}`,
    style: {
      color: "var(--level-hazardous)"
    },
    onClick: () => setActiveOrg(activeOrg === "mc" ? null : "mc"),
    onMouseEnter: () => setHoveredOrg("mc"),
    onMouseLeave: () => setHoveredOrg(null),
    transform: "translate(160, 170)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "11",
    fill: "currentColor",
    opacity: "0.15"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "6",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("text", {
    y: "-16",
    textAnchor: "middle",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    fontWeight: "700",
    fill: "#e8e8ec"
  }, "MC/4W")), /*#__PURE__*/React.createElement("g", {
    className: `map-marker ${activeOrg === "ps" ? "active" : ""}`,
    style: {
      color: "var(--level-unknown)"
    },
    onClick: () => setActiveOrg(activeOrg === "ps" ? null : "ps"),
    onMouseEnter: () => setHoveredOrg("ps"),
    onMouseLeave: () => setHoveredOrg(null),
    transform: "translate(480, 350)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "9",
    fill: "currentColor",
    opacity: "0.2"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("text", {
    y: "-14",
    textAnchor: "middle",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    fontWeight: "700",
    fill: "#e8e8ec"
  }, "PS")), /*#__PURE__*/React.createElement("g", {
    className: `map-marker ${activeOrg === "wnp" ? "active" : ""}`,
    style: {
      color: "#8ab4d4"
    },
    onClick: () => setActiveOrg(activeOrg === "wnp" ? null : "wnp"),
    onMouseEnter: () => setHoveredOrg("wnp"),
    onMouseLeave: () => setHoveredOrg(null),
    transform: "translate(520, 40)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "9",
    fill: "currentColor",
    opacity: "0.2"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "0,-6 5,3 -5,3",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("text", {
    y: "-14",
    textAnchor: "middle",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    fontWeight: "700",
    fill: "#e8e8ec"
  }, "WNP")), /*#__PURE__*/React.createElement("g", {
    className: `map-marker ${activeOrg === "lbc" ? "active" : ""}`,
    style: {
      color: "var(--accent-red-bright)"
    },
    onClick: () => setActiveOrg(activeOrg === "lbc" ? null : "lbc"),
    onMouseEnter: () => setHoveredOrg("lbc"),
    onMouseLeave: () => setHoveredOrg(null),
    transform: "translate(500, 300)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeDasharray: "4 3",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "6",
    fill: "currentColor",
    opacity: "0.3"
  }), /*#__PURE__*/React.createElement("text", {
    y: "3",
    textAnchor: "middle",
    fontFamily: "var(--font-mono)",
    fontSize: "9",
    fontWeight: "700",
    fill: "#e8e8ec"
  }, "LBC"))), displayOrg && /*#__PURE__*/React.createElement("div", {
    className: `map-tooltip visible`,
    style: {
      top: orgs.find(o => o.id === displayOrg)?.tooltipTop || "20%",
      left: orgs.find(o => o.id === displayOrg)?.tooltipLeft || "30%"
    }
  }, (() => {
    const org = orgs.find(o => o.id === displayOrg);
    if (!org) return null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "map-tooltip-header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "map-tooltip-abbr"
    }, org.abbr), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "map-tooltip-name"
    }, org.name), /*#__PURE__*/React.createElement("div", {
      className: "map-tooltip-en"
    }, org.en))), /*#__PURE__*/React.createElement("div", {
      className: "map-tooltip-hq"
    }, "\u603B\u90E8\uFF1A", org.hq), /*#__PURE__*/React.createElement("p", {
      className: "map-tooltip-desc"
    }, org.desc), /*#__PURE__*/React.createElement("div", {
      className: "map-tooltip-tags"
    }, org.tags.map(t => /*#__PURE__*/React.createElement("span", {
      key: t,
      className: "map-tooltip-tag"
    }, t))));
  })()), /*#__PURE__*/React.createElement("div", {
    className: "map-legend"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-dot"
  }), /*#__PURE__*/React.createElement("span", null, "\u6210\u5458\u7EC4\u7EC7\u603B\u90E8")), /*#__PURE__*/React.createElement("div", {
    className: "map-legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-dot mobile"
  }), /*#__PURE__*/React.createElement("span", null, "\u79FB\u52A8\u673A\u6784 \xB7 \u65E0\u56FA\u5B9A\u603B\u90E8")))));
}
window.WorldMap = WorldMap;;
// Organizations map component with interactive world map
function OrganizationsMap({
  compact = false,
  onOrgClick,
  selectedOrg,
  setSelectedOrg
}) {
  const {
    navigate
  } = useRouter();
  const orgs = ORGANIZATIONS;
  const [hovered, setHovered] = React.useState(null);
  const [active, setActive] = React.useState(selectedOrg || null);
  React.useEffect(() => {
    if (selectedOrg !== undefined) setActive(selectedOrg);
  }, [selectedOrg]);
  const handleOrgClick = org => {
    setActive(org.slug);
    if (setSelectedOrg) setSelectedOrg(org.slug);
    if (onOrgClick) onOrgClick(org);
  };
  const activeOrg = orgs.find(o => o.slug === active);
  const orgIcon = (icon, size = 16, color = "#c42828") => {
    const icons = {
      serpent: /*#__PURE__*/React.createElement("path", {
        d: "M4 12c0-3 2-5 5-5s4 2 4 5-2 4-5 4-5-2-5-5z M12 12c0-4 3-7 8-7",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }),
      tower: /*#__PURE__*/React.createElement("path", {
        d: "M8 2h8v4h2v2h-2v10H8V8H6V6h2V2z M8 22h8",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }),
      compass: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "9",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 5l2 7-2 7-2-7 2-7z",
        fill: color,
        opacity: "0.7"
      })),
      star: /*#__PURE__*/React.createElement("path", {
        d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      }),
      wall: /*#__PURE__*/React.createElement("path", {
        d: "M3 9l9-6 9 6v12H3V9z M9 21V9 M15 21V9 M3 15h18",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5"
      }),
      tree: /*#__PURE__*/React.createElement("path", {
        d: "M12 22V12 M12 2l4 5-3 3 4 4H7l4-4-3-3 4-5z",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }),
      dome: /*#__PURE__*/React.createElement("path", {
        d: "M4 12a8 8 0 0116 0 M3 22h18 M8 22v-4M16 22v-4M12 22V12",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }),
      bridge: /*#__PURE__*/React.createElement("path", {
        d: "M2 18h20 M4 18v-4a4 4 0 018 0v4 M12 18v-4a4 4 0 018 0v4 M8 14V10 M16 14V10",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      })
    };
    return /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24"
    }, icons[icon]);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .orgs-map-container {
          position: relative;
          width: 100%;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
        }
        .orgs-map-svg {
          width: 100%;
          display: block;
        }
        .org-marker {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .org-marker-pulse {
          animation: org-pulse 2s ease-in-out infinite;
        }
        @keyframes org-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.6); }
        }
        .org-marker.active .org-marker-dot {
          r: 6;
        }
        .org-info-card {
          margin-top: 20px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 24px;
        }
        .org-info-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }
        .org-info-badge {
          width: 56px; height: 56px;
          border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .org-info-name {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .org-info-en {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .org-info-detail-row {
          display: flex;
          gap: 20px;
          margin-bottom: 14px;
          font-size: 13px;
        }
        .org-info-detail-label {
          font-family: var(--font-mono);
          color: var(--text-tertiary);
          font-size: 10px;
          letter-spacing: 0.15em;
          min-width: 60px;
        }
        .org-info-detail-value {
          color: var(--text-secondary);
        }
        .org-info-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-top: 10px;
        }
        .org-info-cta {
          margin-top: 18px;
          display: flex;
          justify-content: flex-end;
        }
        .org-info-btn {
          padding: 8px 18px;
          background: transparent;
          border: 1.5px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .org-info-btn:hover {
          background-color: var(--accent-red-bright);
          color: #fff;
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "orgs-map-container"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "orgs-map-svg",
    viewBox: "0 0 100 55",
    preserveAspectRatio: "xMidYMid meet"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: "gridPattern",
    width: "5",
    height: "5",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5 0 L 0 0 0 5",
    fill: "none",
    stroke: "rgba(255,255,255,0.03)",
    strokeWidth: "0.3"
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: "mapGlow",
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(196, 40, 40, 0.08)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "transparent"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "55",
    fill: "url(#gridPattern)"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "55",
    fill: "url(#mapGlow)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 3 L80 3 L83 7 L78 12 L55 13 L32 12 L22 9 Z",
    fill: "rgba(138, 180, 212, 0.12)",
    stroke: "rgba(138, 180, 212, 0.4)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M44 14 L76 12 L88 17 L87 30 L80 38 L66 41 L52 37 L45 29 Z",
    fill: "rgba(196, 40, 40, 0.1)",
    stroke: "rgba(196, 40, 40, 0.45)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 16 L34 14 L38 25 L34 37 L24 41 L10 39 L4 29 Z",
    fill: "rgba(74, 88, 104, 0.18)",
    stroke: "rgba(74, 88, 104, 0.45)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M38 23 L45 22 L47 27 L43 30 L37 28 Z",
    fill: "rgba(196, 154, 44, 0.16)",
    stroke: "rgba(196, 154, 44, 0.5)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 42 L58 41 L63 46 L55 51 L26 52 L13 48 Z",
    fill: "rgba(122, 58, 176, 0.12)",
    stroke: "rgba(122, 58, 176, 0.4)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M68 38 L78 36 L81 41 L75 44 L68 43 Z",
    fill: "rgba(106, 140, 168, 0.16)",
    stroke: "rgba(106, 140, 168, 0.45)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M84 43 L91 42 L92 46 L87 49 L83 47 Z",
    fill: "rgba(106, 140, 168, 0.16)",
    stroke: "rgba(106, 140, 168, 0.45)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M73 47 L79 46 L80 50 L74 51 Z",
    fill: "rgba(106, 140, 168, 0.16)",
    stroke: "rgba(106, 140, 168, 0.45)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "13",
    x2: "100",
    y2: "13",
    stroke: "rgba(196, 40, 40, 0.08)",
    strokeWidth: "0.2",
    strokeDasharray: "0.8 0.8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "27",
    x2: "100",
    y2: "27",
    stroke: "rgba(196, 40, 40, 0.12)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "42",
    x2: "100",
    y2: "42",
    stroke: "rgba(196, 40, 40, 0.08)",
    strokeWidth: "0.2",
    strokeDasharray: "0.8 0.8"
  }), [{
    name: "霜原联盟",
    x: 52,
    y: 7
  }, {
    name: "格伦贝尔联邦",
    x: 66,
    y: 22
  }, {
    name: "洛林自由市",
    x: 42,
    y: 19
  }, {
    name: "维斯特兰联邦",
    x: 19,
    y: 20
  }, {
    name: "瀚海合众国",
    x: 52,
    y: 43
  }, {
    name: "东云群岛",
    x: 76,
    y: 41
  }].map(n => /*#__PURE__*/React.createElement("g", {
    key: n.name
  }, /*#__PURE__*/React.createElement("rect", {
    x: n.x - 8.5,
    y: n.y - 2.2,
    width: 17,
    height: 4.2,
    rx: "0.6",
    fill: "rgba(74, 150, 140, 0.06)",
    stroke: "rgba(74, 150, 140, 0.5)",
    strokeWidth: "0.25",
    strokeDasharray: "0.8 0.8"
  }), /*#__PURE__*/React.createElement("text", {
    x: n.x,
    y: n.y + 1.2,
    textAnchor: "middle",
    fontSize: "2.4",
    fill: "rgba(74, 150, 140, 0.95)",
    fontFamily: "monospace",
    letterSpacing: "0.15"
  }, n.name))), orgs.map(org => {
    const isActive = active === org.slug;
    const isHovered = hovered === org.slug;
    return /*#__PURE__*/React.createElement("g", {
      key: org.slug,
      className: `org-marker ${isActive ? "active" : ""}`,
      onMouseEnter: () => setHovered(org.slug),
      onMouseLeave: () => setHovered(null),
      onClick: () => handleOrgClick(org),
      style: {
        transform: `translate(${org.mapPosition.x}px, ${org.mapPosition.y}px)`
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "0",
      cy: "1.6",
      r: "2.2",
      fill: "none",
      stroke: org.color,
      strokeWidth: "0.4",
      opacity: isActive || isHovered ? 0.8 : 0.4,
      className: isActive ? "org-marker-pulse" : ""
    }), /*#__PURE__*/React.createElement("g", {
      transform: "translate(0, -3)"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "5.2",
      stroke: org.color,
      strokeWidth: "0.4"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "0",
      cy: "5.6",
      r: "0.5",
      fill: org.color
    }), /*#__PURE__*/React.createElement("path", {
      d: "M0 0 L4.6 0.9 L0 2.2 Z",
      fill: org.color,
      opacity: "0.92"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M0 0.2 L3.4 0.85 L0 1.5 Z",
      fill: "#fff",
      opacity: "0.15"
    })), /*#__PURE__*/React.createElement("text", {
      x: "5",
      y: "-2",
      fill: isActive ? org.color : "var(--text-secondary)",
      fontSize: "2.6",
      fontFamily: "monospace",
      style: {
        transition: "all 0.3s ease"
      }
    }, org.abbr), /*#__PURE__*/React.createElement("text", {
      x: "5",
      y: "0.5",
      fontSize: "1.7",
      fill: "var(--text-tertiary)",
      fontFamily: "monospace"
    }, org.hq));
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(92, 6)"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "3.5",
    fill: "none",
    stroke: "rgba(196, 40, 40, 0.3)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 -3 L1 0 L0 3 L-1 0 Z",
    fill: "rgba(196, 40, 40, 0.6)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "-4",
    fill: "rgba(196, 40, 40, 0.7)",
    fontSize: "2",
    textAnchor: "middle",
    fontFamily: "monospace"
  }, "N")))), activeOrg && !compact && /*#__PURE__*/React.createElement("div", {
    className: "org-info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-info-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-info-badge",
    style: {
      borderColor: activeOrg.color,
      color: activeOrg.color
    }
  }, activeOrg.abbr), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "org-info-name"
  }, activeOrg.name), /*#__PURE__*/React.createElement("div", {
    className: "org-info-en"
  }, activeOrg.en))), /*#__PURE__*/React.createElement("div", {
    className: "org-info-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "org-info-detail-label"
  }, "\u603B\u90E8"), /*#__PURE__*/React.createElement("span", {
    className: "org-info-detail-value"
  }, activeOrg.hqDetail || activeOrg.hq, activeOrg.hqEn ? " · " + activeOrg.hqEn : "")), /*#__PURE__*/React.createElement("div", {
    className: "org-info-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "org-info-detail-label"
  }, "\u7BA1\u8F96\u533A\u57DF"), /*#__PURE__*/React.createElement("span", {
    className: "org-info-detail-value"
  }, activeOrg.region)), /*#__PURE__*/React.createElement("div", {
    className: "org-info-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "org-info-detail-label"
  }, "\u6210\u7ACB\u65F6\u95F4"), /*#__PURE__*/React.createElement("span", {
    className: "org-info-detail-value"
  }, activeOrg.founded)), /*#__PURE__*/React.createElement("p", {
    className: "org-info-desc"
  }, activeOrg.desc), /*#__PURE__*/React.createElement("div", {
    className: "org-info-cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "org-info-btn",
    onClick: () => navigate(`/org/${activeOrg.slug}`)
  }, "\u67E5\u770B\u8BE6\u60C5 \u2192"))));
}
window.OrganizationsMap = OrganizationsMap;;
// Organization data
const ORGANIZATIONS = [{
  slug: "ouroboros",
  abbr: "OA",
  name: "衔尾蛇事务所",
  en: "Ouroboros Agency",
  hq: "鸣海城",
  hqEn: "Minghai City",
  founded: "安珀历3年",
  region: "格伦贝尔联邦 · 东部",
  color: "#c42828",
  icon: "serpent",
  desc: "亚洲规模最大、最活跃的异常处理机构。三位创始人均为「大裂隙」时期的幸存者，对异常有着深刻的第一手理解。行事风格灵活务实，不拘泥于流程，注重实战结果。",
  descLong: ["衔尾蛇事务所是安珀历大裂隙后最早成立的专业异常处理组织之一，由三位幸存者共同创立。事务所的名称来源于他们的信念——「异常吞掉的，我们要从异常嘴里拿回来」。", "作为亚洲规模最大、人员最活跃的成员组织，衔尾蛇以其灵活务实的行事风格著称。他们不追求学院派的完美推演，而是强调「进去、活下去、带答案出来」。这种风格也让他们在复杂城市异常和叙事型异常中表现格外出色。", "事务所的成员多来自刑侦系统、痕迹学、行为分析学背景，善于从细微线索中还原规则全貌。他们与鸣海城警方保持着长期合作关系，在城市异常响应速度上位居全球前列。"],
  specialties: ["刑侦协作", "规则快速解析", "城市异常应对", "叙事型异常破解", "幸存者辅导"],
  composition: [{
    label: "警务/刑侦背景",
    percent: 45
  }, {
    label: "军队特种部队",
    percent: 20
  }, {
    label: "社会招募·专业人士",
    percent: 25
  }, {
    label: "幸存者计划",
    percent: 10
  }],
  cases: [{
    title: "鸣海城地铁循环事件",
    year: "安珀历34年",
    desc: "持续72小时的地铁空间循环异常，衔尾蛇派出两支队伍交替进入，成功定位叙事锚点并解决异常，被困147名平民全部安全撤离。"
  }, {
    title: "老城区镜像异常",
    year: "安珀历31年",
    desc: "鸣海城老城区出现镜像空间，衔尾蛇团队通过21天潜入调查，首次完整记录「叙事性规则」的运作机制。"
  }, {
    title: "赤月学院行动",
    year: "安珀历29年至今",
    desc: "衔尾蛇是对赤月学院投入最多资源的组织，已进行十一届进入行动，积累了最完整的观测数据。"
  }],
  walkers: [{
    code: "赤鸦",
    name: "林深",
    rank: "首席溯界者",
    tags: ["刑侦协作", "城市异常", "现场指挥"],
    feat: "十三年现场经验，鸣海城地铁循环事件首席指挥，衔尾蛇事务所生还率最高的现场指挥官。"
  }, {
    code: "影锋",
    name: "顾影",
    rank: "资深溯界者",
    tags: ["痕迹学", "潜行侦察", "规则快速解析"],
    feat: "前刑事技术科探员，异常内规则线索识别率全所第一，常作为先遣队首发成员。"
  }, {
    code: "夜莺",
    name: "苏夜",
    rank: "资深溯界者",
    tags: ["幸存者辅导", "心理评估", "叙事型异常"],
    feat: "大裂隙时期幸存者，专职叙事型异常心理防线建设，带出的新人同化率最低。"
  }],
  contact: {
    phone: "99-01",
    address: "鸣海城中央区第一大道77号"
  },
  mapPosition: {
    x: 80,
    y: 27
  }
}, {
  slug: "northwatch",
  abbr: "NW",
  name: "北境守望",
  en: "Northwatch",
  hq: "白松城",
  hqEn: "Whitepine City",
  founded: "安珀历5年",
  region: "格伦贝尔联邦 · 北部",
  color: "#6a88a8",
  icon: "tower",
  desc: "扎根北部寒带工业城市，擅长极寒环境和长期潜伏型异常。成员以退役极地部队军人和原住民猎手为主，坚韧、沉默、能扛。",
  descLong: ["北境守望的总部白松城位于大陆最北部的寒带工业城市，冬季长达八个月，最低温度可达零下五十度。这里的异常也多发生在极端环境中——冰封的矿洞、永冻层下的地下空间、暴风雪中的废弃村庄。", "北境守望的成员多为退役极地部队军人和原住民猎手，他们对极端环境的适应能力是其他组织无法比拟的。他们的风格是沉默的、坚韧的，不善于表达，但永远可靠。", "在长期潜伏型异常中，北境守望的表现尤为出色。他们可以在没有外部支援的情况下，在异常内部潜伏数周甚至数月，默默记录数据，等待最佳解决时机。"],
  specialties: ["极寒环境作业", "长期潜伏任务", "山地作战", "荒野生存", "冻土带异常"],
  composition: [{
    label: "军队·极地部队",
    percent: 55
  }, {
    label: "原住民猎手/向导",
    percent: 20
  }, {
    label: "科研人员",
    percent: 15
  }, {
    label: "其他",
    percent: 10
  }],
  cases: [{
    title: "冰封哨站异常",
    year: "安珀历23年",
    desc: "废弃的边境军事哨站陷入时间循环，北境守望队员在零下四十度环境中潜伏14天，成功破坏核心锚点。"
  }, {
    title: "冻土矿洞事件",
    year: "安珀历30年",
    desc: "一座废弃金矿深处出现空间扩张异常，北境守望团队深入地下三公里，成功救出被困矿工。"
  }, {
    title: "山区循环路段事件",
    year: "安珀历38年",
    desc: "白松城以南山区公路异常，72小时成功解决，七名被困平民安全撤离，无溯界者伤亡。"
  }],
  walkers: [{
    code: "霜隼",
    name: "伊万·沃尔科夫",
    rank: "资深溯界者",
    tags: ["极寒生存", "山地作战", "长期潜伏"],
    feat: "十五年北境服役，灰松岭山区异常终结者，单人潜伏记录保持者——21天极寒无补给。"
  }, {
    code: "白熊",
    name: "阿纳托利",
    rank: "首席溯界者",
    tags: ["冻土带异常", "团队指挥", "野外急救"],
    feat: "北境守望第三支队队长，完成27次冻土带异常任务，每一次都把全队带了回来。"
  }, {
    code: "雪鸮",
    name: "莉娜",
    rank: "资深溯界者",
    tags: ["追踪", "极地导航", "原住民向导"],
    feat: "原住民猎人出身，对北境山林的了解胜过任何地图，多次在暴风雪中找到被困人员。"
  }],
  contact: {
    phone: "99-02",
    address: "白松城北区守望大街1号"
  },
  mapPosition: {
    x: 60,
    y: 15
  }
}, {
  slug: "bri",
  abbr: "BRI",
  name: "边界研究院",
  en: "Boundary Research Institute",
  hq: "洛林自由市",
  hqEn: "Lorraine Free City",
  founded: "安珀历元年",
  region: "洛林自由市（城邦）",
  color: "#7a8a9c",
  icon: "compass",
  desc: "全球历史最悠久、规模最大的异常研究机构。学院派风格，拥有最完整的异常档案库和最长的14个月训练周期。",
  descLong: ["边界研究院（Boundary Research Institute，简称BRI）是全球历史最悠久的异常研究机构，成立于安珀历元年「大裂隙」事件后不久。其前身是多国联合成立的「异常现象调查委员会」。", "BRI的学术系统化程度全球最高，拥有最完整的异常档案库、最全面的分类体系和最严谨的训练流程——其溯界者培训周期长达14个月，是所有组织中最长的。", "BRI的战术分析组由退役军官和资深溯界者混编，专攻复杂规则型异常的破解。他们的方法论影响了整个行业，IMAC的标准规则解析框架即由BRI主导制定。"],
  specialties: ["复杂规则解析", "异常分类学研究", "档案管理", "溯界者培训", "学术系统化"],
  composition: [{
    label: "学术/科研背景",
    percent: 40
  }, {
    label: "军队系统",
    percent: 25
  }, {
    label: "警务系统",
    percent: 20
  }, {
    label: "工程/技术背景",
    percent: 15
  }],
  cases: [{
    title: "第一例异常记录",
    year: "安珀历元年",
    desc: "BRI的前身首次系统记录并分类了异常现象，奠定了现代异常学的基础。"
  }, {
    title: "洛林图书馆事件",
    year: "安珀历17年",
    desc: "一座无限延伸的图书馆异常，BRI团队用三年时间系统测绘，绘制出首张完整的异常内部地图。"
  }, {
    title: "IMAC标准制定",
    year: "安珀历22年",
    desc: "BRI主导制定了IMAC统一的异常分类与评级标准，沿用至今。"
  }],
  walkers: [{
    code: "译码者",
    name: "陈砚博士",
    rank: "首席溯界者",
    tags: ["复杂规则解析", "异常分类学", "战术分析"],
    feat: "BRI战术分析组组长，成功解析17例复杂规则型异常，IMAC标准规则解析框架的主要制定者。"
  }, {
    code: "书卷",
    name: "艾洛蒂·莫罗",
    rank: "资深溯界者",
    tags: ["档案管理", "异常史学", "长期研究"],
    feat: "BRI档案库主任，对全球2万余例异常档案了如指掌，被称为「行走的异常百科」。"
  }, {
    code: "校徽",
    name: "马丁·韦伯",
    rank: "资深溯界者",
    tags: ["培训体系", "新人教官", "安全规程"],
    feat: "BRI训练基地总教官，14个月完整培训周期的设计者，所教学员存活率比行业平均高28%。"
  }],
  contact: {
    phone: "99-03",
    address: "洛林自由市研究院大道"
  },
  mapPosition: {
    x: 42,
    y: 25
  }
}, {
  slug: "morningstar",
  abbr: "MC",
  name: "晨星团",
  en: "Morningstar Covenant",
  hq: "新阿尔比恩市",
  hqEn: "New Albion City",
  founded: "安珀历6年",
  region: "维斯特兰联邦 · 中部",
  color: "#c49a2c",
  icon: "star",
  desc: "理性务实，数据驱动。科学家比例最高的组织，以物理学、建筑学、系统工程背景见长。",
  descLong: ["晨星团的总部位于大陆西部的新阿尔比恩市，是西部地区最大的异常处理组织。「晨星」之名寓意「在黑暗中带来光」，体现了他们以科学之光照亮异常迷雾的信念。", "晨星团是所有成员组织中科学家比例最高的一个。其成员多具物理学、建筑学、系统工程背景，擅长用理工科思维分析异常现象，建立数学模型，量化风险。", "他们的行事风格极其理性务实，数据驱动，一切决策基于可观测、可测量的事实。这种风格让他们在结构型、空间型异常中表现卓越。晨星团与第四面墙共享总部大楼，两组织在信息管控领域密切合作。"],
  specialties: ["数据驱动分析", "空间几何异常", "物理规则建模", "系统工程方法", "量化风险评估"],
  composition: [{
    label: "物理/数学/工程背景",
    percent: 45
  }, {
    label: "军队·技术兵种",
    percent: 20
  }, {
    label: "建筑/结构工程",
    percent: 15
  }, {
    label: "其他",
    percent: 20
  }],
  cases: [{
    title: "镜像医院事件",
    year: "安珀历29年",
    desc: "一座完全对称的镜像医院异常，晨星团用几何拓扑分析精准定位空间折点。"
  }, {
    title: "引力井异常",
    year: "安珀历33年",
    desc: "内陆荒漠中的重力异常区域，晨星团首次用物理数学模型完整预测异常边界扩张速度。"
  }, {
    title: "电梯井深渊",
    year: "安珀历36年",
    desc: "办公楼内的无限下坠电梯井，晨星团通过3D建模找到返回路径。"
  }],
  walkers: [{
    code: "奇点",
    name: "Dr. Wei / 魏知远",
    rank: "首席溯界者",
    tags: ["空间几何", "物理建模", "数学预测"],
    feat: "理论物理学博士，以数学模型精准预测异常扩张边界，误差范围已缩小至5%以内。"
  }, {
    code: "棱锥",
    name: "艾琳·福斯特",
    rank: "资深溯界者",
    tags: ["结构工程", "建筑异常", "测绘"],
    feat: "结构工程师出身，对建筑类异常的空间结构有直觉般的洞察力，绘制了多份高精度内部地图。"
  }, {
    code: "频率",
    name: "马库斯·陈",
    rank: "资深溯界者",
    tags: ["数据采集", "仪器操作", "量化分析"],
    feat: "随身携带20余种测量仪器，坚持「一切异常均可量化」，是晨星团数据最详实的现场分析员。"
  }],
  contact: {
    phone: "99-04",
    address: "新阿尔比恩市科研区晨星大厦"
  },
  mapPosition: {
    x: 18,
    y: 26
  }
}, {
  slug: "fourth-wall",
  abbr: "4W",
  name: "第四面墙",
  en: "Fourth Wall",
  hq: "新阿尔比恩市",
  hqEn: "New Albion City",
  founded: "安珀历9年",
  region: "维斯特兰联邦 · 中部",
  color: "#8a7a9a",
  icon: "wall",
  desc: "专门关注异常与公众信息界面的组织。军事情报和网络安全背景，擅长信息战与舆论控制。",
  descLong: ["第四面墙是一个特殊的成员组织——他们不直接进入异常，而是管理异常与公众之间的信息边界。「第四面墙」的名称来源于戏剧术语，意为观众与舞台之间那道看不见的墙。", "第四面墙的成员多具军事情报和网络安全背景，他们是信息战和舆论控制的专家。与各国媒体和社交平台有着长期深度合作，确保异常信息的披露在可控范围内。", "第四面墙与晨星团共享总部大楼，两组织分别负责「硬实力」和「软实力」的层面，形成互补。IMAC的信息协调办公室有大量人员来自第四面墙。"],
  specialties: ["信息管控", "舆论引导", "媒体关系", "网络安全", "公众沟通策略"],
  composition: [{
    label: "军事情报背景",
    percent: 35
  }, {
    label: "传媒/公关",
    percent: 25
  }, {
    label: "网络安全",
    percent: 20
  }, {
    label: "心理学",
    percent: 20
  }],
  cases: [{
    title: "职业化叙事体系",
    year: "安珀历18年",
    desc: "第四面墙提出并主导建立了「职业化叙事」的公众沟通框架，成为全球标准。"
  }, {
    title: "「大恐慌」舆论战",
    year: "安珀历25年",
    desc: "某次大规模异常引发的全国性恐慌事件中，第四面墙用六周时间稳定舆论态势，避免了次生灾害。"
  }, {
    title: "媒体认证体系",
    year: "安珀历27年",
    desc: "第四面墙主导建立了注册媒体人员认证体系和三层审定机制。"
  }],
  walkers: [{
    code: "幕布",
    name: "K / 未知",
    rank: "资深溯界者",
    tags: ["信息管控", "舆论引导", "情报分析"],
    feat: "前军事情报官，姓名与面貌均为机密。负责异常事件的信息管控与舆论引导，从未失手。"
  }, {
    code: "回声",
    name: "薇薇安·罗斯",
    rank: "资深溯界者",
    tags: ["媒体关系", "公众沟通", "危机公关"],
    feat: "前资深调查记者，转职后主导建立「职业化叙事」公众沟通框架，现在是第四面墙对外发言人。"
  }, {
    code: "幽影",
    name: "代号「幽影」",
    rank: "首席溯界者",
    tags: ["反情报", "网络安全", "深度潜伏"],
    feat: "第四面墙主管，背景完全保密。据说从不在公开场合露面，只通过加密渠道下达指令。"
  }],
  contact: {
    phone: "99-05",
    address: "新阿尔比恩市科研区晨星大厦西楼"
  },
  mapPosition: {
    x: 13,
    y: 33
  }
}, {
  slug: "platanus",
  abbr: "PS",
  name: "悬铃木学会",
  en: "Platanus Society",
  hq: "诺瓦城",
  hqEn: "Nova City",
  founded: "安珀历7年",
  region: "瀚海合众国 · 南部",
  color: "#7a3ab0",
  icon: "tree",
  desc: "最神秘的成员组织。核心理念是「异常是意识的产物」，角色扮演类异常表现突出。",
  descLong: ["悬铃木学会是八大认证组织中最神秘的一个。他们的核心理念是「异常是意识的产物」——认为异常的根源在于人类集体无意识中的「未完成叙事」。", "学会的总部位于南部港市诺瓦城，一座被悬铃木覆盖的老庄园。成员多具人类学、神话学、心理学背景，他们对异常的理解方式与其他组织截然不同——他们不把异常当作物理空间，而是当作「一个正在讲述的故事」。", "在角色扮演类和叙事型异常中，悬铃木学会的表现远超其他组织。他们的溯界者能以惊人的深度「入戏」，同时又能保持自我意识不被同化——这是一种独特的天赋。"],
  specialties: ["叙事型异常", "角色扮演深度潜入", "意识学派研究", "神话学分析", "心理学评估"],
  composition: [{
    label: "人类学/神话学",
    percent: 30
  }, {
    label: "心理学/精神病学",
    percent: 25
  }, {
    label: "文学/戏剧",
    percent: 20
  }, {
    label: "幸存者计划",
    percent: 15
  }, {
    label: "其他",
    percent: 10
  }],
  cases: [{
    title: "回音巷事件",
    year: "安珀历15年",
    desc: "一条不断重复对话的小巷，悬铃木学会通过「以叙事破叙事」的方法首次解决纯意识型异常。"
  }, {
    title: "面具舞会事件",
    year: "安珀历26年",
    desc: "一场永远不会结束的假面舞会异常，悬铃木学会成员深入扮演角色11天，找到破局点。"
  }, {
    title: "「第七个角色」假说",
    year: "安珀历32年",
    desc: "悬铃木学会提出的「异常叙事角色模型」对叙事型异常研究产生深远影响。"
  }],
  walkers: [{
    code: "解梦人",
    name: "苏明",
    rank: "首席溯界者",
    tags: ["叙事型异常", "深度角色扮演", "心理学"],
    feat: "心理学博士，角色扮演型异常生还率最高记录保持者——能入戏到90%深度同时保持自我意识。"
  }, {
    code: "提线人",
    name: "乔伊·卡拉",
    rank: "资深溯界者",
    tags: ["神话学", "人类学", "仪式型异常"],
    feat: "人类学教授，对各类异常中的「仪式元素」有独到研究，能从古怪行为中读出规则逻辑。"
  }, {
    code: "镜中人",
    name: "林鸢",
    rank: "资深溯界者",
    tags: ["意识学派", "同化抗性", "冥想训练"],
    feat: "同化抗性最强的溯界者之一，曾在叙事型异常中连续扮演角色11天不迷失。"
  }],
  contact: {
    phone: "99-06",
    address: "诺瓦城旧城区悬铃木庄园"
  },
  mapPosition: {
    x: 30,
    y: 46
  }
}, {
  slug: "white-night",
  abbr: "WNP",
  name: "白夜哨站",
  en: "White Night Post",
  hq: "极光城",
  hqEn: "Aurora City",
  founded: "安珀历8年",
  region: "霜原联盟 · 北部",
  color: "#8ab4d4",
  icon: "dome",
  desc: "驻扎在全球最北端的组织。擅长极寒环境和超大空间异常，与多国极地科考队合作。",
  descLong: ["白夜哨站是全球最北端的常驻异常处理组织，总部设在北极圈内的极光城——一座因异常研究而兴起的极地城市。这里的一年中有一半时间是极昼，一半时间是极夜。", "白夜哨站的成员多为极地部队退役人员和原住民猎人，他们对极端寒冷的适应能力无与伦比。白夜哨站最擅长的领域是极寒异常和超大空间异常——北极圈内的异常往往规模巨大、边界模糊。", "白夜哨站与多国极地科考队保持着密切合作，在偏远地区的异常发现和响应上发挥着不可替代的作用。他们的补给线长达数千公里，一切都依赖周密的计划和充足的准备。"],
  specialties: ["极地驻扎", "超大空间异常", "极寒适应", "跨冰面运输", "科考协作"],
  composition: [{
    label: "极地部队退役",
    percent: 45
  }, {
    label: "原住民猎人/向导",
    percent: 25
  }, {
    label: "极地科研人员",
    percent: 20
  }, {
    label: "其他",
    percent: 10
  }],
  cases: [{
    title: "极光洞穴异常",
    year: "安珀历12年",
    desc: "北极冰层下的巨型洞穴系统异常，白夜哨站用整整两年时间探索，确认其为深渊级。"
  }, {
    title: "冰裂谷事件",
    year: "安珀历28年",
    desc: "冰层断裂形成的异常深渊，白夜哨站成员在零下六十度环境中完成锚点破坏。"
  }, {
    title: "「永夜」科考站救援",
    year: "安珀历35年",
    desc: "一座极地科考站被卷入空间异常，白夜哨站在极夜中徒步60公里完成救援。"
  }],
  walkers: [{
    code: "极昼",
    name: "阿雷克",
    rank: "界标",
    tags: ["极地生存", "超大空间异常", "冰原导航"],
    feat: "全球仅存不足三十名界标之一，北极冰原异常唯一多次生还者，累计在异常内生存时间超过400天。"
  }, {
    code: "冰刃",
    name: "西格丽德",
    rank: "首席溯界者",
    tags: ["极寒装备", "跨冰面运输", "补给线管理"],
    feat: "白夜哨站后勤主管，设计了整套极地异常作业装备体系，曾带队穿越300公里冰原完成补给。"
  }, {
    code: "星图",
    name: "纳努克",
    rank: "资深溯界者",
    tags: ["原住民向导", "天象导航", "野外狩猎"],
    feat: "因纽特猎人出身，仅凭星星和风向就能在茫茫冰原中找到方向，被称为「活的罗盘」。"
  }],
  contact: {
    phone: "99-07",
    address: "极光城一号哨站"
  },
  mapPosition: {
    x: 62,
    y: 6
  }
}, {
  slug: "long-bridge",
  abbr: "LBC",
  name: "长桥会社",
  en: "Long Bridge Company",
  hq: "无固定总部",
  hqDetail: "无固定总部（目前暂驻东云群岛）",
  hqEn: "",
  founded: "安珀历11年",
  region: "全球机动部署",
  color: "#d46828",
  icon: "bridge",
  desc: "唯一无国土的成员组织。移动式指挥系统，72小时内部署到全球任何异常高发区。",
  descLong: ["长桥会社是八大认证组织中最特殊的一个——它没有固定的总部，也没有自己的「国土」。它是一支纯粹的快速反应力量，随时待命，随时出发。", "长桥会社的指挥中心由三辆经过特殊改造的重型运输车组成——指挥车、通讯车、后勤车。这三辆车可以在任何地点快速搭建起一个功能完整的前线指挥部。会社的名称「长桥」寓意是「在正常与异常之间架起桥梁」。", "会社的成员来自各国军警精英轮调，每个人都是各自领域的顶尖好手。他们专门处理跨区域大型异常和多异常联动事件——这些事件往往需要多国协作、多种专业技能配合。72小时内部署到全球任何异常高发区，是长桥会社对IMAC的承诺。"],
  specialties: ["快速部署", "移动指挥", "跨国联合行动", "多异常联动", "重装备运输"],
  composition: [{
    label: "多国军警轮调",
    percent: 60
  }, {
    label: "工程/后勤专家",
    percent: 20
  }, {
    label: "翻译/联络员",
    percent: 10
  }, {
    label: "其他",
    percent: 10
  }],
  cases: [{
    title: "雾中列车事件",
    year: "安珀历24年",
    desc: "跨国运行的列车异常，长桥会社在两国边境同时设点，首次实现跨国家联合行动。"
  }, {
    title: "「联动风暴」行动",
    year: "安珀历31年",
    desc: "同一时间六个城市出现关联异常，长桥会社协调四支队伍同步进入，成功切断联动。"
  }, {
    title: "沙漠油井救援",
    year: "安珀历37年",
    desc: "偏远沙漠地区的油井异常，长桥会社48小时内完成部署并解决。"
  }],
  walkers: [{
    code: "桥柱",
    name: "指挥官Z",
    rank: "界标",
    tags: ["联合行动指挥", "多国协调", "快速部署"],
    feat: "双城事件现场总指挥，统领来自四个国家的六支队伍协同作战，是IMAC最受信赖的联合行动指挥官。"
  }, {
    code: "铁辙",
    name: "马库斯·雷恩",
    rank: "首席溯界者",
    tags: ["机动指挥", "重装备运输", "工程保障"],
    feat: "长桥会社移动指挥系统总工程师，三车指挥所的设计者，能在2小时内在任何地形搭建完整前线指挥部。"
  }, {
    code: "翻译官",
    name: "莉娅·哈桑",
    rank: "资深溯界者",
    tags: ["多语种沟通", "联络协调", "文化适配"],
    feat: "精通7种语言、熟悉十几种文化背景，跨国行动中负责与当地各方的沟通协调，人称「行走的外交」。"
  }],
  contact: {
    phone: "99-00",
    address: "移动指挥系统·全球部署"
  },
  mapPosition: {
    x: 85,
    y: 47
  },
  mobile: true
}];
window.ORGANIZATIONS = ORGANIZATIONS;;
// Red Moon Academy SVG floor plan - pentagram layout
function AcademyMap() {
  const [selectedBuilding, setSelectedBuilding] = React.useState(null);
  const {
    canAccess
  } = useAuth();

  // Center of the map
  const CX = 360;
  const CY = 280;
  const R = 200; // radius to dorm points

  // Five dorm positions (pentagram points)
  // Starting with Yuehua at upper-left, going clockwise
  const dormPositions = [{
    id: "yuehua",
    name: "月华阁",
    en: "Moonlight Pavilion",
    angle: 162,
    status: "explored"
  }, {
    id: "tingxue",
    name: "听雪楼",
    en: "Snow Listener Tower",
    angle: 342,
    status: "explored"
  }, {
    id: "qingteng",
    name: "青藤苑",
    en: "Ivy Court",
    angle: 270,
    status: "partial"
  }, {
    id: "wangshan",
    name: "望山居",
    en: "Mountain View Residence",
    angle: 198,
    status: "unexplored"
  }, {
    id: "guanxing",
    name: "观星台",
    en: "Stargazer Platform",
    angle: 90,
    status: "partial"
  }];

  // Calculate position on pentagram
  const getPoint = (angleDeg, radius) => {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return {
      x: CX + radius * Math.cos(rad),
      y: CY + radius * Math.sin(rad)
    };
  };

  // Public buildings positioned at the edges between points
  const publicBuildings = [{
    id: "main-building",
    name: "主教学楼",
    en: "Main Academic Building",
    angle: 300,
    dist: R * 0.75,
    status: "explored",
    type: "public",
    desc: "哥特式砖石结构，四层。正门朝南，两侧有对称的阶梯。走廊两侧教室门牌号连续，但存在跳号现象——部分房间号在门牌序列中凭空消失，对应的房间也不存在。",
    rules: "宵禁期间教学楼内所有灯光自动熄灭，滞留者触发惩罚。三楼西侧阶梯教室内有「剧情书残页」不定期出现。",
    record: "第七届生还者曾在三楼阶梯教室发现剧情书残页·第三幕。第九届在四楼东侧发现隐藏楼梯入口，但进入者均未返回。",
    danger: "危险级",
    floors: "4 层"
  }, {
    id: "library",
    name: "图书馆",
    en: "Academy Library",
    angle: 330,
    dist: R * 0.65,
    status: "explored",
    type: "public",
    desc: "两层图书馆建筑，藏有大量书籍。书的内容不断变化——同一本书每次翻开都可能是不同的故事。书架排列会在无人注视时缓慢移动。",
    rules: "不得阅读超过30分钟，否则会被「故事」吸进去。书架上的书不可以带出图书馆。三楼禁区由锁链封死。",
    record: "第二届生还者曾在图书馆找到记载整个赤月学院「剧情」的书籍，但离开图书馆后书变成了空白。",
    danger: "危险级",
    floors: "2 层"
  }, {
    id: "concert-hall",
    name: "音乐厅",
    en: "Concert Hall",
    angle: 15,
    dist: R * 0.7,
    status: "partial",
    type: "public",
    desc: "有大型管风琴的音乐厅。午夜时分会自动响起音乐，演奏者不可见。音乐的曲目每一届都不同，但都有相似的主旋律。",
    rules: "音乐响起时必须保持安静，不得发出任何声响。掌声会让演奏者「谢幕」——然后就会看到演奏者是谁。",
    record: "第九届在音乐厅听到完整的「赤月交响曲」第一乐章，记录者出现轻度同化症状。",
    danger: "厄运级",
    floors: "2 层"
  }, {
    id: "art-gallery",
    name: "美术馆",
    en: "Art Gallery",
    angle: 350,
    dist: R * 0.8,
    status: "explored",
    type: "public",
    desc: "两层美术馆。墙上挂有大量油画，画的内容都是学院内的场景，但画中的人物永远背对着观看者。",
    rules: "不得长时间注视同一幅画。画中人物会「转过来」——看到正脸的人会被拖进画里。",
    record: "第四届一名成员在美术馆失踪，三日后有人在一幅新出现的油画中看到了他的背影。",
    danger: "厄运级",
    floors: "2 层"
  }, {
    id: "botanical",
    name: "植物园（温室）",
    en: "Botanical Garden",
    angle: 145,
    dist: R * 0.75,
    status: "partial",
    type: "public",
    desc: "温室植物园，内部种植有大量异常植物。植物的种类在外部世界均无记录。植物园的湿度永远保持在90%以上。",
    rules: "不得触碰任何植物。不得闻花香。不得采摘任何叶片或花朵。",
    record: "第五届在植物园发现「白玫瑰」的野外种群——与中心花园的白玫瑰为同一物种，但体型更大。",
    danger: "厄运级",
    floors: "1 层"
  }, {
    id: "gym",
    name: "体育馆",
    en: "Gymnasium",
    angle: 55,
    dist: R * 0.8,
    status: "explored",
    type: "public",
    desc: "标准体育馆，室内篮球场。地板上的篮球会自己弹跳。篮球架上的篮网永远在飘动——即使没有风。",
    rules: "如果篮球向你滚过来，必须接住并投一次篮。投进则安全；投不进……就会加入「他们」。",
    record: "第七届一名溯界者连续投中17次篮，打破已知纪录。他的手臂在第18次时……（机密级以上可见）",
    danger: "危险级",
    floors: "1 层"
  }, {
    id: "lab",
    name: "实验楼",
    en: "Laboratory Building",
    angle: 225,
    dist: R * 0.9,
    status: "partial",
    type: "public",
    desc: "三层实验楼，混凝土结构，与学院整体哥特风格迥异。化学、生物、物理实验室各占一层。实验器材齐全，但所有试剂瓶上的标签都是手写的，且内容难以辨认。",
    rules: "不得混合任何两种以上的试剂。不得饮用任何液体。实验楼的地下室禁止进入——门从内侧锁死。",
    record: "第三届曾在化学实验室发现一份手写实验记录，提到「白玫瑰提取物对同化有短暂抑制作用」。（绝密级可见完整内容）",
    danger: "厄运级",
    floors: "3 层"
  }, {
    id: "garden",
    name: "白玫瑰花园",
    en: "White Rose Garden",
    angle: 0,
    dist: 0,
    status: "core",
    type: "core",
    desc: "学院中心的圆形花园，种植满了白色的玫瑰。花园中央有一座喷泉，但喷泉从不喷水——喷口处长着一朵最大的白玫瑰。",
    rules: "白玫瑰不可采摘。花园内禁止大声说话。喷泉是「核心」的位置——但无人能接近喷泉五米以内。",
    record: "所有前10届进入者都确认了白玫瑰花园的「叙事锚点」性质，但至今无人能破坏核心。越接近喷泉，同化速度越快。",
    danger: "深渊级",
    floors: "核心区域"
  }];

  // Dorm detail data
  const dormDetails = {
    yuehua: {
      name: "月华阁",
      en: "Moonlight Pavilion",
      type: "学生宿舍区",
      structure: "三间独立套房",
      adjacent: "植物园（温室）、实验楼",
      status: "explored",
      rules: "熄灯后禁止开门查看走廊。听到敲门声若不回应，三次后自动停止；若回应，则门外的东西会「进来」。",
      rumor: "据第七届生还者描述，宵禁后宿舍走廊脚步声从不停歇，但从未有人看到是谁在走。",
      record: "第五届进入者曾在3号套房完整居住45天，是宿舍区生存最长记录。该生还者最终因违反「照镜子」规则被同化。",
      danger: "危险级"
    },
    tingxue: {
      name: "听雪楼",
      en: "Snow Listener Tower",
      type: "学生宿舍区",
      structure: "三间独立套房",
      adjacent: "音乐厅、美术馆",
      status: "explored",
      rules: "楼内永远是冬天，窗户上结着冰花。不得擦拭任何窗户上的冰花，否则窗外的「东西」会注意到你。",
      rumor: "传说下雪天午夜，能从屋顶听到有人在唱一首古老的歌谣——但没人能记清歌词。",
      record: "第三届进入者曾通过听雪楼地下通道抵达青藤苑，但该通道在第五届时已不复存在。",
      danger: "危险级"
    },
    qingteng: {
      name: "青藤苑",
      en: "Ivy Court",
      type: "学生宿舍区",
      structure: "三间独立套房",
      adjacent: "主教学楼、图书馆",
      status: "partial",
      rules: "藤蔓不可触碰。触碰藤蔓的人会在七天内被「同化」——皮肤逐渐植物化，最终变成新的藤蔓。",
      rumor: "有传闻称藤蔓会记住触碰过它的人的样貌，然后在深夜里「变成」那个人的样子。",
      record: "第八届曾有一名溯界者触碰藤蔓后生存23天，是目前已知最长的藤蔓同化耐受记录。",
      danger: "厄运级"
    },
    guanxing: {
      name: "观星台",
      en: "Stargazer Platform",
      type: "学生宿舍区",
      structure: "三间独立套房",
      adjacent: "体育馆",
      status: "partial",
      rules: "夜间不得在屋顶停留超过一小时，否则会被「天上的东西」发现。不得用望远镜对准月亮。",
      rumor: "据说每一届都有人声称在夜空中看到了「第十一颗星」——但天空中只有十颗。",
      record: "第六届有两人在观星台屋顶失踪，仅留下两台摔碎的望远镜。镜片上留有不明液体。",
      danger: "厄运级"
    },
    wangshan: {
      name: "望山居",
      en: "Mountain View Residence",
      type: "学生宿舍区",
      structure: "三间独立套房（推测）",
      adjacent: "外围围墙、实验楼",
      status: "unexplored",
      rules: "未知。仅知道门口有「请勿入内」的标牌——标牌是外部世界的制式，而非异常内部生成。",
      rumor: "望山居是五栋宿舍中唯一从外面能看到山景的，但「山」实际上并不存在于地图上。",
      record: "第十届派出的三人小队在门口全部失联，生命体征信号在跨越门槛的瞬间同时消失。第十一届暂未对该区域发起探索。",
      danger: "深渊级"
    }
  };
  const getStatusColor = status => {
    switch (status) {
      case "explored":
        return "#4a7c59";
      case "partial":
        return "#c49a2c";
      case "unexplored":
        return "#c42828";
      case "core":
        return "#7a3ab0";
      default:
        return "#888";
    }
  };
  const getStatusLabel = status => {
    switch (status) {
      case "explored":
        return "已探索";
      case "partial":
        return "部分探索";
      case "unexplored":
        return "未探索";
      case "core":
        return "核心区域";
      default:
        return "未知";
    }
  };

  // Generate pentagram lines
  const pentPoints = dormPositions.map(d => getPoint(d.angle, R));
  // Pentagram: connect 0->2->4->1->3->0
  const pentLineOrder = [0, 2, 4, 1, 3, 0];
  const pentagramPath = pentLineOrder.map((idx, i) => `${i === 0 ? "M" : "L"} ${pentPoints[idx].x} ${pentPoints[idx].y}`).join(" ");

  // Inner pentagon (the star's inner shape)
  const innerR = R * Math.sin(18 * Math.PI / 180) / Math.sin(126 * Math.PI / 180); // ~0.382 R
  const innerPentPoints = dormPositions.map((d, i) => {
    // Inner pentagon vertices are at midpoints between adjacent intersection points
    const nextIdx = (i + 1) % 5;
    const prevIdx = (i + 4) % 5;
    // Approximate: use angle midpoint and smaller radius
    const midAngle = (d.angle + dormPositions[nextIdx].angle) / 2;
    const adjusted = midAngle > 360 ? midAngle - 360 : midAngle;
    return getPoint(adjusted, innerR);
  });
  const handleClick = id => {
    setSelectedBuilding(selectedBuilding === id ? null : id);
  };
  const selectedDorm = selectedBuilding && dormDetails[selectedBuilding];
  const selectedPublic = selectedBuilding && publicBuildings.find(b => b.id === selectedBuilding);
  const selected = selectedDorm ? {
    ...selectedDorm,
    isDorm: true
  } : selectedPublic ? {
    ...selectedPublic,
    isDorm: false
  } : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .academy-map-container {
          background-color: #0a0a0e;
          border: 1px solid var(--border-color);
          position: relative;
          overflow: hidden;
        }
        .academy-map-svg {
          width: 100%;
          display: block;
        }
        .pentagram-line {
          stroke: rgba(196, 40, 40, 0.25);
          stroke-width: 1.5;
          fill: none;
          stroke-dasharray: 4 3;
        }
        .pentagon-line {
          stroke: rgba(196, 40, 40, 0.15);
          stroke-width: 1;
          fill: rgba(139, 26, 26, 0.03);
        }
        .outer-wall {
          stroke: rgba(196, 40, 40, 0.3);
          stroke-width: 2;
          fill: none;
          stroke-dasharray: 8 4;
        }
        .dorm-pentagon {
          cursor: pointer;
          transition: all 0.3s ease;
          stroke-width: 2;
        }
        .dorm-pentagon:hover { filter: brightness(1.3); stroke-width: 3; }
        .dorm-pentagon.selected { filter: brightness(1.4); stroke-width: 3; }
        .dorm-label {
          fill: var(--text-primary);
          font-size: 12px;
          font-family: "Songti SC", "Source Han Serif", serif;
          font-weight: 600;
          text-anchor: middle;
          pointer-events: none;
        }
        .dorm-label-en {
          fill: var(--text-tertiary);
          font-size: 8px;
          font-family: var(--font-mono);
          text-anchor: middle;
          pointer-events: none;
          letter-spacing: 0.1em;
        }
        .public-rect {
          cursor: pointer;
          transition: all 0.3s ease;
          stroke-width: 1.5;
        }
        .public-rect:hover { filter: brightness(1.3); stroke-width: 2; }
        .public-rect.selected { filter: brightness(1.4); stroke-width: 2.5; }
        .public-label {
          fill: var(--text-secondary);
          font-size: 9px;
          font-family: var(--font-mono);
          text-anchor: middle;
          pointer-events: none;
          letter-spacing: 0.05em;
        }
        .core-circle {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .core-circle:hover { filter: brightness(1.3); }
        .core-circle.selected { filter: brightness(1.5); }
        .rose-icon {
          pointer-events: none;
        }
        .map-legend {
          display: flex;
          gap: 20px;
          padding: 14px 20px;
          border-top: 1px solid var(--border-color);
          background-color: rgba(18, 18, 22, 0.6);
          flex-wrap: wrap;
        }
        .map-legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .map-legend-dot {
          width: 14px; height: 14px;
          border: 1.5px solid;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .building-detail-panel {
          margin-top: 20px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          overflow: hidden;
        }
        .building-detail-head {
          padding: 20px 24px;
          background: linear-gradient(90deg, rgba(196, 40, 40, 0.1), transparent);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .building-detail-title-group h3 {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .building-detail-title-group .en {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .building-detail-meta {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }
        .building-detail-badge {
          padding: 4px 10px;
          border: 1px solid;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
        }
        .building-detail-body {
          padding: 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .building-detail-section h4 {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 10px;
        }
        .building-detail-section p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
        }
        .building-detail-section.full { grid-column: 1 / -1; }
        .compass {
          position: absolute;
          top: 20px;
          right: 20px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-align: center;
        }
        .compass-n { color: var(--accent-red-bright); font-size: 11px; font-weight: 700; }
        .scale-bar {
          position: absolute;
          bottom: 20px;
          left: 20px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
        }
        .scale-bar-line {
          width: 80px;
          height: 2px;
          background-color: var(--text-tertiary);
          margin-bottom: 4px;
        }
        .red-moon {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #c42828, #5a0f0f);
          box-shadow: 0 0 20px rgba(196, 40, 40, 0.5);
        }
        @media (max-width: 768px) {
          .building-detail-body { grid-template-columns: 1fr; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "academy-map-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "red-moon"
  }), /*#__PURE__*/React.createElement("div", {
    className: "compass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "compass-n"
  }, "N"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "10px"
    }
  }, "\u25B2")), /*#__PURE__*/React.createElement("div", {
    className: "scale-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scale-bar-line"
  }), "100 M"), /*#__PURE__*/React.createElement("svg", {
    className: "academy-map-svg",
    viewBox: "0 0 720 560",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: CX,
    cy: CY,
    r: R + 60,
    className: "outer-wall"
  }), /*#__PURE__*/React.createElement("path", {
    d: pentagramPath,
    className: "pentagram-line"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: innerPentPoints.map(p => `${p.x},${p.y}`).join(" "),
    className: "pentagon-line"
  }), publicBuildings.map(b => {
    const pos = getPoint(b.angle, b.dist);
    const w = b.id === "garden" ? 80 : b.type === "core" ? 80 : 60;
    const h = b.id === "garden" ? 80 : b.type === "core" ? 80 : 38;
    const isSelected = selectedBuilding === b.id;
    if (b.id === "garden") {
      // Core garden - circular with rose icon
      return /*#__PURE__*/React.createElement("g", {
        key: b.id,
        onClick: () => handleClick(b.id),
        style: {
          cursor: "pointer"
        }
      }, /*#__PURE__*/React.createElement("circle", {
        cx: pos.x,
        cy: pos.y,
        r: 42,
        fill: "rgba(122, 58, 176, 0.15)",
        stroke: "#7a3ab0",
        strokeWidth: "2",
        className: `core-circle ${isSelected ? "selected" : ""}`
      }), /*#__PURE__*/React.createElement("circle", {
        cx: pos.x,
        cy: pos.y,
        r: 30,
        fill: "rgba(122, 58, 176, 0.1)",
        stroke: "#7a3ab0",
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: pos.x,
        cy: pos.y,
        r: 18,
        fill: "rgba(122, 58, 176, 0.08)",
        stroke: "#7a3ab0",
        strokeWidth: "0.5"
      }), /*#__PURE__*/React.createElement("g", {
        className: "rose-icon",
        transform: `translate(${pos.x - 8}, ${pos.y - 10})`
      }, /*#__PURE__*/React.createElement("path", {
        d: "M8 0 C12 4 14 8 10 14 C6 10 4 6 8 0Z",
        fill: "#7a3ab0",
        opacity: "0.7"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M8 0 C4 4 2 8 6 14 C10 10 12 6 8 0Z",
        fill: "#b88ed9",
        opacity: "0.5"
      })), /*#__PURE__*/React.createElement("text", {
        x: pos.x,
        y: pos.y + 56,
        className: "dorm-label",
        style: {
          fill: "#b88ed9",
          fontSize: "11px"
        }
      }, b.name));
    }
    return /*#__PURE__*/React.createElement("g", {
      key: b.id,
      onClick: () => handleClick(b.id),
      style: {
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: pos.x - w / 2,
      y: pos.y - h / 2,
      width: w,
      height: h,
      fill: `${getStatusColor(b.status)}22`,
      stroke: getStatusColor(b.status),
      className: `public-rect ${isSelected ? "selected" : ""}`
    }), /*#__PURE__*/React.createElement("text", {
      x: pos.x,
      y: pos.y + 4,
      className: "public-label"
    }, b.name));
  }), dormPositions.map(d => {
    const pos = getPoint(d.angle, R);
    const color = getStatusColor(d.status);
    const isSelected = selectedBuilding === d.id;

    // Draw pentagon pointing outward from center
    const size = 28;
    const pentPoints5 = [];
    for (let i = 0; i < 5; i++) {
      const angle = (d.angle + i * 72) * Math.PI / 180;
      pentPoints5.push({
        x: pos.x + size * Math.cos(angle),
        y: pos.y + size * Math.sin(angle)
      });
    }
    const pentagonPointsStr = pentPoints5.map(p => `${p.x},${p.y}`).join(" ");

    // Position labels outside the dorm
    const labelOffset = size + 14;
    const labelAngle = d.angle * Math.PI / 180;
    const labelX = pos.x + labelOffset * Math.cos(labelAngle);
    const labelY = pos.y + labelOffset * Math.sin(labelAngle);
    return /*#__PURE__*/React.createElement("g", {
      key: d.id,
      onClick: () => handleClick(d.id),
      style: {
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("polygon", {
      points: pentagonPointsStr,
      fill: `${color}33`,
      stroke: color,
      strokeWidth: "2",
      className: `dorm-pentagon ${isSelected ? "selected" : ""}`
    }), /*#__PURE__*/React.createElement("text", {
      x: pos.x,
      y: pos.y + 4,
      style: {
        fill: color,
        fontSize: "10px",
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        textAnchor: "middle",
        pointerEvents: "none",
        letterSpacing: "0.05em"
      }
    }, d.id.slice(0, 2).toUpperCase()), /*#__PURE__*/React.createElement("text", {
      x: labelX,
      y: labelY,
      className: "dorm-label",
      style: {
        fontSize: "13px"
      }
    }, d.name), /*#__PURE__*/React.createElement("text", {
      x: labelX,
      y: labelY + 13,
      className: "dorm-label-en"
    }, d.en.toUpperCase()));
  })), /*#__PURE__*/React.createElement("div", {
    className: "map-legend"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-dot",
    style: {
      borderColor: "#4a7c59",
      background: "rgba(74, 124, 89, 0.2)"
    }
  }), /*#__PURE__*/React.createElement("span", null, "\u5DF2\u63A2\u7D22")), /*#__PURE__*/React.createElement("div", {
    className: "map-legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-dot",
    style: {
      borderColor: "#c49a2c",
      background: "rgba(196, 154, 44, 0.2)"
    }
  }), /*#__PURE__*/React.createElement("span", null, "\u90E8\u5206\u63A2\u7D22")), /*#__PURE__*/React.createElement("div", {
    className: "map-legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-dot",
    style: {
      borderColor: "#c42828",
      background: "rgba(196, 40, 40, 0.2)"
    }
  }), /*#__PURE__*/React.createElement("span", null, "\u672A\u63A2\u7D22")), /*#__PURE__*/React.createElement("div", {
    className: "map-legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-dot",
    style: {
      borderColor: "#7a3ab0",
      background: "rgba(122, 58, 176, 0.2)",
      borderRadius: "50%"
    }
  }), /*#__PURE__*/React.createElement("span", null, "\u6838\u5FC3\u533A\u57DF")), /*#__PURE__*/React.createElement("div", {
    className: "map-legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-dot",
    style: {
      borderColor: "var(--text-tertiary)",
      clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
    }
  }), /*#__PURE__*/React.createElement("span", null, "\u5BBF\u820D\u533A")))), selected && /*#__PURE__*/React.createElement("div", {
    className: "building-detail-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "building-detail-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "building-detail-title-group"
  }, /*#__PURE__*/React.createElement("h3", null, selected.name), /*#__PURE__*/React.createElement("div", {
    className: "en"
  }, selected.en.toUpperCase())), /*#__PURE__*/React.createElement("div", {
    className: "building-detail-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "building-detail-badge",
    style: {
      borderColor: getStatusColor(selected.status),
      color: getStatusColor(selected.status)
    }
  }, getStatusLabel(selected.status)), /*#__PURE__*/React.createElement("span", {
    className: "building-detail-badge",
    style: {
      borderColor: "var(--text-muted)",
      color: "var(--text-secondary)"
    }
  }, selected.isDorm ? selected.type : `${selected.floors} · 公共建筑`))), /*#__PURE__*/React.createElement("div", {
    className: "building-detail-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "building-detail-section"
  }, /*#__PURE__*/React.createElement("h4", null, "\u5916\u89C2\u63CF\u8FF0"), /*#__PURE__*/React.createElement("p", null, selected.desc)), selected.isDorm && /*#__PURE__*/React.createElement("div", {
    className: "building-detail-section"
  }, /*#__PURE__*/React.createElement("h4", null, "\u7ED3\u6784\u4E0E\u76F8\u90BB"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "\u7ED3\u6784\uFF1A"), selected.structure, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, "\u76F8\u90BB\u5EFA\u7B51\uFF1A"), selected.adjacent)), /*#__PURE__*/React.createElement("div", {
    className: "building-detail-section"
  }, /*#__PURE__*/React.createElement("h4", null, "\u5DF2\u77E5\u89C4\u5219"), /*#__PURE__*/React.createElement("p", null, selected.rules)), selected.rumor && /*#__PURE__*/React.createElement("div", {
    className: "building-detail-section"
  }, /*#__PURE__*/React.createElement("h4", null, "\u4F20\u95FB"), /*#__PURE__*/React.createElement("p", null, selected.rumor)), /*#__PURE__*/React.createElement("div", {
    className: "building-detail-section full"
  }, /*#__PURE__*/React.createElement("h4", null, "\u63A2\u7D22\u8BB0\u5F55"), /*#__PURE__*/React.createElement("p", null, selected.record)))));
}
window.AcademyMap = AcademyMap;;
// Featured Anomaly File - LOA-0073 赤月学院
function AnomalyFile() {
  const verifiedRules = [{
    num: "一",
    title: '身份分配',
    desc: '进入者自动获得学生身份与「剧情书」，严重偏离角色设定将触发惩罚。剧情书内容因人而异。'
  }, {
    num: "二",
    title: "区域限制",
    desc: "不可破坏校园建筑与设施。越界进入未开放区域将触发空间排斥，严重者直接消失。"
  }, {
    num: "三",
    title: "宵禁制度",
    desc: "23:00 至次日 6:00 期间必须返回宿舍。夜间外出者死亡率 100%，无例外记录。"
  }, {
    num: "四",
    title: '教学制度',
    desc: '定期进行才能考核。排名第一者可获得「特殊奖励」，内容未知，疑似与离开路径相关。'
  }];
  const speculatedRules = ["时间流速异常，内外时间偏差约 3-7 倍，具体比例不固定", "存在多条可能的离开路径，不限于考核第一", "校长为核心 NPC，掌握异常关键信息", "白玫瑰花园为异常核心区域，进入者极少返回"];
  const buildings = ["主教学楼", "月华阁（宿舍）", "听雪楼（宿舍）", "青藤苑（宿舍）", "观星台（宿舍）", "望山居（宿舍）", "图书馆", "美术馆", "音乐厅", "体育馆", "植物园", "实验楼", "白玫瑰花园（中心）"];
  const entryRecords = [{
    term: "第一届",
    year: "安珀历28年·冬",
    count: 12,
    org: "衔尾蛇事务所",
    result: "全员失踪",
    status: "death"
  }, {
    term: "第二届",
    year: "安珀历29年·春",
    count: 8,
    org: "衔尾蛇事务所",
    result: "2人生还，6人失踪",
    status: "mixed"
  }, {
    term: "第三届",
    year: "安珀历29年·秋",
    count: 15,
    org: "BRI联合考察",
    result: "13人死亡，2人同化",
    status: "death"
  }, {
    term: "第四届",
    year: "安珀历30年·夏",
    count: 10,
    org: "晨星团",
    result: "全员失踪",
    status: "death"
  }, {
    term: "第五届",
    year: "安珀历31年·冬",
    count: 6,
    org: "衔尾蛇事务所",
    result: "1人生还，5人失踪",
    status: "mixed"
  }, {
    term: "第六届",
    year: "安珀历33年·春",
    count: 20,
    org: "BRI/衔尾蛇联合",
    result: "18人死亡，2人生还后死亡",
    status: "death"
  }, {
    term: "第七届",
    year: "安珀历34年·秋",
    count: 9,
    org: "悬铃木学会",
    result: "全员同化",
    status: "assim"
  }, {
    term: "第八届",
    year: "安珀历36年·夏",
    count: 12,
    org: "衔尾蛇事务所",
    result: "10人失踪，2人死亡",
    status: "death"
  }, {
    term: "第九届",
    year: "安珀历37年·冬",
    count: 7,
    org: "长桥会社",
    result: "全员失踪",
    status: "death"
  }, {
    term: "第十届",
    year: "安珀历38年·秋",
    count: 9,
    org: "衔尾蛇事务所",
    result: "1人生还，8人失踪",
    status: "mixed"
  }, {
    term: "第十一届",
    year: "安珀历39年·秋",
    count: 8,
    org: "衔尾蛇事务所主导",
    result: "进行中",
    status: "active",
    current: true
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .anomaly-file-section {
          background-color: #08080a;
          border-top: 2px solid var(--accent-red);
          border-bottom: 2px solid var(--accent-red);
          position: relative;
        }
        .anomaly-file-section::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(0,0,0,0.1) 3px,
              rgba(0,0,0,0.1) 4px
            );
          pointer-events: none;
          opacity: 0.5;
        }
        .anomaly-file-inner {
          position: relative;
          z-index: 1;
        }
        .file-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid var(--accent-red);
        }
        .file-header-title {
          display: flex;
          align-items: baseline;
          gap: 16px;
        }
        .file-title-cn {
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: 0.1em;
        }
        .file-title-en {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .file-stamp {
          transform: rotate(-8deg);
        }
        /* Info table */
        .info-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 40px;
          background-color: rgba(20, 20, 24, 0.6);
          border: 1px solid var(--border-color);
        }
        .info-table th, .info-table td {
          padding: 14px 20px;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
          font-size: 14px;
        }
        .info-table th {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          background-color: rgba(139, 26, 26, 0.08);
          width: 18%;
          border-right: 1px solid var(--border-color);
        }
        .info-table td {
          color: var(--text-primary);
        }
        .info-table tr:last-child th,
        .info-table tr:last-child td {
          border-bottom: none;
        }
        .info-table .level-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 14px;
          background-color: rgba(196, 40, 40, 0.15);
          border: 1px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }
        .info-table .level-badge::before {
          content: "";
          width: 8px;
          height: 8px;
          background-color: var(--accent-red-bright);
          box-shadow: 0 0 8px var(--accent-red-bright);
        }
        .info-table .status-active {
          color: var(--level-hazardous);
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }
        .info-table .survival-rate {
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-weight: 700;
        }
        .file-id {
          font-family: var(--font-mono);
          font-size: 18px;
          font-weight: 700;
          color: var(--accent-red-bright);
          letter-spacing: 0.1em;
        }
        /* File sections */
        .file-section {
          margin-bottom: 36px;
        }
        .file-section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border-color);
        }
        .file-section-num {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent-red-bright);
          letter-spacing: 0.1em;
          width: 40px;
        }
        .file-section-title {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .file-section-text {
          font-size: 14px;
          line-height: 1.9;
          color: var(--text-secondary);
          padding-left: 52px;
        }
        .file-section-text p {
          margin-bottom: 12px;
        }
        .file-section-text p:last-child {
          margin-bottom: 0;
        }
        /* Buildings list */
        .buildings-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-left: 52px;
        }
        .building-tag {
          padding: 6px 14px;
          background-color: rgba(74, 88, 104, 0.1);
          border: 1px solid var(--steel-blue-dark);
          font-size: 12px;
          color: var(--steel-blue-light);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .building-tag.core {
          border-color: var(--accent-red);
          color: var(--accent-red-bright);
          background-color: rgba(139, 26, 26, 0.1);
        }
        /* Rules */
        .rules-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-left: 52px;
        }
        .rule-item {
          display: flex;
          gap: 16px;
          padding: 16px 20px;
          background-color: rgba(20, 20, 24, 0.5);
          border-left: 3px solid;
          position: relative;
        }
        .rule-item.verified {
          border-left-color: var(--level-ordinary);
        }
        .rule-item.speculated {
          border-left-color: var(--text-muted);
        }
        .rule-num {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          color: var(--text-tertiary);
          line-height: 1;
          flex-shrink: 0;
          width: 36px;
        }
        .rule-content {
          flex: 1;
        }
        .rule-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .rule-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          padding: 2px 8px;
          letter-spacing: 0.1em;
          border: 1px solid;
        }
        .rule-item.verified .rule-tag {
          color: var(--level-ordinary);
          border-color: var(--level-ordinary);
        }
        .rule-item.speculated .rule-tag {
          color: var(--text-muted);
          border-color: var(--text-muted);
        }
        .rule-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .speculated-list {
          padding-left: 52px;
          list-style: none;
        }
        .speculated-list li {
          position: relative;
          padding-left: 20px;
          font-size: 13px;
          color: var(--text-tertiary);
          line-height: 1.8;
        }
        .speculated-list li::before {
          content: "?";
          position: absolute;
          left: 0;
          top: 0;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }
        /* Entry records table */
        .entry-records {
          width: 100%;
          border-collapse: collapse;
          margin-left: 52px;
          width: calc(100% - 52px);
          font-size: 13px;
        }
        .entry-records th {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 12px 14px;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
          background-color: rgba(139, 26, 26, 0.05);
        }
        .entry-records td {
          padding: 12px 14px;
          border-bottom: 1px solid rgba(42, 42, 50, 0.5);
          color: var(--text-secondary);
        }
        .entry-records tr:hover td {
          background-color: rgba(255, 255, 255, 0.02);
        }
        .entry-records .term {
          font-family: var(--font-serif);
          font-weight: 600;
          color: var(--text-primary);
        }
        .entry-records .count {
          font-family: var(--font-mono);
        }
        .entry-records .death {
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-weight: 700;
        }
        .entry-records .mixed {
          color: var(--level-hazardous);
          font-family: var(--font-mono);
          font-weight: 500;
        }
        .entry-records .assim {
          color: var(--level-unknown);
          font-family: var(--font-mono);
          font-weight: 500;
        }
        .entry-records .active {
          color: var(--level-ordinary);
          font-family: var(--font-mono);
          font-weight: 500;
        }
        /* Notes */
        .note-box {
          margin-left: 52px;
          padding: 20px 24px;
          background-color: rgba(139, 26, 26, 0.05);
          border: 1px solid rgba(196, 40, 40, 0.3);
          position: relative;
        }
        .note-box::before {
          content: "IMAC NOTE";
          position: absolute;
          top: -10px;
          left: 20px;
          background-color: #08080a;
          padding: 0 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.15em;
        }
        .note-text {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.8;
          font-style: italic;
        }
        .internal-note {
          margin-left: 52px;
          margin-top: 20px;
          padding: 20px 24px;
          background-color: rgba(122, 58, 176, 0.05);
          border: 1px solid rgba(122, 58, 176, 0.3);
          position: relative;
        }
        .internal-note::before {
          content: "内部评估 · INTERNAL";
          position: absolute;
          top: -10px;
          left: 20px;
          background-color: #08080a;
          padding: 0 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--level-unknown);
          letter-spacing: 0.15em;
        }
        .internal-note-text {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.8;
        }
        .internal-note-signature {
          margin-top: 12px;
          text-align: right;
          font-family: var(--font-serif);
          font-size: 13px;
          color: var(--text-tertiary);
          font-style: italic;
        }
        /* Phenomena list */
        .phenomena-list {
          padding-left: 52px;
          list-style: none;
        }
        .phenomena-list li {
          position: relative;
          padding-left: 24px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 8px;
        }
        .phenomena-list li::before {
          content: "◆";
          position: absolute;
          left: 0;
          top: 0;
          color: var(--accent-red-bright);
          font-size: 10px;
        }
        .file-footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 2px solid var(--accent-red);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .file-meta {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }
        @media (max-width: 1024px) {
          .file-section-text, .buildings-grid, .rules-list,
          .speculated-list, .phenomena-list, .note-box, .internal-note {
            padding-left: 0;
            margin-left: 0;
          }
          .entry-records {
            margin-left: 0;
            width: 100%;
          }
          .info-table th { width: 25%; }
        }
        @media (max-width: 768px) {
          .file-title-cn { font-size: 26px; }
          .file-header-bar { flex-direction: column; align-items: flex-start; gap: 16px; }
          .info-table { display: block; overflow-x: auto; }
          .entry-records { display: block; overflow-x: auto; white-space: nowrap; }
          .info-table th { min-width: 100px; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    id: "anomaly-file",
    className: "section anomaly-file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container anomaly-file-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-header-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-header-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-number mono",
    style: {
      color: "var(--accent-red-bright)"
    }
  }, "06 /"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "file-title-cn"
  }, "\u5F02\u5E38\u4FE1\u606F\u6570\u636E\u5E93"), /*#__PURE__*/React.createElement("div", {
    className: "file-title-en"
  }, "ANOMALY INFORMATION DATABASE"))), /*#__PURE__*/React.createElement("div", {
    className: "file-stamp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stamp"
  }, "\u7EDD\u5BC6 \xB7 EYES ONLY"))), /*#__PURE__*/React.createElement("table", {
    className: "info-table"
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u5F02\u5E38\u7F16\u53F7"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "file-id"
  }, "LOA-0073")), /*#__PURE__*/React.createElement("th", null, "\u540D\u79F0"), /*#__PURE__*/React.createElement("td", null, "\u8D64\u6708\u5B66\u9662 \xB7 Crimson Moon Academy")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u6240\u5C5E\u7BA1\u8F96"), /*#__PURE__*/React.createElement("td", null, "\u8854\u5C3E\u86C7\u4E8B\u52A1\u6240 \xB7 Ouroboros Agency"), /*#__PURE__*/React.createElement("th", null, "\u9996\u6B21\u8BB0\u5F55"), /*#__PURE__*/React.createElement("td", null, "\u5B89\u73C0\u538628\u5E74 \xB7 \u79CB")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u5F02\u5E38\u7B49\u7EA7"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "level-badge"
  }, "\u6DF1\u6E0A\u7EA7 \xB7 ABYSSAL")), /*#__PURE__*/React.createElement("th", null, "\u5F53\u524D\u72B6\u6001"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "status-active"
  }, "\u25CF \u6D3B\u8DC3 ACTIVE"))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u751F\u8FD8\u7387"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "survival-rate"
  }, "\u7EA6 1.9%"), " \uFF08107\u4EBA\u8FDB\u5165\uFF0C2\u4EBA\u751F\u8FD8\u540E\u6B7B\u4EA1\uFF09"), /*#__PURE__*/React.createElement("th", null, "\u6863\u6848\u66F4\u65B0"), /*#__PURE__*/React.createElement("td", null, "\u5B89\u73C0\u538639\u5E74 \xB7 \u6625")))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 01"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u53D1\u73B0\u7ECF\u8FC7")), /*#__PURE__*/React.createElement("div", {
    className: "file-section-text"
  }, /*#__PURE__*/React.createElement("p", null, "\u5B89\u73C0\u538628\u5E74\u79CB\uFF0C\u9E23\u6D77\u57CE\u897F\u533A\u4E00\u6240\u5E9F\u5F03\u4E2D\u5B66\u539F\u5740\u4E0A\u7A81\u7136\u51FA\u73B0\u4E86\u5B8C\u6574\u7684\u6821\u56ED\u5EFA\u7B51\u7FA4\u3002 \u5F53\u5730\u5C45\u6C11\u62A5\u544A\u79F0\u524D\u4E00\u65E5\u8BE5\u5904\u8FD8\u662F\u4E00\u7247\u62C6\u8FC1\u5DE5\u5730\uFF0C\u4E00\u591C\u4E4B\u95F4\u51FA\u73B0\u4E86\u5360\u5730\u7EA6\u4E09\u4E07\u5E73\u65B9\u7C73\u7684\u5B66\u9662\u5EFA\u7B51\u3002 \u9996\u6279\u8FDB\u5165\u8C03\u67E5\u7684\u4E94\u540D\u8B66\u5458\u65E0\u4E00\u8FD4\u56DE\u3002\u8854\u5C3E\u86C7\u4E8B\u52A1\u6240\u63A5\u7BA1\u540E\uFF0C\u6D3E\u51FA\u7B2C\u4E00\u652F\u5341\u4E8C\u4EBA\u4E13\u4E1A\u961F\u4F0D\uFF0C \u540C\u6837\u5168\u5458\u5931\u8E2A\u3002\u81F3\u6B64\u786E\u8BA4\u4E3AS\u7EA7\u4EE5\u4E0A\u5F02\u5E38\uFF0C\u540E\u7ECF\u91CD\u65B0\u8BC4\u7EA7\u5B9A\u4E3A\u6DF1\u6E0A\u7EA7\u3002"), /*#__PURE__*/React.createElement("p", null, "\u5F02\u5E38\u5165\u53E3\u4F4D\u7F6E\u4E0D\u56FA\u5B9A\uFF0C\u6709\u65F6\u662F\u4E00\u6247\u95E8\uFF0C\u6709\u65F6\u662F\u4E00\u9762\u5899\uFF0C\u751A\u81F3\u53EF\u80FD\u662F\u5730\u94C1\u8F66\u53A2\u7684\u67D0\u4E00\u8282\u3002 \u88AB\u62C9\u5165\u8005\u7684\u5171\u540C\u7279\u5F81\u662F\"\u6B63\u5728\u72EC\u5904\"\u2014\u2014\u8FD9\u662F\u76EE\u524D\u552F\u4E00\u53EF\u786E\u8BA4\u7684\u9009\u53D6\u89C4\u5F8B\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 02"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u57FA\u672C\u7279\u5F81")), /*#__PURE__*/React.createElement("div", {
    className: "file-section-text"
  }, /*#__PURE__*/React.createElement("p", null, "\u8D64\u6708\u5B66\u9662\u662F\u4E00\u5EA7\u5178\u578B\u7684", /*#__PURE__*/React.createElement("strong", null, "\u53D9\u4E8B\u578B\u5F02\u5E38"), "\u3002\u8FDB\u5165\u8005\u4F1A\u88AB\u5206\u914D\u4E00\u4E2A\"\u5B66\u751F\"\u8EAB\u4EFD\uFF0C \u5E76\u83B7\u5F97\u5C5E\u4E8E\u81EA\u5DF1\u7684\"\u5267\u60C5\u4E66\"\u3002\u5267\u60C5\u4E66\u5185\u5BB9\u56E0\u4EBA\u800C\u5F02\uFF0C\u8BB0\u8F7D\u4E86\u8BE5\u89D2\u8272\u5728\u6821\u56ED\u4E2D\u7684\u8EAB\u4EFD\u3001 \u4EBA\u9645\u5173\u7CFB\u3001\u4EE5\u53CA\u9700\u8981\u5B8C\u6210\u7684\"\u5267\u60C5\u4EFB\u52A1\"\u3002\u4E25\u91CD\u504F\u79BB\u5267\u60C5\u8BBE\u5B9A\u5C06\u89E6\u53D1\u60E9\u7F5A\u3002"), /*#__PURE__*/React.createElement("p", null, "\u5F02\u5E38\u7684\u5929\u7A7A\u6C38\u8FDC\u662F\u6697\u7EA2\u8272\u7684\uFF0C\u60AC\u6302\u7740\u4E00\u8F6E\u5DE8\u5927\u7684\u7EA2\u8272\u6708\u4EAE\u2014\u2014\u8FD9\u4E5F\u662F\"\u8D64\u6708\u5B66\u9662\"\u540D\u79F0\u7684\u7531\u6765\u3002 \u6708\u4EAE\u7684\u5927\u5C0F\u548C\u4F4D\u7F6E\u4F1A\u53D8\u5316\uFF0C\u4F46\u6C38\u8FDC\u4E0D\u4F1A\u843D\u4E0B\u3002\u5F02\u5E38\u5185\u90E8\u6CA1\u6709\u592A\u9633\uFF0C\u4E5F\u6CA1\u6709\u663C\u591C\u4EA4\u66FF\uFF0C \u65F6\u95F4\u901A\u8FC7\u949F\u697C\u7684\u949F\u58F0\u548C\u5BBF\u820D\u7184\u706F\u6765\u6807\u8BB0\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 03"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u5185\u90E8\u73AF\u5883")), /*#__PURE__*/React.createElement("div", {
    className: "buildings-grid"
  }, buildings.map((b, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: `building-tag ${i === buildings.length - 1 ? "core" : ""}`
  }, b)))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 04"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u5DF2\u786E\u8BA4\u89C4\u5219"), /*#__PURE__*/React.createElement("span", {
    className: "tag verified"
  }, "\u5DF2\u9A8C\u8BC1 \xB7 VERIFIED")), /*#__PURE__*/React.createElement("div", {
    className: "rules-list"
  }, verifiedRules.map(rule => /*#__PURE__*/React.createElement("div", {
    key: rule.num,
    className: "rule-item verified"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rule-num"
  }, rule.num), /*#__PURE__*/React.createElement("div", {
    className: "rule-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rule-title"
  }, "\u89C4\u5219", rule.num, "\uFF1A", rule.title, /*#__PURE__*/React.createElement("span", {
    className: "rule-tag"
  }, "\u5DF2\u9A8C\u8BC1")), /*#__PURE__*/React.createElement("p", {
    className: "rule-desc"
  }, rule.desc)))))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 05"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u63A8\u6D4B\u89C4\u5219"), /*#__PURE__*/React.createElement("span", {
    className: "tag pending"
  }, "\u5F85\u9A8C\u8BC1 \xB7 UNCONFIRMED")), /*#__PURE__*/React.createElement("ul", {
    className: "speculated-list"
  }, speculatedRules.map((rule, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, rule)))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 06"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u8FDB\u5165\u8BB0\u5F55")), /*#__PURE__*/React.createElement("table", {
    className: "entry-records"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u5C4A\u6B21"), /*#__PURE__*/React.createElement("th", null, "\u5E74\u4EFD"), /*#__PURE__*/React.createElement("th", null, "\u8FDB\u5165\u4EBA\u6570"), /*#__PURE__*/React.createElement("th", null, "\u4E3B\u5BFC\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("th", null, "\u7ED3\u679C"))), /*#__PURE__*/React.createElement("tbody", null, entryRecords.map(rec => /*#__PURE__*/React.createElement("tr", {
    key: rec.term
  }, /*#__PURE__*/React.createElement("td", {
    className: "term"
  }, rec.term), /*#__PURE__*/React.createElement("td", null, rec.year), /*#__PURE__*/React.createElement("td", {
    className: "count"
  }, rec.count), /*#__PURE__*/React.createElement("td", null, rec.org), /*#__PURE__*/React.createElement("td", {
    className: rec.status
  }, rec.result)))))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 07"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u7279\u6B8A\u73B0\u8C61")), /*#__PURE__*/React.createElement("ul", {
    className: "phenomena-list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u89C4\u5219\u81EA\u6211\u4FEE\u6B63\u8FF9\u8C61\uFF1A"), "\u7B2C\u56DB\u5C4A\u8FDB\u5165\u540E\uFF0C\"\u5267\u60C5\u4E66\"\u7684\u5185\u5BB9\u660E\u663E\u6BD4\u7B2C\u4E00\u5C4A\u66F4\u4E3A\u590D\u6742\u548C\u7CBE\u7EC6\uFF0C\u7591\u4F3C\u5F02\u5E38\u5177\u6709\u5B66\u4E60\u548C\u8FDB\u5316\u80FD\u529B\u3002"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u751F\u8FD8\u8005\u5171\u6027\u540E\u9057\u75C7\uFF1A"), "\u4EC5\u6709\u7684\u4E24\u540D\u4E49\u751F\u8FD8\u8005\u5747\u5728\u8FD4\u56DE\u540E\u4E09\u5E74\u5185\u6B7B\u4EA1\uFF0C\u6B7B\u56E0\u5747\u4E3A\"\u5728\u7761\u68A6\u4E2D\u505C\u6B62\u547C\u5438\"\u3002\u5C38\u68C0\u65E0\u5F02\u5E38\u3002"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u62C9\u5165\u673A\u5236\u4E0D\u53EF\u9884\u6D4B\uFF1A"), "\u5165\u53E3\u51FA\u73B0\u5B8C\u5168\u968F\u673A\uFF0C\u53D7\u5BB3\u8005\u53EF\u80FD\u5728\u5BB6\u4E2D\u3001\u529E\u516C\u5BA4\u3001\u751A\u81F3\u884C\u9A76\u7684\u8F66\u8F86\u4E2D\u88AB\u62C9\u5165\u3002\u65E0\u9884\u8B66\u65F6\u95F4\u3002"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\"\u767D\u73AB\u7470\"\u73B0\u8C61\uFF1A"), "\u591A\u540D\u751F\u8FD8\u8005\uFF08\u542B\u6B7B\u540E\uFF09\u7684\u79C1\u4EBA\u7269\u54C1\u4E2D\u53D1\u73B0\u4E86\u5E72\u71E5\u7684\u767D\u8272\u73AB\u7470\u82B1\u74E3\uFF0C\u6765\u6E90\u4E0D\u660E\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 08"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u5907\u6CE8")), /*#__PURE__*/React.createElement("div", {
    className: "note-box"
  }, /*#__PURE__*/React.createElement("p", {
    className: "note-text"
  }, "\u8D64\u6708\u5B66\u9662\u662F\u76EE\u524D\u5DF2\u77E5\u6301\u7EED\u65F6\u95F4\u6700\u957F\u3001\u81F4\u6B7B\u7387\u6700\u9AD8\u7684\u6DF1\u6E0A\u7EA7\u5F02\u5E38\u4E4B\u4E00\u3002 \u9274\u4E8E\u5176\u4E0D\u53EF\u9884\u6D4B\u7684\u62C9\u5165\u673A\u5236\u548C\u6781\u9AD8\u7684\u6B7B\u4EA1\u7387\uFF0CIMAC \u534F\u8C03\u529E\u516C\u5BA4\u5DF2\u5C06\u5176\u5217\u4E3A \"\u4F18\u5148\u7EA7-\u963F\u5C14\u6CD5\"\u89C2\u5BDF\u5BF9\u8C61\u3002\u4EFB\u4F55\u7EC4\u7EC7\u5728\u91C7\u53D6\u884C\u52A8\u524D\u5FC5\u987B\u63D0\u4EA4\u5B8C\u6574\u65B9\u6848\u5E76\u83B7\u5F97 IMAC \u5BA1\u6279\u3002 \u672A\u7ECF\u6388\u6743\u7684\u79C1\u81EA\u8FDB\u5165\u5C06\u88AB\u89C6\u4E3A\u4E25\u91CD\u8FDD\u89C4\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "internal-note"
  }, /*#__PURE__*/React.createElement("p", {
    className: "internal-note-text"
  }, "\u3010\u8854\u5C3E\u86C7\u4E8B\u52A1\u6240\u5185\u90E8\u8BC4\u4F30 \xB7 \u9996\u5E2D\u6EAF\u754C\u8005 \u9646\u6C89\u821F\u3011", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u8D64\u6708\u5B66\u9662\u4E0D\u662F\u4E00\u4E2A\"\u9677\u9631\"\u3002\u5B83\u662F\u4E00\u4E2A\"\u8C1C\u9898\"\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u5341\u4E00\u5C4A\u8FDB\u5165\uFF0C\u4E00\u767E\u4E00\u5341\u516D\u4EBA\uFF0C\u6CA1\u6709\u4E00\u4E2A\u4EBA\u662F\u88AB\u89C4\u5219\u76F4\u63A5\u6740\u6B7B\u7684\u2014\u2014\u4ED6\u4EEC\u8981\u4E48\u5931\u8E2A\uFF0C\u8981\u4E48\"\u5267\u60C5\u5931\u8D25\"\u540E\u6D88\u5931\uFF0C\u8981\u4E48\u540C\u5316\u3002 \u8FD9\u4E0D\u7B26\u5408\u5E38\u89C4\u6DF1\u6E0A\u7EA7\u5F02\u5E38\u7684\u884C\u4E3A\u6A21\u5F0F\u3002\u5E38\u89C4\u6DF1\u6E0A\u7EA7\u5F02\u5E38\u662F\"\u4E3B\u52A8\u6740\u4EBA\"\u7684\uFF0C\u800C\u8D64\u6708\u5B66\u9662\u66F4\u50CF\u662F\u5728", /*#__PURE__*/React.createElement("em", {
    style: {
      color: "var(--text-primary)"
    }
  }, " \"\u7B5B\u9009\" "), "\u4EC0\u4E48\u4E1C\u897F\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u767D\u73AB\u7470\u82B1\u56ED\u662F\u5173\u952E\u3002\u6240\u6709\u63A5\u8FD1\u8FC7\u6838\u5FC3\u533A\u57DF\u7684\u4EBA\uFF0C\u5373\u4F7F\u56DE\u6765\u4E86\uFF0C\u4E5F\u90FD\u53D8\u4E86\u3002", /*#__PURE__*/React.createElement("br", null), "\u6211\u6709\u4E00\u79CD\u611F\u89C9\u2014\u2014\u8FD9\u5EA7\u5B66\u9662\u5728\u7B49\u5F85\u67D0\u4E2A\u4EBA\u3002\u6216\u8005\u8BF4\uFF0C\u5728\u7B49\u67D0\u4E2A\"\u5B66\u751F\"\u6BD5\u4E1A\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u8FD9\u662F\u6700\u540E\u7684\u8C1C\u9898\u3002\u4E5F\u662F\u6211\u4EEC\u5FC5\u987B\u89E3\u5F00\u7684\u8C1C\u9898\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "internal-note-signature"
  }, "\u2014 \u9646\u6C89\u821F \xB7 \u9996\u5E2D\u6EAF\u754C\u8005 \xB7 \u754C\u6807"))), /*#__PURE__*/React.createElement("div", {
    className: "file-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-meta"
  }, "FILE ID: LOA-0073 / VER: 39.2 / CLASSIFICATION: EYES ONLY"), /*#__PURE__*/React.createElement("div", {
    className: "file-meta"
  }, "LAST UPDATED: \u5B89\u73C0\u538639\u5E74\xB7\u6625")))));
}
window.AnomalyFile = AnomalyFile;;
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
window.AnomalyInfo = AnomalyInfo;;
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
window.NewsCenter = NewsCenter;;
// Hero Section
function Hero() {
  const stats = [{
    value: "20,000+",
    label: "已记录异常事件",
    en: "RECORDED ANOMALIES"
  }, {
    value: "1,247",
    label: "在册溯界者",
    en: "REGISTERED WALKERS"
  }, {
    value: "8",
    label: "认证成员组织",
    en: "MEMBER ORGANIZATIONS"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 65px;
          overflow: hidden;
          background-color: var(--bg-deep);
        }
        .hero::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background:
            radial-gradient(ellipse at center top, rgba(196, 40, 40, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(74, 88, 104, 0.06) 0%, transparent 40%);
          pointer-events: none;
        }
        .hero-grid {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          z-index: 1;
          width: 100%;
        }
        .hero-top-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
        }
        .hero-doc-id {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }
        .hero-main {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 60px;
        }
        .hero-subtitle {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--accent-red-bright);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .hero-subtitle::before {
          content: "";
          width: 40px;
          height: 1px;
          background-color: var(--accent-red-bright);
        }
        .hero-title-cn {
          font-family: var(--font-serif);
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: 0.08em;
          line-height: 1.15;
        }
        .hero-title-en {
          font-family: var(--font-mono);
          font-size: clamp(14px, 1.5vw, 18px);
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .hero-tagline {
          margin-top: 12px;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }
        .hero-tagline-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          color: var(--text-secondary);
        }
        .hero-tagline-item .dot {
          width: 6px;
          height: 6px;
          background-color: var(--accent-red-bright);
          transform: rotate(45deg);
        }
        .hero-desc {
          max-width: 640px;
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-top: 8px;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background-color: var(--border-color);
          border: 1px solid var(--border-color);
        }
        .hero-stat-card {
          background-color: var(--bg-secondary);
          padding: 32px 28px;
          position: relative;
        }
        .hero-stat-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 8px; height: 8px;
          border-top: 2px solid var(--accent-red);
          border-left: 2px solid var(--accent-red);
        }
        .stat-value {
          font-family: var(--font-serif);
          font-size: 42px;
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 12px;
        }
        .stat-label-cn {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        .stat-label-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .hero-bottom {
          position: absolute;
          bottom: 40px;
          left: 40px;
          right: 40px;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .hero-scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
        }
        .hero-scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--text-muted), transparent);
          animation: scroll-fade 2s ease-in-out infinite;
        }
        @keyframes scroll-fade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .hero-classification {
          position: absolute;
          bottom: 30px;
          right: 40px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        .hero-class-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        @media (max-width: 1024px) {
          .hero-stats { grid-template-columns: 1fr; }
          .hero-tagline { gap: 20px; }
        }
        @media (max-width: 768px) {
          .hero { min-height: auto; padding: 100px 0 60px; }
          .hero-stats { margin-bottom: 60px; }
          .stat-value { font-size: 32px; }
          .hero-bottom { position: static; padding: 0 16px; margin-top: 40px; }
          .hero-classification { position: static; align-items: flex-start; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    id: "home",
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-top-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero-doc-id mono"
  }, "DOC.IMAC.PUB.001 \xB7 VERSION 39.2"), /*#__PURE__*/React.createElement("span", {
    className: "classification public"
  }, "PUBLIC ACCESS")), /*#__PURE__*/React.createElement("div", {
    className: "hero-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-subtitle"
  }, "\u56FD\u9645\u5F02\u5E38\u7BA1\u7406\u8054\u76DF"), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title-cn"
  }, "\u56FD\u9645\u5F02\u5E38\u7BA1\u7406\u8054\u76DF"), /*#__PURE__*/React.createElement("div", {
    className: "hero-title-en"
  }, "International Anomaly Management Coalition")), /*#__PURE__*/React.createElement("div", {
    className: "hero-tagline"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-tagline-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, "\u4FE1\u606F\u65E0\u6761\u4EF6\u5171\u4EAB")), /*#__PURE__*/React.createElement("div", {
    className: "hero-tagline-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, "\u6807\u51C6\u65E0\u6761\u4EF6\u7EDF\u4E00")), /*#__PURE__*/React.createElement("div", {
    className: "hero-tagline-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, "\u54CD\u5E94\u65E0\u6761\u4EF6\u534F\u4F5C"))), /*#__PURE__*/React.createElement("p", {
    className: "hero-desc"
  }, "\u81EA\u5B89\u73C0\u5386\u5143\u5E74\"\u5927\u88C2\u9699\"\u4E8B\u4EF6\u4EE5\u6765\uFF0C\u5F02\u5E38\u5728\u5168\u7403\u8303\u56F4\u5185\u6301\u7EED\u51FA\u73B0\u3002\u5404\u56FD\u72EC\u7ACB\u5E94\u5BF9\u4F53\u7CFB\u6807\u51C6\u4E0D\u4E00\u3001\u4FE1\u606F\u58C1\u5792\u4E25\u91CD\uFF0C\u5BFC\u81F4\u5927\u91CF\u672C\u53EF\u907F\u514D\u7684\u4F24\u4EA1\u3002 IMAC \u4F5C\u4E3A\u5168\u7403\u7EDF\u4E00\u7684\u5F02\u5E38\u7BA1\u7406\u534F\u8C03\u673A\u6784\uFF0C\u81F4\u529B\u4E8E\u5EFA\u7ACB\u6807\u51C6\u5316\u7684\u5F02\u5E38\u8BC4\u7EA7\u3001\u8BB0\u5F55\u3001\u5E94\u5BF9\u4E0E\u5584\u540E\u4F53\u7CFB\uFF0C \u534F\u8C03\u516B\u5927\u8BA4\u8BC1\u6210\u5458\u7EC4\u7EC7\u7684\u8DE8\u56FD\u54CD\u5E94\u884C\u52A8\uFF0C\u7EC8\u7ED3\u6DF7\u4E71\uFF0C\u5B88\u62A4\u8FB9\u754C\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stats"
  }, stats.map((stat, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "hero-stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-value mono"
  }, stat.value), /*#__PURE__*/React.createElement("div", {
    className: "stat-label-cn"
  }, stat.label), /*#__PURE__*/React.createElement("div", {
    className: "stat-label-en"
  }, stat.en))))), /*#__PURE__*/React.createElement("div", {
    className: "hero-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-scroll-indicator"
  }, /*#__PURE__*/React.createElement("span", null, "SCROLL"), /*#__PURE__*/React.createElement("div", {
    className: "hero-scroll-line"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hero-classification"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-class-label"
  }, "Classification Level"), /*#__PURE__*/React.createElement("span", {
    className: "classification public"
  }, "PUBLIC ACCESS / \u516C\u5F00\u8BBF\u95EE\u7EA7"))));
}
window.Hero = Hero;

// Threat Level Section (moved here since it's referenced in App)
function ThreatLevel() {
  const levels = [{
    key: "ordinary",
    cn: "常规级",
    en: "ORDINARY",
    desc: "规则单一、逻辑清晰。进入门槛低，平民生还率较高，一般不会造成大规模伤亡。",
    tags: ["规则清晰", "低死亡率", "可预测"]
  }, {
    key: "hazardous",
    cn: "危险级",
    en: "HAZARDOUS",
    desc: "多层陷阱与误导并存，空间轻度扭曲，具有排他性，进入者面临显著生存压力。",
    tags: ["空间扭曲", "误导陷阱", "需专业人员"]
  }, {
    key: "doomed",
    cn: "厄运级",
    en: "DOOMED",
    desc: "规则具有叙事性，强制嵌入异常剧本，NPC与同化风险高发，生还率急剧下降。",
    tags: ["叙事规则", "同化风险", "NPC交互"]
  }, {
    key: "abyssal",
    cn: "深渊级",
    en: "ABYSSAL",
    desc: "规则不可逆，空间具有自我意识与进化能力。绝大部分进入者无人生还。",
    tags: ["自我进化", "极高致死率", "接近无解"]
  }, {
    key: "unknown",
    cn: "未知级",
    en: "UNKNOWN",
    desc: "规则完全不可知。存在本身对现实构成结构性威胁，仅作为特殊评级使用。",
    tags: ["不可测量", "现实威胁", "最高戒备"]
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .threat-section {
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }
        .threat-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }
        .threat-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .threat-card:hover {
          transform: translateY(-4px);
        }
        .threat-card:hover .level-bar {
          filter: brightness(1.3);
        }
        .threat-card.ordinary:hover {
          border-color: var(--level-ordinary);
          box-shadow: 0 8px 30px rgba(74, 124, 89, 0.15);
        }
        .threat-card.hazardous:hover {
          border-color: var(--level-hazardous);
          box-shadow: 0 8px 30px rgba(196, 154, 44, 0.15);
        }
        .threat-card.doomed:hover {
          border-color: var(--level-doomed);
          box-shadow: 0 8px 30px rgba(212, 104, 40, 0.15);
        }
        .threat-card.abyssal:hover {
          border-color: var(--level-abyssal);
          box-shadow: 0 8px 30px rgba(196, 40, 40, 0.2);
        }
        .threat-card.unknown:hover {
          border-color: var(--level-unknown);
          box-shadow: 0 8px 30px rgba(122, 58, 176, 0.2);
        }
        .threat-card-body {
          padding: 24px 20px;
        }
        .threat-card-header {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 16px;
        }
        .threat-rank {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }
        .threat-name-cn {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .threat-name-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-left: auto;
        }
        .threat-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 20px;
          min-height: 88px;
        }
        .threat-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .threat-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          border: 1px solid var(--border-light);
          padding: 3px 8px;
          letter-spacing: 0.05em;
        }
        @media (max-width: 1200px) {
          .threat-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .threat-grid { grid-template-columns: 1fr; }
          .threat-desc { min-height: auto; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    id: "threat-level",
    className: "section threat-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-number mono"
  }, "03 /"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title-cn"
  }, "\u5F02\u5E38\u5A01\u80C1\u7B49\u7EA7"), /*#__PURE__*/React.createElement("span", {
    className: "section-title-en"
  }, "ATL \xB7 Anomaly Threat Level")), /*#__PURE__*/React.createElement("span", {
    className: "classification restricted"
  }, "RESTRICTED / \u9650\u5236\u7EA7")), /*#__PURE__*/React.createElement("div", {
    className: "threat-grid"
  }, levels.map((level, i) => /*#__PURE__*/React.createElement("div", {
    key: level.key,
    className: `threat-card ${level.key}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `level-bar level-${level.key}`
  }), /*#__PURE__*/React.createElement("div", {
    className: "threat-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "threat-rank"
  }, "LEVEL ", String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    className: "threat-card-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: `threat-name-cn level-text-${level.key}`
  }, level.cn), /*#__PURE__*/React.createElement("span", {
    className: "threat-name-en"
  }, level.en)), /*#__PURE__*/React.createElement("p", {
    className: "threat-desc"
  }, level.desc), /*#__PURE__*/React.createElement("div", {
    className: "threat-tags"
  }, level.tags.map(tag => /*#__PURE__*/React.createElement("span", {
    key: tag,
    className: "threat-tag"
  }, tag))))))))));
}
window.ThreatLevel = ThreatLevel;;
// Organizations Section - 8 Member Organizations
function Organizations() {
  const regions = [{
    region: "大陆东区",
    regionEn: "EASTERN CONTINENT",
    orgs: [{
      name: "衔尾蛇事务所",
      en: "Ouroboros Agency",
      abbr: "OA",
      hq: "鸣海城",
      desc: "亚洲规模最大的异常处理机构，风格灵活务实，擅长复杂叙事类异常的破解。成员多来自刑侦、痕迹学与行为分析背景。",
      tags: ["叙事破解", "刑侦背景", "亚洲最大"],
      shape: "circle"
    }, {
      name: "北境守望",
      en: "Northwatch",
      abbr: "NW",
      hq: "白松城",
      desc: "擅长极寒环境和长期潜伏型异常。成员多为退役极地部队和原住民猎手，坚韧、沉默、耐受力极强。",
      tags: ["极寒环境", "长期潜伏", "山地作战"],
      shape: "triangle"
    }]
  }, {
    region: "大陆西区",
    regionEn: "WESTERN CONTINENT",
    orgs: [{
      name: "边界研究院",
      en: "Boundary Research Institute",
      abbr: "BRI",
      hq: "洛林自由市",
      desc: "全球最大、历史最悠久的异常研究机构。学术系统化程度最高，拥有最完整的异常档案库，标准训练周期14个月。",
      tags: ["学术系统", "档案最全", "14个月训练"],
      shape: "hexagon"
    }, {
      name: "晨星团",
      en: "Morningstar Collective",
      abbr: "MC",
      hq: "新阿尔比恩市",
      desc: "理性务实、数据驱动。科学家比例在所有组织中最高，以方法论和量化分析著称。",
      tags: ["数据驱动", "科学方法", "高知群体"],
      shape: "star"
    }, {
      name: "第四面墙",
      en: "The Fourth Wall",
      abbr: "4W",
      hq: "新阿尔比恩市",
      desc: "信息管控与公众界面专家。成员多来自军事情报和网络安全背景，负责异常事件的公众认知管理。",
      tags: ["信息管控", "情报背景", "公众界面"],
      shape: "square"
    }]
  }, {
    region: "大陆南区",
    regionEn: "SOUTHERN CONTINENT",
    orgs: [{
      name: "悬铃木学会",
      en: "Platanus Society",
      abbr: "PS",
      hq: "诺瓦城",
      desc: '最神秘的成员组织。核心理念是「异常是意识的产物」，成员多为人类学、神话学和心理学背景。',
      tags: ["意识学派", "神秘主义", "人类学"],
      shape: "diamond"
    }]
  }, {
    region: "极地与跨区域",
    regionEn: "POLAR & TRANSREGIONAL",
    orgs: [{
      name: "白夜哨站",
      en: "White Night Post",
      abbr: "WNP",
      hq: "极光城",
      desc: "驻扎在最北端的组织。擅长极寒环境和超大空间异常，成员适应力极强，是极地异常的第一道防线。",
      tags: ["极地驻扎", "超大空间", "极寒适应"],
      shape: "octagon"
    }, {
      name: "长桥会社",
      en: "Long Bridge Company",
      abbr: "LBC",
      hq: "无固定总部",
      desc: "唯一无国土的成员组织。拥有完全移动式指挥系统，可在72小时内部署至全球任何地点。",
      tags: ["快速部署", "移动指挥", "跨国响应"],
      shape: "bridge"
    }]
  }];
  const renderBadge = (shape, abbr) => {
    const shapes = {
      circle: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "32",
        cy: "32",
        r: "28",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "32",
        cy: "32",
        r: "22",
        stroke: "currentColor",
        strokeWidth: "0.8",
        opacity: "0.5"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "37",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "14",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr)),
      triangle: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("polygon", {
        points: "32,6 58,54 6,54",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("polygon", {
        points: "32,16 50,48 14,48",
        stroke: "currentColor",
        strokeWidth: "0.8",
        opacity: "0.5"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "44",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "12",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr)),
      hexagon: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("polygon", {
        points: "32,4 56,18 56,46 32,60 8,46 8,18",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("polygon", {
        points: "32,12 48,21 48,43 32,52 16,43 16,21",
        stroke: "currentColor",
        strokeWidth: "0.8",
        opacity: "0.5"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "36",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "13",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr)),
      star: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("polygon", {
        points: "32,4 39,24 60,24 43,37 49,57 32,46 15,57 21,37 4,24 25,24",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinejoin: "miter"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "38",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "11",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr)),
      square: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("rect", {
        x: "6",
        y: "6",
        width: "52",
        height: "52",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "14",
        y: "14",
        width: "36",
        height: "36",
        stroke: "currentColor",
        strokeWidth: "0.8",
        opacity: "0.5"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "37",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "13",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr)),
      diamond: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("polygon", {
        points: "32,4 60,32 32,60 4,32",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("polygon", {
        points: "32,12 52,32 32,52 12,32",
        stroke: "currentColor",
        strokeWidth: "0.8",
        opacity: "0.5"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "37",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "12",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr)),
      octagon: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("polygon", {
        points: "22,4 42,4 60,22 60,42 42,60 22,60 4,42 4,22",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("polygon", {
        points: "24,10 40,10 54,24 54,40 40,54 24,54 10,40 10,24",
        stroke: "currentColor",
        strokeWidth: "0.8",
        opacity: "0.5"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "37",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "12",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr)),
      bridge: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M4 40 Q32 10 60 40",
        stroke: "currentColor",
        strokeWidth: "1.5",
        fill: "none"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M4 48 L60 48",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "16",
        y1: "40",
        x2: "16",
        y2: "48",
        stroke: "currentColor",
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "32",
        y1: "28",
        x2: "32",
        y2: "48",
        stroke: "currentColor",
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "48",
        y1: "40",
        x2: "48",
        y2: "48",
        stroke: "currentColor",
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "59",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "10",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr))
    };
    return shapes[shape] || shapes.circle;
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .orgs-section {
          background-color: var(--bg-primary);
        }
        .org-region {
          margin-bottom: 50px;
        }
        .org-region:last-child {
          margin-bottom: 0;
        }
        .org-region-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
        }
        .org-region-name {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .org-region-en {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .org-region-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, var(--border-color), transparent);
        }
        .org-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 16px;
        }
        .org-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 28px 24px;
          display: flex;
          gap: 20px;
          position: relative;
          transition: border-color 0.3s ease;
        }
        .org-card:hover {
          border-color: var(--border-light);
        }
        .org-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 14px; height: 14px;
          border-top: 2px solid var(--steel-blue);
          border-left: 2px solid var(--steel-blue);
        }
        .org-card::after {
          content: "";
          position: absolute;
          bottom: 0; right: 0;
          width: 14px; height: 14px;
          border-bottom: 2px solid var(--steel-blue);
          border-right: 2px solid var(--steel-blue);
        }
        .org-badge {
          width: 64px;
          height: 64px;
          flex-shrink: 0;
          color: var(--steel-blue-light);
        }
        .org-info {
          flex: 1;
          min-width: 0;
        }
        .org-name {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .org-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .org-hq {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .org-hq::before {
          content: "";
          width: 4px;
          height: 4px;
          background-color: var(--text-muted);
          border-radius: 50%;
        }
        .org-hq strong {
          color: var(--text-primary);
          font-weight: 500;
        }
        .org-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 14px;
        }
        .org-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .org-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--steel-blue-light);
          border: 1px solid var(--steel-blue-dark);
          padding: 3px 8px;
          letter-spacing: 0.05em;
        }
        @media (max-width: 768px) {
          .org-cards-grid { grid-template-columns: 1fr; }
          .org-card { flex-direction: column; gap: 16px; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    id: "organizations",
    className: "section orgs-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-number mono"
  }, "05 /"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title-cn"
  }, "\u8BA4\u8BC1\u6210\u5458\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("span", {
    className: "section-title-en"
  }, "REGISTERED ORGANIZATIONS \xB7 8")), /*#__PURE__*/React.createElement("span", {
    className: "classification public"
  }, "PUBLIC / \u516C\u5F00\u7EA7")), regions.map(region => /*#__PURE__*/React.createElement("div", {
    key: region.region,
    className: "org-region"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-region-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "org-region-name"
  }, region.region), /*#__PURE__*/React.createElement("span", {
    className: "org-region-en"
  }, region.regionEn), /*#__PURE__*/React.createElement("div", {
    className: "org-region-line"
  })), /*#__PURE__*/React.createElement("div", {
    className: "org-cards-grid"
  }, region.orgs.map(org => /*#__PURE__*/React.createElement("div", {
    key: org.abbr,
    className: "org-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-badge"
  }, renderBadge(org.shape, org.abbr)), /*#__PURE__*/React.createElement("div", {
    className: "org-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-name"
  }, org.name), /*#__PURE__*/React.createElement("div", {
    className: "org-en"
  }, org.en), /*#__PURE__*/React.createElement("div", {
    className: "org-hq"
  }, "\u603B\u90E8\uFF1A", /*#__PURE__*/React.createElement("strong", null, org.hq)), /*#__PURE__*/React.createElement("p", {
    className: "org-desc"
  }, org.desc), /*#__PURE__*/React.createElement("div", {
    className: "org-tags"
  }, org.tags.map(tag => /*#__PURE__*/React.createElement("span", {
    key: tag,
    className: "org-tag"
  }, tag))))))))))));
}
window.Organizations = Organizations;;
// Walker (Boundary Walker) Section
function Walker() {
  const ranks = [{
    cn: "见习",
    en: "Initiate",
    percent: "35%",
    desc: "通过基础选拔与三个月理论训练，尚未独立执行任务",
    color: "var(--steel-blue-light)"
  }, {
    cn: "溯界者",
    en: "Walker",
    percent: "40%",
    desc: "完成十四个月全科目训练，可独立执行常规级至危险级任务",
    color: "var(--level-ordinary)"
  }, {
    cn: "资深溯界者",
    en: "Senior Walker",
    percent: "18%",
    desc: "至少三年实战经验，可执行厄运级任务，拥有团队指挥权",
    color: "var(--level-hazardous)"
  }, {
    cn: "首席溯界者",
    en: "Chief Walker",
    percent: "5%",
    desc: "各组织最高战力，可领导深渊级行动，全球不足六十人",
    color: "var(--level-doomed)"
  }, {
    cn: "界标",
    en: "Landmark",
    percent: "<30人",
    desc: "传说级称号，以个人存在即为现实锚点。全球不足三十人",
    color: "var(--level-abyssal)"
  }];
  const sources = [{
    cn: "军队系统",
    en: "Military",
    percent: "45%",
    desc: "特种部队、工程兵、医疗兵等军事背景人员，纪律与执行力强"
  }, {
    cn: "警务系统",
    en: "Law Enforcement",
    percent: "30%",
    desc: "刑侦、特警、谈判专家，擅长现场勘查与人际博弈"
  }, {
    cn: "社会招募与幸存者计划",
    en: "Civilian & Survivor",
    percent: "25%",
    desc: "学者、工程师、医生及异常幸存者，提供多元视角与第一手经验"
  }];
  const equipment = [{
    name: "个人记录器",
    en: "Personal Recorder",
    desc: "实时记录所见所闻，是事后重建现场的核心依据",
    icon: "M4 4h16v16H4z M4 9h16 M9 4v16"
  }, {
    name: "异常通讯器",
    en: "Anomaly Comm",
    desc: "在部分异常中维持有限通讯，内置加密与应急信标",
    icon: "M12 18h.01 M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
  }, {
    name: "身份信标",
    en: "ID Beacon",
    desc: "持续发射身份编码，防止在叙事类异常中被规则改写身份",
    icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z M12 22V12 M2 7l10 5 10-5"
  }, {
    name: "个人锚定物",
    en: "Anchor Object",
    desc: "溯界者最珍视的私人物品，在同化危机中作为最后的自我锚点",
    icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
  }];
  const assimilationStages = [{
    stage: "第一阶段",
    name: "规则适应",
    desc: "进入者开始无意识地遵守异常规则，将其视为理所当然",
    level: "低"
  }, {
    stage: "第二阶段",
    name: "身份模糊",
    desc: "对自身身份的认知出现动摇，开始接受异常分配的角色设定",
    level: "中"
  }, {
    stage: "第三阶段",
    name: "规则认同",
    desc: "从心理上认同异常的叙事逻辑，主动维护规则，终止行动资格",
    level: "高"
  }, {
    stage: "第四阶段",
    name: "异常融合",
    desc: "完全融入异常，成为异常的一部分。理论上不可逆转",
    level: "致命"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .walker-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }
        .walker-quote-block {
          max-width: 900px;
          margin: 0 auto 60px;
          text-align: center;
          padding: 40px 20px;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          position: relative;
        }
        .walker-quote-block::before, .walker-quote-block::after {
          content: "";
          position: absolute;
          width: 40px;
          height: 40px;
          border: 1px solid var(--accent-red);
        }
        .walker-quote-block::before {
          top: -1px; left: -1px;
          border-right: none;
          border-bottom: none;
        }
        .walker-quote-block::after {
          bottom: -1px; right: -1px;
          border-left: none;
          border-top: none;
        }
        .walker-quote-mark {
          font-family: var(--font-serif);
          font-size: 60px;
          color: var(--accent-red);
          line-height: 1;
          margin-bottom: 10px;
          opacity: 0.5;
        }
        .walker-quote-text {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.6;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }
        .walker-quote-author {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }
        .walker-main {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 60px;
          margin-bottom: 80px;
        }
        .walker-desc-title {
          font-family: var(--font-serif);
          font-size: 22px;
          color: var(--text-primary);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .walker-desc-title::before {
          content: "";
          width: 4px;
          height: 20px;
          background-color: var(--accent-red-bright);
        }
        .walker-desc-text {
          font-size: 14px;
          line-height: 1.9;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }
        .walker-desc-text strong {
          color: var(--text-primary);
          font-weight: 500;
        }
        /* Rank timeline */
        .rank-timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .rank-item {
          display: grid;
          grid-template-columns: 80px 1fr 100px;
          align-items: center;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 1px solid var(--border-color);
          position: relative;
        }
        .rank-item:first-child {
          border-top: 1px solid var(--border-color);
        }
        .rank-badge {
          width: 60px;
          height: 60px;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          position: relative;
          background-color: var(--bg-card);
        }
        .rank-badge-num {
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 700;
          line-height: 1;
        }
        .rank-badge-label {
          font-family: var(--font-mono);
          font-size: 8px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 2px;
        }
        .rank-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .rank-name {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .rank-name-en {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          font-weight: 400;
        }
        .rank-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .rank-percent {
          text-align: right;
        }
        .rank-percent-num {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          line-height: 1;
        }
        .rank-percent-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          margin-top: 4px;
        }
        /* Sources */
        .sources-section {
          margin-bottom: 80px;
        }
        .sources-title {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sources-title::before {
          content: "§";
          color: var(--accent-red-bright);
          font-size: 16px;
        }
        .sources-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .source-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 28px 24px;
          position: relative;
        }
        .source-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--steel-blue);
        }
        .source-percent {
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 8px;
        }
        .source-name {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .source-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 14px;
        }
        .source-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        /* Equipment */
        .equipment-section {
          margin-bottom: 80px;
        }
        .equipment-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .equipment-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 24px 20px;
          text-align: center;
          transition: border-color 0.3s ease;
        }
        .equipment-card:hover {
          border-color: var(--steel-blue);
        }
        .equipment-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 16px;
          color: var(--steel-blue-light);
        }
        .equipment-icon svg {
          width: 100%;
          height: 100%;
        }
        .equipment-name {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .equipment-en {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .equipment-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        /* Assimilation warning */
        .assimilation-section {
          position: relative;
        }
        .assimilation-box {
          border: 1px solid var(--accent-red-bright);
          padding: 36px 32px;
          background-color: rgba(139, 26, 26, 0.05);
          position: relative;
          animation: assimilation-pulse 3s ease-in-out infinite;
        }
        @keyframes assimilation-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(196, 40, 40, 0); }
          50% { box-shadow: 0 0 20px 2px rgba(196, 40, 40, 0.1); }
        }
        .assimilation-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(196, 40, 40, 0.3);
        }
        .assimilation-title {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .assimilation-warning-icon {
          width: 28px;
          height: 28px;
          color: var(--accent-red-bright);
        }
        .assimilation-title-text {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--accent-red-bright);
        }
        .assimilation-subtext {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }
        .assimilation-stages {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .assim-stage {
          background-color: rgba(10, 10, 12, 0.5);
          border-left: 3px solid;
          padding: 20px 16px;
          position: relative;
        }
        .assim-stage-1 { border-color: var(--level-ordinary); }
        .assim-stage-2 { border-color: var(--level-hazardous); }
        .assim-stage-3 { border-color: var(--level-doomed); }
        .assim-stage-4 { border-color: var(--level-abyssal); }
        .assim-stage-num {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .assim-stage-name {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .assim-stage-level {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          margin-bottom: 10px;
        }
        .stage-1 .assim-stage-level { color: var(--level-ordinary); }
        .stage-2 .assim-stage-level { color: var(--level-hazardous); }
        .stage-3 .assim-stage-level { color: var(--level-doomed); }
        .stage-4 .assim-stage-level { color: var(--level-abyssal); }
        .assim-stage-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .assim-footer-note {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px dashed rgba(196, 40, 40, 0.3);
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .assim-footer-note::before {
          content: "!";
          width: 18px;
          height: 18px;
          border: 1.5px solid var(--accent-red-bright);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
        }
        @media (max-width: 1024px) {
          .walker-main { grid-template-columns: 1fr; gap: 40px; }
          .equipment-grid { grid-template-columns: repeat(2, 1fr); }
          .assimilation-stages { grid-template-columns: repeat(2, 1fr); }
          .sources-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .walker-quote-text { font-size: 18px; }
          .rank-item { grid-template-columns: 60px 1fr; }
          .rank-percent { grid-column: 2; text-align: left; }
          .equipment-grid { grid-template-columns: 1fr 1fr; }
          .assimilation-stages { grid-template-columns: 1fr; }
          .assimilation-box { padding: 24px 20px; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    id: "walker",
    className: "section walker-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-number mono"
  }, "04 /"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title-cn"
  }, "\u6EAF\u754C\u8005"), /*#__PURE__*/React.createElement("span", {
    className: "section-title-en"
  }, "BOUNDARY WALKER")), /*#__PURE__*/React.createElement("span", {
    className: "classification confidential"
  }, "CONFIDENTIAL / \u673A\u5BC6\u7EA7")), /*#__PURE__*/React.createElement("div", {
    className: "walker-quote-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-quote-mark"
  }, "\""), /*#__PURE__*/React.createElement("p", {
    className: "walker-quote-text"
  }, "\u6211\u4EEC\u4E0D\u662F\u5728\u8DE8\u8D8A\u8FB9\u754C\uFF0C\u6211\u4EEC\u662F\u5728\u8FFD\u6EAF\u8FB9\u754C\u2014\u2014", /*#__PURE__*/React.createElement("br", null), "\u628A\u6DF1\u6E0A\u6765\u8DEF\uFF0C\u8D70\u6210\u5F52\u9014\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "walker-quote-author"
  }, "\u2014 \u827E\u4F26\xB7\u7EF4\u65AF\u7279 \xB7 \u9996\u5E2D\u6EAF\u754C\u8005 \xB7 \u754C\u6807")), /*#__PURE__*/React.createElement("div", {
    className: "walker-main"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "walker-desc-title"
  }, "\u804C\u4E1A\u6982\u8FF0"), /*#__PURE__*/React.createElement("p", {
    className: "walker-desc-text"
  }, /*#__PURE__*/React.createElement("strong", null, "\u6EAF\u754C\u8005"), "\u662F\u8FDB\u5165\u5F02\u5E38\u3001\u8C03\u67E5\u5F02\u5E38\u3001\u89E3\u51B3\u5F02\u5E38\u7684\u4E13\u4E1A\u4EBA\u5458\u3002 \u4ED6\u4EEC\u6CA1\u6709\u8D85\u80FD\u529B\uFF0C\u4E0D\u662F\u5929\u9009\u4E4B\u5B50\uFF0C\u53EA\u662F\u7ECF\u8FC7\u4E25\u683C\u7B5B\u9009\u548C\u7CFB\u7EDF\u5316\u8BAD\u7EC3\u7684\u666E\u901A\u4EBA\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "walker-desc-text"
  }, "\u6EAF\u754C\u8005\u7684\u6838\u5FC3\u6B66\u5668\u4E0D\u662F\u4F53\u80FD\u6216\u88C5\u5907\uFF0C\u800C\u662F", /*#__PURE__*/React.createElement("strong", null, "\u89C2\u5BDF\u529B\u3001\u903B\u8F91\u63A8\u6F14\u80FD\u529B\u548C\u7A33\u5B9A\u7684\u5FC3\u667A"), "\u3002 \u5728\u89C4\u5219\u5C01\u95ED\u7684\u7A7A\u95F4\u5185\uFF0C\u4EBA\u6027\u662F\u4ED6\u4EEC\u6700\u540E\u7684\u951A\u70B9\u2014\u2014\u4E5F\u662F\u5BF9\u6297\u540C\u5316\u7684\u552F\u4E00\u9632\u7EBF\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "walker-desc-text"
  }, "\u6BCF\u4E00\u4F4D\u6EAF\u754C\u8005\u90FD\u6E05\u695A\uFF1A\u81EA\u5DF1\u53EF\u80FD\u5728\u4E0B\u4E00\u6B21\u4EFB\u52A1\u4E2D\u518D\u4E5F\u8D70\u4E0D\u51FA\u6765\u3002 \u4F46\u6B63\u662F\u56E0\u4E3A\u4ED6\u4EEC\u613F\u610F\u8D70\u8FDB\u9ED1\u6697\uFF0C\u8FB9\u754C\u4E4B\u5916\u7684\u4E16\u754C\u624D\u80FD\u4FDD\u6301\u6B63\u5E38\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "walker-desc-text",
    style: {
      color: "var(--accent-red-bright)",
      fontStyle: "italic"
    }
  }, "\"\u8BB0\u4F4F\u4F60\u662F\u8C01\u3002\u8BB0\u4F4F\u4F60\u4ECE\u54EA\u91CC\u6765\u3002\"", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "12px",
      color: "var(--text-tertiary)"
    }
  }, "\u2014\u2014 \u6EAF\u754C\u8005\u5165\u961F\u8A93\u8A00\u6700\u540E\u4E00\u53E5"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sources-title"
  }, "\u804C\u7EA7\u4F53\u7CFB \xB7 RANK SYSTEM"), /*#__PURE__*/React.createElement("div", {
    className: "rank-timeline"
  }, ranks.map((rank, i) => /*#__PURE__*/React.createElement("div", {
    key: rank.en,
    className: "rank-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rank-badge",
    style: {
      borderColor: rank.color,
      color: rank.color
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "rank-badge-num"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    className: "rank-badge-label",
    style: {
      color: rank.color
    }
  }, "RANK")), /*#__PURE__*/React.createElement("div", {
    className: "rank-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rank-name"
  }, rank.cn, /*#__PURE__*/React.createElement("span", {
    className: "rank-name-en"
  }, rank.en)), /*#__PURE__*/React.createElement("div", {
    className: "rank-desc"
  }, rank.desc)), /*#__PURE__*/React.createElement("div", {
    className: "rank-percent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rank-percent-num",
    style: {
      color: rank.color
    }
  }, rank.percent), /*#__PURE__*/React.createElement("div", {
    className: "rank-percent-label"
  }, "\u5360\u6BD4"))))))), /*#__PURE__*/React.createElement("div", {
    className: "sources-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sources-title"
  }, "\u4EBA\u5458\u6765\u6E90\u901A\u9053 \xB7 RECRUITMENT CHANNELS"), /*#__PURE__*/React.createElement("div", {
    className: "sources-grid"
  }, sources.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.en,
    className: "source-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "source-percent"
  }, s.percent), /*#__PURE__*/React.createElement("div", {
    className: "source-name"
  }, s.cn), /*#__PURE__*/React.createElement("div", {
    className: "source-en"
  }, s.en), /*#__PURE__*/React.createElement("p", {
    className: "source-desc"
  }, s.desc))))), /*#__PURE__*/React.createElement("div", {
    className: "equipment-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sources-title"
  }, "\u6807\u51C6\u88C5\u5907 \xB7 STANDARD EQUIPMENT"), /*#__PURE__*/React.createElement("div", {
    className: "equipment-grid"
  }, equipment.map(eq => /*#__PURE__*/React.createElement("div", {
    key: eq.en,
    className: "equipment-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "equipment-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: eq.icon
  }))), /*#__PURE__*/React.createElement("div", {
    className: "equipment-name"
  }, eq.name), /*#__PURE__*/React.createElement("div", {
    className: "equipment-en"
  }, eq.en), /*#__PURE__*/React.createElement("p", {
    className: "equipment-desc"
  }, eq.desc))))), /*#__PURE__*/React.createElement("div", {
    className: "assimilation-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "assimilation-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "assimilation-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "assimilation-title"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "assimilation-warning-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
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
    className: "assimilation-title-text"
  }, "\u540C\u5316\u8B66\u544A"), /*#__PURE__*/React.createElement("div", {
    className: "assimilation-subtext"
  }, "ASSIMILATION WARNING \xB7 \u56DB\u9636\u6BB5\u6A21\u578B"))), /*#__PURE__*/React.createElement("span", {
    className: "classification eyes-only"
  }, "CRITICAL")), /*#__PURE__*/React.createElement("div", {
    className: "assimilation-stages"
  }, assimilationStages.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    className: `assim-stage assim-stage-${i + 1} stage-${i + 1}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "assim-stage-num mono"
  }, s.stage), /*#__PURE__*/React.createElement("div", {
    className: "assim-stage-name"
  }, s.name), /*#__PURE__*/React.createElement("div", {
    className: "assim-stage-level"
  }, "\u98CE\u9669\uFF1A", s.level), /*#__PURE__*/React.createElement("p", {
    className: "assim-stage-desc"
  }, s.desc)))), /*#__PURE__*/React.createElement("div", {
    className: "assim-footer-note"
  }, "IMAC \u7B2C17\u53F7\u901A\u4EE4\uFF1A\u540C\u5316\u8FDB\u5165\u7B2C\u4E09\u9636\u6BB5\u8005\uFF0C\u7ACB\u5373\u7EC8\u6B62\u4E00\u5207\u884C\u52A8\u8D44\u683C\uFF0C\u5F3A\u5236\u8FDB\u5165\u89C2\u5BDF\u4E0E\u6CBB\u7597\u7A0B\u5E8F\u3002"))))));
}
window.Walker = Walker;;
// Home Page - citizen-facing portal redesign
function HomePage() {
  const {
    navigate
  } = useRouter();
  const introFeatures = [{
    icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z M12 22V12 M2 7l10 5 10-5",
    title: "规则是绝对的",
    desc: "进入异常后必须遵守它的规则，违反就会触发惩罚。没有例外，也没有「主角光环」。"
  }, {
    icon: "M9 18l6-6-6-6",
    title: "规则是可以读懂的",
    desc: "异常的规则往往藏在细节里。通过观察和推理，普通人也能找到活下去的办法。"
  }, {
    icon: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z",
    title: "每个异常都有核心",
    desc: "异常的核心被称为「叙事锚点」——找到它、破坏它，异常就会消失。"
  }, {
    icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
    title: "有专业人员处理",
    desc: "全球有8个认证组织、1200余名专业溯界者在专门应对异常。遇到异常交给他们就好。"
  }];
  const levels = [{
    key: "ordinary",
    cn: "常规级",
    en: "ORDINARY",
    publicDesc: "规则简单明确，存活率高。普通人如果冷静应对，通常可以自行撤离。",
    color: "var(--level-ordinary)"
  }, {
    key: "hazardous",
    cn: "危险级",
    en: "HAZARDOUS",
    publicDesc: "规则复杂，容易踩坑。不要停留，尽快离开并拨打99，交给专业人员处理。",
    color: "var(--level-hazardous)"
  }, {
    key: "doomed",
    cn: "厄运级",
    en: "DOOMED",
    publicDesc: "极度危险，平民切勿靠近。这类异常死亡率极高，必须由专业团队处理。",
    color: "var(--level-doomed)"
  }, {
    key: "abyssal",
    cn: "深渊级",
    en: "ABYSSAL",
    publicDesc: "最高危等级。即使是训练有素的专业人员也难以生还。区域严格封锁。",
    color: "var(--level-abyssal)"
  }, {
    key: "unknown",
    cn: "未知级",
    en: "UNKNOWN",
    publicDesc: "信息不足，无法评估。遇到任何疑似未知级异常，立即远离并报告。",
    color: "var(--level-unknown)"
  }];
  const quickGuide = [{
    num: "01",
    icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z M12 22V12",
    title: "保持冷静",
    desc: "越慌越容易出错。先停下来，深呼吸。"
  }, {
    num: "02",
    icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 100-6 3 3 0 000 6z",
    title: "观察环境",
    desc: "注意周围有什么不对劲的地方。"
  }, {
    num: "03",
    icon: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
    title: "不要触碰异常物品",
    desc: "任何看起来反常的东西，都别碰。"
  }, {
    num: "04",
    icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
    title: "拨打99报警",
    desc: "全球通用异常热线，24小时在线。"
  }];
  const newsItems = [{
    title: "北境守望成功解决山区常规级异常",
    date: "安珀历39年·春 · 白松城",
    source: "北境守望公关部",
    desc: "白松城以南山区循环路段异常于昨日被成功解决，7名被困平民安全撤离，本次行动无溯界者伤亡。",
    level: "public"
  }, {
    title: "IMAC发布新版公民应急指南",
    date: "安珀历39年·春 · 洛林自由市",
    source: "IMAC信息协调办公室",
    desc: "国际异常管理联盟今日发布2024版公民应急指南，新增城市地铁异常应对章节，面向全球公众免费发放。",
    level: "public"
  }, {
    title: "边界研究院公布年度异常统计报告",
    date: "安珀历39年·冬 · 洛林自由市",
    source: "边界研究院BRI",
    desc: "BRI发布年度异常现象统计分析，全球异常出现频率与去年基本持平，新发现异常327起，其中常规级占比74%。",
    level: "public"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        /* HERO */
        .hp-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 65px;
          overflow: hidden;
          background: linear-gradient(135deg, #0e0e12 0%, #1a1216 50%, #16141a 100%);
        }
        .hp-hero::before {
          content: "";
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 30% 30%, rgba(196, 40, 40, 0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 70% 70%, rgba(74, 88, 104, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }
        .hp-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 70px 70px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
        }
        .hp-hero-inner { position: relative; z-index: 1; width: 100%; padding: 80px 0; }
        .hp-hero-content {
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
        }
        .hp-hero-badge {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 6px 16px;
          background-color: rgba(196, 40, 40, 0.1);
          border: 1px solid rgba(196, 40, 40, 0.3);
          margin-bottom: 28px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.15em;
          justify-content: center;
        }
        .hp-hero-badge-dot {
          width: 8px; height: 8px;
          background-color: var(--level-ordinary);
          border-radius: 50%;
          box-shadow: 0 0 6px var(--level-ordinary);
        }
        .hp-hero-title {
          font-family: var(--font-serif);
          font-size: clamp(36px, 5.5vw, 64px);
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1.2;
          letter-spacing: 0.04em;
          margin-bottom: 20px;
        }
        .hp-hero-title .accent {
          color: var(--accent-red-bright);
        }
        .hp-hero-desc {
          font-size: 17px;
          line-height: 1.8;
          color: var(--text-secondary);
          margin: 0 auto 36px;
          max-width: 580px;
        }
        .hp-hero-actions {
          display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 48px;
          justify-content: center;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px;
          background-color: var(--accent-red-bright);
          border: 2px solid var(--accent-red-bright);
          color: #fff;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          background-color: transparent;
          color: var(--accent-red-bright);
        }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px;
          background-color: transparent;
          border: 2px solid var(--text-secondary);
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          border-color: var(--text-primary);
          color: var(--text-primary);
        }
        .btn-hotline {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px;
          background-color: rgba(196, 40, 40, 0.15);
          border: 2px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-hotline:hover {
          background-color: var(--accent-red-bright);
          color: #fff;
        }
        .hp-quick-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 20px;
        }
        .hp-quick-card {
          background-color: rgba(18, 18, 22, 0.7);
          backdrop-filter: blur(4px);
          border: 1px solid var(--border-color);
          padding: 28px 32px;
          min-height: 150px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-align: center;
        }
        .hp-quick-card:hover {
          border-color: var(--accent-red-bright);
          transform: translateY(-2px);
        }
        .hp-quick-head {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-bottom: 2px;
        }
        .hp-quick-icon {
          width: 42px; height: 42px;
          color: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .hp-quick-title {
          font-family: var(--font-serif);
          font-size: 23px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .hp-quick-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .hp-quick-arrow {
          margin-top: 8px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-align: center;
        }
        .hp-hero-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-top: 56px;
          width: 100%;
        }
        .hp-stat {
          position: relative;
          background: linear-gradient(135deg, rgba(20, 14, 16, 0.85) 0%, rgba(12, 10, 14, 0.9) 100%);
          border: 1px solid rgba(120, 40, 48, 0.3);
          padding: 20px 24px;
          min-height: 88px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: default;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .hp-stat::before {
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--stat-accent, var(--accent-red-bright));
        }
        .hp-stat::after {
          content: "";
          position: absolute;
          top: 0; right: 0;
          width: 24px; height: 24px;
          border-top: 1px solid var(--stat-accent, var(--accent-red-bright));
          border-right: 1px solid var(--stat-accent, var(--accent-red-bright));
          opacity: 0.6;
        }
        .hp-stat:hover {
          border-color: var(--stat-accent, var(--accent-red-bright));
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--stat-accent, rgba(196, 40, 40, 0.2));
        }
        .hp-stat-icon {
          width: 38px; height: 38px;
          color: var(--stat-accent, var(--accent-red-bright));
          opacity: 0.85;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hp-stat-icon svg { width: 100%; height: 100%; stroke: currentColor; fill: none; stroke-width: 1.5; }
        .hp-stat-info { flex: 1; display: flex; flex-direction: column; gap: 5px; min-width: 0; }
        .hp-stat-num {
          font-family: var(--font-mono);
          font-size: 30px;
          font-weight: 700;
          color: var(--stat-accent, var(--text-primary));
          line-height: 1;
          letter-spacing: 0.02em;
        }
        .hp-stat-label {
          font-size: 12px;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          letter-spacing: 0.06em;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .hp-stat-corner {
          position: absolute;
          bottom: 6px; right: 8px;
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-tertiary);
          opacity: 0.5;
          letter-spacing: 0.15em;
        }
        .hp-scroll-indicator {
          position: absolute;
          bottom: 30px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column;
          align-items: center; gap: 8px;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
        }
        .hp-scroll-line {
          width: 1px; height: 36px;
          background: linear-gradient(to bottom, var(--text-muted), transparent);
          animation: scroll-fade 2s ease-in-out infinite;
        }
        @keyframes scroll-fade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        /* Anomaly Intro */
        .hp-section {
          padding: 90px 0;
          position: relative;
        }
        .hp-section-header {
          margin-bottom: 50px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .hp-section-title-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .hp-section-title-group.centered {
          align-items: center;
          text-align: center;
        }
        .hp-section-title-group.centered .hp-section-subtitle {
          max-width: 560px;
          margin: 0 auto;
        }
        .hp-section-label {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .hp-section-title {
          font-family: var(--font-serif);
          font-size: 42px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .hp-section-subtitle {
          font-size: 17px;
          color: var(--text-secondary);
          max-width: 500px;
          line-height: 1.7;
        }

        .intro-body {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 60px;
          align-items: start;
        }
        .intro-text p {
          font-size: 15px;
          line-height: 1.9;
          color: var(--text-secondary);
          margin-bottom: 18px;
        }
        .intro-text p strong {
          color: var(--text-primary);
          font-weight: 600;
        }
        .intro-reassurance {
          margin-top: 24px;
          padding: 20px 24px;
          background-color: rgba(74, 124, 89, 0.08);
          border: 1px solid rgba(74, 124, 89, 0.3);
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .intro-reassurance-icon {
          width: 24px; height: 24px;
          color: var(--level-ordinary);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .intro-reassurance-text {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .intro-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .intro-feature {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: border-color 0.3s ease;
        }
        .intro-feature:hover {
          border-color: var(--steel-blue-light);
        }
        .intro-feature-head {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .intro-feature-icon {
          width: 24px; height: 24px;
          color: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .intro-feature-title {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .intro-feature-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
          padding-left: 36px;
        }

        /* Levels - citizen friendly */
        .levels-citizen {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background-color: var(--border-color);
          border: 1px solid var(--border-color);
        }
        .level-card-c {
          background-color: var(--bg-card);
          padding: 28px 22px;
          border-top: 3px solid;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .level-card-c .level-name {
          font-family: var(--font-serif);
          font-size: 19px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .level-card-c .level-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }
        .level-card-c .level-public-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          flex: 1;
        }
        .levels-bottom-note {
          margin-top: 28px;
          text-align: center;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .levels-bottom-note strong {
          color: var(--accent-red-bright);
          font-weight: 600;
        }

        /* Quick guide */
        .guide-quick-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }
        .guide-quick-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 28px 24px 26px;
          text-align: left;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          overflow: hidden;
        }
        .guide-quick-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent-red-bright);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .guide-quick-card:hover {
          border-color: var(--accent-red-bright);
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(196, 40, 40, 0.15);
        }
        .guide-quick-card:hover::before { opacity: 1; }
        .guide-quick-num {
          font-family: var(--font-serif);
          font-size: 46px;
          font-weight: 700;
          color: var(--accent-red-bright);
          line-height: 1;
          opacity: 0.85;
          letter-spacing: -0.02em;
        }
        .guide-quick-title {
          font-family: var(--font-serif);
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
          margin: 0;
        }
        .guide-quick-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
        }
        .guide-full-btn-wrap {
          text-align: center;
        }

        /* Hotline section */
        .hotline-section {
          padding: 0;
          background: linear-gradient(135deg, rgba(139, 26, 26, 0.1) 0%, rgba(92, 15, 15, 0.05) 100%);
          border-top: 2px solid var(--accent-red-bright);
          border-bottom: 2px solid var(--accent-red-bright);
        }
        .hotline-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .hotline-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 40px;
          padding: 56px 0 32px;
        }
        .hotline-left {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .hotline-icon-lg {
          width: 80px; height: 80px;
          border-radius: 50%;
          background-color: rgba(196, 40, 40, 0.15);
          border: 2px solid var(--accent-red-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .hotline-icon-lg svg { width: 46px; height: 46px; }
        .hotline-text h2 {
          font-family: var(--font-serif);
          font-size: 30px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .hotline-text p {
          font-size: 16px;
          color: var(--text-secondary);
        }
        .hotline-number {
          font-family: var(--font-serif);
          font-size: 88px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
          letter-spacing: 0.05em;
        }
        .hotline-number-label {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          text-align: right;
          margin-top: 8px;
        }
        .hotline-steps {
          display: flex;
          gap: 20px;
          width: 100%;
          padding: 32px 28px 36px;
          border: 1px solid rgba(196, 40, 40, 0.3);
          background: rgba(196, 40, 40, 0.04);
          margin-top: 28px;
        }
        .hotline-step {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .hotline-step-num {
          width: 38px; height: 38px;
          border-radius: 50%;
          background-color: var(--bg-card);
          border: 1.5px solid var(--accent-red-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 15px;
          font-weight: 700;
          color: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .hotline-step-text {
          font-size: 16px;
          color: var(--text-secondary);
        }
        .hotline-step-text strong {
          color: var(--text-primary);
          display: block;
          margin-bottom: 2px;
        }
        .hotline-app-tip {
          margin-top: 16px;
          padding: 12px 20px;
          border: 1px dashed rgba(196, 40, 40, 0.35);
          background: rgba(196, 40, 40, 0.04);
          font-size: 13px;
          color: var(--text-secondary);
          text-align: center;
        }

        /* Orgs map section */
        .orgs-map-section {
          background-color: var(--bg-secondary);
        }
        .orgs-map-wrap {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 24px;
          align-items: start;
        }
        .orgs-list-side {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .orgs-list-item {
          padding: 12px 16px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.2s ease;
        }
        .orgs-list-item:hover, .orgs-list-item.active {
          border-color: var(--accent-red-bright);
          background-color: rgba(139, 26, 26, 0.05);
        }
        .orgs-list-abbr {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--steel-blue);
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--steel-blue-light);
          flex-shrink: 0;
        }
        .orgs-list-item.active .orgs-list-abbr {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }
        .orgs-list-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
        }
        .orgs-list-hq {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }

        /* News */
        .news-citizen-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .news-citizen-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          overflow: hidden;
          transition: border-color 0.3s ease;
          cursor: pointer;
        }
        .news-citizen-card:hover {
          border-color: var(--border-light);
        }
        .news-citizen-bar {
          height: 3px;
          background: linear-gradient(90deg, var(--accent-red-bright), var(--steel-blue));
        }
        .news-citizen-body {
          padding: 24px;
        }
        .news-citizen-source {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 10px;
        }
        .news-citizen-title {
          font-family: var(--font-serif);
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.5;
          margin-bottom: 10px;
        }
        .news-citizen-date {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          margin-bottom: 14px;
        }
        .news-citizen-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* About IMAC */
        .about-imac {
          background-color: var(--bg-secondary);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 30px;
          margin-top: 30px;
        }
        .about-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 32px 28px;
          position: relative;
        }
        .about-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 12px; height: 12px;
          border-top: 2px solid var(--accent-red);
          border-left: 2px solid var(--accent-red);
        }
        .about-card-num {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.15em;
          margin-bottom: 16px;
        }
        .about-card-title {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .about-card-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .about-footer-text {
          margin-top: 40px;
          text-align: center;
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Boundary Walker Intro */
        .walker-intro-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 50px;
          align-items: start;
        }
        .walker-intro-text {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.9;
          margin-bottom: 16px;
        }
        .walker-intro-text strong {
          color: var(--text-primary);
          font-weight: 600;
        }
        .walker-quote {
          position: relative;
          margin-top: 28px;
          padding: 24px 28px;
          background: rgba(139, 26, 26, 0.06);
          border-left: 3px solid var(--accent-red-bright);
        }
        .walker-quote-mark {
          font-family: var(--font-serif);
          font-size: 48px;
          color: var(--accent-red-bright);
          line-height: 0.6;
          opacity: 0.5;
          margin-bottom: 8px;
        }
        .walker-quote-text {
          font-family: var(--font-serif);
          font-size: 17px;
          font-style: italic;
          color: var(--text-primary);
          line-height: 1.7;
          margin: 0;
        }
        .walker-quote-author {
          margin-top: 12px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .walker-intro-stats {
          padding: 28px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .walker-stat-item .walker-stat-num {
          font-family: var(--font-serif);
          font-size: 42px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
          margin-bottom: 6px;
        }
        .walker-stat-item .walker-stat-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .walker-stat-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }
        .walker-stat-mini-num {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .walker-stat-mini-label {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .walker-ranks {
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }
        .walker-ranks-title {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 14px;
        }
        .walker-ranks-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }
        .walker-rank {
          padding: 5px 10px;
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          font-size: 11px;
          color: var(--text-secondary);
        }
        .walker-rank.rank-landmark {
          background: linear-gradient(90deg, rgba(122, 58, 176, 0.2), rgba(122, 58, 176, 0.05));
          border-color: #7a3ab0;
          color: #b88ed9;
          font-weight: 600;
        }
        .walker-rank-arrow {
          color: var(--text-muted);
          font-size: 11px;
        }

        @media (max-width: 1280px) {
          .hp-hero-stats-row { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .hp-quick-cards { gap: 14px; }
        }
        @media (max-width: 1024px) {
          .intro-body { grid-template-columns: 1fr; gap: 40px; }
          .levels-citizen { grid-template-columns: repeat(3, 1fr); }
          .guide-quick-grid { grid-template-columns: repeat(2, 1fr); }
          .hp-quick-cards { grid-template-columns: 1fr; }
          .orgs-map-wrap { grid-template-columns: 1fr; }
          .news-citizen-grid { grid-template-columns: 1fr; }
          .about-grid { grid-template-columns: 1fr; }
          .walker-intro-grid { grid-template-columns: 1fr; gap: 36px; }
          .hotline-number { font-size: 56px; }
        }
        @media (max-width: 768px) {
          .hp-section { padding: 60px 0; }
          .hp-section-title { font-size: 26px; }
          .hp-hero-title { font-size: 36px; }
          .hp-hero-desc { font-size: 15px; }
          .intro-features { grid-template-columns: 1fr; }
          .levels-citizen { grid-template-columns: 1fr 1fr; }
          .guide-quick-grid { grid-template-columns: 1fr 1fr; }
          .hotline-inner { flex-direction: column; align-items: flex-start; text-align: left; padding: 40px 0 24px; }
          .hotline-number { font-size: 48px; }
          .hotline-steps { flex-direction: column; gap: 14px; padding: 20px; }
          .hotline-left { flex-direction: column; align-items: flex-start; }
          .hp-hero-stats-row { grid-template-columns: 1fr 1fr; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    className: "hp-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-hero-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container hp-hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-hero-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-hero-badge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-hero-badge-dot"
  }), /*#__PURE__*/React.createElement("span", null, "IMAC \xB7 \u516C\u6C11\u5B89\u5168\u95E8\u6237")), /*#__PURE__*/React.createElement("h1", {
    className: "hp-hero-title"
  }, "\u4E86\u89E3\u5F02\u5E38\uFF0C", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "\u4FDD\u62A4\u81EA\u5DF1\u548C\u8EAB\u8FB9\u7684\u4EBA")), /*#__PURE__*/React.createElement("p", {
    className: "hp-hero-desc"
  }, "\u56FD\u9645\u5F02\u5E38\u7BA1\u7406\u8054\u76DF\uFF08IMAC\uFF09\u662F\u5168\u7403\u7EDF\u4E00\u7684\u5F02\u5E38\u7BA1\u7406\u534F\u8C03\u673A\u6784\u3002 \u6211\u4EEC\u7684\u4F7F\u547D\u662F\u8BA9\u6BCF\u4E00\u4E2A\u4EBA\u90FD\u80FD\u8BA4\u8BC6\u5F02\u5E38\u3001\u77E5\u9053\u5982\u4F55\u907F\u9669\u3001\u5E76\u5728\u9700\u8981\u65F6\u83B7\u5F97\u4E13\u4E1A\u5E2E\u52A9\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "hp-hero-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => navigate("/guide")
  }, "\u67E5\u770B\u5E94\u6025\u6307\u5357", /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14 M12 5l7 7-7 7"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "btn-hotline",
    onClick: () => {
      const el = document.getElementById("hotline-section");
      if (el) el.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
  })), "\u5F02\u5E38\u70ED\u7EBF 99")), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-cards"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-card",
    onClick: () => {
      const el = document.getElementById("anomaly-intro");
      if (el) el.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-head"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "hp-quick-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
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
  })), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-title"
  }, "\u4EC0\u4E48\u662F\u5F02\u5E38\uFF1F")), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-desc"
  }, "\u8BA4\u8BC6\u5F02\u5E38\u7684\u56DB\u4E2A\u6838\u5FC3\u7279\u5F81\uFF0C\u544A\u522B\u6050\u60E7\u4E0E\u8BEF\u89E3"), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-arrow"
  }, "\u4E86\u89E3\u66F4\u591A \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-card",
    onClick: () => navigate("/guide")
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-head"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "hp-quick-icon",
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
  })), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-title"
  }, "\u9047\u5230\u5F02\u5E38\u600E\u4E48\u529E\uFF1F")), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-desc"
  }, "\u6838\u5FC3\u5341\u6761\u6307\u5357\uFF0C\u5173\u952E\u65F6\u523B\u80FD\u6551\u547D"), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-arrow"
  }, "\u67E5\u770B\u6307\u5357 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-card",
    onClick: () => {
      const el = document.getElementById("hotline-section");
      if (el) el.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-head"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "hp-quick-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-title"
  }, "\u5F02\u5E38\u70ED\u7EBF 99")), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-desc"
  }, "24\u5C0F\u65F6\u5168\u7403\u901A\u7528\uFF0C\u514D\u8D39\uFF0C\u65E0\u9700\u533A\u53F7"), /*#__PURE__*/React.createElement("div", {
    className: "hp-quick-arrow"
  }, "\u7ACB\u5373\u62E8\u6253 \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "hp-hero-stats-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat",
    style: {
      '--stat-accent': '#c42828'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2L2 7l10 5 10-5-10-5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 17l10 5 10-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 12l10 5 10-5"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-num"
  }, "20,000+"), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-label"
  }, "\u5DF2\u8BB0\u5F55\u5F02\u5E38")), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-corner"
  }, "ANO-001")), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat",
    style: {
      '--stat-accent': '#6b8cae'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 21v-2a4 4 0 00-3-3.87"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 3.13a4 4 0 010 7.75"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-num"
  }, "8"), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-label"
  }, "\u8BA4\u8BC1\u6210\u5458\u7EC4\u7EC7")), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-corner"
  }, "ORG-008")), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat",
    style: {
      '--stat-accent': '#d4902e'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-num"
  }, "1,247"), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-label"
  }, "\u5728\u518C\u6EAF\u754C\u8005")), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-corner"
  }, "WKR-1247")), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat",
    style: {
      '--stat-accent': '#4a7c59'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0022 16.92z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-num"
  }, "99"), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-label"
  }, "\u5168\u7403\u7EDF\u4E00\u70ED\u7EBF")), /*#__PURE__*/React.createElement("div", {
    className: "hp-stat-corner"
  }, "HOTLINE"))))), /*#__PURE__*/React.createElement("div", {
    className: "hp-scroll-indicator"
  }, /*#__PURE__*/React.createElement("span", null, "SCROLL"), /*#__PURE__*/React.createElement("div", {
    className: "hp-scroll-line"
  }))), /*#__PURE__*/React.createElement("section", {
    id: "anomaly-intro",
    className: "hp-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-title-group centered"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-section-label"
  }, "01 / WHAT IS ANOMALY"), /*#__PURE__*/React.createElement("h2", {
    className: "hp-section-title"
  }, "\u8BA4\u8BC6\u5F02\u5E38")), /*#__PURE__*/React.createElement("p", {
    className: "hp-section-subtitle"
  }, "\u5F02\u5E38\u4E0D\u662F\u8D85\u81EA\u7136\u73B0\u8C61\uFF0C\u4E5F\u4E0D\u662F\u90FD\u5E02\u4F20\u8BF4\u3002\u5B83\u4EEC\u662F\u53EF\u6D4B\u91CF\u3001\u53EF\u7814\u7A76\u3001\u53EF\u5E94\u5BF9\u7684\u5BA2\u89C2\u5B58\u5728\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "intro-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "intro-text"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "\u5F02\u5E38"), "\u662F\u7A81\u7136\u51FA\u73B0\u5728\u73B0\u5B9E\u4E16\u754C\u4E2D\u7684\u300C\u89C4\u5219\u5C01\u95ED\u7A7A\u95F4\u300D\u3002 \u5B83\u4EEC\u53EF\u80FD\u662F\u4E00\u5EA7\u51ED\u7A7A\u51FA\u73B0\u7684\u5EFA\u7B51\u3001\u4E00\u6761\u8D70\u4E0D\u51FA\u53BB\u7684\u8857\u9053\u3001\u4E00\u4E2A\u4E0D\u65AD\u5FAA\u73AF\u7684\u5730\u94C1\u7AD9\u53F0\u3002"), /*#__PURE__*/React.createElement("p", null, "\u6BCF\u4E00\u4E2A\u5F02\u5E38\u5185\u90E8\u90FD\u6709\u81EA\u5DF1\u7684\u89C4\u5219\u3002\u8FDB\u5165\u8005\u5FC5\u987B\u9075\u5B88\u8FD9\u4E9B\u89C4\u5219\uFF0C \u8FDD\u53CD\u5C31\u4F1A\u89E6\u53D1\u60E9\u7F5A\u2014\u2014\u4ECE\u8EAB\u4F53\u4E0D\u9002\u5230\u76F4\u63A5\u6D88\u5931\uFF0C\u4E25\u91CD\u7A0B\u5EA6\u56E0\u5F02\u5E38\u800C\u5F02\u3002"), /*#__PURE__*/React.createElement("p", null, "\u597D\u6D88\u606F\u662F\uFF1A", /*#__PURE__*/React.createElement("strong", null, "\u5F02\u5E38\u662F\u53EF\u4EE5\u88AB\u7406\u89E3\u3001\u88AB\u89E3\u51B3\u7684"), "\u3002 \u5168\u7403\u6709\u4E13\u4E1A\u7684\u56E2\u961F\u5728\u7814\u7A76\u5F02\u5E38\u3001\u5E94\u5BF9\u5F02\u5E38\u3002\u666E\u901A\u4EBA\u53EA\u8981\u638C\u63E1\u6B63\u786E\u7684\u77E5\u8BC6\uFF0C \u7EDD\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u90FD\u80FD\u5B89\u5168\u64A4\u79BB\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "intro-reassurance"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "intro-reassurance-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 11.08V12a10 10 0 11-5.93-9.14"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "22 4 12 14.01 9 11.01"
  })), /*#__PURE__*/React.createElement("p", {
    className: "intro-reassurance-text"
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--level-ordinary)"
    }
  }, "\u8BF7\u8BB0\u4F4F\uFF1A"), "\u5927\u591A\u6570\u5F02\u5E38\u662F\u5E38\u89C4\u7EA7\uFF0C\u666E\u901A\u4EBA\u51B7\u9759\u5E94\u5BF9\u5C31\u6709\u5F88\u5927\u673A\u4F1A\u5B89\u5168\u64A4\u79BB\u3002 \u9047\u5230\u5F02\u5E38\u4E0D\u8981\u614C\uFF0C\u5148\u62E8\u625399\uFF0C\u4E13\u4E1A\u4EBA\u5458\u4F1A\u6765\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "intro-features"
  }, introFeatures.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "intro-feature"
  }, /*#__PURE__*/React.createElement("div", {
    className: "intro-feature-head"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "intro-feature-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: f.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "intro-feature-title"
  }, f.title)), /*#__PURE__*/React.createElement("p", {
    className: "intro-feature-desc"
  }, f.desc))))))), /*#__PURE__*/React.createElement("section", {
    className: "hp-section",
    style: {
      backgroundColor: "var(--bg-secondary)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-section-label"
  }, "02 / THREAT LEVEL"), /*#__PURE__*/React.createElement("h2", {
    className: "hp-section-title"
  }, "\u5F02\u5E38\u6709\u591A\u5371\u9669\uFF1F")), /*#__PURE__*/React.createElement("p", {
    className: "hp-section-subtitle"
  }, "IMAC\u5C06\u5F02\u5E38\u5206\u4E3A\u4E94\u4E2A\u5371\u9669\u7B49\u7EA7\u3002\u5BF9\u666E\u901A\u4EBA\u6765\u8BF4\uFF0C\u4E86\u89E3\u7B49\u7EA7\u610F\u5473\u7740\u77E5\u9053\u5E94\u8BE5\u8FDC\u79BB\u5230\u4EC0\u4E48\u7A0B\u5EA6\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "levels-citizen"
  }, levels.map(lv => /*#__PURE__*/React.createElement("div", {
    key: lv.key,
    className: "level-card-c",
    style: {
      borderTopColor: lv.color
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "level-en"
  }, lv.en), /*#__PURE__*/React.createElement("div", {
    className: "level-name",
    style: {
      color: lv.color
    }
  }, lv.cn), /*#__PURE__*/React.createElement("p", {
    className: "level-public-desc"
  }, lv.publicDesc)))), /*#__PURE__*/React.createElement("div", {
    className: "levels-bottom-note"
  }, /*#__PURE__*/React.createElement("strong", null, "\u65E0\u8BBA\u54EA\u4E2A\u7B49\u7EA7\uFF0C\u53D1\u73B0\u5F02\u5E38\u8BF7\u7ACB\u5373\u8FDC\u79BB\u5E76\u62E8\u6253 99\u3002"), /*#__PURE__*/React.createElement("br", null), "\u4E0D\u8981\u597D\u5947\u3001\u4E0D\u8981\u9760\u8FD1\u3001\u4E0D\u8981\u62CD\u7167\u53D1\u793E\u4EA4\u5A92\u4F53\u2014\u2014\u4F60\u7684\u5B89\u5168\u6BD4\u4EC0\u4E48\u90FD\u91CD\u8981\u3002"))), /*#__PURE__*/React.createElement("section", {
    className: "hp-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-title-group centered"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-section-label"
  }, "03 / EMERGENCY GUIDE"), /*#__PURE__*/React.createElement("h2", {
    className: "hp-section-title"
  }, "\u9047\u5230\u5F02\u5E38\u600E\u4E48\u529E\uFF1F")), /*#__PURE__*/React.createElement("p", {
    className: "hp-section-subtitle"
  }, "\u8BB0\u4F4F\u8FD9\u56DB\u6B65\uFF0C\u5173\u952E\u65F6\u523B\u80FD\u6551\u547D\u3002\u5B8C\u6574\u7248\u5341\u6761\u8BF7\u67E5\u770B\u5E94\u6025\u6307\u5357\u8BE6\u60C5\u9875\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "guide-quick-grid"
  }, quickGuide.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.num,
    className: "guide-quick-card",
    onClick: () => navigate("/guide")
  }, /*#__PURE__*/React.createElement("div", {
    className: "guide-quick-num"
  }, "0", g.num), /*#__PURE__*/React.createElement("h3", {
    className: "guide-quick-title"
  }, g.title), /*#__PURE__*/React.createElement("p", {
    className: "guide-quick-desc"
  }, g.desc)))), /*#__PURE__*/React.createElement("div", {
    className: "guide-full-btn-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    onClick: () => navigate("/guide")
  }, "\u67E5\u770B\u5B8C\u6574\u5341\u6761\u5E94\u6025\u6307\u5357 \u2192")))), /*#__PURE__*/React.createElement("section", {
    id: "hotline-section",
    className: "hotline-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-icon-lg"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hotline-text"
  }, /*#__PURE__*/React.createElement("h2", null, "\u53D1\u73B0\u7591\u4F3C\u5F02\u5E38\uFF1F\u4FDD\u6301\u8DDD\u79BB\uFF0C\u7ACB\u5373\u62E8\u6253"), /*#__PURE__*/React.createElement("p", null, "\u6240\u6709\u88AB\u6536\u7F16\u7EC4\u7EC7\u5F00\u8BBE24\u5C0F\u65F6\u5F02\u5E38\u70ED\u7EBF\uFF0C\u53F7\u7801\u300C99\u300D\u5F00\u5934\uFF0C\u5168\u7403\u901A\u7528\u524D\u7F00"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hotline-number"
  }, "99"), /*#__PURE__*/React.createElement("div", {
    className: "hotline-number-label"
  }, "ANOMALY EMERGENCY HOTLINE"))), /*#__PURE__*/React.createElement("div", {
    className: "hotline-steps"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-num"
  }, "1"), /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-text"
  }, /*#__PURE__*/React.createElement("strong", null, "\u4FDD\u6301\u8DDD\u79BB\uFF0C\u4E0D\u8981\u89E6\u78B0"), "\u8FDC\u79BB\u5F02\u5E38\u533A\u57DF\uFF0C\u5207\u52FF\u89E6\u78B0\u4EFB\u4F55\u5F02\u5E38\u7269\u54C1")), /*#__PURE__*/React.createElement("div", {
    className: "hotline-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-num"
  }, "2"), /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-text"
  }, /*#__PURE__*/React.createElement("strong", null, "\u62E8\u6253\u5F02\u5E38\u70ED\u7EBF"), "\u63D0\u4F9B\u4F4D\u7F6E\u548C\u5916\u89C2\u63CF\u8FF0\uFF0C\u542C\u4ECE\u63A5\u7EBF\u5458\u6307\u5F15")), /*#__PURE__*/React.createElement("div", {
    className: "hotline-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-num"
  }, "3"), /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-text"
  }, /*#__PURE__*/React.createElement("strong", null, "\u6309\u6307\u5F15\u64A4\u79BB"), "\u4F9D\u7167\u63A5\u7EBF\u5458\u6307\u793A\u64A4\u79BB\u81F3\u5B89\u5168\u533A\u57DF")), /*#__PURE__*/React.createElement("div", {
    className: "hotline-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-num"
  }, "4"), /*#__PURE__*/React.createElement("div", {
    className: "hotline-step-text"
  }, /*#__PURE__*/React.createElement("strong", null, "\u4E0D\u4F20\u64AD\u4F4D\u7F6E\u4FE1\u606F"), "\u4E0D\u5411\u4ED6\u4EBA\u900F\u9732\u5F02\u5E38\u7684\u5177\u4F53\u4F4D\u7F6E"))), /*#__PURE__*/React.createElement("div", {
    className: "hotline-app-tip"
  }, "\u5B89\u73C0\u538630\u5E74\u540E\uFF0C\u90E8\u5206\u57CE\u5E02\u8BD5\u70B9\u300C\u5F02\u5E38\u9884\u8B66APP\u300D\uFF0C\u5B9E\u65F6\u63A8\u9001\u5468\u8FB9\u5F02\u5E38\u98CE\u9669\u8BC4\u4F30\u3002"))), /*#__PURE__*/React.createElement("section", {
    id: "news",
    className: "hp-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-section-label"
  }, "04 / NEWS CENTER"), /*#__PURE__*/React.createElement("h2", {
    className: "hp-section-title"
  }, "\u6700\u65B0\u52A8\u6001")), /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: "pointer",
      color: "var(--accent-red-bright)",
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      letterSpacing: "0.1em"
    },
    onClick: () => navigate("/news")
  }, "\u67E5\u770B\u66F4\u591A \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "news-citizen-grid"
  }, newsItems.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "news-citizen-card",
    onClick: () => navigate("/news")
  }, /*#__PURE__*/React.createElement("div", {
    className: "news-citizen-bar"
  }), /*#__PURE__*/React.createElement("div", {
    className: "news-citizen-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "news-citizen-source"
  }, n.source.toUpperCase()), /*#__PURE__*/React.createElement("h3", {
    className: "news-citizen-title"
  }, n.title), /*#__PURE__*/React.createElement("div", {
    className: "news-citizen-date"
  }, n.date), /*#__PURE__*/React.createElement("p", {
    className: "news-citizen-desc"
  }, n.desc))))))), /*#__PURE__*/React.createElement("section", {
    id: "boundary-walker",
    className: "hp-section",
    style: {
      backgroundColor: "var(--bg-secondary)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-section-label"
  }, "05 / BOUNDARY WALKER"), /*#__PURE__*/React.createElement("h2", {
    className: "hp-section-title"
  }, "\u6EAF\u754C\u8005")), /*#__PURE__*/React.createElement("p", {
    className: "hp-section-subtitle"
  }, "\u6CA1\u6709\u8D85\u80FD\u529B\uFF0C\u6CA1\u6709\u7279\u6B8A\u88C5\u5907\u2014\u2014\u4ED6\u4EEC\u4EE5\u4E25\u683C\u8BAD\u7EC3\u548C\u4EBA\u6027\u4E3A\u951A\u70B9\uFF0C\u6CBF\u7740\u5F02\u5E38\u7684\u8109\u7EDC\u8FFD\u6EAF\u6E90\u5934\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "walker-intro-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-intro-main"
  }, /*#__PURE__*/React.createElement("p", {
    className: "walker-intro-text"
  }, /*#__PURE__*/React.createElement("strong", null, "\u6EAF\u754C\u8005"), "\u662F\u4E13\u95E8\u5904\u7406\u5F02\u5E38\u4E8B\u4EF6\u7684\u4E13\u4E1A\u4EBA\u5458\u3002\u4ED6\u4EEC\u4E0D\u662F\u8D85\u4EBA\uFF0C\u4E5F\u6CA1\u6709\u8D85\u80FD\u529B\u2014\u2014 \u4ED6\u4EEC\u53EA\u662F\u7ECF\u8FC7\u6700\u4E25\u82DB\u8BAD\u7EC3\u3001\u6700\u6E05\u695A\u5F02\u5E38\u89C4\u5219\u3001\u6700\u61C2\u5F97\u5982\u4F55\u6D3B\u7740\u8D70\u51FA\u6765\u7684\u666E\u901A\u4EBA\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "walker-intro-text"
  }, "\u6BCF\u4E00\u6B21\u8FDB\u5165\u5F02\u5E38\uFF0C\u4ED6\u4EEC\u90FD\u8D70\u5728\u5DF2\u77E5\u89C4\u5219\u7684\u8FB9\u7F18\u3002\u4ED6\u4EEC\u7684\u5DE5\u4F5C\u4E0D\u662F\u8DE8\u8D8A\u8FB9\u754C\uFF0C \u800C\u662F\u8FFD\u6EAF\u8FB9\u754C\u2014\u2014\u627E\u5230\u5F02\u5E38\u7684\u6E90\u5934\uFF0C\u6478\u6E05\u5B83\u7684\u89C4\u5219\uFF0C\u7136\u540E\u628A\u6DF1\u6E0A\u7684\u6765\u8DEF\uFF0C\u8D70\u6210\u5F52\u9014\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "walker-quote"
  }, /*#__PURE__*/React.createElement("p", {
    className: "walker-quote-text"
  }, "\u6211\u4EEC\u4E0D\u662F\u5728\u8DE8\u8D8A\u8FB9\u754C\uFF0C\u6211\u4EEC\u662F\u5728\u8FFD\u6EAF\u8FB9\u754C\u2014\u2014\u628A\u6DF1\u6E0A\u6765\u8DEF\uFF0C\u8D70\u6210\u5F52\u9014\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "walker-quote-author"
  }, "\u2014 \u827E\u4F26\xB7\u7EF4\u65AF\u7279\uFF0C\u9996\u4EFB IMAC \u884C\u52A8\u603B\u534F\u8C03\u5B98"))), /*#__PURE__*/React.createElement("div", {
    className: "walker-intro-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-num"
  }, "1,247"), /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-label"
  }, "\u5168\u7403\u5728\u518C\u6EAF\u754C\u8005")), /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini-num"
  }, "38%"), /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini-label"
  }, "\u519B\u8B66\u80CC\u666F")), /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini-num"
  }, "42%"), /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini-label"
  }, "\u793E\u4F1A\u62DB\u52DF")), /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini-num"
  }, "20%"), /*#__PURE__*/React.createElement("div", {
    className: "walker-stat-mini-label"
  }, "\u5B66\u672F\u79D1\u7814"))), /*#__PURE__*/React.createElement("div", {
    className: "walker-ranks"
  }, /*#__PURE__*/React.createElement("div", {
    className: "walker-ranks-title"
  }, "\u804C\u7EA7\u4F53\u7CFB"), /*#__PURE__*/React.createElement("div", {
    className: "walker-ranks-list"
  }, /*#__PURE__*/React.createElement("span", {
    className: "walker-rank"
  }, "\u89C1\u4E60"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank-arrow"
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank"
  }, "\u6EAF\u754C\u8005"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank-arrow"
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank"
  }, "\u8D44\u6DF1"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank-arrow"
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank"
  }, "\u9996\u5E2D"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank-arrow"
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    className: "walker-rank rank-landmark"
  }, "\u754C\u6807"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: "36px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => navigate("/join")
  }, "\u4E86\u89E3\u66F4\u591A / \u52A0\u5165\u6211\u4EEC", /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14 M12 5l7 7-7 7"
  })))))), /*#__PURE__*/React.createElement("section", {
    id: "organizations",
    className: "hp-section orgs-map-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-section-label"
  }, "06 / MEMBER ORGANIZATIONS"), /*#__PURE__*/React.createElement("h2", {
    className: "hp-section-title"
  }, "\u5168\u7403\u6210\u5458\u7EC4\u7EC7")), /*#__PURE__*/React.createElement("p", {
    className: "hp-section-subtitle"
  }, "\u516B\u4E2A\u8BA4\u8BC1\u6210\u5458\u7EC4\u7EC7\u8986\u76D6\u5168\u7403\u4E3B\u8981\u5F02\u5E38\u9AD8\u53D1\u533A\u57DF\uFF0C\u968F\u65F6\u54CD\u5E94\u3002")), /*#__PURE__*/React.createElement(OrganizationsMap, {
    compact: true,
    onOrgClick: org => navigate(`/org/${org.slug}`)
  }))), /*#__PURE__*/React.createElement("section", {
    id: "about-imac",
    className: "hp-section about-imac"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-section-label"
  }, "07 / ABOUT IMAC"), /*#__PURE__*/React.createElement("h2", {
    className: "hp-section-title"
  }, "\u5173\u4E8E\u56FD\u9645\u5F02\u5E38\u7BA1\u7406\u8054\u76DF"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "16px",
      color: "var(--text-secondary)",
      lineHeight: "1.9",
      maxWidth: "780px",
      margin: "0 auto 40px",
      textAlign: "center"
    }
  }, "IMAC \u662F\u5168\u7403\u7EDF\u4E00\u7684\u5F02\u5E38\u7BA1\u7406\u534F\u8C03\u673A\u6784\u3002\u6211\u4EEC\u4E0D\u76F4\u63A5\u5904\u7406\u5F02\u5E38\u2014\u2014 \u6211\u4EEC\u5236\u5B9A\u6807\u51C6\u3001\u534F\u8C03\u8D44\u6E90\u3001\u5EFA\u7ACB\u4FE1\u606F\u5171\u4EAB\u673A\u5236\uFF0C\u8BA9\u5168\u4E16\u754C\u7684\u4E13\u4E1A\u529B\u91CF\u80FD\u591F\u9AD8\u6548\u534F\u4F5C\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "about-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-card-num"
  }, "MISSION \xB7 01"), /*#__PURE__*/React.createElement("div", {
    className: "about-card-title"
  }, "\u4FE1\u606F\u65E0\u6761\u4EF6\u5171\u4EAB"), /*#__PURE__*/React.createElement("p", {
    className: "about-card-desc"
  }, "\u6240\u6709\u8BA4\u8BC1\u7EC4\u7EC7\u5FC5\u987B\u5171\u4EAB\u5F02\u5E38\u6570\u636E\u4E0E\u7814\u7A76\u6210\u679C\u3002 \u4FE1\u606F\u58C1\u5792\u662F\u6700\u5927\u7684\u654C\u4EBA\u2014\u2014\u6BCF\u4E00\u6B21\u9690\u7792\uFF0C\u90FD\u53EF\u80FD\u8BA9\u66F4\u591A\u4EBA\u4ED8\u51FA\u751F\u547D\u7684\u4EE3\u4EF7\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "about-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-card-num"
  }, "STANDARD \xB7 02"), /*#__PURE__*/React.createElement("div", {
    className: "about-card-title"
  }, "\u6807\u51C6\u65E0\u6761\u4EF6\u7EDF\u4E00"), /*#__PURE__*/React.createElement("p", {
    className: "about-card-desc"
  }, "\u7EDF\u4E00\u7684\u5F02\u5E38\u8BC4\u7EA7\u3001\u7EDF\u4E00\u7684\u5E94\u5BF9\u6D41\u7A0B\u3001\u7EDF\u4E00\u7684\u4FE1\u606F\u62AB\u9732\u89C4\u8303\u3002 \u65E0\u8BBA\u4F60\u5728\u4E16\u754C\u7684\u54EA\u4E2A\u89D2\u843D\uFF0C\u9047\u5230\u5F02\u5E38\u65F6\u9762\u5BF9\u7684\u90FD\u662F\u540C\u4E00\u5957\u4E13\u4E1A\u4F53\u7CFB\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "about-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-card-num"
  }, "COOPERATION \xB7 03"), /*#__PURE__*/React.createElement("div", {
    className: "about-card-title"
  }, "\u54CD\u5E94\u65E0\u6761\u4EF6\u534F\u4F5C"), /*#__PURE__*/React.createElement("p", {
    className: "about-card-desc"
  }, "\u8DE8\u56FD\u5F02\u5E38\u4E8B\u4EF6\u4E2D\uFF0C\u6240\u6709\u7EC4\u7EC7\u5FC5\u987B\u670D\u4ECEIMAC\u7EDF\u4E00\u8C03\u5EA6\u3002 \u56FD\u754C\u548C\u653F\u6CBB\u5728\u4EBA\u7684\u751F\u547D\u9762\u524D\uFF0C\u6C38\u8FDC\u6392\u5728\u7B2C\u4E8C\u4F4D\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "about-footer-text"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: "pointer",
      color: "var(--accent-red-bright)",
      borderBottom: "1px solid var(--accent-red-bright)",
      paddingBottom: "2px"
    },
    onClick: () => navigate("/organizations")
  }, "\u67E5\u770B\u5168\u74038\u4E2A\u8BA4\u8BC1\u6210\u5458\u7EC4\u7EC7 \u2192")))));
}
window.HomePage = HomePage;;
// Emergency Guide page - full 10 rules
function GuidePage() {
  const {
    navigate
  } = useRouter();
  const rules = [{
    num: "01",
    title: "保持冷静，不要跑",
    desc: "异常的规则无法用物理方式逃脱——盲目奔跑只会让你更快触发惩罚。停下来的第一步，是给自己争取思考的时间。",
    icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z M12 22V12"
  }, {
    num: "02",
    title: "观察你周围的环境",
    desc: "异常的规则往往写在你能看到的地方：墙上的文字、地板的图案、物体的摆放方式、NPC的言谈举止。你进入的每一个空间都在告诉你什么「可以做」和什么「不可以做」。",
    icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 100-6 3 3 0 000 6z"
  }, {
    num: "03",
    title: "不要碰明显异常的东西",
    desc: "你看到一扇不该出现的门、一把不该存在的钥匙、一个在动但没有生命的东西——不要碰。很多时候，「触碰」本身就是触发惩罚的条件。",
    icon: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0"
  }, {
    num: "04",
    title: "规则不需要解释",
    desc: "异常内部的规则不会讲道理。它只是「存在」——你必须遵守它，不管你理解不理解。不要浪费精力去质疑规则是否合理，去「寻找」规则是否可以被违抗。先把规则记下来，理解它的边界，再考虑是否有空隙。",
    icon: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"
  }, {
    num: "05",
    title: "尝试与其他被困者交流",
    desc: "异常内通常不止你一个人。交换信息是活下去最重要的方式——你看到的东西可能是别人没注意到的，反之亦然。但请注意：有些人可能不是「人」（见第七条）。",
    icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75"
  }, {
    num: "06",
    title: "不要主动伤害他人",
    desc: "在异常内部，伤害他人可能触发某种规则——尤其是异常中的NPC。除非你确信「攻击」是该异常规则框架内被允许的行为，否则不要主动动手。",
    icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
  }, {
    num: "07",
    title: "区分「NPC」",
    desc: "异常内部的「NPC」看起来和你一样——会说话、会走动、会恐惧、会哭泣。但他们不是人。他们遵循异常的规则行动，在某些情况下，他们会诱导你违规。如果你无法判断一个「人」是真正的被困者还是NPC，可以尝试问一个和外部现实相关的问题——NPC的回答往往会出现细节上的破绽。",
    icon: "M3 18v-6a9 9 0 0118 0v6 M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"
  }, {
    num: "08",
    title: "保存体力，等待救援",
    desc: "异常内部的时间流速可能与外界不同。你感觉过了三天，外面可能只过了几个小时。专业的溯界者已经在路上了——前提是你或其他人成功把异常的位置传了出去。如果你在进入异常时没有通知外界，你的第一优先级应该是「找到向外传递信息的方式」。",
    icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
  }, {
    num: "09",
    title: "如果看到「出口」，先观察再通过",
    desc: "异常的出口可能是真的出口，也可能是陷阱。异常的规则中有一条「通用例外」——在绝大多数已知异常中，出口不会藏在「看起来太像出口」的地方。如果一扇门出现在你本该不该出现的位置，上面写着「出口」或「离开」，先不要推。",
    icon: "M3 21V3h18v18H3z M8 21V9h8v12"
  }, {
    num: "10",
    title: "活下来，然后告诉别人你看到了什么",
    desc: "如果你活着离开了异常，你拥有这个世界上最珍贵的东西——信息。把你的经历告诉专业人员（异常热线或溯界者组织），每一个细节都可能拯救后来的人。",
    icon: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .guide-page-hero {
          padding-top: 120px;
          padding-bottom: 50px;
          background: linear-gradient(180deg, #0e0e12 0%, #130f12 100%);
          border-bottom: 1px solid var(--border-color);
          text-align: center;
        }
        .guide-page-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          margin-bottom: 14px;
        }
        .guide-page-title {
          font-family: var(--font-serif);
          font-size: 40px;
          font-weight: 900;
          color: var(--text-primary);
          margin-bottom: 16px;
        }
        .guide-page-subtitle {
          font-size: 15px;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.8;
        }
        .guide-hotline-banner {
          margin: 30px auto 0;
          max-width: 500px;
          padding: 16px 24px;
          background-color: rgba(196, 40, 40, 0.1);
          border: 2px solid var(--accent-red-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .guide-hotline-num {
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
        }
        .guide-hotline-text {
          text-align: left;
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .guide-hotline-text strong { color: var(--text-primary); display: block; font-size: 14px; }

        .guide-content {
          padding: 60px 0 80px;
        }
        .guide-rules-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 40px;
        }
        .guide-rule-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 28px 24px;
          display: flex;
          gap: 20px;
          transition: all 0.3s ease;
        }
        .guide-rule-card:hover {
          border-color: var(--border-light);
        }
        .guide-rule-num-wrap {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .guide-rule-num {
          font-family: var(--font-mono);
          font-size: 24px;
          font-weight: 700;
          color: var(--accent-red-bright);
          line-height: 1;
        }
        .guide-rule-icon {
          width: 36px; height: 36px;
          color: var(--text-secondary);
        }
        .guide-rule-content { flex: 1; }
        .guide-rule-title {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .guide-rule-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .guide-warning-box {
          margin-top: 50px;
          padding: 28px;
          background: linear-gradient(135deg, rgba(196, 40, 40, 0.08), rgba(196, 40, 40, 0.02));
          border: 1px solid rgba(196, 40, 40, 0.3);
          text-align: center;
        }
        .guide-warning-box h3 {
          font-family: var(--font-serif);
          font-size: 22px;
          color: var(--accent-red-bright);
          margin-bottom: 12px;
        }
        .guide-warning-box p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .guide-rules-grid { grid-template-columns: 1fr; }
          .guide-page-title { font-size: 32px; }
          .guide-rule-card { flex-direction: column; gap: 12px; }
          .guide-rule-num-wrap { flex-direction: row; }
        }

        .guide-back-home-wrap {
          text-align: center;
          margin-top: 48px;
          padding-bottom: 40px;
        }
        .guide-back-home {
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
        .guide-back-home:hover {
          background-color: var(--accent-red-bright);
          color: #fff;
        }
      `), /*#__PURE__*/React.createElement("section", {
    className: "guide-page-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "guide-page-label"
  }, "EMERGENCY GUIDE \xB7 \u5E94\u6025\u6307\u5357"), /*#__PURE__*/React.createElement("h1", {
    className: "guide-page-title"
  }, "\u516C\u6C11\u5F02\u5E38\u5E94\u6025\u6307\u5357"), /*#__PURE__*/React.createElement("p", {
    className: "guide-page-subtitle"
  }, "\u5B89\u73C0\u538616\u5E74\uFF0C\u683C\u4F26\u8D1D\u5C14\u8054\u90A6\u53D1\u5E03\u4E86\u9996\u4EFD\u300A\u516C\u6C11\u5F02\u5E38\u5B89\u5168\u6307\u5357\u300B\u3002\u6B64\u540E\u5404\u56FD\u9646\u7EED\u53D1\u5E03\u672C\u5730\u5316\u7248\u672C\uFF0C IMAC\u5728\u5B89\u73C0\u538625\u5E74\u63A8\u51FA\u4E86\u7EDF\u4E00\u7684\u300C\u6838\u5FC3\u5341\u6761\u300D\uFF0C\u4F5C\u4E3A\u5168\u7403\u901A\u7528\u7684\u5F02\u5E38\u5E94\u6025\u57FA\u7840\u539F\u5219\u3002 \u4EE5\u4E0B\u5185\u5BB9\u4EE5\u7B80\u660E\u7684\u56FE\u6587\u5F62\u5F0F\u51FA\u73B0\u5728\u5404\u56FD\u7684\u516C\u5171\u573A\u6240\u4FE1\u606F\u680F\u3001\u624B\u673A\u63A8\u9001\u3001 \u4EE5\u53CA\u5F02\u5E38\u9884\u8B66APP\u7684\u5F00\u5C4F\u9875\u9762\u4E0A\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "guide-hotline-banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "guide-hotline-num"
  }, "99"), /*#__PURE__*/React.createElement("div", {
    className: "guide-hotline-text"
  }, /*#__PURE__*/React.createElement("strong", null, "\u5168\u7403\u5F02\u5E38\u5E94\u6025\u70ED\u7EBF"), "24\u5C0F\u65F6 \xB7 \u514D\u8D39 \xB7 \u65E0\u9700\u533A\u53F7 \xB7 \u4EFB\u4F55\u624B\u673A\u5747\u53EF\u63A5\u901A")))), /*#__PURE__*/React.createElement("section", {
    className: "guide-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      color: "var(--text-tertiary)",
      letterSpacing: "0.2em"
    }
  }, "TEN CORE PRINCIPLES \xB7 \u5341\u6761\u6838\u5FC3\u539F\u5219")), /*#__PURE__*/React.createElement("div", {
    className: "guide-rules-grid"
  }, rules.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.num,
    className: "guide-rule-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "guide-rule-num-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "guide-rule-num"
  }, r.num), /*#__PURE__*/React.createElement("svg", {
    className: "guide-rule-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: r.icon
  }))), /*#__PURE__*/React.createElement("div", {
    className: "guide-rule-content"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "guide-rule-title"
  }, r.title), /*#__PURE__*/React.createElement("p", {
    className: "guide-rule-desc"
  }, r.desc))))), /*#__PURE__*/React.createElement("div", {
    className: "guide-warning-box"
  }, /*#__PURE__*/React.createElement("h3", null, "\u8BF7\u8BB0\u4F4F\uFF1A\u4F60\u4E0D\u9700\u8981\u89E3\u51B3\u5F02\u5E38"), /*#__PURE__*/React.createElement("p", null, "\u666E\u901A\u4EBA\u9047\u5230\u5F02\u5E38\uFF0C\u552F\u4E00\u8981\u505A\u7684\u5C31\u662F\u4FDD\u6301\u51B7\u9759\u3001\u786E\u4FDD\u81EA\u5DF1\u5B89\u5168\u3001\u7136\u540E\u62E8\u625399\u3002 \u89E3\u51B3\u5F02\u5E38\u662F\u4E13\u4E1A\u6EAF\u754C\u8005\u7684\u5DE5\u4F5C\u3002\u4F60\u7684\u5B89\u5168\u6BD4\u4EFB\u4F55\u4E1C\u897F\u90FD\u91CD\u8981\u2014\u2014 \u5305\u62EC\u597D\u5947\u5FC3\u3001\u5305\u62EC\u88AB\u56F0\u7684\u670B\u53CB\u3001\u5305\u62EC\u4F60\u4EE5\u4E3A\u4F60\u80FD\u5E2E\u4E0A\u5FD9\u7684\u90A3\u4E9B\u4E8B\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "guide-back-home-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    className: "guide-back-home",
    onClick: () => navigate("/")
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5 M12 19l-7-7 7-7"
  })), "\u8FD4\u56DE\u9996\u9875")))));
}
window.GuidePage = GuidePage;;
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
window.OrganizationsPage = OrganizationsPage;;
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
window.OrgDetailPage = OrgDetailPage;;
function NewsPage() {
  const {
    navigate
  } = useRouter();
  const {
    canAccess
  } = useAuth();
  const [expandedId, setExpandedId] = React.useState(null);
  const news = [{
    id: "northwatch-mountain",
    title: "北境守望成功解决山区常规级异常",
    date: "安珀历39年 · 春 · 第 047 号通报",
    source: "北境守望公关部",
    sourceEn: "NORTHWATCH",
    desc: "白松城以南山区循环路段异常于昨日被成功解决，7名被困平民安全撤离。本次行动由北境守望第三支队执行，历时72小时，无溯界者伤亡。",
    level: "public",
    tag: "事件通报",
    content: ["本报导经IMAC信息协调办公室三层审定，确认可公开披露。", "安珀历39年春季，白松城以南约47公里处的107省道出现异常现象：车辆行驶至该路段时，GPS信号会突然丢失，随后车辆在不知不觉中回到起点，形成一条不断循环的路段。当地交管部门在接到多起「迷路」报告后，初步判断为规则型异常，并立即上报IMAC区域协调中心。", "北境守望第三支队于接报后6小时内抵达现场，封锁路段并设立临时安全边界。经过初步勘查，该异常影响范围约为2.3公里的山区路段，异常等级判定为常规级（SP-0421）。", "行动历时共72小时，分为三个阶段：", "第一阶段（前24小时）：规则解析组通过投放无人探测装置与标记物，确认该异常的核心规则为「视线封闭循环」——当驾驶员在弯道处失去对前方直路的视线时，空间会发生折叠式重置。", "第二阶段（中间24小时）：处置组采用「连续视距锚定法」，在关键弯道处设置高亮度信标阵列，打破循环触发条件。", "第三阶段（最后24小时）：溯源组沿异常能量轨迹逆向追踪，在一处废弃的护林员小屋中找到异常源头——一面老旧的圆形铜镜。铜镜安全封存后，异常现象随即消散。", "本次行动共安全撤离受困平民7人，无溯界者伤亡。被困人员均已接受心理评估，其中2人出现轻度定向障碍，预计一周内可完全恢复。"],
    tags: ["常规级", "空间型", "北境守望", "山区异常"]
  }, {
    id: "imac-guide-2024",
    title: "IMAC发布新版公民应急指南",
    date: "安珀历39年 · 春 · 第 032 号公告",
    source: "IMAC信息协调办公室",
    sourceEn: "IMAC INFO COORDINATION",
    desc: "国际异常管理联盟今日发布2024版公民应急指南，新增城市地铁异常应对章节。指南面向全球公众免费发放，可在各城市便民服务点领取电子版。",
    level: "public",
    tag: "公告",
    content: ["国际异常管理联盟（IMAC）今日正式发布2024版《公民异常应急指南》。这是该指南自发布以来的第四次全面修订。", "与上一版相比，新版指南主要有以下更新：", "一、新增「城市地铁异常应对」专章。鉴于近年来城市轨道交通异常事件呈上升趋势，指南详细列举了地铁环境中常见的异常类型（循环站台、镜像列车、消失的出口等）及对应的自我保护措施。", "二、扩充了「异常识别速查表」。新增12种常见异常现象的典型特征与初步判断方法，帮助普通公民在第一时间做出正确判断。", "三、更新了全球异常热线号码表。所有成员国的统一报警号码「99」已全面开通，指南补充了各地区的辅助联系方式。", "四、增加了「心理自助」章节。由IMAC心理评估中心编写，指导普通公民在遭遇异常事件后如何进行初步的自我心理调节。", "指南全文共128页，配有67幅示意图。所有公民均可通过IMAC官方网站免费下载电子版，或在各城市社区服务中心、图书馆、地铁站免费领取印刷版。", "IMAC信息协调办公室发言人表示：「知识是最好的防护。我们希望每一位公民都能了解基本的异常应对知识，在危急时刻保护自己和家人。」"],
    tags: ["公告", "应急指南", "公众教育"]
  }, {
    id: "bri-annual-report",
    title: "边界研究院公布年度异常统计报告",
    date: "安珀历39年 · 冬 · 第 156 号报告",
    source: "边界研究院BRI",
    sourceEn: "BRI STATISTICS",
    desc: "边界研究院（BRI）发布年度异常现象统计分析报告。数据显示，全球异常出现频率与去年基本持平，新发现异常327起，其中常规级占比74%，危险级21%，厄运级4%，深渊级1%。",
    level: "public",
    tag: "统计报告",
    content: ["边界研究院（Borderline Research Institute, BRI）今日发布安珀历38年度全球异常现象统计分析报告。", "报告显示，安珀历38年度全球共新发现异常现象327起，与上一年度的331起基本持平。这是连续第三年全球异常总数保持相对稳定。", "按异常等级划分：", "· 常规级（Ordinary）：242起，占比74.0%", "· 危险级（Danger）：69起，占比21.1%", "· 厄运级（Doom）：13起，占比4.0%", "· 深渊级（Abyss）：3起，占比0.9%", "按异常类别划分：", "· 空间型（SP）：98起，占比最高", "· 时间型（TM）：47起", "· 物理型（PH）：62起", "· 认知型（CG）：54起", "· 实体型（EN）：38起", "· 场所型（LO）：21起", "· 物件型（OB）：7起", "报告同时指出，本年度成功解决的异常共298起，成功率为91.1%，较上一年度提高了2.3个百分点。这主要得益于各成员组织之间的协同效率提升以及新技术装备的投入使用。", "边界研究院院长在报告发布会上表示：「全球异常态势总体可控，但我们不能有丝毫松懈。新类型异常的出现频率正在缓慢上升，这需要全球溯界者保持警惕。」"],
    tags: ["统计报告", "边界研究院", "年度数据"]
  }, {
    id: "ouroboros-metro",
    title: "衔尾蛇事务所完成鸣海城地铁异常处理",
    date: "安珀历39年 · 秋 · 第 098 号通报",
    source: "衔尾蛇事务所",
    sourceEn: "OUROBOROS AGENCY",
    desc: "鸣海城地铁三号线循环异常于今日宣告解决。这是衔尾蛇事务所在本年度处理的第23起城市异常事件。147名被困平民全部安全撤离。",
    level: "public",
    tag: "事件通报",
    content: ["鸣海城地铁三号线「南站—会展中心」区间于前日发生循环型异常事件。列车在行驶过程中反复回到同一站台，乘客始终无法到达目的地。", "事件发生在早高峰时段，当时列车上共有乘客147人。地铁运营方在发现异常后立即启动应急预案，切断该区间供电并上报IMAC。", "衔尾蛇事务所鸣海分部在接报后两小时内抵达现场。由资深溯界者「赤鸦」带领的行动组负责本次处置。", "经勘查，该异常为典型的「循环站台」型空间异常（SP-1132，危险级）。异常的核心特征是：列车在两个相邻站点之间行驶时，会不断回到出发站台，形成一个封闭的循环空间。", "处置过程分为两步：", "第一步，行动组通过地铁通风管道进入异常影响区域，在列车上建立通讯联络，安抚乘客情绪并讲解注意事项。", "第二步，采用「破序标记法」——溯界者在每个循环周期中，在车厢不同位置留下递增的标记，逐步打破循环规则的稳定性。经过七个循环周期后，异常规则出现紊乱，列车成功「驶出」循环区间。", "147名乘客全部安全撤离，无人受伤。所有乘客均已接受标准心理评估与记忆梳理程序。", "这是衔尾蛇事务所在本年度成功处理的第23起城市异常事件，再次展现了该所在城市环境下处置异常的专业能力。"],
    tags: ["危险级", "空间型", "地铁异常", "衔尾蛇事务所"]
  }, {
    id: "global-training-lorraine",
    title: "全球溯界者联合训练在洛林举行",
    date: "安珀历39年 · 夏 · 第 076 号动态",
    source: "IMAC训练协调部",
    sourceEn: "IMAC TRAINING",
    desc: "两年一度的全球溯界者联合训练在边界研究院总部举行。来自八大成员组织的120名溯界者参加了本次训练，涵盖规则解析、装备操作、团队协作等科目。",
    level: "public",
    tag: "训练动态",
    content: ["安珀历39年夏季，两年一度的「全球溯界者联合训练」在位于洛林的边界研究院总部训练基地举行。", "本次训练由IMAC训练协调部主办，边界研究院承办。来自八大成员组织的120名溯界者参加了训练，是历届规模最大的一次。", "训练为期两周，分为基础科目、进阶科目和综合演练三个部分：", "· 基础科目：异常识别与分类、标准装备操作、初级规则解析方法、安全撤离程序。", "· 进阶科目：高级规则推演、团队协同战术、异常实体应对、特殊环境适应。", "· 综合演练：模拟真实异常场景的全流程处置演练，考验溯界者的综合能力与团队协作。", "本次训练首次引入了「虚拟异常环境模拟系统」（VAESS），可以在安全环境下模拟多种类型的异常场景，大大提高了训练效率和安全性。", "训练协调部负责人表示：「联合训练的目的不仅是提升溯界者的个人能力，更重要的是建立跨组织的协作默契。当大型异常事件发生时，我们需要全球溯界者能够像一支队伍一样并肩作战。」"],
    tags: ["训练", "联合训练", "边界研究院", "溯界者"]
  }, {
    id: "longbridge-op-conn",
    title: "长桥会社完成跨区域联合行动",
    date: "安珀历39年 · 秋 · 第 134 号通报",
    source: "长桥会社",
    sourceEn: "LONG BRIDGE COMPANY",
    desc: "长桥会社主导的「联结行动」成功解决了一起跨两国的联动型异常。这是本年度规模最大的跨国异常处置行动，三个成员组织协同参与。",
    level: "public",
    tag: "联合行动",
    content: ["由长桥会社主导的代号为「联结行动」的跨国异常处置任务于近日圆满完成。本次行动横跨两个国家，涉及三处联动异常节点，是本年度规模最大的跨国异常处置行动。", "异常现象最早出现在新海市港区——一批集装箱在装卸过程中出现「内容物错位」现象：打开集装箱后，里面的货物与发货清单完全不符，且发货方坚称装箱时无误。经初步勘查，判定为联动型传送异常。", "随着调查深入，溯界者发现该异常并非孤立存在，而是与另外两个国家的港口异常节点相连，形成一个跨区域的「异常传送网络」。这是极为罕见的三地联动型异常。", "IMAC迅速启动跨国协调机制，由长桥会社作为主导方，另外两个成员国的成员组织协同参与。行动代号「联结」，意在打破异常节点之间的联系。", "行动历时九天，长桥会社派出了三支精英小队，分别前往三个节点同步作业。通过精密的时间协调，三个小队在同一时刻对各自节点的异常核心进行干预，成功切断了节点之间的异常能量联系。", "三个异常节点随后逐一消散，所有错位的货物均已归位。本次行动中，长桥会社展现出的跨国协调能力和精密战术执行水平，得到了IMAC总部的高度评价。", "长桥会社行动指挥官表示：「异常没有国界。面对联动型异常，我们需要的不仅是勇气，更需要无缝的跨国协作。这正是IMAC存在的意义。」"],
    tags: ["联合行动", "长桥会社", "联动型异常", "跨区域"]
  }];
  const toggleExpand = id => {
    setExpandedId(expandedId === id ? null : id);
    // 展开时滚动到对应位置
    if (expandedId !== id) {
      setTimeout(() => {
        const el = document.getElementById(`news-${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 100 || rect.bottom > window.innerHeight) {
            window.scrollTo({
              top: window.scrollY + rect.top - 100,
              behavior: "smooth"
            });
          }
        }
      }, 50);
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .news-page-hero {
          padding-top: 120px;
          padding-bottom: 40px;
          background: linear-gradient(180deg, #0e0e12 0%, #121116 100%);
          border-bottom: 1px solid var(--border-color);
        }
        .news-page-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          margin-bottom: 14px;
        }
        .news-page-title {
          font-family: var(--font-serif);
          font-size: 40px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .news-page-subtitle {
          font-size: 15px;
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.7;
        }
        .news-page-main {
          padding: 50px 0 80px;
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 40px;
        }
        .news-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .news-item {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }
        .news-item:hover {
          border-color: var(--border-light);
        }
        .news-item.expanded {
          border-color: var(--accent-red);
          box-shadow: 0 0 20px rgba(196, 40, 40, 0.1);
        }
        .news-item-header {
          padding: 24px 28px;
          cursor: pointer;
          display: flex;
          gap: 24px;
        }
        .news-item-tag {
          writing-mode: vertical-rl;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          padding: 4px 0;
          border-left: 2px solid var(--accent-red-bright);
          flex-shrink: 0;
          text-orientation: mixed;
        }
        .news-item-body { flex: 1; min-width: 0; }
        .news-item-source {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .news-item-title {
          font-family: var(--font-serif);
          font-size: 19px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
          line-height: 1.4;
          transition: color 0.2s ease;
        }
        .news-item:hover .news-item-title { color: var(--accent-red-bright); }
        .news-item-date {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          margin-bottom: 12px;
        }
        .news-item-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .news-item-readmore {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          font-size: 12px;
          font-family: var(--font-mono);
          color: var(--accent-red-bright);
          letter-spacing: 0.1em;
          transition: all 0.2s ease;
        }
        .news-item-readmore svg {
          width: 12px; height: 12px;
          transition: transform 0.2s ease;
        }
        .news-item.expanded .news-item-readmore svg {
          transform: rotate(90deg);
        }

        .news-item-detail {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
          border-top: 1px solid transparent;
        }
        .news-item.expanded .news-item-detail {
          max-height: 3000px;
          border-top-color: var(--border-color);
        }
        .news-detail-inner {
          padding: 24px 28px 28px;
          padding-left: calc(28px + 24px + 2px);
        }
        .news-detail-meta-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }
        .news-detail-tag-pill {
          padding: 4px 10px;
          border: 1px solid var(--border-color);
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .news-detail-content {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .news-detail-content p {
          margin: 0;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.85;
        }
        .news-detail-content p:first-letter {
          padding-left: 0;
        }
        .news-detail-close-row {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: center;
        }
        .news-detail-close-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 20px;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-tertiary);
          font-size: 11px;
          font-family: var(--font-mono);
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .news-detail-close-btn:hover {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }

        .news-sidebar {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .news-side-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 22px 20px;
        }
        .news-side-card h4 {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-color);
        }
        .news-side-tag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .news-side-tag {
          padding: 4px 10px;
          border: 1px solid var(--border-color);
          font-size: 11px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .news-side-tag:hover {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }
        .media-guidelines-entry {
          padding: 16px;
          background: linear-gradient(135deg, rgba(196, 154, 44, 0.08), transparent);
          border: 1px dashed rgba(196, 154, 44, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .media-guidelines-entry:hover {
          border-color: var(--accent-red-bright);
          border-style: solid;
        }
        .media-guidelines-entry .icon {
          width: 20px; height: 20px;
          color: #c49a2c;
          margin-bottom: 8px;
        }
        .media-guidelines-entry .title {
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .media-guidelines-entry .desc {
          font-size: 11px;
          color: var(--text-tertiary);
          line-height: 1.5;
        }
        .media-guidelines-entry .cta {
          margin-top: 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.1em;
        }

        @media (max-width: 1024px) {
          .news-page-main { grid-template-columns: 1fr; }
          .news-sidebar { position: static; }
        }
        @media (max-width: 768px) {
          .news-page-title { font-size: 30px; }
          .news-item-header { flex-direction: column; gap: 12px; padding: 20px; }
          .news-item-tag { writing-mode: horizontal-tb; border-left: none; border-bottom: 2px solid var(--accent-red-bright); padding: 0 0 4px; }
          .news-detail-inner { padding: 20px; padding-left: 20px; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    className: "news-page-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "news-page-label"
  }, "NEWS CENTER \xB7 \u65B0\u95FB\u4E2D\u5FC3"), /*#__PURE__*/React.createElement("h1", {
    className: "news-page-title"
  }, "\u6700\u65B0\u52A8\u6001"), /*#__PURE__*/React.createElement("p", {
    className: "news-page-subtitle"
  }, "IMAC\u5B98\u65B9\u65B0\u95FB\u53D1\u5E03\u6E20\u9053\u3002\u6240\u6709\u516C\u5F00\u62A5\u9053\u5747\u7ECF\u8FC7\u4FE1\u606F\u534F\u8C03\u529E\u516C\u5BA4\u5BA1\u5B9A\uFF0C \u786E\u4FDD\u62AB\u9732\u5185\u5BB9\u51C6\u786E\u3001\u9002\u5F53\uFF0C\u4E0D\u6CC4\u9732\u654F\u611F\u4FE1\u606F\u3002"))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "news-page-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "news-list"
  }, news.map(n => {
    const isExpanded = expandedId === n.id;
    return /*#__PURE__*/React.createElement("article", {
      key: n.id,
      id: `news-${n.id}`,
      className: `news-item ${isExpanded ? "expanded" : ""}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "news-item-header",
      onClick: () => toggleExpand(n.id)
    }, /*#__PURE__*/React.createElement("div", {
      className: "news-item-tag"
    }, n.tag), /*#__PURE__*/React.createElement("div", {
      className: "news-item-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "news-item-source"
    }, n.sourceEn.toUpperCase()), /*#__PURE__*/React.createElement("h3", {
      className: "news-item-title"
    }, n.title), /*#__PURE__*/React.createElement("div", {
      className: "news-item-date"
    }, n.date, " \xB7 ", n.source), /*#__PURE__*/React.createElement("p", {
      className: "news-item-desc"
    }, n.desc), /*#__PURE__*/React.createElement("span", {
      className: "news-item-readmore"
    }, isExpanded ? "收起详情" : "查看详情", /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("polyline", {
      points: "9 18 15 12 9 6"
    }))))), /*#__PURE__*/React.createElement("div", {
      className: "news-item-detail"
    }, /*#__PURE__*/React.createElement("div", {
      className: "news-detail-inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "news-detail-meta-bar"
    }, n.tags.map((t, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      className: "news-detail-tag-pill"
    }, t))), /*#__PURE__*/React.createElement("div", {
      className: "news-detail-content"
    }, n.content.map((para, i) => /*#__PURE__*/React.createElement("p", {
      key: i
    }, para))), /*#__PURE__*/React.createElement("div", {
      className: "news-detail-close-row"
    }, /*#__PURE__*/React.createElement("button", {
      className: "news-detail-close-btn",
      onClick: () => toggleExpand(n.id)
    }, /*#__PURE__*/React.createElement("svg", {
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("polyline", {
      points: "18 15 12 9 6 15"
    })), "\u6536\u8D77"), /*#__PURE__*/React.createElement("button", {
      className: "news-detail-close-btn",
      onClick: () => navigate("/")
    }, /*#__PURE__*/React.createElement("svg", {
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M19 12H5 M12 19l-7-7 7-7"
    })), "\u8FD4\u56DE\u9996\u9875")))));
  })), /*#__PURE__*/React.createElement("aside", {
    className: "news-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "news-side-card"
  }, /*#__PURE__*/React.createElement("h4", null, "\u5206\u7C7B\u6807\u7B7E"), /*#__PURE__*/React.createElement("div", {
    className: "news-side-tag-list"
  }, ["全部", "事件通报", "公告", "统计报告", "训练动态", "联合行动"].map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "news-side-tag"
  }, t)))), /*#__PURE__*/React.createElement(Restricted, {
    level: "media",
    label: "\u53D7\u9650\u7EA7\u5185\u5BB9"
  }, /*#__PURE__*/React.createElement("div", {
    className: "media-guidelines-entry",
    onClick: () => navigate("/media-guidelines")
  }, /*#__PURE__*/React.createElement("svg", {
    className: "icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
  })), /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, "\u65B0\u95FB\u62A5\u9053\u89C4\u8303"), /*#__PURE__*/React.createElement("p", {
    className: "desc"
  }, "\u4E09\u5C42\u5BA1\u5B9A\u673A\u5236\u3001\u4E94\u4E0D\u62AB\u9732\u539F\u5219\u3001\u6CE8\u518C\u5A92\u4F53\u4EBA\u5458\u8BA4\u8BC1\u6D41\u7A0B"), /*#__PURE__*/React.createElement("div", {
    className: "cta"
  }, "\u5A92\u4F53\u4EBA\u5458\u767B\u5F55\u67E5\u770B \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "news-side-card"
  }, /*#__PURE__*/React.createElement("h4", null, "\u8BA2\u9605\u66F4\u65B0"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "12px",
      color: "var(--text-secondary)",
      lineHeight: "1.6",
      marginBottom: "12px"
    }
  }, "\u8BA2\u9605IMAC\u5B98\u65B9\u901A\u8BAF\uFF0C\u7B2C\u4E00\u65F6\u95F4\u83B7\u53D6\u5F02\u5E38\u9884\u8B66\u4E0E\u5B89\u5168\u63D0\u793A\u3002"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: "\u60A8\u7684\u90AE\u7BB1\u5730\u5740",
    style: {
      width: "100%",
      padding: "8px 10px",
      backgroundColor: "var(--bg-secondary)",
      border: "1px solid var(--border-color)",
      color: "var(--text-primary)",
      fontSize: "12px",
      fontFamily: "var(--font-mono)",
      marginBottom: "8px",
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      width: "100%",
      padding: "8px",
      backgroundColor: "var(--accent-red-bright)",
      border: "none",
      color: "#fff",
      fontSize: "11px",
      fontFamily: "var(--font-mono)",
      letterSpacing: "0.1em",
      cursor: "pointer"
    }
  }, "\u8BA2\u9605")))))));
}
window.NewsPage = NewsPage;;
// Unified authentication page - 4 tier system
function AuthPage() {
  const {
    navigate
  } = useRouter();
  const {
    setAuth,
    logout,
    authLevel,
    levels,
    currentLevelInfo
  } = useAuth();
  const [selectedTier, setSelectedTier] = React.useState(null);
  const [formData, setFormData] = React.useState({});
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tiers = [{
    key: "public",
    label: "普通公民",
    level: "public",
    desc: "公开级，无需认证",
    color: levels.PUBLIC.color,
    content: ["首页全部内容", "应急指南", "异常科普", "公开新闻报道", "组织公开简介"],
    icon: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2 M12 7a4 4 0 110 8 4 4 0 010-8z",
    fields: [],
    submitLabel: "以公开身份访问"
  }, {
    key: "media",
    label: "注册媒体人员",
    level: "media",
    desc: "受限级，需媒体认证码",
    color: levels.MEDIA.color,
    content: ["公开级全部内容", "新闻报道规范", "三层审定流程", "五不披露原则", "组织非敏感数据"],
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
    fields: [{
      key: "mediaCode",
      label: "媒体认证码",
      type: "text",
      placeholder: "MED-XXXX-XXXX"
    }, {
      key: "organization",
      label: "所属媒体机构",
      type: "text",
      placeholder: "例如：鸣海新闻社"
    }],
    submitLabel: "媒体人员认证"
  }, {
    key: "internal",
    label: "溯界者 / 内部人员",
    level: "internal",
    desc: "机密级，需人员编号+密码",
    color: levels.INTERNAL.color,
    content: ["受限级全部内容", "异常信息数据库（常规至厄运级）", "组织内部详情", "装备说明", "同化风险详情"],
    icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z",
    fields: [{
      key: "staffId",
      label: "人员编号",
      type: "text",
      placeholder: "IMAC-OA-0312"
    }, {
      key: "password",
      label: "密码",
      type: "password",
      placeholder: "请输入密码"
    }],
    submitLabel: "内部人员认证"
  }, {
    key: "topsecret",
    label: "IMAC 管理员",
    level: "topsecret",
    desc: "绝密级，需管理员密钥",
    color: levels.TOPSECRET.color,
    content: ["机密级全部内容", "深渊级异常完整档案", "所有组织完整内部数据", "进入记录原始数据", "IMAC 核心决策文件"],
    icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    fields: [{
      key: "adminId",
      label: "管理员编号",
      type: "text",
      placeholder: "IMAC-ADM-0001"
    }, {
      key: "token",
      label: "密钥令牌",
      type: "password",
      placeholder: "请输入动态密钥"
    }],
    submitLabel: "管理员认证"
  }];
  const currentTier = tiers.find(t => t.key === selectedTier);
  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!currentTier) return;
    if (currentTier.level === "public") {
      setAuth("public", null);
      setSuccess("已切换为公开身份");
      setTimeout(() => navigate("/"), 800);
      return;
    }

    // Mock validation
    const fields = currentTier.fields;
    let valid = true;
    fields.forEach(f => {
      if (!formData[f.key]) valid = false;
    });
    if (!valid) {
      setError("请填写所有必填字段");
      return;
    }

    // Demo: accept any input for media/internal, for topsecret require "TOPSECRET"
    if (currentTier.level === "topsecret" && formData.token !== "TOPSECRET") {
      setError("管理员密钥错误。提示：测试密钥为 TOPSECRET");
      return;
    }
    const identity = {
      tier: currentTier.key,
      name: currentTier.label,
      ...formData
    };
    setAuth(currentTier.level, identity);
    const levelLabel = levels[currentTier.level.toUpperCase()]?.label || currentLevelInfo.label;
    setSuccess(`认证成功，已获得${levelLabel}权限`);
    setTimeout(() => {
      if (currentTier.level === "internal" || currentTier.level === "topsecret") {
        navigate("/portal");
      } else {
        navigate("/");
      }
    }, 1200);
  };
  const handleLogout = () => {
    logout();
    setSelectedTier(null);
    setFormData({});
    setError("");
    setSuccess("已退出认证");
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .auth-page {
          min-height: 100vh;
          padding: 100px 0 80px;
          background: linear-gradient(135deg, #0e0e12 0%, #161014 50%, #120e16 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .auth-top-info {
          text-align: center;
          margin-bottom: 40px;
        }
        .auth-top-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          margin-bottom: 10px;
        }
        .auth-top-title {
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .auth-top-desc {
          font-size: 14px;
          color: var(--text-secondary);
          max-width: 500px;
          line-height: 1.7;
        }
        .auth-current-status {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border: 1px solid;
          margin-top: 20px;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.1em;
        }
        .auth-current-status .dot {
          width: 8px; height: 8px; border-radius: 50%;
        }
        .auth-current-status button {
          margin-left: 12px;
          background: transparent;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          text-decoration: underline;
          font-size: 11px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }

        .auth-tiers {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background-color: var(--border-color);
          border: 1px solid var(--border-color);
          max-width: 900px;
          width: 100%;
          margin-bottom: 40px;
        }
        .auth-tier-card {
          background-color: var(--bg-card);
          padding: 22px 18px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        .auth-tier-card:hover {
          background-color: rgba(18, 18, 22, 0.9);
        }
        .auth-tier-card.active {
          background-color: rgba(139, 26, 26, 0.08);
        }
        .auth-tier-card.active::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background-color: var(--tier-color);
        }
        .auth-tier-icon {
          width: 32px; height: 32px;
          color: var(--tier-color);
          margin-bottom: 14px;
        }
        .auth-tier-label {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .auth-tier-desc {
          font-size: 11px;
          color: var(--text-tertiary);
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .auth-tier-badge {
          display: inline-block;
          padding: 3px 8px;
          border: 1px solid var(--tier-color);
          color: var(--tier-color);
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
        }
        .auth-tiers-features {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
        }
        .auth-tiers-features span {
          font-size: 10px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }

        .auth-form-panel {
          max-width: 500px;
          width: 100%;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 32px;
        }
        .auth-form-title {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .auth-form-subtitle {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.6;
        }
        .auth-form-group {
          margin-bottom: 16px;
        }
        .auth-form-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .auth-form-input {
          width: 100%;
          padding: 10px 14px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 14px;
          font-family: var(--font-mono);
          outline: none;
          transition: border-color 0.2s ease;
        }
        .auth-form-input:focus {
          border-color: var(--accent-red-bright);
        }
        .auth-submit-btn {
          width: 100%;
          padding: 12px;
          background-color: var(--accent-red-bright);
          border: none;
          color: #fff;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
          margin-top: 8px;
        }
        .auth-submit-btn:hover {
          background-color: #d43a3a;
        }
        .auth-error {
          padding: 10px 14px;
          background-color: rgba(196, 40, 40, 0.1);
          border: 1px solid rgba(196, 40, 40, 0.3);
          color: var(--accent-red-bright);
          font-size: 12px;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .auth-success {
          padding: 10px 14px;
          background-color: rgba(74, 124, 89, 0.1);
          border: 1px solid rgba(74, 124, 89, 0.3);
          color: var(--level-ordinary);
          font-size: 12px;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .auth-disclaimer {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
          font-size: 11px;
          color: var(--text-tertiary);
          line-height: 1.6;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .auth-register-entry {
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .auth-register-entry span {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .auth-register-link {
          background: none;
          border: none;
          color: var(--accent-red-bright);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          transition: opacity 0.2s ease;
        }
        .auth-register-link:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
        @media (max-width: 900px) {
          .auth-tiers { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .auth-tiers { grid-template-columns: 1fr; }
          .auth-form-panel { padding: 24px; }
          .auth-top-title { font-size: 26px; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "auth-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-top-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-top-label"
  }, "IMAC ACCESS CONTROL"), /*#__PURE__*/React.createElement("h1", {
    className: "auth-top-title"
  }, "\u8EAB\u4EFD\u8BA4\u8BC1"), /*#__PURE__*/React.createElement("p", {
    className: "auth-top-desc"
  }, "IMAC \u5185\u5BB9\u8BBF\u95EE\u91C7\u7528\u5206\u7EA7\u673A\u5BC6\u4F53\u7CFB\u3002\u4E0D\u540C\u8EAB\u4EFD\u53EF\u8BBF\u95EE\u7684\u5185\u5BB9\u8303\u56F4\u4E0D\u540C\u3002 \u8BF7\u9009\u62E9\u60A8\u7684\u8EAB\u4EFD\u7C7B\u578B\u5E76\u5B8C\u6210\u8BA4\u8BC1\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "auth-current-status",
    style: {
      borderColor: currentLevelInfo.color,
      color: currentLevelInfo.color
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      backgroundColor: currentLevelInfo.color
    }
  }), "\u5F53\u524D\u6743\u9650\uFF1A", currentLevelInfo.label, " / ", currentLevelInfo.en, authLevel !== "public" && /*#__PURE__*/React.createElement("button", {
    onClick: handleLogout
  }, "\u9000\u51FA\u8BA4\u8BC1"))), /*#__PURE__*/React.createElement("div", {
    className: "auth-tiers"
  }, tiers.map(tier => /*#__PURE__*/React.createElement("div", {
    key: tier.key,
    className: `auth-tier-card ${selectedTier === tier.key ? "active" : ""}`,
    style: {
      "--tier-color": tier.color
    },
    onClick: () => {
      setSelectedTier(tier.key);
      setError("");
      setSuccess("");
    }
  }, /*#__PURE__*/React.createElement("svg", {
    className: "auth-tier-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: tier.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "auth-tier-label"
  }, tier.label), /*#__PURE__*/React.createElement("div", {
    className: "auth-tier-desc"
  }, tier.desc), /*#__PURE__*/React.createElement("span", {
    className: "auth-tier-badge"
  }, levels[tier.level.toUpperCase()].en)))), !currentTier && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "40px",
      border: "1px dashed var(--border-color)",
      color: "var(--text-tertiary)",
      fontSize: "13px",
      maxWidth: "500px",
      width: "100%"
    }
  }, "\u8BF7\u5728\u4E0A\u65B9\u9009\u62E9\u60A8\u7684\u8EAB\u4EFD\u7C7B\u578B\u5F00\u59CB\u8BA4\u8BC1"), currentTier && /*#__PURE__*/React.createElement("div", {
    className: "auth-form-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-form-title",
    style: {
      color: currentTier.color
    }
  }, currentTier.label, "\u8BA4\u8BC1"), /*#__PURE__*/React.createElement("p", {
    className: "auth-form-subtitle"
  }, "\u8BA4\u8BC1\u540E\u53EF\u83B7\u5F97\u4EE5\u4E0B\u8BBF\u95EE\u6743\u9650\uFF1A"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      marginBottom: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, currentTier.content.map((c, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "13px",
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: currentTier.color,
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })), c))), error && /*#__PURE__*/React.createElement("div", {
    className: "auth-error"
  }, error), success && /*#__PURE__*/React.createElement("div", {
    className: "auth-success"
  }, success), currentTier.fields.length > 0 ? /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, currentTier.fields.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.key,
    className: "auth-form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "auth-form-label"
  }, f.label), /*#__PURE__*/React.createElement("input", {
    className: "auth-form-input",
    type: f.type,
    placeholder: f.placeholder,
    value: formData[f.key] || "",
    onChange: e => setFormData({
      ...formData,
      [f.key]: e.target.value
    })
  }))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "auth-submit-btn"
  }, currentTier.submitLabel)) : /*#__PURE__*/React.createElement("button", {
    className: "auth-submit-btn",
    onClick: handleSubmit
  }, currentTier.submitLabel), /*#__PURE__*/React.createElement("div", {
    className: "auth-disclaimer"
  }, "\u672C\u9875\u9762\u4E3A\u6F14\u793A\u7CFB\u7EDF\uFF0C\u8BA4\u8BC1\u7ED3\u679C\u4EC5\u5728\u672C\u5730\u5B58\u50A8\uFF08localStorage\uFF09\u3002", /*#__PURE__*/React.createElement("br", null), "\u5A92\u4F53\u7EA7\uFF1A\u4EFB\u610F\u8BA4\u8BC1\u7801\u5747\u53EF\u901A\u8FC7\u3002", /*#__PURE__*/React.createElement("br", null), "\u673A\u5BC6\u7EA7\uFF1A\u4EFB\u610F IMAC-\u7EC4\u7EC7\u7F29\u5199-\u7F16\u53F7 \u5747\u53EF\u901A\u8FC7\u3002", /*#__PURE__*/React.createElement("br", null), "\u7EDD\u5BC6\u7EA7\uFF1A\u5BC6\u94A5\u4E3A TOPSECRET\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "auth-register-entry"
  }, /*#__PURE__*/React.createElement("span", null, "\u5DF2\u662F\u6EAF\u754C\u8005\u4F46\u6CA1\u6709\u8D26\u53F7\uFF1F"), /*#__PURE__*/React.createElement("button", {
    className: "auth-register-link",
    onClick: () => navigate("/register")
  }, "\u6CE8\u518C\u6EAF\u754C\u8005\u8D26\u53F7 \u2192")))));
}
window.AuthPage = AuthPage;;
// Internal Command Center Portal - for internal staff (confidential + top secret)
function PortalPage() {
  const {
    navigate
  } = useRouter();
  const {
    canAccess,
    authLevel,
    identity,
    currentLevelInfo
  } = useAuth();
  const [currentTime, setCurrentTime] = React.useState("");
  const [expandedAnnounce, setExpandedAnnounce] = React.useState(null);
  const toggleAnnounce = idx => {
    setExpandedAnnounce(expandedAnnounce === idx ? null : idx);
  };

  // Simulated Amber calendar date display
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`安珀历39年 · 秋 · ${hours}:${mins}:${secs}`);
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);
  const categories = [{
    code: "SP",
    name: "空间类",
    en: "Spatial",
    desc: "折叠、裂隙、循环空间、错位空间等",
    count: 4287,
    latest: "SP-0312 · 折叠楼道",
    example: "SP-0021 无尽楼梯",
    color: "#4a7cb4"
  }, {
    code: "TM",
    name: "时间类",
    en: "Temporal",
    desc: "时间循环、流速异常、时间断裂等",
    count: 892,
    latest: "TM-0147 · 钟塔停滞",
    example: "TM-0031 冰封哨站",
    color: "#7a3ab4"
  }, {
    code: "PH",
    name: "物理类",
    en: "Physical",
    desc: "物理法则扭曲、重力异常、物质状态异常",
    count: 1204,
    latest: "PH-0256 · 引力井",
    example: "PH-0089 镜像医院",
    color: "#c49a2c"
  }, {
    code: "CG",
    name: "认知类",
    en: "Cognitive",
    desc: "记忆篡改、感知扭曲、身份替换、叙事嵌入",
    count: 1567,
    latest: "CG-0199 · 回音巷",
    example: "CG-0003 回音巷",
    color: "#c4782c"
  }, {
    code: "EN",
    name: "实体类",
    en: "Entity",
    desc: "异常生物、NPC自主意识、同化体等",
    count: 734,
    latest: "EN-0082 · 画像中人",
    example: "EN-0045 雾中列车",
    color: "#c42828"
  }, {
    code: "LO",
    name: "地点类",
    en: "Location",
    desc: "凭空出现的建筑、被封锁区域",
    count: 2341,
    latest: "LO-0105 · 镜像医院",
    example: "LO-0073 赤月学院",
    color: "#d46828",
    featured: true
  }, {
    code: "OB",
    name: "物品类",
    en: "Object",
    desc: "异常道具、规则载体、诅咒物品等",
    count: 987,
    latest: "OB-0066 · 哭泣的怀表",
    example: "OB-0012 剧情书残页",
    color: "#6a8ca8"
  }];
  const stats = [{
    label: "全球活跃异常",
    value: "143",
    sub: "较昨日 +3",
    trend: "up"
  }, {
    label: "本周新增",
    value: "27",
    sub: "常规级 21 · 危险级 5 · 厄运级 1",
    trend: "neutral"
  }, {
    label: "在册溯界者",
    value: "1,247",
    sub: "在岗 986 · 外勤 183 · 休整 78",
    trend: "neutral"
  }, {
    label: "当前外勤人员",
    value: "183",
    sub: "分布于 24 个活跃异常点",
    trend: "neutral"
  }, {
    label: "联合响应行动",
    value: "3",
    sub: "三级响应 2 · 二级响应 1",
    trend: "active"
  }];
  const announcements = [{
    id: "IMAC-TC-2024-031",
    date: "安珀历39年·秋·07",
    title: "安珀历39年秋季溯界者轮训通知",
    source: "IMAC训练协调部",
    content: ["各缔约组织、全体在档溯界者：", "根据《IMAC溯界者年度培训规程》第6.2条，安珀历39年秋季轮训定于秋·15至秋·28在中央训练基地（坐标：SP-T-001）举行，现将有关事项通知如下：", "一、参训范围：衔尾蛇事务所、边界研究院BRI、北境守望、晨星团在编溯界者（含见习期），共计约210人；上季度外勤出勤率低于60%者强制参训。", "二、培训模块：① 异常空间识别与快速测绘（40课时）；② 认知类异常防御与记忆锚定训练（32课时）；③ 同化抑制剂实操与紧急医疗（24课时）；④ 新型异常通讯器操作（16课时）；⑤ 综合演练（20课时）。", "三、报名方式：由各组织人事部门统一汇总名单，于秋·12日前通过内部OA系统提交训练协调部。个人报名需经所在组织负责人审批。", "四、注意事项：参训人员须携带完整个人装备，提前24小时抵达基地报到。轮训期间封闭管理，非紧急事项不得外出。"]
  }, {
    id: "BRI-TR-2024-017",
    date: "安珀历39年·秋·05",
    title: "新版 AITF 培训框架正式生效",
    source: "BRI训练中心",
    content: ["各相关部门、全体训练人员：", "经边界研究院学术委员会第17次会议审议通过，新版《异常介入训练框架（AITF v3.0）》自安珀历39年秋·10起正式生效。", "一、主要更新：① 新增'认知异常二级防御'与'空间异常快速撤离'两门核心课程；② 更新个人装备操作规范，涵盖最新批次的 XDPS 终端与记忆锚定器；③ 调整考核权重，实战模拟占比由40%提升至55%；④ 补充平民疏散与护送专项模块。", "二、过渡期安排：秋·10至冬·01为过渡期，旧版（v2.5）培训记录仍然有效；冬·01起所有新入职与年度考核须按 v3.0 标准执行。", "三、培训材料：新版教材与操作手册已上传至内部知识库（路径：BRI/TR/AITF/v3.0/），请各单位及时下载更新。"]
  }, {
    id: "IMAC-TECH-2024-044",
    date: "安珀历39年·秋·03",
    title: "XDPS v4.2 协议栈升级公告",
    source: "IMAC技术局",
    content: ["全体外勤人员、各技术支持单位：", "XDPS（异常数据处理协议栈）v4.2 版本升级定于安珀历39年秋·08 凌晨02:00—04:00进行，届时核心数据库与通讯系统将短暂停机维护。", "一、升级内容：① 优化异常内弱信号传输算法，数据传输成功率预计提升约18%；② 新增 LO/SP 复合类异常的空间坐标解析模块；③ 修复 v4.1 中加密握手偶发失败的问题；④ 升级终端侧电池管理，续航延长约25%。", "二、影响范围：升级期间中央数据库查询服务暂停约90分钟，外勤终端通讯将自动切换至降级模式；正在执行任务的小队须提前做好离线作业准备。", "三、注意事项：升级完成后终端需手动重启以加载新版固件；如遇设备异常，请立即联系技术局值班人员（内线：8800）。"]
  }, {
    id: "OTS-INTELL-2024-029",
    date: "安珀历39年·夏·28",
    title: "第十一届赤月学院行动阶段性报告",
    source: "衔尾蛇事务所",
    content: ["IMAC联合行动指挥中心、各缔约组织：", "现将第十一届赤月学院异常介入行动（行动代号：赤月·XI）进展情况通报如下：", "一、行动概况：本次行动由衔尾蛇事务所与边界研究院BRI联合派遣，共计溯界者4人（衔尾蛇2人、BRI 2人），行动指挥为资深溯界者沈彻。小队于安珀历39年夏·26日从东侧主入口进入，初始阶段进展顺利。", "二、当前状态：夏·29日起与小队失去常规通讯联系，锚定信标信号微弱但稳定，判定为'进行中·全员失联'状态。按《联合行动失联处置规程》第3.1条，暂不启动搜救程序，持续监测信标信号。", "三、后续安排：技术局每日3次校准信标定位；预备队（衔尾蛇一组 + BRI支援组）保持二级待命；下一次状态评估定于秋·10。后续进展将及时通报。"]
  }, {
    id: "IMAC-MED-2024-022",
    date: "安珀历39年·夏·21",
    title: "关于加强心理评估频率的通知",
    source: "IMAC医疗保障部",
    content: ["各缔约组织、全体在档溯界者：", "鉴于近一季度认知类异常介入任务中认知污染与记忆偏差案例上升12.7%，经医疗保障部与伦理委员会联合审议，决定调整溯界者心理评估频率。", "一、评估频次：常规评估由每季度1次调整为每双月1次；外勤一线人员每月1次。参与认知类异常任务后72小时内强制加测。", "二、评估标准：启用修订版《溯界者认知状态评估量表（CSES-R）》，新增同化倾向早期筛查维度。评估结果为'关注'等级者暂停外勤任务并安排介入干预。", "三、实施时间：安珀历39年秋·01起正式施行。各组织医疗对接人请于夏·30日前完成量表培训。", "心理评估是溯界者职业安全的第一道防线，请各单位高度重视，严格执行。"]
  }];
  const activeOperations = [{
    code: "PH-0182",
    name: "洛林自由市边境裂隙",
    level: "厄运级",
    levelClass: "doomed",
    response: "三级响应",
    org: "BRI/晨星团联合",
    status: "进行中"
  }, {
    code: "TM-0089",
    name: "白松城冻土层时间停滞",
    level: "危险级",
    levelClass: "hazardous",
    response: "三级响应",
    org: "北境守望",
    status: "进行中"
  }, {
    code: "LOA-0073",
    name: "赤月学院异常介入行动",
    level: "深渊级",
    levelClass: "abyssal",
    response: "二级响应",
    org: "衔尾蛇/BRI联合",
    status: "进行中",
    featured: true
  }];
  const jrpClauses = ["IMAC总部任命行动总指挥，拥有战术协调权与资源调度权", "缔约国成员组织须在请求发出后6小时内确认派员并进入待命", "所有参与人员统一适用IMAC行动规范与安全协议，原组织规程暂止", "现场情报实时同步至中央数据库，任何组织不得扣留关键信息", "联合行动期间，现场指挥权高于各组织内部指挥链，军令如山"];

  // Redirect if not authenticated
  if (!canAccess("internal")) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#08080a",
        color: "var(--text-secondary)",
        padding: "40px 20px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "48",
      height: "48",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#c42828",
      strokeWidth: "1.5",
      style: {
        marginBottom: "20px"
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "11",
      width: "18",
      height: "11",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 11V7a5 5 0 0110 0v4"
    })), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "24px",
        color: "var(--accent-red-bright)",
        letterSpacing: "0.15em",
        marginBottom: "12px"
      }
    }, "ACCESS DENIED"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "14px",
        marginBottom: "24px",
        maxWidth: "400px",
        lineHeight: "1.7"
      }
    }, "\u672C\u9875\u9762\u4EC5\u9650\u5185\u90E8\u6388\u6743\u4EBA\u5458\u8BBF\u95EE\u3002\u60A8\u5F53\u524D\u7684\u6743\u9650\u7B49\u7EA7\u4E0D\u8DB3\uFF0C\u8BF7\u5148\u5B8C\u6210\u8BA4\u8BC1\u3002"), /*#__PURE__*/React.createElement("button", {
      onClick: () => navigate("/auth"),
      style: {
        padding: "10px 28px",
        backgroundColor: "var(--accent-red-bright)",
        border: "none",
        color: "#fff",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        letterSpacing: "0.15em",
        cursor: "pointer"
      }
    }, "\u524D\u5F80\u8BA4\u8BC1"));
  }
  const walkerName = identity?.staffId || identity?.adminId || "溯界者";
  const walkerCode = "赤鸦";
  const walkerRank = authLevel === "topsecret" ? "界标" : "资深溯界者";
  const walkerOrg = identity?.organization || "衔尾蛇事务所";
  const walkerId = identity?.staffId || identity?.adminId || "IMAC-OA-0721";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .portal-page {
          min-height: 100vh;
          padding-top: 64px;
          background-color: #07070a;
          background-image:
            linear-gradient(rgba(196, 40, 40, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196, 40, 40, 0.04) 1px, transparent 1px);
          background-size: 50px 50px;
          color: var(--text-primary);
          position: relative;
        }
        .portal-page::before {
          content: "";
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px;
          background-color: var(--accent-red-bright);
          box-shadow: 0 0 8px rgba(196, 40, 40, 0.5);
          z-index: 1000;
        }
        .portal-hero {
          background: linear-gradient(180deg, #0a0a0e 0%, #0d0d12 100%);
          border-bottom: 1px solid var(--border-color);
          padding: 28px 0 20px;
        }
        .portal-hero-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .portal-title-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .portal-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.25em;
        }
        .portal-title {
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: 0.08em;
        }
        .portal-time {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .portal-time .dot {
          width: 6px; height: 6px;
          background-color: var(--level-ordinary);
          border-radius: 50%;
          box-shadow: 0 0 6px var(--level-ordinary);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .portal-status-bar {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        .portal-status-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
          letter-spacing: 0.08em;
        }
        .portal-status-item .indicator {
          width: 8px; height: 8px;
          border-radius: 50%;
        }
        .portal-status-item .indicator.ok { background-color: var(--level-ordinary); box-shadow: 0 0 4px var(--level-ordinary); }
        .portal-status-item .indicator.warn { background-color: var(--level-hazardous); box-shadow: 0 0 4px var(--level-hazardous); }
        .portal-status-item .indicator.active { background-color: var(--accent-red-bright); box-shadow: 0 0 6px var(--accent-red-bright); animation: pulse-dot 1.5s infinite; }

        .portal-body {
          padding: 30px 0 60px;
        }
        .portal-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background-color: var(--border-color);
          border: 1px solid var(--border-color);
          margin-bottom: 24px;
        }
        .portal-stat-card {
          background-color: #0d0d12;
          padding: 20px 18px;
        }
        .portal-stat-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 10px;
        }
        .portal-stat-value {
          font-family: var(--font-serif);
          font-size: 30px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 6px;
        }
        .portal-stat-sub {
          font-size: 11px;
          color: var(--text-tertiary);
        }

        .portal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .portal-grid.full {
          grid-template-columns: 1fr;
        }
        .portal-card {
          background-color: #0d0d12;
          border: 1px solid var(--border-color);
          overflow: hidden;
        }
        .portal-card-header {
          padding: 14px 20px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(90deg, rgba(196, 40, 40, 0.06), transparent);
        }
        .portal-card-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .portal-card-title .code {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
        }
        .portal-card-en {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }
        .portal-card-body { padding: 20px; }

        .jrp-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .jrp-list li {
          position: relative;
          padding: 10px 0 10px 32px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          border-bottom: 1px dashed var(--border-color);
        }
        .jrp-list li:last-child { border-bottom: none; }
        .jrp-list li::before {
          content: "第" counter(jrp) "条";
          position: absolute;
          left: 0;
          top: 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.1em;
          width: 28px;
        }
        .jrp-list { counter-reset: jrp; }
        .jrp-list li { counter-increment: jrp; }

        .ops-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ops-item {
          padding: 14px 16px;
          background-color: rgba(18, 18, 22, 0.6);
          border: 1px solid var(--border-color);
          border-left: 3px solid var(--level-hazardous);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          transition: border-color 0.3s ease;
        }
        .ops-item:hover { border-color: var(--border-light); }
        .ops-item.abyssal { border-left-color: var(--accent-red-bright); background-color: rgba(139, 26, 26, 0.08); }
        .ops-main { display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 0; }
        .ops-detail { margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--border-color); display: flex; flex-direction: column; gap: 4px; }
        .ops-detail-row { display: flex; gap: 12px; font-size: 11px; }
        .ops-detail-label { color: var(--text-tertiary); font-family: var(--font-mono); letter-spacing: 0.05em; min-width: 72px; }
        .ops-detail-value { color: var(--text-secondary); }
        .ops-code {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .ops-name {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .ops-meta {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ops-badge {
          padding: 3px 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          border: 1px solid;
        }
        .ops-badge.hazardous { color: var(--level-hazardous); border-color: var(--level-hazardous); }
        .ops-badge.doomed { color: var(--level-doomed); border-color: var(--level-doomed); }
        .ops-badge.abyssal { color: var(--accent-red-bright); border-color: var(--accent-red-bright); animation: pulse-glow 2s ease-in-out infinite; }
        .ops-status {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background-color: var(--border-color);
        }
        .category-card {
          background-color: #0d0d12;
          padding: 18px 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }
        .category-card:hover {
          background-color: #13131a;
        }
        .category-card.featured {
          background: linear-gradient(180deg, rgba(196, 40, 40, 0.12), #0d0d12);
        }
        .category-code {
          font-family: var(--font-mono);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
          letter-spacing: 0.05em;
        }
        .category-name {
          font-family: var(--font-serif);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .category-en {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 10px;
        }
        .category-count {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 700;
          color: var(--cat-color, var(--accent-red-bright));
          margin-bottom: 6px;
        }
        .category-desc {
          font-size: 10px;
          color: var(--text-tertiary);
          line-height: 1.5;
          margin-bottom: 8px;
        }
        .category-latest {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-muted);
          padding-top: 8px;
          border-top: 1px solid var(--border-color);
          letter-spacing: 0.05em;
        }

        .regs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .regs-sub h4 {
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 12px;
          padding-bottom: 6px;
          border-bottom: 1px solid var(--border-color);
        }
        .regs-sub ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .regs-sub li {
          position: relative;
          padding: 6px 0 6px 18px;
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .regs-sub li::before {
          content: "▸";
          position: absolute;
          left: 0;
          top: 6px;
          color: var(--accent-red-bright);
          font-size: 10px;
        }

        .announce-list {
          display: flex;
          flex-direction: column;
        }
        .announce-item {
          border-bottom: 1px dashed var(--border-color);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .announce-item:last-child { border-bottom: none; }
        .announce-item:hover .announce-title { color: var(--text-primary); }
        .announce-header {
          padding: 12px 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .announce-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .announce-code {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          padding: 2px 6px;
          border: 1px solid var(--border-color);
          flex-shrink: 0;
        }
        .announce-title {
          font-size: 13px;
          color: var(--text-secondary);
          flex: 1;
          font-weight: 500;
        }
        .announce-meta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-left: 0;
        }
        .announce-source {
          font-size: 10px;
          color: var(--text-tertiary);
          flex: 1;
        }
        .announce-date {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .announce-arrow {
          font-family: var(--font-mono);
          font-size: 8px;
          color: var(--text-muted);
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .announce-item.expanded .announce-arrow { color: var(--accent-red-bright); }
        .announce-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.3s ease;
          opacity: 0;
        }
        .announce-body.open {
          max-height: 1200px;
          opacity: 1;
        }
        .announce-body-inner {
          padding: 0 0 14px 0;
          border-top: 1px dashed var(--border-color);
          padding-top: 12px;
        }
        .announce-paragraph {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0 0 10px 0;
          text-align: justify;
        }
        .announce-paragraph:first-child { color: var(--text-primary); font-weight: 500; }
        .announce-actions {
          display: flex;
          justify-content: flex-end;
          padding-top: 4px;
        }
        .announce-collapse-btn {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          padding: 4px 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .announce-collapse-btn:hover {
          color: var(--accent-red-bright);
          border-color: var(--accent-red-bright);
        }

        .func-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        .func-cards-hero {
          grid-template-columns: repeat(3, 1fr);
          margin-bottom: 0;
        }
        .func-cards-hero .func-card {
          padding: 20px;
          gap: 10px;
        }
        .func-cards-hero .func-card-icon {
          width: 36px;
          height: 36px;
        }
        .func-cards-hero .func-card-title {
          font-size: 16px;
        }
        .func-card-icon-wrap {
          position: relative;
          width: 36px;
          height: 36px;
          margin-bottom: 4px;
        }
        .func-card-icon-wrap .func-card-icon {
          width: 100%;
          height: 100%;
          margin-bottom: 0;
        }
        .func-card-unread {
          position: absolute;
          top: -6px;
          right: -10px;
          min-width: 18px;
          height: 18px;
          padding: 0 5px;
          border-radius: 9px;
          background: var(--accent-red-bright);
          color: #fff;
          font-size: 10px;
          font-family: var(--font-mono);
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 8px rgba(196, 40, 40, 0.6);
        }
        .func-card-mailbox {
          border-color: rgba(196, 40, 40, 0.45);
          background: linear-gradient(135deg, rgba(22, 14, 16, 0.85), rgba(18, 18, 22, 0.7));
        }
        .func-card {
          background-color: rgba(18, 18, 22, 0.7);
          border: 1px solid var(--border-color);
          padding: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }
        .func-card:hover {
          border-color: var(--accent-red-bright);
          transform: translateY(-2px);
          background-color: rgba(25, 20, 24, 0.8);
        }
        .func-card-icon {
          width: 32px;
          height: 32px;
          color: var(--accent-red-bright);
          margin-bottom: 4px;
        }
        .func-card-title {
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .func-card-desc {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .func-card-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          background: rgba(196, 40, 40, 0.15);
          color: var(--accent-red-bright);
          letter-spacing: 0.05em;
        }
        .func-panel {
          margin-bottom: 16px;
        }
        .func-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border-color);
        }
        .func-panel-title {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .func-panel-close {
          background: none;
          border: 1px solid var(--border-color);
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 4px 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .func-panel-close:hover {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .form-label {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .form-input, .form-select, .form-textarea {
          background: rgba(10, 10, 14, 0.8);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 8px 10px;
          font-size: 12px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--accent-red-bright);
        }
        .form-textarea {
          resize: vertical;
          min-height: 60px;
        }
        .form-submit {
          background: rgba(196, 40, 40, 0.15);
          border: 1px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          padding: 8px 18px;
          font-size: 12px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 6px;
        }
        .form-submit:hover {
          background: rgba(196, 40, 40, 0.25);
        }
        .form-success {
          padding: 10px 14px;
          background: rgba(47, 158, 68, 0.1);
          border: 1px solid rgba(47, 158, 68, 0.4);
          color: #5fb372;
          font-size: 12px;
          margin-top: 10px;
        }
        .cert-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border: 1px solid var(--border-color);
          margin-bottom: 8px;
          background: rgba(10, 10, 14, 0.5);
        }
        .cert-item-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .cert-item-name {
          font-size: 13px;
          color: var(--text-primary);
          font-weight: 600;
        }
        .cert-item-desc {
          font-size: 11px;
          color: var(--text-tertiary);
        }
        .cert-apply-btn {
          background: rgba(196, 40, 40, 0.1);
          border: 1px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          font-size: 11px;
          padding: 4px 12px;
          cursor: pointer;
          font-family: var(--font-mono);
          transition: all 0.2s;
        }
        .cert-apply-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .cert-apply-btn:hover:not(:disabled) {
          background: rgba(196, 40, 40, 0.2);
        }
        .mail-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0 12px;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 8px;
        }
        .mail-toolbar-left {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .mail-toolbar-btn {
          background: none;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 4px 10px;
          font-size: 11px;
          cursor: pointer;
          font-family: var(--font-mono);
          transition: all 0.2s;
        }
        .mail-toolbar-btn:hover {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }
        .mail-toolbar-btn.active {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
          background: rgba(196, 40, 40, 0.1);
        }
        .mail-unread-count {
          font-size: 11px;
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
        }
        .mail-list {
          max-height: 400px;
          overflow-y: auto;
        }
        .mail-item {
          padding: 10px 12px;
          border-bottom: 1px solid var(--border-color);
          cursor: pointer;
          transition: background 0.2s;
        }
        .mail-item:hover {
          background: rgba(196, 40, 40, 0.04);
        }
        .mail-item.unread {
          background: rgba(196, 40, 40, 0.06);
        }
        .mail-item-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .mail-from {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .mail-unread-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .mail-important {
          color: var(--accent-red-bright);
          font-size: 10px;
          font-family: var(--font-mono);
        }
        .mail-time {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          flex-shrink: 0;
        }
        .mail-subject {
          font-size: 12px;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mail-item.unread .mail-subject {
          color: var(--text-primary);
          font-weight: 600;
        }
        .mail-body {
          padding: 12px;
          background: rgba(10, 10, 14, 0.6);
          border-left: 2px solid var(--accent-red-bright);
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.7;
          white-space: pre-wrap;
          display: none;
        }
        .mail-item.expanded .mail-body {
          display: block;
          margin-top: 8px;
        }
        .op-history-item {
          display: grid;
          grid-template-columns: 1fr 80px 80px 90px;
          gap: 8px;
          padding: 8px 10px;
          border-bottom: 1px solid var(--border-color);
          font-size: 11px;
          align-items: center;
        }
        .op-history-item:last-child { border-bottom: none; }
        .op-h-status.approved { color: var(--level-ordinary); }
        .op-h-status.pending { color: var(--level-hazardous); }
        .op-h-status.rejected { color: var(--accent-red-bright); }
        .reg-status-banner {
          padding: 10px 14px;
          background: rgba(47, 158, 68, 0.08);
          border: 1px solid rgba(47, 158, 68, 0.35);
          color: #5fb372;
          font-size: 12px;
          margin-bottom: 14px;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        @media (max-width: 900px) {
          .func-cards-grid { grid-template-columns: repeat(2, 1fr); }
          .form-row { grid-template-columns: 1fr; }
          .op-history-item { grid-template-columns: 1fr 70px; }
        }
          padding: 24px 0;
          border-top: 1px solid var(--border-color);
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .portal-footer-left {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .portal-footer-warning {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.15em;
          animation: pulse-dot 3s ease-in-out infinite;
        }

        @media (max-width: 1200px) {
          .portal-stats-grid { grid-template-columns: repeat(3, 1fr); }
          .categories-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 768px) {
          .portal-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .portal-grid { grid-template-columns: 1fr; }
          .categories-grid { grid-template-columns: repeat(2, 1fr); }
          .regs-grid { grid-template-columns: 1fr; }
          .portal-title { font-size: 20px; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "portal-page"
  }, /*#__PURE__*/React.createElement("section", {
    className: "portal-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "portal-label"
  }, "IMAC \xB7 INTERNAL COMMAND CENTER"), /*#__PURE__*/React.createElement("h1", {
    className: "portal-title"
  }, "\u5185\u90E8\u6307\u6325\u4E2D\u5FC3")), /*#__PURE__*/React.createElement("div", {
    className: "portal-time"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), currentTime)), /*#__PURE__*/React.createElement("div", {
    className: "portal-status-bar",
    style: {
      marginTop: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-status-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "indicator ok"
  }), "\u7CFB\u7EDF\u5728\u7EBF \xB7 SYSTEM ONLINE"), /*#__PURE__*/React.createElement("div", {
    className: "portal-status-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "indicator warn"
  }), "\u5F02\u5E38\u76D1\u6D4B\u6B63\u5E38 \xB7 ANOMALY MONITORING ACTIVE"), /*#__PURE__*/React.createElement("div", {
    className: "portal-status-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "indicator active"
  }), "\u8054\u5408\u54CD\u5E94\u5F85\u547D \xB7 JRP STANDBY")))), /*#__PURE__*/React.createElement("section", {
    className: "portal-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-stats-grid"
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "portal-stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-stat-label"
  }, s.label), /*#__PURE__*/React.createElement("div", {
    className: "portal-stat-value"
  }, s.value), /*#__PURE__*/React.createElement("div", {
    className: "portal-stat-sub"
  }, s.sub)))), /*#__PURE__*/React.createElement("div", {
    className: "portal-card",
    style: {
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "AID"), "\u5F02\u5E38\u4FE1\u606F\u6570\u636E\u5E93"), /*#__PURE__*/React.createElement("span", {
    className: "portal-card-en"
  }, "ANOMALY INFORMATION DATABASE")), /*#__PURE__*/React.createElement("div", {
    className: "categories-grid"
  }, categories.map(cat => /*#__PURE__*/React.createElement("div", {
    key: cat.code,
    className: `category-card ${cat.featured ? "featured" : ""}`,
    style: {
      "--cat-color": cat.color
    },
    onClick: () => navigate(`/database?cat=${cat.code}`)
  }, /*#__PURE__*/React.createElement("div", {
    className: "category-code",
    style: {
      color: cat.color
    }
  }, cat.code), /*#__PURE__*/React.createElement("div", {
    className: "category-name"
  }, cat.name), /*#__PURE__*/React.createElement("div", {
    className: "category-en"
  }, cat.en.toUpperCase()), /*#__PURE__*/React.createElement("div", {
    className: "category-count",
    style: {
      color: cat.color
    }
  }, cat.count.toLocaleString()), /*#__PURE__*/React.createElement("div", {
    className: "category-desc"
  }, cat.desc), /*#__PURE__*/React.createElement("div", {
    className: "category-latest"
  }, "\u6700\u65B0: ", cat.latest))))), /*#__PURE__*/React.createElement("div", {
    className: "portal-card",
    style: {
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "REG"), "\u884C\u52A8\u89C4\u8303\u4E0E\u5B89\u5168\u534F\u8BAE"), /*#__PURE__*/React.createElement("span", {
    className: "portal-card-en"
  }, "OPERATIONAL REGULATIONS")), /*#__PURE__*/React.createElement("div", {
    className: "portal-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "regs-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "regs-sub"
  }, /*#__PURE__*/React.createElement("h4", null, "\u8FDB\u5165\u524D\u68C0\u67E5\u6E05\u5355"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u4E2A\u4EBA\u8BB0\u5F55\u5668\u529F\u80FD\u786E\u8BA4 \xB7 \u53CC\u5907\u4EFD\u5B58\u50A8"), /*#__PURE__*/React.createElement("li", null, "\u5F02\u5E38\u901A\u8BAF\u5668\u9891\u9053\u6821\u51C6 \xB7 \u52A0\u5BC6\u63E1\u624B\u6D4B\u8BD5"), /*#__PURE__*/React.createElement("li", null, "\u8EAB\u4EFD\u4FE1\u6807\u6FC0\u6D3B \xB7 \u5B9A\u4F4D\u7CFB\u7EDF\u6B63\u5E38"), /*#__PURE__*/React.createElement("li", null, "\u951A\u5B9A\u7269\u643A\u5E26\u786E\u8BA4 \xB7 \u914D\u5BF9\u9A8C\u8BC1\u901A\u8FC7"), /*#__PURE__*/React.createElement("li", null, "\u6025\u6551\u5305\u68C0\u67E5 \xB7 \u540C\u5316\u6291\u5236\u5242\u6709\u6548\u671F\u786E\u8BA4"))), /*#__PURE__*/React.createElement("div", {
    className: "regs-sub"
  }, /*#__PURE__*/React.createElement("h4", null, "\u5F02\u5E38\u5185\u884C\u4E3A\u51C6\u5219"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u4FDD\u6301\u56E2\u961F\u901A\u8BAF \xB7 \u6BCF15\u5206\u949F\u4E00\u6B21\u72B6\u6001\u56DE\u62A5"), /*#__PURE__*/React.createElement("li", null, "\u4E0D\u5F97\u5355\u72EC\u884C\u52A8 \xB7 \u6700\u5C0F\u884C\u52A8\u5355\u4F4D\u4E3A\u4E8C\u4EBA"), /*#__PURE__*/React.createElement("li", null, "\u89C4\u5219\u8BB0\u5F55\u4F18\u5148\u4E8E\u63A2\u7D22 \xB7 \u5148\u8BB0\u5F55\u540E\u6DF1\u5165"), /*#__PURE__*/React.createElement("li", null, "\u53D1\u73B0\u60E9\u7F5A\u673A\u5236\u7ACB\u5373\u64A4\u9000 \xB7 \u5B89\u5168\u7B2C\u4E00"), /*#__PURE__*/React.createElement("li", null, "\u9047\u672A\u77E5\u73B0\u8C61\u4E0D\u5F97\u4E3B\u52A8\u8BD5\u63A2 \xB7 \u7B49\u5F85\u6307\u793A"))), /*#__PURE__*/React.createElement("div", {
    className: "regs-sub"
  }, /*#__PURE__*/React.createElement("h4", null, "\u64A4\u9000\u4E0E\u4F24\u4EA1\u5904\u7406"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u64A4\u9000\u4FE1\u53F7\u7EA6\u5B9A \xB7 \u4E09\u957F\u4E24\u77ED\u901A\u8BAF\u9891\u7387"), /*#__PURE__*/React.createElement("li", null, "\u4F24\u5458\u4F18\u5148\u64A4\u79BB \xB7 \u5E73\u6C11\u4F18\u5148\u4E8E\u6EAF\u754C\u8005"), /*#__PURE__*/React.createElement("li", null, "\u9635\u4EA1\u4EBA\u5458\u9057\u4F53\u5904\u7406 \xB7 \u5C3D\u53EF\u80FD\u5E26\u56DE"), /*#__PURE__*/React.createElement("li", null, "\u5931\u8E2A\u4EBA\u5458\u767B\u8BB0 \xB7 72\u5C0F\u65F6\u540E\u7EB3\u5165\u6863\u6848"))), /*#__PURE__*/React.createElement("div", {
    className: "regs-sub"
  }, /*#__PURE__*/React.createElement("h4", null, "\u540C\u5316\u76D1\u6D4B\u4E0E\u62A5\u544A"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u6BCF48\u5C0F\u65F6\u5FC3\u7406\u81EA\u8BC4 \xB7 \u5728\u7EBF\u63D0\u4EA4"), /*#__PURE__*/React.createElement("li", null, "\u9636\u6BB5\u4E00\u9884\u8B66\uFF1A\u5931\u7720/\u5E7B\u89C9 \xB7 \u63A5\u53D7\u5FC3\u7406\u5E72\u9884"), /*#__PURE__*/React.createElement("li", null, "\u9636\u6BB5\u4E8C\uFF1A\u8BB0\u5FC6\u9519\u4E71 \xB7 \u5F3A\u5236\u64A4\u79BB\u5F02\u5E38"), /*#__PURE__*/React.createElement("li", null, "\u9636\u6BB5\u4E09\uFF1A\u8EAB\u4EFD\u8BA4\u77E5\u7D0A\u4E71 \xB7 \u7EC8\u6B62\u6EAF\u754C\u8D44\u683C"), /*#__PURE__*/React.createElement("li", null, "\u884C\u52A8\u7ED3\u675F24h\u521D\u6B65\u62A5\u544A \xB7 72h\u5B8C\u6574\u62A5\u544A")))))), /*#__PURE__*/React.createElement("div", {
    className: "portal-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "NOTICE"), "\u516C\u544A\u901A\u77E5"), /*#__PURE__*/React.createElement("span", {
    className: "portal-card-en"
  }, "INTERNAL ANNOUNCEMENTS")), /*#__PURE__*/React.createElement("div", {
    className: "portal-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "announce-list"
  }, announcements.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `announce-item ${expandedAnnounce === i ? "expanded" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "announce-header",
    onClick: () => toggleAnnounce(i)
  }, /*#__PURE__*/React.createElement("div", {
    className: "announce-title-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "announce-code"
  }, a.id), /*#__PURE__*/React.createElement("span", {
    className: "announce-title"
  }, a.title)), /*#__PURE__*/React.createElement("div", {
    className: "announce-meta-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "announce-source"
  }, a.source), /*#__PURE__*/React.createElement("span", {
    className: "announce-date"
  }, a.date), /*#__PURE__*/React.createElement("span", {
    className: "announce-arrow"
  }, expandedAnnounce === i ? "▲" : "▼"))), /*#__PURE__*/React.createElement("div", {
    className: `announce-body ${expandedAnnounce === i ? "open" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "announce-body-inner"
  }, a.content.map((para, j) => /*#__PURE__*/React.createElement("p", {
    key: j,
    className: "announce-paragraph"
  }, para)), /*#__PURE__*/React.createElement("div", {
    className: "announce-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "announce-collapse-btn",
    onClick: () => toggleAnnounce(i)
  }, "\u6536\u8D77"))))))))), /*#__PURE__*/React.createElement("div", {
    className: "portal-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "INFO"), "\u6EAF\u754C\u8005\u4E2A\u4EBA\u4FE1\u606F"), /*#__PURE__*/React.createElement("span", {
    className: "portal-card-en"
  }, walkerRank.toUpperCase())), /*#__PURE__*/React.createElement("div", {
    className: "portal-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      border: "2px solid var(--accent-red-bright)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-serif)",
      fontSize: "24px",
      fontWeight: "700",
      color: "var(--accent-red-bright)",
      background: "radial-gradient(circle, rgba(196, 40, 40, 0.15), transparent)"
    }
  }, walkerCode.charAt(0)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "18px",
      fontWeight: "700",
      color: "var(--text-primary)"
    }
  }, walkerCode, " \xB7 ", walkerRank), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      color: "var(--text-tertiary)",
      marginTop: "4px",
      letterSpacing: "0.1em"
    }
  }, walkerId))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px",
      fontSize: "12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "6px",
      borderBottom: "1px solid var(--border-color)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, "\u6240\u5C5E\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, walkerOrg)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "6px",
      borderBottom: "1px solid var(--border-color)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, "\u5F53\u524D\u72B6\u6001"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--level-ordinary)"
    }
  }, "\u5728\u5C97")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "6px",
      borderBottom: "1px solid var(--border-color)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, "\u53C2\u4E0E\u884C\u52A8"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, "47\u6B21")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "6px",
      borderBottom: "1px solid var(--border-color)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, "\u7D2F\u8BA1\u63A5\u89E6"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, "238\u5C0F\u65F6")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "6px",
      borderBottom: "1px solid var(--border-color)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, "\u5FC3\u7406\u8BC4\u4F30"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--level-ordinary)"
    }
  }, "\u6B63\u5E38")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "6px",
      borderBottom: "1px solid var(--border-color)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, "\u4E0B\u6B21\u8BC4\u4F30"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, "\u5B89\u73C0\u538639\u5E7412\u6708"))), /*#__PURE__*/React.createElement(Restricted, {
    level: "topsecret",
    label: "\u7EDD\u5BC6\u7EA7\u529F\u80FD",
    compact: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "16px",
      padding: "10px 14px",
      backgroundColor: "rgba(122, 58, 176, 0.1)",
      border: "1px solid rgba(122, 58, 176, 0.4)",
      fontSize: "11px",
      color: "#a97bd4",
      fontFamily: "var(--font-mono)",
      letterSpacing: "0.1em"
    }
  }, "\u2605 \u7BA1\u7406\u5458\u6743\u9650 \xB7 \u7CFB\u7EDF\u7BA1\u7406\u5165\u53E3\u5DF2\u89E3\u9501"))))), /*#__PURE__*/React.createElement("div", {
    className: "portal-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "JRP"), "\u8054\u5408\u54CD\u5E94\u89C4\u7A0B"), /*#__PURE__*/React.createElement("span", {
    className: "portal-card-en"
  }, "JOINT RESPONSE PROTOCOL")), /*#__PURE__*/React.createElement("div", {
    className: "portal-card-body"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "12px",
      color: "var(--text-secondary)",
      lineHeight: "1.6",
      marginBottom: "16px",
      padding: "10px 14px",
      backgroundColor: "rgba(196, 40, 40, 0.06)",
      borderLeft: "2px solid var(--accent-red-bright)"
    }
  }, "\u5F53\u5F02\u5E38\u8FBE\u5230\u6DF1\u6E0A\u7EA7\u53CA\u4EE5\u4E0A\uFF0C\u6216\u6D89\u53CA\u591A\u56FD/\u8DE8\u533A\u57DF\u8054\u52A8\u65F6\u542F\u52A8\u3002IMAC\u62E5\u6709\u6700\u9AD8\u8C03\u5EA6\u6743\u3002"), /*#__PURE__*/React.createElement("ul", {
    className: "jrp-list"
  }, jrpClauses.map((c, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, c))))), /*#__PURE__*/React.createElement("div", {
    className: "portal-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "OPS"), "\u6D3B\u8DC3\u8054\u5408\u884C\u52A8"), /*#__PURE__*/React.createElement("span", {
    className: "portal-card-en"
  }, "ACTIVE OPERATIONS")), /*#__PURE__*/React.createElement("div", {
    className: "portal-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ops-list"
  }, activeOperations.map((op, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `ops-item ${op.featured ? "abyssal" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "ops-main"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ops-code"
  }, op.code, " \xB7 ", op.org), /*#__PURE__*/React.createElement("span", {
    className: "ops-name"
  }, op.name)), /*#__PURE__*/React.createElement("div", {
    className: "ops-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: `ops-badge ${op.levelClass}`
  }, op.level), /*#__PURE__*/React.createElement("span", {
    className: "ops-status"
  }, op.response, " \xB7 ", op.status)))))))), /*#__PURE__*/React.createElement("div", {
    className: "portal-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-footer-left"
  }, "IMAC INTRANET v4.2.1 \xB7 XDPS PROTOCOL STACK v4.2 \xB7 AID ENGINE v2.7"), /*#__PURE__*/React.createElement("div", {
    className: "portal-footer-warning"
  }, "\u26A0 \u672C\u9875\u9762\u5185\u5BB9\u4EC5\u9650\u6388\u6743\u4EBA\u5458\u8BBF\u95EE \xB7 \u7981\u6B62\u622A\u5C4F\u6216\u5916\u4F20"))))));
}
window.PortalPage = PortalPage;;
function ProfileCenterPage() {
  const {
    canAccess,
    authLevel,
    identity
  } = useAuth();
  const {
    navigate
  } = useRouter();
  const walkerCode = "赤鸦";
  const walkerRank = authLevel === "topsecret" ? "界标" : "资深溯界者";
  const walkerOrg = identity?.organization || "衔尾蛇事务所";
  const walkerId = identity?.staffId || identity?.adminId || "IMAC-OA-0721";
  const walkerName = identity?.name || "陈夜";
  const [activeTab, setActiveTab] = React.useState("profile");
  const tabs = [{
    key: "profile",
    label: "个人档案",
    en: "PROFILE",
    icon: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M8.5 7 a4 4 0 1 0 0-8 a4 4 0 0 0 0 8"
  }, {
    key: "missions",
    label: "任务历史",
    en: "MISSIONS",
    icon: "M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 L13 2"
  }, {
    key: "training",
    label: "培训记录",
    en: "TRAINING",
    icon: "M22 10 v6 a2 2 0 0 1 -2 2 H4 a2 2 0 0 1 -2 -2 v-6 M2 10 l10 -7 l10 7"
  }, {
    key: "psych",
    label: "心理评估",
    en: "PSYCH EVAL",
    icon: "M12 21 s-7 -4.5 -7 -11 a4 4 0 0 1 7 -2.6 A4 4 0 0 1 19 10 c0 6.5 -7 11 -7 11z"
  }, {
    key: "cert",
    label: "认证申请",
    en: "CERTIFICATION",
    icon: "M12 2 L15 9 L22 9 L17 14 L19 21 L12 17 L5 21 L7 14 L2 9 L9 9 Z"
  }, {
    key: "opapp",
    label: "行动申请",
    en: "OPERATION APP",
    icon: "M9 11 l3 3 7 -7 M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z"
  }];

  // === 任务历史（赤鸦，不含赤月学院） ===
  const missionHistory = [{
    name: "失物公寓异常处置",
    code: "LO-1045",
    level: "危险级",
    levelClass: "hazardous",
    role: "行动队长",
    time: "安珀历39年夏·18",
    result: "成功"
  }, {
    name: "镜像走廊勘探任务",
    code: "SP-0890",
    level: "厄运级",
    levelClass: "doomed",
    role: "副队长",
    time: "安珀历39年夏·05",
    result: "成功"
  }, {
    name: "无声剧场调查",
    code: "CG-0502",
    level: "危险级",
    levelClass: "hazardous",
    role: "队员",
    time: "安珀历39年春·22",
    result: "部分成功"
  }, {
    name: "旧图书馆认知异常记录",
    code: "CG-0713",
    level: "危险级",
    levelClass: "hazardous",
    role: "队员",
    time: "安珀历39年春·08",
    result: "成功"
  }, {
    name: "重力偏移区测绘",
    code: "PH-0815",
    level: "厄运级",
    levelClass: "doomed",
    role: "队员",
    time: "安珀历38年冬·14",
    result: "成功"
  }, {
    name: "冰下断层勘探",
    code: "PH-0728",
    level: "危险级",
    levelClass: "hazardous",
    role: "队员",
    time: "安珀历38年秋·30",
    result: "成功"
  }, {
    name: "回声走廊空间测量",
    code: "SP-1120",
    level: "普通级",
    levelClass: "ordinary",
    role: "副队长",
    time: "安珀历38年秋·12",
    result: "成功"
  }, {
    name: "记忆回廊认知干预",
    code: "CG-0427",
    level: "厄运级",
    levelClass: "doomed",
    role: "队员",
    time: "安珀历38年夏·26",
    result: "成功"
  }];

  // === 培训记录 ===
  const trainingRecords = [{
    name: "溯界者基础准入培训",
    type: "准入培训",
    score: "优秀",
    date: "安珀历37年春·15",
    cert: "初级溯界者资格证"
  }, {
    name: "异常通讯器操作进阶",
    type: "装备培训",
    score: "合格",
    date: "安珀历37年夏·20",
    cert: "通讯装备操作证"
  }, {
    name: "锚定物使用与校准",
    type: "安全培训",
    score: "优秀",
    date: "安珀历37年秋·08",
    cert: "锚定操作资质"
  }, {
    name: "急救与同化抑制剂使用",
    type: "医疗培训",
    score: "合格",
    date: "安珀历38年春·03",
    cert: "外勤急救资质"
  }, {
    name: "认知异常识别初阶",
    type: "专业培训",
    score: "良好",
    date: "安珀历38年夏·11",
    cert: "认知异常识别证"
  }, {
    name: "队长指挥与决策培训",
    type: "管理培训",
    score: "良好",
    date: "安珀历39年春·25",
    cert: "行动指挥资格"
  }, {
    name: "深渊级异常安全规程",
    type: "安全培训",
    score: "优秀",
    date: "安珀历39年夏·02",
    cert: "深渊级准入培训"
  }];

  // === 心理评估记录 ===
  const psychRecords = [{
    date: "安珀历39年夏·28",
    assessor: "许知遥 主治医师",
    level: "正常",
    index: "1.2%",
    advice: "保持作息节律，秋季复测",
    status: "ok"
  }, {
    date: "安珀历39年春·12",
    assessor: "许知遥 主治医师",
    level: "正常",
    index: "1.8%",
    advice: "无特殊建议，常规监测",
    status: "ok"
  }, {
    date: "安珀历38年冬·05",
    assessor: "唐敏 副主任医师",
    level: "关注",
    index: "3.4%",
    advice: "CG-0502行动后建议增加冥想训练",
    status: "warn"
  }, {
    date: "安珀历38年秋·18",
    assessor: "许知遥 主治医师",
    level: "正常",
    index: "2.1%",
    advice: "无特殊建议",
    status: "ok"
  }, {
    date: "安珀历38年夏·03",
    assessor: "唐敏 副主任医师",
    level: "正常",
    index: "2.5%",
    advice: "初入外勤，建议每月自评",
    status: "ok"
  }];

  // === 认证申请 ===
  const [certAppList, setCertAppList] = React.useState([{
    target: "首席溯界者",
    type: "职级晋升",
    submitDate: "安珀历39年夏·26",
    status: "审核中",
    reviewer: "衔尾蛇事务所评定委员会"
  }, {
    target: "深渊级行动资质",
    type: "特殊资质",
    submitDate: "安珀历39年春·18",
    status: "已通过",
    reviewer: "IMAC资质认证中心"
  }, {
    target: "谈判专家认证",
    type: "特殊资质",
    submitDate: "安珀历38年冬·12",
    status: "已驳回",
    reviewer: "认知异常专业委员会",
    reason: "认知类异常参与经验不足，建议积累后重新申请"
  }]);
  const [certForm, setCertForm] = React.useState({
    target: "首席溯界者",
    reason: ""
  });
  const [certSubmitted, setCertSubmitted] = React.useState(false);
  const [showCertForm, setShowCertForm] = React.useState(false);
  const submitCert = () => {
    if (!certForm.reason.trim()) return;
    setCertAppList([{
      target: certForm.target,
      type: certForm.target.includes("资质") || certForm.target.includes("认证") ? "特殊资质" : "职级晋升",
      submitDate: "安珀历39年夏·30",
      status: "审核中",
      reviewer: "待分配审核人"
    }, ...certAppList]);
    setCertSubmitted(true);
    setShowCertForm(false);
  };

  // === 行动申请 ===
  const [opAppList, setOpAppList] = React.useState([{
    opCode: "LO-1045",
    opName: "失物公寓异常处置",
    submitDate: "安珀历39年夏·15",
    status: "已批准",
    role: "行动队长"
  }, {
    opCode: "SP-0890",
    opName: "镜像走廊勘探任务",
    submitDate: "安珀历39年夏·02",
    status: "已批准",
    role: "副队长"
  }, {
    opCode: "CG-0502",
    opName: "无声剧场调查",
    submitDate: "安珀历39年春·18",
    status: "已驳回",
    role: "—",
    reason: "同期已有其他任务安排"
  }]);
  const [opForm, setOpForm] = React.useState({
    opCode: "PH-0182",
    reason: "",
    availability: "夏·31 起可待命"
  });
  const [opSubmitted, setOpSubmitted] = React.useState(false);
  const [showOpForm, setShowOpForm] = React.useState(false);
  const submitOp = () => {
    if (!opForm.reason.trim()) return;
    const opNames = {
      "PH-0182": "洛林自由市边境裂隙",
      "TM-0089": "白松城冻土层时间停滞",
      "SP-1120": "回声走廊空间测量"
    };
    setOpAppList([{
      opCode: opForm.opCode,
      opName: opNames[opForm.opCode] || "待补充",
      submitDate: "安珀历39年夏·30",
      status: "审核中",
      role: "待分配"
    }, ...opAppList]);
    setOpSubmitted(true);
    setShowOpForm(false);
  };

  // === 个人档案编辑 ===
  const [editing, setEditing] = React.useState(false);
  const [profile, setProfile] = React.useState({
    name: walkerName,
    code: walkerCode,
    rank: walkerRank,
    org: walkerOrg,
    id: walkerId,
    department: "外勤二队 · 队长",
    status: "在岗",
    joinDate: "安珀历37年春·01",
    access: authLevel === "topsecret" ? "绝密级" : "机密级",
    contact: "内部通讯 #7241",
    anchor: "制式金属锚"
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "profile-center-page"
  }, /*#__PURE__*/React.createElement("style", null, `
        .profile-center-page {
          min-height: 100vh;
          padding-top: 64px;
          background-color: #07070a;
          background-image:
            linear-gradient(rgba(196, 40, 40, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196, 40, 40, 0.04) 1px, transparent 1px);
          background-size: 50px 50px;
          color: var(--text-primary);
          padding-bottom: 40px;
        }
        .profile-center-page::before {
          content: "";
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px;
          background-color: var(--accent-red-bright);
          box-shadow: 0 0 8px rgba(196, 40, 40, 0.5);
          z-index: 1000;
        }
        .pc-hero {
          background: linear-gradient(180deg, #0a0a0e 0%, #0d0d12 100%);
          border-bottom: 1px solid var(--border-color);
          padding: 24px 0 18px;
        }
        .pc-hero-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .pc-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          cursor: pointer;
          padding: 6px 12px;
          border: 1px solid var(--border-color);
          transition: all 0.2s;
        }
        .pc-back:hover {
          color: var(--accent-red-bright);
          border-color: var(--accent-red-bright);
        }
        .pc-title-group { display: flex; flex-direction: column; gap: 4px; }
        .pc-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--accent-red-bright);
        }
        .pc-title {
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .pc-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 16px;
          margin-top: 16px;
        }
        .pc-sidebar {
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: #0d0d12;
          border: 1px solid var(--border-color);
          padding: 12px 8px;
          align-self: start;
          position: sticky;
          top: 80px;
        }
        .pc-tab {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          cursor: pointer;
          color: var(--text-secondary);
          font-size: 13px;
          transition: all 0.2s;
          border-left: 2px solid transparent;
        }
        .pc-tab:hover {
          color: var(--text-primary);
          background: rgba(196, 40, 40, 0.04);
        }
        .pc-tab.active {
          color: var(--accent-red-bright);
          background: rgba(196, 40, 40, 0.08);
          border-left-color: var(--accent-red-bright);
          font-weight: 600;
        }
        .pc-tab svg { width: 16px; height: 16px; flex-shrink: 0; }
        .pc-tab-label { display: flex; flex-direction: column; gap: 2px; }
        .pc-tab-en {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .pc-tab.active .pc-tab-en { color: rgba(196, 40, 40, 0.7); }

        .pc-content { min-width: 0; }

        .pc-card {
          background-color: #0d0d12;
          border: 1px solid var(--border-color);
          overflow: hidden;
          margin-bottom: 16px;
        }
        .pc-card-header {
          padding: 14px 20px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(90deg, rgba(196, 40, 40, 0.06), transparent);
        }
        .pc-card-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .pc-card-title .code {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
        }
        .pc-card-en {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }
        .pc-card-body { padding: 20px; }

        /* Profile */
        .pc-profile-head {
          display: flex;
          gap: 24px;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .pc-avatar {
          width: 80px; height: 80px;
          border-radius: 50%;
          border: 2px solid var(--accent-red-bright);
          display: flex; align-items: center; justifyContent: center;
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 700;
          color: var(--accent-red-bright);
          background: radial-gradient(circle, rgba(196, 40, 40, 0.2), transparent);
          flex-shrink: 0;
        }
        .pc-profile-meta h2 {
          font-family: var(--font-serif);
          font-size: 22px;
          margin: 0 0 4px;
          color: var(--text-primary);
        }
        .pc-profile-id {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 10px;
        }
        .pc-badges { display: flex; gap: 8px; flex-wrap: wrap; }
        .pc-badge {
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 10px;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .pc-badge.rank {
          background: rgba(196, 40, 40, 0.15);
          color: var(--accent-red-bright);
          border: 1px solid rgba(196, 40, 40, 0.3);
        }
        .pc-badge.status-ok {
          background: rgba(47, 158, 68, 0.12);
          color: #5fb372;
          border: 1px solid rgba(47, 158, 68, 0.3);
        }
        .pc-badge.access {
          background: rgba(122, 58, 176, 0.15);
          color: #b88ed9;
          border: 1px solid rgba(122, 58, 176, 0.35);
        }
        .pc-edit-btn {
          background: none;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 6px 14px;
          font-size: 12px;
          cursor: pointer;
          font-family: var(--font-mono);
          transition: all 0.2s;
        }
        .pc-edit-btn:hover {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }
        .pc-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
        }
        .pc-info-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid var(--border-color);
          font-size: 13px;
        }
        .pc-info-label { color: var(--text-tertiary); }
        .pc-info-value { color: var(--text-primary); }
        .pc-info-value input {
          background: rgba(10, 10, 14, 0.8);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 4px 8px;
          font-size: 12px;
          width: 180px;
          text-align: right;
        }
        .pc-info-value input:focus { outline: none; border-color: var(--accent-red-bright); }

        /* Missions */
        .pc-table-head, .pc-table-row {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.7fr 0.8fr 1fr 0.7fr;
          gap: 8px;
          padding: 10px 12px;
          font-size: 12px;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        .pc-table-head {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(196, 40, 40, 0.04);
        }
        .pc-table-row:last-child { border-bottom: none; }
        .pc-table-row:hover { background: rgba(196, 40, 40, 0.03); }
        .level-badge {
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 2px;
          font-family: var(--font-mono);
          letter-spacing: 0.08em;
          display: inline-block;
        }
        .level-badge.ordinary { background: rgba(120, 120, 130, 0.15); color: #8a8a96; border: 1px solid rgba(120, 120, 130, 0.3); }
        .level-badge.hazardous { background: rgba(212, 104, 40, 0.15); color: #d68a4a; border: 1px solid rgba(212, 104, 40, 0.3); }
        .level-badge.doomed { background: rgba(196, 40, 40, 0.15); color: var(--accent-red-bright); border: 1px solid rgba(196, 40, 40, 0.3); }
        .result-success { color: var(--level-ordinary); }
        .result-partial { color: var(--level-hazardous); }
        .result-fail { color: var(--accent-red-bright); }
        .mission-code { font-family: var(--font-mono); color: var(--text-tertiary); font-size: 11px; }

        /* Training */
        .train-table-head, .train-table-row {
          display: grid;
          grid-template-columns: 1.5fr 0.8fr 0.7fr 1fr 1.2fr;
          gap: 8px;
          padding: 10px 12px;
          font-size: 12px;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        .train-table-head {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(196, 40, 40, 0.04);
        }
        .train-table-row:last-child { border-bottom: none; }
        .score-excellent { color: var(--level-ordinary); font-weight: 600; }
        .score-good { color: var(--level-hazardous); }
        .score-pass { color: var(--text-secondary); }
        .cert-name { color: var(--accent-red-bright); font-family: var(--font-mono); font-size: 11px; }

        /* Psych */
        .psych-overview {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        .psych-stat-card {
          background: rgba(10, 10, 14, 0.6);
          border: 1px solid var(--border-color);
          padding: 14px;
          text-align: center;
        }
        .psych-stat-label {
          font-size: 11px;
          color: var(--text-tertiary);
          margin-bottom: 6px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }
        .psych-stat-value {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
        }
        .psych-stat-value.ok { color: var(--level-ordinary); }
        .psych-stat-value.warn { color: var(--level-hazardous); }
        .psych-table-head, .psych-table-row {
          display: grid;
          grid-template-columns: 1fr 1fr 0.8fr 0.8fr 1.4fr;
          gap: 8px;
          padding: 10px 12px;
          font-size: 12px;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        .psych-table-head {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(196, 40, 40, 0.04);
        }
        .psych-table-row:last-child { border-bottom: none; }

        /* Cert / Op Apply */
        .apply-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .apply-btn {
          background: rgba(196, 40, 40, 0.12);
          border: 1px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          padding: 6px 16px;
          font-size: 12px;
          cursor: pointer;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
          transition: all 0.2s;
        }
        .apply-btn:hover { background: rgba(196, 40, 40, 0.25); }
        .apply-form {
          padding: 14px;
          background: rgba(10, 10, 14, 0.6);
          border: 1px solid var(--border-color);
          margin-bottom: 14px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }
        .form-field { display: flex; flex-direction: column; gap: 4px; }
        .form-label {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .form-input, .form-select, .form-textarea {
          background: rgba(10, 10, 14, 0.9);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 7px 10px;
          font-size: 12px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--accent-red-bright); }
        .form-textarea { resize: vertical; min-height: 70px; }
        .form-actions { display: flex; gap: 8px; margin-top: 4px; }
        .form-submit {
          background: rgba(196, 40, 40, 0.15);
          border: 1px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          padding: 7px 18px;
          font-size: 12px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s;
        }
        .form-submit:hover { background: rgba(196, 40, 40, 0.28); }
        .form-cancel {
          background: none;
          border: 1px solid var(--border-color);
          color: var(--text-tertiary);
          padding: 7px 18px;
          font-size: 12px;
          cursor: pointer;
          font-family: var(--font-mono);
        }
        .form-cancel:hover { border-color: var(--text-secondary); color: var(--text-secondary); }
        .form-success {
          padding: 10px 14px;
          background: rgba(47, 158, 68, 0.08);
          border: 1px solid rgba(47, 158, 68, 0.35);
          color: #5fb372;
          font-size: 12px;
          margin-bottom: 14px;
        }
        .cert-table-head, .cert-table-row {
          display: grid;
          grid-template-columns: 1fr 0.8fr 1fr 0.8fr 1fr;
          gap: 8px;
          padding: 10px 12px;
          font-size: 12px;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        .cert-table-head {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(196, 40, 40, 0.04);
        }
        .cert-table-row:last-child { border-bottom: none; }
        .cert-table-row.rejected .cert-status { color: var(--accent-red-bright); }
        .cert-table-row.approved .cert-status { color: var(--level-ordinary); }
        .cert-table-row.pending .cert-status { color: var(--level-hazardous); }
        .op-table-head, .op-table-row {
          display: grid;
          grid-template-columns: 1fr 1.4fr 1fr 0.8fr 0.8fr;
          gap: 8px;
          padding: 10px 12px;
          font-size: 12px;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        .op-table-head {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(196, 40, 40, 0.04);
        }
        .op-table-row:last-child { border-bottom: none; }
        .op-code { font-family: var(--font-mono); color: var(--text-tertiary); font-size: 11px; }

        @media (max-width: 900px) {
          .pc-layout { grid-template-columns: 1fr; }
          .pc-sidebar {
            position: static;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 8px;
          }
          .pc-tab {
            flex: 1 1 45%;
            border-left: none;
            border-bottom: 2px solid transparent;
            padding: 8px 10px;
          }
          .pc-tab.active {
            border-left: none;
            border-bottom-color: var(--accent-red-bright);
          }
          .pc-info-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .pc-table-head, .pc-table-row { grid-template-columns: 1fr 1fr; }
          .train-table-head, .train-table-row { grid-template-columns: 1fr 1fr; }
          .psych-table-head, .psych-table-row { grid-template-columns: 1fr 1fr; }
          .cert-table-head, .cert-table-row { grid-template-columns: 1fr 1fr; }
          .op-table-head, .op-table-row { grid-template-columns: 1fr 1fr; }
          .psych-overview { grid-template-columns: 1fr; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    className: "pc-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pc-label"
  }, "IMAC \xB7 PERSONNEL FILE"), /*#__PURE__*/React.createElement("h1", {
    className: "pc-title"
  }, "\u4E2A\u4EBA\u4E2D\u5FC3")), /*#__PURE__*/React.createElement("div", {
    className: "pc-back",
    onClick: () => navigate("/portal")
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5 M12 19l-7-7 7-7"
  })), "\u8FD4\u56DE\u6307\u6325\u4E2D\u5FC3")))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-sidebar"
  }, tabs.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.key,
    className: `pc-tab ${activeTab === t.key ? "active" : ""}`,
    onClick: () => setActiveTab(t.key)
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: t.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "pc-tab-label"
  }, /*#__PURE__*/React.createElement("span", null, t.label), /*#__PURE__*/React.createElement("span", {
    className: "pc-tab-en"
  }, t.en))))), /*#__PURE__*/React.createElement("div", {
    className: "pc-content"
  }, activeTab === "profile" && /*#__PURE__*/React.createElement("div", {
    className: "pc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "INFO"), "\u4E2A\u4EBA\u6863\u6848"), /*#__PURE__*/React.createElement("span", {
    className: "pc-card-en"
  }, "PERSONNEL PROFILE")), /*#__PURE__*/React.createElement("div", {
    className: "pc-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-profile-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-avatar"
  }, profile.code.charAt(0)), /*#__PURE__*/React.createElement("div", {
    className: "pc-profile-meta",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h2", null, profile.code, " \xB7 ", profile.name), /*#__PURE__*/React.createElement("div", {
    className: "pc-profile-id"
  }, profile.id), /*#__PURE__*/React.createElement("div", {
    className: "pc-badges"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pc-badge rank"
  }, profile.rank), /*#__PURE__*/React.createElement("span", {
    className: "pc-badge status-ok"
  }, "\u25CF ", profile.status), /*#__PURE__*/React.createElement("span", {
    className: "pc-badge access"
  }, profile.access))), /*#__PURE__*/React.createElement("button", {
    className: "pc-edit-btn",
    onClick: () => setEditing(!editing)
  }, editing ? "保存" : "编辑资料")), /*#__PURE__*/React.createElement("div", {
    className: "pc-info-grid"
  }, [{
    key: "name",
    label: "姓名"
  }, {
    key: "code",
    label: "代号"
  }, {
    key: "rank",
    label: "职级"
  }, {
    key: "org",
    label: "所属组织"
  }, {
    key: "id",
    label: "IMAC编号"
  }, {
    key: "department",
    label: "部门/职务"
  }, {
    key: "joinDate",
    label: "入职时间"
  }, {
    key: "status",
    label: "当前状态"
  }, {
    key: "access",
    label: "权限等级"
  }, {
    key: "contact",
    label: "内部通讯"
  }, {
    key: "anchor",
    label: "个人锚定物"
  }].map(f => /*#__PURE__*/React.createElement("div", {
    key: f.key,
    className: "pc-info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pc-info-label"
  }, f.label), /*#__PURE__*/React.createElement("span", {
    className: "pc-info-value"
  }, editing && ["name", "contact", "anchor"].includes(f.key) ? /*#__PURE__*/React.createElement("input", {
    value: profile[f.key],
    onChange: e => setProfile({
      ...profile,
      [f.key]: e.target.value
    })
  }) : profile[f.key])))))), activeTab === "missions" && /*#__PURE__*/React.createElement("div", {
    className: "pc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "MIS"), "\u4EFB\u52A1\u5386\u53F2"), /*#__PURE__*/React.createElement("span", {
    className: "pc-card-en"
  }, "MISSION HISTORY")), /*#__PURE__*/React.createElement("div", {
    className: "pc-card-body",
    style: {
      padding: "12px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-table-head"
  }, /*#__PURE__*/React.createElement("span", null, "\u884C\u52A8\u540D\u79F0"), /*#__PURE__*/React.createElement("span", null, "\u7F16\u53F7"), /*#__PURE__*/React.createElement("span", null, "\u7B49\u7EA7"), /*#__PURE__*/React.createElement("span", null, "\u89D2\u8272"), /*#__PURE__*/React.createElement("span", null, "\u65F6\u95F4"), /*#__PURE__*/React.createElement("span", null, "\u7ED3\u679C")), missionHistory.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "pc-table-row"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, m.name), /*#__PURE__*/React.createElement("span", {
    className: "mission-code"
  }, m.code), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: `level-badge ${m.levelClass}`
  }, m.level)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, m.role), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, m.time), /*#__PURE__*/React.createElement("span", {
    className: `result-${m.result === "成功" ? "success" : m.result === "部分成功" ? "partial" : "fail"}`
  }, m.result))))), activeTab === "training" && /*#__PURE__*/React.createElement("div", {
    className: "pc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "TRN"), "\u57F9\u8BAD\u8BB0\u5F55"), /*#__PURE__*/React.createElement("span", {
    className: "pc-card-en"
  }, "TRAINING RECORDS")), /*#__PURE__*/React.createElement("div", {
    className: "pc-card-body",
    style: {
      padding: "12px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "train-table-head"
  }, /*#__PURE__*/React.createElement("span", null, "\u8BFE\u7A0B\u540D\u79F0"), /*#__PURE__*/React.createElement("span", null, "\u7C7B\u578B"), /*#__PURE__*/React.createElement("span", null, "\u6210\u7EE9"), /*#__PURE__*/React.createElement("span", null, "\u7ED3\u8BAD\u65E5\u671F"), /*#__PURE__*/React.createElement("span", null, "\u83B7\u5F97\u8BC1\u4E66")), trainingRecords.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "train-table-row"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, t.name), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, t.type), /*#__PURE__*/React.createElement("span", {
    className: `score-${t.score === "优秀" ? "excellent" : t.score === "良好" ? "good" : "pass"}`
  }, t.score), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, t.date), /*#__PURE__*/React.createElement("span", {
    className: "cert-name"
  }, t.cert))))), activeTab === "psych" && /*#__PURE__*/React.createElement("div", {
    className: "pc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "PSY"), "\u5FC3\u7406\u8BC4\u4F30"), /*#__PURE__*/React.createElement("span", {
    className: "pc-card-en"
  }, "PSYCHOLOGICAL EVALUATION")), /*#__PURE__*/React.createElement("div", {
    className: "pc-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "psych-overview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-label"
  }, "\u5F53\u524D\u72B6\u6001"), /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-value ok"
  }, "\u6B63\u5E38")), /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-label"
  }, "\u540C\u5316\u6307\u6570"), /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-value ok"
  }, "1.2%")), /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-label"
  }, "\u4E0B\u6B21\u8BC4\u4F30"), /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-value",
    style: {
      color: "var(--accent-red-bright)"
    }
  }, "\u79CB\xB720"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 -20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "psych-table-head"
  }, /*#__PURE__*/React.createElement("span", null, "\u8BC4\u4F30\u65E5\u671F"), /*#__PURE__*/React.createElement("span", null, "\u8BC4\u4F30\u5E08"), /*#__PURE__*/React.createElement("span", null, "\u8BC4\u5B9A\u7B49\u7EA7"), /*#__PURE__*/React.createElement("span", null, "\u540C\u5316\u6307\u6570"), /*#__PURE__*/React.createElement("span", null, "\u5EFA\u8BAE")), psychRecords.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "psych-table-row"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, p.date), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, p.assessor), /*#__PURE__*/React.createElement("span", {
    className: p.status === "ok" ? "result-success" : "result-partial"
  }, p.level), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)",
      fontFamily: "var(--font-mono)"
    }
  }, p.index), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)",
      fontSize: "11px"
    }
  }, p.advice)))))), activeTab === "cert" && /*#__PURE__*/React.createElement("div", {
    className: "pc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "CERT"), "\u8BA4\u8BC1\u7533\u8BF7"), /*#__PURE__*/React.createElement("span", {
    className: "pc-card-en"
  }, "CERTIFICATION APPLICATION")), /*#__PURE__*/React.createElement("div", {
    className: "pc-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "apply-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "var(--text-secondary)"
    }
  }, "\u5F53\u524D\u804C\u7EA7\uFF1A", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-primary)"
    }
  }, walkerRank), "\xA0\xB7\xA0 \u53EF\u7533\u8BF7\uFF1A", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--accent-red-bright)"
    }
  }, "\u9996\u5E2D\u6EAF\u754C\u8005"), " \u53CA\u591A\u9879\u7279\u6B8A\u8D44\u8D28"), /*#__PURE__*/React.createElement("button", {
    className: "apply-btn",
    onClick: () => {
      setShowCertForm(!showCertForm);
      setCertSubmitted(false);
    }
  }, showCertForm ? "取消申请" : "+ 提交新申请")), certSubmitted && /*#__PURE__*/React.createElement("div", {
    className: "form-success"
  }, "\u2713 \u7533\u8BF7\u5DF2\u63D0\u4EA4\uFF0C\u7B49\u5F85\u5BA1\u6838\u3002\u5BA1\u6838\u7ED3\u679C\u5C06\u901A\u8FC7\u7CFB\u7EDF\u90AE\u7BB1\u901A\u77E5\u3002"), showCertForm && /*#__PURE__*/React.createElement("div", {
    className: "apply-form"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u7533\u8BF7\u7C7B\u578B"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: certForm.target,
    onChange: e => setCertForm({
      ...certForm,
      target: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "\u9996\u5E2D\u6EAF\u754C\u8005"), /*#__PURE__*/React.createElement("option", null, "\u6DF1\u6E0A\u7EA7\u884C\u52A8\u8D44\u8D28"), /*#__PURE__*/React.createElement("option", null, "\u8C08\u5224\u4E13\u5BB6\u8BA4\u8BC1"), /*#__PURE__*/React.createElement("option", null, "\u951A\u5B9A\u6280\u672F\u4E13\u5BB6"), /*#__PURE__*/React.createElement("option", null, "\u533B\u7597\u6025\u6551\u8BA4\u8BC1"))), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u63A8\u8350\u4EBA\uFF08\u9009\u586B\uFF09"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "\u4EE3\u53F7\u6216\u7F16\u53F7"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-field",
    style: {
      marginBottom: "10px"
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u7533\u8BF7\u7406\u7531"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-textarea",
    value: certForm.reason,
    onChange: e => setCertForm({
      ...certForm,
      reason: e.target.value
    }),
    placeholder: "\u8BF7\u7B80\u8981\u8BF4\u660E\u7533\u8BF7\u7406\u7531\u3001\u4E3B\u8981\u8D21\u732E\u4E0E\u4EE3\u8868\u6027\u884C\u52A8..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field",
    style: {
      marginBottom: "10px"
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u8BC1\u660E\u6750\u6599\uFF08\u6A21\u62DF\u4E0A\u4F20\uFF09"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "11px",
      color: "var(--text-tertiary)",
      padding: "8px",
      border: "1px dashed var(--border-color)",
      textAlign: "center"
    }
  }, "[ \u70B9\u51FB\u4E0A\u4F20\u76F8\u5173\u8BC1\u660E\u6750\u6599 \xB7 \u652F\u6301 PDF/JPG \xB7 \u5355\u6587\u4EF6 \u226410MB ]")), /*#__PURE__*/React.createElement("div", {
    className: "form-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "form-submit",
    onClick: submitCert
  }, "\u63D0\u4EA4\u7533\u8BF7"), /*#__PURE__*/React.createElement("button", {
    className: "form-cancel",
    onClick: () => setShowCertForm(false)
  }, "\u53D6\u6D88"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "var(--text-tertiary)",
      marginBottom: "8px"
    }
  }, "\u7533\u8BF7\u8BB0\u5F55"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-color)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cert-table-head"
  }, /*#__PURE__*/React.createElement("span", null, "\u76EE\u6807\u8BA4\u8BC1"), /*#__PURE__*/React.createElement("span", null, "\u7C7B\u578B"), /*#__PURE__*/React.createElement("span", null, "\u63D0\u4EA4\u65E5\u671F"), /*#__PURE__*/React.createElement("span", null, "\u72B6\u6001"), /*#__PURE__*/React.createElement("span", null, "\u5BA1\u6838\u4EBA")), certAppList.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `cert-table-row ${c.status === "已通过" ? "approved" : c.status === "审核中" ? "pending" : "rejected"}`
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, c.target), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, c.type), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, c.submitDate), /*#__PURE__*/React.createElement("span", {
    className: "cert-status"
  }, c.status), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)",
      fontSize: "11px"
    }
  }, c.reviewer)))))), activeTab === "opapp" && /*#__PURE__*/React.createElement("div", {
    className: "pc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "OP"), "\u884C\u52A8\u7533\u8BF7"), /*#__PURE__*/React.createElement("span", {
    className: "pc-card-en"
  }, "OPERATION APPLICATION")), /*#__PURE__*/React.createElement("div", {
    className: "pc-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "apply-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "var(--text-secondary)"
    }
  }, "\u7533\u8BF7\u52A0\u5165\u8054\u5408\u884C\u52A8 / \u72EC\u7ACB\u884C\u52A8\u8BB8\u53EF / \u88C5\u5907\u8D44\u6E90\u652F\u63F4"), /*#__PURE__*/React.createElement("button", {
    className: "apply-btn",
    onClick: () => {
      setShowOpForm(!showOpForm);
      setOpSubmitted(false);
    }
  }, showOpForm ? "取消申请" : "+ 提交新申请")), opSubmitted && /*#__PURE__*/React.createElement("div", {
    className: "form-success"
  }, "\u2713 \u884C\u52A8\u7533\u8BF7\u5DF2\u63D0\u4EA4\uFF0C\u7B49\u5F85\u6307\u6325\u4E2D\u5FC3\u5BA1\u6279\u3002\u5BA1\u6279\u7ED3\u679C\u5C06\u901A\u8FC7\u7CFB\u7EDF\u90AE\u7BB1\u901A\u77E5\u3002"), showOpForm && /*#__PURE__*/React.createElement("div", {
    className: "apply-form"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u7533\u8BF7\u7C7B\u578B"), /*#__PURE__*/React.createElement("select", {
    className: "form-select"
  }, /*#__PURE__*/React.createElement("option", null, "\u8054\u5408\u884C\u52A8\u53C2\u4E0E\u7533\u8BF7"), /*#__PURE__*/React.createElement("option", null, "\u72EC\u7ACB\u884C\u52A8\u8BB8\u53EF\u7533\u8BF7"), /*#__PURE__*/React.createElement("option", null, "\u88C5\u5907/\u8D44\u6E90\u652F\u63F4\u7533\u8BF7"))), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u76EE\u6807\u884C\u52A8\u7F16\u53F7"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: opForm.opCode,
    onChange: e => setOpForm({
      ...opForm,
      opCode: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: "PH-0182"
  }, "PH-0182 \u6D1B\u6797\u81EA\u7531\u5E02\u8FB9\u5883\u88C2\u9699"), /*#__PURE__*/React.createElement("option", {
    value: "TM-0089"
  }, "TM-0089 \u767D\u677E\u57CE\u51BB\u571F\u5C42\u65F6\u95F4\u505C\u6EDE"), /*#__PURE__*/React.createElement("option", {
    value: "SP-1120"
  }, "SP-1120 \u56DE\u58F0\u8D70\u5ECA")))), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u53EF\u7528\u65F6\u95F4"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    value: opForm.availability,
    onChange: e => setOpForm({
      ...opForm,
      availability: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u7533\u8BF7\u89D2\u8272"), /*#__PURE__*/React.createElement("select", {
    className: "form-select"
  }, /*#__PURE__*/React.createElement("option", null, "\u884C\u52A8\u961F\u957F"), /*#__PURE__*/React.createElement("option", null, "\u526F\u961F\u957F"), /*#__PURE__*/React.createElement("option", null, "\u961F\u5458"), /*#__PURE__*/React.createElement("option", null, "\u6280\u672F\u652F\u63F4")))), /*#__PURE__*/React.createElement("div", {
    className: "form-field",
    style: {
      marginBottom: "10px"
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u7533\u8BF7\u7406\u7531"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-textarea",
    value: opForm.reason,
    onChange: e => setOpForm({
      ...opForm,
      reason: e.target.value
    }),
    placeholder: "\u8BF7\u7B80\u8FF0\u7533\u8BF7\u7406\u7531\u3001\u76F8\u5173\u7ECF\u9A8C\u4E0E\u9884\u671F\u8D21\u732E..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "form-submit",
    onClick: submitOp
  }, "\u63D0\u4EA4\u7533\u8BF7"), /*#__PURE__*/React.createElement("button", {
    className: "form-cancel",
    onClick: () => setShowOpForm(false)
  }, "\u53D6\u6D88"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "var(--text-tertiary)",
      marginBottom: "8px"
    }
  }, "\u6211\u7684\u7533\u8BF7\u8BB0\u5F55"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-color)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-table-head"
  }, /*#__PURE__*/React.createElement("span", null, "\u884C\u52A8\u7F16\u53F7"), /*#__PURE__*/React.createElement("span", null, "\u884C\u52A8\u540D\u79F0"), /*#__PURE__*/React.createElement("span", null, "\u7533\u8BF7\u65F6\u95F4"), /*#__PURE__*/React.createElement("span", null, "\u72B6\u6001"), /*#__PURE__*/React.createElement("span", null, "\u5206\u914D\u89D2\u8272")), opAppList.map((o, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `op-table-row ${o.status === "已批准" ? "approved" : o.status === "审核中" ? "pending" : "rejected"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "op-code"
  }, o.opCode), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, o.opName), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, o.submitDate), /*#__PURE__*/React.createElement("span", {
    className: "cert-status"
  }, o.status === "已批准" && /*#__PURE__*/React.createElement("span", {
    className: "result-success"
  }, o.status), o.status === "审核中" && /*#__PURE__*/React.createElement("span", {
    className: "result-partial"
  }, o.status), o.status === "已驳回" && /*#__PURE__*/React.createElement("span", {
    className: "result-fail"
  }, o.status)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, o.role)))))))))));
}
window.ProfileCenterPage = ProfileCenterPage;;
function RegisterPage() {
  const {
    navigate
  } = useRouter();
  const [formData, setFormData] = React.useState({
    realName: "",
    codename: "",
    imacId: "",
    organization: "",
    rank: "见习",
    password: "",
    confirmPassword: "",
    contact: "",
    agreement: false
  });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const organizations = ["衔尾蛇事务所", "北境守望", "边界研究院 BRI", "晨星团", "第四面墙", "悬铃木学会", "白夜哨站", "长桥会社"];
  const ranks = ["见习", "溯界者"];

  // 密码强度计算
  const passwordStrength = (() => {
    const pwd = formData.password || "";
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (pwd.length >= 12) score++;
    return Math.min(score, 4);
  })();
  const strengthLabels = ["极弱", "弱", "一般", "强", "极强"];
  const strengthColors = ["#5a5a5a", "#c44040", "#c97a2a", "#2e8b57", "#2e8b57"];
  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
    if (errors[key]) {
      setErrors({
        ...errors,
        [key]: ""
      });
    }
  };
  const validate = () => {
    const newErrors = {};
    if (!formData.realName.trim()) newErrors.realName = "请输入真实姓名";
    if (!formData.codename.trim()) newErrors.codename = "请输入代号";
    if (!formData.imacId.trim()) {
      newErrors.imacId = "请输入IMAC编号";
    } else if (!/^IMAC-[A-Z0-9]+-\d+$/i.test(formData.imacId.trim())) {
      newErrors.imacId = "IMAC编号格式应为 IMAC-组织缩写-编号，如 IMAC-OA-0312";
    }
    if (!formData.organization) newErrors.organization = "请选择所属组织";
    if (!formData.password) {
      newErrors.password = "请设置密码";
    } else if (formData.password.length < 8) {
      newErrors.password = "密码长度至少8位";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "请再次输入密码";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "两次输入的密码不一致";
    }
    if (!formData.contact.trim()) newErrors.contact = "请输入联系方式";
    if (!formData.agreement) newErrors.agreement = "请阅读并同意相关协议";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };
  const inputClass = key => `reg-input ${errors[key] ? "error" : ""}`;
  return /*#__PURE__*/React.createElement("div", {
    className: "register-page"
  }, /*#__PURE__*/React.createElement("style", null, `
        .register-page {
          min-height: 100vh;
          padding-top: 64px;
          padding-bottom: 60px;
          background-color: #07070a;
          background-image:
            linear-gradient(rgba(196, 40, 40, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196, 40, 40, 0.04) 1px, transparent 1px);
          background-size: 50px 50px;
          color: var(--text-primary);
          position: relative;
        }
        .register-page::before {
          content: "";
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px;
          background-color: var(--accent-red-bright);
          box-shadow: 0 0 8px rgba(196, 40, 40, 0.5);
          z-index: 1000;
        }
        .register-watermark {
          position: fixed;
          top: 50%; right: -80px;
          transform: translateY(-50%) rotate(90deg);
          font-family: var(--font-mono);
          font-size: 180px;
          font-weight: 900;
          color: rgba(196, 40, 40, 0.03);
          letter-spacing: 0.05em;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .register-container {
          max-width: 720px;
          margin: 0 auto;
          padding: 40px 24px;
          position: relative;
          z-index: 1;
        }
        .reg-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .reg-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--accent-red-bright);
          margin-bottom: 12px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .reg-label::before, .reg-label::after {
          content: "";
          width: 28px; height: 1px;
          background-color: var(--accent-red-bright);
          opacity: 0.5;
        }
        .reg-title {
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin: 0 0 12px;
          color: var(--text-primary);
        }
        .reg-subtitle {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto;
        }
        .reg-tip {
          margin-top: 14px;
          font-size: 12px;
          color: var(--text-tertiary);
        }
        .reg-tip a {
          color: var(--accent-red-bright);
          text-decoration: none;
          cursor: pointer;
        }
        .reg-tip a:hover { text-decoration: underline; }

        .reg-classification-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background-color: rgba(196, 40, 40, 0.1);
          border: 1px solid rgba(196, 40, 40, 0.3);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.15em;
          margin-bottom: 16px;
        }
        .reg-classification-tag .dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background-color: var(--accent-red-bright);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .reg-form-card {
          background-color: rgba(12, 12, 16, 0.85);
          border: 1px solid var(--border-color);
          backdrop-filter: blur(4px);
        }
        .reg-form-card::before {
          content: "";
          display: block;
          height: 3px;
          background-color: var(--accent-red-bright);
        }

        .reg-section {
          padding: 28px 32px;
          border-bottom: 1px solid var(--border-color);
        }
        .reg-section:last-of-type { border-bottom: none; }

        .reg-section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(196, 40, 40, 0.2);
        }
        .reg-section-num {
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          background-color: var(--accent-red-bright);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
        }
        .reg-section-name {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .reg-section-en {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }

        .reg-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 20px;
        }
        .reg-grid-full { grid-column: 1 / -1; }

        .reg-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .reg-label-text {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .reg-label-text .req { color: var(--accent-red-bright); margin-right: 4px; }
        .reg-input, .reg-select, .reg-textarea {
          width: 100%;
          padding: 10px 12px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 13px;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          box-sizing: border-box;
        }
        .reg-textarea { resize: vertical; min-height: 72px; }
        .reg-input:focus, .reg-select:focus, .reg-textarea:focus {
          border-color: var(--accent-red-bright);
          box-shadow: 0 0 0 2px rgba(196, 40, 40, 0.15);
        }
        .reg-input.error, .reg-select.error, .reg-textarea.error {
          border-color: var(--accent-red-bright);
        }
        .reg-field-hint {
          font-size: 11px;
          color: var(--text-tertiary);
          line-height: 1.4;
        }
        .reg-error-text {
          font-size: 11px;
          color: var(--accent-red-bright);
          line-height: 1.4;
        }

        .reg-strength-bar {
          display: flex;
          gap: 4px;
          margin-top: 4px;
        }
        .reg-strength-bar span {
          flex: 1;
          height: 4px;
          background-color: var(--bg-tertiary);
          transition: background-color 0.2s;
        }
        .reg-strength-bar span.active { background-color: var(--accent-red-bright); }
        .reg-strength-text {
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-tertiary);
          margin-top: 4px;
        }

        .reg-checkbox-field {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 14px 16px;
          background-color: rgba(196, 40, 40, 0.04);
          border: 1px solid rgba(196, 40, 40, 0.15);
        }
        .reg-checkbox-field input[type="checkbox"] {
          margin-top: 2px;
          accent-color: var(--accent-red-bright);
          cursor: pointer;
        }
        .reg-checkbox-label {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .reg-checkbox-label a {
          color: var(--accent-red-bright);
          text-decoration: none;
          cursor: pointer;
        }
        .reg-checkbox-label a:hover { text-decoration: underline; }

        .reg-submit-btn {
          width: 100%;
          padding: 14px;
          background-color: var(--accent-red-bright);
          border: none;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .reg-submit-btn:hover { background-color: #d43a3a; }
        .reg-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .reg-footer-links {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .reg-footer-links a {
          color: var(--accent-red-bright);
          text-decoration: none;
          cursor: pointer;
          margin: 0 4px;
        }
        .reg-footer-links a:hover { text-decoration: underline; }
        .reg-footer-links .divider {
          color: var(--border-color);
          margin: 0 8px;
        }

        /* 成功状态 */
        .reg-success-card {
          text-align: center;
          padding: 60px 40px;
          background-color: rgba(12, 12, 16, 0.85);
          border: 1px solid var(--border-color);
        }
        .reg-success-card::before {
          content: "";
          display: block;
          height: 3px;
          background-color: var(--level-ordinary);
          margin: -60px -40px 40px;
        }
        .reg-success-icon {
          width: 72px; height: 72px;
          margin: 0 auto 24px;
          border-radius: 50%;
          background-color: rgba(46, 139, 87, 0.1);
          border: 2px solid var(--level-ordinary);
          display: flex; align-items: center; justify-content: center;
        }
        .reg-success-icon svg {
          width: 36px; height: 36px;
          stroke: var(--level-ordinary);
        }
        .reg-success-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-primary);
        }
        .reg-success-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 420px;
          margin: 0 auto 28px;
        }
        .reg-success-info {
          text-align: left;
          padding: 16px 20px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          max-width: 360px;
          margin: 0 auto 28px;
          font-family: var(--font-mono);
          font-size: 12px;
          line-height: 2;
        }
        .reg-success-info .info-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
        }
        .reg-success-info .info-key { color: var(--text-tertiary); }
        .reg-success-info .info-val { color: var(--text-primary); }
        .reg-success-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .reg-btn-secondary {
          padding: 10px 24px;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .reg-btn-secondary:hover {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }
        .reg-btn-primary {
          padding: 10px 24px;
          background-color: var(--accent-red-bright);
          border: none;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        .reg-btn-primary:hover { background-color: #d43a3a; }

        @media (max-width: 640px) {
          .reg-grid { grid-template-columns: 1fr; }
          .reg-section { padding: 20px; }
          .reg-title { font-size: 24px; }
          .register-container { padding: 24px 16px; }
          .reg-success-card { padding: 40px 20px; }
          .reg-success-card::before { margin: -40px -20px 28px; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "register-watermark"
  }, "IMAC CONFIDENTIAL"), /*#__PURE__*/React.createElement("div", {
    className: "register-container"
  }, submitted ? /*#__PURE__*/React.createElement("div", {
    className: "reg-success-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-success-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("h2", {
    className: "reg-success-title"
  }, "\u6CE8\u518C\u7533\u8BF7\u5DF2\u63D0\u4EA4"), /*#__PURE__*/React.createElement("p", {
    className: "reg-success-desc"
  }, "\u60A8\u7684\u6EAF\u754C\u8005\u8D26\u53F7\u6CE8\u518C\u7533\u8BF7\u5DF2\u63D0\u4EA4\u81F3 IMAC \u4E2D\u592E\u6570\u636E\u5E93\u6838\u9A8C\u3002 \u7CFB\u7EDF\u5C06\u5728 24 \u5C0F\u65F6\u5185\u5B8C\u6210\u8EAB\u4EFD\u6BD4\u5BF9\uFF0C\u7ED3\u679C\u5C06\u901A\u8FC7\u5185\u90E8\u901A\u8BAF\u6E20\u9053\u901A\u77E5\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "reg-success-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u7533\u8BF7\u7F16\u53F7"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, "REG-", Math.floor(Math.random() * 9000 + 1000), "-", formData.imacId.slice(-4).toUpperCase() || "XXXX")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u6EAF\u754C\u8005\u4EE3\u53F7"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, formData.codename || "—")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u6240\u5C5E\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, formData.organization || "—")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u72B6\u6001"), /*#__PURE__*/React.createElement("span", {
    className: "info-val",
    style: {
      color: "var(--level-ordinary)"
    }
  }, "\u6838\u9A8C\u4E2D"))), /*#__PURE__*/React.createElement("div", {
    className: "reg-success-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "reg-btn-primary",
    onClick: () => navigate("/auth")
  }, "\u8FD4\u56DE\u767B\u5F55"), /*#__PURE__*/React.createElement("button", {
    className: "reg-btn-secondary",
    onClick: () => navigate("/")
  }, "\u8FD4\u56DE\u9996\u9875"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "reg-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-classification-tag"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "CONFIDENTIAL \xB7 \u673A\u5BC6\u7EA7"), /*#__PURE__*/React.createElement("div", {
    className: "reg-label"
  }, "ANOMALIST ACCOUNT REGISTRATION"), /*#__PURE__*/React.createElement("h1", {
    className: "reg-title"
  }, "\u6EAF\u754C\u8005\u8D26\u53F7\u6CE8\u518C"), /*#__PURE__*/React.createElement("p", {
    className: "reg-subtitle"
  }, "\u672C\u9875\u9762\u7528\u4E8E\u5DF2\u901A\u8FC7 IMAC \u8BA4\u8BC1\u7684\u6EAF\u754C\u8005\u6CE8\u518C\u5185\u90E8\u7CFB\u7EDF\u8D26\u53F7\u3002 \u6CE8\u518C\u9700\u63D0\u4F9B\u771F\u5B9E\u8EAB\u4EFD\u4FE1\u606F\uFF0C\u6240\u6709\u6570\u636E\u7ECF IMAC \u4E2D\u592E\u6570\u636E\u5E93\u6838\u9A8C\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "reg-tip"
  }, "\u5C1A\u672A\u6210\u4E3A\u6EAF\u754C\u8005\uFF1F", /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/join")
  }, "\u524D\u5F80\"\u52A0\u5165\u6211\u4EEC\"\u4E86\u89E3\u7533\u8BF7\u6D41\u7A0B"))), /*#__PURE__*/React.createElement("form", {
    className: "reg-form-card",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-section-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "reg-section-num"
  }, "1"), /*#__PURE__*/React.createElement("span", {
    className: "reg-section-name"
  }, "\u57FA\u672C\u4FE1\u606F"), /*#__PURE__*/React.createElement("span", {
    className: "reg-section-en"
  }, "BASIC INFO")), /*#__PURE__*/React.createElement("div", {
    className: "reg-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u771F\u5B9E\u59D3\u540D"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputClass("realName"),
    value: formData.realName,
    onChange: e => handleChange("realName", e.target.value),
    placeholder: "\u8BF7\u8F93\u5165\u771F\u5B9E\u59D3\u540D"
  }), errors.realName && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.realName)), /*#__PURE__*/React.createElement("div", {
    className: "reg-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u4EE3\u53F7 / \u547C\u53F7"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputClass("codename"),
    value: formData.codename,
    onChange: e => handleChange("codename", e.target.value),
    placeholder: "\u884C\u52A8\u4E2D\u4F7F\u7528\u7684\u4EE3\u53F7"
  }), errors.codename && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.codename)), /*#__PURE__*/React.createElement("div", {
    className: "reg-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "IMAC \u7F16\u53F7"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputClass("imacId"),
    value: formData.imacId,
    onChange: e => handleChange("imacId", e.target.value),
    placeholder: "IMAC-OA-0312"
  }), /*#__PURE__*/React.createElement("span", {
    className: "reg-field-hint"
  }, "\u683C\u5F0F\uFF1AIMAC-\u6240\u5C5E\u7EC4\u7EC7\u7F29\u5199-\u7F16\u53F7\uFF0C\u7531\u6240\u5C5E\u7EC4\u7EC7\u5206\u914D"), errors.imacId && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.imacId)), /*#__PURE__*/React.createElement("div", {
    className: "reg-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u6240\u5C5E\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("select", {
    className: `reg-select ${errors.organization ? "error" : ""}`,
    value: formData.organization,
    onChange: e => handleChange("organization", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u8BF7\u9009\u62E9"), organizations.map(org => /*#__PURE__*/React.createElement("option", {
    key: org,
    value: org
  }, org))), errors.organization && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.organization)), /*#__PURE__*/React.createElement("div", {
    className: "reg-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u804C\u7EA7"), /*#__PURE__*/React.createElement("select", {
    className: "reg-select",
    value: formData.rank,
    onChange: e => handleChange("rank", e.target.value)
  }, ranks.map(r => /*#__PURE__*/React.createElement("option", {
    key: r,
    value: r
  }, r))), /*#__PURE__*/React.createElement("span", {
    className: "reg-field-hint"
  }, "\u6CE8\u518C\u8D26\u53F7\u9ED8\u8BA4\u804C\u7EA7\u4E3A\u300C\u89C1\u4E60\u300D"), errors.rank && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.rank)), /*#__PURE__*/React.createElement("div", {
    className: "reg-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u8054\u7CFB\u65B9\u5F0F"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputClass("contact"),
    value: formData.contact,
    onChange: e => handleChange("contact", e.target.value),
    placeholder: "\u90AE\u7BB1\u6216\u5185\u90E8\u901A\u8BAF\u53F7"
  }), errors.contact && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.contact)))), /*#__PURE__*/React.createElement("div", {
    className: "reg-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-section-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "reg-section-num"
  }, "2"), /*#__PURE__*/React.createElement("span", {
    className: "reg-section-name"
  }, "\u8D26\u53F7\u5B89\u5168"), /*#__PURE__*/React.createElement("span", {
    className: "reg-section-en"
  }, "SECURITY")), /*#__PURE__*/React.createElement("div", {
    className: "reg-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-field reg-grid-full"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u8BBE\u7F6E\u5BC6\u7801"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    className: inputClass("password"),
    value: formData.password,
    onChange: e => handleChange("password", e.target.value),
    placeholder: "\u81F3\u5C118\u4F4D\uFF0C\u5EFA\u8BAE\u5305\u542B\u5927\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u548C\u7B26\u53F7"
  }), /*#__PURE__*/React.createElement("div", {
    className: "reg-strength-bar"
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: i < passwordStrength ? "active" : ""
  }))), /*#__PURE__*/React.createElement("div", {
    className: "reg-strength-text"
  }, "\u5BC6\u7801\u5F3A\u5EA6\uFF1A", formData.password ? strengthLabels[passwordStrength] : "请输入密码"), errors.password && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.password)), /*#__PURE__*/React.createElement("div", {
    className: "reg-field reg-grid-full"
  }, /*#__PURE__*/React.createElement("label", {
    className: "reg-label-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u786E\u8BA4\u5BC6\u7801"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    className: inputClass("confirmPassword"),
    value: formData.confirmPassword,
    onChange: e => handleChange("confirmPassword", e.target.value),
    placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801"
  }), errors.confirmPassword && /*#__PURE__*/React.createElement("span", {
    className: "reg-error-text"
  }, errors.confirmPassword)))), /*#__PURE__*/React.createElement("div", {
    className: "reg-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-checkbox-field",
    style: {
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "reg-agreement",
    checked: formData.agreement,
    onChange: e => handleChange("agreement", e.target.checked)
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "reg-agreement",
    className: "reg-checkbox-label"
  }, "\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F", /*#__PURE__*/React.createElement("a", null, "\u300AIMAC \u6EAF\u754C\u8005\u4FDD\u5BC6\u534F\u8BAE\u300B"), "\u53CA", /*#__PURE__*/React.createElement("a", null, "\u300A\u5F02\u5E38\u884C\u52A8\u5B89\u5168\u51C6\u5219\u300B"), "\uFF0C \u627F\u8BFA\u6240\u586B\u4FE1\u606F\u771F\u5B9E\u6709\u6548\uFF0C\u613F\u610F\u63A5\u53D7\u8EAB\u4EFD\u6838\u9A8C\u53CA\u76F8\u5E94\u7EAA\u5F8B\u7EA6\u675F\u3002")), errors.agreement && /*#__PURE__*/React.createElement("div", {
    className: "reg-error-text",
    style: {
      marginBottom: "12px"
    }
  }, errors.agreement), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "reg-submit-btn"
  }, "\u63D0 \u4EA4 \u6CE8 \u518C"))), /*#__PURE__*/React.createElement("div", {
    className: "reg-footer-links"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/auth")
  }, "\u5DF2\u6709\u8D26\u53F7\uFF1F\u8FD4\u56DE\u767B\u5F55"), /*#__PURE__*/React.createElement("span", {
    className: "divider"
  }, "|"), /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/join")
  }, "\u8FD8\u4E0D\u662F\u6EAF\u754C\u8005\uFF1F\u4E86\u89E3\u52A0\u5165\u6D41\u7A0B")))));
}
window.RegisterPage = RegisterPage;;
function MailboxPage() {
  const {
    navigate
  } = useRouter();
  const [mailList] = React.useState([{
    id: 1,
    from: "联合行动指挥中心",
    subject: "PH-0182 洛林裂隙行动调令（第3号）",
    time: "夏·30 16:47",
    unread: true,
    important: true,
    summary: "BRI空间异常研究所、晨星团行动部：PH-0182 洛林裂隙联合行动进入第3阶段...",
    body: "调字第2024-087号\n\nBRI空间异常研究所、晨星团行动部：\n\nPH-0182 洛林裂隙联合行动进入第3阶段（边界测绘），需增派2名空间测绘类溯界者及1台MK-III型信标阵列。\n\n请于夏·31 12:00前完成人员集结，地点：洛林边境前哨站。\n\n行动指挥：陆明远（首席科学家）\n联合行动指挥中心  安珀历39年夏·30"
  }, {
    id: 2,
    from: "IMAC人事部",
    subject: "关于安珀历39年秋季溯界者轮训安排的通知",
    time: "夏·30 09:12",
    unread: true,
    important: true,
    summary: "各缔约组织、全体在档溯界者：秋季轮训定于秋·05正式启动，涵盖四个模块...",
    body: "各缔约组织、全体在档溯界者：\n\n根据《溯界者年度培训规程》第4.2条，安珀历39年秋季轮训定于秋·05正式启动。\n\n本次轮训涵盖：\n1. 异常识别进阶\n2. 同化抑制剂使用\n3. 锚定物校准实操\n4. 应急撤退演练\n\n培训地点：IMAC中央训练基地\n参训人员：所有外勤岗溯界者（含各组织派驻人员）\n\n请各单位于秋·02前完成参训人员名单上报。\n\nIMAC人事部 培训与认证中心"
  }, {
    id: 3,
    from: "医疗保障部",
    subject: "您的季度心理评估结果已出具",
    time: "夏·28 11:20",
    unread: true,
    important: false,
    summary: "溯界者赤鸦：您的夏季心理评估已完成，综合评估结果：正常。认知同化指数 1.2%...",
    body: "溯界者赤鸦：\n\n您的安珀历39年夏季心理评估已完成，综合评估结果为：正常。\n\n认知同化指数：1.2%（安全阈值 ≤ 5%）\n建议：保持当前作息节律，秋季复测时间为安珀历39年秋·20前后。如有睡眠障碍或情绪困扰，请随时联系心理干预中心。\n\n医疗保障部 · 心理干预中心\n评估医师：许知遥 主治医师"
  }, {
    id: 4,
    from: "衔尾蛇事务所人事部",
    subject: "外勤二队人员调整通知",
    time: "夏·27 14:05",
    unread: false,
    important: false,
    summary: "经所务会研究决定，任命赤鸦同志为外勤二队队长，原队长调至训练部任职...",
    body: "外勤二队全体成员：\n\n经所务会研究决定，任命赤鸦同志为外勤二队队长，原队长调至训练部任职。\n\n任命自安珀历39年秋·01起生效。\n\n请二队全体成员配合新任队长工作，保持外勤任务平稳过渡。\n\n衔尾蛇事务所 人事部"
  }, {
    id: 5,
    from: "技术局系统运维组",
    subject: "XDPS协议栈 v4.2.1 升级公告",
    time: "夏·26 20:30",
    unread: false,
    important: false,
    summary: "全体用户：XDPS协议栈将于夏·31凌晨02:00-04:00进行v4.2.1版本升级...",
    body: "全体用户：\n\nXDPS协议栈将于安珀历39年夏·31凌晨02:00-04:00进行v4.2.1版本升级，升级期间内部门户、异常信息数据库、指挥调度系统可能出现短暂不可用。\n\n本次升级内容：\n1. 修复信标定位在深层异常中漂移的已知问题\n2. 优化加密通道握手速度\n3. 新增通讯录音自动转录功能\n\n升级完成后系统自动恢复，无需任何客户端操作。\n\n技术局 · 系统运维组"
  }, {
    id: 6,
    from: "IMAC审计与纪律部",
    subject: "外勤行动装备使用规范重申",
    time: "夏·25 10:00",
    unread: false,
    important: false,
    summary: "近期抽查发现部分溯界者在行动中存在装备使用不规范问题，现重申十三条...",
    body: "各外勤单位：\n\n近期抽查发现部分溯界者在行动中存在个人记录器备份不及时、锚定物携带不规范等问题。\n\n现重申《外勤装备使用十三条》：\n· 记录器必须双备份，分别存放在身体不同位置\n· 锚定物必须贴身存放，严禁放入背包或容器\n· 每次进出异常必须执行完整的装备检查清单\n\n违反规定者将按纪律条例处理。\n\nIMAC审计与纪律部"
  }, {
    id: 7,
    from: "培训与认证中心",
    subject: "深渊级行动资质认证考试报名开启",
    time: "夏·24 15:30",
    unread: true,
    important: false,
    summary: "全体资深级及以上溯界者：秋季深渊级行动资质认证考试报名通道已开启...",
    body: "全体资深级及以上溯界者：\n\n安珀历39年秋季深渊级行动资质认证考试报名通道现已开启。\n\n报名条件：\n1. 资深溯界者及以上职级\n2. 累计外勤时长≥800小时\n3. 近12个月无重大行动失误记录\n4. 心理评估等级：正常\n\n报名截止：秋·08\n考试时间：秋·15-20\n报名入口：个人中心 → 认证申请 → 特殊资质认证\n\n培训与认证中心"
  }, {
    id: 8,
    from: "档案管理科",
    subject: "您的行动档案已更新（LO-1045）",
    time: "夏·22 09:45",
    unread: false,
    important: false,
    summary: "您参与的 LO-1045 失物公寓 异常处置行动档案已完成归档。行动评级：合格...",
    body: "溯界者赤鸦：\n\n您参与的 LO-1045 失物公寓 异常处置行动档案已完成归档。\n\n行动评级：合格\n贡献度：A（行动队长）\n档案编号：OTS-2024-LO1045-07\n\n如有异议请于收到本通知起7个工作日内向档案管理科提出复核申请。\n\n档案管理科"
  }, {
    id: 9,
    from: "装备后勤处",
    subject: "第二代制式锚定物更换通知",
    time: "夏·20 11:00",
    unread: false,
    important: false,
    summary: "第二代制式金属锚已开始配发，各单位请于夏·31前完成更换登记...",
    body: "各外勤单位：\n\n第二代制式金属锚（Mark-II型）已开始配发。相比一代产品，锚定稳定性提升约23%，在深层异常中的信号维持时间延长40%。\n\n各单位请于夏·31前完成更换登记，更换地点：各组织装备库。\n\n个人定制款锚定物不在本次强制更换范围内，但建议送检校准。\n\n装备后勤处"
  }, {
    id: 10,
    from: "联合行动指挥中心",
    subject: "TM-0089 白松城行动状态通报",
    time: "夏·18 16:20",
    unread: false,
    important: false,
    summary: "白松城冻土层时间停滞异常（TM-0089）进入采样分析第三阶段，进展顺利...",
    body: "各缔约组织：\n\nTM-0089 白松城冻土层时间停滞异常联合行动进入采样分析第三阶段，目前进展顺利。\n\n行动概况：\n· 行动等级：危险级\n· 指挥：韩凛（北境守望冻土探索营队长）\n· 参与人员：8人\n· 当前状态：进行中 · 三级响应\n\n下一次通报预计于夏·25发布。\n\n联合行动指挥中心"
  }]);
  const [mails, setMails] = React.useState(() => {
    // 从 localStorage 读取已读状态
    const readIds = JSON.parse(localStorage.getItem("mail_read_ids") || "[]");
    return mailList.map(m => readIds.includes(m.id) ? {
      ...m,
      unread: false
    } : m);
  });
  const [selectedId, setSelectedId] = React.useState(mailList[0].id);
  const [filter, setFilter] = React.useState("all");
  const [composing, setComposing] = React.useState(false);
  const unreadCount = mails.filter(m => m.unread).length;
  const filteredMails = filter === "unread" ? mails.filter(m => m.unread) : mails;
  const selectedMail = mails.find(m => m.id === selectedId);

  // 同步未读数到 localStorage，供 Header / 下拉菜单读取
  const syncUnread = React.useCallback(list => {
    const readIds = list.filter(m => !m.unread).map(m => m.id);
    localStorage.setItem("mail_read_ids", JSON.stringify(readIds));
    // 触发当前页其他组件监听
    window.dispatchEvent(new CustomEvent("mail-unread-changed", {
      detail: list.filter(m => m.unread).length
    }));
  }, []);
  React.useEffect(() => {
    syncUnread(mails);
  }, [mails, syncUnread]);
  const markAllRead = () => {
    const next = mails.map(m => ({
      ...m,
      unread: false
    }));
    setMails(next);
  };
  const selectMail = id => {
    setSelectedId(id);
    setMails(mails.map(m => m.id === id ? {
      ...m,
      unread: false
    } : m));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "mailbox-page"
  }, /*#__PURE__*/React.createElement("style", null, `
        .mailbox-page {
          min-height: 100vh;
          padding-top: 64px;
          background-color: #07070a;
          background-image:
            linear-gradient(rgba(196, 40, 40, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196, 40, 40, 0.04) 1px, transparent 1px);
          background-size: 50px 50px;
          color: var(--text-primary);
          padding-bottom: 40px;
        }
        .mailbox-page::before {
          content: "";
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px;
          background-color: var(--accent-red-bright);
          box-shadow: 0 0 8px rgba(196, 40, 40, 0.5);
          z-index: 1000;
        }
        .mail-hero {
          background: linear-gradient(180deg, #0a0a0e 0%, #0d0d12 100%);
          border-bottom: 1px solid var(--border-color);
          padding: 24px 0 18px;
        }
        .mail-hero-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .mail-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          cursor: pointer;
          padding: 6px 12px;
          border: 1px solid var(--border-color);
          transition: all 0.2s;
        }
        .mail-back:hover { color: var(--accent-red-bright); border-color: var(--accent-red-bright); }
        .mail-title-group { display: flex; flex-direction: column; gap: 4px; }
        .mail-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; color: var(--accent-red-bright); }
        .mail-title { font-family: var(--font-serif); font-size: 26px; font-weight: 700; margin: 0; }

        .mail-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 0;
          margin-top: 16px;
          border: 1px solid var(--border-color);
          background: #0d0d12;
          min-height: 600px;
        }
        .mail-sidebar {
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          background: #0a0a0e;
        }
        .mail-toolbar {
          padding: 12px 14px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .mail-toolbar-left { display: flex; gap: 6px; flex-wrap: wrap; }
        .mail-btn {
          background: none;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 4px 10px;
          font-size: 11px;
          cursor: pointer;
          font-family: var(--font-mono);
          transition: all 0.2s;
        }
        .mail-btn:hover { border-color: var(--accent-red-bright); color: var(--accent-red-bright); }
        .mail-btn.active { border-color: var(--accent-red-bright); color: var(--accent-red-bright); background: rgba(196, 40, 40, 0.1); }
        .mail-compose-btn {
          background: rgba(196, 40, 40, 0.15);
          border: 1px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          padding: 5px 12px;
          font-size: 11px;
          cursor: pointer;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
          transition: all 0.2s;
        }
        .mail-compose-btn:hover { background: rgba(196, 40, 40, 0.25); }
        .mail-unread-num {
          font-size: 11px;
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          padding: 0 12px 8px;
        }
        .mail-list {
          flex: 1;
          overflow-y: auto;
          max-height: 70vh;
        }
        .mail-item {
          padding: 10px 14px;
          border-bottom: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .mail-item:hover { background: rgba(196, 40, 40, 0.04); }
        .mail-item.selected {
          background: rgba(196, 40, 40, 0.1);
          border-left: 2px solid var(--accent-red-bright);
          padding-left: 12px;
        }
        .mail-item.unread .mail-item-from { font-weight: 700; color: var(--text-primary); }
        .mail-item.unread .mail-item-subject { font-weight: 600; color: var(--text-primary); }
        .mail-item-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .mail-item-from {
          font-size: 12px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .mail-unread-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .mail-item-time {
          font-size: 10px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          flex-shrink: 0;
        }
        .mail-item-subject {
          font-size: 12px;
          color: var(--text-secondary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .mail-item-summary {
          font-size: 11px;
          color: var(--text-tertiary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.4;
        }
        .mail-item-imp {
          color: var(--accent-red-bright);
          font-size: 10px;
          font-family: var(--font-mono);
        }

        .mail-content {
          display: flex;
          flex-direction: column;
          padding: 24px 28px;
          overflow-y: auto;
          max-height: 70vh;
        }
        .mail-content-subject {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
          line-height: 1.4;
        }
        .mail-content-meta {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          padding-bottom: 14px;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .mail-content-from {
          font-size: 13px;
          color: var(--text-secondary);
        }
        .mail-content-from strong { color: var(--text-primary); margin-right: 6px; }
        .mail-content-date {
          font-size: 12px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .mail-body {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.9;
          white-space: pre-wrap;
        }

        .mail-composer {
          padding: 16px;
          border-bottom: 1px solid var(--border-color);
          background: rgba(10, 10, 14, 0.6);
        }
        .mail-composer .form-field { margin-bottom: 8px; }
        .mail-composer .form-label {
          font-size: 10px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          letter-spacing: 0.08em;
          margin-bottom: 4px;
        }
        .mail-composer .form-input, .mail-composer .form-textarea {
          background: rgba(10, 10, 14, 0.9);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 6px 10px;
          font-size: 12px;
          width: 100%;
          box-sizing: border-box;
          font-family: inherit;
          outline: none;
        }
        .mail-composer .form-textarea { min-height: 60px; resize: vertical; }

        @media (max-width: 900px) {
          .mail-layout { grid-template-columns: 1fr; }
          .mail-sidebar { border-right: none; border-bottom: 1px solid var(--border-color); max-height: 300px; }
          .mail-content { max-height: none; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    className: "mail-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mail-hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mail-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mail-label"
  }, "IMAC \xB7 INTERNAL MAIL SYSTEM"), /*#__PURE__*/React.createElement("h1", {
    className: "mail-title"
  }, "\u7CFB\u7EDF\u90AE\u7BB1")), /*#__PURE__*/React.createElement("div", {
    className: "mail-back",
    onClick: () => navigate("/portal")
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5 M12 19l-7-7 7-7"
  })), "\u8FD4\u56DE\u6307\u6325\u4E2D\u5FC3")))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mail-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mail-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mail-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mail-toolbar-left"
  }, /*#__PURE__*/React.createElement("button", {
    className: `mail-btn ${filter === "all" ? "active" : ""}`,
    onClick: () => setFilter("all")
  }, "\u5168\u90E8"), /*#__PURE__*/React.createElement("button", {
    className: `mail-btn ${filter === "unread" ? "active" : ""}`,
    onClick: () => setFilter("unread")
  }, "\u672A\u8BFB")), /*#__PURE__*/React.createElement("button", {
    className: "mail-compose-btn",
    onClick: () => setComposing(!composing)
  }, composing ? "取消" : "写邮件")), composing && /*#__PURE__*/React.createElement("div", {
    className: "mail-composer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-label"
  }, "\u6536\u4EF6\u4EBA"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "\u6536\u4EF6\u4EBA\u4EE3\u53F7\u6216\u90E8\u95E8"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-label"
  }, "\u4E3B\u9898"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "\u90AE\u4EF6\u4E3B\u9898"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-label"
  }, "\u6B63\u6587"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-textarea",
    placeholder: "\u90AE\u4EF6\u5185\u5BB9..."
  })), /*#__PURE__*/React.createElement("button", {
    className: "mail-compose-btn",
    onClick: () => {
      alert("邮件已发送（模拟）");
      setComposing(false);
    }
  }, "\u53D1\u9001")), /*#__PURE__*/React.createElement("div", {
    className: "mail-unread-num"
  }, "\u672A\u8BFB ", unreadCount, " \u5C01 \xB7 \u5171 ", mails.length, " \u5C01"), /*#__PURE__*/React.createElement("div", {
    className: "mail-toolbar",
    style: {
      paddingTop: 0,
      borderBottom: "1px solid var(--border-color)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "mail-btn",
    onClick: markAllRead
  }, "\u5168\u90E8\u6807\u4E3A\u5DF2\u8BFB")), /*#__PURE__*/React.createElement("div", {
    className: "mail-list"
  }, filteredMails.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    className: `mail-item ${m.unread ? "unread" : ""} ${selectedId === m.id ? "selected" : ""}`,
    onClick: () => selectMail(m.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "mail-item-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mail-item-from"
  }, m.unread && /*#__PURE__*/React.createElement("span", {
    className: "mail-unread-dot"
  }), m.from), /*#__PURE__*/React.createElement("span", {
    className: "mail-item-time"
  }, m.time)), /*#__PURE__*/React.createElement("div", {
    className: "mail-item-subject"
  }, m.important && /*#__PURE__*/React.createElement("span", {
    className: "mail-item-imp"
  }, "\u2605 "), m.subject), /*#__PURE__*/React.createElement("div", {
    className: "mail-item-summary"
  }, m.summary))), filteredMails.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "30px",
      textAlign: "center",
      color: "var(--text-tertiary)",
      fontSize: "12px"
    }
  }, "\u6682\u65E0\u90AE\u4EF6"))), /*#__PURE__*/React.createElement("div", {
    className: "mail-content"
  }, selectedMail ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "mail-content-subject"
  }, selectedMail.important && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-red-bright)",
      marginRight: "8px"
    }
  }, "\u2605"), selectedMail.subject), /*#__PURE__*/React.createElement("div", {
    className: "mail-content-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mail-content-from"
  }, /*#__PURE__*/React.createElement("strong", null, "\u53D1\u4EF6\u4EBA\uFF1A"), selectedMail.from), /*#__PURE__*/React.createElement("span", {
    className: "mail-content-date"
  }, "\u5B89\u73C0\u538639\u5E74 \xB7 ", selectedMail.time)), /*#__PURE__*/React.createElement("div", {
    className: "mail-body"
  }, selectedMail.body)) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "60px",
      textAlign: "center",
      color: "var(--text-tertiary)",
      fontSize: "13px"
    }
  }, "\u8BF7\u9009\u62E9\u4E00\u5C01\u90AE\u4EF6\u67E5\u770B"))))));
}
window.MailboxPage = MailboxPage;;
// Personal Profile page for internal staff
function ProfilePage() {
  const {
    navigate
  } = useRouter();
  const {
    canAccess,
    authLevel,
    identity,
    currentLevelInfo
  } = useAuth();
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
    }, /*#__PURE__*/React.createElement("h2", null, "\u6743\u9650\u4E0D\u8DB3"), /*#__PURE__*/React.createElement("p", null, "\u6B64\u9875\u9762\u4EC5\u9650\u5185\u90E8\u4EBA\u5458\u8BBF\u95EE\u3002\u8BF7\u5148\u5B8C\u6210\u8EAB\u4EFD\u8BA4\u8BC1\u3002"), /*#__PURE__*/React.createElement("button", {
      className: "btn-primary",
      onClick: () => navigate("/auth")
    }, "\u524D\u5F80\u8BA4\u8BC1"))));
  }
  const isTopSecret = authLevel === "topsecret";
  const codename = isTopSecret ? "桥柱" : "赤鸦";
  const realName = isTopSecret ? "Z" : "林深";
  const rank = isTopSecret ? "界标" : "资深溯界者";
  const org = isTopSecret ? "长桥会社 / IMAC总部" : "衔尾蛇事务所";
  const staffId = isTopSecret ? "IMAC-LBC-0001" : "IMAC-OA-0312";
  const avatarLetter = codename.charAt(0);
  const promotions = [{
    date: "安珀历33年",
    title: "认证见习溯界者",
    desc: "通过新人训练与基础考核"
  }, {
    date: "安珀历34年",
    title: "晋升溯界者",
    desc: "完成首次独立外勤任务"
  }, {
    date: "安珀历36年",
    title: "晋升资深溯界者",
    desc: "累计参与行动21次，成功解决12例异常"
  }];
  if (isTopSecret) {
    promotions.push({
      date: "安珀历38年",
      title: "晋升首席溯界者",
      desc: "担任赤月学院行动副指挥"
    });
    promotions.push({
      date: "安珀历39年",
      title: "授予界标职级",
      desc: "双城事件现场总指挥，获IMAC最高荣誉"
    });
  }
  const stats = [{
    label: "参与行动",
    value: isTopSecret ? "89" : "47",
    unit: "次"
  }, {
    label: "成功解决",
    value: isTopSecret ? "62" : "31",
    unit: "例"
  }, {
    label: "异常接触时长",
    value: isTopSecret ? "2,340" : "986",
    unit: "小时"
  }, {
    label: "累计外勤天数",
    value: isTopSecret ? "412" : "187",
    unit: "天"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .profile-page {
          background-color: var(--bg-deep);
          color: var(--text-primary);
          min-height: calc(100vh - 64px);
          padding-top: 80px;
          padding-bottom: 60px;
        }
        .profile-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        .profile-breadcrumb .crumb-link {
          cursor: pointer;
          color: var(--accent-red-bright);
        }
        .profile-breadcrumb .crumb-link:hover { text-decoration: underline; }
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
          margin-bottom: 32px;
        }
        .profile-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 28px;
          margin-bottom: 28px;
        }
        .profile-sidebar {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 32px 24px;
          text-align: center;
        }
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin: 0 auto 20px;
          background: radial-gradient(circle, rgba(196, 40, 40, 0.3), rgba(10, 10, 12, 0.8));
          border: 3px solid var(--accent-red-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 48px;
          font-weight: 900;
          color: var(--accent-red-bright);
          box-shadow: 0 0 40px rgba(196, 40, 40, 0.3);
        }
        .profile-codename {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .profile-rank-badge {
          display: inline-block;
          padding: 4px 12px;
          border: 1px solid var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.15em;
          color: var(--accent-red-bright);
          margin-bottom: 16px;
        }
        .profile-rank-badge.landmark {
          border-color: #7a3ab0;
          color: #b88ed9;
          background: rgba(122, 58, 176, 0.1);
        }
        .profile-id {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
        }
        .profile-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 12px;
          font-size: 12px;
          color: var(--level-ordinary);
        }
        .profile-status-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background-color: var(--level-ordinary);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .profile-main {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .info-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
        }
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
        .info-card-body {
          padding: 24px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .info-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .info-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .info-value {
          font-size: 14px;
          color: var(--text-primary);
        }
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .stat-box {
          padding: 20px;
          background-color: rgba(18, 18, 22, 0.6);
          border: 1px solid var(--border-color);
          text-align: center;
        }
        .stat-box-num {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
        }
        .stat-box-unit {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .stat-box-label {
          font-size: 11px;
          color: var(--text-tertiary);
          margin-top: 8px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }
        .timeline {
          position: relative;
          padding-left: 28px;
        }
        .timeline::before {
          content: "";
          position: absolute;
          left: 8px;
          top: 4px;
          bottom: 4px;
          width: 1px;
          background: var(--border-color);
        }
        .timeline-item {
          position: relative;
          padding-bottom: 24px;
        }
        .timeline-item:last-child { padding-bottom: 0; }
        .timeline-dot {
          position: absolute;
          left: -24px;
          top: 4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: var(--accent-red-bright);
          border: 2px solid var(--bg-deep);
        }
        .timeline-date {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }
        .timeline-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .timeline-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
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
        @media (max-width: 1024px) {
          .profile-grid { grid-template-columns: 1fr; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .info-grid { grid-template-columns: 1fr; }
          .stats-row { grid-template-columns: 1fr 1fr; }
          .page-title { font-size: 24px; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "profile-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-breadcrumb"
  }, /*#__PURE__*/React.createElement("span", {
    className: "crumb-link",
    onClick: () => navigate("/portal")
  }, "\u5185\u90E8\u6307\u6325\u4E2D\u5FC3"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, "\u4E2A\u4EBA\u6863\u6848")), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "\u4E2A\u4EBA\u6863\u6848"), /*#__PURE__*/React.createElement("div", {
    className: "page-title-en"
  }, "PERSONNEL FILE"), /*#__PURE__*/React.createElement("div", {
    className: "profile-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-avatar"
  }, avatarLetter), /*#__PURE__*/React.createElement("div", {
    className: "profile-codename"
  }, codename), /*#__PURE__*/React.createElement("div", {
    className: `profile-rank-badge ${isTopSecret ? "landmark" : ""}`
  }, isTopSecret ? "LANDMARK · 界标" : "SENIOR · 资深溯界者"), /*#__PURE__*/React.createElement("div", {
    className: "profile-id"
  }, staffId), /*#__PURE__*/React.createElement("div", {
    className: "profile-status"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-status-dot"
  }), /*#__PURE__*/React.createElement("span", null, "\u5728\u5C97 \xB7 \u5F85\u547D"))), /*#__PURE__*/React.createElement("div", {
    className: "profile-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u4E2A\u4EBA\u7EDF\u8BA1"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "SERVICE RECORD"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stats-row"
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "stat-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-box-num"
  }, s.value, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "14px",
      marginLeft: "2px"
    }
  }, s.unit)), /*#__PURE__*/React.createElement("div", {
    className: "stat-box-label"
  }, s.label)))))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u57FA\u672C\u4FE1\u606F"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "BASIC INFORMATION"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u771F\u5B9E\u59D3\u540D"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, realName)), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u4EE3\u53F7/\u547C\u53F7"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, codename)), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "IMAC\u7F16\u53F7"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, staffId)), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u804C\u7EA7"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, rank)), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u6240\u5C5E\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, org)), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u6743\u9650\u7B49\u7EA7"), /*#__PURE__*/React.createElement("span", {
    className: "info-value",
    style: {
      color: currentLevelInfo.color
    }
  }, currentLevelInfo.label, " \xB7 ", currentLevelInfo.en)), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u5F53\u524D\u72B6\u6001"), /*#__PURE__*/React.createElement("span", {
    className: "info-value",
    style: {
      color: "var(--level-ordinary)"
    }
  }, "\u25CF \u5728\u5C97\xB7\u5F85\u547D")), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u8BA4\u8BC1\u65E5\u671F"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, "\u5B89\u73C0\u538633\u5E74"))))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u804C\u7EA7\u664B\u5347\u8BB0\u5F55"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "PROMOTION HISTORY"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline"
  }, promotions.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "timeline-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline-dot"
  }), /*#__PURE__*/React.createElement("div", {
    className: "timeline-date"
  }, p.date), /*#__PURE__*/React.createElement("div", {
    className: "timeline-title"
  }, p.title), /*#__PURE__*/React.createElement("div", {
    className: "timeline-desc"
  }, p.desc)))))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u6240\u5C5E\u7EC4\u7EC7 & \u7D27\u6025\u8054\u7CFB\u4EBA"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "ORG & EMERGENCY CONTACT"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u76F4\u5C5E\u4E0A\u7EA7"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, isTopSecret ? "IMAC理事会" : "指挥官·吴峰")), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u6240\u5C5E\u5C0F\u961F"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, isTopSecret ? "联合指挥部" : "第三行动队")), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u7D27\u6025\u8054\u7CFB\u4EBA"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, "\u6797\u5973\u58EB\uFF08\u5BB6\u5C5E\uFF09")), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u8054\u7CFB\u7535\u8BDD"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, "\u5DF2\u52A0\u5BC6\u5B58\u50A8")), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u8840\u578B"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, "O \u578B Rh+")), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-label"
  }, "\u8FC7\u654F\u53F2"), /*#__PURE__*/React.createElement("span", {
    className: "info-value"
  }, "\u9752\u9709\u7D20"))))))), /*#__PURE__*/React.createElement("button", {
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
window.ProfilePage = ProfilePage;;
// Mission History page for internal staff
function MissionsPage() {
  const {
    navigate
  } = useRouter();
  const {
    canAccess,
    authLevel
  } = useAuth();
  const [filter, setFilter] = React.useState("all");
  const [expandedId, setExpandedId] = React.useState(null);
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
  const isTopSecret = authLevel === "topsecret";
  const missions = [{
    id: "M-3908",
    code: "PH-0182",
    name: "洛林自由市边境裂隙",
    type: "联合响应",
    date: "安珀历39年·秋·06",
    role: "总指挥",
    result: "进行中",
    resultClass: "ongoing",
    duration: "持续中",
    note: "多国联合三级响应，现场情况稳定，预计两周内完成封堵。"
  }, {
    id: "M-3907",
    code: "LO-0073",
    name: "赤月学院 · 第十一届行动",
    type: "联合响应",
    date: "安珀历39年·夏·12",
    role: "副指挥",
    result: "进行中",
    resultClass: "ongoing",
    duration: "持续中",
    note: "衔尾蛇事务所主导，已完成主体区域测绘，核心区域待突破。",
    featured: true
  }, {
    id: "M-3906",
    code: "CG-0199",
    name: "回音巷认知异常",
    type: "常规调查",
    date: "安珀历39年·夏·03",
    role: "队员",
    result: "已解决",
    resultClass: "resolved",
    duration: "7 天",
    note: "成功解析叙事型规则，引导平民安全撤离，无人员伤亡。"
  }, {
    id: "M-3905",
    code: "SP-0312",
    name: "鸣海城地铁循环事件",
    type: "紧急支援",
    date: "安珀历38年·冬·21",
    role: "总指挥",
    result: "已解决",
    resultClass: "resolved",
    duration: "14 天",
    note: "空间折叠型异常，指挥27人小队完成1,200名平民撤离，生存率98.7%。"
  }, {
    id: "M-3804",
    code: "TM-0089",
    name: "白松城冻土层时间停滞",
    type: "常规调查",
    date: "安珀历38年·秋·15",
    role: "副指挥",
    result: "已解决",
    resultClass: "resolved",
    duration: "21 天",
    note: "时间流速异常，内部3天对应外部21天。成功建立锚点并撤出全部人员。"
  }, {
    id: "M-3803",
    code: "EN-0067",
    name: "雾中列车实体事件",
    type: "紧急支援",
    date: "安珀历38年·夏·08",
    role: "队员",
    result: "部分解决",
    resultClass: "partial",
    duration: "11 天",
    note: "实体暂时被压制但未消灭，列车仍在固定路线行驶，平民已疏散。"
  }, {
    id: "M-3802",
    code: "PH-0256",
    name: "引力井物理异常",
    type: "常规调查",
    date: "安珀历38年·春·19",
    role: "队员",
    result: "已解决",
    resultClass: "resolved",
    duration: "9 天",
    note: "局部重力反转，物理法则扭曲。晨星团支援提供数学模型，成功定位核心。"
  }, {
    id: "M-3701",
    code: "SP-0021",
    name: "无尽楼梯空间异常",
    type: "常规调查",
    date: "安珀历37年·冬·02",
    role: "队员",
    result: "已解决",
    resultClass: "resolved",
    duration: "5 天",
    note: "首次独立完成异常规则解析，获当月最佳新人提名。"
  }];
  const filtered = missions.filter(m => {
    if (filter === "all") return true;
    if (filter === "resolved") return m.result === "已解决";
    if (filter === "joint") return m.type === "联合响应";
    if (filter === "abyssal") return m.featured;
    return true;
  });
  const filters = [{
    key: "all",
    label: "全部"
  }, {
    key: "resolved",
    label: "已解决"
  }, {
    key: "joint",
    label: "联合行动"
  }, {
    key: "abyssal",
    label: "深渊级"
  }];
  const total = missions.length;
  const resolved = missions.filter(m => m.result === "已解决").length;
  const successRate = Math.round(resolved / total * 100);
  const avgDuration = "12 天";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .missions-page {
          background-color: var(--bg-deep);
          color: var(--text-primary);
          min-height: calc(100vh - 64px);
          padding-top: 80px;
          padding-bottom: 60px;
        }
        .mission-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        .mission-breadcrumb .crumb-link {
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
        .mission-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }
        .summary-card {
          padding: 20px 24px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
        }
        .summary-card-num {
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
        }
        .summary-card-label {
          font-size: 11px;
          color: var(--text-tertiary);
          margin-top: 8px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }
        .filter-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .filter-tab {
          padding: 8px 18px;
          font-size: 12px;
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          background-color: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .filter-tab:hover { border-color: var(--accent-red-bright); color: var(--accent-red-bright); }
        .filter-tab.active {
          background-color: var(--accent-red-bright);
          border-color: var(--accent-red-bright);
          color: #fff;
        }
        .mission-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 28px;
        }
        .mission-item {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mission-item:hover { border-color: var(--accent-red-bright); }
        .mission-item-head {
          display: grid;
          grid-template-columns: 120px 1.5fr 100px 140px 120px 100px 24px;
          gap: 16px;
          padding: 18px 24px;
          align-items: center;
        }
        .mission-code {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent-red-bright);
          letter-spacing: 0.05em;
        }
        .mission-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .mission-type {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .mission-date {
          font-size: 12px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .mission-role {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .mission-result {
          font-size: 11px;
          font-weight: 600;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .mission-result.resolved { color: var(--level-ordinary); }
        .mission-result.partial { color: var(--level-hazardous); }
        .mission-result.ongoing { color: var(--level-doomsday); }
        .mission-arrow {
          color: var(--text-muted);
          transition: transform 0.2s ease;
        }
        .mission-item.expanded .mission-arrow { transform: rotate(180deg); color: var(--accent-red-bright); }
        .mission-detail {
          padding: 0 24px 20px;
          border-top: 1px solid var(--border-color);
          display: none;
        }
        .mission-item.expanded .mission-detail { display: block; }
        .mission-detail-inner {
          padding-top: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .mission-detail-section h4 {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .mission-detail-section p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
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
        @media (max-width: 1024px) {
          .mission-item-head {
            grid-template-columns: 100px 1fr 80px 100px 24px;
          }
          .mission-role, .mission-type { display: none; }
        }
        @media (max-width: 640px) {
          .mission-summary { grid-template-columns: 1fr 1fr; }
          .mission-item-head {
            grid-template-columns: 1fr 80px 24px;
            gap: 8px;
            padding: 14px 16px;
          }
          .mission-date { display: none; }
          .mission-code { font-size: 11px; }
          .mission-name { font-size: 13px; }
          .page-title { font-size: 24px; }
          .mission-detail-inner { grid-template-columns: 1fr; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "missions-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mission-breadcrumb"
  }, /*#__PURE__*/React.createElement("span", {
    className: "crumb-link",
    onClick: () => navigate("/portal")
  }, "\u5185\u90E8\u6307\u6325\u4E2D\u5FC3"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, "\u4EFB\u52A1\u5386\u53F2")), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "\u4EFB\u52A1\u5386\u53F2"), /*#__PURE__*/React.createElement("div", {
    className: "page-title-en"
  }, "MISSION HISTORY"), /*#__PURE__*/React.createElement("div", {
    className: "mission-summary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "summary-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "summary-card-num"
  }, total), /*#__PURE__*/React.createElement("div", {
    className: "summary-card-label"
  }, "\u603B\u4EFB\u52A1\u6570")), /*#__PURE__*/React.createElement("div", {
    className: "summary-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "summary-card-num"
  }, successRate, "%"), /*#__PURE__*/React.createElement("div", {
    className: "summary-card-label"
  }, "\u4EFB\u52A1\u6210\u529F\u7387")), /*#__PURE__*/React.createElement("div", {
    className: "summary-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "summary-card-num"
  }, avgDuration), /*#__PURE__*/React.createElement("div", {
    className: "summary-card-label"
  }, "\u5E73\u5747\u4EFB\u52A1\u65F6\u957F"))), /*#__PURE__*/React.createElement("div", {
    className: "filter-bar"
  }, filters.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.key,
    className: `filter-tab ${filter === f.key ? "active" : ""}`,
    onClick: () => setFilter(f.key)
  }, f.label))), /*#__PURE__*/React.createElement("div", {
    className: "mission-list"
  }, filtered.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    className: `mission-item ${expandedId === m.id ? "expanded" : ""}`,
    onClick: () => setExpandedId(expandedId === m.id ? null : m.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "mission-item-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mission-code"
  }, m.code), /*#__PURE__*/React.createElement("span", {
    className: "mission-name"
  }, m.name), /*#__PURE__*/React.createElement("span", {
    className: "mission-type"
  }, m.type), /*#__PURE__*/React.createElement("span", {
    className: "mission-date"
  }, m.date), /*#__PURE__*/React.createElement("span", {
    className: "mission-role"
  }, m.role), /*#__PURE__*/React.createElement("span", {
    className: `mission-result ${m.resultClass}`
  }, m.result), /*#__PURE__*/React.createElement("svg", {
    className: "mission-arrow",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mission-detail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mission-detail-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mission-detail-section"
  }, /*#__PURE__*/React.createElement("h4", null, "\u4EFB\u52A1\u7F16\u53F7"), /*#__PURE__*/React.createElement("p", null, m.id)), /*#__PURE__*/React.createElement("div", {
    className: "mission-detail-section"
  }, /*#__PURE__*/React.createElement("h4", null, "\u62C5\u4EFB\u89D2\u8272"), /*#__PURE__*/React.createElement("p", null, m.role)), /*#__PURE__*/React.createElement("div", {
    className: "mission-detail-section"
  }, /*#__PURE__*/React.createElement("h4", null, "\u4EFB\u52A1\u65F6\u957F"), /*#__PURE__*/React.createElement("p", null, m.duration)), /*#__PURE__*/React.createElement("div", {
    className: "mission-detail-section"
  }, /*#__PURE__*/React.createElement("h4", null, "\u4EFB\u52A1\u7ED3\u679C"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: m.resultClass === "resolved" ? "var(--level-ordinary)" : m.resultClass === "partial" ? "var(--level-hazardous)" : "var(--level-doomsday)"
    }
  }, m.result)), /*#__PURE__*/React.createElement("div", {
    className: "mission-detail-section",
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("h4", null, "\u4EFB\u52A1\u5907\u6CE8"), /*#__PURE__*/React.createElement("p", null, m.note))))))), /*#__PURE__*/React.createElement("button", {
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
window.MissionsPage = MissionsPage;;
// Training Records page
function TrainingPage() {
  const {
    navigate
  } = useRouter();
  const {
    canAccess,
    authLevel
  } = useAuth();
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
  const isTopSecret = authLevel === "topsecret";
  const certifications = [{
    name: "异常分类学认证",
    level: "L3",
    issuer: "BRI · 边界研究院",
    date: "安珀历38年"
  }, {
    name: "规则解析方法论",
    level: "L2",
    issuer: "晨星团",
    date: "安珀历38年"
  }, {
    name: "战术撤退实操",
    level: "L3",
    issuer: "衔尾蛇事务所",
    date: "安珀历37年"
  }, {
    name: "心理防护训练",
    level: "L2",
    issuer: "悬铃木学会",
    date: "安珀历38年"
  }, {
    name: "联合行动指挥认证",
    level: "L2",
    issuer: "长桥会社",
    date: "安珀历39年"
  }];
  const trainingTimeline = [{
    date: "安珀历39年·秋",
    name: "第十一届赤月学院战前特训",
    result: "通过",
    issuer: "衔尾蛇事务所",
    desc: "为期四周的高强度针对性训练，含模拟实战、规则推演、心理强化三个模块。"
  }, {
    date: "安珀历39年·夏",
    name: "XDPS v4.2 协议栈升级培训",
    result: "优秀",
    issuer: "IMAC技术局",
    desc: "新协议栈操作规范与应急排障，考核成绩94分。"
  }, {
    date: "安珀历39年·春",
    name: "同化识别复训",
    result: "通过",
    issuer: "悬铃木学会",
    desc: "年度强制复训，含同化阶段识别、早期干预手段、自我监测方法。"
  }, {
    date: "安珀历38年·冬",
    name: "联合行动指挥进阶课程",
    result: "良好",
    issuer: "长桥会社",
    desc: "多国联合作战指挥流程、JRP规程实操、跨组织协调模拟。"
  }, {
    date: "安珀历38年·秋",
    name: "高级规则解析训练",
    result: "通过",
    issuer: "晨星团",
    desc: "复杂物理型异常的数学模型建立与边界预测方法。"
  }, {
    date: "安珀历37年·冬",
    name: "新人基础训练",
    result: "优秀",
    issuer: "IMAC训练协调部",
    desc: "为期三个月的基础训练，涵盖体能、规则认知、战术基础、心理建设四大模块。综合排名第7/120。"
  }];
  const upcoming = [{
    date: "安珀历39年·10月",
    title: "同化识别年度复训",
    type: "强制",
    days: 3
  }, {
    date: "安珀历39年·11月",
    title: "赤月学院第十一届出征前心理强化",
    type: "专项",
    days: 7
  }, {
    date: "安珀历39年·12月",
    title: "心理评估L3认证培训",
    type: "选修",
    days: 14
  }];
  const recommended = [{
    title: "认知类异常深度干预",
    org: "悬铃木学会",
    level: "L3",
    duration: "21天"
  }, {
    title: "极地生存与异常适应",
    org: "北境守望",
    level: "L2",
    duration: "30天"
  }, {
    title: "异常实体谈判技巧",
    org: "第四面墙",
    level: "L2",
    duration: "14天"
  }];
  const aitfProgress = 78;
  const aitfModules = [{
    name: "核心理论模块",
    done: true
  }, {
    name: "战术实操模块",
    done: true
  }, {
    name: "心理建设模块",
    done: true
  }, {
    name: "规则解析模块",
    done: true
  }, {
    name: "联合行动模块",
    done: false
  }, {
    name: "指挥进阶模块",
    done: false
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .training-page {
          background-color: var(--bg-deep);
          color: var(--text-primary);
          min-height: calc(100vh - 64px);
          padding-top: 80px;
          padding-bottom: 60px;
        }
        .training-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        .training-breadcrumb .crumb-link {
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
        .training-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
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
        .info-card-body {
          padding: 24px;
        }
        .cert-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cert-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px;
          background-color: rgba(18, 18, 22, 0.6);
          border: 1px solid var(--border-color);
        }
        .cert-item-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cert-item-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .cert-item-meta {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .cert-level {
          padding: 4px 10px;
          border: 1px solid var(--level-ordinary);
          color: var(--level-ordinary);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
        }
        .timeline {
          position: relative;
          padding-left: 28px;
        }
        .timeline::before {
          content: "";
          position: absolute;
          left: 8px;
          top: 4px;
          bottom: 4px;
          width: 1px;
          background: var(--border-color);
        }
        .timeline-item {
          position: relative;
          padding-bottom: 24px;
        }
        .timeline-item:last-child { padding-bottom: 0; }
        .timeline-dot {
          position: absolute;
          left: -24px;
          top: 4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: var(--accent-red-bright);
          border: 2px solid var(--bg-deep);
        }
        .timeline-date {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }
        .timeline-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .timeline-result {
          font-size: 10px;
          padding: 2px 8px;
          border: 1px solid var(--level-ordinary);
          color: var(--level-ordinary);
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }
        .timeline-result.good { border-color: var(--level-ordinary); color: var(--level-ordinary); }
        .timeline-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-top: 6px;
        }
        .timeline-issuer {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          margin-top: 4px;
        }

        /* AITF progress */
        .aitf-card {
          padding: 24px;
        }
        .aitf-title {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .aitf-subtitle {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 20px;
        }
        .aitf-progress-bar {
          height: 8px;
          background-color: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-color);
          position: relative;
          margin-bottom: 12px;
        }
        .aitf-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-red), var(--accent-red-bright));
          width: 78%;
        }
        .aitf-progress-label {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          margin-bottom: 20px;
        }
        .aitf-modules {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .aitf-module {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--text-secondary);
        }
        .aitf-module-check {
          width: 16px; height: 16px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
        }
        .aitf-module-check.done {
          border-color: var(--level-ordinary);
          color: var(--level-ordinary);
          background: rgba(74, 124, 89, 0.1);
        }
        .aitf-module-check.pending {
          border-color: var(--text-muted);
          color: var(--text-muted);
        }

        /* Upcoming */
        .upcoming-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .upcoming-item {
          padding: 14px 16px;
          background-color: rgba(18, 18, 22, 0.6);
          border: 1px solid var(--border-color);
          border-left: 3px solid var(--level-hazardous);
        }
        .upcoming-date {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--level-hazardous);
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }
        .upcoming-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 6px;
        }
        .upcoming-meta {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--text-tertiary);
        }
        .upcoming-tag {
          padding: 2px 8px;
          border: 1px solid;
          font-size: 10px;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .upcoming-tag.mandatory { border-color: var(--accent-red-bright); color: var(--accent-red-bright); }
        .upcoming-tag.special { border-color: var(--level-doomsday); color: var(--level-doomsday); }
        .upcoming-tag.elective { border-color: var(--text-muted); color: var(--text-muted); }

        /* Recommended */
        .rec-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .rec-item {
          padding: 12px 14px;
          border: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .rec-item:hover { border-color: var(--accent-red-bright); }
        .rec-item-name { font-size: 13px; color: var(--text-primary); margin-bottom: 4px; }
        .rec-item-meta { font-size: 10px; color: var(--text-tertiary); font-family: var(--font-mono); }

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
        @media (max-width: 1024px) {
          .training-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .page-title { font-size: 24px; }
          .cert-item { flex-direction: column; align-items: flex-start; gap: 8px; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "training-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "training-breadcrumb"
  }, /*#__PURE__*/React.createElement("span", {
    className: "crumb-link",
    onClick: () => navigate("/portal")
  }, "\u5185\u90E8\u6307\u6325\u4E2D\u5FC3"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, "\u57F9\u8BAD\u8BB0\u5F55")), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "\u57F9\u8BAD\u8BB0\u5F55"), /*#__PURE__*/React.createElement("div", {
    className: "page-title-en"
  }, "TRAINING RECORDS"), /*#__PURE__*/React.createElement("div", {
    className: "training-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u5F53\u524D\u8BA4\u8BC1\u8D44\u8D28"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "CERTIFICATIONS")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      color: "var(--text-tertiary)"
    }
  }, certifications.length, " \u9879\u6709\u6548")), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cert-list"
  }, certifications.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cert-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cert-item-info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cert-item-name"
  }, c.name), /*#__PURE__*/React.createElement("span", {
    className: "cert-item-meta"
  }, c.issuer, " \xB7 ", c.date)), /*#__PURE__*/React.createElement("span", {
    className: "cert-level"
  }, c.level)))))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u57F9\u8BAD\u5386\u53F2"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "TRAINING HISTORY"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline"
  }, trainingTimeline.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "timeline-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline-dot"
  }), /*#__PURE__*/React.createElement("div", {
    className: "timeline-date"
  }, t.date), /*#__PURE__*/React.createElement("div", {
    className: "timeline-title"
  }, t.name, /*#__PURE__*/React.createElement("span", {
    className: `timeline-result ${t.result === "优秀" ? "good" : ""}`
  }, t.result)), /*#__PURE__*/React.createElement("div", {
    className: "timeline-issuer"
  }, t.issuer), /*#__PURE__*/React.createElement("div", {
    className: "timeline-desc"
  }, t.desc))))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "AITF \u8FBE\u6807\u8FDB\u5EA6"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "FRAMEWORK PROGRESS"))), /*#__PURE__*/React.createElement("div", {
    className: "aitf-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aitf-progress-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aitf-progress-fill",
    style: {
      width: `${aitfProgress}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "aitf-progress-label"
  }, /*#__PURE__*/React.createElement("span", null, "\u603B\u4F53\u8FDB\u5EA6"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)",
      fontWeight: 600
    }
  }, aitfProgress, "%")), /*#__PURE__*/React.createElement("div", {
    className: "aitf-modules"
  }, aitfModules.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "aitf-module"
  }, /*#__PURE__*/React.createElement("span", {
    className: `aitf-module-check ${m.done ? "done" : "pending"}`
  }, m.done ? "✓" : "○"), /*#__PURE__*/React.createElement("span", null, m.name)))))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u5F85\u5B8C\u6210 / \u5373\u5C06\u5230\u671F"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "UPCOMING"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "upcoming-list"
  }, upcoming.map((u, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "upcoming-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "upcoming-date"
  }, u.date), /*#__PURE__*/React.createElement("div", {
    className: "upcoming-title"
  }, u.title), /*#__PURE__*/React.createElement("div", {
    className: "upcoming-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: `upcoming-tag ${u.type === "强制" ? "mandatory" : u.type === "专项" ? "special" : "elective"}`
  }, u.type), /*#__PURE__*/React.createElement("span", null, u.days, " \u5929"))))))), /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "info-card-title"
  }, "\u63A8\u8350\u8BFE\u7A0B"), /*#__PURE__*/React.createElement("span", {
    className: "info-card-title-en"
  }, "RECOMMENDED"))), /*#__PURE__*/React.createElement("div", {
    className: "info-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rec-list"
  }, recommended.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rec-item"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "rec-item-name"
  }, r.title), /*#__PURE__*/React.createElement("div", {
    className: "rec-item-meta"
  }, r.org, " \xB7 ", r.level, " \xB7 ", r.duration)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      fontSize: "12px"
    }
  }, "\u2192")))))))), /*#__PURE__*/React.createElement("button", {
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
window.TrainingPage = TrainingPage;;
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
window.PsychEvalPage = PsychEvalPage;;
// System Administration page - TOP SECRET only
function AdminPage() {
  const {
    navigate
  } = useRouter();
  const {
    canAccess,
    authLevel
  } = useAuth();
  const [activeModule, setActiveModule] = React.useState(null);
  const [userSearch, setUserSearch] = React.useState("");
  const [userOrgFilter, setUserOrgFilter] = React.useState("all");
  const [userRankFilter, setRankFilter] = React.useState("all");
  const [userStatusFilter, setUserStatusFilter] = React.useState("all");
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [expandedOp, setExpandedOp] = React.useState(null);
  const [logFilter, setLogFilter] = React.useState("all");
  const [opStatusFilter, setOpStatusFilter] = React.useState("all");
  const scrollPosRef = React.useRef(0);
  const [activeUserPanel, setActiveUserPanel] = React.useState(null);
  const [approvalList, setApprovalList] = React.useState([{
    id: 1,
    name: "顾晚舟",
    code: "晚",
    rank: "溯界者",
    org: "边界研究院BRI",
    applyTime: "安珀历39年夏·15 14:23",
    status: "pending"
  }, {
    id: 2,
    name: "赵寒",
    code: "寒",
    rank: "资深溯界者",
    org: "北境守望",
    applyTime: "安珀历39年夏·14 09:47",
    status: "pending"
  }, {
    id: 3,
    name: "许清颜",
    code: "清",
    rank: "溯界者",
    org: "悬铃木学会",
    applyTime: "安珀历39年夏·13 16:10",
    status: "pending"
  }, {
    id: 4,
    name: "沈昼",
    code: "昼",
    rank: "见习溯界者",
    org: "衔尾蛇事务所",
    applyTime: "安珀历39年夏·12 11:35",
    status: "pending"
  }, {
    id: 5,
    name: "柳朝云",
    code: "云",
    rank: "研究员",
    org: "晨星团",
    applyTime: "安珀历39年夏·11 08:52",
    status: "pending"
  }, {
    id: 6,
    name: "白夜行者",
    code: "行",
    rank: "溯界者",
    org: "白夜哨站",
    applyTime: "安珀历39年夏·10 21:08",
    status: "pending"
  }, {
    id: 7,
    name: "长桥映",
    code: "映",
    rank: "初级研究员",
    org: "长桥会社",
    applyTime: "安珀历39年夏·09 13:22",
    status: "pending"
  }]);
  const [rankAdjList, setRankAdjList] = React.useState([{
    id: 1,
    name: "林砚",
    current: "机密级",
    target: "绝密级",
    reason: "衔尾蛇外勤一队副队长职务调整，需更高数据权限",
    applicant: "陈默",
    time: "安珀历39年夏·14"
  }, {
    id: 2,
    name: "顾泽鸣",
    current: "机密级",
    target: "绝密级",
    reason: "BRI空间异常所副所长提名，等待委员会审批",
    applicant: "顾远舟",
    time: "安珀历39年夏·12"
  }, {
    id: 3,
    name: "韩凛",
    current: "秘密级",
    target: "机密级",
    reason: "北境守望冻土探索营队长晋升，权限同步升级",
    applicant: "伊万·彼得罗夫",
    time: "安珀历39年夏·10"
  }, {
    id: 4,
    name: "温如言",
    current: "机密级",
    target: "绝密级",
    reason: "悬铃木学会认知异常组副组长接任，需升级权限",
    applicant: "苏悬铃",
    time: "安珀历39年夏·08"
  }, {
    id: 5,
    name: "方叙",
    current: "秘密级",
    target: "机密级",
    reason: "衔尾蛇外勤二队转正考核通过",
    applicant: "周野",
    time: "安珀历39年夏·06"
  }, {
    id: 6,
    name: "柳朝霜",
    current: "机密级",
    target: "绝密级",
    reason: "白夜哨站极夜行动队队长权限提升申请",
    applicant: "白夜指挥官",
    time: "安珀历39年夏·04"
  }]);
  const onlineUsers = [{
    name: "魏长风",
    org: "IMAC总部",
    loginTime: "07:42",
    ip: "10.0.0.12"
  }, {
    name: "顾远舟",
    org: "边界研究院BRI",
    loginTime: "08:15",
    ip: "10.1.3.44"
  }, {
    name: "江近月",
    org: "IMAC总部",
    loginTime: "06:55",
    ip: "10.0.0.23"
  }, {
    name: "陆明远",
    org: "晨星团",
    loginTime: "08:02",
    ip: "10.2.7.18"
  }, {
    name: "苏悬铃",
    org: "悬铃木学会",
    loginTime: "07:28",
    ip: "10.4.2.91"
  }, {
    name: "陈之岸",
    org: "边界研究院BRI",
    loginTime: "08:34",
    ip: "10.1.3.107"
  }, {
    name: "林砚",
    org: "衔尾蛇事务所",
    loginTime: "08:11",
    ip: "10.3.1.56"
  }, {
    name: "桥本彻",
    org: "长桥会社",
    loginTime: "09:02",
    ip: "10.6.0.8"
  }];
  const auditLogs = [{
    time: "09:02:17",
    user: "魏长风",
    action: "审批通过 LOA-0073 行动升级申请",
    module: "JRP审批"
  }, {
    time: "08:47:33",
    user: "江近月",
    action: "修改 XDPS 协议配置参数",
    module: "系统配置"
  }, {
    time: "08:21:05",
    user: "顾远舟",
    action: "查询 SP-1120 异常档案",
    module: "档案访问"
  }, {
    time: "08:15:48",
    user: "陈默",
    action: "授权衔尾蛇外勤一队绝密级数据访问",
    module: "权限管理"
  }, {
    time: "07:58:29",
    user: "陆明远",
    action: "上传 PH-0182 物理参数样本",
    module: "数据上传"
  }, {
    time: "07:42:11",
    user: "苏悬铃",
    action: "调整 CG-0427 记忆重建方案",
    module: "方案编辑"
  }, {
    time: "07:16:40",
    user: "白夜指挥官",
    action: "新增 BW-0089 哨站人员调动",
    module: "人事管理"
  }];
  const handleApprove = id => {
    setApprovalList(list => list.map(a => a.id === id ? {
      ...a,
      status: "approved"
    } : a));
  };
  const handleReject = id => {
    setApprovalList(list => list.map(a => a.id === id ? {
      ...a,
      status: "rejected"
    } : a));
  };
  const handleConfirmRank = id => {
    setRankAdjList(list => list.map(a => a.id === id ? {
      ...a,
      status: "confirmed"
    } : a));
  };
  const handleCancelRank = id => {
    setRankAdjList(list => list.map(a => a.id === id ? {
      ...a,
      status: "cancelled"
    } : a));
  };
  const goToModule = m => {
    scrollPosRef.current = window.scrollY;
    setActiveModule(m);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const backToDashboard = () => {
    setActiveModule(null);
    setTimeout(() => {
      window.scrollTo({
        top: scrollPosRef.current,
        behavior: "auto"
      });
    }, 0);
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!canAccess("topsecret")) {
    return /*#__PURE__*/React.createElement("div", {
      className: "portal-denied"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "denied-box",
      style: {
        borderColor: "#7a3ab0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "12px",
        color: "#7a3ab0",
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.2em",
        marginBottom: "16px"
      }
    }, "TOP SECRET \xB7 ACCESS DENIED"), /*#__PURE__*/React.createElement("h2", {
      style: {
        color: "#b88ed9"
      }
    }, "\u6743\u9650\u4E0D\u8DB3"), /*#__PURE__*/React.createElement("p", null, "\u60A8\u7684\u6743\u9650\u7B49\u7EA7\u4E0D\u8DB3\u4EE5\u8BBF\u95EE\u7CFB\u7EDF\u7BA1\u7406\u9762\u677F\u3002", /*#__PURE__*/React.createElement("br", null), "\u6B64\u9875\u9762\u4EC5\u9650\u7EDD\u5BC6\u7EA7\u6388\u6743\u4EBA\u5458\u3002"), /*#__PURE__*/React.createElement("button", {
      className: "btn-primary",
      onClick: () => navigate("/portal")
    }, "\u8FD4\u56DE\u6307\u6325\u4E2D\u5FC3"))));
  }
  const systemStatus = [{
    name: "中央数据库",
    status: "online",
    ping: "12ms"
  }, {
    name: "全球通讯网络",
    status: "online",
    ping: "47ms"
  }, {
    name: "北境节点",
    status: "online",
    ping: "128ms"
  }, {
    name: "北极节点",
    status: "degraded",
    ping: "340ms"
  }, {
    name: "东境节点",
    status: "online",
    ping: "68ms"
  }, {
    name: "南境节点",
    status: "online",
    ping: "92ms"
  }, {
    name: "西境节点",
    status: "online",
    ping: "56ms"
  }, {
    name: "心理监测网络",
    status: "online",
    ping: "23ms"
  }];
  const dbStats = [{
    code: "SP",
    name: "空间类",
    count: 4287,
    unsolved: 128,
    newThisWeek: 8
  }, {
    code: "TM",
    name: "时间类",
    count: 892,
    unsolved: 34,
    newThisWeek: 1
  }, {
    code: "PH",
    name: "物理类",
    count: 1204,
    unsolved: 67,
    newThisWeek: 4
  }, {
    code: "CG",
    name: "认知类",
    count: 1567,
    unsolved: 92,
    newThisWeek: 6
  }, {
    code: "EN",
    name: "实体类",
    count: 734,
    unsolved: 45,
    newThisWeek: 3
  }, {
    code: "LO",
    name: "地点类",
    count: 2341,
    unsolved: 156,
    newThisWeek: 3
  }, {
    code: "OB",
    name: "物品类",
    count: 987,
    unsolved: 38,
    newThisWeek: 2
  }];
  const users = [
  // 界标级 / 创始人
  {
    name: "艾伦·维斯特",
    code: "维",
    id: "IMAC-HQ-0000",
    rank: "界标级",
    org: "IMAC总部",
    status: "荣誉",
    access: "绝密级",
    department: "荣誉创始人 · 溯界者命名者",
    ops: 0,
    hours: 0,
    lastOp: "安珀历元年 · 首次溯界",
    note: "安珀历元年人物，「溯界者」一词的命名者。首任IMAC行动总协调官，主导建立了全球异常应对框架。"
  }, {
    name: "陈默",
    code: "默",
    id: "IMAC-OA-0001",
    rank: "界标级",
    org: "衔尾蛇事务所",
    status: "荣誉",
    access: "绝密级",
    department: "衔尾蛇创始人 · 第一任所长",
    ops: 312,
    hours: 4210,
    lastOp: "安珀历12年 · 衔尾蛇之环",
    note: "衔尾蛇事务所三位创始人之首，提出了「规则先于探索」的核心理念。"
  }, {
    name: "方晴",
    code: "晴",
    id: "IMAC-OA-0002",
    rank: "首席溯界者",
    org: "衔尾蛇事务所",
    status: "荣誉",
    access: "绝密级",
    department: "衔尾蛇创始人 · 规则研究部",
    ops: 278,
    hours: 3542,
    lastOp: "安珀历15年 · 回声回廊",
    note: "衔尾蛇三位创始人之一，规则分析体系的建立者。"
  }, {
    name: "周野",
    code: "野",
    id: "IMAC-OA-0003",
    rank: "界标级",
    org: "衔尾蛇事务所",
    status: "荣誉",
    access: "绝密级",
    department: "衔尾蛇创始人 · 行动部",
    ops: 295,
    hours: 3876,
    lastOp: "安珀历18年 · 深渊之门",
    note: "衔尾蛇三位创始人之一，率领首批外勤队完成百次以上深入探索。"
  }, {
    name: "伊万·彼得罗夫",
    code: "冰",
    id: "IMAC-NW-0001",
    rank: "界标级",
    org: "北境守望",
    status: "荣誉",
    access: "绝密级",
    department: "北境守望创始人",
    ops: 187,
    hours: 2890,
    lastOp: "安珀历7年 · 冻原深渊",
    note: "北境守望创始人，极圈异常研究的开创者。"
  }, {
    name: "白夜指挥官",
    code: "夜",
    id: "IMAC-WNP-0001",
    rank: "界标级",
    org: "白夜哨站",
    status: "在岗",
    access: "绝密级",
    department: "白夜哨站 · 总指挥官",
    ops: 203,
    hours: 2654,
    lastOp: "安珀历37年 · 极夜之门",
    note: "白夜哨站最高指挥官，极夜地区异常防线的建立者。"
  }, {
    name: "长桥源三",
    code: "桥",
    id: "IMAC-LBC-0001",
    rank: "界标级",
    org: "长桥会社",
    status: "荣誉",
    access: "绝密级",
    department: "长桥会社 · 初代总协调官",
    ops: 221,
    hours: 2987,
    lastOp: "安珀历9年 · 桥之彼端",
    note: "长桥会社创始人，东岛异常研究先驱。"
  },
  // 首席级 / 现任高层
  {
    name: "魏长风",
    code: "风",
    id: "IMAC-HQ-0001",
    rank: "行动总协调官",
    org: "IMAC总部",
    status: "在岗",
    access: "绝密级",
    department: "联合行动指挥中心",
    ops: 256,
    hours: 3124,
    lastOp: "—",
    note: "IMAC现任行动总协调官，统筹全球联合行动。"
  }, {
    name: "顾远舟",
    code: "远",
    id: "IMAC-BRI-0001",
    rank: "首席研究员",
    org: "边界研究院BRI",
    status: "在岗",
    access: "绝密级",
    department: "BRI院长 · 空间异常研究所",
    ops: 156,
    hours: 1987,
    lastOp: "PH-0815 重力偏移区",
    note: "边界研究院BRI现任院长，空间异常领域权威。"
  }, {
    name: "陆明远",
    code: "明",
    id: "IMAC-MC-0001",
    rank: "首席科学家",
    org: "晨星团",
    status: "在岗",
    access: "绝密级",
    department: "晨星团首席科学家 · 物理异常组",
    ops: 112,
    hours: 1432,
    lastOp: "PH-0182 洛林裂隙",
    note: "晨星团首席科学家，物理法则类异常研究领军者。"
  }, {
    name: "苏悬铃",
    code: "铃",
    id: "IMAC-PS-0001",
    rank: "首席溯界者",
    org: "悬铃木学会",
    status: "在岗",
    access: "绝密级",
    department: "悬铃木学会会长",
    ops: 98,
    hours: 1256,
    lastOp: "CG-0713 旧图书馆",
    note: "悬铃木学会现任会长，认知异常与记忆研究专家。"
  }, {
    name: "薛定澜",
    code: "澜",
    id: "IMAC-4W-0001",
    rank: "界标级",
    org: "第四面墙",
    status: "在岗",
    access: "绝密级",
    department: "第四面墙主管",
    ops: 0,
    hours: 0,
    lastOp: "—",
    note: "第四面墙最高主管，负责跨现实边界监控与协议维护。身份信息大部分加密。"
  }, {
    name: "江近月",
    code: "月",
    id: "IMAC-HQ-0023",
    rank: "高级管理员",
    org: "IMAC总部",
    status: "在岗",
    access: "绝密级",
    department: "技术局 · 系统运维",
    ops: 45,
    hours: 512,
    lastOp: "系统运维",
    note: "IMAC技术局核心成员，XDPS协议栈主要维护者。"
  },
  // 赤月学院 LOA-0073 行动队（衔尾蛇/BRI联合）
  {
    name: "沈彻",
    code: "彻",
    id: "IMAC-OA-0047",
    rank: "资深溯界者",
    org: "衔尾蛇事务所",
    status: "失联",
    access: "机密级",
    department: "外勤一队 · 队长 · LOA-0073行动指挥",
    ops: 128,
    hours: 1847,
    lastOp: "LOA-0073 赤月学院",
    note: "赤月学院异常介入行动总指挥，衔尾蛇外勤一队队长。夏·29 最后通讯后失联。"
  }, {
    name: "季明轩",
    code: "明",
    id: "IMAC-OA-0189",
    rank: "溯界者",
    org: "衔尾蛇事务所",
    status: "失联",
    access: "机密级",
    department: "外勤一队 · 队员",
    ops: 42,
    hours: 568,
    lastOp: "LOA-0073 赤月学院",
    note: "衔尾蛇外勤一队成员，随沈彻进入赤月学院，夏·29 同队失联。"
  }, {
    name: "顾泽鸣",
    code: "泽",
    id: "IMAC-BRI-0247",
    rank: "资深溯界者",
    org: "边界研究院BRI",
    status: "失联",
    access: "机密级",
    department: "空间异常研究所 · BRI队长",
    ops: 87,
    hours: 1123,
    lastOp: "LOA-0073 赤月学院",
    note: "BRI空间异常研究所资深研究员，赤月行动BRI分队队长。夏·29 同队失联。"
  }, {
    name: "林薇",
    code: "薇",
    id: "IMAC-BRI-0356",
    rank: "溯界者",
    org: "边界研究院BRI",
    status: "失联",
    access: "秘密级",
    department: "空间异常研究所 · 队员",
    ops: 31,
    hours: 398,
    lastOp: "LOA-0073 赤月学院",
    note: "BRI研究员，顾泽鸣小队成员。夏·29 同队失联。"
  },
  // 其他活跃溯界者
  {
    name: "林砚",
    code: "砚",
    id: "IMAC-OA-0089",
    rank: "资深溯界者",
    org: "衔尾蛇事务所",
    status: "在岗",
    access: "机密级",
    department: "外勤一队 · 副队长",
    ops: 104,
    hours: 1423,
    lastOp: "SP-1120 回声走廊",
    note: "衔尾蛇外勤一队副队长，因留守总部未参与赤月行动。"
  }, {
    name: "苏晚",
    code: "晚",
    id: "IMAC-BRI-0312",
    rank: "研究员",
    org: "边界研究院BRI",
    status: "外勤",
    access: "机密级",
    department: "认知异常研究组",
    ops: 53,
    hours: 674,
    lastOp: "CG-0427 记忆回廊",
    note: "BRI认知异常研究组核心成员。"
  }, {
    name: "韩凛",
    code: "凛",
    id: "IMAC-NW-0156",
    rank: "资深溯界者",
    org: "北境守望",
    status: "外勤",
    access: "机密级",
    department: "冻土探索营 · 队长 · TM-0089指挥",
    ops: 97,
    hours: 1256,
    lastOp: "TM-0089 白松冻土",
    note: "白松城冻土层时间停滞行动指挥，北境守望冻土探索营队长。"
  }, {
    name: "叶知秋",
    code: "秋",
    id: "IMAC-NW-0203",
    rank: "溯界者",
    org: "北境守望",
    status: "休假",
    access: "秘密级",
    department: "冻土探索营 · 队员",
    ops: 34,
    hours: 412,
    lastOp: "PH-0728 冰下断层",
    note: "北境守望冻土探索营成员，轮休中。"
  }, {
    name: "周珩",
    code: "珩",
    id: "IMAC-MC-0145",
    rank: "溯界者",
    org: "晨星团",
    status: "外勤",
    access: "秘密级",
    department: "行动部 · 三组",
    ops: 41,
    hours: 528,
    lastOp: "PH-0182 洛林裂隙",
    note: "晨星团行动部三组，参与洛林裂隙联合行动。"
  }, {
    name: "方叙",
    code: "叙",
    id: "IMAC-OA-0167",
    rank: "溯界者",
    org: "衔尾蛇事务所",
    status: "在岗",
    access: "秘密级",
    department: "外勤二队 · 队员",
    ops: 38,
    hours: 487,
    lastOp: "LO-1045 失物公寓",
    note: "衔尾蛇外勤二队成员。"
  }, {
    name: "陈之岸",
    code: "岸",
    id: "IMAC-BRI-0412",
    rank: "初级研究员",
    org: "边界研究院BRI",
    status: "在岗",
    access: "秘密级",
    department: "异常数据中心",
    ops: 19,
    hours: 234,
    lastOp: "OB-0311 旧钟表",
    note: "BRI异常数据中心初级研究员。"
  }, {
    name: "许知遥",
    code: "遥",
    id: "IMAC-MED-0076",
    rank: "主治医师",
    org: "医疗保障部",
    status: "在岗",
    access: "机密级",
    department: "心理干预中心",
    ops: 28,
    hours: 345,
    lastOp: "CG-0612 静默走廊",
    note: "IMAC医疗保障部心理干预中心主治医师。"
  }, {
    name: "唐夜",
    code: "夜",
    id: "IMAC-OA-0256",
    rank: "见习溯界者",
    org: "衔尾蛇事务所",
    status: "休假",
    access: "受限级",
    department: "见习大队",
    ops: 7,
    hours: 89,
    lastOp: "SP-0890 镜像走廊",
    note: "衔尾蛇见习大队成员，第二轮考核待进行。"
  }, {
    name: "黎深",
    code: "深",
    id: "IMAC-NW-0312",
    rank: "溯界者",
    org: "北境守望",
    status: "外勤",
    access: "秘密级",
    department: "极地探索队",
    ops: 62,
    hours: 756,
    lastOp: "EN-0234 深寒巨兽",
    note: "北境守望极地探索队成员。"
  }, {
    name: "温如言",
    code: "言",
    id: "IMAC-PS-0023",
    rank: "资深溯界者",
    org: "悬铃木学会",
    status: "在岗",
    access: "机密级",
    department: "认知异常组 · 副组长",
    ops: 76,
    hours: 945,
    lastOp: "CG-0502 无声剧场",
    note: "悬铃木学会认知异常组副组长。"
  }, {
    name: "柳朝霜",
    code: "霜",
    id: "IMAC-WNP-0034",
    rank: "资深溯界者",
    org: "白夜哨站",
    status: "外勤",
    access: "机密级",
    department: "极夜行动队 · 队长",
    ops: 89,
    hours: 1102,
    lastOp: "SP-2041 永夜走廊",
    note: "白夜哨站极夜行动队队长。"
  }, {
    name: "桥本彻",
    code: "彻",
    id: "IMAC-LBC-0067",
    rank: "首席溯界者",
    org: "长桥会社",
    status: "在岗",
    access: "机密级",
    department: "长桥会社 · 现任总协调官",
    ops: 145,
    hours: 1789,
    lastOp: "TM-0334 桥之循环",
    note: "长桥会社现任总协调官。"
  }];
  const operations = [{
    code: "LOA-0073",
    name: "赤月学院异常介入行动",
    level: "深渊级",
    levelClass: "abyssal",
    org: "衔尾蛇/BRI联合",
    response: "二级响应",
    status: "进行中",
    personnel: 6,
    phase: "失联监测",
    start: "安珀历39年夏·26",
    lastContact: "夏·29 14:32",
    commander: "沈彻",
    sector: "东侧主入口 · 深入未知",
    orgs: ["衔尾蛇事务所", "边界研究院BRI"],
    notes: "常规通讯中断，锚定信标信号微弱但稳定。按规程第3.1条，暂不启动搜救，持续监测。参与人员：沈彻、季明轩（衔尾蛇）；顾泽鸣、林薇（BRI）等6人。"
  }, {
    code: "PH-0182",
    name: "洛林自由市边境裂隙",
    level: "厄运级",
    levelClass: "doomed",
    org: "BRI/晨星团联合",
    response: "三级响应",
    status: "进行中",
    personnel: 12,
    phase: "边界测绘",
    start: "安珀历39年夏·14",
    lastContact: "实时通讯中",
    commander: "陆明远",
    sector: "边境裂隙带 · 外围安全",
    orgs: ["边界研究院BRI", "晨星团"],
    notes: "裂隙范围稳定，内部规则初步建立。平民撤离已完成。边界测绘进入第3阶段。"
  }, {
    code: "TM-0089",
    name: "白松城冻土层时间停滞",
    level: "危险级",
    levelClass: "hazardous",
    org: "北境守望",
    response: "三级响应",
    status: "进行中",
    personnel: 8,
    phase: "采样分析",
    start: "安珀历39年夏·20",
    lastContact: "每30分钟回报",
    commander: "韩凛",
    sector: "冻土层地下300m",
    orgs: ["北境守望"],
    notes: "时间流速异常已量化（内部约1:8.7）。采集样本分批次送出。韩凛带队深入。"
  }, {
    code: "SP-1120",
    name: "回声走廊空间偏移",
    level: "危险级",
    levelClass: "hazardous",
    org: "衔尾蛇事务所",
    response: "四级响应",
    status: "待命",
    personnel: 4,
    phase: "预案准备",
    start: "—",
    lastContact: "—",
    commander: "林砚",
    sector: "城南废弃地铁环线",
    orgs: ["衔尾蛇事务所"],
    notes: "异常活跃度近期上升，预备队已集结待命。林砚任待命行动指挥。"
  }, {
    code: "CG-0427",
    name: "记忆回廊认知污染",
    level: "厄运级",
    levelClass: "doomed",
    org: "边界研究院BRI",
    response: "三级响应",
    status: "已结束",
    personnel: 6,
    phase: "收尾归档",
    start: "安珀历39年春·11",
    lastContact: "已结束",
    commander: "顾远舟",
    sector: "老城区精神病院旧址",
    orgs: ["边界研究院BRI", "悬铃木学会"],
    notes: "异常核心已定位并封存，12名受影响平民记忆重建完成。行动总结报告待审批。"
  }];
  const logs = [{
    time: "08:02:17",
    date: "2026-08-16",
    level: "INFO",
    module: "SYSTEM",
    msg: "系统每日自检启动，检查节点数量 7/7"
  }, {
    time: "08:02:49",
    date: "2026-08-16",
    level: "INFO",
    module: "DATABASE",
    msg: "主数据库实例 CENTRAL-01 健康检查通过，连接池 256/512"
  }, {
    time: "08:03:11",
    date: "2026-08-16",
    level: "INFO",
    module: "AUTH",
    msg: "管理员 root-console 登录成功，来源 IP 10.0.0.1"
  }, {
    time: "08:05:42",
    date: "2026-08-16",
    level: "WARN",
    module: "NODE-ARCTIC",
    msg: "北极节点心跳延迟 340ms 超过阈值 200ms，触发降级告警"
  }, {
    time: "08:07:28",
    date: "2026-08-16",
    level: "INFO",
    module: "XDPS",
    msg: "异常数据处理协议栈 v4.2 版本校验通过，所有节点已同步"
  }, {
    time: "08:09:55",
    date: "2026-08-16",
    level: "ERROR",
    module: "AUTH",
    msg: "用户认证失败：账号 IMAC-UNK-9981，来源 IP 203.17.xx.xx，已锁定30分钟"
  }, {
    time: "08:12:03",
    date: "2026-08-16",
    level: "INFO",
    module: "BACKUP",
    msg: "异常档案增量备份完成，新增记录 47 条，总大小 2.3 TB"
  }, {
    time: "08:14:36",
    date: "2026-08-16",
    level: "INFO",
    module: "PSYCH-NET",
    msg: "心理监测网络数据同步完成，在测人员 1,247 人，预警 0 人"
  }, {
    time: "08:17:21",
    date: "2026-08-16",
    level: "WARN",
    module: "NODE-GAMMA-12",
    msg: "节点 γ-12 流量告警：入站流量 87% 超过 80% 阈值"
  }, {
    time: "08:20:08",
    date: "2026-08-16",
    level: "INFO",
    module: "JRP",
    msg: "联合行动 PH-0182 状态同步：三级响应 · 边界测绘阶段，人员 12 人"
  }, {
    time: "08:22:45",
    date: "2026-08-16",
    level: "INFO",
    module: "DATABASE",
    msg: "异常 LO-0073 档案更新：新增探索记录 7 条，记录累计 284 条"
  }, {
    time: "08:25:13",
    date: "2026-08-16",
    level: "ERROR",
    module: "NODE-NORTH",
    msg: "节点心跳包丢失 2 次，自动重连成功，耗时 4.2s"
  }, {
    time: "08:28:59",
    date: "2026-08-16",
    level: "INFO",
    module: "AI-ENGINE",
    msg: "AID v2.7 规则引擎加载完成，异常模式库 3,412 条"
  }, {
    time: "08:31:27",
    date: "2026-08-16",
    level: "WARN",
    module: "STORAGE",
    msg: "归档存储池使用率 78%，预计 14 天后需扩容"
  }, {
    time: "08:34:06",
    date: "2026-08-16",
    level: "INFO",
    module: "AUTH",
    msg: "用户 IMAC-OA-0047 身份核验通过，权限等级 绝密级"
  }, {
    time: "08:36:41",
    date: "2026-08-16",
    level: "INFO",
    module: "COMMS",
    msg: "全球通讯网络 127 个中继站全部在线，平均延迟 47ms"
  }, {
    time: "08:39:18",
    date: "2026-08-16",
    level: "ERROR",
    module: "PSYCH-NET",
    msg: "第 11 战区心理监测数据上传中断，持续 3 分钟，已恢复"
  }, {
    time: "08:42:55",
    date: "2026-08-16",
    level: "INFO",
    module: "DATABASE",
    msg: "异常分类统计任务完成，七大类合计 12,013 条记录"
  }, {
    time: "08:45:33",
    date: "2026-08-16",
    level: "INFO",
    module: "XDPS",
    msg: "加密握手重试机制测试通过，失败率 0.012%"
  }, {
    time: "08:48:10",
    date: "2026-08-16",
    level: "WARN",
    module: "NODE-EAST",
    msg: "东境节点温度告警：机房温度 28.5°C，接近 30°C 告警线"
  }, {
    time: "08:50:47",
    date: "2026-08-16",
    level: "INFO",
    module: "BACKUP",
    msg: "异地灾备同步完成，数据一致性校验通过"
  }, {
    time: "08:53:22",
    date: "2026-08-16",
    level: "INFO",
    module: "AUTH",
    msg: "用户 IMAC-BRI-0231 登录，权限等级 机密级，来源 BRI 内网"
  }, {
    time: "08:55:58",
    date: "2026-08-16",
    level: "ERROR",
    module: "ANOMALY-API",
    msg: "异常查询接口 500 错误 3 次，已自动重启服务进程"
  }, {
    time: "08:58:44",
    date: "2026-08-16",
    level: "INFO",
    module: "JRP",
    msg: "联合行动 LOA-0073 信标监测：信号微弱但稳定，位置无漂移"
  }, {
    time: "09:01:16",
    date: "2026-08-16",
    level: "INFO",
    module: "SYSTEM",
    msg: "每日自检完成，全部节点在线，系统健康度 98.7%"
  }, {
    time: "09:03:59",
    date: "2026-08-16",
    level: "WARN",
    module: "CERT",
    msg: "TLS 证书将于 30 天后过期，请及时续签"
  }, {
    time: "09:06:35",
    date: "2026-08-16",
    level: "INFO",
    module: "AI-ENGINE",
    msg: "AID 自动标注任务完成，新异常规则建议 14 条待审核"
  }, {
    time: "09:09:12",
    date: "2026-08-16",
    level: "INFO",
    module: "DATABASE",
    msg: "数据库查询优化任务完成，平均响应时间降低 14%"
  }];
  const getStatusColor = s => {
    if (s === "online") return "var(--level-ordinary)";
    if (s === "degraded") return "var(--level-hazardous)";
    return "var(--level-abyssal)";
  };
  const getStatusLabel = s => {
    if (s === "online") return "在线";
    if (s === "degraded") return "降级";
    return "离线";
  };
  const getUserStatusColor = s => {
    if (s === "在岗" || s === "荣誉") return "var(--level-ordinary)";
    if (s === "外勤") return "var(--accent-red-bright)";
    if (s === "休假") return "var(--text-tertiary)";
    if (s === "失联") return "var(--level-abyssal)";
    return "var(--text-secondary)";
  };
  const filteredUsers = users.filter(u => {
    const matchSearch = !userSearch || u.name.includes(userSearch) || u.code.includes(userSearch) || u.id.toLowerCase().includes(userSearch.toLowerCase()) || u.department.includes(userSearch);
    const matchOrg = userOrgFilter === "all" || u.org === userOrgFilter;
    const matchRank = userRankFilter === "all" || u.rank === userRankFilter;
    const matchStatus = userStatusFilter === "all" || u.status === userStatusFilter;
    return matchSearch && matchOrg && matchRank && matchStatus;
  });
  const orgs = ["全部", "IMAC总部", "衔尾蛇事务所", "边界研究院BRI", "北境守望", "晨星团", "悬铃木学会", "白夜哨站", "长桥会社", "第四面墙", "医疗保障部"];
  const ranks = ["全部", "界标级", "首席溯界者", "首席研究员", "首席科学家", "行动总协调官", "高级管理员", "资深溯界者", "研究员", "溯界者", "主治医师", "初级研究员", "见习溯界者"];
  const statuses = ["全部", "在岗", "外勤", "休假", "失联", "荣誉"];
  const filteredLogs = logs.filter(l => logFilter === "all" || l.level.toLowerCase() === logFilter);
  const opStats = {
    active: operations.filter(o => o.status === "进行中").length,
    standby: operations.filter(o => o.status === "待命").length,
    closed: operations.filter(o => o.status === "已结束").length
  };
  const logStats = {
    total: logs.length,
    info: logs.filter(l => l.level === "INFO").length,
    warn: logs.filter(l => l.level === "WARN").length,
    error: logs.filter(l => l.level === "ERROR").length
  };
  const accessClass = a => {
    if (a === "绝密级") return "topsecret";
    if (a === "机密级") return "confidential";
    if (a === "秘密级") return "secret";
    return "internal";
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .admin-page {
          background-color: #07070a;
          background-image:
            linear-gradient(rgba(122, 58, 176, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(122, 58, 176, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          color: var(--text-primary);
          min-height: calc(100vh - 64px);
          padding-top: 80px;
          padding-bottom: 60px;
        }
        .admin-top-bar {
          background: linear-gradient(90deg, rgba(122, 58, 176, 0.15), transparent);
          border-bottom: 1px solid rgba(122, 58, 176, 0.4);
          padding: 12px 0;
          margin-bottom: 28px;
        }
        .admin-top-bar-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .admin-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: #b88ed9;
          letter-spacing: 0.15em;
        }
        .admin-badge-dot {
          width: 8px; height: 8px;
          background-color: #b88ed9;
          border-radius: 50%;
          animation: pulse-purple 2s infinite;
        }
        @keyframes pulse-purple {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .admin-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        .admin-breadcrumb .crumb-link {
          cursor: pointer;
          color: #b88ed9;
        }
        .page-title {
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 4px;
          color: #d4b8e8;
        }
        .page-title-en {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #7a3ab0;
          letter-spacing: 0.2em;
          margin-bottom: 28px;
        }
        .admin-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .admin-card {
          background-color: rgba(15, 12, 22, 0.8);
          border: 1px solid rgba(122, 58, 176, 0.3);
          backdrop-filter: blur(4px);
        }
        .admin-card.clickable { cursor: pointer; transition: all 0.25s ease; }
        .admin-card.clickable:hover {
          border-color: rgba(184, 142, 217, 0.7);
          background-color: rgba(30, 20, 45, 0.85);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(122, 58, 176, 0.15);
        }
        .admin-card-head {
          padding: 14px 20px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.2);
          background: linear-gradient(90deg, rgba(122, 58, 176, 0.1), transparent);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .admin-card-title {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 600;
          color: #d4b8e8;
        }
        .admin-card-title-en {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #7a3ab0;
          letter-spacing: 0.15em;
          margin-left: 8px;
        }
        .admin-card-action {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #b88ed9;
          letter-spacing: 0.1em;
          opacity: 0.8;
        }
        .admin-card.clickable:hover .admin-card-action { opacity: 1; }
        .admin-card-body { padding: 20px; }

        /* System status */
        .status-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .status-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background-color: rgba(122, 58, 176, 0.05);
          border: 1px solid rgba(122, 58, 176, 0.15);
          font-size: 12px;
        }
        .status-item-name { color: var(--text-secondary); }
        .status-item-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .status-item-ping {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
        }
        .status-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
        }

        /* DB stats table */
        .db-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }
        .db-table th {
          text-align: left;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          padding: 8px 12px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.2);
          font-weight: 400;
        }
        .db-table td {
          padding: 10px 12px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.1);
          color: var(--text-secondary);
        }
        .db-code {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #b88ed9;
          font-weight: 600;
        }
        .db-num { font-family: var(--font-mono); }
        .db-new { color: var(--accent-red-bright); font-family: var(--font-mono); }

        .admin-summary-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }
        .admin-stat {
          padding: 20px;
          background-color: rgba(15, 12, 22, 0.8);
          border: 1px solid rgba(122, 58, 176, 0.3);
          text-align: center;
        }
        .admin-stat-num {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 900;
          color: #b88ed9;
          line-height: 1;
        }
        .admin-stat-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-top: 8px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background-color: transparent;
          border: 1px solid rgba(122, 58, 176, 0.4);
          color: #b88ed9;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .back-btn:hover {
          border-color: #b88ed9;
          background: rgba(122, 58, 176, 0.1);
        }

        /* op-list (dashboard preview) */
        .op-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .op-item {
          padding: 12px 16px;
          background-color: rgba(122, 58, 176, 0.05);
          border: 1px solid rgba(122, 58, 176, 0.15);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .op-main { display: flex; flex-direction: column; gap: 4px; }
        .op-code {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #b88ed9;
        }
        .op-name { font-size: 14px; font-weight: 600; color: var(--text-primary); }
        .op-org { font-size: 11px; color: var(--text-tertiary); }
        .op-status {
          font-size: 10px;
          padding: 3px 10px;
          border: 1px solid var(--level-doomsday);
          color: var(--level-doomsday);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }

        /* log-list (dashboard preview) */
        .log-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          max-height: 280px;
          overflow-y: auto;
        }
        .log-item {
          display: flex;
          gap: 12px;
          padding: 6px 0;
          border-bottom: 1px solid rgba(122, 58, 176, 0.08);
        }
        .log-time { color: var(--text-tertiary); flex-shrink: 0; }
        .log-level {
          flex-shrink: 0;
          font-weight: 600;
          width: 52px;
        }
        .log-level.info { color: var(--level-ordinary); }
        .log-level.warn { color: var(--level-hazardous); }
        .log-level.error { color: var(--accent-red-bright); }
        .log-msg { color: var(--text-secondary); word-break: break-all; }

        /* === Module Detail Panels === */
        .module-panel { animation: panelFadeIn 0.3s ease; }
        @keyframes panelFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ====== User Management ====== */
        .user-action-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 20px;
        }
        .user-action-card {
          padding: 18px 18px 16px;
          background: rgba(15, 12, 22, 0.8);
          border: 1px solid rgba(122, 58, 176, 0.25);
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .user-action-card:hover {
          border-color: rgba(184, 142, 217, 0.6);
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(122, 58, 176, 0.15);
        }
        .user-action-card.is-open {
          border-color: #b88ed9;
          background: rgba(40, 24, 60, 0.6);
        }
        .user-action-top {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .user-action-icon {
          width: 32px; height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b88ed9;
          background: rgba(122, 58, 176, 0.12);
          flex-shrink: 0;
        }
        .user-action-icon svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 1.8; }
        .user-action-title {
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .user-action-desc {
          font-size: 11px;
          color: var(--text-tertiary);
        }
        .user-action-badge {
          position: absolute;
          top: 10px; right: 10px;
          min-width: 20px; height: 20px;
          padding: 0 6px;
          border-radius: 10px;
          background: var(--accent-red-bright);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-panel {
          margin-bottom: 20px;
          background: rgba(15, 12, 22, 0.8);
          border: 1px solid rgba(184, 142, 217, 0.4);
          animation: panelFadeIn 0.25s ease;
          overflow: hidden;
        }
        .user-panel-head {
          padding: 12px 20px;
          background: linear-gradient(90deg, rgba(122, 58, 176, 0.15), transparent);
          border-bottom: 1px solid rgba(122, 58, 176, 0.25);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .user-panel-title {
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 600;
          color: #d4b8e8;
        }
        .user-panel-close {
          background: none;
          border: 1px solid rgba(122, 58, 176, 0.3);
          color: #b88ed9;
          width: 24px; height: 24px;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .user-panel-close:hover { background: rgba(122, 58, 176, 0.15); }
        .user-panel-body { padding: 16px 20px; }

        .approval-list, .rankadj-list, .online-list, .audit-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .approval-item {
          padding: 14px 18px;
          border: 1px solid rgba(122, 58, 176, 0.2);
          background: rgba(122, 58, 176, 0.04);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .approval-info {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 1;
        }
        .approval-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1.5px solid #7a3ab0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 700;
          color: #b88ed9;
          background: rgba(122, 58, 176, 0.12);
          flex-shrink: 0;
        }
        .approval-meta {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .approval-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .approval-sub {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .approval-actions { display: flex; gap: 8px; flex-shrink: 0; }
        .btn-approve, .btn-reject, .btn-confirm, .btn-cancel {
          padding: 6px 16px;
          font-size: 11px;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
          cursor: pointer;
          border: 1px solid;
          background: transparent;
          transition: all 0.2s;
        }
        .btn-approve { color: var(--level-ordinary); border-color: rgba(74, 124, 89, 0.5); }
        .btn-approve:hover { background: rgba(74, 124, 89, 0.15); }
        .btn-reject { color: var(--accent-red-bright); border-color: rgba(196, 40, 40, 0.5); }
        .btn-reject:hover { background: rgba(196, 40, 40, 0.12); }
        .btn-confirm { color: #b88ed9; border-color: rgba(184, 142, 217, 0.5); }
        .btn-confirm:hover { background: rgba(184, 142, 217, 0.12); }
        .btn-cancel { color: var(--text-tertiary); border-color: rgba(120, 120, 130, 0.4); }
        .btn-cancel:hover { background: rgba(120, 120, 130, 0.1); }
        .status-tag {
          padding: 3px 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.05em;
          border: 1px solid;
        }
        .status-tag.approved { color: var(--level-ordinary); border-color: rgba(74, 124, 89, 0.5); }
        .status-tag.rejected { color: var(--accent-red-bright); border-color: rgba(196, 40, 40, 0.5); }
        .status-tag.confirmed { color: #b88ed9; border-color: rgba(184, 142, 217, 0.5); }
        .status-tag.cancelled { color: var(--text-tertiary); border-color: rgba(120, 120, 130, 0.4); }
        .status-tag.pending { color: var(--level-hazardous); border-color: rgba(255, 170, 0, 0.5); }

        .rankadj-item {
          padding: 14px 18px;
          border: 1px solid rgba(122, 58, 176, 0.2);
          background: rgba(122, 58, 176, 0.04);
        }
        .rankadj-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .rankadj-name { font-size: 14px; font-weight: 600; color: var(--text-primary); }
        .rankadj-flow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          margin-bottom: 8px;
        }
        .rankadj-from { color: var(--text-tertiary); }
        .rankadj-arrow { color: #7a3ab0; }
        .rankadj-to { color: #b88ed9; font-weight: 600; }
        .rankadj-reason {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 8px;
          line-height: 1.5;
        }
        .rankadj-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 8px;
          border-top: 1px solid rgba(122, 58, 176, 0.12);
        }
        .rankadj-applicant {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .online-item {
          padding: 10px 16px;
          border: 1px solid rgba(74, 124, 89, 0.2);
          background: rgba(74, 124, 89, 0.04);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .online-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .online-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--level-ordinary);
          box-shadow: 0 0 6px var(--level-ordinary);
        }
        .online-name { font-size: 13px; color: var(--text-primary); font-weight: 500; }
        .online-org { font-size: 11px; color: var(--text-tertiary); }
        .online-right {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          text-align: right;
        }
        .audit-item {
          padding: 10px 16px;
          border-left: 2px solid #7a3ab0;
          background: rgba(122, 58, 176, 0.04);
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .audit-time {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          flex-shrink: 0;
          min-width: 70px;
          padding-top: 2px;
        }
        .audit-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .audit-user {
          font-size: 12px;
          color: #b88ed9;
          font-weight: 600;
        }
        .audit-action { font-size: 12px; color: var(--text-secondary); }
        .audit-module {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          flex-shrink: 0;
          padding-top: 2px;
        }
        @media (max-width: 768px) {
          .user-action-grid { grid-template-columns: 1fr 1fr; }
        }
        .user-toolbar {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .user-search {
          flex: 1;
          min-width: 200px;
          padding: 10px 16px;
          background: rgba(15, 12, 22, 0.9);
          border: 1px solid rgba(122, 58, 176, 0.3);
          color: var(--text-primary);
          font-size: 13px;
          font-family: var(--font-mono);
          outline: none;
          transition: border-color 0.2s;
        }
        .user-search:focus { border-color: #b88ed9; }
        .user-filter {
          padding: 10px 14px;
          background: rgba(15, 12, 22, 0.9);
          border: 1px solid rgba(122, 58, 176, 0.3);
          color: var(--text-secondary);
          font-size: 12px;
          font-family: var(--font-mono);
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }
        .user-filter:hover { border-color: rgba(184, 142, 217, 0.5); }
        .user-count-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.15);
        }
        .user-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }
        .user-table th {
          text-align: left;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          padding: 12px 14px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.3);
          font-weight: 400;
          background: rgba(122, 58, 176, 0.06);
        }
        .user-table td {
          padding: 14px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.1);
          color: var(--text-secondary);
          cursor: pointer;
          transition: background 0.2s;
        }
        .user-table tbody tr:hover td {
          background: rgba(122, 58, 176, 0.08);
          color: var(--text-primary);
        }
        .user-table-name {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .user-avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          border: 1.5px solid #7a3ab0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 700;
          color: #b88ed9;
          background: rgba(122, 58, 176, 0.12);
          flex-shrink: 0;
        }
        .user-name-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .user-name-cell .name {
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 500;
        }
        .user-name-cell .dept {
          font-size: 10px;
          color: var(--text-tertiary);
        }
        .user-id { font-family: var(--font-mono); font-size: 11px; color: var(--text-tertiary); }
        .user-status-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          margin-right: 6px;
        }
        .access-badge {
          padding: 3px 10px;
          border: 1px solid;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
        .access-badge.topsecret {
          color: #b88ed9;
          border-color: rgba(184, 142, 217, 0.5);
          background: rgba(122, 58, 176, 0.12);
        }
        .access-badge.confidential {
          color: var(--accent-red-bright);
          border-color: rgba(196, 40, 40, 0.5);
          background: rgba(196, 40, 40, 0.08);
        }
        .access-badge.secret {
          color: var(--level-hazardous);
          border-color: rgba(255, 170, 0, 0.5);
          background: rgba(255, 170, 0, 0.06);
        }
        .access-badge.internal {
          color: var(--text-tertiary);
          border-color: rgba(120, 120, 130, 0.5);
          background: rgba(120, 120, 130, 0.06);
        }

        /* User Detail Modal */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(5, 3, 10, 0.85);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          padding: 20px;
          animation: modalFade 0.2s ease;
        }
        @keyframes modalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-box {
          background: #0f0d18;
          border: 1px solid rgba(122, 58, 176, 0.5);
          max-width: 600px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          animation: modalIn 0.25s ease;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(122, 58, 176, 0.1);
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-head {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.3);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(90deg, rgba(122, 58, 176, 0.12), transparent);
        }
        .modal-title {
          font-family: var(--font-serif);
          font-size: 18px;
          color: #d4b8e8;
          font-weight: 600;
        }
        .modal-close {
          background: none;
          border: 1px solid rgba(122, 58, 176, 0.3);
          color: #b88ed9;
          width: 28px; height: 28px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .modal-close:hover {
          border-color: #b88ed9;
          background: rgba(122, 58, 176, 0.15);
        }
        .modal-body { padding: 24px; }
        .detail-row {
          display: flex;
          padding: 10px 0;
          border-bottom: 1px solid rgba(122, 58, 176, 0.08);
          font-size: 13px;
        }
        .detail-label {
          width: 110px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          flex-shrink: 0;
          padding-top: 3px;
        }
        .detail-value { color: var(--text-secondary); flex: 1; }
        .detail-section-title {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #7a3ab0;
          letter-spacing: 0.18em;
          margin: 22px 0 10px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.25);
        }
        .detail-note {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.7;
          padding: 12px 16px;
          background: rgba(122, 58, 176, 0.06);
          border-left: 2px solid #7a3ab0;
        }

        /* ====== Operations Module ====== */
        .op-stats-row {
          display: flex !important;
          flex-direction: row !important;
          justify-content: space-between;
          align-items: stretch;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: nowrap !important;
          width: 100%;
          box-sizing: border-box;
          min-width: 0;
        }
        .op-stat-card {
          flex: 1 1 0 !important;
          min-width: 0 !important;
          width: 0;
          padding: 10px 14px;
          border: 1px solid;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          position: relative;
          overflow: hidden;
          transition: all 0.25s ease;
          cursor: pointer;
          min-height: 44px;
          box-sizing: border-box;
        }
        .op-stat-card:hover { transform: translateY(-1px); }
        .op-stat-card.is-active {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.25);
        }
        .op-stat-card.is-active::after {
          content: "";
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--stat-bar, var(--accent-red-bright));
        }
        .op-stat-card.active.is-active {
          border-color: rgba(196, 40, 40, 0.8);
          background: linear-gradient(90deg, rgba(196, 40, 40, 0.18), rgba(196, 40, 40, 0.04));
          --stat-bar: var(--accent-red-bright);
        }
        .op-stat-card.standby.is-active {
          border-color: rgba(255, 170, 0, 0.7);
          background: linear-gradient(90deg, rgba(255, 170, 0, 0.14), rgba(255, 170, 0, 0.04));
          --stat-bar: var(--level-hazardous);
        }
        .op-stat-card.closed.is-active {
          border-color: rgba(74, 124, 89, 0.7);
          background: linear-gradient(90deg, rgba(74, 124, 89, 0.12), rgba(74, 124, 89, 0.04));
          --stat-bar: var(--level-ordinary);
        }
        .op-stat-card.active {
          background: linear-gradient(135deg, rgba(196, 40, 40, 0.12), rgba(196, 40, 40, 0.02));
          border-color: rgba(196, 40, 40, 0.4);
        }
        .op-stat-card.standby {
          background: linear-gradient(135deg, rgba(255, 170, 0, 0.1), rgba(255, 170, 0, 0.02));
          border-color: rgba(255, 170, 0, 0.35);
        }
        .op-stat-card.closed {
          background: linear-gradient(135deg, rgba(74, 124, 89, 0.08), rgba(74, 124, 89, 0.02));
          border-color: rgba(74, 124, 89, 0.3);
        }
        .op-stat-icon {
          width: 16px; height: 16px;
          color: currentColor;
          flex-shrink: 0;
          opacity: 0.7;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .op-stat-icon svg { width: 100%; height: 100%; stroke: currentColor; fill: none; stroke-width: 2; }
        .op-stat-card.active .op-stat-icon {
          color: var(--accent-red-bright);
        }
        .op-stat-card.standby .op-stat-icon {
          color: var(--level-hazardous);
        }
        .op-stat-card.closed .op-stat-icon {
          color: var(--level-ordinary);
        }
        .op-stat-info { display: flex; align-items: baseline; gap: 10px; flex: 1; justify-content: flex-end; }
        .op-stat-num {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
        }
        .op-stat-card.active .op-stat-num { color: var(--accent-red-bright); }
        .op-stat-card.standby .op-stat-num { color: var(--level-hazardous); }
        .op-stat-card.closed .op-stat-num { color: var(--level-ordinary); }
        .op-stat-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .op-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .op-card {
          border: 1px solid rgba(122, 58, 176, 0.25);
          background: rgba(15, 12, 22, 0.8);
          transition: all 0.25s ease;
          overflow: hidden;
          position: relative;
        }
        .op-card:hover {
          border-color: rgba(184, 142, 217, 0.55);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(122, 58, 176, 0.12);
        }
        .op-card-level-bar {
          height: 4px;
          width: 100%;
        }
        .op-card-body { padding: 18px 20px; }
        .op-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        .op-card-code {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #b88ed9;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }
        .op-card-name {
          font-family: var(--font-serif);
          font-size: 17px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .op-status-badge {
          padding: 4px 12px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          border: 1px solid;
          white-space: nowrap;
        }
        .op-status-badge.active {
          color: var(--accent-red-bright);
          border-color: rgba(196, 40, 40, 0.5);
          background: rgba(196, 40, 40, 0.08);
        }
        .op-status-badge.standby {
          color: var(--level-hazardous);
          border-color: rgba(255, 170, 0, 0.5);
          background: rgba(255, 170, 0, 0.06);
        }
        .op-status-badge.closed {
          color: var(--text-tertiary);
          border-color: rgba(120, 120, 130, 0.4);
          background: rgba(120, 120, 130, 0.06);
        }
        .op-card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }
        .op-meta-tag {
          padding: 3px 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          background: rgba(122, 58, 176, 0.08);
          border: 1px solid rgba(122, 58, 176, 0.2);
          color: var(--text-secondary);
          letter-spacing: 0.03em;
        }
        .op-meta-tag.level-abyssal {
          color: var(--level-abyssal);
          border-color: rgba(180, 40, 120, 0.4);
          background: rgba(180, 40, 120, 0.08);
        }
        .op-meta-tag.level-doomed {
          color: var(--level-doomsday);
          border-color: rgba(196, 40, 40, 0.4);
          background: rgba(196, 40, 40, 0.06);
        }
        .op-meta-tag.level-hazardous {
          color: var(--level-hazardous);
          border-color: rgba(255, 170, 0, 0.4);
          background: rgba(255, 170, 0, 0.06);
        }
        .op-card-info-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-top: 1px solid rgba(122, 58, 176, 0.1);
          font-size: 12px;
        }
        .op-card-info-label {
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.05em;
        }
        .op-card-info-value { color: var(--text-secondary); }
        .op-card-expand-btn {
          margin-top: 12px;
          padding-top: 10px;
          border-top: 1px solid rgba(122, 58, 176, 0.1);
          display: flex;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: color 0.2s;
        }
        .op-card-expand-btn:hover { color: #b88ed9; }
        .op-card-detail {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }
        .op-card-detail.open { max-height: 500px; }
        .op-card-detail-inner {
          padding: 0 20px 18px;
          border-top: 1px solid rgba(122, 58, 176, 0.12);
          padding-top: 14px;
        }
        .op-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 20px;
          font-size: 12px;
          margin-bottom: 12px;
        }
        .op-detail-field { display: flex; flex-direction: column; gap: 3px; }
        .op-detail-field-label {
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
        }
        .op-detail-field-value { color: var(--text-secondary); }
        .op-detail-notes {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.7;
          padding: 12px 16px;
          background: rgba(122, 58, 176, 0.06);
          border-left: 2px solid #7a3ab0;
        }
        .op-detail-org-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .op-detail-org-chip {
          padding: 2px 10px;
          font-size: 11px;
          background: rgba(122, 58, 176, 0.1);
          border: 1px solid rgba(122, 58, 176, 0.25);
          color: #b88ed9;
        }

        /* ====== Logs Module ====== */
        .log-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        .log-stat-card {
          padding: 16px;
          border: 1px solid;
          text-align: center;
        }
        .log-stat-card.total {
          background: rgba(122, 58, 176, 0.06);
          border-color: rgba(122, 58, 176, 0.3);
        }
        .log-stat-card.info {
          background: rgba(74, 124, 89, 0.05);
          border-color: rgba(74, 124, 89, 0.3);
        }
        .log-stat-card.warn {
          background: rgba(255, 170, 0, 0.05);
          border-color: rgba(255, 170, 0, 0.35);
        }
        .log-stat-card.error {
          background: rgba(196, 40, 40, 0.06);
          border-color: rgba(196, 40, 40, 0.4);
        }
        .log-stat-num {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          line-height: 1;
        }
        .log-stat-card.total .log-stat-num { color: #b88ed9; }
        .log-stat-card.info .log-stat-num { color: var(--level-ordinary); }
        .log-stat-card.warn .log-stat-num { color: var(--level-hazardous); }
        .log-stat-card.error .log-stat-num { color: var(--accent-red-bright); }
        .log-stat-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-top: 6px;
        }

        .log-filter-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          flex-wrap: wrap;
          padding: 12px 16px;
          background: rgba(15, 12, 22, 0.6);
          border: 1px solid rgba(122, 58, 176, 0.2);
          border-bottom: none;
        }
        .log-filter-btn {
          padding: 6px 16px;
          background: rgba(15, 12, 22, 0.8);
          border: 1px solid rgba(122, 58, 176, 0.3);
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.2s;
        }
        .log-filter-btn:hover { border-color: rgba(184, 142, 217, 0.5); color: var(--text-secondary); }
        .log-filter-btn.active {
          border-color: #b88ed9;
          color: #b88ed9;
          background: rgba(122, 58, 176, 0.18);
        }

        .console-window {
          border: 1px solid rgba(122, 58, 176, 0.3);
          background: #050508;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }
        .console-titlebar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: linear-gradient(90deg, rgba(122, 58, 176, 0.15), rgba(122, 58, 176, 0.05));
          border-bottom: 1px solid rgba(122, 58, 176, 0.3);
          font-family: var(--font-mono);
          font-size: 11px;
          color: #7a5a9a;
          letter-spacing: 0.1em;
        }
        .console-dots { display: flex; gap: 6px; margin-right: 8px; }
        .console-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
        }
        .console-dot.red { background: #ff5f56; }
        .console-dot.yellow { background: #ffbd2e; }
        .console-dot.green { background: #27c93f; }
        .console-body {
          padding: 16px 20px;
          max-height: 520px;
          overflow-y: auto;
          font-family: var(--font-mono);
          font-size: 11.5px;
          line-height: 1.8;
        }
        .console-body::-webkit-scrollbar { width: 8px; }
        .console-body::-webkit-scrollbar-track { background: rgba(122, 58, 176, 0.05); }
        .console-body::-webkit-scrollbar-thumb { background: rgba(122, 58, 176, 0.3); border-radius: 4px; }
        .console-body::-webkit-scrollbar-thumb:hover { background: rgba(122, 58, 176, 0.5); }

        .log-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 5px 10px;
          margin-bottom: 2px;
          border-radius: 2px;
          transition: background 0.15s;
        }
        .log-row:hover { background: rgba(122, 58, 176, 0.06); }
        .log-row.info { background: rgba(74, 124, 89, 0.04); }
        .log-row.warn { background: rgba(255, 170, 0, 0.05); }
        .log-row.error { background: rgba(196, 40, 40, 0.07); }
        .log-level-badge {
          flex-shrink: 0;
          width: 52px;
          padding: 2px 0;
          text-align: center;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          font-family: var(--font-mono);
          border-radius: 2px;
          margin-top: 2px;
        }
        .log-level-badge.info {
          background: rgba(74, 124, 89, 0.2);
          color: var(--level-ordinary);
        }
        .log-level-badge.warn {
          background: rgba(255, 170, 0, 0.2);
          color: var(--level-hazardous);
        }
        .log-level-badge.error {
          background: rgba(196, 40, 40, 0.2);
          color: var(--accent-red-bright);
        }
        .log-timestamp {
          flex-shrink: 0;
          color: #5a4870;
          font-size: 11px;
          min-width: 140px;
        }
        .log-module {
          flex-shrink: 0;
          color: #7a5a9a;
          min-width: 110px;
          font-size: 11px;
        }
        .log-message {
          color: #9a8ab0;
          word-break: break-all;
          flex: 1;
        }

        @media (max-width: 1024px) {
          .admin-grid { grid-template-columns: 1fr; }
          .admin-summary-row { grid-template-columns: repeat(2, 1fr); }
          .op-cards-grid { grid-template-columns: 1fr; }
          .log-stats-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 720px) {
          .op-stats-row { flex-wrap: wrap !important; }
          .op-stats-row .op-stat-card { flex: 1 1 100% !important; width: auto; }
        }
        @media (max-width: 640px) {
          .page-title { font-size: 24px; }
          .status-grid { grid-template-columns: 1fr; }
          .admin-summary-row { grid-template-columns: 1fr 1fr; }
          .op-detail-grid { grid-template-columns: 1fr; }
          .log-stats-row { grid-template-columns: 1fr 1fr; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "admin-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-top-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container admin-top-bar-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-badge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-badge-dot"
  }), /*#__PURE__*/React.createElement("span", null, "TOP SECRET \xB7 ADMINISTRATOR CONSOLE \xB7 IMAC CENTRAL")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      color: "var(--text-tertiary)",
      letterSpacing: "0.1em"
    }
  }, "XDPS v4.2 \xB7 BUILD 39.2.7 \xB7 NODE: CENTRAL-01"))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-breadcrumb"
  }, activeModule ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "crumb-link",
    onClick: backToDashboard
  }, "\u7CFB\u7EDF\u7BA1\u7406"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, activeModule === "users" && "用户管理", activeModule === "operations" && "联合行动调度", activeModule === "logs" && "系统日志")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "crumb-link",
    onClick: () => navigate("/portal")
  }, "\u5185\u90E8\u6307\u6325\u4E2D\u5FC3"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, "\u7CFB\u7EDF\u7BA1\u7406"))), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, activeModule === "users" && "用户管理", activeModule === "operations" && "联合行动调度", activeModule === "logs" && "系统日志", !activeModule && "系统管理"), /*#__PURE__*/React.createElement("div", {
    className: "page-title-en"
  }, activeModule === "users" && "USER MANAGEMENT", activeModule === "operations" && "JOINT RESPONSE OPERATIONS", activeModule === "logs" && "SYSTEM LOG CONSOLE", !activeModule && "SYSTEM ADMINISTRATION"), activeModule === "users" && /*#__PURE__*/React.createElement("div", {
    className: "module-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: `user-action-card ${activeUserPanel === "approval" ? "is-open" : ""}`,
    onClick: () => setActiveUserPanel(activeUserPanel === "approval" ? null : "approval")
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-badge"
  }, approvalList.filter(a => a.status === "pending").length), /*#__PURE__*/React.createElement("div", {
    className: "user-action-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 11l3 3L22 4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "user-action-title"
  }, "\u8BA4\u8BC1\u7533\u8BF7\u5BA1\u6279")), /*#__PURE__*/React.createElement("div", {
    className: "user-action-desc"
  }, "\u5F85\u5904\u7406 ", approvalList.filter(a => a.status === "pending").length, " \u6761")), /*#__PURE__*/React.createElement("div", {
    className: `user-action-card ${activeUserPanel === "rank" ? "is-open" : ""}`,
    onClick: () => setActiveUserPanel(activeUserPanel === "rank" ? null : "rank")
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-badge"
  }, rankAdjList.filter(a => !a.status).length), /*#__PURE__*/React.createElement("div", {
    className: "user-action-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "user-action-title"
  }, "\u6743\u9650\u7B49\u7EA7\u8C03\u6574")), /*#__PURE__*/React.createElement("div", {
    className: "user-action-desc"
  }, "\u5F85\u786E\u8BA4 ", rankAdjList.filter(a => !a.status).length, " \u6761")), /*#__PURE__*/React.createElement("div", {
    className: `user-action-card ${activeUserPanel === "online" ? "is-open" : ""}`,
    onClick: () => setActiveUserPanel(activeUserPanel === "online" ? null : "online")
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-badge",
    style: {
      background: "var(--level-ordinary)"
    }
  }, onlineUsers.length), /*#__PURE__*/React.createElement("div", {
    className: "user-action-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-icon",
    style: {
      color: "var(--level-ordinary)",
      background: "rgba(74,124,89,0.12)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.5 21a7.5 7.5 0 0113 0"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "user-action-title"
  }, "\u5728\u7EBF\u7528\u6237\u76D1\u63A7")), /*#__PURE__*/React.createElement("div", {
    className: "user-action-desc"
  }, "\u5F53\u524D\u5728\u7EBF ", onlineUsers.length, " \u4EBA")), /*#__PURE__*/React.createElement("div", {
    className: `user-action-card ${activeUserPanel === "audit" ? "is-open" : ""}`,
    onClick: () => setActiveUserPanel(activeUserPanel === "audit" ? null : "audit")
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-badge",
    style: {
      background: "var(--level-hazardous)"
    }
  }, auditLogs.length), /*#__PURE__*/React.createElement("div", {
    className: "user-action-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-icon",
    style: {
      color: "var(--level-hazardous)",
      background: "rgba(255,170,0,0.12)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8v4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12.01",
    y2: "16"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "user-action-title"
  }, "\u5BA1\u8BA1\u65E5\u5FD7")), /*#__PURE__*/React.createElement("div", {
    className: "user-action-desc"
  }, "\u8FD1\u671F\u64CD\u4F5C ", auditLogs.length, " \u6761"))), activeUserPanel === "approval" && /*#__PURE__*/React.createElement("div", {
    className: "user-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-panel-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "user-panel-title"
  }, "\u8BA4\u8BC1\u7533\u8BF7\u5BA1\u6279 \xB7 \u5171 ", approvalList.length, " \u6761\uFF08\u5F85\u5904\u7406 ", approvalList.filter(a => a.status === "pending").length, "\uFF09"), /*#__PURE__*/React.createElement("button", {
    className: "user-panel-close",
    onClick: () => setActiveUserPanel(null)
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "user-panel-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "approval-list"
  }, approvalList.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    className: "approval-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "approval-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "approval-avatar"
  }, a.code), /*#__PURE__*/React.createElement("div", {
    className: "approval-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "approval-name"
  }, a.name), /*#__PURE__*/React.createElement("span", {
    className: "approval-sub"
  }, a.rank, " \xB7 ", a.org, " \xB7 \u7533\u8BF7\u65F6\u95F4\uFF1A", a.applyTime))), a.status === "pending" ? /*#__PURE__*/React.createElement("div", {
    className: "approval-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-approve",
    onClick: () => handleApprove(a.id)
  }, "\u901A\u8FC7"), /*#__PURE__*/React.createElement("button", {
    className: "btn-reject",
    onClick: () => handleReject(a.id)
  }, "\u9A73\u56DE")) : /*#__PURE__*/React.createElement("span", {
    className: `status-tag ${a.status}`
  }, a.status === "approved" ? "已通过" : "已驳回")))))), activeUserPanel === "rank" && /*#__PURE__*/React.createElement("div", {
    className: "user-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-panel-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "user-panel-title"
  }, "\u6743\u9650\u7B49\u7EA7\u8C03\u6574 \xB7 \u5171 ", rankAdjList.length, " \u6761"), /*#__PURE__*/React.createElement("button", {
    className: "user-panel-close",
    onClick: () => setActiveUserPanel(null)
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "user-panel-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rankadj-list"
  }, rankAdjList.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    className: "rankadj-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rankadj-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rankadj-name"
  }, r.name), r.status ? /*#__PURE__*/React.createElement("span", {
    className: `status-tag ${r.status}`
  }, r.status === "confirmed" ? "已确认" : "已取消") : /*#__PURE__*/React.createElement("span", {
    className: "status-tag pending"
  }, "\u5F85\u786E\u8BA4")), /*#__PURE__*/React.createElement("div", {
    className: "rankadj-flow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rankadj-from"
  }, r.current), /*#__PURE__*/React.createElement("span", {
    className: "rankadj-arrow"
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    className: "rankadj-to"
  }, r.target)), /*#__PURE__*/React.createElement("div", {
    className: "rankadj-reason"
  }, "\u8C03\u6574\u539F\u56E0\uFF1A", r.reason), /*#__PURE__*/React.createElement("div", {
    className: "rankadj-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rankadj-applicant"
  }, "\u7533\u8BF7\u4EBA\uFF1A", r.applicant, " \xB7 ", r.time), !r.status && /*#__PURE__*/React.createElement("div", {
    className: "approval-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-confirm",
    onClick: () => handleConfirmRank(r.id)
  }, "\u786E\u8BA4"), /*#__PURE__*/React.createElement("button", {
    className: "btn-cancel",
    onClick: () => handleCancelRank(r.id)
  }, "\u53D6\u6D88")))))))), activeUserPanel === "online" && /*#__PURE__*/React.createElement("div", {
    className: "user-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-panel-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "user-panel-title"
  }, "\u5728\u7EBF\u7528\u6237\u76D1\u63A7 \xB7 \u5F53\u524D ", onlineUsers.length, " \u4EBA"), /*#__PURE__*/React.createElement("button", {
    className: "user-panel-close",
    onClick: () => setActiveUserPanel(null)
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "user-panel-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "online-list"
  }, onlineUsers.map((u, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "online-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "online-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "online-dot"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "online-name"
  }, u.name), /*#__PURE__*/React.createElement("div", {
    className: "online-org"
  }, u.org))), /*#__PURE__*/React.createElement("div", {
    className: "online-right"
  }, /*#__PURE__*/React.createElement("div", null, "\u767B\u5F55 ", u.loginTime), /*#__PURE__*/React.createElement("div", null, "IP ", u.ip))))))), activeUserPanel === "audit" && /*#__PURE__*/React.createElement("div", {
    className: "user-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-panel-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "user-panel-title"
  }, "\u64CD\u4F5C\u5BA1\u8BA1\u65E5\u5FD7 \xB7 \u8FD1\u671F ", auditLogs.length, " \u6761"), /*#__PURE__*/React.createElement("button", {
    className: "user-panel-close",
    onClick: () => setActiveUserPanel(null)
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "user-panel-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "audit-list"
  }, auditLogs.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "audit-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "audit-time"
  }, l.time), /*#__PURE__*/React.createElement("div", {
    className: "audit-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "audit-user"
  }, l.user), /*#__PURE__*/React.createElement("span", {
    className: "audit-action"
  }, l.action)), /*#__PURE__*/React.createElement("span", {
    className: "audit-module"
  }, l.module)))))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-toolbar"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "user-search",
    placeholder: "\u641C\u7D22 \u59D3\u540D / \u4EE3\u53F7 / \u7F16\u53F7 / \u90E8\u95E8...",
    value: userSearch,
    onChange: e => setUserSearch(e.target.value)
  }), /*#__PURE__*/React.createElement("select", {
    className: "user-filter",
    value: userOrgFilter,
    onChange: e => setUserOrgFilter(e.target.value)
  }, orgs.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o === "全部" ? "all" : o
  }, o))), /*#__PURE__*/React.createElement("select", {
    className: "user-filter",
    value: userRankFilter,
    onChange: e => setRankFilter(e.target.value)
  }, ranks.map(r => /*#__PURE__*/React.createElement("option", {
    key: r,
    value: r === "全部" ? "all" : r
  }, r))), /*#__PURE__*/React.createElement("select", {
    className: "user-filter",
    value: userStatusFilter,
    onChange: e => setUserStatusFilter(e.target.value)
  }, statuses.map(s => /*#__PURE__*/React.createElement("option", {
    key: s,
    value: s === "全部" ? "all" : s
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "user-count-badge"
  }, "\u5171 ", filteredUsers.length, " \u6761\u8BB0\u5F55 \xB7 \u603B\u8BA1 ", users.length, " \u4EBA\u5728\u518C"), /*#__PURE__*/React.createElement("table", {
    className: "user-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u59D3\u540D / \u90E8\u95E8"), /*#__PURE__*/React.createElement("th", null, "IMAC\u7F16\u53F7"), /*#__PURE__*/React.createElement("th", null, "\u804C\u7EA7"), /*#__PURE__*/React.createElement("th", null, "\u6240\u5C5E\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("th", null, "\u72B6\u6001"), /*#__PURE__*/React.createElement("th", null, "\u6743\u9650"))), /*#__PURE__*/React.createElement("tbody", null, filteredUsers.map((u, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    onClick: () => setSelectedUser(u)
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "user-table-name"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-avatar"
  }, u.code), /*#__PURE__*/React.createElement("div", {
    className: "user-name-cell"
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, u.name), /*#__PURE__*/React.createElement("span", {
    className: "dept"
  }, u.department)))), /*#__PURE__*/React.createElement("td", {
    className: "user-id"
  }, u.id), /*#__PURE__*/React.createElement("td", null, u.rank), /*#__PURE__*/React.createElement("td", null, u.org), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "user-status-dot",
    style: {
      backgroundColor: getUserStatusColor(u.status)
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: getUserStatusColor(u.status)
    }
  }, u.status)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `access-badge ${accessClass(u.access)}`
  }, u.access)))))))), /*#__PURE__*/React.createElement("button", {
    className: "back-btn",
    style: {
      marginTop: "20px"
    },
    onClick: backToDashboard
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5 M12 19l-7-7 7-7"
  })), "\u8FD4\u56DE\u7BA1\u7406\u9762\u677F")), activeModule === "operations" && /*#__PURE__*/React.createElement("div", {
    className: "module-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-stats-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: `op-stat-card active ${opStatusFilter === "active" ? "is-active" : ""}`,
    onClick: () => setOpStatusFilter(opStatusFilter === "active" ? "all" : "active")
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-stat-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "op-stat-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-stat-label"
  }, "\u8FDB\u884C\u4E2D"), /*#__PURE__*/React.createElement("div", {
    className: "op-stat-num"
  }, opStats.active))), /*#__PURE__*/React.createElement("div", {
    className: `op-stat-card standby ${opStatusFilter === "standby" ? "is-active" : ""}`,
    onClick: () => setOpStatusFilter(opStatusFilter === "standby" ? "all" : "standby")
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-stat-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "op-stat-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-stat-label"
  }, "\u5F85\u547D"), /*#__PURE__*/React.createElement("div", {
    className: "op-stat-num"
  }, opStats.standby))), /*#__PURE__*/React.createElement("div", {
    className: `op-stat-card closed ${opStatusFilter === "closed" ? "is-active" : ""}`,
    onClick: () => setOpStatusFilter(opStatusFilter === "closed" ? "all" : "closed")
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-stat-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 11.08V12a10 10 0 11-5.93-9.14"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "22 4 12 14.01 9 11.01"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "op-stat-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-stat-label"
  }, "\u5DF2\u7ED3\u675F"), /*#__PURE__*/React.createElement("div", {
    className: "op-stat-num"
  }, opStats.closed)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "16px",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      color: "var(--text-tertiary)",
      letterSpacing: "0.08em"
    }
  }, opStatusFilter === "all" ? "显示全部行动 · 共 " + operations.length + " 条" : opStatusFilter === "active" ? "筛选：进行中 · " + opStats.active + " 条（再次点击取消筛选）" : opStatusFilter === "standby" ? "筛选：待命 · " + opStats.standby + " 条（再次点击取消筛选）" : "筛选：已结束 · " + opStats.closed + " 条（再次点击取消筛选）"), /*#__PURE__*/React.createElement("div", {
    className: "op-cards-grid"
  }, operations.filter(op => {
    if (opStatusFilter === "all") return true;
    if (opStatusFilter === "active") return op.status === "进行中";
    if (opStatusFilter === "standby") return op.status === "待命";
    if (opStatusFilter === "closed") return op.status === "已结束";
    return true;
  }).map((op, i) => {
    const statusKey = op.status === "进行中" ? "active" : op.status === "待命" ? "standby" : "closed";
    const isOpen = expandedOp === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "op-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "op-card-level-bar",
      style: {
        background: op.level === "深渊级" ? "var(--level-abyssal)" : op.level === "厄运级" ? "var(--level-doomsday)" : "var(--level-hazardous)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "op-card-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "op-card-top"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "op-card-code"
    }, op.code, " \xB7 ", op.org), /*#__PURE__*/React.createElement("div", {
      className: "op-card-name"
    }, op.name)), /*#__PURE__*/React.createElement("span", {
      className: `op-status-badge ${statusKey}`
    }, op.status)), /*#__PURE__*/React.createElement("div", {
      className: "op-card-meta"
    }, /*#__PURE__*/React.createElement("span", {
      className: `op-meta-tag level-${op.levelClass}`
    }, op.level), /*#__PURE__*/React.createElement("span", {
      className: "op-meta-tag"
    }, op.response), /*#__PURE__*/React.createElement("span", {
      className: "op-meta-tag"
    }, op.phase)), /*#__PURE__*/React.createElement("div", {
      className: "op-card-info-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-card-info-label"
    }, "\u884C\u52A8\u6307\u6325"), /*#__PURE__*/React.createElement("span", {
      className: "op-card-info-value"
    }, op.commander)), /*#__PURE__*/React.createElement("div", {
      className: "op-card-info-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-card-info-label"
    }, "\u53C2\u4E0E\u4EBA\u5458"), /*#__PURE__*/React.createElement("span", {
      className: "op-card-info-value"
    }, op.personnel, " \u4EBA")), /*#__PURE__*/React.createElement("div", {
      className: "op-card-info-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-card-info-label"
    }, "\u6700\u540E\u901A\u8BAF"), /*#__PURE__*/React.createElement("span", {
      className: "op-card-info-value"
    }, op.lastContact)), /*#__PURE__*/React.createElement("div", {
      className: "op-card-expand-btn",
      onClick: () => setExpandedOp(isOpen ? null : i)
    }, isOpen ? "收起详情 ▲" : "展开详情 ▼")), /*#__PURE__*/React.createElement("div", {
      className: `op-card-detail ${isOpen ? "open" : ""}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "op-card-detail-inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "op-detail-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u54CD\u5E94\u7EA7\u522B"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.response)), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u5F53\u524D\u9636\u6BB5"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.phase)), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u7EC4\u7EC7\u5F62\u5F0F"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.org)), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u4EBA\u5458\u6570\u91CF"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.personnel, " \u4EBA")), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u884C\u52A8\u6307\u6325"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.commander)), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u5F00\u59CB\u65F6\u95F4"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.start)), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u6700\u540E\u901A\u8BAF"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.lastContact)), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u5F53\u524D\u4F4D\u7F6E"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.sector))), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field",
      style: {
        marginBottom: "10px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label",
      style: {
        marginBottom: "6px"
      }
    }, "\u53C2\u4E0E\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-org-list"
    }, op.orgs.map((o, j) => /*#__PURE__*/React.createElement("span", {
      key: j,
      className: "op-detail-org-chip"
    }, o)))), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-notes"
    }, op.notes))));
  })), /*#__PURE__*/React.createElement("button", {
    className: "back-btn",
    style: {
      marginTop: "24px"
    },
    onClick: backToDashboard
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5 M12 19l-7-7 7-7"
  })), "\u8FD4\u56DE\u7BA1\u7406\u9762\u677F")), activeModule === "logs" && /*#__PURE__*/React.createElement("div", {
    className: "module-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "log-stats-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "log-stat-card total"
  }, /*#__PURE__*/React.createElement("div", {
    className: "log-stat-num"
  }, logStats.total), /*#__PURE__*/React.createElement("div", {
    className: "log-stat-label"
  }, "\u603B\u6761\u6570 TOTAL")), /*#__PURE__*/React.createElement("div", {
    className: "log-stat-card info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "log-stat-num"
  }, logStats.info), /*#__PURE__*/React.createElement("div", {
    className: "log-stat-label"
  }, "INFO")), /*#__PURE__*/React.createElement("div", {
    className: "log-stat-card warn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "log-stat-num"
  }, logStats.warn), /*#__PURE__*/React.createElement("div", {
    className: "log-stat-label"
  }, "WARN")), /*#__PURE__*/React.createElement("div", {
    className: "log-stat-card error"
  }, /*#__PURE__*/React.createElement("div", {
    className: "log-stat-num"
  }, logStats.error), /*#__PURE__*/React.createElement("div", {
    className: "log-stat-label"
  }, "ERROR"))), /*#__PURE__*/React.createElement("div", {
    className: "console-window"
  }, /*#__PURE__*/React.createElement("div", {
    className: "console-titlebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "console-dots"
  }, /*#__PURE__*/React.createElement("span", {
    className: "console-dot red"
  }), /*#__PURE__*/React.createElement("span", {
    className: "console-dot yellow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "console-dot green"
  })), /*#__PURE__*/React.createElement("span", null, "SYSTEM LOG CONSOLE \xB7 CENTRAL-01 \xB7 \u5B9E\u65F6\u6D41")), /*#__PURE__*/React.createElement("div", {
    className: "log-filter-bar"
  }, /*#__PURE__*/React.createElement("button", {
    className: `log-filter-btn ${logFilter === "all" ? "active" : ""}`,
    onClick: () => setLogFilter("all")
  }, "\u5168\u90E8 ALL"), /*#__PURE__*/React.createElement("button", {
    className: `log-filter-btn ${logFilter === "info" ? "active" : ""}`,
    onClick: () => setLogFilter("info")
  }, "INFO"), /*#__PURE__*/React.createElement("button", {
    className: `log-filter-btn ${logFilter === "warn" ? "active" : ""}`,
    onClick: () => setLogFilter("warn")
  }, "WARN"), /*#__PURE__*/React.createElement("button", {
    className: `log-filter-btn ${logFilter === "error" ? "active" : ""}`,
    onClick: () => setLogFilter("error")
  }, "ERROR")), /*#__PURE__*/React.createElement("div", {
    className: "console-body"
  }, filteredLogs.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `log-row ${l.level.toLowerCase()}`
  }, /*#__PURE__*/React.createElement("span", {
    className: `log-level-badge ${l.level.toLowerCase()}`
  }, l.level), /*#__PURE__*/React.createElement("span", {
    className: "log-timestamp"
  }, l.date, " ", l.time), /*#__PURE__*/React.createElement("span", {
    className: "log-module"
  }, "[", l.module, "]"), /*#__PURE__*/React.createElement("span", {
    className: "log-message"
  }, l.msg))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "8px",
      color: "#5a4870",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      padding: "5px 10px"
    }
  }, "-- end of log buffer -- ", filteredLogs.length, " entries shown --"))), /*#__PURE__*/React.createElement("button", {
    className: "back-btn",
    style: {
      marginTop: "24px"
    },
    onClick: backToDashboard
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5 M12 19l-7-7 7-7"
  })), "\u8FD4\u56DE\u7BA1\u7406\u9762\u677F")), !activeModule && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "admin-summary-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-num"
  }, "1,247"), /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-label"
  }, "\u5728\u518C\u6EAF\u754C\u8005")), /*#__PURE__*/React.createElement("div", {
    className: "admin-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-num"
  }, "342"), /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-label"
  }, "\u5F53\u524D\u5728\u7EBF")), /*#__PURE__*/React.createElement("div", {
    className: "admin-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-num"
  }, "12,012"), /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-label"
  }, "\u5F02\u5E38\u603B\u6570")), /*#__PURE__*/React.createElement("div", {
    className: "admin-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-num"
  }, "143"), /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-label"
  }, "\u6D3B\u8DC3\u672A\u89E3\u51B3"))), /*#__PURE__*/React.createElement("div", {
    className: "admin-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title"
  }, "\u7CFB\u7EDF\u72B6\u6001\u6982\u89C8"), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title-en"
  }, "SYSTEM STATUS"))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "status-grid"
  }, systemStatus.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "status-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "status-item-name"
  }, s.name), /*#__PURE__*/React.createElement("div", {
    className: "status-item-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "status-item-ping"
  }, s.ping), /*#__PURE__*/React.createElement("div", {
    className: "status-dot",
    style: {
      backgroundColor: getStatusColor(s.status)
    },
    title: getStatusLabel(s.status)
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card clickable",
    onClick: () => goToModule("users")
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title"
  }, "\u7528\u6237\u7BA1\u7406"), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title-en"
  }, "USER MANAGEMENT")), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-action"
  }, "\u8FDB\u5165 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "admin-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: "12px",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px",
      background: "rgba(122, 58, 176, 0.05)",
      border: "1px solid rgba(122, 58, 176, 0.15)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "22px",
      fontWeight: 700,
      color: "#b88ed9"
    }
  }, "1,247"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "11px",
      color: "var(--text-tertiary)",
      marginTop: "4px"
    }
  }, "\u5728\u518C\u6EAF\u754C\u8005")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px",
      background: "rgba(74, 124, 89, 0.05)",
      border: "1px solid rgba(74, 124, 89, 0.2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "22px",
      fontWeight: 700,
      color: "var(--level-ordinary)"
    }
  }, "342"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "11px",
      color: "var(--text-tertiary)",
      marginTop: "4px"
    }
  }, "\u5F53\u524D\u5728\u7EBF"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, ["认证申请审批", "权限等级调整", "组织隶属变更", "资格吊销处理"].map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "10px 14px",
      border: "1px solid rgba(122, 58, 176, 0.15)",
      fontSize: "13px",
      color: "var(--text-secondary)"
    }
  }, a, " \u2192"))))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title"
  }, "\u5F02\u5E38\u6570\u636E\u5E93\u7EDF\u8BA1"), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title-en"
  }, "DATABASE STATS"))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card-body"
  }, /*#__PURE__*/React.createElement("table", {
    className: "db-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u7C7B\u522B"), /*#__PURE__*/React.createElement("th", null, "\u603B\u6570"), /*#__PURE__*/React.createElement("th", null, "\u672A\u89E3\u51B3"), /*#__PURE__*/React.createElement("th", null, "\u672C\u5468\u65B0\u589E"))), /*#__PURE__*/React.createElement("tbody", null, dbStats.map((s, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "db-code"
  }, s.code), " \xB7 ", s.name), /*#__PURE__*/React.createElement("td", {
    className: "db-num"
  }, s.count.toLocaleString()), /*#__PURE__*/React.createElement("td", {
    className: "db-num"
  }, s.unsolved), /*#__PURE__*/React.createElement("td", {
    className: "db-new"
  }, "+", s.newThisWeek))))))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card clickable",
    onClick: () => goToModule("operations")
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title"
  }, "\u8054\u5408\u884C\u52A8\u8C03\u5EA6"), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title-en"
  }, "JRP OPERATIONS")), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-action"
  }, "\u8C03\u5EA6 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "admin-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-list"
  }, operations.slice(0, 3).map((o, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "op-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-main"
  }, /*#__PURE__*/React.createElement("span", {
    className: "op-code"
  }, o.code), /*#__PURE__*/React.createElement("span", {
    className: "op-name"
  }, o.name), /*#__PURE__*/React.createElement("span", {
    className: "op-org"
  }, o.org, " \xB7 ", o.level)), /*#__PURE__*/React.createElement("span", {
    className: "op-status"
  }, o.response)))))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card clickable",
    style: {
      gridColumn: "1 / -1"
    },
    onClick: () => goToModule("logs")
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title"
  }, "\u7CFB\u7EDF\u65E5\u5FD7"), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title-en"
  }, "SYSTEM LOG")), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-action"
  }, "\u67E5\u770B\u5168\u90E8 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "admin-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "log-list"
  }, logs.slice(0, 6).map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "log-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "log-time"
  }, l.time), /*#__PURE__*/React.createElement("span", {
    className: `log-level ${l.level.toLowerCase()}`
  }, "[", l.level, "]"), /*#__PURE__*/React.createElement("span", {
    className: "log-msg"
  }, l.msg))))))), /*#__PURE__*/React.createElement("button", {
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
  })), "\u8FD4\u56DE\u6307\u6325\u4E2D\u5FC3")), selectedUser && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => e.target === e.currentTarget && setSelectedUser(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "modal-title"
  }, "\u7528\u6237\u6863\u6848 \xB7 ", selectedUser.name), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: () => setSelectedUser(null)
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      marginBottom: "20px",
      paddingBottom: "16px",
      borderBottom: "1px solid rgba(122, 58, 176, 0.2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      border: "2px solid #7a3ab0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-serif)",
      fontSize: "28px",
      fontWeight: "700",
      color: "#b88ed9",
      background: "radial-gradient(circle, rgba(122, 58, 176, 0.2), transparent)"
    }
  }, selectedUser.code), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "22px",
      fontWeight: "700",
      color: "var(--text-primary)"
    }
  }, selectedUser.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      color: "#7a3ab0",
      marginTop: "4px",
      letterSpacing: "0.1em"
    }
  }, selectedUser.id), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "10px",
      display: "flex",
      gap: "8px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `access-badge ${accessClass(selectedUser.access)}`
  }, selectedUser.access), /*#__PURE__*/React.createElement("span", {
    style: {
      color: getUserStatusColor(selectedUser.status),
      fontSize: "12px"
    }
  }, "\u25CF ", selectedUser.status)))), /*#__PURE__*/React.createElement("div", {
    className: "detail-section-title"
  }, "\u57FA\u672C\u4FE1\u606F"), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u59D3\u540D"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.name)), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u4EE3\u53F7"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.code)), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u804C\u7EA7"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.rank)), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u6240\u5C5E\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.org)), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u90E8\u95E8"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.department)), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u5F53\u524D\u72B6\u6001"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value",
    style: {
      color: getUserStatusColor(selectedUser.status)
    }
  }, "\u25CF ", selectedUser.status)), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u6743\u9650\u7B49\u7EA7"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, /*#__PURE__*/React.createElement("span", {
    className: `access-badge ${accessClass(selectedUser.access)}`
  }, selectedUser.access))), /*#__PURE__*/React.createElement("div", {
    className: "detail-section-title"
  }, "\u884C\u52A8\u8BB0\u5F55"), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u53C2\u4E0E\u884C\u52A8"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.ops, " \u6B21")), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u7D2F\u8BA1\u65F6\u957F"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.hours, " \u5C0F\u65F6")), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u6700\u8FD1\u884C\u52A8"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.lastOp)), selectedUser.note && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "detail-section-title"
  }, "\u5907\u6CE8"), /*#__PURE__*/React.createElement("div", {
    className: "detail-note"
  }, selectedUser.note))))))));
}
window.AdminPage = AdminPage;;
function JoinPage() {
  const {
    navigate
  } = useRouter();
  const [formData, setFormData] = React.useState({
    realName: "",
    codename: "",
    channel: "",
    organization: "",
    country: "",
    region: "",
    city: "",
    age: "",
    contact: "",
    specialty: "",
    experience: "",
    anomalyExp: "",
    motivation: "",
    healthDeclare: false,
    nda: false
  });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(null); // 'nda' | 'safety' | null

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const channels = [{
    key: "military",
    name: "军队系统",
    en: "ATRF",
    full: "异常战术响应部队",
    ratio: "约 45%",
    desc: "来自各国军方特种部队及异常战术响应单位，具备强韧的战术素养与纪律性，是外勤行动的骨干力量。",
    icon: "M12 2 3 6v6c0 5 3.8 9.3 9 10 5.2-.7 9-5 9-10V6l-9-4z"
  }, {
    key: "police",
    name: "警务系统",
    en: "AERT",
    full: "异常事件响应小组",
    ratio: "约 30%",
    desc: "来自警察系统的异常事件响应与刑侦人员，擅长现场勘查、证据链还原与公众秩序维持。",
    icon: "M12 1 L22 7v5c0 5-4.5 9-10 10-5.5-1-10-5-10-10V7z M8 12l3 3 5-6"
  }, {
    key: "civil",
    name: "社会招募与幸存者计划",
    en: "CIVIL / SURVIVOR",
    full: "",
    ratio: "约 25%",
    desc: "经严格筛选的社会专业人士及异常事件幸存者，以独特的专业背景或亲身经历构成队伍的多元补充。",
    icon: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2 M11 7a4 4 0 110 8 4 4 0 010-8z M20 8v6 M23 11h-6"
  }];
  const criteria = [{
    name: "压力耐受性",
    desc: "在极端环境、时间停滞、空间扭曲等异常条件下保持冷静判断的能力。"
  }, {
    name: "逻辑推演能力",
    desc: "快速识别异常规则、推导安全行动路径、在信息不全时做出合理假设。"
  }, {
    name: "身份弹性",
    desc: "在规则改变的环境中维持自我认同，抵抗认知同化与人格侵蚀。"
  }, {
    name: "细节敏感度",
    desc: "察觉环境中的细微异常信号——光影、声音、温度、文字、空间感的偏移。"
  }, {
    name: "共情节制",
    desc: "对异常中遭遇的生命保持共情，但不因情感干扰任务判断与撤退决策。"
  }];
  const ranks = [{
    name: "见习溯界者",
    en: "Initiate",
    ratio: "约 35%",
    desc: "通过选拔与基础培训，在资深者带领下执行低风险任务。",
    promote: "完成基础培训 + 首次外勤评估"
  }, {
    name: "溯界者",
    en: "Walker",
    ratio: "约 40%",
    desc: "独立执行常规至危险级任务，是队伍的中坚力量。",
    promote: "累计外勤 100 小时 + 任务评估合格"
  }, {
    name: "资深溯界者",
    en: "Senior Walker",
    ratio: "约 18%",
    desc: "可带队执行厄运级任务，具备规则推演与应急决策能力。",
    promote: "累计外勤 500 小时 + 3 次以上任务负责人经历"
  }, {
    name: "首席溯界者",
    en: "Chief Walker",
    ratio: "不足 5%",
    desc: "各组织核心战力，可独立指挥深渊级行动，拥有战术决策权。",
    promote: "由组织提名 + IMAC 联合评审委员会认定"
  }, {
    name: "界标",
    en: "Landmark",
    ratio: "全球不足 30 人",
    desc: "传奇级溯界者，以个人名字命名的行动记录载入 IMAC 档案。",
    promote: "特殊贡献 + 全理事会表决"
  }];
  const assimilationStages = [{
    stage: "第一阶段 · 接触",
    desc: "轻度认知偏移，出现轻微既视感或记忆错位，可自行恢复。"
  }, {
    stage: "第二阶段 · 渗透",
    desc: "性格习惯出现细微改变，对异常环境产生熟悉感，需医疗干预。"
  }, {
    stage: "第三阶段 · 侵蚀",
    desc: "身份认同开始模糊，出现人格碎片，永久终止外勤资格。"
  }, {
    stage: "第四阶段 · 同化",
    desc: "个体被异常完全吞噬，成为异常的一部分，按规程执行除名。"
  }];
  const organizations = ["衔尾蛇事务所", "北境守望", "边界研究院 BRI", "晨星团", "第四面墙", "悬铃木学会", "白夜哨站", "长桥会社"];
  const channelOptions = ["军队系统（ATRF）", "警务系统（AERT）", "社会招募", "幸存者计划"];

  // 国家 → 地区 → 城市 三级联动数据
  const locationData = {
    "格伦贝尔联邦": {
      "东部": ["鸣海城", "灰港", "贝壳湾", "听潮镇", "浅溪驿"],
      "北部": ["白松城", "寒鸦岭", "冰湖堡", "雪落屯"],
      "中部": ["晨辉市", "三河驿", "望月台", "白石镇"],
      "南部": ["梧桐岭", "青麦镇", "长柳渡", "南桥市", "红叶镇"],
      "西部": ["风古镇", "暮光市", "石鼓城"]
    },
    "洛林自由市": {
      "城邦": ["洛林自由市"]
    },
    "维斯特兰联邦": {
      "中部": ["新阿尔比恩市", "蓝草市"],
      "南部": ["百川市", "星环镇"],
      "西部": ["白崖港", "镜湖城"],
      "东部": ["枫溪镇", "深河渡"],
      "北部": ["雪松市"]
    },
    "东云群岛": {
      "中部": ["月湾", "白鹭镇"],
      "北部": ["雾港", "翠屏市"],
      "南部": ["花屿", "碧波城"],
      "东部": ["金鳞港", "云岫市"],
      "西部": ["青屿", "霞光港"]
    },
    "瀚海合众国": {
      "南部": ["诺瓦城", "晨港市"],
      "东部": ["海月城", "珊瑚港", "星屿"],
      "西部": ["蓝桥城", "风信屿"],
      "北部": ["苍木市", "邬桥镇"]
    },
    "霜原联盟": {
      "北部": ["极光城", "寒星哨所"],
      "南部": ["冰崖站", "雪绒镇"],
      "西部": ["泠海角", "冰河营地"]
    },
    "其他地区": {
      "其他": ["其他"]
    }
  };
  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
    if (errors[key]) setErrors({
      ...errors,
      [key]: ""
    });
  };

  // 地区联动：切换国家时重置地区与城市，切换地区时重置城市；
  // 洛林自由市为城邦型政体，选中后自动确定地区（城邦）与城市（洛林自由市）
  const handleCountryChange = value => {
    if (value === "洛林自由市") {
      setFormData({
        ...formData,
        country: value,
        region: "城邦",
        city: "洛林自由市"
      });
    } else {
      setFormData({
        ...formData,
        country: value,
        region: "",
        city: ""
      });
    }
    setErrors(prev => ({
      ...prev,
      country: "",
      region: "",
      city: ""
    }));
  };
  const handleRegionChange = value => {
    setFormData({
      ...formData,
      region: value,
      city: ""
    });
    setErrors(prev => ({
      ...prev,
      region: "",
      city: ""
    }));
  };
  const validate = () => {
    const e = {};
    if (!formData.realName.trim()) e.realName = "请输入真实姓名";
    if (!formData.channel) e.channel = "请选择申请来源通道";
    if (!formData.organization) e.organization = "请选择意向组织";
    if (!formData.country) e.country = "请选择国家/联邦";
    if (!formData.region) e.region = "请选择地区";
    if (!formData.city) e.city = "请选择城市";
    if (!formData.age.trim()) e.age = "请输入年龄";else if (isNaN(Number(formData.age)) || Number(formData.age) < 18 || Number(formData.age) > 55) e.age = "年龄应在 18-55 岁之间";
    if (!formData.contact.trim()) e.contact = "请输入联系方式";
    if (!formData.specialty.trim()) e.specialty = "请填写专业背景";
    if (!formData.experience.trim()) e.experience = "请填写相关经历简述";
    if (!formData.motivation.trim()) e.motivation = "请填写申请理由";
    if (!formData.healthDeclare) e.healthDeclare = "请确认健康声明";
    if (!formData.nda) e.nda = "请阅读并同意保密协议";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = ev => {
    ev.preventDefault();
    if (validate()) {
      setSubmitted(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };
  const inputCls = k => `join-input ${errors[k] ? "error" : ""}`;
  return /*#__PURE__*/React.createElement("div", {
    className: "join-page"
  }, /*#__PURE__*/React.createElement("style", null, `
        .join-page {
          min-height: 100vh;
          padding-top: 64px;
          padding-bottom: 80px;
          background-color: #07070a;
          color: var(--text-primary);
          position: relative;
        }
        .join-page::before {
          content: "";
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px;
          background-color: var(--accent-red-bright);
          box-shadow: 0 0 8px rgba(196, 40, 40, 0.5);
          z-index: 1000;
        }
        .join-watermark {
          position: fixed;
          top: 50%; right: -60px;
          transform: translateY(-50%) rotate(90deg);
          font-family: var(--font-mono);
          font-size: 160px;
          font-weight: 900;
          color: rgba(196, 40, 40, 0.03);
          letter-spacing: 0.05em;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .join-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* HERO */
        .join-hero {
          padding: 80px 0 60px;
          text-align: center;
          position: relative;
        }
        .join-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--accent-red-bright);
          margin-bottom: 20px;
        }
        .join-hero-tag::before, .join-hero-tag::after {
          content: ""; width: 28px; height: 1px;
          background-color: var(--accent-red-bright); opacity: 0.5;
        }
        .join-hero-title {
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0.08em;
          margin: 0 0 16px;
          background: linear-gradient(180deg, #fff 0%, #c8c8cc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .join-hero-sub {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.8;
          max-width: 680px;
          margin: 0 auto 40px;
        }
        .join-quote {
          max-width: 620px;
          margin: 0 auto;
          padding: 24px 32px;
          border-left: 3px solid var(--accent-red-bright);
          background: linear-gradient(90deg, rgba(196, 40, 40, 0.08), transparent);
          text-align: left;
        }
        .join-quote-text {
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-secondary);
          font-style: italic;
          margin-bottom: 10px;
        }
        .join-quote-author {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }

        /* 通用 section */
        .join-section {
          padding: 60px 0;
          border-top: 1px solid var(--border-color);
        }
        .join-section-header {
          margin-bottom: 36px;
        }
        .join-section-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--accent-red-bright);
          margin-bottom: 8px;
        }
        .join-section-title {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin: 0 0 8px;
        }
        .join-section-desc {
          font-size: 13px;
          color: var(--text-tertiary);
          line-height: 1.7;
          max-width: 640px;
        }

        /* 通道卡片 */
        .channel-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .channel-card {
          padding: 28px 24px;
          background-color: rgba(12, 12, 16, 0.85);
          border: 1px solid var(--border-color);
          position: relative;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .channel-card:hover {
          border-color: rgba(196, 40, 40, 0.4);
          transform: translateY(-2px);
        }
        .channel-card::before {
          content: "";
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background-color: var(--accent-red-bright);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .channel-card:hover::before { opacity: 1; }
        .channel-icon {
          width: 44px; height: 44px;
          margin-bottom: 16px;
          color: var(--accent-red-bright);
        }
        .channel-icon svg { width: 100%; height: 100%; }
        .channel-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .channel-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 12px;
        }
        .channel-ratio {
          display: inline-block;
          padding: 3px 10px;
          background-color: rgba(196, 40, 40, 0.1);
          border: 1px solid rgba(196, 40, 40, 0.3);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 11px;
          margin-bottom: 14px;
        }
        .channel-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        /* 选拔标准 */
        .criteria-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .criteria-item {
          display: flex;
          gap: 14px;
          padding: 20px;
          background-color: rgba(12, 12, 16, 0.6);
          border: 1px solid var(--border-color);
        }
        .criteria-num {
          flex-shrink: 0;
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          background-color: var(--accent-red-bright);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
        }
        .criteria-content h4 {
          margin: 0 0 6px;
          font-size: 15px;
          font-weight: 600;
        }
        .criteria-content p {
          margin: 0;
          font-size: 12px;
          color: var(--text-tertiary);
          line-height: 1.6;
        }

        /* 培训体系 */
        .training-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 24px;
        }
        .training-info, .training-framework {
          padding: 28px;
          background-color: rgba(12, 12, 16, 0.6);
          border: 1px solid var(--border-color);
        }
        .training-framework {
          border-left: 3px solid var(--accent-red-bright);
        }
        .training-highlight {
          font-size: 36px;
          font-weight: 700;
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          margin-bottom: 4px;
        }
        .training-highlight-label {
          font-size: 12px;
          color: var(--text-tertiary);
          margin-bottom: 20px;
        }
        .training-modules {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .training-modules li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--text-secondary);
        }
        .training-modules li::before {
          content: "";
          width: 6px; height: 6px;
          background-color: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .training-framework h4 {
          font-size: 15px;
          margin: 0 0 12px;
          color: var(--text-primary);
        }
        .training-framework p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0 0 16px;
        }
        .training-framework-tag {
          display: inline-block;
          padding: 4px 10px;
          background-color: rgba(196, 40, 40, 0.1);
          border: 1px solid rgba(196, 40, 40, 0.3);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.15em;
        }

        /* 职级体系 */
        .rank-ladder {
          position: relative;
          padding-left: 40px;
        }
        .rank-ladder::before {
          content: "";
          position: absolute;
          left: 14px; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, var(--accent-red-bright) 0%, rgba(196, 40, 40, 0.2) 100%);
        }
        .rank-item {
          position: relative;
          padding: 20px 24px;
          margin-bottom: 12px;
          background-color: rgba(12, 12, 16, 0.6);
          border: 1px solid var(--border-color);
        }
        .rank-item::before {
          content: "";
          position: absolute;
          left: -33px; top: 26px;
          width: 12px; height: 12px;
          border-radius: 50%;
          background-color: #07070a;
          border: 2px solid var(--accent-red-bright);
        }
        .rank-item:last-child { margin-bottom: 0; }
        .rank-top {
          display: flex;
          align-items: baseline;
          gap: 14px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }
        .rank-name {
          font-size: 17px;
          font-weight: 600;
        }
        .rank-en {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .rank-ratio {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
        }
        .rank-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 8px;
        }
        .rank-promote {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .rank-promote strong { color: var(--text-secondary); font-weight: 500; }

        /* 同化警示 */
        .warning-box {
          padding: 32px;
          background-color: rgba(196, 40, 40, 0.05);
          border: 1px solid rgba(196, 40, 40, 0.3);
          position: relative;
        }
        .warning-box::before {
          content: "WARNING";
          position: absolute;
          top: 12px; right: 16px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--accent-red-bright);
          opacity: 0.6;
        }
        .warning-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 18px;
          font-weight: 600;
          color: var(--accent-red-bright);
          margin-bottom: 20px;
        }
        .warning-title svg { width: 22px; height: 22px; }
        .assimilation-stages {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .assim-stage {
          padding: 16px;
          background-color: rgba(7, 7, 10, 0.6);
          border: 1px solid rgba(196, 40, 40, 0.2);
        }
        .assim-stage-num {
          font-family: var(--font-mono);
          font-size: 24px;
          font-weight: 700;
          color: var(--accent-red-bright);
          margin-bottom: 6px;
        }
        .assim-stage-name {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .assim-stage-desc {
          font-size: 12px;
          color: var(--text-tertiary);
          line-height: 1.6;
        }
        .warning-notice {
          padding: 14px 18px;
          background-color: rgba(196, 40, 40, 0.1);
          border-left: 3px solid var(--accent-red-bright);
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .warning-notice strong { color: var(--accent-red-bright); }

        /* 表单 */
        .join-form-card {
          background-color: rgba(12, 12, 16, 0.9);
          border: 1px solid var(--border-color);
        }
        .join-form-card::before {
          content: "";
          display: block;
          height: 3px;
          background-color: var(--accent-red-bright);
        }
        .join-form-section {
          padding: 28px 32px;
          border-bottom: 1px solid var(--border-color);
        }
        .join-form-section:last-of-type { border-bottom: none; }
        .join-form-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(196, 40, 40, 0.2);
        }
        .join-form-num {
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          background-color: var(--accent-red-bright);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
        }
        .join-form-name { font-size: 15px; font-weight: 600; letter-spacing: 0.05em; }
        .join-form-en {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }
        .join-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 20px;
        }
        .join-grid-full { grid-column: 1 / -1; }
        .join-field { display: flex; flex-direction: column; gap: 6px; }
        .join-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .join-label .req { color: var(--accent-red-bright); margin-right: 4px; }
        .join-label .opt { color: var(--text-tertiary); margin-right: 4px; font-style: italic; }
        .join-input, .join-select, .join-textarea {
          width: 100%;
          padding: 10px 12px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 13px;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          box-sizing: border-box;
        }
        .join-textarea { resize: vertical; min-height: 80px; }
        .join-input:focus, .join-select:focus, .join-textarea:focus {
          border-color: var(--accent-red-bright);
          box-shadow: 0 0 0 2px rgba(196, 40, 40, 0.15);
        }
        .join-input.error, .join-select.error, .join-textarea.error {
          border-color: var(--accent-red-bright);
        }
        .join-hint { font-size: 11px; color: var(--text-tertiary); line-height: 1.4; }
        .join-error-text { font-size: 11px; color: var(--accent-red-bright); line-height: 1.4; }

        .join-location-filter {
          display: flex;
          gap: 6px;
        }
        .join-location-filter .join-select {
          flex: 1;
          min-width: 0;
          padding: 8px 8px;
        }
        @media (max-width: 640px) {
          .join-location-filter { flex-direction: column; }
        }

        .join-checkbox-field {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 14px 16px;
          background-color: rgba(196, 40, 40, 0.04);
          border: 1px solid rgba(196, 40, 40, 0.15);
          margin-bottom: 12px;
        }
        .join-checkbox-field input[type="checkbox"] {
          margin-top: 2px; accent-color: var(--accent-red-bright); cursor: pointer;
        }
        .join-checkbox-label {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .join-checkbox-label a {
          color: var(--accent-red-bright);
          text-decoration: none;
          cursor: pointer;
        }

        .join-submit-btn {
          width: 100%;
          padding: 14px;
          background-color: var(--accent-red-bright);
          border: none;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .join-submit-btn:hover { background-color: #d43a3a; }

        /* 成功状态 */
        .join-success-card {
          text-align: center;
          padding: 60px 40px;
          background-color: rgba(12, 12, 16, 0.85);
          border: 1px solid var(--border-color);
        }
        .join-success-card::before {
          content: ""; display: block; height: 3px;
          background-color: var(--level-ordinary);
          margin: -60px -40px 40px;
        }
        .join-success-icon {
          width: 72px; height: 72px;
          margin: 0 auto 24px;
          border-radius: 50%;
          background-color: rgba(46, 139, 87, 0.1);
          border: 2px solid var(--level-ordinary);
          display: flex; align-items: center; justify-content: center;
        }
        .join-success-icon svg { width: 36px; height: 36px; stroke: var(--level-ordinary); }
        .join-success-title { font-size: 26px; font-weight: 700; margin-bottom: 12px; }
        .join-success-desc {
          font-size: 13px; color: var(--text-secondary); line-height: 1.7;
          max-width: 480px; margin: 0 auto 28px;
        }
        .join-success-info {
          text-align: left;
          padding: 20px 24px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          max-width: 400px;
          margin: 0 auto 28px;
          font-family: var(--font-mono);
          font-size: 12px;
          line-height: 2;
        }
        .join-success-info .info-row { display: flex; justify-content: space-between; gap: 12px; }
        .join-success-info .info-key { color: var(--text-tertiary); }
        .join-success-info .info-val { color: var(--text-primary); }
        .join-success-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .join-btn-primary {
          padding: 10px 28px;
          background-color: var(--accent-red-bright);
          border: none; color: #fff;
          font-size: 13px; font-weight: 600; cursor: pointer;
        }
        .join-btn-secondary {
          padding: 10px 28px;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 13px; cursor: pointer;
          transition: all 0.2s ease;
        }
        .join-btn-secondary:hover {
          border-color: var(--accent-red-bright); color: var(--accent-red-bright);
        }

        /* Modal */
        .join-modal-overlay {
          position: fixed; inset: 0;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex; align-items: center; justify-content: center;
          z-index: 2000;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .join-modal {
          width: 100%;
          max-width: 560px;
          max-height: 80vh;
          background-color: #0c0c10;
          border: 1px solid var(--border-color);
          display: flex; flex-direction: column;
          animation: slideUp 0.25s ease;
        }
        @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .join-modal::before {
          content: "";
          display: block;
          height: 3px;
          background-color: var(--accent-red-bright);
        }
        .join-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color);
        }
        .join-modal-title {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .join-modal-close {
          width: 28px; height: 28px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: color 0.2s;
        }
        .join-modal-close:hover { color: var(--accent-red-bright); }
        .join-modal-body {
          padding: 24px;
          overflow-y: auto;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.8;
        }
        .join-modal-body h4 {
          color: var(--text-primary);
          font-size: 14px;
          margin: 20px 0 8px;
          font-weight: 600;
        }
        .join-modal-body h4:first-child { margin-top: 0; }
        .join-modal-body p { margin: 0 0 10px; }
        .join-modal-body ul {
          padding-left: 20px;
          margin: 0 0 10px;
        }
        .join-modal-body li { margin-bottom: 4px; }
        .join-modal-footer {
          padding: 16px 24px;
          border-top: 1px solid var(--border-color);
          text-align: right;
        }
        .join-modal-footer button {
          padding: 8px 20px;
          background-color: var(--accent-red-bright);
          border: none;
          color: #fff;
          font-size: 12px;
          cursor: pointer;
          font-weight: 600;
        }
        .join-modal-footer button:hover { background-color: #d43a3a; }

        /* 底部导航 */
        .join-bottom-nav {
          text-align: center;
          margin-top: 32px;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .join-bottom-nav a {
          color: var(--accent-red-bright);
          text-decoration: none;
          cursor: pointer;
          margin: 0 4px;
        }
        .join-bottom-nav a:hover { text-decoration: underline; }
        .join-bottom-nav .divider {
          color: var(--border-color); margin: 0 8px;
        }

        @media (max-width: 900px) {
          .channel-grid { grid-template-columns: 1fr; }
          .training-grid { grid-template-columns: 1fr; }
          .assimilation-stages { grid-template-columns: repeat(2, 1fr); }
          .join-grid { grid-template-columns: 1fr; }
          .join-hero-title { font-size: 32px; }
          .join-section-title { font-size: 22px; }
          .join-form-section { padding: 20px; }
          .join-success-card { padding: 40px 20px; }
          .join-success-card::before { margin: -40px -20px 28px; }
          .warning-box { padding: 20px; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "join-watermark"
  }, "JOIN THE ANOMALISTS"), /*#__PURE__*/React.createElement("div", {
    className: "join-container"
  }, submitted ? /*#__PURE__*/React.createElement("div", {
    className: "join-section",
    style: {
      paddingTop: "60px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-success-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-success-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("h2", {
    className: "join-success-title"
  }, "\u7533\u8BF7\u5DF2\u63D0\u4EA4"), /*#__PURE__*/React.createElement("p", {
    className: "join-success-desc"
  }, "\u60A8\u7684\u6EAF\u754C\u8005\u7533\u8BF7\u5DF2\u63D0\u4EA4\u81F3 IMAC \u62DB\u52DF\u4E0E\u4EBA\u4E8B\u4E2D\u5FC3\u3002 \u521D\u7B5B\u7ED3\u679C\u5C06\u5728 15 \u4E2A\u5DE5\u4F5C\u65E5\u5185\u901A\u8FC7\u60A8\u586B\u5199\u7684\u8054\u7CFB\u65B9\u5F0F\u901A\u77E5\uFF0C \u8BF7\u4FDD\u6301\u901A\u8BAF\u7545\u901A\u5E76\u7559\u610F\u7CFB\u7EDF\u90AE\u4EF6\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "join-success-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u7533\u8BF7\u7F16\u53F7"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, "APL-", Math.floor(Math.random() * 9000 + 1000), "-", formData.organization?.slice(0, 2) || "XX")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u7533\u8BF7\u4EBA"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, formData.realName || "—")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u7533\u8BF7\u901A\u9053"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, formData.channel || "—")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u610F\u5411\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, formData.organization || "—")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u5F53\u524D\u72B6\u6001"), /*#__PURE__*/React.createElement("span", {
    className: "info-val",
    style: {
      color: "var(--level-ordinary)"
    }
  }, "\u521D\u7B5B\u5BA1\u6838\u4E2D")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u9884\u8BA1\u7B54\u590D"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, "15 \u4E2A\u5DE5\u4F5C\u65E5\u5185"))), /*#__PURE__*/React.createElement("div", {
    className: "join-success-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "join-btn-primary",
    onClick: () => navigate("/")
  }, "\u8FD4\u56DE\u9996\u9875"), /*#__PURE__*/React.createElement("button", {
    className: "join-btn-secondary",
    onClick: () => navigate("/guide")
  }, "\u4E86\u89E3\u5F02\u5E38")))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "join-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-hero-tag"
  }, "JOIN US \xB7 \u52A0\u5165\u6EAF\u754C\u8005\u5E8F\u5217"), /*#__PURE__*/React.createElement("h1", {
    className: "join-hero-title"
  }, "\u6210\u4E3A\u6EAF\u754C\u8005"), /*#__PURE__*/React.createElement("p", {
    className: "join-hero-sub"
  }, "\u6EAF\u754C\u8005\u2014\u2014\u884C\u8D70\u5728\u6B63\u5E38\u4E16\u754C\u4E0E\u5F02\u5E38\u4E4B\u95F4\u7684\u4EBA\u3002 \u4ED6\u4EEC\u6DF1\u5165\u89C4\u5219\u626D\u66F2\u4E4B\u5730\uFF0C\u6536\u96C6\u4FE1\u606F\u3001\u62A4\u9001\u64A4\u79BB\u3001\u7EF4\u6301\u8FB9\u754C\u3002 \u8FD9\u4E0D\u662F\u82F1\u96C4\u7684\u804C\u4E1A\uFF0C\u800C\u662F\u4E00\u4EFD\u9700\u8981\u7406\u6027\u3001\u575A\u97E7\u4E0E\u656C\u754F\u7684\u5DE5\u4F5C\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "join-quote"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-quote-text"
  }, "\"\u6211\u4EEC\u4E0D\u662F\u5728\u8DE8\u8D8A\u8FB9\u754C\uFF0C\u6211\u4EEC\u662F\u5728\u5B88\u4F4F\u8FB9\u754C\u3002 \u6BCF\u4E00\u6B21\u6DF1\u5165\uFF0C\u90FD\u662F\u4E3A\u4E86\u8BA9\u53E6\u4E00\u8FB9\u7684\u4EBA\u4E0D\u7528\u9762\u5BF9\u8FD9\u4E9B\u3002\""), /*#__PURE__*/React.createElement("div", {
    className: "join-quote-author"
  }, "\u2014\u2014 \u827E\u4F26\xB7\u7EF4\u65AF\u7279 \u9996\u5E2D\u6EAF\u754C\u8005 \u5B89\u73C0\u538612\u5E74"))), /*#__PURE__*/React.createElement("section", {
    className: "join-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-label"
  }, "RECRUITMENT CHANNELS"), /*#__PURE__*/React.createElement("h2", {
    className: "join-section-title"
  }, "\u4E09\u5927\u6765\u6E90\u901A\u9053"), /*#__PURE__*/React.createElement("p", {
    className: "join-section-desc"
  }, "\u6EAF\u754C\u8005\u4E3B\u8981\u6765\u81EA\u4E09\u4E2A\u7CFB\u7EDF\uFF0C\u5404\u81EA\u5177\u5907\u72EC\u7279\u7684\u4F18\u52BF\u4E0E\u8BAD\u7EC3\u80CC\u666F\u3002 IMAC \u8054\u5408\u62DB\u52DF\u4E2D\u5FC3\u5BF9\u6240\u6709\u901A\u9053\u6267\u884C\u7EDF\u4E00\u7684\u9009\u62D4\u6807\u51C6\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "channel-grid"
  }, channels.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.key,
    className: "channel-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "channel-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: c.icon
  }))), /*#__PURE__*/React.createElement("div", {
    className: "channel-name"
  }, c.name), /*#__PURE__*/React.createElement("div", {
    className: "channel-en"
  }, c.en, c.full ? ` · ${c.full}` : ""), /*#__PURE__*/React.createElement("div", {
    className: "channel-ratio"
  }, c.ratio), /*#__PURE__*/React.createElement("div", {
    className: "channel-desc"
  }, c.desc))))), /*#__PURE__*/React.createElement("section", {
    className: "join-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-label"
  }, "SELECTION CRITERIA"), /*#__PURE__*/React.createElement("h2", {
    className: "join-section-title"
  }, "\u9009\u62D4\u6807\u51C6"), /*#__PURE__*/React.createElement("p", {
    className: "join-section-desc"
  }, "\u6EAF\u754C\u8005\u7684\u9009\u62D4\u4E0D\u5C40\u9650\u4E8E\u4F53\u80FD\u4E0E\u667A\u529B\uFF0C\u66F4\u91CD\u89C6\u5728\u5F02\u5E38\u73AF\u5883\u4E0B\u7EF4\u6301\u81EA\u6211\u4E0E\u5224\u65AD\u7684\u7EFC\u5408\u80FD\u529B\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "criteria-list"
  }, criteria.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "criteria-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "criteria-num"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    className: "criteria-content"
  }, /*#__PURE__*/React.createElement("h4", null, item.name), /*#__PURE__*/React.createElement("p", null, item.desc)))))), /*#__PURE__*/React.createElement("section", {
    className: "join-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-label"
  }, "TRAINING SYSTEM"), /*#__PURE__*/React.createElement("h2", {
    className: "join-section-title"
  }, "\u57F9\u8BAD\u4F53\u7CFB"), /*#__PURE__*/React.createElement("p", {
    className: "join-section-desc"
  }, "\u6240\u6709\u6EAF\u754C\u8005\u9700\u901A\u8FC7 IMAC \u7EDF\u4E00\u57F9\u8BAD\u6846\u67B6\uFF08AITF\uFF09\u8BA4\u8BC1\u65B9\u53EF\u6267\u884C\u5916\u52E4\u4EFB\u52A1\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "training-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "training-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "training-highlight"
  }, "8-14", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "18px"
    }
  }, "\u4E2A\u6708")), /*#__PURE__*/React.createElement("div", {
    className: "training-highlight-label"
  }, "\u57F9\u8BAD\u5468\u671F\uFF08\u56E0\u7EC4\u7EC7\u800C\u5F02\uFF09"), /*#__PURE__*/React.createElement("ul", {
    className: "training-modules"
  }, /*#__PURE__*/React.createElement("li", null, "\u5F02\u5E38\u5206\u7C7B\u5B66\u57FA\u7840"), /*#__PURE__*/React.createElement("li", null, "\u89C4\u5219\u89E3\u6790\u65B9\u6CD5\u8BBA"), /*#__PURE__*/React.createElement("li", null, "\u5F71\u50CF\u8D44\u6599\u5206\u6790"), /*#__PURE__*/React.createElement("li", null, "\u5F02\u5E38\u5185\u5FC3\u7406\u9632\u62A4"), /*#__PURE__*/React.createElement("li", null, "\u6218\u672F\u64A4\u9000\u4E0E\u5E94\u6025\u7A0B\u5E8F"), /*#__PURE__*/React.createElement("li", null, "\u951A\u5B9A\u7269\u6821\u51C6\u5B9E\u64CD\u8BAD\u7EC3"))), /*#__PURE__*/React.createElement("div", {
    className: "training-framework"
  }, /*#__PURE__*/React.createElement("span", {
    className: "training-framework-tag"
  }, "AITF \xB7 UNIFIED FRAMEWORK"), /*#__PURE__*/React.createElement("h4", {
    style: {
      marginTop: "16px"
    }
  }, "IMAC \u7EDF\u4E00\u57F9\u8BAD\u6846\u67B6"), /*#__PURE__*/React.createElement("p", null, "Anomalist Integrated Training Framework\uFF08AITF\uFF09\u662F IMAC \u57F9\u8BAD\u4E0E\u8BA4\u8BC1\u4E2D\u5FC3 \u8054\u5408\u516B\u5927\u7EC4\u7EC7\u5171\u540C\u5236\u5B9A\u7684\u6EAF\u754C\u8005\u57F9\u8BAD\u6807\u51C6\uFF0C\u6DB5\u76D6\u7406\u8BBA\u3001\u6A21\u62DF\u3001\u5B9E\u5730\u4E09\u7C7B\u8003\u6838\u3002 \u6240\u6709\u7EC4\u7EC7\u7684\u65B0\u664B\u6EAF\u754C\u8005\u5FC5\u987B\u901A\u8FC7 AITF \u8BA4\u8BC1\u65B9\u53EF\u83B7\u5F97\u5916\u52E4\u8D44\u683C\uFF0C \u5E76\u9700\u6BCF\u5E74\u5B8C\u6210\u590D\u8BAD\u4E0E\u5FC3\u7406\u8BC4\u4F30\u4EE5\u7EF4\u6301\u8D44\u8D28\u3002"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "\u57F9\u8BAD\u7531\u5404\u7EC4\u7EC7\u5185\u90E8\u6267\u884C\uFF0CIMAC \u6D3E\u9063\u7763\u5BFC\u5458\u8003\u6838\uFF0C \u8003\u6838\u901A\u8FC7\u7387\u7EA6 62%\uFF0C\u672A\u901A\u8FC7\u8005\u53EF\u7533\u8BF7\u4E00\u6B21\u8865\u8003\u6216\u8F6C\u5165\u975E\u5916\u52E4\u5C97\u4F4D\u3002")))), /*#__PURE__*/React.createElement("section", {
    className: "join-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-label"
  }, "RANK SYSTEM"), /*#__PURE__*/React.createElement("h2", {
    className: "join-section-title"
  }, "\u804C\u7EA7\u4F53\u7CFB"), /*#__PURE__*/React.createElement("p", {
    className: "join-section-desc"
  }, "\u6EAF\u754C\u8005\u804C\u7EA7\u7531 IMAC \u7EDF\u4E00\u8BA4\u5B9A\uFF0C\u5404\u7EC4\u7EC7\u72EC\u7ACB\u7BA1\u7406\uFF0C\u4F46\u664B\u5347\u9700\u7ECF\u8DE8\u7EC4\u7EC7\u8BC4\u5BA1\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "rank-ladder"
  }, ranks.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rank-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rank-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rank-name"
  }, r.name), /*#__PURE__*/React.createElement("span", {
    className: "rank-en"
  }, r.en.toUpperCase()), /*#__PURE__*/React.createElement("span", {
    className: "rank-ratio"
  }, r.ratio)), /*#__PURE__*/React.createElement("div", {
    className: "rank-desc"
  }, r.desc), /*#__PURE__*/React.createElement("div", {
    className: "rank-promote"
  }, /*#__PURE__*/React.createElement("strong", null, "\u664B\u5347\u6761\u4EF6\uFF1A"), r.promote))))), /*#__PURE__*/React.createElement("section", {
    className: "join-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-label"
  }, "ASSIMILATION WARNING"), /*#__PURE__*/React.createElement("h2", {
    className: "join-section-title",
    style: {
      color: "var(--accent-red-bright)"
    }
  }, "\u540C\u5316\u8B66\u793A"), /*#__PURE__*/React.createElement("p", {
    className: "join-section-desc"
  }, "\u6DF1\u5165\u5F02\u5E38\u5FC5\u7136\u4F34\u968F\u7740\u88AB\u540C\u5316\u7684\u98CE\u9669\u3002\u8FD9\u662F\u6BCF\u4E00\u4F4D\u6EAF\u754C\u8005\u5FC5\u987B\u6B63\u89C6\u7684\u4EE3\u4EF7\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "warning-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "warning-title"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 9v4 M12 17h.01 M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
  })), "\u8BA4\u77E5\u540C\u5316\u56DB\u9636\u6BB5"), /*#__PURE__*/React.createElement("div", {
    className: "assimilation-stages"
  }, assimilationStages.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "assim-stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "assim-stage-num"
  }, "0", i + 1), /*#__PURE__*/React.createElement("div", {
    className: "assim-stage-name"
  }, s.stage.split(" · ")[1]), /*#__PURE__*/React.createElement("div", {
    className: "assim-stage-desc"
  }, s.desc)))), /*#__PURE__*/React.createElement("div", {
    className: "warning-notice"
  }, /*#__PURE__*/React.createElement("strong", null, "IMAC \u89C4\u7A0B\u7B2C 7.3 \u6761\uFF1A"), "\u786E\u8BA4\u540C\u5316\u81F3\u7B2C\u4E09\u9636\u6BB5\u53CA\u4EE5\u4E0A\u7684\u4EBA\u5458\uFF0C\u5E94\u7ACB\u5373\u7EC8\u6B62\u5916\u52E4\u884C\u52A8\u8D44\u683C\u5E76\u63A5\u53D7\u533B\u7597\u8BC4\u4F30\uFF1B \u786E\u8BA4\u7B2C\u56DB\u9636\u6BB5\u540C\u5316\u8005\uFF0C\u6309\u89C4\u7A0B\u6267\u884C\u9664\u540D\u5904\u7406\uFF0C\u4EFB\u4F55\u7EC4\u7EC7\u4E0E\u4E2A\u4EBA\u4E0D\u5F97\u79C1\u81EA\u6536\u5BB9\u3002"))), /*#__PURE__*/React.createElement("section", {
    className: "join-section",
    id: "apply-form"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-label"
  }, "APPLICATION FORM"), /*#__PURE__*/React.createElement("h2", {
    className: "join-section-title"
  }, "\u63D0\u4EA4\u7533\u8BF7"), /*#__PURE__*/React.createElement("p", {
    className: "join-section-desc"
  }, "\u8BF7\u5982\u5B9E\u586B\u5199\u4EE5\u4E0B\u4FE1\u606F\u3002\u6240\u6709\u7533\u8BF7\u5C06\u7531 IMAC \u62DB\u52DF\u4E0E\u4EBA\u4E8B\u4E2D\u5FC3\u8054\u5408\u6240\u5C5E\u7EC4\u7EC7\u5171\u540C\u5BA1\u6838\uFF0C \u4FE1\u606F\u4E0D\u5B9E\u8005\u5C06\u6C38\u4E45\u53D6\u6D88\u7533\u8BF7\u8D44\u683C\u3002")), /*#__PURE__*/React.createElement("form", {
    className: "join-form-card",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-form-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-form-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "join-form-num"
  }, "1"), /*#__PURE__*/React.createElement("span", {
    className: "join-form-name"
  }, "\u57FA\u672C\u4FE1\u606F"), /*#__PURE__*/React.createElement("span", {
    className: "join-form-en"
  }, "BASIC INFO")), /*#__PURE__*/React.createElement("div", {
    className: "join-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u771F\u5B9E\u59D3\u540D"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputCls("realName"),
    value: formData.realName,
    onChange: e => handleChange("realName", e.target.value),
    placeholder: "\u8BF7\u8F93\u5165\u771F\u5B9E\u59D3\u540D"
  }), errors.realName && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.realName)), /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "opt"
  }, "\u53EF\u9009"), "\u4EE3\u53F7 / \u547C\u53F7"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "join-input",
    value: formData.codename,
    onChange: e => handleChange("codename", e.target.value),
    placeholder: "\u5165\u804C\u540E\u4E5F\u53EF\u7531\u7EC4\u7EC7\u5206\u914D"
  }), /*#__PURE__*/React.createElement("span", {
    className: "join-hint"
  }, "\u884C\u52A8\u4E2D\u4F7F\u7528\u7684\u4EE3\u53F7\uFF0C\u53EF\u5165\u804C\u540E\u5206\u914D")), /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u7533\u8BF7\u6765\u6E90\u901A\u9053"), /*#__PURE__*/React.createElement("select", {
    className: `join-select ${errors.channel ? "error" : ""}`,
    value: formData.channel,
    onChange: e => handleChange("channel", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u8BF7\u9009\u62E9"), channelOptions.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c))), errors.channel && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.channel)), /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u610F\u5411\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("select", {
    className: `join-select ${errors.organization ? "error" : ""}`,
    value: formData.organization,
    onChange: e => handleChange("organization", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u8BF7\u9009\u62E9"), organizations.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o))), errors.organization && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.organization)), /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u6240\u5728\u5730\u533A"), /*#__PURE__*/React.createElement("div", {
    className: "join-location-filter"
  }, /*#__PURE__*/React.createElement("select", {
    className: `join-select ${errors.country || errors.region || errors.city ? "error" : ""}`,
    value: formData.country,
    onChange: e => handleCountryChange(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u56FD\u5BB6"), Object.keys(locationData).map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c))), /*#__PURE__*/React.createElement("select", {
    className: `join-select ${errors.country || errors.region || errors.city ? "error" : ""}`,
    value: formData.region,
    onChange: e => handleRegionChange(e.target.value),
    disabled: !formData.country || formData.country === "洛林自由市"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u5730\u533A"), formData.country === "洛林自由市" ? /*#__PURE__*/React.createElement("option", {
    value: "\u57CE\u90A6"
  }, "\u57CE\u90A6") : formData.country && Object.keys(locationData[formData.country]).map(r => /*#__PURE__*/React.createElement("option", {
    key: r,
    value: r
  }, r))), /*#__PURE__*/React.createElement("select", {
    className: `join-select ${errors.country || errors.region || errors.city ? "error" : ""}`,
    value: formData.city,
    onChange: e => handleChange("city", e.target.value),
    disabled: !formData.region || formData.country === "洛林自由市"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u57CE\u5E02"), formData.country === "洛林自由市" ? /*#__PURE__*/React.createElement("option", {
    value: "\u6D1B\u6797\u81EA\u7531\u5E02"
  }, "\u6D1B\u6797\u81EA\u7531\u5E02") : formData.country && formData.region && locationData[formData.country][formData.region].map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c)))), formData.country === "洛林自由市" && /*#__PURE__*/React.createElement("span", {
    className: "join-hint"
  }, "\u57CE\u90A6\u578B\u653F\u4F53\uFF0C\u5730\u533A\u4E0E\u57CE\u5E02\u5DF2\u81EA\u52A8\u786E\u5B9A"), (errors.country || errors.region || errors.city) && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, "\u8BF7\u5B8C\u6574\u9009\u62E9\u6240\u5728\u5730\u533A\uFF08\u56FD\u5BB6 / \u5730\u533A / \u57CE\u5E02\uFF09")), /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u5E74\u9F84"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputCls("age"),
    value: formData.age,
    onChange: e => handleChange("age", e.target.value),
    placeholder: "18-55 \u5C81"
  }), errors.age && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.age)), /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u8054\u7CFB\u65B9\u5F0F"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputCls("contact"),
    value: formData.contact,
    onChange: e => handleChange("contact", e.target.value),
    placeholder: "\u90AE\u7BB1 / \u7535\u8BDD"
  }), errors.contact && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.contact)), /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u4E13\u4E1A\u80CC\u666F"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputCls("specialty"),
    value: formData.specialty,
    onChange: e => handleChange("specialty", e.target.value),
    placeholder: "\u5982\uFF1A\u5FC3\u7406\u5B66\u3001\u5211\u4FA6\u3001\u5DE5\u7A0B\u5B66\u3001\u533B\u5B66"
  }), errors.specialty && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.specialty)))), /*#__PURE__*/React.createElement("div", {
    className: "join-form-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-form-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "join-form-num"
  }, "2"), /*#__PURE__*/React.createElement("span", {
    className: "join-form-name"
  }, "\u7ECF\u5386\u4E0E\u80CC\u666F"), /*#__PURE__*/React.createElement("span", {
    className: "join-form-en"
  }, "EXPERIENCE")), /*#__PURE__*/React.createElement("div", {
    className: "join-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-field join-grid-full"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u76F8\u5173\u7ECF\u5386\u7B80\u8FF0"), /*#__PURE__*/React.createElement("textarea", {
    className: `join-textarea ${errors.experience ? "error" : ""}`,
    value: formData.experience,
    onChange: e => handleChange("experience", e.target.value),
    placeholder: "\u5DE5\u4F5C\u7ECF\u5386\u3001\u519B\u65C5\u7ECF\u5386\u3001\u6216\u4E0E\u5F02\u5E38\u76F8\u5173\u7684\u7ECF\u5386\u7B80\u8FF0"
  }), errors.experience && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.experience)), /*#__PURE__*/React.createElement("div", {
    className: "join-field join-grid-full"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "opt"
  }, "\u9009\u586B"), "\u5F02\u5E38\u7ECF\u5386\u8BF4\u660E"), /*#__PURE__*/React.createElement("textarea", {
    className: "join-textarea",
    value: formData.anomalyExp,
    onChange: e => handleChange("anomalyExp", e.target.value),
    placeholder: "\u662F\u5426\u7ECF\u5386\u8FC7\u5F02\u5E38\u4E8B\u4EF6\uFF0C\u7B80\u8981\u63CF\u8FF0\u3002\u6CA1\u6709\u53EF\u586B\"\u65E0\"\u3002"
  })), /*#__PURE__*/React.createElement("div", {
    className: "join-field join-grid-full"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u7533\u8BF7\u7406\u7531 / \u52A8\u673A"), /*#__PURE__*/React.createElement("textarea", {
    className: `join-textarea ${errors.motivation ? "error" : ""}`,
    value: formData.motivation,
    onChange: e => handleChange("motivation", e.target.value),
    placeholder: "\u4E3A\u4EC0\u4E48\u60F3\u6210\u4E3A\u6EAF\u754C\u8005\uFF1F"
  }), errors.motivation && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.motivation)))), /*#__PURE__*/React.createElement("div", {
    className: "join-form-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-form-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "join-form-num"
  }, "3"), /*#__PURE__*/React.createElement("span", {
    className: "join-form-name"
  }, "\u58F0\u660E\u4E0E\u63D0\u4EA4"), /*#__PURE__*/React.createElement("span", {
    className: "join-form-en"
  }, "DECLARATION")), /*#__PURE__*/React.createElement("div", {
    className: "join-checkbox-field"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "join-health",
    checked: formData.healthDeclare,
    onChange: e => handleChange("healthDeclare", e.target.checked)
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "join-health",
    className: "join-checkbox-label"
  }, "\u6211\u786E\u8BA4\u65E0\u91CD\u5927\u7CBE\u795E\u75BE\u75C5\u53F2\u3001\u4F53\u80FD\u8FBE\u6807\u3001\u65E0\u5F71\u54CD\u5916\u52E4\u4EFB\u52A1\u7684\u6162\u6027\u75BE\u75C5\uFF0C \u5E76\u613F\u610F\u63A5\u53D7 IMAC \u533B\u7597\u4E0E\u5FC3\u7406\u8BC4\u4F30\u3002")), errors.healthDeclare && /*#__PURE__*/React.createElement("div", {
    className: "join-error-text",
    style: {
      marginBottom: "12px"
    }
  }, errors.healthDeclare), /*#__PURE__*/React.createElement("div", {
    className: "join-checkbox-field"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "join-nda",
    checked: formData.nda,
    onChange: e => handleChange("nda", e.target.checked)
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "join-nda",
    className: "join-checkbox-label"
  }, "\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F", /*#__PURE__*/React.createElement("a", {
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      setModalOpen("nda");
    }
  }, "\u300AIMAC \u6EAF\u754C\u8005\u4FDD\u5BC6\u534F\u8BAE\u300B"), "\u53CA", /*#__PURE__*/React.createElement("a", {
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      setModalOpen("safety");
    }
  }, "\u300A\u5F02\u5E38\u884C\u52A8\u5B89\u5168\u51C6\u5219\u300B"), "\uFF0C\u627F\u8BFA\u6240\u586B\u4FE1\u606F\u771F\u5B9E\u6709\u6548\uFF0C\u613F\u610F\u63A5\u53D7\u8EAB\u4EFD\u6838\u9A8C\u53CA\u76F8\u5E94\u7EAA\u5F8B\u7EA6\u675F\u3002")), errors.nda && /*#__PURE__*/React.createElement("div", {
    className: "join-error-text",
    style: {
      marginBottom: "12px"
    }
  }, errors.nda), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "join-submit-btn"
  }, "\u63D0 \u4EA4 \u7533 \u8BF7"))), /*#__PURE__*/React.createElement("div", {
    className: "join-bottom-nav"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/")
  }, "\u8FD4\u56DE\u9996\u9875"), /*#__PURE__*/React.createElement("span", {
    className: "divider"
  }, "|"), /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/guide")
  }, "\u4E86\u89E3\u5F02\u5E38"), /*#__PURE__*/React.createElement("span", {
    className: "divider"
  }, "|"), /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/auth")
  }, "\u5DF2\u901A\u8FC7\u8BA4\u8BC1\uFF1F\u767B\u5F55\u7CFB\u7EDF")))), modalOpen && /*#__PURE__*/React.createElement("div", {
    className: "join-modal-overlay",
    onClick: () => setModalOpen(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-modal-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "join-modal-title"
  }, modalOpen === "nda" ? "IMAC 溯界者保密协议" : "异常行动安全准则"), /*#__PURE__*/React.createElement("button", {
    className: "join-modal-close",
    onClick: () => setModalOpen(null),
    "aria-label": "\u5173\u95ED"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "join-modal-body"
  }, modalOpen === "nda" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E00\u6761 \u4FDD\u5BC6\u8303\u56F4"), /*#__PURE__*/React.createElement("p", null, "\u672C\u534F\u8BAE\u6240\u6307\u4FDD\u5BC6\u4FE1\u606F\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\uFF1A\u5F02\u5E38\u4E8B\u4EF6\u7684\u5B58\u5728\u4E0E\u7EC6\u8282\u3001IMAC \u7EC4\u7EC7\u7ED3\u6784\u4E0E\u4EBA\u5458\u4FE1\u606F\u3001\u884C\u52A8\u8BB0\u5F55\u3001\u88C5\u5907\u53C2\u6570\u3001\u7814\u7A76\u8D44\u6599\u3001\u57F9\u8BAD\u5185\u5BB9\u4EE5\u53CA\u4E00\u5207\u88AB\u6807\u8BB0\u4E3A\u53D7\u9650\u7EA7\u53CA\u4EE5\u4E0A\u7684\u6587\u6863\u4E0E\u6570\u636E\u3002"), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E8C\u6761 \u4FE1\u606F\u7BA1\u63A7"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u6EAF\u754C\u8005\u4E0D\u5F97\u4EE5\u4EFB\u4F55\u5F62\u5F0F\u5411\u672A\u6388\u6743\u4EBA\u5458\uFF08\u542B\u5BB6\u5C5E\u3001\u4EB2\u53CB\uFF09\u900F\u9732\u4FDD\u5BC6\u4FE1\u606F\u3002"), /*#__PURE__*/React.createElement("li", null, "\u6240\u6709\u7EB8\u8D28\u4E0E\u7535\u5B50\u6587\u6863\u9700\u6309\u5BC6\u7EA7\u5B58\u50A8\u4E8E\u6307\u5B9A\u8BBE\u65BD\uFF0C\u4E25\u7981\u64C5\u81EA\u590D\u5236\u6216\u643A\u5E26\u51FA\u5DE5\u4F5C\u533A\u57DF\u3002"), /*#__PURE__*/React.createElement("li", null, "\u5BF9\u5916\u901A\u8BAF\u9700\u7ECF\u8FC7\u7EC4\u7EC7\u5BA1\u67E5\uFF0C\u4E0D\u5F97\u4F7F\u7528\u516C\u5F00\u7F51\u7EDC\u4F20\u8F93\u4EFB\u4F55\u4FDD\u5BC6\u5185\u5BB9\u3002"), /*#__PURE__*/React.createElement("li", null, "\u4E2A\u4EBA\u793E\u4EA4\u5A92\u4F53\u8D26\u53F7\u4E0D\u5F97\u51FA\u73B0\u4EFB\u4F55\u4E0E IMAC \u53CA\u5F02\u5E38\u76F8\u5173\u7684\u6697\u793A\u6027\u5185\u5BB9\u3002")), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E09\u6761 \u8FDD\u89C4\u5904\u7F5A"), /*#__PURE__*/React.createElement("p", null, "\u8FDD\u53CD\u672C\u534F\u8BAE\u8005\uFF0C\u89C6\u60C5\u8282\u8F7B\u91CD\u5904\u4EE5\uFF1A\u8B66\u544A\u3001\u505C\u804C\u8C03\u67E5\u3001\u5F3A\u5236\u8BB0\u5FC6\u5E72\u9884\u3001\u89E3\u9664\u804C\u52A1\u5E76\u6267\u884C\u4FDD\u5BC6\u9694\u79BB\u3001\u79FB\u4EA4 IMAC \u7EAA\u5F8B\u59D4\u5458\u4F1A\u5BA1\u7406\u3002\u9020\u6210\u4E25\u91CD\u540E\u679C\u8005\uFF0C\u6309\u300A\u5F02\u5E38\u5371\u5BB3\u9632\u6CBB\u6761\u4F8B\u300B\u8FFD\u7A76\u8D23\u4EFB\u3002"), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u56DB\u6761 \u6709\u6548\u671F"), /*#__PURE__*/React.createElement("p", null, "\u672C\u534F\u8BAE\u81EA\u7B7E\u7F72\u4E4B\u65E5\u8D77\u751F\u6548\uFF0C\u6709\u6548\u671F\u6DB5\u76D6\u4EFB\u804C\u671F\u95F4\u53CA\u79BB\u804C\u540E\u7EC8\u8EAB\u3002\u79BB\u804C\u6EAF\u754C\u8005\u4ECD\u53D7\u4FDD\u5BC6\u4E49\u52A1\u7EA6\u675F\uFF0C\u5E76\u9700\u6BCF 5 \u5E74\u63A5\u53D7\u4E00\u6B21\u56DE\u8BBF\u8BC4\u4F30\u3002"), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E94\u6761 \u8C41\u514D\u4E0E\u4F8B\u5916"), /*#__PURE__*/React.createElement("p", null, "\u7ECF IMAC \u516C\u5171\u4FE1\u606F\u529E\u516C\u5BA4\u7EDF\u4E00\u53D1\u5E03\u7684\u516C\u5F00\u5185\u5BB9\u4E0D\u5728\u672C\u534F\u8BAE\u7EA6\u675F\u8303\u56F4\u5185\u3002\u56E0\u53F8\u6CD5\u7A0B\u5E8F\u9700\u4F5C\u8BC1\u7684\uFF0C\u987B\u63D0\u524D\u83B7\u5F97\u7EC4\u7EC7\u6279\u51C6\u5E76\u5728\u6CD5\u52A1\u4EE3\u8868\u966A\u540C\u4E0B\u8FDB\u884C\u3002")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E00\u7AE0 \u5F02\u5E38\u5185\u884C\u4E3A\u89C4\u8303"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u8FDB\u5165\u5F02\u5E38\u524D\u5FC5\u987B\u786E\u8BA4\u951A\u5B9A\u7269\u968F\u8EAB\u643A\u5E26\uFF0C\u5E76\u5B8C\u6210\u51FA\u53D1\u524D\u5FC3\u7406\u6821\u51C6\u3002"), /*#__PURE__*/React.createElement("li", null, "\u5728\u5F02\u5E38\u5185\u4E25\u683C\u9075\u5FAA\"\u89C2\u5BDF\u2014\u8BB0\u5F55\u2014\u4E0D\u5E72\u9884\"\u539F\u5219\uFF0C\u4E0D\u5F97\u4E3B\u52A8\u89E6\u78B0\u6216\u6539\u53D8\u5F02\u5E38\u4E2D\u7684\u672A\u77E5\u7269\u4F53\u3002"), /*#__PURE__*/React.createElement("li", null, "\u9047\u5230\u89C4\u5219\u4E0D\u786E\u5B9A\u7684\u60C5\u51B5\uFF0C\u4F18\u5148\u4FDD\u6301\u539F\u5730\u9759\u6B62\uFF0C\u901A\u8FC7\u901A\u8BAF\u8BBE\u5907\u8BF7\u793A\u6307\u6325\u4E2D\u5FC3\u3002"), /*#__PURE__*/React.createElement("li", null, "\u4E0D\u5F97\u98DF\u7528\u3001\u996E\u7528\u5F02\u5E38\u5185\u6765\u6E90\u4E0D\u660E\u7684\u4EFB\u4F55\u7269\u8D28\u3002")), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E8C\u7AE0 \u88C5\u5907\u4F7F\u7528\u89C4\u5B9A"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u6807\u51C6\u88C5\u5907\uFF1A\u4FE1\u53F7\u951A\u5B9A\u5668\u3001\u5F71\u50CF\u8BB0\u5F55\u4EEA\u3001\u9632\u62A4\u9762\u5177\u3001\u5E94\u6025\u7167\u660E\u3001\u64A4\u9000\u4FE1\u6807\u3002"), /*#__PURE__*/React.createElement("li", null, "\u88C5\u5907\u987B\u5728\u51FA\u53D1\u524D\u5B8C\u6210\u81EA\u68C0\uFF0C\u6545\u969C\u88C5\u5907\u7981\u6B62\u5E26\u5165\u5F02\u5E38\u3002"), /*#__PURE__*/React.createElement("li", null, "\u6B66\u5668\u4EC5\u5728\u786E\u8BA4\u81EA\u8EAB\u751F\u547D\u53D7\u5230\u76F4\u63A5\u5A01\u80C1\u65F6\u4F7F\u7528\uFF0C\u7981\u6B62\u5BF9\u65E0\u5A01\u80C1\u76EE\u6807\u5F00\u706B\u3002")), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E09\u7AE0 \u5E73\u6C11\u4FDD\u62A4\u539F\u5219"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u4EFB\u52A1\u4F18\u5148\u7EA7\uFF1A\u5E73\u6C11\u5B89\u5168 \uFF1E \u4FE1\u606F\u6536\u96C6 \uFF1E \u5F02\u5E38\u5904\u7F6E\u3002"), /*#__PURE__*/React.createElement("li", null, "\u9047\u5230\u53D7\u56F0\u5E73\u6C11\uFF0C\u5E94\u7B2C\u4E00\u65F6\u95F4\u7EC4\u7EC7\u64A4\u79BB\u5E76\u8FDB\u884C\u8BB0\u5FC6\u7B5B\u67E5\u8BC4\u4F30\u3002"), /*#__PURE__*/React.createElement("li", null, "\u4E0D\u5F97\u5728\u5E73\u6C11\u9762\u524D\u5C55\u793A\u6B66\u5668\u6216\u8BA8\u8BBA\u654F\u611F\u4FE1\u606F\u3002"), /*#__PURE__*/React.createElement("li", null, "\u64A4\u79BB\u540E\u7531\u7EC4\u7EC7\u5FC3\u7406\u5E72\u9884\u56E2\u961F\u5BF9\u63A5\uFF0C\u6EAF\u754C\u8005\u4E0D\u5F97\u81EA\u884C\u5411\u5E73\u6C11\u89E3\u91CA\u5F02\u5E38\u3002")), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u56DB\u7AE0 \u64A4\u9000\u534F\u8BAE"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u51FA\u73B0\u4EE5\u4E0B\u4EFB\u4E00\u60C5\u51B5\u5FC5\u987B\u7ACB\u5373\u64A4\u9000\uFF1A\u961F\u5458\u5931\u8054\u8D85\u8FC7 15 \u5206\u949F\u3001\u4FE1\u53F7\u951A\u5B9A\u5668\u5931\u6548\u3001\u540C\u5316\u76D1\u6D4B\u8FBE\u5230\u7B2C\u4E8C\u9636\u6BB5\u3001\u6307\u6325\u4E2D\u5FC3\u4E0B\u4EE4\u64A4\u9000\u3002"), /*#__PURE__*/React.createElement("li", null, "\u64A4\u9000\u65F6\u6309\u9884\u5B9A\u8DEF\u7EBF\u53CD\u5411\u64A4\u79BB\uFF0C\u4E0D\u5F97\u56E0\u4EFB\u4F55\u975E\u4EBA\u5458\u5B89\u5168\u539F\u56E0\u6298\u8FD4\u3002"), /*#__PURE__*/React.createElement("li", null, "\u65E0\u6CD5\u6B63\u5E38\u64A4\u9000\u65F6\uFF0C\u542F\u52A8\u5E94\u6025\u4FE1\u6807\u5E76\u5BFB\u627E\u76F8\u5BF9\u5B89\u5168\u533A\u57DF\u56FA\u5B88\u5F85\u63F4\u3002")), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E94\u7AE0 \u540C\u5316\u76D1\u6D4B\u8981\u6C42"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u6BCF\u6B21\u5916\u52E4\u540E 24 \u5C0F\u65F6\u5185\u5FC5\u987B\u5B8C\u6210\u540C\u5316\u8BC4\u4F30\u3002"), /*#__PURE__*/React.createElement("li", null, "\u81EA\u6211\u76D1\u6D4B\u5230\u8BB0\u5FC6\u504F\u5DEE\u3001\u884C\u4E3A\u4E60\u60EF\u5F02\u5E38\u6539\u53D8\u65F6\uFF0C\u987B\u7ACB\u5373\u4E0A\u62A5\u533B\u7597\u5B98\u3002"), /*#__PURE__*/React.createElement("li", null, "\u786E\u8BA4\u7B2C\u4E09\u9636\u6BB5\u53CA\u4EE5\u4E0A\u540C\u5316\u8005\uFF0C\u6C38\u4E45\u7EC8\u6B62\u5916\u52E4\u8D44\u683C\u5E76\u63A5\u53D7\u9694\u79BB\u6CBB\u7597\u3002")))), /*#__PURE__*/React.createElement("div", {
    className: "join-modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalOpen(null)
  }, "\u6211\u5DF2\u9605\u8BFB"))))));
}
window.JoinPage = JoinPage;;
// Anomaly Auth Page - redirects to unified auth
function AnomalyAuthPage() {
  const {
    navigate
  } = useRouter();
  React.useEffect(() => {
    navigate("/auth");
  }, [navigate]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "120px 0",
      textAlign: "center",
      color: "var(--text-secondary)"
    }
  }, "\u6B63\u5728\u8DF3\u8F6C\u81F3\u7EDF\u4E00\u8BA4\u8BC1\u9875...");
}
window.AnomalyAuthPage = AnomalyAuthPage;;
// Anomaly Archive List Page
function AnomalyArchivePage({
  routeQuery
}) {
  const {
    navigate
  } = useRouter();
  const [filter, setFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const anomalies = [{
    id: "LOA-0073",
    name: "赤月学院",
    nameEn: "Crimson Moon Academy",
    level: "abyssal",
    levelText: "深渊级",
    accessLevel: "internal",
    category: "LO",
    categoryName: "地点类",
    org: "衔尾蛇事务所",
    status: "active",
    statusText: "活跃",
    survival: "1.9%",
    firstRecord: "安珀历28年",
    featured: true
  }, {
    id: "SP-0021",
    name: "无尽楼梯",
    nameEn: "Endless Stairwell",
    level: "hazardous",
    levelText: "危险级",
    category: "SP",
    categoryName: "空间类",
    org: "边界研究院 BRI",
    status: "active",
    statusText: "活跃",
    survival: "23%",
    firstRecord: "安珀历12年",
    featured: false
  }, {
    id: "TM-0045",
    name: "雾中列车",
    nameEn: "Fog Train",
    level: "doomed",
    levelText: "厄运级",
    category: "TM",
    categoryName: "时间类",
    org: "长桥会社",
    status: "active",
    statusText: "活跃",
    survival: "8%",
    firstRecord: "安珀历19年",
    featured: false
  }, {
    id: "NW-0117",
    name: "冰封哨站",
    nameEn: "Frozen Outpost",
    level: "hazardous",
    levelText: "危险级",
    category: "TM",
    categoryName: "时间类",
    org: "北境守望",
    status: "resolved",
    statusText: "已解决",
    survival: "31%",
    firstRecord: "安珀历15年",
    featured: false
  }, {
    id: "MC-0089",
    name: "镜像医院",
    nameEn: "Mirror Hospital",
    level: "doomed",
    levelText: "厄运级",
    category: "SP",
    categoryName: "空间类",
    org: "晨星团",
    status: "active",
    statusText: "活跃",
    survival: "12%",
    firstRecord: "安珀历22年",
    featured: false
  }, {
    id: "PS-0003",
    name: "回音巷",
    nameEn: "Echo Alley",
    level: "ordinary",
    levelText: "常规级",
    category: "CG",
    categoryName: "认知类",
    org: "悬铃木学会",
    status: "resolved",
    statusText: "已解决",
    survival: "67%",
    firstRecord: "安珀历9年",
    featured: false
  }, {
    id: "WNP-0201",
    name: "极光洞穴",
    nameEn: "Aurora Cave",
    level: "abyssal",
    levelText: "深渊级",
    category: "LO",
    categoryName: "地点类",
    org: "白夜哨站",
    status: "active",
    statusText: "活跃",
    survival: "0.7%",
    firstRecord: "安珀历6年",
    featured: false
  }, {
    id: "UN-0001",
    name: "空白地带",
    nameEn: "The Void",
    level: "unknown",
    levelText: "未知级",
    category: "PH",
    categoryName: "物理类",
    org: "IMAC 直辖",
    status: "quarantined",
    statusText: "隔离中",
    survival: "—",
    firstRecord: "安珀历元年",
    featured: false
  }];
  const getInitialCat = () => {
    try {
      let queryStr = routeQuery || "";
      // fallback: read directly from hash
      if (!queryStr) {
        const hash = window.location.hash.slice(1) || "/";
        const qIdx2 = hash.indexOf("?");
        if (qIdx2 >= 0) queryStr = hash.substring(qIdx2 + 1);
      }
      if (queryStr) {
        const params = new URLSearchParams(queryStr);
        const cat = params.get("cat");
        if (cat && ["SP", "TM", "PH", "CG", "EN", "LO", "OB"].includes(cat.toUpperCase())) {
          return cat.toUpperCase();
        }
      }
    } catch (e) {}
    return "all";
  };
  const [catFilter, setCatFilter] = React.useState(getInitialCat);
  const categoryFilters = [{
    key: "all",
    label: "全部",
    code: "ALL",
    color: "var(--text-tertiary)"
  }, {
    key: "SP",
    label: "空间类",
    code: "SP",
    color: "#4a7cb4"
  }, {
    key: "TM",
    label: "时间类",
    code: "TM",
    color: "#7a3ab4"
  }, {
    key: "PH",
    label: "物理类",
    code: "PH",
    color: "#c49a2c"
  }, {
    key: "CG",
    label: "认知类",
    code: "CG",
    color: "#c4782c"
  }, {
    key: "EN",
    label: "实体类",
    code: "EN",
    color: "#c42828"
  }, {
    key: "LO",
    label: "地点类",
    code: "LO",
    color: "#d46828"
  }, {
    key: "OB",
    label: "物品类",
    code: "OB",
    color: "#6a8ca8"
  }];
  const getCategoryColor = code => {
    const map = {
      SP: "#4a7cb4",
      TM: "#7a3ab4",
      PH: "#c49a2c",
      CG: "#c4782c",
      EN: "#c42828",
      LO: "#d46828",
      OB: "#6a8ca8"
    };
    return map[code] || "var(--text-tertiary)";
  };
  const filteredAnomalies = anomalies.filter(a => {
    if (filter !== "all" && a.level !== filter) return false;
    if (catFilter !== "all" && a.category !== catFilter) return false;
    if (search && !a.name.includes(search) && !a.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const levelFilters = [{
    key: "all",
    label: "全部"
  }, {
    key: "ordinary",
    label: "常规级"
  }, {
    key: "hazardous",
    label: "危险级"
  }, {
    key: "doomed",
    label: "厄运级"
  }, {
    key: "abyssal",
    label: "深渊级"
  }, {
    key: "unknown",
    label: "未知级"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .archive-page {
          padding-top: 64px;
          background-color: var(--bg-primary);
          min-height: 100vh;
        }
        .archive-auth-bar {
          background-color: var(--bg-deep);
          border-bottom: 1px solid var(--border-color);
          padding: 12px 0;
          position: sticky;
          top: 64px;
          z-index: 100;
        }
        .archive-auth-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .archive-auth-status {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
        }
        .archive-auth-status .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--level-ordinary);
        }
        .archive-auth-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .archive-logout {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .archive-logout:hover { color: var(--accent-red-bright); }
        .archive-header {
          padding: 60px 0 30px;
          border-bottom: 1px solid var(--border-color);
        }
        .archive-title {
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }
        .archive-subtitle {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 16px;
        }
        .archive-stats {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
        }
        .archive-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .archive-stat-num {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .archive-stat-label {
          font-size: 12px;
          color: var(--text-tertiary);
        }
        .archive-stat-num.red { color: var(--accent-red-bright); }
        .archive-stat-num.purple { color: var(--level-unknown); }
        .archive-filters {
          padding: 24px 0;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .archive-filter-tabs {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        .archive-cat-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .archive-cat-tab {
          padding: 8px 14px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: var(--bg-deep);
        }
        .archive-cat-tab .cat-code {
          font-weight: 700;
          font-size: 12px;
        }
        .archive-cat-tab:hover {
          color: var(--text-primary);
          border-color: var(--border-light);
        }
        .archive-cat-tab.active {
          color: var(--text-primary);
          border-color: var(--cat-color, var(--accent-red-bright));
          background-color: rgba(196, 40, 40, 0.06);
        }
        .archive-cat-tab.active .cat-code {
          color: var(--cat-color, var(--accent-red-bright));
        }
        .archive-filter-tab {
          padding: 6px 14px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.05em;
        }
        .archive-filter-tab:hover {
          color: var(--text-primary);
          border-color: var(--border-light);
        }
        .archive-filter-tab.active {
          color: var(--accent-red-bright);
          border-color: var(--accent-red-bright);
          background-color: rgba(196, 40, 40, 0.08);
        }
        .archive-search {
          position: relative;
        }
        .archive-search-input {
          width: 240px;
          padding: 8px 14px 8px 34px;
          background-color: var(--bg-deep);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 13px;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 0.2s ease;
        }
        .archive-search-input:focus {
          border-color: var(--accent-red-bright);
        }
        .archive-search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: var(--text-muted);
        }
        .archive-list {
          padding: 20px 0 80px;
          display: flex;
          flex-direction: column;
          gap: 1px;
          background-color: var(--border-color);
          border: 1px solid var(--border-color);
          border-top: none;
        }
        .archive-list-header {
          display: grid;
          grid-template-columns: 120px 110px 1.5fr 100px 1.2fr 100px 100px;
          gap: 16px;
          padding: 14px 20px;
          background-color: var(--bg-deep);
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .archive-row {
          display: grid;
          grid-template-columns: 120px 110px 1.5fr 100px 1.2fr 100px 100px;
          gap: 16px;
          padding: 18px 20px;
          background-color: var(--bg-card);
          align-items: center;
          cursor: pointer;
          transition: background-color 0.2s ease;
          position: relative;
        }
        .archive-row:hover {
          background-color: var(--bg-tertiary);
        }
        .archive-row.featured {
          border-left: 3px solid var(--accent-red-bright);
        }
        .archive-row-id {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.05em;
        }
        .archive-row-cat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .archive-row-cat-tag {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .archive-row-cat-name {
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.05em;
        }
        .archive-row-name-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .archive-row-name {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .archive-row-name-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .archive-row-level {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
        }
        .level-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .archive-row-org {
          font-size: 13px;
          color: var(--text-secondary);
        }
        .archive-row-status {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.05em;
        }
        .status-active { color: var(--level-hazardous); }
        .status-resolved { color: var(--level-ordinary); }
        .status-quarantined { color: var(--level-unknown); }
        .archive-row-survival {
          font-family: var(--font-mono);
          font-size: 13px;
          text-align: right;
          font-weight: 700;
        }
        .archive-row-arrow {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          opacity: 0;
          transition: all 0.2s ease;
        }
        .archive-row:hover .archive-row-arrow {
          opacity: 1;
          right: 16px;
        }
        @media (max-width: 1024px) {
          .archive-list-header, .archive-row {
            grid-template-columns: 100px 1.5fr 90px 1fr 80px;
          }
          .archive-list-header > :last-child, .archive-row > :last-child {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .archive-auth-inner, .container { padding: 0 16px; }
          .archive-header { padding: 40px 0 20px; }
          .archive-title { font-size: 26px; }
          .archive-list-header { display: none; }
          .archive-row {
            grid-template-columns: 1fr;
            gap: 8px;
            padding: 16px;
          }
          .archive-row-id { font-size: 12px; }
          .archive-row-name { font-size: 18px; }
          .archive-search-input { width: 200px; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "archive-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "archive-auth-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "archive-auth-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "archive-auth-status"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, "\u5DF2\u8BA4\u8BC1 \xB7 \u8BBF\u95EE\u7EA7\u522B\uFF1A\u6807\u51C6 / ACCESS LEVEL: STANDARD")), /*#__PURE__*/React.createElement("div", {
    className: "archive-auth-actions"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      color: "var(--text-muted)",
      letterSpacing: "0.1em"
    }
  }, "W-0847 \xB7 \u9646\u6C89\u821F"), /*#__PURE__*/React.createElement("span", {
    className: "archive-logout",
    onClick: () => navigate("/")
  }, "\u9000\u51FA\u8BA4\u8BC1")))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "archive-header"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "archive-title"
  }, "\u5F02\u5E38\u4FE1\u606F\u6570\u636E\u5E93"), /*#__PURE__*/React.createElement("div", {
    className: "archive-subtitle"
  }, "ANOMALY INFORMATION DATABASE \xB7 IMAC CENTRAL DATABASE"), /*#__PURE__*/React.createElement("div", {
    className: "archive-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "archive-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "archive-stat-num"
  }, "20,000+"), /*#__PURE__*/React.createElement("span", {
    className: "archive-stat-label"
  }, "\u5DF2\u8BB0\u5F55\u5F02\u5E38")), /*#__PURE__*/React.createElement("div", {
    className: "archive-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "archive-stat-num red"
  }, "47"), /*#__PURE__*/React.createElement("span", {
    className: "archive-stat-label"
  }, "\u6DF1\u6E0A\u7EA7")), /*#__PURE__*/React.createElement("div", {
    className: "archive-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "archive-stat-num purple"
  }, "3"), /*#__PURE__*/React.createElement("span", {
    className: "archive-stat-label"
  }, "\u672A\u77E5\u7EA7")), /*#__PURE__*/React.createElement("div", {
    className: "archive-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "archive-stat-num"
  }, "8"), /*#__PURE__*/React.createElement("span", {
    className: "archive-stat-label"
  }, "\u8BA4\u8BC1\u7EC4\u7EC7")))), /*#__PURE__*/React.createElement("div", {
    className: "archive-cat-tabs"
  }, categoryFilters.map(f => /*#__PURE__*/React.createElement("span", {
    key: f.key,
    className: `archive-cat-tab ${catFilter === f.key ? "active" : ""}`,
    style: {
      "--cat-color": f.color
    },
    onClick: () => setCatFilter(f.key)
  }, /*#__PURE__*/React.createElement("span", {
    className: "cat-code"
  }, f.code), /*#__PURE__*/React.createElement("span", null, f.label)))), /*#__PURE__*/React.createElement("div", {
    className: "archive-filters"
  }, /*#__PURE__*/React.createElement("div", {
    className: "archive-filter-tabs"
  }, levelFilters.map(f => /*#__PURE__*/React.createElement("span", {
    key: f.key,
    className: `archive-filter-tab ${filter === f.key ? "active" : ""}`,
    onClick: () => setFilter(f.key)
  }, f.label))), /*#__PURE__*/React.createElement("div", {
    className: "archive-search"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "archive-search-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21L16.65 16.65"
  })), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "archive-search-input",
    placeholder: "\u641C\u7D22\u7F16\u53F7\u6216\u540D\u79F0...",
    value: search,
    onChange: e => setSearch(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "archive-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "archive-list-header"
  }, /*#__PURE__*/React.createElement("span", null, "\u7F16\u53F7"), /*#__PURE__*/React.createElement("span", null, "\u7C7B\u522B"), /*#__PURE__*/React.createElement("span", null, "\u540D\u79F0"), /*#__PURE__*/React.createElement("span", null, "\u7B49\u7EA7"), /*#__PURE__*/React.createElement("span", null, "\u7BA1\u8F96\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("span", null, "\u72B6\u6001"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right"
    }
  }, "\u751F\u8FD8\u7387")), filteredAnomalies.map(a => {
    const isAbyssal = a.level === "abyssal";
    return /*#__PURE__*/React.createElement(Restricted, {
      key: a.id,
      level: a.accessLevel || "internal",
      label: a.accessLevel === "topsecret" ? "绝密级" : "机密级",
      compact: true
    }, /*#__PURE__*/React.createElement("div", {
      className: `archive-row ${a.featured ? "featured" : ""}`,
      onClick: () => navigate(`/anomaly/${a.id}`)
    }, /*#__PURE__*/React.createElement("div", {
      className: "archive-row-id mono"
    }, a.id), /*#__PURE__*/React.createElement("div", {
      className: "archive-row-cat mono"
    }, /*#__PURE__*/React.createElement("span", {
      className: "archive-row-cat-tag",
      style: {
        color: getCategoryColor(a.category)
      }
    }, a.category), /*#__PURE__*/React.createElement("span", {
      className: "archive-row-cat-name"
    }, a.categoryName)), /*#__PURE__*/React.createElement("div", {
      className: "archive-row-name-group"
    }, /*#__PURE__*/React.createElement("span", {
      className: "archive-row-name"
    }, a.name), /*#__PURE__*/React.createElement("span", {
      className: "archive-row-name-en"
    }, a.nameEn.toUpperCase())), /*#__PURE__*/React.createElement("div", {
      className: `archive-row-level level-text-${a.level}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `level-dot level-${a.level}`
    }), a.levelText), /*#__PURE__*/React.createElement("div", {
      className: "archive-row-org"
    }, a.org), /*#__PURE__*/React.createElement("div", {
      className: `archive-row-status status-${a.status}`
    }, a.status === "active" && "● 活跃", a.status === "resolved" && "● 已解决", a.status === "quarantined" && "● 隔离中"), /*#__PURE__*/React.createElement("div", {
      className: `archive-row-survival ${parseFloat(a.survival) < 10 ? "level-text-abyssal" : parseFloat(a.survival) < 30 ? "level-text-hazardous" : "level-text-ordinary"}`,
      style: {
        "--s": a.survival
      }
    }, a.survival), /*#__PURE__*/React.createElement("span", {
      className: "archive-row-arrow"
    }, "\u2192")));
  })))));
}
window.AnomalyArchivePage = AnomalyArchivePage;;
// Anomaly Detail Page
function AnomalyDetailPage() {
  const {
    navigate
  } = useRouter();
  const [anomalyId, setAnomalyId] = React.useState("LOA-0073");
  React.useEffect(() => {
    const hash = window.location.hash.slice(1);
    const parts = hash.split("/anomaly/");
    if (parts.length > 1) {
      setAnomalyId(parts[1]);
    }
  }, []);

  // Default to LOA-0073 full data; others show placeholder
  const isDefault = anomalyId === "LOA-0073";
  const verifiedRules = [{
    num: "一",
    title: "身份分配",
    desc: "进入者自动获得学生身份与「剧情书」，严重偏离角色设定将触发惩罚。剧情书内容因人而异。"
  }, {
    num: "二",
    title: "区域限制",
    desc: "不可破坏校园建筑与设施。越界进入未开放区域将触发空间排斥，严重者直接消失。"
  }, {
    num: "三",
    title: "宵禁制度",
    desc: "23:00 至次日 6:00 期间必须返回宿舍。夜间外出者死亡率 100%，无例外记录。"
  }, {
    num: "四",
    title: "教学制度",
    desc: "定期进行才能考核。排名第一者可获得「特殊奖励」，内容未知，疑似与离开路径相关。"
  }];
  const speculatedRules = ["时间流速异常，内外时间偏差约 3-7 倍，具体比例不固定", "存在多条可能的离开路径，不限于考核第一", "校长为核心 NPC，掌握异常关键信息", "白玫瑰花园为异常核心区域，进入者极少返回"];
  const buildings = ["主教学楼", "月华阁（宿舍）", "听雪楼（宿舍）", "青藤苑（宿舍）", "观星台（宿舍）", "望山居（宿舍）", "图书馆", "美术馆", "音乐厅", "体育馆", "植物园", "实验楼", "白玫瑰花园（中心）"];
  const entryRecords = [{
    term: "第一届",
    year: "安珀历28年·冬",
    count: 12,
    org: "衔尾蛇事务所",
    result: "全员失踪",
    status: "death"
  }, {
    term: "第二届",
    year: "安珀历29年·春",
    count: 8,
    org: "衔尾蛇事务所",
    result: "2人生还，6人失踪",
    status: "mixed"
  }, {
    term: "第三届",
    year: "安珀历29年·秋",
    count: 15,
    org: "BRI联合考察",
    result: "13人死亡，2人同化",
    status: "death"
  }, {
    term: "第四届",
    year: "安珀历30年·夏",
    count: 10,
    org: "晨星团",
    result: "全员失踪",
    status: "death"
  }, {
    term: "第五届",
    year: "安珀历31年·冬",
    count: 6,
    org: "衔尾蛇事务所",
    result: "1人生还，5人失踪",
    status: "mixed"
  }, {
    term: "第六届",
    year: "安珀历33年·春",
    count: 20,
    org: "BRI/衔尾蛇联合",
    result: "18人死亡，2人生还后死亡",
    status: "death"
  }, {
    term: "第七届",
    year: "安珀历34年·秋",
    count: 9,
    org: "悬铃木学会",
    result: "全员同化",
    status: "assim"
  }, {
    term: "第八届",
    year: "安珀历36年·夏",
    count: 12,
    org: "衔尾蛇事务所",
    result: "10人失踪，2人死亡",
    status: "death"
  }, {
    term: "第九届",
    year: "安珀历37年·冬",
    count: 7,
    org: "长桥会社",
    result: "全员失踪",
    status: "death"
  }, {
    term: "第十届",
    year: "安珀历38年·秋",
    count: 9,
    org: "衔尾蛇事务所",
    result: "1人生还，8人失踪",
    status: "mixed"
  }, {
    term: "第十一届",
    year: "安珀历39年·秋",
    count: 6,
    org: "衔尾蛇事务所 + BRI 联合行动",
    result: "进行中 · 全员失联",
    status: "active",
    current: true,
    members: [{
      name: "沈彻",
      rank: "资深溯界者·执灯",
      org: "衔尾蛇事务所",
      role: "队长 · 行动指挥",
      isLeader: true,
      orgType: "anomalist"
    }, {
      name: "季明轩",
      rank: "溯界者·破界",
      org: "衔尾蛇事务所",
      role: "队员",
      isLeader: false,
      orgType: "anomalist"
    }, {
      name: "顾泽鸣",
      rank: "资深溯界者·执灯",
      org: "边界研究院 BRI",
      role: "队长 · 学术负责",
      isLeader: true,
      orgType: "anomalist"
    }, {
      name: "林薇",
      rank: "溯界者·破界",
      org: "边界研究院 BRI",
      role: "队员 · 外勤侦察",
      isLeader: false,
      orgType: "anomalist"
    }, {
      name: "姜言",
      rank: "平民",
      org: "被卷入民众",
      role: "广告公司职员",
      isLeader: false,
      orgType: "civilian"
    }, {
      name: "苏晚晴",
      rank: "平民",
      org: "被卷入民众",
      role: "大学生",
      isLeader: false,
      orgType: "civilian"
    }]
  }];
  if (!isDefault) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
          .detail-placeholder {
            padding: 100px 0;
            text-align: center;
            min-height: 70vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
          }
          .detail-placeholder-id {
            font-family: var(--font-mono);
            font-size: 48px;
            font-weight: 700;
            color: var(--text-muted);
            letter-spacing: 0.1em;
          }
          .detail-placeholder-text {
            font-size: 16px;
            color: var(--text-secondary);
          }
          .detail-back-link {
            font-family: var(--font-mono);
            font-size: 12px;
            color: var(--accent-red-bright);
            cursor: pointer;
            margin-top: 20px;
            border-bottom: 1px solid var(--accent-red-bright);
            padding-bottom: 2px;
          }
        `), /*#__PURE__*/React.createElement("div", {
      className: "archive-page"
    }, /*#__PURE__*/React.createElement("div", {
      className: "archive-auth-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "archive-auth-inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "archive-auth-status"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dot"
    }), /*#__PURE__*/React.createElement("span", null, "\u5DF2\u8BA4\u8BC1 \xB7 \u8BBF\u95EE\u7EA7\u522B\uFF1A\u6807\u51C6")), /*#__PURE__*/React.createElement("span", {
      className: "archive-logout",
      onClick: () => navigate("/")
    }, "\u9000\u51FA\u8BA4\u8BC1"))), /*#__PURE__*/React.createElement("div", {
      className: "container detail-placeholder"
    }, /*#__PURE__*/React.createElement("div", {
      className: "detail-placeholder-id mono"
    }, anomalyId), /*#__PURE__*/React.createElement("div", {
      className: "detail-placeholder-text"
    }, "\u8BE5\u5F02\u5E38\u8BB0\u5F55\u8BE6\u60C5\u6682\u672A\u516C\u5F00"), /*#__PURE__*/React.createElement("div", {
      className: "detail-placeholder-text",
      style: {
        fontSize: "13px",
        color: "var(--text-muted)"
      }
    }, "\u4EC5\u4F5C\u5217\u8868\u6F14\u793A \xB7 \u5B8C\u6574\u6863\u6848\u8BF7\u67E5\u770B LOA-0073 \u8D64\u6708\u5B66\u9662"), /*#__PURE__*/React.createElement("span", {
      className: "detail-back-link",
      onClick: () => navigate("/anomaly-archive")
    }, "\u2190 \u8FD4\u56DE\u6863\u6848\u5217\u8868"))));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .detail-page {
          padding-top: 64px;
          background-color: #08080a;
          min-height: 100vh;
        }
        .detail-auth-bar {
          background-color: var(--bg-deep);
          border-bottom: 1px solid var(--border-color);
          padding: 12px 0;
          position: sticky;
          top: 64px;
          z-index: 100;
        }
        .detail-auth-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .detail-auth-status {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
        }
        .detail-auth-status .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--level-ordinary);
        }
        .detail-breadcrumbs {
          padding: 24px 0;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .detail-crumb {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          cursor: pointer;
          letter-spacing: 0.1em;
          transition: color 0.2s ease;
        }
        .detail-crumb:hover { color: var(--accent-red-bright); }
        .detail-crumb.current {
          color: var(--text-primary);
          cursor: default;
        }
        .detail-crumb-sep {
          color: var(--text-muted);
          font-size: 12px;
        }
        .detail-body {
          padding: 40px 0 80px;
          position: relative;
        }
        .detail-file-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid var(--accent-red);
          flex-wrap: wrap;
          gap: 20px;
        }
        .detail-title-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .detail-file-id {
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 700;
          color: var(--accent-red-bright);
          letter-spacing: 0.1em;
        }
        .detail-title {
          font-family: var(--font-serif);
          font-size: 42px;
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: 0.08em;
        }
        .detail-title-en {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
        }
        /* Info table */
        .detail-info-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 40px;
          background-color: rgba(20, 20, 24, 0.5);
          border: 1px solid var(--border-color);
        }
        .detail-info-table th, .detail-info-table td {
          padding: 14px 20px;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
          font-size: 14px;
        }
        .detail-info-table th {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          background-color: rgba(139, 26, 26, 0.08);
          width: 18%;
          border-right: 1px solid var(--border-color);
        }
        .detail-info-table tr:last-child th,
        .detail-info-table tr:last-child td {
          border-bottom: none;
        }
        .level-badge-inline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 14px;
          background-color: rgba(196, 40, 40, 0.15);
          border: 1px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }
        .level-badge-inline::before {
          content: "";
          width: 8px;
          height: 8px;
          background-color: var(--accent-red-bright);
          box-shadow: 0 0 8px var(--accent-red-bright);
        }
        .status-active-text {
          color: var(--level-hazardous);
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }
        .survival-rate-red {
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-weight: 700;
        }
        /* File sections */
        .file-section { margin-bottom: 36px; }
        .file-section-header {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 16px; padding-bottom: 10px;
          border-bottom: 1px solid var(--border-color);
        }
        .file-section-num {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--accent-red-bright); letter-spacing: 0.1em;
          width: 40px;
        }
        .file-section-title {
          font-family: var(--font-serif); font-size: 20px;
          font-weight: 700; color: var(--text-primary);
        }
        .file-section-text {
          font-size: 14px; line-height: 1.9;
          color: var(--text-secondary); padding-left: 52px;
        }
        .file-section-text p { margin-bottom: 12px; }
        .file-section-text p:last-child { margin-bottom: 0; }
        .file-section-text strong { color: var(--text-primary); font-weight: 500; }
        .buildings-grid {
          display: flex; flex-wrap: wrap; gap: 8px;
          padding-left: 52px;
        }
        .building-tag {
          padding: 6px 14px;
          background-color: rgba(74, 88, 104, 0.1);
          border: 1px solid var(--steel-blue-dark);
          font-size: 12px; color: var(--steel-blue-light);
          font-family: var(--font-mono); letter-spacing: 0.05em;
        }
        .building-tag.core {
          border-color: var(--accent-red);
          color: var(--accent-red-bright);
          background-color: rgba(139, 26, 26, 0.1);
        }
        .rules-list {
          display: flex; flex-direction: column; gap: 12px;
          padding-left: 52px;
        }
        .rule-item {
          display: flex; gap: 16px;
          padding: 16px 20px;
          background-color: rgba(20, 20, 24, 0.4);
          border-left: 3px solid;
        }
        .rule-item.verified { border-left-color: var(--level-ordinary); }
        .rule-item.speculated { border-left-color: var(--text-muted); }
        .rule-num {
          font-family: var(--font-serif); font-size: 24px;
          font-weight: 700; color: var(--text-tertiary);
          line-height: 1; flex-shrink: 0; width: 36px;
        }
        .rule-content { flex: 1; }
        .rule-title {
          font-size: 15px; font-weight: 600;
          color: var(--text-primary); margin-bottom: 4px;
          display: flex; align-items: center; gap: 10px;
        }
        .rule-tag {
          font-family: var(--font-mono); font-size: 10px;
          padding: 2px 8px; letter-spacing: 0.1em;
          border: 1px solid;
        }
        .rule-item.verified .rule-tag {
          color: var(--level-ordinary); border-color: var(--level-ordinary);
        }
        .rule-item.speculated .rule-tag {
          color: var(--text-muted); border-color: var(--text-muted);
        }
        .rule-desc {
          font-size: 13px; color: var(--text-secondary); line-height: 1.7;
        }
        .speculated-list {
          padding-left: 52px; list-style: none;
        }
        .speculated-list li {
          position: relative; padding-left: 20px;
          font-size: 13px; color: var(--text-tertiary); line-height: 1.8;
        }
        .speculated-list li::before {
          content: "?"; position: absolute; left: 0; top: 0;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-muted);
        }
        .entry-records {
          width: calc(100% - 52px);
          margin-left: 52px;
          border-collapse: collapse;
          font-size: 13px;
        }
        .entry-records th {
          font-family: var(--font-mono); font-size: 11px;
          font-weight: 500; color: var(--text-tertiary);
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 12px 14px; text-align: left;
          border-bottom: 1px solid var(--border-color);
          background-color: rgba(139, 26, 26, 0.05);
        }
        .entry-records td {
          padding: 12px 14px;
          border-bottom: 1px solid rgba(42, 42, 50, 0.5);
          color: var(--text-secondary);
        }
        .entry-records tr:hover td {
          background-color: rgba(255, 255, 255, 0.02);
        }
        .entry-records .term {
          font-family: var(--font-serif); font-weight: 600;
          color: var(--text-primary);
        }
        .entry-records .count { font-family: var(--font-mono); }
        .entry-records .death {
          color: var(--accent-red-bright);
          font-family: var(--font-mono); font-weight: 700;
        }
        .entry-records .mixed {
          color: var(--level-hazardous);
          font-family: var(--font-mono); font-weight: 500;
        }
        .entry-records .assim {
          color: var(--level-unknown);
          font-family: var(--font-mono); font-weight: 500;
        }
        .entry-records .active {
          color: var(--level-ordinary);
          font-family: var(--font-mono); font-weight: 500;
        }
        .entry-records .current-tag {
          display: inline-block;
          margin-left: 8px;
          padding: 1px 6px;
          font-size: 10px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
          background-color: rgba(196, 40, 40, 0.15);
          border: 1px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          vertical-align: middle;
        }
        .current-members-row td {
          padding: 0 !important;
          border-bottom: 1px solid var(--border-color) !important;
          background-color: rgba(196, 40, 40, 0.04) !important;
        }
        .current-members-label {
          padding: 16px 20px 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
        }
        .current-members-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          padding: 0 20px 20px;
        }
        .member-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 12px 14px;
          position: relative;
          transition: all 0.2s ease;
        }
        .member-card.member-leader {
          border-color: var(--accent-red-bright);
          background: linear-gradient(135deg, rgba(196, 40, 40, 0.1), var(--bg-card));
        }
        .member-card.member-civilian {
          border-style: dashed;
          border-color: rgba(196, 154, 44, 0.5);
          background: linear-gradient(135deg, rgba(196, 154, 44, 0.05), var(--bg-card));
        }
        .member-name {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .member-leader-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 600;
          color: var(--accent-red-bright);
          border: 1px solid var(--accent-red-bright);
          padding: 1px 5px;
          letter-spacing: 0.1em;
          line-height: 1.4;
        }
        .member-civilian-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 500;
          color: #c49a2c;
          border: 1px solid rgba(196, 154, 44, 0.6);
          padding: 1px 5px;
          letter-spacing: 0.1em;
          line-height: 1.4;
        }
        .member-civilian .member-rank {
          color: #c49a2c;
        }
        .member-rank {
          font-size: 11px;
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }
        .member-org {
          font-size: 11px;
          color: var(--text-tertiary);
          margin-bottom: 2px;
        }
        .member-role {
          font-size: 11px;
          color: var(--text-secondary);
        }
        @media (max-width: 700px) {
          .current-members-grid { grid-template-columns: 1fr 1fr; }
        }
        .phenomena-list {
          padding-left: 52px; list-style: none;
        }
        .phenomena-list li {
          position: relative; padding-left: 24px;
          font-size: 13px; color: var(--text-secondary);
          line-height: 1.8; margin-bottom: 8px;
        }
        .phenomena-list li::before {
          content: "◆"; position: absolute; left: 0; top: 0;
          color: var(--accent-red-bright); font-size: 10px;
        }
        .phenomena-list strong { color: var(--text-primary); }
        .note-box {
          margin-left: 52px;
          padding: 20px 24px;
          background-color: rgba(139, 26, 26, 0.05);
          border: 1px solid rgba(196, 40, 40, 0.3);
          position: relative;
        }
        .note-box::before {
          content: "IMAC NOTE";
          position: absolute; top: -10px; left: 20px;
          background-color: #08080a;
          padding: 0 10px;
          font-family: var(--font-mono); font-size: 10px;
          color: var(--accent-red-bright); letter-spacing: 0.15em;
        }
        .note-text {
          font-size: 13px; color: var(--text-secondary);
          line-height: 1.8; font-style: italic;
        }
        .internal-note {
          margin-left: 52px; margin-top: 20px;
          padding: 20px 24px;
          background-color: rgba(122, 58, 176, 0.05);
          border: 1px solid rgba(122, 58, 176, 0.3);
          position: relative;
        }
        .internal-note::before {
          content: "内部评估 · INTERNAL";
          position: absolute; top: -10px; left: 20px;
          background-color: #08080a;
          padding: 0 10px;
          font-family: var(--font-mono); font-size: 10px;
          color: var(--level-unknown); letter-spacing: 0.15em;
        }
        .internal-note-text {
          font-size: 13px; color: var(--text-secondary); line-height: 1.8;
        }
        .internal-note-signature {
          margin-top: 12px; text-align: right;
          font-family: var(--font-serif); font-size: 13px;
          color: var(--text-tertiary); font-style: italic;
        }
        .file-footer {
          margin-top: 50px; padding-top: 20px;
          border-top: 2px solid var(--accent-red);
          display: flex; justify-content: space-between;
          align-items: center; flex-wrap: wrap; gap: 16px;
        }
        .file-meta {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--text-muted); letter-spacing: 0.1em;
        }
        @media (max-width: 1024px) {
          .file-section-text, .buildings-grid, .rules-list,
          .speculated-list, .phenomena-list, .note-box, .internal-note {
            padding-left: 0; margin-left: 0;
          }
          .entry-records { margin-left: 0; width: 100%; }
          .detail-info-table th { width: 25%; }
        }
        @media (max-width: 768px) {
          .detail-title { font-size: 28px; }
          .detail-file-header { flex-direction: column; align-items: flex-start; }
          .detail-info-table { display: block; overflow-x: auto; }
          .entry-records { display: block; overflow-x: auto; white-space: nowrap; }
          .detail-auth-inner, .container { padding: 0 16px; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "detail-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-auth-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-auth-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-auth-status"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, "\u5DF2\u8BA4\u8BC1 \xB7 \u8BBF\u95EE\u7EA7\u522B\uFF1A\u6807\u51C6 / ACCESS LEVEL: STANDARD")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      color: "var(--text-muted)",
      cursor: "pointer",
      letterSpacing: "0.1em"
    },
    onClick: () => navigate("/")
  }, "\u9000\u51FA\u8BA4\u8BC1"))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-breadcrumbs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-crumb",
    onClick: () => navigate("/")
  }, "\u9996\u9875"), /*#__PURE__*/React.createElement("span", {
    className: "detail-crumb-sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "detail-crumb",
    onClick: () => navigate("/database")
  }, "\u5F02\u5E38\u4FE1\u606F\u6570\u636E\u5E93"), /*#__PURE__*/React.createElement("span", {
    className: "detail-crumb-sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "detail-crumb current"
  }, "LOA-0073 \u8D64\u6708\u5B66\u9662")), /*#__PURE__*/React.createElement("div", {
    className: "detail-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-file-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-file-id"
  }, "LOA-0073"), /*#__PURE__*/React.createElement("h1", {
    className: "detail-title"
  }, "\u8D64\u6708\u5B66\u9662"), /*#__PURE__*/React.createElement("span", {
    className: "detail-title-en"
  }, "CRIMSON MOON ACADEMY \xB7 ABYSSAL")), /*#__PURE__*/React.createElement("div", {
    className: "stamp"
  }, "\u7EDD\u5BC6 \xB7 EYES ONLY")), /*#__PURE__*/React.createElement("table", {
    className: "detail-info-table"
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u5F02\u5E38\u7F16\u53F7"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "detail-file-id",
    style: {
      fontSize: "18px"
    }
  }, "LOA-0073")), /*#__PURE__*/React.createElement("th", null, "\u540D\u79F0"), /*#__PURE__*/React.createElement("td", null, "\u8D64\u6708\u5B66\u9662 \xB7 Crimson Moon Academy")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u6240\u5C5E\u7BA1\u8F96"), /*#__PURE__*/React.createElement("td", null, "\u8854\u5C3E\u86C7\u4E8B\u52A1\u6240 \xB7 Ouroboros Agency"), /*#__PURE__*/React.createElement("th", null, "\u9996\u6B21\u8BB0\u5F55"), /*#__PURE__*/React.createElement("td", null, "\u5B89\u73C0\u538628\u5E74 \xB7 \u79CB")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u5F02\u5E38\u7B49\u7EA7"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "level-badge-inline"
  }, "\u6DF1\u6E0A\u7EA7 \xB7 ABYSSAL")), /*#__PURE__*/React.createElement("th", null, "\u5F53\u524D\u72B6\u6001"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "status-active-text"
  }, "\u25CF \u6D3B\u8DC3 ACTIVE"))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u751F\u8FD8\u7387"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "survival-rate-red"
  }, "\u7EA6 1.7%"), " \uFF08116\u4EBA\u8FDB\u5165\uFF0C2\u4EBA\u751F\u8FD8\u540E\u6B7B\u4EA1\uFF09"), /*#__PURE__*/React.createElement("th", null, "\u6863\u6848\u66F4\u65B0"), /*#__PURE__*/React.createElement("td", null, "\u5B89\u73C0\u538639\u5E74 \xB7 \u79CB")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u5F53\u524D\u6279\u6B21"), /*#__PURE__*/React.createElement("td", {
    style: {
      color: "var(--accent-red-bright)"
    },
    colSpan: 3
  }, "\u7B2C\u5341\u4E00\u5C4A \xB7 \u8FDB\u884C\u4E2D \xB7 IMAC\u8054\u5408\u884C\u52A8\uFF08\u8854\u5C3E\u86C7+BRI\u8054\u5408\u6D3E\u9063 \xB7 6\u4EBA \xB7 \u5168\u5458\u5931\u8054\uFF09")))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 01"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u53D1\u73B0\u7ECF\u8FC7")), /*#__PURE__*/React.createElement("div", {
    className: "file-section-text"
  }, /*#__PURE__*/React.createElement("p", null, "\u5B89\u73C0\u538628\u5E74\u79CB\uFF0C\u9E23\u6D77\u57CE\u897F\u533A\u4E00\u6240\u5E9F\u5F03\u4E2D\u5B66\u539F\u5740\u4E0A\u7A81\u7136\u51FA\u73B0\u4E86\u5B8C\u6574\u7684\u6821\u56ED\u5EFA\u7B51\u7FA4\u3002 \u5F53\u5730\u5C45\u6C11\u62A5\u544A\u79F0\u524D\u4E00\u65E5\u8BE5\u5904\u8FD8\u662F\u4E00\u7247\u62C6\u8FC1\u5DE5\u5730\uFF0C\u4E00\u591C\u4E4B\u95F4\u51FA\u73B0\u4E86\u5360\u5730\u7EA6\u4E09\u4E07\u5E73\u65B9\u7C73\u7684\u5B66\u9662\u5EFA\u7B51\u3002 \u9996\u6279\u8FDB\u5165\u8C03\u67E5\u7684\u4E94\u540D\u8B66\u5458\u65E0\u4E00\u8FD4\u56DE\u3002\u8854\u5C3E\u86C7\u4E8B\u52A1\u6240\u63A5\u7BA1\u540E\uFF0C\u6D3E\u51FA\u7B2C\u4E00\u652F\u5341\u4E8C\u4EBA\u4E13\u4E1A\u961F\u4F0D\uFF0C \u540C\u6837\u5168\u5458\u5931\u8E2A\u3002\u81F3\u6B64\u786E\u8BA4\u4E3AS\u7EA7\u4EE5\u4E0A\u5F02\u5E38\uFF0C\u540E\u7ECF\u91CD\u65B0\u8BC4\u7EA7\u5B9A\u4E3A\u6DF1\u6E0A\u7EA7\u3002"), /*#__PURE__*/React.createElement("p", null, "\u5F02\u5E38\u5165\u53E3\u4F4D\u7F6E\u4E0D\u56FA\u5B9A\uFF0C\u6709\u65F6\u662F\u4E00\u6247\u95E8\uFF0C\u6709\u65F6\u662F\u4E00\u9762\u5899\uFF0C\u751A\u81F3\u53EF\u80FD\u662F\u5730\u94C1\u8F66\u53A2\u7684\u67D0\u4E00\u8282\u3002 \u88AB\u62C9\u5165\u8005\u7684\u5171\u540C\u7279\u5F81\u662F\u300C\u6B63\u5728\u72EC\u5904\u300D\u2014\u2014\u8FD9\u662F\u76EE\u524D\u552F\u4E00\u53EF\u786E\u8BA4\u7684\u9009\u53D6\u89C4\u5F8B\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 02"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u57FA\u672C\u7279\u5F81")), /*#__PURE__*/React.createElement("div", {
    className: "file-section-text"
  }, /*#__PURE__*/React.createElement("p", null, "\u8D64\u6708\u5B66\u9662\u662F\u4E00\u5EA7\u5178\u578B\u7684", /*#__PURE__*/React.createElement("strong", null, "\u53D9\u4E8B\u578B\u5F02\u5E38"), "\u3002\u8FDB\u5165\u8005\u4F1A\u88AB\u5206\u914D\u4E00\u4E2A\u300C\u5B66\u751F\u300D\u8EAB\u4EFD\uFF0C \u5E76\u83B7\u5F97\u5C5E\u4E8E\u81EA\u5DF1\u7684\u300C\u5267\u60C5\u4E66\u300D\u3002\u5267\u60C5\u4E66\u5185\u5BB9\u56E0\u4EBA\u800C\u5F02\uFF0C\u8BB0\u8F7D\u4E86\u8BE5\u89D2\u8272\u5728\u6821\u56ED\u4E2D\u7684\u8EAB\u4EFD\u3001 \u4EBA\u9645\u5173\u7CFB\u3001\u4EE5\u53CA\u9700\u8981\u5B8C\u6210\u7684\u300C\u5267\u60C5\u4EFB\u52A1\u300D\u3002\u4E25\u91CD\u504F\u79BB\u5267\u60C5\u8BBE\u5B9A\u5C06\u89E6\u53D1\u60E9\u7F5A\u3002"), /*#__PURE__*/React.createElement("p", null, "\u5F02\u5E38\u7684\u5929\u7A7A\u6C38\u8FDC\u662F\u6697\u7EA2\u8272\u7684\uFF0C\u60AC\u6302\u7740\u4E00\u8F6E\u5DE8\u5927\u7684\u7EA2\u8272\u6708\u4EAE\u2014\u2014\u8FD9\u4E5F\u662F\u300C\u8D64\u6708\u5B66\u9662\u300D\u540D\u79F0\u7684\u7531\u6765\u3002 \u6708\u4EAE\u7684\u5927\u5C0F\u548C\u4F4D\u7F6E\u4F1A\u53D8\u5316\uFF0C\u4F46\u6C38\u8FDC\u4E0D\u4F1A\u843D\u4E0B\u3002\u5F02\u5E38\u5185\u90E8\u6CA1\u6709\u592A\u9633\uFF0C\u4E5F\u6CA1\u6709\u663C\u591C\u4EA4\u66FF\uFF0C \u65F6\u95F4\u901A\u8FC7\u949F\u697C\u7684\u949F\u58F0\u548C\u5BBF\u820D\u7184\u706F\u6765\u6807\u8BB0\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 03"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u5185\u90E8\u73AF\u5883 \xB7 \u5B66\u9662\u5E73\u9762\u56FE"), /*#__PURE__*/React.createElement("span", {
    className: "tag danger"
  }, "\u4EA4\u4E92\u5730\u56FE \xB7 INTERACTIVE")), /*#__PURE__*/React.createElement("div", {
    className: "academy-map-wrapper"
  }, /*#__PURE__*/React.createElement(Restricted, {
    level: "internal",
    label: "\u673A\u5BC6\u7EA7\u5185\u5BB9"
  }, /*#__PURE__*/React.createElement(AcademyMap, null)))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 04"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u5DF2\u786E\u8BA4\u89C4\u5219"), /*#__PURE__*/React.createElement("span", {
    className: "tag verified"
  }, "\u5DF2\u9A8C\u8BC1 \xB7 VERIFIED")), /*#__PURE__*/React.createElement("div", {
    className: "rules-list"
  }, verifiedRules.map(rule => /*#__PURE__*/React.createElement("div", {
    key: rule.num,
    className: "rule-item verified"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rule-num"
  }, rule.num), /*#__PURE__*/React.createElement("div", {
    className: "rule-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rule-title"
  }, "\u89C4\u5219", rule.num, "\uFF1A", rule.title, /*#__PURE__*/React.createElement("span", {
    className: "rule-tag"
  }, "\u5DF2\u9A8C\u8BC1")), /*#__PURE__*/React.createElement("p", {
    className: "rule-desc"
  }, rule.desc)))))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 05"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u63A8\u6D4B\u89C4\u5219"), /*#__PURE__*/React.createElement("span", {
    className: "tag pending"
  }, "\u5F85\u9A8C\u8BC1 \xB7 UNCONFIRMED")), /*#__PURE__*/React.createElement("ul", {
    className: "speculated-list"
  }, speculatedRules.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, r)))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 06"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u8FDB\u5165\u8BB0\u5F55")), /*#__PURE__*/React.createElement("table", {
    className: "entry-records"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u5C4A\u6B21"), /*#__PURE__*/React.createElement("th", null, "\u5E74\u4EFD"), /*#__PURE__*/React.createElement("th", null, "\u8FDB\u5165\u4EBA\u6570"), /*#__PURE__*/React.createElement("th", null, "\u4E3B\u5BFC\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("th", null, "\u7ED3\u679C"))), /*#__PURE__*/React.createElement("tbody", null, entryRecords.map(rec => /*#__PURE__*/React.createElement(React.Fragment, {
    key: rec.term
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    className: "term"
  }, rec.term, rec.current && /*#__PURE__*/React.createElement("span", {
    className: "current-tag"
  }, "\u5F53\u524D")), /*#__PURE__*/React.createElement("td", null, rec.year), /*#__PURE__*/React.createElement("td", {
    className: "count"
  }, rec.count), /*#__PURE__*/React.createElement("td", null, rec.org), /*#__PURE__*/React.createElement("td", {
    className: rec.status
  }, rec.result)), rec.current && rec.members && /*#__PURE__*/React.createElement("tr", {
    className: "current-members-row"
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: 5
  }, /*#__PURE__*/React.createElement("div", {
    className: "current-members-label"
  }, "\u961F\u5458\u6784\u6210 \xB7 TEAM ROSTER"), /*#__PURE__*/React.createElement("div", {
    className: "current-members-grid"
  }, rec.members.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `member-card ${m.isLeader ? "member-leader" : ""} ${m.orgType === "civilian" ? "member-civilian" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "member-name"
  }, m.name, m.isLeader && /*#__PURE__*/React.createElement("span", {
    className: "member-leader-tag"
  }, "\u961F\u957F"), m.orgType === "civilian" && /*#__PURE__*/React.createElement("span", {
    className: "member-civilian-tag"
  }, "\u5E73\u6C11")), /*#__PURE__*/React.createElement("div", {
    className: "member-rank"
  }, m.rank), /*#__PURE__*/React.createElement("div", {
    className: "member-org"
  }, m.org), /*#__PURE__*/React.createElement("div", {
    className: "member-role"
  }, m.role))))))))))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 07"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u7279\u6B8A\u73B0\u8C61")), /*#__PURE__*/React.createElement("ul", {
    className: "phenomena-list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u89C4\u5219\u81EA\u6211\u4FEE\u6B63\u8FF9\u8C61\uFF1A"), "\u7B2C\u56DB\u5C4A\u8FDB\u5165\u540E\uFF0C\u300C\u5267\u60C5\u4E66\u300D\u7684\u5185\u5BB9\u660E\u663E\u6BD4\u7B2C\u4E00\u5C4A\u66F4\u4E3A\u590D\u6742\u548C\u7CBE\u7EC6\uFF0C\u7591\u4F3C\u5F02\u5E38\u5177\u6709\u5B66\u4E60\u548C\u8FDB\u5316\u80FD\u529B\u3002"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u751F\u8FD8\u8005\u5171\u6027\u540E\u9057\u75C7\uFF1A"), "\u4EC5\u6709\u7684\u4E24\u540D\u4E49\u751F\u8FD8\u8005\u5747\u5728\u8FD4\u56DE\u540E\u4E09\u5E74\u5185\u6B7B\u4EA1\uFF0C\u6B7B\u56E0\u5747\u4E3A\u300C\u5728\u7761\u68A6\u4E2D\u505C\u6B62\u547C\u5438\u300D\u3002\u5C38\u68C0\u65E0\u5F02\u5E38\u3002"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u62C9\u5165\u673A\u5236\u4E0D\u53EF\u9884\u6D4B\uFF1A"), "\u5165\u53E3\u51FA\u73B0\u5B8C\u5168\u968F\u673A\uFF0C\u53D7\u5BB3\u8005\u53EF\u80FD\u5728\u5BB6\u4E2D\u3001\u529E\u516C\u5BA4\u3001\u751A\u81F3\u884C\u9A76\u7684\u8F66\u8F86\u4E2D\u88AB\u62C9\u5165\u3002\u65E0\u9884\u8B66\u65F6\u95F4\u3002"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u300C\u767D\u73AB\u7470\u300D\u73B0\u8C61\uFF1A"), "\u591A\u540D\u751F\u8FD8\u8005\uFF08\u542B\u6B7B\u540E\uFF09\u7684\u79C1\u4EBA\u7269\u54C1\u4E2D\u53D1\u73B0\u4E86\u5E72\u71E5\u7684\u767D\u8272\u73AB\u7470\u82B1\u74E3\uFF0C\u6765\u6E90\u4E0D\u660E\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 08"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u5907\u6CE8")), /*#__PURE__*/React.createElement("div", {
    className: "note-box"
  }, /*#__PURE__*/React.createElement("p", {
    className: "note-text"
  }, "\u8D64\u6708\u5B66\u9662\u662F\u76EE\u524D\u5DF2\u77E5\u6301\u7EED\u65F6\u95F4\u6700\u957F\u3001\u81F4\u6B7B\u7387\u6700\u9AD8\u7684\u6DF1\u6E0A\u7EA7\u5F02\u5E38\u4E4B\u4E00\u3002 \u9274\u4E8E\u5176\u4E0D\u53EF\u9884\u6D4B\u7684\u62C9\u5165\u673A\u5236\u548C\u6781\u9AD8\u7684\u6B7B\u4EA1\u7387\uFF0CIMAC \u534F\u8C03\u529E\u516C\u5BA4\u5DF2\u5C06\u5176\u5217\u4E3A \u300C\u4F18\u5148\u7EA7-\u963F\u5C14\u6CD5\u300D\u89C2\u5BDF\u5BF9\u8C61\u3002\u4EFB\u4F55\u7EC4\u7EC7\u5728\u91C7\u53D6\u884C\u52A8\u524D\u5FC5\u987B\u63D0\u4EA4\u5B8C\u6574\u65B9\u6848\u5E76\u83B7\u5F97 IMAC \u5BA1\u6279\u3002 \u672A\u7ECF\u6388\u6743\u7684\u79C1\u81EA\u8FDB\u5165\u5C06\u88AB\u89C6\u4E3A\u4E25\u91CD\u8FDD\u89C4\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "internal-note"
  }, /*#__PURE__*/React.createElement(Restricted, {
    level: "internal",
    label: "\u673A\u5BC6\u7EA7\u5185\u5BB9",
    compact: true
  }, /*#__PURE__*/React.createElement("p", {
    className: "internal-note-text"
  }, "\u3010\u8854\u5C3E\u86C7\u4E8B\u52A1\u6240\u5185\u90E8\u8BC4\u4F30 \xB7 \u9996\u5E2D\u6EAF\u754C\u8005 \u9646\u6C89\u821F\u3011", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u8D64\u6708\u5B66\u9662\u4E0D\u662F\u4E00\u4E2A\u300C\u9677\u9631\u300D\u3002\u5B83\u662F\u4E00\u4E2A\u300C\u8C1C\u9898\u300D\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u5341\u4E00\u5C4A\u8FDB\u5165\uFF0C\u4E00\u767E\u4E00\u5341\u516D\u4EBA\uFF0C\u6CA1\u6709\u4E00\u4E2A\u4EBA\u662F\u88AB\u89C4\u5219\u76F4\u63A5\u6740\u6B7B\u7684\u2014\u2014\u4ED6\u4EEC\u8981\u4E48\u5931\u8E2A\uFF0C\u8981\u4E48\u300C\u5267\u60C5\u5931\u8D25\u300D\u540E\u6D88\u5931\uFF0C\u8981\u4E48\u540C\u5316\u3002 \u8FD9\u4E0D\u7B26\u5408\u5E38\u89C4\u6DF1\u6E0A\u7EA7\u5F02\u5E38\u7684\u884C\u4E3A\u6A21\u5F0F\u3002\u5E38\u89C4\u6DF1\u6E0A\u7EA7\u5F02\u5E38\u662F\u300C\u4E3B\u52A8\u6740\u4EBA\u300D\u7684\uFF0C\u800C\u8D64\u6708\u5B66\u9662\u66F4\u50CF\u662F\u5728", /*#__PURE__*/React.createElement("em", {
    style: {
      color: "var(--text-primary)"
    }
  }, " \u300C\u7B5B\u9009\u300D"), "\u4EC0\u4E48\u4E1C\u897F\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u767D\u73AB\u7470\u82B1\u56ED\u662F\u5173\u952E\u3002\u6240\u6709\u63A5\u8FD1\u8FC7\u6838\u5FC3\u533A\u57DF\u7684\u4EBA\uFF0C\u5373\u4F7F\u56DE\u6765\u4E86\uFF0C\u4E5F\u90FD\u53D8\u4E86\u3002", /*#__PURE__*/React.createElement("br", null), "\u6211\u6709\u4E00\u79CD\u611F\u89C9\u2014\u2014\u8FD9\u5EA7\u5B66\u9662\u5728\u7B49\u5F85\u67D0\u4E2A\u4EBA\u3002\u6216\u8005\u8BF4\uFF0C\u5728\u7B49\u67D0\u4E2A\u300C\u5B66\u751F\u300D\u6BD5\u4E1A\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u8FD9\u662F\u6700\u540E\u7684\u8C1C\u9898\u3002\u4E5F\u662F\u6211\u4EEC\u5FC5\u987B\u89E3\u5F00\u7684\u8C1C\u9898\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "internal-note-signature"
  }, "\u2014 \u9646\u6C89\u821F \xB7 \u9996\u5E2D\u6EAF\u754C\u8005 \xB7 \u754C\u6807")))), /*#__PURE__*/React.createElement("div", {
    className: "file-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-meta"
  }, "FILE ID: LOA-0073 / VER: 39.2 / CLASSIFICATION: EYES ONLY"), /*#__PURE__*/React.createElement("div", {
    className: "file-meta"
  }, "LAST UPDATED: \u5B89\u73C0\u538639\u5E74\xB7\u6625"))))));
}
window.AnomalyDetailPage = AnomalyDetailPage;;
// Media Auth Page - redirects to unified auth
function MediaAuthPage() {
  const {
    navigate
  } = useRouter();
  React.useEffect(() => {
    navigate("/auth");
  }, [navigate]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "120px 0",
      textAlign: "center",
      color: "var(--text-secondary)"
    }
  }, "\u6B63\u5728\u8DF3\u8F6C\u81F3\u7EDF\u4E00\u8BA4\u8BC1\u9875...");
}
window.MediaAuthPage = MediaAuthPage;;
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
window.MediaGuidelinesPage = MediaGuidelinesPage;;
function App() {
  const {
    route
  } = useRouter();
  const [scrolled, setScrolled] = React.useState(false);
  const [showBackTop, setShowBackTop] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Route matching — strip query string for matching, keep it for props
  const qIdx = route.indexOf("?");
  const routePath = qIdx >= 0 ? route.substring(0, qIdx) : route;
  const routeQuery = qIdx >= 0 ? route.substring(qIdx + 1) : "";
  let PageComponent;
  let pageKey = routePath;
  let routeProps = {};
  if (routePath === "/" || routePath === "" || routePath.startsWith("/#")) {
    PageComponent = HomePage;
    pageKey = "home";
  } else if (routePath === "/portal") {
    PageComponent = PortalPage;
  } else if (routePath === "/profile-center") {
    PageComponent = ProfileCenterPage;
  } else if (routePath === "/register") {
    PageComponent = RegisterPage;
  } else if (routePath === "/mailbox") {
    PageComponent = MailboxPage;
  } else if (routePath === "/admin") {
    PageComponent = AdminPage;
  } else if (routePath === "/guide") {
    PageComponent = GuidePage;
  } else if (routePath === "/organizations") {
    PageComponent = OrganizationsPage;
  } else if (routePath.startsWith("/org/")) {
    PageComponent = OrgDetailPage;
    const slug = routePath.replace("/org/", "");
    routeProps = {
      orgSlug: slug
    };
    pageKey = `org-${slug}`;
  } else if (routePath === "/news") {
    PageComponent = NewsPage;
  } else if (routePath === "/auth") {
    PageComponent = AuthPage;
  } else if (routePath === "/join") {
    PageComponent = JoinPage;
  } else if (routePath === "/anomaly-auth") {
    PageComponent = AnomalyAuthPage;
  } else if (routePath === "/database" || routePath === "/anomaly-archive") {
    PageComponent = AnomalyArchivePage;
    routeProps = {
      routeQuery
    };
    pageKey = "database";
  } else if (routePath.startsWith("/anomaly/")) {
    PageComponent = AnomalyDetailPage;
    const id = routePath.replace("/anomaly/", "");
    routeProps = {
      anomalyId: id
    };
    pageKey = `anomaly-${id}`;
  } else if (routePath === "/media-auth") {
    PageComponent = MediaAuthPage;
  } else if (routePath === "/media-guidelines") {
    PageComponent = MediaGuidelinesPage;
  } else {
    PageComponent = HomePage;
    pageKey = "home";
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement(Header, {
    scrolled: scrolled,
    currentRoute: route
  }), /*#__PURE__*/React.createElement("main", {
    key: pageKey,
    className: "page-enter",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(PageComponent, routeProps)), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement("button", {
    className: `back-to-top ${showBackTop ? "visible" : ""}`,
    onClick: scrollToTop,
    "aria-label": "\u8FD4\u56DE\u9876\u90E8",
    title: "\u8FD4\u56DE\u9876\u90E8"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "18 15 12 9 6 15"
  }))), /*#__PURE__*/React.createElement("style", null, `
        .back-to-top {
          position: fixed;
          right: 24px;
          bottom: 64px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: rgba(10, 10, 14, 0.9);
          border: 2px solid var(--accent-red);
          color: var(--accent-red-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(6px);
        }
        .back-to-top.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .back-to-top:hover {
          border-color: var(--accent-red-bright);
          box-shadow: 0 0 18px rgba(196, 40, 40, 0.5);
          transform: translateY(-2px) scale(1.05);
          color: #fff;
          background-color: var(--accent-red-bright);
        }
        @media (max-width: 640px) {
          .back-to-top {
            right: 16px;
            bottom: 16px;
            width: 40px;
            height: 40px;
          }
          .back-to-top svg { width: 16px; height: 16px; }
        }
      `));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(RouterProvider, null, /*#__PURE__*/React.createElement(AuthProvider, null, /*#__PURE__*/React.createElement(App, null))));;
