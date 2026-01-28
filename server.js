const http = require("http");
// Routing, Handling different requests
// const server = http.createServer((req, res) => {
//   if (req.url === "/sales") {
//     res.end("Welcome to the Sales Department");
//   } else if (req.url === "/procurement") {
//     res.end("Procurement Office is open");
//   } else {
//     res.writeHead(404);
//     res.end("Page Not found");
//   }
// });

// server.listen(3000);

const server2 = http.createServer((req, res) => {
  if (req.url === "/kgl/info") {
    const info = {
      branches: ["Maganjo", "Matugga"],
      status: "Active",
    };

    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(JSON.stringify(info));
  } else {
    res.end("Welcome to the KGL Server. Go to /kgl/info to see data");
  }
});

server2.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.error(
      "Error: Port 3000 is already in use. Close your other terminal or use a different port",
    );
  } else {
    console.error("Server error:", e);
  }
});

server2.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
