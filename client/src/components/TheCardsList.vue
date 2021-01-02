<template>
  <section class="the-cards-list">
    <v-row>
      <v-col
        sm="6"
        md="4"
        cols="12"
      >
        <v-text-field
          v-if="items.length > 3"
          v-model="searchedValue"
          clearable
          append-icon="mdi-magnify"
          dark
          outlined
          rounded
          label="Search"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="card in filteredCards"
        :key="card._id"
        sm="6"
        md="4"
        cols="12"
        class="mb-6"
      >
        <v-lazy
          :options="{ threshold: 0.5 }"
          min-height="200"
          transition="fade-transition"
        >
          <TheCard
            :card-info="card"
            :card-route="cardRoute"
          />
        </v-lazy>
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import TheCard from '@/components/TheCard.vue'

export default defineComponent({
  name: 'TheCardsList',
  components: {
    TheCard
  },
  props: {
    cardItems: {
      type: Array,
      required: true
    },
    cardRoute: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const searchedValue = ref('')

    const getCardsOrder = (cards: any) => {
      const reversed = cards.slice().reverse()
      return reversed.sort((x, y) => y.favorite - x.favorite)
    }

    const filteredCards = computed(() => {
      if (searchedValue) {
        const filtered = props.cardItems.filter((card) =>
          searchedValue
            .toLowerCase()
            .split(' ')
            .every((value) => card.name.toLowerCase().includes(value))
        )
        return getCardsOrder(filtered)
      } else {
        // Reset filtering
        return getCardsOrder(props.cardItems)
      }
    })

    return {
      searchedValue,
      filteredCards
    }
  }
})
</script>
