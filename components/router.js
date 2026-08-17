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
window.RouterContext = RouterContext;