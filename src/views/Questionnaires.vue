<script>
import axios from "axios";

export default {
  name: "Questionnaires",
  data() {
    return {
      questionnaire_models: [],
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
        .get("questionnaire_models", {
          params: {
            shop_id: this.shop.id,
          },
        })
        .then((response) => {
          this.questionnaire_models = response.data;
        });
    },
    async toggleActiveShop() {
      return await axios
        .patch("shops/" + this.shop.id, {
          is_active: !this.shop.is_active,
        })
        .then((response) => {
          this.$store.setShop(response.data);
        });
    },
    async create() {
      return await axios
        .post("questionnaire_models", {
          name: "Questionnaire",
          is_active: false,
          shop_id: this.shop.id,
        })
        .then((response) => {
          this.questionnaire_models.push(response.data);
        });
    },
    async destroy(questionnaire_model_id) {
      return await axios
        .delete("questionnaire_models/" + questionnaire_model_id)
        .then(() => {
          this.questionnaire_models = this.questionnaire_models.filter(
            (questionnaire_model) =>
              questionnaire_model.id !== questionnaire_model_id
          );
        });
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

<template>
  <div class="container-questionnaires">
    <div class="ariane">
      <p>Mon profil><span>Pack immersion</span></p>
    </div>

    <div class="immersion">
      <label class="switch">
        <input
          type="checkbox"
          :checked="shop.is_active"
          @click="toggleActiveShop"
        />
        <span class="slider round"></span>
      </label>
      <p>Pack immersion activé</p>
    </div>

    <div class="container-title">
      <div class="left">
        <h3 class="new-title">
          Pourquoi activer mon <span class="text-orange">pack immersion</span> ?
        </h3>
        <p class="desc">
          Le pack immersion vous permet de vendre sur internet comme en magasin.
          Il est utile dans les cas où :
        </p>
        <ul class="pourquoi">
          <li>
            Vous souhaitez faire
            <span class="text-orange">découvrir et recréer</span> une expérience
            en ligne comme en magasin
          </li>
          <li>
            Vous souhaitez <span class="text-orange">conseiller</span> vos
            clients mais vous manquez de temps
          </li>
          <li>
            Vous souhaitez proposer des conseils même lorsque votre boutique est
            <span class="text-orange">fermée</span>
          </li>
          <li>Vous souhaitez créer le lien entre vous et les clients</li>
        </ul>
      </div>
      <div class="right">
        <img src="../assets/immersion/vacances.png" alt="illustration" />
      </div>
    </div>

    <div class="questionnaires">
      <ul>
        <li class="list-create">
          <div class="add-question">
            <div class="icon-add" @click="create">
              <img
                src="../assets/immersion/more.png"
                alt="icon pour crée un questionnaire"
              />
            </div>
            <p @click="create">Créer un questionnaire</p>
          </div>
        </li>
        <li
          class="container-question"
          v-for="questionnaire_model in questionnaire_models"
          :key="questionnaire_model.id"
        >
          <div class="question">
            <p>
              {{ questionnaire_model.name }}
            </p>
            <img
              :class="
                'toto' + (questionnaire_model.is_active ? ' selected' : '')
              "
              src="../assets/immersion/caviste.png"
              alt="illustration caviste"
            />

            <div class="action-question">
              <router-link :to="'/questionnaire/' + questionnaire_model.id"
                >Modifier</router-link
              >
              <div
                class="delete-questionnaire"
                @click="destroy(questionnaire_model.id)"
              >
                <img
                  src="../assets/immersion/poubelle.png"
                  alt="icon pour supprimer un questionnaire"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
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

.container-questionnaires {
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
    align-items: center;

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

      .pourquoi {
        text-align: left;
        color: #8797a6;

        .text-orange {
          color: $orange;
        }
      }
    }

    .right {
      margin-right: 160px;
      img {
        width: 280px;
      }
    }
  }

  .questionnaires {
    ul {
      display: flex;
      flex-wrap: wrap;
      margin-block-start: 0;
      margin-block-end: 0;
      padding-inline-start: 0;
      margin-left: 97px;
      margin-top: 65px;

      li {
        list-style: none;
        width: 215px;
        margin-left: 30px;
        margin-right: 93px;

        &:nth-child(4) {
          margin-right: 0;
        }
        &:nth-child(5) {
          margin-right: 63px;
        }
        &:nth-child(9) {
          margin-right: 63px;
        }
        &:nth-child(13) {
          margin-right: 63px;
        }

        .add-question {
          display: flex;
          flex-direction: column;
          width: 215px;

          .icon-add {
            width: 215px;
            height: 225px;
            background-color: $beige;
            border-radius: 30px;
            border: 4px dashed $orange;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-bottom: 24px;
            box-sizing: border-box;
          }

          p {
            padding: 10px 24px;
            border-radius: 8px;
            font-family: $font-path;
            font-weight: 500;
            font-size: 14px;
            cursor: pointer;
            background-color: $orange;
            color: $white;
            border-color: $orange;
            text-decoration: none;
          }
        }

        &.container-question {
          width: 277px;
          height: 284px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 82px;
          margin-left: 0;

          .question {
            p {
              text-align: center;
              font-weight: 500;
              margin-bottom: 10px;
            }

            .toto {
              opacity: 0.5;

              &.selected {
                opacity: 1;
              }
            }

            .action-question {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              margin-top: 20px;
              gap: 8px;

              a {
                background-color: $orange;
                padding: 10px 24px;
                color: $white;
                border-radius: 8px;
                text-decoration: none;
                font-family: $font-path;
                font-weight: 500;
                font-size: 14px;
              }

              .delete-questionnaire {
                width: 42px;
                height: 35px;
                background-color: $red;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 8px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
