<template>
  <section class="cards-list">
    <v-row>
      <v-col sm="6" md="4" cols="12">
        <v-text-field
          v-if="items.length > 3"
          v-model="search"
          clearable
          prepend-icon="mdi-magnify"
          dark
          label="Search"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="item in filteredItems" :key="item._id" sm="6" md="4" cols="12" class="mb-6">
        <v-lazy :options="{ threshold: 0.5 }" min-height="200" transition="fade-transition">
          <!-- TODO:decouple -->
          <v-card
            :key="item._id"
            dark
            raised
            class="mx-auto app-card"
            :aria-describedby="item.name"
          >
            <router-link :to="setRoute(item._id)">
              <div class="title-wrap">
                <v-card-title class="d-flex justify-space-between">
                  <span class="card-list-name">{{ item.name }}</span>
                  <slot name="action" :item="item" />
                </v-card-title>
              </div>
              <v-list v-if="item.players" dense disabled class="players">
                <v-list-item-group>
                  <v-list-item v-for="{name} in item.players" :key="name">
                    <v-list-item-icon>
                      <v-icon v-text="'mdi-account'" />
                    </v-list-item-icon>
                    <v-list-item-content v-text="name" />
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-img
                class="white--text align-end"
                height="350"
                :src="imagePath(item, 'jpg')"
                :srcset="imagePath(item, 'webp')"
                :alt="item.name"
              >
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
                        color="#fff"
                        @click.stop
                      >
                        <v-icon dark>mdi-{{ action.icon }}</v-icon>
                      </v-btn>
                    </template>
                    <v-btn
                      v-if="items.length > 1"
                      class="px-0 mx-1"
                      small
                      text
                      aria-label="Favorite"
                      fab
                      :color="item.favorite ? 'error' : '#fff'"
                      @click.stop.prevent="favorite(item)"
                    >
                      <v-icon dark>mdi-heart</v-icon>
                    </v-btn>
                  </v-card-title>
                </div>
                <template #placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="secondary" />
                  </v-row>
                </template>
              </v-img>
            </router-link>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </section>
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
      !this.search && this.getItemsOrder(this.items);
      const filtered = this.items.filter(item =>
        this.search
          .toLowerCase()
          .split(" ")
          .every(value => item.name.toLowerCase().includes(value))
      );
      return this.getItemsOrder(filtered);
    }
  },
  methods: {
    getActions(item) {
      const actions = [];
      // TODO:refactor
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
    imagePath(item, extension) {
      if (item.imageUrl) return item.imageUrl;
      if (item.teams) return require(`@/assets/img/game.${extension}`);
      return require(`@/assets/img/team.${extension}`);
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
        _id: item._id
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
    transition: box-shadow 0.3s ease-in;
    &:hover {
      will-change: box-shadow;
      transition: box-shadow 0.3s ease-in;
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
  .players {
    position: absolute;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px;
    z-index: 2;
  }
}
</style>
