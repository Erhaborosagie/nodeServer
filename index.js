const lg = console.log;
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //set part to public folder
  let extname = path.extname(req.url); // Get the extension name
  let partEnd = req.url + ".html";
  if (req.url == "/") {
    partEnd = "index.html";
  }

  let contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      partEnd = req.url;
      break;
    case ".css":
      contentType = "text/css";
      partEnd = req.url;
      break;
    case ".json":
      contentType = "application/json";
      partEnd = req.url;
      break;
    case ".png":
      contentType = "image/png";
      partEnd = req.url;
      break;
    case ".jpg":
      contentType = "image/jpg";
      partEnd = req.url;
      break;
    case ".jpeg":
      contentType = "image/jpeg";
      partEnd = req.url;
      break;
  }

  let filePart = path.join(__dirname, "./public", partEnd);

  fs.readFile(filePart, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end(`Server error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  lg(`Node.js web server at port ${PORT} is running..`)
);
