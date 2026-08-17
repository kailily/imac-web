// Organizations map component with interactive world map
function OrganizationsMap({
  compact = false,
  onOrgClick,
  selectedOrg,
  setSelectedOrg
}) {
  const {
    navigate
  } = useRouter();
  const orgs = ORGANIZATIONS;
  const [hovered, setHovered] = React.useState(null);
  const [active, setActive] = React.useState(selectedOrg || null);
  React.useEffect(() => {
    if (selectedOrg !== undefined) setActive(selectedOrg);
  }, [selectedOrg]);
  const handleOrgClick = org => {
    setActive(org.slug);
    if (setSelectedOrg) setSelectedOrg(org.slug);
    if (onOrgClick) onOrgClick(org);
  };
  const activeOrg = orgs.find(o => o.slug === active);
  const orgIcon = (icon, size = 16, color = "#c42828") => {
    const icons = {
      serpent: /*#__PURE__*/React.createElement("path", {
        d: "M4 12c0-3 2-5 5-5s4 2 4 5-2 4-5 4-5-2-5-5z M12 12c0-4 3-7 8-7",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }),
      tower: /*#__PURE__*/React.createElement("path", {
        d: "M8 2h8v4h2v2h-2v10H8V8H6V6h2V2z M8 22h8",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }),
      compass: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "9",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 5l2 7-2 7-2-7 2-7z",
        fill: color,
        opacity: "0.7"
      })),
      star: /*#__PURE__*/React.createElement("path", {
        d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      }),
      wall: /*#__PURE__*/React.createElement("path", {
        d: "M3 9l9-6 9 6v12H3V9z M9 21V9 M15 21V9 M3 15h18",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5"
      }),
      tree: /*#__PURE__*/React.createElement("path", {
        d: "M12 22V12 M12 2l4 5-3 3 4 4H7l4-4-3-3 4-5z",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }),
      dome: /*#__PURE__*/React.createElement("path", {
        d: "M4 12a8 8 0 0116 0 M3 22h18 M8 22v-4M16 22v-4M12 22V12",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }),
      bridge: /*#__PURE__*/React.createElement("path", {
        d: "M2 18h20 M4 18v-4a4 4 0 018 0v4 M12 18v-4a4 4 0 018 0v4 M8 14V10 M16 14V10",
        stroke: color,
        fill: "none",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      })
    };
    return /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24"
    }, icons[icon]);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .orgs-map-container {
          position: relative;
          width: 100%;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
        }
        .orgs-map-svg {
          width: 100%;
          display: block;
        }
        .org-marker {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .org-marker-pulse {
          animation: org-pulse 2s ease-in-out infinite;
        }
        @keyframes org-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.6); }
        }
        .org-marker.active .org-marker-dot {
          r: 6;
        }
        .org-info-card {
          margin-top: 20px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 24px;
        }
        .org-info-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }
        .org-info-badge {
          width: 56px; height: 56px;
          border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .org-info-name {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .org-info-en {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
        }
        .org-info-detail-row {
          display: flex;
          gap: 20px;
          margin-bottom: 14px;
          font-size: 13px;
        }
        .org-info-detail-label {
          font-family: var(--font-mono);
          color: var(--text-tertiary);
          font-size: 10px;
          letter-spacing: 0.15em;
          min-width: 60px;
        }
        .org-info-detail-value {
          color: var(--text-secondary);
        }
        .org-info-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-top: 10px;
        }
        .org-info-cta {
          margin-top: 18px;
          display: flex;
          justify-content: flex-end;
        }
        .org-info-btn {
          padding: 8px 18px;
          background: transparent;
          border: 1.5px solid var(--accent-red-bright);
          color: var(--accent-red-bright);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .org-info-btn:hover {
          background-color: var(--accent-red-bright);
          color: #fff;
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "orgs-map-container"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "orgs-map-svg",
    viewBox: "0 0 100 55",
    preserveAspectRatio: "xMidYMid meet"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: "gridPattern",
    width: "5",
    height: "5",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5 0 L 0 0 0 5",
    fill: "none",
    stroke: "rgba(255,255,255,0.03)",
    strokeWidth: "0.3"
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: "mapGlow",
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(196, 40, 40, 0.08)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "transparent"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "55",
    fill: "url(#gridPattern)"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "55",
    fill: "url(#mapGlow)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 3 L80 3 L83 7 L78 12 L55 13 L32 12 L22 9 Z",
    fill: "rgba(138, 180, 212, 0.12)",
    stroke: "rgba(138, 180, 212, 0.4)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M44 14 L76 12 L88 17 L87 30 L80 38 L66 41 L52 37 L45 29 Z",
    fill: "rgba(196, 40, 40, 0.1)",
    stroke: "rgba(196, 40, 40, 0.45)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 16 L34 14 L38 25 L34 37 L24 41 L10 39 L4 29 Z",
    fill: "rgba(74, 88, 104, 0.18)",
    stroke: "rgba(74, 88, 104, 0.45)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M38 23 L45 22 L47 27 L43 30 L37 28 Z",
    fill: "rgba(196, 154, 44, 0.16)",
    stroke: "rgba(196, 154, 44, 0.5)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 42 L58 41 L63 46 L55 51 L26 52 L13 48 Z",
    fill: "rgba(122, 58, 176, 0.12)",
    stroke: "rgba(122, 58, 176, 0.4)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M68 38 L78 36 L81 41 L75 44 L68 43 Z",
    fill: "rgba(106, 140, 168, 0.16)",
    stroke: "rgba(106, 140, 168, 0.45)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M84 43 L91 42 L92 46 L87 49 L83 47 Z",
    fill: "rgba(106, 140, 168, 0.16)",
    stroke: "rgba(106, 140, 168, 0.45)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M73 47 L79 46 L80 50 L74 51 Z",
    fill: "rgba(106, 140, 168, 0.16)",
    stroke: "rgba(106, 140, 168, 0.45)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "13",
    x2: "100",
    y2: "13",
    stroke: "rgba(196, 40, 40, 0.08)",
    strokeWidth: "0.2",
    strokeDasharray: "0.8 0.8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "27",
    x2: "100",
    y2: "27",
    stroke: "rgba(196, 40, 40, 0.12)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "42",
    x2: "100",
    y2: "42",
    stroke: "rgba(196, 40, 40, 0.08)",
    strokeWidth: "0.2",
    strokeDasharray: "0.8 0.8"
  }), [{
    name: "霜原联盟",
    x: 52,
    y: 7
  }, {
    name: "格伦贝尔联邦",
    x: 66,
    y: 22
  }, {
    name: "洛林自由市",
    x: 42,
    y: 19
  }, {
    name: "维斯特兰联邦",
    x: 19,
    y: 20
  }, {
    name: "瀚海合众国",
    x: 52,
    y: 43
  }, {
    name: "东云群岛",
    x: 76,
    y: 41
  }].map(n => /*#__PURE__*/React.createElement("g", {
    key: n.name
  }, /*#__PURE__*/React.createElement("rect", {
    x: n.x - 8.5,
    y: n.y - 2.2,
    width: 17,
    height: 4.2,
    rx: "0.6",
    fill: "rgba(74, 150, 140, 0.06)",
    stroke: "rgba(74, 150, 140, 0.5)",
    strokeWidth: "0.25",
    strokeDasharray: "0.8 0.8"
  }), /*#__PURE__*/React.createElement("text", {
    x: n.x,
    y: n.y + 1.2,
    textAnchor: "middle",
    fontSize: "2.4",
    fill: "rgba(74, 150, 140, 0.95)",
    fontFamily: "monospace",
    letterSpacing: "0.15"
  }, n.name))), orgs.map(org => {
    const isActive = active === org.slug;
    const isHovered = hovered === org.slug;
    return /*#__PURE__*/React.createElement("g", {
      key: org.slug,
      className: `org-marker ${isActive ? "active" : ""}`,
      onMouseEnter: () => setHovered(org.slug),
      onMouseLeave: () => setHovered(null),
      onClick: () => handleOrgClick(org),
      style: {
        transform: `translate(${org.mapPosition.x}px, ${org.mapPosition.y}px)`
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "0",
      cy: "1.6",
      r: "2.2",
      fill: "none",
      stroke: org.color,
      strokeWidth: "0.4",
      opacity: isActive || isHovered ? 0.8 : 0.4,
      className: isActive ? "org-marker-pulse" : ""
    }), /*#__PURE__*/React.createElement("g", {
      transform: "translate(0, -3)"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "5.2",
      stroke: org.color,
      strokeWidth: "0.4"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "0",
      cy: "5.6",
      r: "0.5",
      fill: org.color
    }), /*#__PURE__*/React.createElement("path", {
      d: "M0 0 L4.6 0.9 L0 2.2 Z",
      fill: org.color,
      opacity: "0.92"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M0 0.2 L3.4 0.85 L0 1.5 Z",
      fill: "#fff",
      opacity: "0.15"
    })), /*#__PURE__*/React.createElement("text", {
      x: "5",
      y: "-2",
      fill: isActive ? org.color : "var(--text-secondary)",
      fontSize: "2.6",
      fontFamily: "monospace",
      style: {
        transition: "all 0.3s ease"
      }
    }, org.abbr), /*#__PURE__*/React.createElement("text", {
      x: "5",
      y: "0.5",
      fontSize: "1.7",
      fill: "var(--text-tertiary)",
      fontFamily: "monospace"
    }, org.hq));
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(92, 6)"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "3.5",
    fill: "none",
    stroke: "rgba(196, 40, 40, 0.3)",
    strokeWidth: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 -3 L1 0 L0 3 L-1 0 Z",
    fill: "rgba(196, 40, 40, 0.6)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "-4",
    fill: "rgba(196, 40, 40, 0.7)",
    fontSize: "2",
    textAnchor: "middle",
    fontFamily: "monospace"
  }, "N")))), activeOrg && !compact && /*#__PURE__*/React.createElement("div", {
    className: "org-info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-info-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "org-info-badge",
    style: {
      borderColor: activeOrg.color,
      color: activeOrg.color
    }
  }, activeOrg.abbr), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "org-info-name"
  }, activeOrg.name), /*#__PURE__*/React.createElement("div", {
    className: "org-info-en"
  }, activeOrg.en))), /*#__PURE__*/React.createElement("div", {
    className: "org-info-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "org-info-detail-label"
  }, "\u603B\u90E8"), /*#__PURE__*/React.createElement("span", {
    className: "org-info-detail-value"
  }, activeOrg.hqDetail || activeOrg.hq, activeOrg.hqEn ? " · " + activeOrg.hqEn : "")), /*#__PURE__*/React.createElement("div", {
    className: "org-info-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "org-info-detail-label"
  }, "\u7BA1\u8F96\u533A\u57DF"), /*#__PURE__*/React.createElement("span", {
    className: "org-info-detail-value"
  }, activeOrg.region)), /*#__PURE__*/React.createElement("div", {
    className: "org-info-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "org-info-detail-label"
  }, "\u6210\u7ACB\u65F6\u95F4"), /*#__PURE__*/React.createElement("span", {
    className: "org-info-detail-value"
  }, activeOrg.founded)), /*#__PURE__*/React.createElement("p", {
    className: "org-info-desc"
  }, activeOrg.desc), /*#__PURE__*/React.createElement("div", {
    className: "org-info-cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "org-info-btn",
    onClick: () => navigate(`/org/${activeOrg.slug}`)
  }, "\u67E5\u770B\u8BE6\u60C5 \u2192"))));
}
window.OrganizationsMap = OrganizationsMap;