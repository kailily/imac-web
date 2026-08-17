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
