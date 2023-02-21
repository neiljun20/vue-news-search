<template>
  <header>
    <nav class="container">
      <router-link to="/">Vue News Search</router-link>
    </nav>
  </header>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body{
  margin:0;
  background: #f3f3f3;
}

header {
  background: #2c3e50;
  padding: 10px 0;
}

nav a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

.red{
  color: red;
}

.container{
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.loading-indicator {
  text-align: center;
  margin: 20px 0;
}

.no-results-message {
  text-align: center;
  margin: 20px 0;
}

.flex-container{
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.load-more-button button, .btn {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
}
</style>
