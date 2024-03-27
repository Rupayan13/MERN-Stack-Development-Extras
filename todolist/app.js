//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const lodash = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema={
  name: String
};

const Item = mongoose.model("Item", itemSchema);

const item1=new Item({
  name: "Welcome to your todolist!"
});

const item2=new Item({
  name: "Hit the + button to add the new item."
});

const item3=new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItem = [item1, item2, item3];

async function insertCollection() {
  try {
    const docs = await Item.insertMany(defaultItem);
    console.log(docs);
  } catch (err) {
    console.log(err);
  }
};

const listSchema={
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", async function(req, res) {
    try {
      const itemsAll = await Item.find({});
      if(itemsAll.length===0){
        insertCollection();
        res.redirect("/");
      }else{
        res.render("list", {listTitle: "Today", newListItems: itemsAll});
      } 
    } catch (err) {
      console.log(err);
    }
});

app.get("/:customListName", async function(req, res){
  const customListName = lodash.capitalize(req.params.customListName);
    try {
      const foundList = await List.findOne({name: customListName});
      if(!foundList){
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItem
        });
        list.save();
        res.redirect("/"+customListName);
      }else{
        //Show the existing list
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    } catch (err) {
      console.log(err);
    }
});

app.post("/", async function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem=new Item({
    name: itemName
  });

  if(listName === "Today"){
    newItem.save();
    res.redirect("/");
  }else{
    try {
      const foundList = await List.findOne({name: listName});
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/"+listName);
    } catch (err) {
      console.log(err);
    }
  }
});

app.post("/delete", async function(req, res){
  const checkItemId=req.body.checkbox;
  const listName = req.body.listName;

  if(listName==="Today"){
    try {
      const docs = await Item.findByIdAndDelete(checkItemId);
      console.log(docs);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }else{
    try {
      const docs = await List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkItemId}}});
      console.log(docs);
      res.redirect("/"+listName);
    } catch (err) {
      console.log(err);
    }
  }
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
