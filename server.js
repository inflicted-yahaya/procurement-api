const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // GET Route
  if (req.url === "/kgl/procurement" && req.method === "GET") {
    // Handle case where file might not exist yet
    if (!fs.existsSync("data.json")) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify([]));
    }

    const data = fs.readFileSync("data.json");
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(data);
  }

  // POST Route
  if (req.url === "/kgl/procurement" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const newRecord = JSON.parse(body);

      // Read existing data or start with empty array
      let records = [];
      if (fs.existsSync("data.json")) {
        records = JSON.parse(fs.readFileSync("data.json"));
      }

      // Append new record
      records.push(newRecord);

      // Write back to file
      fs.writeFileSync("data.json", JSON.stringify(records));

      // Return success
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Created" }));
    });
  }
});

server.listen(3000);
