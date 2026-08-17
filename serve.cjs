// 极简静态文件服务器：用于本地打开 IMAC 门户（文件夹版）
// 用法: node serve.js [端口]   默认 8090
// 浏览器访问: http://127.0.0.1:8090/
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = parseInt(process.argv[2] || "8090", 10);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".jsx": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

http
  .createServer((req, res) => {
    try {
      let urlPath = decodeURIComponent(req.url.split("?")[0]);
      if (urlPath.endsWith("/")) urlPath += "index.html";
      const filePath = path.normalize(path.join(ROOT, urlPath));
      if (!filePath.startsWith(ROOT)) {
        res.writeHead(403);
        return res.end("Forbidden");
      }
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          return res.end("404 Not Found");
        }
        res.writeHead(200, {
          "Content-Type": MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream",
          "Cache-Control": "no-cache",
        });
        res.end(data);
      });
    } catch (e) {
      res.writeHead(500);
      res.end("500 Internal Error");
    }
  })
  .listen(PORT, "127.0.0.1", () => {
    console.log(`IMAC portal serving at http://127.0.0.1:${PORT}/`);
  });
