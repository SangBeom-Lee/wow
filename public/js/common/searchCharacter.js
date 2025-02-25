class SearchCharacter {
    
    #form       = "";
    #keyword    = "";
    #list       = "";

    constructor(params){
        this.#form      = params.form;
        this.#keyword   = params.keyword;
        this.#list      = params.list;

        this.#init();
    }

    #init(){
        document.getElementById(this.#keyword).addEventListener("keyup", this.#searchCharacter.bind(this));
    }

    #chkKeyword (){

    }

    async #searchCharacter (e){

        const value     = document.getElementById(this.#keyword).value;
        const opt       = {realm: 'azshara', name: value};

        if(value.length > 3 && e.keyCode == 13){
            await apiFetchPost('/character', opt, (row) => {
                const code  = row.code;

                if(code == 200){
                    const cha   = row.character;
                    const list  = document.getElementById(this.#list);
                    const li    = "<li><a href='/character?realm=azshara&name="+ cha.name +"'>"+ cha.realm.name + " " + cha.name + "</a></li>";
    
                    list.innerHTML = li;
    
                    //목록에서 선택
                    this.#selCharacter();
                } else {
                    alert("존재하지 않는 캐릭터다 똑바로 써라. 그리고 서버는 아즈샤라만이니 알아서 해라");
                }
            });
        }
    }

    #selCharacter (){
        
    }

    #search (){
        const form      = document.getElementById(this.#form);
        const value     = document.getElementById(this.#keyword).value;
        const chk       = this.#chkKeyword(value);

        if(chk.code != 200){
            return alert(chk.msg);
        }

        form.submit();
    }

}