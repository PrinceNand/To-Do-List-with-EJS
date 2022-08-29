const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = ["Reading Bible", "Gym"];
let workList = [];

// getting the date
let today = new Date();
let option = {
  weekday: "long",
  day: "numeric",
  month: "long",
};
let day = today.toLocaleDateString("en-US", option);

// home list
app.get("/", function (req, res) {
  res.render("list", { titleList: day, newListitem: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
// console.log(req.body);
  if (req.body.list === "Work List") {
    workList.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});



// work list
app.get("/work", function (req, res) {
  res.render("list", { titleList: "Work List", newListitem: workList });
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
