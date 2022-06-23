<script>
import axios from "axios";

export default {
  name: "Favorites",
  data() {
    return {
      products: [],
    };
  },
  computed: {
    shop() {
      return this.$store.getters.getShop;
    },
  },
  methods: {
    async fetch() {
      return await axios
        .get("products", {
          params: {
            shop_id: this.shop.id,
          },
        })
        .then((response) => {
          this.products = response.data;
        });
    },
    async update(product) {
      product.is_favorite = !product.is_favorite;
      return await axios.patch("products/" + product.id, product);
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

<template>
  <div class="favorites">
    <div class="ariane">
      <p>Catalogue produits><span>Mes coups de coeur</span></p>
    </div>

    <h3 class="new-title">Mes coups de coeur</h3>

    <p class="desc">
      Ici retrouvez tous les produits. Sélectionnez vos produits coups de coeur.
      <br />
      Ils seront proposés aux clients qui demandent à voir les coups de coeur.
    </p>

    <ul class="products">
      <li
        v-for="product in products"
        :key="product.id"
        :class="'product' + (product.is_favorite ? ' favorite' : '')"
        @click="update(product)"
      >
        <img
          class="product-img"
          src="../assets/product.png"
          alt="image d'un produit"
        />
        <div class="content-favorite">
          <img class="like" src="../assets/like.png" alt="icon like" />
          <img class="liked" src="../assets/liked.png" alt="icon liked" />
        </div>
        <div class="desc-container">
          <p class="title">{{ product.name }}</p>
          <p class="sous-title">Côtes de Gascogne</p>
          <p class="pricing">{{ product.price }} €</p>
        </div>
      </li>
    </ul>
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
.favorites {
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
    flex-wrap: wrap;
    gap: 46px;
    list-style: none;
    padding-inline-start: 0;
    margin-block-start: 0;

    .product {
      position: relative;
      max-width: 340px;
      height: 367px;
      box-sizing: border-box;
      box-shadow: 0px 1px 8px rgba(29, 33, 57, 0.08);

      &.favorite {
        .content-favorite {
          .like {
            display: none;
          }

          .liked {
            display: block;
          }
        }
      }

      .product-img {
        height: 270px;
      }
      .content-favorite {
        display: flex;
        width: 50px;
        height: 50px;
        background-color: $white;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 8px;
        top: 8px;
        border-radius: 50px;

        .like {
          display: block;
        }

        .liked {
          display: none;
        }
      }

      .desc-container {
        max-width: 340px;
        height: 95px;
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
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
