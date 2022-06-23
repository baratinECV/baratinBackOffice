<template>
  <div class="questionnaire">
    <div class="ariane">
      <p>Mon profil><span>Pack immersion</span></p>
    </div>

    <div class="immersion">
      <label class="switch">
        <input
          type="checkbox"
          :checked="questionnaire_model.is_active"
          @click="toggleActiveQuestionnaire"
        />
        <span class="slider round"></span>
      </label>
      <p>Questionnaire activé</p>
    </div>
    <h3 class="new-title">
      Mon <span class="text-orange">questionnaire</span>
    </h3>
    <QuestionnaireEdit
      v-if="edit"
      :questionnaireModelProps="questionnaire_model"
      @changeMode="toggleMode"
    />
    <QuestionnaireView
      v-else
      :questionnaireModelProps="questionnaire_model"
      @changeMode="toggleMode"
    />
  </div>
</template>

<script>
import axios from "axios";
import QuestionnaireView from "@/components/QuestionnaireView";
import QuestionnaireEdit from "@/components/QuestionnaireEdit";

export default {
  name: "Questionnaire",
  components: {
    QuestionnaireView,
    QuestionnaireEdit,
  },
  props: {
    id: [Number, String],
  },
  data() {
    return {
      questionnaire_model: {},
      edit: false,
    };
  },
  methods: {
    async fetch() {
      return await axios
        .get("questionnaire_models/" + this.id)
        .then((response) => {
          this.questionnaire_model = response.data;
        });
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
    toggleMode() {
      this.edit = !this.edit;
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

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
.new-title {
  position: relative;
  margin-bottom: 42px;
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
</style>
