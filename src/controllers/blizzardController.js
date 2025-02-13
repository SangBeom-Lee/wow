const blizzardService   = require('../services/blizzardService');
const blizzardCharacter   = require('../services/blizzardCharacter');
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
        const service       = new blizzardService(config);
        const item          = new blizzardCharacter();
        const params        = req.query;

        //토큰
        let accessToken     = res?.cookies?.accessToken;
        if(!accessToken){
            accessToken     = await service.getToken();
            res.cookie('accessToken', accessToken);
        }

        //캐릭터 정보
        const character     = await service.getInfo(accessToken, params, "character");
        const items         = await item.getEquipment(accessToken, params);
        const imageInfo     = await service.getInfo(accessToken, params, "media");
        const image         = service.getKeyValueImage(imageInfo, 'assets');


        //쐐기 정보
        const mythicInfo    = await service.getInfo(accessToken, params, "mythic");

        //현재 시즌
        const season        = await service.getInfo(accessToken, params, "season");

        //쐐기 정보
        params.season       = season.current_season.id;
        const mythic        = await service.getInfo(accessToken, params, "mythicSeason");

        const data          = {
            character       : character,
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