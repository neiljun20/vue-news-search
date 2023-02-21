<template>
  <div class="white-background">
    <div v-if="isLoading" class="loading-indicator">Loading...</div>
    <div class="align-center" v-if="error" >
      <span class="red">{{ error.response.data.message }}</span>
    </div>
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
    <div v-else-if="!isLoading && !article" class="no-results-message">No results found.</div>
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

<style scoped>
img{
  width: auto;
  max-width: 100%;
}
.white-background{
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}
</style>