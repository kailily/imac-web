// 预编译：把 components 下所有 .jsx 编译为 .js，并改造 index.html 去掉浏览器内 Babel
// 用法: node precompile.cjs
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// 在 VM 中加载本地 Babel standalone
const babelSrc = fs.readFileSync("lib/babel.min.js", "utf8");
const sandbox = { window: {}, self: {} };
sandbox.globalThis = sandbox;
sandbox.window = sandbox;
sandbox.self = sandbox;
vm.createContext(sandbox);
vm.runInContext(babelSrc, sandbox);
const Babel = sandbox.Babel;

let total = 0, ok = 0, fail = 0;
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) {
      walk(p);
    } else if (f.name.endsWith(".jsx")) {
      total++;
      try {
        const code = fs.readFileSync(p, "utf8");
        const out = Babel.transform(code, { presets: ["react"] }).code;
        const target = p.replace(/\.jsx$/, ".js");
        fs.writeFileSync(target, out, "utf8");
        ok++;
      } catch (e) {
        fail++;
        console.log("FAIL", p, String(e).slice(0, 160));
      }
    }
  }
})("components");
console.log("compiled jsx:", ok + "/" + total, "fail:", fail);

// 改造 index.html：移除 babel.min.js，jsx 引用改为 js
let html = fs.readFileSync("index.html", "utf8");
html = html.replace(
  /<script src="lib\/babel\.min\.js"><\/script>\s*\n?/,
  "<!-- Babel 已预编译移除 -->\n"
);
html = html.replace(
  /<script type="text\/babel" src="([^"]+)\.jsx"><\/script>/g,
  (m, src) => `<script src="${src}.js"></script>`
);
fs.writeFileSync("index.html", html, "utf8");
console.log("index.html updated: babel removed, jsx -> js");

// 校验
const check = fs.readFileSync("index.html", "utf8");
console.log(
  "remaining text/babel refs:",
  (check.match(/text\/babel/g) || []).length
);
console.log(
  "js script refs:",
  (check.match(/<script src="components\//g) || []).length
);

// 合并核心 JS 为 app.js（固定顺序）：仅保留首页渲染链真正依赖的组件
// 其余公共组件（Hero/AnomalyFile/AnomalyInfo/Organizations/Walker/WorldMap/EmergencyGuide
// 等无引用死代码）与未挂路由的页面已从核心移除，AnomalyDetail 依赖随页面文件合并
const CORE_ORDER = [
  "components/router",
  "components/auth",
  "components/Header",
  "components/Footer",
  "components/organizationsData",
  "components/OrganizationsMap",
  "components/pages/Home",
  "components/App",
];

// 懒加载页面：路由到才加载（App.jsx 的 LAZY_PAGE_MAP 与之对应）
const LAZY_PAGES = [
  "components/pages/Guide",
  "components/pages/Organizations",
  "components/pages/OrgDetail",
  "components/pages/News",
  "components/pages/Auth",
  "components/pages/Portal",
  "components/pages/ProfileCenter",
  "components/pages/RegisterPage",
  "components/pages/MailboxPage",
  "components/pages/Admin",
  "components/pages/Join",
  "components/pages/AnomalyAuth",
  "components/pages/AnomalyArchive",
  "components/pages/AnomalyDetail",
  "components/pages/MediaAuth",
  "components/pages/MediaGuidelines",
];

// 懒加载页面的额外依赖（按依赖顺序前置合并进页面文件）
const PAGE_DEPS = {
  "components/pages/AnomalyDetail": [
    "components/AcademyMap",
    "components/AnomalyDossier",
  ],
};

let bundle = "";
for (const f of CORE_ORDER) {
  const src = f + ".js";
  if (!fs.existsSync(src)) {
    console.error("[错误] 缺少文件: " + src);
    process.exit(1);
  }
  bundle += fs.readFileSync(src, "utf8") + ";\n";
}
fs.writeFileSync("app.js", bundle, "utf8");
console.log(
  "app.js 生成: " + (bundle.length / 1024).toFixed(0) + " KB（核心 " + CORE_ORDER.length + " 个文件）"
);

// 用 terser 压缩 app.js（减小下载体积；失败则保留未压缩版）
try {
  const terser = require("D:/dsh/deploy-tools/node_modules/terser");
  const result = terser.minify_sync(bundle, { compress: true, mangle: true });
  fs.writeFileSync("app.js", result.code, "utf8");
  console.log(
    "app.js 压缩: " + (bundle.length / 1024).toFixed(0) + " KB -> " + (result.code.length / 1024).toFixed(0) + " KB"
  );
} catch (e) {
  console.log("压缩失败（保留未压缩版）:", e.message);
}

// 懒加载页面：单独压缩输出到 pages/ 目录（供 App.jsx 按需注入）
try {
  const terser = require("D:/dsh/deploy-tools/node_modules/terser");
  fs.mkdirSync("pages", { recursive: true });
  let totalOut = 0;
  for (const f of LAZY_PAGES) {
    const name = f.split("/").pop();
    let code = fs.readFileSync(f + ".js", "utf8");
    // 前置合并页面依赖（如 AnomalyDetail 依赖 AcademyMap / AnomalyDossier）
    const deps = PAGE_DEPS[f] || [];
    for (const d of deps) {
      code = fs.readFileSync(d + ".js", "utf8") + ";\n" + code;
    }
    const min = terser.minify_sync(code, { compress: true, mangle: true });
    fs.writeFileSync("pages/" + name + ".js", min.code, "utf8");
    totalOut += min.code.length;
  }
  console.log(
    "pages/ 懒加载: " + LAZY_PAGES.length + " 个页面 -> " + (totalOut / 1024).toFixed(0) + " KB"
  );
} catch (e) {
  console.log("页面压缩失败:", e.message);
  process.exit(1);
}

// index.html：确保只保留 react / react-dom（head）与 app.js（body #root 之后），幂等可重复运行
let html2 = fs.readFileSync("index.html", "utf8");
html2 = html2.replace(/\n?\s*<script src="components\/[^"]+\.js"><\/script>/g, "");
html2 = html2.replace(/\n?\s*<script src="app\.js"><\/script>/g, "");
// app.js 必须位于 #root 之后（DOM 就绪后执行），否则 createRoot 拿不到容器
if (!/<div id="root"><\/div>[\s\S]*<script src="app\.js">/.test(html2)) {
  html2 = html2.replace(
    '  <div id="root"></div>',
    '  <div id="root"></div>\n  <script src="app.js"></script>'
  );
}
fs.writeFileSync("index.html", html2, "utf8");
console.log(
  "index.html 脚本数:",
  (html2.match(/<script src=/g) || []).length,
  "（react + react-dom + app.js）"
);
