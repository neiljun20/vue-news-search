<template>
    <div class="search-results">
      <h2>Search Results</h2>
  
      <ul>
        <li v-for="article in articles" :key="article.url">
          <div class="article-info">
            <img :src="article.urlToImage" alt="Article thumbnail">
            <div class="article-text">
              <h3>{{ article.title }}</h3>
              <p class="article-date">{{ article.publishedAt }}</p>
              <p class="article-author">{{ article.author }}</p>
              <p class="article-description">{{ article.description }}</p>
            </div>
          </div>
          <!-- <router-link :to="{ name: 'article', params: { url: article.url } }">Read More</router-link> -->
        </li>
      </ul>
  
      <!-- <div v-if="isLoading" class="loading-indicator">Loading...</div>
      <div v-else-if="!isLoading && articles.length === 0" class="no-results-message">No results found.</div>
  
      <div v-if="showLoadMoreButton" class="load-more-button">
        <button @click="loadMore">Load More</button>
      </div> -->
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    articles(){
        return this.$store.getters.getArticles;
    }
  },
  created() {
    this.$store.dispatch('fetchNews');
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