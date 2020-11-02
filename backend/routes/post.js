const postControllers = require('../controllers/post');
const router = require('express').Router();
const passport = require('passport');

const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, postControllers.getAllPosts);
router.get("/:id", auth, postControllers.getPostById);
router.post("/", auth, postControllers.createPost);
router.put("/:id", auth, postControllers.updatePost);
router.delete("/:id", auth, postControllers.deletePost);

module.exports = router;