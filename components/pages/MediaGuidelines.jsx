// Media Guidelines Page
function MediaGuidelinesPage() {
  const { navigate } = useRouter();

  const principles = [
    {
      num: "01",
      title: "不提及异常内部的具体规则",
      desc: "规则是异常最核心的信息，公开规则可能导致模仿行为、好奇心驱使的主动进入，以及别有用心者的利用。报道中应模糊化处理，如使用「特定行为要求」「内部约束」等替代表述。",
    },
    {
      num: "02",
      title: "不描述惩罚或死亡的具体方式",
      desc: "对惩罚机制和死亡方式的具体描述会引发公众恐慌、激发不良模仿，以及对受害者的二次伤害。一律使用「人员失踪」「未成功撤离」「伤亡」等中性表述。",
    },
    {
      num: "03",
      title: "不暴露溯界者进入异常时的具体装备和战术",
      desc: "具体的装备清单和战术流程属于组织机密，公开可能让潜在威胁方获得可乘之机。可使用「专业设备」「标准作业流程」等概括性表述。",
    },
    {
      num: "04",
      title: "不披露异常入口的精确地理位置",
      desc: "精确地理位置的披露可能引发好奇人群聚集、自媒体探访，甚至破坏周边居民正常生活。仅表述至城市一级即可，必要时可使用模糊的区域名称。",
    },
    {
      num: "05",
      title: "不使用可能引发模仿行为的细节描述",
      desc: "某些异常的触发条件与特定行为相关，详细描述可能导致易感人群主动触发。所有可能被复制的行为细节一律删除或彻底改写。",
    },
  ];

  return (
    <>
      <style>{`
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
        @media (max-width: 640px) {
          .guidelines-auth-inner { padding: 0 16px; gap: 8px; }
          .guidelines-auth-status { font-size: 10px; gap: 6px; flex-wrap: wrap; }
          .guidelines-auth-bar { padding: 10px 0; }
        }
      `}</style>

      <div className="guidelines-page">
        {/* Auth Status Bar */}
        <div className="guidelines-auth-bar">
          <div className="guidelines-auth-inner">
            <div className="guidelines-auth-status">
              <div className="dot"></div>
              <span>媒体认证 · 已登录 / MEDIA CREDENTIAL: VERIFIED</span>
            </div>
            <span className="guidelines-logout" onClick={() => navigate("/")}>退出</span>
          </div>
        </div>

        <div className="container">
          {/* Header */}
          <div className="guidelines-header">
            <div className="guidelines-breadcrumb" onClick={() => navigate("/")}>← 返回首页</div>
            <h1 className="guidelines-title">异常报道审定规范</h1>
            <div className="guidelines-subtitle">REPORTING GUIDELINES · IMAC INFORMATION COORDINATION OFFICE</div>
            <p className="guidelines-desc">
              本规范由 IMAC 信息协调办公室制定，所有认证媒体成员及组织公关部门均需遵守。
              规范旨在平衡公众知情权与社会稳定，避免因信息披露不当造成次生灾害。
            </p>
          </div>

          {/* Three Layers */}
          <div className="guidelines-section">
            <h2 className="guidelines-section-title">三层审定机制</h2>
            <div className="guidelines-section-en">THREE-TIER REVIEW SYSTEM</div>
            <div className="three-layers">
              <div className="layer-card">
                <div className="layer-num mono">TIER 01</div>
                <div className="layer-title">组织内部初审</div>
                <div className="layer-en">ORGANIZATIONAL REVIEW</div>
                <p className="layer-desc">
                  由事发地所属认证组织的公关部门进行第一级审核。
                  核对事实准确性、删除敏感信息、确保不违反五条不披露原则。
                </p>
                <div className="layer-responsibility">责任主体：各认证组织公关部</div>
              </div>
              <div className="layer-card">
                <div className="layer-num mono">TIER 02</div>
                <div className="layer-title">IMAC 复审</div>
                <div className="layer-en">IMAC COORDINATION REVIEW</div>
                <p className="layer-desc">
                  IMAC 信息协调办公室进行第二级审核。
                  统一表述口径、协调跨区域影响、评估对公众情绪的整体影响。
                </p>
                <div className="layer-responsibility">责任主体：IMAC 信息协调办</div>
              </div>
              <div className="layer-card">
                <div className="layer-num mono">TIER 03</div>
                <div className="layer-title">所在国终审</div>
                <div className="layer-en">NATIONAL REGULATORY REVIEW</div>
                <p className="layer-desc">
                  事发地所在国信息监管部门进行最终级审核。
                  结合本地法律法规和社会状况，决定发布范围和措辞。
                </p>
                <div className="layer-responsibility">责任主体：各国信息监管部门</div>
              </div>
            </div>
          </div>

          {/* Five Principles */}
          <div className="guidelines-section" style={{ backgroundColor: "var(--bg-secondary)" }}>
            <h2 className="guidelines-section-title">五条不披露原则</h2>
            <div className="guidelines-section-en">FIVE NON-DISCLOSURE PRINCIPLES</div>
            <div className="principles-list">
              {principles.map((p) => (
                <div key={p.num} className="principle-item">
                  <div className="principle-num">{p.num}</div>
                  <div className="principle-content">
                    <div className="principle-title">{p.title}</div>
                    <p className="principle-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Encouraged */}
          <div className="guidelines-section">
            <h2 className="guidelines-section-title">鼓励报道内容</h2>
            <div className="guidelines-section-en">ENCOURAGED CONTENT</div>
            <div className="encouraged-grid">
              <div className="encouraged-card">
                <svg className="encouraged-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <div>
                  <div className="encouraged-title">安全提醒</div>
                  <p className="encouraged-desc">发布安全提示、撤离指引、防范知识等有助于公众保护自身安全的内容。</p>
                </div>
              </div>
              <div className="encouraged-card">
                <svg className="encouraged-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <div>
                  <div className="encouraged-title">异常热线</div>
                  <p className="encouraged-desc">反复强调全球统一异常热线 99，鼓励公众发现可疑现象及时报告。</p>
                </div>
              </div>
              <div className="encouraged-card">
                <svg className="encouraged-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <div>
                  <div className="encouraged-title">专业人员形象</div>
                  <p className="encouraged-desc">传递溯界者的专业、克制、可靠形象，建立公众对专业处置体系的信任。</p>
                </div>
              </div>
            </div>
          </div>

          {/* Strategy */}
          <div className="guidelines-section" style={{ backgroundColor: "var(--bg-secondary)" }}>
            <h2 className="guidelines-section-title">职业化叙事策略</h2>
            <div className="guidelines-section-en">PROFESSIONAL NARRATIVE STRATEGY</div>
            <div className="strategy-box">
              <span className="strategy-label">CORE CONCEPT</span>
              <div className="strategy-title">把异常处理「去神秘化」</div>
              <div className="strategy-text">
                <p>
                  「职业化叙事」是 IMAC 信息战略的核心原则。其要义在于：
                  <strong>将异常现象从「超自然恐怖故事」转化为「可被理解、可被专业力量处理的非常规事件」</strong>。
                </p>
                <p>
                  公众对未知的恐惧远大于对已知危险的恐惧。通过将异常管理框架化为一种
                  「特殊的公共服务」——类似消防、应急救援、医疗急救——可以大幅降低公众的
                  焦虑感和非理性行为，同时为溯界者和认证组织建立应有的职业尊重。
                </p>
                <p>
                  在报道中，应强调以下叙事框架：异常是一种可被研究、可被应对、可被解决的现象；
                  溯界者是受过严格训练的专业人员；全球有完善的协作体系在保障公众安全；
                  大多数异常对普通人的威胁是可控的。
                </p>
              </div>
              <div className="strategy-key">
                <span>去恐怖化</span>
                <span>专业化</span>
                <span>可信赖</span>
                <span>全球协作</span>
                <span>科学框架</span>
                <span>公众参与</span>
              </div>
            </div>
          </div>

          <div className="guidelines-back-wrap">
            <span className="guidelines-back" onClick={() => navigate("/")}>← 返回首页</span>
          </div>
        </div>
      </div>
    </>
  );
}

window.MediaGuidelinesPage = MediaGuidelinesPage;
