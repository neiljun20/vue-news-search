<template>
  <form class="search-form" @submit.prevent="searchNews">
    <div class="flex-container">
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
    </div>
    <center>
      <button type="submit" class="btn search-btn">Search</button>
    </center>
  </form>
  <center v-if="error" >
    <span class="red">{{ error.response.data.message }}</span>
  </center>
</template>
  
<script>
export default {
  data() {
    return {
      search: '',
      country: '',
      category: '',
      countryCodes: {
        'ar': 'Argentina',
        'au': 'Australia',
        'at': 'Austria',
        'be': 'Belgium',
        'br': 'Brazil',
        'bg': 'Bulgaria',
        'ca': 'Canada',
        'cn': 'China',
        'co': 'Colombia',
        'cu': 'Cuba',
        'cz': 'Czech Republic',
        'eg': 'Egypt',
        'fr': 'France',
        'de': 'Germany',
        'gr': 'Greece',
        'hk': 'Hong Kong',
        'hu': 'Hungary',
        'in': 'India',
        'id': 'Indonesia',
        'ie': 'Ireland',
        'il': 'Israel',
        'it': 'Italy',
        'jp': 'Japan',
        'lv': 'Latvia',
        'lt': 'Lithuania',
        'my': 'Malaysia',
        'mx': 'Mexico',
        'ma': 'Morocco',
        'nl': 'Netherlands',
        'nz': 'New Zealand',
        'ng': 'Nigeria',
        'no': 'Norway',
        'ph': 'Philippines',
        'pl': 'Poland',
        'pt': 'Portugal',
        'ro': 'Romania',
        'ru': 'Russia',
        'sa': 'Saudi Arabia',
        'rs': 'Serbia',
        'sg': 'Singapore',
        'sk': 'Slovakia',
        'si': 'Slovenia',
        'za': 'South Africa',
        'kr': 'South Korea',
        'se': 'Sweden',
        'ch': 'Switzerland',
        'tw': 'Taiwan',
        'th': 'Thailand',
        'tr': 'Turkey',
        'ae': 'UAE',
        'ua': 'Ukraine',
        'gb': 'United Kingdom',
        'us': 'United States',
        've': 'Venezuela'
      },
      categories: {
        'business': 'Business',
        'entertainment': 'Entertainment',
        'general': 'General',
        'health': 'Health',
        'science': 'Science',
        'sports': 'Sports',
        'technology': 'Technology'
      },
    };
  },
  computed: {
    error() {
      return this.$store.getters.getError;
    }
  },
  methods: {
    searchNews() {
      this.$store.commit('setSearchParams', {
        search: this.search,
        country: this.country,
        category: this.category,
      });
      this.$store.dispatch('fetchNews');
    }
  },
};
</script>

<style scoped>

.flex-container > .form-group{
  flex: 30%;
}

.form-group > * {
  display: block;
}

.form-group > *:nth-child(2){
  width: 100%;
  padding: 5px 0;
  margin: 5px 0;
  font-size: 16px;
}

.form-group > *:nth-child(1){
  font-size: small;
  font-weight: 900;
}

.search-btn{
  margin-top: 10px;
  margin-bottom: 20px;
  width: 150px;
  font-weight: 900;
}
</style>