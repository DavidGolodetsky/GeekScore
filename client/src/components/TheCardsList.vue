<template>
  <section class="the-cards-list">
    <v-row>
      <v-col sm="6" md="4" cols="12">
        <v-text-field
          v-if="cardItems.length > 3"
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
      <v-col v-for="card in filteredCards" :key="card._id" sm="6" md="4" cols="12" class="mb-6">
        <v-lazy :options="{ threshold: 0.5 }" min-height="200" transition="fade-transition">
          <TheCard
            :card-info="card"
            :card-route="cardRoute"
            :is-favorite="cardItems.length > 1"
            @favorite="$emit('favorite', $event)"
          >
            <template #action="{ item }">
              <slot name="action" :item="item" />
            </template>
          </TheCard>
        </v-lazy>
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, toRefs } from '@vue/composition-api'
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
  setup(props) {
    const { cardItems }: any = toRefs(props)

    const searchedValue = ref('')

    const getCardsOrder = (cards: any) => {
      const reversed = cards.slice().reverse()
      return reversed.sort((x: any, y: any) => y.favorite - x.favorite)
    }

    const filterCards = () => {
      return cardItems.value.filter((card: any) =>
        searchedValue.value
          .toLowerCase()
          .split(' ')
          .every((value: string) => card.name.toLowerCase().includes(value))
      )
    }

    const filteredCards = computed(() => {
      if (!searchedValue.value) return getCardsOrder(cardItems.value)
      const filtered = filterCards()
      return getCardsOrder(filtered)
    })

    return {
      searchedValue,
      filteredCards
    }
  }
})
</script>
