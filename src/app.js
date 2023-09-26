const express = require("express");
const cors = require("cors");
const app = express();
const handeError = require("./handle-error");
const RiceDiseasesController = require("./controllers/RiceDiseasesController");

app.use(cors());
app.get("/", (req, res) => res.json({ message: "Hello World!" }));

app.route("/api/rice-diseases").get(RiceDiseasesController.getAllRiceDiseases);

app.use((req, res, next) => {
    return next(new handeError(404, "Resource not found"));
});
app.use((error, req, res) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

module.exports = app;
