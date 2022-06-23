<template>
  <div class="header">
    <img src="./assets/header.png" alt="header" />
  </div>
  <div class="container-page">
    <div class="sidebar">
      <img src="./assets/sidebar.png" alt="sidebar" />
    </div>
    <div class="content-page">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;

  .header {
    position: fixed;
    top: 0;
    left: 0;

    img {
      width: 100vw;
    }
  }

  .container-page {
    margin-top: 102px;

    .sidebar {
      position: fixed;
      height: 100vh;
      background-color: #fafbfe;
    }

    .content-page {
      margin-left: 350px;
      padding: 25px;
    }
  }
}
</style>
