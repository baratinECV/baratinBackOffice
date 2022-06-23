<template>
  <div class="products">
    <h1>Produits</h1>
    <p>{{ product.name }} id: ({{product.id}})</p>
    <p>mini description : à rajouter en bdd...</p>
    <p>prix : {{product.price}} &euro;</p>
    <p>Liste des tags :</p>
    <section class="form">
      <ul class="tags">
        <li v-for="tag in tags" :key="tag.id" :class="'tag' + (tag.selected ? ' selected' : '')" @click="() => tag.selected = !tag.selected">{{tag.name}}</li>
      </ul>
    </section>
    <button @click="previous">Précédent</button>
    <button @click="syncProductTags">Valider</button>
  </div>
</template>

<script>

import axios from "axios"

export default {
  name: 'Products',
  data () {
    return {
      product: {},
      tags: []
    }
  },
  computed : {
    shop () {
      return this.$store.getters.getShop
    }
  },
  methods: {
    async getProduct (params = {}) {
      if (params.next) return await axios.get('products/' + this.product.id, { params: params }).then((response) => { this.product = response.data })
      else if (params.previous) return await axios.get('products/' + this.product.id, { params: params}).then((response) => { this.product = response.data })
      else return await axios.get('products', { params: { shop_id: this.shop.id, random: true } }).then((response) => { this.product = response.data[0] })
    },
    async getTags () {
      return await axios
          .get('tags')
          .then((response) => {
            this.tags = response.data.map((tag) => {
              tag.selected = this.productHasTag(tag.id)
              return tag
            })
          })
    },
    productHasTag (tag) {
      if (!this.product.tags) return false
      return this.product.tags.map((productTag) => productTag.id).includes(tag)
    },
    async syncProductTags () {
      await axios.patch('products/' + this.product.id + '/tags', {
        tags: this.tags.filter(tag => tag.selected).map(tag => tag.id)
      }).then(() => this.next())
    },
    previous () { this.getProduct({ previous: true }) ; this.getTags()},
    next () { this.getProduct({ next: true }) ; this.getTags() }
  },
  mounted() {
    this.getProduct()
    this.getTags()
  }
}
</script>

<style lang="scss">
.form {
  display: flex;
  justify-content: center;
  .tags {
    width: fit-content;
    .tag {
      cursor: pointer;
      &.selected {
        color: red;
      }
    }
  }
}
</style>
