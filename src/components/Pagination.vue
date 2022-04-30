<template>
  <div class="pagination">
    <div class="pagination-control">
      <button class="pagination-action left" :disabled="page <= 1">
        <span class="icon chevron-left" @click="page >= 1 && onPageChange(page - 1)">
          <Icon name="chevron-left" />
        </span>
      </button>
      <div class="pagination-number">
        <span>{{ page }}</span>
      </div>
      <button class="pagination-action right" :disabled="disabledRightButton">
        <span class="icon chevron-right" @click="!disabledRightButton && onPageChange(page + 1)">
          <Icon name="chevron-right" />
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { defineComponent } from 'vue';
import Icon from './Icon.vue';

export default defineComponent({
  name: 'Pagination',
  components: {
    Icon,
  },
  props: {
    page: {
      type: Number,
    },
    disabledRightButton: {
      type: Boolean,
    },
  },
  methods: {
    onPageChange(newPageValue: number) {
      this.$emit('update:page', newPageValue);
    },
  },
});
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  & > .pagination-control {
    display: flex;
    user-select: none;

    & > .pagination-number {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem 1rem;
      background-color: $backgroundColor;
      line-height: 100%;
      border: 1px solid $whiteColor;

      & > span {
        color: $primaryColor;
      }
    }

    & > button.pagination-action {
      background-color: $backgroundColor;
      border: 1px solid $whiteColor;
      padding: 0.25rem 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: $whiteColor;
      }
    }
  }
}
</style>
