// 一键重新打包：重新生成单文件版 + 部署包 zip
// 由「重新打包.bat」调用；也可命令行 node rebuild.cjs
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

// [1/2] 生成单文件离线版（把 lib 与 app.js、全部懒加载页面内联）
let html = fs.readFileSync("index.html", "utf8");
html = html.replace(/<script src="(lib\/[^"]+)"><\/script>/g, (m, src) => {
  return "<script>" + fs.readFileSync(src, "utf8") + "</script>";
});
html = html.replace(/<script src="app\.js"><\/script>/g, (m) => {
  return "<script>" + fs.readFileSync("app.js", "utf8") + "</script>";
});
// 兼容旧 jsx 引用（如有）
html = html.replace(
  /<script type="text\/babel" src="(components\/[^"]+)"><\/script>/g,
  (m, src) => {
    return '<script type="text/babel">' + fs.readFileSync(src, "utf8") + "</script>";
  }
);
// 内联懒加载页面脚本（预定义全局页面组件，单文件版无需动态加载）
const pagesDir = path.join("pages");
if (fs.existsSync(pagesDir)) {
  const pages = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".js"));
  for (const p of pages) {
    html = html.replace("</body>", "<script>" + fs.readFileSync(path.join(pagesDir, p), "utf8") + "</script></body>");
  }
}
fs.writeFileSync("预览-双击打开.html", html, "utf8");
console.log(
  "[1/2] 单文件版已生成: 预览-双击打开.html (" +
    (Buffer.byteLength(html) / 1024 / 1024).toFixed(2) + " MB)"
);

// [2/2] 打包部署文件（index.html + app.js + lib/ + pages/，排除 babel.min.js）
const dest = path.resolve("..", "IMAC-网站部署包.zip");
if (fs.existsSync(dest)) fs.unlinkSync(dest);
// 先复制到临时目录
const tmp = path.resolve("..", "_deploy_tmp");
fs.rmSync(tmp, { recursive: true, force: true });
fs.mkdirSync(path.join(tmp, "lib"), { recursive: true });
fs.mkdirSync(path.join(tmp, "pages"), { recursive: true });
fs.copyFileSync("index.html", path.join(tmp, "index.html"));
fs.copyFileSync("app.js", path.join(tmp, "app.js"));
for (const f of fs.readdirSync("lib")) {
  if (f === "babel.min.js") continue;
  fs.copyFileSync(path.join("lib", f), path.join(tmp, "lib", f));
}
if (fs.existsSync(pagesDir)) {
  for (const f of fs.readdirSync(pagesDir)) {
    fs.copyFileSync(path.join(pagesDir, f), path.join(tmp, "pages", f));
  }
}
const r = spawnSync("tar", ["-a", "-cf", dest, "index.html", "app.js", "lib", "pages"], {
  cwd: tmp,
  stdio: "inherit",
});
fs.rmSync(tmp, { recursive: true, force: true });
if (r.status !== 0) {
  console.error("[错误] 部署包打包失败（tar 退出码 " + r.status + "）");
  process.exit(1);
}
console.log(
  "[2/2] 部署包已生成: " + dest + " (" +
    (fs.statSync(dest).size / 1024 / 1024).toFixed(2) + " MB)"
);
console.log("完成！");
