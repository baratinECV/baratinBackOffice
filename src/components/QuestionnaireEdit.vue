<template>
  <h1>Questionnaire</h1>
  <button>Editer</button>
  <p>Nom</p>
  <input disabled v-model="questionnaireModel.name">
  <p>Description</p>
    <textarea disabled v-model="questionnaireModel.name"
            rows="5" cols="33">
  It was a dark and stormy night...
  </textarea>
  <ul v-for="question in questionnaireModel.questions" :key="question.id">
    <li>
      <p>Question {{question.order}}</p>
      <p>{{question.name}}</p>
      <p>Réponses</p>
      <ul v-for="response in question.responses" :key="response.id">
        <li>{{response.name}}</li>
      </ul>
    </li>
  </ul>
</template>

<script>

export default {
  name: "QuestionnaireEdit",
  props: {
    questionnaireModelProps: [Array, Object],
  },
  computed: {
    questionnaireModel () { return this.questionnaireModelProps }
  }
}
</script>
