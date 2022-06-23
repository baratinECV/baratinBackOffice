<template>
  <div class="questionnaires">
    <h1>Pack immersion</h1>
    <p>Activer pack immersion</p>
    <label class="switch">
      <input type="checkbox" :checked="shop.is_active" @click="toggleActiveShop">
      <span class="slider round"></span>
    </label>
    <ul>
      <li><button @click="create">Créer un questionnaire</button></li>
      <li v-for="questionnaire_model in questionnaire_models" :key="questionnaire_model.id">
        <p>{{ questionnaire_model.name }} ({{questionnaire_model.is_active ? 'Activé' : 'Désactivé'}})</p>
        <router-link :to="'/questionnaire/' + questionnaire_model.id">Editer</router-link>
        <button @click="destroy(questionnaire_models.id)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'Questionnaires',
  data () {
    return {
      questionnaire_models: []
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
          .get('questionnaire_models', {
            params: {
              shop_id: this.shop.id
            }
          })
          .then((response) => {
            this.questionnaire_models = response.data
          })
    },
    async toggleActiveShop () {
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
    this.fetch()
  }
}
</script>
