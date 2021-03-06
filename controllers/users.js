
const bcrypt = require('bcrypt');
const user_router = require("express").Router();
const User = require('../models/user');

user_router.get('/', async (req, res) => {
    const users = await User
        .find({})
        .populate('blogs');

    res.json(users);
});

user_router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const found_user = await User
        .findById(id)
        .populate('blogs');
        
    if (found_user) {
        res.json(found_user);
    } else {
        res.status(404).end();
    }
});

user_router.post('/', async (req, res) => {
    const body = req.body;

    const salt_rounds = 10;
    const password_hash = await bcrypt.hash(body.password, salt_rounds);

    const user = new User({
        username: body.username,
        name: body.name,
        password_hash
    });

    const saved_user = await user.save();

    res.json(saved_user);
});

module.exports = user_router;