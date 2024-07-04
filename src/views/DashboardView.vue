<template>
  <div class="dashboard bg-slate-200 h-screen">
    <NavMenu/>
    <div class="p-5 flex justify-center">
      <div class="p-2 w-[95%] border-[1px] rounded-lg border-black bg-white">
        <p>Olá, {{ user.nickname }}!</p>
        <input
          v-model="this.searchNote"
          @input="updateSearchNotes"
          placeholder="Procurar nota"
          type="text"
          class="mt-2 mb-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-slate-500"
        />
      </div>
    </div>
    <div v-if="!notes.length">
      Ops... você nao tem nenhuma nota criada...
    </div>
    <FilteredNotes v-else-if="this.searchNote"/>
    <UserNotes v-else/>
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