<template>
  <section v-if="task">
    <md-toolbar>
      <h1 class="md-title" style="flex: 1; text-align: left">
        {{ task.title }}
      </h1>
      <i :class="`task__text task__text--${classMap[task.status.id]}`">{{ task.status.title }}</i>
      <md-button class="task__btn" @click="editTask">Редактировать</md-button>
    </md-toolbar>
    <md-content class="container task__container">
      <strong>{{ task.message }}</strong>
    </md-content>
    <md-dialog :md-active.sync="isEditModalShow" :class="messageClass">
      <md-card class="create-task">
        <span class="md-error form-error">{{ formError.message }}</span>
        <md-card-content>
          <md-field>
            <label>Заголовок запроса</label>
            <md-input v-model="title"></md-input>
          </md-field>
          <md-field>
            <label>Текст запроса</label>
            <md-textarea v-model="message" md-autogrow></md-textarea>
          </md-field>
        </md-card-content>
        <md-card-actions class="md-gutter md-alignment-space-between">
          <md-button @click="closeModalForm" class="md-raised md-primary">Отменить</md-button>
          <md-button @click="saveTask" class="md-raised md-accent">Сохранить</md-button>
        </md-card-actions>
      </md-card>
    </md-dialog>
  </section>
  <section v-else>
    <md-progress-spinner
      class="spinner"
      :md-diameter="100"
      :md-stroke="6"
      md-mode="indeterminate"
    ></md-progress-spinner>
  </section>
</template>
<script>
export default {
  name: 'Task',
  data() {
    return {
      title: '',
      message: '',
      task: {},
      classMap: ['await', 'done', 'rejected'],
      formError: {
        hasError: false,
        message: '',
      },
      isEditModalShow: false,
    };
  },
  mounted() {
    this.getTask();
  },
  methods: {
    async getTask() {
      const response = await this.$api.get(`/request/show/${this.$route.params.id}`);
      this.task = response.data.data;
    },
    editTask() {
      this.isEditModalShow = true;
      this.title = this.task.title;
      this.message = this.task.message;
    },
    async saveTask() {
      this.task.title = this.title;
      this.task.message = this.message;

      try {
        this.isEditModalShow = false;
        // const response = await this.$api.post(`/request/edit/${this.task.id}`, this.task);
        // console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    resetForm() {
      this.title = '';
      this.message = '';
    },
    closeModalForm() {
      this.isEditModalShow = false;
      this.resetForm();
    },
  },
  computed: {
    messageClass() {
      return {
        'md-invalid': this.formError.hasError,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.task {
  &__container {
    padding-top: 16px;
    text-align: left;
    background: none !important;
  }

  &__btn {
    background-color: #37ce7e;
    border-radius: 4px;

    &::v-deep .md-button-content {
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      text-transform: none;
    }
  }

  &__text {
    &::v-deep {
      display: inline-block;
      padding: 0.35em 0.65em;
      font-size: 0.75em;
      font-weight: 700;
      line-height: 1;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 0.25rem;
    }

    &--rejected {
      background-color: #db545a;
    }

    &--done {
      background-color: #37ce7e;
    }

    &--await {
      background-color: #4c7397;
    }
  }
}

.create-task {
  padding: 30px;
  min-width: 500px;
  max-width: 100%;
}

.form-error {
  background-color: transparent;
  color: red;
}

.spinner {
  margin: 100px auto;
}
</style>
