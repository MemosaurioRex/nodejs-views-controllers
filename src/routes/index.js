let express = require('express');
let router = express.Router();

let LlamarController = require('../controllers/controller');

router.get('/', LlamarController.primeraFuncion);
module.exports = router;