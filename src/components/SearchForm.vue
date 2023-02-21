<template>
    <form class="search-form" @submit.prevent="searchNews">
      <div class="form-group">
        <label for="search">Search</label>
        <input type="text" id="search" v-model="search" class="form-control">
      </div>
      <div class="form-group">
        <label for="country">Country</label>
        <select id="country" v-model="country" class="form-control">
          <option value="">All countries</option>
          <option v-for="(name, code) in countryCodes" :value="code" :key="code">{{ name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="category" class="form-control">
          <option value="">All categories</option>
          <option v-for="(name, id) in categories" :value="id" :key="id">{{ name }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Search</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: '',
        country: '',
        category: '',
        countryCodes: {
          'ae': 'United Arab Emirates',
          'ar': 'Argentina',
          'at': 'Austria',
          // ... list of country codes and names
        },
        categories: {
          'business': 'Business',
          'entertainment': 'Entertainment',
          'general': 'General',
          // ... list of category IDs and names
        },
      };
    },
    methods: {
      searchNews() {
        this.$store.commit('setSearchParams', {
          search: this.search,
          country: this.country,
          category: this.category,
        });
        this.$store.dispatch('fetchNews');
      },
    },
  };
  </script>