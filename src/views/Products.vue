<script>
import axios from "axios";

export default {
  name: "Products",
  data() {
    return {
      product: {},
      tags: [],
    };
  },
  computed: {
    shop() {
      return this.$store.getters.getShop;
    },
  },
  methods: {
    async getProduct(params = {}) {
      if (params.next)
        return await axios
          .get("products/" + this.product.id, { params: params })
          .then((response) => {
            this.product = response.data;
          });
      else if (params.previous)
        return await axios
          .get("products/" + this.product.id, { params: params })
          .then((response) => {
            this.product = response.data;
          });
      else
        return await axios
          .get("products", { params: { shop_id: this.shop.id, random: true } })
          .then((response) => {
            this.product = response.data[0];
          });
    },
    async getTags() {
      return await axios.get("tags").then((response) => {
        this.tags = response.data.map((tag) => {
          tag.selected = this.productHasTag(tag.id);
          return tag;
        });
      });
    },
    productHasTag(tag) {
      if (!this.product.tags) return false;
      return this.product.tags.map((productTag) => productTag.id).includes(tag);
    },
    async syncProductTags() {
      await axios
        .patch("products/" + this.product.id + "/tags", {
          tags: this.tags.filter((tag) => tag.selected).map((tag) => tag.id),
        })
        .then(() => this.next());
    },
    previous() {
      this.getProduct({ previous: true });
      this.getTags();
    },
    next() {
      this.getProduct({ next: true });
      this.getTags();
    },
  },
  mounted() {
    this.getProduct();
    this.getTags();
  },
};
</script>

<template>
  <div class="ariane">
    <p>Mon profil>Pack immersion>Mon questionnaire><span>produits</span></p>
  </div>
  <h3 class="new-title">Mes produits</h3>
  <p class="desc">
    Attribuez des tags à vos produits pour que le pack immersion soit
    complet.<br />
    Votre client pourra avoir une selection de produits personnalisés.
  </p>
  <div class="products">
    <div class="containe-product">
      <img src="../assets/product.png" alt="image d'un produit" />
      <div class="desc-container">
        <p class="title">{{ product.name }}</p>
        <p class="sous-title">Côtes de Gascogne</p>
        <p class="pricing">{{ product.price }} €</p>
      </div>
    </div>
    <!-- <p>{{ product.name }} id: ({{ product.id }})</p>
    <p>mini description : à rajouter en bdd...</p>
    <p>prix : {{ product.price }} &euro;</p> -->
    <section class="form">
      <h3>Quels sont les attributs de votre produits ?</h3>
      <p class="sous-title">
        Sélectionnez les attributs correspondants à votre produits.
      </p>
      <ul class="tags">
        <li
          v-for="tag in tags"
          :key="tag.id"
          :class="'tag' + (tag.selected ? ' selected' : '')"
          @click="() => (tag.selected = !tag.selected)"
        >
          {{ tag.name }}
        </li>
      </ul>

      <div class="action">
        <button class="btn-secondary" @click="previous">
          Modifier le produit précédent
        </button>
        <button class="btn-primary" @click="syncProductTags">Valider</button>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
$orange: #de8e00;
$blue: #292d43;
$light-blue: #e3f0f6;
$green: #07aa7c;
$red: #db3d63;
$beige: #fefaf7;
$white: #ffffff;
$black: #000000;

@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

$font-path: "Montserrat", sans-serif;

.font-regular {
  font-family: $font-path;
  font-weight: 400;
}

.font-medium {
  font-family: $font-path;
  font-weight: 500;
}

.font-semi-bold {
  font-family: $font-path;
  font-weight: 600;
}

.font-bold {
  font-family: $font-path;
  font-weight: 700;
}

h1 {
  font-family: $font-path;
  font-weight: 700;
  font-size: 16px;
}

h2 {
  font-family: $font-path;
  font-size: 16px;
  line-height: 19.2px;
  font-weight: 600;
}

h3 {
  font-family: $font-path;
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  color: $blue;
  line-height: 16.8px;
  margin: 0;
}

h4 {
  font-family: $font-path;
  font-size: 12px;
  line-height: 14.4px;
  font-weight: 500;
}

p {
  font-family: $font-path;
  font-size: 16px;
  line-height: 19.6px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  text-align: left;
}
.ariane {
  margin-bottom: 20px;
  p {
    text-align: left;
  }
  span {
    font-weight: 700;
  }
}

.new-title {
  position: relative;
  margin-bottom: 25px;
  z-index: -1;

  &::after {
    content: "";
    width: 110px;
    height: 2px;
    background-color: $orange;
    position: absolute;
    bottom: -15px;
    left: 0;
  }
}

.desc {
  text-align: left;
  color: #8797a6;
  margin-bottom: 65px;
}

.products {
  display: flex;
  gap: 26px;

  .containe-product {
    max-width: 442px;
    height: 478px;
    box-sizing: border-box;
    box-shadow: 0px 1px 8px rgba(29, 33, 57, 0.08);

    .desc-container {
      max-width: 442px;
      height: 125px;
      padding: 9px 9px 9px 13px;
      border: 1px solid $light-blue;
      border-top: 0;
      box-sizing: border-box;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;

      .title {
        color: $blue;
        font-weight: 600;
      }

      .sous-title {
        color: #8797a6;
        font-size: 12px;
      }

      .pricing {
        color: $blue;
        font-size: 16px;
        font-weight: 600;
        margin-top: 28px;
      }
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    height: 478px;

    .sous-title {
      margin-top: 15px;
      margin-bottom: 22px;
      text-align: left;
      color: #8797a6;
    }

    .tags {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      padding-inline-start: 0;
      margin-block-start: 0;

      .tag {
        cursor: pointer;
        padding: 12px 24px;
        border: 1.5px solid $orange;
        color: $black;
        border-radius: 50px;
        list-style: none;
        margin-bottom: 16px;

        &.selected {
          background-color: $orange;
          color: $white;
        }
      }
    }

    .action {
      display: flex;
      gap: 16.5px;
      margin-top: 162px;

      .btn-secondary {
        padding: 10px 24px;
        border: 1px solid $blue;
        border-radius: 8px;
        background-color: $white;
        color: $blue;
        font-family: $font-path;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;

        &:hover {
          background-color: $orange;
          border-color: $orange;
          color: $white;
        }
      }

      .btn-primary {
        padding: 10px 24px;
        border: 1px solid $orange;
        border-radius: 8px;
        background-color: $orange;
        color: $white;
        font-family: $font-path;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;

        &:hover {
          background-color: $white;
          border-color: $blue;
          color: $blue;
        }
      }
    }
  }
}
</style>
