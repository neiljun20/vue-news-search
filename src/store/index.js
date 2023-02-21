import { createStore } from 'vuex'
import axios from "axios"

const apiKey = process.env.VUE_APP_NEWS_API_KEY;

export default createStore({
  state: {
    searchTerm: "",
    country: "us",
    category: "business",
    articles: [],
    loading: false,
    error: null,
    page: 1
  },
  getters: {
    getArticles(state) {
      return state.articles;
    }
  },
  mutations: {
    setSearchParams(state, searchParams) {
      state.searchTerm = searchParams.search;
      state.country = searchParams.country;
      state.category = searchParams.category;
    },
    setArticles(state, articles) {
      state.articles = articles;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
    incrementPage(state) {
      state.page++;
    }
  },
  actions: {
    async fetchNews({ state, commit }) {
      commit("setLoading", true);
      commit("setError", null);

      try {
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
          headers: {
            "X-Api-Key": apiKey
          },
          params: {
            q: state.searchTerm,
            country: state.country,
            category: state.category,
            page: state.page
          }
        });

        commit("setArticles", response.data.articles);
        commit("incrementPage");
      } catch (error) {
        commit("setError", error);
      }

      commit("setLoading", false);
    }
  },
  modules: {
  }
})
