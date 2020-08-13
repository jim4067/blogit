const blog_router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blog_router.get('/', async (req, res) => {
    const fetched_blogs = await Blog.find({})
                                    .populate('user', {username : 1, name : 1 });
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

blog_router.post('/', async (req, res) => {
    const body = req.body;

    const user = await User.findById(body.user_id);

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

    res.json(saved_blog);
});

blog_router.put('/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    const updated_blog = await Blog.findByIdAndUpdate(id, body , { new: true });
    res.json(updated_blog);
});

blog_router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    await Blog.findByIdAndDelete(id);
    res.json(204).end();
});

module.exports = blog_router;