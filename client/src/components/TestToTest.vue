<template>
  <div>
    <ul v-show="items.length">
      <li v-for="(item, i) in items" :key="i">{{item}}</li>
    </ul>
    <button @click="removeList" type="reset">Reset</button>
    <form @submit.prevent="onSubmit">
      <input data-testid="name" type="text" v-model="name" />
      <button type="submit">Get name</button>
    </form>
  </div>
</template>

<script>
// TODO:remove for production

import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      items: ["o"],
      name: "",
      counter: 0,
      interval: null
    };
  },
  watch: {
    internalValue(items) {
      this.$emit("itemsSetted", items);
    }
  },
  computed: {
    ...mapGetters(["backTitle"])
  },
  mounted() {
    this.interval = setInterval(() => {
      this.counter++;
      if (this.counter == 10) this.$destroy();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  destroyed() {
    this.$el.remove();
  },
  methods: {
    removeList() {
      this.items = [];
    },
    setFlag() {
      this.falg = true;
    },
    onSubmit() {
      this.$emit("submitted", { name: this.name });
    }
  }
};
</script>