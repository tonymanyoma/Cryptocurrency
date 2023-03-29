<template>
    <div>

                <vs-row>
                <vs-col v-for="item in results.slice(0, 5)" v-bind:key="item.id"  vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
                    <vs-card class="card_crypto" >
                    <div slot="header" :style="{'background-color':item.color}">
                        <h3>
                            {{  item.name }}
                        </h3>
                    </div>
                    <div>
                        <span>{{  item.code }}</span>
                    </div>
                    <div slot="footer">
                      <vs-row vs-justify="flex-end">
                        <vs-button :color=item.color color-text="rgb(50,50,50)" icon="more_vert" @click="showDetail(item)"></vs-button>
                      </vs-row>
                    </div>

                </vs-card>
                </vs-col>
                </vs-row>
                <vs-popup class="holamundo"  :title=cryptoName :active.sync="popupActive">
                  <h2>Valor: $ {{ this.price }} {{  this.currency }}</h2>
                </vs-popup>
    </div>
</template>
<script>
/*eslint-disable */
import { misMixins } from '../mixins.js'
export default {
  created: function () {
    console.log('results', this.result)
  },

  props:['results'],

  data () {
    return {
        selected:[],
        popupActive: false,
        cryptoName:'',
        price:0,
        currency:''
    }
  },

  mixins: [misMixins],

  methods: {
    // metodo para obtener información adicional de la criptomoneda
    showDetail (data) {
      this.cryptoName = data.name
      this.popupActive = true

      this.loadingOpen()
        this.axios({
            url: 'crypto/priceCryptoCurrency',
            method: 'POST',
            data:{
              id: data.code
            },
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Authorization': 'Bearer ' + localStorage.token
            }
        }).then((result) => {
            this.price = result.data.data.data.amount
            this.currency = result.data.data.data.currency
            this.loadingClose()
        }).catch(error => {
            if (error) {
            this.loadingClose()
            this.showResults = false
            this.$vs.notify({
                text: error.response.data.message,
                color: 'danger',
                icon: 'warning'
            })
            }
        })
    },

   },

}
</script>

<style scoped>
.card_crypto{
    margin-right: 10px;
}
</style>