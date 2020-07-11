const Blog = require('../models/blog')
const blog_router = require('express').Router();

blog_router.get('/' , (req, res, next) => {
    Blog.find({})
        .then((blogs) => {
            res.json(blogs)
        })
});

blog_router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((blogs) => {
            if(blogs) {
                res.json(blogs);
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            next(err);
        })
});

blog_router.post('/', (req, res, next) => {
    const blog = new Blog(req.body);

    blog.save()
        .then( (result) => {
            res.status(201).json(result)
        })
        .catch((err) => {
            next(err);
        })
});

module.exports = blog_router;