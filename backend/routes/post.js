const postControllers = require('../controllers/post');
const router = require('express').Router();
const passport = require('passport');

const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, postControllers.getAllMyPosts);
router.get("/feed", auth, postControllers.getMyFeed);
router.post("/", auth, postControllers.createPost);
router.put("/:id", auth, postControllers.updatePost);
router.delete("/:id", auth, postControllers.deletePost);

module.exports = router;