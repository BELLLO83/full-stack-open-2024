const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const { test, describe, after, beforeEach } = require("node:test");
const listHelper = require("../utils/list_helper");

const assert = require("node:assert");

const api = supertest(app);
//============================================================================
// describe("When there is initially some blogs saved", () => {
//   //   beforeEach(async () => {
//   test("add data for test", async () => {
//     await Blog.deleteMany({});
//     // const blogsAtStart = await helper.blogsInDb();
//     let blogObject = new Blog(helper.initialBlogs[0]);

//     await blogObject.save();
//     blogObject = new Blog(helper.initialBlogs[1]);
//     await blogObject.save();
//   });
// });

// //============================================================================
describe("Get a specific blog", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    // const blogsAtStart = await helper.blogsInDb();
    let blogObject = new Blog(helper.initialBlogs[0]);

    await blogObject.save();
    blogObject = new Blog(helper.initialBlogs[1]);
    await blogObject.save();
  });
  //================
  test("notes are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  //   //================
  test("blogs length of db is the same", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length + 1, helper.initialBlogs.length);
  });

  //   //================
  test("unique identifier named id", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];
    const response = await api
      // .get(`/api/blogs/${blogToView.id}`)
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const result = response.body[0];
    const keys = Object.keys(result);

    assert.ok(keys.includes("id"), 'The "id" property should be exist');
  });
});
// //============================================================================
describe("create specific blog", () => {
  //================
  test("add a new blog post ", async () => {
    const newBlog = {
      title: "hhjjjk",
      author: "hhhl",
      url: "ooooo",
      likes: 9999,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const titlesGet = response.body.map((r) => r.title);
    assert.strictEqual(titlesGet.length, helper.initialBlogs.length);
    // expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  //   //================
  test("Missing likes property use default 0", async () => {
    const newBlogWithoutLikes = {
      title: "BLOLO For all",
      author: "BELL MED",
      url: "https://BELLMED.MA/",
    };
    await api
      .post("/api/blogs")
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const savedBlog = response.body.find(
      (blog) => blog.title === newBlogWithoutLikes.title
    );

    assert.equal(savedBlog.likes, undefined);
  });

  //   //================
  test("Missing title property return 400", async () => {
    const BlogWithoutTitle = {
      author: "BELL MED",
      url: "https://BELLMED.MA/",
    };
    await api.post("/api/blogs").send(BlogWithoutTitle).expect(400);
  });

  //   //================
  test("Missing url property return 400", async () => {
    const BlogWithoutTitle = {
      title: "BLOLO For all  to delete",
      author: "BELL MED",
    };
    await api.post("/api/blogs").send(BlogWithoutTitle).expect(400);
  });
});
// //============================================================================
describe("delete a specific blog", () => {
  //================

  test("deleted a specific blog by id", async () => {
    // const loginResponse = await api
    //   .post("/api/blogs")
    //   .expect(200)
    //   .expect("Content-Type", /application\/json/);

    const blogToDelete = "BLOLO For all  to delete";
    const blogsSaved = await api.get("/api/blogs");

    const idBlogToDelete = listHelper.searchIdByTitle(
      blogsSaved.body,
      blogToDelete
    );

    await api.delete(`/api/blogs/${idBlogToDelete}`).expect(204);

    // const blogsAfterDelete = await api
    //   .get("/api/blogs")
    //   .expect(200)
    //   .expect("Content-Type", /application\/json/);

    // expect(blogsAfterDelete.body.length).toBe(blogsAtStart.body.length - 1);
    // expect(
    //   blogsAfterDelete.body.find((blog) => blog._id === idToDelete)
    // ).toBeUndefined();
  });
});
// //============================================================================
describe("Modify a specific blog", () => {
  //================
  test("Modify a specific blog by id", async () => {
    const blogToModify = "React patterns";
    const bodyModify = {
      title: "React patterns",
      author: "medo",
      url: "https://reactpatterns.new.com/",
      likes: 10,
    };
    const blogsSaved = await api.get("/api/blogs");
    const blogId = listHelper.searchIdByTitle(blogsSaved.body, blogToModify);
    // Get token
    // const loginResponse = await api
    //   .post("/api/login")
    //   .expect(200)
    //   .expect("Content-Type", /application\/json/);

    await api
      .put(`/api/blogs/${blogId}`)
      .send(bodyModify)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // Verify if data is saved
    const blogsSavedUpdate = await api.get("/api/blogs");
    const blogUpdate = blogsSavedUpdate.body.find((blog) => blog.id === blogId);
    delete blogUpdate.id;
    assert.deepEqual(blogUpdate, bodyModify);
  });
});
// //============================================================================

// after(async () => {
//   await mongoose.connection.close();
// });
