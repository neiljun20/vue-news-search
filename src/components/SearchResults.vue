<template>
  <div class="search-results">
    <h2>{{ articles.length }} News Results</h2>

    <div class="flex-container">
      <div class="flex-item" v-for="article in articles" :key="article.url">
        <div class="article-info">
          <img :src="article.urlToImage" alt="Article thumbnail">
          <div class="article-text">
            <h3>{{ article.title }}</h3>
            <p class="article-author">{{ article.author }}</p>
            <p class="article-description">{{ article.description }}</p>
            <div class="article-date">Published: {{ toLocaleDate(article.publishedAt) }}</div>
            <router-link :to="{
              name: 'article',
              query: {
                title: article.title,
                country,
                category
              }
            }" class="btn">
              Read More
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="loading-indicator">Loading...</div>
    <div v-else-if="!isLoading && articles.length === 0" class="no-results-message">No results found.</div>
    <div class="load-more-button" v-if="!isFetching && articles.length">
      <button ref="loadMoreButton" @click="loadMore">Load More</button>
    </div>
  </div>
</template>
  
<script>
import { toLocaleDate } from "@/utils/toLocaleDate";
export default {
  data(){
    return {
      isFetching: false
    }
  },
  computed: {
    isLoading(){
      return this.$store.getters.getLoading;
    },
    articles(){
      return this.$store.getters.getArticles;
    },
    country(){
      return this.$store.getters.getCountry;
    },
    category(){
      return this.$store.getters.getCategory;
    }
  },
  created() {
    this.isFetching = true;
    this.$store.dispatch('fetchNews').then(() => {
      this.isFetching = false;
    });
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    toLocaleDate(date){
      return toLocaleDate(date);
    },
    handleScroll() {
      const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      if (bottomOfWindow && !this.isFetching) {
        this.isFetching = true;
        this.$refs.loadMoreButton.click();
      }
    },
    loadMore(){
      this.$store.dispatch('fetchNews', true).then(() => {
        this.isFetching = false;
      });
    }
  }
};
</script>
  
<style scoped>
.article-info {
  margin-bottom: 20px;
}

.article-info img {
  width: 100%;
  height: auto;
  margin-right: 20px;
}

.article-text{
  padding: 0 20px 0 20px;
}

.article-text h3 {
  font-size: 24px;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
          line-clamp: 2;
  -webkit-box-orient: vertical;
}

.article-text p {
  margin-bottom: 5px;
}

.article-date {
  font-size: 12px;
  color: gray;
  margin-bottom: 20px;
}

.article-text .article-author {
  font-size: 14px;
  font-weight: bold;
}

.article-text .article-description {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
          line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 20px;
}

.load-more-button {
  text-align: center;
  margin-top: 20px;
}

.flex-item {
  flex: 30%;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
}

.search-results > h2{
  text-align: center;
}

@media screen and (max-width: 800px) {
  .flex-item {
    flex: 40%;
  }
}

@media screen and (max-width: 600px) {
  .flex-item {
    flex: 100%;
  }
}
</style>