// Organizations Section - 8 Member Organizations
function Organizations() {
  const regions = [{
    region: "大陆东区",
    regionEn: "EASTERN CONTINENT",
    orgs: [{
      name: "衔尾蛇事务所",
      en: "Ouroboros Agency",
      abbr: "OA",
      hq: "鸣海城",
      desc: "亚洲规模最大的异常处理机构，风格灵活务实，擅长复杂叙事类异常的破解。成员多来自刑侦、痕迹学与行为分析背景。",
      tags: ["叙事破解", "刑侦背景", "亚洲最大"],
      shape: "circle"
    }, {
      name: "北境守望",
      en: "Northwatch",
      abbr: "NW",
      hq: "白松城",
      desc: "擅长极寒环境和长期潜伏型异常。成员多为退役极地部队和原住民猎手，坚韧、沉默、耐受力极强。",
      tags: ["极寒环境", "长期潜伏", "山地作战"],
      shape: "triangle"
    }]
  }, {
    region: "大陆西区",
    regionEn: "WESTERN CONTINENT",
    orgs: [{
      name: "边界研究院",
      en: "Boundary Research Institute",
      abbr: "BRI",
      hq: "洛林自由市",
      desc: "全球最大、历史最悠久的异常研究机构。学术系统化程度最高，拥有最完整的异常档案库，标准训练周期14个月。",
      tags: ["学术系统", "档案最全", "14个月训练"],
      shape: "hexagon"
    }, {
      name: "晨星团",
      en: "Morningstar Collective",
      abbr: "MC",
      hq: "新阿尔比恩市",
      desc: "理性务实、数据驱动。科学家比例在所有组织中最高，以方法论和量化分析著称。",
      tags: ["数据驱动", "科学方法", "高知群体"],
      shape: "star"
    }, {
      name: "第四面墙",
      en: "The Fourth Wall",
      abbr: "4W",
      hq: "新阿尔比恩市",
      desc: "信息管控与公众界面专家。成员多来自军事情报和网络安全背景，负责异常事件的公众认知管理。",
      tags: ["信息管控", "情报背景", "公众界面"],
      shape: "square"
    }]
  }, {
    region: "大陆南区",
    regionEn: "SOUTHERN CONTINENT",
    orgs: [{
      name: "悬铃木学会",
      en: "Platanus Society",
      abbr: "PS",
      hq: "诺瓦城",
      desc: '最神秘的成员组织。核心理念是「异常是意识的产物」，成员多为人类学、神话学和心理学背景。',
      tags: ["意识学派", "神秘主义", "人类学"],
      shape: "diamond"
    }]
  }, {
    region: "极地与跨区域",
    regionEn: "POLAR & TRANSREGIONAL",
    orgs: [{
      name: "白夜哨站",
      en: "White Night Post",
      abbr: "WNP",
      hq: "极光城",
      desc: "驻扎在最北端的组织。擅长极寒环境和超大空间异常，成员适应力极强，是极地异常的第一道防线。",
      tags: ["极地驻扎", "超大空间", "极寒适应"],
      shape: "octagon"
    }, {
      name: "长桥会社",
      en: "Long Bridge Company",
      abbr: "LBC",
      hq: "无固定总部",
      desc: "唯一无国土的成员组织。拥有完全移动式指挥系统，可在72小时内部署至全球任何地点。",
      tags: ["快速部署", "移动指挥", "跨国响应"],
      shape: "bridge"
    }]
  }];
  const renderBadge = (shape, abbr) => {
    const shapes = {
      circle: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "32",
        cy: "32",
        r: "28",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "32",
        cy: "32",
        r: "22",
        stroke: "currentColor",
        strokeWidth: "0.8",
        opacity: "0.5"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "37",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "14",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr)),
      triangle: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("polygon", {
        points: "32,6 58,54 6,54",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("polygon", {
        points: "32,16 50,48 14,48",
        stroke: "currentColor",
        strokeWidth: "0.8",
        opacity: "0.5"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "44",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "12",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr)),
      hexagon: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("polygon", {
        points: "32,4 56,18 56,46 32,60 8,46 8,18",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("polygon", {
        points: "32,12 48,21 48,43 32,52 16,43 16,21",
        stroke: "currentColor",
        strokeWidth: "0.8",
        opacity: "0.5"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "36",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "13",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr)),
      star: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("polygon", {
        points: "32,4 39,24 60,24 43,37 49,57 32,46 15,57 21,37 4,24 25,24",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinejoin: "miter"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "38",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "11",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr)),
      square: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("rect", {
        x: "6",
        y: "6",
        width: "52",
        height: "52",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "14",
        y: "14",
        width: "36",
        height: "36",
        stroke: "currentColor",
        strokeWidth: "0.8",
        opacity: "0.5"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "37",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "13",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr)),
      diamond: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("polygon", {
        points: "32,4 60,32 32,60 4,32",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("polygon", {
        points: "32,12 52,32 32,52 12,32",
        stroke: "currentColor",
        strokeWidth: "0.8",
        opacity: "0.5"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "37",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "12",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr)),
      octagon: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("polygon", {
        points: "22,4 42,4 60,22 60,42 42,60 22,60 4,42 4,22",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("polygon", {
        points: "24,10 40,10 54,24 54,40 40,54 24,54 10,40 10,24",
        stroke: "currentColor",
        strokeWidth: "0.8",
        opacity: "0.5"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "37",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "12",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr)),
      bridge: /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 64 64",
        fill: "none"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M4 40 Q32 10 60 40",
        stroke: "currentColor",
        strokeWidth: "1.5",
        fill: "none"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M4 48 L60 48",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "16",
        y1: "40",
        x2: "16",
        y2: "48",
        stroke: "currentColor",
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "32",
        y1: "28",
        x2: "32",
        y2: "48",
        stroke: "currentColor",
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "48",
        y1: "40",
        x2: "48",
        y2: "48",
        stroke: "currentColor",
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("text", {
        x: "32",
        y: "59",
        textAnchor: "middle",
        fontFamily: "var(--font-mono)",
        fontSize: "10",
        fontWeight: "700",
        fill: "currentColor"
      }, abbr))
    };
    return shapes[shape] || shapes.circle;
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .orgs-section {
          background-color: var(--bg-primary);
        }
        .org-region {
          margin-bottom: 50px;
        }
        .org-region:last-child {
          margin-bottom: 0;
        }
        .org-region-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
        }
        .org-region-name {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .org-region-en {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .org-region-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, var(--border-color), transparent);
        }
        .org-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 16px;
        }
        .org-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 28px 24px;
          display: flex;
          gap: 20px;
          position: relative;
          transition: border-color 0.3s ease;
        }
        .org-card:hover {
          border-color: var(--border-light);
        }
        .org-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 14px; height: 14px;
          border-top: 2px solid var(--steel-blue);
          border-left: 2px solid var(--steel-blue);
        }
        .org-card::after {
          content: "";
          position: absolute;
          bottom: 0; right: 0;
          width: 14px; height: 14px;
          border-bottom: 2px solid var(--steel-blue);
          border-right: 2px solid var(--steel-blue);
        }
        .org-badge {
          width: 64px;
          height: 64px;
          flex-shrink: 0;
          color: var(--steel-blue-light);
        }
        .org-info {
          flex: 1;
          min-width: 0;
        }
        .org-name {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .org-en {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .org-hq {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .org-hq::before {
          content: "";
          width: 4px;
          height: 4px;
          background-color: var(--text-muted);
          border-radius: 50%;
        }
        .org-hq strong {
          color: var(--text-primary);
          font-weight: 500;
        }
        .org-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 14px;
        }
        .org-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .org-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--steel-blue-light);
          border: 1px solid var(--steel-blue-dark);
          padding: 3px 8px;
          letter-spacing: 0.05em;
        }
        @media (max-width: 768px) {
          .org-cards-grid { grid-template-columns: 1fr; }
          .org-card { flex-direction: column; gap: 16px; }
        }
      `), /*#__PURE__*/React.createElement("section", {
    id: "organizations",
    className: "section orgs-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-number mono"
  }, "05 /"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title-cn"
  }, "\u8BA4\u8BC1\u6210\u5458\u7EC4\u7EC7"), /*#__PURE__*/React.createElement("span", {
    className: "section-title-en"
  }, "REGISTERED ORGANIZATIONS \xB7 8")), /*#__PURE__*/React.createElement("span", {
    className: "classification public"
  }, "PUBLIC / \u516C\u5F00\u7EA7")), regions.map(region => /*#__PURE__*/React.createElement("div", {
    key: region.region,
    className: "org-region"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-region-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "org-region-name"
  }, region.region), /*#__PURE__*/React.createElement("span", {
    className: "org-region-en"
  }, region.regionEn), /*#__PURE__*/React.createElement("div", {
    className: "org-region-line"
  })), /*#__PURE__*/React.createElement("div", {
    className: "org-cards-grid"
  }, region.orgs.map(org => /*#__PURE__*/React.createElement("div", {
    key: org.abbr,
    className: "org-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-badge"
  }, renderBadge(org.shape, org.abbr)), /*#__PURE__*/React.createElement("div", {
    className: "org-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-name"
  }, org.name), /*#__PURE__*/React.createElement("div", {
    className: "org-en"
  }, org.en), /*#__PURE__*/React.createElement("div", {
    className: "org-hq"
  }, "\u603B\u90E8\uFF1A", /*#__PURE__*/React.createElement("strong", null, org.hq)), /*#__PURE__*/React.createElement("p", {
    className: "org-desc"
  }, org.desc), /*#__PURE__*/React.createElement("div", {
    className: "org-tags"
  }, org.tags.map(tag => /*#__PURE__*/React.createElement("span", {
    key: tag,
    className: "org-tag"
  }, tag))))))))))));
}
window.Organizations = Organizations;