<template>
  <section>
    <div @click.prevent="dialog = true">
      <slot name="activator">
        <v-btn
          :id="`activator_${activatorText}`"
          class="px-0 mr-2"
          :small="simple"
          fab
          aria-label="Open modal"
          :text="simple"
          :color="color"
        >
          <v-icon dark>mdi-{{ activatorIcon }}</v-icon>
        </v-btn>
        <label :for="`activator_${activatorText}`" class="label_text">{{
          activatorText
        }}</label>
      </slot>
    </div>
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="BaseDialog">
        <v-card-title>
          <h3 class="app-headline">{{ header }}</h3>
          <v-spacer />
          <v-btn small aria-label="Close modal" fab text @click="close">
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="onSubmit"
        >
          <v-card-text>
            <v-container>
              <slot />
            </v-container>
          </v-card-text>
          <v-card-actions class="footer">
            <v-spacer />
            <slot name="footer">
              <v-btn
                color="secondary darken-1"
                class="mr-2"
                outlined
                @click="close"
                >Cancel</v-btn
              >
              <v-btn
                color="secondary darken-1"
                outlined
                type="submit"
                :disabled="!valid"
                >Submit</v-btn
              >
            </slot>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'BaseDialog',
  props: {
    activatorIcon: {
      type: String,
      default: ''
    },
    header: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'secondary'
    },
    activatorText: {
      type: String,
      default: ''
    },
    simple: {
      type: Boolean
    }
  },
  setup(_, { emit }) {
    const dialog = ref(false);
    const valid = ref(false);

    const close = () => {
      dialog.value = false;
    };
    const onSubmit = () => {
      emit('submit');
      close();
    };

    return { dialog, valid, onSubmit, close };
  }
});
</script>

<style scoped lang="scss">
.BaseDialog {
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
