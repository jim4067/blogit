const testing_router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');


testing_router.post('/reset', async (req, res) => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    res.status(204).end();
});

module.exports = testing_router;