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
window.MediaAuthPage = MediaAuthPage;