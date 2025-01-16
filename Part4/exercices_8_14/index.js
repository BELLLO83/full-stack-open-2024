// const express = require("express");
// const app = express();
// const cors = require("cors");
// const mongoose = require("mongoose");

// const blogSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number,
// });

// const Blog = mongoose.model("Blog", blogSchema);

// const mongoUrl =
//   "mongodb+srv://mohamedbellaj:seWMNZSxYXC1uSAb@cluster0.jma0x.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(mongoUrl);

// app.use(cors());
// app.use(express.json());

// app.get("/api/blogs", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

// app.post("/api/blogs", (request, response) => {
//   const blog = new Blog(request.body);

//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

// const PORT = 3003;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const app = require("./app"); // the actual Express application
const config = require("./utils/config");
const logger = require("./utils/logger");

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
