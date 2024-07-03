<template>
  <div
    class="bg-slate-200 p-20 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center">
    <div class="content text-3xl text-center md:text-left">
      <h1 class="text-5xl text-yellow-400 font-bold">Notation</h1>
      <p>Conecte-se com suas notas e otimize seu dia a dia.</p>
    </div>
    <div class="container mx-auto flex flex-col items-center">
      <form @submit.prevent="submitLoginForm" class="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg">
        <input type="text" placeholder="Apelido" v-model="nickname"
          class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-slate-500" />
        <input type="password" placeholder="Senha" v-model="password"
          class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-slate-500" />
        <button type="submit"
          class="login-btn w-full bg-yellow-400 text-white p-3 rounded-lg font-semibold text-lg">Login</button>
        <hr />
        <router-link class="w-full bg-orange-400 mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg"
          to="/register">Criar uma nova conta</router-link>
      </form>
      <p class="text-center text-sm my-4">
        <span class="font-semibold text-center w-full">Suas ideias</span>, organizadas e acessíveis.
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Swal from 'sweetalert2';

export default {
  name: 'LoginView',
  data() {
    return {
      nickname: null,
      password: null,
    };
  },
  methods: {
    ...mapActions(['loginUser']),

    async submitLoginForm() {
      if (!this.nickname || !this.password) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Apelido e/ou Senha são campos obrigatórios.",
          confirmButtonColor: "#FACC15",
          confirmButtonText: "Certo"
        })
        return;
      }

      try {
        const login = await this.loginUser({
          nickname: this.nickname,
          password: this.password
        });

        if (login.message == "LOGIN_SUCCESSFUL") {
          this.$router.push('/dashboard');
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Falha ao efetuar login",
          html: `
            Tem certeza que está tentando acessar uma conta existente?
            <br/>
            Verifique suas credencias, por favor!
          `,
          confirmButtonText: "Certo",
          confirmButtonColor: "#FACC15",
        });
      }
    },
  },
}
</script>

<style>
.login-btn {
  cursor: pointer;
}
</style>