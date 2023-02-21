<template>
  <div class="search-results">
    <h2>{{ articles.length }} News Results</h2>

    <div>
      <div v-for="article in articles" :key="article.url">
        <div class="article-info">
          <img :src="article.urlToImage" alt="Article thumbnail">
          <div class="article-text">
            <h3>{{ article.title }}</h3>
            <p class="article-author">{{ article.author }}</p>
            <p class="article-description">{{ article.description }}</p>
            <p class="article-date">Published: {{ toLocaleDate(article.publishedAt) }}</p>
          </div>
        </div>
        <router-link :to="{
          name: 'article',
          query: {
            title: article.title,
            country,
            category
          }
        }">
          Read More
        </router-link>
      </div>
    </div>

    <div v-if="isLoading" class="loading-indicator">Loading...</div>
    <div v-else-if="!isLoading && articles.length === 0" class="no-results-message">No results found.</div>
    <button v-if="!isFetching && articles.length" ref="loadMoreButton" @click="loadMore">Load More</button>
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
  display: flex;
  margin-bottom: 20px;
}

.article-info img {
  width: 120px;
  height: 120px;
  margin-right: 20px;
}

.article-text h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.article-text p {
  margin-bottom: 5px;
}

.article-text .article-date {
  font-size: 12px;
  color: gray;
}

.article-text .article-author {
  font-size: 14px;
  font-weight: bold;
}

.article-text .article-description {
  font-size: 14px;
}

.loading-indicator {
  text-align: center;
  margin: 20px 0;
}

.no-results-message {
  text-align: center;
  margin: 20px 0;
}

.load-more-button {
  text-align: center;
  margin-top: 20px;
}

.load-more-button button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>