const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
const cors = require("cors");
const Person = require("./models/person");

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

morgan.token("req-body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((persons) => {
      if (persons) {
        res.json(persons);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next());
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({ error: "name missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

// app.get("/api/persons", (req, res) => {
//   res.send(persons);
// });

// app.get("/info", (req, res) => {
//   res.send(`Phonebook has info for ${persons.length} people. <br/> ${Date()}`);
// });

// app.get("/api/persons/:id", (req, res) => {
//   const id = req.params.id;

//   const person = persons.find((person) => person.id === id);

//   if (!person) {
//     res.status(404).send(`person with the id :${id} is not found`);
//   }

//   res.send(person);
// });

// const generatedId = () => {
//   const maxId =
//     persons.length > 0 ? Math.floor(Math.random() * (200 - 5 + 1) + 5) : 0;
//   return maxId + 1;
// };

// app.post("/api/persons", (req, res) => {
//   const body = req.body;
//   body.id = generatedId();
//   if (!body.name || !body.number) {
//     res.status(404).json({ erroe: "name or number is missing" });
//   }
//   const existingName = persons.find((person) => person.name === body.name);
//   if (existingName) {
//     res.status(400).json({ error: "name must be unique" });
//   }
//   persons = persons.concat(body);
//   res.status(201).send(persons);
// });
// app.delete("/api/persons/:id", (req, res) => {
//   const id = req.params.id;

//   let deletedPerson = persons.filter((person) => person.id !== id);
//   res.send(deletedPerson);
// });

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  const { number } = req.body;
  Person.findByIdAndUpdate(id, { number }, { new: true })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res, next) => {
  const { id } = req.params;
  Person.find()
    .then((personEntry) => {
      res.send(
        `Phonebook has ifo for ${personEntry.length}  people. \n ${Date()}`
      );
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
