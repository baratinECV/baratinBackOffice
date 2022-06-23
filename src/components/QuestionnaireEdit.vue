<template>
  <h1>Questionnaire</h1>
  <p>Nom</p>
  <input v-model="questionnaireModel.name">
  <p>Description</p>
    <textarea v-model="questionnaireModel.name"
            rows="5" cols="33">
  It was a dark and stormy night...
  </textarea>
  <ul v-for="question in questionnaireModel.questions" :key="question.id">
    <li>
      <p>Question {{question.order}}</p>
      <input v-model="question.name">
      <button @click="destroyQuestion(question.id)">Supprimer</button>
      <p>Réponses</p>
      <ul v-for="(response, key) in question.responses" :key="response.id">
        <li>
          <input v-model="response.name">
          <button @click="destroyResponse(question.id, response.id)">Supprimer</button>
          <button v-if="key + 1 === question.responses.length" @click="createResponse(question.id)">Ajouter</button>
        </li>
      </ul>
      <button v-if="question.responses.length === 0" @click="createResponse(question.id)">Ajouter</button>
    </li>
  </ul>
  <button @click="createQuestion">+ Ajouter une question</button>
  <button @click="$emit('changeMode')">Sauvegarder</button>
</template>

<script>

import axios from "axios";

export default {
  name: "QuestionnaireEdit",
  props: {
    questionnaireModelProps: [Array, Object],
  },
  computed: {
    questionnaireModel () { return this.questionnaireModelProps }
  },
  methods: {
    async createQuestion() {
      return await axios
          .post("questions", {
            questionnaire_model_id: this.questionnaireModel.id
          })
          .then((response) => {
            this.questionnaireModel.questions.push(response.data)
          });
    },
    async destroyQuestion(questionId) {
      return await axios
          .delete("questions/" + questionId)
          .then(() => {
            this.questionnaireModel.questions = this.questionnaireModel.questions.filter((question) => question.id !== questionId);
          });
    },
    async createResponse(questionId) {
      return await axios
          .post("responses", {
            question_id: questionId
          })
          .then((response) => {
              this.questionnaireModel.questions[questionId].push(response.data)
          });
    },
    async destroyResponse(questionId, responseId) {
      return await axios
          .delete("responses/" + responseId)
          .then(() => {
            this.questionnaireModel.questions[questionId] = this.questionnaireModel.questions[questionId].filter(response => response.id !== responseId);
          });
    },
  }
}
</script>
