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
                                Mi perfil
                            </h3>
                        </div>
                        <div class="centerx labelx"></div>
                            <vs-row >
                                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="content_card_item">
                                    <vs-avatar  size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/>
                                </vs-col>
                                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="content_card_item">
                                    <vs-input placeholder="Nombre" v-model="name"/>
                                </vs-col>
                                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="content_card_item">
                                    <vs-input placeholder="Email" v-model="email" disabled/>
                                </vs-col>
                                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="content_card_item">
                                    <vs-textarea label="Descripción" v-model="description" width="300px" />
                                </vs-col>
                                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="content_card_item">
                                        <vs-button color="warning" type="filled" @click="updateUser()">Actualizar</vs-button>
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
    this.getUser()
  },

  data () {
    return {
      name: '',
      email: '',
      description: ''

    }
  },

  mixins: [misMixins],

  methods: {
    // metodo para consultar la información del usuario
    getUser () {

        this.loadingOpen()
        this.axios({
            url: 'user/getUser',
            method: 'POST',
            data:{
                id: localStorage.userId
            },
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Authorization': 'Bearer ' + localStorage.token
            }
        }).then((result) => {
            this.$vs.notify({
                text: 'Información consultada con éxito',
                color: 'success',
                icon: 'done'
            })
    
            this.name = result.data.data.name
            this.email = result.data.data.email
            this.description = result.data.data.description
            this.loadingClose()
        }).catch(error => {
            if (error) {
            this.loadingClose()
            this.$vs.notify({
                text: error.response.data.message,
                color: 'danger',
                icon: 'warning'
            })
            }
        })

   },

   updateUser () {

    if( this.name === '' || this.description === ''){
        this.$vs.notify({
          text: 'Debes agregar un nombre y una descripción',
          color: 'danger',
          icon: 'warning'
        })
    }else{
        this.loadingOpen()
        this.axios({
            url: 'user/updateUser',
            method: 'POST',
            data:{
                id: localStorage.userId,
                name: this.name,
                email: this.email,
                description: this.description,
            },
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Authorization': 'Bearer ' + localStorage.token
            }
        }).then((result) => {
            this.$vs.notify({
                text: 'Información actualizada con éxito',
                color: 'success',
                icon: 'done'
            })

            this.loadingClose()
        }).catch(error => {
            if (error) {
            this.loadingClose()
            this.$vs.notify({
                text: error.response.data.message,
                color: 'danger',
                icon: 'warning'
            })
            }
        })
    }



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
