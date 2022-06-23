<template>
  <h1>Questionnaire</h1>
  <button>Editer</button>
  <p>Nom : {{questionnaireModel.name}}</p>
  <p>Description : {{questionnaireModel.description}}</p>
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
