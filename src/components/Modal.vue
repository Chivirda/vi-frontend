<template>
  <div>
    <md-dialog class="modal" :md-active.sync="showDialog">
      <task-form
        :title="task.name"
        :description="task.description"
        @change-title="changeTitle"
        @change-description="changeDescription"
      />
    </md-dialog>
  </div>
</template>
<script>
import TaskForm from '@/components/TaskForm';
export default {
  name: 'Modal',
  data: () => ({
    showDialog: '',
  }),
  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    TaskForm,
  },
  methods: {
    changeTitle(e) {
      this.$emit('change-title', e);
    },
    changeDescription(e) {
      this.$emit('change-description', e);
    },
  },
};
</script>
<style lang="scss" scoped>
.modal {
  &::v-deep .md-dialog-container {
    padding: 16px;
  }
}
</style>
