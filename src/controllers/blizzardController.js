const blizzardService   = require('../services/blizzardService');       //블리자드 연동 서비스
const blizzardCharacter = require('../services/blizzardCharacter');     //캐릭터 서비스
const blizzardMythic    = require('../services/blizzardMythic');        //쐐기정보 서비스
const config            = require('../config/blizzardConfig');

class blizzardController {

    constructor (){
        this.getIndex       = this.getIndex.bind(this);
        this.getCharacter   = this.getCharacter.bind(this);
    }

    async getIndex (req, res, next){
        try {
            const params        = req.query;
            const data          = {
                
            };
            res.render('index/index', data);
        } catch (error) {
            next(error); // 에러를 미들웨어로 전달
        }
    }

    async getCharacter (req, res, next){
        try {
            const params        = req.query;
            const service       = new blizzardService(config);
    
            //토큰
            let accessToken     = res?.cookies?.accessToken;
            if(!accessToken){
                accessToken     = await service.getToken();
                res.cookie('accessToken', accessToken);
            }
    
            params.accessToken  = accessToken;
    
            //캐릭터 정보
            const character     = new blizzardCharacter(params);
            const characterInfo = await character.getCharacter();
    
            //쐐기 정보
            const mythic        = new blizzardMythic(params);
            const mythicInfo    = await mythic.getMythicInfo();
    
            const data          = {
                characterInfo   : characterInfo,
                mythicInfo      : mythicInfo
            };
    
            res.render('character/view', data);
        } catch (error) {
            next(error); // 에러를 미들웨어로 전달
        }
    }
}

module.exports = new blizzardController();