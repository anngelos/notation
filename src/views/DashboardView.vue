<template>
  <div class="dashboard bg-slate-200 h-screen">
    <NavMenu />
    
    <div class="p-5 flex justify-center">
      <div class="p-1 w-[95%] rounded-lg bg-white">
        <div class="flex items-center justify-between p-2">
          <div class="flex w-[13%] items-center justify-around">
            <p class="text-xl">Olá, <b>{{ user.nickname }}</b>!</p>
            <svg @click="goToUserInfoView" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle cursor-pointer" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
          </div>
          <input v-model="this.searchNote" @input="updateSearchNotes" placeholder="Procurar nota" type="text"
            class="mt-2 mb-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-slate-500" />
        </div>
      </div>
    </div>
    
    <div v-if="!notes.length">
      Ops... você nao tem nenhuma nota criada...
    </div>
    <FilteredNotes v-else-if="this.searchNote" />
    <UserNotes v-else />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import NavMenu from '@/components/NavMenu.vue';
import UserNotes from '@/components/UserNotes.vue';
import FilteredNotes from '@/components/FilteredNotes.vue';

export default {
  name: 'DashboardView',
  components: {
    NavMenu,
    UserNotes,
    FilteredNotes,
  },
  data() {
    return {
      searchNote: '',
    }
  },
  computed: {
    ...mapState(['user', 'notes']),
  },
  methods: {
    ...mapActions(['logout', 'getAllUserNotes']),
    ...mapMutations(['SET_SEARCH_NOTE']),

    updateSearchNotes(event) {
      this.SET_SEARCH_NOTE(event.target.value);
    },

    goToUserInfoView() {
      this.$router.push('/user-info');
    }
  },
  mounted() {
    this.getAllUserNotes();
  },
}
</script>

<style>
.ghost {
  visibility: hidden;
}
</style>