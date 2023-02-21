import { createStore } from 'vuex'
import axios from "axios"

const apiKey = process.env.VUE_APP_NEWS_API_KEY;

export default createStore({
  state: {
    searchTerm: "",
    country: "ph",
    category: "business",
    articles: [],
    loading: false,
    error: null,
    page: 1,
    totalArticles: 0,
    selectedTitle: "",
    selectedArticle: null
  },
  getters: {
    getLoading(state) {
      return state.loading
    },
    getError(state){
      return state.error
    },
    getArticles(state) {
      return state.articles;
    },
    getCountry(state){
      return state.country;
    },
    getSingleArticle(state){
      return state.selectedArticle;
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
    },
    resetPage(state){
      state.page = 1;
    },
    setTotalArticles(state, total){
      state.totalArticles = total;
    },
    setSelectedTitle(state, article) {
      state.selectedTitle = article.title;
      state.country = article.country;
    },
    setSelectedArticle(state, article){
      state.selectedArticle = article;
    }
  },
  actions: {
    async fetchNews({ state, commit }, getMore = false) {

      if(getMore && state.totalArticles > state.articles.length){
        commit("incrementPage");
      } else if(getMore && state.totalArticles <= state.articles.length){
        return;
      } else {
        commit("resetPage");
      }

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
            page: state.page,
            pageSize: 20
          }
        });

        const articles = getMore ? [...state.articles, ...response.data.articles] : response.data.articles
        commit("setArticles", articles);
        commit("setTotalArticles", response.data.totalResults);
      } catch (error) {
        commit("setError", error);
      }

      commit("setLoading", false);
    },
    async fetchSingleNews({ state, commit}){
      commit("setSelectedArticle", null);
      commit("setError", null);

      try{
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
          headers: {
            "X-Api-Key": apiKey
          },
          params: {
            q: state.selectedTitle,
            country: state.country,
            category: state.category,
            page: 1,
            pageSize: 1
          }
        });

        commit("setSelectedArticle", response.data.articles[0]);
      } catch(error){
        commit("setError", error);
      }
    }
  },
  modules: {
  }
})
