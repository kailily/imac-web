// Anomaly Detail Page
function AnomalyDetailPage() {
  const { navigate } = useRouter();
  const [anomalyId, setAnomalyId] = React.useState("LOA-0073");

  React.useEffect(() => {
    const hash = window.location.hash.slice(1);
    const parts = hash.split("/anomaly/");
    if (parts.length > 1) {
      setAnomalyId(parts[1]);
    }
  }, []);

  // Default to LOA-0073 full data; others show placeholder
  const isDefault = anomalyId === "LOA-0073";
  const isStairwell = anomalyId === "SPA-0021";

  // === SPA-0021 无尽楼梯 档案数据 ===
  const stairVerifiedRules = [
    { num: "一", title: "方向守恒", desc: "进入异常后，无论向上还是向下，行走方向感始终指向「下楼」，但楼层会循环：从2层平台下楼会回到4层，从4层下楼回到3层，依次循环。1层与5层从未被观测到。" },
    { num: "二", title: "停留惩罚", desc: "在任意楼梯平台上停留超过约3分钟，楼梯会「变化」——扶手变旧、墙面出现细密裂缝、台阶边缘磨损加剧；再次观察时，所在位置相对原位置偏移约半层。连续触发两次停留惩罚后，楼梯将无法再次识别。" },
    { num: "三", title: "同伴不可回应", desc: "同行者始终可见，彼此能正常行走，但互相呼喊没有任何声音传回——声波被折叠空间吸收。通过身体接触（握手/搭肩）可以维持位置确认。" },
    { num: "四", title: "光照恒定", desc: "异常楼梯间无自然光，照明恒定且无光源可见。不存在「黑暗阶段」，手电等光源无效但也不受影响。" },
  ];

  const stairSpeculatedRules = [
    "楼梯可能具有「活体」特性：调查显示，与白鸽公寓同款式楼梯的多栋建筑，其楼梯间开始出现细微异常（台阶数增加、扶手老旧速度加快）",
    "到达1层的条件可能不是「走完楼梯」，而是满足某种空间条件（如同时有两组人从上下两个方向经过折叠点）",
    "异常核心疑似位于2层平台与3层平台之间的「折叠点」，该处温度比楼梯间其他位置低约4℃",
    "部分失踪者可能在楼梯「折叠层」中存活——有返回者称在循环中看到过疑似人影",
  ];

  const stairEntryRecords = [
    { term: "第一批", year: "安珀历12年·秋", count: 5, org: "洛林警署", result: "2人生还，3人失踪", status: "mixed" },
    { term: "第二批", year: "安珀历13年·春", count: 8, org: "BRI", result: "3人生还，5人失踪", status: "mixed" },
    { term: "第三批", year: "安珀历15年", count: 10, org: "BRI", result: "2人生还，8人失踪", status: "death" },
    { term: "第四批", year: "安珀历18年", count: 12, org: "BRI", result: "3人生还，9人失踪", status: "death" },
    { term: "第五批", year: "安珀历22年", count: 14, org: "BRI", result: "3人生还，11人失踪", status: "death" },
    { term: "第六批", year: "安珀历27年", count: 15, org: "BRI/晨星团联合", result: "3人生还，12人失踪", status: "death" },
    { term: "第七批", year: "安珀历31年", count: 12, org: "BRI", result: "2人生还，10人失踪", status: "death" },
    { term: "第八批", year: "安珀历36年·冬", count: 11, org: "BRI", result: "2人生还，9人失踪", status: "death" },
  ];

  const verifiedRules = [
    { num: "一", title: "身份分配", desc: "进入者自动获得学生身份与「剧情书」，严重偏离角色设定将触发惩罚。剧情书内容因人而异。" },
    { num: "二", title: "区域限制", desc: "不可破坏校园建筑与设施。越界进入未开放区域将触发空间排斥，严重者直接消失。" },
    { num: "三", title: "宵禁制度", desc: "23:00 至次日 6:00 期间必须返回宿舍。夜间外出者死亡率 100%，无例外记录。" },
    { num: "四", title: "教学制度", desc: "定期进行才能考核。排名第一者可获得「特殊奖励」，内容未知，疑似与离开路径相关。" },
  ];

  const speculatedRules = [
    "时间流速异常，内外时间偏差约 3-7 倍，具体比例不固定",
    "存在多条可能的离开路径，不限于考核第一",
    "校长为核心 NPC，掌握异常关键信息",
    "白玫瑰花园为异常核心区域，进入者极少返回",
  ];

  const buildings = [
    "主教学楼", "月华阁（宿舍）", "听雪楼（宿舍）",
    "青藤苑（宿舍）", "观星台（宿舍）", "望山居（宿舍）",
    "图书馆", "美术馆", "音乐厅", "体育馆",
    "植物园", "实验楼", "白玫瑰花园（中心）",
  ];

  const entryRecords = [
    { term: "第一届", year: "安珀历28年·冬", count: 12, org: "衔尾蛇事务所", result: "全员失踪", status: "death" },
    { term: "第二届", year: "安珀历29年·春", count: 8, org: "衔尾蛇事务所", result: "2人生还，6人失踪", status: "mixed" },
    { term: "第三届", year: "安珀历29年·秋", count: 15, org: "BRI联合考察", result: "13人死亡，2人同化", status: "death" },
    { term: "第四届", year: "安珀历30年·夏", count: 10, org: "晨星团", result: "全员失踪", status: "death" },
    { term: "第五届", year: "安珀历31年·冬", count: 6, org: "衔尾蛇事务所", result: "1人生还，5人失踪", status: "mixed" },
    { term: "第六届", year: "安珀历33年·春", count: 20, org: "BRI/衔尾蛇联合", result: "18人死亡，2人生还后死亡", status: "death" },
    { term: "第七届", year: "安珀历34年·秋", count: 9, org: "悬铃木学会", result: "全员同化", status: "assim" },
    { term: "第八届", year: "安珀历36年·夏", count: 12, org: "衔尾蛇事务所", result: "10人失踪，2人死亡", status: "death" },
    { term: "第九届", year: "安珀历37年·冬", count: 7, org: "长桥会社", result: "全员失踪", status: "death" },
    { term: "第十届", year: "安珀历38年·秋", count: 9, org: "衔尾蛇事务所", result: "1人生还，8人失踪", status: "mixed" },
    { term: "第十一届", year: "安珀历39年·秋", count: 6, org: "衔尾蛇事务所 + BRI 联合行动", result: "进行中 · 全员失联", status: "active", current: true, members: [
      { name: "沈彻", rank: "资深溯界者·执灯", org: "衔尾蛇事务所", role: "队长 · 行动指挥", isLeader: true, orgType: "anomalist" },
      { name: "季明轩", rank: "溯界者·破界", org: "衔尾蛇事务所", role: "队员", isLeader: false, orgType: "anomalist" },
      { name: "顾泽鸣", rank: "资深溯界者·执灯", org: "BRI", role: "队长 · 学术负责", isLeader: true, orgType: "anomalist" },
      { name: "林薇", rank: "溯界者·破界", org: "BRI", role: "队员 · 外勤侦察", isLeader: false, orgType: "anomalist" },
      { name: "姜言", rank: "平民", org: "被卷入民众", role: "广告公司职员", isLeader: false, orgType: "civilian" },
      { name: "苏晚晴", rank: "平民", org: "被卷入民众", role: "大学生", isLeader: false, orgType: "civilian" },
    ]},
  ];

  if (!isDefault && !isStairwell) {
    return (
      <>
        <style>{`
          .detail-placeholder {
            padding: 100px 0;
            text-align: center;
            min-height: 70vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
          }
          .detail-placeholder-id {
            font-family: var(--font-mono);
            font-size: 48px;
            font-weight: 700;
            color: var(--text-muted);
            letter-spacing: 0.1em;
          }
          .detail-placeholder-text {
            font-size: 16px;
            color: var(--text-secondary);
          }
          .detail-back-link {
            font-family: var(--font-mono);
            font-size: 12px;
            color: var(--accent-red-bright);
            cursor: pointer;
            margin-top: 20px;
            border-bottom: 1px solid var(--accent-red-bright);
            padding-bottom: 2px;
          }
        `}</style>
        <div className="archive-page">
          <div className="archive-auth-bar">
            <div className="archive-auth-inner">
              <div className="archive-auth-status">
                <div className="dot"></div>
                <span>已认证 · 访问级别：标准</span>
              </div>
              <span className="archive-logout" onClick={() => navigate("/")}>退出认证</span>
            </div>
          </div>
          <div className="container detail-placeholder">
            <div className="detail-placeholder-id mono">{anomalyId}</div>
            <div className="detail-placeholder-text">该异常记录详情暂未公开</div>
            <div className="detail-placeholder-text" style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              仅作列表演示 · 完整档案请查看 LOA-0073 赤月学院
            </div>
            <span className="detail-back-link" onClick={() => navigate("/anomaly-archive")}>← 返回档案列表</span>
            <div className="file-archive-notice" style={{ marginTop: "48px", maxWidth: "560px", textAlign: "left" }}>
              本档案已纳入 IMAC 全球异常信息总库，未经 IMAC 联合行动指挥中心授权，不得擅自复制或传播。
              <div className="file-archive-signature">—— IMAC 异常信息总库 · 安珀历39年春</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isStairwell) {
    const stairMap = (
      <div className="stair-map">
        <svg viewBox="0 0 320 200" width="100%" style={{ display: "block" }}>
          <rect x="40" y="10" width="240" height="180" fill="rgba(20,20,24,0.5)" stroke="rgba(74,88,104,0.4)" strokeWidth="1" strokeDasharray="4 3"/>
          <rect x="50" y="18" width="64" height="8" fill="rgba(74,88,104,0.55)"/>
          <rect x="210" y="68" width="64" height="8" fill="rgba(74,88,104,0.55)"/>
          <rect x="50" y="118" width="64" height="8" fill="rgba(74,88,104,0.55)"/>
          <line x1="114" y1="22" x2="210" y2="72" stroke="rgba(196,40,40,0.5)" strokeWidth="2"/>
          <line x1="210" y1="72" x2="114" y2="122" stroke="rgba(196,40,40,0.5)" strokeWidth="2"/>
          <path d="M60 132 C 30 132, 30 22, 50 22" fill="none" stroke="rgba(196,154,44,0.7)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#stairArrow)"/>
          <defs>
            <marker id="stairArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(196,154,44,0.9)"/>
            </marker>
          </defs>
          <text x="60" y="16" fill="rgba(168,168,180,0.8)" fontSize="11" fontFamily="monospace">4F</text>
          <text x="220" y="66" fill="rgba(168,168,180,0.8)" fontSize="11" fontFamily="monospace">3F</text>
          <text x="60" y="116" fill="rgba(168,168,180,0.8)" fontSize="11" fontFamily="monospace">2F</text>
          <circle cx="150" cy="95" r="4" fill="#c42828"/>
          <text x="160" y="99" fill="rgba(196,40,40,0.9)" fontSize="9" fontFamily="monospace">折叠点</text>
          <text x="230" y="180" fill="rgba(112,112,124,0.6)" fontSize="9" fontFamily="monospace">1F / 5F 不可达</text>
        </svg>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-tertiary)", marginTop: "10px", textAlign: "center", letterSpacing: "0.08em" }}>
          楼层循环：2F → 3F → 4F → 2F · 折叠点位于 2F–3F 之间（温度低约 4℃）
        </div>
      </div>
    );

    const stairData = {
      id: "SPA-0021",
      name: "无尽楼梯",
      nameEn: "ENDLESS STAIRWELL · HAZARDOUS",
      stamp: "机密 · CONFIDENTIAL",
      classification: "CONFIDENTIAL",
      ver: "39.1",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      info: [
        ["异常编号", <span className="detail-file-id" style={{ fontSize: "18px" }}>SPA-0021</span>, "名称", "无尽楼梯 · Endless Stairwell"],
        ["所属管辖", "边界研究院（BRI）· Boundary Research Institute", "首次记录", "安珀历12年 · 秋"],
        ["异常等级", { levelKey: "hazardous", text: "危险级 · HAZARDOUS" }, "当前状态", { statusKey: "active", text: "● 活跃 ACTIVE" }],
        ["生还率", <span className="survival-rate-red">约 23%</span>, "信息价值", "高（空间折叠机理研究价值高）"],
        ["档案更新", "安珀历39年 · 春", "监测状态", "持续监测中 · 年均拉入 2-3 起"],
      ],
      discovery: [
        "安珀历12年秋，洛林自由市旧城区的「白鸽公寓」B座住户连续向警署报案：多名居民表示在下楼时「走了很久都到不了一楼」，一名住户甚至在三楼台阶上原地消失，数小时后从四楼平台重新出现，全程无意识。",
        "BRI 调查组介入后确认，公寓2层至3层之间的楼梯间存在空间折叠异常。此后异常范围缓慢向整栋公寓的楼梯系统蔓延，现已覆盖全部三个楼梯井。公寓于安珀历14年整体封闭，原住民全部迁出。",
      ],
      features: [
        "无尽楼梯是一处典型的<strong>空间折叠型异常</strong>（SPA 子类·折叠）。异常主体为白鸽公寓B座楼梯间：进入后楼梯可无限延伸，无论向上还是向下，台阶数恒定，楼层标识在 2/3/4 层之间循环，1层与5层从未被观测到。",
        "异常内部光照恒定、无自然光、无声源。同行者始终可见，但声音无法在楼梯间传递。扶手、墙面与台阶材质与正常建筑一致，但会随停留时间发生缓慢「老化」。",
        "异常入口位于2层平台，进入条件未知。部分报告显示，与白鸽公寓同款式的其他建筑楼梯间也可能成为异常入口——相关建筑已被列为观察对象。",
      ],
      mapNode: stairMap,
      mapTag: "结构示意 · DIAGRAM",
      verifiedRules: stairVerifiedRules,
      speculatedRules: stairSpeculatedRules,
      entryRecords: stairEntryRecords,
      phenomena: [
        "<strong>楼梯「老化」残留：</strong>返回者描述，停留后楼梯扶手会出现明显旧化；且旧化痕迹在返回正常世界后，仍出现在白鸽公寓未被异常覆盖的楼梯段上，疑似异常具有「溢出」特性。",
        "<strong>「折叠层」人影：</strong>第三批进入的返回者声称，在循环中多次看到台阶下方半层处有疑似人影站立，呼喊无回应，人影始终保持固定姿势。",
        "<strong>同款式建筑征兆：</strong>监测显示，洛林自由市内另有两栋同款式公寓的楼梯间出现台阶数异常增加、扶手旧化加速等前兆，是否发展为异常尚在观察。",
      ],
      imacNote: "无尽楼梯是空间折叠型异常的典型案例，其「循环楼层」结构对异常空间学具有重要参考价值。异常长期活跃但拉入频率较低（年均约2-3起），对周边居民影响可控。鉴于其潜在的扩散特性，IMAC 协调办公室已将其列为「空间异常扩散观察区」。任何组织在进入前必须提交完整方案并获得 IMAC 及 BRI 联合审批。未经授权的私自进入将被视为严重违规。",
      suggestedActions: [
        "在公寓周边布设空间波动监测装置，记录异常「呼吸」周期与折叠点位移规律",
        "联合晨星团开展几何拓扑测绘，尝试定位 2F–3F 间「折叠点」的空间坐标",
        "评估异常扩张趋势，必要时启动洛林自由市同款式公寓居民的整体迁移预案",
      ],
      internalNode: (
        <Restricted level="internal" label="机密级内容" compact>
          <div className="internal-note">
            <p className="internal-note-text">
              【边界研究院内部评估 · 空间异常研究所】<br/><br/>
              无尽楼梯的空间折叠机理与「洛林裂隙」（PHA-0182）存在显著相似性——两者都可能共享同一类空间结构源。
              若推测规则一（「活体」特性）成立，该异常可能是同类折叠异常的「母体」。<br/><br/>
              建议将其纳入「空间异常联合研究计划」，并尝试在折叠点布设 MK-III 型信标，
              以验证「双向经过折叠点」能否抵达 1 层。此举风险可控，建议由 BRI 与晨星团联合执行。
            </p>
            <div className="internal-note-signature">— 顾远舟 · 边界研究院院长 · 空间异常研究所</div>
          </div>
        </Restricted>
      ),
    };

    return <AnomalyDossier data={stairData} />;
  }

  return (
    <>
      <style>{`
        .detail-page {
          padding-top: 64px;
          background-color: #08080a;
          min-height: 100vh;
        }
        .detail-auth-bar {
          background-color: var(--bg-deep);
          border-bottom: 1px solid var(--border-color);
          padding: 12px 0;
          position: sticky;
          top: 64px;
          z-index: 100;
        }
        .detail-auth-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .detail-auth-status {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
        }
        .detail-auth-status .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--level-ordinary);
        }
        .detail-breadcrumbs {
          padding: 24px 0;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .detail-crumb {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          cursor: pointer;
          letter-spacing: 0.1em;
          transition: color 0.2s ease;
        }
        .detail-crumb:hover { color: var(--accent-red-bright); }
        .detail-crumb.current {
          color: var(--text-primary);
          cursor: default;
        }
        .detail-crumb-sep {
          color: var(--text-muted);
          font-size: 12px;
        }
        .detail-body {
          padding: 40px 0 80px;
          position: relative;
        }
        .detail-file-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid var(--accent-red);
          flex-wrap: wrap;
          gap: 20px;
        }
        .detail-title-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .detail-file-id {
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 700;
          color: var(--accent-red-bright);
          letter-spacing: 0.1em;
        }
        .detail-title {
          font-family: var(--font-serif);
          font-size: 42px;
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: 0.08em;
        }
        .detail-title-en {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
        }
        /* Info table */
        .detail-info-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 40px;
          background-color: rgba(20, 20, 24, 0.5);
          border: 1px solid var(--border-color);
        }
        .detail-info-table th, .detail-info-table td {
          padding: 14px 20px;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
          font-size: 14px;
        }
        .detail-info-table th {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          background-color: rgba(139, 26, 26, 0.08);
          width: 18%;
          border-right: 1px solid var(--border-color);
        }
        .detail-info-table tr:last-child th,
        .detail-info-table tr:last-child td {
          border-bottom: none;
        }
        .level-badge-inline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 14px;
          background-color: rgba(196, 40, 40, 0.15);
          border: 1px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }
        .level-badge-inline::before {
          content: "";
          width: 8px;
          height: 8px;
          background-color: var(--accent-red-bright);
          box-shadow: 0 0 8px var(--accent-red-bright);
        }
        .status-active-text {
          color: var(--level-hazardous);
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }
        .survival-rate-red {
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-weight: 700;
        }
        /* File sections */
        .file-section { margin-bottom: 36px; }
        .file-section-header {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 16px; padding-bottom: 10px;
          border-bottom: 1px solid var(--border-color);
        }
        .file-section-num {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--accent-red-bright); letter-spacing: 0.1em;
          width: 40px;
        }
        .file-section-title {
          font-family: var(--font-serif); font-size: 20px;
          font-weight: 700; color: var(--text-primary);
        }
        .file-section-text {
          font-size: 14px; line-height: 1.9;
          color: var(--text-secondary); padding-left: 52px;
        }
        .file-section-text p { margin-bottom: 12px; }
        .file-section-text p:last-child { margin-bottom: 0; }
        .file-section-text strong { color: var(--text-primary); font-weight: 500; }
        .buildings-grid {
          display: flex; flex-wrap: wrap; gap: 8px;
          padding-left: 52px;
        }
        .building-tag {
          padding: 6px 14px;
          background-color: rgba(74, 88, 104, 0.1);
          border: 1px solid var(--steel-blue-dark);
          font-size: 12px; color: var(--steel-blue-light);
          font-family: var(--font-mono); letter-spacing: 0.05em;
        }
        .building-tag.core {
          border-color: var(--accent-red);
          color: var(--accent-red-bright);
          background-color: rgba(139, 26, 26, 0.1);
        }
        .rules-list {
          display: flex; flex-direction: column; gap: 12px;
          padding-left: 52px;
        }
        .rule-item {
          display: flex; gap: 16px;
          padding: 16px 20px;
          background-color: rgba(20, 20, 24, 0.4);
          border-left: 3px solid;
        }
        .rule-item.verified { border-left-color: var(--level-ordinary); }
        .rule-item.speculated { border-left-color: var(--text-muted); }
        .rule-num {
          font-family: var(--font-serif); font-size: 24px;
          font-weight: 700; color: var(--text-tertiary);
          line-height: 1; flex-shrink: 0; width: 36px;
        }
        .rule-content { flex: 1; }
        .rule-title {
          font-size: 15px; font-weight: 600;
          color: var(--text-primary); margin-bottom: 4px;
          display: flex; align-items: center; gap: 10px;
        }
        .rule-tag {
          font-family: var(--font-mono); font-size: 10px;
          padding: 2px 8px; letter-spacing: 0.1em;
          border: 1px solid;
        }
        .rule-item.verified .rule-tag {
          color: var(--level-ordinary); border-color: var(--level-ordinary);
        }
        .rule-item.speculated .rule-tag {
          color: var(--text-muted); border-color: var(--text-muted);
        }
        .rule-desc {
          font-size: 13px; color: var(--text-secondary); line-height: 1.7;
        }
        .speculated-list {
          padding-left: 52px; list-style: none;
        }
        .speculated-list li {
          position: relative; padding-left: 20px;
          font-size: 13px; color: var(--text-tertiary); line-height: 1.8;
        }
        .speculated-list li::before {
          content: "?"; position: absolute; left: 0; top: 0;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-muted);
        }
        .entry-records {
          width: calc(100% - 52px);
          margin-left: 52px;
          border-collapse: collapse;
          font-size: 13px;
        }
        .entry-records th {
          font-family: var(--font-mono); font-size: 11px;
          font-weight: 500; color: var(--text-tertiary);
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 12px 14px; text-align: left;
          border-bottom: 1px solid var(--border-color);
          background-color: rgba(139, 26, 26, 0.05);
        }
        .entry-records td {
          padding: 12px 14px;
          border-bottom: 1px solid rgba(42, 42, 50, 0.5);
          color: var(--text-secondary);
        }
        .entry-records tr:hover td {
          background-color: rgba(255, 255, 255, 0.02);
        }
        .entry-records .term {
          font-family: var(--font-serif); font-weight: 600;
          color: var(--text-primary);
        }
        .entry-records .count { font-family: var(--font-mono); }
        .entry-records .death {
          color: var(--accent-red-bright);
          font-family: var(--font-mono); font-weight: 700;
        }
        .entry-records .mixed {
          color: var(--level-hazardous);
          font-family: var(--font-mono); font-weight: 500;
        }
        .entry-records .assim {
          color: var(--level-unknown);
          font-family: var(--font-mono); font-weight: 500;
        }
        .entry-records .active {
          color: var(--level-ordinary);
          font-family: var(--font-mono); font-weight: 500;
        }
        .entry-records .current-tag {
          display: inline-block;
          margin-left: 8px;
          padding: 1px 6px;
          font-size: 10px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
          background-color: rgba(196, 40, 40, 0.15);
          border: 1px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          vertical-align: middle;
        }
        .current-members-row td {
          padding: 0 !important;
          border-bottom: 1px solid var(--border-color) !important;
          background-color: rgba(196, 40, 40, 0.04) !important;
        }
        .current-members-label {
          padding: 16px 20px 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
        }
        .current-members-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          padding: 0 20px 20px;
        }
        .member-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 12px 14px;
          position: relative;
          transition: all 0.2s ease;
        }
        .member-card.member-leader {
          border-color: var(--accent-red-bright);
          background: linear-gradient(135deg, rgba(196, 40, 40, 0.1), var(--bg-card));
        }
        .member-card.member-civilian {
          border-style: dashed;
          border-color: rgba(196, 154, 44, 0.5);
          background: linear-gradient(135deg, rgba(196, 154, 44, 0.05), var(--bg-card));
        }
        .member-name {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .member-leader-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 600;
          color: var(--accent-red-bright);
          border: 1px solid var(--accent-red-bright);
          padding: 1px 5px;
          letter-spacing: 0.1em;
          line-height: 1.4;
        }
        .member-civilian-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 500;
          color: #c49a2c;
          border: 1px solid rgba(196, 154, 44, 0.6);
          padding: 1px 5px;
          letter-spacing: 0.1em;
          line-height: 1.4;
        }
        .member-civilian .member-rank {
          color: #c49a2c;
        }
        .member-rank {
          font-size: 11px;
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }
        .member-org {
          font-size: 11px;
          color: var(--text-tertiary);
          margin-bottom: 2px;
        }
        .member-role {
          font-size: 11px;
          color: var(--text-secondary);
        }
        @media (max-width: 700px) {
          .current-members-grid { grid-template-columns: 1fr 1fr; }
        }
        .phenomena-list {
          padding-left: 52px; list-style: none;
        }
        .phenomena-list li {
          position: relative; padding-left: 24px;
          font-size: 13px; color: var(--text-secondary);
          line-height: 1.8; margin-bottom: 8px;
        }
        .phenomena-list li::before {
          content: "◆"; position: absolute; left: 0; top: 0;
          color: var(--accent-red-bright); font-size: 10px;
        }
        .phenomena-list strong { color: var(--text-primary); }
        .note-box {
          margin-left: 52px;
          padding: 20px 24px;
          background-color: rgba(139, 26, 26, 0.05);
          border: 1px solid rgba(196, 40, 40, 0.3);
          position: relative;
        }
        .note-box::before {
          content: "IMAC NOTE";
          position: absolute; top: -10px; left: 20px;
          background-color: #08080a;
          padding: 0 10px;
          font-family: var(--font-mono); font-size: 10px;
          color: var(--accent-red-bright); letter-spacing: 0.15em;
        }
        .note-text {
          font-size: 13px; color: var(--text-secondary);
          line-height: 1.8; font-style: italic;
        }
        .internal-note {
          margin-left: 52px; margin-top: 20px;
          padding: 20px 24px;
          background-color: rgba(122, 58, 176, 0.05);
          border: 1px solid rgba(122, 58, 176, 0.3);
          position: relative;
        }
        .internal-note::before {
          content: "内部评估 · INTERNAL";
          position: absolute; top: -10px; left: 20px;
          background-color: #08080a;
          padding: 0 10px;
          font-family: var(--font-mono); font-size: 10px;
          color: var(--level-unknown); letter-spacing: 0.15em;
        }
        .internal-note-text {
          font-size: 13px; color: var(--text-secondary); line-height: 1.8;
        }
        .internal-note-signature {
          margin-top: 12px; text-align: right;
          font-family: var(--font-serif); font-size: 13px;
          color: var(--text-tertiary); font-style: italic;
        }
        .file-footer {
          margin-top: 50px; padding-top: 20px;
          border-top: 2px solid var(--accent-red);
          display: flex; justify-content: space-between;
          align-items: center; flex-wrap: wrap; gap: 16px;
        }
        .file-meta {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--text-muted); letter-spacing: 0.1em;
        }
        .file-archive-notice {
          margin-top: 18px;
          padding: 14px 18px;
          border: 1px solid rgba(196, 40, 40, 0.25);
          background: rgba(196, 40, 40, 0.04);
          font-size: 12px;
          color: var(--text-tertiary);
          line-height: 1.7;
        }
        .file-archive-signature {
          margin-top: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          text-align: right;
          letter-spacing: 0.05em;
        }
        @media (max-width: 1024px) {
          .file-section-text, .buildings-grid, .rules-list,
          .speculated-list, .phenomena-list, .note-box, .internal-note {
            padding-left: 0; margin-left: 0;
          }
          .entry-records { margin-left: 0; width: 100%; }
          .detail-info-table th { width: 25%; }
        }
        @media (max-width: 768px) {
          .detail-title { font-size: 28px; }
          .detail-file-header { flex-direction: column; align-items: flex-start; }
          .detail-info-table { display: block; overflow-x: auto; }
          .entry-records { display: block; overflow-x: auto; white-space: nowrap; }
          .detail-auth-inner, .container { padding: 0 16px; }
        }
      `}</style>

      <div className="detail-page">
        {/* Auth Status Bar */}
        <div className="detail-auth-bar">
          <div className="detail-auth-inner">
            <div className="detail-auth-status">
              <div className="dot"></div>
              <span>已认证 · 访问级别：标准 / ACCESS LEVEL: STANDARD</span>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", cursor: "pointer", letterSpacing: "0.1em" }} onClick={() => navigate("/")}>
              退出认证
            </span>
          </div>
        </div>

        <div className="container">
          {/* Breadcrumbs */}
          <div className="detail-breadcrumbs">
            <span className="detail-crumb" onClick={() => navigate("/")}>首页</span>
            <span className="detail-crumb-sep">/</span>
            <span className="detail-crumb" onClick={() => navigate("/database")}>异常信息数据库</span>
            <span className="detail-crumb-sep">/</span>
            <span className="detail-crumb current">LOA-0073 赤月学院</span>
          </div>

          <div className="detail-body">
            {/* Header */}
            <div className="detail-file-header">
              <div className="detail-title-group">
                <span className="detail-file-id">LOA-0073</span>
                <h1 className="detail-title">赤月学院</h1>
                <span className="detail-title-en">CRIMSON MOON ACADEMY · ABYSSAL</span>
              </div>
              <div className="stamp">绝密 · EYES ONLY</div>
            </div>

            {/* Info Table */}
            <table className="detail-info-table">
              <tbody>
                <tr>
                  <th>异常编号</th>
                  <td><span className="detail-file-id" style={{ fontSize: "18px" }}>LOA-0073</span></td>
                  <th>名称</th>
                  <td>赤月学院 · Crimson Moon Academy</td>
                </tr>
                <tr>
                  <th>所属管辖</th>
                  <td>衔尾蛇事务所 · Ouroboros Agency</td>
                  <th>首次记录</th>
                  <td>安珀历28年 · 秋</td>
                </tr>
                <tr>
                  <th>异常等级</th>
                  <td><span className="level-badge-inline" style={{ color: "#c42828", borderColor: "#c42828", backgroundColor: "rgba(196,40,40,0.15)" }}>深渊级 · ABYSSAL</span></td>
                  <th>当前状态</th>
                  <td><span className="status-active-text" style={{ color: "#c42828" }}>● 活跃 ACTIVE</span></td>
                </tr>
                <tr>
                  <th>生还率</th>
                  <td><span className="survival-rate-red">约 1.7%</span> （116人进入，2人生还后死亡）</td>
                  <th>档案更新</th>
                  <td>安珀历39年 · 秋</td>
                </tr>
                <tr>
                  <th>当前批次</th>
                  <td style={{ color: "var(--accent-red-bright)" }} colSpan={3}>第十一届 · 进行中 · IMAC联合行动（衔尾蛇+BRI联合派遣 · 6人 · 全员失联）</td>
                </tr>
              </tbody>
            </table>

            {/* Discovery */}
            <div className="file-section">
              <div className="file-section-header">
                <span className="file-section-num mono">§ 01</span>
                <span className="file-section-title">发现经过</span>
              </div>
              <div className="file-section-text">
                <p>
                  安珀历28年秋，鸣海城西区一所废弃中学原址上突然出现了完整的校园建筑群。
                  当地居民报告称前一日该处还是一片拆迁工地，一夜之间出现了占地约三万平方米的学院建筑。
                  首批进入调查的五名警员无一返回。衔尾蛇事务所接管后，派出第一支十二人专业队伍，
                  同样全员失踪。至此确认为S级以上异常，后经重新评级定为深渊级。
                </p>
                <p>
                  异常入口位置不固定，有时是一扇门，有时是一面墙，甚至可能是地铁车厢的某一节。
                  被拉入者的共同特征是「正在独处」——这是目前唯一可确认的选取规律。
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="file-section">
              <div className="file-section-header">
                <span className="file-section-num mono">§ 02</span>
                <span className="file-section-title">基本特征</span>
              </div>
              <div className="file-section-text">
                <p>
                  赤月学院是一座典型的<strong>叙事型异常</strong>。进入者会被分配一个「学生」身份，
                  并获得属于自己的「剧情书」。剧情书内容因人而异，记载了该角色在校园中的身份、
                  人际关系、以及需要完成的「剧情任务」。严重偏离剧情设定将触发惩罚。
                </p>
                <p>
                  异常的天空永远是暗红色的，悬挂着一轮巨大的红色月亮——这也是「赤月学院」名称的由来。
                  月亮的大小和位置会变化，但永远不会落下。异常内部没有太阳，也没有昼夜交替，
                  时间通过钟楼的钟声和宿舍熄灯来标记。
                </p>
              </div>
            </div>

            {/* Environment - Interactive Map */}
            <div className="file-section">
              <div className="file-section-header">
                <span className="file-section-num mono">§ 03</span>
                <span className="file-section-title">内部环境 · 学院平面图</span>
                <span className="tag danger">交互地图 · INTERACTIVE</span>
              </div>
              <div className="academy-map-wrapper">
                <Restricted level="internal" label="机密级内容">
                  <AcademyMap />
                </Restricted>
              </div>
            </div>

            {/* Verified Rules */}
            <div className="file-section">
              <div className="file-section-header">
                <span className="file-section-num mono">§ 04</span>
                <span className="file-section-title">已确认规则</span>
                <span className="tag verified">已验证 · VERIFIED</span>
              </div>
              <div className="rules-list">
                {verifiedRules.map((rule) => (
                  <div key={rule.num} className="rule-item verified">
                    <div className="rule-num">{rule.num}</div>
                    <div className="rule-content">
                      <div className="rule-title">
                        规则{rule.num}：{rule.title}
                        <span className="rule-tag">已验证</span>
                      </div>
                      <p className="rule-desc">{rule.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Speculated */}
            <div className="file-section">
              <div className="file-section-header">
                <span className="file-section-num mono">§ 05</span>
                <span className="file-section-title">推测规则</span>
                <span className="tag pending">待验证 · UNCONFIRMED</span>
              </div>
              <ul className="speculated-list">
                {speculatedRules.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            {/* Entry Records */}
            <div className="file-section">
              <div className="file-section-header">
                <span className="file-section-num mono">§ 06</span>
                <span className="file-section-title">进入记录</span>
              </div>
              <table className="entry-records">
                <thead>
                  <tr>
                    <th>届次</th>
                    <th>年份</th>
                    <th>进入人数</th>
                    <th>主导组织</th>
                    <th>结果</th>
                  </tr>
                </thead>
                <tbody>
                  {entryRecords.map((rec) => (
                    <React.Fragment key={rec.term}>
                      <tr>
                        <td className="term">{rec.term}{rec.current && <span className="current-tag">当前</span>}</td>
                        <td>{rec.year}</td>
                        <td className="count">{rec.count}</td>
                        <td>{rec.org}</td>
                        <td className={rec.status}>{rec.result}</td>
                      </tr>
                      {rec.current && rec.members && (
                        <tr className="current-members-row">
                          <td colSpan={5}>
                            <div className="current-members-label">队员构成 · TEAM ROSTER</div>
                            <div className="current-members-grid">
                               {rec.members.map((m, i) => (
                                 <div key={i} className={`member-card ${m.isLeader ? "member-leader" : ""} ${m.orgType === "civilian" ? "member-civilian" : ""}`}>
                                   <div className="member-name">
                                     {m.name}
                                     {m.isLeader && <span className="member-leader-tag">队长</span>}
                                     {m.orgType === "civilian" && <span className="member-civilian-tag">平民</span>}
                                   </div>
                                   <div className="member-rank">{m.rank}</div>
                                   <div className="member-org">{m.org}</div>
                                   <div className="member-role">{m.role}</div>
                                 </div>
                               ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Special Phenomena */}
            <div className="file-section">
              <div className="file-section-header">
                <span className="file-section-num mono">§ 07</span>
                <span className="file-section-title">特殊现象</span>
              </div>
              <ul className="phenomena-list">
                <li><strong>规则自我修正迹象：</strong>第四届进入后，「剧情书」的内容明显比第一届更为复杂和精细，疑似异常具有学习和进化能力。</li>
                <li><strong>生还者共性后遗症：</strong>仅有的两名义生还者均在返回后三年内死亡，死因均为「在睡梦中停止呼吸」。尸检无异常。</li>
                <li><strong>拉入机制不可预测：</strong>入口出现完全随机，受害者可能在家中、办公室、甚至行驶的车辆中被拉入。无预警时间。</li>
                <li><strong>「白玫瑰」现象：</strong>多名生还者（含死后）的私人物品中发现了干燥的白色玫瑰花瓣，来源不明。</li>
              </ul>
            </div>

            {/* Notes */}
            <div className="file-section">
              <div className="file-section-header">
                <span className="file-section-num mono">§ 08</span>
                <span className="file-section-title">备注</span>
              </div>
              <div className="note-box">
                <p className="note-text">
                  赤月学院是目前已知持续时间最长、致死率最高的深渊级异常之一。
                  鉴于其不可预测的拉入机制和极高的死亡率，IMAC 协调办公室已将其列为
                  「优先级-阿尔法」观察对象。任何组织在采取行动前必须提交完整方案并获得 IMAC 审批。
                  未经授权的私自进入将被视为严重违规。
                </p>
              </div>
              <div className="internal-note">
                <Restricted level="internal" label="机密级内容" compact>
                  <p className="internal-note-text">
                    【衔尾蛇事务所内部评估 · 首席溯界者 陆沉舟】<br/><br/>
                    赤月学院不是一个「陷阱」。它是一个「谜题」。<br/><br/>
                    十一届进入，一百一十六人，没有一个人是被规则直接杀死的——他们要么失踪，要么「剧情失败」后消失，要么同化。
                    这不符合常规深渊级异常的行为模式。常规深渊级异常是「主动杀人」的，而赤月学院更像是在
                    <em style={{ color: "var(--text-primary)" }}> 「筛选」</em>
                    什么东西。<br/><br/>
                    白玫瑰花园是关键。所有接近过核心区域的人，即使回来了，也都变了。<br/>
                    我有一种感觉——这座学院在等待某个人。或者说，在等某个「学生」毕业。<br/><br/>
                    这是最后的谜题。也是我们必须解开的谜题。
                  </p>
                  <div className="internal-note-signature">— 陆沉舟 · 首席溯界者 · 界标</div>
                </Restricted>
              </div>
            </div>

            <div className="file-footer">
              <div className="file-meta">FILE ID: LOA-0073 / VER: 39.2 / CLASSIFICATION: EYES ONLY</div>
              <div className="file-meta">LAST UPDATED: 安珀历39年·春</div>
            </div>

            <div className="file-archive-notice">
              本档案已纳入 IMAC 全球异常信息总库，未经 IMAC 联合行动指挥中心授权，不得擅自复制或传播。
              <div className="file-archive-signature">—— IMAC 异常信息总库 · 安珀历39年春</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

window.AnomalyDetailPage = AnomalyDetailPage;
