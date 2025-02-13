const blizzardService   = require('./blizzardService');
const config            = require('../config/blizzardConfig');

class blizzardCharacter {

    #params                 = "";
    #service                = "";

    constructor(params){
        this.#params        = params;
        this.#service       = new blizzardService(config);
    }

    /**
     * 캐릭터 정보 불러오기
     * @returns
     */
    async getCharacter (){
        const result        = {};

        //캐릭터 정보 & 장비 & 이미지
        const character     = await this.#service.getInfo(this.#params.accessToken, this.#params, 'character');
        const items         = await this.getEquipment();
        const image         = await this.getCharacterImage();

        result.character    = character;
        result.items        = items;
        result.image        = image;
        
        return result;
    }
    
    async getCharacterImage (){
        const imageInfo     = await this.#service.getInfo(this.#params.accessToken, this.#params, "media");
        const image         = this.#service.getKeyValueImage(imageInfo, 'assets');

        return image;
    }

    /**
     * 아이템 정보 가공처리
     * @returns object
     */
    async getEquipment (){
        const result        = {};
        const equipment     = await this.#service.getInfo(this.#params.accessToken, this.#params, "equipment");
        const items         = equipment?.equipped_items;

        if(items){
            const promises  = Object.values(items).map(async (gear) => {
                const data  = {id: gear.item.id};
                const media = await this.#service.getInfo(this.#params.accessToken, data, "equipment_media");
    
                return {
                    type    : gear.slot.type,
                    name    : gear.name,
                    src     : media.assets[0].value,
                    level   : gear.level.value
                };
            });

            const results   = await Promise.all(promises);
            results.forEach((row) => {
                result[row.type] = row;
            });
        }

        return result;
    }

}

module.exports = blizzardCharacter;