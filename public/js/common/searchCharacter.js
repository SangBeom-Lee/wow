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
        console.log(e);
        const value     = document.getElementById(this.#keyword).value;
        const opt       = {realm: 'azshara', name: value};

        if(value.length > 3){
            await apiFetchPost('/character', opt, (row) => {
                const list  = document.getElementById(this.#list);
                const li    = "<li>"+ row.realm.name + " " + row.name + "</li>";

                list.innerHTML(li);

                //목록에서 선택
                this.#selCharacter();
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