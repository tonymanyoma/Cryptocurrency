<template>
    <div class="welcome">
        <div class="img-background"></div>
        <nav_bar></nav_bar>
        <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="content_card">
                <vs-row vs-justify="center">
                    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8">
                        <vs-card>
                        <div slot="header">
                            <h3>
                            Criptomonedas
                            </h3>
                        </div>
                        <div class="centerx labelx"></div>
                            <vs-row v-show="showResults">
                                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="content_card_item">
                                    <card_component :results="results" ></card_component>
                                </vs-col>
                            </vs-row>
                        </vs-card>
                    </vs-col>
                </vs-row>
            </vs-col>
        </vs-row>
    </div>
</template>
<script>
/*eslint-disable */
import { misMixins } from '../mixins.js'
export default {
  created: function () {
    this.getCryptoCurrency()
  },

  data () {
    return {
      showResults: false,
      results: [],

    }
  },

  mixins: [misMixins],

  methods: {
    // metodo para consultar criptomonedas
    getCryptoCurrency () {

        this.loadingOpen()
        this.axios({
            url: 'crypto/getCryptoCurrency',
            method: 'GET',
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Authorization': 'Bearer ' + localStorage.token
            }
        }).then((result) => {
            this.results = []
            this.$vs.notify({
                text: 'Información consultada con éxito',
                color: 'success',
                icon: 'done'
            })
            this.results = result.data.data
            this.showResults = true
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



  }
}
</script>
<style scoped>
.content_card{
    margin-top: 10%;
}
.content_card_item{
    margin-top: 2% !important;
    margin-bottom: 2% !important;
}
.img-background {
  background-image: url("../../assets/images/fondo2.jpg");
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  filter: brightness(0.4);
  z-index: -1;
}
</style>
