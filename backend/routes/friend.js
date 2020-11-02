const router = require('express').Router();
const friendControllers = require('../controllers/friend');
const passport = require('passport');

const auth = passport.authenticate("jwt", { session: false })

router.get("/", auth, friendControllers.getAllFriends);
router.get("/:id", auth, friendControllers.getFriendById);
router.post("/", auth, friendControllers.createFriend);
router.put("/:id", auth, friendControllers.updateFriend);
router.delete("/:id", auth, friendControllers.deleteFriend);

module.exports = router;