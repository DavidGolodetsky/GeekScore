<template>
  <the-dialog
    header="Score Calculator"
    simple
  >
    <template #activator>
      <!-- TODO:decouple to a separete component -->
      <v-card
        dark
        raised
        class="mx-auto card-pointer"
      >
        <div class="title-wrap">
          <v-card-title class="d-flex">
            <v-icon
              class="mr-2"
              dark
            >mdi-calculator-variant-outline</v-icon>
            <span class="label_text">Score Calculator</span>
          </v-card-title>
        </div>
      </v-card>
    </template>
  </the-dialog>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>