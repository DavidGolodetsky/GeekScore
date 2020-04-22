<template>
  <div class="cards-list">
    <v-row>
      <v-col sm="6" md="4" cols="12">
        <v-text-field
          v-if="shouldSearch"
          clearable
          prepend-icon="mdi-magnify"
          dark
          label="Search"
          v-model="search"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="6" md="4" cols="12" v-for="(item, i) in filteredItems" :key="i" class="mb-6">
        <v-lazy
          :options="{
            threshold: 0.5
          }"
          min-height="200"
          transition="fade-transition"
        >
          <v-card dark :key="item.id" raised class="mx-auto app-card">
            <router-link :to="setRoute(item.id)">
              <div class="title-wrap">
                <v-card-title class="d-flex justify-space-between">
                  <span class="card-list-name">{{ item.name }}</span>
                  <slot name="action" :item="item" />
                </v-card-title>
              </div>
              <v-img class="white--text align-end" height="350" :src="item.imageUrl">
                <div class="title-wrap">
                  <v-card-title class="card-list-actions">
                    <template v-if="getActions(item).length">
                      <v-btn
                        v-for="(action, i) in getActions(item)"
                        :key="i"
                        :href="action.link"
                        class="px-0 mx-1"
                        target="_blank"
                        :download="action.download"
                        rel="noopener noreferrer"
                        small
                        :aria-label="item.name"
                        text
                        fab
                        @click.stop
                        color="#fff"
                      >
                        <v-icon dark>mdi-{{ action.icon }}</v-icon>
                      </v-btn>
                    </template>
                    <v-btn
                      class="px-0 mx-1"
                      small
                      text
                      aria-label="Favorite"
                      fab
                      v-if="showFavorite"
                      @click.stop.prevent="favorite(item)"
                      :color="item.favorite ? 'error' : '#fff'"
                    >
                      <v-icon dark>mdi-heart</v-icon>
                    </v-btn>
                  </v-card-title>
                </div>
                <template #placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="secondary"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </router-link>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    route: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      search: ""
    };
  },
  computed: {
    filteredItems() {
      if (this.search) {
        const filtered = this.items.filter(item => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every(v => item.name.toLowerCase().includes(v));
        });
        return this.getItemsOrder(filtered);
      }
      return this.getItemsOrder(this.items);
    },
    shouldSearch() {
      return this.items.length > 3 ? true : false;
    },
    showFavorite() {
      return this.items.length > 1 ? true : false;
    }
  },
  methods: {
    getActions(item) {
      const actions = [];
      if (item.bggURL) {
        actions.push({
          link: item.bggURL,
          name: "Board game geek",
          icon: "cards"
        });
      }
      if (item.rulesURL) {
        actions.push({
          link: item.rulesURL,
          name: "Rules",
          icon: "book-open-variant",
          download: true
        });
      }
      if (item.melodiceURL) {
        actions.push({
          link: item.melodiceURL,
          name: "Melodice",
          icon: "music"
        });
      }
      return actions;
    },
    getItemsOrder(items) {
      const reversed = items.slice().reverse();
      return reversed.sort((x, y) => y.favorite - x.favorite);
    },
    setRoute(id) {
      let route = { ...this.route };
      route.params = {
        [Object.keys(this.route.params)[0]]: id
      };
      return route;
    },
    favorite(item) {
      const favorite = !item.favorite;
      const data = {
        favorite,
        id: item.id
      };
      this.$emit("favorite", data);
    }
  }
};
</script>

<style scoped lang="scss">
.cards-list {
  .title-wrap {
    background-color: rgba(0, 0, 0, 0.9);
  }
  .app-card {
    transition: 0.3s;
    &:hover {
      will-change: box-shadow;
      transition: 0.3s;
      box-shadow: 7px 9px 20px -6px rgba(0, 0, 0, 0.75);
    }
  }
  .card-list-name {
    color: $secondary;
  }

  .v-image__image--preload {
    -webkit-filter: none;
    filter: none;
  }

  .card-list-actions {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
}
</style>
