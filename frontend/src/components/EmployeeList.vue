<script>
export default {
  props: {
    employees: { type: Array, default: () => [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(emp, index) in employees"
      :key="emp.MSNV"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ emp.TenNV }}
    </li>
  </ul>
</template>
