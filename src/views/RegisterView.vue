<template>
  <div class="register bg-slate-200 h-screen w-screen flex items-center">
    <div class="container mx-auto flex flex-col items-center">
      <form @submit.prevent="submitRegisterForm" class="shadow-lg w-90 p-4 flex flex-col bg-white rounded-lg">
        <p class="text-center text-sm my-4">Preencha os campos abaixo para criar um novo usuário</p>
        <input type="text" v-model="name" placeholder="Nome"
          class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-slate-500" />
        <input type="text" v-model="nickname" placeholder="Apelido"
          class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-slate-500" />
        <input type="text" v-model="email" placeholder="E-mail"
          class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-slate-500" />
        <input type="password" v-model="password" placeholder="Senha"
          class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-slate-500" />
        <button type="submit"
          class="login-btn w-full bg-yellow-400 text-white p-3 rounded-lg font-semibold text-lg">Registrar</button>
        <hr />
        <router-link to="/login" class="w-full bg-orange-400 mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg">
          Voltar para o login
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Swal from 'sweetalert2';

export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      nickname: '',
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions(['registerUser']),

    async submitRegisterForm() {
      const userData = {
        name: this.name,
        nickname: this.nickname,
        email: this.email,
        password: this.password
      };

      if (!userData.name || !userData.nickname || !userData.email || !userData.password) {
        Swal.fire({
          icon: "warning",
          title: "Preencha todos os campos",
          text: "Para criar um novo usuário é necessário que preencha todos os campos corretamente.",
          confirmButtonColor: "#FACC15",
          confirmButtonText: "Certo"
        })
        return;
      }

      if (userData.password.length < 6) {
        Swal.fire({
          icon: "warning",
          title: "Senha fraca",
          text: "A senha deve conter no mínimo seis caracteres.",
          confirmButtonColor: "#FACC15",
          confirmButtonText: "Certo"
        })
        return
      }

      try {
        const register = await this.registerUser(userData);

        if (register.message == "USER_REGISTERED_SUCCESSFULLY") {
          Swal.fire({
          icon: "success",
          title: "Usuário criado com sucesso",
          html: `
            <b>Nome:</b> ${userData.name}
            <br/>
            <b>Apelido:</b> ${userData.nickname}
            <br/>
            <b>E-mail:</b> ${userData.email}
            <br/>
            <b>Senha:</b> ******
          `,
          confirmButtonText: "Voltar",
          confirmButtonColor: "#FACC15",
        });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Falha ao criar novo usuário",
          html: `[ERRO]</b> ${error.response.data.message}`,
          confirmButtonText: "Certo",
          confirmButtonColor: "#FACC15",
        });
      }
    }
  }
}
</script>