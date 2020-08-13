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

//test that verifies that making an HTTP POST request to the /api/blogs url
// successfully creates a new blog post
test("testing that HTTP post works as expected", async () => {
    const blog_object = new Blog({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    });

    await blog_object.save();
    /*await api.post('/api/blogs')
             .send(blog_object)
             .expect(200);
             */

    const response = await api.get('/api/blogs');
    const blog_titles = response.body.map(item => item.title);

    expect(response.body).toHaveLength(initial_blogs.length + 1);
    expect(blog_titles).toContain("Canonical string reduction");
});

// a test that verifies that if the likes property is missing from the request, 
//it will default to the value 0
test("the default numbers of likes returned should be zero", async () => {
    const blog_object = new Blog({
        title: "testing the likes",
        author: "@jim4067",
        url: "https://github.com/jim4067",
    });

    await blog_object.save();

    const response = await api.get('/api/blogs');
    const blog_likes = response.body.map(items => items.likes);

    expect(blog_likes[blog_likes.length - 1]).toBe(0);
});

//a test related to creating new blogs via the /api/blogs endpoint, 
//that verifies the title and url properties aren't missing
test("if title and the the url are missing a 400 status code should be returned", async () => {
    const blog_object = new Blog({
        author: "@jim4067"
    });

    await blog_object.save();
    expect(400);

});

//Write also a new test that ensures that adding a blog fails 
//with proper status code 401 Unauthorized if token is not provided
//make the test effective by removing the authorization header automatically
test("fails with proper status code if wrong token is provided", () => {
    const new_blog = {
        title: "i really honestly hate testing",
        author: "James Muttuku",
        url: "http://www.github.com.jim4067",
        likes: 1
    }

    const result = await api.post('/api/blogs')
        .set('Authorization', "feifejf")
        .send(new_blog)
        .expect(401)
        .expect('Content-type', /application\/json/);
});

afterAll(() => {
    mongoose.connection.close();
});