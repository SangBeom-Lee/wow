const blizzardService   = require('../services/blizzardService');
const blizzardCharacter = require('../services/blizzardCharacter');
const config            = require('../config/blizzardConfig');

exports.getIndex        = async (req, res, next) => {
    try {
        const service       = new blizzardService(config);
        const params        = req.query;

    } catch (error) {
        console.log(error);
        next(error); // 에러를 미들웨어로 전달
    }
}

exports.getCharacter = async (req, res, next) => {
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
        const character     = new blizzardCharacter(params);

        //캐릭터 정보
        const {
            info,
            items,
            image
        }                   = await character.getCharacter();

        //쐐기 정보
        const mythicInfo    = await service.getInfo(accessToken, params, "mythic");
        console.log(mythicInfo);

        //현재 시즌
        const season        = await service.getInfo(accessToken, params, "season");

        //쐐기 정보
        params.season       = season.current_season.id;
        const mythic        = await service.getInfo(accessToken, params, "mythicSeason");

        const data          = {
            info            : info,
            items           : items,
            image           : image,
            mythicInfo      : mythicInfo,
            mythic          : mythic
        };

        res.render('character/view', data);
    } catch (error) {
        console.log(error);
        next(error); // 에러를 미들웨어로 전달
    }
};