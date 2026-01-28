// const fs = require("fs");

// const content = "This is a log from out first node.js app";

// fs.writeFile("log.txt", content, (err) => {
//   if (err) {
//     console.log("Error writing file:", err);
//   } else {
//     console.log("File saved successfuly!");
//   }
// });

const fs = require("fs");

const kglConfig = {
  branch: "Matugga",
  location: "Entebbe",
  active: true,
};

const dataString = JSON.stringify(kglConfig);

fs.writeFile("kgl_config.json", dataString, (err) => {
  if (!err) console.log("Config file created");
});

fs.readFile("kgl_config.json", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file:", err);
    return;
  }

  console.log("Raw String", data);

  const configObject = JSON.parse(data);

  console.log("Branch Name", configObject.branch);
});

// ROBUST PATHS
const path = require("path");

const logPath = path.join("logs", "2024", "audit.log");

console.log("Constructed Path:", logPath);

console.log("File Extension:", path.extname(logPath));

// DELETE FILES
fs.unlink("log.txt", (err) => {
  if (err) {
    console.log("Could not delete file:", err);
  } else {
    console.log("File deleted successfully");
  }
});
