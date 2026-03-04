const express = require('express');
const router = express.Router();
const list_middleware = require('../middlewares/list_middleware');
const list = require("../functions/list");
const signup = require('../functions/signup');
const login = require('../functions/login');
// Import your script routes here
router.use('/api_lib');
router.post('/signup', signup);
router.post('/login', login);
router.get('/list', list_middleware, list);
router.delete('/delete', (req, res) => {});
module.exports = router;