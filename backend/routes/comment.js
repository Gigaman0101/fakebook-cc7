const router = require('express').Router();
const commentControllers = require('../controllers/comment');
const passport = require('passport');

const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, commentControllers.getAllComments);
router.get("/:id", auth, commentControllers.getCommentById);
router.post("/", auth, commentControllers.createComment);
router.put("/:id", auth, commentControllers.updateComment);
router.delete("/:id", auth, commentControllers.deleteComment);

module.exports = router;