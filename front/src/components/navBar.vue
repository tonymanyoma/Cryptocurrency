<template>
    <div class="welcome">
      <vs-navbar
        color="#FFFFFF"
        text-color="#000000"
        active-text-color="#C8C8C8"
        class="myNavbar">
          <div slot="title">

          </div>
            <vs-navbar-item index="0" >
                <a @click="goHome()">Home</a>
            </vs-navbar-item>
            <vs-navbar-item index="0" >
                <a @click="goProfile()">Mi perfil</a>
            </vs-navbar-item>
            <vs-navbar-item index="0" >
                <a @click="logout()">Cerrar sesión</a>
            </vs-navbar-item>
            <vs-spacer></vs-spacer>
            <vs-button color-text="rgb(255, 255, 255)" color="rgba(255, 255, 255, 0.3)" type="flat" icon="more_horiz"></vs-button>
      </vs-navbar>

    </div>
</template>
<script>
/*eslint-disable */
import { misMixins } from '../views/mixins.js'
export default {
  created: function () {

  },

  data () {
    return {
      active:true,
    }
  },

  mixins: [misMixins],

  methods: {

    goHome(){
      this.$router.push({ path: '/home' });
    },

    goProfile(){
      this.$router.push({ path: '/profile' });
    },

    //metodo para cerrar sesion
    logout(){
      
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.$router.push({ path: '/' });
    
    },
  }
}
</script>

<style scoped>

</style>