const { Router } = require('express');

const routes = require('express').Router();
const userControllers = require('../controllers/user')

routes.post("/login", userControllers.login)
routes.post("/register", userControllers.register)

module.exports = routes;