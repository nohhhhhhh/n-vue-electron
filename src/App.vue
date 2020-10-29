<template>
  <transition mode="out-in">
    <router-view/>
  </transition>
</template>

<style lang="scss">
@import "../src/assets/scss/index";

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
<script>

</script>
