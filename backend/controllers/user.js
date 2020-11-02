const db = require('../models');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');



const register = async (req, res)=> {
    const { username, password, firstName, lastName, birthday, profile_url } = req.body;
    const targetUser = await db.User.findOne({where: {username}})
    if (targetUser) {
        res.status(400).send({message: "user already taken."})
    } else {
        const salt = bcryptjs.genSaltSync(12);
        const hashPassword = bcryptjs.hashSync(password, salt);
        await db.User.create({ username, password: hashPassword, firstName, lastName, birthday, profile_url} )
    }
    res.status(201).send({message: "User is created"});

}

const login = async (req, res) => {
    const { username, password } = req.body;
    const targetUser = await db.User.findOne({where: {username}})

    if (!targetUser) {
        res.status(400).send({message : 'Invalid user'})
    } else {
        const isCorrect = bcryptjs.compareSync(password, targetUser.password)

        if (isCorrect) {
            const payload = { id: targetUser.id, username: targetUser.username };
            const token = jwt.sign(payload, 'CODECAMP7', {expiresIn: 3500});
            res.status(200).send({token})
        } else {
            res.status(400).send({message: "Wrong password"})
        }
    }
}

module.exports = {register, login}
// const login = 