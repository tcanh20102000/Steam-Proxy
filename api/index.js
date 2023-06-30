var express = require("express");
var cors = require("cors");

var getMultiAppRouter = require("../routes/getNAppsAPI.js");
var homeRouter = require("../routes/homeAPI.js");
var getSingleAppRouter = require("../routes/getAppDetail.js");



const app = express();

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);

app.use(cors());
app.use('/', homeRouter);
app.use("/get_app_detail", getSingleAppRouter);
app.use("/get_multi_apps", getMultiAppRouter);


// app.use((req, res, next) => {
//   res.append("Access-Control-Allow-Origin", ["*"]);
//   res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.append("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on PORT${PORT}`));

module.exports = app;