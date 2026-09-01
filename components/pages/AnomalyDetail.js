// Anomaly Detail Page
function AnomalyDetailPage() {
  const {
    navigate
  } = useRouter();
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
  const isShortcut = anomalyId === "SPA-2088";
  const isSlumber = anomalyId === "OBA-0148";
  const isKettle = anomalyId === "OBA-0321";
  const isHomeward = anomalyId === "SPA-0317";
  const isSilent = anomalyId === "PHB-0521";
  const isUmbrella = anomalyId === "OBA-0371";

  // === SPA-0021 无尽楼梯 档案数据 ===
  const stairVerifiedRules = [{
    num: "一",
    title: "方向守恒",
    desc: "进入异常后，无论向上还是向下，行走方向感始终指向「下楼」，但楼层会循环：从2层平台下楼会回到4层，从4层下楼回到3层，依次循环。1层与5层从未被观测到。"
  }, {
    num: "二",
    title: "停留惩罚",
    desc: "在任意楼梯平台上停留超过约3分钟，楼梯会「变化」——扶手变旧、墙面出现细密裂缝、台阶边缘磨损加剧；再次观察时，所在位置相对原位置偏移约半层。连续触发两次停留惩罚后，楼梯将无法再次识别。"
  }, {
    num: "三",
    title: "同伴不可回应",
    desc: "同行者始终可见，彼此能正常行走，但互相呼喊没有任何声音传回——声波被折叠空间吸收。通过身体接触（握手/搭肩）可以维持位置确认。"
  }, {
    num: "四",
    title: "光照恒定",
    desc: "异常楼梯间无自然光，照明恒定且无光源可见。不存在「黑暗阶段」，手电等光源无效但也不受影响。"
  }];
  const stairSpeculatedRules = ["楼梯可能具有「活体」特性：调查显示，与白鸽公寓同款式楼梯的多栋建筑，其楼梯间开始出现细微异常（台阶数增加、扶手老旧速度加快）", "到达1层的条件可能不是「走完楼梯」，而是满足某种空间条件（如同时有两组人从上下两个方向经过折叠点）", "异常核心疑似位于2层平台与3层平台之间的「折叠点」，该处温度比楼梯间其他位置低约4℃", "部分失踪者可能在楼梯「折叠层」中存活——有返回者称在循环中看到过疑似人影"];
  const stairEntryRecords = [{
    term: "第一批",
    year: "安珀历12年·秋",
    count: 5,
    org: "洛林警署",
    result: "2人生还，3人失踪",
    status: "mixed"
  }, {
    term: "第二批",
    year: "安珀历13年·春",
    count: 8,
    org: "BRI",
    result: "3人生还，5人失踪",
    status: "mixed"
  }, {
    term: "第三批",
    year: "安珀历15年",
    count: 10,
    org: "BRI",
    result: "2人生还，8人失踪",
    status: "death"
  }, {
    term: "第四批",
    year: "安珀历18年",
    count: 12,
    org: "BRI",
    result: "3人生还，9人失踪",
    status: "death"
  }, {
    term: "第五批",
    year: "安珀历22年",
    count: 14,
    org: "BRI",
    result: "3人生还，11人失踪",
    status: "death"
  }, {
    term: "第六批",
    year: "安珀历27年",
    count: 15,
    org: "BRI/晨星团联合",
    result: "3人生还，12人失踪",
    status: "death"
  }, {
    term: "第七批",
    year: "安珀历31年",
    count: 12,
    org: "BRI",
    result: "2人生还，10人失踪",
    status: "death"
  }, {
    term: "第八批",
    year: "安珀历36年·冬",
    count: 11,
    org: "BRI",
    result: "2人生还，9人失踪",
    status: "death"
  }];
  const verifiedRules = [{
    num: "一",
    title: "身份分配",
    desc: "进入者自动获得学生身份与「剧情书」，严重偏离角色设定将触发惩罚。剧情书内容因人而异。"
  }, {
    num: "二",
    title: "区域限制",
    desc: "不可破坏校园建筑与设施。越界进入未开放区域将触发空间排斥，严重者直接消失。"
  }, {
    num: "三",
    title: "宵禁制度",
    desc: "23:00 至次日 6:00 期间必须返回宿舍。夜间外出者死亡率 100%，无例外记录。"
  }, {
    num: "四",
    title: "教学制度",
    desc: "定期进行才能考核。排名第一者可获得「特殊奖励」，内容未知，疑似与离开路径相关。"
  }];
  const speculatedRules = ["时间流速异常，内外时间偏差约 3-7 倍，具体比例不固定", "存在多条可能的离开路径，不限于考核第一", "校长为核心 NPC，掌握异常关键信息", "白玫瑰花园为异常核心区域，进入者极少返回"];
  const buildings = ["主教学楼", "月华阁（宿舍）", "听雪楼（宿舍）", "青藤苑（宿舍）", "观星台（宿舍）", "望山居（宿舍）", "图书馆", "美术馆", "音乐厅", "体育馆", "植物园", "实验楼", "白玫瑰花园（中心）"];
  const entryRecords = [{
    term: "第一届",
    year: "安珀历28年·冬",
    count: 12,
    org: "衔尾蛇",
    result: "全员失踪",
    status: "death"
  }, {
    term: "第二届",
    year: "安珀历29年·春",
    count: 8,
    org: "衔尾蛇",
    result: "2人生还，6人失踪",
    status: "mixed"
  }, {
    term: "第三届",
    year: "安珀历29年·秋",
    count: 15,
    org: "BRI联合考察",
    result: "13人死亡，2人同化",
    status: "death"
  }, {
    term: "第四届",
    year: "安珀历30年·夏",
    count: 10,
    org: "晨星团",
    result: "全员失踪",
    status: "death"
  }, {
    term: "第五届",
    year: "安珀历31年·冬",
    count: 6,
    org: "衔尾蛇",
    result: "1人生还，5人失踪",
    status: "mixed"
  }, {
    term: "第六届",
    year: "安珀历33年·春",
    count: 20,
    org: "BRI/衔尾蛇联合",
    result: "18人死亡，2人生还后死亡",
    status: "death"
  }, {
    term: "第七届",
    year: "安珀历34年·秋",
    count: 9,
    org: "悬铃木",
    result: "全员同化",
    status: "assim"
  }, {
    term: "第八届",
    year: "安珀历36年·夏",
    count: 12,
    org: "衔尾蛇",
    result: "10人失踪，2人死亡",
    status: "death"
  }, {
    term: "第九届",
    year: "安珀历37年·冬",
    count: 7,
    org: "长桥会社",
    result: "全员失踪",
    status: "death"
  }, {
    term: "第十届",
    year: "安珀历38年·秋",
    count: 9,
    org: "衔尾蛇",
    result: "1人生还，8人失踪",
    status: "mixed"
  }, {
    term: "第十一届",
    year: "安珀历39年·秋",
    count: 6,
    org: "BRI/衔尾蛇联合",
    result: "进行中 · 全员失联",
    status: "active",
    current: true,
    members: [{
      name: "沈彻",
      rank: "资深溯界者·执灯",
      org: "衔尾蛇",
      role: "队长 · 行动指挥",
      isLeader: true,
      orgType: "anomalist"
    }, {
      name: "季明轩",
      rank: "溯界者·破界",
      org: "衔尾蛇",
      role: "队员",
      isLeader: false,
      orgType: "anomalist"
    }, {
      name: "顾泽鸣",
      rank: "资深溯界者·执灯",
      org: "BRI",
      role: "队长 · 学术负责",
      isLeader: true,
      orgType: "anomalist"
    }, {
      name: "林薇",
      rank: "溯界者·破界",
      org: "BRI",
      role: "队员 · 外勤侦察",
      isLeader: false,
      orgType: "anomalist"
    }, {
      name: "姜言",
      rank: "平民",
      org: "被卷入民众",
      role: "广告公司职员",
      isLeader: false,
      orgType: "civilian"
    }, {
      name: "苏晚晴",
      rank: "平民",
      org: "被卷入民众",
      role: "大学生",
      isLeader: false,
      orgType: "civilian"
    }]
  }];
  if (!isDefault && !isHarbor && !isStairwell && !isTrain && !isOutpost && !isVoid && !isLoop && !isRift && !isShortcut && !isSlumber && !isKettle && !isHomeward && !isSilent && !isUmbrella) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
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
        `), /*#__PURE__*/React.createElement("div", {
      className: "archive-page"
    }, /*#__PURE__*/React.createElement("div", {
      className: "archive-auth-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "archive-auth-inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "archive-auth-status"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dot"
    }), /*#__PURE__*/React.createElement("span", null, "\u5DF2\u8BA4\u8BC1 \xB7 \u8BBF\u95EE\u7EA7\u522B\uFF1A\u6807\u51C6")), /*#__PURE__*/React.createElement("span", {
      className: "archive-logout",
      onClick: () => navigate("/")
    }, "\u9000\u51FA\u8BA4\u8BC1"))), /*#__PURE__*/React.createElement("div", {
      className: "container detail-placeholder"
    }, /*#__PURE__*/React.createElement("div", {
      className: "detail-placeholder-id mono"
    }, anomalyId), /*#__PURE__*/React.createElement("div", {
      className: "detail-placeholder-text"
    }, "\u8BE5\u5F02\u5E38\u8BB0\u5F55\u8BE6\u60C5\u6682\u672A\u516C\u5F00"), /*#__PURE__*/React.createElement("div", {
      className: "detail-placeholder-text",
      style: {
        fontSize: "13px",
        color: "var(--text-muted)"
      }
    }, "\u4EC5\u4F5C\u5217\u8868\u6F14\u793A \xB7 \u5B8C\u6574\u6863\u6848\u8BF7\u67E5\u770B LOA-0073 \u8D64\u6708\u5B66\u9662"), /*#__PURE__*/React.createElement("span", {
      className: "detail-back-link",
      onClick: () => navigate("/anomaly-archive")
    }, "\u2190 \u8FD4\u56DE\u6863\u6848\u5217\u8868"), /*#__PURE__*/React.createElement("div", {
      className: "file-archive-notice",
      style: {
        marginTop: "48px",
        maxWidth: "560px",
        textAlign: "left"
      }
    }, "\u672C\u6863\u6848\u5DF2\u7EB3\u5165 IMAC \u5168\u7403\u5F02\u5E38\u4FE1\u606F\u603B\u5E93\uFF0C\u672A\u7ECF IMAC \u8054\u5408\u884C\u52A8\u6307\u6325\u4E2D\u5FC3\u6388\u6743\uFF0C\u4E0D\u5F97\u64C5\u81EA\u590D\u5236\u6216\u4F20\u64AD\u3002", /*#__PURE__*/React.createElement("div", {
      className: "file-archive-signature"
    }, "\u2014\u2014 IMAC \u5F02\u5E38\u4FE1\u606F\u603B\u5E93 \xB7 \u5B89\u73C0\u538639\u5E74\u6625")))));
  }
  if (isHarbor) {
    const harborMap = /*#__PURE__*/React.createElement("div", {
      className: "stair-map"
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 340 170",
      width: "100%",
      style: {
        display: "block"
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: "60",
      y: "20",
      width: "70",
      height: "120",
      fill: "rgba(20,20,24,0.9)",
      stroke: "rgba(196,40,40,0.7)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "70",
      y: "30",
      width: "50",
      height: "100",
      fill: "rgba(10,10,12,0.9)",
      stroke: "rgba(196,40,40,0.4)",
      strokeWidth: "1"
    }), [40, 60, 80, 100, 120].map((y, i) => /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: "95",
      cy: y,
      r: "2",
      fill: "rgba(196,154,44,0.8)"
    })), /*#__PURE__*/React.createElement("text", {
      x: "60",
      y: "14",
      fill: "rgba(196,40,40,0.8)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u523B\u6EE1\u7B26\u53F7\u7684\u94C1\u95E8"), /*#__PURE__*/React.createElement("polygon", {
      points: "130,40 320,65 320,125 130,150",
      fill: "rgba(20,20,24,0.55)",
      stroke: "rgba(74,88,104,0.5)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "130",
      y1: "95",
      x2: "320",
      y2: "95",
      stroke: "rgba(196,40,40,0.3)",
      strokeWidth: "0.8",
      strokeDasharray: "4 3"
    }), /*#__PURE__*/React.createElement("text", {
      x: "240",
      y: "90",
      fill: "rgba(168,168,180,0.6)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u65E0\u9650\u5EF6\u4F38\u2026"), /*#__PURE__*/React.createElement("text", {
      x: "200",
      y: "158",
      fill: "rgba(196,154,44,0.8)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u300C\u5B83\u8BB0\u5F97\u6BCF\u4E00\u4E2A\u6765\u8FC7\u7684\u4EBA\u300D")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--text-tertiary)",
        marginTop: "10px",
        textAlign: "center",
        letterSpacing: "0.08em"
      }
    }, "\u5168\u7403\u7B2C\u4E00\u8D77\u88AB\u6B63\u5F0F\u8BB0\u5F55\u7684\u5F02\u5E38\u4E8B\u4EF6 \xB7 \u94C1\u95E8\u7B26\u53F7\u65E0\u6CD5\u62D3\u5370 \xB7 \u8D70\u5ECA\u53EF\u65E0\u9650\u5EF6\u4F38"));
    const harborData = {
      id: "LOA-0001",
      name: "灰港仓库",
      nameEn: "HARBOR WAREHOUSE · THE FIRST",
      stamp: "机密 · CONFIDENTIAL",
      classification: "CONFIDENTIAL",
      ver: "39.0",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      survivalRate: 25,
      info: [["异常编号", /*#__PURE__*/React.createElement("span", {
        className: "detail-file-id",
        style: {
          fontSize: "18px"
        }
      }, "LOA-0001"), "名称", "灰港仓库 · Harbor Warehouse"], ["所属管辖", "衔尾蛇事务所 · Ouroboros Agency", "首次记录", "安珀历元年 · 9月"], ["异常等级", {
        levelKey: "doomed",
        text: "厄运级 · DOOMED"
      }, "当前状态", {
        statusKey: "active",
        text: "● 活跃 ACTIVE"
      }], ["生还率", [/*#__PURE__*/React.createElement("span", {
        className: "survival-rate-red",
        key: "s"
      }, "\u7EA6 25%"), "（累计32人进入，24人死亡）"], "信息价值", "极高（全球第一起被正式记录的异常事件，异常学起源档案）"], ["档案更新", "安珀历39年 · 春", "处置状态", "遗址封闭管理 · 未解决"]],
      discovery: ["安珀历元年9月，格伦贝尔联邦第七大城市「灰港」的港区一座仓库在夜间凭空消失。原址上出现了一扇刻满符号的铁门——推开铁门后，通向一个与其外部外观完全不符的、无限延伸的走廊空间。", "首批进入探索的九人小队仅一人生还，获救后精神严重受损，反复重复同一句话：「它记得每一个来过的人。」这是全球第一起被正式记录的异常事件，标志着「前安珀时代」的终结与安珀历纪年的启用。", "此后灰港异常又被多次进入，截至安珀历39年共确认五次进入行动。二次进入者（进入过一次后再次进入者）共三名，其报告相互印证：异常确实记得他们。"],
      features: ["异常本体为消失的仓库与替代它的铁门走廊：仓库原址上出现的铁门刻满无法拓印的符号，门后走廊无限延伸、与仓库外部外观完全不符，方向感与空间布局均不可靠。", "异常具有「记忆」特性——它记得每一个进入过的人。已确认的三名二次进入者报告相互印证：再次进入时走廊会对其表现出「熟悉」——灯光自动亮起、门自动开启。但「被记住」并不等于「被放行」，二次进入同样有伤亡。", "铁门符号无法被任何方式记录：拓印会迅速褪色，照片与文字描述同样失真——这被认为是异常自我保护机制的一部分。"],
      mapNode: harborMap,
      mapTag: "结构示意 · DIAGRAM",
      verifiedRules: [{
        num: "一",
        title: "铁门入口",
        desc: "仓库原址的铁门为唯一已知入口，推开后进入走廊；铁门符号无法拓印，任何复制品均会迅速褪色模糊，照片与文字描述同样失真。"
      }, {
        num: "二",
        title: "走廊延伸",
        desc: "走廊可无限延伸且方向感不可靠。返回者描述「走廊在改变」——同一段路在不同时间通过时，长度与布局均不相同。"
      }, {
        num: "三",
        title: "记忆识别",
        desc: "异常能识别进入者。三名已确认的二次进入者报告相互印证：再次进入时走廊表现出「熟悉」——灯光自动亮起、门自动开启；这与生还者反复重复的「它记得每一个来过的人」一致。"
      }],
      speculatedRules: ["铁门上的符号可能是异常「记忆」的载体或索引——符号无法被记录，或许正是异常自我保护机制的一部分", "走廊中疑似存在与进入者对应的「房间」，房间内容与进入者的记忆相关", "异常未表现出主动扩张迹象，但误入事件仍不定期发生——灰港港区遗址周围仍会偶发「看到铁门」的报告"],
      entryRecords: [{
        term: "首批",
        year: "安珀历元年·9月",
        count: 9,
        org: "格伦贝尔联邦勘测队",
        result: "1人生还，8人死亡",
        status: "death"
      }, {
        term: "二次",
        year: "安珀历2年·春",
        count: 6,
        org: "衔尾蛇",
        result: "2人生还，4人死亡",
        status: "death"
      }, {
        term: "三次",
        year: "安珀历9年·秋",
        count: 8,
        org: "BRI/衔尾蛇联合考察",
        result: "3人生还，5人死亡",
        status: "death"
      }, {
        term: "四次",
        year: "安珀历21年·冬",
        count: 5,
        org: "衔尾蛇",
        result: "1人生还，4人死亡",
        status: "death"
      }, {
        term: "五次",
        year: "安珀历35年·夏",
        count: 4,
        org: "衔尾蛇·最小接触",
        result: "1人生还，3人死亡",
        status: "death"
      }],
      phenomena: ["<strong>「它记得每一个来过的人」：</strong>唯一生还者反复重复此句。其描述的铁门符号与走廊细节与其他目击记录完全一致，但符号无法被任何方式记录。", "<strong>记忆响应：</strong>三名已确认的二次进入者报告相互印证——再次进入时走廊表现出「熟悉」：灯光自动亮起、门自动开启。异常能够识别并记忆进入者，但「被记住」不等于「被放行」。"],
      imacNote: "灰港事件为全球第一起被正式记录的异常事件，标志着「前安珀时代」的终结与安珀历纪年的启用——安珀历以第一起异常事件为元年。截至安珀历39年，全球已记录异常事件累计超过两万起，仍有超过65%处于「未解决」或「休眠」状态；异常的出现没有规律可循。该异常至今未解决，且未表现出扩张或衰竭迹象；自首次记录以来累计进入五次，二次进入者确认异常具有稳定的识别能力。任何组织进入前须提交完整方案并获得 IMAC 审批。未经授权的私自进入将被视为严重违规。",
      suggestedActions: ["维持灰港港区遗址的封闭管理，防止误入事件，并记录周边「看到铁门」的报告", "成立专项研究组研究铁门符号（符号无法拓印，可尝试长曝光观测与多人同步记录比对）", "对三名二次进入者建立长期跟踪档案，记录其后续精神状况与再次进入的意愿变化", "评估灰港异常的「记忆特性」与其他异常（如赤月学院 LOA-0073）是否存在共性，探索异常「记忆」的普遍性"],
      internalNode: /*#__PURE__*/React.createElement(Restricted, {
        level: "internal",
        label: "\u673A\u5BC6\u7EA7\u5185\u5BB9",
        compact: true
      }, /*#__PURE__*/React.createElement("div", {
        className: "internal-note"
      }, /*#__PURE__*/React.createElement("p", {
        className: "internal-note-text"
      }, "\u3010\u8854\u5C3E\u86C7\u4E8B\u52A1\u6240\u5185\u90E8\u8BC4\u4F30 \xB7 \u521B\u59CB\u4EBA\u6863\u6848 \xB7 \u9648\u9ED8\u3011", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u7070\u6E2F\u662F\u6211\u4EEC\u8FD9\u4E00\u884C\u7684\u8D77\u70B9\uFF0C\u4E5F\u662F\u4E00\u9053\u6CA1\u80FD\u6108\u5408\u7684\u4F24\u53E3\u3002\u4E94\u6B21\u8FDB\u5165\uFF0C32\u4E2A\u4EBA\u8FDB\u53BB\uFF0C24\u4E2A\u4EBA\u6CA1\u6709\u51FA\u6765\u2014\u2014\u8FD9\u4E2A\u6570\u5B57\u6211\u80CC\u4E86\u4E09\u5341\u4E5D\u5E74\uFF0C\u6BCF\u4E00\u4E2A\u540D\u5B57\u90FD\u8BB0\u5F97\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u4F46\u5B83\u4E5F\u6559\u4F1A\u4E86\u6211\u4EEC\u4E00\u4EF6\u4E8B\uFF1A\u5B83\u8BB0\u5F97\u6211\u4EEC\u3002\u4E09\u540D\u4E8C\u6B21\u8FDB\u5165\u8005\u7684\u62A5\u544A\u6211\u90FD\u4EB2\u81EA\u6838\u8FC7\u2014\u2014\u8D70\u5ECA\u4F1A\u4E3A\u4ED6\u4EEC\u4EAE\u706F\uFF0C\u4E3A\u4ED6\u4EEC\u5F00\u95E8\u3002\u90A3\u4E0D\u662F\u5584\u610F\uFF0C\u662F\u4E00\u79CD\u300C\u8BA4\u5F97\u300D\u3002\u5B83\u8BA4\u5F97\u6BCF\u4E00\u4E2A\u6765\u8FC7\u7684\u4EBA\uFF0C\u5C31\u50CF\u6211\u8BB0\u5F97\u6BCF\u4E00\u4E2A\u6CA1\u8D70\u51FA\u6765\u7684\u4EBA\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u94C1\u95E8\u4E0A\u7684\u7B26\u53F7\u81F3\u4ECA\u6CA1\u6709\u4EBA\u80FD\u62D3\u4E0B\u6765\u3001\u62CD\u4E0B\u6765\u3001\u5199\u4E0B\u6765\u3002\u6211\u6000\u7591\u90A3\u4E0D\u662F\u9632\u5907\uFF0C\u800C\u662F\u5B83\u81EA\u5DF1\u4E5F\u4E0D\u613F\u610F\u7559\u4E0B\u75D5\u8FF9\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u5904\u7F6E\u4E0A\uFF0C\u7EF4\u6301\u5C01\u95ED\uFF0C\u4E0D\u518D\u4E3B\u52A8\u8FDB\u5165\u3002\u4E8C\u6B21\u8FDB\u5165\u8005\u4E00\u5F8B\u5907\u6848\uFF0C\u8FDB\u51FA\u7684\u5FC3\u7406\u8BC4\u4F30\u4E0D\u80FD\u7701\u2014\u2014\u6D3B\u7740\u56DE\u6765\u7684\u4EBA\uFF0C\u5FC3\u91CC\u591A\u5C11\u90FD\u7559\u4E86\u70B9\u4E1C\u897F\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u81F3\u4E8E\u8BB0\u5FC6\u7684\u300C\u4E0A\u9650\u300D\uFF0C\u6211\u4EEC\u95EE\u4E0D\u51FA\u7B54\u6848\u3002\u5728\u786E\u8BA4\u4E4B\u524D\uFF0C\u4EFB\u4F55\u8BD5\u63A2\u90FD\u610F\u5473\u7740\u518D\u4ED8\u4EBA\u547D\u3002\u5148\u5B88\u4F4F\uFF0C\u518D\u95EE\u4E3A\u4EC0\u4E48\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u6700\u540E\u8BF4\u53E5\u79C1\u4EBA\u7684\u8BDD\uFF1A\u9996\u6279\u4E5D\u4E2A\u4EBA\uFF0C\u53EA\u6709\u6211\u6D3B\u7740\u8D70\u51FA\u6765\uFF0C\u8FD9\u6761\u547D\u662F\u7070\u6E2F\u8FD8\u6211\u7684\u3002\u4E09\u5341\u4E5D\u5E74\u4E86\uFF0C\u6211\u6BCF\u5E74\u90FD\u53BB\u94C1\u95E8\u524D\u7AD9\u4E00\u4F1A\u513F\u2014\u2014\u5B83\u4E00\u76F4\u8BB0\u5F97\u6211\uFF0C\u5C31\u50CF\u6211\u8BB0\u5F97\u90A3\u516B\u4E2A\u4EBA\u3002\u8FD9\u6761\u6863\u6848\u5F80\u540E\u65E0\u8BBA\u8C01\u63A5\u624B\uFF0C\u8BF7\u66FF\u6211\u8BB0\u4F4F\u4E00\u4EF6\u4E8B\uFF1A\u5B83\u8BB0\u5F97\u6BCF\u4E00\u4E2A\u6765\u8FC7\u7684\u4EBA\uFF0C\u8FD9\u53E5\u8BDD\u4E0D\u662F\u5A01\u80C1\uFF0C\u662F\u4E8B\u5B9E\u3002"), /*#__PURE__*/React.createElement("div", {
        className: "internal-note-signature"
      }, "\u2014 \u9648\u9ED8 \xB7 \u8854\u5C3E\u86C7\u4E8B\u52A1\u6240 \xB7 \u7B2C\u4E00\u4EFB\u6240\u957F")))
    };
    return /*#__PURE__*/React.createElement(AnomalyDossier, {
      data: harborData
    });
  }
  if (isStairwell) {
    const stairMap = /*#__PURE__*/React.createElement("div", {
      className: "stair-map"
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 320 200",
      width: "100%",
      style: {
        display: "block"
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: "40",
      y: "10",
      width: "240",
      height: "180",
      fill: "rgba(20,20,24,0.5)",
      stroke: "rgba(74,88,104,0.4)",
      strokeWidth: "1",
      strokeDasharray: "4 3"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "50",
      y: "18",
      width: "64",
      height: "8",
      fill: "rgba(74,88,104,0.55)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "210",
      y: "68",
      width: "64",
      height: "8",
      fill: "rgba(74,88,104,0.55)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "50",
      y: "118",
      width: "64",
      height: "8",
      fill: "rgba(74,88,104,0.55)"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "114",
      y1: "22",
      x2: "210",
      y2: "72",
      stroke: "rgba(196,40,40,0.5)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "210",
      y1: "72",
      x2: "114",
      y2: "122",
      stroke: "rgba(196,40,40,0.5)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M60 132 C 30 132, 30 22, 50 22",
      fill: "none",
      stroke: "rgba(196,154,44,0.7)",
      strokeWidth: "1.5",
      strokeDasharray: "4 3",
      markerEnd: "url(#stairArrow)"
    }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
      id: "stairArrow",
      markerWidth: "6",
      markerHeight: "6",
      refX: "5",
      refY: "3",
      orient: "auto"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0,0 L6,3 L0,6 Z",
      fill: "rgba(196,154,44,0.9)"
    }))), /*#__PURE__*/React.createElement("text", {
      x: "60",
      y: "16",
      fill: "rgba(168,168,180,0.8)",
      fontSize: "11",
      fontFamily: "monospace"
    }, "4F"), /*#__PURE__*/React.createElement("text", {
      x: "220",
      y: "66",
      fill: "rgba(168,168,180,0.8)",
      fontSize: "11",
      fontFamily: "monospace"
    }, "3F"), /*#__PURE__*/React.createElement("text", {
      x: "60",
      y: "116",
      fill: "rgba(168,168,180,0.8)",
      fontSize: "11",
      fontFamily: "monospace"
    }, "2F"), /*#__PURE__*/React.createElement("circle", {
      cx: "150",
      cy: "95",
      r: "4",
      fill: "#c42828"
    }), /*#__PURE__*/React.createElement("text", {
      x: "160",
      y: "99",
      fill: "rgba(196,40,40,0.9)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u6298\u53E0\u70B9"), /*#__PURE__*/React.createElement("text", {
      x: "230",
      y: "180",
      fill: "rgba(112,112,124,0.6)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "1F / 5F \u4E0D\u53EF\u8FBE")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--text-tertiary)",
        marginTop: "10px",
        textAlign: "center",
        letterSpacing: "0.08em"
      }
    }, "\u697C\u5C42\u5FAA\u73AF\uFF1A2F \u2192 3F \u2192 4F \u2192 2F \xB7 \u6298\u53E0\u70B9\u4F4D\u4E8E 2F\u20133F \u4E4B\u95F4\uFF08\u6E29\u5EA6\u4F4E\u7EA6 4\u2103\uFF09"));
    const stairData = {
      id: "SPA-0021",
      name: "无尽楼梯",
      nameEn: "ENDLESS STAIRWELL · HAZARDOUS",
      stamp: "机密 · CONFIDENTIAL",
      classification: "CONFIDENTIAL",
      ver: "39.1",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      survivalRate: 23,
      info: [["异常编号", /*#__PURE__*/React.createElement("span", {
        className: "detail-file-id",
        style: {
          fontSize: "18px"
        }
      }, "SPA-0021"), "名称", "无尽楼梯 · Endless Stairwell"], ["所属管辖", "边界研究院 · Boundary Research Institute", "首次记录", "安珀历12年 · 秋"], ["异常等级", {
        levelKey: "hazardous",
        text: "危险级 · HAZARDOUS"
      }, "当前状态", {
        statusKey: "active",
        text: "● 活跃 ACTIVE"
      }], ["生还率", [/*#__PURE__*/React.createElement("span", {
        className: "survival-rate-red",
        key: "s"
      }, "\u7EA6 23%"), "（87人进入，67人死亡）"], "信息价值", "高（空间折叠机理研究价值高）"], ["档案更新", "安珀历39年 · 春", "监测状态", "持续监测中 · 年均拉入 2-3 起"]],
      discovery: ["安珀历12年秋，洛林自由市旧城区的「白鸽公寓」B座住户连续向警署报案：多名居民表示在下楼时「走了很久都到不了一楼」，一名住户甚至在三楼台阶上原地消失，数小时后从四楼平台重新出现，全程无意识。", "BRI 调查组介入后确认，公寓2层至3层之间的楼梯间存在空间折叠异常。此后异常范围缓慢向整栋公寓的楼梯系统蔓延，现已覆盖全部三个楼梯井。公寓于安珀历14年整体封闭，原住民全部迁出。"],
      features: ["无尽楼梯是一处典型的<strong>空间折叠型异常</strong>。异常主体为白鸽公寓B座楼梯间：进入后楼梯可无限延伸，无论向上还是向下，台阶数恒定，楼层标识在 2/3/4 层之间循环，1层与5层从未被观测到。", "异常内部光照恒定、无自然光、无声源。同行者始终可见，但声音无法在楼梯间传递。扶手、墙面与台阶材质与正常建筑一致，但会随停留时间发生缓慢「老化」。", "异常入口位于2层平台，进入条件未知。部分报告显示，与白鸽公寓同款式的其他建筑楼梯间也可能成为异常入口——相关建筑已被列为观察对象。"],
      mapNode: stairMap,
      mapTag: "结构示意 · DIAGRAM",
      verifiedRules: stairVerifiedRules,
      speculatedRules: stairSpeculatedRules,
      entryRecords: stairEntryRecords,
      phenomena: ["<strong>楼梯「老化」残留：</strong>返回者描述，停留后楼梯扶手会出现明显旧化；且旧化痕迹在返回正常世界后，仍出现在白鸽公寓未被异常覆盖的楼梯段上，疑似异常具有「溢出」特性。", "<strong>「折叠层」人影：</strong>第三批进入的返回者声称，在循环中多次看到台阶下方半层处有疑似人影站立，呼喊无回应，人影始终保持固定姿势。", "<strong>同款式建筑征兆：</strong>监测显示，洛林自由市内另有两栋同款式公寓的楼梯间出现台阶数异常增加、扶手旧化加速等前兆，是否发展为异常尚在观察。"],
      imacNote: "无尽楼梯是空间折叠型异常的典型案例，其「循环楼层」结构对异常空间学具有重要参考价值。异常长期活跃但拉入频率较低（年均约2-3起），对周边居民影响可控。鉴于其潜在的扩散特性，IMAC 协调办公室已将其列为「空间异常扩散观察区」。任何组织在进入前必须提交完整方案并获得 IMAC 及 BRI 联合审批。未经授权的私自进入将被视为严重违规。",
      suggestedActions: ["在公寓周边布设空间波动监测装置，记录异常「呼吸」周期与折叠点位移规律", "联合晨星团开展几何拓扑测绘，尝试定位 2F–3F 间「折叠点」的空间坐标", "评估异常扩张趋势，必要时启动洛林自由市同款式公寓居民的整体迁移预案"],
      internalNode: /*#__PURE__*/React.createElement(Restricted, {
        level: "internal",
        label: "\u673A\u5BC6\u7EA7\u5185\u5BB9",
        compact: true
      }, /*#__PURE__*/React.createElement("div", {
        className: "internal-note"
      }, /*#__PURE__*/React.createElement("p", {
        className: "internal-note-text"
      }, "\u3010\u8FB9\u754C\u7814\u7A76\u9662\u5185\u90E8\u8BC4\u4F30 \xB7 \u7A7A\u95F4\u5F02\u5E38\u7814\u7A76\u6240\u3011", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u65E0\u5C3D\u697C\u68AF\u7684\u7A7A\u95F4\u6298\u53E0\u673A\u7406\u4E0E\u300C\u6D1B\u6797\u88C2\u9699\u300D\uFF08PHA-0182\uFF09\u5B58\u5728\u663E\u8457\u76F8\u4F3C\u6027\u2014\u2014\u4E24\u8005\u90FD\u53EF\u80FD\u5171\u4EAB\u540C\u4E00\u7C7B\u7A7A\u95F4\u7ED3\u6784\u6E90\u3002 \u82E5\u63A8\u6D4B\u89C4\u5219\u4E00\uFF08\u300C\u6D3B\u4F53\u300D\u7279\u6027\uFF09\u6210\u7ACB\uFF0C\u8BE5\u5F02\u5E38\u53EF\u80FD\u662F\u540C\u7C7B\u6298\u53E0\u5F02\u5E38\u7684\u300C\u6BCD\u4F53\u300D\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u5EFA\u8BAE\u5C06\u5176\u7EB3\u5165\u300C\u7A7A\u95F4\u5F02\u5E38\u8054\u5408\u7814\u7A76\u8BA1\u5212\u300D\uFF0C\u5E76\u5C1D\u8BD5\u5728\u6298\u53E0\u70B9\u5E03\u8BBE MK-III \u578B\u4FE1\u6807\uFF0C \u4EE5\u9A8C\u8BC1\u300C\u53CC\u5411\u7ECF\u8FC7\u6298\u53E0\u70B9\u300D\u80FD\u5426\u62B5\u8FBE 1 \u5C42\u3002\u6B64\u4E3E\u98CE\u9669\u53EF\u63A7\uFF0C\u5EFA\u8BAE\u7531 BRI \u4E0E\u6668\u661F\u56E2\u8054\u5408\u6267\u884C\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u9644\u8A00\uFF1A\u9012\u4EA4\u8FD9\u4EFD\u65B9\u6848\u524D\uFF0C\u6211\u5728 2F \u5E73\u53F0\u5750\u4E86\u5F88\u4E45\u3002\u6298\u53E0\u70B9\u7684\u300C\u547C\u5438\u300D\u5F88\u89C4\u5F8B\uFF0C\u50CF\u67D0\u79CD\u6C89\u7761\u7684\u8282\u5F8B\u2014\u2014\u6211\u4EEC\u7ED9\u5F02\u5E38\u5206\u7C7B\u3001\u7F16\u53F7\u3001\u5EFA\u6A21\u578B\uFF0C\u53EF\u9762\u5BF9\u5B83\u7684\u65F6\u5019\uFF0C\u6211\u8FD8\u662F\u4F1A\u60F3\u8D77\u5BFC\u5E08\u90A3\u53E5\u8BDD\uFF1A\u5148\u627F\u8BA4\u770B\u4E0D\u61C2\uFF0C\u624D\u6709\u8D44\u683C\u7814\u7A76\u3002\u8FD9\u6761\u6863\u6848\u662F\u5199\u7ED9\u540E\u4EBA\u7684\uFF1A\u8BF7\u5E26\u7740\u656C\u754F\u6765\u8BFB\u3002"), /*#__PURE__*/React.createElement("div", {
        className: "internal-note-signature"
      }, "\u2014 \u987E\u8FDC\u821F \xB7 \u8FB9\u754C\u7814\u7A76\u9662\u9662\u957F \xB7 \u7A7A\u95F4\u5F02\u5E38\u7814\u7A76\u6240")))
    };
    return /*#__PURE__*/React.createElement(AnomalyDossier, {
      data: stairData
    });
  }
  if (isTrain) {
    const trainMap = /*#__PURE__*/React.createElement("div", {
      className: "stair-map"
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 340 170",
      width: "100%",
      style: {
        display: "block"
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: "10",
      y: "20",
      width: "320",
      height: "110",
      fill: "rgba(138,180,212,0.05)",
      stroke: "rgba(138,180,212,0.25)",
      strokeWidth: "1",
      strokeDasharray: "4 3"
    }), /*#__PURE__*/React.createElement("text", {
      x: "20",
      y: "38",
      fill: "rgba(138,180,212,0.6)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u96FE\u533A \xB7 FOG ZONE"), /*#__PURE__*/React.createElement("line", {
      x1: "20",
      y1: "120",
      x2: "320",
      y2: "120",
      stroke: "rgba(74,88,104,0.5)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "20",
      y1: "126",
      x2: "320",
      y2: "126",
      stroke: "rgba(74,88,104,0.5)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "30",
      y: "70",
      width: "280",
      height: "46",
      rx: "4",
      fill: "rgba(20,20,24,0.9)",
      stroke: "rgba(196,40,40,0.6)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M30 70 L20 84 L30 116 Z",
      fill: "rgba(196,40,40,0.5)"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "100",
      y1: "70",
      x2: "100",
      y2: "116",
      stroke: "rgba(74,88,104,0.4)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "170",
      y1: "70",
      x2: "170",
      y2: "116",
      stroke: "rgba(74,88,104,0.4)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "240",
      y1: "70",
      x2: "240",
      y2: "116",
      stroke: "rgba(74,88,104,0.4)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: "50",
      y: "96",
      fill: "rgba(168,168,180,0.7)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "1-5 \u8282"), /*#__PURE__*/React.createElement("text", {
      x: "120",
      y: "96",
      fill: "rgba(74,154,44,0.95)",
      fontSize: "10",
      fontFamily: "monospace",
      fontWeight: "700"
    }, "\u7B2C6\u8282"), /*#__PURE__*/React.createElement("text", {
      x: "185",
      y: "96",
      fill: "rgba(168,168,180,0.7)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "7-8 \u8282"), /*#__PURE__*/React.createElement("text", {
      x: "252",
      y: "96",
      fill: "rgba(168,168,180,0.7)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u9910\u8F66"), /*#__PURE__*/React.createElement("path", {
      d: "M300 60 C 330 20, 330 10, 280 10 C 240 10, 200 20, 60 20",
      fill: "none",
      stroke: "rgba(196,154,44,0.8)",
      strokeWidth: "1.5",
      strokeDasharray: "5 3",
      markerEnd: "url(#trainArrow)"
    }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
      id: "trainArrow",
      markerWidth: "6",
      markerHeight: "6",
      refX: "5",
      refY: "3",
      orient: "auto"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0,0 L6,3 L0,6 Z",
      fill: "rgba(196,154,44,0.9)"
    }))), /*#__PURE__*/React.createElement("text", {
      x: "200",
      y: "14",
      fill: "rgba(196,154,44,0.85)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u65F6\u95F4\u5FAA\u73AF 47min"), /*#__PURE__*/React.createElement("rect", {
      x: "300",
      y: "132",
      width: "30",
      height: "10",
      fill: "rgba(196,40,40,0.25)",
      stroke: "rgba(196,40,40,0.5)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: "296",
      y: "150",
      fill: "rgba(196,40,40,0.7)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u865A\u5047\u7AD9\u53F0")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--text-tertiary)",
        marginTop: "10px",
        textAlign: "center",
        letterSpacing: "0.08em"
      }
    }, "\u5FAA\u73AF\u5468\u671F\u7EA6 47 \u5206\u949F \xB7 \u7B2C6\u8282\u8F66\u53A2\u65F6\u95F4\u6D41\u901F\u6B63\u5E38 \xB7 \u865A\u5047\u7AD9\u53F0\u4E0B\u8F66\u5373\u6D88\u5931"));
    const trainData = {
      id: "TMA-0045",
      name: "雾中列车",
      nameEn: "FOG TRAIN · DOOMED",
      stamp: "机密 · CONFIDENTIAL",
      classification: "CONFIDENTIAL",
      ver: "39.2",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      survivalRate: 8,
      info: [["异常编号", /*#__PURE__*/React.createElement("span", {
        className: "detail-file-id",
        style: {
          fontSize: "18px"
        }
      }, "TMA-0045"), "名称", "雾中列车 · Fog Train"], ["所属管辖", "长桥会社 · Long Bridge Company", "首次记录", "安珀历19年 · 冬"], ["异常等级", {
        levelKey: "doomed",
        text: "厄运级 · DOOMED"
      }, "当前状态", {
        statusKey: "active",
        text: "● 活跃 ACTIVE"
      }], ["生还率", [/*#__PURE__*/React.createElement("span", {
        className: "survival-rate-red",
        key: "s"
      }, "\u7EA6 8%"), "（125人进入，115人死亡）"], "信息价值", "高（时间循环与移动锚定机理研究价值高）"], ["档案更新", "安珀历39年 · 春", "监测状态", "持续监测中 · 年均发生 3-4 起"]],
      discovery: ["安珀历19年冬，格伦贝尔联邦东部铁路网的一列夜班列车在驶入鸣海城以北约60公里的山区雾带后失踪。搜索队在沿线未发现任何残骸；48小时后，该列车在下一班列车时刻重新出现在同一区间——车厢内乘客全部失踪，仅列车员一人存活，返回后始终重复「我数不清站台」这句话。", "此后数年间，这列幽灵列车多次在东部铁路网不同区段出现：任何驶入「雾区」的列车，其车厢内人员都会被替换为幽灵列车内的时间循环参与者。长桥会社接管调查后确认其为时间循环型异常，列车本身即异常的移动载体。"],
      features: ["雾中列车是一处典型的<strong>时间循环型异常</strong>。异常载体为一列老式蒸汽列车，编号已不可考。列车在东部铁路网行驶时周期性驶入「雾区」，循环周期约47分钟；循环结束后列车短暂消失，随后在另一区段重新出现并进入下一循环。", "循环中经过的所有车站均为虚假站台，下车者立即消失。列车上的时钟永远停在 23:47。乘务员会在每次循环开始约10分钟后逐一检票，票面上的目的地从未被看清。", "第6节车厢为「安全车厢」——该车厢内时间流速正常，是已知唯一不受循环重置影响的区域，也是历次行动的临时据点。"],
      mapNode: trainMap,
      mapTag: "结构示意 · DIAGRAM",
      verifiedRules: [{
        num: "一",
        title: "雾区入口",
        desc: "列车驶入特定雾区后进入异常，车厢内时间开始循环（约47分钟）。雾区位置随时间漂移，无固定坐标；近期出现频率在极寒区段明显上升。"
      }, {
        num: "二",
        title: "循环重置",
        desc: "循环结束时列车内时间重置，乘客回到循环起点；记忆完整保留，但随身物品状态全部重置（伤口、饥饿感、电量、携带的标记物均回到循环开始状态）。"
      }, {
        num: "三",
        title: "虚假站台",
        desc: "循环中经过的所有车站均为虚假站台，下车者立即消失，无返回记录。唯一例外：若列车自行停靠（而非进站），该站为真实站点。"
      }, {
        num: "四",
        title: "检票规则",
        desc: "循环开始约10分钟后乘务员开始检票，无票者（非乘客身份进入者）会被「带走」，不再出现。持有车票者可通过检票。"
      }],
      speculatedRules: ["列车长为核心 NPC，其胸前怀表的分针在每次循环中偏移1分钟——若偏移量累积至60分钟，可能出现「第48小时」的完整循环出口", "雾区入口可能锚定在东部铁路网某段废弃隧道中，列车在其中循环后从不同出口驶出", "循环中存在「记忆回声」：循环第3次后，车厢内开始出现与之前循环完全一致的乘客对话", "若在循环中集齐所有乘客的「票根」，可能触发出口条件——但票根在循环重置时会被收走"],
      entryRecords: [{
        term: "第一批",
        year: "安珀历19年·冬",
        count: 18,
        org: "长桥会社",
        result: "2人生还，16人失踪",
        status: "death"
      }, {
        term: "第二批",
        year: "安珀历21年",
        count: 20,
        org: "长桥会社",
        result: "1人生还，19人失踪",
        status: "death"
      }, {
        term: "第三批",
        year: "安珀历24年",
        count: 22,
        org: "长桥会社",
        result: "2人生还，20人失踪",
        status: "death"
      }, {
        term: "第四批",
        year: "安珀历27年",
        count: 25,
        org: "长桥会社/北境守望联合",
        result: "2人生还，23人失踪",
        status: "death"
      }, {
        term: "第五批",
        year: "安珀历32年",
        count: 20,
        org: "长桥会社",
        result: "2人生还，18人失踪",
        status: "death"
      }, {
        term: "第六批",
        year: "安珀历37年·秋",
        count: 20,
        org: "长桥会社",
        result: "1人生还，19人失踪",
        status: "death"
      }],
      phenomena: ["<strong>「雾中回声」：</strong>循环第3次后，车厢内开始出现与之前循环完全一致的乘客对话，逐字逐句重复；生还者称「像是有人在播放录音」。", "<strong>「站台人影」：</strong>虚假站台上始终站着同一批人影，数量随循环次数逐次减少；没有人影下过站台，但每次循环人影都会少一人。", "<strong>「怀表计数」：</strong>列车长怀表显示 23:47，但分针在每次循环后偏移约1分钟——生还者推测这是循环次数的记录方式。", "<strong>雾区漂移：</strong>近两年雾区出现位置明显北移，且更频繁地出现在北境冻土区段，与白松城周边异常活动是否存在关联尚在调查。"],
      imacNote: "雾中列车是目前已知最活跃的时间循环型异常之一，其「移动载体」特性使常规封锁方案失效。鉴于其高死亡率与不可预测的雾区漂移，IMAC 协调办公室已将其列为「优先级-贝塔」观察对象，并协调长桥会社与东部铁路网设立联合监测机制。任何组织在采取行动前必须提交完整方案并获得 IMAC 审批。未经授权的私自进入将被视为严重违规。",
      suggestedActions: ["在东部铁路网重点区段布设雾区预警装置，记录雾区出现规律与漂移轨迹，绘制雾区热力图", "由长桥会社牵头组织「第6节安全车厢」专项侦察，验证安全车厢假说并测绘车厢内部结构", "与北境守望联合制定极寒区段应对预案——该区段雾区出现频率近期明显上升"],
      internalNode: /*#__PURE__*/React.createElement(Restricted, {
        level: "internal",
        label: "\u673A\u5BC6\u7EA7\u5185\u5BB9",
        compact: true
      }, /*#__PURE__*/React.createElement("div", {
        className: "internal-note"
      }, /*#__PURE__*/React.createElement("p", {
        className: "internal-note-text"
      }, "\u3010\u957F\u6865\u4F1A\u793E\u5185\u90E8\u8BC4\u4F30 \xB7 \u79FB\u52A8\u6307\u6325\u7CFB\u7EDF\u3011", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u96FE\u4E2D\u5217\u8F66\u662F\u6211\u4EEC\u9047\u5230\u7684\u6700\u68D8\u624B\u7684\u300C\u4F1A\u8DD1\u300D\u7684\u5F02\u5E38\u2014\u2014\u5B83\u7684\u8F7D\u4F53\u662F\u79FB\u52A8\u7684\uFF0C\u4EFB\u4F55\u56FA\u5B9A\u5C01\u9501\u65B9\u6848\u90FD\u65E0\u6548\u3002 \u6211\u4EEC\u5224\u65AD\u5FAA\u73AF\u51FA\u53E3\u4E0E\u5217\u8F66\u957F\u7684\u6000\u8868\u5B58\u5728\u5173\u8054\uFF1A\u5206\u9488\u6BCF\u6B21\u5FAA\u73AF\u504F\u79FB1\u5206\u949F\uFF0C\u5F53\u504F\u79FB\u7D2F\u79EF\u523060\u5206\u949F\u65F6\uFF0C \u53EF\u80FD\u51FA\u73B0\u5B8C\u6574\u7684\u300C\u7B2C48\u5C0F\u65F6\u300D\u51FA\u53E3\u5FAA\u73AF\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u5EFA\u8BAE\u4E0B\u4E00\u6B21\u884C\u52A8\u805A\u7126\u7B2C6\u8282\u5B89\u5168\u8F66\u53A2\u4E0E\u5217\u8F66\u957F\u6000\u8868\uFF0C\u884C\u52A8\u98CE\u9669\u8BC4\u7EA7\u4E3A\u5384\u8FD0\u7EA7\uFF0C \u7531\u73B0\u4EFB\u603B\u534F\u8C03\u5B98\u6865\u672C\u5F7B\u5E26\u961F\u6267\u884C\uFF0C\u884C\u52A8\u4EE3\u53F7\u300C\u7968\u6839\u300D\u3002"), /*#__PURE__*/React.createElement("div", {
        className: "internal-note-signature"
      }, "\u2014 \u6865\u672C\u5F7B \xB7 \u957F\u6865\u4F1A\u793E\u73B0\u4EFB\u603B\u534F\u8C03\u5B98")))
    };
    return /*#__PURE__*/React.createElement(AnomalyDossier, {
      data: trainData
    });
  }
  if (isOutpost) {
    const outpostMap = /*#__PURE__*/React.createElement("div", {
      className: "stair-map"
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 340 170",
      width: "100%",
      style: {
        display: "block"
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: "20",
      y: "15",
      width: "300",
      height: "120",
      fill: "rgba(138,180,212,0.05)",
      stroke: "rgba(138,180,212,0.35)",
      strokeWidth: "1",
      strokeDasharray: "4 3"
    }), /*#__PURE__*/React.createElement("text", {
      x: "28",
      y: "30",
      fill: "rgba(138,180,212,0.7)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u65F6\u95F4\u51BB\u7ED3\u8303\u56F4 \xB7 \u7EA6600\u33A1"), /*#__PURE__*/React.createElement("rect", {
      x: "50",
      y: "45",
      width: "240",
      height: "70",
      fill: "rgba(20,20,24,0.9)",
      stroke: "rgba(74,88,104,0.6)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "110",
      y1: "45",
      x2: "110",
      y2: "115",
      stroke: "rgba(74,88,104,0.5)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "180",
      y1: "45",
      x2: "180",
      y2: "115",
      stroke: "rgba(74,88,104,0.5)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "250",
      y1: "45",
      x2: "250",
      y2: "115",
      stroke: "rgba(74,88,104,0.5)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: "65",
      y: "72",
      fill: "rgba(168,168,180,0.7)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u5BBF\u820D"), /*#__PURE__*/React.createElement("text", {
      x: "122",
      y: "72",
      fill: "rgba(168,168,180,0.7)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u503C\u73ED\u5BA4"), /*#__PURE__*/React.createElement("text", {
      x: "192",
      y: "72",
      fill: "rgba(168,168,180,0.7)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u4ED3\u5E93"), /*#__PURE__*/React.createElement("text", {
      x: "258",
      y: "72",
      fill: "rgba(168,168,180,0.7)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u9505\u7089\u623F"), /*#__PURE__*/React.createElement("rect", {
      x: "120",
      y: "120",
      width: "40",
      height: "12",
      fill: "rgba(196,40,40,0.15)",
      stroke: "rgba(196,40,40,0.5)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: "110",
      y: "145",
      fill: "rgba(196,40,40,0.85)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u5730\u4E0B\u5BA4 \xB7 \u6838\u5FC3\u949F"), /*#__PURE__*/React.createElement("circle", {
      cx: "140",
      cy: "126",
      r: "4",
      fill: "none",
      stroke: "rgba(196,154,44,0.9)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "140",
      y1: "126",
      x2: "140",
      y2: "123.5",
      stroke: "rgba(196,154,44,0.9)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: "240",
      y: "140",
      fill: "rgba(74,154,44,0.85)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u574D\u7F29\u70B9 \xB7 \u5DF2\u89E3\u9664")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--text-tertiary)",
        marginTop: "10px",
        textAlign: "center",
        letterSpacing: "0.08em"
      }
    }, "\u6838\u5FC3\u951A\u70B9\uFF1A\u5730\u4E0B\u5BA4\u673A\u68B0\u949F\uFF08\u505C\u6446 23:47\uFF09\xB7 \u62E8\u52A8\u949F\u6446\u540E\u5F02\u5E38\u574D\u7F29 \xB7 \u73B0\u4E3A\u5C01\u5B58\u76D1\u6D4B\u72B6\u6001"));
    const outpostData = {
      id: "TMB-0117",
      name: "冰封哨站",
      nameEn: "FROZEN OUTPOST · HAZARDOUS",
      stamp: "机密 · CONFIDENTIAL",
      classification: "CONFIDENTIAL",
      ver: "39.0",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      survivalRate: 31,
      info: [["异常编号", /*#__PURE__*/React.createElement("span", {
        className: "detail-file-id",
        style: {
          fontSize: "18px"
        }
      }, "TMB-0117"), "名称", "冰封哨站 · Frozen Outpost"], ["所属管辖", "北境守望 · Northwatch", "首次记录", "安珀历15年 · 冬"], ["异常等级", {
        levelKey: "hazardous",
        text: "危险级 · HAZARDOUS"
      }, "当前状态", {
        statusKey: "resolved",
        text: "● 已解决 · 坍缩 RESOLVED"
      }], ["生还率", [/*#__PURE__*/React.createElement("span", {
        className: "survival-rate-red",
        key: "s"
      }, "\u7EA6 31%"), "（55人进入，38人死亡）"], "信息价值", "高（时间停滞解除案例研究价值高）"], ["档案更新", "安珀历39年 · 春", "处置状态", "已坍缩 · 现场封存监测"]],
      discovery: ["安珀历15年冬，白松城以北冻土区的一支勘探队在测绘旧边境设施时发现废弃哨站（安珀历9年因极寒撤离）内部一切「冻结」：钟表停走、炉火不燃、墙上的值班日志保持翻开状态，连炉灰都悬浮在半空。勘探队撤离后立即上报，北境守望接管调查并确认哨站主体建筑陷入时间停滞。", "异常范围始终局限在哨站主体建筑（约600平方米）内，未向冻土区扩散。安珀历21年，北境守望在第四批行动中成功使异常坍缩，哨站时间恢复流动，异常被判定为已解决。"],
      features: ["冰封哨站是一处典型的<strong>时间停滞型异常</strong>。异常覆盖哨站主体建筑，内部所有非生命体的时间完全静止——钟表停走、火焰凝固、液体冻结，连空气中的尘埃都悬浮不动。", "进入者的时间不受影响，但无法改变任何冻结物体；食物、饮水、工具等外部物品带入哨站后同样被「冻结」。异常核心位于地下室的机械钟，钟摆停摆于安珀历9年冬·23:47。", "安珀历21年，北境守望第四批行动通过使核心钟摆恢复摆动，异常整体坍缩。坍缩后哨站时间恢复流动，残留的冻结痕迹随坍缩消散，现场被封存监测。"],
      mapNode: outpostMap,
      mapTag: "结构示意 · DIAGRAM",
      verifiedRules: [{
        num: "一",
        title: "时间冻结",
        desc: "哨站内所有非生命体的时间完全静止；进入者时间正常流动，但无法与冻结物体产生任何物理交互。"
      }, {
        num: "二",
        title: "冻结不可逆（行动中）",
        desc: "进入者尝试破坏、移动或加热冻结物品时，会遭遇「反向冻结」——身体局部开始失去知觉，触碰部位最先冻结。该效应在撤离冻结区域后自行消退。"
      }, {
        num: "三",
        title: "核心锚点",
        desc: "地下室机械钟为异常核心，钟摆停摆时刻（安珀历9年冬·23:47）与哨站废弃时间完全一致。异常范围与核心钟的「可听范围」基本重合。"
      }, {
        num: "四",
        title: "解冻条件",
        desc: "使核心钟摆重新摆动（拨动指针或重新上弦）后，异常整体坍缩，时间恢复流动。安珀历21年第四批行动验证了该条件。"
      }],
      entryRecords: [{
        term: "第一批",
        year: "安珀历15年·冬",
        count: 12,
        org: "北境守望",
        result: "4人生还，8人死亡",
        status: "death"
      }, {
        term: "第二批",
        year: "安珀历16年",
        count: 14,
        org: "北境守望",
        result: "5人生还，9人死亡",
        status: "death"
      }, {
        term: "第三批",
        year: "安珀历18年",
        count: 15,
        org: "北境守望",
        result: "4人生还，11人死亡",
        status: "death"
      }, {
        term: "第四批",
        year: "安珀历21年",
        count: 14,
        org: "北境守望",
        result: "4人生还，10人死亡 · 成功解除",
        status: "death"
      }],
      phenomena: ["<strong>「值班日志」末行：</strong>地下室值班日志的最后一页写着「冬·23:47 钟停了，我们走不出去」——与核心钟停摆时刻一致，疑似哨站撤离时的最后记录。", "<strong>冻结残留：</strong>坍缩后，哨站墙面上留有疑似「时间冻结时的空气划痕」，分析显示为异常内部最后的物理痕迹，已采样封存。", "<strong>同型前兆监测：</strong>坍缩后，白松城周边两处废弃设施出现「钟表集体停走」前兆，是否发展为同类异常正在监测中。"],
      imacNote: "冰封哨站是时间停滞型异常的首个成功解除案例，其「核心锚点-解冻」机制为同类异常提供了完整处置范式。鉴于异常已坍缩，IMAC 已将其列为「已解决·样本封存」档案，现场保留供研究。任何组织如需重新进入现场进行研究，须获得 IMAC 及北境守望联合许可。未经授权的私自进入将被视为严重违规。",
      suggestedActions: ["维护坍缩后现场并封存关键物证（核心钟残件、值班日志、冻结划痕样本）", "整理第四批行动完整记录，形成时间停滞型异常处置标准流程并纳入训练教材", "持续监测白松城周边废弃设施，排查同型异常前兆，建立常驻监测哨"],
      internalNode: /*#__PURE__*/React.createElement(Restricted, {
        level: "internal",
        label: "\u673A\u5BC6\u7EA7\u5185\u5BB9",
        compact: true
      }, /*#__PURE__*/React.createElement("div", {
        className: "internal-note"
      }, /*#__PURE__*/React.createElement("p", {
        className: "internal-note-text"
      }, "\u3010\u5317\u5883\u5B88\u671B\u5185\u90E8\u8BC4\u4F30 \xB7 \u51BB\u571F\u63A2\u7D22\u8425\u961F\u957F \u97E9\u51DB\u3011", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u51B0\u5C01\u54E8\u7AD9\u8FD9\u4E00\u4ED7\uFF0C\u6211\u4EEC\u6253\u5F97\u4E0D\u6F02\u4EAE\uFF0C\u4F46\u6253\u660E\u767D\u4E86\u2014\u2014\u56DB\u6279\uFF0C55\u4E2A\u4EBA\u8FDB\u53BB\uFF0C38\u4E2A\u4EBA\u6CA1\u80FD\u51FA\u6765\uFF0C\u4EE3\u4EF7\u592A\u91CD\u4E86\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u4F46\u7B2C\u56DB\u6279\u884C\u52A8\u8BC1\u660E\u4E86\u4E00\u4EF6\u4E8B\uFF1A\u65F6\u95F4\u505C\u6EDE\u578B\u5F02\u5E38\u7684\u6838\u5FC3\u951A\u70B9\u662F\u53EF\u4EE5\u88AB\u300C\u8BF4\u670D\u300D\u7684\u3002\u62E8\u52A8\u949F\u6446\u7684\u529B\u6C14\u8C01\u90FD\u6709\uFF0C\u96BE\u7684\u662F\u5728\u96F6\u4E0B\u56DB\u5341\u5EA6\u7684\u51BB\u7ED3\u73AF\u5883\u91CC\u8FD8\u80FD\u4FDD\u6301\u6E05\u9192\u3001\u505A\u51FA\u51B3\u5B9A\u3002\u8FD9\u662F\u51BB\u571F\u533A\u6559\u7ED9\u6211\u4EEC\u7684\u9053\u7406\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u5904\u7F6E\u4E0A\uFF0C\u6D41\u7A0B\u5DF2\u7ECF\u5199\u8FDB\u6559\u6750\uFF0C\u767D\u677E\u57CE\u5468\u8FB9\u7684\u5E38\u9A7B\u76D1\u6D4B\u54E8\u4E5F\u7ACB\u8D77\u6765\u4E86\u2014\u2014\u300C\u949F\u8868\u96C6\u4F53\u505C\u8D70\u300D\u7684\u524D\u5146\u6211\u4EEC\u76EF\u5F97\u6BD4\u8C01\u90FD\u7D27\u3002\u4E0B\u4E00\u6B21\u518D\u51FA\u73B0\uFF0C\u6211\u4EEC\u8981\u6BD4\u8FD9\u6B21\u66F4\u5FEB\uFF0C38\u6761\u547D\u4E0D\u80FD\u767D\u642D\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u6700\u540E\u8BF4\u53E5\u638F\u5FC3\u7A9D\u7684\u8BDD\uFF1A\u88C5\u5907\u4F1A\u5931\u6548\uFF0C\u706B\u529B\u4F1A\u8017\u5C3D\uFF0C\u4F46\u4EBA\u53EA\u8981\u8FD8\u8BB0\u5F97\u81EA\u5DF1\u4E3A\u4EC0\u4E48\u7AD9\u5728\u90A3\u513F\uFF0C\u5C31\u8FD8\u80FD\u628A\u949F\u6446\u62E8\u56DE\u53BB\u3002\u8FD9\u662F\u6211\u5728\u8FD9\u7247\u51BB\u571F\u4E0A\u5B66\u5230\u7684\u6700\u786C\u7684\u4E00\u6761\u3002"), /*#__PURE__*/React.createElement("div", {
        className: "internal-note-signature"
      }, "\u2014 \u97E9\u51DB \xB7 \u5317\u5883\u5B88\u671B\u51BB\u571F\u63A2\u7D22\u8425\u961F\u957F")))
    };
    return /*#__PURE__*/React.createElement(AnomalyDossier, {
      data: outpostData
    });
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
      info: [["异常编号", /*#__PURE__*/React.createElement("span", {
        className: "detail-file-id",
        style: {
          fontSize: "18px"
        }
      }, "PHA-0001"), "名称", "空白地带 · The Void"], ["所属管辖", "IMAC 直辖 · IMAC DIRECT", "首次记录", "安珀历元年 · 灰港事件后"], ["异常等级", {
        levelKey: "unknown",
        text: "未知级 · UNKNOWN"
      }, "当前状态", {
        statusKey: "quarantined",
        text: "● 隔离中 QUARANTINED"
      }], ["生还率", /*#__PURE__*/React.createElement("span", {
        className: "survival-rate-red"
      }, "\u2014"), "信息价值", "极高（未知级现象，信息极度匮乏，任何样本价值不可估量）"], ["档案更新", "安珀历39年 · 春", "处置状态", "全封闭隔离 · 禁止任何接触"]],
      discovery: ["安珀历元年灰港事件之后，多国勘测队在极北冰原的某处坐标附近发现一片「什么都没有」的区域——范围内重力、电磁、时间读数全部失效，进入该区域的一切物质均失去信号。最早的两份勘察记录因设备失灵仅保留残缺片段。", "此后该区域由 IMAC 直辖封闭隔离。所有关于空白地带的直接观测记录均已归档为最高机密，公开档案中仅保留本条目与极少数间接信息。"],
      features: ["空白地带是目前唯一被评定为「未知级」的异常。其本质、范围、边界运动规律均未被确认——已知信息仅来自两次勘察的残缺记录与外围间接观测，信息总量低于任何已归档的深渊级异常。", "外围观测确认：空白地带边界内不存在任何可探测的物理信号；接触边界的物质会「消失」，消失方向未知。唯一返回的勘察人员出现了完全的记忆空白。"],
      speculatedRules: ["空白地带内物理法则完全失效：重力、电磁、时间均无可测读数", "接触空白地带的物质会「消失」——消失方向未知，无返回记录", "空白地带边界疑似在缓慢扩张（两次勘测的外围标记间距存在微小差异，但精度不足以确认）", "唯一返回者的记忆空白暗示认知层面同样被「抹除」"],
      entryRecords: [{
        term: "首次接触",
        year: "安珀历元年 · 灰港事件后",
        count: 0,
        org: "IMAC 直属勘察队",
        result: "人数未知 · 全员失踪，无返回记录",
        status: "death"
      }, {
        term: "第二次勘察",
        year: "安珀历4年",
        count: 3,
        org: "IMAC 直属",
        result: "2人失踪 · 1人返回后记忆空白",
        status: "death"
      }],
      phenomena: ["<strong>「消失的物质」：</strong>外围投放的测试物（金属块、信标、记录器）接触边界后信号消失，无任何残留，无返回记录。", "<strong>记忆空白：</strong>唯一返回者在返回后无法回忆起勘察期间的任何内容，且其随身记录设备内数据完全为空。"],
      imacNote: "空白地带是 IMAC 档案中信息最有限的异常条目。鉴于其完全未知的性质与「物质消失」特性，IMAC 协调办公室已将其列为最高隔离等级（全封闭 · 禁止接触）。任何关于空白地带的调查申请均须提交理事会单独审批。未经授权的一切接近行为将被视为最高等级违规。",
      suggestedActions: ["维持现有全封闭隔离，不主动接触或投放测试物（历年投放均无有效数据返回）", "以外围遥感手段持续记录边界变化，积累长期监测数据", "评估灰港事件档案的关联性——空白地带是否为异常初现时的残留影响"],
      internalNode: /*#__PURE__*/React.createElement(Restricted, {
        level: "topsecret",
        label: "\u7EDD\u5BC6\u7EA7\u5185\u5BB9",
        compact: true
      }, /*#__PURE__*/React.createElement("div", {
        className: "internal-note"
      }, /*#__PURE__*/React.createElement("p", {
        className: "internal-note-text"
      }, "\u3010IMAC \u534F\u8C03\u529E\u516C\u5BA4\u8BC4\u4F30 \xB7 \u5F02\u5E38\u4FE1\u606F\u7BA1\u7406\u59D4\u5458\u4F1A\u3011", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u5BF9\u672A\u77E5\u7EA7\u5F02\u5E38\u7684\u4FE1\u606F\u7BA1\u7406\u539F\u5219\uFF1A\u5728\u65E0\u6CD5\u786E\u8BA4\u6027\u8D28\u524D\uFF0C\u4E0D\u63A8\u6D4B\u3001\u4E0D\u516C\u5F00\u3001\u4E0D\u63A5\u89E6\u3002 \u7A7A\u767D\u5730\u5E26\u7684\u6240\u6709\u5DF2\u77E5\u4FE1\u606F\u5DF2\u5C01\u5B58\uFF0C\u5176\u5B58\u5728\u672C\u8EAB\u5373\u4E3A\u6700\u9AD8\u673A\u5BC6\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u672C\u6863\u6848\u5185\u5BB9\u5C06\u5728\u83B7\u5F97\u65B0\u7684\u6709\u6548\u89C2\u6D4B\u6570\u636E\u540E\u66F4\u65B0\u2014\u2014\u4F46\u76EE\u524D\u6CA1\u6709\u4EFB\u4F55\u5DF2\u77E5\u624B\u6BB5\u80FD\u591F\u83B7\u5F97\u8BE5\u6570\u636E\u3002 \u7EF4\u6301\u73B0\u72B6\uFF0C\u5C31\u662F\u76EE\u524D\u6700\u7A33\u59A5\u7684\u884C\u52A8\u3002"), /*#__PURE__*/React.createElement("div", {
        className: "internal-note-signature"
      }, "\u2014 IMAC \u7406\u4E8B\u4F1A \xB7 \u5F02\u5E38\u4FE1\u606F\u7BA1\u7406\u59D4\u5458\u4F1A")))
    };
    return /*#__PURE__*/React.createElement(AnomalyDossier, {
      data: voidData
    });
  }
  if (isLoop) {
    const loopMap = /*#__PURE__*/React.createElement("div", {
      className: "stair-map"
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 340 170",
      width: "100%",
      style: {
        display: "block"
      }
    }, /*#__PURE__*/React.createElement("line", {
      x1: "30",
      y1: "90",
      x2: "310",
      y2: "90",
      stroke: "rgba(74,88,104,0.6)",
      strokeWidth: "4"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "30",
      y1: "87",
      x2: "310",
      y2: "87",
      stroke: "rgba(196,40,40,0.4)",
      strokeWidth: "0.8",
      strokeDasharray: "6 4"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "120",
      y: "78",
      width: "50",
      height: "24",
      fill: "rgba(74,88,104,0.2)",
      stroke: "rgba(138,180,212,0.5)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: "128",
      y: "94",
      fill: "rgba(138,180,212,0.8)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u6865"), /*#__PURE__*/React.createElement("line", {
      x1: "230",
      y1: "90",
      x2: "230",
      y2: "70",
      stroke: "rgba(196,154,44,0.8)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "230",
      y1: "75",
      x2: "222",
      y2: "66",
      stroke: "rgba(196,154,44,0.8)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "230",
      y1: "75",
      x2: "238",
      y2: "66",
      stroke: "rgba(196,154,44,0.8)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: "220",
      y: "64",
      fill: "rgba(196,154,44,0.85)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u67AF\u6811\uFF08\u951A\u70B9\uFF09"), /*#__PURE__*/React.createElement("rect", {
      x: "110",
      y: "50",
      width: "150",
      height: "60",
      fill: "none",
      stroke: "rgba(196,40,40,0.4)",
      strokeWidth: "1",
      strokeDasharray: "4 3"
    }), /*#__PURE__*/React.createElement("text", {
      x: "120",
      y: "46",
      fill: "rgba(196,40,40,0.7)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u5FAA\u73AF\u533A\u95F4 \xB7 \u7EA6200m"), /*#__PURE__*/React.createElement("path", {
      d: "M185 112 C 175 128, 165 128, 155 112",
      fill: "none",
      stroke: "rgba(196,154,44,0.8)",
      strokeWidth: "1.5",
      strokeDasharray: "4 3",
      markerEnd: "url(#loopArrow)"
    }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
      id: "loopArrow",
      markerWidth: "6",
      markerHeight: "6",
      refX: "5",
      refY: "3",
      orient: "auto"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0,0 L6,3 L0,6 Z",
      fill: "rgba(196,154,44,0.9)"
    }))), /*#__PURE__*/React.createElement("text", {
      x: "150",
      y: "130",
      fill: "rgba(196,154,44,0.8)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u8F66\u8F86\u5FAA\u73AF \xB7 \u5F92\u6B65\u8C41\u514D"), /*#__PURE__*/React.createElement("text", {
      x: "250",
      y: "140",
      fill: "rgba(74,154,44,0.85)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u5DF2\u574D\u7F29 \xB7 \u6062\u590D\u6B63\u5E38\u901A\u884C")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--text-tertiary)",
        marginTop: "10px",
        textAlign: "center",
        letterSpacing: "0.08em"
      }
    }, "\u5FAA\u73AF\u4EC5\u5BF9\u884C\u9A76\u4E2D\u7684\u8F66\u8F86\u751F\u6548 \xB7 \u951A\u70B9\u4E3A\u67AF\u6811 \xB7 72\u5C0F\u65F6\u5185\u5B8C\u6210\u5904\u7F6E\u5E76\u574D\u7F29"));
    const loopData = {
      id: "SPA-0421",
      name: "灰松岭循环路段",
      nameEn: "HUISONG RIDGE LOOP · ORDINARY",
      stamp: "公开 · PUBLIC",
      classification: "PUBLIC",
      ver: "38.4",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      survivalRate: 100,
      info: [["异常编号", /*#__PURE__*/React.createElement("span", {
        className: "detail-file-id",
        style: {
          fontSize: "18px"
        }
      }, "SPA-0421"), "名称", "灰松岭循环路段 · Huisong Ridge Loop"], ["所属管辖", "北境守望 · Northwatch", "首次记录", "安珀历38年 · 冬"], ["异常等级", {
        levelKey: "ordinary",
        text: "常规级 · ORDINARY"
      }, "当前状态", {
        statusKey: "resolved",
        text: "● 已解决 · 坍缩 RESOLVED"
      }], ["生还率", [/*#__PURE__*/React.createElement("span", {
        key: "s",
        style: {
          color: "var(--level-ordinary)"
        }
      }, "100%"), "（7人进入，0人死亡）"], "信息价值", "中"], ["档案更新", "安珀历39年 · 春", "处置状态", "已坍缩 · 路段恢复正常通行"]],
      discovery: ["安珀历38年冬，灰松岭山区的伐木工人发现公路上一段约两百米的路段出现异常：车辆驶入后会反复经过同一座桥和同一棵枯树，无法驶出。工人徒步通过该路段时未受影响，于发现十日后通过异常热线上报。", "北境守望派出四名溯界者进入异常区域，经过七十二小时的规则解析与内部干预，于次日清晨七时三十分确认异常已「坍缩」。所有受影响路段恢复正常通行，周边三公里内居民已提前疏散，无人员伤亡。"],
      features: ["灰松岭循环路段是一处典型的<strong>空间循环型异常</strong>（常规级）。异常表现为山区公路上一段约两百米的循环区间：车辆驶入后反复经过同一座桥与同一棵枯树，无法驶出；而徒步行人不受影响。", "异常于安珀历38年冬被发现，北境守望在七十二小时内完成规则解析并使其坍缩。本次行动顺利的关键在于当地居民的及时上报——异常发现的越早，处理难度越低。"],
      mapNode: loopMap,
      mapTag: "结构示意 · DIAGRAM",
      verifiedRules: [{
        num: "一",
        title: "循环区间",
        desc: "公路约200米路段内空间循环：车辆驶入后反复经过同一座桥与同一棵枯树，无法驶出，直至异常被解除。"
      }, {
        num: "二",
        title: "载具触发",
        desc: "循环仅对「行驶中的车辆」生效；徒步行人通过不受影响（发现异常的伐木工人徒步往返正常）。"
      }],
      entryRecords: [{
        term: "被困车辆",
        year: "安珀历38年·冬",
        count: 3,
        org: "北境守望救援",
        result: "2车3人 · 全员获救",
        status: "safe"
      }, {
        term: "处置行动",
        year: "安珀历38年·冬",
        count: 4,
        org: "北境守望",
        result: "全员安全返回 · 异常坍缩",
        status: "safe"
      }],
      phenomena: ["<strong>「坍缩条件」：</strong>在循环锚点（枯树）处完成规则干预后，异常整体坍缩，路段恢复正常通行，现场无异常残留——坍缩不是「被破坏」，而是规则被满足后异常自行闭合。", "<strong>「桥与枯树」参照物：</strong>循环中车辆唯一可识别的参照物为同一座桥与同一棵枯树；坍缩后两者均无异常残留，枯树为本次处置的规则锚点。", "<strong>徒步豁免：</strong>循环仅作用于载具而不作用于行人——此类「选择性触发」在常规级空间异常中较为少见，可能与异常以「道路使用方式」为规则基础有关。"]
    };
    return /*#__PURE__*/React.createElement(AnomalyDossier, {
      data: loopData
    });
  }
  if (isShortcut) {
    const shortcutMap = /*#__PURE__*/React.createElement("div", {
      className: "stair-map"
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 340 170",
      width: "100%",
      style: {
        display: "block"
      }
    }, /*#__PURE__*/React.createElement("line", {
      x1: "20",
      y1: "138",
      x2: "320",
      y2: "138",
      stroke: "rgba(74,88,104,0.45)",
      strokeWidth: "3"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "20",
      y1: "135",
      x2: "320",
      y2: "135",
      stroke: "rgba(196,40,40,0.35)",
      strokeWidth: "0.8",
      strokeDasharray: "6 4"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "28",
      y: "94",
      width: "52",
      height: "44",
      fill: "rgba(20,20,24,0.9)",
      stroke: "rgba(63,184,164,0.9)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: "38",
      y: "112",
      fill: "rgba(63,184,164,1)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u5357\u7AD9\u95E8"), /*#__PURE__*/React.createElement("text", {
      x: "44",
      y: "126",
      fill: "rgba(168,168,180,0.7)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u5165\u53E3"), /*#__PURE__*/React.createElement("rect", {
      x: "260",
      y: "94",
      width: "52",
      height: "44",
      fill: "rgba(20,20,24,0.9)",
      stroke: "rgba(63,184,164,0.9)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: "262",
      y: "112",
      fill: "rgba(63,184,164,1)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u4F1A\u5C55\u4E2D\u5FC3\u95E8"), /*#__PURE__*/React.createElement("text", {
      x: "272",
      y: "126",
      fill: "rgba(168,168,180,0.7)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u51FA\u53E3"), /*#__PURE__*/React.createElement("path", {
      d: "M84 116 Q 170 26 256 116",
      fill: "none",
      stroke: "rgba(63,184,164,0.5)",
      strokeWidth: "1.2",
      strokeDasharray: "5 3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M84 130 Q 170 40 256 130",
      fill: "none",
      stroke: "rgba(63,184,164,0.7)",
      strokeWidth: "1.4",
      strokeDasharray: "5 3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M84 144 Q 170 54 256 144",
      fill: "none",
      stroke: "rgba(63,184,164,0.5)",
      strokeWidth: "1.2",
      strokeDasharray: "5 3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "170",
      cy: "130",
      r: "3.5",
      fill: "rgba(63,184,164,0.9)"
    }), /*#__PURE__*/React.createElement("text", {
      x: "128",
      y: "76",
      fill: "rgba(63,184,164,0.85)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u7A7A\u95F4\u6298\u53E0 \xB7 28\u516C\u91CC"), /*#__PURE__*/React.createElement("text", {
      x: "142",
      y: "88",
      fill: "rgba(168,168,180,0.65)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u7A7F\u884C\u7EA63\u79D2"), /*#__PURE__*/React.createElement("rect", {
      x: "148",
      y: "106",
      width: "44",
      height: "12",
      fill: "rgba(74,88,104,0.25)",
      stroke: "rgba(138,180,212,0.6)",
      strokeWidth: "0.8"
    }), /*#__PURE__*/React.createElement("text", {
      x: "152",
      y: "115",
      fill: "rgba(138,180,212,0.85)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u901A\u52E4\u5361"), /*#__PURE__*/React.createElement("text", {
      x: "66",
      y: "160",
      fill: "rgba(138,180,212,0.75)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "30\u79D2\u95F4\u9694"), /*#__PURE__*/React.createElement("text", {
      x: "224",
      y: "160",
      fill: "rgba(196,154,44,0.75)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u6BCF\u5E74\u79CB\u5206 \xB7 \u505C\u8FD0\u6821\u51C6")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--text-tertiary)",
        marginTop: "10px",
        textAlign: "center",
        letterSpacing: "0.08em"
      }
    }, "\u53CC\u95E8\u4E00\u4E00\u5BF9\u5E94 \xB7 \u7A7A\u95F4\u6298\u53E0\u8FDE\u63A5 \xB7 \u51ED\u901A\u52E4\u5361\u7A7F\u884C \xB7 \u6BCF\u5E74\u79CB\u5206\u505C\u8FD0\u6821\u51C6"));
    const shortcutData = {
      id: "SPA-2088",
      name: "捷径门",
      nameEn: "SHORTCUT GATE · SAFE",
      stamp: "公开 · PUBLIC",
      classification: "PUBLIC",
      ver: "13.7",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      survivalRate: 100,
      info: [["异常编号", /*#__PURE__*/React.createElement("span", {
        className: "detail-file-id",
        style: {
          fontSize: "18px"
        }
      }, "SPA-2088"), "名称", "捷径门 · Shortcut Gate"], ["所属管辖", "衔尾蛇事务所 · 民用异常应用处", "首次记录", "安珀历26年 · 鸣海城"], ["异常等级", {
        levelKey: "ordinary",
        text: "常规级 · ORDINARY"
      }, "当前状态", {
        statusKey: "safe",
        text: "● 安全 SAFE"
      }], ["生还率", [/*#__PURE__*/React.createElement("span", {
        key: "s",
        style: {
          color: "var(--level-ordinary)"
        }
      }, "100%"), "（应用13年 · 零事故）"], "信息价值", "民用应用示范样本"], ["档案更新", "安珀历39年 · 春", "处置状态", "民用应用 · 持续运营中"]],
      discovery: ["安珀历26年春，鸣海城地铁三号线「南站—会展中心」区间施工时，盾构机在地下一处废弃管道内掘出一对「对门」：两扇相距二十八公里、造型相同的旧式铁门，分别嵌在管道两侧的岩壁里。工人推开其中一扇，竟从另一扇门里走了出来——施工日志记录了这一过程，全程不到三秒。", "衔尾蛇事务所在接到异常热线上报后接管现场，对两扇门进行了为期六个月的结构性研究，确认这是一处规则稳定、可重复触发的空间折叠型异常。经 IMAC 民用异常应用委员会评估，于安珀历27年正式立项为「捷径门」民用应用项目。"],
      features: ["捷径门是一对<strong>规则稳定的空间折叠通道</strong>（常规级）：两扇门之间以空间折叠连接，通过者从一扇门进入、另一扇门走出，实际位移二十八公里，全程缩短为约三秒的「穿行」。", "经过十余年持续运营，捷径门已被纳入鸣海城公共交通体系，由衔尾蛇事务所民用异常应用处管理，与地铁运营系统联动调度，每年秋分日停运十二小时进行规则校准。", "运营采用「刷卡单行」模式：乘客在入口侧闸机刷「通勤卡」后依次穿行，出口侧自动放行；门体前后均设有引导员与紧急制动开关，突发情况下可一键切断穿行连接（该功能从未被实际触发）。"],
      mapNode: shortcutMap,
      mapTag: "结构示意 · DIAGRAM",
      verifiedRules: [{
        num: "一",
        title: "双向唯一",
        desc: "两扇门严格一一对应：进入任意一扇，只能从另一扇走出，不存在第三出口。穿行方向不限。"
      }, {
        num: "二",
        title: "单人限重",
        desc: "每次仅允许一人穿行，随身物品总重不得超过20公斤；两批乘客之间须保持至少30秒间隔，避免穿行重叠。"
      }, {
        num: "三",
        title: "凭证通行",
        desc: "仅限持「通勤卡」的登记乘客使用，卡片与本人绑定、不可转借；未持卡者接近门体不会触发穿行，只会被引导离开。"
      }, {
        num: "四",
        title: "年度校准",
        desc: "每年秋分日停运十二小时进行规则校准。校准期间两扇门失去连接，任何穿行尝试均无效。"
      }],
      recordsTitle: "应用记录",
      entryRecords: [{
        term: "首次接触",
        year: "安珀历26年·春",
        count: "-",
        org: "鸣海城地铁施工队",
        result: "施工误入 · 全员安全返回",
        status: "safe"
      }, {
        term: "结构研究",
        year: "安珀历26年·夏",
        count: "-",
        org: "衔尾蛇事务所",
        result: "规则完全解析 · 评定安全",
        status: "safe"
      }, {
        term: "民用应用",
        year: "安珀历27年·至今",
        count: "-",
        org: "鸣海城交通局/衔尾蛇",
        result: "已转入民用应用 · 持续运营（详见基本特征）",
        status: "safe"
      }],
      phenomena: ["<strong>「穿行感知」：</strong>绝大多数通过者报告穿行全程「几乎没有任何感觉」，仅有一瞬被轻轻「拉了一下」的体感，随后已站在另一扇门前。少数人（约2%）报告在穿行瞬间看到一闪而过的灰色走廊，方向与行走方向相反。", "<strong>「双门温差」：</strong>长期监测发现，两扇门之间的温差恒定为1.7℃（南站侧恒高于会展中心侧），与季节无关，疑似为折叠通道内的能量残余。温差读数在校准期间归零。", "<strong>「秋分鸣响」：</strong>每年校准开始与结束时，两扇门会同步发出一声极低频的「嗡鸣」（约55Hz，持续三秒）。校准期间门体失去连接，嗡鸣之后连接恢复如初——该现象被运营人员称为「门在翻身」；其机制未被解析，但历年校准均无异常记录。"]
    };
    return /*#__PURE__*/React.createElement(AnomalyDossier, {
      data: shortcutData
    });
  }
  if (isSlumber) {
    const slumberData = {
      id: "OBA-0148",
      name: "安眠枕",
      nameEn: "SLUMBER PILLOW · SAFE",
      stamp: "公开 · PUBLIC",
      classification: "PUBLIC",
      ver: "21.3",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      survivalRate: 100,
      info: [["异常编号", /*#__PURE__*/React.createElement("span", {
        className: "detail-file-id",
        style: {
          fontSize: "18px"
        }
      }, "OBA-0148"), "名称", "安眠枕 · Slumber Pillow"], ["所属管辖", "晨星团 · 民用物品应用科", "首次记录", "安珀历24年 · 白松城"], ["异常等级", {
        levelKey: "ordinary",
        text: "常规级 · ORDINARY"
      }, "当前状态", {
        statusKey: "safe",
        text: "● 安全 SAFE"
      }], ["生还率", [/*#__PURE__*/React.createElement("span", {
        key: "s",
        style: {
          color: "var(--level-ordinary)"
        }
      }, "100%"), "（应用15年 · 零事故）"], "信息价值", "民用应用示范样本"], ["档案更新", "安珀历39年 · 春", "处置状态", "民用应用 · 处方限量发放"]],
      discovery: ["安珀历24年秋，白松城一名长期失眠的纺织厂女工向晨星团设立的社区异常咨询点求助：她家中一只旧枕头发现在特定睡姿下，能让她在数分钟内陷入「从未有过」的深度睡眠，醒来后精神焕发，且「完全记不起梦」。晨星团派员上门核实，确认该枕头为异常物品。", "经结构解析，异常被确认依附于枕头的材质与内部结构，而非使用者。晨星团在取得原主同意后，通过逐层复刻「规则载体」的方式实现了可控复制，经 IMAC 民用异常应用委员会评估后立项为「安眠枕」项目，于安珀历25年以处方形式向社会发放。"],
      features: ["安眠枕是一只<strong>可复制的睡眠辅助型异常物品</strong>（常规级）：在绑定使用者的正确睡姿下，可使其在约3分钟内进入最深度的无梦睡眠，并于约90分钟后自然苏醒，醒来即精神饱满、无需再补觉。", "「安眠枕」项目由晨星团民用物品应用科管理，通过医疗机构处方限量发放，目前已服务约四千名经评估确认的慢性失眠患者，应用十五年零事故。"],
      mapNode: /*#__PURE__*/React.createElement("div", {
        className: "rules-list"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-item verified"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-num"
      }, "\u4E00"), /*#__PURE__*/React.createElement("div", {
        className: "rule-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-title"
      }, "\u7ED3\u6784\u7EC4\u6210"), /*#__PURE__*/React.createElement("p", {
        className: "rule-desc"
      }, "\u9762\u6599\u5C42 / \u586B\u5145\u5C42 / \u6795\u82AF\u5939\u5C42\u2014\u2014\u5F02\u5E38\u4F9D\u9644\u4E8E\u5939\u5C42\u7684\u7EC7\u7269\u7ED3\u6784\u3002"))), /*#__PURE__*/React.createElement("div", {
        className: "rule-item verified"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-num"
      }, "\u4E8C"), /*#__PURE__*/React.createElement("div", {
        className: "rule-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-title"
      }, "\u89C4\u5219\u8F7D\u4F53"), /*#__PURE__*/React.createElement("p", {
        className: "rule-desc"
      }, "\u8F7D\u4F53\u4E3A\u6795\u82AF\u5939\u5C42\u7EC7\u7269\uFF0C\u53EF\u6574\u4F53\u590D\u523B\uFF0C\u590D\u523B\u54C1\u6548\u679C\u4E0E\u539F\u54C1\u4E00\u81F4\u3002"))), /*#__PURE__*/React.createElement("div", {
        className: "rule-item verified"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-num"
      }, "\u4E09"), /*#__PURE__*/React.createElement("div", {
        className: "rule-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-title"
      }, "\u4F7F\u7528\u5F62\u6001"), /*#__PURE__*/React.createElement("p", {
        className: "rule-desc"
      }, "\u7ED1\u5B9A\u8005\u6C14\u5473\u751F\u6548 \xB7 \u6BCF\u65E5\u4E00\u6B21 \xB7 90\u5206\u949F\u81EA\u7136\u9192\u3002")))),
      mapTitle: "结构说明",
      mapTag: "文字说明 · NOTES",
      verifiedRules: [{
        num: "一",
        title: "绑定使用者",
        desc: "枕头会「记住」第一位长期使用者的气味并与之绑定：同一枕头仅供一人使用，转借他人后效果消失，回归普通枕头。"
      }, {
        num: "二",
        title: "每日一次",
        desc: "效果每日仅触发一次，且两次使用间隔不得少于8小时；连续使用会导致次日晨间嗜睡，属正常现象，非异常失效。"
      }, {
        num: "三",
        title: "九十唤醒",
        desc: "入睡后约90分钟自然苏醒，醒来即处于清醒状态、无法再次入睡——该周期与一个完整深睡周期吻合，为评估时认定的「安全唤醒窗口」。"
      }, {
        num: "四",
        title: "禁忌症",
        desc: "严重心血管疾病、睡眠呼吸暂停患者及孕妇禁用。使用者须通过晨星团健康评估并持处方领取，禁止私下交易。"
      }],
      recordsTitle: "应用记录",
      entryRecords: [{
        term: "首次接触",
        year: "安珀历24年·秋",
        count: "-",
        org: "白松城·社区咨询点",
        result: "使用者上门求助 · 确认异常物品",
        status: "safe"
      }, {
        term: "结构解析",
        year: "安珀历24年·冬",
        count: "-",
        org: "晨星团",
        result: "确认依附材质结构 · 评定安全",
        status: "safe"
      }, {
        term: "民用应用",
        year: "安珀历25年·至今",
        count: "-",
        org: "晨星团/白松城医院",
        result: "已转入民用应用 · 处方限量发放（详见基本特征）",
        status: "safe"
      }],
      phenomena: ["<strong>「无梦区间」：</strong>使用者普遍报告使用期间「完全记不起梦」——既非忘记，也非无梦，而是醒来后对睡眠过程毫无记忆，仿佛时间被直接「跳过」。该现象在复刻品上同样存在，程度略轻。", "<strong>「晨间空白」：</strong>醒来后约3分钟内，使用者处于清醒但「放空」的状态，可正常行动与应答，但之后无法回忆起这3分钟内的大部分内容。随访未发现该现象对日常造成影响。"]
    };
    return /*#__PURE__*/React.createElement(AnomalyDossier, {
      data: slumberData
    });
  }
  if (isKettle) {
    const kettleData = {
      id: "OBA-0321",
      name: "恒温壶",
      nameEn: "CONSTANT WARMTH KETTLE · SAFE",
      stamp: "公开 · PUBLIC",
      classification: "PUBLIC",
      ver: "19.8",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      survivalRate: 100,
      info: [["异常编号", /*#__PURE__*/React.createElement("span", {
        className: "detail-file-id",
        style: {
          fontSize: "18px"
        }
      }, "OBA-0321"), "名称", "恒温壶 · Constant Warmth Kettle"], ["所属管辖", "晨星团 · 民用物品应用科", "首次记录", "安珀历19年 · 白松城"], ["异常等级", {
        levelKey: "ordinary",
        text: "常规级 · ORDINARY"
      }, "当前状态", {
        statusKey: "safe",
        text: "● 安全 SAFE"
      }], ["生还率", [/*#__PURE__*/React.createElement("span", {
        key: "s",
        style: {
          color: "var(--level-ordinary)"
        }
      }, "100%"), "（应用20年 · 零事故）"], "信息价值", "民用应用示范样本"], ["档案更新", "安珀历39年 · 春", "处置状态", "民用应用 · 定点配发"]],
      discovery: ["安珀历19年冬，白松城一家老茶馆的老板发现，店里的旧铜壶永远保持着「刚好能喝」的温度——无论倒入什么、放置多久，揭开壶盖时总冒着恰到好处的热气。冬天客人多，老板起初以为是巧合，直到一位常客指出「这壶三年没烧过水了」才惊觉异常，遂通过社区热线上报。", "晨星团派员调查后确认该壶为异常物品，其规则载体依附于壶身铜质与内部结构。经逐层复刻实现可控复制后，由 IMAC 民用异常应用委员会立项为「恒温壶」项目，定点配发给社区养老服务站与医院保温餐使用。"],
      features: ["恒温壶是一只<strong>温度锚定型异常物品</strong>（常规级）：任何液体倒入后约10分钟，温度即恒定为60℃±0.5℃，此后无论放置多久（实测最长72小时）温度不再变化，恰为「刚好能喝」的温度。", "「恒温壶」项目由晨星团民用物品应用科管理，目前以定点配发方式服务于白松城及周边十余个社区的养老服务站与医院保温餐，应用二十年零事故。"],
      mapNode: /*#__PURE__*/React.createElement("div", {
        className: "rules-list"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-item verified"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-num"
      }, "\u4E00"), /*#__PURE__*/React.createElement("div", {
        className: "rule-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-title"
      }, "\u7ED3\u6784\u7EC4\u6210"), /*#__PURE__*/React.createElement("p", {
        className: "rule-desc"
      }, "\u94DC\u58F6\u6574\u4F53\uFF1A\u58F6\u76D6 / \u58F6\u8EAB / \u628A\u624B / \u58F6\u5634\u2014\u2014\u5F02\u5E38\u4F9D\u9644\u4E8E\u58F6\u8EAB\u94DC\u8D28\u4E0E\u5185\u90E8\u7ED3\u6784\u3002"))), /*#__PURE__*/React.createElement("div", {
        className: "rule-item verified"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-num"
      }, "\u4E8C"), /*#__PURE__*/React.createElement("div", {
        className: "rule-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-title"
      }, "\u5B8C\u6574\u6027\u8981\u6C42"), /*#__PURE__*/React.createElement("p", {
        className: "rule-desc"
      }, "\u58F6\u76D6\u3001\u58F6\u8EAB\u3001\u628A\u624B\u4E09\u8005\u7F3A\u4E00\u4E0D\u53EF\uFF0C\u4EFB\u4E00\u90E8\u5206\u5206\u79BB\u5373\u5931\u6548\u3002"))), /*#__PURE__*/React.createElement("div", {
        className: "rule-item verified"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-num"
      }, "\u4E09"), /*#__PURE__*/React.createElement("div", {
        className: "rule-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-title"
      }, "\u4F5C\u7528\u5F62\u6001"), /*#__PURE__*/React.createElement("p", {
        className: "rule-desc"
      }, "\u6E29\u5EA6\u951A\u5B9A\u4E8E60\u2103\xB10.5\u2103 \xB7 \u6BCF\u65E5\u4E09\u6B21 \xB7 \u58F6\u5E95\u591C\u95F4\u900F\u6DE1\u5FAE\u5149\u3002")))),
      mapTitle: "结构说明",
      mapTag: "文字说明 · NOTES",
      verifiedRules: [{
        num: "一",
        title: "温度锚定",
        desc: "倒入任何液体约10分钟后，温度恒定为60℃±0.5℃，此后不再变化；壶空置时无任何异常。"
      }, {
        num: "二",
        title: "每日三次",
        desc: "恒温效果每日最多触发三次；第四次起壶回归普通铜壶，次日恢复。此规则为复刻品与原始壶共有的唯一限制。"
      }, {
        num: "三",
        title: "壶身完整",
        desc: "壶盖、壶身、把手三者须保持完整；任一部分分离，恒温效果立即消失，重新组合后恢复。"
      }, {
        num: "四",
        title: "使用禁忌",
        desc: "禁止用于冲调婴幼儿饮品与需低温保存的药物——恒定的60℃会破坏部分成分。配发点均有醒目标识。"
      }],
      recordsTitle: "应用记录",
      entryRecords: [{
        term: "首次接触",
        year: "安珀历19年·冬",
        count: "-",
        org: "白松城·社区热线",
        result: "茶馆老板上报 · 确认异常物品",
        status: "safe"
      }, {
        term: "结构解析",
        year: "安珀历19年·冬",
        count: "-",
        org: "晨星团",
        result: "逐层复刻验证 · 评定安全",
        status: "safe"
      }, {
        term: "民用应用",
        year: "安珀历20年·至今",
        count: "-",
        org: "晨星团/白松城民政",
        result: "已转入民用应用 · 定点配发（详见基本特征）",
        status: "safe"
      }],
      phenomena: ["<strong>「壶底微光」：</strong>夜间熄灯后，原始铜壶的壶底会透出极淡的暖色微光，温度越高越明显；复刻品上该现象已减弱至几乎不可见，其成因未被解析。", "<strong>「隔夜余温」：</strong>复刻壶在空置状态下，内壁仍会保持约两小时的「刚烧开过」的触感余温——这是应用中最实用的现象之一，也是使用者辨识恒温壶是否仍处于可用状态的方法。"]
    };
    return /*#__PURE__*/React.createElement(AnomalyDossier, {
      data: kettleData
    });
  }
  if (isHomeward) {
    const homewardMap = /*#__PURE__*/React.createElement("div", {
      className: "stair-map"
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 340 170",
      width: "100%",
      style: {
        display: "block"
      }
    }, /*#__PURE__*/React.createElement("ellipse", {
      cx: "170",
      cy: "105",
      rx: "46",
      ry: "30",
      fill: "rgba(20,20,24,0.9)",
      stroke: "rgba(63,184,164,0.85)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M140 98 Q 170 88, 200 98",
      fill: "none",
      stroke: "rgba(168,168,180,0.3)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: "152",
      y: "110",
      fill: "rgba(63,184,164,1)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u5F52\u9014\u77F3"), /*#__PURE__*/React.createElement("text", {
      x: "96",
      y: "120",
      fill: "rgba(168,168,180,0.75)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u8D34\u8EAB\u4F69\u6234 \xB7 24h\u7ED1\u5B9A"), /*#__PURE__*/React.createElement("ellipse", {
      cx: "170",
      cy: "105",
      rx: "120",
      ry: "62",
      fill: "none",
      stroke: "rgba(196,154,44,0.4)",
      strokeWidth: "1",
      strokeDasharray: "5 4"
    }), /*#__PURE__*/React.createElement("text", {
      x: "252",
      y: "60",
      fill: "rgba(196,154,44,0.85)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u951A\u5B9A\u8303\u56F4 5km"), /*#__PURE__*/React.createElement("path", {
      d: "M170 105 L 236 62",
      stroke: "rgba(196,154,44,0.85)",
      strokeWidth: "1.4"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "242",
      cy: "57",
      r: "4",
      fill: "rgba(196,154,44,0.9)"
    }), /*#__PURE__*/React.createElement("text", {
      x: "226",
      y: "50",
      fill: "rgba(196,154,44,0.95)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u300C\u5BB6\u300D"), /*#__PURE__*/React.createElement("path", {
      d: "M300 138 L 240 96",
      stroke: "rgba(63,184,164,0.5)",
      strokeWidth: "1",
      strokeDasharray: "3 3"
    }), /*#__PURE__*/React.createElement("text", {
      x: "268",
      y: "142",
      fill: "rgba(168,168,180,0.7)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u65B9\u5411\u76F4\u89C9"), /*#__PURE__*/React.createElement("text", {
      x: "60",
      y: "162",
      fill: "rgba(168,168,180,0.75)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u6BCF\u65E5\u4E00\u6B21 \xB7 \u53EA\u6307\u65B9\u5411\u4E0D\u4FDD\u8DEF\u51B5")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--text-tertiary)",
        marginTop: "10px",
        textAlign: "center",
        letterSpacing: "0.08em"
      }
    }, "\u7ED3\u6784\u793A\u610F \xB7 \u4EE5\u4F69\u6234\u8005\u767B\u8BB0\u7684\u300C\u5BB6\u300D\u4E3A\u951A\u70B9\uFF0C\u4E94\u516C\u91CC\u5185\u6301\u7EED\u63D0\u793A\u6B63\u786E\u65B9\u5411"));
    const homewardData = {
      id: "SPA-0317",
      name: "归途石",
      nameEn: "HOMEWARD STONE · SAFE",
      stamp: "公开 · PUBLIC",
      classification: "PUBLIC",
      ver: "17.2",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      survivalRate: 100,
      info: [["异常编号", /*#__PURE__*/React.createElement("span", {
        className: "detail-file-id",
        style: {
          fontSize: "18px"
        }
      }, "SPA-0317"), "名称", "归途石 · Homeward Stone"], ["所属管辖", "长桥会社 · 民用社区应用部", "首次记录", "安珀历21年 · 北境冻原"], ["异常等级", {
        levelKey: "ordinary",
        text: "常规级 · ORDINARY"
      }, "当前状态", {
        statusKey: "safe",
        text: "● 安全 SAFE"
      }], ["生还率", [/*#__PURE__*/React.createElement("span", {
        key: "s",
        style: {
          color: "var(--level-ordinary)"
        }
      }, "100%"), "（应用18年 · 零事故）"], "信息价值", "民用应用示范样本"], ["档案更新", "安珀历39年 · 春", "处置状态", "民用应用 · 定向发放"]],
      discovery: ["安珀历21年冬，北境冻原一名猎人在暴风雪中迷失方向，凭借口袋里一枚捡来的灰色卵石「一路被牵着」走回了营地——事后他坚称「石头在带路」。长桥会社调查组循此线索在冻原冰层下找到一块与卵石同源的岩层，确认卵石为异常物品。", "经解析，异常依附于卵石的矿物结构，具有「以佩戴者为锚、指向归途」的稳定规则。长桥会社在取得完整数据后，与北境守望合作启动了「归途石」定向发放项目，最初用于极地作业人员的防迷路保障。"],
      features: ["归途石是一枚<strong>方向锚定型异常物品</strong>（常规级）：佩戴者在陌生环境中会持续产生「朝某方向走」的清晰直觉，该方向始终指向佩戴者登记在案的「家」——实测在半径五公里内准确无误。", "「归途石」项目由长桥会社民用社区应用部管理，目前主要定向发放给阿尔茨海默症早期患者、极地作业人员与野外勘探队，应用十八年零事故。"],
      mapNode: homewardMap,
      mapTitle: "结构示意 · 锚定",
      mapTag: "锚定示意 · ANCHOR",
      verifiedRules: [{
        num: "一",
        title: "绑定佩戴",
        desc: "接触皮肤连续24小时后完成绑定；绑定后仅对佩戴者生效，转赠他人前须由管理站解绑。"
      }, {
        num: "二",
        title: "指向归途",
        desc: "以佩戴者登记的「家」为锚点，持续提示正确方向，有效半径五公里；超出范围后提示失效，回到范围内自动恢复。"
      }, {
        num: "三",
        title: "每日一次",
        desc: "方向提示每日仅连续生效一次，失效后需次日重新激活；佩戴者次日触碰石头即可再次生效。"
      }, {
        num: "四",
        title: "不保路况",
        desc: "归途石只保证「方向正确」，不保证路径安全——洪水、断桥、塌方路段同样会被指向。佩戴者仍需自行判断路况。"
      }],
      recordsTitle: "应用记录",
      entryRecords: [{
        term: "首次接触",
        year: "安珀历21年·冬",
        count: "-",
        org: "北境冻原",
        result: "猎人迷失获救 · 上报异常",
        status: "safe"
      }, {
        term: "结构解析",
        year: "安珀历21年·冬",
        count: "-",
        org: "长桥会社/北境守望",
        result: "确认方向锚定规则 · 评定安全",
        status: "safe"
      }, {
        term: "民用应用",
        year: "安珀历22年·至今",
        count: "-",
        org: "长桥会社",
        result: "已转入民用应用 · 定向发放（详见基本特征）",
        status: "safe"
      }],
      phenomena: ["<strong>「掌心微热」：</strong>佩戴期间，归途石在掌心持续保持约体温的温度；离家越远越热，方向正确时热度平稳，方向错误时热度轻微起伏——常被佩戴者称为「石头在叹气」。", "<strong>「夜路本能」：</strong>夜间或浓雾中，归途石佩戴者的步态稳定性显著提升，平衡能力接近白天水准；机理未被解析，但与「方向增益」疑似同源。"]
    };
    return /*#__PURE__*/React.createElement(AnomalyDossier, {
      data: homewardData
    });
  }
  if (isSilent) {
    const silentData = {
      id: "PHB-0521",
      name: "静音毯",
      nameEn: "SILENT BLANKET · SAFE",
      stamp: "公开 · PUBLIC",
      classification: "PUBLIC",
      ver: "22.5",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      survivalRate: 100,
      info: [["异常编号", /*#__PURE__*/React.createElement("span", {
        className: "detail-file-id",
        style: {
          fontSize: "18px"
        }
      }, "PHB-0521"), "名称", "静音毯 · Silent Blanket"], ["所属管辖", "边界研究院 · 民用技术应用部", "首次记录", "安珀历16年 · 洛林自由市"], ["异常等级", {
        levelKey: "ordinary",
        text: "常规级 · ORDINARY"
      }, "当前状态", {
        statusKey: "safe",
        text: "● 安全 SAFE"
      }], ["生还率", [/*#__PURE__*/React.createElement("span", {
        key: "s",
        style: {
          color: "var(--level-ordinary)"
        }
      }, "100%"), "（应用23年 · 零事故）"], "信息价值", "民用应用示范样本"], ["档案更新", "安珀历39年 · 春", "处置状态", "民用应用 · 场馆配发"]],
      discovery: ["安珀历16年夏，洛林自由市旧剧院翻修时，工人在后台储物间发现一块深灰色毛毯，展开铺平后整个房间的噪音「消失了」——说话声在毯内清晰，毯外几乎听不见。剧院经理起初以为是隔音改造的效果，直到工程师告诉他「这堵墙根本不可能隔音」才上报。", "边界研究院（BRI）接手调查，确认毛毯为异常物品，其规则载体依附于织物结构与纤维排布。经复刻验证后，由 IMAC 民用异常应用委员会立项为「静音毯」项目，按场馆定点配发。"],
      features: ["静音毯是一块<strong>降噪型异常织物</strong>（常规级）：展开铺平后，以毯中心为圆心、半径两米内的环境噪音被抑制至约18分贝（相当于安静图书馆的耳语水平），毯内人声清晰可辨，毯外几乎听不见。", "「静音毯」项目由边界研究院民用技术应用部管理，目前配发于洛林自由市的公共图书馆静音区、心理诊所咨询室与考试中心，应用二十三年零事故。"],
      mapNode: /*#__PURE__*/React.createElement("div", {
        className: "rules-list"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-item verified"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-num"
      }, "\u4E00"), /*#__PURE__*/React.createElement("div", {
        className: "rule-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-title"
      }, "\u7ED3\u6784\u7EC4\u6210"), /*#__PURE__*/React.createElement("p", {
        className: "rule-desc"
      }, "\u6DF1\u7070\u8272\u6BDB\u6BEF\u7EC7\u7269\uFF08\u7EA61.5m\xD72m\uFF09\u2014\u2014\u5F02\u5E38\u4F9D\u9644\u4E8E\u7EC7\u7269\u7ED3\u6784\u4E0E\u7EA4\u7EF4\u6392\u5E03\u3002"))), /*#__PURE__*/React.createElement("div", {
        className: "rule-item verified"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-num"
      }, "\u4E8C"), /*#__PURE__*/React.createElement("div", {
        className: "rule-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-title"
      }, "\u7EA4\u7EF4\u5F62\u6001"), /*#__PURE__*/React.createElement("p", {
        className: "rule-desc"
      }, "\u7EA4\u7EF4\u5728\u663E\u5FAE\u955C\u4E0B\u5448\u89C4\u5F8B\u6027\u73AF\u5F62\u6392\u5E03\uFF0C\u5373\u300C\u89C4\u5219\u8F7D\u4F53\u300D\u7684\u7269\u7406\u5F62\u6001\uFF1B\u590D\u523B\u5DE5\u827A\u4ECD\u4F9D\u8D56\u539F\u6BEF\u91C7\u6837\u3002"))), /*#__PURE__*/React.createElement("div", {
        className: "rule-item verified"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-num"
      }, "\u4E09"), /*#__PURE__*/React.createElement("div", {
        className: "rule-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-title"
      }, "\u4F5C\u7528\u5F62\u6001"), /*#__PURE__*/React.createElement("p", {
        className: "rule-desc"
      }, "\u5C55\u5F00\u94FA\u5E73\u540E\u4EE5\u6BEF\u4E2D\u5FC3\u4E3A\u5706\u5FC3\u964D\u566A \xB7 \u534A\u5F84\u4E24\u7C73 \xB7 \u6BCF\u65E5\u4E0D\u8D85\u8FC78\u5C0F\u65F6\u3002")))),
      mapTitle: "结构说明",
      mapTag: "文字说明 · NOTES",
      verifiedRules: [{
        num: "一",
        title: "展开生效",
        desc: "毯子必须完全展开铺平才生效；折叠、卷起或部分覆盖时无效。收起后效果即时消失。"
      }, {
        num: "二",
        title: "覆盖范围",
        desc: "以毯中心为圆心、半径两米内降噪生效；范围内噪音降至约18分贝，人声等有意声音不受影响。"
      }, {
        num: "三",
        title: "时长限制",
        desc: "每日连续使用不得超过8小时；超时后毯子自动失效，次日恢复。使用场所须记录开闭时间。"
      }, {
        num: "四",
        title: "使用禁忌",
        desc: "禁止用于覆盖逃生通道、火警警报等安全设施——降噪包含警报声，使用场所必须设有毯外监控与报警备份。"
      }],
      recordsTitle: "应用记录",
      entryRecords: [{
        term: "首次接触",
        year: "安珀历16年·夏",
        count: "-",
        org: "洛林自由市旧剧院",
        result: "翻修发现 · 上报异常",
        status: "safe"
      }, {
        term: "结构解析",
        year: "安珀历17年",
        count: "-",
        org: "边界研究院",
        result: "复刻验证 · 评定安全",
        status: "safe"
      }, {
        term: "民用应用",
        year: "安珀历18年·至今",
        count: "-",
        org: "BRI/洛林市立图书馆",
        result: "已转入民用应用 · 场馆配发（详见基本特征）",
        status: "safe"
      }],
      phenomena: ["<strong>「毯缘风感」：</strong>站在降噪范围边缘的使用者普遍报告能感到一层「极轻的、贴着皮肤掠过的风」，跨过边界时「啪」地一下像过了一道薄膜；该风感无温度、无方向，来源未被解析。", "<strong>「无声泡泡」：</strong>毯内完全安静时，使用者偶尔会听到一声极其轻微的「啵」——像泡泡破裂，疑似为降噪边界与外部声波的相互作用，无风险记录。"]
    };
    return /*#__PURE__*/React.createElement(AnomalyDossier, {
      data: silentData
    });
  }
  if (isUmbrella) {
    const umbrellaData = {
      id: "OBA-0371",
      name: "不湿伞",
      nameEn: "DRY UMBRELLA · SAFE",
      stamp: "公开 · PUBLIC",
      classification: "PUBLIC",
      ver: "8.6",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      survivalRate: 100,
      info: [["异常编号", /*#__PURE__*/React.createElement("span", {
        className: "detail-file-id",
        style: {
          fontSize: "18px"
        }
      }, "OBA-0371"), "名称", "不湿伞 · Dry Umbrella"], ["所属管辖", "晨星团 · 民用物品应用科", "首次记录", "安珀历30年 · 白松城"], ["异常等级", {
        levelKey: "ordinary",
        text: "常规级 · ORDINARY"
      }, "当前状态", {
        statusKey: "safe",
        text: "● 安全 · 待投用 SAFE"
      }], ["生还率", [/*#__PURE__*/React.createElement("span", {
        key: "s",
        style: {
          color: "var(--level-ordinary)"
        }
      }, "100%"), "（无进入记录 · 零事故）"], "信息价值", "民用应用候选样本"], ["档案更新", "安珀历39年 · 春", "处置状态", "民用应用评估通过 · 尚未投入使用"]],
      discovery: ["安珀历30年春，白松城旧车站拆除改造时，工人在站长休息室的储物柜深处翻出一把黑色长柄伞。当天恰逢暴雨，工人撑伞穿过站前广场时惊讶地发现：以他为中心、约三米范围内的雨水全部「绕开」了，地面干爽，仿佛头顶有一道看不见的伞沿。", "晨星团接到上报后派员核查，确认该伞为异常物品，并对其进行了长达两年的规则解析。安珀历32年，IMAC 民用异常应用委员会完成安全评估，正式将其列为「民用应用候选样本」——但受复刻工艺与投放审批进度所限，截至本档案更新，尚未投入使用。"],
      features: ["不湿伞是一把<strong>降雨规避型异常物品</strong>（常规级）：伞面撑开后，以撑伞者为圆心、半径三米内的雨水自动绕开，落在该范围边缘的雨滴会沿一条看不见的弧线滑落，仿佛撑了一把「比实际大三倍」的伞。", "异常依附于伞面织物与伞骨的金属结构，规则已被完全解析并评定为安全。目前晨星团已掌握复刻工艺，正等待 IMAC 民用应用委员会的统一投放审批——因此它仍是「档案里的伞」，尚未进入任何人的生活。"],
      mapNode: /*#__PURE__*/React.createElement("div", {
        className: "rules-list"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-item verified"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-num"
      }, "\u4E00"), /*#__PURE__*/React.createElement("div", {
        className: "rule-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-title"
      }, "\u7ED3\u6784\u7EC4\u6210"), /*#__PURE__*/React.createElement("p", {
        className: "rule-desc"
      }, "\u9ED1\u8272\u957F\u67C4\u4F1E\u6574\u4F53\u2014\u2014\u5F02\u5E38\u4F9D\u9644\u4E8E\u4F1E\u9762\u7EC7\u7269\u4E0E\u4F1E\u9AA8\u91D1\u5C5E\u7ED3\u6784\uFF0C\u4E8C\u8005\u7F3A\u4E00\u4E0D\u53EF\u3002"))), /*#__PURE__*/React.createElement("div", {
        className: "rule-item verified"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-num"
      }, "\u4E8C"), /*#__PURE__*/React.createElement("div", {
        className: "rule-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-title"
      }, "\u89C4\u5219\u8F7D\u4F53"), /*#__PURE__*/React.createElement("p", {
        className: "rule-desc"
      }, "\u8F7D\u4F53\u53EF\u6574\u4F53\u590D\u523B\uFF0C\u590D\u523B\u54C1\u6548\u679C\u4E0E\u539F\u54C1\u4E00\u81F4\uFF1B\u4F1E\u9762\u78E8\u635F\u8D85\u4E09\u6210\u540E\u6548\u679C\u51CF\u5F31\uFF0C\u4F46\u4E0D\u4F1A\u5931\u6548\u3002"))), /*#__PURE__*/React.createElement("div", {
        className: "rule-item verified"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-num"
      }, "\u4E09"), /*#__PURE__*/React.createElement("div", {
        className: "rule-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rule-title"
      }, "\u4F5C\u7528\u5F62\u6001"), /*#__PURE__*/React.createElement("p", {
        className: "rule-desc"
      }, "\u4EC5\u964D\u96E8\u65F6\u751F\u6548 \xB7 \u6491\u5F00\u5373\u89E6\u53D1 \xB7 \u6536\u8D77\u5373\u5931\u6548 \xB7 \u4EE5\u6491\u4F1E\u8005\u4E3A\u5706\u5FC3\u534A\u5F84\u4E09\u7C73\u3002")))),
      mapTitle: "结构说明",
      mapTag: "文字说明 · NOTES",
      verifiedRules: [{
        num: "一",
        title: "撑开生效",
        desc: "伞面完全撑开后效果触发：以撑伞者为圆心、半径三米内的雨水自动绕开；收起伞面后效果立即消失。"
      }, {
        num: "二",
        title: "降雨触发",
        desc: "仅在降雨（或降雪）时生效；晴天撑伞无任何异常表现，与普通雨伞无异。"
      }, {
        num: "三",
        title: "仅限一人",
        desc: "效果以「撑伞者」为圆心，同行者须处于三米范围内才能避雨；不可折叠转交，一人持伞时效果只保护当前撑伞者。"
      }, {
        num: "四",
        title: "避水不避风",
        desc: "雨水被规避，但风、冰雹与坠落物不受影响——伞面遮不到的侧面强风依然会打湿衣物。"
      }],
      recordsTitle: "应用记录",
      entryRecords: [{
        term: "首次接触",
        year: "安珀历30年·春",
        count: "-",
        org: "白松城旧车站",
        result: "翻修发现 · 上报异常",
        status: "safe"
      }, {
        term: "结构解析",
        year: "安珀历32年",
        count: "-",
        org: "晨星团",
        result: "规则完全解析 · 评定安全",
        status: "safe"
      }, {
        term: "投用审批",
        year: "安珀历39年",
        count: "-",
        org: "IMAC民用应用委员会",
        result: "评估通过 · 尚未投入使用",
        status: "safe"
      }],
      phenomena: ["<strong>「伞沿弧线」：</strong>落在三米范围边缘的雨滴会沿一条看不见的弧线滑落，轨迹稳定可预测；晨星团据此认为该异常的本质是「重新规划了雨滴的落点」，而非「挡开雨水」。", "<strong>「伞面微光」：</strong>暴雨中长时间撑持时，伞面会透出极淡的暖色微光（与恒温壶 OBA-0321 的「壶底微光」类似），雨后即消失；两者是否同源尚未确认。"]
    };
    return /*#__PURE__*/React.createElement(AnomalyDossier, {
      data: umbrellaData
    });
  }
  if (isRift) {
    const riftMap = /*#__PURE__*/React.createElement("div", {
      className: "stair-map"
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 340 170",
      width: "100%",
      style: {
        display: "block"
      }
    }, /*#__PURE__*/React.createElement("line", {
      x1: "20",
      y1: "130",
      x2: "320",
      y2: "130",
      stroke: "rgba(74,88,104,0.5)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M170 15 L160 40 L172 65 L158 90 L170 115 L162 135 L178 135 L170 115 L182 90 L168 65 L180 40 L170 15 Z",
      fill: "rgba(20,20,24,0.9)",
      stroke: "rgba(196,40,40,0.8)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("text", {
      x: "140",
      y: "10",
      fill: "rgba(196,40,40,0.85)",
      fontSize: "9",
      fontFamily: "monospace"
    }, "\u6D1B\u6797\u88C2\u9699"), [18, 34, 50].map((r, i) => /*#__PURE__*/React.createElement("ellipse", {
      key: i,
      cx: "170",
      cy: "130",
      rx: r,
      ry: r * 0.45,
      fill: "none",
      stroke: "rgba(196,154,44,0.45)",
      strokeWidth: "1",
      strokeDasharray: "4 3"
    })), /*#__PURE__*/React.createElement("text", {
      x: "228",
      y: "52",
      fill: "rgba(196,154,44,0.8)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u62C9\u626F\u611F"), /*#__PURE__*/React.createElement("text", {
      x: "228",
      y: "63",
      fill: "rgba(196,154,44,0.55)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "5m \u8303\u56F4"), [128, 140, 152, 188, 200, 212].map((x, i) => /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: x,
      y1: "130",
      x2: x,
      y2: "125",
      stroke: "rgba(74,154,44,0.9)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: x,
      cy: "124",
      r: "1.6",
      fill: "rgba(74,154,44,0.9)"
    }))), /*#__PURE__*/React.createElement("text", {
      x: "118",
      y: "146",
      fill: "rgba(74,154,44,0.8)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u4FE1\u6807\u9635\u5217 MK-III"), /*#__PURE__*/React.createElement("rect", {
      x: "40",
      y: "105",
      width: "34",
      height: "24",
      fill: "rgba(20,20,24,0.85)",
      stroke: "rgba(138,180,212,0.6)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: "30",
      y: "144",
      fill: "rgba(138,180,212,0.75)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u6D1B\u6797\u524D\u54E8\u7AD9"), /*#__PURE__*/React.createElement("text", {
      x: "286",
      y: "70",
      fill: "rgba(168,168,180,0.6)",
      fontSize: "8",
      fontFamily: "monospace"
    }, "\u76EE\u89C6\u533A")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--text-tertiary)",
        marginTop: "10px",
        textAlign: "center",
        letterSpacing: "0.08em"
      }
    }, "\u7AD6\u7ACB\u5730\u8868\u7684\u7A7A\u95F4\u88C2\u9699 \xB7 5\u7C73\u5185\u4EA7\u751F\u62C9\u626F\u611F \xB7 \u4FE1\u6807\u9635\u5217\u6301\u7EED\u76D1\u6D4B\u8FB9\u754C"));
    const riftData = {
      id: "PHA-0182",
      name: "洛林裂隙",
      nameEn: "LORRAINE RIFT",
      stamp: "机密 · CONFIDENTIAL",
      classification: "CONFIDENTIAL",
      ver: "39.0",
      updated: "安珀历39年·春",
      archiveDate: "安珀历39年春",
      survivalRate: 38,
      info: [["异常编号", /*#__PURE__*/React.createElement("span", {
        className: "detail-file-id",
        style: {
          fontSize: "18px"
        }
      }, "PHA-0182"), "名称", "洛林裂隙 · Lorraine Rift"], ["所属管辖", "边界研究院/晨星团联合 · BRI & Morningstar", "首次记录", "安珀历9年 · 秋"], ["异常等级", {
        levelKey: "doomed",
        text: "厄运级 · DOOMED"
      }, "当前状态", {
        statusKey: "active",
        text: "● 活跃 ACTIVE"
      }], ["生还率", [/*#__PURE__*/React.createElement("span", {
        className: "survival-rate-red",
        key: "s"
      }, "\u7EA6 38%"), "（21人进入，13人死亡）"], "信息价值", "高（与无尽楼梯 SPA-0021 疑似共享同一空间结构源）"], ["档案更新", "安珀历39年 · 春", "处置状态", "联合边界测绘 · 三级响应 · 进行中"]],
      discovery: ["安珀历9年秋，洛林自由市边境的一处废弃旧矿场附近，巡逻队发现一道「竖立在地表的裂缝」：约两人高的漆黑裂隙，边缘不规则，从侧面看几乎不可见，但从正面直视时会产生强烈的眩晕与「被注视」感。附近三名矿工家属先后失踪，最后一次目击均指向裂隙方向。", "IMAC 协调 BRI 与晨星团联合接管调查。初期勘查确认裂隙并非「入口」，而是一处持续存在的空间破损点——接近者会感到明显的拉扯感，但裂隙本身并不「吸入」物体，只对生命体与部分仪器产生定向吸引。"],
      features: ["洛林裂隙是一处<strong>持续存在的空间破损点</strong>：竖立于地表约两米高，正面可见、侧面近乎不可见。裂隙边缘不规则，始终处于缓慢的「呼吸」起伏中，无固定周期可测。", "裂隙对生命体产生定向吸引：5米内出现拉扯感，越近越强，1米内几乎无法抗拒；非生命体（金属、石块）不受影响，但部分精密仪器在裂隙附近出现读数漂移。", "裂隙疑似与无尽楼梯（SPA-0021）共享同一空间结构源——两者均在洛林自由市及周边出现，BRI 将其列为「空间结构同源假说」的关键样本。"],
      mapNode: riftMap,
      mapTag: "现场布局 · LAYOUT",
      verifiedRules: [{
        num: "一",
        title: "定向吸引",
        desc: "裂隙对生命体产生定向拉扯：5米内可感知，1米内几乎无法抗拒；非生命体不受影响，但精密仪器读数会出现漂移。"
      }, {
        num: "二",
        title: "正面可见",
        desc: "裂隙正面可见（漆黑、边缘不规则），侧面近乎不可见；直视裂隙会产生眩晕与「被注视」感，撤离后缓解。"
      }, {
        num: "三",
        title: "不吸入",
        desc: "裂隙并非入口——物体不会被吞入，但持续靠近者会被拉扯至裂隙边缘，此后发生的事没有任何记录。"
      }],
      speculatedRules: ["裂隙可能是一处「空间破损」而非「入口」——其拉扯力疑似来自破损边缘的空间张力，而非裂隙内部", "与无尽楼梯（SPA-0021）疑似共享同一空间结构源，可能与洛林自由市的地理位置存在关联", "裂隙边缘的「呼吸」起伏或与地下矿脉结构有关，但证据不足，无法确认"],
      entryRecords: [{
        term: "初期勘查",
        year: "安珀历9年·秋",
        count: 6,
        org: "BRI/晨星团联合",
        result: "2人生还，4人死亡",
        status: "death"
      }, {
        term: "第二次",
        year: "安珀历12年·夏",
        count: 5,
        org: "晨星团",
        result: "3人生还，2人死亡",
        status: "death"
      }, {
        term: "第三次",
        year: "安珀历15年·春",
        count: 4,
        org: "BRI",
        result: "2人生还，2人死亡",
        status: "death"
      }, {
        term: "第四次",
        year: "安珀历22年·冬",
        count: 6,
        org: "BRI/晨星团联合",
        result: "1人生还，5人死亡",
        status: "death"
      }],
      phenomena: ["<strong>「被注视」感：</strong>直视裂隙的观察者普遍报告眩晕与「被注视」感，且视线无法主动移开，需旁人协助才可转移注意力——该现象在初期勘查中被误判为心理暗示，后确认具有一致性。", "<strong>读数漂移：</strong>裂隙附近精密仪器出现系统性读数漂移，方向始终指向裂隙；漂移幅度与距离负相关，疑似空间张力对仪器的影响，尚未有明确解释。", "<strong>同源呼应：</strong>裂隙边缘的「呼吸」起伏频率，与无尽楼梯（SPA-0021）折叠点的位移周期存在约 0.3% 的偏差率——BRI 认为这是「同源假说」最有价值的观测数据。"],
      imacNote: "洛林裂隙是「空间结构同源假说」的核心样本，其与无尽楼梯（SPA-0021）的关联研究由 BRI 主导。鉴于裂隙位于洛林自由市边境、且对生命体存在致命吸引，IMAC 协调办公室已将其列为「优先级-贝塔」观察对象，由 BRI/晨星团联合执行边界测绘（三级响应）。任何组织在采取行动前必须提交完整方案并获得 IMAC 审批。未经授权的私自进入将被视为严重违规。",
      suggestedActions: ["完成联合边界测绘，建立裂隙边缘的长期监测信标阵列，记录「呼吸」起伏数据", "由 BRI 牵头比对裂隙呼吸频率与无尽楼梯折叠点位移数据，验证「同源假说」", "研究裂隙拉扯力的衰减规律，评估能否通过物理屏蔽降低接近风险"],
      internalNode: /*#__PURE__*/React.createElement(Restricted, {
        level: "internal",
        label: "\u673A\u5BC6\u7EA7\u5185\u5BB9",
        compact: true
      }, /*#__PURE__*/React.createElement("div", {
        className: "internal-note"
      }, /*#__PURE__*/React.createElement("p", {
        className: "internal-note-text"
      }, "\u3010\u8FB9\u754C\u7814\u7A76\u9662\u5185\u90E8\u8BC4\u4F30 \xB7 \u7A7A\u95F4\u5F02\u5E38\u7814\u7A76\u6240\u3011", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u6D1B\u6797\u88C2\u9699\u662F\u6211\u6700\u60F3\u5F04\u61C2\u3001\u53C8\u6700\u6015\u5F04\u61C2\u7684\u5F02\u5E38\u2014\u2014\u5B83\u5C31\u5728\u5730\u8868\u4E0A\u7ACB\u7740\uFF0C\u770B\u5F97\u89C1\u6478\u5F97\u7740\uFF0C\u53EF\u5B83\u5230\u5E95\u662F\u4EC0\u4E48\uFF0C\u6211\u4EEC\u8FDE\u8FB9\u90FD\u6CA1\u6478\u5230\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u6700\u521D\u63A5\u624B\u65F6\u6211\u4EE5\u4E3A\u5B83\u662F\u4E00\u9053\u300C\u95E8\u300D\uFF0C\u540E\u6765\u53D1\u73B0\u5B83\u8FDE\u95E8\u90FD\u7B97\u4E0D\u4E0A\u2014\u2014\u5B83\u4E0D\u5438\u5165\u4EFB\u4F55\u4E1C\u897F\uFF0C\u53EA\u662F\u62C9\u626F\uFF0C\u53EA\u662F\u8BA9\u9760\u8FD1\u7684\u4EBA\u6D88\u5931\u3002\u8FD9\u79CD\u300C\u53EA\u5BF9\u751F\u547D\u4F53\u8D77\u4F5C\u7528\u7684\u62C9\u626F\u300D\u5728\u7269\u7406\u4E0A\u5F88\u96BE\u89E3\u91CA\uFF0C\u9664\u975E\u6211\u4EEC\u627F\u8BA4\uFF1A\u88C2\u9699\u672C\u8EAB\u5C31\u6709\u300C\u610F\u56FE\u300D\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u4E0E\u65E0\u5C3D\u697C\u68AF\u7684\u540C\u6B65\u6570\u636E\u662F\u8FD9\u51E0\u5E74\u6700\u8BA9\u6211\u5174\u594B\u7684\u53D1\u73B0\u30020.3% \u7684\u504F\u5DEE\u7387\u5728\u4EEA\u5668\u8BEF\u5DEE\u8303\u56F4\u5185\uFF0C\u4F46\u4E24\u5904\u5F02\u5E38\u76F8\u8DDD\u4E0D\u8FC7\u767E\u4F59\u516C\u91CC\uFF0C\u5468\u671F\u5374\u5982\u6B64\u63A5\u8FD1\u2014\u2014\u6211\u503E\u5411\u4E8E\u76F8\u4FE1\u5B83\u4EEC\u6765\u81EA\u540C\u4E00\u4E2A\u6E90\u5934\u3002\u5982\u679C\u8FD9\u4E2A\u5047\u8BF4\u6210\u7ACB\uFF0C\u6D1B\u6797\u88C2\u9699\u5C31\u4E0D\u518D\u662F\u5B64\u4F8B\uFF0C\u800C\u662F\u4E00\u6574\u4E2A\u300C\u7A7A\u95F4\u7ED3\u6784\u6E90\u300D\u5728\u5730\u8868\u7684\u4E24\u4E2A\u7834\u53E3\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u5904\u7F6E\u4E0A\uFF0C\u6211\u8D5E\u6210\u7EF4\u6301\u8FB9\u754C\u6D4B\u7ED8\u4E0E\u8FDC\u8DDD\u76D1\u6D4B\uFF0C\u4E0D\u9F13\u52B1\u63A5\u8FD1\u88C2\u9699\u8FB9\u7F18\u2014\u2014\u6211\u4EEC\u635F\u5931\u7684\u4EBA\u5DF2\u7ECF\u591F\u591A\u4E86\uFF0C\u800C\u6BCF\u4E00\u6B21\u635F\u5931\uFF0C\u88C2\u9699\u8FB9\u7F18\u90FD\u6CA1\u6709\u7559\u4E0B\u4EFB\u4F55\u75D5\u8FF9\uFF0C\u597D\u50CF\u90A3\u4E9B\u4EBA\u4ECE\u672A\u5B58\u5728\u8FC7\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u8FD9\u8BA9\u6211\u4E0D\u5B89\u3002\u6BD4\u8D77\u770B\u4E0D\u89C1\u7684\u654C\u4EBA\uFF0C\u6211\u66F4\u6015\u8FD9\u79CD\u300C\u4EFF\u4F5B\u4EC0\u4E48\u90FD\u6CA1\u53D1\u751F\u300D\u7684\u6D88\u5931\u3002"), /*#__PURE__*/React.createElement("div", {
        className: "internal-note-signature"
      }, "\u2014 \u987E\u8FDC\u821F \xB7 \u8FB9\u754C\u7814\u7A76\u9662\u9662\u957F \xB7 \u7A7A\u95F4\u5F02\u5E38\u7814\u7A76\u6240")))
    };
    return /*#__PURE__*/React.createElement(AnomalyDossier, {
      data: riftData
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
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
      `), /*#__PURE__*/React.createElement("div", {
    className: "detail-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-auth-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-auth-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-auth-status"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, "\u5DF2\u8BA4\u8BC1 \xB7 \u8BBF\u95EE\u7EA7\u522B\uFF1A\u6807\u51C6 / ACCESS LEVEL: STANDARD")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      color: "var(--text-muted)",
      cursor: "pointer",
      letterSpacing: "0.1em"
    },
    onClick: () => navigate("/")
  }, "\u9000\u51FA\u8BA4\u8BC1"))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-breadcrumbs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-crumb",
    onClick: () => navigate("/")
  }, "\u9996\u9875"), /*#__PURE__*/React.createElement("span", {
    className: "detail-crumb-sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "detail-crumb",
    onClick: () => navigate("/database")
  }, "\u5F02\u5E38\u4FE1\u606F\u6570\u636E\u5E93"), /*#__PURE__*/React.createElement("span", {
    className: "detail-crumb-sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "detail-crumb current"
  }, "LOA-0073 \u8D64\u6708\u5B66\u9662")), /*#__PURE__*/React.createElement("div", {
    className: "detail-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-file-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-file-id"
  }, "LOA-0073"), /*#__PURE__*/React.createElement("h1", {
    className: "detail-title"
  }, "\u8D64\u6708\u5B66\u9662"), /*#__PURE__*/React.createElement("span", {
    className: "detail-title-en"
  }, "CRIMSON MOON ACADEMY \xB7 ABYSSAL")), /*#__PURE__*/React.createElement("div", {
    className: "stamp"
  }, "\u7EDD\u5BC6 \xB7 EYES ONLY")), /*#__PURE__*/React.createElement("table", {
    className: "detail-info-table"
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u5F02\u5E38\u7F16\u53F7"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "detail-file-id",
    style: {
      fontSize: "18px"
    }
  }, "LOA-0073")), /*#__PURE__*/React.createElement("th", null, "\u540D\u79F0"), /*#__PURE__*/React.createElement("td", null, "\u8D64\u6708\u5B66\u9662 \xB7 Crimson Moon Academy")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u6240\u5C5E\u7BA1\u8F96"), /*#__PURE__*/React.createElement("td", null, "\u8854\u5C3E\u86C7\u4E8B\u52A1\u6240 \xB7 Ouroboros Agency"), /*#__PURE__*/React.createElement("th", null, "\u9996\u6B21\u8BB0\u5F55"), /*#__PURE__*/React.createElement("td", null, "\u5B89\u73C0\u538628\u5E74 \xB7 \u79CB")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u5F02\u5E38\u7B49\u7EA7"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "level-badge-inline",
    style: {
      color: "#c42828",
      borderColor: "#c42828",
      backgroundColor: "rgba(196,40,40,0.15)"
    }
  }, "\u6DF1\u6E0A\u7EA7 \xB7 ABYSSAL")), /*#__PURE__*/React.createElement("th", null, "\u5F53\u524D\u72B6\u6001"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "status-active-text",
    style: {
      color: "#c42828"
    }
  }, "\u25CF \u6D3B\u8DC3 ACTIVE"))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u751F\u8FD8\u7387"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "survival-rate-red"
  }, "\u7EA6 1.7%"), " \uFF08116\u4EBA\u8FDB\u5165\uFF0C2\u4EBA\u751F\u8FD8\u540E\u6B7B\u4EA1\uFF09"), /*#__PURE__*/React.createElement("th", null, "\u6863\u6848\u66F4\u65B0"), /*#__PURE__*/React.createElement("td", null, "\u5B89\u73C0\u538639\u5E74 \xB7 \u79CB")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u5F53\u524D\u6279\u6B21"), /*#__PURE__*/React.createElement("td", {
    style: {
      color: "var(--accent-red-bright)"
    },
    colSpan: 3
  }, "\u7B2C\u5341\u4E00\u5C4A \xB7 \u8FDB\u884C\u4E2D \xB7 IMAC\u8054\u5408\u884C\u52A8\uFF08BRI/\u8854\u5C3E\u86C7\u8054\u5408\u6D3E\u9063 \xB7 6\u4EBA \xB7 \u5168\u5458\u5931\u8054\uFF09")))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 01"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u53D1\u73B0\u7ECF\u8FC7")), /*#__PURE__*/React.createElement("div", {
    className: "file-section-text"
  }, /*#__PURE__*/React.createElement("p", null, "\u5B89\u73C0\u538628\u5E74\u79CB\uFF0C\u9E23\u6D77\u57CE\u897F\u533A\u4E00\u6240\u5E9F\u5F03\u4E2D\u5B66\u539F\u5740\u4E0A\u7A81\u7136\u51FA\u73B0\u4E86\u5B8C\u6574\u7684\u6821\u56ED\u5EFA\u7B51\u7FA4\u3002 \u5F53\u5730\u5C45\u6C11\u62A5\u544A\u79F0\u524D\u4E00\u65E5\u8BE5\u5904\u8FD8\u662F\u4E00\u7247\u62C6\u8FC1\u5DE5\u5730\uFF0C\u4E00\u591C\u4E4B\u95F4\u51FA\u73B0\u4E86\u5360\u5730\u7EA6\u4E09\u4E07\u5E73\u65B9\u7C73\u7684\u5B66\u9662\u5EFA\u7B51\u3002 \u9996\u6279\u8FDB\u5165\u8C03\u67E5\u7684\u4E94\u540D\u8B66\u5458\u65E0\u4E00\u8FD4\u56DE\u3002\u8854\u5C3E\u86C7\u4E8B\u52A1\u6240\u63A5\u7BA1\u540E\uFF0C\u6D3E\u51FA\u7B2C\u4E00\u652F\u5341\u4E8C\u4EBA\u4E13\u4E1A\u961F\u4F0D\uFF0C \u540C\u6837\u5168\u5458\u5931\u8E2A\u3002\u81F3\u6B64\u786E\u8BA4\u4E3AS\u7EA7\u4EE5\u4E0A\u5F02\u5E38\uFF0C\u540E\u7ECF\u91CD\u65B0\u8BC4\u7EA7\u5B9A\u4E3A\u6DF1\u6E0A\u7EA7\u3002"), /*#__PURE__*/React.createElement("p", null, "\u5F02\u5E38\u5165\u53E3\u4F4D\u7F6E\u4E0D\u56FA\u5B9A\uFF0C\u6709\u65F6\u662F\u4E00\u6247\u95E8\uFF0C\u6709\u65F6\u662F\u4E00\u9762\u5899\uFF0C\u751A\u81F3\u53EF\u80FD\u662F\u5730\u94C1\u8F66\u53A2\u7684\u67D0\u4E00\u8282\u3002 \u88AB\u62C9\u5165\u8005\u7684\u5171\u540C\u7279\u5F81\u662F\u300C\u6B63\u5728\u72EC\u5904\u300D\u2014\u2014\u8FD9\u662F\u76EE\u524D\u552F\u4E00\u53EF\u786E\u8BA4\u7684\u9009\u53D6\u89C4\u5F8B\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 02"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u57FA\u672C\u7279\u5F81")), /*#__PURE__*/React.createElement("div", {
    className: "file-section-text"
  }, /*#__PURE__*/React.createElement("p", null, "\u8D64\u6708\u5B66\u9662\u662F\u4E00\u5EA7\u5178\u578B\u7684", /*#__PURE__*/React.createElement("strong", null, "\u53D9\u4E8B\u578B\u5F02\u5E38"), "\u3002\u8FDB\u5165\u8005\u4F1A\u88AB\u5206\u914D\u4E00\u4E2A\u300C\u5B66\u751F\u300D\u8EAB\u4EFD\uFF0C \u5E76\u83B7\u5F97\u5C5E\u4E8E\u81EA\u5DF1\u7684\u300C\u5267\u60C5\u4E66\u300D\u3002\u5267\u60C5\u4E66\u5185\u5BB9\u56E0\u4EBA\u800C\u5F02\uFF0C\u8BB0\u8F7D\u4E86\u8BE5\u89D2\u8272\u5728\u6821\u56ED\u4E2D\u7684\u8EAB\u4EFD\u3001 \u4EBA\u9645\u5173\u7CFB\u3001\u4EE5\u53CA\u9700\u8981\u5B8C\u6210\u7684\u300C\u5267\u60C5\u4EFB\u52A1\u300D\u3002\u4E25\u91CD\u504F\u79BB\u5267\u60C5\u8BBE\u5B9A\u5C06\u89E6\u53D1\u60E9\u7F5A\u3002"), /*#__PURE__*/React.createElement("p", null, "\u5F02\u5E38\u7684\u5929\u7A7A\u6C38\u8FDC\u662F\u6697\u7EA2\u8272\u7684\uFF0C\u60AC\u6302\u7740\u4E00\u8F6E\u5DE8\u5927\u7684\u7EA2\u8272\u6708\u4EAE\u2014\u2014\u8FD9\u4E5F\u662F\u300C\u8D64\u6708\u5B66\u9662\u300D\u540D\u79F0\u7684\u7531\u6765\u3002 \u6708\u4EAE\u7684\u5927\u5C0F\u548C\u4F4D\u7F6E\u4F1A\u53D8\u5316\uFF0C\u4F46\u6C38\u8FDC\u4E0D\u4F1A\u843D\u4E0B\u3002\u5F02\u5E38\u5185\u90E8\u6CA1\u6709\u592A\u9633\uFF0C\u4E5F\u6CA1\u6709\u663C\u591C\u4EA4\u66FF\uFF0C \u65F6\u95F4\u901A\u8FC7\u949F\u697C\u7684\u949F\u58F0\u548C\u5BBF\u820D\u7184\u706F\u6765\u6807\u8BB0\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 03"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u5185\u90E8\u73AF\u5883 \xB7 \u5B66\u9662\u5E73\u9762\u56FE"), /*#__PURE__*/React.createElement("span", {
    className: "tag danger"
  }, "\u4EA4\u4E92\u5730\u56FE \xB7 INTERACTIVE")), /*#__PURE__*/React.createElement("div", {
    className: "academy-map-wrapper"
  }, /*#__PURE__*/React.createElement(Restricted, {
    level: "internal",
    label: "\u673A\u5BC6\u7EA7\u5185\u5BB9"
  }, /*#__PURE__*/React.createElement(AcademyMap, null)))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 04"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u5DF2\u786E\u8BA4\u89C4\u5219"), /*#__PURE__*/React.createElement("span", {
    className: "tag verified"
  }, "\u5DF2\u9A8C\u8BC1 \xB7 VERIFIED")), /*#__PURE__*/React.createElement("div", {
    className: "rules-list"
  }, verifiedRules.map(rule => /*#__PURE__*/React.createElement("div", {
    key: rule.num,
    className: "rule-item verified"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rule-num"
  }, rule.num), /*#__PURE__*/React.createElement("div", {
    className: "rule-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rule-title"
  }, "\u89C4\u5219", rule.num, "\uFF1A", rule.title, /*#__PURE__*/React.createElement("span", {
    className: "rule-tag"
  }, "\u5DF2\u9A8C\u8BC1")), /*#__PURE__*/React.createElement("p", {
    className: "rule-desc"
  }, rule.desc)))))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 05"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u63A8\u6D4B\u89C4\u5219"), /*#__PURE__*/React.createElement("span", {
    className: "tag pending"
  }, "\u5F85\u9A8C\u8BC1 \xB7 UNCONFIRMED")), /*#__PURE__*/React.createElement("ul", {
    className: "speculated-list"
  }, speculatedRules.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, r)))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 06"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u8FDB\u5165\u8BB0\u5F55")), /*#__PURE__*/React.createElement("table", {
    className: "entry-records"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u5C4A\u6B21"), /*#__PURE__*/React.createElement("th", null, "\u5E74\u4EFD"), /*#__PURE__*/React.createElement("th", null, "\u8FDB\u5165\u4EBA\u6570"), /*#__PURE__*/React.createElement("th", null, "\u4E3B\u5BFC\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("th", null, "\u7ED3\u679C"))), /*#__PURE__*/React.createElement("tbody", null, entryRecords.map(rec => /*#__PURE__*/React.createElement(React.Fragment, {
    key: rec.term
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    className: "term"
  }, rec.term, rec.current && /*#__PURE__*/React.createElement("span", {
    className: "current-tag"
  }, "\u5F53\u524D")), /*#__PURE__*/React.createElement("td", null, rec.year), /*#__PURE__*/React.createElement("td", {
    className: "count"
  }, rec.count), /*#__PURE__*/React.createElement("td", null, rec.org), /*#__PURE__*/React.createElement("td", {
    className: rec.status
  }, rec.result)), rec.current && rec.members && /*#__PURE__*/React.createElement("tr", {
    className: "current-members-row"
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: 5
  }, /*#__PURE__*/React.createElement("div", {
    className: "current-members-label"
  }, "\u961F\u5458\u6784\u6210 \xB7 TEAM ROSTER"), /*#__PURE__*/React.createElement("div", {
    className: "current-members-grid"
  }, rec.members.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `member-card ${m.isLeader ? "member-leader" : ""} ${m.orgType === "civilian" ? "member-civilian" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "member-name"
  }, m.name, m.isLeader && /*#__PURE__*/React.createElement("span", {
    className: "member-leader-tag"
  }, "\u961F\u957F"), m.orgType === "civilian" && /*#__PURE__*/React.createElement("span", {
    className: "member-civilian-tag"
  }, "\u5E73\u6C11")), /*#__PURE__*/React.createElement("div", {
    className: "member-rank"
  }, m.rank), /*#__PURE__*/React.createElement("div", {
    className: "member-org"
  }, m.org), /*#__PURE__*/React.createElement("div", {
    className: "member-role"
  }, m.role))))))))))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 07"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u7279\u6B8A\u73B0\u8C61")), /*#__PURE__*/React.createElement("ul", {
    className: "phenomena-list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u89C4\u5219\u81EA\u6211\u4FEE\u6B63\u8FF9\u8C61\uFF1A"), "\u7B2C\u56DB\u5C4A\u8FDB\u5165\u540E\uFF0C\u300C\u5267\u60C5\u4E66\u300D\u7684\u5185\u5BB9\u660E\u663E\u6BD4\u7B2C\u4E00\u5C4A\u66F4\u4E3A\u590D\u6742\u548C\u7CBE\u7EC6\uFF0C\u7591\u4F3C\u5F02\u5E38\u5177\u6709\u5B66\u4E60\u548C\u8FDB\u5316\u80FD\u529B\u3002"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u751F\u8FD8\u8005\u5171\u6027\u540E\u9057\u75C7\uFF1A"), "\u4EC5\u6709\u7684\u4E24\u540D\u4E49\u751F\u8FD8\u8005\u5747\u5728\u8FD4\u56DE\u540E\u4E09\u5E74\u5185\u6B7B\u4EA1\uFF0C\u6B7B\u56E0\u5747\u4E3A\u300C\u5728\u7761\u68A6\u4E2D\u505C\u6B62\u547C\u5438\u300D\u3002\u5C38\u68C0\u65E0\u5F02\u5E38\u3002"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u62C9\u5165\u673A\u5236\u4E0D\u53EF\u9884\u6D4B\uFF1A"), "\u5165\u53E3\u51FA\u73B0\u5B8C\u5168\u968F\u673A\uFF0C\u53D7\u5BB3\u8005\u53EF\u80FD\u5728\u5BB6\u4E2D\u3001\u529E\u516C\u5BA4\u3001\u751A\u81F3\u884C\u9A76\u7684\u8F66\u8F86\u4E2D\u88AB\u62C9\u5165\u3002\u65E0\u9884\u8B66\u65F6\u95F4\u3002"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u300C\u767D\u73AB\u7470\u300D\u73B0\u8C61\uFF1A"), "\u591A\u540D\u751F\u8FD8\u8005\uFF08\u542B\u6B7B\u540E\uFF09\u7684\u79C1\u4EBA\u7269\u54C1\u4E2D\u53D1\u73B0\u4E86\u5E72\u71E5\u7684\u767D\u8272\u73AB\u7470\u82B1\u74E3\uFF0C\u6765\u6E90\u4E0D\u660E\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 08"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u5907\u6CE8")), /*#__PURE__*/React.createElement("div", {
    className: "note-box"
  }, /*#__PURE__*/React.createElement("p", {
    className: "note-text"
  }, "\u8D64\u6708\u5B66\u9662\u662F\u76EE\u524D\u5DF2\u77E5\u6301\u7EED\u65F6\u95F4\u6700\u957F\u3001\u81F4\u6B7B\u7387\u6700\u9AD8\u7684\u6DF1\u6E0A\u7EA7\u5F02\u5E38\u4E4B\u4E00\u3002 \u9274\u4E8E\u5176\u4E0D\u53EF\u9884\u6D4B\u7684\u62C9\u5165\u673A\u5236\u548C\u6781\u9AD8\u7684\u6B7B\u4EA1\u7387\uFF0CIMAC \u534F\u8C03\u529E\u516C\u5BA4\u5DF2\u5C06\u5176\u5217\u4E3A \u300C\u4F18\u5148\u7EA7-\u963F\u5C14\u6CD5\u300D\u89C2\u5BDF\u5BF9\u8C61\u3002\u4EFB\u4F55\u7EC4\u7EC7\u5728\u91C7\u53D6\u884C\u52A8\u524D\u5FC5\u987B\u63D0\u4EA4\u5B8C\u6574\u65B9\u6848\u5E76\u83B7\u5F97 IMAC \u5BA1\u6279\u3002 \u672A\u7ECF\u6388\u6743\u7684\u79C1\u81EA\u8FDB\u5165\u5C06\u88AB\u89C6\u4E3A\u4E25\u91CD\u8FDD\u89C4\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "14px",
      paddingTop: "12px",
      borderTop: "1px dashed rgba(196, 40, 40, 0.2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      color: "var(--accent-red-bright)",
      letterSpacing: "0.15em",
      marginBottom: "8px"
    }
  }, "\u5EFA\u8BAE\u540E\u7EED\u884C\u52A8"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "13px",
      color: "var(--text-secondary)",
      lineHeight: "1.8",
      margin: 0
    }
  }, "\u5728\u6761\u4EF6\u6210\u719F\u524D\uFF0C\u4E0D\u5EFA\u8BAE\u7EC4\u7EC7\u5927\u89C4\u6A21\u8FDB\u5165\u3002\u4F18\u5148\u7EF4\u6301\u5916\u56F4\u76D1\u6D4B\uFF0C \u7B49\u5F85\u7B2C\u5341\u4E00\u5C4A\u5185\u90E8\u5B58\u6D3B\u8005\u7684\u4FE1\u6807\u72B6\u6001\u53D8\u5316\u2014\u2014\u65E0\u8BBA\u5176\u6700\u7EC8\u6062\u590D\u6B63\u5E38\u6216\u5B8C\u5168\u6D88\u5931\uFF0C \u90FD\u5C06\u4E3A\u8BE5\u5F02\u5E38\u7684\u89E3\u6790\u63D0\u4F9B\u5173\u952E\u4FE1\u606F\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "internal-note"
  }, /*#__PURE__*/React.createElement(Restricted, {
    level: "internal",
    label: "\u673A\u5BC6\u7EA7\u5185\u5BB9",
    compact: true
  }, /*#__PURE__*/React.createElement("p", {
    className: "internal-note-text"
  }, "\u3010\u8854\u5C3E\u86C7\u4E8B\u52A1\u6240\u5185\u90E8\u8BC4\u4F30 \xB7 \u9996\u5E2D\u6EAF\u754C\u8005 \u9646\u6C89\u821F\u3011", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u8D64\u6708\u5B66\u9662\u662F\u6211\u804C\u4E1A\u751F\u6DAF\u91CC\u6700\u8BA9\u6211\u4E0D\u5B89\u7684\u4E00\u4E2A\u5F02\u5E38\u2014\u2014\u56E0\u4E3A\u5B83\u4E0D\u50CF\u5F02\u5E38\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u5341\u4E00\u5C4A\uFF0C\u4E00\u767E\u4E00\u5341\u516D\u4EBA\uFF0C\u6CA1\u6709\u4E00\u4E2A\u4EBA\u662F\u88AB\u89C4\u5219\u76F4\u63A5\u6740\u6B7B\u7684\uFF1A\u4ED6\u4EEC\u8981\u4E48\u5931\u8E2A\uFF0C\u8981\u4E48\u300C\u5267\u60C5\u5931\u8D25\u300D\u540E\u6D88\u5931\uFF0C\u8981\u4E48\u540C\u5316\u3002 \u5E38\u89C4\u6DF1\u6E0A\u7EA7\u5F02\u5E38\u662F\u300C\u4E3B\u52A8\u6740\u4EBA\u300D\u7684\uFF0C\u8D64\u6708\u5B66\u9662\u4E0D\u50CF\u3002\u5B83\u66F4\u50CF\u662F\u5728\u300C\u7B5B\u9009\u300D\u4EC0\u4E48\u2014\u2014\u6211\u8BF4\u4E0D\u6E05\u5B83\u5728\u7B5B\u9009\u4EC0\u4E48\uFF0C\u4F46\u90A3\u79CD\u611F\u89C9\u6325\u4E4B\u4E0D\u53BB\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u767D\u73AB\u7470\u82B1\u56ED\u662F\u8FD9\u4E00\u5207\u7684\u94A5\u5319\u3002\u6240\u6709\u63A5\u8FD1\u8FC7\u6838\u5FC3\u533A\u57DF\u7684\u4EBA\uFF0C\u5373\u4F7F\u56DE\u6765\u4E86\uFF0C\u4E5F\u90FD\u53D8\u4E86\u3002\u6211\u89C1\u8FC7\u4ED6\u4EEC\u7684\u773C\u775B\uFF0C\u90A3\u4E0D\u662F\u88AB\u5413\u51FA\u6765\u7684\uFF0C\u662F\u88AB\u300C\u770B\u8FC7\u300D\u4E4B\u540E\u7559\u4E0B\u7684\u4E1C\u897F\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u5904\u7F6E\u4E0A\u6211\u5EFA\u8BAE\u7EF4\u6301\u5916\u56F4\u76D1\u6D4B\uFF0C\u6682\u4E0D\u7EC4\u7EC7\u5927\u89C4\u6A21\u8FDB\u5165\uFF1B\u7B2C\u5341\u4E00\u5C4A\u5185\u90E8\u5B58\u6D3B\u8005\u7684\u4FE1\u6807\u5FC5\u987B\u76EF\u4F4F\u2014\u2014\u65E0\u8BBA\u5B83\u6062\u590D\u6B63\u5E38\u8FD8\u662F\u5F7B\u5E95\u6D88\u5931\uFF0C\u90FD\u4F1A\u544A\u8BC9\u6211\u4EEC\u7B54\u6848\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u81F3\u4E8E\u76F4\u89C9\u7684\u90E8\u5206\uFF0C\u6863\u6848\u672C\u4E0D\u8BE5\u5199\uFF0C\u4F46\u6211\u8FD8\u662F\u60F3\u5199\uFF1A\u6211\u603B\u89C9\u5F97\uFF0C\u8FD9\u5EA7\u5B66\u9662\u5728\u7B49\u5F85\u67D0\u4E2A\u4EBA\uFF0C\u6216\u8005\u8BF4\uFF0C\u5728\u7B49\u67D0\u4E2A\u300C\u5B66\u751F\u300D\u6BD5\u4E1A\u3002\u7B49\u5B83\u771F\u6B63\u300C\u6BD5\u4E1A\u300D\u7684\u90A3\u5929\uFF0C\u6211\u4EEC\u6700\u597D\u5DF2\u7ECF\u51C6\u5907\u597D\u4E86\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "internal-note-signature"
  }, "\u2014 \u9646\u6C89\u821F \xB7 \u9996\u5E2D\u6EAF\u754C\u8005 \xB7 \u754C\u6807")))), /*#__PURE__*/React.createElement("div", {
    className: "file-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-meta"
  }, "FILE ID: LOA-0073 / VER: 39.2 / CLASSIFICATION: EYES ONLY"), /*#__PURE__*/React.createElement("div", {
    className: "file-meta"
  }, "LAST UPDATED: \u5B89\u73C0\u538639\u5E74\xB7\u6625")), /*#__PURE__*/React.createElement("div", {
    className: "file-archive-notice"
  }, "\u672C\u6863\u6848\u5DF2\u7EB3\u5165 IMAC \u5168\u7403\u5F02\u5E38\u4FE1\u606F\u603B\u5E93\uFF0C\u672A\u7ECF IMAC \u8054\u5408\u884C\u52A8\u6307\u6325\u4E2D\u5FC3\u6388\u6743\uFF0C\u4E0D\u5F97\u64C5\u81EA\u590D\u5236\u6216\u4F20\u64AD\u3002", /*#__PURE__*/React.createElement("div", {
    className: "file-archive-signature"
  }, "\u2014\u2014 IMAC \u5F02\u5E38\u4FE1\u606F\u603B\u5E93 \xB7 \u5B89\u73C0\u538639\u5E74\u6625"))))));
}
window.AnomalyDetailPage = AnomalyDetailPage;