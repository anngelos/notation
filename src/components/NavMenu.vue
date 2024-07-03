<template>
  <nav class="bg-white border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div class="flex items-center">
        <img src="../assets/note-logo.png" class="h-8 mr-3" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Notation</span>
      </div>
      <div class="items-center justify-between w-full md:flex md:w-auto md:order-1 menu-container" id="navbar-search">
        <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0">
          <li>
            <p>Item 1</p>
          </li>
          <li>
            <button @click="this.logout()">Sair</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'NavMenu',
  methods: {
    ...mapActions(['logout']),

  },
}
</script>