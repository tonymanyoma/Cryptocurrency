<template>
    <div class="welcome">
        <div class="img-background"></div>
        <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="content_card">
                <vs-row vs-justify="center">
                    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
                        <vs-card>
                        <div slot="header">
                            <h3>
                            Formulario de registro
                            </h3>
                        </div>
                        <div class="centerx labelx">
                            <vs-row>
                                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="content_card_item">
                                    <vs-input placeholder="Nombre" v-model="name"/>
                                </vs-col>
                                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="content_card_item">
                                    <vs-input placeholder="Email" v-model="email"/>
                                </vs-col>
                                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="content_card_item">
                                    <vs-input type="password" placeholder="Password" v-model="password"/>
                                </vs-col>
                                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="content_card_item">
                                    <vs-textarea label="Descripción" v-model="description" width="300px" />
                                </vs-col>
                                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="content_card_item">
                                    <div vs-w="6" class="content_card_item_btn">
                                        <router-link to="/">
                                            <vs-button color="warning" type="filled">Atrás</vs-button>
                                        </router-link>
                                    </div>
                                    <div vs-w="6">
                                        <vs-button color="primary" type="filled" @click="register()">Registrarse</vs-button>
                                    </div>
                                </vs-col>
                            </vs-row>
                        </div>

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

  },

  data () {
    return {
      name: '',
      email: '',
      password: '',
      description: ''
    }
  },

  mixins: [misMixins],

  methods: {

    // metodo para registrar un usuario
    register () {
        var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
      var result = validEmail.test(this.email)

      if (this.email === '' || this.password === '' || this.name === '' || this.description === '') {
        this.$vs.notify({
          text: 'Debes agregar un nombre , email, una contraseña y una descripción',
          color: 'danger',
          icon: 'warning'
        })
     }else if (result === false) {
        this.$vs.notify({
          text: 'Debes agregar un email válido',
          color: 'danger',
          icon: 'warning'
        })
      } else {

        this.loadingOpen()
        this.axios({
            url: 'auth/register',
            method: 'POST',
            data:{
                name: this.name,
                email: this.email,
                password: this.password,
                description: this.description
            },
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
            }
        }).then((result) => {
            this.$vs.notify({
                text: 'Usuario creado con éxito',
                color: 'success',
                position: 'top-center',
                icon: 'done'
            })
            this.name = ''
            this.email = ''
            this.password = ''
            this.description = ''
            console.log('result', result)
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
    margin-top: 15%;
}
.content_card_item{
    margin-top: 2% !important;
}
.content_card_item_btn{
    margin-right: 20px;
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
