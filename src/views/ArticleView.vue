<template>
  <div class="article">
    <div class="container">
      <ArticleDetails/>
    </div>
  </div>
</template>

<script>
import ArticleDetails from '@/components/ArticleDetails.vue';

export default {
  name: 'ArticleView',
  components: {
    ArticleDetails
  }
}
</script>