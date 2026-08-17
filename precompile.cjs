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

// 合并所有组件 JS 为 app.js（固定顺序：根组件 → 页面 → App），减少请求数
// 注意：顺序不能从 index.html 读取（首次运行后引用已被移除），必须硬编码
const BUNDLE_ORDER = [
  // 根级公共组件（router / auth / 公共组件 / 数据 / 子组件）
  "components/router",
  "components/auth",
  "components/Header",
  "components/Footer",
  "components/WorldMap",
  "components/OrganizationsMap",
  "components/organizationsData",
  "components/AcademyMap",
  "components/AnomalyFile",
  "components/AnomalyInfo",
  "components/GuideNews",
  "components/Hero",
  "components/Organizations",
  "components/Walker",
  // 页面组件
  "components/pages/Home",
  "components/pages/Guide",
  "components/pages/Organizations",
  "components/pages/OrgDetail",
  "components/pages/News",
  "components/pages/Auth",
  "components/pages/Portal",
  "components/pages/ProfileCenter",
  "components/pages/RegisterPage",
  "components/pages/MailboxPage",
  "components/pages/Profile",
  "components/pages/Missions",
  "components/pages/Training",
  "components/pages/PsychEval",
  "components/pages/Admin",
  "components/pages/Join",
  "components/pages/AnomalyAuth",
  "components/pages/AnomalyArchive",
  "components/pages/AnomalyDetail",
  "components/pages/MediaAuth",
  "components/pages/MediaGuidelines",
  // 入口
  "components/App",
];
let bundle = "";
for (const f of BUNDLE_ORDER) {
  const src = f + ".js";
  if (!fs.existsSync(src)) {
    console.error("[错误] 缺少文件: " + src);
    process.exit(1);
  }
  bundle += fs.readFileSync(src, "utf8") + ";\n";
}
fs.writeFileSync("app.js", bundle, "utf8");
console.log(
  "app.js 生成: " + (bundle.length / 1024).toFixed(0) + " KB，合并 " + BUNDLE_ORDER.length + " 个文件"
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

// index.html：确保只保留 react / react-dom / app.js 三个脚本（幂等，可重复运行）
let html2 = fs.readFileSync("index.html", "utf8");
html2 = html2.replace(/\n?\s*<script src="components\/[^"]+\.js"><\/script>/g, "");
html2 = html2.replace(/\n?\s*<script src="app\.js"><\/script>/g, "");
html2 = html2.replace(
  '  <script src="lib/react-dom.production.min.js"></script>',
  '  <script src="lib/react-dom.production.min.js"></script>\n  <script src="app.js"></script>'
);
fs.writeFileSync("index.html", html2, "utf8");
console.log(
  "index.html 脚本数:",
  (html2.match(/<script src=/g) || []).length,
  "（react + react-dom + app.js）"
);
