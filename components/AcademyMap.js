// Red Moon Academy SVG floor plan - pentagram layout
function AcademyMap() {
  const [selectedBuilding, setSelectedBuilding] = React.useState(null);
  const {
    canAccess
  } = useAuth();

  // Center of the map
  const CX = 360;
  const CY = 280;
  const R = 200; // radius to dorm points

  // Five dorm positions (pentagram points)
  // Starting with Yuehua at upper-left, going clockwise
  const dormPositions = [{
    id: "yuehua",
    name: "月华阁",
    en: "Moonlight Pavilion",
    angle: 162,
    status: "explored"
  }, {
    id: "tingxue",
    name: "听雪楼",
    en: "Snow Listener Tower",
    angle: 342,
    status: "explored"
  }, {
    id: "qingteng",
    name: "青藤苑",
    en: "Ivy Court",
    angle: 270,
    status: "partial"
  }, {
    id: "wangshan",
    name: "望山居",
    en: "Mountain View Residence",
    angle: 198,
    status: "unexplored"
  }, {
    id: "guanxing",
    name: "观星台",
    en: "Stargazer Platform",
    angle: 90,
    status: "partial"
  }];

  // Calculate position on pentagram
  const getPoint = (angleDeg, radius) => {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return {
      x: CX + radius * Math.cos(rad),
      y: CY + radius * Math.sin(rad)
    };
  };

  // Public buildings positioned at the edges between points
  const publicBuildings = [{
    id: "main-building",
    name: "主教学楼",
    en: "Main Academic Building",
    angle: 300,
    dist: R * 0.75,
    status: "explored",
    type: "public",
    desc: "哥特式砖石结构，四层。正门朝南，两侧有对称的阶梯。走廊两侧教室门牌号连续，但存在跳号现象——部分房间号在门牌序列中凭空消失，对应的房间也不存在。",
    rules: "宵禁期间教学楼内所有灯光自动熄灭，滞留者触发惩罚。三楼西侧阶梯教室内有「剧情书残页」不定期出现。",
    record: "第七届生还者曾在三楼阶梯教室发现剧情书残页·第三幕。第九届在四楼东侧发现隐藏楼梯入口，但进入者均未返回。",
    danger: "危险级",
    floors: "4 层"
  }, {
    id: "library",
    name: "图书馆",
    en: "Academy Library",
    angle: 330,
    dist: R * 0.65,
    status: "explored",
    type: "public",
    desc: "两层图书馆建筑，藏有大量书籍。书的内容不断变化——同一本书每次翻开都可能是不同的故事。书架排列会在无人注视时缓慢移动。",
    rules: "不得阅读超过30分钟，否则会被「故事」吸进去。书架上的书不可以带出图书馆。三楼禁区由锁链封死。",
    record: "第二届生还者曾在图书馆找到记载整个赤月学院「剧情」的书籍，但离开图书馆后书变成了空白。",
    danger: "危险级",
    floors: "2 层"
  }, {
    id: "concert-hall",
    name: "音乐厅",
    en: "Concert Hall",
    angle: 15,
    dist: R * 0.7,
    status: "partial",
    type: "public",
    desc: "有大型管风琴的音乐厅。午夜时分会自动响起音乐，演奏者不可见。音乐的曲目每一届都不同，但都有相似的主旋律。",
    rules: "音乐响起时必须保持安静，不得发出任何声响。掌声会让演奏者「谢幕」——然后就会看到演奏者是谁。",
    record: "第九届在音乐厅听到完整的「赤月交响曲」第一乐章，记录者出现轻度同化症状。",
    danger: "厄运级",
    floors: "2 层"
  }, {
    id: "art-gallery",
    name: "美术馆",
    en: "Art Gallery",
    angle: 350,
    dist: R * 0.8,
    status: "explored",
    type: "public",
    desc: "两层美术馆。墙上挂有大量油画，画的内容都是学院内的场景，但画中的人物永远背对着观看者。",
    rules: "不得长时间注视同一幅画。画中人物会「转过来」——看到正脸的人会被拖进画里。",
    record: "第四届一名成员在美术馆失踪，三日后有人在一幅新出现的油画中看到了他的背影。",
    danger: "厄运级",
    floors: "2 层"
  }, {
    id: "botanical",
    name: "植物园（温室）",
    en: "Botanical Garden",
    angle: 145,
    dist: R * 0.75,
    status: "partial",
    type: "public",
    desc: "温室植物园，内部种植有大量异常植物。植物的种类在外部世界均无记录。植物园的湿度永远保持在90%以上。",
    rules: "不得触碰任何植物。不得闻花香。不得采摘任何叶片或花朵。",
    record: "第五届在植物园发现「白玫瑰」的野外种群——与中心花园的白玫瑰为同一物种，但体型更大。",
    danger: "厄运级",
    floors: "1 层"
  }, {
    id: "gym",
    name: "体育馆",
    en: "Gymnasium",
    angle: 55,
    dist: R * 0.8,
    status: "explored",
    type: "public",
    desc: "标准体育馆，室内篮球场。地板上的篮球会自己弹跳。篮球架上的篮网永远在飘动——即使没有风。",
    rules: "如果篮球向你滚过来，必须接住并投一次篮。投进则安全；投不进……就会加入「他们」。",
    record: "第七届一名溯界者连续投中17次篮，打破已知纪录。他的手臂在第18次时……（机密级以上可见）",
    danger: "危险级",
    floors: "1 层"
  }, {
    id: "lab",
    name: "实验楼",
    en: "Laboratory Building",
    angle: 225,
    dist: R * 0.9,
    status: "partial",
    type: "public",
    desc: "三层实验楼，混凝土结构，与学院整体哥特风格迥异。化学、生物、物理实验室各占一层。实验器材齐全，但所有试剂瓶上的标签都是手写的，且内容难以辨认。",
    rules: "不得混合任何两种以上的试剂。不得饮用任何液体。实验楼的地下室禁止进入——门从内侧锁死。",
    record: "第三届曾在化学实验室发现一份手写实验记录，提到「白玫瑰提取物对同化有短暂抑制作用」。（绝密级可见完整内容）",
    danger: "厄运级",
    floors: "3 层"
  }, {
    id: "garden",
    name: "白玫瑰花园",
    en: "White Rose Garden",
    angle: 0,
    dist: 0,
    status: "core",
    type: "core",
    desc: "学院中心的圆形花园，种植满了白色的玫瑰。花园中央有一座喷泉，但喷泉从不喷水——喷口处长着一朵最大的白玫瑰。",
    rules: "白玫瑰不可采摘。花园内禁止大声说话。喷泉是「核心」的位置——但无人能接近喷泉五米以内。",
    record: "所有前10届进入者都确认了白玫瑰花园的「叙事锚点」性质，但至今无人能破坏核心。越接近喷泉，同化速度越快。",
    danger: "深渊级",
    floors: "核心区域"
  }];

  // Dorm detail data
  const dormDetails = {
    yuehua: {
      name: "月华阁",
      en: "Moonlight Pavilion",
      type: "学生宿舍区",
      structure: "三间独立套房",
      adjacent: "植物园（温室）、实验楼",
      status: "explored",
      rules: "熄灯后禁止开门查看走廊。听到敲门声若不回应，三次后自动停止；若回应，则门外的东西会「进来」。",
      rumor: "据第七届生还者描述，宵禁后宿舍走廊脚步声从不停歇，但从未有人看到是谁在走。",
      record: "第五届进入者曾在3号套房完整居住45天，是宿舍区生存最长记录。该生还者最终因违反「照镜子」规则被同化。",
      danger: "危险级"
    },
    tingxue: {
      name: "听雪楼",
      en: "Snow Listener Tower",
      type: "学生宿舍区",
      structure: "三间独立套房",
      adjacent: "音乐厅、美术馆",
      status: "explored",
      rules: "楼内永远是冬天，窗户上结着冰花。不得擦拭任何窗户上的冰花，否则窗外的「东西」会注意到你。",
      rumor: "传说下雪天午夜，能从屋顶听到有人在唱一首古老的歌谣——但没人能记清歌词。",
      record: "第三届进入者曾通过听雪楼地下通道抵达青藤苑，但该通道在第五届时已不复存在。",
      danger: "危险级"
    },
    qingteng: {
      name: "青藤苑",
      en: "Ivy Court",
      type: "学生宿舍区",
      structure: "三间独立套房",
      adjacent: "主教学楼、图书馆",
      status: "partial",
      rules: "藤蔓不可触碰。触碰藤蔓的人会在七天内被「同化」——皮肤逐渐植物化，最终变成新的藤蔓。",
      rumor: "有传闻称藤蔓会记住触碰过它的人的样貌，然后在深夜里「变成」那个人的样子。",
      record: "第八届曾有一名溯界者触碰藤蔓后生存23天，是目前已知最长的藤蔓同化耐受记录。",
      danger: "厄运级"
    },
    guanxing: {
      name: "观星台",
      en: "Stargazer Platform",
      type: "学生宿舍区",
      structure: "三间独立套房",
      adjacent: "体育馆",
      status: "partial",
      rules: "夜间不得在屋顶停留超过一小时，否则会被「天上的东西」发现。不得用望远镜对准月亮。",
      rumor: "据说每一届都有人声称在夜空中看到了「第十一颗星」——但天空中只有十颗。",
      record: "第六届有两人在观星台屋顶失踪，仅留下两台摔碎的望远镜。镜片上留有不明液体。",
      danger: "厄运级"
    },
    wangshan: {
      name: "望山居",
      en: "Mountain View Residence",
      type: "学生宿舍区",
      structure: "三间独立套房（推测）",
      adjacent: "外围围墙、实验楼",
      status: "unexplored",
      rules: "未知。仅知道门口有「请勿入内」的标牌——标牌是外部世界的制式，而非异常内部生成。",
      rumor: "望山居是五栋宿舍中唯一从外面能看到山景的，但「山」实际上并不存在于地图上。",
      record: "第十届派出的三人小队在门口全部失联，生命体征信号在跨越门槛的瞬间同时消失。第十一届暂未对该区域发起探索。",
      danger: "深渊级"
    }
  };
  const getStatusColor = status => {
    switch (status) {
      case "explored":
        return "#4a7c59";
      case "partial":
        return "#c49a2c";
      case "unexplored":
        return "#c42828";
      case "core":
        return "#7a3ab0";
      default:
        return "#888";
    }
  };
  const getStatusLabel = status => {
    switch (status) {
      case "explored":
        return "已探索";
      case "partial":
        return "部分探索";
      case "unexplored":
        return "未探索";
      case "core":
        return "核心区域";
      default:
        return "未知";
    }
  };

  // Generate pentagram lines
  const pentPoints = dormPositions.map(d => getPoint(d.angle, R));
  // Pentagram: connect 0->2->4->1->3->0
  const pentLineOrder = [0, 2, 4, 1, 3, 0];
  const pentagramPath = pentLineOrder.map((idx, i) => `${i === 0 ? "M" : "L"} ${pentPoints[idx].x} ${pentPoints[idx].y}`).join(" ");

  // Inner pentagon (the star's inner shape)
  const innerR = R * Math.sin(18 * Math.PI / 180) / Math.sin(126 * Math.PI / 180); // ~0.382 R
  const innerPentPoints = dormPositions.map((d, i) => {
    // Inner pentagon vertices are at midpoints between adjacent intersection points
    const nextIdx = (i + 1) % 5;
    const prevIdx = (i + 4) % 5;
    // Approximate: use angle midpoint and smaller radius
    const midAngle = (d.angle + dormPositions[nextIdx].angle) / 2;
    const adjusted = midAngle > 360 ? midAngle - 360 : midAngle;
    return getPoint(adjusted, innerR);
  });
  const handleClick = id => {
    setSelectedBuilding(selectedBuilding === id ? null : id);
  };
  const selectedDorm = selectedBuilding && dormDetails[selectedBuilding];
  const selectedPublic = selectedBuilding && publicBuildings.find(b => b.id === selectedBuilding);
  const selected = selectedDorm ? {
    ...selectedDorm,
    isDorm: true
  } : selectedPublic ? {
    ...selectedPublic,
    isDorm: false
  } : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .academy-map-container {
          background-color: #0a0a0e;
          border: 1px solid var(--border-color);
          position: relative;
          overflow: hidden;
        }
        .academy-map-svg {
          width: 100%;
          display: block;
        }
        .pentagram-line {
          stroke: rgba(196, 40, 40, 0.25);
          stroke-width: 1.5;
          fill: none;
          stroke-dasharray: 4 3;
        }
        .pentagon-line {
          stroke: rgba(196, 40, 40, 0.15);
          stroke-width: 1;
          fill: rgba(139, 26, 26, 0.03);
        }
        .outer-wall {
          stroke: rgba(196, 40, 40, 0.3);
          stroke-width: 2;
          fill: none;
          stroke-dasharray: 8 4;
        }
        .dorm-pentagon {
          cursor: pointer;
          transition: all 0.3s ease;
          stroke-width: 2;
        }
        .dorm-pentagon:hover { filter: brightness(1.3); stroke-width: 3; }
        .dorm-pentagon.selected { filter: brightness(1.4); stroke-width: 3; }
        .dorm-label {
          fill: var(--text-primary);
          font-size: 12px;
          font-family: "Songti SC", "Source Han Serif", serif;
          font-weight: 600;
          text-anchor: middle;
          pointer-events: none;
        }
        .dorm-label-en {
          fill: var(--text-tertiary);
          font-size: 8px;
          font-family: var(--font-mono);
          text-anchor: middle;
          pointer-events: none;
          letter-spacing: 0.1em;
        }
        .public-rect {
          cursor: pointer;
          transition: all 0.3s ease;
          stroke-width: 1.5;
        }
        .public-rect:hover { filter: brightness(1.3); stroke-width: 2; }
        .public-rect.selected { filter: brightness(1.4); stroke-width: 2.5; }
        .public-label {
          fill: var(--text-secondary);
          font-size: 9px;
          font-family: var(--font-mono);
          text-anchor: middle;
          pointer-events: none;
          letter-spacing: 0.05em;
        }
        .core-circle {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .core-circle:hover { filter: brightness(1.3); }
        .core-circle.selected { filter: brightness(1.5); }
        .rose-icon {
          pointer-events: none;
        }
        .map-legend {
          display: flex;
          gap: 20px;
          padding: 14px 20px;
          border-top: 1px solid var(--border-color);
          background-color: rgba(18, 18, 22, 0.6);
          flex-wrap: wrap;
        }
        .map-legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .map-legend-dot {
          width: 14px; height: 14px;
          border: 1.5px solid;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .building-detail-panel {
          margin-top: 20px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          overflow: hidden;
        }
        .building-detail-head {
          padding: 20px 24px;
          background: linear-gradient(90deg, rgba(196, 40, 40, 0.1), transparent);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .building-detail-title-group h3 {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .building-detail-title-group .en {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .building-detail-meta {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }
        .building-detail-badge {
          padding: 4px 10px;
          border: 1px solid;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
        }
        .building-detail-body {
          padding: 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .building-detail-section h4 {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 10px;
        }
        .building-detail-section p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
        }
        .building-detail-section.full { grid-column: 1 / -1; }
        .compass {
          position: absolute;
          top: 20px;
          right: 20px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-align: center;
        }
        .compass-n { color: var(--accent-red-bright); font-size: 11px; font-weight: 700; }
        .scale-bar {
          position: absolute;
          bottom: 20px;
          left: 20px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
        }
        .scale-bar-line {
          width: 80px;
          height: 2px;
          background-color: var(--text-tertiary);
          margin-bottom: 4px;
        }
        .red-moon {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #c42828, #5a0f0f);
          box-shadow: 0 0 20px rgba(196, 40, 40, 0.5);
        }
        @media (max-width: 768px) {
          .building-detail-body { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .dorm-label-en, .public-label { display: none; }
          .dorm-label { font-size: 15px; }
          .academy-map-container { overflow-x: auto; }
          .building-detail-body { padding: 16px; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "academy-map-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "red-moon"
  }), /*#__PURE__*/React.createElement("div", {
    className: "compass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "compass-n"
  }, "N"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "10px"
    }
  }, "\u25B2")), /*#__PURE__*/React.createElement("div", {
    className: "scale-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scale-bar-line"
  }), "100 M"), /*#__PURE__*/React.createElement("svg", {
    className: "academy-map-svg",
    viewBox: "0 0 720 560",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: CX,
    cy: CY,
    r: R + 60,
    className: "outer-wall"
  }), /*#__PURE__*/React.createElement("path", {
    d: pentagramPath,
    className: "pentagram-line"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: innerPentPoints.map(p => `${p.x},${p.y}`).join(" "),
    className: "pentagon-line"
  }), publicBuildings.map(b => {
    const pos = getPoint(b.angle, b.dist);
    const w = b.id === "garden" ? 80 : b.type === "core" ? 80 : 60;
    const h = b.id === "garden" ? 80 : b.type === "core" ? 80 : 38;
    const isSelected = selectedBuilding === b.id;
    if (b.id === "garden") {
      // Core garden - circular with rose icon
      return /*#__PURE__*/React.createElement("g", {
        key: b.id,
        onClick: () => handleClick(b.id),
        style: {
          cursor: "pointer"
        }
      }, /*#__PURE__*/React.createElement("circle", {
        cx: pos.x,
        cy: pos.y,
        r: 42,
        fill: "rgba(122, 58, 176, 0.15)",
        stroke: "#7a3ab0",
        strokeWidth: "2",
        className: `core-circle ${isSelected ? "selected" : ""}`
      }), /*#__PURE__*/React.createElement("circle", {
        cx: pos.x,
        cy: pos.y,
        r: 30,
        fill: "rgba(122, 58, 176, 0.1)",
        stroke: "#7a3ab0",
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: pos.x,
        cy: pos.y,
        r: 18,
        fill: "rgba(122, 58, 176, 0.08)",
        stroke: "#7a3ab0",
        strokeWidth: "0.5"
      }), /*#__PURE__*/React.createElement("g", {
        className: "rose-icon",
        transform: `translate(${pos.x - 8}, ${pos.y - 10})`
      }, /*#__PURE__*/React.createElement("path", {
        d: "M8 0 C12 4 14 8 10 14 C6 10 4 6 8 0Z",
        fill: "#7a3ab0",
        opacity: "0.7"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M8 0 C4 4 2 8 6 14 C10 10 12 6 8 0Z",
        fill: "#b88ed9",
        opacity: "0.5"
      })), /*#__PURE__*/React.createElement("text", {
        x: pos.x,
        y: pos.y + 56,
        className: "dorm-label",
        style: {
          fill: "#b88ed9",
          fontSize: "11px"
        }
      }, b.name));
    }
    return /*#__PURE__*/React.createElement("g", {
      key: b.id,
      onClick: () => handleClick(b.id),
      style: {
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: pos.x - w / 2,
      y: pos.y - h / 2,
      width: w,
      height: h,
      fill: `${getStatusColor(b.status)}22`,
      stroke: getStatusColor(b.status),
      className: `public-rect ${isSelected ? "selected" : ""}`
    }), /*#__PURE__*/React.createElement("text", {
      x: pos.x,
      y: pos.y + 4,
      className: "public-label"
    }, b.name));
  }), dormPositions.map(d => {
    const pos = getPoint(d.angle, R);
    const color = getStatusColor(d.status);
    const isSelected = selectedBuilding === d.id;

    // Draw pentagon pointing outward from center
    const size = 28;
    const pentPoints5 = [];
    for (let i = 0; i < 5; i++) {
      const angle = (d.angle + i * 72) * Math.PI / 180;
      pentPoints5.push({
        x: pos.x + size * Math.cos(angle),
        y: pos.y + size * Math.sin(angle)
      });
    }
    const pentagonPointsStr = pentPoints5.map(p => `${p.x},${p.y}`).join(" ");

    // Position labels outside the dorm
    const labelOffset = size + 14;
    const labelAngle = d.angle * Math.PI / 180;
    const labelX = pos.x + labelOffset * Math.cos(labelAngle);
    const labelY = pos.y + labelOffset * Math.sin(labelAngle);
    return /*#__PURE__*/React.createElement("g", {
      key: d.id,
      onClick: () => handleClick(d.id),
      style: {
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("polygon", {
      points: pentagonPointsStr,
      fill: `${color}33`,
      stroke: color,
      strokeWidth: "2",
      className: `dorm-pentagon ${isSelected ? "selected" : ""}`
    }), /*#__PURE__*/React.createElement("text", {
      x: pos.x,
      y: pos.y + 4,
      style: {
        fill: color,
        fontSize: "10px",
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        textAnchor: "middle",
        pointerEvents: "none",
        letterSpacing: "0.05em"
      }
    }, d.id.slice(0, 2).toUpperCase()), /*#__PURE__*/React.createElement("text", {
      x: labelX,
      y: labelY,
      className: "dorm-label",
      style: {
        fontSize: "13px"
      }
    }, d.name), /*#__PURE__*/React.createElement("text", {
      x: labelX,
      y: labelY + 13,
      className: "dorm-label-en"
    }, d.en.toUpperCase()));
  })), /*#__PURE__*/React.createElement("div", {
    className: "map-legend"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-dot",
    style: {
      borderColor: "#4a7c59",
      background: "rgba(74, 124, 89, 0.2)"
    }
  }), /*#__PURE__*/React.createElement("span", null, "\u5DF2\u63A2\u7D22")), /*#__PURE__*/React.createElement("div", {
    className: "map-legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-dot",
    style: {
      borderColor: "#c49a2c",
      background: "rgba(196, 154, 44, 0.2)"
    }
  }), /*#__PURE__*/React.createElement("span", null, "\u90E8\u5206\u63A2\u7D22")), /*#__PURE__*/React.createElement("div", {
    className: "map-legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-dot",
    style: {
      borderColor: "#c42828",
      background: "rgba(196, 40, 40, 0.2)"
    }
  }), /*#__PURE__*/React.createElement("span", null, "\u672A\u63A2\u7D22")), /*#__PURE__*/React.createElement("div", {
    className: "map-legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-dot",
    style: {
      borderColor: "#7a3ab0",
      background: "rgba(122, 58, 176, 0.2)",
      borderRadius: "50%"
    }
  }), /*#__PURE__*/React.createElement("span", null, "\u6838\u5FC3\u533A\u57DF")), /*#__PURE__*/React.createElement("div", {
    className: "map-legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-dot",
    style: {
      borderColor: "var(--text-tertiary)",
      clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
    }
  }), /*#__PURE__*/React.createElement("span", null, "\u5BBF\u820D\u533A")))), selected && /*#__PURE__*/React.createElement("div", {
    className: "building-detail-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "building-detail-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "building-detail-title-group"
  }, /*#__PURE__*/React.createElement("h3", null, selected.name), /*#__PURE__*/React.createElement("div", {
    className: "en"
  }, selected.en.toUpperCase())), /*#__PURE__*/React.createElement("div", {
    className: "building-detail-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "building-detail-badge",
    style: {
      borderColor: getStatusColor(selected.status),
      color: getStatusColor(selected.status)
    }
  }, getStatusLabel(selected.status)), /*#__PURE__*/React.createElement("span", {
    className: "building-detail-badge",
    style: {
      borderColor: "var(--text-muted)",
      color: "var(--text-secondary)"
    }
  }, selected.isDorm ? selected.type : `${selected.floors} · 公共建筑`))), /*#__PURE__*/React.createElement("div", {
    className: "building-detail-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "building-detail-section"
  }, /*#__PURE__*/React.createElement("h4", null, "\u5916\u89C2\u63CF\u8FF0"), /*#__PURE__*/React.createElement("p", null, selected.desc)), selected.isDorm && /*#__PURE__*/React.createElement("div", {
    className: "building-detail-section"
  }, /*#__PURE__*/React.createElement("h4", null, "\u7ED3\u6784\u4E0E\u76F8\u90BB"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "\u7ED3\u6784\uFF1A"), selected.structure, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, "\u76F8\u90BB\u5EFA\u7B51\uFF1A"), selected.adjacent)), /*#__PURE__*/React.createElement("div", {
    className: "building-detail-section"
  }, /*#__PURE__*/React.createElement("h4", null, "\u5DF2\u77E5\u89C4\u5219"), /*#__PURE__*/React.createElement("p", null, selected.rules)), selected.rumor && /*#__PURE__*/React.createElement("div", {
    className: "building-detail-section"
  }, /*#__PURE__*/React.createElement("h4", null, "\u4F20\u95FB"), /*#__PURE__*/React.createElement("p", null, selected.rumor)), /*#__PURE__*/React.createElement("div", {
    className: "building-detail-section full"
  }, /*#__PURE__*/React.createElement("h4", null, "\u63A2\u7D22\u8BB0\u5F55"), /*#__PURE__*/React.createElement("p", null, selected.record)))));
}
window.AcademyMap = AcademyMap;