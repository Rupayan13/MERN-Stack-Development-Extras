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

//Find Method
async function dbQuries() {
  try {
    const fruitsAll = await Fruit.find({});
    //Once we are done withh mongoose, then close the connection.
    mongoose.connection.close();
    fruitsAll.forEach((fruit)=>{
      console.log(fruit.name);
    })
  } catch (err) {
    console.log(err);
  }
};
// dbQuries();




//New Collection Created

const personSchema=new mongoose.Schema({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name:"Rupayan",
  age: 21
});

// person.save();