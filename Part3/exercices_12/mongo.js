const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = `mongodb+srv://mohamedbellaj:${password}@cluster0.jma0x.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);
if (number && name) {
  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then((result) => {
      console.log(`added ${person}  name  ${name} to phone book`);
      mongoose.connection.close();
    })
    .catch((error) => {
      console.log("erreur saving person", error);
      mongoose.connection.close();
    });
} else {
  Person.find({})
    .then((result) => {
      console.log("phonebook:");
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    })
    .catch((error) => {
      console.log("erreur saving person", error);
      mongoose.connection.close();
    });
}
