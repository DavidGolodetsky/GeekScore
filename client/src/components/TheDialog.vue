<template>
  <section>
    <v-btn
      class="px-0"
      :small="simple"
      fab
      :id="`activator_${activatorText}`"
      aria-label="Open modal"
      :text="simple"
      :color="color"
      @click.prevent="dialog = true"
    >
      <v-icon dark>mdi-{{ activatorIcon }}</v-icon>
    </v-btn>
    <label :for="`activator_${activatorText}`" class="label_text">{{ activatorText }}</label>
    <v-dialog v-if="renderDialog" v-model="dialog" max-width="600">
      <v-card class="the-dialog">
        <v-card-title>
          <h3 class="app-headline">{{ header }}</h3>
          <v-spacer />
          <v-btn small aria-label="Close modal" fab text @click="close">
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
          <v-card-text>
            <v-container>
              <slot />
            </v-container>
          </v-card-text>
          <v-card-actions class="footer">
            <v-spacer />
            <v-btn color="secondary darken-1" class="mr-2" outlined @click="close">Cancel</v-btn>
            <v-btn color="secondary darken-1" outlined type="submit" :disabled="!valid">Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  props: {
    activatorIcon: {
      type: String,
      required: true
    },
    header: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: "secondary"
    },
    submitLogic: {
      type: Function,
      required: true
    },
    activatorText: {
      type: String
    },
    simple: {
      type: Boolean
    }
  },
  data() {
    return {
      dialog: false,
      valid: false,
      renderDialog: false
    };
  },
  watch: {
    dialog: {
      handler(value) {
        value
          ? (this.renderDialog = true)
          : setTimeout((this.renderDialog = false), 1000);
      },
      immediate: true
    }
  },
  methods: {
    onSubmit() {
      this.submitLogic();
      this.close();
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>

<style scoped lang="scss">
.the-dialog {
  ::v-deep .v-card__text {
    padding-top: 0;
    padding-bottom: 5px;
  }
  ::v-deep .v-card__title {
    padding-bottom: 0;
  }
  .footer {
    padding: 0 18px 18px 18px;
  }
  ::v-deep .comment .v-text-field__details {
    display: none;
  }
}
</style>
