<script>
export default {
  name: "QuestionnaireEdit",
  props: {
    questionnaireModelProps: [Array, Object],
  },
  computed: {
    questionnaireModel() {
      return this.questionnaireModelProps;
    },
  },
};
</script>

<template>
  <div class="quest">
    <div class="content-edit">
      <a class="edit" @click="$emit('changeMode')">Editer</a>
    </div>

    <div class="content-desc">
      <div class="name">
        <p>Nom</p>
        <input disabled v-model="questionnaireModel.name" />
      </div>

      <div class="description">
        <p>Description</p>
        <input disabled v-model="questionnaireModel.description" />
      </div>
    </div>

    <ul
      class="questions-container"
      v-for="question in questionnaireModel.questions"
      :key="question.id"
    >
      <li>
        <h2>Question {{ question.order }}</h2>

        <div class="container-reponses">
          <p class="name-question">{{ question.name }}</p>
          <p class="titre-reponse">Réponses</p>
          <ul>
            <li v-for="response in question.responses" :key="response.id">
              <p>{{ response.name }}</p>
            </li>
          </ul>
        </div>
      </li>
    </ul>
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
  }
}

.quest {
  .content-edit {
    text-align: right;
    margin-top: -55px;
    margin-bottom: 52px;
    .edit {
      padding: 10px 24px;
      background-color: $orange;
      border-radius: 8px;
      color: $white;
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
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
    text-align: left;
    margin-bottom: 42px;

    li {
      list-style: none;

      h2 {
        margin-bottom: 22px;
      }

      .container-reponses {
        border: 1px solid #b2b8d4;
        border-radius: 8px;
        padding: 18px 0;

        .name-question {
          padding-bottom: 12px;
          border-bottom: 1px solid #b2b8d4;
          padding-left: 24px;
          padding-right: 24px;
          margin-bottom: 20px;
          color: $blue;
        }

        .titre-reponse {
          padding-left: 24px;
          padding-right: 24px;
          margin-bottom: 10px;
          font-weight: 600;
          color: $blue;
        }

        ul {
          padding-left: 24px;
          padding-right: 24px;
          margin-block-start: 0;
          margin-block-end: 0;
          padding-inline-start: 24px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;

          li {
            display: flex;
            flex-wrap: wrap;
            p {
              padding: 12px 24px;
              color: $blue;
              border: 1px solid $orange;
              border-radius: 50px;
            }
          }
        }
      }
    }
  }
}
</style>
