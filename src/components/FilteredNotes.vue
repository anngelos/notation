<template>
  <EditNoteModal v-if="showEditNoteModal" :note="editUserNote" @close="closeEditModal" />
  <draggable class="dragArea w-full flex" ghost-class="ghost" :list="list">
    <div v-for="note in filteredNotes" :key="note.id"
      class="m-6 block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      <div class="flex justify-center border-b-2 border-[#0000002d] px-6 py-2 text-neutral-600">
        #{{ note.id }}
      </div>
      <div class="p-6">
        <h5 class="mb-2 text-xl font-medium leading-tight text-black">
          {{ note.title }}
        </h5>
        <p class="text-base text-black">
          {{ truncateText(note.content, 30) }}
        </p>
        <div class="mt-3">
          <button @click="editNote(note)" class="mr-3 inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 rounded-full focus:shadow-outline icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
          </button>
          <button @click="deleteUserNote(note.id)" class="mr-3 inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 rounded-full focus:shadow-outline icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
              <path
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </button>
          <button @click="copyText(note.id)" class="mr-3 inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 rounded-full focus:shadow-outline icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard2" viewBox="0 0 16 16">
              <path
                d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1h-.5Z" />
              <path
                d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" />
            </svg>
          </button>
          <button @click="showNote(note)" class="mr-3 inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 rounded-full focus:shadow-outline icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye"
              viewBox="0 0 16 16">
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </draggable>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2';
import EditNoteModal from '@/components/EditNoteModal.vue';

export default {
  name: 'FilteredNotes',
  components: {
    EditNoteModal,
    draggable: VueDraggableNext,
  },
  data() {
    return {
      showEditNoteModal: false,
      editUserNote: null,
    }
  },
  computed: {
    ...mapState(['notes', 'searchNote']),

    filteredNotes() {
      if (!this.searchNote) {
        return;
      }
      
      const search = this.searchNote.toLowerCase();

      let myNotes = this.notes.filter(note => 
        note.title.toLowerCase().includes(search) || 
        note.content.toLowerCase().includes(search)
      );
      return myNotes;
    },
  },
  methods: {
    ...mapActions(['deleteUserNote']),

    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    },

    showNote(note) {
      Swal.fire({
        title: `#${note.id} - ${note.title}`,
        html: note.content,
        confirmButtonColor: "#FACC15",
        confirmButtonText: "Voltar"
      })
    },

    copyText(id) {
      const note = this.notes.find(note => note.id === id);
      
      if (note) {
        navigator.clipboard.writeText(note.content)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Texto copiado!',
              showConfirmButton: false,
              timer: 900
            });
          })
          .catch(err => {
            console.error('Erro ao copiar texto:', err);
            Swal.fire({
              icon: 'error',
              title: 'Erro ao copiar texto',
              text: 'Tente novamente mais tarde.'
            });
          });
      }
    },

    editNote(note) {
      this.editUserNote = note;
      this.showEditNoteModal = true;
    },

    closeEditModal() {
      this.showEditNoteModal = false;
    }
  },
}
</script>

<style>
.ghost {
  visibility: hidden;
}
</style>