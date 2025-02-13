const express               = require('express');
const router                = express.Router();
const blizzardController    = require('../controllers/blizzardController');

// 라우트 정의
router.get('/', blizzardController.getIndex);
router.get('/character', blizzardController.getCharacter);

module.exports = router;
