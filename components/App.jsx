// 懒加载页面映射：路由 → 全局组件名 → 独立脚本（按需加载，减小首屏体积）
const LAZY_PAGE_MAP = [
  { match: (p) => p === "/guide", fn: "GuidePage", src: "pages/Guide.js" },
  { match: (p) => p === "/organizations", fn: "OrganizationsPage", src: "pages/Organizations.js" },
  { match: (p) => p.startsWith("/org/"), fn: "OrgDetailPage", src: "pages/OrgDetail.js" },
  { match: (p) => p === "/news", fn: "NewsPage", src: "pages/News.js" },
  { match: (p) => p === "/auth", fn: "AuthPage", src: "pages/Auth.js" },
  { match: (p) => p === "/portal", fn: "PortalPage", src: "pages/Portal.js" },
  { match: (p) => p === "/profile-center", fn: "ProfileCenterPage", src: "pages/ProfileCenter.js" },
  { match: (p) => p === "/register", fn: "RegisterPage", src: "pages/RegisterPage.js" },
  { match: (p) => p === "/mailbox", fn: "MailboxPage", src: "pages/MailboxPage.js" },
  { match: (p) => p === "/admin", fn: "AdminPage", src: "pages/Admin.js" },
  { match: (p) => p === "/join", fn: "JoinPage", src: "pages/Join.js" },
  { match: (p) => p === "/anomaly-auth", fn: "AnomalyAuthPage", src: "pages/AnomalyAuth.js" },
  { match: (p) => p === "/database" || p === "/anomaly-archive", fn: "AnomalyArchivePage", src: "pages/AnomalyArchive.js" },
  { match: (p) => p.startsWith("/anomaly/"), fn: "AnomalyDetailPage", src: "pages/AnomalyDetail.js" },
  { match: (p) => p === "/media-auth", fn: "MediaAuthPage", src: "pages/MediaAuth.js" },
  { match: (p) => p === "/media-guidelines", fn: "MediaGuidelinesPage", src: "pages/MediaGuidelines.js" },
];

const _pageLoaded = {};
function loadPageScript(src) {
  return new Promise((resolve, reject) => {
    if (_pageLoaded[src]) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => { _pageLoaded[src] = true; resolve(); };
    s.onerror = () => { reject(new Error("页面加载失败: " + src)); };
    document.body.appendChild(s);
  });
}

function PendingPlaceholder() {
  return (
    <div style={{ padding: "140px 24px", textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--accent-red-bright)", letterSpacing: "0.2em", marginBottom: "12px" }}>
        FILE LOADING
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
        档案数据载入中，请稍候…
      </div>
    </div>
  );
}

function App() {
  const { route } = useRouter();
  const [scrolled, setScrolled] = React.useState(false);
  const [showBackTop, setShowBackTop] = React.useState(false);
  const [lazyTick, setLazyTick] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Route matching — strip query string for matching, keep it for props
  const qIdx = route.indexOf("?");
  const routePath = qIdx >= 0 ? route.substring(0, qIdx) : route;
  const routeQuery = qIdx >= 0 ? route.substring(qIdx + 1) : "";

  // 懒加载：当前路由需要但尚未加载的页面脚本
  React.useEffect(() => {
    const entry = LAZY_PAGE_MAP.find((e) => e.match(routePath));
    if (!entry || window[entry.fn]) return;
    let cancelled = false;
    loadPageScript(entry.src).then(
      () => { if (!cancelled) setLazyTick((n) => n + 1); },
      () => {}
    );
    return () => { cancelled = true; };
  }, [routePath, lazyTick]);

  let PageComponent;
  let pageKey = routePath;
  let routeProps = {};

  if (routePath === "/" || routePath === "" || routePath.startsWith("/#")) {
    PageComponent = HomePage;
    pageKey = "home";
  } else {
    const entry = LAZY_PAGE_MAP.find((e) => e.match(routePath));
    if (entry) {
      PageComponent = window[entry.fn] || PendingPlaceholder;
      if (routePath.startsWith("/org/")) {
        const slug = routePath.replace("/org/", "");
        routeProps = { orgSlug: slug };
        pageKey = `org-${slug}`;
      } else if (routePath.startsWith("/anomaly/")) {
        const id = routePath.replace("/anomaly/", "");
        routeProps = { anomalyId: id };
        pageKey = `anomaly-${id}`;
      } else if (routePath === "/database" || routePath === "/anomaly-archive") {
        routeProps = { routeQuery };
        pageKey = "database";
      }
    } else {
      PageComponent = HomePage;
      pageKey = "home";
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header scrolled={scrolled} currentRoute={route} />
      <main key={pageKey} className="page-enter" style={{ flex: 1 }}>
        <PageComponent {...routeProps} />
      </main>
      <Footer />
      <button
        className={`back-to-top ${showBackTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="返回顶部"
        title="返回顶部"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
      <style>{`
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
      `}</style>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </RouterProvider>
);
