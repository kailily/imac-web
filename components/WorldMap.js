// WorldMap - SVG world map with organization markers
function WorldMap({
  orgs
}) {
  const [activeOrg, setActiveOrg] = React.useState(null);
  const [hoveredOrg, setHoveredOrg] = React.useState(null);
  const displayOrg = hoveredOrg || activeOrg;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .world-map-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background-color: #08080a;
          border: 1px solid var(--border-color);
          overflow: hidden;
        }
        .world-map-svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .map-marker {
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .map-marker:hover {
          transform: scale(1.3);
        }
        .map-marker.active circle {
          filter: drop-shadow(0 0 6px currentColor);
        }
        .map-tooltip {
          position: absolute;
          background-color: var(--bg-card);
          border: 1px solid var(--border-light);
          padding: 16px 18px;
          max-width: 260px;
          z-index: 10;
          pointer-events: none;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .map-tooltip.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .map-tooltip::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 10px; height: 10px;
          border-top: 2px solid var(--accent-red);
          border-left: 2px solid var(--accent-red);
        }
        .map-tooltip-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .map-tooltip-abbr {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid var(--steel-blue-light);
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--steel-blue-light);
        }
        .map-tooltip-name {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .map-tooltip-en {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .map-tooltip-hq {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }
        .map-tooltip-desc {
          font-size: 12px;
          color: var(--text-tertiary);
          line-height: 1.6;
          margin-bottom: 10px;
        }
        .map-tooltip-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .map-tooltip-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          padding: 2px 6px;
          border: 1px solid var(--steel-blue-dark);
          color: var(--steel-blue-light);
          letter-spacing: 0.05em;
        }
        .map-legend {
          position: absolute;
          bottom: 16px;
          left: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
        }
        .map-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .map-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent-red-bright);
        }
        .map-legend-dot.mobile {
          border: 1px dashed var(--accent-red-bright);
          background: none;
        }
        .map-grid-lines {
          opacity: 0.06;
        }
        @media (max-width: 768px) {
          .world-map-wrapper {
            aspect-ratio: 4 / 3;
          }
          .map-tooltip {
            max-width: 200px;
            padding: 12px 14px;
          }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "world-map-wrapper"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "world-map-svg",
    viewBox: "0 0 1000 562",
    preserveAspectRatio: "xMidYMid meet"
  }, /*#__PURE__*/React.createElement("g", {
    className: "map-grid-lines",
    stroke: "#fff",
    strokeWidth: "0.5",
    fill: "none"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "140",
    x2: "1000",
    y2: "140"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "281",
    x2: "1000",
    y2: "281"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "422",
    x2: "1000",
    y2: "422"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "250",
    y1: "0",
    x2: "250",
    y2: "562"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "500",
    y1: "0",
    x2: "500",
    y2: "562"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "750",
    y1: "0",
    x2: "750",
    y2: "562"
  })), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "#2a2a32",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M620,100 L720,80 L780,120 L800,180 L790,260 L750,320 L700,340 L650,320 L600,280 L580,220 L590,160 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M720,340 L760,330 L780,360 L760,390 L720,380 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M420,120 L580,100 L620,160 L600,220 L520,240 L440,220 L400,180 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M340,100 L420,90 L440,140 L420,200 L360,210 L320,180 L310,140 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M350,240 L440,230 L480,280 L470,380 L420,440 L360,430 L320,370 L310,300 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M80,80 L220,60 L280,100 L290,180 L260,260 L180,280 L100,260 L60,200 L50,140 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M200,280 L260,280 L270,320 L230,340 L200,320 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M220,360 L280,350 L300,400 L290,480 L250,520 L210,500 L200,440 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M780,380 L870,370 L900,410 L880,450 L820,460 L770,430 Z"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "500",
    cy: "50",
    rx: "400",
    ry: "30"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M600,500 L660,495 L680,520 L640,530 L590,520 Z"
  })), /*#__PURE__*/React.createElement("g", {
    className: `map-marker ${activeOrg === "oa" ? "active" : ""}`,
    style: {
      color: "var(--accent-red-bright)"
    },
    onClick: () => setActiveOrg(activeOrg === "oa" ? null : "oa"),
    onMouseEnter: () => setHoveredOrg("oa"),
    onMouseLeave: () => setHoveredOrg(null),
    transform: "translate(760, 200)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "9",
    fill: "currentColor",
    opacity: "0.2"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("text", {
    y: "-14",
    textAnchor: "middle",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    fontWeight: "700",
    fill: "#e8e8ec"
  }, "OA")), /*#__PURE__*/React.createElement("g", {
    className: `map-marker ${activeOrg === "nw" ? "active" : ""}`,
    style: {
      color: "var(--steel-blue-light)"
    },
    onClick: () => setActiveOrg(activeOrg === "nw" ? null : "nw"),
    onMouseEnter: () => setHoveredOrg("nw"),
    onMouseLeave: () => setHoveredOrg(null),
    transform: "translate(680, 90)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "9",
    fill: "currentColor",
    opacity: "0.2"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("text", {
    y: "-14",
    textAnchor: "middle",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    fontWeight: "700",
    fill: "#e8e8ec"
  }, "NW")), /*#__PURE__*/React.createElement("g", {
    className: `map-marker ${activeOrg === "bri" ? "active" : ""}`,
    style: {
      color: "#7a8a9c"
    },
    onClick: () => setActiveOrg(activeOrg === "bri" ? null : "bri"),
    onMouseEnter: () => setHoveredOrg("bri"),
    onMouseLeave: () => setHoveredOrg(null),
    transform: "translate(400, 160)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "9",
    fill: "currentColor",
    opacity: "0.2"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("text", {
    y: "-14",
    textAnchor: "middle",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    fontWeight: "700",
    fill: "#e8e8ec"
  }, "BRI")), /*#__PURE__*/React.createElement("g", {
    className: `map-marker ${activeOrg === "mc" ? "active" : ""}`,
    style: {
      color: "var(--level-hazardous)"
    },
    onClick: () => setActiveOrg(activeOrg === "mc" ? null : "mc"),
    onMouseEnter: () => setHoveredOrg("mc"),
    onMouseLeave: () => setHoveredOrg(null),
    transform: "translate(160, 170)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "11",
    fill: "currentColor",
    opacity: "0.15"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "6",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("text", {
    y: "-16",
    textAnchor: "middle",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    fontWeight: "700",
    fill: "#e8e8ec"
  }, "MC/4W")), /*#__PURE__*/React.createElement("g", {
    className: `map-marker ${activeOrg === "ps" ? "active" : ""}`,
    style: {
      color: "var(--level-unknown)"
    },
    onClick: () => setActiveOrg(activeOrg === "ps" ? null : "ps"),
    onMouseEnter: () => setHoveredOrg("ps"),
    onMouseLeave: () => setHoveredOrg(null),
    transform: "translate(480, 350)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "9",
    fill: "currentColor",
    opacity: "0.2"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("text", {
    y: "-14",
    textAnchor: "middle",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    fontWeight: "700",
    fill: "#e8e8ec"
  }, "PS")), /*#__PURE__*/React.createElement("g", {
    className: `map-marker ${activeOrg === "wnp" ? "active" : ""}`,
    style: {
      color: "#8ab4d4"
    },
    onClick: () => setActiveOrg(activeOrg === "wnp" ? null : "wnp"),
    onMouseEnter: () => setHoveredOrg("wnp"),
    onMouseLeave: () => setHoveredOrg(null),
    transform: "translate(520, 40)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "9",
    fill: "currentColor",
    opacity: "0.2"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "0,-6 5,3 -5,3",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("text", {
    y: "-14",
    textAnchor: "middle",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    fontWeight: "700",
    fill: "#e8e8ec"
  }, "WNP")), /*#__PURE__*/React.createElement("g", {
    className: `map-marker ${activeOrg === "lbc" ? "active" : ""}`,
    style: {
      color: "var(--accent-red-bright)"
    },
    onClick: () => setActiveOrg(activeOrg === "lbc" ? null : "lbc"),
    onMouseEnter: () => setHoveredOrg("lbc"),
    onMouseLeave: () => setHoveredOrg(null),
    transform: "translate(500, 300)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeDasharray: "4 3",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "6",
    fill: "currentColor",
    opacity: "0.3"
  }), /*#__PURE__*/React.createElement("text", {
    y: "3",
    textAnchor: "middle",
    fontFamily: "var(--font-mono)",
    fontSize: "9",
    fontWeight: "700",
    fill: "#e8e8ec"
  }, "LBC"))), displayOrg && /*#__PURE__*/React.createElement("div", {
    className: `map-tooltip visible`,
    style: {
      top: orgs.find(o => o.id === displayOrg)?.tooltipTop || "20%",
      left: orgs.find(o => o.id === displayOrg)?.tooltipLeft || "30%"
    }
  }, (() => {
    const org = orgs.find(o => o.id === displayOrg);
    if (!org) return null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "map-tooltip-header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "map-tooltip-abbr"
    }, org.abbr), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "map-tooltip-name"
    }, org.name), /*#__PURE__*/React.createElement("div", {
      className: "map-tooltip-en"
    }, org.en))), /*#__PURE__*/React.createElement("div", {
      className: "map-tooltip-hq"
    }, "\u603B\u90E8\uFF1A", org.hq), /*#__PURE__*/React.createElement("p", {
      className: "map-tooltip-desc"
    }, org.desc), /*#__PURE__*/React.createElement("div", {
      className: "map-tooltip-tags"
    }, org.tags.map(t => /*#__PURE__*/React.createElement("span", {
      key: t,
      className: "map-tooltip-tag"
    }, t))));
  })()), /*#__PURE__*/React.createElement("div", {
    className: "map-legend"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-dot"
  }), /*#__PURE__*/React.createElement("span", null, "\u6210\u5458\u7EC4\u7EC7\u603B\u90E8")), /*#__PURE__*/React.createElement("div", {
    className: "map-legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-legend-dot mobile"
  }), /*#__PURE__*/React.createElement("span", null, "\u79FB\u52A8\u673A\u6784 \xB7 \u65E0\u56FA\u5B9A\u603B\u90E8")))));
}
window.WorldMap = WorldMap;