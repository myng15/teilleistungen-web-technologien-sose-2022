const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
//app.use(express.static('public'));
//app.use('/favicon.ico', express.static('/public/img'));

const data = require("./data.json");
// Not working:
// const fs = require('fs');
// fs.readFile("./data.json", "utf8", (err, jsonString) => {
//     if (err) {
//       console.log("Error reading file:", err);
//       return;
//     }
//     try {
//       const data = JSON.parse(jsonString);
//       return data; 
//     } catch (err) {
//       console.log("Error parsing JSON string:", err);
//       return;
//     }
//   });


app.get("/modules", (req, res) => {
    res.send(data.modules);
});

app.get("/module_groups", (req, res) => {
    res.send(data.moduleGroups);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
