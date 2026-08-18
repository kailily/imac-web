// Featured Anomaly File - LOA-0073 赤月学院
function AnomalyFile() {
  const verifiedRules = [{
    num: "一",
    title: '身份分配',
    desc: '进入者自动获得学生身份与「剧情书」，严重偏离角色设定将触发惩罚。剧情书内容因人而异。'
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
    title: '教学制度',
    desc: '定期进行才能考核。排名第一者可获得「特殊奖励」，内容未知，疑似与离开路径相关。'
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
    count: 8,
    org: "衔尾蛇主导",
    result: "进行中",
    status: "active",
    current: true
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .anomaly-file-section {
          background-color: #08080a;
          border-top: 2px solid var(--accent-red);
          border-bottom: 2px solid var(--accent-red);
          position: relative;
        }
        .anomaly-file-section::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(0,0,0,0.1) 3px,
              rgba(0,0,0,0.1) 4px
            );
          pointer-events: none;
          opacity: 0.5;
        }
        .anomaly-file-inner {
          position: relative;
          z-index: 1;
        }
        .file-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid var(--accent-red);
        }
        .file-header-title {
          display: flex;
          align-items: baseline;
          gap: 16px;
        }
        .file-title-cn {
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: 0.1em;
        }
        .file-title-en {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .file-stamp {
          transform: rotate(-8deg);
        }
        /* Info table */
        .info-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 40px;
          background-color: rgba(20, 20, 24, 0.6);
          border: 1px solid var(--border-color);
        }
        .info-table th, .info-table td {
          padding: 14px 20px;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
          font-size: 14px;
        }
        .info-table th {
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
        .info-table td {
          color: var(--text-primary);
        }
        .info-table tr:last-child th,
        .info-table tr:last-child td {
          border-bottom: none;
        }
        .info-table .level-badge {
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
        .info-table .level-badge::before {
          content: "";
          width: 8px;
          height: 8px;
          background-color: var(--accent-red-bright);
          box-shadow: 0 0 8px var(--accent-red-bright);
        }
        .info-table .status-active {
          color: var(--level-hazardous);
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }
        .info-table .survival-rate {
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-weight: 700;
        }
        .file-id {
          font-family: var(--font-mono);
          font-size: 18px;
          font-weight: 700;
          color: var(--accent-red-bright);
          letter-spacing: 0.1em;
        }
        /* File sections */
        .file-section {
          margin-bottom: 36px;
        }
        .file-section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border-color);
        }
        .file-section-num {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent-red-bright);
          letter-spacing: 0.1em;
          width: 40px;
        }
        .file-section-title {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .file-section-text {
          font-size: 14px;
          line-height: 1.9;
          color: var(--text-secondary);
          padding-left: 52px;
        }
        .file-section-text p {
          margin-bottom: 12px;
        }
        .file-section-text p:last-child {
          margin-bottom: 0;
        }
        /* Buildings list */
        .buildings-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-left: 52px;
        }
        .building-tag {
          padding: 6px 14px;
          background-color: rgba(74, 88, 104, 0.1);
          border: 1px solid var(--steel-blue-dark);
          font-size: 12px;
          color: var(--steel-blue-light);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .building-tag.core {
          border-color: var(--accent-red);
          color: var(--accent-red-bright);
          background-color: rgba(139, 26, 26, 0.1);
        }
        /* Rules */
        .rules-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-left: 52px;
        }
        .rule-item {
          display: flex;
          gap: 16px;
          padding: 16px 20px;
          background-color: rgba(20, 20, 24, 0.5);
          border-left: 3px solid;
          position: relative;
        }
        .rule-item.verified {
          border-left-color: var(--level-ordinary);
        }
        .rule-item.speculated {
          border-left-color: var(--text-muted);
        }
        .rule-num {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          color: var(--text-tertiary);
          line-height: 1;
          flex-shrink: 0;
          width: 36px;
        }
        .rule-content {
          flex: 1;
        }
        .rule-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .rule-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          padding: 2px 8px;
          letter-spacing: 0.1em;
          border: 1px solid;
        }
        .rule-item.verified .rule-tag {
          color: var(--level-ordinary);
          border-color: var(--level-ordinary);
        }
        .rule-item.speculated .rule-tag {
          color: var(--text-muted);
          border-color: var(--text-muted);
        }
        .rule-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .speculated-list {
          padding-left: 52px;
          list-style: none;
        }
        .speculated-list li {
          position: relative;
          padding-left: 20px;
          font-size: 13px;
          color: var(--text-tertiary);
          line-height: 1.8;
        }
        .speculated-list li::before {
          content: "?";
          position: absolute;
          left: 0;
          top: 0;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }
        /* Entry records table */
        .entry-records {
          width: 100%;
          border-collapse: collapse;
          margin-left: 52px;
          width: calc(100% - 52px);
          font-size: 13px;
        }
        .entry-records th {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 12px 14px;
          text-align: left;
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
          font-family: var(--font-serif);
          font-weight: 600;
          color: var(--text-primary);
        }
        .entry-records .count {
          font-family: var(--font-mono);
        }
        .entry-records .death {
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-weight: 700;
        }
        .entry-records .mixed {
          color: var(--level-hazardous);
          font-family: var(--font-mono);
          font-weight: 500;
        }
        .entry-records .assim {
          color: var(--level-unknown);
          font-family: var(--font-mono);
          font-weight: 500;
        }
        .entry-records .active {
          color: var(--level-ordinary);
          font-family: var(--font-mono);
          font-weight: 500;
        }
        /* Notes */
        .note-box {
          margin-left: 52px;
          padding: 20px 24px;
          background-color: rgba(139, 26, 26, 0.05);
          border: 1px solid rgba(196, 40, 40, 0.3);
          position: relative;
        }
        .note-box::before {
          content: "IMAC NOTE";
          position: absolute;
          top: -10px;
          left: 20px;
          background-color: #08080a;
          padding: 0 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.15em;
        }
        .note-text {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.8;
          font-style: italic;
        }
        .internal-note {
          margin-left: 52px;
          margin-top: 20px;
          padding: 20px 24px;
          background-color: rgba(122, 58, 176, 0.05);
          border: 1px solid rgba(122, 58, 176, 0.3);
          position: relative;
        }
        .internal-note::before {
          content: "内部评估 · INTERNAL";
          position: absolute;
          top: -10px;
          left: 20px;
          background-color: #08080a;
          padding: 0 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--level-unknown);
          letter-spacing: 0.15em;
        }
        .internal-note-text {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.8;
        }
        .internal-note-signature {
          margin-top: 12px;
          text-align: right;
          font-family: var(--font-serif);
          font-size: 13px;
          color: var(--text-tertiary);
          font-style: italic;
        }
        /* Phenomena list */
        .phenomena-list {
          padding-left: 52px;
          list-style: none;
        }
        .phenomena-list li {
          position: relative;
          padding-left: 24px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 8px;
        }
        .phenomena-list li::before {
          content: "◆";
          position: absolute;
          left: 0;
          top: 0;
          color: var(--accent-red-bright);
          font-size: 10px;
        }
        .file-footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 2px solid var(--accent-red);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .file-meta {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }
        @media (max-width: 1024px) {
          .file-section-text, .buildings-grid, .rules-list,
          .speculated-list, .phenomena-list, .note-box, .internal-note {
            padding-left: 0;
            margin-left: 0;
          }
          .entry-records {
            margin-left: 0;
            width: 100%;
          }
          .info-table th { width: 25%; }
        }
        @media (max-width: 768px) {
          .file-title-cn { font-size: 26px; }
          .file-header-bar { flex-direction: column; align-items: flex-start; gap: 16px; }
          .info-table { display: block; overflow-x: auto; }
          .entry-records { display: block; overflow-x: auto; white-space: nowrap; }
          .info-table th { min-width: 100px; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    id: "anomaly-file",
    className: "section anomaly-file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container anomaly-file-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-header-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-header-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-number mono",
    style: {
      color: "var(--accent-red-bright)"
    }
  }, "06 /"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "file-title-cn"
  }, "\u5F02\u5E38\u4FE1\u606F\u6570\u636E\u5E93"), /*#__PURE__*/React.createElement("div", {
    className: "file-title-en"
  }, "ANOMALY INFORMATION DATABASE"))), /*#__PURE__*/React.createElement("div", {
    className: "file-stamp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stamp"
  }, "\u7EDD\u5BC6 \xB7 EYES ONLY"))), /*#__PURE__*/React.createElement("table", {
    className: "info-table"
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u5F02\u5E38\u7F16\u53F7"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "file-id"
  }, "LOA-0073")), /*#__PURE__*/React.createElement("th", null, "\u540D\u79F0"), /*#__PURE__*/React.createElement("td", null, "\u8D64\u6708\u5B66\u9662 \xB7 Crimson Moon Academy")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u6240\u5C5E\u7BA1\u8F96"), /*#__PURE__*/React.createElement("td", null, "\u8854\u5C3E\u86C7\u4E8B\u52A1\u6240 \xB7 Ouroboros Agency"), /*#__PURE__*/React.createElement("th", null, "\u9996\u6B21\u8BB0\u5F55"), /*#__PURE__*/React.createElement("td", null, "\u5B89\u73C0\u538628\u5E74 \xB7 \u79CB")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u5F02\u5E38\u7B49\u7EA7"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "level-badge"
  }, "\u6DF1\u6E0A\u7EA7 \xB7 ABYSSAL")), /*#__PURE__*/React.createElement("th", null, "\u5F53\u524D\u72B6\u6001"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "status-active"
  }, "\u25CF \u6D3B\u8DC3 ACTIVE"))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u751F\u8FD8\u7387"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "survival-rate"
  }, "\u7EA6 1.9%"), " \uFF08107\u4EBA\u8FDB\u5165\uFF0C2\u4EBA\u751F\u8FD8\u540E\u6B7B\u4EA1\uFF09"), /*#__PURE__*/React.createElement("th", null, "\u6863\u6848\u66F4\u65B0"), /*#__PURE__*/React.createElement("td", null, "\u5B89\u73C0\u538639\u5E74 \xB7 \u6625")))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 01"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u53D1\u73B0\u7ECF\u8FC7")), /*#__PURE__*/React.createElement("div", {
    className: "file-section-text"
  }, /*#__PURE__*/React.createElement("p", null, "\u5B89\u73C0\u538628\u5E74\u79CB\uFF0C\u9E23\u6D77\u57CE\u897F\u533A\u4E00\u6240\u5E9F\u5F03\u4E2D\u5B66\u539F\u5740\u4E0A\u7A81\u7136\u51FA\u73B0\u4E86\u5B8C\u6574\u7684\u6821\u56ED\u5EFA\u7B51\u7FA4\u3002 \u5F53\u5730\u5C45\u6C11\u62A5\u544A\u79F0\u524D\u4E00\u65E5\u8BE5\u5904\u8FD8\u662F\u4E00\u7247\u62C6\u8FC1\u5DE5\u5730\uFF0C\u4E00\u591C\u4E4B\u95F4\u51FA\u73B0\u4E86\u5360\u5730\u7EA6\u4E09\u4E07\u5E73\u65B9\u7C73\u7684\u5B66\u9662\u5EFA\u7B51\u3002 \u9996\u6279\u8FDB\u5165\u8C03\u67E5\u7684\u4E94\u540D\u8B66\u5458\u65E0\u4E00\u8FD4\u56DE\u3002\u8854\u5C3E\u86C7\u4E8B\u52A1\u6240\u63A5\u7BA1\u540E\uFF0C\u6D3E\u51FA\u7B2C\u4E00\u652F\u5341\u4E8C\u4EBA\u4E13\u4E1A\u961F\u4F0D\uFF0C \u540C\u6837\u5168\u5458\u5931\u8E2A\u3002\u81F3\u6B64\u786E\u8BA4\u4E3AS\u7EA7\u4EE5\u4E0A\u5F02\u5E38\uFF0C\u540E\u7ECF\u91CD\u65B0\u8BC4\u7EA7\u5B9A\u4E3A\u6DF1\u6E0A\u7EA7\u3002"), /*#__PURE__*/React.createElement("p", null, "\u5F02\u5E38\u5165\u53E3\u4F4D\u7F6E\u4E0D\u56FA\u5B9A\uFF0C\u6709\u65F6\u662F\u4E00\u6247\u95E8\uFF0C\u6709\u65F6\u662F\u4E00\u9762\u5899\uFF0C\u751A\u81F3\u53EF\u80FD\u662F\u5730\u94C1\u8F66\u53A2\u7684\u67D0\u4E00\u8282\u3002 \u88AB\u62C9\u5165\u8005\u7684\u5171\u540C\u7279\u5F81\u662F\"\u6B63\u5728\u72EC\u5904\"\u2014\u2014\u8FD9\u662F\u76EE\u524D\u552F\u4E00\u53EF\u786E\u8BA4\u7684\u9009\u53D6\u89C4\u5F8B\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 02"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u57FA\u672C\u7279\u5F81")), /*#__PURE__*/React.createElement("div", {
    className: "file-section-text"
  }, /*#__PURE__*/React.createElement("p", null, "\u8D64\u6708\u5B66\u9662\u662F\u4E00\u5EA7\u5178\u578B\u7684", /*#__PURE__*/React.createElement("strong", null, "\u53D9\u4E8B\u578B\u5F02\u5E38"), "\u3002\u8FDB\u5165\u8005\u4F1A\u88AB\u5206\u914D\u4E00\u4E2A\"\u5B66\u751F\"\u8EAB\u4EFD\uFF0C \u5E76\u83B7\u5F97\u5C5E\u4E8E\u81EA\u5DF1\u7684\"\u5267\u60C5\u4E66\"\u3002\u5267\u60C5\u4E66\u5185\u5BB9\u56E0\u4EBA\u800C\u5F02\uFF0C\u8BB0\u8F7D\u4E86\u8BE5\u89D2\u8272\u5728\u6821\u56ED\u4E2D\u7684\u8EAB\u4EFD\u3001 \u4EBA\u9645\u5173\u7CFB\u3001\u4EE5\u53CA\u9700\u8981\u5B8C\u6210\u7684\"\u5267\u60C5\u4EFB\u52A1\"\u3002\u4E25\u91CD\u504F\u79BB\u5267\u60C5\u8BBE\u5B9A\u5C06\u89E6\u53D1\u60E9\u7F5A\u3002"), /*#__PURE__*/React.createElement("p", null, "\u5F02\u5E38\u7684\u5929\u7A7A\u6C38\u8FDC\u662F\u6697\u7EA2\u8272\u7684\uFF0C\u60AC\u6302\u7740\u4E00\u8F6E\u5DE8\u5927\u7684\u7EA2\u8272\u6708\u4EAE\u2014\u2014\u8FD9\u4E5F\u662F\"\u8D64\u6708\u5B66\u9662\"\u540D\u79F0\u7684\u7531\u6765\u3002 \u6708\u4EAE\u7684\u5927\u5C0F\u548C\u4F4D\u7F6E\u4F1A\u53D8\u5316\uFF0C\u4F46\u6C38\u8FDC\u4E0D\u4F1A\u843D\u4E0B\u3002\u5F02\u5E38\u5185\u90E8\u6CA1\u6709\u592A\u9633\uFF0C\u4E5F\u6CA1\u6709\u663C\u591C\u4EA4\u66FF\uFF0C \u65F6\u95F4\u901A\u8FC7\u949F\u697C\u7684\u949F\u58F0\u548C\u5BBF\u820D\u7184\u706F\u6765\u6807\u8BB0\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 03"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u5185\u90E8\u73AF\u5883")), /*#__PURE__*/React.createElement("div", {
    className: "buildings-grid"
  }, buildings.map((b, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: `building-tag ${i === buildings.length - 1 ? "core" : ""}`
  }, b)))), /*#__PURE__*/React.createElement("div", {
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
  }, speculatedRules.map((rule, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, rule)))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 06"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u8FDB\u5165\u8BB0\u5F55")), /*#__PURE__*/React.createElement("table", {
    className: "entry-records"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u5C4A\u6B21"), /*#__PURE__*/React.createElement("th", null, "\u5E74\u4EFD"), /*#__PURE__*/React.createElement("th", null, "\u8FDB\u5165\u4EBA\u6570"), /*#__PURE__*/React.createElement("th", null, "\u4E3B\u5BFC\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("th", null, "\u7ED3\u679C"))), /*#__PURE__*/React.createElement("tbody", null, entryRecords.map(rec => /*#__PURE__*/React.createElement("tr", {
    key: rec.term
  }, /*#__PURE__*/React.createElement("td", {
    className: "term"
  }, rec.term), /*#__PURE__*/React.createElement("td", null, rec.year), /*#__PURE__*/React.createElement("td", {
    className: "count"
  }, rec.count), /*#__PURE__*/React.createElement("td", null, rec.org), /*#__PURE__*/React.createElement("td", {
    className: rec.status
  }, rec.result)))))), /*#__PURE__*/React.createElement("div", {
    className: "file-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-section-num mono"
  }, "\xA7 07"), /*#__PURE__*/React.createElement("span", {
    className: "file-section-title"
  }, "\u7279\u6B8A\u73B0\u8C61")), /*#__PURE__*/React.createElement("ul", {
    className: "phenomena-list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u89C4\u5219\u81EA\u6211\u4FEE\u6B63\u8FF9\u8C61\uFF1A"), "\u7B2C\u56DB\u5C4A\u8FDB\u5165\u540E\uFF0C\"\u5267\u60C5\u4E66\"\u7684\u5185\u5BB9\u660E\u663E\u6BD4\u7B2C\u4E00\u5C4A\u66F4\u4E3A\u590D\u6742\u548C\u7CBE\u7EC6\uFF0C\u7591\u4F3C\u5F02\u5E38\u5177\u6709\u5B66\u4E60\u548C\u8FDB\u5316\u80FD\u529B\u3002"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u751F\u8FD8\u8005\u5171\u6027\u540E\u9057\u75C7\uFF1A"), "\u4EC5\u6709\u7684\u4E24\u540D\u4E49\u751F\u8FD8\u8005\u5747\u5728\u8FD4\u56DE\u540E\u4E09\u5E74\u5185\u6B7B\u4EA1\uFF0C\u6B7B\u56E0\u5747\u4E3A\"\u5728\u7761\u68A6\u4E2D\u505C\u6B62\u547C\u5438\"\u3002\u5C38\u68C0\u65E0\u5F02\u5E38\u3002"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u62C9\u5165\u673A\u5236\u4E0D\u53EF\u9884\u6D4B\uFF1A"), "\u5165\u53E3\u51FA\u73B0\u5B8C\u5168\u968F\u673A\uFF0C\u53D7\u5BB3\u8005\u53EF\u80FD\u5728\u5BB6\u4E2D\u3001\u529E\u516C\u5BA4\u3001\u751A\u81F3\u884C\u9A76\u7684\u8F66\u8F86\u4E2D\u88AB\u62C9\u5165\u3002\u65E0\u9884\u8B66\u65F6\u95F4\u3002"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\"\u767D\u73AB\u7470\"\u73B0\u8C61\uFF1A"), "\u591A\u540D\u751F\u8FD8\u8005\uFF08\u542B\u6B7B\u540E\uFF09\u7684\u79C1\u4EBA\u7269\u54C1\u4E2D\u53D1\u73B0\u4E86\u5E72\u71E5\u7684\u767D\u8272\u73AB\u7470\u82B1\u74E3\uFF0C\u6765\u6E90\u4E0D\u660E\u3002"))), /*#__PURE__*/React.createElement("div", {
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
  }, "\u8D64\u6708\u5B66\u9662\u662F\u76EE\u524D\u5DF2\u77E5\u6301\u7EED\u65F6\u95F4\u6700\u957F\u3001\u81F4\u6B7B\u7387\u6700\u9AD8\u7684\u6DF1\u6E0A\u7EA7\u5F02\u5E38\u4E4B\u4E00\u3002 \u9274\u4E8E\u5176\u4E0D\u53EF\u9884\u6D4B\u7684\u62C9\u5165\u673A\u5236\u548C\u6781\u9AD8\u7684\u6B7B\u4EA1\u7387\uFF0CIMAC \u534F\u8C03\u529E\u516C\u5BA4\u5DF2\u5C06\u5176\u5217\u4E3A \"\u4F18\u5148\u7EA7-\u963F\u5C14\u6CD5\"\u89C2\u5BDF\u5BF9\u8C61\u3002\u4EFB\u4F55\u7EC4\u7EC7\u5728\u91C7\u53D6\u884C\u52A8\u524D\u5FC5\u987B\u63D0\u4EA4\u5B8C\u6574\u65B9\u6848\u5E76\u83B7\u5F97 IMAC \u5BA1\u6279\u3002 \u672A\u7ECF\u6388\u6743\u7684\u79C1\u81EA\u8FDB\u5165\u5C06\u88AB\u89C6\u4E3A\u4E25\u91CD\u8FDD\u89C4\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "internal-note"
  }, /*#__PURE__*/React.createElement("p", {
    className: "internal-note-text"
  }, "\u3010\u8854\u5C3E\u86C7\u4E8B\u52A1\u6240\u5185\u90E8\u8BC4\u4F30 \xB7 \u9996\u5E2D\u6EAF\u754C\u8005 \u9646\u6C89\u821F\u3011", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u8D64\u6708\u5B66\u9662\u662F\u6211\u804C\u4E1A\u751F\u6DAF\u91CC\u6700\u8BA9\u6211\u4E0D\u5B89\u7684\u4E00\u4E2A\u5F02\u5E38\u2014\u2014\u56E0\u4E3A\u5B83\u4E0D\u50CF\u5F02\u5E38\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u5341\u4E00\u5C4A\uFF0C\u4E00\u767E\u4E00\u5341\u516D\u4EBA\uFF0C\u6CA1\u6709\u4E00\u4E2A\u4EBA\u662F\u88AB\u89C4\u5219\u76F4\u63A5\u6740\u6B7B\u7684\uFF1A\u4ED6\u4EEC\u8981\u4E48\u5931\u8E2A\uFF0C\u8981\u4E48\"\u5267\u60C5\u5931\u8D25\"\u540E\u6D88\u5931\uFF0C\u8981\u4E48\u540C\u5316\u3002 \u5E38\u89C4\u6DF1\u6E0A\u7EA7\u5F02\u5E38\u662F\"\u4E3B\u52A8\u6740\u4EBA\"\u7684\uFF0C\u8D64\u6708\u5B66\u9662\u4E0D\u50CF\u3002\u5B83\u66F4\u50CF\u662F\u5728\"\u7B5B\u9009\"\u4EC0\u4E48\u2014\u2014\u6211\u8BF4\u4E0D\u6E05\u5B83\u5728\u7B5B\u9009\u4EC0\u4E48\uFF0C\u4F46\u90A3\u79CD\u611F\u89C9\u6325\u4E4B\u4E0D\u53BB\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u767D\u73AB\u7470\u82B1\u56ED\u662F\u8FD9\u4E00\u5207\u7684\u94A5\u5319\u3002\u6240\u6709\u63A5\u8FD1\u8FC7\u6838\u5FC3\u533A\u57DF\u7684\u4EBA\uFF0C\u5373\u4F7F\u56DE\u6765\u4E86\uFF0C\u4E5F\u90FD\u53D8\u4E86\u3002\u6211\u89C1\u8FC7\u4ED6\u4EEC\u7684\u773C\u775B\uFF0C\u90A3\u4E0D\u662F\u88AB\u5413\u51FA\u6765\u7684\uFF0C\u662F\u88AB\"\u770B\u8FC7\"\u4E4B\u540E\u7559\u4E0B\u7684\u4E1C\u897F\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u5904\u7F6E\u4E0A\u6211\u5EFA\u8BAE\u7EF4\u6301\u5916\u56F4\u76D1\u6D4B\uFF0C\u6682\u4E0D\u7EC4\u7EC7\u5927\u89C4\u6A21\u8FDB\u5165\uFF1B\u7B2C\u5341\u4E00\u5C4A\u5185\u90E8\u5B58\u6D3B\u8005\u7684\u4FE1\u6807\u5FC5\u987B\u76EF\u4F4F\u2014\u2014\u65E0\u8BBA\u5B83\u6062\u590D\u6B63\u5E38\u8FD8\u662F\u5F7B\u5E95\u6D88\u5931\uFF0C\u90FD\u4F1A\u544A\u8BC9\u6211\u4EEC\u7B54\u6848\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u81F3\u4E8E\u76F4\u89C9\u7684\u90E8\u5206\uFF0C\u6863\u6848\u672C\u4E0D\u8BE5\u5199\uFF0C\u4F46\u6211\u8FD8\u662F\u60F3\u5199\uFF1A\u6211\u603B\u89C9\u5F97\uFF0C\u8FD9\u5EA7\u5B66\u9662\u5728\u7B49\u5F85\u67D0\u4E2A\u4EBA\uFF0C\u6216\u8005\u8BF4\uFF0C\u5728\u7B49\u67D0\u4E2A\"\u5B66\u751F\"\u6BD5\u4E1A\u3002\u7B49\u5B83\u771F\u6B63\"\u6BD5\u4E1A\"\u7684\u90A3\u5929\uFF0C\u6211\u4EEC\u6700\u597D\u5DF2\u7ECF\u51C6\u5907\u597D\u4E86\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "internal-note-signature"
  }, "\u2014 \u9646\u6C89\u821F \xB7 \u9996\u5E2D\u6EAF\u754C\u8005 \xB7 \u754C\u6807"))), /*#__PURE__*/React.createElement("div", {
    className: "file-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-meta"
  }, "FILE ID: LOA-0073 / VER: 39.2 / CLASSIFICATION: EYES ONLY"), /*#__PURE__*/React.createElement("div", {
    className: "file-meta"
  }, "LAST UPDATED: \u5B89\u73C0\u538639\u5E74\xB7\u6625")))));
}
window.AnomalyFile = AnomalyFile;