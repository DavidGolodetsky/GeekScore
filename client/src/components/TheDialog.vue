<template>
  <div>
    <v-btn
      class="px-0"
      :small="simple"
      fab
      aria-label="Open modal"
      :text="simple"
      @click.prevent="dialog = true"
      :color="color"
    >
      <v-icon dark>mdi-{{ activator }}</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" v-if="renderDialog" max-width="600">
      <v-card class="the-dialog">
        <v-card-title>
          <h3 class="app-headline">{{ header }}</h3>
          <v-spacer></v-spacer>
          <v-btn small aria-label="Close modal" fab text @click="close">
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-form v-model="valid" lazy-validation ref="form" @submit.prevent="onSubmit">
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
  </div>
</template>

<script>
export default {
  props: {
    activator: {
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
    simple: {
      type: Boolean
    }
  },
  data() {
    return {
      dialog: false,
      valid: true,
      renderDialog: false
    };
  },
  watch: {
    dialog() {
      if (this.dialog) {
        this.renderDialog = true;
      } else {
        setTimeout((this.renderDialog = false), 1000);
      }
    }
  },
  methods: {
    validateForm() {
      let form = this.$refs.form;
      if (form.validate()) {
        return true;
      }
    },
    onSubmit() {
      if (this.validateForm()) {
        this.submitLogic();
        this.close();
      }
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