const express = require('express');

const itemRoutes = require('./routes/itemRoutes')
const middleware = require("./middleware");

const app = express();

const ExpressError = require('./expressError');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this applies to all requests at all paths
// app.use(middleware.logger);

app.use("/items", itemRoutes);




/** general error handler */
app.use(function (req, res, next) {
  const err = new ExpressError("Not Found",404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */
app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

module.exports = app;