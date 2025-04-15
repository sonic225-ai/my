import express from "express";
import { renderToString } from "react-dom/server";
import App from "./src/App.js";
import React from "react";
import fs from "fs";
import path from "path";

const PORT = process.env.PORT || 3000;
const app = express();

app.use("^/$", (req, res) => {
  const appHtml = renderToString(<App />);
  const indexFile = path.resolve("./public/index.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading index.html", err);
      return res.status(500).send("Error occurred");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    );
  });
});

app.use(express.static(path.resolve(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`SSR app running on http://localhost:${PORT}`);
});
