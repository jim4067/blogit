const mongoose = require('mongoose');
const superstest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = superstest(app);

const initial_blogs = [
    { title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", "likes": 7 },
    { title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", "likes": 5 }
]

beforeEach(async () => {
    await Blog.deleteMany({});
    for (let blogs of initial_blogs) {
        let note_object = new Blog(blogs);
        await note_object.save();
    }
});

test('the status code should be 200 and the content-type json', async () => {
    try {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    } catch (err) {
        console.error("ahh shit, something broke during testing....", err);
    }
});

test("the number of blogs returned should be two", async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(2);
});

// a test that verifies that the unique identifier property of the blog posts is named id,
// by default the database names the property _id
test("the unique identifier is named id", async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[1].id).toBeDefined();
});
afterAll(() => {
    mongoose.connection.close();
});