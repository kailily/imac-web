function App() {
  const { route } = useRouter();
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    PageComponent = AnomalyArchivePage;
    routeProps = { routeQuery };
    pageKey = "database";
  } else if (routePath.startsWith("/anomaly/")) {
    PageComponent = AnomalyDetailPage;
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
