<template>
  <div class="card">
    <div class="card-body">

      <form @submit.prevent="enviarContacto">

        <div class="form-group row">
          <div class="col-6">
            <input 
              type="text"
              placeholder="Nombre"
              class="form-control"
              v-model="contacto.nombre">
          </div>
          <div class="col-6">
            <input 
              type="text"
              placeholder="Nombre"
              class="form-control"
              v-model="contacto.apellido">
          </div>
        </div>

        <div class="form-group">
          <input 
            type="text"
            placeholder="Telefono"
            class="form-control col-8"
            v-model="contacto.telefono">
        </div>

        <div class="form-group">
          <input 
            type="email"
            placeholder="Correo"
            class="form-control"
            v-model="contacto.correo">
        </div>

        <div class="form-group">
          <textarea 
            placeholder="Direccion"  
            rows="5"
            class="form-control"
            v-model="contacto.direccion">
          </textarea>
        </div>

        <button
          type="submit"
          class="btn btn-block"
          :class="{'btn-success': !editar, 'btn-primary mb-2': editar}">
          {{ !editar ? "Registrar" : "Editar" }}
        </button>

        <button
          v-if="editar == true"
          @click="vaciarContacto"
          type="button"
          class="btn btn-block btn-secondary">
          Vaciar
        </button>

      </form>
      <div v-if="errores.length" class="alert alert-danger mt-3">
        <ul>
          <li v-for="(item,index) of errores" :key="index">
            {{ item.error }}
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState,mapMutations, mapActions} from 'vuex'

export default {
  name: 'Formulario',
  computed: {
    ...mapState(['contacto','editar','errores'])
  },
  methods:{
    ...mapMutations(['vaciarContacto']),
    ...mapActions(['registrarContacto','editarContacto']),
    enviarContacto(){
      if(!this.editar){
        this.registrarContacto()
      }else{
        this.editarContacto()
      }
    }
  }
}
</script>