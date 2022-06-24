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

<template>
  <div class="quest-edit">
    <div class="content-desc">
      <div class="name">
        <p>Nom</p>
        <input v-model="questionnaireModel.name" />
      </div>

      <div class="description">
        <p>Description</p>
        <input v-model="questionnaireModel.description" />
      </div>
    </div>

    <ul
      class="questions-container"
      v-for="question in questionnaireModel.questions"
      :key="question.id"
    >
      <li>
        <p>Question {{ question.order }}</p>

        <input v-model="question.name" />
        <button @click="destroyQuestion(question.id)">Supprimer</button>
        <p>Réponses</p>
        <ul v-for="(response, key) in question.responses" :key="response.id">
          <li>
            <input v-model="response.name" />
            <button @click="destroyResponse(question.id, response.id)">
              Supprimer
            </button>
            <button
              v-if="
                !question.responses || key + 1 === question.responses.length
              "
              @click="createResponse(question.id)"
            >
              Ajouter
            </button>
          </li>
        </ul>
        <button
          v-if="
            !question.responses ||
            (question.responses && !question.responses.length > 0)
          "
          @click="createResponse(question.id)"
        >
          Ajouter
        </button>
      </li>
      <!-- <li class="model-question">
        <h2>
          Question
          {{
            questionnaireModel.questions
              ? questionnaireModel.questions.length + 1
              : 1
          }}
        </h2>
        <input type="text" disabled />
        <p>Réponses</p>
        <ul>
          <li>
            <input disabled />
            <button disabled>Supprimer</button>
            <button disabled>Ajouter</button>
          </li>
        </ul>
      </li> -->
    </ul>
    <!-- <div
      v-if="
        !questionnaireModel.questions ||
        questionnaireModel.questions.length === 0
      "
      class="model-question"
    >
      <h2>
        Question
        {{
          questionnaireModel.questions
            ? questionnaireModel.questions.length + 1
            : 1
        }}
      </h2>
      <input
        class="renseignez-question"
        type="text"
        placeholder="Renseignez votre question"
        disabled
      />
      <h2>Réponses</h2>
      <ul class="ul-response">
=======
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
          <input disabled />
          <button disabled>Supprimer</button>
          <button disabled>Ajouter</button>
        </li>
      </ul>
    </li>
    </div> -->
    <button @click="createQuestion">+ Ajouter une question</button>
    <button @click="$emit('changeMode')">Retourner en mode vue</button>
  </div>
</template>

<style scoped lang="scss">
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
  font-size: 20px;
  line-height: 19.2px;
  font-weight: 700;
  color: $blue;
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

a {
  font-family: $font-path;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
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
  height: 40px;
  border-radius: 8px;
  padding-left: 16px;
  background-color: $white;
  font-family: $font-path;
  font-weight: 500;
  font-size: 14px;

  &:disabled {
    color: #b2b8d4;
    opacity: 0.5;
  }
}

.quest-edit {
  .content-desc {
    display: flex;
    gap: 72px;
    margin-bottom: 42px;

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

      p {
        color: $blue;
        margin-bottom: 5px;
      }

      input {
        width: 651px;
      }
    }
  }
  .model-question {
    border: 1px solid #b2b8d4;
    border-radius: 10px;
    padding: 30px 40px;
    max-width: 1025px;
    text-align: left;

    h2 {
      margin-bottom: 27px;
    }

    .renseignez-question {
      max-width: 1005px;
      width: 1005px;
      margin-bottom: 20px;
    }

    .ul-response {
      margin-block-start: 0;
      margin-block-end: 0;
      padding-inline-start: 0;
      li {
        list-style: none;
      }
    }
  }
}
</style>