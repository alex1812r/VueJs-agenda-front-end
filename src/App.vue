<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">AGENDA</a>
    </nav>
    <div class="container-fluid">
      <div class="row pt-5">
        
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="enviarContacto" >
                
                <div class="form-group row">
                  <div class="col-md-6">
                    <input
                    v-model="contacto.nombre"
                    type="text" 
                    placeholder="Nombre"
                    class="form-control mb-sm-3 mb-md-0">
                  </div>
                  <div class="col-md-6">
                    <input
                    v-model="contacto.apellido"
                    type="text" 
                    placeholder="Apellido"
                    class="form-control">
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-md-9">
                    <input 
                      v-model="contacto.telefono"
                      type="text"
                      placeholder="Telefono"
                      class="form-control"
                      >
                  </div>
                </div>

                <div class="form-group">
                  <input 
                    v-model="contacto.correo"
                    type="email"
                    placeholder="Email"
                    class="form-control"
                  >
                </div>

                <div class="form-group">
                  <textarea
                    v-model="contacto.direccion" 
                    rows="4" 
                    class="form-control" 
                    placeholder="Direccion">

                  </textarea>
                </div>
                
                <template v-if="editar === false">
                  <button class="btn btn-success btn-block">
                    Enviar
                  </button>
                </template>

                <template v-else>
                  <button class="btn btn-primary btn-block">
                    Editar
                  </button>
                </template>

              </form>
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Direccion</th>
                <th colspan="2" style="text-align:center">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(contacto,key) of contactos" v-bind:key="key">
                <td> {{ contacto.nombre }} </td>
                <td> {{ contacto.apellido }} </td>
                <td> {{ contacto.telefono }} </td>
                <td> {{ contacto.correo }} </td>
                <td> {{ contacto.direccion }} </td>
                <td>
                  <button 
                    type="button" 
                    @click="editarContacto(contacto._id)" 
                    class="btn btn-primary">
                    <i class="far fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button 
                    type="button" 
                    @click="eliminarContacto(contacto._id)" 
                    class="btn  btn-danger">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  const uri = 'https://nodejs-agenda-back-end.herokuapp.com/'

  class Contacto {
    constructor(
      nombre, apellido, telefono, 
      correo, direccion
    ) 
    {
      this.nombre = nombre
      this.apellido = apellido
      this.telefono = telefono
      this.correo = correo
      this.direccion = direccion
    }
  }

  export default {

    data() {
      return {
        contacto: new Contacto(),
        contactos: [],
        editar: false,
        contactoAEditar: ''
      }
    },
    //realiza una funcion antes de cargar el componente
    created(){
      this.obtenerContactos()
    },

    methods: {

      obtenerContactos (){
        fetch(uri,{ method: 'GET' })
        .then( res => res.json() )
        .then( data => {
          //console.log('data :', data)
          this.contactos = data
        })
      },

      enviarContacto() {
        if(!this.editar){

          fetch(uri,{
            method: 'POST',
            body: JSON.stringify(this.contacto),
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          })
            .then( res => res.json())
            .then( () => {
              //console.log('data :', data)
              this.obtenerContactos()
            })

        }else{

          fetch(uri + this.contactoAEditar,{
            method: 'PUT',
            body: JSON.stringify(this.contacto),
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          })
            .then( res => res.json() )
            .then( () => {
              this.obtenerContactos()
            })

          this.contactoAEditar = ''
          this.editar = false
        }

        this.contacto = new Contacto()
      },

      eliminarContacto(id) {
        const valid = confirm('confirme si desea eliminar el contacto')
        if(valid){

          fetch(uri + id,{
            method:'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          })
            .then( res => res.json() )
            .then( () => {
              this.obtenerContactos()
            })

        }
      },

      editarContacto(id){
        //console.log('object :', id)
        fetch(uri + id)
          .then( res => res.json() )
          .then( data => {
            //console.log('data :', data)
            this.contacto = new Contacto(
              data.nombre, data.apellido, data.telefono,
              data.correo, data.direccion
            )

            this.contactoAEditar = data._id
            this.editar = true
          })
      }

    }  
  }
</script>