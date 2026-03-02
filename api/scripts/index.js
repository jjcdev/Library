const express = require('express');
const router = express.Router();

// Import your script routes here
const exampleScriptRoute = require('./exampleScriptRoute');
router.use('/example-script', exampleScriptRoute);
router.get('/signup', (req, res) => {});
router.get('/login', (req, res) => {});
router.get('/search', (req, res) => {});
router.get('/find', (req, res) => {});
module.exports = router;