const db = require('../models');

const getAllComments = async (req, res) => {
    const allComments = await db.Comment.findAll({ where: { user_id: req.user.id } });
    res.status(200).send(allComments);
};

const getCommentById = async (req, res) => {
    const targetComment = await db.Comment.findOne({ where: { id: req.params.id } })
    if (targetComment && targetComment.user_id === req.user.id) {
        res.status(200).send(targetComment)
    } else {
        res.status(404).send({ message: "Not Found comment" })
    }
};

const createComment = async (req, res) => {
    const { comment } = req.body;
    const newComment = await db.Comment.create({
        comment,
        user_id: req.user.id,
        post_id: req.user.id,
    });

    res.status(201).send(newComment);
};

const updateComment = async (req, res) => {
    const targetComment = await db.Comment.findOne({ where: { id: req.params.id } });

    if (targetComment && targetComment.user_id === req.user.id) {
        await targetComment.update({ comment: req.body.comment });
        res.status(200).send({ message: "Already updated" });
    } else {
        res.status(404).send({ message: "Not found" });
    }
}

const deleteComment = async (req, res) => {
    const targetComment = await db.Comment.findOne({ where: { id: req.params.id } });

    if (targetComment && targetComment.user_id === req.user.id) {
        await targetComment.destroy();
        res.status(200).send({ message: "Already deleted" });
    } else {
        res.status(404).send({ message: "Not found" });
    }
};

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}