<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <h1 class="navbar-brand mb-0">AGENDA 
        <span class="badge badge-info">{{ cantidadContactos }}</span>
      </h1>
    </nav>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapState(['contactos']),
    cantidadContactos(){
      return this.contactos.length;
    }
  }
}
</script>