const express = require("express");
const server = express();
const fs = require("fs");
const sharp = require("sharp");

function resize(path, width, height) {
  const readStream = fs.createReadStream(path);
  let transform = sharp();

  if (width || height) {
    transform = transform.resize(width, height);
  }

  return readStream.pipe(transform);
}

server.get("/", (req, res) => {
  const widthString = req.query.width;
  const heightString = req.query.height;
  const path = req.query.path;

  let width, height;
  if (widthString) {
    width = parseInt(widthString);
  }
  if (heightString) {
    height = parseInt(heightString);
  }

  res.type(`image/png`);

  resize(path, width, height).pipe(res);
});

server.listen(8000, () => {
  console.log("Server started!");
});
