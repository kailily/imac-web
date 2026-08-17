// Emergency Guide page - full 10 rules
function GuidePage() {
  const { navigate } = useRouter();

  const rules = [
    {
      num: "01",
      title: "保持冷静，不要奔跑",
      desc: "恐慌是最大的敌人。发现异常后先停下来，深呼吸。越慌越容易出错，越容易触发规则惩罚。给自己十秒钟，确认自己还活着，然后开始观察。",
      icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z M12 22V12",
    },
    {
      num: "02",
      title: "观察环境，寻找不对劲的地方",
      desc: "异常总会留下痕迹。注意周围的环境——是不是有什么东西不对劲？门牌跳号？钟表不走？路一直循环？这些线索可能就是规则的提示。",
      icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 100-6 3 3 0 000 6z",
    },
    {
      num: "03",
      title: "不要触碰任何异常物品",
      desc: "任何看起来反常的东西——墙上多出来的画、地上不存在的硬币、无人认领的信件——一律不要碰。触碰物品是最常见的规则触发方式之一。",
      icon: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
    },
    {
      num: "04",
      title: "立即拨打异常热线 99",
      desc: "拨打99不需要区号，任何手机都能接通，即使没有信号。接线员会告诉你下一步怎么做。描述你看到的情况越详细，专业人员来得越快。",
      icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
    },
    {
      num: "05",
      title: "不要单独行动，与其他人待在一起",
      desc: "如果身边有其他人，聚在一起。群体比个体更容易发现规则的线索，也更容易互相提醒。但注意——你不确定身边的「人」是不是真的人。",
      icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
    },
    {
      num: "06",
      title: "如果听到声音，不要立即回应",
      desc: "异常中的声音可能是陷阱。听到有人叫你的名字、求救声、或你熟悉的声音，先不要答应，也不要循着声音去找。先确认声音从哪里来、说的是什么。",
      icon: "M3 18v-6a9 9 0 0118 0v6 M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z",
    },
    {
      num: "07",
      title: "遇到门牌号不连续时不要进那扇门",
      desc: "门牌号跳号的房间——比如101之后直接是103——中间消失的那间房是真实存在的，但你最好不要去找它。它找你的时候，装没听见。",
      icon: "M3 21V3h18v18H3z M8 21V9h8v12",
    },
    {
      num: "08",
      title: "不要向异常中的「人」透露你的真实信息",
      desc: "如果你在异常中遇到看似正常的人，不要告诉他们你的真实姓名、生日、住址等个人信息。它们可能不是人，知道得越多对你越不利。",
      icon: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z",
    },
    {
      num: "09",
      title: "记录你看到的一切，越详细越好",
      desc: "时间、地点、人物、发生了什么——所有不对劲的细节都记下来。即使你安全离开了，这些信息对后来的人也可能至关重要。",
      icon: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
    },
    {
      num: "10",
      title: "相信专业人员，听从指挥",
      desc: "溯界者是受过专业训练的异常处理人员。他们到达后，听从指挥有序撤离。不要质疑流程，不要因为好奇而擅自行动。",
      icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
    },
  ];

  return (
    <>
      <style>{`
        .guide-page-hero {
          padding-top: 120px;
          padding-bottom: 50px;
          background: linear-gradient(180deg, #0e0e12 0%, #130f12 100%);
          border-bottom: 1px solid var(--border-color);
          text-align: center;
        }
        .guide-page-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
          letter-spacing: 0.2em;
          margin-bottom: 14px;
        }
        .guide-page-title {
          font-family: var(--font-serif);
          font-size: 40px;
          font-weight: 900;
          color: var(--text-primary);
          margin-bottom: 16px;
        }
        .guide-page-subtitle {
          font-size: 15px;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.8;
        }
        .guide-hotline-banner {
          margin: 30px auto 0;
          max-width: 500px;
          padding: 16px 24px;
          background-color: rgba(196, 40, 40, 0.1);
          border: 2px solid var(--accent-red-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .guide-hotline-num {
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 900;
          color: var(--accent-red-bright);
          line-height: 1;
        }
        .guide-hotline-text {
          text-align: left;
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .guide-hotline-text strong { color: var(--text-primary); display: block; font-size: 14px; }

        .guide-content {
          padding: 60px 0 80px;
        }
        .guide-rules-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 40px;
        }
        .guide-rule-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 28px 24px;
          display: flex;
          gap: 20px;
          transition: all 0.3s ease;
        }
        .guide-rule-card:hover {
          border-color: var(--border-light);
        }
        .guide-rule-num-wrap {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .guide-rule-num {
          font-family: var(--font-mono);
          font-size: 24px;
          font-weight: 700;
          color: var(--accent-red-bright);
          line-height: 1;
        }
        .guide-rule-icon {
          width: 36px; height: 36px;
          color: var(--text-secondary);
        }
        .guide-rule-content { flex: 1; }
        .guide-rule-title {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .guide-rule-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .guide-warning-box {
          margin-top: 50px;
          padding: 28px;
          background: linear-gradient(135deg, rgba(196, 40, 40, 0.08), rgba(196, 40, 40, 0.02));
          border: 1px solid rgba(196, 40, 40, 0.3);
          text-align: center;
        }
        .guide-warning-box h3 {
          font-family: var(--font-serif);
          font-size: 22px;
          color: var(--accent-red-bright);
          margin-bottom: 12px;
        }
        .guide-warning-box p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .guide-rules-grid { grid-template-columns: 1fr; }
          .guide-page-title { font-size: 32px; }
          .guide-rule-card { flex-direction: column; gap: 12px; }
          .guide-rule-num-wrap { flex-direction: row; }
        }
      `}</style>

      <section className="guide-page-hero">
        <div className="container">
          <div className="guide-page-label">EMERGENCY GUIDE · 应急指南</div>
          <h1 className="guide-page-title">公民异常应急指南</h1>
          <p className="guide-page-subtitle">
            十条核心原则，记住它们，关键时刻能救命。
            如果你没有时间全部看完，请至少记住第1、第3和第4条。
          </p>
          <div className="guide-hotline-banner">
            <div className="guide-hotline-num">99</div>
            <div className="guide-hotline-text">
              <strong>全球异常应急热线</strong>
              24小时 · 免费 · 无需区号 · 任何手机均可接通
            </div>
          </div>
        </div>
      </section>

      <section className="guide-content">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-tertiary)", letterSpacing: "0.2em" }}>
              TEN CORE PRINCIPLES · 十条核心原则
            </span>
          </div>

          <div className="guide-rules-grid">
            {rules.map((r) => (
              <div key={r.num} className="guide-rule-card">
                <div className="guide-rule-num-wrap">
                  <span className="guide-rule-num">{r.num}</span>
                  <svg className="guide-rule-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={r.icon}/>
                  </svg>
                </div>
                <div className="guide-rule-content">
                  <h3 className="guide-rule-title">{r.title}</h3>
                  <p className="guide-rule-desc">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="guide-warning-box">
            <h3>请记住：你不需要解决异常</h3>
            <p>
              普通人遇到异常，唯一要做的就是保持冷静、确保自己安全、然后拨打99。
              解决异常是专业溯界者的工作。你的安全比任何东西都重要——
              包括好奇心、包括被困的朋友、包括你以为你能帮上忙的那些事。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

window.GuidePage = GuidePage;
