// 一键重新打包：重新生成单文件版 + 部署包 zip
// 由「重新打包.bat」调用；也可命令行 node rebuild.cjs
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

// [1/2] 生成单文件离线版（把 lib 与全部 JSX 按 index.html 顺序内联）
let html = fs.readFileSync("index.html", "utf8");
html = html.replace(/<script src="(lib\/[^"]+)"><\/script>/g, (m, src) => {
  return "<script>" + fs.readFileSync(src, "utf8") + "</script>";
});
html = html.replace(
  /<script type="text\/babel" src="(components\/[^"]+)"><\/script>/g,
  (m, src) => {
    return '<script type="text/babel">' + fs.readFileSync(src, "utf8") + "</script>";
  }
);
fs.writeFileSync("预览-双击打开.html", html, "utf8");
console.log(
  "[1/2] 单文件版已生成: 预览-双击打开.html (" +
    (Buffer.byteLength(html) / 1024 / 1024).toFixed(2) + " MB)"
);

// [2/2] 打包部署文件（index.html + components/ + lib/），输出到上级目录
const dest = path.resolve("..", "IMAC-网站部署包.zip");
if (fs.existsSync(dest)) fs.unlinkSync(dest);
const r = spawnSync("tar", ["-a", "-cf", dest, "index.html", "components", "lib"], {
  stdio: "inherit",
});
if (r.status !== 0) {
  console.error("[错误] 部署包打包失败（tar 退出码 " + r.status + "）");
  process.exit(1);
}
console.log(
  "[2/2] 部署包已生成: " + dest + " (" +
    (fs.statSync(dest).size / 1024 / 1024).toFixed(2) + " MB)"
);
console.log("完成！");
