// 部分懒加载：仅异常数据库模块（列表 + 档案详情）按需加载，其余页面在主 bundle 内即时切换
const LAZY_PAGE_MAP = [
  { match: (p) => p === "/database" || p === "/anomaly-archive", fn: "AnomalyArchivePage", src: "pages/AnomalyArchive.js" },
  { match: (p) => p.startsWith("/anomaly/"), fn: "AnomalyDetailPage", src: "pages/AnomalyDetail.js" },
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

  // 懒加载：当前路由需要但尚未加载的异常数据库页面脚本
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
    routeProps = { orgSlug: slug };
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
    PageComponent = window.AnomalyArchivePage || PendingPlaceholder;
    routeProps = { routeQuery };
    pageKey = "database";
  } else if (routePath.startsWith("/anomaly/")) {
    PageComponent = window.AnomalyDetailPage || PendingPlaceholder;
    const id = routePath.replace("/anomaly/", "");
    routeProps = { anomalyId: id };
    pageKey = `anomaly-${id}`;
  } else if (routePath === "/media-auth") {
    PageComponent = MediaAuthPage;
  } else if (routePath === "/media-guidelines") {
    PageComponent = MediaGuidelinesPage;
  } else {
    PageComponent = HomePage;
    pageKey = "home";
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
