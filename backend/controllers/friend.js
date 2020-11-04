const db = require("../models");

const getAllFriends = async (req, res) => {
    const allFriends = await db.Friend.findAll({ where: { request_to_id: req.user.id } })
    res.status(200).send(allFriends);
};

const getFriendById = async (req, res) => {
    const targetFriend = await db.Friend.findOne({ where: { id: req.params.id } });
    if (targetFriend && targetFriend.request_to_id === req.user.id) {
        res.status(200).send(targetFriend);
    } else {
        res.status(404).send({ message: "Not Found friend" })
    }
};

const createFriend = async (req, res) => {
    const { status, request_to_id } = req.body;
    const targetFriend = await db.Friend.findOne({ where: { id: request_to_id } })
    if (targetFriend && status === "PENDING") {
        const newFriend = await db.Friend.create({
            status,
            request_to_id: req.user.id,
            request_by_id: targetFriend.id,
        });
        res.status(201).send(newFriend);
    } else {
        res.status(400).send({ message: `Not found friend ID: ${targetFriend.id}` })
    }
};

const updateFriend = async (req, res) => {
    const targetFriend = await db.Friend.findOne({ where: { id: req.params.id } })
    if (targetFriend && targetFriend.request_to_id === req.user.id) {
        await targetFriend.update({ status: req.body.status });
        res.status(200).send({ message: "Already Update" })
    } else {
        res.status(404).send({ message: "Not Found" })
    }
};

const deleteFriend = async (req, res) => {
    const targetFriend = await db.Friend.findOne({ where: { id: req.params.id } });

    if (targetFriend && targetFriend.request_by_id === req.user.id) {
        await targetFriend.destroy();
        res.status(200).send({ message: "Already deleted" });
    } else {
        res.status(404).send({ message: "Not found" });
    }
};

module.exports = {
    getAllFriends,
    getFriendById,
    updateFriend,
    createFriend,
    deleteFriend
}

