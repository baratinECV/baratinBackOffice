<template>
  <div class="questionnaire">
    <h1>Questionnaire</h1>
    <p>Activer questionnaire</p>
    <label class="switch">
      <input
        type="checkbox"
        :checked="questionnaire_model.is_active"
        @click="toggleActiveQuestionnaire"
      />
      <span class="slider round"></span>
    </label>
    <button v-if="!edit">Editer</button>
    <p>Nom : {{questionnaire_model.name}}</p>
    <p>Description : {{questionnaire_model.description}}</p>
    <ul v-for="question in questionnaire_model.questions" :key="question.id">
      <li>
        <p>Question {{question.order}}</p>
        <p>{{question.name}}</p>
        <p>Réponses</p>
        <ul v-for="response in question.responses" :key="response.id">
          <li>{{response.name}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Questionnaire",
  props: {
    id: [Number, String],
  },
  data() {
    return {
      questionnaire_model: {},
      edit: false
    }
  },
  methods: {
    async fetch() {
      return await axios
          .get('questionnaire_models/' + this.id)
          .then((response) => {this.questionnaire_model = response.data})
    },
    async toggleActiveQuestionnaire() {
      return await axios
        .patch("questionnaire_models/" + this.id, {
          is_active: !this.questionnaire_model.is_active,
        })
        .then((response) => {
          this.questionnaire_model = response.data;
        });
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

<style scoped lang="scss">
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
      background-color: #2196f3;
    }

    &:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
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
</style>
