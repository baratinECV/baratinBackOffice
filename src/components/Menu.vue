<template>
  <header id="menu">
    <p v-if="shop" id="info-connected">Connecté en tant que {{shop.name}}</p>
    <div id="nav">
      <router-link to="/products">Produits</router-link>
      <router-link to="/favorites">Coups de coeur</router-link>
      <router-link to="/questionnaires">Pack immersion</router-link>
    </div>
  </header>
</template>

<script>

export default {
  name: 'Favorites',
  computed : {
    shop () {
      return this.$store.getters.getShop
    }
  }
}
</script>

<style lang="scss">
#menu {
  background: antiquewhite;
  #nav {
    display: flex;
    justify-content: space-around;
    padding-bottom: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  #info-connected {
    background: antiquewhite;
    padding: 20px;
  }
}
</style>
