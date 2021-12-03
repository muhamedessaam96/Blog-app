<template>
  <div class="container mx-auto mt-6">
    <!-- start search input -->
    <div class="relative mr-3 w-1/4 mb-4 md:mr-0 hidden md:block">
      <div
        class="absolute inset-y-0 left-0 pl-3 w-60 flex items-center pointer-events-none"
      >
        <svg
          class="w-5 h-5 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        v-model="searchQuery"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
      />
    </div>
    <!-- end search input -->
    <!-- start modal -->
    <div>
      <modal v-if="dialogIsVisible">
        <template v-slot:header> <h2>Post Data</h2> </template>
        <p class="text-lg font-bold p-2 text-center">Please Add Data</p>
        <div class="mb-4">
          <input
            v-model="title"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Title"
          />
        </div>
        <div class="mb-4">
          <textarea
            v-model="desc"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Description"
          />
        </div>

        <div class="flex justify-between">
          <button @click="hideDialog" class="bg-red-500 rounded-lg p-2">
            Close It
          </button>
          <button
            @click="submitData('POST')"
            class="bg-green-500 rounded-lg p-2"
          >
            Submit
          </button>
        </div>
      </modal>
      <modal v-if="editDialogIsVisible">
        <template v-slot:header> <h2>Post Data</h2> </template>
        <p class="text-lg font-bold p-2 text-center">Edit Data</p>
        <div class="mb-4">
          <input
            v-model="title"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Title"
          />
        </div>
        <div class="mb-4">
          <textarea
            v-model="desc"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Description"
          />
        </div>

        <div class="flex justify-between">
          <button @click="hideDialogE" class="bg-red-500 rounded-lg p-2">
            Close It
          </button>
          <button
            @click="submitData('PUT')"
            class="bg-green-500 rounded-lg p-2"
          >
            Submit
          </button>
        </div>
      </modal>
    </div>
    <!-- start modal -->
    <!-- start table data -->
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    TiTle
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th>
                    <button
                      @click="showDialog"
                      class="bg-blue-600 p-2 rounded text-sm text-white my-2"
                    >
                      Add New Post
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="post in posts && resultQuery" :key="post.id">
                  <td class="px-2 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ post.title }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-2 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ post.desc }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-2 py-4 whitespace-nowrap text-center text-sm font-medium"
                  >
                    <button
                      @click="deletePost(post.id)"
                      class="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                    <button
                      @click="editPost(post.id)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- start table data -->
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      editDialogIsVisible: false,
      dialogIsVisible: false,
      title: "",
      desc: "",
      img: "",
      posts: [],
      index: 0,
      selectedId: null,
      searchQuery: null,
    };
  },
  computed: {
    // search handler
    resultQuery() {
      if (this.searchQuery) {
        return this.posts.filter((post) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => post.title.toLowerCase().includes(v));
        });
      } else {
        return this.posts;
      }
    },
  },
  methods: {
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
    showDialogE() {
      this.editDialogIsVisible = true;
    },
    hideDialogE() {
      this.editDialogIsVisible = false;
    },
    submitData(method) {
      // sent request to add new posts
      const url =
        method === "POST"
          ? "https://blog-app-96-default-rtdb.firebaseio.com/post.json"
          : `https://blog-app-96-default-rtdb.firebaseio.com/post/${this.selectedId}.json`;
      fetch(url, {
        method: method,
        headers: {
          "Contect-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.title,
          desc: this.desc,
          img: this.img,
        }),
      }).then((response) => {
        this.title = "";
        this.desc = "";
        fetch("https://blog-app-96-default-rtdb.firebaseio.com/post.json")
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            const posts = [];
            for (const id in data) {
              posts.push({
                id: id,
                title: data[id].title,
                desc: data[id].desc,
                img: data[id].img,
              });
            }
            this.posts = posts;
          });
      });
      this.hideDialog();
      this.hideDialogE();
    },
    editPost(id) {
      // handle request to update posts
      fetch(
        `https://blog-app-96-default-rtdb.firebaseio.com/post/${id}.json`
      ).then((res) => {
        res.json().then((data) => {
          this.title = data.title;
          this.desc = data.desc;
          this.showDialogE();
        });
        this.selectedId = id;
      });
      this.hideDialog();
      this.hideDialogE();
    },
    deletePost(id) {
      // handle delete posts
      fetch(`https://blog-app-96-default-rtdb.firebaseio.com/post/${id}.json`, {
        method: "DELETE",
      }).then((response) => {
        this.title = "";
        this.desc = "";
        fetch("https://blog-app-96-default-rtdb.firebaseio.com/post.json")
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            const posts = [];
            for (const id in data) {
              posts.push({
                id: id,
                title: data[id].title,
                desc: data[id].desc,
                img: data[id].img,
              });
            }
            this.posts = posts;
          });
      });
    },
  },
  mounted() {
    // to show our data when mounted my page
    fetch("https://blog-app-96-default-rtdb.firebaseio.com/post.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        const posts = [];
        for (const id in data) {
          posts.push({
            id: id,
            title: data[id].title,
            desc: data[id].desc,
            img: data[id].img,
          });
        }
        this.posts = posts;
      });
  },
};
</script>
