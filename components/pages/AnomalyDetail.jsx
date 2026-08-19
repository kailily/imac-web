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
  const isHarbor = anomalyId === "LOA-0001";
  const isStairwell = anomalyId === "SPA-0021";
  const isTrain = anomalyId === "TMA-0045";
  const isOutpost = anomalyId === "TMB-0117";
  const isVoid = anomalyId === "PHA-0001";
  const isLoop = anomalyId === "SPA-0421";
  const isRift = anomalyId === "PHA-0182";

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
    { term: "第一届", year: "安珀历28年·冬", count: 12, org: "衔尾蛇", result: "全员失踪", status: "death" },
    { term: "第二届", year: "安珀历29年·春", count: 8, org: "衔尾蛇", result: "2人生还，6人失踪", status: "mixed" },
    { term: "第三届", year: "安珀历29年·秋", count: 15, org: "BRI联合考察", result: "13人死亡，2人同化", status: "death" },
    { term: "第四届", year: "安珀历30年·夏", count: 10, org: "晨星团", result: "全员失踪", status: "death" },
    { term: "第五届", year: "安珀历31年·冬", count: 6, org: "衔尾蛇", result: "1人生还，5人失踪", status: "mixed" },
    { term: "第六届", year: "安珀历33年·春", count: 20, org: "BRI/衔尾蛇联合", result: "18人死亡，2人生还后死亡", status: "death" },
    { term: "第七届", year: "安珀历34年·秋", count: 9, org: "悬铃木", result: "全员同化", status: "assim" },
    { term: "第八届", year: "安珀历36年·夏", count: 12, org: "衔尾蛇", result: "10人失踪，2人死亡", status: "death" },
    { term: "第九届", year: "安珀历37年·冬", count: 7, org: "长桥会社", result: "全员失踪", status: "death" },
    { term: "第十届", year: "安珀历38年·秋", count: 9, org: "衔尾蛇", result: "1人生还，8人失踪", status: "mixed" },
    { term: "第十一届", year: "安珀历39年·秋", count: 6, org: "BRI/衔尾蛇联合", result: "进行中 · 全员失联", status: "active", current: true, members: [
      { name: "沈彻", rank: "资深溯界者·执灯", org: "衔尾蛇", role: "队长 · 行动指挥", isLeader: true, orgType: "anomalist" },
      { name: "季明轩", rank: "溯界者·破界", org: "衔尾蛇", role: "队员", isLeader: false, orgType: "anomalist" },
      { name: "顾泽鸣", rank: "资深溯界者·执灯", org: "BRI", role: "队长 · 学术负责", isLeader: true, orgType: "anomalist" },
      { name: "林薇", rank: "溯界者·破界", org: "BRI", role: "队员 · 外勤侦察", isLeader: false, orgType: "anomalist" },
      { name: "姜言", rank: "平民", org: "被卷入民众", role: "广告公司职员", isLeader: false, orgType: "civilian" },
      { name: "苏晚晴", rank: "平民", org: "被卷入民众", role: "大学生", isLeader: false, orgType: "civilian" },
    ]},
  ];

  if (!isDefault && !isHarbor && !isStairwell && !isTrain && !isOutpost && !isVoid && !isLoop && !isRift) {
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

  if (isHarbor) {
    const harborMap = (
      <div className="stair-map">
        <svg viewBox="0 0 340 170" width="100%" style={{ display: "block" }}>
          {/* 铁门 */}
          <rect x="60" y="20" width="70" height="120" fill="rgba(20,20,24,0.9)" stroke="rgba(196,40,40,0.7)" strokeWidth="2"/>
          <rect x="70" y="30" width="50" height="100" fill="rgba(10,10,12,0.9)" stroke="rgba(196,40,40,0.4)" strokeWidth="1"/>
          {/* 铁门符号 */}
          {[40, 60, 80, 100, 120].map((y, i) => (
            <circle key={i} cx="95" cy={y} r="2" fill="rgba(196,154,44,0.8)"/>
          ))}
          <text x="60" y="14" fill="rgba(196,40,40,0.8)" fontSize="9" fontFamily="monospace">刻满符号的铁门</text>
          {/* 走廊（无限延伸透视） */}
          <polygon points="130,40 320,65 320,125 130,150" fill="rgba(20,20,24,0.55)" stroke="rgba(74,88,104,0.5)" strokeWidth="1.5"/>
          <line x1="130" y1="95" x2="320" y2="95" stroke="rgba(196,40,40,0.3)" strokeWidth="0.8" strokeDasharray="4 3"/>
          {/* 走廊尽头（无限） */}
          <text x="240" y="90" fill="rgba(168,168,180,0.6)" fontSize="9" fontFamily="monospace">无限延伸…</text>
          {/* 返回者标注 */}
          <text x="200" y="158" fill="rgba(196,154,44,0.8)" fontSize="9" fontFamily="monospace">「它记得每一个来过的人」</text>
        </svg>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-tertiary)", marginTop: "10px", textAlign: "center", letterSpacing: "0.08em" }}>
          全球第一起被正式记录的异常事件 · 铁门符号无法拓印 · 走廊可无限延伸
        </div>
      </div>
    );

    const harborData = {
      id: "LOA-0001",
      name: "灰港仓库",
      nameEn: "HARBOR WAREHOUSE · THE FIRST",
      stamp: "机密 · CONFIDENTIAL",
      classification: "CONFIDENTIAL",
      ver: "39.0",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      info: [
        ["异常编号", <span className="detail-file-id" style={{ fontSize: "18px" }}>LOA-0001</span>, "名称", "灰港仓库 · Harbor Warehouse"],
        ["所属管辖", "衔尾蛇事务所 · Ouroboros Agency", "首次记录", "安珀历元年 · 9月"],
        ["异常等级", { levelKey: "doomed", text: "厄运级 · DOOMED" }, "当前状态", { statusKey: "active", text: "● 活跃 ACTIVE" }],
        ["生还率", [<span className="survival-rate-red" key="s">约 25%</span>, "（累计32人进入，24人死亡）"], "信息价值", "极高（全球第一起被正式记录的异常事件，异常学起源档案）"],
        ["档案更新", "安珀历39年 · 春", "处置状态", "遗址封闭管理 · 未解决"],
      ],
      discovery: [
        "安珀历元年9月，格伦贝尔联邦第七大城市「灰港」的港区一座仓库在夜间凭空消失。原址上出现了一扇刻满符号的铁门——推开铁门后，通向一个与其外部外观完全不符的、无限延伸的走廊空间。",
        "首批进入探索的九人小队仅一人生还，获救后精神严重受损，反复重复同一句话：「它记得每一个来过的人。」这是全球第一起被正式记录的异常事件，标志着「前安珀时代」的终结与安珀历纪年的启用。",
        "此后灰港异常又被多次进入，截至安珀历39年共确认五次进入行动。二次进入者（进入过一次后再次进入者）共三名，其报告相互印证：异常确实记得他们。",
      ],
      features: [
        "异常本体为消失的仓库与替代它的铁门走廊：仓库原址上出现的铁门刻满无法拓印的符号，门后走廊无限延伸、与仓库外部外观完全不符，方向感与空间布局均不可靠。",
        "异常具有「记忆」特性——它记得每一个进入过的人。已确认的三名二次进入者报告相互印证：再次进入时走廊会对其表现出「熟悉」——灯光自动亮起、门自动开启。但「被记住」并不等于「被放行」，二次进入同样有伤亡。",
        "铁门符号无法被任何方式记录：拓印会迅速褪色，照片与文字描述同样失真——这被认为是异常自我保护机制的一部分。",
      ],
      mapNode: harborMap,
      mapTag: "结构示意 · DIAGRAM",
      verifiedRules: [
        { num: "一", title: "铁门入口", desc: "仓库原址的铁门为唯一已知入口，推开后进入走廊；铁门符号无法拓印，任何复制品均会迅速褪色模糊，照片与文字描述同样失真。" },
        { num: "二", title: "走廊延伸", desc: "走廊可无限延伸且方向感不可靠。返回者描述「走廊在改变」——同一段路在不同时间通过时，长度与布局均不相同。" },
        { num: "三", title: "记忆识别", desc: "异常能识别进入者。三名已确认的二次进入者报告相互印证：再次进入时走廊表现出「熟悉」——灯光自动亮起、门自动开启；这与生还者反复重复的「它记得每一个来过的人」一致。" },
      ],
      speculatedRules: [
        "铁门上的符号可能是异常「记忆」的载体或索引——符号无法被记录，或许正是异常自我保护机制的一部分",
        "走廊中疑似存在与进入者对应的「房间」，房间内容与进入者的记忆相关",
        "异常未表现出主动扩张迹象，但误入事件仍不定期发生——灰港港区遗址周围仍会偶发「看到铁门」的报告",
      ],
      entryRecords: [
        { term: "首批", year: "安珀历元年·9月", count: 9, org: "格伦贝尔联邦勘测队", result: "1人生还，8人死亡", status: "death" },
        { term: "二次", year: "安珀历2年·春", count: 6, org: "衔尾蛇", result: "2人生还，4人死亡", status: "death" },
        { term: "三次", year: "安珀历9年·秋", count: 8, org: "BRI/衔尾蛇联合考察", result: "3人生还，5人死亡", status: "death" },
        { term: "四次", year: "安珀历21年·冬", count: 5, org: "衔尾蛇", result: "1人生还，4人死亡", status: "death" },
        { term: "五次", year: "安珀历35年·夏", count: 4, org: "衔尾蛇·最小接触", result: "1人生还，3人死亡", status: "death" },
      ],
      phenomena: [
        "<strong>「它记得每一个来过的人」：</strong>唯一生还者反复重复此句。其描述的铁门符号与走廊细节与其他目击记录完全一致，但符号无法被任何方式记录。",
        "<strong>记忆响应：</strong>三名已确认的二次进入者报告相互印证——再次进入时走廊表现出「熟悉」：灯光自动亮起、门自动开启。异常能够识别并记忆进入者，但「被记住」不等于「被放行」。",
      ],
      imacNote: "灰港事件为全球第一起被正式记录的异常事件，标志着「前安珀时代」的终结与安珀历纪年的启用——安珀历以第一起异常事件为元年。截至安珀历39年，全球已记录异常事件累计超过两万起，仍有超过65%处于「未解决」或「休眠」状态；异常的出现没有规律可循。该异常至今未解决，且未表现出扩张或衰竭迹象；自首次记录以来累计进入五次，二次进入者确认异常具有稳定的识别能力。任何组织进入前须提交完整方案并获得 IMAC 审批。未经授权的私自进入将被视为严重违规。",
      suggestedActions: [
        "维持灰港港区遗址的封闭管理，防止误入事件，并记录周边「看到铁门」的报告",
        "成立专项研究组研究铁门符号（符号无法拓印，可尝试长曝光观测与多人同步记录比对）",
        "对三名二次进入者建立长期跟踪档案，记录其后续精神状况与再次进入的意愿变化",
        "评估灰港异常的「记忆特性」与其他异常（如赤月学院 LOA-0073）是否存在共性，探索异常「记忆」的普遍性",
      ],
      internalNode: (
        <Restricted level="internal" label="机密级内容" compact>
          <div className="internal-note">
            <p className="internal-note-text">
              【衔尾蛇事务所内部评估 · 创始人档案 · 陈默】<br/><br/>
              灰港是我们这一行的起点，也是一道没能愈合的伤口。五次进入，32个人进去，24个人没有出来——这个数字我背了三十九年，每一个名字都记得。<br/><br/>
              但它也教会了我们一件事：它记得我们。三名二次进入者的报告我都亲自核过——走廊会为他们亮灯，为他们开门。那不是善意，是一种「认得」。它认得每一个来过的人，就像我记得每一个没走出来的人。<br/><br/>
              铁门上的符号至今没有人能拓下来、拍下来、写下来。我怀疑那不是防备，而是它自己也不愿意留下痕迹。<br/><br/>
              处置上，维持封闭，不再主动进入。二次进入者一律备案，进出的心理评估不能省——活着回来的人，心里多少都留了点东西。<br/><br/>
              至于记忆的「上限」，我们问不出答案。在确认之前，任何试探都意味着再付人命。先守住，再问为什么。<br/><br/>
              最后说句私人的话：首批九个人，只有我活着走出来，这条命是灰港还我的。三十九年了，我每年都去铁门前站一会儿——它一直记得我，就像我记得那八个人。这条档案往后无论谁接手，请替我记住一件事：它记得每一个来过的人，这句话不是威胁，是事实。
            </p>
            <div className="internal-note-signature">— 陈默 · 衔尾蛇事务所 · 第一任所长</div>
          </div>
        </Restricted>
      ),
    };

    return <AnomalyDossier data={harborData} />;
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
        ["所属管辖", "边界研究院 · Boundary Research Institute", "首次记录", "安珀历12年 · 秋"],
        ["异常等级", { levelKey: "hazardous", text: "危险级 · HAZARDOUS" }, "当前状态", { statusKey: "active", text: "● 活跃 ACTIVE" }],
        ["生还率", [<span className="survival-rate-red" key="s">约 23%</span>, "（87人进入，67人死亡）"], "信息价值", "高（空间折叠机理研究价值高）"],
        ["档案更新", "安珀历39年 · 春", "监测状态", "持续监测中 · 年均拉入 2-3 起"],
      ],
      discovery: [
        "安珀历12年秋，洛林自由市旧城区的「白鸽公寓」B座住户连续向警署报案：多名居民表示在下楼时「走了很久都到不了一楼」，一名住户甚至在三楼台阶上原地消失，数小时后从四楼平台重新出现，全程无意识。",
        "BRI 调查组介入后确认，公寓2层至3层之间的楼梯间存在空间折叠异常。此后异常范围缓慢向整栋公寓的楼梯系统蔓延，现已覆盖全部三个楼梯井。公寓于安珀历14年整体封闭，原住民全部迁出。",
      ],
      features: [
        "无尽楼梯是一处典型的<strong>空间折叠型异常</strong>。异常主体为白鸽公寓B座楼梯间：进入后楼梯可无限延伸，无论向上还是向下，台阶数恒定，楼层标识在 2/3/4 层之间循环，1层与5层从未被观测到。",
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
              以验证「双向经过折叠点」能否抵达 1 层。此举风险可控，建议由 BRI 与晨星团联合执行。<br/><br/>
              附言：递交这份方案前，我在 2F 平台坐了很久。折叠点的「呼吸」很规律，像某种沉睡的节律——我们给异常分类、编号、建模型，可面对它的时候，我还是会想起导师那句话：先承认看不懂，才有资格研究。这条档案是写给后人的：请带着敬畏来读。
            </p>
            <div className="internal-note-signature">— 顾远舟 · 边界研究院院长 · 空间异常研究所</div>
          </div>
        </Restricted>
      ),
    };

    return <AnomalyDossier data={stairData} />;
  }

  if (isTrain) {
    const trainMap = (
      <div className="stair-map">
        <svg viewBox="0 0 340 170" width="100%" style={{ display: "block" }}>
          {/* 雾区背景 */}
          <rect x="10" y="20" width="320" height="110" fill="rgba(138,180,212,0.05)" stroke="rgba(138,180,212,0.25)" strokeWidth="1" strokeDasharray="4 3"/>
          <text x="20" y="38" fill="rgba(138,180,212,0.6)" fontSize="9" fontFamily="monospace">雾区 · FOG ZONE</text>
          {/* 铁轨 */}
          <line x1="20" y1="120" x2="320" y2="120" stroke="rgba(74,88,104,0.5)" strokeWidth="1.5"/>
          <line x1="20" y1="126" x2="320" y2="126" stroke="rgba(74,88,104,0.5)" strokeWidth="1.5"/>
          {/* 列车主体 */}
          <rect x="30" y="70" width="280" height="46" rx="4" fill="rgba(20,20,24,0.9)" stroke="rgba(196,40,40,0.6)" strokeWidth="1.5"/>
          {/* 车头 */}
          <path d="M30 70 L20 84 L30 116 Z" fill="rgba(196,40,40,0.5)"/>
          {/* 车厢分隔 */}
          <line x1="100" y1="70" x2="100" y2="116" stroke="rgba(74,88,104,0.4)" strokeWidth="1"/>
          <line x1="170" y1="70" x2="170" y2="116" stroke="rgba(74,88,104,0.4)" strokeWidth="1"/>
          <line x1="240" y1="70" x2="240" y2="116" stroke="rgba(74,88,104,0.4)" strokeWidth="1"/>
          {/* 车厢编号 */}
          <text x="50" y="96" fill="rgba(168,168,180,0.7)" fontSize="9" fontFamily="monospace">1-5 节</text>
          <text x="120" y="96" fill="rgba(74,154,44,0.95)" fontSize="10" fontFamily="monospace" fontWeight="700">第6节</text>
          <text x="185" y="96" fill="rgba(168,168,180,0.7)" fontSize="9" fontFamily="monospace">7-8 节</text>
          <text x="252" y="96" fill="rgba(168,168,180,0.7)" fontSize="9" fontFamily="monospace">餐车</text>
          {/* 循环箭头 */}
          <path d="M300 60 C 330 20, 330 10, 280 10 C 240 10, 200 20, 60 20" fill="none" stroke="rgba(196,154,44,0.8)" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#trainArrow)"/>
          <defs>
            <marker id="trainArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(196,154,44,0.9)"/>
            </marker>
          </defs>
          <text x="200" y="14" fill="rgba(196,154,44,0.85)" fontSize="9" fontFamily="monospace">时间循环 47min</text>
          {/* 虚假站台 */}
          <rect x="300" y="132" width="30" height="10" fill="rgba(196,40,40,0.25)" stroke="rgba(196,40,40,0.5)" strokeWidth="1"/>
          <text x="296" y="150" fill="rgba(196,40,40,0.7)" fontSize="8" fontFamily="monospace">虚假站台</text>
        </svg>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-tertiary)", marginTop: "10px", textAlign: "center", letterSpacing: "0.08em" }}>
          循环周期约 47 分钟 · 第6节车厢时间流速正常 · 虚假站台下车即消失
        </div>
      </div>
    );

    const trainData = {
      id: "TMA-0045",
      name: "雾中列车",
      nameEn: "FOG TRAIN · DOOMED",
      stamp: "机密 · CONFIDENTIAL",
      classification: "CONFIDENTIAL",
      ver: "39.2",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      info: [
        ["异常编号", <span className="detail-file-id" style={{ fontSize: "18px" }}>TMA-0045</span>, "名称", "雾中列车 · Fog Train"],
        ["所属管辖", "长桥会社 · Long Bridge Company", "首次记录", "安珀历19年 · 冬"],
        ["异常等级", { levelKey: "doomed", text: "厄运级 · DOOMED" }, "当前状态", { statusKey: "active", text: "● 活跃 ACTIVE" }],
        ["生还率", [<span className="survival-rate-red" key="s">约 8%</span>, "（125人进入，115人死亡）"], "信息价值", "高（时间循环与移动锚定机理研究价值高）"],
        ["档案更新", "安珀历39年 · 春", "监测状态", "持续监测中 · 年均发生 3-4 起"],
      ],
      discovery: [
        "安珀历19年冬，格伦贝尔联邦东部铁路网的一列夜班列车在驶入鸣海城以北约60公里的山区雾带后失踪。搜索队在沿线未发现任何残骸；48小时后，该列车在下一班列车时刻重新出现在同一区间——车厢内乘客全部失踪，仅列车员一人存活，返回后始终重复「我数不清站台」这句话。",
        "此后数年间，这列幽灵列车多次在东部铁路网不同区段出现：任何驶入「雾区」的列车，其车厢内人员都会被替换为幽灵列车内的时间循环参与者。长桥会社接管调查后确认其为时间循环型异常，列车本身即异常的移动载体。",
      ],
      features: [
        "雾中列车是一处典型的<strong>时间循环型异常</strong>。异常载体为一列老式蒸汽列车，编号已不可考。列车在东部铁路网行驶时周期性驶入「雾区」，循环周期约47分钟；循环结束后列车短暂消失，随后在另一区段重新出现并进入下一循环。",
        "循环中经过的所有车站均为虚假站台，下车者立即消失。列车上的时钟永远停在 23:47。乘务员会在每次循环开始约10分钟后逐一检票，票面上的目的地从未被看清。",
        "第6节车厢为「安全车厢」——该车厢内时间流速正常，是已知唯一不受循环重置影响的区域，也是历次行动的临时据点。",
      ],
      mapNode: trainMap,
      mapTag: "结构示意 · DIAGRAM",
      verifiedRules: [
        { num: "一", title: "雾区入口", desc: "列车驶入特定雾区后进入异常，车厢内时间开始循环（约47分钟）。雾区位置随时间漂移，无固定坐标；近期出现频率在极寒区段明显上升。" },
        { num: "二", title: "循环重置", desc: "循环结束时列车内时间重置，乘客回到循环起点；记忆完整保留，但随身物品状态全部重置（伤口、饥饿感、电量、携带的标记物均回到循环开始状态）。" },
        { num: "三", title: "虚假站台", desc: "循环中经过的所有车站均为虚假站台，下车者立即消失，无返回记录。唯一例外：若列车自行停靠（而非进站），该站为真实站点。" },
        { num: "四", title: "检票规则", desc: "循环开始约10分钟后乘务员开始检票，无票者（非乘客身份进入者）会被「带走」，不再出现。持有车票者可通过检票。" },
      ],
      speculatedRules: [
        "列车长为核心 NPC，其胸前怀表的分针在每次循环中偏移1分钟——若偏移量累积至60分钟，可能出现「第48小时」的完整循环出口",
        "雾区入口可能锚定在东部铁路网某段废弃隧道中，列车在其中循环后从不同出口驶出",
        "循环中存在「记忆回声」：循环第3次后，车厢内开始出现与之前循环完全一致的乘客对话",
        "若在循环中集齐所有乘客的「票根」，可能触发出口条件——但票根在循环重置时会被收走",
      ],
      entryRecords: [
        { term: "第一批", year: "安珀历19年·冬", count: 18, org: "长桥会社", result: "2人生还，16人失踪", status: "death" },
        { term: "第二批", year: "安珀历21年", count: 20, org: "长桥会社", result: "1人生还，19人失踪", status: "death" },
        { term: "第三批", year: "安珀历24年", count: 22, org: "长桥会社", result: "2人生还，20人失踪", status: "death" },
        { term: "第四批", year: "安珀历27年", count: 25, org: "长桥会社/北境守望联合", result: "2人生还，23人失踪", status: "death" },
        { term: "第五批", year: "安珀历32年", count: 20, org: "长桥会社", result: "2人生还，18人失踪", status: "death" },
        { term: "第六批", year: "安珀历37年·秋", count: 20, org: "长桥会社", result: "1人生还，19人失踪", status: "death" },
      ],
      phenomena: [
        "<strong>「雾中回声」：</strong>循环第3次后，车厢内开始出现与之前循环完全一致的乘客对话，逐字逐句重复；生还者称「像是有人在播放录音」。",
        "<strong>「站台人影」：</strong>虚假站台上始终站着同一批人影，数量随循环次数逐次减少；没有人影下过站台，但每次循环人影都会少一人。",
        "<strong>「怀表计数」：</strong>列车长怀表显示 23:47，但分针在每次循环后偏移约1分钟——生还者推测这是循环次数的记录方式。",
        "<strong>雾区漂移：</strong>近两年雾区出现位置明显北移，且更频繁地出现在北境冻土区段，与白松城周边异常活动是否存在关联尚在调查。",
      ],
      imacNote: "雾中列车是目前已知最活跃的时间循环型异常之一，其「移动载体」特性使常规封锁方案失效。鉴于其高死亡率与不可预测的雾区漂移，IMAC 协调办公室已将其列为「优先级-贝塔」观察对象，并协调长桥会社与东部铁路网设立联合监测机制。任何组织在采取行动前必须提交完整方案并获得 IMAC 审批。未经授权的私自进入将被视为严重违规。",
      suggestedActions: [
        "在东部铁路网重点区段布设雾区预警装置，记录雾区出现规律与漂移轨迹，绘制雾区热力图",
        "由长桥会社牵头组织「第6节安全车厢」专项侦察，验证安全车厢假说并测绘车厢内部结构",
        "与北境守望联合制定极寒区段应对预案——该区段雾区出现频率近期明显上升",
      ],
      internalNode: (
        <Restricted level="internal" label="机密级内容" compact>
          <div className="internal-note">
            <p className="internal-note-text">
              【长桥会社内部评估 · 移动指挥系统】<br/><br/>
              雾中列车是我们遇到的最棘手的「会跑」的异常——它的载体是移动的，任何固定封锁方案都无效。
              我们判断循环出口与列车长的怀表存在关联：分针每次循环偏移1分钟，当偏移累积到60分钟时，
              可能出现完整的「第48小时」出口循环。<br/><br/>
              建议下一次行动聚焦第6节安全车厢与列车长怀表，行动风险评级为厄运级，
              由现任总协调官桥本彻带队执行，行动代号「票根」。
            </p>
            <div className="internal-note-signature">— 桥本彻 · 长桥会社现任总协调官</div>
          </div>
        </Restricted>
      ),
    };

    return <AnomalyDossier data={trainData} />;
  }

  if (isOutpost) {
    const outpostMap = (
      <div className="stair-map">
        <svg viewBox="0 0 340 170" width="100%" style={{ display: "block" }}>
          {/* 冻结范围 */}
          <rect x="20" y="15" width="300" height="120" fill="rgba(138,180,212,0.05)" stroke="rgba(138,180,212,0.35)" strokeWidth="1" strokeDasharray="4 3"/>
          <text x="28" y="30" fill="rgba(138,180,212,0.7)" fontSize="9" fontFamily="monospace">时间冻结范围 · 约600㎡</text>
          {/* 哨站建筑 */}
          <rect x="50" y="45" width="240" height="70" fill="rgba(20,20,24,0.9)" stroke="rgba(74,88,104,0.6)" strokeWidth="1.5"/>
          {/* 房间分隔 */}
          <line x1="110" y1="45" x2="110" y2="115" stroke="rgba(74,88,104,0.5)" strokeWidth="1"/>
          <line x1="180" y1="45" x2="180" y2="115" stroke="rgba(74,88,104,0.5)" strokeWidth="1"/>
          <line x1="250" y1="45" x2="250" y2="115" stroke="rgba(74,88,104,0.5)" strokeWidth="1"/>
          {/* 房间标注 */}
          <text x="65" y="72" fill="rgba(168,168,180,0.7)" fontSize="9" fontFamily="monospace">宿舍</text>
          <text x="122" y="72" fill="rgba(168,168,180,0.7)" fontSize="9" fontFamily="monospace">值班室</text>
          <text x="192" y="72" fill="rgba(168,168,180,0.7)" fontSize="9" fontFamily="monospace">仓库</text>
          <text x="258" y="72" fill="rgba(168,168,180,0.7)" fontSize="9" fontFamily="monospace">锅炉房</text>
          {/* 地下室入口 + 核心钟 */}
          <rect x="120" y="120" width="40" height="12" fill="rgba(196,40,40,0.15)" stroke="rgba(196,40,40,0.5)" strokeWidth="1"/>
          <text x="110" y="145" fill="rgba(196,40,40,0.85)" fontSize="9" fontFamily="monospace">地下室 · 核心钟</text>
          {/* 钟表图标 */}
          <circle cx="140" cy="126" r="4" fill="none" stroke="rgba(196,154,44,0.9)" strokeWidth="1.5"/>
          <line x1="140" y1="126" x2="140" y2="123.5" stroke="rgba(196,154,44,0.9)" strokeWidth="1"/>
          {/* 冻结核爆点 */}
          <text x="240" y="140" fill="rgba(74,154,44,0.85)" fontSize="9" fontFamily="monospace">坍缩点 · 已解除</text>
        </svg>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-tertiary)", marginTop: "10px", textAlign: "center", letterSpacing: "0.08em" }}>
          核心锚点：地下室机械钟（停摆 23:47）· 拨动钟摆后异常坍缩 · 现为封存监测状态
        </div>
      </div>
    );

    const outpostData = {
      id: "TMB-0117",
      name: "冰封哨站",
      nameEn: "FROZEN OUTPOST · HAZARDOUS",
      stamp: "机密 · CONFIDENTIAL",
      classification: "CONFIDENTIAL",
      ver: "39.0",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      info: [
        ["异常编号", <span className="detail-file-id" style={{ fontSize: "18px" }}>TMB-0117</span>, "名称", "冰封哨站 · Frozen Outpost"],
        ["所属管辖", "北境守望 · Northwatch", "首次记录", "安珀历15年 · 冬"],
        ["异常等级", { levelKey: "hazardous", text: "危险级 · HAZARDOUS" }, "当前状态", { statusKey: "resolved", text: "● 已解决 · 坍缩 RESOLVED" }],
        ["生还率", [<span className="survival-rate-red" key="s">约 31%</span>, "（55人进入，38人死亡）"], "信息价值", "高（时间停滞解除案例研究价值高）"],
        ["档案更新", "安珀历39年 · 春", "处置状态", "已坍缩 · 现场封存监测"],
      ],
      discovery: [
        "安珀历15年冬，白松城以北冻土区的一支勘探队在测绘旧边境设施时发现废弃哨站（安珀历9年因极寒撤离）内部一切「冻结」：钟表停走、炉火不燃、墙上的值班日志保持翻开状态，连炉灰都悬浮在半空。勘探队撤离后立即上报，北境守望接管调查并确认哨站主体建筑陷入时间停滞。",
        "异常范围始终局限在哨站主体建筑（约600平方米）内，未向冻土区扩散。安珀历21年，北境守望在第四批行动中成功使异常坍缩，哨站时间恢复流动，异常被判定为已解决。",
      ],
      features: [
        "冰封哨站是一处典型的<strong>时间停滞型异常</strong>。异常覆盖哨站主体建筑，内部所有非生命体的时间完全静止——钟表停走、火焰凝固、液体冻结，连空气中的尘埃都悬浮不动。",
        "进入者的时间不受影响，但无法改变任何冻结物体；食物、饮水、工具等外部物品带入哨站后同样被「冻结」。异常核心位于地下室的机械钟，钟摆停摆于安珀历9年冬·23:47。",
        "安珀历21年，北境守望第四批行动通过使核心钟摆恢复摆动，异常整体坍缩。坍缩后哨站时间恢复流动，残留的冻结痕迹随坍缩消散，现场被封存监测。",
      ],
      mapNode: outpostMap,
      mapTag: "结构示意 · DIAGRAM",
      verifiedRules: [
        { num: "一", title: "时间冻结", desc: "哨站内所有非生命体的时间完全静止；进入者时间正常流动，但无法与冻结物体产生任何物理交互。" },
        { num: "二", title: "冻结不可逆（行动中）", desc: "进入者尝试破坏、移动或加热冻结物品时，会遭遇「反向冻结」——身体局部开始失去知觉，触碰部位最先冻结。该效应在撤离冻结区域后自行消退。" },
        { num: "三", title: "核心锚点", desc: "地下室机械钟为异常核心，钟摆停摆时刻（安珀历9年冬·23:47）与哨站废弃时间完全一致。异常范围与核心钟的「可听范围」基本重合。" },
        { num: "四", title: "解冻条件", desc: "使核心钟摆重新摆动（拨动指针或重新上弦）后，异常整体坍缩，时间恢复流动。安珀历21年第四批行动验证了该条件。" },
      ],
      entryRecords: [
        { term: "第一批", year: "安珀历15年·冬", count: 12, org: "北境守望", result: "4人生还，8人死亡", status: "death" },
        { term: "第二批", year: "安珀历16年", count: 14, org: "北境守望", result: "5人生还，9人死亡", status: "death" },
        { term: "第三批", year: "安珀历18年", count: 15, org: "北境守望", result: "4人生还，11人死亡", status: "death" },
        { term: "第四批", year: "安珀历21年", count: 14, org: "北境守望", result: "4人生还，10人死亡 · 成功解除", status: "death" },
      ],
      phenomena: [
        "<strong>「值班日志」末行：</strong>地下室值班日志的最后一页写着「冬·23:47 钟停了，我们走不出去」——与核心钟停摆时刻一致，疑似哨站撤离时的最后记录。",
        "<strong>冻结残留：</strong>坍缩后，哨站墙面上留有疑似「时间冻结时的空气划痕」，分析显示为异常内部最后的物理痕迹，已采样封存。",
        "<strong>同型前兆监测：</strong>坍缩后，白松城周边两处废弃设施出现「钟表集体停走」前兆，是否发展为同类异常正在监测中。",
      ],
      imacNote: "冰封哨站是时间停滞型异常的首个成功解除案例，其「核心锚点-解冻」机制为同类异常提供了完整处置范式。鉴于异常已坍缩，IMAC 已将其列为「已解决·样本封存」档案，现场保留供研究。任何组织如需重新进入现场进行研究，须获得 IMAC 及北境守望联合许可。未经授权的私自进入将被视为严重违规。",
      suggestedActions: [
        "维护坍缩后现场并封存关键物证（核心钟残件、值班日志、冻结划痕样本）",
        "整理第四批行动完整记录，形成时间停滞型异常处置标准流程并纳入训练教材",
        "持续监测白松城周边废弃设施，排查同型异常前兆，建立常驻监测哨",
      ],
      internalNode: (
        <Restricted level="internal" label="机密级内容" compact>
          <div className="internal-note">
            <p className="internal-note-text">
              【北境守望内部评估 · 冻土探索营队长 韩凛】<br/><br/>
              冰封哨站这一仗，我们打得不漂亮，但打明白了——四批，55个人进去，38个人没能出来，代价太重了。<br/><br/>
              但第四批行动证明了一件事：时间停滞型异常的核心锚点是可以被「说服」的。拨动钟摆的力气谁都有，难的是在零下四十度的冻结环境里还能保持清醒、做出决定。这是冻土区教给我们的道理。<br/><br/>
              处置上，流程已经写进教材，白松城周边的常驻监测哨也立起来了——「钟表集体停走」的前兆我们盯得比谁都紧。下一次再出现，我们要比这次更快，38条命不能白搭。<br/><br/>
              最后说句掏心窝的话：装备会失效，火力会耗尽，但人只要还记得自己为什么站在那儿，就还能把钟摆拨回去。这是我在这片冻土上学到的最硬的一条。
            </p>
            <div className="internal-note-signature">— 韩凛 · 北境守望冻土探索营队长</div>
          </div>
        </Restricted>
      ),
    };

    return <AnomalyDossier data={outpostData} />;
  }

  if (isVoid) {
    const voidData = {
      id: "PHA-0001",
      name: "空白地带",
      nameEn: "THE VOID · UNKNOWN",
      stamp: "绝密 · EYES ONLY",
      classification: "EYES ONLY",
      ver: "39.0",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      info: [
        ["异常编号", <span className="detail-file-id" style={{ fontSize: "18px" }}>PHA-0001</span>, "名称", "空白地带 · The Void"],
        ["所属管辖", "IMAC 直辖 · IMAC DIRECT", "首次记录", "安珀历元年 · 灰港事件后"],
        ["异常等级", { levelKey: "unknown", text: "未知级 · UNKNOWN" }, "当前状态", { statusKey: "quarantined", text: "● 隔离中 QUARANTINED" }],
        ["生还率", <span className="survival-rate-red">—</span>, "信息价值", "极高（未知级现象，信息极度匮乏，任何样本价值不可估量）"],
        ["档案更新", "安珀历39年 · 春", "处置状态", "全封闭隔离 · 禁止任何接触"],
      ],
      discovery: [
        "安珀历元年灰港事件之后，多国勘测队在极北冰原的某处坐标附近发现一片「什么都没有」的区域——范围内重力、电磁、时间读数全部失效，进入该区域的一切物质均失去信号。最早的两份勘察记录因设备失灵仅保留残缺片段。",
        "此后该区域由 IMAC 直辖封闭隔离。所有关于空白地带的直接观测记录均已归档为最高机密，公开档案中仅保留本条目与极少数间接信息。",
      ],
      features: [
        "空白地带是目前唯一被评定为「未知级」的异常。其本质、范围、边界运动规律均未被确认——已知信息仅来自两次勘察的残缺记录与外围间接观测，信息总量低于任何已归档的深渊级异常。",
        "外围观测确认：空白地带边界内不存在任何可探测的物理信号；接触边界的物质会「消失」，消失方向未知。唯一返回的勘察人员出现了完全的记忆空白。",
      ],
      speculatedRules: [
        "空白地带内物理法则完全失效：重力、电磁、时间均无可测读数",
        "接触空白地带的物质会「消失」——消失方向未知，无返回记录",
        "空白地带边界疑似在缓慢扩张（两次勘测的外围标记间距存在微小差异，但精度不足以确认）",
        "唯一返回者的记忆空白暗示认知层面同样被「抹除」",
      ],
      entryRecords: [
        { term: "首次接触", year: "安珀历元年 · 灰港事件后", count: 0, org: "IMAC 直属勘察队", result: "人数未知 · 全员失踪，无返回记录", status: "death" },
        { term: "第二次勘察", year: "安珀历4年", count: 3, org: "IMAC 直属", result: "2人失踪 · 1人返回后记忆空白", status: "death" },
      ],
      phenomena: [
        "<strong>「消失的物质」：</strong>外围投放的测试物（金属块、信标、记录器）接触边界后信号消失，无任何残留，无返回记录。",
        "<strong>记忆空白：</strong>唯一返回者在返回后无法回忆起勘察期间的任何内容，且其随身记录设备内数据完全为空。",
      ],
      imacNote: "空白地带是 IMAC 档案中信息最有限的异常条目。鉴于其完全未知的性质与「物质消失」特性，IMAC 协调办公室已将其列为最高隔离等级（全封闭 · 禁止接触）。任何关于空白地带的调查申请均须提交理事会单独审批。未经授权的一切接近行为将被视为最高等级违规。",
      suggestedActions: [
        "维持现有全封闭隔离，不主动接触或投放测试物（历年投放均无有效数据返回）",
        "以外围遥感手段持续记录边界变化，积累长期监测数据",
        "评估灰港事件档案的关联性——空白地带是否为异常初现时的残留影响",
      ],
      internalNode: (
        <Restricted level="topsecret" label="绝密级内容" compact>
          <div className="internal-note">
            <p className="internal-note-text">
              【IMAC 协调办公室评估 · 异常信息管理委员会】<br/><br/>
              对未知级异常的信息管理原则：在无法确认性质前，不推测、不公开、不接触。
              空白地带的所有已知信息已封存，其存在本身即为最高机密。<br/><br/>
              本档案内容将在获得新的有效观测数据后更新——但目前没有任何已知手段能够获得该数据。
              维持现状，就是目前最稳妥的行动。
            </p>
            <div className="internal-note-signature">— IMAC 理事会 · 异常信息管理委员会</div>
          </div>
        </Restricted>
      ),
    };

    return <AnomalyDossier data={voidData} />;
  }

  if (isLoop) {
    const loopMap = (
      <div className="stair-map">
        <svg viewBox="0 0 340 170" width="100%" style={{ display: "block" }}>
          {/* 公路 */}
          <line x1="30" y1="90" x2="310" y2="90" stroke="rgba(74,88,104,0.6)" strokeWidth="4"/>
          <line x1="30" y1="87" x2="310" y2="87" stroke="rgba(196,40,40,0.4)" strokeWidth="0.8" strokeDasharray="6 4"/>
          {/* 桥 */}
          <rect x="120" y="78" width="50" height="24" fill="rgba(74,88,104,0.2)" stroke="rgba(138,180,212,0.5)" strokeWidth="1"/>
          <text x="128" y="94" fill="rgba(138,180,212,0.8)" fontSize="8" fontFamily="monospace">桥</text>
          {/* 枯树 */}
          <line x1="230" y1="90" x2="230" y2="70" stroke="rgba(196,154,44,0.8)" strokeWidth="2"/>
          <line x1="230" y1="75" x2="222" y2="66" stroke="rgba(196,154,44,0.8)" strokeWidth="1.5"/>
          <line x1="230" y1="75" x2="238" y2="66" stroke="rgba(196,154,44,0.8)" strokeWidth="1.5"/>
          <text x="220" y="64" fill="rgba(196,154,44,0.85)" fontSize="8" fontFamily="monospace">枯树（锚点）</text>
          {/* 循环区间 */}
          <rect x="110" y="50" width="150" height="60" fill="none" stroke="rgba(196,40,40,0.4)" strokeWidth="1" strokeDasharray="4 3"/>
          <text x="120" y="46" fill="rgba(196,40,40,0.7)" fontSize="9" fontFamily="monospace">循环区间 · 约200m</text>
          {/* 循环箭头 */}
          <path d="M185 112 C 175 128, 165 128, 155 112" fill="none" stroke="rgba(196,154,44,0.8)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#loopArrow)"/>
          <defs>
            <marker id="loopArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(196,154,44,0.9)"/>
            </marker>
          </defs>
          <text x="150" y="130" fill="rgba(196,154,44,0.8)" fontSize="9" fontFamily="monospace">车辆循环 · 徒步豁免</text>
          {/* 坍缩标注 */}
          <text x="250" y="140" fill="rgba(74,154,44,0.85)" fontSize="9" fontFamily="monospace">已坍缩 · 恢复正常通行</text>
        </svg>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-tertiary)", marginTop: "10px", textAlign: "center", letterSpacing: "0.08em" }}>
          循环仅对行驶中的车辆生效 · 锚点为枯树 · 72小时内完成处置并坍缩
        </div>
      </div>
    );

    const loopData = {
      id: "SPA-0421",
      name: "灰松岭循环路段",
      nameEn: "HUISONG RIDGE LOOP · ORDINARY",
      stamp: "公开 · PUBLIC",
      classification: "PUBLIC",
      ver: "38.4",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      info: [
        ["异常编号", <span className="detail-file-id" style={{ fontSize: "18px" }}>SPA-0421</span>, "名称", "灰松岭循环路段 · Huisong Ridge Loop"],
        ["所属管辖", "北境守望 · Northwatch", "首次记录", "安珀历38年 · 冬"],
        ["异常等级", { levelKey: "ordinary", text: "常规级 · ORDINARY" }, "当前状态", { statusKey: "resolved", text: "● 已解决 · 坍缩 RESOLVED" }],
        ["生还率", [<span className="survival-rate-red" key="s">100%</span>, "（7人进入，0人死亡）"], "信息价值", "中"],
        ["档案更新", "安珀历39年 · 春", "处置状态", "已坍缩 · 路段恢复正常通行"],
      ],
      discovery: [
        "安珀历38年冬，灰松岭山区的伐木工人发现公路上一段约两百米的路段出现异常：车辆驶入后会反复经过同一座桥和同一棵枯树，无法驶出。工人徒步通过该路段时未受影响，于发现十日后通过异常热线上报。",
        "北境守望派出四名溯界者进入异常区域，经过七十二小时的规则解析与内部干预，于次日清晨七时三十分确认异常已「坍缩」。所有受影响路段恢复正常通行，周边三公里内居民已提前疏散，无人员伤亡。",
      ],
      features: [
        "灰松岭循环路段是一处典型的<strong>空间循环型异常</strong>（常规级）。异常表现为山区公路上一段约两百米的循环区间：车辆驶入后反复经过同一座桥与同一棵枯树，无法驶出；而徒步行人不受影响。",
        "异常于安珀历38年冬被发现，北境守望在七十二小时内完成规则解析并使其坍缩。本次行动顺利的关键在于当地居民的及时上报——异常发现的越早，处理难度越低。",
      ],
      mapNode: loopMap,
      mapTag: "结构示意 · DIAGRAM",
      verifiedRules: [
        { num: "一", title: "循环区间", desc: "公路约200米路段内空间循环：车辆驶入后反复经过同一座桥与同一棵枯树，无法驶出，直至异常被解除。" },
        { num: "二", title: "载具触发", desc: "循环仅对「行驶中的车辆」生效；徒步行人通过不受影响（发现异常的伐木工人徒步往返正常）。" },
        { num: "三", title: "坍缩条件", desc: "在循环锚点（枯树）处完成规则干预后，异常整体坍缩，路段恢复正常通行，现场无异常残留。" },
      ],
      entryRecords: [
        { term: "被困车辆", year: "安珀历38年·冬", count: 3, org: "北境守望救援", result: "2车3人 · 全员获救", status: "safe" },
        { term: "处置行动", year: "安珀历38年·冬", count: 4, org: "北境守望", result: "全员安全返回 · 异常坍缩", status: "safe" },
      ],
      phenomena: [
        "<strong>「桥与枯树」参照物：</strong>循环中车辆唯一可识别的参照物为同一座桥与同一棵枯树；坍缩后两者均无异常残留，枯树为本次处置的规则锚点。",
        "<strong>徒步豁免：</strong>循环仅作用于载具而不作用于行人——此类「选择性触发」在常规级空间异常中较为少见，可能与异常以「道路使用方式」为规则基础有关。",
      ],
      imacNote: "灰松岭循环路段是常规级异常成功处置的典型案例，充分体现了「及时发现-及时上报-快速处置」流程的价值。异常已坍缩，路段恢复正常通行。IMAC 借此重申：如发现道路、建筑或任何空间出现重复性、不合理的变化，请保持距离，拨打99异常热线，切勿自行进入或拍摄。",
      suggestedActions: [
        "维持周边短期监测，确认异常无复发迹象，保留临时警示标识至观测期结束",
        "将「灰松岭处置流程」纳入北境守望快速响应训练案例",
        "继续向公众普及异常识别与上报知识——本次行动的关键在于伐木工人的及时上报",
      ],
      internalNode: (
        <Restricted level="internal" label="机密级内容" compact>
          <div className="internal-note">
            <p className="internal-note-text">
              【北境守望内部评估 · 灰松岭行动队队长 霜隼】<br/><br/>
              灰松岭是一次教科书式的快速处置：从接到上报到坍缩，七十二小时，零伤亡。异常并不总是危险——这一次，它只是让一辆车在两百米的路段上多转了几圈。<br/><br/>
              但我必须说，这场行动的真正功臣不是我们，是那位伐木工人。他没有好奇靠近，没有拍视频发到网上，而是记下位置、退出路段、拨了99——三件事，教科书里教的，他全做到了。我干了十五年北境，见过太多聪明人死在「再靠近一步」上。<br/><br/>
              处置上，流程已经归档进快速响应训练案例，周边短期监测结束后撤除临时警示。向公众普及这三件事，比我们多跑十次任务都值——每个公民都该学会它们。
            </p>
            <div className="internal-note-signature">— 伊万·沃尔科夫（霜隼）· 北境守望资深溯界者</div>
          </div>
        </Restricted>
      ),
    };

    return <AnomalyDossier data={loopData} />;
  }

  if (isRift) {
    const riftMap = (
      <div className="stair-map">
        <svg viewBox="0 0 340 170" width="100%" style={{ display: "block" }}>
          {/* 地面 */}
          <line x1="20" y1="130" x2="320" y2="130" stroke="rgba(74,88,104,0.5)" strokeWidth="1.5"/>
          {/* 裂隙本体（竖立裂缝） */}
          <path d="M170 15 L160 40 L172 65 L158 90 L170 115 L162 135 L178 135 L170 115 L182 90 L168 65 L180 40 L170 15 Z" fill="rgba(20,20,24,0.9)" stroke="rgba(196,40,40,0.8)" strokeWidth="2"/>
          <text x="140" y="10" fill="rgba(196,40,40,0.85)" fontSize="9" fontFamily="monospace">洛林裂隙</text>
          {/* 裂隙周围拉扯纹（同心弧） */}
          {[18, 34, 50].map((r, i) => (
            <ellipse key={i} cx="170" cy="130" rx={r} ry={r * 0.45} fill="none" stroke="rgba(196,154,44,0.45)" strokeWidth="1" strokeDasharray="4 3"/>
          ))}
          <text x="228" y="52" fill="rgba(196,154,44,0.8)" fontSize="8" fontFamily="monospace">拉扯感</text>
          <text x="228" y="63" fill="rgba(196,154,44,0.55)" fontSize="8" fontFamily="monospace">5m 范围</text>
          {/* 标记桩 */}
          {[128, 140, 152, 188, 200, 212].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="130" x2={x} y2="125" stroke="rgba(74,154,44,0.9)" strokeWidth="2"/>
              <circle cx={x} cy="124" r="1.6" fill="rgba(74,154,44,0.9)"/>
            </g>
          ))}
          <text x="118" y="146" fill="rgba(74,154,44,0.8)" fontSize="8" fontFamily="monospace">信标阵列 MK-III</text>
          {/* 前哨站 */}
          <rect x="40" y="105" width="34" height="24" fill="rgba(20,20,24,0.85)" stroke="rgba(138,180,212,0.6)" strokeWidth="1"/>
          <text x="30" y="144" fill="rgba(138,180,212,0.75)" fontSize="8" fontFamily="monospace">洛林前哨站</text>
          <text x="286" y="70" fill="rgba(168,168,180,0.6)" fontSize="8" fontFamily="monospace">目视区</text>
        </svg>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-tertiary)", marginTop: "10px", textAlign: "center", letterSpacing: "0.08em" }}>
          竖立地表的空间裂隙 · 5米内产生拉扯感 · 信标阵列持续监测边界
        </div>
      </div>
    );

    const riftData = {
      id: "PHA-0182",
      name: "洛林裂隙",
      nameEn: "LORRAINE RIFT",
      stamp: "机密 · CONFIDENTIAL",
      classification: "CONFIDENTIAL",
      ver: "39.0",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      info: [
        ["异常编号", <span className="detail-file-id" style={{ fontSize: "18px" }}>PHA-0182</span>, "名称", "洛林裂隙 · Lorraine Rift"],
        ["所属管辖", "边界研究院/晨星团联合 · BRI & Morningstar", "首次记录", "安珀历9年 · 秋"],
        ["异常等级", { levelKey: "doomed", text: "厄运级 · DOOMED" }, "当前状态", { statusKey: "active", text: "● 活跃 ACTIVE" }],
        ["生还率", [<span className="survival-rate-red" key="s">约 38%</span>, "（21人进入，13人死亡）"], "信息价值", "高（与无尽楼梯 SPA-0021 疑似共享同一空间结构源）"],
        ["档案更新", "安珀历39年 · 春", "处置状态", "联合边界测绘 · 三级响应 · 进行中"],
      ],
      discovery: [
        "安珀历9年秋，洛林自由市边境的一处废弃旧矿场附近，巡逻队发现一道「竖立在地表的裂缝」：约两人高的漆黑裂隙，边缘不规则，从侧面看几乎不可见，但从正面直视时会产生强烈的眩晕与「被注视」感。附近三名矿工家属先后失踪，最后一次目击均指向裂隙方向。",
        "IMAC 协调 BRI 与晨星团联合接管调查。初期勘查确认裂隙并非「入口」，而是一处持续存在的空间破损点——接近者会感到明显的拉扯感，但裂隙本身并不「吸入」物体，只对生命体与部分仪器产生定向吸引。",
      ],
      features: [
        "洛林裂隙是一处<strong>持续存在的空间破损点</strong>：竖立于地表约两米高，正面可见、侧面近乎不可见。裂隙边缘不规则，始终处于缓慢的「呼吸」起伏中，无固定周期可测。",
        "裂隙对生命体产生定向吸引：5米内出现拉扯感，越近越强，1米内几乎无法抗拒；非生命体（金属、石块）不受影响，但部分精密仪器在裂隙附近出现读数漂移。",
        "裂隙疑似与无尽楼梯（SPA-0021）共享同一空间结构源——两者均在洛林自由市及周边出现，BRI 将其列为「空间结构同源假说」的关键样本。",
      ],
      mapNode: riftMap,
      mapTag: "现场布局 · LAYOUT",
      verifiedRules: [
        { num: "一", title: "定向吸引", desc: "裂隙对生命体产生定向拉扯：5米内可感知，1米内几乎无法抗拒；非生命体不受影响，但精密仪器读数会出现漂移。" },
        { num: "二", title: "正面可见", desc: "裂隙正面可见（漆黑、边缘不规则），侧面近乎不可见；直视裂隙会产生眩晕与「被注视」感，撤离后缓解。" },
        { num: "三", title: "不吸入", desc: "裂隙并非入口——物体不会被吞入，但持续靠近者会被拉扯至裂隙边缘，此后发生的事没有任何记录。" },
      ],
      speculatedRules: [
        "裂隙可能是一处「空间破损」而非「入口」——其拉扯力疑似来自破损边缘的空间张力，而非裂隙内部",
        "与无尽楼梯（SPA-0021）疑似共享同一空间结构源，可能与洛林自由市的地理位置存在关联",
        "裂隙边缘的「呼吸」起伏或与地下矿脉结构有关，但证据不足，无法确认",
      ],
      entryRecords: [
        { term: "初期勘查", year: "安珀历9年·秋", count: 6, org: "BRI/晨星团联合", result: "2人生还，4人死亡", status: "death" },
        { term: "第二次", year: "安珀历12年·夏", count: 5, org: "晨星团", result: "3人生还，2人死亡", status: "death" },
        { term: "第三次", year: "安珀历15年·春", count: 4, org: "BRI", result: "2人生还，2人死亡", status: "death" },
        { term: "第四次", year: "安珀历22年·冬", count: 6, org: "BRI/晨星团联合", result: "1人生还，5人死亡", status: "death" },
      ],
      phenomena: [
        "<strong>「被注视」感：</strong>直视裂隙的观察者普遍报告眩晕与「被注视」感，且视线无法主动移开，需旁人协助才可转移注意力——该现象在初期勘查中被误判为心理暗示，后确认具有一致性。",
        "<strong>读数漂移：</strong>裂隙附近精密仪器出现系统性读数漂移，方向始终指向裂隙；漂移幅度与距离负相关，疑似空间张力对仪器的影响，尚未有明确解释。",
        "<strong>同源呼应：</strong>裂隙边缘的「呼吸」起伏频率，与无尽楼梯（SPA-0021）折叠点的位移周期存在约 0.3% 的偏差率——BRI 认为这是「同源假说」最有价值的观测数据。",
      ],
      imacNote: "洛林裂隙是「空间结构同源假说」的核心样本，其与无尽楼梯（SPA-0021）的关联研究由 BRI 主导。鉴于裂隙位于洛林自由市边境、且对生命体存在致命吸引，IMAC 协调办公室已将其列为「优先级-贝塔」观察对象，由 BRI/晨星团联合执行边界测绘（三级响应）。任何组织在采取行动前必须提交完整方案并获得 IMAC 审批。未经授权的私自进入将被视为严重违规。",
      suggestedActions: [
        "完成联合边界测绘，建立裂隙边缘的长期监测信标阵列，记录「呼吸」起伏数据",
        "由 BRI 牵头比对裂隙呼吸频率与无尽楼梯折叠点位移数据，验证「同源假说」",
        "研究裂隙拉扯力的衰减规律，评估能否通过物理屏蔽降低接近风险",
      ],
      internalNode: (
        <Restricted level="internal" label="机密级内容" compact>
          <div className="internal-note">
            <p className="internal-note-text">
              【边界研究院内部评估 · 空间异常研究所】<br/><br/>
              洛林裂隙是我最想弄懂、又最怕弄懂的异常——它就在地表上立着，看得见摸得着，可它到底是什么，我们连边都没摸到。<br/><br/>
              最初接手时我以为它是一道「门」，后来发现它连门都算不上——它不吸入任何东西，只是拉扯，只是让靠近的人消失。这种「只对生命体起作用的拉扯」在物理上很难解释，除非我们承认：裂隙本身就有「意图」。<br/><br/>
              与无尽楼梯的同步数据是这几年最让我兴奋的发现。0.3% 的偏差率在仪器误差范围内，但两处异常相距不过百余公里，周期却如此接近——我倾向于相信它们来自同一个源头。如果这个假说成立，洛林裂隙就不再是孤例，而是一整个「空间结构源」在地表的两个破口。<br/><br/>
              处置上，我赞成维持边界测绘与远距监测，不鼓励接近裂隙边缘——我们损失的人已经够多了，而每一次损失，裂隙边缘都没有留下任何痕迹，好像那些人从未存在过。<br/><br/>
              这让我不安。比起看不见的敌人，我更怕这种「仿佛什么都没发生」的消失。
            </p>
            <div className="internal-note-signature">— 顾远舟 · 边界研究院院长 · 空间异常研究所</div>
          </div>
        </Restricted>
      ),
    };

    return <AnomalyDossier data={riftData} />;
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
          /* 备注 / 内部评估：移动端紧凑排版 */
          .note-box, .internal-note { padding: 16px 14px; }
          .note-box::before, .internal-note::before { left: 12px; }
          .note-text, .internal-note-text { font-size: 13px; line-height: 1.7; }
          .internal-note-signature { text-align: left; margin-top: 14px; }
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
                  <td style={{ color: "var(--accent-red-bright)" }} colSpan={3}>第十一届 · 进行中 · IMAC联合行动（BRI/衔尾蛇联合派遣 · 6人 · 全员失联）</td>
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
                <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px dashed rgba(196, 40, 40, 0.2)" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent-red-bright)", letterSpacing: "0.15em", marginBottom: "8px" }}>
                    建议后续行动
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.8", margin: 0 }}>
                    在条件成熟前，不建议组织大规模进入。优先维持外围监测，
                    等待第十一届内部存活者的信标状态变化——无论其最终恢复正常或完全消失，
                    都将为该异常的解析提供关键信息。
                  </p>
                </div>
              </div>
              <div className="internal-note">
                <Restricted level="internal" label="机密级内容" compact>
                  <p className="internal-note-text">
                    【衔尾蛇事务所内部评估 · 首席溯界者 陆沉舟】<br/><br/>
                    赤月学院是我职业生涯里最让我不安的一个异常——因为它不像异常。<br/><br/>
                    十一届，一百一十六人，没有一个人是被规则直接杀死的：他们要么失踪，要么「剧情失败」后消失，要么同化。
                    常规深渊级异常是「主动杀人」的，赤月学院不像。它更像是在「筛选」什么——我说不清它在筛选什么，但那种感觉挥之不去。<br/><br/>
                    白玫瑰花园是这一切的钥匙。所有接近过核心区域的人，即使回来了，也都变了。我见过他们的眼睛，那不是被吓出来的，是被「看过」之后留下的东西。<br/><br/>
                    处置上我建议维持外围监测，暂不组织大规模进入；第十一届内部存活者的信标必须盯住——无论它恢复正常还是彻底消失，都会告诉我们答案。<br/><br/>
                    至于直觉的部分，档案本不该写，但我还是想写：我总觉得，这座学院在等待某个人，或者说，在等某个「学生」毕业。等它真正「毕业」的那天，我们最好已经准备好了。
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
