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
                                    <vs-avatar  size="70px" :src="image"/>
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
                                    <input
                                        type="file"
                                        class="input-file"
                                        ref="file"
                                        v-on:change="handleFileUpload($event)"
                                        />
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
      description: '',
      image: '',
      file: ''

    }
  },

  mixins: [misMixins],

  methods: {

    // metodo para capturar la imagen
    handleFileUpload(event) {
      this.file = event.target.files[0];

      var extension = this.file.name.split(".");

      if (extension[1] != "png" && extension[1] != "jpg" && extension[1] != "jpeg" && extension[1] != "PNG" && extension[1] != "JPG" && extension[1] != "JPEG") {
        this.file = "";

        this.$vs.notify({
                text: "Tipo de archivo no permitido, solo se admiten archivos de imagen",
                color: 'danger',
                icon: 'warning'
            })
      }
    },

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
            this.image = result.data.data.image
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

   //metodo par aactualizar la información del usuario
   updateUser () {

    if( this.name === '' || this.description === ''){
        this.$vs.notify({
          text: 'Debes agregar un nombre y una descripción',
          color: 'danger',
          icon: 'warning'
        })
    }else{
        this.loadingOpen()

        let data = new FormData();

        if(this.file != ''){
            data.append('image', this.file)
        }
        data.append('id', localStorage.userId)
        data.append('name', this.name)
        data.append('description', this.description)


        this.axios({
            method: "POST",
            url: "user/updateUser",
            data: data,
            headers: { "Content-Type": "multipart/form-data" , 'Authorization': 'Bearer ' + localStorage.token},
        })
        .then(function (response) {
            this.$vs.notify({
                text: 'Información actualizada con éxito',
                color: 'success',
                icon: 'done'
            })
            this.getUser()
            this.loadingClose()
        })
        .catch(function (response) {
            //handle error
            console.log(response);
            this.loadingClose()
            this.$vs.notify({
                text: response.response.data.message,
                color: 'danger',
                icon: 'warning'
            })
        });
 
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
