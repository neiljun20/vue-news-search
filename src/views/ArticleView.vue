<template>
  <div class="about">
    <h1>{{ $route.query.title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'ArticleView',
  created(){
    console.log(this.$route.query.title);
  }
}
</script>