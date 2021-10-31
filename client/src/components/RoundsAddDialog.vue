<template>
  <section class="rounds-add">
    <BaseDialog
      v-if="team"
      activator-icon="plus"
      header="Add new round"
      @submit="submitRound"
    >
      <v-row>
        <v-col cols="6">
          <v-radio-group
            v-model="result"
            :rules="resultRules"
            label="Result:"
            class="mb-4"
          >
            <v-radio
              v-for="option in resultOptions"
              :key="option"
              :label="option"
              :value="option"
            />
          </v-radio-group>
        </v-col>
        <v-col v-if="!team.coop" cols="6">
          <v-radio-group
            v-if="team.players.length > 1"
            v-model="turn"
            label="First turn:"
            class="mb-4"
          >
            <v-radio
              v-for="{ name } in team.players"
              :key="name"
              :label="name"
              :value="name"
            />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-menu
          v-model="datepicker"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template #activator="{ on }">
            <v-text-field
              v-model="date"
              label="Date"
              prepend-icon="mdi-calendar-outline"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker v-model="date" @input="datepicker = false" />
        </v-menu>
      </v-row>
      <v-row>
        <v-textarea
          v-model.trim="comment"
          class="comment"
          label="Comment"
          auto-grow
          filled
          clearable
          prepend-icon="mdi-comment-outline"
        />
      </v-row>
    </BaseDialog>
  </section>
</template>

<script lang="ts">
import { requiredField } from '@/use/validations';
import { defineComponent, ref, computed} from '@vue/composition-api';

export default defineComponent({
  name: 'RoundsAddDialog',
  // TODO:refactor
  props: {
    teamId: {
      type: String,
      required: true
    },
    gameId: {
      type: String,
      required: true
    }
  },
  setup(props, ctx){
    const store = ctx.root.$store;

    const datepicker = ref(false);
    const comment = ref('');
    const turn = ref('');
    const result = ref(null);
    const date = ref(new Date().toISOString().substr(0, 10));
    const resultRules = ref([requiredField]);

    const team = computed(() => {
      return store.state['teams'] ? store.getters['teams/getTeam'](props.teamId) : null;
    });

    const resultOptions = computed(() => {
      if (!team) return null;
      if (team['coop']) return ['Victory', 'Defeat'];
      const options = team['players'].map(player => player.name);
      return [...options, 'Tie'];
    });
    
    const submitRound = () => {
      const round = cookRound();
      return store.dispatch('rounds/creatRound', round);
    };

    const cookRound = () => {
      const round = {
        date: date.value,
        turn: turn.value,
        gameId: props.gameId,
        teamId: props.teamId,
        comment: comment.value,
        winner: result.value.toLowerCase(),
      }
      if (team['coop']) round['result'] = result.value.toUpperCase();
      // TODO: highlight result, maybe with icon, not VICTORY
      return round;
    };

    return { submitRound, resultRules, resultOptions, team, datepicker, date, comment}
  }
});
</script>