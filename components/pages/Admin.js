// System Administration page - TOP SECRET only
function AdminPage() {
  const {
    navigate
  } = useRouter();
  const {
    canAccess,
    authLevel
  } = useAuth();
  const [activeModule, setActiveModule] = React.useState(null);
  const [userSearch, setUserSearch] = React.useState("");
  const [userOrgFilter, setUserOrgFilter] = React.useState("all");
  const [userRankFilter, setRankFilter] = React.useState("all");
  const [userStatusFilter, setUserStatusFilter] = React.useState("all");
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [expandedOp, setExpandedOp] = React.useState(null);
  const [logFilter, setLogFilter] = React.useState("all");
  const [opStatusFilter, setOpStatusFilter] = React.useState("all");
  const scrollPosRef = React.useRef(0);
  const [activeUserPanel, setActiveUserPanel] = React.useState(null);
  const [approvalList, setApprovalList] = React.useState([{
    id: 1,
    name: "顾晚舟",
    code: "晚",
    rank: "溯界者",
    org: "边界研究院BRI",
    applyTime: "安珀历39年夏·15 14:23",
    status: "pending"
  }, {
    id: 2,
    name: "赵寒",
    code: "寒",
    rank: "资深溯界者",
    org: "北境守望",
    applyTime: "安珀历39年夏·14 09:47",
    status: "pending"
  }, {
    id: 3,
    name: "许清颜",
    code: "清",
    rank: "溯界者",
    org: "悬铃木学会",
    applyTime: "安珀历39年夏·13 16:10",
    status: "pending"
  }, {
    id: 4,
    name: "沈昼",
    code: "昼",
    rank: "见习溯界者",
    org: "衔尾蛇事务所",
    applyTime: "安珀历39年夏·12 11:35",
    status: "pending"
  }, {
    id: 5,
    name: "柳朝云",
    code: "云",
    rank: "研究员",
    org: "晨星团",
    applyTime: "安珀历39年夏·11 08:52",
    status: "pending"
  }, {
    id: 6,
    name: "白夜行者",
    code: "行",
    rank: "溯界者",
    org: "白夜哨站",
    applyTime: "安珀历39年夏·10 21:08",
    status: "pending"
  }, {
    id: 7,
    name: "长桥映",
    code: "映",
    rank: "初级研究员",
    org: "长桥会社",
    applyTime: "安珀历39年夏·09 13:22",
    status: "pending"
  }]);
  const [rankAdjList, setRankAdjList] = React.useState([{
    id: 1,
    name: "林砚",
    current: "机密级",
    target: "绝密级",
    reason: "衔尾蛇外勤一队副队长职务调整，需更高数据权限",
    applicant: "陈默",
    time: "安珀历39年夏·14"
  }, {
    id: 2,
    name: "顾泽鸣",
    current: "机密级",
    target: "绝密级",
    reason: "BRI空间异常所副所长提名，等待委员会审批",
    applicant: "顾远舟",
    time: "安珀历39年夏·12"
  }, {
    id: 3,
    name: "韩凛",
    current: "秘密级",
    target: "机密级",
    reason: "北境守望冻土探索营队长晋升，权限同步升级",
    applicant: "伊万·彼得罗夫",
    time: "安珀历39年夏·10"
  }, {
    id: 4,
    name: "温如言",
    current: "机密级",
    target: "绝密级",
    reason: "悬铃木学会认知异常组副组长接任，需升级权限",
    applicant: "苏悬铃",
    time: "安珀历39年夏·08"
  }, {
    id: 5,
    name: "方叙",
    current: "秘密级",
    target: "机密级",
    reason: "衔尾蛇外勤二队转正考核通过",
    applicant: "周野",
    time: "安珀历39年夏·06"
  }, {
    id: 6,
    name: "柳朝霜",
    current: "机密级",
    target: "绝密级",
    reason: "白夜哨站极夜行动队队长权限提升申请",
    applicant: "白夜指挥官",
    time: "安珀历39年夏·04"
  }]);
  const onlineUsers = [{
    name: "魏长风",
    org: "IMAC总部",
    loginTime: "07:42",
    ip: "10.0.0.12"
  }, {
    name: "顾远舟",
    org: "边界研究院BRI",
    loginTime: "08:15",
    ip: "10.1.3.44"
  }, {
    name: "江近月",
    org: "IMAC总部",
    loginTime: "06:55",
    ip: "10.0.0.23"
  }, {
    name: "陆明远",
    org: "晨星团",
    loginTime: "08:02",
    ip: "10.2.7.18"
  }, {
    name: "苏悬铃",
    org: "悬铃木学会",
    loginTime: "07:28",
    ip: "10.4.2.91"
  }, {
    name: "陈之岸",
    org: "边界研究院BRI",
    loginTime: "08:34",
    ip: "10.1.3.107"
  }, {
    name: "林砚",
    org: "衔尾蛇事务所",
    loginTime: "08:11",
    ip: "10.3.1.56"
  }, {
    name: "桥本彻",
    org: "长桥会社",
    loginTime: "09:02",
    ip: "10.6.0.8"
  }];
  const auditLogs = [{
    time: "09:02:17",
    user: "魏长风",
    action: "审批通过 LOA-0073 行动升级申请",
    module: "JRP审批"
  }, {
    time: "08:47:33",
    user: "江近月",
    action: "修改 XDPS 协议配置参数",
    module: "系统配置"
  }, {
    time: "08:21:05",
    user: "顾远舟",
    action: "查询 SPA-1120 异常档案",
    module: "档案访问"
  }, {
    time: "08:15:48",
    user: "陈默",
    action: "授权衔尾蛇外勤一队绝密级数据访问",
    module: "权限管理"
  }, {
    time: "07:58:29",
    user: "陆明远",
    action: "上传 PHA-0182 物理参数样本",
    module: "数据上传"
  }, {
    time: "07:42:11",
    user: "苏悬铃",
    action: "调整 CGB-0427 记忆重建方案",
    module: "方案编辑"
  }, {
    time: "07:16:40",
    user: "白夜指挥官",
    action: "新增 BW-0089 哨站人员调动",
    module: "人事管理"
  }];
  const handleApprove = id => {
    setApprovalList(list => list.map(a => a.id === id ? {
      ...a,
      status: "approved"
    } : a));
  };
  const handleReject = id => {
    setApprovalList(list => list.map(a => a.id === id ? {
      ...a,
      status: "rejected"
    } : a));
  };
  const handleConfirmRank = id => {
    setRankAdjList(list => list.map(a => a.id === id ? {
      ...a,
      status: "confirmed"
    } : a));
  };
  const handleCancelRank = id => {
    setRankAdjList(list => list.map(a => a.id === id ? {
      ...a,
      status: "cancelled"
    } : a));
  };
  const goToModule = m => {
    scrollPosRef.current = window.scrollY;
    setActiveModule(m);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const backToDashboard = () => {
    setActiveModule(null);
    setTimeout(() => {
      window.scrollTo({
        top: scrollPosRef.current,
        behavior: "auto"
      });
    }, 0);
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!canAccess("topsecret")) {
    return /*#__PURE__*/React.createElement("div", {
      className: "portal-denied"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "denied-box",
      style: {
        borderColor: "#7a3ab0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "12px",
        color: "#7a3ab0",
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.2em",
        marginBottom: "16px"
      }
    }, "TOP SECRET \xB7 ACCESS DENIED"), /*#__PURE__*/React.createElement("h2", {
      style: {
        color: "#b88ed9"
      }
    }, "\u6743\u9650\u4E0D\u8DB3"), /*#__PURE__*/React.createElement("p", null, "\u60A8\u7684\u6743\u9650\u7B49\u7EA7\u4E0D\u8DB3\u4EE5\u8BBF\u95EE\u7CFB\u7EDF\u7BA1\u7406\u9762\u677F\u3002", /*#__PURE__*/React.createElement("br", null), "\u6B64\u9875\u9762\u4EC5\u9650\u7EDD\u5BC6\u7EA7\u6388\u6743\u4EBA\u5458\u3002"), /*#__PURE__*/React.createElement("button", {
      className: "btn-primary",
      onClick: () => navigate("/portal")
    }, "\u8FD4\u56DE\u6307\u6325\u4E2D\u5FC3"))));
  }
  const systemStatus = [{
    name: "中央数据库",
    status: "online",
    ping: "12ms"
  }, {
    name: "全球通讯网络",
    status: "online",
    ping: "47ms"
  }, {
    name: "北境节点",
    status: "online",
    ping: "128ms"
  }, {
    name: "北极节点",
    status: "degraded",
    ping: "340ms"
  }, {
    name: "东境节点",
    status: "online",
    ping: "68ms"
  }, {
    name: "南境节点",
    status: "online",
    ping: "92ms"
  }, {
    name: "西境节点",
    status: "online",
    ping: "56ms"
  }, {
    name: "心理监测网络",
    status: "online",
    ping: "23ms"
  }];
  const dbStats = [{
    code: "SP",
    name: "空间类",
    count: 4287,
    unsolved: 128,
    newThisWeek: 8
  }, {
    code: "TM",
    name: "时间类",
    count: 892,
    unsolved: 34,
    newThisWeek: 1
  }, {
    code: "PH",
    name: "物理类",
    count: 1204,
    unsolved: 67,
    newThisWeek: 4
  }, {
    code: "CG",
    name: "认知类",
    count: 1567,
    unsolved: 92,
    newThisWeek: 6
  }, {
    code: "EN",
    name: "实体类",
    count: 734,
    unsolved: 45,
    newThisWeek: 3
  }, {
    code: "LO",
    name: "地点类",
    count: 2341,
    unsolved: 156,
    newThisWeek: 3
  }, {
    code: "OB",
    name: "物品类",
    count: 987,
    unsolved: 38,
    newThisWeek: 2
  }];
  const users = [
  // 界标级 / 创始人
  {
    name: "艾伦·维斯特",
    code: "维",
    id: "IMAC-HQ-0000",
    rank: "界标级",
    org: "IMAC总部",
    status: "荣誉",
    access: "绝密级",
    department: "荣誉创始人 · 溯界者命名者",
    ops: 0,
    hours: 0,
    lastOp: "安珀历元年 · 首次溯界",
    note: "安珀历元年人物，「溯界者」一词的命名者。首任IMAC行动总协调官，主导建立了全球异常应对框架。"
  }, {
    name: "陈默",
    code: "默",
    id: "IMAC-OA-0001",
    rank: "界标级",
    org: "衔尾蛇事务所",
    status: "荣誉",
    access: "绝密级",
    department: "衔尾蛇创始人 · 第一任所长",
    ops: 312,
    hours: 4210,
    lastOp: "安珀历12年 · 衔尾蛇之环",
    note: "衔尾蛇事务所三位创始人之首，提出了「规则先于探索」的核心理念。"
  }, {
    name: "方晴",
    code: "晴",
    id: "IMAC-OA-0002",
    rank: "首席溯界者",
    org: "衔尾蛇事务所",
    status: "荣誉",
    access: "绝密级",
    department: "衔尾蛇创始人 · 规则研究部",
    ops: 278,
    hours: 3542,
    lastOp: "安珀历15年 · 回声回廊",
    note: "衔尾蛇三位创始人之一，规则分析体系的建立者。"
  }, {
    name: "周野",
    code: "野",
    id: "IMAC-OA-0003",
    rank: "界标级",
    org: "衔尾蛇事务所",
    status: "荣誉",
    access: "绝密级",
    department: "衔尾蛇创始人 · 行动部",
    ops: 295,
    hours: 3876,
    lastOp: "安珀历18年 · 深渊之门",
    note: "衔尾蛇三位创始人之一，率领首批外勤队完成百次以上深入探索。"
  }, {
    name: "伊万·彼得罗夫",
    code: "冰",
    id: "IMAC-NW-0001",
    rank: "界标级",
    org: "北境守望",
    status: "荣誉",
    access: "绝密级",
    department: "北境守望创始人",
    ops: 187,
    hours: 2890,
    lastOp: "安珀历7年 · 冻原深渊",
    note: "北境守望创始人，极圈异常研究的开创者。"
  }, {
    name: "白夜指挥官",
    code: "夜",
    id: "IMAC-WNP-0001",
    rank: "界标级",
    org: "白夜哨站",
    status: "在岗",
    access: "绝密级",
    department: "白夜哨站 · 总指挥官",
    ops: 203,
    hours: 2654,
    lastOp: "安珀历37年 · 极夜之门",
    note: "白夜哨站最高指挥官，极夜地区异常防线的建立者。"
  }, {
    name: "长桥源三",
    code: "桥",
    id: "IMAC-LBC-0001",
    rank: "界标级",
    org: "长桥会社",
    status: "荣誉",
    access: "绝密级",
    department: "长桥会社 · 初代总协调官",
    ops: 221,
    hours: 2987,
    lastOp: "安珀历9年 · 桥之彼端",
    note: "长桥会社创始人，东岛异常研究先驱。"
  },
  // 首席级 / 现任高层
  {
    name: "魏长风",
    code: "风",
    id: "IMAC-HQ-0001",
    rank: "行动总协调官",
    org: "IMAC总部",
    status: "在岗",
    access: "绝密级",
    department: "联合行动指挥中心",
    ops: 256,
    hours: 3124,
    lastOp: "—",
    note: "IMAC现任行动总协调官，统筹全球联合行动。"
  }, {
    name: "顾远舟",
    code: "远",
    id: "IMAC-BRI-0001",
    rank: "首席研究员",
    org: "边界研究院BRI",
    status: "在岗",
    access: "绝密级",
    department: "BRI院长 · 空间异常研究所",
    ops: 156,
    hours: 1987,
    lastOp: "PHB-0815 重力偏移区",
    note: "边界研究院BRI现任院长，空间异常领域权威。"
  }, {
    name: "陆明远",
    code: "明",
    id: "IMAC-MC-0001",
    rank: "首席科学家",
    org: "晨星团",
    status: "在岗",
    access: "绝密级",
    department: "晨星团首席科学家 · 物理异常组",
    ops: 112,
    hours: 1432,
    lastOp: "PHA-0182 洛林裂隙",
    note: "晨星团首席科学家，物理法则类异常研究领军者。"
  }, {
    name: "苏悬铃",
    code: "铃",
    id: "IMAC-PS-0001",
    rank: "首席溯界者",
    org: "悬铃木学会",
    status: "在岗",
    access: "绝密级",
    department: "悬铃木学会会长",
    ops: 98,
    hours: 1256,
    lastOp: "CGA-0713 旧图书馆",
    note: "悬铃木学会现任会长，认知异常与记忆研究专家。"
  }, {
    name: "薛定澜",
    code: "澜",
    id: "IMAC-4W-0001",
    rank: "界标级",
    org: "第四面墙",
    status: "在岗",
    access: "绝密级",
    department: "第四面墙主管",
    ops: 0,
    hours: 0,
    lastOp: "—",
    note: "第四面墙最高主管，负责跨现实边界监控与协议维护。身份信息大部分加密。"
  }, {
    name: "江近月",
    code: "月",
    id: "IMAC-HQ-0023",
    rank: "高级管理员",
    org: "IMAC总部",
    status: "在岗",
    access: "绝密级",
    department: "技术局 · 系统运维",
    ops: 45,
    hours: 512,
    lastOp: "系统运维",
    note: "IMAC技术局核心成员，XDPS协议栈主要维护者。"
  },
  // 赤月学院 LOA-0073 行动队（衔尾蛇/BRI联合）
  {
    name: "沈彻",
    code: "彻",
    id: "IMAC-OA-0047",
    rank: "资深溯界者",
    org: "衔尾蛇事务所",
    status: "失联",
    access: "机密级",
    department: "外勤一队 · 队长 · LOA-0073行动指挥",
    ops: 128,
    hours: 1847,
    lastOp: "LOA-0073 赤月学院",
    note: "赤月学院异常介入行动总指挥，衔尾蛇外勤一队队长。夏·29 最后通讯后失联。"
  }, {
    name: "季明轩",
    code: "明",
    id: "IMAC-OA-0189",
    rank: "溯界者",
    org: "衔尾蛇事务所",
    status: "失联",
    access: "机密级",
    department: "外勤一队 · 队员",
    ops: 42,
    hours: 568,
    lastOp: "LOA-0073 赤月学院",
    note: "衔尾蛇外勤一队成员，随沈彻进入赤月学院，夏·29 同队失联。"
  }, {
    name: "顾泽鸣",
    code: "泽",
    id: "IMAC-BRI-0247",
    rank: "资深溯界者",
    org: "边界研究院BRI",
    status: "失联",
    access: "机密级",
    department: "空间异常研究所 · BRI队长",
    ops: 87,
    hours: 1123,
    lastOp: "LOA-0073 赤月学院",
    note: "BRI空间异常研究所资深研究员，赤月行动BRI分队队长。夏·29 同队失联。"
  }, {
    name: "林薇",
    code: "薇",
    id: "IMAC-BRI-0356",
    rank: "溯界者",
    org: "边界研究院BRI",
    status: "失联",
    access: "秘密级",
    department: "空间异常研究所 · 队员",
    ops: 31,
    hours: 398,
    lastOp: "LOA-0073 赤月学院",
    note: "BRI研究员，顾泽鸣小队成员。夏·29 同队失联。"
  },
  // 其他活跃溯界者
  {
    name: "林砚",
    code: "砚",
    id: "IMAC-OA-0089",
    rank: "资深溯界者",
    org: "衔尾蛇事务所",
    status: "在岗",
    access: "机密级",
    department: "外勤一队 · 副队长",
    ops: 104,
    hours: 1423,
    lastOp: "SPA-1120 回声走廊",
    note: "衔尾蛇外勤一队副队长，因留守总部未参与赤月行动。"
  }, {
    name: "苏晚",
    code: "晚",
    id: "IMAC-BRI-0312",
    rank: "研究员",
    org: "边界研究院BRI",
    status: "外勤",
    access: "机密级",
    department: "认知异常研究组",
    ops: 53,
    hours: 674,
    lastOp: "CGB-0427 记忆回廊",
    note: "BRI认知异常研究组核心成员。"
  }, {
    name: "韩凛",
    code: "凛",
    id: "IMAC-NW-0156",
    rank: "资深溯界者",
    org: "北境守望",
    status: "外勤",
    access: "机密级",
    department: "冻土探索营 · 队长 · TMB-0089指挥",
    ops: 97,
    hours: 1256,
    lastOp: "TMB-0089 白松冻土",
    note: "白松城冻土层时间停滞行动指挥，北境守望冻土探索营队长。"
  }, {
    name: "叶知秋",
    code: "秋",
    id: "IMAC-NW-0203",
    rank: "溯界者",
    org: "北境守望",
    status: "休假",
    access: "秘密级",
    department: "冻土探索营 · 队员",
    ops: 34,
    hours: 412,
    lastOp: "PHA-0728 冰下断层",
    note: "北境守望冻土探索营成员，轮休中。"
  }, {
    name: "周珩",
    code: "珩",
    id: "IMAC-MC-0145",
    rank: "溯界者",
    org: "晨星团",
    status: "外勤",
    access: "秘密级",
    department: "行动部 · 三组",
    ops: 41,
    hours: 528,
    lastOp: "PHA-0182 洛林裂隙",
    note: "晨星团行动部三组，参与洛林裂隙联合行动。"
  }, {
    name: "方叙",
    code: "叙",
    id: "IMAC-OA-0167",
    rank: "溯界者",
    org: "衔尾蛇事务所",
    status: "在岗",
    access: "秘密级",
    department: "外勤二队 · 队员",
    ops: 38,
    hours: 487,
    lastOp: "LOA-1045 失物公寓",
    note: "衔尾蛇外勤二队成员。"
  }, {
    name: "陈之岸",
    code: "岸",
    id: "IMAC-BRI-0412",
    rank: "初级研究员",
    org: "边界研究院BRI",
    status: "在岗",
    access: "秘密级",
    department: "异常数据中心",
    ops: 19,
    hours: 234,
    lastOp: "OBA-0311 旧钟表",
    note: "BRI异常数据中心初级研究员。"
  }, {
    name: "许知遥",
    code: "遥",
    id: "IMAC-MED-0076",
    rank: "主治医师",
    org: "医疗保障部",
    status: "在岗",
    access: "机密级",
    department: "心理干预中心",
    ops: 28,
    hours: 345,
    lastOp: "CGA-0612 静默走廊",
    note: "IMAC医疗保障部心理干预中心主治医师。"
  }, {
    name: "唐夜",
    code: "夜",
    id: "IMAC-OA-0256",
    rank: "见习溯界者",
    org: "衔尾蛇事务所",
    status: "休假",
    access: "受限级",
    department: "见习大队",
    ops: 7,
    hours: 89,
    lastOp: "SPB-0890 镜像走廊",
    note: "衔尾蛇见习大队成员，第二轮考核待进行。"
  }, {
    name: "黎深",
    code: "深",
    id: "IMAC-NW-0312",
    rank: "溯界者",
    org: "北境守望",
    status: "外勤",
    access: "秘密级",
    department: "极地探索队",
    ops: 62,
    hours: 756,
    lastOp: "ENA-0234 深寒巨兽",
    note: "北境守望极地探索队成员。"
  }, {
    name: "温如言",
    code: "言",
    id: "IMAC-PS-0023",
    rank: "资深溯界者",
    org: "悬铃木学会",
    status: "在岗",
    access: "机密级",
    department: "认知异常组 · 副组长",
    ops: 76,
    hours: 945,
    lastOp: "CGA-0502 无声剧场",
    note: "悬铃木学会认知异常组副组长。"
  }, {
    name: "柳朝霜",
    code: "霜",
    id: "IMAC-WNP-0034",
    rank: "资深溯界者",
    org: "白夜哨站",
    status: "外勤",
    access: "机密级",
    department: "极夜行动队 · 队长",
    ops: 89,
    hours: 1102,
    lastOp: "SPA-2041 永夜走廊",
    note: "白夜哨站极夜行动队队长。"
  }, {
    name: "桥本彻",
    code: "彻",
    id: "IMAC-LBC-0067",
    rank: "首席溯界者",
    org: "长桥会社",
    status: "在岗",
    access: "机密级",
    department: "长桥会社 · 现任总协调官",
    ops: 145,
    hours: 1789,
    lastOp: "TMA-0334 桥之循环",
    note: "长桥会社现任总协调官。"
  }];
  const operations = [{
    code: "LOA-0073",
    name: "赤月学院异常介入行动",
    level: "深渊级",
    levelClass: "abyssal",
    org: "衔尾蛇/BRI联合",
    response: "二级响应",
    status: "进行中",
    personnel: 6,
    phase: "失联监测",
    start: "安珀历39年夏·26",
    lastContact: "夏·29 14:32",
    commander: "沈彻",
    sector: "东侧主入口 · 深入未知",
    orgs: ["衔尾蛇事务所", "边界研究院BRI"],
    notes: "常规通讯中断，锚定信标信号微弱但稳定。按规程第3.1条，暂不启动搜救，持续监测。参与人员：沈彻、季明轩（衔尾蛇）；顾泽鸣、林薇（BRI）等6人。"
  }, {
    code: "PHA-0182",
    name: "洛林自由市边境裂隙",
    level: "厄运级",
    levelClass: "doomed",
    org: "BRI/晨星团联合",
    response: "三级响应",
    status: "进行中",
    personnel: 12,
    phase: "边界测绘",
    start: "安珀历39年夏·14",
    lastContact: "实时通讯中",
    commander: "陆明远",
    sector: "边境裂隙带 · 外围安全",
    orgs: ["边界研究院BRI", "晨星团"],
    notes: "裂隙范围稳定，内部规则初步建立。平民撤离已完成。边界测绘进入第3阶段。"
  }, {
    code: "TMB-0089",
    name: "白松城冻土层时间停滞",
    level: "危险级",
    levelClass: "hazardous",
    org: "北境守望",
    response: "三级响应",
    status: "进行中",
    personnel: 8,
    phase: "采样分析",
    start: "安珀历39年夏·20",
    lastContact: "每30分钟回报",
    commander: "韩凛",
    sector: "冻土层地下300m",
    orgs: ["北境守望"],
    notes: "时间流速异常已量化（内部约1:8.7）。采集样本分批次送出。韩凛带队深入。"
  }, {
    code: "SPA-1120",
    name: "回声走廊空间偏移",
    level: "危险级",
    levelClass: "hazardous",
    org: "衔尾蛇事务所",
    response: "四级响应",
    status: "待命",
    personnel: 4,
    phase: "预案准备",
    start: "—",
    lastContact: "—",
    commander: "林砚",
    sector: "城南废弃地铁环线",
    orgs: ["衔尾蛇事务所"],
    notes: "异常活跃度近期上升，预备队已集结待命。林砚任待命行动指挥。"
  }, {
    code: "CGB-0427",
    name: "记忆回廊认知污染",
    level: "厄运级",
    levelClass: "doomed",
    org: "边界研究院BRI",
    response: "三级响应",
    status: "已结束",
    personnel: 6,
    phase: "收尾归档",
    start: "安珀历39年春·11",
    lastContact: "已结束",
    commander: "顾远舟",
    sector: "老城区精神病院旧址",
    orgs: ["边界研究院BRI", "悬铃木学会"],
    notes: "异常核心已定位并封存，12名受影响平民记忆重建完成。行动总结报告待审批。"
  }];
  const logs = [{
    time: "08:02:17",
    date: "2026-08-16",
    level: "INFO",
    module: "SYSTEM",
    msg: "系统每日自检启动，检查节点数量 7/7"
  }, {
    time: "08:02:49",
    date: "2026-08-16",
    level: "INFO",
    module: "DATABASE",
    msg: "主数据库实例 CENTRAL-01 健康检查通过，连接池 256/512"
  }, {
    time: "08:03:11",
    date: "2026-08-16",
    level: "INFO",
    module: "AUTH",
    msg: "管理员 root-console 登录成功，来源 IP 10.0.0.1"
  }, {
    time: "08:05:42",
    date: "2026-08-16",
    level: "WARN",
    module: "NODE-ARCTIC",
    msg: "北极节点心跳延迟 340ms 超过阈值 200ms，触发降级告警"
  }, {
    time: "08:07:28",
    date: "2026-08-16",
    level: "INFO",
    module: "XDPS",
    msg: "异常数据处理协议栈 v4.2 版本校验通过，所有节点已同步"
  }, {
    time: "08:09:55",
    date: "2026-08-16",
    level: "ERROR",
    module: "AUTH",
    msg: "用户认证失败：账号 IMAC-UNK-9981，来源 IP 203.17.xx.xx，已锁定30分钟"
  }, {
    time: "08:12:03",
    date: "2026-08-16",
    level: "INFO",
    module: "BACKUP",
    msg: "异常档案增量备份完成，新增记录 47 条，总大小 2.3 TB"
  }, {
    time: "08:14:36",
    date: "2026-08-16",
    level: "INFO",
    module: "PSYCH-NET",
    msg: "心理监测网络数据同步完成，在测人员 1,247 人，预警 0 人"
  }, {
    time: "08:17:21",
    date: "2026-08-16",
    level: "WARN",
    module: "NODE-GAMMA-12",
    msg: "节点 γ-12 流量告警：入站流量 87% 超过 80% 阈值"
  }, {
    time: "08:20:08",
    date: "2026-08-16",
    level: "INFO",
    module: "JRP",
    msg: "联合行动 PHA-0182 状态同步：三级响应 · 边界测绘阶段，人员 12 人"
  }, {
    time: "08:22:45",
    date: "2026-08-16",
    level: "INFO",
    module: "DATABASE",
    msg: "异常 LOA-0073 档案更新：新增探索记录 7 条，记录累计 284 条"
  }, {
    time: "08:25:13",
    date: "2026-08-16",
    level: "ERROR",
    module: "NODE-NORTH",
    msg: "节点心跳包丢失 2 次，自动重连成功，耗时 4.2s"
  }, {
    time: "08:28:59",
    date: "2026-08-16",
    level: "INFO",
    module: "AI-ENGINE",
    msg: "AID v2.7 规则引擎加载完成，异常模式库 3,412 条"
  }, {
    time: "08:31:27",
    date: "2026-08-16",
    level: "WARN",
    module: "STORAGE",
    msg: "归档存储池使用率 78%，预计 14 天后需扩容"
  }, {
    time: "08:34:06",
    date: "2026-08-16",
    level: "INFO",
    module: "AUTH",
    msg: "用户 IMAC-OA-0047 身份核验通过，权限等级 绝密级"
  }, {
    time: "08:36:41",
    date: "2026-08-16",
    level: "INFO",
    module: "COMMS",
    msg: "全球通讯网络 127 个中继站全部在线，平均延迟 47ms"
  }, {
    time: "08:39:18",
    date: "2026-08-16",
    level: "ERROR",
    module: "PSYCH-NET",
    msg: "第 11 战区心理监测数据上传中断，持续 3 分钟，已恢复"
  }, {
    time: "08:42:55",
    date: "2026-08-16",
    level: "INFO",
    module: "DATABASE",
    msg: "异常分类统计任务完成，七大类合计 12,013 条记录"
  }, {
    time: "08:45:33",
    date: "2026-08-16",
    level: "INFO",
    module: "XDPS",
    msg: "加密握手重试机制测试通过，失败率 0.012%"
  }, {
    time: "08:48:10",
    date: "2026-08-16",
    level: "WARN",
    module: "NODE-EAST",
    msg: "东境节点温度告警：机房温度 28.5°C，接近 30°C 告警线"
  }, {
    time: "08:50:47",
    date: "2026-08-16",
    level: "INFO",
    module: "BACKUP",
    msg: "异地灾备同步完成，数据一致性校验通过"
  }, {
    time: "08:53:22",
    date: "2026-08-16",
    level: "INFO",
    module: "AUTH",
    msg: "用户 IMAC-BRI-0231 登录，权限等级 机密级，来源 BRI 内网"
  }, {
    time: "08:55:58",
    date: "2026-08-16",
    level: "ERROR",
    module: "ANOMALY-API",
    msg: "异常查询接口 500 错误 3 次，已自动重启服务进程"
  }, {
    time: "08:58:44",
    date: "2026-08-16",
    level: "INFO",
    module: "JRP",
    msg: "联合行动 LOA-0073 信标监测：信号微弱但稳定，位置无漂移"
  }, {
    time: "09:01:16",
    date: "2026-08-16",
    level: "INFO",
    module: "SYSTEM",
    msg: "每日自检完成，全部节点在线，系统健康度 98.7%"
  }, {
    time: "09:03:59",
    date: "2026-08-16",
    level: "WARN",
    module: "CERT",
    msg: "TLS 证书将于 30 天后过期，请及时续签"
  }, {
    time: "09:06:35",
    date: "2026-08-16",
    level: "INFO",
    module: "AI-ENGINE",
    msg: "AID 自动标注任务完成，新异常规则建议 14 条待审核"
  }, {
    time: "09:09:12",
    date: "2026-08-16",
    level: "INFO",
    module: "DATABASE",
    msg: "数据库查询优化任务完成，平均响应时间降低 14%"
  }];
  const getStatusColor = s => {
    if (s === "online") return "var(--level-ordinary)";
    if (s === "degraded") return "var(--level-hazardous)";
    return "var(--level-abyssal)";
  };
  const getStatusLabel = s => {
    if (s === "online") return "在线";
    if (s === "degraded") return "降级";
    return "离线";
  };
  const getUserStatusColor = s => {
    if (s === "在岗" || s === "荣誉") return "var(--level-ordinary)";
    if (s === "外勤") return "var(--accent-red-bright)";
    if (s === "休假") return "var(--text-tertiary)";
    if (s === "失联") return "var(--level-abyssal)";
    return "var(--text-secondary)";
  };
  const filteredUsers = users.filter(u => {
    const matchSearch = !userSearch || u.name.includes(userSearch) || u.code.includes(userSearch) || u.id.toLowerCase().includes(userSearch.toLowerCase()) || u.department.includes(userSearch);
    const matchOrg = userOrgFilter === "all" || u.org === userOrgFilter;
    const matchRank = userRankFilter === "all" || u.rank === userRankFilter;
    const matchStatus = userStatusFilter === "all" || u.status === userStatusFilter;
    return matchSearch && matchOrg && matchRank && matchStatus;
  });
  const orgs = ["全部", "IMAC总部", "衔尾蛇事务所", "边界研究院BRI", "北境守望", "晨星团", "悬铃木学会", "白夜哨站", "长桥会社", "第四面墙", "医疗保障部"];
  const ranks = ["全部", "界标级", "首席溯界者", "首席研究员", "首席科学家", "行动总协调官", "高级管理员", "资深溯界者", "研究员", "溯界者", "主治医师", "初级研究员", "见习溯界者"];
  const statuses = ["全部", "在岗", "外勤", "休假", "失联", "荣誉"];
  const filteredLogs = logs.filter(l => logFilter === "all" || l.level.toLowerCase() === logFilter);
  const opStats = {
    active: operations.filter(o => o.status === "进行中").length,
    standby: operations.filter(o => o.status === "待命").length,
    closed: operations.filter(o => o.status === "已结束").length
  };
  const logStats = {
    total: logs.length,
    info: logs.filter(l => l.level === "INFO").length,
    warn: logs.filter(l => l.level === "WARN").length,
    error: logs.filter(l => l.level === "ERROR").length
  };
  const accessClass = a => {
    if (a === "绝密级") return "topsecret";
    if (a === "机密级") return "confidential";
    if (a === "秘密级") return "secret";
    return "internal";
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .admin-page {
          background-color: #07070a;
          background-image:
            linear-gradient(rgba(122, 58, 176, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(122, 58, 176, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          color: var(--text-primary);
          min-height: calc(100vh - 64px);
          padding-top: 80px;
          padding-bottom: 60px;
        }
        .admin-top-bar {
          background: linear-gradient(90deg, rgba(122, 58, 176, 0.15), transparent);
          border-bottom: 1px solid rgba(122, 58, 176, 0.4);
          padding: 12px 0;
          margin-bottom: 28px;
        }
        .admin-top-bar-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .admin-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: #b88ed9;
          letter-spacing: 0.15em;
        }
        .admin-badge-dot {
          width: 8px; height: 8px;
          background-color: #b88ed9;
          border-radius: 50%;
          animation: pulse-purple 2s infinite;
        }
        @keyframes pulse-purple {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .admin-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        .admin-breadcrumb .crumb-link {
          cursor: pointer;
          color: #b88ed9;
        }
        .page-title {
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 4px;
          color: #d4b8e8;
        }
        .page-title-en {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #7a3ab0;
          letter-spacing: 0.2em;
          margin-bottom: 28px;
        }
        .admin-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .admin-card {
          background-color: rgba(15, 12, 22, 0.8);
          border: 1px solid rgba(122, 58, 176, 0.3);
          backdrop-filter: blur(4px);
        }
        .admin-card.clickable { cursor: pointer; transition: all 0.25s ease; }
        .admin-card.clickable:hover {
          border-color: rgba(184, 142, 217, 0.7);
          background-color: rgba(30, 20, 45, 0.85);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(122, 58, 176, 0.15);
        }
        .admin-card-head {
          padding: 14px 20px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.2);
          background: linear-gradient(90deg, rgba(122, 58, 176, 0.1), transparent);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .admin-card-title {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 600;
          color: #d4b8e8;
        }
        .admin-card-title-en {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #7a3ab0;
          letter-spacing: 0.15em;
          margin-left: 8px;
        }
        .admin-card-action {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #b88ed9;
          letter-spacing: 0.1em;
          opacity: 0.8;
        }
        .admin-card.clickable:hover .admin-card-action { opacity: 1; }
        .admin-card-body { padding: 20px; }

        /* System status */
        .status-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .status-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background-color: rgba(122, 58, 176, 0.05);
          border: 1px solid rgba(122, 58, 176, 0.15);
          font-size: 12px;
        }
        .status-item-name { color: var(--text-secondary); }
        .status-item-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .status-item-ping {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
        }
        .status-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
        }

        /* DB stats table */
        .db-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }
        .db-table th {
          text-align: left;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          padding: 8px 12px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.2);
          font-weight: 400;
        }
        .db-table td {
          padding: 10px 12px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.1);
          color: var(--text-secondary);
        }
        .db-code {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #b88ed9;
          font-weight: 600;
        }
        .db-num { font-family: var(--font-mono); }
        .db-new { color: var(--accent-red-bright); font-family: var(--font-mono); }

        .admin-summary-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }
        .admin-stat {
          padding: 20px;
          background-color: rgba(15, 12, 22, 0.8);
          border: 1px solid rgba(122, 58, 176, 0.3);
          text-align: center;
        }
        .admin-stat-num {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 900;
          color: #b88ed9;
          line-height: 1;
        }
        .admin-stat-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-top: 8px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background-color: transparent;
          border: 1px solid rgba(122, 58, 176, 0.4);
          color: #b88ed9;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .back-btn:hover {
          border-color: #b88ed9;
          background: rgba(122, 58, 176, 0.1);
        }

        /* op-list (dashboard preview) */
        .op-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .op-item {
          padding: 12px 16px;
          background-color: rgba(122, 58, 176, 0.05);
          border: 1px solid rgba(122, 58, 176, 0.15);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .op-main { display: flex; flex-direction: column; gap: 4px; }
        .op-code {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #b88ed9;
        }
        .op-name { font-size: 14px; font-weight: 600; color: var(--text-primary); }
        .op-org { font-size: 11px; color: var(--text-tertiary); }
        .op-status {
          font-size: 10px;
          padding: 3px 10px;
          border: 1px solid var(--level-doomsday);
          color: var(--level-doomsday);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }

        /* log-list (dashboard preview) */
        .log-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          max-height: 280px;
          overflow-y: auto;
        }
        .log-item {
          display: flex;
          gap: 12px;
          padding: 6px 0;
          border-bottom: 1px solid rgba(122, 58, 176, 0.08);
        }
        .log-time { color: var(--text-tertiary); flex-shrink: 0; }
        .log-level {
          flex-shrink: 0;
          font-weight: 600;
          width: 52px;
        }
        .log-level.info { color: var(--level-ordinary); }
        .log-level.warn { color: var(--level-hazardous); }
        .log-level.error { color: var(--accent-red-bright); }
        .log-msg { color: var(--text-secondary); word-break: break-all; }

        /* === Module Detail Panels === */
        .module-panel { animation: panelFadeIn 0.3s ease; }
        @keyframes panelFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ====== User Management ====== */
        .user-action-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 20px;
        }
        .user-action-card {
          padding: 18px 18px 16px;
          background: rgba(15, 12, 22, 0.8);
          border: 1px solid rgba(122, 58, 176, 0.25);
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .user-action-card:hover {
          border-color: rgba(184, 142, 217, 0.6);
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(122, 58, 176, 0.15);
        }
        .user-action-card.is-open {
          border-color: #b88ed9;
          background: rgba(40, 24, 60, 0.6);
        }
        .user-action-top {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .user-action-icon {
          width: 32px; height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b88ed9;
          background: rgba(122, 58, 176, 0.12);
          flex-shrink: 0;
        }
        .user-action-icon svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 1.8; }
        .user-action-title {
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .user-action-desc {
          font-size: 11px;
          color: var(--text-tertiary);
        }
        .user-action-badge {
          position: absolute;
          top: 10px; right: 10px;
          min-width: 20px; height: 20px;
          padding: 0 6px;
          border-radius: 10px;
          background: var(--accent-red-bright);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-panel {
          margin-bottom: 20px;
          background: rgba(15, 12, 22, 0.8);
          border: 1px solid rgba(184, 142, 217, 0.4);
          animation: panelFadeIn 0.25s ease;
          overflow: hidden;
        }
        .user-panel-head {
          padding: 12px 20px;
          background: linear-gradient(90deg, rgba(122, 58, 176, 0.15), transparent);
          border-bottom: 1px solid rgba(122, 58, 176, 0.25);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .user-panel-title {
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 600;
          color: #d4b8e8;
        }
        .user-panel-close {
          background: none;
          border: 1px solid rgba(122, 58, 176, 0.3);
          color: #b88ed9;
          width: 24px; height: 24px;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .user-panel-close:hover { background: rgba(122, 58, 176, 0.15); }
        .user-panel-body { padding: 16px 20px; }

        .approval-list, .rankadj-list, .online-list, .audit-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .approval-item {
          padding: 14px 18px;
          border: 1px solid rgba(122, 58, 176, 0.2);
          background: rgba(122, 58, 176, 0.04);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .approval-info {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 1;
        }
        .approval-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1.5px solid #7a3ab0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 700;
          color: #b88ed9;
          background: rgba(122, 58, 176, 0.12);
          flex-shrink: 0;
        }
        .approval-meta {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .approval-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .approval-sub {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .approval-actions { display: flex; gap: 8px; flex-shrink: 0; }
        .btn-approve, .btn-reject, .btn-confirm, .btn-cancel {
          padding: 6px 16px;
          font-size: 11px;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
          cursor: pointer;
          border: 1px solid;
          background: transparent;
          transition: all 0.2s;
        }
        .btn-approve { color: var(--level-ordinary); border-color: rgba(74, 124, 89, 0.5); }
        .btn-approve:hover { background: rgba(74, 124, 89, 0.15); }
        .btn-reject { color: var(--accent-red-bright); border-color: rgba(196, 40, 40, 0.5); }
        .btn-reject:hover { background: rgba(196, 40, 40, 0.12); }
        .btn-confirm { color: #b88ed9; border-color: rgba(184, 142, 217, 0.5); }
        .btn-confirm:hover { background: rgba(184, 142, 217, 0.12); }
        .btn-cancel { color: var(--text-tertiary); border-color: rgba(120, 120, 130, 0.4); }
        .btn-cancel:hover { background: rgba(120, 120, 130, 0.1); }
        .status-tag {
          padding: 3px 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.05em;
          border: 1px solid;
        }
        .status-tag.approved { color: var(--level-ordinary); border-color: rgba(74, 124, 89, 0.5); }
        .status-tag.rejected { color: var(--accent-red-bright); border-color: rgba(196, 40, 40, 0.5); }
        .status-tag.confirmed { color: #b88ed9; border-color: rgba(184, 142, 217, 0.5); }
        .status-tag.cancelled { color: var(--text-tertiary); border-color: rgba(120, 120, 130, 0.4); }
        .status-tag.pending { color: var(--level-hazardous); border-color: rgba(255, 170, 0, 0.5); }

        .rankadj-item {
          padding: 14px 18px;
          border: 1px solid rgba(122, 58, 176, 0.2);
          background: rgba(122, 58, 176, 0.04);
        }
        .rankadj-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .rankadj-name { font-size: 14px; font-weight: 600; color: var(--text-primary); }
        .rankadj-flow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          margin-bottom: 8px;
        }
        .rankadj-from { color: var(--text-tertiary); }
        .rankadj-arrow { color: #7a3ab0; }
        .rankadj-to { color: #b88ed9; font-weight: 600; }
        .rankadj-reason {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 8px;
          line-height: 1.5;
        }
        .rankadj-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 8px;
          border-top: 1px solid rgba(122, 58, 176, 0.12);
        }
        .rankadj-applicant {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .online-item {
          padding: 10px 16px;
          border: 1px solid rgba(74, 124, 89, 0.2);
          background: rgba(74, 124, 89, 0.04);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .online-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .online-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--level-ordinary);
          box-shadow: 0 0 6px var(--level-ordinary);
        }
        .online-name { font-size: 13px; color: var(--text-primary); font-weight: 500; }
        .online-org { font-size: 11px; color: var(--text-tertiary); }
        .online-right {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          text-align: right;
        }
        .audit-item {
          padding: 10px 16px;
          border-left: 2px solid #7a3ab0;
          background: rgba(122, 58, 176, 0.04);
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .audit-time {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          flex-shrink: 0;
          min-width: 70px;
          padding-top: 2px;
        }
        .audit-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .audit-user {
          font-size: 12px;
          color: #b88ed9;
          font-weight: 600;
        }
        .audit-action { font-size: 12px; color: var(--text-secondary); }
        .audit-module {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          flex-shrink: 0;
          padding-top: 2px;
        }
        @media (max-width: 768px) {
          .user-action-grid { grid-template-columns: 1fr 1fr; }
        }
        .user-toolbar {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .user-search {
          flex: 1;
          min-width: 200px;
          padding: 10px 16px;
          background: rgba(15, 12, 22, 0.9);
          border: 1px solid rgba(122, 58, 176, 0.3);
          color: var(--text-primary);
          font-size: 13px;
          font-family: var(--font-mono);
          outline: none;
          transition: border-color 0.2s;
        }
        .user-search:focus { border-color: #b88ed9; }
        .user-filter {
          padding: 10px 14px;
          background: rgba(15, 12, 22, 0.9);
          border: 1px solid rgba(122, 58, 176, 0.3);
          color: var(--text-secondary);
          font-size: 12px;
          font-family: var(--font-mono);
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }
        .user-filter:hover { border-color: rgba(184, 142, 217, 0.5); }
        .user-count-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.15);
        }
        .user-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }
        .user-table th {
          text-align: left;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          padding: 12px 14px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.3);
          font-weight: 400;
          background: rgba(122, 58, 176, 0.06);
        }
        .user-table td {
          padding: 14px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.1);
          color: var(--text-secondary);
          cursor: pointer;
          transition: background 0.2s;
        }
        .user-table tbody tr:hover td {
          background: rgba(122, 58, 176, 0.08);
          color: var(--text-primary);
        }
        .user-table-name {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .user-avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          border: 1.5px solid #7a3ab0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 700;
          color: #b88ed9;
          background: rgba(122, 58, 176, 0.12);
          flex-shrink: 0;
        }
        .user-name-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .user-name-cell .name {
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 500;
        }
        .user-name-cell .dept {
          font-size: 10px;
          color: var(--text-tertiary);
        }
        .user-id { font-family: var(--font-mono); font-size: 11px; color: var(--text-tertiary); }
        .user-status-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          margin-right: 6px;
        }
        .access-badge {
          padding: 3px 10px;
          border: 1px solid;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
        .access-badge.topsecret {
          color: #b88ed9;
          border-color: rgba(184, 142, 217, 0.5);
          background: rgba(122, 58, 176, 0.12);
        }
        .access-badge.confidential {
          color: var(--accent-red-bright);
          border-color: rgba(196, 40, 40, 0.5);
          background: rgba(196, 40, 40, 0.08);
        }
        .access-badge.secret {
          color: var(--level-hazardous);
          border-color: rgba(255, 170, 0, 0.5);
          background: rgba(255, 170, 0, 0.06);
        }
        .access-badge.internal {
          color: var(--text-tertiary);
          border-color: rgba(120, 120, 130, 0.5);
          background: rgba(120, 120, 130, 0.06);
        }

        /* User Detail Modal */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(5, 3, 10, 0.85);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          padding: 20px;
          animation: modalFade 0.2s ease;
        }
        @keyframes modalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-box {
          background: #0f0d18;
          border: 1px solid rgba(122, 58, 176, 0.5);
          max-width: 600px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          animation: modalIn 0.25s ease;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(122, 58, 176, 0.1);
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-head {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.3);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(90deg, rgba(122, 58, 176, 0.12), transparent);
        }
        .modal-title {
          font-family: var(--font-serif);
          font-size: 18px;
          color: #d4b8e8;
          font-weight: 600;
        }
        .modal-close {
          background: none;
          border: 1px solid rgba(122, 58, 176, 0.3);
          color: #b88ed9;
          width: 28px; height: 28px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .modal-close:hover {
          border-color: #b88ed9;
          background: rgba(122, 58, 176, 0.15);
        }
        .modal-body { padding: 24px; }
        .detail-row {
          display: flex;
          padding: 10px 0;
          border-bottom: 1px solid rgba(122, 58, 176, 0.08);
          font-size: 13px;
        }
        .detail-label {
          width: 110px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          flex-shrink: 0;
          padding-top: 3px;
        }
        .detail-value { color: var(--text-secondary); flex: 1; }
        .detail-section-title {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #7a3ab0;
          letter-spacing: 0.18em;
          margin: 22px 0 10px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(122, 58, 176, 0.25);
        }
        .detail-note {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.7;
          padding: 12px 16px;
          background: rgba(122, 58, 176, 0.06);
          border-left: 2px solid #7a3ab0;
        }

        /* ====== Operations Module ====== */
        .op-stats-row {
          display: flex !important;
          flex-direction: row !important;
          justify-content: space-between;
          align-items: stretch;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: nowrap !important;
          width: 100%;
          box-sizing: border-box;
          min-width: 0;
        }
        .op-stat-card {
          flex: 1 1 0 !important;
          min-width: 0 !important;
          width: 0;
          padding: 10px 14px;
          border: 1px solid;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          position: relative;
          overflow: hidden;
          transition: all 0.25s ease;
          cursor: pointer;
          min-height: 44px;
          box-sizing: border-box;
        }
        .op-stat-card:hover { transform: translateY(-1px); }
        .op-stat-card.is-active {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.25);
        }
        .op-stat-card.is-active::after {
          content: "";
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--stat-bar, var(--accent-red-bright));
        }
        .op-stat-card.active.is-active {
          border-color: rgba(196, 40, 40, 0.8);
          background: linear-gradient(90deg, rgba(196, 40, 40, 0.18), rgba(196, 40, 40, 0.04));
          --stat-bar: var(--accent-red-bright);
        }
        .op-stat-card.standby.is-active {
          border-color: rgba(255, 170, 0, 0.7);
          background: linear-gradient(90deg, rgba(255, 170, 0, 0.14), rgba(255, 170, 0, 0.04));
          --stat-bar: var(--level-hazardous);
        }
        .op-stat-card.closed.is-active {
          border-color: rgba(74, 124, 89, 0.7);
          background: linear-gradient(90deg, rgba(74, 124, 89, 0.12), rgba(74, 124, 89, 0.04));
          --stat-bar: var(--level-ordinary);
        }
        .op-stat-card.active {
          background: linear-gradient(135deg, rgba(196, 40, 40, 0.12), rgba(196, 40, 40, 0.02));
          border-color: rgba(196, 40, 40, 0.4);
        }
        .op-stat-card.standby {
          background: linear-gradient(135deg, rgba(255, 170, 0, 0.1), rgba(255, 170, 0, 0.02));
          border-color: rgba(255, 170, 0, 0.35);
        }
        .op-stat-card.closed {
          background: linear-gradient(135deg, rgba(74, 124, 89, 0.08), rgba(74, 124, 89, 0.02));
          border-color: rgba(74, 124, 89, 0.3);
        }
        .op-stat-icon {
          width: 16px; height: 16px;
          color: currentColor;
          flex-shrink: 0;
          opacity: 0.7;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .op-stat-icon svg { width: 100%; height: 100%; stroke: currentColor; fill: none; stroke-width: 2; }
        .op-stat-card.active .op-stat-icon {
          color: var(--accent-red-bright);
        }
        .op-stat-card.standby .op-stat-icon {
          color: var(--level-hazardous);
        }
        .op-stat-card.closed .op-stat-icon {
          color: var(--level-ordinary);
        }
        .op-stat-info { display: flex; align-items: baseline; gap: 10px; flex: 1; justify-content: flex-end; }
        .op-stat-num {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
        }
        .op-stat-card.active .op-stat-num { color: var(--accent-red-bright); }
        .op-stat-card.standby .op-stat-num { color: var(--level-hazardous); }
        .op-stat-card.closed .op-stat-num { color: var(--level-ordinary); }
        .op-stat-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .op-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .op-card {
          border: 1px solid rgba(122, 58, 176, 0.25);
          background: rgba(15, 12, 22, 0.8);
          transition: all 0.25s ease;
          overflow: hidden;
          position: relative;
        }
        .op-card:hover {
          border-color: rgba(184, 142, 217, 0.55);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(122, 58, 176, 0.12);
        }
        .op-card-level-bar {
          height: 4px;
          width: 100%;
        }
        .op-card-body { padding: 18px 20px; }
        .op-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        .op-card-code {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #b88ed9;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }
        .op-card-name {
          font-family: var(--font-serif);
          font-size: 17px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .op-status-badge {
          padding: 4px 12px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          border: 1px solid;
          white-space: nowrap;
        }
        .op-status-badge.active {
          color: var(--accent-red-bright);
          border-color: rgba(196, 40, 40, 0.5);
          background: rgba(196, 40, 40, 0.08);
        }
        .op-status-badge.standby {
          color: var(--level-hazardous);
          border-color: rgba(255, 170, 0, 0.5);
          background: rgba(255, 170, 0, 0.06);
        }
        .op-status-badge.closed {
          color: var(--text-tertiary);
          border-color: rgba(120, 120, 130, 0.4);
          background: rgba(120, 120, 130, 0.06);
        }
        .op-card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }
        .op-meta-tag {
          padding: 3px 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          background: rgba(122, 58, 176, 0.08);
          border: 1px solid rgba(122, 58, 176, 0.2);
          color: var(--text-secondary);
          letter-spacing: 0.03em;
        }
        .op-meta-tag.level-abyssal {
          color: var(--level-abyssal);
          border-color: rgba(180, 40, 120, 0.4);
          background: rgba(180, 40, 120, 0.08);
        }
        .op-meta-tag.level-doomed {
          color: var(--level-doomsday);
          border-color: rgba(196, 40, 40, 0.4);
          background: rgba(196, 40, 40, 0.06);
        }
        .op-meta-tag.level-hazardous {
          color: var(--level-hazardous);
          border-color: rgba(255, 170, 0, 0.4);
          background: rgba(255, 170, 0, 0.06);
        }
        .op-card-info-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-top: 1px solid rgba(122, 58, 176, 0.1);
          font-size: 12px;
        }
        .op-card-info-label {
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.05em;
        }
        .op-card-info-value { color: var(--text-secondary); }
        .op-card-expand-btn {
          margin-top: 12px;
          padding-top: 10px;
          border-top: 1px solid rgba(122, 58, 176, 0.1);
          display: flex;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: color 0.2s;
        }
        .op-card-expand-btn:hover { color: #b88ed9; }
        .op-card-detail {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }
        .op-card-detail.open { max-height: 500px; }
        .op-card-detail-inner {
          padding: 0 20px 18px;
          border-top: 1px solid rgba(122, 58, 176, 0.12);
          padding-top: 14px;
        }
        .op-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 20px;
          font-size: 12px;
          margin-bottom: 12px;
        }
        .op-detail-field { display: flex; flex-direction: column; gap: 3px; }
        .op-detail-field-label {
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
        }
        .op-detail-field-value { color: var(--text-secondary); }
        .op-detail-notes {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.7;
          padding: 12px 16px;
          background: rgba(122, 58, 176, 0.06);
          border-left: 2px solid #7a3ab0;
        }
        .op-detail-org-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .op-detail-org-chip {
          padding: 2px 10px;
          font-size: 11px;
          background: rgba(122, 58, 176, 0.1);
          border: 1px solid rgba(122, 58, 176, 0.25);
          color: #b88ed9;
        }

        /* ====== Logs Module ====== */
        .log-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        .log-stat-card {
          padding: 16px;
          border: 1px solid;
          text-align: center;
        }
        .log-stat-card.total {
          background: rgba(122, 58, 176, 0.06);
          border-color: rgba(122, 58, 176, 0.3);
        }
        .log-stat-card.info {
          background: rgba(74, 124, 89, 0.05);
          border-color: rgba(74, 124, 89, 0.3);
        }
        .log-stat-card.warn {
          background: rgba(255, 170, 0, 0.05);
          border-color: rgba(255, 170, 0, 0.35);
        }
        .log-stat-card.error {
          background: rgba(196, 40, 40, 0.06);
          border-color: rgba(196, 40, 40, 0.4);
        }
        .log-stat-num {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          line-height: 1;
        }
        .log-stat-card.total .log-stat-num { color: #b88ed9; }
        .log-stat-card.info .log-stat-num { color: var(--level-ordinary); }
        .log-stat-card.warn .log-stat-num { color: var(--level-hazardous); }
        .log-stat-card.error .log-stat-num { color: var(--accent-red-bright); }
        .log-stat-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-top: 6px;
        }

        .log-filter-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          flex-wrap: wrap;
          padding: 12px 16px;
          background: rgba(15, 12, 22, 0.6);
          border: 1px solid rgba(122, 58, 176, 0.2);
          border-bottom: none;
        }
        .log-filter-btn {
          padding: 6px 16px;
          background: rgba(15, 12, 22, 0.8);
          border: 1px solid rgba(122, 58, 176, 0.3);
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.2s;
        }
        .log-filter-btn:hover { border-color: rgba(184, 142, 217, 0.5); color: var(--text-secondary); }
        .log-filter-btn.active {
          border-color: #b88ed9;
          color: #b88ed9;
          background: rgba(122, 58, 176, 0.18);
        }

        .console-window {
          border: 1px solid rgba(122, 58, 176, 0.3);
          background: #050508;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }
        .console-titlebar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: linear-gradient(90deg, rgba(122, 58, 176, 0.15), rgba(122, 58, 176, 0.05));
          border-bottom: 1px solid rgba(122, 58, 176, 0.3);
          font-family: var(--font-mono);
          font-size: 11px;
          color: #7a5a9a;
          letter-spacing: 0.1em;
        }
        .console-dots { display: flex; gap: 6px; margin-right: 8px; }
        .console-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
        }
        .console-dot.red { background: #ff5f56; }
        .console-dot.yellow { background: #ffbd2e; }
        .console-dot.green { background: #27c93f; }
        .console-body {
          padding: 16px 20px;
          max-height: 520px;
          overflow-y: auto;
          font-family: var(--font-mono);
          font-size: 11.5px;
          line-height: 1.8;
        }
        .console-body::-webkit-scrollbar { width: 8px; }
        .console-body::-webkit-scrollbar-track { background: rgba(122, 58, 176, 0.05); }
        .console-body::-webkit-scrollbar-thumb { background: rgba(122, 58, 176, 0.3); border-radius: 4px; }
        .console-body::-webkit-scrollbar-thumb:hover { background: rgba(122, 58, 176, 0.5); }

        .log-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 5px 10px;
          margin-bottom: 2px;
          border-radius: 2px;
          transition: background 0.15s;
        }
        .log-row:hover { background: rgba(122, 58, 176, 0.06); }
        .log-row.info { background: rgba(74, 124, 89, 0.04); }
        .log-row.warn { background: rgba(255, 170, 0, 0.05); }
        .log-row.error { background: rgba(196, 40, 40, 0.07); }
        .log-level-badge {
          flex-shrink: 0;
          width: 52px;
          padding: 2px 0;
          text-align: center;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          font-family: var(--font-mono);
          border-radius: 2px;
          margin-top: 2px;
        }
        .log-level-badge.info {
          background: rgba(74, 124, 89, 0.2);
          color: var(--level-ordinary);
        }
        .log-level-badge.warn {
          background: rgba(255, 170, 0, 0.2);
          color: var(--level-hazardous);
        }
        .log-level-badge.error {
          background: rgba(196, 40, 40, 0.2);
          color: var(--accent-red-bright);
        }
        .log-timestamp {
          flex-shrink: 0;
          color: #5a4870;
          font-size: 11px;
          min-width: 140px;
        }
        .log-module {
          flex-shrink: 0;
          color: #7a5a9a;
          min-width: 110px;
          font-size: 11px;
        }
        .log-message {
          color: #9a8ab0;
          word-break: break-all;
          flex: 1;
        }

        @media (max-width: 1024px) {
          .admin-grid { grid-template-columns: 1fr; }
          .admin-summary-row { grid-template-columns: repeat(2, 1fr); }
          .op-cards-grid { grid-template-columns: 1fr; }
          .log-stats-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 720px) {
          .op-stats-row { flex-wrap: wrap !important; }
          .op-stats-row .op-stat-card { flex: 1 1 100% !important; width: auto; }
        }
        @media (max-width: 640px) {
          .page-title { font-size: 24px; }
          .status-grid { grid-template-columns: 1fr; }
          .admin-summary-row { grid-template-columns: 1fr 1fr; }
          .op-detail-grid { grid-template-columns: 1fr; }
          .log-stats-row { grid-template-columns: 1fr 1fr; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "admin-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-top-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container admin-top-bar-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-badge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-badge-dot"
  }), /*#__PURE__*/React.createElement("span", null, "TOP SECRET \xB7 ADMINISTRATOR CONSOLE \xB7 IMAC CENTRAL")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      color: "var(--text-tertiary)",
      letterSpacing: "0.1em"
    }
  }, "XDPS v4.2 \xB7 BUILD 39.2.7 \xB7 NODE: CENTRAL-01"))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-breadcrumb"
  }, activeModule ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "crumb-link",
    onClick: backToDashboard
  }, "\u7CFB\u7EDF\u7BA1\u7406"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, activeModule === "users" && "用户管理", activeModule === "operations" && "联合行动调度", activeModule === "logs" && "系统日志")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "crumb-link",
    onClick: () => navigate("/portal")
  }, "\u5185\u90E8\u6307\u6325\u4E2D\u5FC3"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, "\u7CFB\u7EDF\u7BA1\u7406"))), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, activeModule === "users" && "用户管理", activeModule === "operations" && "联合行动调度", activeModule === "logs" && "系统日志", !activeModule && "系统管理"), /*#__PURE__*/React.createElement("div", {
    className: "page-title-en"
  }, activeModule === "users" && "USER MANAGEMENT", activeModule === "operations" && "JOINT RESPONSE OPERATIONS", activeModule === "logs" && "SYSTEM LOG CONSOLE", !activeModule && "SYSTEM ADMINISTRATION"), activeModule === "users" && /*#__PURE__*/React.createElement("div", {
    className: "module-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: `user-action-card ${activeUserPanel === "approval" ? "is-open" : ""}`,
    onClick: () => setActiveUserPanel(activeUserPanel === "approval" ? null : "approval")
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-badge"
  }, approvalList.filter(a => a.status === "pending").length), /*#__PURE__*/React.createElement("div", {
    className: "user-action-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 11l3 3L22 4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "user-action-title"
  }, "\u8BA4\u8BC1\u7533\u8BF7\u5BA1\u6279")), /*#__PURE__*/React.createElement("div", {
    className: "user-action-desc"
  }, "\u5F85\u5904\u7406 ", approvalList.filter(a => a.status === "pending").length, " \u6761")), /*#__PURE__*/React.createElement("div", {
    className: `user-action-card ${activeUserPanel === "rank" ? "is-open" : ""}`,
    onClick: () => setActiveUserPanel(activeUserPanel === "rank" ? null : "rank")
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-badge"
  }, rankAdjList.filter(a => !a.status).length), /*#__PURE__*/React.createElement("div", {
    className: "user-action-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "user-action-title"
  }, "\u6743\u9650\u7B49\u7EA7\u8C03\u6574")), /*#__PURE__*/React.createElement("div", {
    className: "user-action-desc"
  }, "\u5F85\u786E\u8BA4 ", rankAdjList.filter(a => !a.status).length, " \u6761")), /*#__PURE__*/React.createElement("div", {
    className: `user-action-card ${activeUserPanel === "online" ? "is-open" : ""}`,
    onClick: () => setActiveUserPanel(activeUserPanel === "online" ? null : "online")
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-badge",
    style: {
      background: "var(--level-ordinary)"
    }
  }, onlineUsers.length), /*#__PURE__*/React.createElement("div", {
    className: "user-action-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-icon",
    style: {
      color: "var(--level-ordinary)",
      background: "rgba(74,124,89,0.12)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.5 21a7.5 7.5 0 0113 0"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "user-action-title"
  }, "\u5728\u7EBF\u7528\u6237\u76D1\u63A7")), /*#__PURE__*/React.createElement("div", {
    className: "user-action-desc"
  }, "\u5F53\u524D\u5728\u7EBF ", onlineUsers.length, " \u4EBA")), /*#__PURE__*/React.createElement("div", {
    className: `user-action-card ${activeUserPanel === "audit" ? "is-open" : ""}`,
    onClick: () => setActiveUserPanel(activeUserPanel === "audit" ? null : "audit")
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-badge",
    style: {
      background: "var(--level-hazardous)"
    }
  }, auditLogs.length), /*#__PURE__*/React.createElement("div", {
    className: "user-action-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-action-icon",
    style: {
      color: "var(--level-hazardous)",
      background: "rgba(255,170,0,0.12)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8v4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12.01",
    y2: "16"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "user-action-title"
  }, "\u5BA1\u8BA1\u65E5\u5FD7")), /*#__PURE__*/React.createElement("div", {
    className: "user-action-desc"
  }, "\u8FD1\u671F\u64CD\u4F5C ", auditLogs.length, " \u6761"))), activeUserPanel === "approval" && /*#__PURE__*/React.createElement("div", {
    className: "user-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-panel-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "user-panel-title"
  }, "\u8BA4\u8BC1\u7533\u8BF7\u5BA1\u6279 \xB7 \u5171 ", approvalList.length, " \u6761\uFF08\u5F85\u5904\u7406 ", approvalList.filter(a => a.status === "pending").length, "\uFF09"), /*#__PURE__*/React.createElement("button", {
    className: "user-panel-close",
    onClick: () => setActiveUserPanel(null)
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "user-panel-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "approval-list"
  }, approvalList.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    className: "approval-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "approval-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "approval-avatar"
  }, a.code), /*#__PURE__*/React.createElement("div", {
    className: "approval-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "approval-name"
  }, a.name), /*#__PURE__*/React.createElement("span", {
    className: "approval-sub"
  }, a.rank, " \xB7 ", a.org, " \xB7 \u7533\u8BF7\u65F6\u95F4\uFF1A", a.applyTime))), a.status === "pending" ? /*#__PURE__*/React.createElement("div", {
    className: "approval-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-approve",
    onClick: () => handleApprove(a.id)
  }, "\u901A\u8FC7"), /*#__PURE__*/React.createElement("button", {
    className: "btn-reject",
    onClick: () => handleReject(a.id)
  }, "\u9A73\u56DE")) : /*#__PURE__*/React.createElement("span", {
    className: `status-tag ${a.status}`
  }, a.status === "approved" ? "已通过" : "已驳回")))))), activeUserPanel === "rank" && /*#__PURE__*/React.createElement("div", {
    className: "user-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-panel-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "user-panel-title"
  }, "\u6743\u9650\u7B49\u7EA7\u8C03\u6574 \xB7 \u5171 ", rankAdjList.length, " \u6761"), /*#__PURE__*/React.createElement("button", {
    className: "user-panel-close",
    onClick: () => setActiveUserPanel(null)
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "user-panel-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rankadj-list"
  }, rankAdjList.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    className: "rankadj-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rankadj-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rankadj-name"
  }, r.name), r.status ? /*#__PURE__*/React.createElement("span", {
    className: `status-tag ${r.status}`
  }, r.status === "confirmed" ? "已确认" : "已取消") : /*#__PURE__*/React.createElement("span", {
    className: "status-tag pending"
  }, "\u5F85\u786E\u8BA4")), /*#__PURE__*/React.createElement("div", {
    className: "rankadj-flow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rankadj-from"
  }, r.current), /*#__PURE__*/React.createElement("span", {
    className: "rankadj-arrow"
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    className: "rankadj-to"
  }, r.target)), /*#__PURE__*/React.createElement("div", {
    className: "rankadj-reason"
  }, "\u8C03\u6574\u539F\u56E0\uFF1A", r.reason), /*#__PURE__*/React.createElement("div", {
    className: "rankadj-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rankadj-applicant"
  }, "\u7533\u8BF7\u4EBA\uFF1A", r.applicant, " \xB7 ", r.time), !r.status && /*#__PURE__*/React.createElement("div", {
    className: "approval-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-confirm",
    onClick: () => handleConfirmRank(r.id)
  }, "\u786E\u8BA4"), /*#__PURE__*/React.createElement("button", {
    className: "btn-cancel",
    onClick: () => handleCancelRank(r.id)
  }, "\u53D6\u6D88")))))))), activeUserPanel === "online" && /*#__PURE__*/React.createElement("div", {
    className: "user-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-panel-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "user-panel-title"
  }, "\u5728\u7EBF\u7528\u6237\u76D1\u63A7 \xB7 \u5F53\u524D ", onlineUsers.length, " \u4EBA"), /*#__PURE__*/React.createElement("button", {
    className: "user-panel-close",
    onClick: () => setActiveUserPanel(null)
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "user-panel-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "online-list"
  }, onlineUsers.map((u, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "online-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "online-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "online-dot"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "online-name"
  }, u.name), /*#__PURE__*/React.createElement("div", {
    className: "online-org"
  }, u.org))), /*#__PURE__*/React.createElement("div", {
    className: "online-right"
  }, /*#__PURE__*/React.createElement("div", null, "\u767B\u5F55 ", u.loginTime), /*#__PURE__*/React.createElement("div", null, "IP ", u.ip))))))), activeUserPanel === "audit" && /*#__PURE__*/React.createElement("div", {
    className: "user-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-panel-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "user-panel-title"
  }, "\u64CD\u4F5C\u5BA1\u8BA1\u65E5\u5FD7 \xB7 \u8FD1\u671F ", auditLogs.length, " \u6761"), /*#__PURE__*/React.createElement("button", {
    className: "user-panel-close",
    onClick: () => setActiveUserPanel(null)
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "user-panel-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "audit-list"
  }, auditLogs.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "audit-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "audit-time"
  }, l.time), /*#__PURE__*/React.createElement("div", {
    className: "audit-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "audit-user"
  }, l.user), /*#__PURE__*/React.createElement("span", {
    className: "audit-action"
  }, l.action)), /*#__PURE__*/React.createElement("span", {
    className: "audit-module"
  }, l.module)))))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-toolbar"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "user-search",
    placeholder: "\u641C\u7D22 \u59D3\u540D / \u4EE3\u53F7 / \u7F16\u53F7 / \u90E8\u95E8...",
    value: userSearch,
    onChange: e => setUserSearch(e.target.value)
  }), /*#__PURE__*/React.createElement("select", {
    className: "user-filter",
    value: userOrgFilter,
    onChange: e => setUserOrgFilter(e.target.value)
  }, orgs.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o === "全部" ? "all" : o
  }, o))), /*#__PURE__*/React.createElement("select", {
    className: "user-filter",
    value: userRankFilter,
    onChange: e => setRankFilter(e.target.value)
  }, ranks.map(r => /*#__PURE__*/React.createElement("option", {
    key: r,
    value: r === "全部" ? "all" : r
  }, r))), /*#__PURE__*/React.createElement("select", {
    className: "user-filter",
    value: userStatusFilter,
    onChange: e => setUserStatusFilter(e.target.value)
  }, statuses.map(s => /*#__PURE__*/React.createElement("option", {
    key: s,
    value: s === "全部" ? "all" : s
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "user-count-badge"
  }, "\u5171 ", filteredUsers.length, " \u6761\u8BB0\u5F55 \xB7 \u603B\u8BA1 ", users.length, " \u4EBA\u5728\u518C"), /*#__PURE__*/React.createElement("table", {
    className: "user-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u59D3\u540D / \u90E8\u95E8"), /*#__PURE__*/React.createElement("th", null, "IMAC\u7F16\u53F7"), /*#__PURE__*/React.createElement("th", null, "\u804C\u7EA7"), /*#__PURE__*/React.createElement("th", null, "\u6240\u5C5E\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("th", null, "\u72B6\u6001"), /*#__PURE__*/React.createElement("th", null, "\u6743\u9650"))), /*#__PURE__*/React.createElement("tbody", null, filteredUsers.map((u, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    onClick: () => setSelectedUser(u)
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "user-table-name"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-avatar"
  }, u.code), /*#__PURE__*/React.createElement("div", {
    className: "user-name-cell"
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, u.name), /*#__PURE__*/React.createElement("span", {
    className: "dept"
  }, u.department)))), /*#__PURE__*/React.createElement("td", {
    className: "user-id"
  }, u.id), /*#__PURE__*/React.createElement("td", null, u.rank), /*#__PURE__*/React.createElement("td", null, u.org), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "user-status-dot",
    style: {
      backgroundColor: getUserStatusColor(u.status)
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: getUserStatusColor(u.status)
    }
  }, u.status)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `access-badge ${accessClass(u.access)}`
  }, u.access)))))))), /*#__PURE__*/React.createElement("button", {
    className: "back-btn",
    style: {
      marginTop: "20px"
    },
    onClick: backToDashboard
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5 M12 19l-7-7 7-7"
  })), "\u8FD4\u56DE\u7BA1\u7406\u9762\u677F")), activeModule === "operations" && /*#__PURE__*/React.createElement("div", {
    className: "module-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-stats-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: `op-stat-card active ${opStatusFilter === "active" ? "is-active" : ""}`,
    onClick: () => setOpStatusFilter(opStatusFilter === "active" ? "all" : "active")
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-stat-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "op-stat-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-stat-label"
  }, "\u8FDB\u884C\u4E2D"), /*#__PURE__*/React.createElement("div", {
    className: "op-stat-num"
  }, opStats.active))), /*#__PURE__*/React.createElement("div", {
    className: `op-stat-card standby ${opStatusFilter === "standby" ? "is-active" : ""}`,
    onClick: () => setOpStatusFilter(opStatusFilter === "standby" ? "all" : "standby")
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-stat-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "op-stat-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-stat-label"
  }, "\u5F85\u547D"), /*#__PURE__*/React.createElement("div", {
    className: "op-stat-num"
  }, opStats.standby))), /*#__PURE__*/React.createElement("div", {
    className: `op-stat-card closed ${opStatusFilter === "closed" ? "is-active" : ""}`,
    onClick: () => setOpStatusFilter(opStatusFilter === "closed" ? "all" : "closed")
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-stat-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 11.08V12a10 10 0 11-5.93-9.14"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "22 4 12 14.01 9 11.01"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "op-stat-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-stat-label"
  }, "\u5DF2\u7ED3\u675F"), /*#__PURE__*/React.createElement("div", {
    className: "op-stat-num"
  }, opStats.closed)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "16px",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      color: "var(--text-tertiary)",
      letterSpacing: "0.08em"
    }
  }, opStatusFilter === "all" ? "显示全部行动 · 共 " + operations.length + " 条" : opStatusFilter === "active" ? "筛选：进行中 · " + opStats.active + " 条（再次点击取消筛选）" : opStatusFilter === "standby" ? "筛选：待命 · " + opStats.standby + " 条（再次点击取消筛选）" : "筛选：已结束 · " + opStats.closed + " 条（再次点击取消筛选）"), /*#__PURE__*/React.createElement("div", {
    className: "op-cards-grid"
  }, operations.filter(op => {
    if (opStatusFilter === "all") return true;
    if (opStatusFilter === "active") return op.status === "进行中";
    if (opStatusFilter === "standby") return op.status === "待命";
    if (opStatusFilter === "closed") return op.status === "已结束";
    return true;
  }).map((op, i) => {
    const statusKey = op.status === "进行中" ? "active" : op.status === "待命" ? "standby" : "closed";
    const isOpen = expandedOp === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "op-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "op-card-level-bar",
      style: {
        background: op.level === "深渊级" ? "var(--level-abyssal)" : op.level === "厄运级" ? "var(--level-doomsday)" : "var(--level-hazardous)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "op-card-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "op-card-top"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "op-card-code"
    }, op.code, " \xB7 ", op.org), /*#__PURE__*/React.createElement("div", {
      className: "op-card-name"
    }, op.name)), /*#__PURE__*/React.createElement("span", {
      className: `op-status-badge ${statusKey}`
    }, op.status)), /*#__PURE__*/React.createElement("div", {
      className: "op-card-meta"
    }, /*#__PURE__*/React.createElement("span", {
      className: `op-meta-tag level-${op.levelClass}`
    }, op.level), /*#__PURE__*/React.createElement("span", {
      className: "op-meta-tag"
    }, op.response), /*#__PURE__*/React.createElement("span", {
      className: "op-meta-tag"
    }, op.phase)), /*#__PURE__*/React.createElement("div", {
      className: "op-card-info-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-card-info-label"
    }, "\u884C\u52A8\u6307\u6325"), /*#__PURE__*/React.createElement("span", {
      className: "op-card-info-value"
    }, op.commander)), /*#__PURE__*/React.createElement("div", {
      className: "op-card-info-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-card-info-label"
    }, "\u53C2\u4E0E\u4EBA\u5458"), /*#__PURE__*/React.createElement("span", {
      className: "op-card-info-value"
    }, op.personnel, " \u4EBA")), /*#__PURE__*/React.createElement("div", {
      className: "op-card-info-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-card-info-label"
    }, "\u6700\u540E\u901A\u8BAF"), /*#__PURE__*/React.createElement("span", {
      className: "op-card-info-value"
    }, op.lastContact)), /*#__PURE__*/React.createElement("div", {
      className: "op-card-expand-btn",
      onClick: () => setExpandedOp(isOpen ? null : i)
    }, isOpen ? "收起详情 ▲" : "展开详情 ▼")), /*#__PURE__*/React.createElement("div", {
      className: `op-card-detail ${isOpen ? "open" : ""}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "op-card-detail-inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "op-detail-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u54CD\u5E94\u7EA7\u522B"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.response)), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u5F53\u524D\u9636\u6BB5"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.phase)), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u7EC4\u7EC7\u5F62\u5F0F"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.org)), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u4EBA\u5458\u6570\u91CF"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.personnel, " \u4EBA")), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u884C\u52A8\u6307\u6325"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.commander)), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u5F00\u59CB\u65F6\u95F4"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.start)), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u6700\u540E\u901A\u8BAF"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.lastContact)), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label"
    }, "\u5F53\u524D\u4F4D\u7F6E"), /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-value"
    }, op.sector))), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-field",
      style: {
        marginBottom: "10px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "op-detail-field-label",
      style: {
        marginBottom: "6px"
      }
    }, "\u53C2\u4E0E\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-org-list"
    }, op.orgs.map((o, j) => /*#__PURE__*/React.createElement("span", {
      key: j,
      className: "op-detail-org-chip"
    }, o)))), /*#__PURE__*/React.createElement("div", {
      className: "op-detail-notes"
    }, op.notes))));
  })), /*#__PURE__*/React.createElement("button", {
    className: "back-btn",
    style: {
      marginTop: "24px"
    },
    onClick: backToDashboard
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5 M12 19l-7-7 7-7"
  })), "\u8FD4\u56DE\u7BA1\u7406\u9762\u677F")), activeModule === "logs" && /*#__PURE__*/React.createElement("div", {
    className: "module-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "log-stats-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "log-stat-card total"
  }, /*#__PURE__*/React.createElement("div", {
    className: "log-stat-num"
  }, logStats.total), /*#__PURE__*/React.createElement("div", {
    className: "log-stat-label"
  }, "\u603B\u6761\u6570 TOTAL")), /*#__PURE__*/React.createElement("div", {
    className: "log-stat-card info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "log-stat-num"
  }, logStats.info), /*#__PURE__*/React.createElement("div", {
    className: "log-stat-label"
  }, "INFO")), /*#__PURE__*/React.createElement("div", {
    className: "log-stat-card warn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "log-stat-num"
  }, logStats.warn), /*#__PURE__*/React.createElement("div", {
    className: "log-stat-label"
  }, "WARN")), /*#__PURE__*/React.createElement("div", {
    className: "log-stat-card error"
  }, /*#__PURE__*/React.createElement("div", {
    className: "log-stat-num"
  }, logStats.error), /*#__PURE__*/React.createElement("div", {
    className: "log-stat-label"
  }, "ERROR"))), /*#__PURE__*/React.createElement("div", {
    className: "console-window"
  }, /*#__PURE__*/React.createElement("div", {
    className: "console-titlebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "console-dots"
  }, /*#__PURE__*/React.createElement("span", {
    className: "console-dot red"
  }), /*#__PURE__*/React.createElement("span", {
    className: "console-dot yellow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "console-dot green"
  })), /*#__PURE__*/React.createElement("span", null, "SYSTEM LOG CONSOLE \xB7 CENTRAL-01 \xB7 \u5B9E\u65F6\u6D41")), /*#__PURE__*/React.createElement("div", {
    className: "log-filter-bar"
  }, /*#__PURE__*/React.createElement("button", {
    className: `log-filter-btn ${logFilter === "all" ? "active" : ""}`,
    onClick: () => setLogFilter("all")
  }, "\u5168\u90E8 ALL"), /*#__PURE__*/React.createElement("button", {
    className: `log-filter-btn ${logFilter === "info" ? "active" : ""}`,
    onClick: () => setLogFilter("info")
  }, "INFO"), /*#__PURE__*/React.createElement("button", {
    className: `log-filter-btn ${logFilter === "warn" ? "active" : ""}`,
    onClick: () => setLogFilter("warn")
  }, "WARN"), /*#__PURE__*/React.createElement("button", {
    className: `log-filter-btn ${logFilter === "error" ? "active" : ""}`,
    onClick: () => setLogFilter("error")
  }, "ERROR")), /*#__PURE__*/React.createElement("div", {
    className: "console-body"
  }, filteredLogs.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `log-row ${l.level.toLowerCase()}`
  }, /*#__PURE__*/React.createElement("span", {
    className: `log-level-badge ${l.level.toLowerCase()}`
  }, l.level), /*#__PURE__*/React.createElement("span", {
    className: "log-timestamp"
  }, l.date, " ", l.time), /*#__PURE__*/React.createElement("span", {
    className: "log-module"
  }, "[", l.module, "]"), /*#__PURE__*/React.createElement("span", {
    className: "log-message"
  }, l.msg))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "8px",
      color: "#5a4870",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      padding: "5px 10px"
    }
  }, "-- end of log buffer -- ", filteredLogs.length, " entries shown --"))), /*#__PURE__*/React.createElement("button", {
    className: "back-btn",
    style: {
      marginTop: "24px"
    },
    onClick: backToDashboard
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5 M12 19l-7-7 7-7"
  })), "\u8FD4\u56DE\u7BA1\u7406\u9762\u677F")), !activeModule && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "admin-summary-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-num"
  }, "1,247"), /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-label"
  }, "\u5728\u518C\u6EAF\u754C\u8005")), /*#__PURE__*/React.createElement("div", {
    className: "admin-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-num"
  }, "342"), /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-label"
  }, "\u5F53\u524D\u5728\u7EBF")), /*#__PURE__*/React.createElement("div", {
    className: "admin-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-num"
  }, "12,012"), /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-label"
  }, "\u5F02\u5E38\u603B\u6570")), /*#__PURE__*/React.createElement("div", {
    className: "admin-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-num"
  }, "143"), /*#__PURE__*/React.createElement("div", {
    className: "admin-stat-label"
  }, "\u6D3B\u8DC3\u672A\u89E3\u51B3"))), /*#__PURE__*/React.createElement("div", {
    className: "admin-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title"
  }, "\u7CFB\u7EDF\u72B6\u6001\u6982\u89C8"), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title-en"
  }, "SYSTEM STATUS"))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "status-grid"
  }, systemStatus.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "status-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "status-item-name"
  }, s.name), /*#__PURE__*/React.createElement("div", {
    className: "status-item-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "status-item-ping"
  }, s.ping), /*#__PURE__*/React.createElement("div", {
    className: "status-dot",
    style: {
      backgroundColor: getStatusColor(s.status)
    },
    title: getStatusLabel(s.status)
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card clickable",
    onClick: () => goToModule("users")
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title"
  }, "\u7528\u6237\u7BA1\u7406"), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title-en"
  }, "USER MANAGEMENT")), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-action"
  }, "\u8FDB\u5165 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "admin-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: "12px",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px",
      background: "rgba(122, 58, 176, 0.05)",
      border: "1px solid rgba(122, 58, 176, 0.15)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "22px",
      fontWeight: 700,
      color: "#b88ed9"
    }
  }, "1,247"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "11px",
      color: "var(--text-tertiary)",
      marginTop: "4px"
    }
  }, "\u5728\u518C\u6EAF\u754C\u8005")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px",
      background: "rgba(74, 124, 89, 0.05)",
      border: "1px solid rgba(74, 124, 89, 0.2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "22px",
      fontWeight: 700,
      color: "var(--level-ordinary)"
    }
  }, "342"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "11px",
      color: "var(--text-tertiary)",
      marginTop: "4px"
    }
  }, "\u5F53\u524D\u5728\u7EBF"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, ["认证申请审批", "权限等级调整", "组织隶属变更", "资格吊销处理"].map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "10px 14px",
      border: "1px solid rgba(122, 58, 176, 0.15)",
      fontSize: "13px",
      color: "var(--text-secondary)"
    }
  }, a, " \u2192"))))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title"
  }, "\u5F02\u5E38\u6570\u636E\u5E93\u7EDF\u8BA1"), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title-en"
  }, "DATABASE STATS"))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card-body"
  }, /*#__PURE__*/React.createElement("table", {
    className: "db-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u7C7B\u522B"), /*#__PURE__*/React.createElement("th", null, "\u603B\u6570"), /*#__PURE__*/React.createElement("th", null, "\u672A\u89E3\u51B3"), /*#__PURE__*/React.createElement("th", null, "\u672C\u5468\u65B0\u589E"))), /*#__PURE__*/React.createElement("tbody", null, dbStats.map((s, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "db-code"
  }, s.code), " \xB7 ", s.name), /*#__PURE__*/React.createElement("td", {
    className: "db-num"
  }, s.count.toLocaleString()), /*#__PURE__*/React.createElement("td", {
    className: "db-num"
  }, s.unsolved), /*#__PURE__*/React.createElement("td", {
    className: "db-new"
  }, "+", s.newThisWeek))))))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card clickable",
    onClick: () => goToModule("operations")
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title"
  }, "\u8054\u5408\u884C\u52A8\u8C03\u5EA6"), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title-en"
  }, "JRP OPERATIONS")), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-action"
  }, "\u8C03\u5EA6 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "admin-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-list"
  }, operations.slice(0, 3).map((o, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "op-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-main"
  }, /*#__PURE__*/React.createElement("span", {
    className: "op-code"
  }, o.code), /*#__PURE__*/React.createElement("span", {
    className: "op-name"
  }, o.name), /*#__PURE__*/React.createElement("span", {
    className: "op-org"
  }, o.org, " \xB7 ", o.level)), /*#__PURE__*/React.createElement("span", {
    className: "op-status"
  }, o.response)))))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card clickable",
    style: {
      gridColumn: "1 / -1"
    },
    onClick: () => goToModule("logs")
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title"
  }, "\u7CFB\u7EDF\u65E5\u5FD7"), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-title-en"
  }, "SYSTEM LOG")), /*#__PURE__*/React.createElement("span", {
    className: "admin-card-action"
  }, "\u67E5\u770B\u5168\u90E8 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "admin-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "log-list"
  }, logs.slice(0, 6).map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "log-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "log-time"
  }, l.time), /*#__PURE__*/React.createElement("span", {
    className: `log-level ${l.level.toLowerCase()}`
  }, "[", l.level, "]"), /*#__PURE__*/React.createElement("span", {
    className: "log-msg"
  }, l.msg))))))), /*#__PURE__*/React.createElement("button", {
    className: "back-btn",
    onClick: () => navigate("/portal")
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5 M12 19l-7-7 7-7"
  })), "\u8FD4\u56DE\u6307\u6325\u4E2D\u5FC3")), selectedUser && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => e.target === e.currentTarget && setSelectedUser(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "modal-title"
  }, "\u7528\u6237\u6863\u6848 \xB7 ", selectedUser.name), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: () => setSelectedUser(null)
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      marginBottom: "20px",
      paddingBottom: "16px",
      borderBottom: "1px solid rgba(122, 58, 176, 0.2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      border: "2px solid #7a3ab0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-serif)",
      fontSize: "28px",
      fontWeight: "700",
      color: "#b88ed9",
      background: "radial-gradient(circle, rgba(122, 58, 176, 0.2), transparent)"
    }
  }, selectedUser.code), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "22px",
      fontWeight: "700",
      color: "var(--text-primary)"
    }
  }, selectedUser.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      color: "#7a3ab0",
      marginTop: "4px",
      letterSpacing: "0.1em"
    }
  }, selectedUser.id), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "10px",
      display: "flex",
      gap: "8px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `access-badge ${accessClass(selectedUser.access)}`
  }, selectedUser.access), /*#__PURE__*/React.createElement("span", {
    style: {
      color: getUserStatusColor(selectedUser.status),
      fontSize: "12px"
    }
  }, "\u25CF ", selectedUser.status)))), /*#__PURE__*/React.createElement("div", {
    className: "detail-section-title"
  }, "\u57FA\u672C\u4FE1\u606F"), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u59D3\u540D"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.name)), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u4EE3\u53F7"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.code)), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u804C\u7EA7"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.rank)), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u6240\u5C5E\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.org)), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u90E8\u95E8"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.department)), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u5F53\u524D\u72B6\u6001"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value",
    style: {
      color: getUserStatusColor(selectedUser.status)
    }
  }, "\u25CF ", selectedUser.status)), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u6743\u9650\u7B49\u7EA7"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, /*#__PURE__*/React.createElement("span", {
    className: `access-badge ${accessClass(selectedUser.access)}`
  }, selectedUser.access))), /*#__PURE__*/React.createElement("div", {
    className: "detail-section-title"
  }, "\u884C\u52A8\u8BB0\u5F55"), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u53C2\u4E0E\u884C\u52A8"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.ops, " \u6B21")), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u7D2F\u8BA1\u65F6\u957F"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.hours, " \u5C0F\u65F6")), /*#__PURE__*/React.createElement("div", {
    className: "detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail-label"
  }, "\u6700\u8FD1\u884C\u52A8"), /*#__PURE__*/React.createElement("span", {
    className: "detail-value"
  }, selectedUser.lastOp)), selectedUser.note && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "detail-section-title"
  }, "\u5907\u6CE8"), /*#__PURE__*/React.createElement("div", {
    className: "detail-note"
  }, selectedUser.note))))))));
}
window.AdminPage = AdminPage;