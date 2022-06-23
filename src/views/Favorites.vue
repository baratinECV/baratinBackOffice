<template>
  <div class="favorites">
    <h1>Coups de coeur</h1>
    <ul class="products">
      <li v-for="product in products" :key="product.id" :class="'product' + (product.is_favorite ? ' favorite' : '')" @click="update(product)">{{ product.name }}</li>
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
            this.products = response.data
          })
    },
    async update (product) {
      product.is_favorite = !product.is_favorite
      return await axios.patch('products/' + product.id, product)
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>

<style lang="scss">
.products {
  .product {
    cursor: pointer;
    &.favorite {
      color: red;
    }
  }
}
</style>
