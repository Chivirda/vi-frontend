<template>
  <div>
    <md-list class="task__list">
      <md-button @click="isCreateModalShow = true" class="md-raised md-accent">Создать заявку</md-button>
      <router-link v-for="task in tasks" :to="`/task/${task.id}`" :key="task.id">
        <md-list-item class="task__item md-error" :class="`task__item--${task.className}`">
          <span class="task__number">{{ task.id }}</span>
          <div class="task__group">
            <span class="task__name">{{ task.title }}</span>
          </div>
        </md-list-item>
      </router-link>
    </md-list>
    <md-dialog :md-active.sync="isCreateModalShow" :class="messageClass">
      <md-card class="create-task">
        <span class="md-error form-error">{{ this.formError.message }}</span>
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
          <md-button @click="createTask" class="md-raised md-accent">Отправить запрос</md-button>
        </md-card-actions>
      </md-card>
    </md-dialog>
  </div>
</template>

<script>
const classMap = ['await', 'active', 'done'];

export default {
  name: 'TripleLine',
  data() {
    return {
      tasks: [],
      formError: {
        hasError: false,
        message: '',
      },
      isCreateModalShow: false,
      title: '',
      message: '',
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    async createTask() {
      try {
        const response = await this.$api.post('request/add', {
          title: this.title,
          message: this.message,
        });
        this.resetForm();
        if (response.data.error) {
          this.formError.hasError = response.data.error;
          this.formError.message = response.data.message;
          console.log(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getTasks() {
      try {
        const response = await this.$api.post('request/list');
        this.tasks = response.data.data.map((task) => ({ ...task, className: classMap[task.status.id] }));
      } catch (error) {
        console.error(error);
      }
    },
    resetForm() {
      this.title = '';
      this.message = '';
    },
    closeModalForm() {
      this.isCreateModalShow = false;
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
  &__list {
    width: 100%;
    max-width: 854px;
    display: inline-block;
    vertical-align: top;

    &::v-deep a:hover {
      text-decoration: none;
    }
  }

  &__item {
    height: 200px;
    width: 100%;
    display: flex;
    align-items: center;

    &--await {
      background-color: #db545a;
    }

    &--done {
      background-color: #37ce7e;
    }

    &--active {
      background-color: #4c7397;
    }
  }

  &__number {
    height: 100%;
    width: 203px;
    color: #fff;
    font-size: 64px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__number::before {
    content: '';
    display: block;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.6);
    width: 203px;
    min-height: 209px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &__group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding-left: 10%;
  }

  &__name {
    color: #fff;
    font-size: 32px;
    font-weight: 600;
  }

  &__text {
    color: #fff;
    font-size: 16px;
    font-weight: normal;
    margin: 0;
  }
}

.md-list-item-content {
  padding: 0 !important;
}

.md-list-item-container {
  height: 100%;
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
</style>
