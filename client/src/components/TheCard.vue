<template>
  <v-card
    :key="cardInfo._id"
    dark
    raised
    class="mx-auto app-card"
    :aria-describedby="cardInfo.name"
  >
    <router-link :to="setRoute(cardInfo._id)">
      <div class="title-wrap">
        <v-card-title class="row_between">
          <span class="card-list-name">{{ cardInfo.name }}</span>
          <slot
            name="action"
            :item="cardInfo"
          />
        </v-card-title>
      </div>

      <v-list
        v-if="cardInfo.players"
        dense
        disabled
        class="players"
      >
        <v-list-item-group>
          <v-list-item
            v-for="{name} in cardInfo.players"
            :key="name"
          >
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
        :src="getImagePath()"
        :srcset="getImagePath('webp')"
        :alt="cardInfo.name"
      >
        <div class="title-wrap">
          <v-card-title class="card-list-actions">
            <template v-if="additionalLinks.length">
              <v-btn
                v-for="(link, i) in additionalLinks"
                :key="i"
                :href="link.href"
                class="px-0 mx-1"
                target="_blank"
                :download="link.download"
                rel="noopener noreferrer"
                small
                :aria-label="cardInfo.name"
                text
                fab
                color="#fff"
                @click.stop
              >
                <v-icon dark>mdi-{{ link.icon }}</v-icon>
              </v-btn>
            </template>
            <!-- <v-btn
              v-if="items.length > 1"
              class="px-0 mx-1"
              small
              text
              aria-label="Favorite"
              fab
              :color="cardInfo.favorite ? 'error' : '#fff'"
              @click.stop.prevent="favorite(item)"
            >
              <v-icon dark>mdi-heart</v-icon>
            </v-btn> -->
          </v-card-title>
        </div>
        <template #placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="secondary"
            />
          </v-row>
        </template>
      </v-img>
    </router-link>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'TheCard',
  props: {
    cardRoute: {
      type: Object,
      required: true
    },
    cardInfo: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const additionalLinks = computed(() => {
      const links = []
      const { bggURL, rulesURL, melodiceURL } = props.cardInfo
      let linkInfo = null
      if (bggURL) {
        linkInfo = {
          href: card.bggURL,
          name: 'Board game geek',
          icon: 'cards'
        }
        links.push(linkInfo)
      }
      if (rulesURL) {
        linkInfo = {
          href: card.rulesURL,
          name: 'Rules',
          icon: 'book-open-variant',
          download: true
        }
        links.push(linkInfo)
      }
      if (melodiceURL) {
        linkInfo = {
          href: card.melodiceURL,
          name: 'Melodice',
          icon: 'music'
        }
        links.push(linkInfo)
      }
      return links
    })

    const getImagePath = (extension = 'jpg') => {
      const { imageUrl, teams } = props.cardInfo
      if (imageUrl) {
        return imageUrl
      } else if (teams) {
        return require(`@/assets/img/game.${extension}`)
      } else {
        return require(`@/assets/img/team.${extension}`)
      }
    }

    return {
      additionalLinks,
      getImagePath
    }
  },

  methods: {
    setRoute(id) {
      let route = { ...this.route }
      route.params = {
        [Object.keys(this.route.params)[0]]: id
      }
      return route
    },
    favorite(item) {
      const favorite = !item.favorite
      const data = {
        favorite,
        _id: item._id
      }
      this.$emit('favorite', data)
    }
  }
})
</script>

<style lang="scss" scoped>
.app-card {
  transition: box-shadow 0.3s ease-in;
  &:hover {
    will-change: box-shadow;
    transition: box-shadow 0.3s ease-in;
    box-shadow: 7px 9px 20px -6px rgba(0, 0, 0, 0.75);
  }

  .title-wrap {
    background-color: rgba(0, 0, 0, 0.9);
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