import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const state = () => ({
  posts: [],
});

export const getters = {
  posts(state) {
    return state.posts;
  },
};

export const actions = {
  addPosts() {
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
