<template>
  <EditUserProfileModal v-if="showEditUserProfileModal" @close="close" />
  <div v-else class="bg-slate-200 fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster">
    <div class="bg-white w-11/12 h-[80%] md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div class="py-4 text-left px-6 h-full flex flex-col justify-between">
        <div class="flex justify-between items-center pb-3">
          <p class="text-3xl font-bold">Dados do Usuário</p>
        </div>
        <div class="my-5 text-2xl flex flex-col h-96 space-y-4">
          <p><b>ID:</b> {{ user.id }}</p>
          <p><b>Nome:</b> {{ user.name }}</p>
          <p><b>Apelido:</b> {{ user.nickname }}</p>
          <p><b>E-mail:</b> {{ user.email }}</p>
        </div>
        <div class="flex justify-between pt-2">
          <router-link to="/dashboard"
            class="focus:outline-none modal-close px-4 border border-black p-3 rounded-lg text-black hover:bg-yellow-400">
            Voltar
          </router-link>

          <button
            @click="triggerEditUserProfileModal"
            class="cursor-pointer focus:outline-none px-4 bg-white p-3 ml-3 border border-black rounded-lg text-black hover:bg-yellow-400 hover:text-black">
            Editar perfil
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EditUserProfileModal from '@/components/EditUserProfileModal.vue';

export default {
  name: 'UserInfoView',
  components: { EditUserProfileModal },
  data() {
    return {
      showEditUserProfileModal: false,
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    triggerEditUserProfileModal() {
      this.showEditUserProfileModal = true;
    },

    close() {
      this.showEditUserProfileModal = false;
    }
  },
}
</script>