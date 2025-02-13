const blizzardService   = require('./blizzardService');
const config            = require('../config/blizzardConfig');

class blizzardCharacter {

    /**
     * 아이템 정보 가공처리
     * @param {string} accessToken 
     * @returns object
     */
    async getEquipment (accessToken, params){
        const result        = {};
        const service       = new blizzardService(config);
        const equipment     = await service.getInfo(accessToken, params, "equipment");
        const items         = equipment?.equipped_items;

        if(items){
            const promises  = Object.values(items).map(async (gear) => {
                const data  = {id: gear.item.id};
                const media = await service.getInfo(accessToken, data, "equipment_media");
    
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