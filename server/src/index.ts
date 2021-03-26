import express from "express";
import { json } from "body-parser";
import redis from "redis";

const app = express();
app.use(json());

const redisClient = redis.createClient({
  host: "redis-cluster-ip-service",
  port: 6379,
});

redisClient.on("connect", function () {
  console.log("connected");
});
redisClient.on("error", function (error) {
  console.error(error, "this is error");
});
app.get("/api/", (req, res) => {
  res.send("Hi");
});

app.post("/api/values", async (req, res) => {
  const index = req.body.index;

  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high");
  }

  redisClient.set("key", "value");
  res.send({ working: true });
});

app.listen(3000, () => {
  console.log("Listening on port 3000!!!!!!!!");
});
