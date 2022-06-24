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
          <button v-if="!question.responses || key + 1 === question.responses.length" @click="createResponse(question.id)">Ajouter</button>
        </li>
        <p>Ajoutez vos tags</p>
        <ul v-for="tag in tags" :key="tag.id">
          <li @click="responseHasTag(response, tag.id) ? detachTag(response, tag) : attachTag(response, tag)" :class="responseHasTag(response, tag.id) ? 'tagSelected' : ''">{{tag.name}}</li>
        </ul>
      </ul>
      <button v-if="!question.responses || (question.responses && !question.responses.length > 0)" @click="createResponse(question.id)">Ajouter</button>
    </li>
    <li class="model-question">
      <p>Question {{questionnaireModel.questions ? questionnaireModel.questions.length + 1 : 1}}</p>
      <input type="text" disabled>
      <p>Réponses</p>
      <ul>
        <li>
          <input disabled>
          <button disabled>Supprimer</button>
          <button disabled>Ajouter</button>
        </li>
      </ul>
    </li>
  </ul>
  <div v-if="!questionnaireModel.questions || questionnaireModel.questions.length === 0" class="model-question">
    <p>Question {{questionnaireModel.questions ? questionnaireModel.questions.length + 1 : 1}}</p>
    <input type="text" disabled>
    <p>Réponses</p>
    <ul>
      <li>
        <input disabled>
        <button disabled>Supprimer</button>
        <button disabled>Ajouter</button>
      </li>
    </ul>
  </div>
  <button @click="createQuestion">+ Ajouter une question</button>
  <button @click="$emit('changeMode')">Retourner en mode vue</button>
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
  data () {
    return {
      tags: []
    }
  },
  methods: {
    async attachTag(response, tag) {
      return await axios
          .post("responses/" + response.id + "/tags/" + tag.id)
          .then(() => {
            this.questionnaireModel.questions = this.questionnaireModel.questions.map((question) => {
              question.responses = question.responses.map((response) => {
                response.tags.push(tag)
                return response
              })
              return question
            })
          });
    },
    async detachTag(response, tag) {
      return await axios
          .delete("responses/" + response.id + "/tags/" + tag.id)
          .then(() => {
            this.questionnaireModel.questions = this.questionnaireModel.questions.map((question) => {
              question.responses = question.responses.map((response) => {
                response.tags = response.tags.filter((tagResponse) => tagResponse.id !== tag.id)
                return response
              })
              return question
            })
          });
    },
    async fetchTags() {
      return await axios
          .get("tags")
          .then((response) => {
            this.tags = response.data
          });
    },
    responseHasTag(response, tag) {
      if (!response.tags) return false;
      return response.tags.map((responseTag) => responseTag.id).includes(tag);
    },
    async createQuestion() {
      return await axios
          .post("questions", {
            questionnaire_model_id: this.questionnaireModel.id
          })
          .then((response) => {
            this.questionnaireModel.questions = this.questionnaireModel.questions ? this.questionnaireModel.questions : []
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
            this.questionnaireModel = this.questionnaireModel.questions.map((question) => {
              question.responses = question.responses ? question.responses : []
              question.responses.push(response.data)
              return question
            });
          });
    },
    async destroyResponse(questionId, responseId) {
      return await axios
          .delete("responses/" + responseId)
          .then(() => {
            this.questionnaireModel = this.questionnaireModel.questions.map((question) => {
              if (question.id === questionId) {
                question.responses = question.responses.filter((response) => response.id !== responseId);
              }
              return question
            });
          });
    },
  },
  mounted () {
    this.fetchTags()
  }
}
</script>

<style lang="scss" scoped>
.tagSelected {
  color: red;
}
</style>
