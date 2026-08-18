function ProfileCenterPage() {
  const {
    canAccess,
    authLevel,
    identity
  } = useAuth();
  const {
    navigate
  } = useRouter();
  const walkerCode = "赤鸦";
  const walkerRank = authLevel === "topsecret" ? "界标" : "资深溯界者";
  const walkerOrg = identity?.organization || "衔尾蛇事务所";
  const walkerId = identity?.staffId || identity?.adminId || "IMAC-OA-0721";
  const walkerName = identity?.name || "陈夜";
  const [activeTab, setActiveTab] = React.useState("profile");
  const tabs = [{
    key: "profile",
    label: "个人档案",
    en: "PROFILE",
    icon: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M8.5 7 a4 4 0 1 0 0-8 a4 4 0 0 0 0 8"
  }, {
    key: "missions",
    label: "任务历史",
    en: "MISSIONS",
    icon: "M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 L13 2"
  }, {
    key: "training",
    label: "培训记录",
    en: "TRAINING",
    icon: "M22 10 v6 a2 2 0 0 1 -2 2 H4 a2 2 0 0 1 -2 -2 v-6 M2 10 l10 -7 l10 7"
  }, {
    key: "psych",
    label: "心理评估",
    en: "PSYCH EVAL",
    icon: "M12 21 s-7 -4.5 -7 -11 a4 4 0 0 1 7 -2.6 A4 4 0 0 1 19 10 c0 6.5 -7 11 -7 11z"
  }, {
    key: "cert",
    label: "认证申请",
    en: "CERTIFICATION",
    icon: "M12 2 L15 9 L22 9 L17 14 L19 21 L12 17 L5 21 L7 14 L2 9 L9 9 Z"
  }, {
    key: "opapp",
    label: "行动申请",
    en: "OPERATION APP",
    icon: "M9 11 l3 3 7 -7 M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z"
  }];

  // === 任务历史（赤鸦，不含赤月学院） ===
  const missionHistory = [{
    name: "失物公寓异常处置",
    code: "LOA-1045",
    level: "危险级",
    levelClass: "hazardous",
    role: "行动队长",
    time: "安珀历39年夏·18",
    result: "成功"
  }, {
    name: "镜像走廊勘探任务",
    code: "SPB-0890",
    level: "厄运级",
    levelClass: "doomed",
    role: "副队长",
    time: "安珀历39年夏·05",
    result: "成功"
  }, {
    name: "无声剧场调查",
    code: "CGA-0502",
    level: "危险级",
    levelClass: "hazardous",
    role: "队员",
    time: "安珀历39年春·22",
    result: "部分成功"
  }, {
    name: "旧图书馆认知异常记录",
    code: "CGA-0713",
    level: "危险级",
    levelClass: "hazardous",
    role: "队员",
    time: "安珀历39年春·08",
    result: "成功"
  }, {
    name: "重力偏移区测绘",
    code: "PHB-0815",
    level: "厄运级",
    levelClass: "doomed",
    role: "队员",
    time: "安珀历38年冬·14",
    result: "成功"
  }, {
    name: "冰下断层勘探",
    code: "PHA-0728",
    level: "危险级",
    levelClass: "hazardous",
    role: "队员",
    time: "安珀历38年秋·30",
    result: "成功"
  }, {
    name: "回声走廊空间测量",
    code: "SPA-1120",
    level: "普通级",
    levelClass: "ordinary",
    role: "副队长",
    time: "安珀历38年秋·12",
    result: "成功"
  }, {
    name: "记忆回廊认知干预",
    code: "CGB-0427",
    level: "厄运级",
    levelClass: "doomed",
    role: "队员",
    time: "安珀历38年夏·26",
    result: "成功"
  }];

  // === 培训记录 ===
  const trainingRecords = [{
    name: "溯界者基础准入培训",
    type: "准入培训",
    score: "优秀",
    date: "安珀历37年春·15",
    cert: "初级溯界者资格证"
  }, {
    name: "异常通讯器操作进阶",
    type: "装备培训",
    score: "合格",
    date: "安珀历37年夏·20",
    cert: "通讯装备操作证"
  }, {
    name: "锚定物使用与校准",
    type: "安全培训",
    score: "优秀",
    date: "安珀历37年秋·08",
    cert: "锚定操作资质"
  }, {
    name: "急救与同化抑制剂使用",
    type: "医疗培训",
    score: "合格",
    date: "安珀历38年春·03",
    cert: "外勤急救资质"
  }, {
    name: "认知异常识别初阶",
    type: "专业培训",
    score: "良好",
    date: "安珀历38年夏·11",
    cert: "认知异常识别证"
  }, {
    name: "队长指挥与决策培训",
    type: "管理培训",
    score: "良好",
    date: "安珀历39年春·25",
    cert: "行动指挥资格"
  }, {
    name: "深渊级异常安全规程",
    type: "安全培训",
    score: "优秀",
    date: "安珀历39年夏·02",
    cert: "深渊级准入培训"
  }];

  // === 心理评估记录 ===
  const psychRecords = [{
    date: "安珀历39年夏·28",
    assessor: "许知遥 主治医师",
    level: "正常",
    index: "1.2%",
    advice: "保持作息节律，秋季复测",
    status: "ok"
  }, {
    date: "安珀历39年春·12",
    assessor: "许知遥 主治医师",
    level: "正常",
    index: "1.8%",
    advice: "无特殊建议，常规监测",
    status: "ok"
  }, {
    date: "安珀历38年冬·05",
    assessor: "唐敏 副主任医师",
    level: "关注",
    index: "3.4%",
    advice: "CGA-0502行动后建议增加冥想训练",
    status: "warn"
  }, {
    date: "安珀历38年秋·18",
    assessor: "许知遥 主治医师",
    level: "正常",
    index: "2.1%",
    advice: "无特殊建议",
    status: "ok"
  }, {
    date: "安珀历38年夏·03",
    assessor: "唐敏 副主任医师",
    level: "正常",
    index: "2.5%",
    advice: "初入外勤，建议每月自评",
    status: "ok"
  }];

  // === 认证申请 ===
  const [certAppList, setCertAppList] = React.useState([{
    target: "首席溯界者",
    type: "职级晋升",
    submitDate: "安珀历39年夏·26",
    status: "审核中",
    reviewer: "衔尾蛇事务所评定委员会"
  }, {
    target: "深渊级行动资质",
    type: "特殊资质",
    submitDate: "安珀历39年春·18",
    status: "已通过",
    reviewer: "IMAC资质认证中心"
  }, {
    target: "谈判专家认证",
    type: "特殊资质",
    submitDate: "安珀历38年冬·12",
    status: "已驳回",
    reviewer: "认知异常专业委员会",
    reason: "认知类异常参与经验不足，建议积累后重新申请"
  }]);
  const [certForm, setCertForm] = React.useState({
    target: "首席溯界者",
    reason: ""
  });
  const [certSubmitted, setCertSubmitted] = React.useState(false);
  const [showCertForm, setShowCertForm] = React.useState(false);
  const submitCert = () => {
    if (!certForm.reason.trim()) return;
    setCertAppList([{
      target: certForm.target,
      type: certForm.target.includes("资质") || certForm.target.includes("认证") ? "特殊资质" : "职级晋升",
      submitDate: "安珀历39年夏·30",
      status: "审核中",
      reviewer: "待分配审核人"
    }, ...certAppList]);
    setCertSubmitted(true);
    setShowCertForm(false);
  };

  // === 行动申请 ===
  const [opAppList, setOpAppList] = React.useState([{
    opCode: "LOA-1045",
    opName: "失物公寓异常处置",
    type: "异常行动参与申请",
    submitDate: "安珀历39年夏·15",
    status: "已批准",
    role: "行动队长"
  }, {
    opCode: "SPB-0890",
    opName: "镜像走廊勘探任务",
    type: "异常行动参与申请",
    submitDate: "安珀历39年夏·02",
    status: "已批准",
    role: "副队长"
  }, {
    opCode: "CGA-0502",
    opName: "无声剧场调查",
    type: "异常行动参与申请",
    submitDate: "安珀历39年春·18",
    status: "已驳回",
    role: "—",
    reason: "同期已有其他任务安排"
  }]);

  // 招人中的行动：待命（异常行动参与）/ 进行中+待命（救援队、后勤保障）
  const standbyOps = [{
    code: "SPA-1120",
    name: "回声走廊空间偏移"
  }];
  const supportOps = [{
    code: "LOA-0073",
    name: "赤月学院异常介入行动"
  }, {
    code: "PHA-0182",
    name: "洛林自由市边境裂隙"
  }, {
    code: "TMB-0089",
    name: "白松城冻土层时间停滞"
  }, {
    code: "SPA-1120",
    name: "回声走廊空间偏移"
  }];
  // 异常行动许可：可调查未解决的异常（活跃/休眠均可，坍缩与安全类不开放）
  const anomalyTargets = [{
    code: "LOA-0001",
    name: "灰港仓库"
  }, {
    code: "LOA-0073",
    name: "赤月学院"
  }, {
    code: "SPA-0021",
    name: "无尽楼梯"
  }, {
    code: "SPB-0089",
    name: "镜像医院"
  }, {
    code: "TMA-0045",
    name: "雾中列车"
  }, {
    code: "PHA-0182",
    name: "洛林裂隙"
  }];
  // 角色：异常行动参与（无行动队长）；救援队/后勤保障为各自详细分工，技术支援类两队均含
  const joinRoles = ["副队长", "队员", "技术支援"];
  const techSupportRoles = ["通讯技术支援", "装备技术支援", "测绘技术支援"];
  const rescueRoles = ["前线救援员", "医疗急救员", "搜救侦察员", "伤员转运员", "破拆作业员", "绳索技术员", ...techSupportRoles];
  const logisticsRoles = ["物资管理", "交通调度", "装备维护", "营地保障", ...techSupportRoles];
  const [opForm, setOpForm] = React.useState({
    opType: "异常行动参与申请",
    opCode: "SPA-1120",
    people: "2",
    gear: "",
    role: "队员",
    reason: "",
    availability: "夏·31 起可待命"
  });
  const [opSubmitted, setOpSubmitted] = React.useState(false);
  const [showOpForm, setShowOpForm] = React.useState(false);
  const opNameOf = (type, code) => {
    if (type === "异常行动许可申请") {
      const t = anomalyTargets.find(a => a.code === code);
      return (t ? t.name : code) + " · 独立调查";
    }
    if (type === "装备/资源支援申请") return (opForm.gear.trim() || "装备/资源") + " · 装备支援";
    const pool = type === "救援队申请" || type === "后勤保障申请" ? supportOps : standbyOps;
    const t = pool.find(o => o.code === code);
    return t ? t.name : code;
  };
  const submitOp = () => {
    if (!opForm.reason.trim()) return;
    if (opForm.opType === "装备/资源支援申请" && !opForm.gear.trim()) return;
    let role = "待分配";
    if (opForm.opType === "异常行动许可申请") role = "独立行动负责人";else if (opForm.opType === "装备/资源支援申请") role = "装备/后勤支援";else role = opForm.role;
    const entry = {
      opCode: opForm.opType === "装备/资源支援申请" ? "GEAR" : opForm.opCode,
      opName: opNameOf(opForm.opType, opForm.opCode),
      type: opForm.opType,
      submitDate: "安珀历39年夏·30",
      status: "审核中",
      role
    };
    if (opForm.opType === "异常行动许可申请") entry.detail = `申请人数：${opForm.people} 人`;
    setOpAppList([entry, ...opAppList]);
    setOpSubmitted(true);
    setShowOpForm(false);
  };

  // === 个人档案编辑 ===
  const [editing, setEditing] = React.useState(false);
  const [profile, setProfile] = React.useState({
    name: walkerName,
    code: walkerCode,
    rank: walkerRank,
    org: walkerOrg,
    id: walkerId,
    department: "外勤二队 · 队长",
    status: "在岗",
    joinDate: "安珀历37年春·01",
    access: authLevel === "topsecret" ? "绝密级" : "机密级",
    contact: "内部通讯 #7241",
    anchor: "制式金属锚"
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "profile-center-page"
  }, /*#__PURE__*/React.createElement("style", null, `
        .profile-center-page {
          min-height: 100vh;
          padding-top: 64px;
          background-color: #07070a;
          background-image:
            linear-gradient(rgba(196, 40, 40, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196, 40, 40, 0.04) 1px, transparent 1px);
          background-size: 50px 50px;
          color: var(--text-primary);
          padding-bottom: 40px;
        }
        .profile-center-page::before {
          content: "";
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px;
          background-color: var(--accent-red-bright);
          box-shadow: 0 0 8px rgba(196, 40, 40, 0.5);
          z-index: 1000;
        }
        .pc-hero {
          background: linear-gradient(180deg, #0a0a0e 0%, #0d0d12 100%);
          border-bottom: 1px solid var(--border-color);
          padding: 24px 0 18px;
        }
        .pc-hero-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .pc-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          cursor: pointer;
          padding: 6px 12px;
          border: 1px solid var(--border-color);
          transition: all 0.2s;
        }
        .pc-back:hover {
          color: var(--accent-red-bright);
          border-color: var(--accent-red-bright);
        }
        .pc-title-group { display: flex; flex-direction: column; gap: 4px; }
        .pc-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--accent-red-bright);
        }
        .pc-title {
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .pc-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 16px;
          margin-top: 16px;
        }
        .pc-sidebar {
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: #0d0d12;
          border: 1px solid var(--border-color);
          padding: 12px 8px;
          align-self: start;
          position: sticky;
          top: 80px;
        }
        .pc-tab {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          cursor: pointer;
          color: var(--text-secondary);
          font-size: 13px;
          transition: all 0.2s;
          border-left: 2px solid transparent;
        }
        .pc-tab:hover {
          color: var(--text-primary);
          background: rgba(196, 40, 40, 0.04);
        }
        .pc-tab.active {
          color: var(--accent-red-bright);
          background: rgba(196, 40, 40, 0.08);
          border-left-color: var(--accent-red-bright);
          font-weight: 600;
        }
        .pc-tab svg { width: 16px; height: 16px; flex-shrink: 0; }
        .pc-tab-label { display: flex; flex-direction: column; gap: 2px; }
        .pc-tab-en {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .pc-tab.active .pc-tab-en { color: rgba(196, 40, 40, 0.7); }

        .pc-content { min-width: 0; }

        .pc-card {
          background-color: #0d0d12;
          border: 1px solid var(--border-color);
          overflow: hidden;
          margin-bottom: 16px;
        }
        .pc-card-header {
          padding: 14px 20px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(90deg, rgba(196, 40, 40, 0.06), transparent);
        }
        .pc-card-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .pc-card-title .code {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
        }
        .pc-card-en {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }
        .pc-card-body { padding: 20px; }

        /* Profile */
        .pc-profile-head {
          display: flex;
          gap: 24px;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .pc-avatar {
          width: 80px; height: 80px;
          border-radius: 50%;
          border: 2px solid var(--accent-red-bright);
          display: flex; align-items: center; justifyContent: center;
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 700;
          color: var(--accent-red-bright);
          background: radial-gradient(circle, rgba(196, 40, 40, 0.2), transparent);
          flex-shrink: 0;
        }
        .pc-profile-meta h2 {
          font-family: var(--font-serif);
          font-size: 22px;
          margin: 0 0 4px;
          color: var(--text-primary);
        }
        .pc-profile-id {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 10px;
        }
        .pc-badges { display: flex; gap: 8px; flex-wrap: wrap; }
        .pc-badge {
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 10px;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .pc-badge.rank {
          background: rgba(196, 40, 40, 0.15);
          color: var(--accent-red-bright);
          border: 1px solid rgba(196, 40, 40, 0.3);
        }
        .pc-badge.status-ok {
          background: rgba(47, 158, 68, 0.12);
          color: #5fb372;
          border: 1px solid rgba(47, 158, 68, 0.3);
        }
        .pc-badge.access {
          background: rgba(122, 58, 176, 0.15);
          color: #b88ed9;
          border: 1px solid rgba(122, 58, 176, 0.35);
        }
        .pc-edit-btn {
          background: none;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 6px 14px;
          font-size: 12px;
          cursor: pointer;
          font-family: var(--font-mono);
          transition: all 0.2s;
        }
        .pc-edit-btn:hover {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }
        .pc-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
        }
        .pc-info-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid var(--border-color);
          font-size: 13px;
        }
        .pc-info-label { color: var(--text-tertiary); }
        .pc-info-value { color: var(--text-primary); }
        .pc-info-value input {
          background: rgba(10, 10, 14, 0.8);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 4px 8px;
          font-size: 12px;
          width: 180px;
          text-align: right;
        }
        .pc-info-value input:focus { outline: none; border-color: var(--accent-red-bright); }

        /* Missions */
        .pc-table-head, .pc-table-row {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.7fr 0.8fr 1fr 0.7fr;
          gap: 8px;
          padding: 10px 12px;
          font-size: 12px;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        .pc-table-head {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(196, 40, 40, 0.04);
        }
        .pc-table-row:last-child { border-bottom: none; }
        .pc-table-row:hover { background: rgba(196, 40, 40, 0.03); }
        .level-badge {
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 2px;
          font-family: var(--font-mono);
          letter-spacing: 0.08em;
          display: inline-block;
        }
        .level-badge.ordinary { background: rgba(120, 120, 130, 0.15); color: #8a8a96; border: 1px solid rgba(120, 120, 130, 0.3); }
        .level-badge.hazardous { background: rgba(212, 104, 40, 0.15); color: #d68a4a; border: 1px solid rgba(212, 104, 40, 0.3); }
        .level-badge.doomed { background: rgba(196, 40, 40, 0.15); color: var(--accent-red-bright); border: 1px solid rgba(196, 40, 40, 0.3); }
        .result-success { color: var(--level-ordinary); }
        .result-partial { color: var(--level-hazardous); }
        .result-fail { color: var(--accent-red-bright); }
        .mission-code { font-family: var(--font-mono); color: var(--text-tertiary); font-size: 11px; }

        /* Training */
        .train-table-head, .train-table-row {
          display: grid;
          grid-template-columns: 1.5fr 0.8fr 0.7fr 1fr 1.2fr;
          gap: 8px;
          padding: 10px 12px;
          font-size: 12px;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        .train-table-head {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(196, 40, 40, 0.04);
        }
        .train-table-row:last-child { border-bottom: none; }
        .score-excellent { color: var(--level-ordinary); font-weight: 600; }
        .score-good { color: var(--level-hazardous); }
        .score-pass { color: var(--text-secondary); }
        .cert-name { color: var(--accent-red-bright); font-family: var(--font-mono); font-size: 11px; }

        /* Psych */
        .psych-overview {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        .psych-stat-card {
          background: rgba(10, 10, 14, 0.6);
          border: 1px solid var(--border-color);
          padding: 14px;
          text-align: center;
        }
        .psych-stat-label {
          font-size: 11px;
          color: var(--text-tertiary);
          margin-bottom: 6px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }
        .psych-stat-value {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
        }
        .psych-stat-value.ok { color: var(--level-ordinary); }
        .psych-stat-value.warn { color: var(--level-hazardous); }
        .psych-table-head, .psych-table-row {
          display: grid;
          grid-template-columns: 1fr 1fr 0.8fr 0.8fr 1.4fr;
          gap: 8px;
          padding: 10px 12px;
          font-size: 12px;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        .psych-table-head {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(196, 40, 40, 0.04);
        }
        .psych-table-row:last-child { border-bottom: none; }

        /* Cert / Op Apply */
        .apply-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .apply-btn {
          background: rgba(196, 40, 40, 0.12);
          border: 1px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          padding: 6px 16px;
          font-size: 12px;
          cursor: pointer;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
          transition: all 0.2s;
        }
        .apply-btn:hover { background: rgba(196, 40, 40, 0.25); }
        .apply-form {
          padding: 14px;
          background: rgba(10, 10, 14, 0.6);
          border: 1px solid var(--border-color);
          margin-bottom: 14px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }
        .form-field { display: flex; flex-direction: column; gap: 4px; }
        .form-label {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .form-input, .form-select, .form-textarea {
          background: rgba(10, 10, 14, 0.9);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 7px 10px;
          font-size: 12px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--accent-red-bright); }
        .form-textarea { resize: vertical; min-height: 70px; }
        .form-actions { display: flex; gap: 8px; margin-top: 4px; }
        .form-submit {
          background: rgba(196, 40, 40, 0.15);
          border: 1px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          padding: 7px 18px;
          font-size: 12px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s;
        }
        .form-submit:hover { background: rgba(196, 40, 40, 0.28); }
        .form-cancel {
          background: none;
          border: 1px solid var(--border-color);
          color: var(--text-tertiary);
          padding: 7px 18px;
          font-size: 12px;
          cursor: pointer;
          font-family: var(--font-mono);
        }
        .form-cancel:hover { border-color: var(--text-secondary); color: var(--text-secondary); }
        .form-success {
          padding: 10px 14px;
          background: rgba(47, 158, 68, 0.08);
          border: 1px solid rgba(47, 158, 68, 0.35);
          color: #5fb372;
          font-size: 12px;
          margin-bottom: 14px;
        }
        .cert-table-head, .cert-table-row {
          display: grid;
          grid-template-columns: 1fr 0.8fr 1fr 0.8fr 1fr;
          gap: 8px;
          padding: 10px 12px;
          font-size: 12px;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        .cert-table-head {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(196, 40, 40, 0.04);
        }
        .cert-table-row:last-child { border-bottom: none; }
        .cert-table-row.rejected .cert-status { color: var(--accent-red-bright); }
        .cert-table-row.approved .cert-status { color: var(--level-ordinary); }
        .cert-table-row.pending .cert-status { color: var(--level-hazardous); }
        .op-table-head, .op-table-row {
          display: grid;
          grid-template-columns: 1fr 1.4fr 1fr 0.8fr 0.8fr;
          gap: 8px;
          padding: 10px 12px;
          font-size: 12px;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        .op-table-head {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(196, 40, 40, 0.04);
        }
        .op-table-row:last-child { border-bottom: none; }
        .op-code { font-family: var(--font-mono); color: var(--text-tertiary); font-size: 11px; }

        @media (max-width: 900px) {
          .pc-layout { grid-template-columns: 1fr; }
          .pc-sidebar {
            position: static;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 8px;
          }
          .pc-tab {
            flex: 1 1 45%;
            border-left: none;
            border-bottom: 2px solid transparent;
            padding: 8px 10px;
          }
          .pc-tab.active {
            border-left: none;
            border-bottom-color: var(--accent-red-bright);
          }
          .pc-info-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .pc-table-head, .pc-table-row { grid-template-columns: 1fr 1fr; }
          .train-table-head, .train-table-row { grid-template-columns: 1fr 1fr; }
          .psych-table-head, .psych-table-row { grid-template-columns: 1fr 1fr; }
          .cert-table-head, .cert-table-row { grid-template-columns: 1fr 1fr; }
          .op-table-head, .op-table-row { grid-template-columns: 1fr 1fr; }
          .psych-overview { grid-template-columns: 1fr; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    className: "pc-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pc-label"
  }, "IMAC \xB7 PERSONNEL FILE"), /*#__PURE__*/React.createElement("h1", {
    className: "pc-title"
  }, "\u4E2A\u4EBA\u4E2D\u5FC3")), /*#__PURE__*/React.createElement("div", {
    className: "pc-back",
    onClick: () => navigate("/portal")
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5 M12 19l-7-7 7-7"
  })), "\u8FD4\u56DE\u6307\u6325\u4E2D\u5FC3")))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-sidebar"
  }, tabs.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.key,
    className: `pc-tab ${activeTab === t.key ? "active" : ""}`,
    onClick: () => setActiveTab(t.key)
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: t.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "pc-tab-label"
  }, /*#__PURE__*/React.createElement("span", null, t.label), /*#__PURE__*/React.createElement("span", {
    className: "pc-tab-en"
  }, t.en))))), /*#__PURE__*/React.createElement("div", {
    className: "pc-content"
  }, activeTab === "profile" && /*#__PURE__*/React.createElement("div", {
    className: "pc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "INFO"), "\u4E2A\u4EBA\u6863\u6848"), /*#__PURE__*/React.createElement("span", {
    className: "pc-card-en"
  }, "PERSONNEL PROFILE")), /*#__PURE__*/React.createElement("div", {
    className: "pc-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-profile-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-avatar"
  }, profile.code.charAt(0)), /*#__PURE__*/React.createElement("div", {
    className: "pc-profile-meta",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h2", null, profile.code, " \xB7 ", profile.name), /*#__PURE__*/React.createElement("div", {
    className: "pc-profile-id"
  }, profile.id), /*#__PURE__*/React.createElement("div", {
    className: "pc-badges"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pc-badge rank"
  }, profile.rank), /*#__PURE__*/React.createElement("span", {
    className: "pc-badge status-ok"
  }, "\u25CF ", profile.status), /*#__PURE__*/React.createElement("span", {
    className: "pc-badge access"
  }, profile.access))), /*#__PURE__*/React.createElement("button", {
    className: "pc-edit-btn",
    onClick: () => setEditing(!editing)
  }, editing ? "保存" : "编辑资料")), /*#__PURE__*/React.createElement("div", {
    className: "pc-info-grid"
  }, [{
    key: "name",
    label: "姓名"
  }, {
    key: "code",
    label: "代号"
  }, {
    key: "rank",
    label: "职级"
  }, {
    key: "org",
    label: "所属组织"
  }, {
    key: "id",
    label: "IMAC编号"
  }, {
    key: "department",
    label: "部门/职务"
  }, {
    key: "joinDate",
    label: "入职时间"
  }, {
    key: "status",
    label: "当前状态"
  }, {
    key: "access",
    label: "权限等级"
  }, {
    key: "contact",
    label: "内部通讯"
  }, {
    key: "anchor",
    label: "个人锚定物"
  }].map(f => /*#__PURE__*/React.createElement("div", {
    key: f.key,
    className: "pc-info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pc-info-label"
  }, f.label), /*#__PURE__*/React.createElement("span", {
    className: "pc-info-value"
  }, editing && ["name", "contact", "anchor"].includes(f.key) ? /*#__PURE__*/React.createElement("input", {
    value: profile[f.key],
    onChange: e => setProfile({
      ...profile,
      [f.key]: e.target.value
    })
  }) : profile[f.key])))))), activeTab === "missions" && /*#__PURE__*/React.createElement("div", {
    className: "pc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "MIS"), "\u4EFB\u52A1\u5386\u53F2"), /*#__PURE__*/React.createElement("span", {
    className: "pc-card-en"
  }, "MISSION HISTORY")), /*#__PURE__*/React.createElement("div", {
    className: "pc-card-body",
    style: {
      padding: "12px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-table-head"
  }, /*#__PURE__*/React.createElement("span", null, "\u884C\u52A8\u540D\u79F0"), /*#__PURE__*/React.createElement("span", null, "\u7F16\u53F7"), /*#__PURE__*/React.createElement("span", null, "\u7B49\u7EA7"), /*#__PURE__*/React.createElement("span", null, "\u89D2\u8272"), /*#__PURE__*/React.createElement("span", null, "\u65F6\u95F4"), /*#__PURE__*/React.createElement("span", null, "\u7ED3\u679C")), missionHistory.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "pc-table-row"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, m.name), /*#__PURE__*/React.createElement("span", {
    className: "mission-code",
    style: {
      cursor: "pointer",
      color: "var(--steel-blue-light)",
      borderBottom: "1px dotted rgba(106,122,140,0.6)"
    },
    onClick: () => navigate(`/anomaly/${m.code}`),
    title: "\u67E5\u770B\u5F02\u5E38\u5F52\u6863",
    onMouseEnter: e => {
      e.currentTarget.style.color = "var(--accent-red-bright)";
      e.currentTarget.style.borderBottomColor = "var(--accent-red-bright)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = "var(--steel-blue-light)";
      e.currentTarget.style.borderBottomColor = "rgba(106,122,140,0.6)";
    }
  }, m.code), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: `level-badge ${m.levelClass}`
  }, m.level)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, m.role), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, m.time), /*#__PURE__*/React.createElement("span", {
    className: `result-${m.result === "成功" ? "success" : m.result === "部分成功" ? "partial" : "fail"}`
  }, m.result))))), activeTab === "training" && /*#__PURE__*/React.createElement("div", {
    className: "pc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "TRN"), "\u57F9\u8BAD\u8BB0\u5F55"), /*#__PURE__*/React.createElement("span", {
    className: "pc-card-en"
  }, "TRAINING RECORDS")), /*#__PURE__*/React.createElement("div", {
    className: "pc-card-body",
    style: {
      padding: "12px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "train-table-head"
  }, /*#__PURE__*/React.createElement("span", null, "\u8BFE\u7A0B\u540D\u79F0"), /*#__PURE__*/React.createElement("span", null, "\u7C7B\u578B"), /*#__PURE__*/React.createElement("span", null, "\u6210\u7EE9"), /*#__PURE__*/React.createElement("span", null, "\u7ED3\u8BAD\u65E5\u671F"), /*#__PURE__*/React.createElement("span", null, "\u83B7\u5F97\u8BC1\u4E66")), trainingRecords.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "train-table-row"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, t.name), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, t.type), /*#__PURE__*/React.createElement("span", {
    className: `score-${t.score === "优秀" ? "excellent" : t.score === "良好" ? "good" : "pass"}`
  }, t.score), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, t.date), /*#__PURE__*/React.createElement("span", {
    className: "cert-name"
  }, t.cert))))), activeTab === "psych" && /*#__PURE__*/React.createElement("div", {
    className: "pc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "PSY"), "\u5FC3\u7406\u8BC4\u4F30"), /*#__PURE__*/React.createElement("span", {
    className: "pc-card-en"
  }, "PSYCHOLOGICAL EVALUATION")), /*#__PURE__*/React.createElement("div", {
    className: "pc-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "psych-overview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-label"
  }, "\u5F53\u524D\u72B6\u6001"), /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-value ok"
  }, "\u6B63\u5E38")), /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-label"
  }, "\u540C\u5316\u6307\u6570"), /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-value ok"
  }, "1.2%")), /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-label"
  }, "\u4E0B\u6B21\u8BC4\u4F30"), /*#__PURE__*/React.createElement("div", {
    className: "psych-stat-value",
    style: {
      color: "var(--accent-red-bright)"
    }
  }, "\u79CB\xB720"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 -20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "psych-table-head"
  }, /*#__PURE__*/React.createElement("span", null, "\u8BC4\u4F30\u65E5\u671F"), /*#__PURE__*/React.createElement("span", null, "\u8BC4\u4F30\u5E08"), /*#__PURE__*/React.createElement("span", null, "\u8BC4\u5B9A\u7B49\u7EA7"), /*#__PURE__*/React.createElement("span", null, "\u540C\u5316\u6307\u6570"), /*#__PURE__*/React.createElement("span", null, "\u5EFA\u8BAE")), psychRecords.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "psych-table-row"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, p.date), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, p.assessor), /*#__PURE__*/React.createElement("span", {
    className: p.status === "ok" ? "result-success" : "result-partial"
  }, p.level), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)",
      fontFamily: "var(--font-mono)"
    }
  }, p.index), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)",
      fontSize: "11px"
    }
  }, p.advice)))))), activeTab === "cert" && /*#__PURE__*/React.createElement("div", {
    className: "pc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "CERT"), "\u8BA4\u8BC1\u7533\u8BF7"), /*#__PURE__*/React.createElement("span", {
    className: "pc-card-en"
  }, "CERTIFICATION APPLICATION")), /*#__PURE__*/React.createElement("div", {
    className: "pc-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "apply-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "var(--text-secondary)"
    }
  }, "\u5F53\u524D\u804C\u7EA7\uFF1A", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-primary)"
    }
  }, walkerRank), "\xA0\xB7\xA0 \u53EF\u7533\u8BF7\uFF1A", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--accent-red-bright)"
    }
  }, "\u9996\u5E2D\u6EAF\u754C\u8005"), " \u53CA\u591A\u9879\u7279\u6B8A\u8D44\u8D28"), /*#__PURE__*/React.createElement("button", {
    className: "apply-btn",
    onClick: () => {
      setShowCertForm(!showCertForm);
      setCertSubmitted(false);
    }
  }, showCertForm ? "取消申请" : "+ 提交新申请")), certSubmitted && /*#__PURE__*/React.createElement("div", {
    className: "form-success"
  }, "\u2713 \u7533\u8BF7\u5DF2\u63D0\u4EA4\uFF0C\u7B49\u5F85\u5BA1\u6838\u3002\u5BA1\u6838\u7ED3\u679C\u5C06\u901A\u8FC7\u7CFB\u7EDF\u90AE\u7BB1\u901A\u77E5\u3002"), showCertForm && /*#__PURE__*/React.createElement("div", {
    className: "apply-form"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u7533\u8BF7\u7C7B\u578B"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: certForm.target,
    onChange: e => setCertForm({
      ...certForm,
      target: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "\u9996\u5E2D\u6EAF\u754C\u8005"), /*#__PURE__*/React.createElement("option", null, "\u6DF1\u6E0A\u7EA7\u884C\u52A8\u8D44\u8D28"), /*#__PURE__*/React.createElement("option", null, "\u8C08\u5224\u4E13\u5BB6\u8BA4\u8BC1"), /*#__PURE__*/React.createElement("option", null, "\u951A\u5B9A\u6280\u672F\u4E13\u5BB6"), /*#__PURE__*/React.createElement("option", null, "\u533B\u7597\u6025\u6551\u8BA4\u8BC1"))), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u63A8\u8350\u4EBA\uFF08\u9009\u586B\uFF09"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "\u4EE3\u53F7\u6216\u7F16\u53F7"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-field",
    style: {
      marginBottom: "10px"
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u7533\u8BF7\u7406\u7531"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-textarea",
    value: certForm.reason,
    onChange: e => setCertForm({
      ...certForm,
      reason: e.target.value
    }),
    placeholder: "\u8BF7\u7B80\u8981\u8BF4\u660E\u7533\u8BF7\u7406\u7531\u3001\u4E3B\u8981\u8D21\u732E\u4E0E\u4EE3\u8868\u6027\u884C\u52A8..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field",
    style: {
      marginBottom: "10px"
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u8BC1\u660E\u6750\u6599\uFF08\u6A21\u62DF\u4E0A\u4F20\uFF09"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "11px",
      color: "var(--text-tertiary)",
      padding: "8px",
      border: "1px dashed var(--border-color)",
      textAlign: "center"
    }
  }, "[ \u70B9\u51FB\u4E0A\u4F20\u76F8\u5173\u8BC1\u660E\u6750\u6599 \xB7 \u652F\u6301 PDF/JPG \xB7 \u5355\u6587\u4EF6 \u226410MB ]")), /*#__PURE__*/React.createElement("div", {
    className: "form-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "form-submit",
    onClick: submitCert
  }, "\u63D0\u4EA4\u7533\u8BF7"), /*#__PURE__*/React.createElement("button", {
    className: "form-cancel",
    onClick: () => setShowCertForm(false)
  }, "\u53D6\u6D88"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "var(--text-tertiary)",
      marginBottom: "8px"
    }
  }, "\u7533\u8BF7\u8BB0\u5F55"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-color)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cert-table-head"
  }, /*#__PURE__*/React.createElement("span", null, "\u76EE\u6807\u8BA4\u8BC1"), /*#__PURE__*/React.createElement("span", null, "\u7C7B\u578B"), /*#__PURE__*/React.createElement("span", null, "\u63D0\u4EA4\u65E5\u671F"), /*#__PURE__*/React.createElement("span", null, "\u72B6\u6001"), /*#__PURE__*/React.createElement("span", null, "\u5BA1\u6838\u4EBA")), certAppList.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `cert-table-row ${c.status === "已通过" ? "approved" : c.status === "审核中" ? "pending" : "rejected"}`
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, c.target), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, c.type), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, c.submitDate), /*#__PURE__*/React.createElement("span", {
    className: "cert-status"
  }, c.status), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)",
      fontSize: "11px"
    }
  }, c.reviewer)))))), activeTab === "opapp" && /*#__PURE__*/React.createElement("div", {
    className: "pc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-card-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, "OP"), "\u884C\u52A8\u7533\u8BF7"), /*#__PURE__*/React.createElement("span", {
    className: "pc-card-en"
  }, "OPERATION APPLICATION")), /*#__PURE__*/React.createElement("div", {
    className: "pc-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "apply-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "var(--text-secondary)"
    }
  }, "\u5F02\u5E38\u884C\u52A8\u53C2\u4E0E\u9650\u5F85\u547D\u884C\u52A8 \xB7 \u5F02\u5E38\u884C\u52A8\u8BB8\u53EF\u53EF\u8C03\u67E5\u672A\u89E3\u51B3\u5F02\u5E38\uFF08\u6D3B\u8DC3/\u4F11\u7720\uFF09 \xB7 \u6551\u63F4\u961F/\u540E\u52E4\u4FDD\u969C\u53EF\u53C2\u4E0E\u8FDB\u884C\u4E2D\u884C\u52A8"), /*#__PURE__*/React.createElement("button", {
    className: "apply-btn",
    onClick: () => {
      setShowOpForm(!showOpForm);
      setOpSubmitted(false);
    }
  }, showOpForm ? "取消申请" : "+ 提交新申请")), opSubmitted && /*#__PURE__*/React.createElement("div", {
    className: "form-success"
  }, "\u2713 \u884C\u52A8\u7533\u8BF7\u5DF2\u63D0\u4EA4\uFF0C\u7B49\u5F85\u6307\u6325\u4E2D\u5FC3\u5BA1\u6279\u3002\u5BA1\u6279\u7ED3\u679C\u5C06\u901A\u8FC7\u7CFB\u7EDF\u90AE\u7BB1\u901A\u77E5\u3002"), showOpForm && /*#__PURE__*/React.createElement("div", {
    className: "apply-form"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u7533\u8BF7\u7C7B\u578B"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: opForm.opType,
    onChange: e => {
      const v = e.target.value;
      const defRole = v === "救援队申请" ? "前线救援员" : v === "后勤保障申请" ? "物资管理" : "队员";
      setOpForm({
        ...opForm,
        opType: v,
        role: defRole
      });
    }
  }, /*#__PURE__*/React.createElement("option", null, "\u5F02\u5E38\u884C\u52A8\u53C2\u4E0E\u7533\u8BF7"), /*#__PURE__*/React.createElement("option", null, "\u5F02\u5E38\u884C\u52A8\u8BB8\u53EF\u7533\u8BF7"), /*#__PURE__*/React.createElement("option", null, "\u88C5\u5907/\u8D44\u6E90\u652F\u63F4\u7533\u8BF7"), /*#__PURE__*/React.createElement("option", null, "\u6551\u63F4\u961F\u7533\u8BF7"), /*#__PURE__*/React.createElement("option", null, "\u540E\u52E4\u4FDD\u969C\u7533\u8BF7"))), opForm.opType === "异常行动许可申请" ? /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u9009\u62E9\u8C03\u67E5\u5F02\u5E38"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: opForm.opCode,
    onChange: e => setOpForm({
      ...opForm,
      opCode: e.target.value
    })
  }, anomalyTargets.map(a => /*#__PURE__*/React.createElement("option", {
    key: a.code,
    value: a.code
  }, a.code, " ", a.name)))) : opForm.opType === "装备/资源支援申请" ? /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u6240\u9700\u88C5\u5907/\u8D44\u6E90"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    value: opForm.gear,
    onChange: e => setOpForm({
      ...opForm,
      gear: e.target.value
    }),
    placeholder: "\u586B\u5199\u6240\u9700\u88C5\u5907\u6216\u8D44\u6E90\uFF0C\u5982\uFF1AMK-III \u4FE1\u6807\u9635\u5217 \xD72\u3001\u540C\u5316\u6291\u5236\u5242 \xD710\u3001\u8D8A\u91CE\u8F7D\u5177 \xD71..."
  })) : /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u76EE\u6807\u884C\u52A8\u7F16\u53F7"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: opForm.opCode,
    onChange: e => setOpForm({
      ...opForm,
      opCode: e.target.value
    })
  }, (opForm.opType === "救援队申请" || opForm.opType === "后勤保障申请" ? supportOps : standbyOps).map(o => /*#__PURE__*/React.createElement("option", {
    key: o.code,
    value: o.code
  }, o.code, " ", o.name))))), opForm.opType !== "装备/资源支援申请" && /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u884C\u52A8\u65F6\u95F4"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    value: opForm.availability,
    onChange: e => setOpForm({
      ...opForm,
      availability: e.target.value
    })
  })), opForm.opType === "异常行动许可申请" ? /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u7533\u8BF7\u4EBA\u6570"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: opForm.people,
    onChange: e => setOpForm({
      ...opForm,
      people: e.target.value
    })
  }, ["1", "2", "3", "4", "5", "6", "7", "8"].map(n => /*#__PURE__*/React.createElement("option", {
    key: n,
    value: n
  }, n, " \u4EBA")))) : /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u7533\u8BF7\u89D2\u8272"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: opForm.role,
    onChange: e => setOpForm({
      ...opForm,
      role: e.target.value
    })
  }, (opForm.opType === "救援队申请" ? rescueRoles : opForm.opType === "后勤保障申请" ? logisticsRoles : joinRoles).map(r => /*#__PURE__*/React.createElement("option", {
    key: r,
    value: r
  }, r))))), /*#__PURE__*/React.createElement("div", {
    className: "form-field",
    style: {
      marginBottom: "10px"
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\u7533\u8BF7\u7406\u7531"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-textarea",
    value: opForm.reason,
    onChange: e => setOpForm({
      ...opForm,
      reason: e.target.value
    }),
    placeholder: "\u8BF7\u7B80\u8FF0\u7533\u8BF7\u7406\u7531\u3001\u76F8\u5173\u7ECF\u9A8C\u4E0E\u9884\u671F\u8D21\u732E..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "form-submit",
    onClick: submitOp
  }, "\u63D0\u4EA4\u7533\u8BF7"), /*#__PURE__*/React.createElement("button", {
    className: "form-cancel",
    onClick: () => setShowOpForm(false)
  }, "\u53D6\u6D88"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "var(--text-tertiary)",
      marginBottom: "8px"
    }
  }, "\u6211\u7684\u7533\u8BF7\u8BB0\u5F55"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-color)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-table-head"
  }, /*#__PURE__*/React.createElement("span", null, "\u884C\u52A8\u7F16\u53F7"), /*#__PURE__*/React.createElement("span", null, "\u884C\u52A8\u540D\u79F0"), /*#__PURE__*/React.createElement("span", null, "\u7533\u8BF7\u7C7B\u578B"), /*#__PURE__*/React.createElement("span", null, "\u7533\u8BF7\u65F6\u95F4"), /*#__PURE__*/React.createElement("span", null, "\u72B6\u6001"), /*#__PURE__*/React.createElement("span", null, "\u5206\u914D\u89D2\u8272")), opAppList.map((o, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `op-table-row ${o.status === "已批准" ? "approved" : o.status === "审核中" ? "pending" : "rejected"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "op-code"
  }, o.opCode), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, o.opName), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, o.type || "异常行动参与申请"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, o.submitDate), /*#__PURE__*/React.createElement("span", {
    className: "cert-status"
  }, o.status === "已批准" && /*#__PURE__*/React.createElement("span", {
    className: "result-success"
  }, o.status), o.status === "审核中" && /*#__PURE__*/React.createElement("span", {
    className: "result-partial"
  }, o.status), o.status === "已驳回" && /*#__PURE__*/React.createElement("span", {
    className: "result-fail"
  }, o.status)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, o.role), o.detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)",
      fontSize: "11px"
    }
  }, o.detail)))))))))));
}
window.ProfileCenterPage = ProfileCenterPage;