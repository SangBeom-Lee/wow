const axios     = require('axios');

class blizzardService {

    constructor (config){
        //기본 값
        this.config = config;
    }

    /**
     * 토큰 생성
     * @returns
     */
    async getToken (){
        const data      = `client_id=${process.env.BLIZZARD_CLIENDID}&client_secret=${process.env.BLIZZARD_CLIENDID_SECRET}&grant_type=client_credentials`;
        const res       = await axios.post(this.config.tokenUrl, data, {
            body: "grant_type=client_credentials",
        });
        
        const accessToken = res.data.access_token;
        if(accessToken){
            return accessToken;
        } else {
            return "";
        }
    }

    /**
     * 정보별 URL
     * @param {string} kind 
     * @param {object} params 
     * @returns {string}
     */
    getUrl (kind, params = {}){
        let url         = "";

        switch (kind){
            case "character":
                url     = `${this.config.apiBaseUrl}/profile/wow/character/${params.realm}/${params.name}?namespace=profile-kr&locale=ko_KR`;
                break;
            case "characterList":
                url     = `${this.config.apiBaseUrl}/profile/wow/character/${params.realm}/${params.name}?namespace=profile-kr&locale=ko_KR`;
                break;
            case "equipment":
                url     = `${this.config.apiBaseUrl}/profile/wow/character/${params.realm}/${params.name}/equipment?namespace=profile-kr&locale=ko_KR`;
                break;
            case "media":
                url     = `${this.config.apiBaseUrl}/profile/wow/character/${params.realm}/${params.name}/character-media?namespace=profile-kr&locale=ko_KR`;
                break;
            case "equipment_media":
                url     = `${this.config.apiBaseUrl}/data/wow/media/item/${params.id}?namespace=static-kr&locale=ko_KR`;
                break;
            case "season":
                url     = `${this.config.apiBaseUrl}/data/wow/mythic-keystone/season/index?namespace=dynamic-kr&locale=en_US`;
                break;
            case "realm":
                url     = `${this.config.apiBaseUrl}/data/wow/realm/index?region=kr&namespace=profile-kr&locale=en_US`;
                break;
            case "mythic":
                url     = `${this.config.apiBaseUrl}/profile/wow/character/${params.realm}/${params.name}/mythic-keystone-profile?namespace=profile-kr&locale=en_US`;
                break;
            case "mythicSeason":
                url     = `${this.config.apiBaseUrl}/profile/wow/character/${params.realm}/${params.name}/mythic-keystone-profile/season/${params.season}?namespace=profile-kr&locale=ko_KR`;
                break;
        }
    
        return url;
    }

    /**
     * 정보 불러오기
     * @param {string} accessToken 
     * @param {object} params 
     * @param {string} kind 
     * @returns 
     */
    async getInfo (accessToken, params = {}, kind){
        const url       = this.getUrl(kind, params);
        const response  = await axios.get(url, {
            validateStatus: function (status) {
                return status < 500; // 500 미만의 상태 코드는 에러로 처리하지 않음
            },    
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
    
        if(response.status == 200){
            return response.data;
        } else {
            return [];
        }
    }

    /**
     * 이미지 경로 정보가공
     * @param {object} params 
     * @param {string} key 
     * @returns 
     */
    getKeyValueImage (params, key) {
        let data        = [];

        params[key].forEach(row => {
            data[row['key']]    = row['value'];
        });

        return data;
    }

}

module.exports = blizzardService;