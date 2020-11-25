<template>
  <v-row>
    <v-col
      v-for="item in items"
      :key="item._id"
      sm="6"
      md="4"
      cols="12"
    >
      <v-card
        dark
        raised
        class="mx-auto app-card"
        :aria-describedby="item.name"
      >
        <div class="title-wrap">
          <v-card-title>
            <slot
              name="action"
              :item="item"
            />
            <span class="card-list-name ml-2">{{ item.name }}</span>
          </v-card-title>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ToolsCards",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
