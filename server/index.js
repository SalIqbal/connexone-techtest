// server/index.js
const express = require("express");
const cors = require("cors");
const proMiddleware = require("express-prometheus-middleware");
const { authenticate } = require("./middleware/authorization");
const PORT = 3001;

const app = express();
app.use(cors());
app.use(
  proMiddleware({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    authenticate: authenticate,
    normalizeStatus: false,
  })
);

app.get("/time", authenticate, (req, res) => {
  return res.json({ epoch: Math.round(Date.now() / 1000) });
});
// forcing prometheus to throw 403 as its throwing 404 on every ocassion
app.use((req, res) => res.status(403).send("Unauthorised Request"));
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
