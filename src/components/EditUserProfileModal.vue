<template>
  <div
    class="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster">
    <div
      class="border border-gray-900 modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div class="modal-content py-4 text-left px-6">
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl font-bold">Editar Usuário</p>
          <div @click="close" class="modal-close cursor-pointer z-50">
            <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
              viewBox="0 0 18 18">
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
              </path>
            </svg>
          </div>
        </div>
        <p>Ao editar o usuário vale lembrar que você será deslogado e redirecionado para a tela de login</p>
        <form @submit.prevent="update(this.editUserData)" class="my-5 flex flex-col space-y-4">
          <input v-model="editUserData.name" type="text" placeholder="nome"
            class="py-1 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-slate-500" />
          <input v-model="editUserData.nickname" type="text" placeholder="apelido"
            class="mb-3 py-1 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-slate-500" />
          <input v-model="editUserData.email" type="text" placeholder="email"
            class="mb-3 py-1 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-slate-500" />
          <input v-model="editUserData.password" type="password" placeholder="senha"
            class="mb-3 py-1 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-slate-500" />
          <div class="flex justify-end pt-2">
            <button @click="close"
              class="focus:outline-none modal-close px-4 border border-black p-3 rounded-lg text-black hover:bg-yellow-400">
              Cancelar
            </button>
            <input type="submit" value="Salvar"
              class="cursor-pointer focus:outline-none px-4 bg-white p-3 ml-3 border border-black rounded-lg text-black hover:bg-yellow-400 hover:text-black">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Swal from 'sweetalert2';

export default {
  name: 'EditUserProfileModal',
  data() {
    return {
      editUserData: {
        name: '',
        nickname: '',
        email: '',
        password: '',
      }
    }
  },
  computed: {},
  methods: {
    ...mapActions(['updateUser', 'logout']),

    close() {
      this.$emit('close');
    },

    async update(data) {
      try {
        const res = await this.updateUser(data);

        if (res.message == "USER_EDITED_SUCCESSFULLY") {
          Swal.fire({
            icon: "success",
            text: "Usuário editado com sucesso.",
            timer: 1000,
            confirmButtonColor: "#FACC15",
            confirmButtonText: "Certo"
          })
          this.logout();          
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Não foi possível editar o usuário! Revise as informações digitadas ou tente novamente mais tarde.",
            confirmButtonColor: "#FACC15",
            confirmButtonText: "Certo"
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
}
</script>

<style>
.note-content {
  resize: none;
}

.main-modal {
  background: #000000b3;
}
</style>