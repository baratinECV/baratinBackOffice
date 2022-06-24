<script>
import axios from "axios";
export default {
  name: "QuestionnaireEdit",
  props: {
    questionnaireModelProps: [Array, Object],
  },
  computed: {
    questionnaireModel() {
      return this.questionnaireModelProps
    },
    questions () {
      let questions = []
      if (this.questionnaireModel.questions) {
        questions = this.questionnaireModel.questions
        const countQuestions = questions.length
        questions.push({
          id: 0,
          name: null,
          order: countQuestions + 1,
          questionnaire_model_id: this.questionnaireModel.id,
          responses: []
        })
      } else {
        questions = [
          {
            id: 0,
            name: null,
            order: this.questionnaireModel.questions.length,
            questionnaire_model_id: this.questionnaireModel.id,
            responses: []
          }
        ]
      }
      return questions
    },
    responseInputs () {
      const inputs = []
      for (const question in this.questions) {
        inputs[question.id] = null
      }
      return inputs
    }
  },
  data() {
    return {
      tags: []
    };
  },
  methods: {
    async save() {
      return await axios
          .patch("questionnaire_models/" + this.questionnaireModel.id)
          .then(() => {
            this.$emit('changeMode')
          });
    },
    async attachTag(response, tag) {
      return await axios
        .post("responses/" + response.id + "/tags/" + tag.id)
        .then(() => {
          this.questionnaireModel.questions =
            this.questionnaireModel.questions.map((question) => {
              question.responses = question.responses.map((response) => {
                response.tags.push(tag);
                return response;
              });
              return question;
            });
        });
    },
    async detachTag(response, tag) {
      return await axios
        .delete("responses/" + response.id + "/tags/" + tag.id)
        .then(() => {
          this.questionnaireModel.questions =
            this.questionnaireModel.questions.map((question) => {
              question.responses = question.responses.map((response) => {
                response.tags = response.tags.filter(
                  (tagResponse) => tagResponse.id !== tag.id
                );
                return response;
              });
              return question;
            });
        });
    },
    async fetchTags() {
      return await axios.get("tags").then((response) => {
        this.tags = response.data;
      });
    },
    responseHasTag(response, tag) {
      if (!response.tags) return false;
      return response.tags.map((responseTag) => responseTag.id).includes(tag);
    },
    async createQuestion() {
      return await axios
        .post("questions", {
          questionnaire_model_id: this.questionnaireModel.id,
        })
        .then(() => this.$emit('fetch'));
    },
    async editQuestion(question) {
      return await axios.patch("questions/" + question.id, { name: question.name });
    },
    async destroyQuestion(questionId) {
      return await axios.delete("questions/" + questionId).then(() => {
        this.questionnaireModel.questions = this.questionnaireModel.questions.filter((question) => question.id !== questionId);
      });
    },
    async createResponse(questionId) {
      return await axios
        .post("responses", {
          question_id: questionId,
          name: this.responseInputs[questionId]
        }).then(() => this.$emit('fetch'));
    },
    async editResponse(response) {
      return await axios.patch("responses/" + response.id, { name: response.name });
    },
    async destroyResponse(questionId, responseId) {
      return await axios.delete("responses/" + responseId).then(() => this.$emit('fetch'));
    },
    lastInArray(array, key) {
      return array && key === array.length
    }
  },
  mounted() {
    this.fetchTags();
  },
};
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
      v-for="(question, questionKey) in questions"
      :key="questionKey"
    >
      <li>
        <p class="full-title">Question {{ question.order }}</p>
        <div class="container-title">
          <input class="title-input" placeholder="Renseignez une question" v-model="question.name" :disabled="lastInArray(questions, questionKey + 1)"/>
          <div :class="'btn edit' + (lastInArray(questions, questionKey + 1) ? ' disabled' : '')" v-if="!lastInArray(questions, questionKey + 1)" @click="editQuestion(question)">
            <img src="../assets/immersion/plus.png" alt="" />
          </div>
          <div
              class="btn delete"
              v-if="!lastInArray(questions, questionKey + 1) ? ' disabled' : ''"
              @click="destroyQuestion(question.id)"
          >
            <img
                src="../assets/immersion/poubelle.png"
                alt="icon pour supprimer une question"
            />
          </div>
        </div>

        <p class="full-title">Réponses</p>
        <ul>
          <li v-for="(response) in question.responses" :key="response.id">
            <div>
              <div class="container-title">
                <input v-model="response.name" :disabled="lastInArray(questions, questionKey + 1)"/>
                <div :class="'btn edit' + (lastInArray(questions, questionKey + 1) ? ' disabled' : '')" @click="!lastInArray(questions, questionKey + 1) ? editResponse(response) : null">
                  <img src="../assets/immersion/plus.png" alt="" />
                </div>
                <div
                    class="btn delete"
                    v-if="!lastInArray(questions, questionKey + 1) ? ' disabled' : ''"
                    @click="destroyResponse(question.id, response.id)"
                >
                  <img
                      src="../assets/immersion/poubelle.png"
                      alt="icon pour supprimer une reponse"
                  />
                </div>
              </div>
              <div class="tags-container">
                <p class="full-title">Ajoutez vos tags</p>
                <ul class="tags">
                  <li v-for="tag in tags" :key="tag.id" @click="responseHasTag(response, tag.id) ? detachTag(response, tag) : attachTag(response, tag)" :class="'tag' + (responseHasTag(response, tag.id) ? ' selected' : '')">{{tag.name}}</li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <div class="container-title">
              <input placeholder="Renseignez votre réponse" v-model="responseInputs[question.id]" :disabled="lastInArray(questions, questionKey + 1)"/>
              <div :class="'btn add' + (lastInArray(questions, questionKey + 1) ? ' disabled' : '')" @click="!lastInArray(questions, questionKey + 1) ? createResponse(question.id) : null">
                <img src="../assets/immersion/plus.png" alt="" />
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <p @click="createQuestion" class="add-question">+ Ajouter une question</p>
    <footer>
      <div class="save-btn" @click="save">Sauvegarder</div>
    </footer>
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

