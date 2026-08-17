// Emergency Guide page - full 10 rules
function GuidePage() {
  const {
    navigate
  } = useRouter();
  const rules = [{
    num: "01",
    title: "保持冷静，不要跑",
    desc: "异常的规则无法用物理方式逃脱——盲目奔跑只会让你更快触发惩罚。停下来的第一步，是给自己争取思考的时间。",
    icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z M12 22V12"
  }, {
    num: "02",
    title: "观察你周围的环境",
    desc: "异常的规则往往写在你能看到的地方：墙上的文字、地板的图案、物体的摆放方式、NPC的言谈举止。你进入的每一个空间都在告诉你什么「可以做」和什么「不可以做」。",
    icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 100-6 3 3 0 000 6z"
  }, {
    num: "03",
    title: "不要碰明显异常的东西",
    desc: "你看到一扇不该出现的门、一把不该存在的钥匙、一个在动但没有生命的东西——不要碰。很多时候，「触碰」本身就是触发惩罚的条件。",
    icon: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0"
  }, {
    num: "04",
    title: "规则不需要解释",
    desc: "异常内部的规则不会讲道理。它只是「存在」——你必须遵守它，不管你理解不理解。不要浪费精力去质疑规则是否合理，去「寻找」规则是否可以被违抗。先把规则记下来，理解它的边界，再考虑是否有空隙。",
    icon: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"
  }, {
    num: "05",
    title: "尝试与其他被困者交流",
    desc: "异常内通常不止你一个人。交换信息是活下去最重要的方式——你看到的东西可能是别人没注意到的，反之亦然。但请注意：有些人可能不是「人」（见第七条）。",
    icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75"
  }, {
    num: "06",
    title: "不要主动伤害他人",
    desc: "在异常内部，伤害他人可能触发某种规则——尤其是异常中的NPC。除非你确信「攻击」是该异常规则框架内被允许的行为，否则不要主动动手。",
    icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
  }, {
    num: "07",
    title: "区分「NPC」",
    desc: "异常内部的「NPC」看起来和你一样——会说话、会走动、会恐惧、会哭泣。但他们不是人。他们遵循异常的规则行动，在某些情况下，他们会诱导你违规。如果你无法判断一个「人」是真正的被困者还是NPC，可以尝试问一个和外部现实相关的问题——NPC的回答往往会出现细节上的破绽。",
    icon: "M3 18v-6a9 9 0 0118 0v6 M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"
  }, {
    num: "08",
    title: "保存体力，等待救援",
    desc: "异常内部的时间流速可能与外界不同。你感觉过了三天，外面可能只过了几个小时。专业的溯界者已经在路上了——前提是你或其他人成功把异常的位置传了出去。如果你在进入异常时没有通知外界，你的第一优先级应该是「找到向外传递信息的方式」。",
    icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
  }, {
    num: "09",
    title: "如果看到「出口」，先观察再通过",
    desc: "异常的出口可能是真的出口，也可能是陷阱。异常的规则中有一条「通用例外」——在绝大多数已知异常中，出口不会藏在「看起来太像出口」的地方。如果一扇门出现在你本该不该出现的位置，上面写着「出口」或「离开」，先不要推。",
    icon: "M3 21V3h18v18H3z M8 21V9h8v12"
  }, {
    num: "10",
    title: "活下来，然后告诉别人你看到了什么",
    desc: "如果你活着离开了异常，你拥有这个世界上最珍贵的东西——信息。把你的经历告诉专业人员（异常热线或溯界者组织），每一个细节都可能拯救后来的人。",
    icon: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
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

        .guide-back-home-wrap {
          text-align: center;
          margin-top: 48px;
          padding-bottom: 40px;
        }
        .guide-back-home {
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
        .guide-back-home:hover {
          background-color: var(--accent-red-bright);
          color: #fff;
        }
      `), /*#__PURE__*/React.createElement("section", {
    className: "guide-page-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "guide-page-label"
  }, "EMERGENCY GUIDE \xB7 \u5E94\u6025\u6307\u5357"), /*#__PURE__*/React.createElement("h1", {
    className: "guide-page-title"
  }, "\u516C\u6C11\u5F02\u5E38\u5E94\u6025\u6307\u5357"), /*#__PURE__*/React.createElement("p", {
    className: "guide-page-subtitle"
  }, "\u5B89\u73C0\u538616\u5E74\uFF0C\u683C\u4F26\u8D1D\u5C14\u8054\u90A6\u53D1\u5E03\u4E86\u9996\u4EFD\u300A\u516C\u6C11\u5F02\u5E38\u5B89\u5168\u6307\u5357\u300B\u3002\u6B64\u540E\u5404\u56FD\u9646\u7EED\u53D1\u5E03\u672C\u5730\u5316\u7248\u672C\uFF0C IMAC\u5728\u5B89\u73C0\u538625\u5E74\u63A8\u51FA\u4E86\u7EDF\u4E00\u7684\u300C\u6838\u5FC3\u5341\u6761\u300D\uFF0C\u4F5C\u4E3A\u5168\u7403\u901A\u7528\u7684\u5F02\u5E38\u5E94\u6025\u57FA\u7840\u539F\u5219\u3002 \u4EE5\u4E0B\u5185\u5BB9\u4EE5\u7B80\u660E\u7684\u56FE\u6587\u5F62\u5F0F\u51FA\u73B0\u5728\u5404\u56FD\u7684\u516C\u5171\u573A\u6240\u4FE1\u606F\u680F\u3001\u624B\u673A\u63A8\u9001\u3001 \u4EE5\u53CA\u5F02\u5E38\u9884\u8B66APP\u7684\u5F00\u5C4F\u9875\u9762\u4E0A\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "guide-hotline-banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "guide-hotline-num"
  }, "99"), /*#__PURE__*/React.createElement("div", {
    className: "guide-hotline-text"
  }, /*#__PURE__*/React.createElement("strong", null, "\u5168\u7403\u5F02\u5E38\u5E94\u6025\u70ED\u7EBF"), "24\u5C0F\u65F6 \xB7 \u514D\u8D39 \xB7 \u65E0\u9700\u533A\u53F7 \xB7 \u4EFB\u4F55\u624B\u673A\u5747\u53EF\u63A5\u901A")))), /*#__PURE__*/React.createElement("section", {
    className: "guide-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      color: "var(--text-tertiary)",
      letterSpacing: "0.2em"
    }
  }, "TEN CORE PRINCIPLES \xB7 \u5341\u6761\u6838\u5FC3\u539F\u5219")), /*#__PURE__*/React.createElement("div", {
    className: "guide-rules-grid"
  }, rules.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.num,
    className: "guide-rule-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "guide-rule-num-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "guide-rule-num"
  }, r.num), /*#__PURE__*/React.createElement("svg", {
    className: "guide-rule-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: r.icon
  }))), /*#__PURE__*/React.createElement("div", {
    className: "guide-rule-content"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "guide-rule-title"
  }, r.title), /*#__PURE__*/React.createElement("p", {
    className: "guide-rule-desc"
  }, r.desc))))), /*#__PURE__*/React.createElement("div", {
    className: "guide-warning-box"
  }, /*#__PURE__*/React.createElement("h3", null, "\u8BF7\u8BB0\u4F4F\uFF1A\u4F60\u4E0D\u9700\u8981\u89E3\u51B3\u5F02\u5E38"), /*#__PURE__*/React.createElement("p", null, "\u666E\u901A\u4EBA\u9047\u5230\u5F02\u5E38\uFF0C\u552F\u4E00\u8981\u505A\u7684\u5C31\u662F\u4FDD\u6301\u51B7\u9759\u3001\u786E\u4FDD\u81EA\u5DF1\u5B89\u5168\u3001\u7136\u540E\u62E8\u625399\u3002 \u89E3\u51B3\u5F02\u5E38\u662F\u4E13\u4E1A\u6EAF\u754C\u8005\u7684\u5DE5\u4F5C\u3002\u4F60\u7684\u5B89\u5168\u6BD4\u4EFB\u4F55\u4E1C\u897F\u90FD\u91CD\u8981\u2014\u2014 \u5305\u62EC\u597D\u5947\u5FC3\u3001\u5305\u62EC\u88AB\u56F0\u7684\u670B\u53CB\u3001\u5305\u62EC\u4F60\u4EE5\u4E3A\u4F60\u80FD\u5E2E\u4E0A\u5FD9\u7684\u90A3\u4E9B\u4E8B\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "guide-back-home-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    className: "guide-back-home",
    onClick: () => {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("guide-quick");
        if (el) el.scrollIntoView({
          behavior: "smooth"
        });
      }, 200);
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5 M12 19l-7-7 7-7"
  })), "\u8FD4\u56DE\u9996\u9875")))));
}
window.GuidePage = GuidePage;