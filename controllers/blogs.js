const Blog = require('../models/blog');
const blog_router = require('express').Router();

blog_router.get('/', async (req, res) => {
    const fetched_blogs = await Blog.find({});
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
    const blog = new Blog(req.body);

    const saved_blog = await blog.save();
    res.status(201).json(saved_blog);
});

blog_router.put('/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    const blog_to_change = {
        likes: body.title
    };

    const updated_blog = await Blog.findByIdAndUpdate(id, blog_to_change, { new: true });
    res.json(updated_blog);
});

blog_router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    await Blog.findByIdAndDelete(id);
    res.json(204).end();
});

module.exports = blog_router;