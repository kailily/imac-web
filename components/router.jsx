// Simple hash-based router context
const RouterContext = React.createContext();

function RouterProvider({ children }) {
  const [route, setRoute] = React.useState(window.location.hash.slice(1) || "/");

  React.useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.slice(1) || "/");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = React.useCallback((path) => {
    window.location.hash = path;
  }, []);

  const value = React.useMemo(() => ({ route, navigate }), [route, navigate]);

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

function useRouter() {
  return React.useContext(RouterContext);
}

// Link component
function Link({ to, className, style, children, onClick, ...rest }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  return (
    <a href={`#${to}`} className={className} style={style} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

window.RouterProvider = RouterProvider;
window.useRouter = useRouter;
window.Link = Link;
window.RouterContext = RouterContext;
