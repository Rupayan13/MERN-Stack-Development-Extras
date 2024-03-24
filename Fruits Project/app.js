const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema=new mongoose.Schema({
  name: {
    type: String, 
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1, 
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

//Insert Method
const fruit = new Fruit({
  name:"Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

// fruit.save();

const kiwi = new Fruit({
  name:"Kiwi",
  rating: 10,
  review: "The best fruit!"
});

const orange = new Fruit({
  name:"Orange",
  rating: 4,
  review: "Too sour for me"
});

const banana = new Fruit({
  name:"Banana",
  rating: 3,
  review: "Weired texture"
});

// Fruit.insertMany([kiwi, orange, banana]);
async function insertCollection() {
  try {
    const docs = await Fruit.insertMany([kiwi, orange, banana]);
    console.log(docs);
  } catch (err) {
    console.log(err);
  }
};
// insertCollection();

//Find Method
async function readCollection() {
  try {
    const fruitsAll = await Fruit.find({});
    //Once we are done withh mongoose, then close the connection.
    mongoose.connection.close();
    fruitsAll.forEach((fruit)=>{
      console.log(fruit.name);
    });
  } catch (err) {
    console.log(err);
  }
};
// readCollection();

//Update a document in the fruits collection
async function updateCollection() {
  try {
    const docs = await Fruit.updateOne({_id: '65fe84f05c8960d64864f89d'}, {review: "Weired texture of it."});
    console.log(docs);
  } catch (err) {
    console.log(err);
  }
};
// updateCollection();

//Delete a document in the fruits collection
async function deleteCollection() {
  try {
    const docs = await Fruit.deleteOne({_id: '65fe84f05c8960d64864f89b'});
    console.log(docs);
  } catch (err) {
    console.log(err);
  }
};
// deleteCollection();




//New Collection Created

const personSchema=new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema 
});

//Create a relationship between people and fruits collection
const pineapple = new Fruit({
  name:"Pineapple",
  rating: 9,
  review: "Great fruit."
});
// pineapple.save();

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name:"Rupayan",
  age: 21,
  favouriteFruit: pineapple
});

// person.save();

//Delete some document in the fruits collection
async function deleteSomeCollection() {
  try {
    const docs = await Person.deleteMany({ name: "Rupayan", age: { $gte: 18 } });
    console.log(docs);
  } catch (err) {
    console.log(err);
  }
};
// deleteSomeCollection();