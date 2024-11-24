const express = require("express");
const fs = require("fs");
const zlib = require("zlib");
const expressStatus = require("express-status-monitor");

const app = express();

app.use(expressStatus());

fs.createReadStream("./test.txt").pipe(
  zlib.createGzip().pipe(fs.createWriteStream("./zipfile.zip"))
);

app.get("/", async (req, res) => {
  const stream = fs.createReadStream("./test.txt", "utf-8");
  stream.on("data", (chunk) => {
    res.write(chunk);
  });
  stream.on("end", () => res.end());
});

app.use((req, res) => {
  res.status(404).send("Route not found 📍");
});

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is Running at PORT:- ${PORT} 🚀`);
});

// Follow official docs to read more:-
//  https://nodejs.org/api/cluster.html
