// Psychological Evaluation page
function PsychEvalPage() {
  const { navigate } = useRouter();
  const { canAccess } = useAuth();
  const [showBooking, setShowBooking] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!canAccess("internal")) {
    return (
      <div className="portal-denied">
        <div className="container">
          <div className="denied-box">
            <h2>权限不足</h2>
            <p>此页面仅限内部人员访问。</p>
            <button className="btn-primary" onClick={() => navigate("/auth")}>前往认证</button>
          </div>
        </div>
      </div>
    );
  }

  const metrics = [
    { name: "压力耐受性", value: 85, full: 100, color: "var(--level-ordinary)" },
    { name: "共情节制", value: 72, full: 100, color: "#4a7cb4" },
    { name: "身份稳定性", value: 91, full: 100, color: "var(--level-ordinary)" },
    { name: "规则适应度", value: 78, full: 100, color: "#c49a2c" },
    { name: "同化风险指数", value: 18, full: 100, color: "#c42828", inverse: true },
  ];

  const history = [
    { date: "安珀历39年·夏·18", result: "正常", conclusion: "心理状态稳定，同化风险低，建议正常执行任务。", rater: "苏博士 · 悬铃木学会" },
    { date: "安珀历39年·春·02", result: "正常", conclusion: "赤月学院行动前评估，状态良好，准予执行。", rater: "苏博士 · 悬铃木学会" },
    { date: "安珀历38年·冬·15", result: "观察", conclusion: "长时间外勤后轻度解离倾向，建议休整两周。", rater: "苏博士 · 悬铃木学会" },
    { date: "安珀历38年·秋·20", result: "正常", conclusion: "常规季度评估，各项指标正常。", rater: "刘医生 · IMAC医疗部" },
  ];

  const stages = [
    { stage: "阶段零", name: "正常", desc: "同化风险极低，身份认知完整，可正常执行任务。", color: "var(--level-ordinary)", current: true },
    { stage: "阶段一", name: "预警", desc: "出现轻度身份模糊或梦境异常，需要增加监测频率，不影响低风险任务。", color: "var(--level-hazardous)" },
    { stage: "阶段二", name: "强制撤离", desc: "出现明显同化症状，记忆偏差或行为改变，立即撤离异常并接受干预。", color: "var(--level-doomsday)" },
    { stage: "阶段三", name: "终止资格", desc: "同化程度不可逆转，身份持续漂移，永久解除溯界者资格并隔离观察。", color: "var(--level-abyssal)" },
  ];

  return (
    <>
      <style>{`
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
      `}</style>

      <div className="psych-page">
        <div className="container">
          <div className="psych-breadcrumb">
            <span className="crumb-link" onClick={() => navigate("/portal")}>内部指挥中心</span>
            <span>/</span>
            <span>心理评估</span>
          </div>

          <h1 className="page-title">心理评估</h1>
          <div className="page-title-en">PSYCHOLOGICAL EVALUATION</div>

          <div className="psych-grid">
            <div>
              {/* Status */}
              <div className="info-card">
                <div className="info-card-body">
                  <div className="status-banner">
                    <div className="status-banner-dot">✓</div>
                    <div className="status-banner-text">
                      <h2>当前状态：正常</h2>
                      <p>同化风险低，身份稳定性良好，可执行全等级任务。下次评估：安珀历39年·冬</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Eval */}
              <div className="info-card">
                <div className="info-card-head">
                  <div>
                    <span className="info-card-title">最近一次评估摘要</span>
                    <span className="info-card-title-en">LATEST EVALUATION</span>
                  </div>
                </div>
                <div className="info-card-body">
                  <div className="eval-summary">
                    <div className="eval-meta">
                      <span className="eval-meta-label">评估日期</span>
                      <span className="eval-meta-value">安珀历39年·夏·18</span>
                    </div>
                    <div className="eval-meta">
                      <span className="eval-meta-label">评估师</span>
                      <span className="eval-meta-value">苏博士 · 悬铃木学会</span>
                    </div>
                    <div className="eval-meta">
                      <span className="eval-meta-label">评估方式</span>
                      <span className="eval-meta-value">面对面访谈 + 量表测试</span>
                    </div>
                    <div className="eval-meta">
                      <span className="eval-meta-label">总体结论</span>
                      <span className="eval-meta-value" style={{ color: "var(--level-ordinary)" }}>正常 · 准予执行全等级任务</span>
                    </div>
                  </div>
                  <p className="eval-conclusion">
                    被评估者心理状态稳定，身份认知完整，压力耐受良好。近期参与赤月学院第十届行动阶段性任务后，
                    未发现明显同化症状或认知偏差。梦境监测数据正常，未出现叙事侵入现象。
                    建议维持正常任务安排，下季度例行评估按期进行。
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="info-card">
                <div className="info-card-head">
                  <div>
                    <span className="info-card-title">各项指标</span>
                    <span className="info-card-title-en">METRICS</span>
                  </div>
                </div>
                <div className="info-card-body">
                  <div className="metrics-list">
                    {metrics.map((m, i) => (
                      <div key={i} className="metric-item">
                        <span className="metric-label">{m.name}</span>
                        <div className="metric-bar-wrap">
                          <div
                            className="metric-bar-fill"
                            style={{
                              width: `${m.value}%`,
                              backgroundColor: m.color,
                              opacity: m.inverse ? 0.8 : 1,
                            }}
                          ></div>
                        </div>
                        <span className="metric-value">{m.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="notice-bar" style={{ marginTop: "20px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="16" x2="12" y2="12"/>
                      <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                    <span>注：同化风险指数越低越好；其余指标越高越好。</span>
                  </div>
                </div>
              </div>

              {/* History */}
              <div className="info-card">
                <div className="info-card-head">
                  <div>
                    <span className="info-card-title">评估历史</span>
                    <span className="info-card-title-en">EVALUATION HISTORY</span>
                  </div>
                </div>
                <div className="info-card-body">
                  <div className="history-list">
                    {history.map((h, i) => (
                      <div key={i} className="history-item">
                        <div className="history-head">
                          <span className="history-date">{h.date}</span>
                          <span className={`history-result ${h.result === "正常" ? "normal" : "watch"}`}>{h.result}</span>
                        </div>
                        <div className="history-conclusion">{h.conclusion}</div>
                        <div className="history-rater">评估师：{h.rater}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              {/* Assimilation Stages */}
              <div className="info-card">
                <div className="info-card-head">
                  <div>
                    <span className="info-card-title">同化阶段监测</span>
                    <span className="info-card-title-en">ASSIMILATION STAGES</span>
                  </div>
                </div>
                <div className="info-card-body">
                  <div className="stages-list">
                    {stages.map((s, i) => (
                      <div key={i} className={`stage-item ${s.current ? "current" : ""}`}>
                        <span className="stage-code" style={{ borderColor: s.color, color: s.color }}>{s.stage}</span>
                        <div className="stage-info">
                          <div className="stage-name" style={{ color: s.color }}>{s.name}</div>
                          <div className="stage-desc">{s.desc}</div>
                        </div>
                        {s.current && (
                          <span style={{ fontSize: "10px", color: "var(--level-ordinary)", fontFamily: "var(--font-mono)" }}>● 当前</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking */}
              <div className="info-card">
                <div className="info-card-head">
                  <div>
                    <span className="info-card-title">心理咨询预约</span>
                    <span className="info-card-title-en">BOOKING</span>
                  </div>
                </div>
                <div className="info-card-body booking-card">
                  {showBooking ? (
                    <div className="booking-success">
                      <div style={{ fontSize: "24px", marginBottom: "10px", color: "var(--level-ordinary)" }}>✓</div>
                      <strong>已提交预约申请</strong><br/>
                      <span style={{ fontSize: "12px", marginTop: "8px", display: "block", color: "var(--text-secondary)" }}>
                        IMAC心理部门将在48小时内安排评估师与您确认时间
                      </span>
                    </div>
                  ) : (
                    <>
                      <button className="booking-btn" onClick={() => setShowBooking(true)}>
                        预约心理咨询
                      </button>
                      <div className="privacy-notice">
                        心理评估数据仅限本人及 IMAC 心理部门访问。<br/>
                        未经您书面同意，任何第三方（包括所属组织）不得查阅。
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button className="back-btn" onClick={() => navigate("/portal")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5 M12 19l-7-7 7-7"/>
            </svg>
            返回指挥中心
          </button>
        </div>
      </div>
    </>
  );
}

window.PsychEvalPage = PsychEvalPage;
