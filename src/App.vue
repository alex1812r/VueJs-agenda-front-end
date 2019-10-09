<template>
  <div>
    <NavBar />
    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col-md-4 mb-3">
          <Formulario />
        </div>
        <div class="col-md-8">
          <Tabla />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import Formulario from './components/Formulario.vue'
import Tabla from './components/Tabla.vue'

export default {
  name: 'app',
  components: { NavBar, Formulario , Tabla },
}
</script>
