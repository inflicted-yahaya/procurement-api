const http = require("http");
const fs = require("fs");
const path = require("path");
const uc = require("upper-case");

const dataRecords = path.join(__dirname, "data.json");

const server = http.createServer((req, res) => {
  if (req.url === "/kgl/procurement" && req.method === "GET") {
    if (!fs.existsSync(dataRecords)) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify([]));
    }

    const data = fs.readFileSync(dataRecords);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  } else if (req.url === "/kgl/procurement" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const record = JSON.parse(body);

        let currentRecords = [];
        if (fs.existsSync(dataRecords)) {
          currentRecords = JSON.parse(fs.readFileSync(dataRecords));
        }
        currentRecords.push(record);

        fs.writeFileSync(dataRecords, JSON.stringify(currentRecords, null, 2));
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: uc.upperCase("Recorded"), data: record }),
        );
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Page Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("Server is running at http://localhost:3000");
});
