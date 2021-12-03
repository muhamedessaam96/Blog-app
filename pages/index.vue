<template>
  <div class="container mx-auto mt-6">
    <div class="relative mr-3 w-1/4 mb-4 md:mr-0 hidden md:block">
      <div
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
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
    <div class="grid grid-cols-3 justify-center gap-4">
      <Card
        v-for="post in posts && resultQuery"
        :key="post.id"
        :title="post.title"
        :desc="post.desc"
      />
    </div>
    <nuxt-link to="/AddNewPost"></nuxt-link>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
export default {
  components: { Card },
  data() {
    return {
      searchQuery: null,
      posts: [],
    };
  },
  computed: {
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
  mounted() {
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
          });
        }
        this.posts = posts;
      });
  },
};
</script>
