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
// import db from "@/db";

export default {
  data: () => ({
    items: ["o"],
    name: ""
  }),
  methods: {
    removeList() {
      this.items = [];
    },
    onSubmit() {
      this.$emit("submitted", { name: this.name });
    }
  }
  // async created() {
  //   try {
  //     this.items = await db.database().ref("users");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
};
</script>