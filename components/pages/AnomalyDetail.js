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
    org: "衔尾蛇事务所",
    result: "全员失踪",
    status: "death"
  }, {
    term: "第二届",
    year: "安珀历29年·春",
    count: 8,
    org: "衔尾蛇事务所",
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
    org: "衔尾蛇事务所",
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
    org: "悬铃木学会",
    result: "全员同化",
    status: "assim"
  }, {
    term: "第八届",
    year: "安珀历36年·夏",
    count: 12,
    org: "衔尾蛇事务所",
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
    org: "衔尾蛇事务所",
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
      org: "衔尾蛇事务所",
      role: "队长 · 行动指挥",
      isLeader: true,
      orgType: "anomalist"
    }, {
      name: "季明轩",
      rank: "溯界者·破界",
      org: "衔尾蛇事务所",
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
  if (!isDefault && !isHarbor && !isStairwell && !isTrain && !isOutpost && !isVoid) {
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
      info: [["异常编号", /*#__PURE__*/React.createElement("span", {
        className: "detail-file-id",
        style: {
          fontSize: "18px"
        }
      }, "LOA-0001"), "名称", "灰港仓库 · Harbor Warehouse"], ["所属管辖", "IMAC 直辖 · IMAC DIRECT", "首次记录", "安珀历元年 · 9月"], ["异常等级", {
        levelKey: "doomed",
        text: "厄运级 · DOOMED"
      }, "当前状态", {
        statusKey: "active",
        text: "● 活跃 ACTIVE"
      }], ["生还率", [/*#__PURE__*/React.createElement("span", {
        className: "survival-rate-red",
        key: "s"
      }, "\u7EA6 11%"), "（9人进入，8人死亡）"], "信息价值", "极高（全球第一起被正式记录的异常事件，异常学起源档案）"], ["档案更新", "安珀历39年 · 春", "处置状态", "遗址封闭管理 · 未解决"]],
      discovery: ["安珀历元年9月，格伦贝尔联邦第七大城市「灰港」的港区一座仓库在夜间凭空消失。原址上出现了一扇刻满符号的铁门——推开铁门后，通向一个与其外部外观完全不符的、无限延伸的走廊空间。", "首批进入探索的九人小队仅一人生还，获救后精神严重受损，反复重复同一句话：「它记得每一个来过的人。」这是全球第一起被正式记录的异常事件，标志着「前安珀时代」的终结与安珀历纪年的启用。"],
      features: ["灰港仓库是全球第一起被正式记录的异常事件，也是「安珀历」纪年的起点——安珀历以第一起异常事件为元年，此前被称为「前安珀时代」。", "异常本体为消失的仓库与替代它的铁门走廊：铁门刻满无法拓印的符号，门后走廊无限延伸、与仓库外部外观完全不符。异常具有「记忆」特性——它记得每一个进入过的人。", "截至安珀历39年，全球已记录的异常事件累计超过两万起，仍有超过65%处于「未解决」或「休眠」状态。异常的出现没有规律可循——任意地点、任意时间，规模从一间卧室到整个城区皆有案例。灰港仓库正是这一切的起点。"],
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
        desc: "异常能识别进入者。二次进入者报告走廊对其表现出「熟悉」——灯光自动亮起、门自动开启；这与生还者反复重复的「它记得每一个来过的人」一致。"
      }],
      speculatedRules: ["铁门上的符号可能是异常「记忆」的载体或索引——符号无法被记录，或许正是异常自我保护机制的一部分", "走廊中疑似存在与进入者对应的「房间」，房间内容与进入者的记忆相关", "异常未表现出主动扩张迹象，但误入事件仍不定期发生——灰港港区遗址周围仍会偶发「看到铁门」的报告"],
      entryRecords: [{
        term: "首批",
        year: "安珀历元年·9月",
        count: 9,
        org: "格伦贝尔联邦勘测队",
        result: "1人生还，8人死亡",
        status: "death"
      }],
      phenomena: ["<strong>「它记得每一个来过的人」：</strong>唯一生还者反复重复此句。其描述的铁门符号与走廊细节与其他目击记录完全一致，但符号无法被任何方式记录。", "<strong>记忆响应：</strong>二次进入者报告走廊对自身表现出「熟悉」——疑似异常能够识别并记忆进入者，且会对其「打招呼」。"],
      imacNote: "灰港事件为全球第一起被正式记录的异常事件，标志着「前安珀时代」的终结与安珀历纪年的启用。该异常至今未解决，且未表现出扩张或衰竭迹象。鉴于其「记忆」特性与起源意义，IMAC 已将其列为「起源档案」永久保存。任何组织进入前须提交完整方案并获得 IMAC 审批。未经授权的私自进入将被视为严重违规。",
      suggestedActions: ["维持灰港港区遗址的封闭管理，防止误入事件，并记录周边「看到铁门」的报告", "成立专项研究组研究铁门符号（符号无法拓印，可尝试长曝光观测与多人同步记录比对）", "评估灰港异常的「记忆特性」与其他异常（如赤月学院 LOA-0073）是否存在共性，探索异常「记忆」的普遍性"],
      internalNode: /*#__PURE__*/React.createElement(Restricted, {
        level: "internal",
        label: "\u673A\u5BC6\u7EA7\u5185\u5BB9",
        compact: true
      }, /*#__PURE__*/React.createElement("div", {
        className: "internal-note"
      }, /*#__PURE__*/React.createElement("p", {
        className: "internal-note-text"
      }, "\u3010IMAC \u5F02\u5E38\u4FE1\u606F\u7BA1\u7406\u59D4\u5458\u4F1A\u8BC4\u4F30 \xB7 \u8D77\u6E90\u6863\u6848\u3011", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u7070\u6E2F\u4E8B\u4EF6\u4F5C\u4E3A\u7B2C\u4E00\u8D77\u88AB\u8BB0\u5F55\u7684\u5F02\u5E38\uFF0C\u5176\u300C\u8BB0\u5FC6\u300D\u7279\u6027\u53EF\u80FD\u662F\u7406\u89E3\u5F02\u5E38\u672C\u8D28\u7684\u5173\u952E\u7EBF\u7D22\u2014\u2014 \u5982\u679C\u5F02\u5E38\u80FD\u591F\u300C\u8BB0\u5F97\u300D\u8FDB\u5165\u8005\uFF0C\u90A3\u4E48\u5F02\u5E38\u6216\u8BB8\u4E5F\u5B58\u5728\u300C\u9057\u5FD8\u300D\u4E0E\u300C\u8BB0\u5F55\u300D\u7684\u673A\u5236\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u94C1\u95E8\u7B26\u53F7\u65E0\u6CD5\u88AB\u8BB0\u5F55\uFF0C\u8FD9\u672C\u8EAB\u5C31\u662F\u5F02\u5E38\u81EA\u6211\u4FDD\u62A4\u673A\u5236\u7684\u4E00\u90E8\u5206\u3002 \u5EFA\u8BAE\u5C06\u7070\u6E2F\u4ED3\u5E93\u5217\u4E3A\u300C\u8D77\u6E90\u6863\u6848\u300D\u6C38\u4E45\u4FDD\u5B58\uFF0C\u4FDD\u6301\u6700\u4F4E\u9650\u5EA6\u63A5\u89E6\uFF0C\u5E76\u6301\u7EED\u8BB0\u5F55\u94C1\u95E8\u5468\u8FB9\u7684\u4E00\u5207\u5F02\u5E38\u524D\u5146\u3002"), /*#__PURE__*/React.createElement("div", {
        className: "internal-note-signature"
      }, "\u2014 IMAC \u7406\u4E8B\u4F1A \xB7 \u5F02\u5E38\u4FE1\u606F\u7BA1\u7406\u59D4\u5458\u4F1A")))
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
      }, "\u3010\u8FB9\u754C\u7814\u7A76\u9662\u5185\u90E8\u8BC4\u4F30 \xB7 \u7A7A\u95F4\u5F02\u5E38\u7814\u7A76\u6240\u3011", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u65E0\u5C3D\u697C\u68AF\u7684\u7A7A\u95F4\u6298\u53E0\u673A\u7406\u4E0E\u300C\u6D1B\u6797\u88C2\u9699\u300D\uFF08PHA-0182\uFF09\u5B58\u5728\u663E\u8457\u76F8\u4F3C\u6027\u2014\u2014\u4E24\u8005\u90FD\u53EF\u80FD\u5171\u4EAB\u540C\u4E00\u7C7B\u7A7A\u95F4\u7ED3\u6784\u6E90\u3002 \u82E5\u63A8\u6D4B\u89C4\u5219\u4E00\uFF08\u300C\u6D3B\u4F53\u300D\u7279\u6027\uFF09\u6210\u7ACB\uFF0C\u8BE5\u5F02\u5E38\u53EF\u80FD\u662F\u540C\u7C7B\u6298\u53E0\u5F02\u5E38\u7684\u300C\u6BCD\u4F53\u300D\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u5EFA\u8BAE\u5C06\u5176\u7EB3\u5165\u300C\u7A7A\u95F4\u5F02\u5E38\u8054\u5408\u7814\u7A76\u8BA1\u5212\u300D\uFF0C\u5E76\u5C1D\u8BD5\u5728\u6298\u53E0\u70B9\u5E03\u8BBE MK-III \u578B\u4FE1\u6807\uFF0C \u4EE5\u9A8C\u8BC1\u300C\u53CC\u5411\u7ECF\u8FC7\u6298\u53E0\u70B9\u300D\u80FD\u5426\u62B5\u8FBE 1 \u5C42\u3002\u6B64\u4E3E\u98CE\u9669\u53EF\u63A7\uFF0C\u5EFA\u8BAE\u7531 BRI \u4E0E\u6668\u661F\u56E2\u8054\u5408\u6267\u884C\u3002"), /*#__PURE__*/React.createElement("div", {
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
      }, "\u3010\u5317\u5883\u5B88\u671B\u5185\u90E8\u8BC4\u4F30 \xB7 \u51BB\u571F\u63A2\u7D22\u8425\u3011", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u7B2C\u56DB\u6279\u884C\u52A8\u7684\u6210\u529F\u9A8C\u8BC1\u4E86\u4E00\u4E2A\u5047\u8BBE\uFF1A\u65F6\u95F4\u505C\u6EDE\u578B\u5F02\u5E38\u7684\u6838\u5FC3\u951A\u70B9\u662F\u53EF\u4EE5\u88AB\u300C\u8BF4\u670D\u300D\u7684\u2014\u2014 \u62E8\u52A8\u949F\u6446\u7684\u884C\u4E3A\u672C\u8EAB\u5E76\u4E0D\u7279\u6B8A\uFF0C\u7279\u6B8A\u7684\u662F\u5728\u51BB\u7ED3\u73AF\u5883\u4E0B\u4FDD\u6301\u6E05\u9192\u51B3\u7B56\u7684\u4EBA\u3002\u8FD9\u662F\u51BB\u571F\u533A\u6559\u7ED9\u6211\u4EEC\u7684\u9053\u7406\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u5EFA\u8BAE\u5C06\u300C\u51B0\u5C01\u54E8\u7AD9\u5904\u7F6E\u6D41\u7A0B\u300D\u7EB3\u5165\u5317\u5883\u5B88\u671B\u8BAD\u7EC3\u6559\u6750\uFF0C\u5E76\u9488\u5BF9\u767D\u677E\u57CE\u5468\u8FB9\u524D\u5146\u5EFA\u7ACB\u5E38\u9A7B\u76D1\u6D4B\u54E8\u3002 \u4E0B\u4E00\u6B21\u5982\u679C\u518D\u6709\u949F\u8868\u96C6\u4F53\u505C\u8D70\uFF0C\u6211\u4EEC\u8981\u6BD4\u8FD9\u6B21\u66F4\u5FEB\u3002"), /*#__PURE__*/React.createElement("div", {
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
  }, "\u3010\u8854\u5C3E\u86C7\u4E8B\u52A1\u6240\u5185\u90E8\u8BC4\u4F30 \xB7 \u9996\u5E2D\u6EAF\u754C\u8005 \u9646\u6C89\u821F\u3011", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u8D64\u6708\u5B66\u9662\u4E0D\u662F\u4E00\u4E2A\u300C\u9677\u9631\u300D\u3002\u5B83\u662F\u4E00\u4E2A\u300C\u8C1C\u9898\u300D\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u5341\u4E00\u5C4A\u8FDB\u5165\uFF0C\u4E00\u767E\u4E00\u5341\u516D\u4EBA\uFF0C\u6CA1\u6709\u4E00\u4E2A\u4EBA\u662F\u88AB\u89C4\u5219\u76F4\u63A5\u6740\u6B7B\u7684\u2014\u2014\u4ED6\u4EEC\u8981\u4E48\u5931\u8E2A\uFF0C\u8981\u4E48\u300C\u5267\u60C5\u5931\u8D25\u300D\u540E\u6D88\u5931\uFF0C\u8981\u4E48\u540C\u5316\u3002 \u8FD9\u4E0D\u7B26\u5408\u5E38\u89C4\u6DF1\u6E0A\u7EA7\u5F02\u5E38\u7684\u884C\u4E3A\u6A21\u5F0F\u3002\u5E38\u89C4\u6DF1\u6E0A\u7EA7\u5F02\u5E38\u662F\u300C\u4E3B\u52A8\u6740\u4EBA\u300D\u7684\uFF0C\u800C\u8D64\u6708\u5B66\u9662\u66F4\u50CF\u662F\u5728", /*#__PURE__*/React.createElement("em", {
    style: {
      color: "var(--text-primary)"
    }
  }, " \u300C\u7B5B\u9009\u300D"), "\u4EC0\u4E48\u4E1C\u897F\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u767D\u73AB\u7470\u82B1\u56ED\u662F\u5173\u952E\u3002\u6240\u6709\u63A5\u8FD1\u8FC7\u6838\u5FC3\u533A\u57DF\u7684\u4EBA\uFF0C\u5373\u4F7F\u56DE\u6765\u4E86\uFF0C\u4E5F\u90FD\u53D8\u4E86\u3002", /*#__PURE__*/React.createElement("br", null), "\u6211\u6709\u4E00\u79CD\u611F\u89C9\u2014\u2014\u8FD9\u5EA7\u5B66\u9662\u5728\u7B49\u5F85\u67D0\u4E2A\u4EBA\u3002\u6216\u8005\u8BF4\uFF0C\u5728\u7B49\u67D0\u4E2A\u300C\u5B66\u751F\u300D\u6BD5\u4E1A\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u8FD9\u662F\u6700\u540E\u7684\u8C1C\u9898\u3002\u4E5F\u662F\u6211\u4EEC\u5FC5\u987B\u89E3\u5F00\u7684\u8C1C\u9898\u3002"), /*#__PURE__*/React.createElement("div", {
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