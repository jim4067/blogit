const jwt = require('jsonwebtoken');
const blog_router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blog_router.get('/', async (req, res) => {
    const fetched_blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 });

    res.json(fetched_blogs);
});

blog_router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const found_blog = await Blog.findById(id);
    if (found_blog) {
        res.json(found_blog);
    } else {
        res.status(404).end();
    }
});

//this here might be problematic -> move it into its own middleware
const get_token_from = req => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        return authorization.substring(7);
    }
    return null;
}
//this here might be problematic -> move it into its own middleware

blog_router.post('/', async (req, res) => {
    const body = req.body;
    const token = req.token;

    const decoded_token = jwt.verify(token, process.env.SECRET);

   // console.log("the token is ", token);
   // console.log("the decoded_id ", decoded_token);

    if (!token || !decoded_token.id) {
        return res.status(401).json({ error: "token missing or invalid" })
    }

    const user = await User.findById(decoded_token.id);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    });

    const saved_blog = await blog.save();
    user.blogs = user.blogs.concat(saved_blog._id);
    await user.save();

    res.status(201).json(saved_blog);
});

blog_router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const blog = {                              //incase of errors with put -> start here
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body._user                        //suspicious about this. Is it body._user || body.user
    }

    const updated_blog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    res.json(updated_blog);
});

blog_router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const token = req.token;

    const decoded_id = jwt.verify(token, process.env.SECRET);
    if (!decoded_id) {
        res.status(401).json({ error: "invalid token" });
    }

    const blog = await Blog.findById(id);
    const user = await User.findById(decoded_id.id);

    if (user._id.toString() === blog.user._id.toString()) {         //so beginning this line with blog.user.id caused the bug
        await Blog.findByIdAndDelete(blog._id);                  //if still errors try mongoose.remove()
        res.status(204).end();
    } else {
        //console.log("decoded id....", decoded_id)             //returns what is expected
        console.log("the blog.user._id", blog.user._id);
        console.log("the user._id", user._id);
        console.log("the blog._id is", blog._id);
        res.status(500).end();
    }
});

module.exports = blog_router;
