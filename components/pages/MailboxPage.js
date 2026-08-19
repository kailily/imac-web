function MailboxPage() {
  const {
    navigate
  } = useRouter();
  const [mailList] = React.useState([{
    id: 1,
    from: "联合行动指挥中心",
    subject: "PHA-0182 洛林裂隙行动调令（第3号）",
    time: "夏·30 16:47",
    unread: true,
    important: true,
    summary: "BRI空间异常研究所、晨星团行动部：PHA-0182 洛林裂隙联合行动进入第3阶段...",
    body: "调字第2024-087号\n\nBRI空间异常研究所、晨星团行动部：\n\nPHA-0182 洛林裂隙联合行动进入第3阶段（边界测绘），需增派2名空间测绘类溯界者及1台MK-III型信标阵列。\n\n请于夏·31 12:00前完成人员集结，地点：洛林边境前哨站。\n\n行动指挥：陆明远（首席科学家）\n联合行动指挥中心  安珀历39年夏·30"
  }, {
    id: 2,
    from: "IMAC人事部",
    subject: "关于安珀历39年秋季溯界者轮训安排的通知",
    time: "夏·30 09:12",
    unread: true,
    important: true,
    summary: "各缔约组织、全体在档溯界者：秋季轮训定于秋·05正式启动，涵盖四个模块...",
    body: "各缔约组织、全体在档溯界者：\n\n根据《溯界者年度培训规程》第4.2条，安珀历39年秋季轮训定于秋·05正式启动。\n\n本次轮训涵盖：\n1. 异常识别进阶\n2. 同化抑制剂使用\n3. 锚定物校准实操\n4. 应急撤退演练\n\n培训地点：IMAC中央训练基地\n参训人员：所有外勤岗溯界者（含各组织派驻人员）\n\n请各单位于秋·02前完成参训人员名单上报。\n\nIMAC人事部 培训与认证中心"
  }, {
    id: 3,
    from: "医疗保障部",
    subject: "您的季度心理评估结果已出具",
    time: "夏·28 11:20",
    unread: true,
    important: false,
    summary: "溯界者赤鸦：您的夏季心理评估已完成，综合评估结果：正常。认知同化指数 1.2%...",
    body: "溯界者赤鸦：\n\n您的安珀历39年夏季心理评估已完成，综合评估结果为：正常。\n\n认知同化指数：1.2%（安全阈值 ≤ 5%）\n建议：保持当前作息节律，秋季复测时间为安珀历39年秋·20前后。如有睡眠障碍或情绪困扰，请随时联系心理干预中心。\n\n医疗保障部 · 心理干预中心\n评估医师：许知遥 主治医师"
  }, {
    id: 4,
    from: "衔尾蛇事务所人事部",
    subject: "外勤二队人员调整通知",
    time: "夏·27 14:05",
    unread: false,
    important: false,
    summary: "经所务会研究决定，任命赤鸦同志为外勤二队队长，原队长调至训练部任职...",
    body: "外勤二队全体成员：\n\n经所务会研究决定，任命赤鸦同志为外勤二队队长，原队长调至训练部任职。\n\n任命自安珀历39年秋·01起生效。\n\n请二队全体成员配合新任队长工作，保持外勤任务平稳过渡。\n\n衔尾蛇事务所 人事部"
  }, {
    id: 5,
    from: "技术局系统运维组",
    subject: "XDPS协议栈 v4.2.1 升级公告",
    time: "夏·26 20:30",
    unread: false,
    important: false,
    summary: "全体用户：XDPS协议栈将于夏·31凌晨02:00-04:00进行v4.2.1版本升级...",
    body: "全体用户：\n\nXDPS协议栈将于安珀历39年夏·31凌晨02:00-04:00进行v4.2.1版本升级，升级期间内部门户、异常信息数据库、指挥调度系统可能出现短暂不可用。\n\n本次升级内容：\n1. 修复信标定位在深层异常中漂移的已知问题\n2. 优化加密通道握手速度\n3. 新增通讯录音自动转录功能\n\n升级完成后系统自动恢复，无需任何客户端操作。\n\n技术局 · 系统运维组"
  }, {
    id: 6,
    from: "IMAC审计与纪律部",
    subject: "外勤行动装备使用规范重申",
    time: "夏·25 10:00",
    unread: false,
    important: false,
    summary: "近期抽查发现部分溯界者在行动中存在装备使用不规范问题，现重申十三条...",
    body: "各外勤单位：\n\n近期抽查发现部分溯界者在行动中存在个人记录器备份不及时、锚定物携带不规范等问题。\n\n现重申《外勤装备使用十三条》：\n· 记录器必须双备份，分别存放在身体不同位置\n· 锚定物必须贴身存放，严禁放入背包或容器\n· 每次进出异常必须执行完整的装备检查清单\n\n违反规定者将按纪律条例处理。\n\nIMAC审计与纪律部"
  }, {
    id: 7,
    from: "培训与认证中心",
    subject: "深渊级行动资质认证考试报名开启",
    time: "夏·24 15:30",
    unread: true,
    important: false,
    summary: "全体资深级及以上溯界者：秋季深渊级行动资质认证考试报名通道已开启...",
    body: "全体资深级及以上溯界者：\n\n安珀历39年秋季深渊级行动资质认证考试报名通道现已开启。\n\n报名条件：\n1. 资深溯界者及以上职级\n2. 累计外勤时长≥800小时\n3. 近12个月无重大行动失误记录\n4. 心理评估等级：正常\n\n报名截止：秋·08\n考试时间：秋·15-20\n报名入口：个人中心 → 认证申请 → 特殊资质认证\n\n培训与认证中心"
  }, {
    id: 8,
    from: "档案管理科",
    subject: "您的行动档案已更新（LOA-1045）",
    time: "夏·22 09:45",
    unread: false,
    important: false,
    summary: "您参与的 LOA-1045 失物公寓 异常处置行动档案已完成归档。行动评级：合格...",
    body: "溯界者赤鸦：\n\n您参与的 LOA-1045 失物公寓 异常处置行动档案已完成归档。\n\n行动评级：合格\n贡献度：A（行动队长）\n档案编号：OTS-2024-LOA1045-07\n\n如有异议请于收到本通知起7个工作日内向档案管理科提出复核申请。\n\n档案管理科"
  }, {
    id: 9,
    from: "装备后勤处",
    subject: "第二代制式锚定物更换通知",
    time: "夏·20 11:00",
    unread: false,
    important: false,
    summary: "第二代制式金属锚已开始配发，各单位请于夏·31前完成更换登记...",
    body: "各外勤单位：\n\n第二代制式金属锚（Mark-II型）已开始配发。相比一代产品，锚定稳定性提升约23%，在深层异常中的信号维持时间延长40%。\n\n各单位请于夏·31前完成更换登记，更换地点：各组织装备库。\n\n个人定制款锚定物不在本次强制更换范围内，但建议送检校准。\n\n装备后勤处"
  }, {
    id: 10,
    from: "联合行动指挥中心",
    subject: "TMB-0089 白松城行动状态通报",
    time: "夏·18 16:20",
    unread: false,
    important: false,
    summary: "白松城冻土层时间停滞异常（TMB-0089）进入采样分析第三阶段，进展顺利...",
    body: "各缔约组织：\n\nTMB-0089 白松城冻土层时间停滞异常联合行动进入采样分析第三阶段，目前进展顺利。\n\n行动概况：\n· 行动等级：危险级\n· 指挥：韩凛（北境守望冻土探索营队长）\n· 参与人员：8人\n· 当前状态：进行中 · 三级响应\n\n下一次通报预计于夏·25发布。\n\n联合行动指挥中心"
  }]);
  const [mails, setMails] = React.useState(() => {
    // 从 localStorage 读取已读状态
    const readIds = JSON.parse(localStorage.getItem("mail_read_ids") || "[]");
    return mailList.map(m => readIds.includes(m.id) ? {
      ...m,
      unread: false
    } : m);
  });
  const [selectedId, setSelectedId] = React.useState(mailList[0].id);
  const [filter, setFilter] = React.useState("all");
  const [composing, setComposing] = React.useState(false);
  const unreadCount = mails.filter(m => m.unread).length;
  const filteredMails = filter === "unread" ? mails.filter(m => m.unread) : mails;
  const selectedMail = mails.find(m => m.id === selectedId);

  // 同步未读数到 localStorage，供 Header / 下拉菜单读取
  const syncUnread = React.useCallback(list => {
    const readIds = list.filter(m => !m.unread).map(m => m.id);
    localStorage.setItem("mail_read_ids", JSON.stringify(readIds));
    // 触发当前页其他组件监听
    window.dispatchEvent(new CustomEvent("mail-unread-changed", {
      detail: list.filter(m => m.unread).length
    }));
  }, []);
  React.useEffect(() => {
    syncUnread(mails);
  }, [mails, syncUnread]);
  const markAllRead = () => {
    const next = mails.map(m => ({
      ...m,
      unread: false
    }));
    setMails(next);
  };
  const selectMail = id => {
    setSelectedId(id);
    setMails(mails.map(m => m.id === id ? {
      ...m,
      unread: false
    } : m));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "mailbox-page"
  }, /*#__PURE__*/React.createElement("style", null, `
        .mailbox-page {
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
        .mailbox-page::before {
          content: "";
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px;
          background-color: var(--accent-red-bright);
          box-shadow: 0 0 8px rgba(196, 40, 40, 0.5);
          z-index: 1000;
        }
        .mail-hero {
          background: linear-gradient(180deg, #0a0a0e 0%, #0d0d12 100%);
          border-bottom: 1px solid var(--border-color);
          padding: 24px 0 18px;
        }
        .mail-hero-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .mail-back {
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
        .mail-back:hover { color: var(--accent-red-bright); border-color: var(--accent-red-bright); }
        .mail-title-group { display: flex; flex-direction: column; gap: 4px; }
        .mail-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; color: var(--accent-red-bright); }
        .mail-title { font-family: var(--font-serif); font-size: 26px; font-weight: 700; margin: 0; }

        .mail-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 0;
          margin-top: 16px;
          border: 1px solid var(--border-color);
          background: #0d0d12;
          min-height: 600px;
        }
        .mail-sidebar {
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          background: #0a0a0e;
        }
        .mail-toolbar {
          padding: 12px 14px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .mail-toolbar-left { display: flex; gap: 6px; flex-wrap: wrap; }
        .mail-btn {
          background: none;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 4px 10px;
          font-size: 11px;
          cursor: pointer;
          font-family: var(--font-mono);
          transition: all 0.2s;
        }
        .mail-btn:hover { border-color: var(--accent-red-bright); color: var(--accent-red-bright); }
        .mail-btn.active { border-color: var(--accent-red-bright); color: var(--accent-red-bright); background: rgba(196, 40, 40, 0.1); }
        .mail-compose-btn {
          background: rgba(196, 40, 40, 0.15);
          border: 1px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          padding: 5px 12px;
          font-size: 11px;
          cursor: pointer;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
          transition: all 0.2s;
        }
        .mail-compose-btn:hover { background: rgba(196, 40, 40, 0.25); }
        .mail-unread-num {
          font-size: 11px;
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          padding: 0 12px 8px;
        }
        .mail-list {
          flex: 1;
          overflow-y: auto;
          max-height: 70vh;
        }
        .mail-item {
          padding: 10px 14px;
          border-bottom: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .mail-item:hover { background: rgba(196, 40, 40, 0.04); }
        .mail-item.selected {
          background: rgba(196, 40, 40, 0.1);
          border-left: 2px solid var(--accent-red-bright);
          padding-left: 12px;
        }
        .mail-item.unread .mail-item-from { font-weight: 700; color: var(--text-primary); }
        .mail-item.unread .mail-item-subject { font-weight: 600; color: var(--text-primary); }
        .mail-item-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .mail-item-from {
          font-size: 12px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .mail-unread-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .mail-item-time {
          font-size: 10px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          flex-shrink: 0;
        }
        .mail-item-subject {
          font-size: 12px;
          color: var(--text-secondary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .mail-item-summary {
          font-size: 11px;
          color: var(--text-tertiary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.4;
        }
        .mail-item-imp {
          color: var(--accent-red-bright);
          font-size: 10px;
          font-family: var(--font-mono);
        }

        .mail-content {
          display: flex;
          flex-direction: column;
          padding: 24px 28px;
          overflow-y: auto;
          max-height: 70vh;
        }
        .mail-content-subject {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
          line-height: 1.4;
        }
        .mail-content-meta {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          padding-bottom: 14px;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .mail-content-from {
          font-size: 13px;
          color: var(--text-secondary);
        }
        .mail-content-from strong { color: var(--text-primary); margin-right: 6px; }
        .mail-content-date {
          font-size: 12px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .mail-body {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.9;
          white-space: pre-wrap;
        }

        .mail-composer {
          padding: 16px;
          border-bottom: 1px solid var(--border-color);
          background: rgba(10, 10, 14, 0.6);
        }
        .mail-composer .form-field { margin-bottom: 8px; }
        .mail-composer .form-label {
          font-size: 10px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          letter-spacing: 0.08em;
          margin-bottom: 4px;
        }
        .mail-composer .form-input, .mail-composer .form-textarea {
          background: rgba(10, 10, 14, 0.9);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 6px 10px;
          font-size: 12px;
          width: 100%;
          box-sizing: border-box;
          font-family: inherit;
          outline: none;
        }
        .mail-composer .form-textarea { min-height: 60px; resize: vertical; }

        @media (max-width: 900px) {
          .mail-layout { grid-template-columns: 1fr; }
          .mail-sidebar { border-right: none; border-bottom: 1px solid var(--border-color); max-height: 300px; }
          .mail-content { max-height: none; }
        }
        @media (max-width: 640px) {
          .mail-content { padding: 18px 14px; }
          .mail-content-subject { font-size: 17px; }
          .mail-toolbar { padding: 10px 12px; }
          .mail-title { font-size: 22px; }
          /* 移动端邮件列表：标题与摘要完整换行显示，不截断 */
          .mail-item { padding: 12px 14px; gap: 6px; }
          .mail-item-subject {
            white-space: normal;
            overflow: visible;
            text-overflow: clip;
            line-height: 1.5;
            font-size: 13px;
          }
          .mail-item-summary {
            white-space: normal;
            overflow: visible;
            text-overflow: clip;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .mail-item-from { font-size: 11px; }
          .mail-list { max-height: 45vh; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    className: "mail-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mail-hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mail-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mail-label"
  }, "IMAC \xB7 INTERNAL MAIL SYSTEM"), /*#__PURE__*/React.createElement("h1", {
    className: "mail-title"
  }, "\u7CFB\u7EDF\u90AE\u7BB1")), /*#__PURE__*/React.createElement("div", {
    className: "mail-back",
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
    className: "mail-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mail-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mail-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mail-toolbar-left"
  }, /*#__PURE__*/React.createElement("button", {
    className: `mail-btn ${filter === "all" ? "active" : ""}`,
    onClick: () => setFilter("all")
  }, "\u5168\u90E8"), /*#__PURE__*/React.createElement("button", {
    className: `mail-btn ${filter === "unread" ? "active" : ""}`,
    onClick: () => setFilter("unread")
  }, "\u672A\u8BFB")), /*#__PURE__*/React.createElement("button", {
    className: "mail-compose-btn",
    onClick: () => setComposing(!composing)
  }, composing ? "取消" : "写邮件")), composing && /*#__PURE__*/React.createElement("div", {
    className: "mail-composer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-label"
  }, "\u6536\u4EF6\u4EBA"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "\u6536\u4EF6\u4EBA\u4EE3\u53F7\u6216\u90E8\u95E8"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-label"
  }, "\u4E3B\u9898"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "\u90AE\u4EF6\u4E3B\u9898"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-label"
  }, "\u6B63\u6587"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-textarea",
    placeholder: "\u90AE\u4EF6\u5185\u5BB9..."
  })), /*#__PURE__*/React.createElement("button", {
    className: "mail-compose-btn",
    onClick: () => {
      alert("邮件已发送（模拟）");
      setComposing(false);
    }
  }, "\u53D1\u9001")), /*#__PURE__*/React.createElement("div", {
    className: "mail-unread-num"
  }, "\u672A\u8BFB ", unreadCount, " \u5C01 \xB7 \u5171 ", mails.length, " \u5C01"), /*#__PURE__*/React.createElement("div", {
    className: "mail-toolbar",
    style: {
      paddingTop: 0,
      borderBottom: "1px solid var(--border-color)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "mail-btn",
    onClick: markAllRead
  }, "\u5168\u90E8\u6807\u4E3A\u5DF2\u8BFB")), /*#__PURE__*/React.createElement("div", {
    className: "mail-list"
  }, filteredMails.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    className: `mail-item ${m.unread ? "unread" : ""} ${selectedId === m.id ? "selected" : ""}`,
    onClick: () => selectMail(m.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "mail-item-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mail-item-from"
  }, m.unread && /*#__PURE__*/React.createElement("span", {
    className: "mail-unread-dot"
  }), m.from), /*#__PURE__*/React.createElement("span", {
    className: "mail-item-time"
  }, m.time)), /*#__PURE__*/React.createElement("div", {
    className: "mail-item-subject"
  }, m.important && /*#__PURE__*/React.createElement("span", {
    className: "mail-item-imp"
  }, "\u2605 "), m.subject), /*#__PURE__*/React.createElement("div", {
    className: "mail-item-summary"
  }, m.summary))), filteredMails.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "30px",
      textAlign: "center",
      color: "var(--text-tertiary)",
      fontSize: "12px"
    }
  }, "\u6682\u65E0\u90AE\u4EF6"))), /*#__PURE__*/React.createElement("div", {
    className: "mail-content"
  }, selectedMail ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "mail-content-subject"
  }, selectedMail.important && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-red-bright)",
      marginRight: "8px"
    }
  }, "\u2605"), selectedMail.subject), /*#__PURE__*/React.createElement("div", {
    className: "mail-content-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mail-content-from"
  }, /*#__PURE__*/React.createElement("strong", null, "\u53D1\u4EF6\u4EBA\uFF1A"), selectedMail.from), /*#__PURE__*/React.createElement("span", {
    className: "mail-content-date"
  }, "\u5B89\u73C0\u538639\u5E74 \xB7 ", selectedMail.time)), /*#__PURE__*/React.createElement("div", {
    className: "mail-body"
  }, selectedMail.body)) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "60px",
      textAlign: "center",
      color: "var(--text-tertiary)",
      fontSize: "13px"
    }
  }, "\u8BF7\u9009\u62E9\u4E00\u5C01\u90AE\u4EF6\u67E5\u770B"))))));
}
window.MailboxPage = MailboxPage;