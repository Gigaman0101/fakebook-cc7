const db = require('../models');

const getAllPosts = async (req, res) => {
    const allPosts = await db.Post.findAll({ where: { user_id: req.user.id } })
    res.status(200).send(allPosts);
};

const getPostById = async (req, res) => {
    const targetPost = await db.Post.findOne({ where: { id: req.params.id } });
    if (targetPost && targetTPost.user_id === req.user.id) {
        res.status(200).send(targetPost);
    } else {
        res.status(404).send({ message: "Not found post" });
    }
}

const createPost = async (req, res) => {
    const { caption, picture_url } = req.body;
    const newPost = await db.Post.create({
        caption,
        picture_url,
        user_id: req.user.id,
    });

    res.status(201).send(newPost);
};

const updatePost = async (req, res) => {
    const targetPost = await db.Post.findOne({ where: { id: req.params.id } });

    if (targetTodo && targetTodo.user_id === req.user.id) {
        await targetPost.update({ task: req.body.task });
        res.status(200).send({ message: "Already updated" });
    } else {
        res.status(404).send({ message: "Not found" });
    }
};

const deletePost = async (req, res) => {
    const targetPost = await db.Post.findOne({ where: { id: req.params.id } });

    if (targetPost && targetPost.user_id === req.user.id) {
        await targetPost.destroy();
        res.status(200).send({ message: "Already deleted" });
    } else {
        res.status(404).send({ message: "Not found" });
    }
};


module.exports = {
    getAllPosts,
    getPostById,
    updatePost,
    createPost,
    deletePost
}