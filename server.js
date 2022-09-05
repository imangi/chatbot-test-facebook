const express = require("express");
let crypto = require("crypto");
let path = require("path");
const dotenv = require("dotenv");
const config = require("./services/config");
dotenv.config();

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const VERIFY_TOKEN = config.VERIFY_TOKEN;
//app.use(json({ verify: verifyRequestSignature }));

app.use(express.static(path.join(path.resolve(), "public")));
app.set("viewEngine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});
app("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("webhook verified");
      res.status(200).send(challenge);
    } else {
      res.status(403);
    }
  }
});
app.post("/webhook", (req, res) => {
  let body = req.body;
  console.log(" received webhook");
  console.dir(body, { depth: null });
  if (body.object === page) {
    res.status(200).send("EVENT RECEIVED");

    body.entry.forEach(async (entry) => {
      if ("changes" in entry) {
        let ReceivedMessage = new Received();
      }
    });
  }
});

const listner = app.listen(config.PORT, () => {
  console.log("messenger bot is running at port" + config.PORT);
});
