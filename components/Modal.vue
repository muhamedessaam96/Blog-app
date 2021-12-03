<template>
  <div
    class="fixed z-10 inset-0 w-screen h-screen backdrop-filter backdrop-blur-sm"
  >
    <div
      class="z-20 flex justify-center items-center w-full h-full"
      @click="$emit('close')"
    >
      <transition name="modal" @click.stop="">
        <div class="modal z-50 bg-white p-7 rounded-xl">
          <div
            v-if="$slots.header"
            class="text-center bg-white shadow -mt-10 mb-5 py-2 font-bold rounded"
          >
            <slot name="header"></slot>
          </div>
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  emits: ["close"],
  data() {
    return {
      // header: $this.$slots,
    };
  },

  //     <modal v-if="dialogIsVisible" @close="hideDialog">
  //         <template v-slot:header> <h2>Title</h2> </template>
  //         <p>This is a test dialog!</p>
  //         <button @click="hideDialog">Close it!</button>
  //     </modal>

  //     {
  //     components: { Modal },
  //     data() {
  //         return {
  //             dialogIsVisible: false,
  //         };
  //     },
  //     methods: {
  //         showDialog() {
  //             this.dialogIsVisible = true;
  //         },
  //         hideDialog() {
  //             this.dialogIsVisible = false;
  //         },
  //     },
  // }
};
</script>

<style scoped>
.modal {
  /* width: 30rem; */
  /* left: calc(50% - 15rem); */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  animation: modal 0.3s ease-out forwards;
}

.modal-enter-active {
  animation: modal 0.3s ease-out;
}

.modal-leave-active {
  animation: modal 0.3s ease-in reverse;
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
