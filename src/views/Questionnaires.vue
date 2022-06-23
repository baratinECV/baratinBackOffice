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
          .patch('shops/' + this.shop.id, {
            'is_active': !this.shop.is_active
          })
          .then((response) => {
            this.$store.setShop(response.data)
          })
    },
    async create () {
      return await axios
          .post('questionnaire_models', {
            'name': 'Questionnaire',
            'is_active': false,
            'shop_id': this.shop.id
          })
          .then((response) => {
            this.questionnaire_models.push(response.data)
          })
    },
    async destroy (questionnaire_model_id) {
      return await axios
          .delete('questionnaire_models/' + questionnaire_model_id)
          .then(() => {this.questionnaire_models = this.questionnaire_models.map(questionnaire_model => questionnaire_model.id !== questionnaire_model_id)})
    }
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
      <li><button @click="create">Créer un questionnaire</button></li>
      <li v-for="questionnaire_model in questionnaire_models" :key="questionnaire_model.id">
        <p>{{ questionnaire_model.name }} ({{questionnaire_model.is_active ? 'Activé' : 'Désactivé'}})</p>
        <router-link :to="'/questionnaire/' + questionnaire_model.id">Editer</router-link>
        <button @click="destroy(questionnaire_models.id)">Supprimer</button>
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
}
</style>
