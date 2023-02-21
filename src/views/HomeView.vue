<template>
  <div class="home">
    <SearchForm/>
    <SearchResults/>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchForm from '@/components/SearchForm.vue';
import SearchResults from '@/components/SearchResults.vue';

export default {
  name: 'HomeView',
  components: {
    SearchForm,
    SearchResults
  }
}
</script>
