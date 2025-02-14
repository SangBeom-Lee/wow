const config                = require('../config/blizzardConfig');
const blizzardService       = require('../services/blizzardService');       //블리자드 연동 서비스

class blizzardPostController {

    #service                = "";

    constructor (){
        this.#service       = new blizzardService(config);
        this.getCharacter   = this.getCharacter.bind(this);
    }

    async getCharacter(req, res, next){
        const params        = req.query;

        //토큰
        let accessToken     = res?.cookies?.accessToken;
        if(!accessToken){
            accessToken     = await service.getToken();
            res.cookie('accessToken', accessToken);
        }
    }

}

module.exports = new blizzardPostController;