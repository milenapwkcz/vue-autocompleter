Vue.component("v-autocompleter", {
    template:`<div class="wyszukiwarka">
    <input v-model="googleSearch" 
    type="text" class="search_input" 
    v-on:click="ustaw()" 
    @keyup.down="idzDo(aktywnyWynik + 1)"
    @keyup.up="idzDo(aktywnyWynik - 1)"
    @keyup.enter="idzDoWynikow()">
    <div class="lista">
        <div :class="[googleSearch.length != 0 && filtrowaniemiast.length != 0 && c == 1 ? 'autocompleter' : 'pustka']">
            <ul class="cmbBox">
                <li class="cmbWyniki" v-for="miasto in filtrowaniemiast" v-on:click="zmiana(miasto.name)">
                    <div class="cmbpogrub" v-html="pogrub(miasto.name)">
                    </div>  
                </li>
            </ul>
        </div>
    </div>`,
     data: function (){
            return{
            isActive: 0,
            aktywnyWynik: 0,
            autocompleterIsActive: false,
            isOnResult: false,
            c: 0,
            listamiast: [],
            miasta: window.cities.map((a) => {
            a.nameLowerCase = a.name.toLowerCase();
            return a;
            })
        }
    },

    watch: 
    {
    value() {
        if (this.autocompleterIsActive) {
            return;
        }
        if (this.value.length === 0) {
            listamiast = [];
            return;
        }
        let zwrocone = [];
        let searchLowerCase = this.value.toLowerCase();

        this.cities.forEach((a) => {
            if (zwrocone.length === 10 || !a.nameLowerCase.includes(searchLowerCase)) {
                return;
            }
            zwrocone.push({
                name: a.name,
                nameHtml: cityData.nameLowerCase.replace(searchLowerCase, (match) => {
                    return '<span class="bold">' + match + '</span>';
                })
            })
        });
        
        this.listamiast = zwrocone;
    }
    },
    methods:
    { 
        set: function()
        {
            this.c = 1;
            this.autocompleterIsActive = false;
        },

        change: function(a)
        {
            if(this.isActive == 0)
            {
            this.isActive = 1;
            this.$emit('enter', this.isActive, x);
            document.activeElement.blur();
            this.c = 0;
            }
        },
    
        next: function(index)
        {
            if (!this.autocompleterIsActive) 
                            {
                                index = 0;
                            }

                            if (index > this.listamiast.length - 1) 
                            {
                                index = 0;
                            } 
                            else if (index < 0) 
                            {
                                index = this.listamiast.length - 1;
                            }
                        
                            this.aktywnyWynik = index;
                            this.autocompleterIsActive= true;
                            this.googleSearch = this.listamiast[index].name;
        }
    },
    
    props: {
        value: {
          type: String,
          default: ""
        },
        options: {
          type: Array,
          default: []
        }
      }, 

})