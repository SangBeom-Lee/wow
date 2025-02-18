const config                = require('../config/blizzardConfig');
const blizzardService       = require('../services/blizzardService');       //블리자드 연동 서비스
const blizzardCharacter     = require('../services/blizzardCharacter');     //캐릭터 서비스

class blizzardPostController {

    #service                = "";

    constructor (){
        this.#service       = new blizzardService(config);
        this.getCharacter   = this.getCharacter.bind(this);
    }

    async getCharacter(req, res, next){
        const params        = req.body;

        //토큰
        let accessToken     = res?.cookies?.accessToken;
        if(!accessToken){
            accessToken     = await this.#service.getToken();
            res.cookie('accessToken', accessToken);
        }
        params.accessToken  = accessToken;
        
        const character     = new blizzardCharacter(params);
        console.log(character);
        const characterInfo = await character.getCharacterOnly();

        res.json(characterInfo);
    }

}

module.exports = new blizzardPostController();