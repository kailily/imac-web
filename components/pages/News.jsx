function NewsPage() {
  const { navigate } = useRouter();
  const { canAccess } = useAuth();
  const [expandedId, setExpandedId] = React.useState(null);

  const news = [
    {
      id: "northwatch-mountain",
      title: "北境守望成功解决山区常规级异常",
      date: "安珀历39年 · 春 · 第 047 号通报",
      source: "北境守望公关部",
      sourceEn: "NORTHWATCH",
      desc: "白松城以南山区循环路段异常于昨日被成功解决，7名被困平民安全撤离。本次行动由北境守望第三支队执行，历时72小时，无溯界者伤亡。",
      level: "public",
      tag: "事件通报",
      content: [
        "本报导经IMAC信息协调办公室三层审定，确认可公开披露。",
        "安珀历39年春季，白松城以南约47公里处的107省道出现异常现象：车辆行驶至该路段时，GPS信号会突然丢失，随后车辆在不知不觉中回到起点，形成一条不断循环的路段。当地交管部门在接到多起「迷路」报告后，初步判断为规则型异常，并立即上报IMAC区域协调中心。",
        "北境守望第三支队于接报后6小时内抵达现场，封锁路段并设立临时安全边界。经过初步勘查，该异常影响范围约为2.3公里的山区路段，异常等级判定为常规级（SP-0421）。",
        "行动历时共72小时，分为三个阶段：",
        "第一阶段（前24小时）：规则解析组通过投放无人探测装置与标记物，确认该异常的核心规则为「视线封闭循环」——当驾驶员在弯道处失去对前方直路的视线时，空间会发生折叠式重置。",
        "第二阶段（中间24小时）：处置组采用「连续视距锚定法」，在关键弯道处设置高亮度信标阵列，打破循环触发条件。",
        "第三阶段（最后24小时）：溯源组沿异常能量轨迹逆向追踪，在一处废弃的护林员小屋中找到异常源头——一面老旧的圆形铜镜。铜镜安全封存后，异常现象随即消散。",
        "本次行动共安全撤离受困平民7人，无溯界者伤亡。被困人员均已接受心理评估，其中2人出现轻度定向障碍，预计一周内可完全恢复。",
      ],
      tags: ["常规级", "空间型", "北境守望", "山区异常"],
    },
    {
      id: "imac-guide-2024",
      title: "IMAC发布新版公民应急指南",
      date: "安珀历39年 · 春 · 第 032 号公告",
      source: "IMAC信息协调办公室",
      sourceEn: "IMAC INFO COORDINATION",
      desc: "国际异常管理联盟今日发布2024版公民应急指南，新增城市地铁异常应对章节。指南面向全球公众免费发放，可在各城市便民服务点领取电子版。",
      level: "public",
      tag: "公告",
      content: [
        "国际异常管理联盟（IMAC）今日正式发布2024版《公民异常应急指南》。这是该指南自发布以来的第四次全面修订。",
        "与上一版相比，新版指南主要有以下更新：",
        "一、新增「城市地铁异常应对」专章。鉴于近年来城市轨道交通异常事件呈上升趋势，指南详细列举了地铁环境中常见的异常类型（循环站台、镜像列车、消失的出口等）及对应的自我保护措施。",
        "二、扩充了「异常识别速查表」。新增12种常见异常现象的典型特征与初步判断方法，帮助普通公民在第一时间做出正确判断。",
        "三、更新了全球异常热线号码表。所有成员国的统一报警号码「99」已全面开通，指南补充了各地区的辅助联系方式。",
        "四、增加了「心理自助」章节。由IMAC心理评估中心编写，指导普通公民在遭遇异常事件后如何进行初步的自我心理调节。",
        "指南全文共128页，配有67幅示意图。所有公民均可通过IMAC官方网站免费下载电子版，或在各城市社区服务中心、图书馆、地铁站免费领取印刷版。",
        "IMAC信息协调办公室发言人表示：「知识是最好的防护。我们希望每一位公民都能了解基本的异常应对知识，在危急时刻保护自己和家人。」",
      ],
      tags: ["公告", "应急指南", "公众教育"],
    },
    {
      id: "bri-annual-report",
      title: "边界研究院公布年度异常统计报告",
      date: "安珀历39年 · 冬 · 第 156 号报告",
      source: "边界研究院BRI",
      sourceEn: "BRI STATISTICS",
      desc: "边界研究院（BRI）发布年度异常现象统计分析报告。数据显示，全球异常出现频率与去年基本持平，新发现异常327起，其中常规级占比74%，危险级21%，厄运级4%，深渊级1%。",
      level: "public",
      tag: "统计报告",
      content: [
        "边界研究院（Borderline Research Institute, BRI）今日发布安珀历38年度全球异常现象统计分析报告。",
        "报告显示，安珀历38年度全球共新发现异常现象327起，与上一年度的331起基本持平。这是连续第三年全球异常总数保持相对稳定。",
        "按异常等级划分：",
        "· 常规级（Ordinary）：242起，占比74.0%",
        "· 危险级（Danger）：69起，占比21.1%",
        "· 厄运级（Doom）：13起，占比4.0%",
        "· 深渊级（Abyss）：3起，占比0.9%",
        "按异常类别划分：",
        "· 空间型（SP）：98起，占比最高",
        "· 时间型（TM）：47起",
        "· 物理型（PH）：62起",
        "· 认知型（CG）：54起",
        "· 实体型（EN）：38起",
        "· 场所型（LO）：21起",
        "· 物件型（OB）：7起",
        "报告同时指出，本年度成功解决的异常共298起，成功率为91.1%，较上一年度提高了2.3个百分点。这主要得益于各成员组织之间的协同效率提升以及新技术装备的投入使用。",
        "边界研究院院长在报告发布会上表示：「全球异常态势总体可控，但我们不能有丝毫松懈。新类型异常的出现频率正在缓慢上升，这需要全球溯界者保持警惕。」",
      ],
      tags: ["统计报告", "边界研究院", "年度数据"],
    },
    {
      id: "ouroboros-metro",
      title: "衔尾蛇事务所完成鸣海城地铁异常处理",
      date: "安珀历39年 · 秋 · 第 098 号通报",
      source: "衔尾蛇事务所",
      sourceEn: "OUROBOROS AGENCY",
      desc: "鸣海城地铁三号线循环异常于今日宣告解决。这是衔尾蛇事务所在本年度处理的第23起城市异常事件。147名被困平民全部安全撤离。",
      level: "public",
      tag: "事件通报",
      content: [
        "鸣海城地铁三号线「南站—会展中心」区间于前日发生循环型异常事件。列车在行驶过程中反复回到同一站台，乘客始终无法到达目的地。",
        "事件发生在早高峰时段，当时列车上共有乘客147人。地铁运营方在发现异常后立即启动应急预案，切断该区间供电并上报IMAC。",
        "衔尾蛇事务所鸣海分部在接报后两小时内抵达现场。由资深溯界者「赤鸦」带领的行动组负责本次处置。",
        "经勘查，该异常为典型的「循环站台」型空间异常（SP-1132，危险级）。异常的核心特征是：列车在两个相邻站点之间行驶时，会不断回到出发站台，形成一个封闭的循环空间。",
        "处置过程分为两步：",
        "第一步，行动组通过地铁通风管道进入异常影响区域，在列车上建立通讯联络，安抚乘客情绪并讲解注意事项。",
        "第二步，采用「破序标记法」——溯界者在每个循环周期中，在车厢不同位置留下递增的标记，逐步打破循环规则的稳定性。经过七个循环周期后，异常规则出现紊乱，列车成功「驶出」循环区间。",
        "147名乘客全部安全撤离，无人受伤。所有乘客均已接受标准心理评估与记忆梳理程序。",
        "这是衔尾蛇事务所在本年度成功处理的第23起城市异常事件，再次展现了该所在城市环境下处置异常的专业能力。",
      ],
      tags: ["危险级", "空间型", "地铁异常", "衔尾蛇事务所"],
    },
    {
      id: "global-training-lorraine",
      title: "全球溯界者联合训练在洛林举行",
      date: "安珀历39年 · 夏 · 第 076 号动态",
      source: "IMAC训练协调部",
      sourceEn: "IMAC TRAINING",
      desc: "两年一度的全球溯界者联合训练在边界研究院总部举行。来自八大成员组织的120名溯界者参加了本次训练，涵盖规则解析、装备操作、团队协作等科目。",
      level: "public",
      tag: "训练动态",
      content: [
        "安珀历39年夏季，两年一度的「全球溯界者联合训练」在位于洛林的边界研究院总部训练基地举行。",
        "本次训练由IMAC训练协调部主办，边界研究院承办。来自八大成员组织的120名溯界者参加了训练，是历届规模最大的一次。",
        "训练为期两周，分为基础科目、进阶科目和综合演练三个部分：",
        "· 基础科目：异常识别与分类、标准装备操作、初级规则解析方法、安全撤离程序。",
        "· 进阶科目：高级规则推演、团队协同战术、异常实体应对、特殊环境适应。",
        "· 综合演练：模拟真实异常场景的全流程处置演练，考验溯界者的综合能力与团队协作。",
        "本次训练首次引入了「虚拟异常环境模拟系统」（VAESS），可以在安全环境下模拟多种类型的异常场景，大大提高了训练效率和安全性。",
        "训练协调部负责人表示：「联合训练的目的不仅是提升溯界者的个人能力，更重要的是建立跨组织的协作默契。当大型异常事件发生时，我们需要全球溯界者能够像一支队伍一样并肩作战。」",
      ],
      tags: ["训练", "联合训练", "边界研究院", "溯界者"],
    },
    {
      id: "longbridge-op-conn",
      title: "长桥会社完成跨区域联合行动",
      date: "安珀历39年 · 秋 · 第 134 号通报",
      source: "长桥会社",
      sourceEn: "LONG BRIDGE COMPANY",
      desc: "长桥会社主导的「联结行动」成功解决了一起跨两国的联动型异常。这是本年度规模最大的跨国异常处置行动，三个成员组织协同参与。",
      level: "public",
      tag: "联合行动",
      content: [
        "由长桥会社主导的代号为「联结行动」的跨国异常处置任务于近日圆满完成。本次行动横跨两个国家，涉及三处联动异常节点，是本年度规模最大的跨国异常处置行动。",
        "异常现象最早出现在新海市港区——一批集装箱在装卸过程中出现「内容物错位」现象：打开集装箱后，里面的货物与发货清单完全不符，且发货方坚称装箱时无误。经初步勘查，判定为联动型传送异常。",
        "随着调查深入，溯界者发现该异常并非孤立存在，而是与另外两个国家的港口异常节点相连，形成一个跨区域的「异常传送网络」。这是极为罕见的三地联动型异常。",
        "IMAC迅速启动跨国协调机制，由长桥会社作为主导方，另外两个成员国的成员组织协同参与。行动代号「联结」，意在打破异常节点之间的联系。",
        "行动历时九天，长桥会社派出了三支精英小队，分别前往三个节点同步作业。通过精密的时间协调，三个小队在同一时刻对各自节点的异常核心进行干预，成功切断了节点之间的异常能量联系。",
        "三个异常节点随后逐一消散，所有错位的货物均已归位。本次行动中，长桥会社展现出的跨国协调能力和精密战术执行水平，得到了IMAC总部的高度评价。",
        "长桥会社行动指挥官表示：「异常没有国界。面对联动型异常，我们需要的不仅是勇气，更需要无缝的跨国协作。这正是IMAC存在的意义。」",
      ],
      tags: ["联合行动", "长桥会社", "联动型异常", "跨区域"],
    },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
    // 展开时滚动到对应位置
    if (expandedId !== id) {
      setTimeout(() => {
        const el = document.getElementById(`news-${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 100 || rect.bottom > window.innerHeight) {
            window.scrollTo({
              top: window.scrollY + rect.top - 100,
              behavior: "smooth",
            });
          }
        }
      }, 50);
    }
  };

  return (
    <>
      <style>{`
        .news-page-hero {
          padding-top: 120px;
          padding-bottom: 40px;
          background: linear-gradient(180deg, #0e0e12 0%, #121116 100%);
          border-bottom: 1px solid var(--border-color);
        }
        .news-page-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          margin-bottom: 14px;
        }
        .news-page-title {
          font-family: var(--font-serif);
          font-size: 40px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .news-page-subtitle {
          font-size: 15px;
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.7;
        }
        .news-page-main {
          padding: 50px 0 80px;
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 40px;
        }
        .news-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .news-item {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }
        .news-item:hover {
          border-color: var(--border-light);
        }
        .news-item.expanded {
          border-color: var(--accent-red);
          box-shadow: 0 0 20px rgba(196, 40, 40, 0.1);
        }
        .news-item-header {
          padding: 24px 28px;
          cursor: pointer;
          display: flex;
          gap: 24px;
        }
        .news-item-tag {
          writing-mode: vertical-rl;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          padding: 4px 0;
          border-left: 2px solid var(--accent-red-bright);
          flex-shrink: 0;
          text-orientation: mixed;
        }
        .news-item-body { flex: 1; min-width: 0; }
        .news-item-source {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .news-item-title {
          font-family: var(--font-serif);
          font-size: 19px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
          line-height: 1.4;
          transition: color 0.2s ease;
        }
        .news-item:hover .news-item-title { color: var(--accent-red-bright); }
        .news-item-date {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          margin-bottom: 12px;
        }
        .news-item-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .news-item-readmore {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          font-size: 12px;
          font-family: var(--font-mono);
          color: var(--accent-red-bright);
          letter-spacing: 0.1em;
          transition: all 0.2s ease;
        }
        .news-item-readmore svg {
          width: 12px; height: 12px;
          transition: transform 0.2s ease;
        }
        .news-item.expanded .news-item-readmore svg {
          transform: rotate(90deg);
        }

        .news-item-detail {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
          border-top: 1px solid transparent;
        }
        .news-item.expanded .news-item-detail {
          max-height: 3000px;
          border-top-color: var(--border-color);
        }
        .news-detail-inner {
          padding: 24px 28px 28px;
          padding-left: calc(28px + 24px + 2px);
        }
        .news-detail-meta-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }
        .news-detail-tag-pill {
          padding: 4px 10px;
          border: 1px solid var(--border-color);
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .news-detail-content {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .news-detail-content p {
          margin: 0;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.85;
        }
        .news-detail-content p:first-letter {
          padding-left: 0;
        }
        .news-detail-close-row {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: center;
        }
        .news-detail-close-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 20px;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-tertiary);
          font-size: 11px;
          font-family: var(--font-mono);
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .news-detail-close-btn:hover {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }

        .news-sidebar {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .news-side-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 22px 20px;
        }
        .news-side-card h4 {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.2em;
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-color);
        }
        .news-side-tag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .news-side-tag {
          padding: 4px 10px;
          border: 1px solid var(--border-color);
          font-size: 11px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .news-side-tag:hover {
          border-color: var(--accent-red-bright);
          color: var(--accent-red-bright);
        }
        .media-guidelines-entry {
          padding: 16px;
          background: linear-gradient(135deg, rgba(196, 154, 44, 0.08), transparent);
          border: 1px dashed rgba(196, 154, 44, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .media-guidelines-entry:hover {
          border-color: var(--accent-red-bright);
          border-style: solid;
        }
        .media-guidelines-entry .icon {
          width: 20px; height: 20px;
          color: #c49a2c;
          margin-bottom: 8px;
        }
        .media-guidelines-entry .title {
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .media-guidelines-entry .desc {
          font-size: 11px;
          color: var(--text-tertiary);
          line-height: 1.5;
        }
        .media-guidelines-entry .cta {
          margin-top: 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-red-bright);
          letter-spacing: 0.1em;
        }

        @media (max-width: 1024px) {
          .news-page-main { grid-template-columns: 1fr; }
          .news-sidebar { position: static; }
        }
        @media (max-width: 768px) {
          .news-page-title { font-size: 30px; }
          .news-item-header { flex-direction: column; gap: 12px; padding: 20px; }
          .news-item-tag { writing-mode: horizontal-tb; border-left: none; border-bottom: 2px solid var(--accent-red-bright); padding: 0 0 4px; }
          .news-detail-inner { padding: 20px; padding-left: 20px; }
        }

        .news-back-home-wrap {
          text-align: center;
          padding: 0 24px 80px;
        }
        .news-back-home {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 32px;
          background: transparent;
          border: 1.5px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .news-back-home:hover {
          background-color: var(--accent-red-bright);
          color: #fff;
        }
      `}</style>

      <section className="news-page-hero">
        <div className="container">
          <div className="news-page-label">NEWS CENTER · 新闻中心</div>
          <h1 className="news-page-title">最新动态</h1>
          <p className="news-page-subtitle">
            IMAC官方新闻发布渠道。所有公开报道均经过信息协调办公室审定，
            确保披露内容准确、适当，不泄露敏感信息。
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="news-page-main">
            <div className="news-list">
              {news.map((n) => {
                const isExpanded = expandedId === n.id;
                return (
                  <article
                    key={n.id}
                    id={`news-${n.id}`}
                    className={`news-item ${isExpanded ? "expanded" : ""}`}
                  >
                    <div className="news-item-header" onClick={() => toggleExpand(n.id)}>
                      <div className="news-item-tag">{n.tag}</div>
                      <div className="news-item-body">
                        <div className="news-item-source">{n.sourceEn.toUpperCase()}</div>
                        <h3 className="news-item-title">{n.title}</h3>
                        <div className="news-item-date">{n.date} · {n.source}</div>
                        <p className="news-item-desc">{n.desc}</p>
                        <span className="news-item-readmore">
                          {isExpanded ? "收起详情" : "查看详情"}
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6"/>
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="news-item-detail">
                      <div className="news-detail-inner">
                        <div className="news-detail-meta-bar">
                          {n.tags.map((t, i) => (
                            <span key={i} className="news-detail-tag-pill">{t}</span>
                          ))}
                        </div>
                        <div className="news-detail-content">
                          {n.content.map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>
                        <div className="news-detail-close-row">
                          <button className="news-detail-close-btn" onClick={() => toggleExpand(n.id)}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="18 15 12 9 6 15"/>
                            </svg>
                            收起
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="news-sidebar">
              <div className="news-side-card">
                <h4>分类标签</h4>
                <div className="news-side-tag-list">
                  {["全部", "事件通报", "公告", "统计报告", "训练动态", "联合行动"].map((t, i) => (
                    <span key={i} className="news-side-tag">{t}</span>
                  ))}
                </div>
              </div>

              <Restricted level="media" label="受限级内容">
                <div className="media-guidelines-entry" onClick={() => navigate("/media-guidelines")}>
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                  </svg>
                  <div className="title">新闻报道规范</div>
                  <p className="desc">三层审定机制、五不披露原则、注册媒体人员认证流程</p>
                  <div className="cta">媒体人员登录查看 →</div>
                </div>
              </Restricted>

              <div className="news-side-card">
                <h4>订阅更新</h4>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "12px" }}>
                  订阅IMAC官方通讯，第一时间获取异常预警与安全提示。
                </p>
                <input
                  type="email"
                  placeholder="您的邮箱地址"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                    fontSize: "12px",
                    fontFamily: "var(--font-mono)",
                    marginBottom: "8px",
                    boxSizing: "border-box",
                  }}
                />
                <button style={{
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "var(--accent-red-bright)",
                  border: "none",
                  color: "#fff",
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                }}>
                  订阅
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="news-back-home-wrap">
        <button className="news-back-home" onClick={() => {
          navigate("/");
          setTimeout(() => {
            const el = document.getElementById("news");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 200);
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5 M12 19l-7-7 7-7"/>
          </svg>
          返回首页
        </button>
      </div>
    </>
  );
}

window.NewsPage = NewsPage;
