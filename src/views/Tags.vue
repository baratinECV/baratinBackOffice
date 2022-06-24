<script>
// import axios from "axios";

export default {
  name: "Tags",
  //   data() {
  //     return {
  //       products: [],
  //     };
  //   },
  //   computed: {
  //     shop() {
  //       return this.$store.getters.getShop;
  //     },
  //   },
  //   methods: {
  //     async fetch() {
  //       return await axios
  //         .get("products", {
  //           params: {
  //             shop_id: this.shop.id,
  //           },
  //         })
  //         .then((response) => {
  //           this.products = response.data;
  //         });
  //     },
  //     async update(product) {
  //       product.is_favorite = !product.is_favorite;
  //       return await axios.patch("products/" + product.id, product);
  //     },
  //   },
  //   mounted() {
  //     this.fetch();
  //   },
};
</script>

<template>
  <div class="container-tags">
    <div class="ariane">
      <p>Mon profil><span>Pack immersion</span></p>
    </div>

    <div class="immersion">
      <label class="switch">
        <input type="checkbox" />
        <span class="slider round"></span>
      </label>
      <p>Pack immersion activé</p>
    </div>

    <div class="container-title">
      <div class="left">
        <h3 class="new-title">
          Personalisez vos <span class="text-orange">tags</span>
        </h3>
        <p class="desc">
          Retrouvez ici tous les tags que vous pouvez ajouter à vos produits,
          ainsi qu’à vos réponses dans les questionnaires.
        </p>
      </div>
      <div class="right">
        <img src="../assets/immersion/vacances.png" alt="illustration" />
      </div>
    </div>

    <div class="content-tags">
      <ul>
        <li>
          <div>
            <p>Boeuf</p>
            <div class="close">
              <img
                src="../assets/immersion/close.png"
                alt="icon pour supprimer un tag"
              />
            </div>
          </div>
        </li>
        <li>
          <div>
            <p>Boeuf</p>
            <div class="close">
              <img
                src="../assets/immersion/close.png"
                alt="icon pour supprimer un tag"
              />
            </div>
          </div>
        </li>
        <li>
          <div>
            <p>Boeuf</p>
            <div class="close">
              <img
                src="../assets/immersion/close.png"
                alt="icon pour supprimer un tag"
              />
            </div>
          </div>
        </li>
        <li>
          <div>
            <p>Boeuf</p>
            <div class="close">
              <img
                src="../assets/immersion/close.png"
                alt="icon pour supprimer un tag"
              />
            </div>
          </div>
        </li>
      </ul>

      <div class="contain-add-tags">
        <a href="" class="btn">Ajouter un tag</a>

        <div class="valide-add">
          <div class="name">
            <p>Nom</p>
            <input />
          </div>

          <div class="description">
            <img src="../assets/immersion/plus.png" alt="" />
          </div>
        </div>
      </div>
    </div>
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
input {
  border: 1px solid #b2b8d4;
  width: 448px;
  height: 40px;
  border-radius: 8px;
  padding-left: 16px;
  background-color: $white;
  font-family: $font-path;
  font-weight: 500;
  font-size: 14px;
}

.container-tags {
  .ariane {
    margin-bottom: 20px;
    p {
      text-align: left;
    }
    span {
      font-weight: 700;
    }
  }

  .immersion {
    display: flex;
    align-items: center;
    margin-bottom: 50px;

    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;

      input {
        opacity: 0;
        width: 0;
        height: 0;

        &:checked + .slider {
          background-color: $orange;
        }

        &:focus + .slider {
          box-shadow: 0 0 1px $orange;
        }

        &:checked + .slider:before {
          -webkit-transform: translateX(26px);
          -ms-transform: translateX(26px);
          transform: translateX(26px);
        }
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;

        &:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        &.round {
          border-radius: 34px;
          &:before {
            border-radius: 50%;
          }
        }
      }
    }

    p {
      margin-left: 12px;
    }
  }

  .container-title {
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      flex-direction: column;
      max-width: 650px;

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
        .text-orange {
          color: $orange;
        }
      }

      .desc {
        text-align: left;
        color: #8797a6;
        margin-bottom: 0;
      }
    }
  }

  .right {
    margin-right: 160px;
    margin-top: -70px;
    img {
      width: 280px;
    }
  }

  .content-tags {
    ul {
      padding-inline-start: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 47px;

      li {
        list-style: none;

        div {
          position: relative;
          display: flex;

          p {
            padding: 12px 24px;
            border-radius: 50px;
            border: 1px solid $orange;
            color: $blue;
            font-weight: 600;
            cursor: pointer;
          }

          .close {
            width: 21px;
            height: 21px;
            border-radius: 50px;
            background-color: $orange;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: -7px;
            right: -7px;
          }
        }
      }
    }

    .contain-add-tags {
      text-align: left;

      .btn {
        padding: 10px 24px;
        background-color: $orange;
        color: $white;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        font-size: 16px;
      }

      .valide-add {
        margin-top: 47px;
        display: flex;
        align-items: flex-end;
        gap: 18px;

        .name {
          display: flex;
          flex-direction: column;

          p {
            color: $blue;
            margin-bottom: 5px;
          }

          input {
            width: 346px;
          }
        }

        .description {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 65px;
          height: 40px;
          background-color: $orange;
          border-radius: 8px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
