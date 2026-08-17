// Media Auth Page - redirects to unified auth
function MediaAuthPage() {
  const { navigate } = useRouter();

  React.useEffect(() => {
    navigate("/auth");
  }, [navigate]);

  return (
    <div style={{ padding: "120px 0", textAlign: "center", color: "var(--text-secondary)" }}>
      正在跳转至统一认证页...
    </div>
  );
}

window.MediaAuthPage = MediaAuthPage;
