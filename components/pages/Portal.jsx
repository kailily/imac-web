// Internal Command Center Portal - for internal staff (confidential + top secret)
function PortalPage() {
  const { navigate } = useRouter();
  const { canAccess, authLevel, identity, currentLevelInfo } = useAuth();
  const [currentTime, setCurrentTime] = React.useState("");
  const [expandedAnnounce, setExpandedAnnounce] = React.useState(null);

  const toggleAnnounce = (idx) => {
    setExpandedAnnounce(expandedAnnounce === idx ? null : idx);
  };

  // Simulated Amber calendar date display
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`安珀历39年 · 秋 · ${hours}:${mins}:${secs}`);
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  const categories = [
    { code: "SP", name: "空间类", en: "Spatial", desc: "折叠、裂隙、循环空间、错位空间等", count: 4287, latest: "SPA-0312 · 折叠楼道", example: "SPA-0021 无尽楼梯", color: "#4a7cb4" },
    { code: "TM", name: "时间类", en: "Temporal", desc: "时间循环、流速异常、时间断裂等", count: 892, latest: "TMB-0147 · 钟塔停滞", example: "TMB-0117 冰封哨站", color: "#7a3ab4" },
    { code: "PH", name: "物理类", en: "Physical", desc: "物理法则扭曲、重力异常、物质状态异常", count: 1204, latest: "PHB-0256 · 引力井", example: "SPB-0089 镜像医院", color: "#c49a2c" },
    { code: "CG", name: "认知类", en: "Cognitive", desc: "记忆篡改、感知扭曲、身份替换、叙事嵌入", count: 1567, latest: "CGA-0199 · 回音巷", example: "CGA-0003 回音巷", color: "#c4782c" },
    { code: "EN", name: "实体类", en: "Entity", desc: "异常生物、NPC自主意识、同化体等", count: 734, latest: "ENA-0082 · 画像中人", example: "TMA-0045 雾中列车", color: "#c42828" },
    { code: "LO", name: "地点类", en: "Location", desc: "凭空出现的建筑、被封锁区域", count: 2341, latest: "SPB-0089 · 镜像医院", example: "LOA-0073 赤月学院", color: "#d46828", featured: true },
    { code: "OB", name: "物品类", en: "Object", desc: "异常道具、规则载体、诅咒物品等", count: 987, latest: "OBA-0066 · 哭泣的怀表", example: "OBA-0012 剧情书残页", color: "#6a8ca8" },
  ];

  const stats = [
    { label: "全球活跃异常", value: "143", sub: "较昨日 +3", trend: "up" },
    { label: "本周新增", value: "27", sub: "常规级 21 · 危险级 5 · 厄运级 1", trend: "neutral" },
    { label: "在册溯界者", value: "1,247", sub: "在岗 986 · 外勤 183 · 休整 78", trend: "neutral" },
    { label: "当前外勤人员", value: "183", sub: "分布于 24 个活跃异常点", trend: "neutral" },
    { label: "联合响应行动", value: "3", sub: "三级响应 2 · 二级响应 1", trend: "active" },
  ];

  const announcements = [
    {
      id: "IMAC-TC-2024-031",
      date: "安珀历39年·秋·07",
      title: "安珀历39年秋季溯界者轮训通知",
      source: "IMAC训练协调部",
      content: [
        "各缔约组织、全体在档溯界者：",
        "根据《IMAC溯界者年度培训规程》第6.2条，安珀历39年秋季轮训定于秋·15至秋·28在中央训练基地（坐标：SP-T-001）举行，现将有关事项通知如下：",
        "一、参训范围：衔尾蛇事务所、边界研究院、北境守望、晨星团在编溯界者（含见习期），共计约210人；上季度外勤出勤率低于60%者强制参训。",
        "二、培训模块：① 异常空间识别与快速测绘（40课时）；② 认知类异常防御与记忆锚定训练（32课时）；③ 同化抑制剂实操与紧急医疗（24课时）；④ 新型异常通讯器操作（16课时）；⑤ 综合演练（20课时）。",
        "三、报名方式：由各组织人事部门统一汇总名单，于秋·12日前通过内部OA系统提交训练协调部。个人报名需经所在组织负责人审批。",
        "四、注意事项：参训人员须携带完整个人装备，提前24小时抵达基地报到。轮训期间封闭管理，非紧急事项不得外出。",
      ],
    },
    {
      id: "BRI-TR-2024-017",
      date: "安珀历39年·秋·05",
      title: "新版 AITF 培训框架正式生效",
      source: "BRI训练中心",
      content: [
        "各相关部门、全体训练人员：",
        "经边界研究院学术委员会第17次会议审议通过，新版《异常介入训练框架（AITF v3.0）》自安珀历39年秋·10起正式生效。",
        "一、主要更新：① 新增'认知异常二级防御'与'空间异常快速撤离'两门核心课程；② 更新个人装备操作规范，涵盖最新批次的 XDPS 终端与记忆锚定器；③ 调整考核权重，实战模拟占比由40%提升至55%；④ 补充平民疏散与护送专项模块。",
        "二、过渡期安排：秋·10至冬·01为过渡期，旧版（v2.5）培训记录仍然有效；冬·01起所有新入职与年度考核须按 v3.0 标准执行。",
        "三、培训材料：新版教材与操作手册已上传至内部知识库（路径：BRI/TR/AITF/v3.0/），请各单位及时下载更新。",
      ],
    },
    {
      id: "IMAC-TECH-2024-044",
      date: "安珀历39年·秋·03",
      title: "XDPS v4.2 协议栈升级公告",
      source: "IMAC技术局",
      content: [
        "全体外勤人员、各技术支持单位：",
        "XDPS（异常数据处理协议栈）v4.2 版本升级定于安珀历39年秋·08 凌晨02:00—04:00进行，届时核心数据库与通讯系统将短暂停机维护。",
        "一、升级内容：① 优化异常内弱信号传输算法，数据传输成功率预计提升约18%；② 新增 LO/SP 复合类异常的空间坐标解析模块；③ 修复 v4.1 中加密握手偶发失败的问题；④ 升级终端侧电池管理，续航延长约25%。",
        "二、影响范围：升级期间中央数据库查询服务暂停约90分钟，外勤终端通讯将自动切换至降级模式；正在执行任务的小队须提前做好离线作业准备。",
        "三、注意事项：升级完成后终端需手动重启以加载新版固件；如遇设备异常，请立即联系技术局值班人员（内线：8800）。",
      ],
    },
    {
      id: "OTS-INTELL-2024-029",
      date: "安珀历39年·夏·28",
      title: "第十一届赤月学院行动阶段性报告",
      source: "衔尾蛇事务所",
      content: [
        "IMAC联合行动指挥中心、各缔约组织：",
        "现将第十一届赤月学院异常介入行动（行动代号：赤月·XI）进展情况通报如下：",
        "一、行动概况：本次行动由衔尾蛇事务所与边界研究院联合派遣，共计溯界者4人（衔尾蛇2人、BRI 2人），行动指挥为资深溯界者沈彻。小队于安珀历39年夏·26日从东侧主入口进入，初始阶段进展顺利。",
        "二、当前状态：夏·29日起与小队失去常规通讯联系，锚定信标信号微弱但稳定，判定为'进行中·全员失联'状态。按《联合行动失联处置规程》第3.1条，暂不启动搜救程序，持续监测信标信号。",
        "三、后续安排：技术局每日3次校准信标定位；预备队（衔尾蛇一组 + BRI支援组）保持二级待命；下一次状态评估定于秋·10。后续进展将及时通报。",
      ],
    },
    {
      id: "IMAC-MED-2024-022",
      date: "安珀历39年·夏·21",
      title: "关于加强心理评估频率的通知",
      source: "IMAC医疗保障部",
      content: [
        "各缔约组织、全体在档溯界者：",
        "鉴于近一季度认知类异常介入任务中认知污染与记忆偏差案例上升12.7%，经医疗保障部与伦理委员会联合审议，决定调整溯界者心理评估频率。",
        "一、评估频次：常规评估由每季度1次调整为每双月1次；外勤一线人员每月1次。参与认知类异常任务后72小时内强制加测。",
        "二、评估标准：启用修订版《溯界者认知状态评估量表（CSES-R）》，新增同化倾向早期筛查维度。评估结果为'关注'等级者暂停外勤任务并安排介入干预。",
        "三、实施时间：安珀历39年秋·01起正式施行。各组织医疗对接人请于夏·30日前完成量表培训。",
        "心理评估是溯界者职业安全的第一道防线，请各单位高度重视，严格执行。",
      ],
    },
  ];

  const activeOperations = [
    { code: "PHA-0182", name: "洛林自由市边境裂隙", level: "厄运级", levelClass: "doomed", response: "三级响应", org: "BRI/晨星团联合", status: "进行中" },
    { code: "TMB-0089", name: "白松城冻土层时间停滞", level: "危险级", levelClass: "hazardous", response: "三级响应", org: "北境守望", status: "进行中" },
    {
      code: "LOA-0073",
      name: "赤月学院异常介入行动",
      level: "深渊级", levelClass: "abyssal",
      response: "二级响应",
      org: "衔尾蛇/BRI联合",
      status: "进行中",
      featured: true,
    },
  ];

  const jrpClauses = [
    "IMAC总部任命行动总指挥，拥有战术协调权与资源调度权",
    "缔约国成员组织须在请求发出后6小时内确认派员并进入待命",
    "所有参与人员统一适用IMAC行动规范与安全协议，原组织规程暂止",
    "现场情报实时同步至中央数据库，任何组织不得扣留关键信息",
    "联合行动期间，现场指挥权高于各组织内部指挥链，军令如山",
  ];

  // Redirect if not authenticated
  if (!canAccess("internal")) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#08080a",
        color: "var(--text-secondary)",
        padding: "40px 20px",
        textAlign: "center",
      }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c42828" strokeWidth="1.5" style={{ marginBottom: "20px" }}>
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0110 0v4"/>
        </svg>
        <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "24px", color: "var(--accent-red-bright)", letterSpacing: "0.15em", marginBottom: "12px" }}>
          ACCESS DENIED
        </h2>
        <p style={{ fontSize: "14px", marginBottom: "24px", maxWidth: "400px", lineHeight: "1.7" }}>
          本页面仅限内部授权人员访问。您当前的权限等级不足，请先完成认证。
        </p>
        <button
          onClick={() => navigate("/auth")}
          style={{
            padding: "10px 28px",
            backgroundColor: "var(--accent-red-bright)",
            border: "none",
            color: "#fff",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.15em",
            cursor: "pointer",
          }}
        >
          前往认证
        </button>
      </div>
    );
  }

  const walkerName = identity?.staffId || identity?.adminId || "溯界者";
  const walkerCode = "赤鸦";
  const walkerRank = authLevel === "topsecret" ? "界标" : "资深溯界者";
  const walkerOrg = identity?.organization || "衔尾蛇事务所";
  const walkerId = identity?.staffId || identity?.adminId || "IMAC-OA-0721";

  return (
    <>
      <style>{`
        .portal-page {
          min-height: 100vh;
          padding-top: 64px;
          background-color: #07070a;
          background-image:
            linear-gradient(rgba(196, 40, 40, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196, 40, 40, 0.04) 1px, transparent 1px);
          background-size: 50px 50px;
          color: var(--text-primary);
          position: relative;
        }
        .portal-page::before {
          content: "";
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px;
          background-color: var(--accent-red-bright);
          box-shadow: 0 0 8px rgba(196, 40, 40, 0.5);
          z-index: 1000;
        }
        .portal-hero {
          background: linear-gradient(180deg, #0a0a0e 0%, #0d0d12 100%);
          border-bottom: 1px solid var(--border-color);
          padding: 28px 0 20px;
        }
        .portal-hero-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .portal-title-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .portal-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.25em;
        }
        .portal-title {
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: 0.08em;
        }
        .portal-time {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .portal-time .dot {
          width: 6px; height: 6px;
          background-color: var(--level-ordinary);
          border-radius: 50%;
          box-shadow: 0 0 6px var(--level-ordinary);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .portal-status-bar {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        .portal-status-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
          letter-spacing: 0.08em;
        }
        .portal-status-item .indicator {
          width: 8px; height: 8px;
          border-radius: 50%;
        }
        .portal-status-item .indicator.ok { background-color: var(--level-ordinary); box-shadow: 0 0 4px var(--level-ordinary); }
        .portal-status-item .indicator.warn { background-color: var(--level-hazardous); box-shadow: 0 0 4px var(--level-hazardous); }
        .portal-status-item .indicator.active { background-color: var(--accent-red-bright); box-shadow: 0 0 6px var(--accent-red-bright); animation: pulse-dot 1.5s infinite; }

        .portal-body {
          padding: 30px 0 60px;
        }
        .portal-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background-color: var(--border-color);
          border: 1px solid var(--border-color);
          margin-bottom: 24px;
        }
        .portal-stat-card {
          background-color: #0d0d12;
          padding: 20px 18px;
        }
        .portal-stat-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 10px;
        }
        .portal-stat-value {
          font-family: var(--font-serif);
          font-size: 30px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 6px;
        }
        .portal-stat-sub {
          font-size: 11px;
          color: var(--text-tertiary);
        }

        .portal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .portal-grid.full {
          grid-template-columns: 1fr;
        }
        .portal-card {
          background-color: #0d0d12;
          border: 1px solid var(--border-color);
          overflow: hidden;
        }
        .portal-card-header {
          padding: 14px 20px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(90deg, rgba(196, 40, 40, 0.06), transparent);
        }
        .portal-card-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .portal-card-title .code {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
        }
        .portal-card-en {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }
        .portal-card-body { padding: 20px; }

        .jrp-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .jrp-list li {
          position: relative;
          padding: 10px 0 10px 32px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          border-bottom: 1px dashed var(--border-color);
        }
        .jrp-list li:last-child { border-bottom: none; }
        .jrp-list li::before {
          content: "第" counter(jrp) "条";
          position: absolute;
          left: 0;
          top: 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.1em;
          width: 28px;
        }
        .jrp-list { counter-reset: jrp; }
        .jrp-list li { counter-increment: jrp; }

        .ops-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ops-item {
          padding: 14px 16px;
          background-color: rgba(18, 18, 22, 0.6);
          border: 1px solid var(--border-color);
          border-left: 3px solid var(--level-hazardous);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          transition: border-color 0.3s ease;
        }
        .ops-item:hover { border-color: var(--border-light); }
        .ops-item.abyssal { border-left-color: var(--accent-red-bright); background-color: rgba(139, 26, 26, 0.08); }
        .ops-main { display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 0; }
        .ops-detail { margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--border-color); display: flex; flex-direction: column; gap: 4px; }
        .ops-detail-row { display: flex; gap: 12px; font-size: 11px; }
        .ops-detail-label { color: var(--text-tertiary); font-family: var(--font-mono); letter-spacing: 0.05em; min-width: 72px; }
        .ops-detail-value { color: var(--text-secondary); }
        .ops-code {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .ops-name {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .ops-meta {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ops-badge {
          padding: 3px 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          border: 1px solid;
        }
        .ops-badge.hazardous { color: var(--level-hazardous); border-color: var(--level-hazardous); }
        .ops-badge.doomed { color: var(--level-doomed); border-color: var(--level-doomed); }
        .ops-badge.abyssal { color: var(--accent-red-bright); border-color: var(--accent-red-bright); animation: pulse-glow 2s ease-in-out infinite; }
        .ops-status {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background-color: var(--border-color);
        }
        .category-card {
          background-color: #0d0d12;
          padding: 18px 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }
        .category-card:hover {
          background-color: #13131a;
        }
        .category-card.featured {
          background: linear-gradient(180deg, color-mix(in srgb, var(--cat-color) 24%, transparent), #0d0d12);
        }
        .category-code {
          font-family: var(--font-mono);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
          letter-spacing: 0.05em;
        }
        .category-name {
          font-family: var(--font-serif);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .category-en {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 10px;
        }
        .category-count {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 700;
          color: var(--cat-color, var(--accent-red-bright));
          margin-bottom: 6px;
        }
        .category-desc {
          font-size: 10px;
          color: var(--text-tertiary);
          line-height: 1.5;
          margin-bottom: 8px;
        }
        .category-latest {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-muted);
          padding-top: 8px;
          border-top: 1px solid var(--border-color);
          letter-spacing: 0.05em;
        }

        .regs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .regs-sub h4 {
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 12px;
          padding-bottom: 6px;
          border-bottom: 1px solid var(--border-color);
        }
        .regs-sub ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .regs-sub li {
          position: relative;
          padding: 6px 0 6px 18px;
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .regs-sub li::before {
          content: "▸";
          position: absolute;
          left: 0;
          top: 6px;
          color: var(--accent-red-bright);
          font-size: 10px;
        }

        .announce-list {
          display: flex;
          flex-direction: column;
        }
        .announce-item {
          border-bottom: 1px dashed var(--border-color);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .announce-item:last-child { border-bottom: none; }
        .announce-item:hover .announce-title { color: var(--text-primary); }
        .announce-header {
          padding: 12px 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .announce-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .announce-code {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          padding: 2px 6px;
          border: 1px solid var(--border-color);
          flex-shrink: 0;
        }
        .announce-title {
          font-size: 13px;
          color: var(--text-secondary);
          flex: 1;
          font-weight: 500;
        }
        .announce-meta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-left: 0;
        }
        .announce-source {
          font-size: 10px;
          color: var(--text-tertiary);
          flex: 1;
        }
        .announce-date {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .announce-arrow {
          font-family: var(--font-mono);
          font-size: 8px;
          color: var(--text-muted);
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .announce-item.expanded .announce-arrow { color: var(--accent-red-bright); }
        .announce-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.3s ease;
          opacity: 0;
        }
        .announce-body.open {
          max-height: 1200px;
          opacity: 1;
        }
        .announce-body-inner {
          padding: 0 0 14px 0;
          border-top: 1px dashed var(--border-color);
          padding-top: 12px;
        }
        .announce-paragraph {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0 0 10px 0;
          text-align: justify;
        }
        .announce-paragraph:first-child { color: var(--text-primary); font-weight: 500; }
        .announce-actions {
          display: flex;
          justify-content: flex-end;
          padding-top: 4px;
        }
        .announce-collapse-btn {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          padding: 4px 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .announce-collapse-btn:hover {
          color: var(--accent-red-bright);
          border-color: var(--accent-red-bright);
        }

        .func-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        .func-cards-hero {
          grid-template-columns: repeat(3, 1fr);
          margin-bottom: 0;
        }
        .func-cards-hero .func-card {
          padding: 20px;
          gap: 10px;
        }
        .func-cards-hero .func-card-icon {
          width: 36px;
          height: 36px;
        }
        .func-cards-hero .func-card-title {
          font-size: 16px;
        }
        .func-card-icon-wrap {
          position: relative;
          width: 36px;
          height: 36px;
          margin-bottom: 4px;
        }
        .func-card-icon-wrap .func-card-icon {
          width: 100%;
          height: 100%;
          margin-bottom: 0;
        }
        .func-card-unread {
          position: absolute;
          top: -6px;
          right: -10px;
          min-width: 18px;
          height: 18px;
          padding: 0 5px;
          border-radius: 9px;
          background: var(--accent-red-bright);
          color: #fff;
          font-size: 10px;
          font-family: var(--font-mono);
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 8px rgba(196, 40, 40, 0.6);
        }
        .func-card-mailbox {
          border-color: rgba(196, 40, 40, 0.45);
          background: linear-gradient(135deg, rgba(22, 14, 16, 0.85), rgba(18, 18, 22, 0.7));
        }
        .func-card {
          background-color: rgba(18, 18, 22, 0.7);
          border: 1px solid var(--border-color);
          padding: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }
        .func-card:hover {
          border-color: var(--accent-red-bright);
          transform: translateY(-2px);
          background-color: rgba(25, 20, 24, 0.8);
        }
        .func-card-icon {
          width: 32px;
          height: 32px;
          color: var(--accent-red-bright);
          margin-bottom: 4px;
        }
        .func-card-title {
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .func-card-desc {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .func-card-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          background: rgba(196, 40, 40, 0.15);
          color: var(--accent-red-bright);
          letter-spacing: 0.05em;
        }
        .func-panel {
          margin-bottom: 16px;
        }
        .func-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border-color);
        }
        .func-panel-title {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .func-panel-close {
          background: none;
          border: 1px solid var(--border-color);
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 4px 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .func-panel-close:hover {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .form-label {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .form-input, .form-select, .form-textarea {
          background: rgba(10, 10, 14, 0.8);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 8px 10px;
          font-size: 12px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--accent-red-bright);
        }
        .form-textarea {
          resize: vertical;
          min-height: 60px;
        }
        .form-submit {
          background: rgba(196, 40, 40, 0.15);
          border: 1px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          padding: 8px 18px;
          font-size: 12px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 6px;
        }
        .form-submit:hover {
          background: rgba(196, 40, 40, 0.25);
        }
        .form-success {
          padding: 10px 14px;
          background: rgba(47, 158, 68, 0.1);
          border: 1px solid rgba(47, 158, 68, 0.4);
          color: #5fb372;
          font-size: 12px;
          margin-top: 10px;
        }
        .cert-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border: 1px solid var(--border-color);
          margin-bottom: 8px;
          background: rgba(10, 10, 14, 0.5);
        }
        .cert-item-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .cert-item-name {
          font-size: 13px;
          color: var(--text-primary);
          font-weight: 600;
        }
        .cert-item-desc {
          font-size: 11px;
          color: var(--text-tertiary);
        }
        .cert-apply-btn {
          background: rgba(196, 40, 40, 0.1);
          border: 1px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          font-size: 11px;
          padding: 4px 12px;
          cursor: pointer;
          font-family: var(--font-mono);
          transition: all 0.2s;
        }
        .cert-apply-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .cert-apply-btn:hover:not(:disabled) {
          background: rgba(196, 40, 40, 0.2);
        }
        .mail-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0 12px;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 8px;
        }
        .mail-toolbar-left {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .mail-toolbar-btn {
          background: none;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 4px 10px;
          font-size: 11px;
          cursor: pointer;
          font-family: var(--font-mono);
          transition: all 0.2s;
        }
        .mail-toolbar-btn:hover {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }
        .mail-toolbar-btn.active {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
          background: rgba(196, 40, 40, 0.1);
        }
        .mail-unread-count {
          font-size: 11px;
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
        }
        .mail-list {
          max-height: 400px;
          overflow-y: auto;
        }
        .mail-item {
          padding: 10px 12px;
          border-bottom: 1px solid var(--border-color);
          cursor: pointer;
          transition: background 0.2s;
        }
        .mail-item:hover {
          background: rgba(196, 40, 40, 0.04);
        }
        .mail-item.unread {
          background: rgba(196, 40, 40, 0.06);
        }
        .mail-item-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .mail-from {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .mail-unread-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .mail-important {
          color: var(--accent-red-bright);
          font-size: 10px;
          font-family: var(--font-mono);
        }
        .mail-time {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          flex-shrink: 0;
        }
        .mail-subject {
          font-size: 12px;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mail-item.unread .mail-subject {
          color: var(--text-primary);
          font-weight: 600;
        }
        .mail-body {
          padding: 12px;
          background: rgba(10, 10, 14, 0.6);
          border-left: 2px solid var(--accent-red-bright);
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.7;
          white-space: pre-wrap;
          display: none;
        }
        .mail-item.expanded .mail-body {
          display: block;
          margin-top: 8px;
        }
        .op-history-item {
          display: grid;
          grid-template-columns: 1fr 80px 80px 90px;
          gap: 8px;
          padding: 8px 10px;
          border-bottom: 1px solid var(--border-color);
          font-size: 11px;
          align-items: center;
        }
        .op-history-item:last-child { border-bottom: none; }
        .op-h-status.approved { color: var(--level-ordinary); }
        .op-h-status.pending { color: var(--level-hazardous); }
        .op-h-status.rejected { color: var(--accent-red-bright); }
        .reg-status-banner {
          padding: 10px 14px;
          background: rgba(47, 158, 68, 0.08);
          border: 1px solid rgba(47, 158, 68, 0.35);
          color: #5fb372;
          font-size: 12px;
          margin-bottom: 14px;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        @media (max-width: 900px) {
          .func-cards-grid { grid-template-columns: repeat(2, 1fr); }
          .form-row { grid-template-columns: 1fr; }
          .op-history-item { grid-template-columns: 1fr 70px; }
        }
          padding: 24px 0;
          border-top: 1px solid var(--border-color);
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .portal-footer-left {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .portal-footer-warning {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.15em;
          animation: pulse-dot 3s ease-in-out infinite;
        }

        @media (max-width: 1200px) {
          .portal-stats-grid { grid-template-columns: repeat(3, 1fr); }
          .categories-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 768px) {
          .portal-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .portal-grid { grid-template-columns: 1fr; }
          .categories-grid { grid-template-columns: repeat(2, 1fr); }
          .regs-grid { grid-template-columns: 1fr; }
          .portal-title { font-size: 20px; }
        }
      `}</style>

      <div className="portal-page">
        {/* Hero / Top Bar */}
        <section className="portal-hero">
          <div className="container">
            <div className="portal-hero-inner">
              <div className="portal-title-group">
                <span className="portal-label">IMAC · INTERNAL COMMAND CENTER</span>
                <h1 className="portal-title">内部指挥中心</h1>
              </div>
              <div className="portal-time">
                <span className="dot"></span>
                {currentTime}
              </div>
            </div>
            <div className="portal-status-bar" style={{ marginTop: "16px" }}>
              <div className="portal-status-item">
                <span className="indicator ok"></span>
                系统在线 · SYSTEM ONLINE
              </div>
              <div className="portal-status-item">
                <span className="indicator warn"></span>
                异常监测正常 · ANOMALY MONITORING ACTIVE
              </div>
              <div className="portal-status-item">
                <span className="indicator active"></span>
                联合响应待命 · JRP STANDBY
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="portal-body">
          <div className="container">
            {/* Stats */}
            <div className="portal-stats-grid">
              {stats.map((s, i) => (
                <div key={i} className="portal-stat-card">
                  <div className="portal-stat-label">{s.label}</div>
                  <div className="portal-stat-value">{s.value}</div>
                  <div className="portal-stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div className="portal-card" style={{ marginBottom: "16px" }}>
              <div className="portal-card-header">
                <div className="portal-card-title">
                  <span className="code">AID</span>
                  异常信息数据库
                </div>
                <span className="portal-card-en">ANOMALY INFORMATION DATABASE</span>
              </div>
              <div className="categories-grid">
                {categories.map((cat) => (
                  <div
                    key={cat.code}
                    className="category-card featured"
                    style={{ "--cat-color": cat.color }}
                    onClick={() => navigate(`/database?cat=${cat.code}`)}
                  >
                    <div className="category-code" style={{ color: cat.color }}>{cat.code}</div>
                    <div className="category-name">{cat.name}</div>
                    <div className="category-en">{cat.en.toUpperCase()}</div>
                    <div className="category-count" style={{ color: cat.color }}>{cat.count.toLocaleString()}</div>
                    <div className="category-desc">{cat.desc}</div>
                    <div className="category-latest">最新: {cat.latest}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regulations */}
            <div className="portal-card" style={{ marginBottom: "16px" }}>
              <div className="portal-card-header">
                <div className="portal-card-title">
                  <span className="code">REG</span>
                  行动规范与安全协议
                </div>
                <span className="portal-card-en">OPERATIONAL REGULATIONS</span>
              </div>
              <div className="portal-card-body">
                <div className="regs-grid">
                  <div className="regs-sub">
                    <h4>进入前检查清单</h4>
                    <ul>
                      <li>个人记录器功能确认 · 双备份存储</li>
                      <li>异常通讯器频道校准 · 加密握手测试</li>
                      <li>身份信标激活 · 定位系统正常</li>
                      <li>锚定物携带确认 · 配对验证通过</li>
                      <li>急救包检查 · 同化抑制剂有效期确认</li>
                    </ul>
                  </div>
                  <div className="regs-sub">
                    <h4>异常内行为准则</h4>
                    <ul>
                      <li>保持团队通讯 · 每15分钟一次状态回报</li>
                      <li>不得单独行动 · 最小行动单位为二人</li>
                      <li>规则记录优先于探索 · 先记录后深入</li>
                      <li>发现惩罚机制立即撤退 · 安全第一</li>
                      <li>遇未知现象不得主动试探 · 等待指示</li>
                    </ul>
                  </div>
                  <div className="regs-sub">
                    <h4>撤退与伤亡处理</h4>
                    <ul>
                      <li>撤退信号约定 · 三长两短通讯频率</li>
                      <li>伤员优先撤离 · 平民优先于溯界者</li>
                      <li>阵亡人员遗体处理 · 尽可能带回</li>
                      <li>失踪人员登记 · 72小时后纳入档案</li>
                    </ul>
                  </div>
                  <div className="regs-sub">
                    <h4>同化监测与报告</h4>
                    <ul>
                      <li>每48小时心理自评 · 在线提交</li>
                      <li>阶段一预警：失眠/幻觉 · 接受心理干预</li>
                      <li>阶段二：记忆错乱 · 强制撤离异常</li>
                      <li>阶段三：身份认知紊乱 · 终止溯界资格</li>
                      <li>行动结束24h初步报告 · 72h完整报告</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Announcements */}
            <div className="portal-grid">
              <div className="portal-card">
                <div className="portal-card-header">
                  <div className="portal-card-title">
                    <span className="code">NOTICE</span>
                    公告通知
                  </div>
                  <span className="portal-card-en">INTERNAL ANNOUNCEMENTS</span>
                </div>
                <div className="portal-card-body">
                  <div className="announce-list">
                    {announcements.map((a, i) => (
                      <div key={i} className={`announce-item ${expandedAnnounce === i ? "expanded" : ""}`}>
                        <div className="announce-header" onClick={() => toggleAnnounce(i)}>
                          <div className="announce-title-row">
                            <span className="announce-code">{a.id}</span>
                            <span className="announce-title">{a.title}</span>
                          </div>
                          <div className="announce-meta-row">
                            <span className="announce-source">{a.source}</span>
                            <span className="announce-date">{a.date}</span>
                            <span className="announce-arrow">{expandedAnnounce === i ? "▲" : "▼"}</span>
                          </div>
                        </div>
                        <div className={`announce-body ${expandedAnnounce === i ? "open" : ""}`}>
                          <div className="announce-body-inner">
                            {a.content.map((para, j) => (
                              <p key={j} className="announce-paragraph">{para}</p>
                            ))}
                            <div className="announce-actions">
                              <button className="announce-collapse-btn" onClick={() => toggleAnnounce(i)}>收起</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="portal-card">
                <div className="portal-card-header">
                  <div className="portal-card-title">
                    <span className="code">INFO</span>
                    溯界者个人信息
                  </div>
                  <span className="portal-card-en">{walkerRank.toUpperCase()}</span>
                </div>
                <div className="portal-card-body">
                  <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "20px" }}>
                    <div style={{
                      width: "60px", height: "60px",
                      borderRadius: "50%",
                      border: "2px solid var(--accent-red-bright)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-serif)",
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "var(--accent-red-bright)",
                      background: "radial-gradient(circle, rgba(196, 40, 40, 0.15), transparent)",
                    }}>
                      {walkerCode.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>
                        {walkerCode} · {walkerRank}
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-tertiary)", marginTop: "4px", letterSpacing: "0.1em" }}>
                        {walkerId}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "6px", borderBottom: "1px solid var(--border-color)" }}>
                      <span style={{ color: "var(--text-tertiary)" }}>所属组织</span>
                      <span style={{ color: "var(--text-primary)" }}>{walkerOrg}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "6px", borderBottom: "1px solid var(--border-color)" }}>
                      <span style={{ color: "var(--text-tertiary)" }}>当前状态</span>
                      <span style={{ color: "var(--level-ordinary)" }}>在岗</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "6px", borderBottom: "1px solid var(--border-color)" }}>
                      <span style={{ color: "var(--text-tertiary)" }}>参与行动</span>
                      <span style={{ color: "var(--text-primary)" }}>47次</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "6px", borderBottom: "1px solid var(--border-color)" }}>
                      <span style={{ color: "var(--text-tertiary)" }}>累计接触</span>
                      <span style={{ color: "var(--text-primary)" }}>238小时</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "6px", borderBottom: "1px solid var(--border-color)" }}>
                      <span style={{ color: "var(--text-tertiary)" }}>心理评估</span>
                      <span style={{ color: "var(--level-ordinary)" }}>正常</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "6px", borderBottom: "1px solid var(--border-color)" }}>
                      <span style={{ color: "var(--text-tertiary)" }}>下次评估</span>
                      <span style={{ color: "var(--text-primary)" }}>安珀历39年12月</span>
                    </div>
                  </div>
                  <Restricted level="topsecret" label="绝密级功能" compact>
                    <div style={{
                      marginTop: "16px",
                      padding: "10px 14px",
                      backgroundColor: "rgba(122, 58, 176, 0.1)",
                      border: "1px solid rgba(122, 58, 176, 0.4)",
                      fontSize: "11px",
                      color: "#a97bd4",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.1em",
                    }}>
                      ★ 管理员权限 · 系统管理入口已解锁
                    </div>
                  </Restricted>
                </div>
              </div>
            </div>

            {/* JRP + Operations */}
            <div className="portal-grid">
              <div className="portal-card">
                <div className="portal-card-header">
                  <div className="portal-card-title">
                    <span className="code">JRP</span>
                    联合响应规程
                  </div>
                  <span className="portal-card-en">JOINT RESPONSE PROTOCOL</span>
                </div>
                <div className="portal-card-body">
                  <p style={{
                    fontSize: "12px",
                    color: "var(--text-secondary)",
                    lineHeight: "1.6",
                    marginBottom: "16px",
                    padding: "10px 14px",
                    backgroundColor: "rgba(196, 40, 40, 0.06)",
                    borderLeft: "2px solid var(--accent-red-bright)",
                  }}>
                    当异常达到深渊级及以上，或涉及多国/跨区域联动时启动。IMAC拥有最高调度权。
                  </p>
                  <ul className="jrp-list">
                    {jrpClauses.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="portal-card">
                <div className="portal-card-header">
                  <div className="portal-card-title">
                    <span className="code">OPS</span>
                    目前活跃行动
                  </div>
                  <span className="portal-card-en">ACTIVE OPERATIONS</span>
                </div>
                <div className="portal-card-body">
                  <div className="ops-list">
                    {activeOperations.map((op, i) => (
                      <div key={i} className={`ops-item ${op.featured ? "abyssal" : ""}`}>
                        <div className="ops-main">
                          <span className="ops-code">{op.code} · {op.org}</span>
                          <span className="ops-name">{op.name}</span>
                        </div>
                        <div className="ops-meta">
                          <span className={`ops-badge ${op.levelClass}`}>{op.level}</span>
                          <span className="ops-status">{op.response} · {op.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="portal-footer">
              <div className="portal-footer-left">
                IMAC INTRANET v4.2.1 · XDPS PROTOCOL STACK v4.2 · AID ENGINE v2.7
              </div>
              <div className="portal-footer-warning">
                ⚠ 本页面内容仅限授权人员访问 · 禁止截屏或外传
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

window.PortalPage = PortalPage;
