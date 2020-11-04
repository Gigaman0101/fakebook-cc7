const routes = require('express').Router();
const userControllers = require('../controllers/user')

const passport = require('passport');

const auth = passport.authenticate("jwt", { session: false });

routes.post("/login", userControllers.login)
routes.post("/register", userControllers.register)
routes.put("/resetpassword", auth, userControllers.resetPassWord);

module.exports = routes;