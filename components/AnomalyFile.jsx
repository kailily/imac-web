// Featured Anomaly File - LOA-0073 赤月学院
function AnomalyFile() {
  const verifiedRules = [
    {
      num: "一",
      title: '身份分配',
      desc: '进入者自动获得学生身份与「剧情书」，严重偏离角色设定将触发惩罚。剧情书内容因人而异。',
    },
    {
      num: "二",
      title: "区域限制",
      desc: "不可破坏校园建筑与设施。越界进入未开放区域将触发空间排斥，严重者直接消失。",
    },
    {
      num: "三",
      title: "宵禁制度",
      desc: "23:00 至次日 6:00 期间必须返回宿舍。夜间外出者死亡率 100%，无例外记录。",
    },
    {
      num: "四",
      title: '教学制度',
      desc: '定期进行才能考核。排名第一者可获得「特殊奖励」，内容未知，疑似与离开路径相关。',
    },
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
    { term: "第十一届", year: "安珀历39年·秋", count: 8, org: "衔尾蛇主导", result: "进行中", status: "active", current: true },
  ];

  return (
    <>
      <style>{`
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
      `}</style>
      <section id="anomaly-file" className="section anomaly-file-section">
        <div className="container anomaly-file-inner">
          <div className="file-header-bar">
            <div className="file-header-title">
              <span className="section-number mono" style={{ color: "var(--accent-red-bright)" }}>06 /</span>
              <div>
                <div className="file-title-cn">异常信息数据库</div>
                <div className="file-title-en">ANOMALY INFORMATION DATABASE</div>
              </div>
            </div>
            <div className="file-stamp">
              <div className="stamp">绝密 · EYES ONLY</div>
            </div>
          </div>

          {/* Info Table */}
          <table className="info-table">
            <tbody>
              <tr>
                <th>异常编号</th>
                <td><span className="file-id">LOA-0073</span></td>
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
                <td><span className="level-badge">深渊级 · ABYSSAL</span></td>
                <th>当前状态</th>
                <td><span className="status-active">● 活跃 ACTIVE</span></td>
              </tr>
              <tr>
                <th>生还率</th>
                <td><span className="survival-rate">约 1.9%</span> （107人进入，2人生还后死亡）</td>
                <th>档案更新</th>
                <td>安珀历39年 · 春</td>
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
                被拉入者的共同特征是"正在独处"——这是目前唯一可确认的选取规律。
              </p>
            </div>
          </div>

          {/* Basic Features */}
          <div className="file-section">
            <div className="file-section-header">
              <span className="file-section-num mono">§ 02</span>
              <span className="file-section-title">基本特征</span>
            </div>
            <div className="file-section-text">
              <p>
                赤月学院是一座典型的<strong>叙事型异常</strong>。进入者会被分配一个"学生"身份，
                并获得属于自己的"剧情书"。剧情书内容因人而异，记载了该角色在校园中的身份、
                人际关系、以及需要完成的"剧情任务"。严重偏离剧情设定将触发惩罚。
              </p>
              <p>
                异常的天空永远是暗红色的，悬挂着一轮巨大的红色月亮——这也是"赤月学院"名称的由来。
                月亮的大小和位置会变化，但永远不会落下。异常内部没有太阳，也没有昼夜交替，
                时间通过钟楼的钟声和宿舍熄灯来标记。
              </p>
            </div>
          </div>

          {/* Internal Environment */}
          <div className="file-section">
            <div className="file-section-header">
              <span className="file-section-num mono">§ 03</span>
              <span className="file-section-title">内部环境</span>
            </div>
            <div className="buildings-grid">
              {buildings.map((b, i) => (
                <span key={i} className={`building-tag ${i === buildings.length - 1 ? "core" : ""}`}>
                  {b}
                </span>
              ))}
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

          {/* Speculated Rules */}
          <div className="file-section">
            <div className="file-section-header">
              <span className="file-section-num mono">§ 05</span>
              <span className="file-section-title">推测规则</span>
              <span className="tag pending">待验证 · UNCONFIRMED</span>
            </div>
            <ul className="speculated-list">
              {speculatedRules.map((rule, i) => (
                <li key={i}>{rule}</li>
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
                  <tr key={rec.term}>
                    <td className="term">{rec.term}</td>
                    <td>{rec.year}</td>
                    <td className="count">{rec.count}</td>
                    <td>{rec.org}</td>
                    <td className={rec.status}>{rec.result}</td>
                  </tr>
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
              <li><strong>规则自我修正迹象：</strong>第四届进入后，"剧情书"的内容明显比第一届更为复杂和精细，疑似异常具有学习和进化能力。</li>
              <li><strong>生还者共性后遗症：</strong>仅有的两名义生还者均在返回后三年内死亡，死因均为"在睡梦中停止呼吸"。尸检无异常。</li>
              <li><strong>拉入机制不可预测：</strong>入口出现完全随机，受害者可能在家中、办公室、甚至行驶的车辆中被拉入。无预警时间。</li>
              <li><strong>"白玫瑰"现象：</strong>多名生还者（含死后）的私人物品中发现了干燥的白色玫瑰花瓣，来源不明。</li>
            </ul>
          </div>

          {/* IMAC Note */}
          <div className="file-section">
            <div className="file-section-header">
              <span className="file-section-num mono">§ 08</span>
              <span className="file-section-title">备注</span>
            </div>
            <div className="note-box">
              <p className="note-text">
                赤月学院是目前已知持续时间最长、致死率最高的深渊级异常之一。
                鉴于其不可预测的拉入机制和极高的死亡率，IMAC 协调办公室已将其列为
                "优先级-阿尔法"观察对象。任何组织在采取行动前必须提交完整方案并获得 IMAC 审批。
                未经授权的私自进入将被视为严重违规。
              </p>
            </div>
            <div className="internal-note">
              <p className="internal-note-text">
                【衔尾蛇事务所内部评估 · 首席溯界者 陆沉舟】<br/><br/>
                赤月学院是我职业生涯里最让我不安的一个异常——因为它不像异常。<br/><br/>
                十一届，一百一十六人，没有一个人是被规则直接杀死的：他们要么失踪，要么"剧情失败"后消失，要么同化。
                常规深渊级异常是"主动杀人"的，赤月学院不像。它更像是在"筛选"什么——我说不清它在筛选什么，但那种感觉挥之不去。<br/><br/>
                白玫瑰花园是这一切的钥匙。所有接近过核心区域的人，即使回来了，也都变了。我见过他们的眼睛，那不是被吓出来的，是被"看过"之后留下的东西。<br/><br/>
                处置上我建议维持外围监测，暂不组织大规模进入；第十一届内部存活者的信标必须盯住——无论它恢复正常还是彻底消失，都会告诉我们答案。<br/><br/>
                至于直觉的部分，档案本不该写，但我还是想写：我总觉得，这座学院在等待某个人，或者说，在等某个"学生"毕业。等它真正"毕业"的那天，我们最好已经准备好了。
              </p>
              <div className="internal-note-signature">— 陆沉舟 · 首席溯界者 · 界标</div>
            </div>
          </div>

          <div className="file-footer">
            <div className="file-meta">FILE ID: LOA-0073 / VER: 39.2 / CLASSIFICATION: EYES ONLY</div>
            <div className="file-meta">LAST UPDATED: 安珀历39年·春</div>
          </div>
        </div>
      </section>
    </>
  );
}

window.AnomalyFile = AnomalyFile;
