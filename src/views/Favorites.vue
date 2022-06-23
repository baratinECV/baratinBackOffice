<template>
  <div class="favorites">
    <h1>Coups de coeur</h1>
    <ul>
      <li v-for="product in products" :key="product.id">{{ product.name }}</li>
    </ul>
  </div>
</template>

<script>

import axios from "axios"

export default {
  name: 'Favorites',
  data () {
    return {
      products: []
    }
  },
  computed : {
    shop () {
      return this.$store.getters.getShop
    }
  },
  methods: {
    async fetch () {
      return await axios
          .get('products', {
            params: {
              shop_id: this.shop.id
            }
          })
          .then((response) => {
            this.products.push(...response.data)
          })
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>

<style lang="scss"></style>
