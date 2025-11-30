<template>
  <div id="app">
    <HeaderLibrary /> 
    <main class="page-content">
      <router-view />
    </main>
    
    <FooterLibrary />
  </div>
</template>

<script>

import HeaderLibrary from '@/components/HeaderLibrary.vue';
import FooterLibrary from '@/components/FooterLibrary.vue';


export default {
  name: 'App', 
  components: {
    HeaderLibrary,
    FooterLibrary
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-content {
    flex-grow: 1; 
}
</style>