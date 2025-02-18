const express                   = require('express');
const router                    = express.Router();
const blizzardController        = require('../controllers/blizzardController');
const blizzardPostController    = require('../controllers/blizzardPostController');

// 라우트 정의

//캐릭터 검색
router.post('/character', blizzardPostController.getCharacter);

//캐릭터 정보
router.get('/', blizzardController.getIndex);
router.get('/character', blizzardController.getCharacter);

module.exports = router;
