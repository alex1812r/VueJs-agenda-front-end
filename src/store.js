import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

class Contacto{
  constructor(nombre,apellido,telefono,correo,direccion){
    this.nombre = nombre
    this.apellido = apellido
    this.telefono = telefono
    this.correo = correo
    this.direccion = direccion 
  }
}

const uri = 'https://nodejs-agenda-back-end.herokuapp.com/'

export default new Vuex.Store({
  state: {
    contacto: new Contacto(),
    contactos: [],
    editar: false,
    ToEditar: '',
    errores:[]
  },
  
  mutations: {
    cargarContactos(state,data){
      state.contactos = data
    },

    cargarContacto(state,data){
      state.contacto = data
      this.state.editar = true
      this.state.ToEditar = data._id
    },

    vaciarContacto(state){
      state.contacto = new Contacto()
      state.editar = false
      state.ToEditar = ''
    },

    vaciarErrores(state){
      state.errores = []
    }
    
  },

  actions: {
    obtenerContactos: async function({commit}){
      const response = await fetch(uri,{ method: 'GET'})
      const data = await response.json()
      commit('cargarContactos',data)
    },

    buscarContacto: async function({commit}, id){
      commit('vaciarErrores')
      const response = await fetch(uri+ id, { method: 'GET' })
      const data = await response.json()
      if(data.Ok){
        commit('cargarContacto',data.contacto)
      }else{
        window.alert(data.error)
      }
      
    },

    registrarContacto: async function({commit,dispatch}){
      commit('vaciarErrores')
      const  response = await fetch(uri,{
        method: 'POST',
        body: JSON.stringify(this.state.contacto),
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      const data = await response.json()
      if(data.Ok){
        dispatch('obtenerContactos')
      }else{
        this.state.errores = data.errores
      }
    },

    editarContacto: async function({dispatch,commit}){
      commit('vaciarErrores')
      const response = await fetch(uri + this.state.ToEditar,{
        method: 'PUT',
        body: JSON.stringify(this.state.contacto),
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      const data = response.json()
      if(data.Ok){
        commit('vaciarContacto')
        dispatch('obtenerContactos')
      }else{
        this.state.errores =  data.errores
      }
    },

    eliminarContacto: async function({dispatch}, id){
      const validar = confirm('Confirme para eliminar el contacto')
      if(validar){
        const response = await fetch(uri + id,{
          method:'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          }
        })
        const data = await response.json()
        if(data.Ok){
          dispatch('obtenerContactos')
        }else{
          window.alert(data.error)
        }
      }
    }

  }
})
