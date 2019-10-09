<template>
  <div>

    <table class="table table-bordered">
      <thead>
        <tr>

          <th>Nombre</th>
          <th>Apellido</th>
          <th>Telefono</th>
          <th>Correo</th>
          <th>Direccion</th>
          <th colspan="2" class="text-center">Opciones</th>

        </tr>
      </thead>

      <tbody>
        <tr v-for="(contacto,index) of contactos" :key="index">

          <td>{{ contacto.nombre }}</td>
          <td>{{ contacto.apellido }}</td>
          <td>{{ contacto.telefono }}</td>
          <td>{{ contacto.correo }}</td>
          <td>{{ contacto.direccion }}</td>
          <td class="text-center">

            <button
              type="button"
              @click="buscarContacto(contacto._id)"
              class="btn btn-primary">
              <i class="far fa-edit"></i>
            </button>
            
          </td>
          <td class="text-center">

            <button
              type="button"
              @click="eliminarContacto(contacto._id)"
              class="btn btn-danger">
              <i class="far fa-trash-alt"></i>
            </button>

          </td>

        </tr>
      </tbody>

    </table>

  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
  name: 'Tabla',
  computed:{
    ...mapState(['contactos'])
  },
  methods: {
    ...mapActions(['obtenerContactos','buscarContacto','eliminarContacto'])
  },
  mounted(){
    this.obtenerContactos()
  }
}
</script>