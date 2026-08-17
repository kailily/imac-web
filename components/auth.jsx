// Auth Context - 4 tier permission system
const AuthContext = React.createContext();

const AUTH_LEVELS = {
  PUBLIC: { key: "public", label: "公开级", en: "PUBLIC", color: "#4a7c59" },
  MEDIA: { key: "media", label: "受限级", en: "RESTRICTED", color: "#c49a2c" },
  INTERNAL: { key: "internal", label: "机密级", en: "CONFIDENTIAL", color: "#c42828" },
  TOPSECRET: { key: "topsecret", label: "绝密级", en: "TOP SECRET", color: "#7a3ab0" },
};

const AUTH_STORAGE_KEY = "imac_auth_level";
const AUTH_IDENTITY_KEY = "imac_auth_identity";

function AuthProvider({ children }) {
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

  const canAccess = React.useCallback((requiredLevel) => {
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
    currentLevelInfo: AUTH_LEVELS[authLevel.toUpperCase()] || AUTH_LEVELS.PUBLIC,
  }), [authLevel, identity, setAuth, logout, canAccess]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return React.useContext(AuthContext);
}

// Restricted content wrapper - shows locked overlay if insufficient permission
function Restricted({ level, children, label, compact }) {
  const { canAccess, authLevel, levels } = useAuth();
  const { navigate } = useRouter();

  if (canAccess(level)) {
    return <>{children}</>;
  }

  const requiredInfo = levels[level.toUpperCase()] || levels.PUBLIC;

  return (
    <div className={`restricted-overlay ${compact ? "compact" : ""}`} style={{
      position: "relative",
      overflow: "hidden",
      pointerEvents: compact ? "auto" : "none",
    }}>
      <div style={{ filter: "blur(3px) opacity(0.35)", pointerEvents: "none" }}>
        {children}
      </div>
      <div
        className="restricted-lock-panel"
        style={{
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
          cursor: "pointer",
        }}
        onClick={() => navigate("/auth")}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c42828" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0110 0v4"/>
        </svg>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-tertiary)",
          letterSpacing: "0.1em",
          textAlign: "center",
        }}>
          {label || `需${requiredInfo.label}权限`}
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          color: "var(--accent-red-bright)",
          letterSpacing: "0.15em",
          borderBottom: "1px solid var(--accent-red-bright)",
          paddingBottom: "2px",
        }}>
          登录解锁 →
        </div>
      </div>
    </div>
  );
}

window.AuthProvider = AuthProvider;
window.useAuth = useAuth;
window.Restricted = Restricted;
window.AuthContext = AuthContext;
window.AUTH_LEVELS = AUTH_LEVELS;
