const blizzardService   = require('./blizzardService');
const config            = require('../config/blizzardConfig');

class blizzardMythic {

    #params                 = "";
    #service                = "";

    constructor(params){
        this.#params        = params;
        this.#service       = new blizzardService(config);
    }

    /**
     * 캐릭터 쐐기정보
     * @returns {{season: 현재 시즌 정보, data: 현재 시즌 캐릭터별 정보}}
     */
    async getMythicInfo() {
        const result        = {};
        const season        = await this.#getCurrentSeason();
        this.#params.season = season.current_season.id;
        const data          = await this.#getSeasonMythicCharacter();

        result.season       = season;
        result.data         = data;

        return result;
    }

    /**
     * 현재시즌 정보
     * @returns {object}
     */
    async #getCurrentSeason(){
        const season        = await this.#service.getInfo(this.#params.accessToken, this.#params, "season");
        return season;
    }

    /**
     * 시즌 & 캐릭터 별 쐐기 정보
     * @returns {object}
     */
    async #getSeasonMythicCharacter(){
        const data          = await this.#service.getInfo(this.#params.accessToken, this.#params, "mythicSeason");
        return data;
    }

}

module.exports = blizzardMythic;