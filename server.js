import express from "express";

const port = process.env.PORT || 8080;
const app = express();

app.use("", express.static("src"));

app.listen(port, () => {
  console.log(`Flappy Bird is running at http://localhost:${port}`);
});