.tags-container {
  margin-bottom: 30px;
  .tags {
    display: flex;
    flex-wrap: wrap;
    .tag {
      font-family: $font-path;
      font-size: 14px;
      padding: 12px 24px;
      border-radius: 50px;
      border: 1px solid $orange;
      color: $blue;
      font-weight: 500;
      cursor: pointer;
      margin: 5px 2px;

      &.selected {
        background: $orange;
        color: white;
      }
    }
  }
}

.quest-edit {
  .add-question {
    color: $orange;
    text-decoration: underline;
    cursor: pointer;
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    .save-btn {
      display: flex;
      width: fit-content;
      padding: 10px;
      background-color: $orange;
      border-radius: 8px;
      cursor: pointer;
      color: white;
    }
  }

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

  .questions-container {
    border: 1px solid #b2b8d4;
    border-radius: 10px;
    padding: 30px 40px;
    max-width: 1045px;
    text-align: left;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 23px;
    margin-bottom: 28px;

    li {
      list-style: none;

      .full-title {
        font-weight: 700;
        font-size: 20px;
        color: $blue;
        margin-bottom: 27px;
      }

      .container-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 28px;
        height: 40px;

        .title-input {
          width: 100%;
        }

        .btn.delete {
          width: 42px;
          min-width: 42px;
          height: 100%;
          background-color: $red;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          cursor: pointer;
          margin-left: 10px;

          &.disabled {
            opacity: 0.5;
            cursor: inherit;
          }
        }

        .btn.add, .btn.edit {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 65px;
          min-width: 65px;
          height: 100%;
          background-color: $orange;
          border-radius: 8px;
          cursor: pointer;
          margin-left: 10px;

          &.disabled {
            opacity: 0.5;
            cursor: inherit;
          }
        }
      }

      ul {
        margin-block-start: 0;
        margin-block-end: 0;
        padding-inline-start: 0;

        li {
          input {
            width: 100%;
          }
        }
      }
    }
  }
  // .model-question {
  //   border: 1px solid #b2b8d4;
  //   border-radius: 10px;
  //   padding: 30px 40px;
  //   max-width: 1025px;
  //   text-align: left;

  //   h2 {
  //     margin-bottom: 27px;
  //   }

  //   .renseignez-question {
  //     max-width: 1005px;
  //     width: 1005px;
  //     margin-bottom: 20px;
  //   }

  //   .ul-response {
  //     margin-block-start: 0;
  //     margin-block-end: 0;
  //     padding-inline-start: 0;
  //     li {
  //       list-style: none;
  //     }
  //   }
  // }
}
</style>
