const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

const data = require("./data.json");


app.get("/modules", (req, res) => {
    res.send(data.modules);
});

app.get("/module_groups", (req, res) => {
    res.send(data.moduleGroups);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
