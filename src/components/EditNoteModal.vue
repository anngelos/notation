<template>
  <div class="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster">
    <div class="border border-gray-900 modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div class="modal-content py-4 text-left px-6">
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl font-bold">Editar Nota</p>
          <div @click="close" class="modal-close cursor-pointer z-50">
            <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
              </path>
            </svg>
          </div>
        </div>
        <form @submit.prevent="saveChanges(noteData)" class="my-5 flex flex-col space-y-4">
          <input v-model="noteData.title" type="text" placeholder="titulo" class="mb-3 py-1 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-slate-500" />
          <textarea v-model="noteData.content" maxlength="127" placeholder="digite o conteúdo da sua nota aqui" name="note-content" cols="30" rows="7"
          class="mb-3 py-1 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-slate-500 note-content"></textarea>
          <input
            v-model="noteData.authorNickname"
            disabled
            type="text" 
            placeholder="titulo"
            class="mb-3 py-1 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-slate-500"
          />
          <div class="flex justify-end pt-2">
            <button @click="close" class="focus:outline-none modal-close px-4 border border-black p-3 rounded-lg text-black hover:bg-yellow-400">
              Cancelar
            </button>
            <input type="submit" value="Salvar" class="cursor-pointer focus:outline-none px-4 bg-white p-3 ml-3 border border-black rounded-lg text-black hover:bg-yellow-400 hover:text-black">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'EditNoteModal',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      noteData: {
        id: this.note.id,
        title: this.note.title,
        content: this.note.content,
        authorNickname: this.note.authorNickname,
      }
    }
  },
  methods: {
    ...mapActions(['editUserNote']),

    close() {
      this.$emit('close');
    },

    async saveChanges(noteData) {
      const res = await this.editUserNote(noteData);

      if (res.message == "NOTE_EDITED_SUCCESSFULLY") {
        this.close();
      }
    },

    checkMaxLength() {
      if (this.noteData.content.length > 120) {
        this.noteData.content = this.noteData.content.slice(0, 120);
      }
    },
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