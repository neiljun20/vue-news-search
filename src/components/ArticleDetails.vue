<template>
  <div v-if="isLoading">Loading...</div>
  <span v-if="error" class="red">{{ error.response.data.message }}</span>
  <div v-if="article">
    <h1>{{ article.title }}</h1>
    <img :src="article.urlToImage">
    <h2>Author: {{ article.author }}</h2>
    <h3 v-if="article.source.name">Source: {{ article.source.name }}</h3>
    <h4>Publish: {{ toLocaleDate(article.publishedAt) }}</h4>
    <h4>Description</h4>
    <p>{{ article.description }}</p>
    <h4>Content</h4>
    <p>{{ article.content }}</p>
    <a :href="article.url" target="_blank">Click here to go to the full article</a>
  </div>
</template>

<script>
import { toLocaleDate } from "@/utils/toLocaleDate";
export default {
  data(){
    return{
      isLoading: false
    }
  },
  computed: {
    article(){
      return this.$store.getters.getSingleArticle;
    },
    error() {
      return this.$store.getters.getError;
    }
  },
  created(){
    this.isLoading = true;
    this.$store.commit('setSelectedTitle', {
      title: this.$route.query.title,
      country: this.$route.query.country
    });
    this.$store.dispatch("fetchSingleNews").then(() => {
      this.isLoading = false;
    });
  },
  methods: {
    toLocaleDate(date){
      return toLocaleDate(date);
    }
  }
}
</script>