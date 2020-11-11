<template>
  <v-row>
    <v-col v-for="item in items" :key="item._id" sm="6" md="4" cols="12">
      <v-card
        dark
        raised
        class="mx-auto app-card"
        :aria-describedby="item.name"
        @click="openDialog(item)"
      >
        <v-card-title class="row_between">
          <span class="card-list-name">{{ item.name }}</span>
          <v-icon large color="grey darken-1">
            {{ item.icon }}
          </v-icon>
        </v-card-title>

        <v-card-text class="pa-0">
          <v-img
            class="white--text align-end "
            height="150"
            :src="imagePath(item, 'jpg')"
            :srcset="imagePath(item, 'webp')"
            :alt="item.name"
          />
        </v-card-text>
      </v-card>
    </v-col>
    <tools-dialog ref="ToolsDialog" />
  </v-row>
</template>

<script>
import ToolsDialog from "@/components/Dialogs/ToolsDialog";

export default {
  name: "ToolsCards",
  components: {
    ToolsDialog,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    imagePath(item, extension) {
      return require(`@/assets/img/${item.img}.${extension}`);
    },
    openDialog(item) {
      this.$refs.ToolsDialog.show(item);
    },
  },
};
</script>
