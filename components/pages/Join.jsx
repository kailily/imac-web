function JoinPage() {
  const { navigate } = useRouter();
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
    nda: false,
  });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(null); // 'nda' | 'safety' | null

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const channels = [
    {
      key: "military",
      name: "军队系统",
      en: "ATRF",
      full: "异常战术响应部队",
      ratio: "约 45%",
      desc: "来自各国军方特种部队及异常战术响应单位，具备强韧的战术素养与纪律性，是外勤行动的骨干力量。",
      icon: "M12 2 3 6v6c0 5 3.8 9.3 9 10 5.2-.7 9-5 9-10V6l-9-4z",
    },
    {
      key: "police",
      name: "警务系统",
      en: "AERT",
      full: "异常事件响应小组",
      ratio: "约 30%",
      desc: "来自警察系统的异常事件响应与刑侦人员，擅长现场勘查、证据链还原与公众秩序维持。",
      icon: "M12 1 L22 7v5c0 5-4.5 9-10 10-5.5-1-10-5-10-10V7z M8 12l3 3 5-6",
    },
    {
      key: "civil",
      name: "社会招募与幸存者计划",
      en: "CIVIL / SURVIVOR",
      full: "",
      ratio: "约 25%",
      desc: "经严格筛选的社会专业人士及异常事件幸存者，以独特的专业背景或亲身经历构成队伍的多元补充。",
      icon: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2 M11 7a4 4 0 110 8 4 4 0 010-8z M20 8v6 M23 11h-6",
    },
  ];

  const criteria = [
    { name: "压力耐受性", desc: "在极端环境、时间停滞、空间扭曲等异常条件下保持冷静判断的能力。" },
    { name: "逻辑推演能力", desc: "快速识别异常规则、推导安全行动路径、在信息不全时做出合理假设。" },
    { name: "身份弹性", desc: "在规则改变的环境中维持自我认同，抵抗认知同化与人格侵蚀。" },
    { name: "细节敏感度", desc: "察觉环境中的细微异常信号——光影、声音、温度、文字、空间感的偏移。" },
    { name: "共情节制", desc: "对异常中遭遇的生命保持共情，但不因情感干扰任务判断与撤退决策。" },
  ];

  const ranks = [
    { name: "见习溯界者", en: "Initiate", ratio: "约 35%", desc: "通过选拔与基础培训，在资深者带领下执行低风险任务。", promote: "完成基础培训 + 首次外勤评估" },
    { name: "溯界者", en: "Walker", ratio: "约 40%", desc: "独立执行常规至危险级任务，是队伍的中坚力量。", promote: "累计外勤 100 小时 + 任务评估合格" },
    { name: "资深溯界者", en: "Senior Walker", ratio: "约 18%", desc: "可带队执行厄运级任务，具备规则推演与应急决策能力。", promote: "累计外勤 500 小时 + 3 次以上任务负责人经历" },
    { name: "首席溯界者", en: "Chief Walker", ratio: "不足 5%", desc: "各组织核心战力，可独立指挥深渊级行动，拥有战术决策权。", promote: "由组织提名 + IMAC 联合评审委员会认定" },
    { name: "界标", en: "Landmark", ratio: "全球不足 30 人", desc: "传奇级溯界者，以个人名字命名的行动记录载入 IMAC 档案。", promote: "特殊贡献 + 全理事会表决" },
  ];

  const assimilationStages = [
    { stage: "第一阶段 · 接触", desc: "轻度认知偏移，出现轻微既视感或记忆错位，可自行恢复。" },
    { stage: "第二阶段 · 渗透", desc: "性格习惯出现细微改变，对异常环境产生熟悉感，需医疗干预。" },
    { stage: "第三阶段 · 侵蚀", desc: "身份认同开始模糊，出现人格碎片，永久终止外勤资格。" },
    { stage: "第四阶段 · 同化", desc: "个体被异常完全吞噬，成为异常的一部分，按规程执行除名。" },
  ];

  const organizations = [
    "衔尾蛇事务所",
    "北境守望",
    "边界研究院",
    "晨星团",
    "第四面墙",
    "悬铃木学会",
    "白夜哨站",
    "长桥会社",
  ];

  const channelOptions = ["军队系统（ATRF）", "警务系统（AERT）", "社会招募", "幸存者计划"];

  // 国家 → 地区 → 城市 三级联动数据
  const locationData = {
    "格伦贝尔联邦": {
      "东部": ["鸣海城", "灰港", "贝壳湾", "听潮镇", "浅溪驿"],
      "北部": ["白松城", "寒鸦岭", "冰湖堡", "雪落屯"],
      "中部": ["晨辉市", "三河驿", "望月台", "白石镇"],
      "南部": ["梧桐岭", "青麦镇", "长柳渡", "南桥市", "红叶镇"],
      "西部": ["风古镇", "暮光市", "石鼓城"],
    },
    "洛林自由市": {
      "城邦": ["洛林自由市"],
    },
    "维斯特兰联邦": {
      "中部": ["新阿尔比恩市", "蓝草市"],
      "南部": ["百川市", "星环镇"],
      "西部": ["白崖港", "镜湖城"],
      "东部": ["枫溪镇", "深河渡"],
      "北部": ["雪松市"],
    },
    "东云群岛": {
      "中部": ["月湾", "白鹭镇"],
      "北部": ["雾港", "翠屏市"],
      "南部": ["花屿", "碧波城"],
      "东部": ["金鳞港", "云岫市"],
      "西部": ["青屿", "霞光港"],
    },
    "瀚海合众国": {
      "南部": ["诺瓦城", "晨港市"],
      "东部": ["海月城", "珊瑚港", "星屿"],
      "西部": ["蓝桥城", "风信屿"],
      "北部": ["苍木市", "邬桥镇"],
    },
    "霜原联盟": {
      "北部": ["极光城", "寒星哨所"],
      "南部": ["冰崖站", "雪绒镇"],
      "西部": ["泠海角", "冰河营地"],
    },
    "其他地区": {
      "其他": ["其他"],
    },
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: "" });
  };

  // 地区联动：切换国家时重置地区与城市，切换地区时重置城市；
  // 洛林自由市为城邦型政体，选中后自动确定地区（城邦）与城市（洛林自由市）
  const handleCountryChange = (value) => {
    if (value === "洛林自由市") {
      setFormData({ ...formData, country: value, region: "城邦", city: "洛林自由市" });
    } else {
      setFormData({ ...formData, country: value, region: "", city: "" });
    }
    setErrors((prev) => ({ ...prev, country: "", region: "", city: "" }));
  };
  const handleRegionChange = (value) => {
    setFormData({ ...formData, region: value, city: "" });
    setErrors((prev) => ({ ...prev, region: "", city: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.realName.trim()) e.realName = "请输入真实姓名";
    if (!formData.channel) e.channel = "请选择申请来源通道";
    if (!formData.organization) e.organization = "请选择意向组织";
    if (!formData.country) e.country = "请选择国家/联邦";
    if (!formData.region) e.region = "请选择地区";
    if (!formData.city) e.city = "请选择城市";
    if (!formData.age.trim()) e.age = "请输入年龄";
    else if (isNaN(Number(formData.age)) || Number(formData.age) < 18 || Number(formData.age) > 55)
      e.age = "年龄应在 18-55 岁之间";
    if (!formData.contact.trim()) e.contact = "请输入联系方式";
    if (!formData.experience.trim()) e.experience = "请填写相关经历简述";
    if (!formData.motivation.trim()) e.motivation = "请填写申请理由";
    if (!formData.healthDeclare) e.healthDeclare = "请确认健康声明";
    if (!formData.nda) e.nda = "请阅读并同意保密协议";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (validate()) {
      // 保存申请表到本地（纯前端演示：信息仅保留在本机浏览器 localStorage）
      try {
        const channelName = channels.find((c) => c.key === formData.channel)?.name || formData.channel;
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
          motivation: formData.motivation.trim(),
        }));
      } catch (err) {}
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const inputCls = (k) => `join-input ${errors[k] ? "error" : ""}`;

  return (
    <div className="join-page">
      <style>{`
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
      `}</style>

      <div className="join-watermark">JOIN THE ANOMALISTS</div>

      <div className="join-container">
        {submitted ? (
          <div className="join-section" style={{ paddingTop: "60px" }}>
            <div className="join-success-card">
              <div className="join-success-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 className="join-success-title">申请已提交</h2>
              <p className="join-success-desc">
                您的溯界者申请已提交至 IMAC 招募与人事中心。
                初筛结果将在 15 个工作日内通过您填写的联系方式通知，
                请保持通讯畅通并留意系统邮件。
              </p>
              <div className="join-success-info">
                <div className="info-row">
                  <span className="info-key">申请编号</span>
                  <span className="info-val">APL-{Math.floor(Math.random() * 9000 + 1000)}-{formData.organization?.slice(0, 2) || "XX"}</span>
                </div>
                <div className="info-row">
                  <span className="info-key">申请人</span>
                  <span className="info-val">{formData.realName || "—"}</span>
                </div>
                <div className="info-row">
                  <span className="info-key">申请通道</span>
                  <span className="info-val">{formData.channel || "—"}</span>
                </div>
                <div className="info-row">
                  <span className="info-key">意向组织</span>
                  <span className="info-val">{formData.organization || "—"}</span>
                </div>
                <div className="info-row">
                  <span className="info-key">当前状态</span>
                  <span className="info-val" style={{ color: "var(--level-ordinary)" }}>初筛审核中</span>
                </div>
                <div className="info-row">
                  <span className="info-key">预计答复</span>
                  <span className="info-val">15 个工作日内</span>
                </div>
              </div>
              <div className="join-success-actions">
                <button className="join-btn-primary" onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    const el = document.getElementById("boundary-walker");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 200);
                }}>返回首页</button>
                <button className="join-btn-secondary" onClick={() => navigate("/guide")}>了解异常</button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* HERO */}
            <section className="join-hero">
              <div className="join-hero-tag">JOIN US · 加入溯界者序列</div>
              <h1 className="join-hero-title">成为溯界者</h1>
              <p className="join-hero-sub">
                溯界者——行走在正常世界与异常之间的人。
                他们深入规则扭曲之地，收集信息、护送撤离、维持边界。
                这不是英雄的职业，而是一份需要理性、坚韧与敬畏的工作。
              </p>
              <div className="join-quote">
                <div className="join-quote-text">
                  "我们不是在跨越边界，我们是在守住边界。
                  每一次深入，都是为了让另一边的人不用面对这些。"
                </div>
                <div className="join-quote-author">—— 艾伦·维斯特 首席溯界者 安珀历12年</div>
              </div>
            </section>

            {/* 三大通道 */}
            <section className="join-section">
              <div className="join-section-header">
                <div className="join-section-label">RECRUITMENT CHANNELS</div>
                <h2 className="join-section-title">三大来源通道</h2>
                <p className="join-section-desc">
                  溯界者主要来自三个系统，各自具备独特的优势与训练背景。
                  IMAC 联合招募中心对所有通道执行统一的选拔标准。
                </p>
              </div>
              <div className="channel-grid">
                {channels.map((c) => (
                  <div key={c.key} className="channel-card">
                    <div className="channel-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={c.icon}/>
                      </svg>
                    </div>
                    <div className="channel-name">{c.name}</div>
                    <div className="channel-en">{c.en}{c.full ? ` · ${c.full}` : ""}</div>
                    <div className="channel-ratio">{c.ratio}</div>
                    <div className="channel-desc">{c.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 选拔标准 */}
            <section className="join-section">
              <div className="join-section-header">
                <div className="join-section-label">SELECTION CRITERIA</div>
                <h2 className="join-section-title">选拔标准</h2>
                <p className="join-section-desc">
                  溯界者的选拔不局限于体能与智力，更重视在异常环境下维持自我与判断的综合能力。
                </p>
              </div>
              <div className="criteria-list">
                {criteria.map((item, i) => (
                  <div key={i} className="criteria-item">
                    <div className="criteria-num">{String(i + 1).padStart(2, "0")}</div>
                    <div className="criteria-content">
                      <h4>{item.name}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 培训体系 */}
            <section className="join-section">
              <div className="join-section-header">
                <div className="join-section-label">TRAINING SYSTEM</div>
                <h2 className="join-section-title">培训体系</h2>
                <p className="join-section-desc">
                  所有溯界者需通过 IMAC 统一培训框架（AITF）认证方可执行外勤任务。
                </p>
              </div>
              <div className="training-grid">
                <div className="training-info">
                  <div className="training-highlight">8-14<span style={{ fontSize: "18px" }}>个月</span></div>
                  <div className="training-highlight-label">培训周期（因组织而异）</div>
                  <ul className="training-modules">
                    <li>异常分类学基础</li>
                    <li>规则解析方法论</li>
                    <li>影像资料分析</li>
                    <li>异常内心理防护</li>
                    <li>战术撤退与应急程序</li>
                    <li>锚定物校准实操训练</li>
                  </ul>
                </div>
                <div className="training-framework">
                  <span className="training-framework-tag">AITF · UNIFIED FRAMEWORK</span>
                  <h4 style={{ marginTop: "16px" }}>IMAC 统一培训框架</h4>
                  <p>
                    Anomalist Integrated Training Framework（AITF）是 IMAC 培训与认证中心
                    联合八大组织共同制定的溯界者培训标准，涵盖理论、模拟、实地三类考核。
                    所有组织的新晋溯界者必须通过 AITF 认证方可获得外勤资格，
                    并需每年完成复训与心理评估以维持资质。
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    培训由各组织内部执行，IMAC 派遣督导员考核，
                    考核通过率约 62%，未通过者可申请一次补考或转入非外勤岗位。
                  </p>
                </div>
              </div>
            </section>

            {/* 职级体系 */}
            <section className="join-section">
              <div className="join-section-header">
                <div className="join-section-label">RANK SYSTEM</div>
                <h2 className="join-section-title">职级体系</h2>
                <p className="join-section-desc">
                  溯界者职级由 IMAC 统一认定，各组织独立管理，但晋升需经跨组织评审。
                </p>
              </div>
              <div className="rank-ladder">
                {ranks.map((r, i) => (
                  <div key={i} className="rank-item">
                    <div className="rank-top">
                      <span className="rank-name">{r.name}</span>
                      <span className="rank-en">{r.en.toUpperCase()}</span>
                      <span className="rank-ratio">{r.ratio}</span>
                    </div>
                    <div className="rank-desc">{r.desc}</div>
                    <div className="rank-promote"><strong>晋升条件：</strong>{r.promote}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 同化警示 */}
            <section className="join-section">
              <div className="join-section-header">
                <div className="join-section-label">ASSIMILATION WARNING</div>
                <h2 className="join-section-title" style={{ color: "var(--accent-red-bright)" }}>同化警示</h2>
                <p className="join-section-desc">
                  深入异常必然伴随着被同化的风险。这是每一位溯界者必须正视的代价。
                </p>
              </div>
              <div className="warning-box">
                <div className="warning-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 9v4 M12 17h.01 M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  </svg>
                  认知同化四阶段
                </div>
                <div className="assimilation-stages">
                  {assimilationStages.map((s, i) => (
                    <div key={i} className="assim-stage">
                      <div className="assim-stage-num">0{i + 1}</div>
                      <div className="assim-stage-name">{s.stage.split(" · ")[1]}</div>
                      <div className="assim-stage-desc">{s.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="warning-notice">
                  <strong>IMAC 规程第 7.3 条：</strong>
                  确认同化至第三阶段及以上的人员，应立即终止外勤行动资格并接受医疗评估；
                  确认第四阶段同化者，按规程执行除名处理，任何组织与个人不得私自收容。
                </div>
              </div>
            </section>

            {/* 申请表单 */}
            <section className="join-section" id="apply-form">
              <div className="join-section-header">
                <div className="join-section-label">APPLICATION FORM</div>
                <h2 className="join-section-title">提交申请</h2>
                <p className="join-section-desc">
                  请如实填写以下信息。所有申请将由 IMAC 招募与人事中心联合所属组织共同审核，
                  信息不实者将永久取消申请资格。
                </p>
              </div>
              <form className="join-form-card" onSubmit={handleSubmit}>
                {/* 基本信息 */}
                <div className="join-form-section">
                  <div className="join-form-title">
                    <span className="join-form-num">1</span>
                    <span className="join-form-name">基本信息</span>
                    <span className="join-form-en">BASIC INFO</span>
                  </div>
                  <div className="join-grid">
                    <div className="join-field">
                      <label className="join-label"><span className="req">*</span>真实姓名</label>
                      <input type="text" className={inputCls("realName")} value={formData.realName}
                        onChange={(e) => handleChange("realName", e.target.value)} placeholder="请输入真实姓名"/>
                      {errors.realName && <span className="join-error-text">{errors.realName}</span>}
                    </div>
                    <div className="join-field">
                      <label className="join-label"><span className="opt">可选</span>代号 / 呼号</label>
                      <input type="text" className="join-input" value={formData.codename}
                        onChange={(e) => handleChange("codename", e.target.value)} placeholder="入职后也可由组织分配"/>
                      <span className="join-hint">行动中使用的代号，可入职后分配</span>
                    </div>
                    <div className="join-field">
                      <label className="join-label"><span className="req">*</span>申请来源通道</label>
                      <select className={`join-select ${errors.channel ? "error" : ""}`} value={formData.channel}
                        onChange={(e) => handleChange("channel", e.target.value)}>
                        <option value="">请选择</option>
                        {channelOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.channel && <span className="join-error-text">{errors.channel}</span>}
                    </div>
                    {formData.channel && formData.channel !== "社会招募" && (
                      <div className="join-field">
                        <label className="join-label"><span className="opt">选填</span>推荐人</label>
                        <input type="text" className="join-input" value={formData.referral}
                          onChange={(e) => handleChange("referral", e.target.value)} placeholder="推荐您的在职溯界者姓名或代号"/>
                        <span className="join-hint">如有溯界者推荐，可填写其姓名或代号</span>
                      </div>
                    )}
                  <div className="join-field">
                      <label className="join-label"><span className="req">*</span>意向组织</label>
                      <select className={`join-select ${errors.organization ? "error" : ""}`} value={formData.organization}
                        onChange={(e) => handleChange("organization", e.target.value)}>
                        <option value="">请选择</option>
                        {organizations.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                      {errors.organization && <span className="join-error-text">{errors.organization}</span>}
                    </div>
                    <div className="join-field">
                      <label className="join-label"><span className="req">*</span>所在地区</label>
                      <div className="join-location-filter">
                        <select
                          className={`join-select ${(errors.country || errors.region || errors.city) ? "error" : ""}`}
                          value={formData.country}
                          onChange={(e) => handleCountryChange(e.target.value)}
                        >
                          <option value="">国家</option>
                          {Object.keys(locationData).map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select
                          className={`join-select ${(errors.country || errors.region || errors.city) ? "error" : ""}`}
                          value={formData.region}
                          onChange={(e) => handleRegionChange(e.target.value)}
                          disabled={!formData.country || formData.country === "洛林自由市"}
                        >
                          <option value="">地区</option>
                          {formData.country === "洛林自由市"
                            ? <option value="城邦">城邦</option>
                            : formData.country && Object.keys(locationData[formData.country]).map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                        <select
                          className={`join-select ${(errors.country || errors.region || errors.city) ? "error" : ""}`}
                          value={formData.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                          disabled={!formData.region || formData.country === "洛林自由市"}
                        >
                          <option value="">城市</option>
                          {formData.country === "洛林自由市"
                            ? <option value="洛林自由市">洛林自由市</option>
                            : formData.country && formData.region && locationData[formData.country][formData.region].map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      {formData.country === "洛林自由市" && (
                        <span className="join-hint">城邦型政体，地区与城市已自动确定</span>
                      )}
                      {(errors.country || errors.region || errors.city) && (
                        <span className="join-error-text">请完整选择所在地区（国家 / 地区 / 城市）</span>
                      )}
                    </div>
                    <div className="join-field">
                      <label className="join-label"><span className="req">*</span>年龄</label>
                      <input type="text" className={inputCls("age")} value={formData.age}
                        onChange={(e) => handleChange("age", e.target.value)} placeholder="18-55 岁"/>
                      {errors.age && <span className="join-error-text">{errors.age}</span>}
                    </div>
                    <div className="join-field">
                      <label className="join-label"><span className="req">*</span>联系方式</label>
                      <input type="text" className={inputCls("contact")} value={formData.contact}
                        onChange={(e) => handleChange("contact", e.target.value)} placeholder="邮箱 / 电话"/>
                      {errors.contact && <span className="join-error-text">{errors.contact}</span>}
                    </div>
                    <div className="join-field">
                      <label className="join-label"><span className="opt">选填</span>专业背景</label>
                      <input type="text" className={inputCls("specialty")} value={formData.specialty}
                        onChange={(e) => handleChange("specialty", e.target.value)} placeholder="如：心理学、刑侦、工程学、医学（选填）"/>
                      {errors.specialty && <span className="join-error-text">{errors.specialty}</span>}
                    </div>
                  </div>
                </div>

                {/* 经历与背景 */}
                <div className="join-form-section">
                  <div className="join-form-title">
                    <span className="join-form-num">2</span>
                    <span className="join-form-name">经历与背景</span>
                    <span className="join-form-en">EXPERIENCE</span>
                  </div>
                  <div className="join-grid">
                    <div className="join-field join-grid-full">
                      <label className="join-label"><span className="req">*</span>相关经历简述</label>
                      <textarea className={`join-textarea ${errors.experience ? "error" : ""}`} value={formData.experience}
                        onChange={(e) => handleChange("experience", e.target.value)}
                        placeholder="工作经历、军旅经历、或与异常相关的经历简述"/>
                      {errors.experience && <span className="join-error-text">{errors.experience}</span>}
                    </div>
                    <div className="join-field join-grid-full">
                      <label className="join-label"><span className="opt">选填</span>异常经历说明</label>
                      <textarea className="join-textarea" value={formData.anomalyExp}
                        onChange={(e) => handleChange("anomalyExp", e.target.value)}
                        placeholder='是否经历过异常事件，简要描述。没有可填"无"。'/>
                    </div>
                    <div className="join-field join-grid-full">
                      <label className="join-label"><span className="req">*</span>申请理由 / 动机</label>
                      <textarea className={`join-textarea ${errors.motivation ? "error" : ""}`} value={formData.motivation}
                        onChange={(e) => handleChange("motivation", e.target.value)}
                        placeholder="为什么想成为溯界者？"/>
                      {errors.motivation && <span className="join-error-text">{errors.motivation}</span>}
                    </div>
                  </div>
                </div>

                {/* 声明与提交 */}
                <div className="join-form-section">
                  <div className="join-form-title">
                    <span className="join-form-num">3</span>
                    <span className="join-form-name">声明与提交</span>
                    <span className="join-form-en">DECLARATION</span>
                  </div>
                  <div className="join-checkbox-field">
                    <input type="checkbox" id="join-health" checked={formData.healthDeclare}
                      onChange={(e) => handleChange("healthDeclare", e.target.checked)}/>
                    <label htmlFor="join-health" className="join-checkbox-label">
                      我确认无重大精神疾病史、体能达标、无影响外勤任务的慢性疾病，
                      并愿意接受 IMAC 医疗与心理评估。
                    </label>
                  </div>
                  {errors.healthDeclare && (
                    <div className="join-error-text" style={{ marginBottom: "12px" }}>{errors.healthDeclare}</div>
                  )}
                  <div className="join-checkbox-field">
                    <input type="checkbox" id="join-nda" checked={formData.nda}
                      onChange={(e) => handleChange("nda", e.target.checked)}/>
                    <label htmlFor="join-nda" className="join-checkbox-label">
                      我已阅读并同意
                      <a onClick={(e) => { e.preventDefault(); e.stopPropagation(); setModalOpen("nda"); }}>《IMAC 溯界者保密协议》</a>
                      及
                      <a onClick={(e) => { e.preventDefault(); e.stopPropagation(); setModalOpen("safety"); }}>《异常行动安全准则》</a>
                      ，承诺所填信息真实有效，愿意接受身份核验及相应纪律约束。
                    </label>
                  </div>
                  {errors.nda && (
                    <div className="join-error-text" style={{ marginBottom: "12px" }}>{errors.nda}</div>
                  )}
                  <button type="submit" className="join-submit-btn">
                    提 交 申 请
                  </button>
                </div>
              </form>

              <div className="join-bottom-nav">
                <a onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    const el = document.getElementById("boundary-walker");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 200);
                }}>返回首页</a>
                <span className="divider">|</span>
                <a onClick={() => navigate("/guide")}>了解异常</a>
                <span className="divider">|</span>
                <a onClick={() => navigate("/auth")}>已通过认证？登录系统</a>
              </div>
            </section>
          </>
        )}

        {/* 协议模态框 */}
        {modalOpen && (
          <div className="join-modal-overlay" onClick={() => setModalOpen(null)}>
            <div className="join-modal" onClick={(e) => e.stopPropagation()}>
              <div className="join-modal-header">
                <span className="join-modal-title">
                  {modalOpen === "nda" ? "IMAC 溯界者保密协议" : "异常行动安全准则"}
                </span>
                <button className="join-modal-close" onClick={() => setModalOpen(null)} aria-label="关闭">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <div className="join-modal-body">
                {modalOpen === "nda" ? (
                  <>
                    <h4>第一条 保密范围</h4>
                    <p>本协议所指保密信息包括但不限于：异常事件的存在与细节、IMAC 组织结构与人员信息、行动记录、装备参数、研究资料、培训内容以及一切被标记为受限级及以上的文档与数据。</p>
                    <h4>第二条 信息管控</h4>
                    <ul>
                      <li>溯界者不得以任何形式向未授权人员（含家属、亲友）透露保密信息。</li>
                      <li>所有纸质与电子文档需按密级存储于指定设施，严禁擅自复制或携带出工作区域。</li>
                      <li>对外通讯需经过组织审查，不得使用公开网络传输任何保密内容。</li>
                      <li>个人社交媒体账号不得出现任何与 IMAC 及异常相关的暗示性内容。</li>
                    </ul>
                    <h4>第三条 违规处罚</h4>
                    <p>违反本协议者，视情节轻重处以：警告、停职调查、强制记忆干预、解除职务并执行保密隔离、移交 IMAC 纪律委员会审理。造成严重后果者，按《异常危害防治条例》追究责任。</p>
                    <h4>第四条 有效期</h4>
                    <p>本协议自签署之日起生效，有效期涵盖任职期间及离职后终身。离职溯界者仍受保密义务约束，并需每 5 年接受一次回访评估。</p>
                    <h4>第五条 豁免与例外</h4>
                    <p>经 IMAC 公共信息办公室统一发布的公开内容不在本协议约束范围内。因司法程序需作证的，须提前获得组织批准并在法务代表陪同下进行。</p>
                  </>
                ) : (
                  <>
                    <h4>第一章 异常内行为规范</h4>
                    <ul>
                      <li>进入异常前必须确认锚定物随身携带，并完成出发前心理校准。</li>
                      <li>在异常内严格遵循"观察—记录—不干预"原则，不得主动触碰或改变异常中的未知物体。</li>
                      <li>遇到规则不确定的情况，优先保持原地静止，通过通讯设备请示指挥中心。</li>
                      <li>不得食用、饮用异常内来源不明的任何物质。</li>
                    </ul>
                    <h4>第二章 装备使用规定</h4>
                    <ul>
                      <li>标准装备：信号锚定器、影像记录仪、防护面具、应急照明、撤退信标。</li>
                      <li>装备须在出发前完成自检，故障装备禁止带入异常。</li>
                      <li>武器仅在确认自身生命受到直接威胁时使用，禁止对无威胁目标开火。</li>
                    </ul>
                    <h4>第三章 平民保护原则</h4>
                    <ul>
                      <li>任务优先级：平民安全 ＞ 信息收集 ＞ 异常处置。</li>
                      <li>遇到受困平民，应第一时间组织撤离并进行记忆筛查评估。</li>
                      <li>不得在平民面前展示武器或讨论敏感信息。</li>
                      <li>撤离后由组织心理干预团队对接，溯界者不得自行向平民解释异常。</li>
                    </ul>
                    <h4>第四章 撤退协议</h4>
                    <ul>
                      <li>出现以下任一情况必须立即撤退：队员失联超过 15 分钟、信号锚定器失效、同化监测达到第二阶段、指挥中心下令撤退。</li>
                      <li>撤退时按预定路线反向撤离，不得因任何非人员安全原因折返。</li>
                      <li>无法正常撤退时，启动应急信标并寻找相对安全区域固守待援。</li>
                    </ul>
                    <h4>第五章 同化监测要求</h4>
                    <ul>
                      <li>每次外勤后 24 小时内必须完成同化评估。</li>
                      <li>自我监测到记忆偏差、行为习惯异常改变时，须立即上报医疗官。</li>
                      <li>确认第三阶段及以上同化者，永久终止外勤资格并接受隔离治疗。</li>
                    </ul>
                  </>
                )}
              </div>
              <div className="join-modal-footer">
                <button onClick={() => setModalOpen(null)}>我已阅读</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.JoinPage = JoinPage;
