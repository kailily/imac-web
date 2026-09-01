function JoinPage() {
  const {
    navigate
  } = useRouter();
  const [formData, setFormData] = React.useState({
    realName: "",
    codename: "",
    channel: "",
    referral: "",
    organization: "",
    country: "",
    region: "",
    city: "",
    age: "",
    contact: "",
    specialty: "",
    experience: "",
    anomalyExp: "",
    motivation: "",
    healthDeclare: false,
    nda: false
  });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(null); // 'nda' | 'safety' | null

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const channels = [{
    key: "military",
    name: "军队系统",
    en: "ATRF",
    full: "异常战术响应部队",
    ratio: "约 45%",
    desc: "来自各国军方特种部队及异常战术响应单位，具备强韧的战术素养与纪律性，是外勤行动的骨干力量。",
    icon: "M12 2 3 6v6c0 5 3.8 9.3 9 10 5.2-.7 9-5 9-10V6l-9-4z"
  }, {
    key: "police",
    name: "警务系统",
    en: "AERT",
    full: "异常事件响应小组",
    ratio: "约 30%",
    desc: "来自警察系统的异常事件响应与刑侦人员，擅长现场勘查、证据链还原与公众秩序维持。",
    icon: "M12 1 L22 7v5c0 5-4.5 9-10 10-5.5-1-10-5-10-10V7z M8 12l3 3 5-6"
  }, {
    key: "civil",
    name: "社会招募与幸存者计划",
    en: "CIVIL / SURVIVOR",
    full: "",
    ratio: "约 25%",
    desc: "经严格筛选的社会专业人士及异常事件幸存者，以独特的专业背景或亲身经历构成队伍的多元补充。",
    icon: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2 M11 7a4 4 0 110 8 4 4 0 010-8z M20 8v6 M23 11h-6"
  }];
  const criteria = [{
    name: "压力耐受性",
    desc: "在极端环境、时间停滞、空间扭曲等异常条件下保持冷静判断的能力。"
  }, {
    name: "逻辑推演能力",
    desc: "快速识别异常规则、推导安全行动路径、在信息不全时做出合理假设。"
  }, {
    name: "身份弹性",
    desc: "在规则改变的环境中维持自我认同，抵抗认知同化与人格侵蚀。"
  }, {
    name: "细节敏感度",
    desc: "察觉环境中的细微异常信号——光影、声音、温度、文字、空间感的偏移。"
  }, {
    name: "共情节制",
    desc: "对异常中遭遇的生命保持共情，但不因情感干扰任务判断与撤退决策。"
  }];
  const ranks = [{
    name: "见习溯界者",
    en: "Initiate",
    ratio: "约 35%",
    desc: "通过选拔与基础培训，在资深者带领下执行低风险任务。",
    promote: "完成基础培训 + 首次外勤评估"
  }, {
    name: "溯界者",
    en: "Walker",
    ratio: "约 40%",
    desc: "独立执行常规至危险级任务，是队伍的中坚力量。",
    promote: "累计外勤 100 小时 + 任务评估合格"
  }, {
    name: "资深溯界者",
    en: "Senior Walker",
    ratio: "约 18%",
    desc: "可带队执行厄运级任务，具备规则推演与应急决策能力。",
    promote: "累计外勤 500 小时 + 3 次以上任务负责人经历"
  }, {
    name: "首席溯界者",
    en: "Chief Walker",
    ratio: "不足 5%",
    desc: "各组织核心战力，可独立指挥深渊级行动，拥有战术决策权。",
    promote: "由组织提名 + IMAC 联合评审委员会认定"
  }, {
    name: "界标",
    en: "Landmark",
    ratio: "全球不足 30 人",
    desc: "传奇级溯界者，以个人名字命名的行动记录载入 IMAC 档案。",
    promote: "特殊贡献 + 全理事会表决"
  }];
  const assimilationStages = [{
    stage: "第一阶段 · 接触",
    desc: "轻度认知偏移，出现轻微既视感或记忆错位，可自行恢复。"
  }, {
    stage: "第二阶段 · 渗透",
    desc: "性格习惯出现细微改变，对异常环境产生熟悉感，需医疗干预。"
  }, {
    stage: "第三阶段 · 侵蚀",
    desc: "身份认同开始模糊，出现人格碎片，永久终止外勤资格。"
  }, {
    stage: "第四阶段 · 同化",
    desc: "个体被异常完全吞噬，成为异常的一部分，按规程执行除名。"
  }];
  const organizations = ["衔尾蛇事务所", "北境守望", "边界研究院", "晨星团", "第四面墙", "悬铃木学会", "白夜哨站", "长桥会社"];
  const channelOptions = ["军队系统（ATRF）", "警务系统（AERT）", "社会招募", "幸存者计划"];

  // 国家 → 地区 → 城市 三级联动数据
  const locationData = {
    "格伦贝尔联邦": {
      "东部": ["鸣海城", "灰港", "贝壳湾", "听潮镇", "浅溪驿"],
      "北部": ["白松城", "寒鸦岭", "冰湖堡", "雪落屯"],
      "中部": ["晨辉市", "三河驿", "望月台", "白石镇"],
      "南部": ["梧桐岭", "青麦镇", "长柳渡", "南桥市", "红叶镇"],
      "西部": ["风古镇", "暮光市", "石鼓城"]
    },
    "洛林自由市": {
      "城邦": ["洛林自由市"]
    },
    "维斯特兰联邦": {
      "中部": ["新阿尔比恩市", "蓝草市"],
      "南部": ["百川市", "星环镇"],
      "西部": ["白崖港", "镜湖城"],
      "东部": ["枫溪镇", "深河渡"],
      "北部": ["雪松市"]
    },
    "东云群岛": {
      "中部": ["月湾", "白鹭镇"],
      "北部": ["雾港", "翠屏市"],
      "南部": ["花屿", "碧波城"],
      "东部": ["金鳞港", "云岫市"],
      "西部": ["青屿", "霞光港"]
    },
    "瀚海合众国": {
      "南部": ["诺瓦城", "晨港市"],
      "东部": ["海月城", "珊瑚港", "星屿"],
      "西部": ["蓝桥城", "风信屿"],
      "北部": ["苍木市", "邬桥镇"]
    },
    "霜原联盟": {
      "北部": ["极光城", "寒星哨所"],
      "南部": ["冰崖站", "雪绒镇"],
      "西部": ["泠海角", "冰河营地"]
    },
    "其他地区": {
      "其他": ["其他"]
    }
  };
  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
    if (errors[key]) setErrors({
      ...errors,
      [key]: ""
    });
  };

  // 地区联动：切换国家时重置地区与城市，切换地区时重置城市；
  // 洛林自由市为城邦型政体，选中后自动确定地区（城邦）与城市（洛林自由市）
  const handleCountryChange = value => {
    if (value === "洛林自由市") {
      setFormData({
        ...formData,
        country: value,
        region: "城邦",
        city: "洛林自由市"
      });
    } else {
      setFormData({
        ...formData,
        country: value,
        region: "",
        city: ""
      });
    }
    setErrors(prev => ({
      ...prev,
      country: "",
      region: "",
      city: ""
    }));
  };
  const handleRegionChange = value => {
    setFormData({
      ...formData,
      region: value,
      city: ""
    });
    setErrors(prev => ({
      ...prev,
      region: "",
      city: ""
    }));
  };
  const validate = () => {
    const e = {};
    if (!formData.realName.trim()) e.realName = "请输入真实姓名";
    if (!formData.channel) e.channel = "请选择申请来源通道";
    if (!formData.organization) e.organization = "请选择意向组织";
    if (!formData.country) e.country = "请选择国家/联邦";
    if (!formData.region) e.region = "请选择地区";
    if (!formData.city) e.city = "请选择城市";
    if (!formData.age.trim()) e.age = "请输入年龄";else if (isNaN(Number(formData.age)) || Number(formData.age) < 18 || Number(formData.age) > 55) e.age = "年龄应在 18-55 岁之间";
    if (!formData.contact.trim()) e.contact = "请输入联系方式";
    if (!formData.experience.trim()) e.experience = "请填写相关经历简述";
    if (!formData.motivation.trim()) e.motivation = "请填写申请理由";
    if (!formData.healthDeclare) e.healthDeclare = "请确认健康声明";
    if (!formData.nda) e.nda = "请阅读并同意保密协议";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = ev => {
    ev.preventDefault();
    if (validate()) {
      // 保存申请表到本地（纯前端演示：信息仅保留在本机浏览器 localStorage）
      try {
        const channelName = channels.find(c => c.key === formData.channel)?.name || formData.channel;
        localStorage.setItem("imac_application_profile", JSON.stringify({
          realName: formData.realName.trim(),
          codename: formData.codename.trim(),
          channel: channelName,
          referral: formData.referral.trim(),
          organization: formData.organization,
          country: formData.country,
          region: formData.region,
          city: formData.city,
          age: formData.age.trim(),
          contact: formData.contact.trim(),
          specialty: formData.specialty.trim(),
          experience: formData.experience.trim(),
          anomalyExp: formData.anomalyExp.trim(),
          motivation: formData.motivation.trim()
        }));
      } catch (err) {}
      setSubmitted(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };
  const inputCls = k => `join-input ${errors[k] ? "error" : ""}`;
  return /*#__PURE__*/React.createElement("div", {
    className: "join-page"
  }, /*#__PURE__*/React.createElement("style", null, `
        .join-page {
          min-height: 100vh;
          padding-top: 64px;
          padding-bottom: 80px;
          background-color: #07070a;
          color: var(--text-primary);
          position: relative;
        }
        .join-page::before {
          content: "";
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px;
          background-color: var(--accent-red-bright);
          box-shadow: 0 0 8px rgba(196, 40, 40, 0.5);
          z-index: 1000;
        }
        .join-watermark {
          position: fixed;
          top: 50%; right: -60px;
          transform: translateY(-50%) rotate(90deg);
          font-family: var(--font-mono);
          font-size: 160px;
          font-weight: 900;
          color: rgba(196, 40, 40, 0.03);
          letter-spacing: 0.05em;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .join-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* HERO */
        .join-hero {
          padding: 80px 0 60px;
          text-align: center;
          position: relative;
        }
        .join-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--accent-red-bright);
          margin-bottom: 20px;
        }
        .join-hero-tag::before, .join-hero-tag::after {
          content: ""; width: 28px; height: 1px;
          background-color: var(--accent-red-bright); opacity: 0.5;
        }
        .join-hero-title {
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0.08em;
          margin: 0 0 16px;
          background: linear-gradient(180deg, #fff 0%, #c8c8cc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .join-hero-sub {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.8;
          max-width: 680px;
          margin: 0 auto 40px;
        }
        .join-quote {
          max-width: 620px;
          margin: 0 auto;
          padding: 24px 32px;
          border-left: 3px solid var(--accent-red-bright);
          background: linear-gradient(90deg, rgba(196, 40, 40, 0.08), transparent);
          text-align: left;
        }
        .join-quote-text {
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-secondary);
          font-style: italic;
          margin-bottom: 10px;
        }
        .join-quote-author {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }

        /* 通用 section */
        .join-section {
          padding: 60px 0;
          border-top: 1px solid var(--border-color);
        }
        .join-section-header {
          margin-bottom: 36px;
        }
        .join-section-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--accent-red-bright);
          margin-bottom: 8px;
        }
        .join-section-title {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin: 0 0 8px;
        }
        .join-section-desc {
          font-size: 13px;
          color: var(--text-tertiary);
          line-height: 1.7;
          max-width: 640px;
        }

        /* 通道卡片 */
        .channel-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .channel-card {
          padding: 28px 24px;
          background-color: rgba(12, 12, 16, 0.85);
          border: 1px solid var(--border-color);
          position: relative;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .channel-card:hover {
          border-color: rgba(196, 40, 40, 0.4);
          transform: translateY(-2px);
        }
        .channel-card::before {
          content: "";
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background-color: var(--accent-red-bright);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .channel-card:hover::before { opacity: 1; }
        .channel-icon {
          width: 44px; height: 44px;
          margin-bottom: 16px;
          color: var(--accent-red-bright);
        }
        .channel-icon svg { width: 100%; height: 100%; }
        .channel-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .channel-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          margin-bottom: 12px;
        }
        .channel-ratio {
          display: inline-block;
          padding: 3px 10px;
          background-color: rgba(196, 40, 40, 0.1);
          border: 1px solid rgba(196, 40, 40, 0.3);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 11px;
          margin-bottom: 14px;
        }
        .channel-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        /* 选拔标准 */
        .criteria-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .criteria-item {
          display: flex;
          gap: 14px;
          padding: 20px;
          background-color: rgba(12, 12, 16, 0.6);
          border: 1px solid var(--border-color);
        }
        .criteria-num {
          flex-shrink: 0;
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          background-color: var(--accent-red-bright);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
        }
        .criteria-content h4 {
          margin: 0 0 6px;
          font-size: 15px;
          font-weight: 600;
        }
        .criteria-content p {
          margin: 0;
          font-size: 12px;
          color: var(--text-tertiary);
          line-height: 1.6;
        }

        /* 培训体系 */
        .training-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 24px;
        }
        .training-info, .training-framework {
          padding: 28px;
          background-color: rgba(12, 12, 16, 0.6);
          border: 1px solid var(--border-color);
        }
        .training-framework {
          border-left: 3px solid var(--accent-red-bright);
        }
        .training-highlight {
          font-size: 36px;
          font-weight: 700;
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          margin-bottom: 4px;
        }
        .training-highlight-label {
          font-size: 12px;
          color: var(--text-tertiary);
          margin-bottom: 20px;
        }
        .training-modules {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .training-modules li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--text-secondary);
        }
        .training-modules li::before {
          content: "";
          width: 6px; height: 6px;
          background-color: var(--accent-red-bright);
          flex-shrink: 0;
        }
        .training-framework h4 {
          font-size: 15px;
          margin: 0 0 12px;
          color: var(--text-primary);
        }
        .training-framework p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0 0 16px;
        }
        .training-framework-tag {
          display: inline-block;
          padding: 4px 10px;
          background-color: rgba(196, 40, 40, 0.1);
          border: 1px solid rgba(196, 40, 40, 0.3);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.15em;
        }

        /* 职级体系 */
        .rank-ladder {
          position: relative;
          padding-left: 40px;
        }
        .rank-ladder::before {
          content: "";
          position: absolute;
          left: 14px; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, var(--accent-red-bright) 0%, rgba(196, 40, 40, 0.2) 100%);
        }
        .rank-item {
          position: relative;
          padding: 20px 24px;
          margin-bottom: 12px;
          background-color: rgba(12, 12, 16, 0.6);
          border: 1px solid var(--border-color);
        }
        .rank-item::before {
          content: "";
          position: absolute;
          left: -33px; top: 26px;
          width: 12px; height: 12px;
          border-radius: 50%;
          background-color: #07070a;
          border: 2px solid var(--accent-red-bright);
        }
        .rank-item:last-child { margin-bottom: 0; }
        .rank-top {
          display: flex;
          align-items: baseline;
          gap: 14px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }
        .rank-name {
          font-size: 17px;
          font-weight: 600;
        }
        .rank-en {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .rank-ratio {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-red-bright);
        }
        .rank-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 8px;
        }
        .rank-promote {
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .rank-promote strong { color: var(--text-secondary); font-weight: 500; }

        /* 同化警示 */
        .warning-box {
          padding: 32px;
          background-color: rgba(196, 40, 40, 0.05);
          border: 1px solid rgba(196, 40, 40, 0.3);
          position: relative;
        }
        .warning-box::before {
          content: "WARNING";
          position: absolute;
          top: 12px; right: 16px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--accent-red-bright);
          opacity: 0.6;
        }
        .warning-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 18px;
          font-weight: 600;
          color: var(--accent-red-bright);
          margin-bottom: 20px;
        }
        .warning-title svg { width: 22px; height: 22px; }
        .assimilation-stages {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .assim-stage {
          padding: 16px;
          background-color: rgba(7, 7, 10, 0.6);
          border: 1px solid rgba(196, 40, 40, 0.2);
        }
        .assim-stage-num {
          font-family: var(--font-mono);
          font-size: 24px;
          font-weight: 700;
          color: var(--accent-red-bright);
          margin-bottom: 6px;
        }
        .assim-stage-name {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .assim-stage-desc {
          font-size: 12px;
          color: var(--text-tertiary);
          line-height: 1.6;
        }
        .warning-notice {
          padding: 14px 18px;
          background-color: rgba(196, 40, 40, 0.1);
          border-left: 3px solid var(--accent-red-bright);
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .warning-notice strong { color: var(--accent-red-bright); }

        /* 表单 */
        .join-form-card {
          background-color: rgba(12, 12, 16, 0.9);
          border: 1px solid var(--border-color);
        }
        .join-form-card::before {
          content: "";
          display: block;
          height: 3px;
          background-color: var(--accent-red-bright);
        }
        .join-form-section {
          padding: 28px 32px;
          border-bottom: 1px solid var(--border-color);
        }
        .join-form-section:last-of-type { border-bottom: none; }
        .join-form-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(196, 40, 40, 0.2);
        }
        .join-form-num {
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          background-color: var(--accent-red-bright);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
        }
        .join-form-name { font-size: 15px; font-weight: 600; letter-spacing: 0.05em; }
        .join-form-en {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }
        .join-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 20px;
        }
        .join-grid-full { grid-column: 1 / -1; }
        .join-field { display: flex; flex-direction: column; gap: 6px; }
        .join-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .join-label .req { color: var(--accent-red-bright); margin-right: 4px; }
        .join-label .opt { color: var(--text-tertiary); margin-right: 4px; font-style: italic; }
        .join-input, .join-select, .join-textarea {
          width: 100%;
          padding: 10px 12px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 13px;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          box-sizing: border-box;
        }
        .join-textarea { resize: vertical; min-height: 80px; }
        .join-input:focus, .join-select:focus, .join-textarea:focus {
          border-color: var(--accent-red-bright);
          box-shadow: 0 0 0 2px rgba(196, 40, 40, 0.15);
        }
        .join-input.error, .join-select.error, .join-textarea.error {
          border-color: var(--accent-red-bright);
        }
        .join-hint { font-size: 11px; color: var(--text-tertiary); line-height: 1.4; }
        .join-error-text { font-size: 11px; color: var(--accent-red-bright); line-height: 1.4; }

        .join-location-filter {
          display: flex;
          gap: 6px;
        }
        .join-location-filter .join-select {
          flex: 1;
          min-width: 0;
          padding: 8px 8px;
        }
        @media (max-width: 640px) {
          .join-location-filter { flex-direction: column; }
        }

        .join-checkbox-field {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 14px 16px;
          background-color: rgba(196, 40, 40, 0.04);
          border: 1px solid rgba(196, 40, 40, 0.15);
          margin-bottom: 12px;
        }
        .join-checkbox-field input[type="checkbox"] {
          margin-top: 2px; accent-color: var(--accent-red-bright); cursor: pointer;
        }
        .join-checkbox-label {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .join-checkbox-label a {
          color: var(--accent-red-bright);
          text-decoration: none;
          cursor: pointer;
        }

        .join-submit-btn {
          width: 100%;
          padding: 14px;
          background-color: var(--accent-red-bright);
          border: none;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .join-submit-btn:hover { background-color: #d43a3a; }

        /* 成功状态 */
        .join-success-card {
          text-align: center;
          padding: 60px 40px;
          background-color: rgba(12, 12, 16, 0.85);
          border: 1px solid var(--border-color);
        }
        .join-success-card::before {
          content: ""; display: block; height: 3px;
          background-color: var(--level-ordinary);
          margin: -60px -40px 40px;
        }
        .join-success-icon {
          width: 72px; height: 72px;
          margin: 0 auto 24px;
          border-radius: 50%;
          background-color: rgba(46, 139, 87, 0.1);
          border: 2px solid var(--level-ordinary);
          display: flex; align-items: center; justify-content: center;
        }
        .join-success-icon svg { width: 36px; height: 36px; stroke: var(--level-ordinary); }
        .join-success-title { font-size: 26px; font-weight: 700; margin-bottom: 12px; }
        .join-success-desc {
          font-size: 13px; color: var(--text-secondary); line-height: 1.7;
          max-width: 480px; margin: 0 auto 28px;
        }
        .join-success-info {
          text-align: left;
          padding: 20px 24px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          max-width: 400px;
          margin: 0 auto 28px;
          font-family: var(--font-mono);
          font-size: 12px;
          line-height: 2;
        }
        .join-success-info .info-row { display: flex; justify-content: space-between; gap: 12px; }
        .join-success-info .info-key { color: var(--text-tertiary); }
        .join-success-info .info-val { color: var(--text-primary); }
        .join-success-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .join-btn-primary {
          padding: 10px 28px;
          background-color: var(--accent-red-bright);
          border: none; color: #fff;
          font-size: 13px; font-weight: 600; cursor: pointer;
        }
        .join-btn-secondary {
          padding: 10px 28px;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 13px; cursor: pointer;
          transition: all 0.2s ease;
        }
        .join-btn-secondary:hover {
          border-color: var(--accent-red-bright); color: var(--accent-red-bright);
        }

        /* Modal */
        .join-modal-overlay {
          position: fixed; inset: 0;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex; align-items: center; justify-content: center;
          z-index: 2000;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .join-modal {
          width: 100%;
          max-width: 560px;
          max-height: 80vh;
          background-color: #0c0c10;
          border: 1px solid var(--border-color);
          display: flex; flex-direction: column;
          animation: slideUp 0.25s ease;
        }
        @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .join-modal::before {
          content: "";
          display: block;
          height: 3px;
          background-color: var(--accent-red-bright);
        }
        .join-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color);
        }
        .join-modal-title {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .join-modal-close {
          width: 28px; height: 28px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: color 0.2s;
        }
        .join-modal-close:hover { color: var(--accent-red-bright); }
        .join-modal-body {
          padding: 24px;
          overflow-y: auto;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.8;
        }
        .join-modal-body h4 {
          color: var(--text-primary);
          font-size: 14px;
          margin: 20px 0 8px;
          font-weight: 600;
        }
        .join-modal-body h4:first-child { margin-top: 0; }
        .join-modal-body p { margin: 0 0 10px; }
        .join-modal-body ul {
          padding-left: 20px;
          margin: 0 0 10px;
        }
        .join-modal-body li { margin-bottom: 4px; }
        .join-modal-footer {
          padding: 16px 24px;
          border-top: 1px solid var(--border-color);
          text-align: right;
        }
        .join-modal-footer button {
          padding: 8px 20px;
          background-color: var(--accent-red-bright);
          border: none;
          color: #fff;
          font-size: 12px;
          cursor: pointer;
          font-weight: 600;
        }
        .join-modal-footer button:hover { background-color: #d43a3a; }

        /* 底部导航 */
        .join-bottom-nav {
          text-align: center;
          margin-top: 32px;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .join-bottom-nav a {
          color: var(--accent-red-bright);
          text-decoration: none;
          cursor: pointer;
          margin: 0 4px;
        }
        .join-bottom-nav a:hover { text-decoration: underline; }
        .join-bottom-nav .divider {
          color: var(--border-color); margin: 0 8px;
        }

        @media (max-width: 900px) {
          .channel-grid { grid-template-columns: 1fr; }
          .training-grid { grid-template-columns: 1fr; }
          .assimilation-stages { grid-template-columns: repeat(2, 1fr); }
          .join-grid { grid-template-columns: 1fr; }
          .join-hero-title { font-size: 32px; }
          .join-section-title { font-size: 22px; }
          .join-form-section { padding: 20px; }
          .join-success-card { padding: 40px 20px; }
          .join-success-card::before { margin: -40px -20px 28px; }
          .warning-box { padding: 20px; }
        }
        @media (max-width: 640px) {
          .assimilation-stages { grid-template-columns: 1fr; }
          .join-rank-grid { grid-template-columns: 1fr; }
          .join-hero-title { font-size: 26px; }
          .join-hero-desc { font-size: 14px; }
          .join-form-section { padding: 16px; }
          .join-quote-text { font-size: 16px; }
          .location-three { grid-template-columns: 1fr; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "join-watermark"
  }, "JOIN THE ANOMALISTS"), /*#__PURE__*/React.createElement("div", {
    className: "join-container"
  }, submitted ? /*#__PURE__*/React.createElement("div", {
    className: "join-section",
    style: {
      paddingTop: "60px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-success-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-success-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("h2", {
    className: "join-success-title"
  }, "\u7533\u8BF7\u5DF2\u63D0\u4EA4"), /*#__PURE__*/React.createElement("p", {
    className: "join-success-desc"
  }, "\u60A8\u7684\u6EAF\u754C\u8005\u7533\u8BF7\u5DF2\u63D0\u4EA4\u81F3 IMAC \u62DB\u52DF\u4E0E\u4EBA\u4E8B\u4E2D\u5FC3\u3002 \u521D\u7B5B\u7ED3\u679C\u5C06\u5728 15 \u4E2A\u5DE5\u4F5C\u65E5\u5185\u901A\u8FC7\u60A8\u586B\u5199\u7684\u8054\u7CFB\u65B9\u5F0F\u901A\u77E5\uFF0C \u8BF7\u4FDD\u6301\u901A\u8BAF\u7545\u901A\u5E76\u7559\u610F\u7CFB\u7EDF\u90AE\u4EF6\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "join-success-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u7533\u8BF7\u7F16\u53F7"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, "APL-", Math.floor(Math.random() * 9000 + 1000), "-", formData.organization?.slice(0, 2) || "XX")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u7533\u8BF7\u4EBA"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, formData.realName || "—")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u7533\u8BF7\u901A\u9053"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, formData.channel || "—")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u610F\u5411\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, formData.organization || "—")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u5F53\u524D\u72B6\u6001"), /*#__PURE__*/React.createElement("span", {
    className: "info-val",
    style: {
      color: "var(--level-ordinary)"
    }
  }, "\u521D\u7B5B\u5BA1\u6838\u4E2D")), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "info-key"
  }, "\u9884\u8BA1\u7B54\u590D"), /*#__PURE__*/React.createElement("span", {
    className: "info-val"
  }, "15 \u4E2A\u5DE5\u4F5C\u65E5\u5185"))), /*#__PURE__*/React.createElement("div", {
    className: "join-success-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "join-btn-primary",
    onClick: () => {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("boundary-walker");
        if (el) el.scrollIntoView({
          behavior: "smooth"
        });
      }, 200);
    }
  }, "\u8FD4\u56DE\u9996\u9875"), /*#__PURE__*/React.createElement("button", {
    className: "join-btn-secondary",
    onClick: () => navigate("/guide")
  }, "\u4E86\u89E3\u5F02\u5E38")))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "join-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-hero-tag"
  }, "JOIN US \xB7 \u52A0\u5165\u6EAF\u754C\u8005\u5E8F\u5217"), /*#__PURE__*/React.createElement("h1", {
    className: "join-hero-title"
  }, "\u6210\u4E3A\u6EAF\u754C\u8005"), /*#__PURE__*/React.createElement("p", {
    className: "join-hero-sub"
  }, "\u6EAF\u754C\u8005\u2014\u2014\u884C\u8D70\u5728\u6B63\u5E38\u4E16\u754C\u4E0E\u5F02\u5E38\u4E4B\u95F4\u7684\u4EBA\u3002 \u4ED6\u4EEC\u6DF1\u5165\u89C4\u5219\u626D\u66F2\u4E4B\u5730\uFF0C\u6536\u96C6\u4FE1\u606F\u3001\u62A4\u9001\u64A4\u79BB\u3001\u7EF4\u6301\u8FB9\u754C\u3002 \u8FD9\u4E0D\u662F\u82F1\u96C4\u7684\u804C\u4E1A\uFF0C\u800C\u662F\u4E00\u4EFD\u9700\u8981\u7406\u6027\u3001\u575A\u97E7\u4E0E\u656C\u754F\u7684\u5DE5\u4F5C\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "join-quote"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-quote-text"
  }, "\"\u6211\u4EEC\u4E0D\u662F\u5728\u8DE8\u8D8A\u8FB9\u754C\uFF0C\u6211\u4EEC\u662F\u5728\u5B88\u4F4F\u8FB9\u754C\u3002 \u6BCF\u4E00\u6B21\u6DF1\u5165\uFF0C\u90FD\u662F\u4E3A\u4E86\u8BA9\u53E6\u4E00\u8FB9\u7684\u4EBA\u4E0D\u7528\u9762\u5BF9\u8FD9\u4E9B\u3002\""), /*#__PURE__*/React.createElement("div", {
    className: "join-quote-author"
  }, "\u2014\u2014 \u827E\u4F26\xB7\u7EF4\u65AF\u7279 \u9996\u5E2D\u6EAF\u754C\u8005 \u5B89\u73C0\u538612\u5E74"))), /*#__PURE__*/React.createElement("section", {
    className: "join-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-label"
  }, "RECRUITMENT CHANNELS"), /*#__PURE__*/React.createElement("h2", {
    className: "join-section-title"
  }, "\u4E09\u5927\u6765\u6E90\u901A\u9053"), /*#__PURE__*/React.createElement("p", {
    className: "join-section-desc"
  }, "\u6EAF\u754C\u8005\u4E3B\u8981\u6765\u81EA\u4E09\u4E2A\u7CFB\u7EDF\uFF0C\u5404\u81EA\u5177\u5907\u72EC\u7279\u7684\u4F18\u52BF\u4E0E\u8BAD\u7EC3\u80CC\u666F\u3002 IMAC \u8054\u5408\u62DB\u52DF\u4E2D\u5FC3\u5BF9\u6240\u6709\u901A\u9053\u6267\u884C\u7EDF\u4E00\u7684\u9009\u62D4\u6807\u51C6\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "channel-grid"
  }, channels.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.key,
    className: "channel-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "channel-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: c.icon
  }))), /*#__PURE__*/React.createElement("div", {
    className: "channel-name"
  }, c.name), /*#__PURE__*/React.createElement("div", {
    className: "channel-en"
  }, c.en, c.full ? ` · ${c.full}` : ""), /*#__PURE__*/React.createElement("div", {
    className: "channel-ratio"
  }, c.ratio), /*#__PURE__*/React.createElement("div", {
    className: "channel-desc"
  }, c.desc))))), /*#__PURE__*/React.createElement("section", {
    className: "join-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-label"
  }, "SELECTION CRITERIA"), /*#__PURE__*/React.createElement("h2", {
    className: "join-section-title"
  }, "\u9009\u62D4\u6807\u51C6"), /*#__PURE__*/React.createElement("p", {
    className: "join-section-desc"
  }, "\u6EAF\u754C\u8005\u7684\u9009\u62D4\u4E0D\u5C40\u9650\u4E8E\u4F53\u80FD\u4E0E\u667A\u529B\uFF0C\u66F4\u91CD\u89C6\u5728\u5F02\u5E38\u73AF\u5883\u4E0B\u7EF4\u6301\u81EA\u6211\u4E0E\u5224\u65AD\u7684\u7EFC\u5408\u80FD\u529B\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "criteria-list"
  }, criteria.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "criteria-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "criteria-num"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    className: "criteria-content"
  }, /*#__PURE__*/React.createElement("h4", null, item.name), /*#__PURE__*/React.createElement("p", null, item.desc)))))), /*#__PURE__*/React.createElement("section", {
    className: "join-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-label"
  }, "TRAINING SYSTEM"), /*#__PURE__*/React.createElement("h2", {
    className: "join-section-title"
  }, "\u57F9\u8BAD\u4F53\u7CFB"), /*#__PURE__*/React.createElement("p", {
    className: "join-section-desc"
  }, "\u6240\u6709\u6EAF\u754C\u8005\u9700\u901A\u8FC7 IMAC \u7EDF\u4E00\u57F9\u8BAD\u6846\u67B6\uFF08AITF\uFF09\u8BA4\u8BC1\u65B9\u53EF\u6267\u884C\u5916\u52E4\u4EFB\u52A1\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "training-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "training-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "training-highlight"
  }, "8-14", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "18px"
    }
  }, "\u4E2A\u6708")), /*#__PURE__*/React.createElement("div", {
    className: "training-highlight-label"
  }, "\u57F9\u8BAD\u5468\u671F\uFF08\u56E0\u7EC4\u7EC7\u800C\u5F02\uFF09"), /*#__PURE__*/React.createElement("ul", {
    className: "training-modules"
  }, /*#__PURE__*/React.createElement("li", null, "\u5F02\u5E38\u5206\u7C7B\u5B66\u57FA\u7840"), /*#__PURE__*/React.createElement("li", null, "\u89C4\u5219\u89E3\u6790\u65B9\u6CD5\u8BBA"), /*#__PURE__*/React.createElement("li", null, "\u5F71\u50CF\u8D44\u6599\u5206\u6790"), /*#__PURE__*/React.createElement("li", null, "\u5F02\u5E38\u5185\u5FC3\u7406\u9632\u62A4"), /*#__PURE__*/React.createElement("li", null, "\u6218\u672F\u64A4\u9000\u4E0E\u5E94\u6025\u7A0B\u5E8F"), /*#__PURE__*/React.createElement("li", null, "\u951A\u5B9A\u7269\u6821\u51C6\u5B9E\u64CD\u8BAD\u7EC3"))), /*#__PURE__*/React.createElement("div", {
    className: "training-framework"
  }, /*#__PURE__*/React.createElement("span", {
    className: "training-framework-tag"
  }, "AITF \xB7 UNIFIED FRAMEWORK"), /*#__PURE__*/React.createElement("h4", {
    style: {
      marginTop: "16px"
    }
  }, "IMAC \u7EDF\u4E00\u57F9\u8BAD\u6846\u67B6"), /*#__PURE__*/React.createElement("p", null, "Anomalist Integrated Training Framework\uFF08AITF\uFF09\u662F IMAC \u57F9\u8BAD\u4E0E\u8BA4\u8BC1\u4E2D\u5FC3 \u8054\u5408\u516B\u5927\u7EC4\u7EC7\u5171\u540C\u5236\u5B9A\u7684\u6EAF\u754C\u8005\u57F9\u8BAD\u6807\u51C6\uFF0C\u6DB5\u76D6\u7406\u8BBA\u3001\u6A21\u62DF\u3001\u5B9E\u5730\u4E09\u7C7B\u8003\u6838\u3002 \u6240\u6709\u7EC4\u7EC7\u7684\u65B0\u664B\u6EAF\u754C\u8005\u5FC5\u987B\u901A\u8FC7 AITF \u8BA4\u8BC1\u65B9\u53EF\u83B7\u5F97\u5916\u52E4\u8D44\u683C\uFF0C \u5E76\u9700\u6BCF\u5E74\u5B8C\u6210\u590D\u8BAD\u4E0E\u5FC3\u7406\u8BC4\u4F30\u4EE5\u7EF4\u6301\u8D44\u8D28\u3002"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "\u57F9\u8BAD\u7531\u5404\u7EC4\u7EC7\u5185\u90E8\u6267\u884C\uFF0CIMAC \u6D3E\u9063\u7763\u5BFC\u5458\u8003\u6838\uFF0C \u8003\u6838\u901A\u8FC7\u7387\u7EA6 62%\uFF0C\u672A\u901A\u8FC7\u8005\u53EF\u7533\u8BF7\u4E00\u6B21\u8865\u8003\u6216\u8F6C\u5165\u975E\u5916\u52E4\u5C97\u4F4D\u3002")))), /*#__PURE__*/React.createElement("section", {
    className: "join-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-label"
  }, "RANK SYSTEM"), /*#__PURE__*/React.createElement("h2", {
    className: "join-section-title"
  }, "\u804C\u7EA7\u4F53\u7CFB"), /*#__PURE__*/React.createElement("p", {
    className: "join-section-desc"
  }, "\u6EAF\u754C\u8005\u804C\u7EA7\u7531 IMAC \u7EDF\u4E00\u8BA4\u5B9A\uFF0C\u5404\u7EC4\u7EC7\u72EC\u7ACB\u7BA1\u7406\uFF0C\u4F46\u664B\u5347\u9700\u7ECF\u8DE8\u7EC4\u7EC7\u8BC4\u5BA1\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "rank-ladder"
  }, ranks.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rank-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rank-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rank-name"
  }, r.name), /*#__PURE__*/React.createElement("span", {
    className: "rank-en"
  }, r.en.toUpperCase()), /*#__PURE__*/React.createElement("span", {
    className: "rank-ratio"
  }, r.ratio)), /*#__PURE__*/React.createElement("div", {
    className: "rank-desc"
  }, r.desc), /*#__PURE__*/React.createElement("div", {
    className: "rank-promote"
  }, /*#__PURE__*/React.createElement("strong", null, "\u664B\u5347\u6761\u4EF6\uFF1A"), r.promote))))), /*#__PURE__*/React.createElement("section", {
    className: "join-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-label"
  }, "ASSIMILATION WARNING"), /*#__PURE__*/React.createElement("h2", {
    className: "join-section-title",
    style: {
      color: "var(--accent-red-bright)"
    }
  }, "\u540C\u5316\u8B66\u793A"), /*#__PURE__*/React.createElement("p", {
    className: "join-section-desc"
  }, "\u6DF1\u5165\u5F02\u5E38\u5FC5\u7136\u4F34\u968F\u7740\u88AB\u540C\u5316\u7684\u98CE\u9669\u3002\u8FD9\u662F\u6BCF\u4E00\u4F4D\u6EAF\u754C\u8005\u5FC5\u987B\u6B63\u89C6\u7684\u4EE3\u4EF7\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "warning-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "warning-title"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 9v4 M12 17h.01 M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
  })), "\u8BA4\u77E5\u540C\u5316\u56DB\u9636\u6BB5"), /*#__PURE__*/React.createElement("div", {
    className: "assimilation-stages"
  }, assimilationStages.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "assim-stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "assim-stage-num"
  }, "0", i + 1), /*#__PURE__*/React.createElement("div", {
    className: "assim-stage-name"
  }, s.stage.split(" · ")[1]), /*#__PURE__*/React.createElement("div", {
    className: "assim-stage-desc"
  }, s.desc)))), /*#__PURE__*/React.createElement("div", {
    className: "warning-notice"
  }, /*#__PURE__*/React.createElement("strong", null, "IMAC \u89C4\u7A0B\u7B2C 7.3 \u6761\uFF1A"), "\u786E\u8BA4\u540C\u5316\u81F3\u7B2C\u4E09\u9636\u6BB5\u53CA\u4EE5\u4E0A\u7684\u4EBA\u5458\uFF0C\u5E94\u7ACB\u5373\u7EC8\u6B62\u5916\u52E4\u884C\u52A8\u8D44\u683C\u5E76\u63A5\u53D7\u533B\u7597\u8BC4\u4F30\uFF1B \u786E\u8BA4\u7B2C\u56DB\u9636\u6BB5\u540C\u5316\u8005\uFF0C\u6309\u89C4\u7A0B\u6267\u884C\u9664\u540D\u5904\u7406\uFF0C\u4EFB\u4F55\u7EC4\u7EC7\u4E0E\u4E2A\u4EBA\u4E0D\u5F97\u79C1\u81EA\u6536\u5BB9\u3002"))), /*#__PURE__*/React.createElement("section", {
    className: "join-section",
    id: "apply-form"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-section-label"
  }, "APPLICATION FORM"), /*#__PURE__*/React.createElement("h2", {
    className: "join-section-title"
  }, "\u63D0\u4EA4\u7533\u8BF7"), /*#__PURE__*/React.createElement("p", {
    className: "join-section-desc"
  }, "\u8BF7\u5982\u5B9E\u586B\u5199\u4EE5\u4E0B\u4FE1\u606F\u3002\u6240\u6709\u7533\u8BF7\u5C06\u7531 IMAC \u62DB\u52DF\u4E0E\u4EBA\u4E8B\u4E2D\u5FC3\u8054\u5408\u6240\u5C5E\u7EC4\u7EC7\u5171\u540C\u5BA1\u6838\uFF0C \u4FE1\u606F\u4E0D\u5B9E\u8005\u5C06\u6C38\u4E45\u53D6\u6D88\u7533\u8BF7\u8D44\u683C\u3002")), /*#__PURE__*/React.createElement("form", {
    className: "join-form-card",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-form-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-form-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "join-form-num"
  }, "1"), /*#__PURE__*/React.createElement("span", {
    className: "join-form-name"
  }, "\u57FA\u672C\u4FE1\u606F"), /*#__PURE__*/React.createElement("span", {
    className: "join-form-en"
  }, "BASIC INFO")), /*#__PURE__*/React.createElement("div", {
    className: "join-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u771F\u5B9E\u59D3\u540D"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputCls("realName"),
    value: formData.realName,
    onChange: e => handleChange("realName", e.target.value),
    placeholder: "\u8BF7\u8F93\u5165\u771F\u5B9E\u59D3\u540D"
  }), errors.realName && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.realName)), /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "opt"
  }, "\u53EF\u9009"), "\u4EE3\u53F7 / \u547C\u53F7"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "join-input",
    value: formData.codename,
    onChange: e => handleChange("codename", e.target.value),
    placeholder: "\u5165\u804C\u540E\u4E5F\u53EF\u7531\u7EC4\u7EC7\u5206\u914D"
  }), /*#__PURE__*/React.createElement("span", {
    className: "join-hint"
  }, "\u884C\u52A8\u4E2D\u4F7F\u7528\u7684\u4EE3\u53F7\uFF0C\u53EF\u5165\u804C\u540E\u5206\u914D")), /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u7533\u8BF7\u6765\u6E90\u901A\u9053"), /*#__PURE__*/React.createElement("select", {
    className: `join-select ${errors.channel ? "error" : ""}`,
    value: formData.channel,
    onChange: e => handleChange("channel", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u8BF7\u9009\u62E9"), channelOptions.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c))), errors.channel && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.channel)), formData.channel && formData.channel !== "社会招募" && /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "opt"
  }, "\u9009\u586B"), "\u63A8\u8350\u4EBA"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "join-input",
    value: formData.referral,
    onChange: e => handleChange("referral", e.target.value),
    placeholder: "\u63A8\u8350\u60A8\u7684\u5728\u804C\u6EAF\u754C\u8005\u59D3\u540D\u6216\u4EE3\u53F7"
  }), /*#__PURE__*/React.createElement("span", {
    className: "join-hint"
  }, "\u5982\u6709\u6EAF\u754C\u8005\u63A8\u8350\uFF0C\u53EF\u586B\u5199\u5176\u59D3\u540D\u6216\u4EE3\u53F7")), /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u610F\u5411\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("select", {
    className: `join-select ${errors.organization ? "error" : ""}`,
    value: formData.organization,
    onChange: e => handleChange("organization", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u8BF7\u9009\u62E9"), organizations.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o))), errors.organization && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.organization)), /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u6240\u5728\u5730\u533A"), /*#__PURE__*/React.createElement("div", {
    className: "join-location-filter"
  }, /*#__PURE__*/React.createElement("select", {
    className: `join-select ${errors.country || errors.region || errors.city ? "error" : ""}`,
    value: formData.country,
    onChange: e => handleCountryChange(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u56FD\u5BB6"), Object.keys(locationData).map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c))), /*#__PURE__*/React.createElement("select", {
    className: `join-select ${errors.country || errors.region || errors.city ? "error" : ""}`,
    value: formData.region,
    onChange: e => handleRegionChange(e.target.value),
    disabled: !formData.country || formData.country === "洛林自由市"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u5730\u533A"), formData.country === "洛林自由市" ? /*#__PURE__*/React.createElement("option", {
    value: "\u57CE\u90A6"
  }, "\u57CE\u90A6") : formData.country && Object.keys(locationData[formData.country]).map(r => /*#__PURE__*/React.createElement("option", {
    key: r,
    value: r
  }, r))), /*#__PURE__*/React.createElement("select", {
    className: `join-select ${errors.country || errors.region || errors.city ? "error" : ""}`,
    value: formData.city,
    onChange: e => handleChange("city", e.target.value),
    disabled: !formData.region || formData.country === "洛林自由市"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u57CE\u5E02"), formData.country === "洛林自由市" ? /*#__PURE__*/React.createElement("option", {
    value: "\u6D1B\u6797\u81EA\u7531\u5E02"
  }, "\u6D1B\u6797\u81EA\u7531\u5E02") : formData.country && formData.region && locationData[formData.country][formData.region].map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c)))), formData.country === "洛林自由市" && /*#__PURE__*/React.createElement("span", {
    className: "join-hint"
  }, "\u57CE\u90A6\u578B\u653F\u4F53\uFF0C\u5730\u533A\u4E0E\u57CE\u5E02\u5DF2\u81EA\u52A8\u786E\u5B9A"), (errors.country || errors.region || errors.city) && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, "\u8BF7\u5B8C\u6574\u9009\u62E9\u6240\u5728\u5730\u533A\uFF08\u56FD\u5BB6 / \u5730\u533A / \u57CE\u5E02\uFF09")), /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u5E74\u9F84"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputCls("age"),
    value: formData.age,
    onChange: e => handleChange("age", e.target.value),
    placeholder: "18-55 \u5C81"
  }), errors.age && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.age)), /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u8054\u7CFB\u65B9\u5F0F"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputCls("contact"),
    value: formData.contact,
    onChange: e => handleChange("contact", e.target.value),
    placeholder: "\u90AE\u7BB1 / \u7535\u8BDD"
  }), errors.contact && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.contact)), /*#__PURE__*/React.createElement("div", {
    className: "join-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "opt"
  }, "\u9009\u586B"), "\u4E13\u4E1A\u80CC\u666F"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: inputCls("specialty"),
    value: formData.specialty,
    onChange: e => handleChange("specialty", e.target.value),
    placeholder: "\u5982\uFF1A\u5FC3\u7406\u5B66\u3001\u5211\u4FA6\u3001\u5DE5\u7A0B\u5B66\u3001\u533B\u5B66\uFF08\u9009\u586B\uFF09"
  }), errors.specialty && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.specialty)))), /*#__PURE__*/React.createElement("div", {
    className: "join-form-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-form-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "join-form-num"
  }, "2"), /*#__PURE__*/React.createElement("span", {
    className: "join-form-name"
  }, "\u7ECF\u5386\u4E0E\u80CC\u666F"), /*#__PURE__*/React.createElement("span", {
    className: "join-form-en"
  }, "EXPERIENCE")), /*#__PURE__*/React.createElement("div", {
    className: "join-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-field join-grid-full"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u76F8\u5173\u7ECF\u5386\u7B80\u8FF0"), /*#__PURE__*/React.createElement("textarea", {
    className: `join-textarea ${errors.experience ? "error" : ""}`,
    value: formData.experience,
    onChange: e => handleChange("experience", e.target.value),
    placeholder: "\u5DE5\u4F5C\u7ECF\u5386\u3001\u519B\u65C5\u7ECF\u5386\u3001\u6216\u4E0E\u5F02\u5E38\u76F8\u5173\u7684\u7ECF\u5386\u7B80\u8FF0"
  }), errors.experience && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.experience)), /*#__PURE__*/React.createElement("div", {
    className: "join-field join-grid-full"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "opt"
  }, "\u9009\u586B"), "\u5F02\u5E38\u7ECF\u5386\u8BF4\u660E"), /*#__PURE__*/React.createElement("textarea", {
    className: "join-textarea",
    value: formData.anomalyExp,
    onChange: e => handleChange("anomalyExp", e.target.value),
    placeholder: "\u662F\u5426\u7ECF\u5386\u8FC7\u5F02\u5E38\u4E8B\u4EF6\uFF0C\u7B80\u8981\u63CF\u8FF0\u3002\u6CA1\u6709\u53EF\u586B\"\u65E0\"\u3002"
  })), /*#__PURE__*/React.createElement("div", {
    className: "join-field join-grid-full"
  }, /*#__PURE__*/React.createElement("label", {
    className: "join-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*"), "\u7533\u8BF7\u7406\u7531 / \u52A8\u673A"), /*#__PURE__*/React.createElement("textarea", {
    className: `join-textarea ${errors.motivation ? "error" : ""}`,
    value: formData.motivation,
    onChange: e => handleChange("motivation", e.target.value),
    placeholder: "\u4E3A\u4EC0\u4E48\u60F3\u6210\u4E3A\u6EAF\u754C\u8005\uFF1F"
  }), errors.motivation && /*#__PURE__*/React.createElement("span", {
    className: "join-error-text"
  }, errors.motivation)))), /*#__PURE__*/React.createElement("div", {
    className: "join-form-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-form-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "join-form-num"
  }, "3"), /*#__PURE__*/React.createElement("span", {
    className: "join-form-name"
  }, "\u58F0\u660E\u4E0E\u63D0\u4EA4"), /*#__PURE__*/React.createElement("span", {
    className: "join-form-en"
  }, "DECLARATION")), /*#__PURE__*/React.createElement("div", {
    className: "join-checkbox-field"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "join-health",
    checked: formData.healthDeclare,
    onChange: e => handleChange("healthDeclare", e.target.checked)
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "join-health",
    className: "join-checkbox-label"
  }, "\u6211\u786E\u8BA4\u65E0\u91CD\u5927\u7CBE\u795E\u75BE\u75C5\u53F2\u3001\u4F53\u80FD\u8FBE\u6807\u3001\u65E0\u5F71\u54CD\u5916\u52E4\u4EFB\u52A1\u7684\u6162\u6027\u75BE\u75C5\uFF0C \u5E76\u613F\u610F\u63A5\u53D7 IMAC \u533B\u7597\u4E0E\u5FC3\u7406\u8BC4\u4F30\u3002")), errors.healthDeclare && /*#__PURE__*/React.createElement("div", {
    className: "join-error-text",
    style: {
      marginBottom: "12px"
    }
  }, errors.healthDeclare), /*#__PURE__*/React.createElement("div", {
    className: "join-checkbox-field"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "join-nda",
    checked: formData.nda,
    onChange: e => handleChange("nda", e.target.checked)
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "join-nda",
    className: "join-checkbox-label"
  }, "\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F", /*#__PURE__*/React.createElement("a", {
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      setModalOpen("nda");
    }
  }, "\u300AIMAC \u6EAF\u754C\u8005\u4FDD\u5BC6\u534F\u8BAE\u300B"), "\u53CA", /*#__PURE__*/React.createElement("a", {
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      setModalOpen("safety");
    }
  }, "\u300A\u5F02\u5E38\u884C\u52A8\u5B89\u5168\u51C6\u5219\u300B"), "\uFF0C\u627F\u8BFA\u6240\u586B\u4FE1\u606F\u771F\u5B9E\u6709\u6548\uFF0C\u613F\u610F\u63A5\u53D7\u8EAB\u4EFD\u6838\u9A8C\u53CA\u76F8\u5E94\u7EAA\u5F8B\u7EA6\u675F\u3002")), errors.nda && /*#__PURE__*/React.createElement("div", {
    className: "join-error-text",
    style: {
      marginBottom: "12px"
    }
  }, errors.nda), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "join-submit-btn"
  }, "\u63D0 \u4EA4 \u7533 \u8BF7"))), /*#__PURE__*/React.createElement("div", {
    className: "join-bottom-nav"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("boundary-walker");
        if (el) el.scrollIntoView({
          behavior: "smooth"
        });
      }, 200);
    }
  }, "\u8FD4\u56DE\u9996\u9875"), /*#__PURE__*/React.createElement("span", {
    className: "divider"
  }, "|"), /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/guide")
  }, "\u4E86\u89E3\u5F02\u5E38"), /*#__PURE__*/React.createElement("span", {
    className: "divider"
  }, "|"), /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/auth")
  }, "\u5DF2\u901A\u8FC7\u8BA4\u8BC1\uFF1F\u767B\u5F55\u7CFB\u7EDF")))), modalOpen && /*#__PURE__*/React.createElement("div", {
    className: "join-modal-overlay",
    onClick: () => setModalOpen(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-modal-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "join-modal-title"
  }, modalOpen === "nda" ? "IMAC 溯界者保密协议" : "异常行动安全准则"), /*#__PURE__*/React.createElement("button", {
    className: "join-modal-close",
    onClick: () => setModalOpen(null),
    "aria-label": "\u5173\u95ED"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "join-modal-body"
  }, modalOpen === "nda" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E00\u6761 \u4FDD\u5BC6\u8303\u56F4"), /*#__PURE__*/React.createElement("p", null, "\u672C\u534F\u8BAE\u6240\u6307\u4FDD\u5BC6\u4FE1\u606F\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\uFF1A\u5F02\u5E38\u4E8B\u4EF6\u7684\u5B58\u5728\u4E0E\u7EC6\u8282\u3001IMAC \u7EC4\u7EC7\u7ED3\u6784\u4E0E\u4EBA\u5458\u4FE1\u606F\u3001\u884C\u52A8\u8BB0\u5F55\u3001\u88C5\u5907\u53C2\u6570\u3001\u7814\u7A76\u8D44\u6599\u3001\u57F9\u8BAD\u5185\u5BB9\u4EE5\u53CA\u4E00\u5207\u88AB\u6807\u8BB0\u4E3A\u53D7\u9650\u7EA7\u53CA\u4EE5\u4E0A\u7684\u6587\u6863\u4E0E\u6570\u636E\u3002"), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E8C\u6761 \u4FE1\u606F\u7BA1\u63A7"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u6EAF\u754C\u8005\u4E0D\u5F97\u4EE5\u4EFB\u4F55\u5F62\u5F0F\u5411\u672A\u6388\u6743\u4EBA\u5458\uFF08\u542B\u5BB6\u5C5E\u3001\u4EB2\u53CB\uFF09\u900F\u9732\u4FDD\u5BC6\u4FE1\u606F\u3002"), /*#__PURE__*/React.createElement("li", null, "\u6240\u6709\u7EB8\u8D28\u4E0E\u7535\u5B50\u6587\u6863\u9700\u6309\u5BC6\u7EA7\u5B58\u50A8\u4E8E\u6307\u5B9A\u8BBE\u65BD\uFF0C\u4E25\u7981\u64C5\u81EA\u590D\u5236\u6216\u643A\u5E26\u51FA\u5DE5\u4F5C\u533A\u57DF\u3002"), /*#__PURE__*/React.createElement("li", null, "\u5BF9\u5916\u901A\u8BAF\u9700\u7ECF\u8FC7\u7EC4\u7EC7\u5BA1\u67E5\uFF0C\u4E0D\u5F97\u4F7F\u7528\u516C\u5F00\u7F51\u7EDC\u4F20\u8F93\u4EFB\u4F55\u4FDD\u5BC6\u5185\u5BB9\u3002"), /*#__PURE__*/React.createElement("li", null, "\u4E2A\u4EBA\u793E\u4EA4\u5A92\u4F53\u8D26\u53F7\u4E0D\u5F97\u51FA\u73B0\u4EFB\u4F55\u4E0E IMAC \u53CA\u5F02\u5E38\u76F8\u5173\u7684\u6697\u793A\u6027\u5185\u5BB9\u3002")), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E09\u6761 \u8FDD\u89C4\u5904\u7F5A"), /*#__PURE__*/React.createElement("p", null, "\u8FDD\u53CD\u672C\u534F\u8BAE\u8005\uFF0C\u89C6\u60C5\u8282\u8F7B\u91CD\u5904\u4EE5\uFF1A\u8B66\u544A\u3001\u505C\u804C\u8C03\u67E5\u3001\u5F3A\u5236\u8BB0\u5FC6\u5E72\u9884\u3001\u89E3\u9664\u804C\u52A1\u5E76\u6267\u884C\u4FDD\u5BC6\u9694\u79BB\u3001\u79FB\u4EA4 IMAC \u7EAA\u5F8B\u59D4\u5458\u4F1A\u5BA1\u7406\u3002\u9020\u6210\u4E25\u91CD\u540E\u679C\u8005\uFF0C\u6309\u300A\u5F02\u5E38\u5371\u5BB3\u9632\u6CBB\u6761\u4F8B\u300B\u8FFD\u7A76\u8D23\u4EFB\u3002"), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u56DB\u6761 \u6709\u6548\u671F"), /*#__PURE__*/React.createElement("p", null, "\u672C\u534F\u8BAE\u81EA\u7B7E\u7F72\u4E4B\u65E5\u8D77\u751F\u6548\uFF0C\u6709\u6548\u671F\u6DB5\u76D6\u4EFB\u804C\u671F\u95F4\u53CA\u79BB\u804C\u540E\u7EC8\u8EAB\u3002\u79BB\u804C\u6EAF\u754C\u8005\u4ECD\u53D7\u4FDD\u5BC6\u4E49\u52A1\u7EA6\u675F\uFF0C\u5E76\u9700\u6BCF 5 \u5E74\u63A5\u53D7\u4E00\u6B21\u56DE\u8BBF\u8BC4\u4F30\u3002"), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E94\u6761 \u8C41\u514D\u4E0E\u4F8B\u5916"), /*#__PURE__*/React.createElement("p", null, "\u7ECF IMAC \u516C\u5171\u4FE1\u606F\u529E\u516C\u5BA4\u7EDF\u4E00\u53D1\u5E03\u7684\u516C\u5F00\u5185\u5BB9\u4E0D\u5728\u672C\u534F\u8BAE\u7EA6\u675F\u8303\u56F4\u5185\u3002\u56E0\u53F8\u6CD5\u7A0B\u5E8F\u9700\u4F5C\u8BC1\u7684\uFF0C\u987B\u63D0\u524D\u83B7\u5F97\u7EC4\u7EC7\u6279\u51C6\u5E76\u5728\u6CD5\u52A1\u4EE3\u8868\u966A\u540C\u4E0B\u8FDB\u884C\u3002")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E00\u7AE0 \u5F02\u5E38\u5185\u884C\u4E3A\u89C4\u8303"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u8FDB\u5165\u5F02\u5E38\u524D\u5FC5\u987B\u786E\u8BA4\u951A\u5B9A\u7269\u968F\u8EAB\u643A\u5E26\uFF0C\u5E76\u5B8C\u6210\u51FA\u53D1\u524D\u5FC3\u7406\u6821\u51C6\u3002"), /*#__PURE__*/React.createElement("li", null, "\u5728\u5F02\u5E38\u5185\u4E25\u683C\u9075\u5FAA\"\u89C2\u5BDF\u2014\u8BB0\u5F55\u2014\u4E0D\u5E72\u9884\"\u539F\u5219\uFF0C\u4E0D\u5F97\u4E3B\u52A8\u89E6\u78B0\u6216\u6539\u53D8\u5F02\u5E38\u4E2D\u7684\u672A\u77E5\u7269\u4F53\u3002"), /*#__PURE__*/React.createElement("li", null, "\u9047\u5230\u89C4\u5219\u4E0D\u786E\u5B9A\u7684\u60C5\u51B5\uFF0C\u4F18\u5148\u4FDD\u6301\u539F\u5730\u9759\u6B62\uFF0C\u901A\u8FC7\u901A\u8BAF\u8BBE\u5907\u8BF7\u793A\u6307\u6325\u4E2D\u5FC3\u3002"), /*#__PURE__*/React.createElement("li", null, "\u4E0D\u5F97\u98DF\u7528\u3001\u996E\u7528\u5F02\u5E38\u5185\u6765\u6E90\u4E0D\u660E\u7684\u4EFB\u4F55\u7269\u8D28\u3002")), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E8C\u7AE0 \u88C5\u5907\u4F7F\u7528\u89C4\u5B9A"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u6807\u51C6\u88C5\u5907\uFF1A\u4FE1\u53F7\u951A\u5B9A\u5668\u3001\u5F71\u50CF\u8BB0\u5F55\u4EEA\u3001\u9632\u62A4\u9762\u5177\u3001\u5E94\u6025\u7167\u660E\u3001\u64A4\u9000\u4FE1\u6807\u3002"), /*#__PURE__*/React.createElement("li", null, "\u88C5\u5907\u987B\u5728\u51FA\u53D1\u524D\u5B8C\u6210\u81EA\u68C0\uFF0C\u6545\u969C\u88C5\u5907\u7981\u6B62\u5E26\u5165\u5F02\u5E38\u3002"), /*#__PURE__*/React.createElement("li", null, "\u6B66\u5668\u4EC5\u5728\u786E\u8BA4\u81EA\u8EAB\u751F\u547D\u53D7\u5230\u76F4\u63A5\u5A01\u80C1\u65F6\u4F7F\u7528\uFF0C\u7981\u6B62\u5BF9\u65E0\u5A01\u80C1\u76EE\u6807\u5F00\u706B\u3002")), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E09\u7AE0 \u5E73\u6C11\u4FDD\u62A4\u539F\u5219"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u4EFB\u52A1\u4F18\u5148\u7EA7\uFF1A\u5E73\u6C11\u5B89\u5168 \uFF1E \u4FE1\u606F\u6536\u96C6 \uFF1E \u5F02\u5E38\u5904\u7F6E\u3002"), /*#__PURE__*/React.createElement("li", null, "\u9047\u5230\u53D7\u56F0\u5E73\u6C11\uFF0C\u5E94\u7B2C\u4E00\u65F6\u95F4\u7EC4\u7EC7\u64A4\u79BB\u5E76\u8FDB\u884C\u8BB0\u5FC6\u7B5B\u67E5\u8BC4\u4F30\u3002"), /*#__PURE__*/React.createElement("li", null, "\u4E0D\u5F97\u5728\u5E73\u6C11\u9762\u524D\u5C55\u793A\u6B66\u5668\u6216\u8BA8\u8BBA\u654F\u611F\u4FE1\u606F\u3002"), /*#__PURE__*/React.createElement("li", null, "\u64A4\u79BB\u540E\u7531\u7EC4\u7EC7\u5FC3\u7406\u5E72\u9884\u56E2\u961F\u5BF9\u63A5\uFF0C\u6EAF\u754C\u8005\u4E0D\u5F97\u81EA\u884C\u5411\u5E73\u6C11\u89E3\u91CA\u5F02\u5E38\u3002")), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u56DB\u7AE0 \u64A4\u9000\u534F\u8BAE"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u51FA\u73B0\u4EE5\u4E0B\u4EFB\u4E00\u60C5\u51B5\u5FC5\u987B\u7ACB\u5373\u64A4\u9000\uFF1A\u961F\u5458\u5931\u8054\u8D85\u8FC7 15 \u5206\u949F\u3001\u4FE1\u53F7\u951A\u5B9A\u5668\u5931\u6548\u3001\u540C\u5316\u76D1\u6D4B\u8FBE\u5230\u7B2C\u4E8C\u9636\u6BB5\u3001\u6307\u6325\u4E2D\u5FC3\u4E0B\u4EE4\u64A4\u9000\u3002"), /*#__PURE__*/React.createElement("li", null, "\u64A4\u9000\u65F6\u6309\u9884\u5B9A\u8DEF\u7EBF\u53CD\u5411\u64A4\u79BB\uFF0C\u4E0D\u5F97\u56E0\u4EFB\u4F55\u975E\u4EBA\u5458\u5B89\u5168\u539F\u56E0\u6298\u8FD4\u3002"), /*#__PURE__*/React.createElement("li", null, "\u65E0\u6CD5\u6B63\u5E38\u64A4\u9000\u65F6\uFF0C\u542F\u52A8\u5E94\u6025\u4FE1\u6807\u5E76\u5BFB\u627E\u76F8\u5BF9\u5B89\u5168\u533A\u57DF\u56FA\u5B88\u5F85\u63F4\u3002")), /*#__PURE__*/React.createElement("h4", null, "\u7B2C\u4E94\u7AE0 \u540C\u5316\u76D1\u6D4B\u8981\u6C42"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u6BCF\u6B21\u5916\u52E4\u540E 24 \u5C0F\u65F6\u5185\u5FC5\u987B\u5B8C\u6210\u540C\u5316\u8BC4\u4F30\u3002"), /*#__PURE__*/React.createElement("li", null, "\u81EA\u6211\u76D1\u6D4B\u5230\u8BB0\u5FC6\u504F\u5DEE\u3001\u884C\u4E3A\u4E60\u60EF\u5F02\u5E38\u6539\u53D8\u65F6\uFF0C\u987B\u7ACB\u5373\u4E0A\u62A5\u533B\u7597\u5B98\u3002"), /*#__PURE__*/React.createElement("li", null, "\u786E\u8BA4\u7B2C\u4E09\u9636\u6BB5\u53CA\u4EE5\u4E0A\u540C\u5316\u8005\uFF0C\u6C38\u4E45\u7EC8\u6B62\u5916\u52E4\u8D44\u683C\u5E76\u63A5\u53D7\u9694\u79BB\u6CBB\u7597\u3002")))), /*#__PURE__*/React.createElement("div", {
    className: "join-modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalOpen(null)
  }, "\u6211\u5DF2\u9605\u8BFB"))))));
}
window.JoinPage = JoinPage;