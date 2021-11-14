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
            :rules="[requiredField]"
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
          <v-date-picker
            v-model="date"
            :max="todayDate"
            @input="datepicker = false"
          />
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
import {
  defineComponent,
  reactive,
  ref,
  computed,
  toRefs
} from '@vue/composition-api';
import { requiredField } from '@/use/validations';
import { Player } from '@/types';

export default defineComponent({
  name: 'RoundsAddDialog',
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
  setup(props, { root: { $store } }) {
    const { teamId, gameId }: any = toRefs(props);

    const todayDate = ref(new Date().toISOString().substr(0, 10));

    const datepicker = ref(false);

    const form = reactive({
      comment: '',
      turn: '',
      result: null,
      date: todayDate.value
    });

    const teams = computed(() => $store.state.teams.teams);
    const getTeam = () => $store.getters['teams/getTeam'](teamId.value);
    const team = computed(() => (teams.value ? getTeam() : null));

    const resultOptions = computed(() => {
      if (!team.value) return null;
      if (team.value.coop) return ['Victory', 'Defeat'];
      const options = team.value.players.map((player: Player) => player.name);
      return [...options, 'Tie'];
    });

    const getRoundPayload = () => {
      const { turn, date, comment, result } = form;
      const round = {
        turn,
        date,
        comment,
        gameId: gameId.value,
        teamId: teamId.value,
        winner: result.toLowerCase()
      };
      if (team.value.coop) round.result = result.toUpperCase();
      return round;
    };

    const submitRound = () => {
      const round = getRoundPayload();
      $store.dispatch('rounds/createRound', round);
    };

    return {
      todayDate,
      datepicker,
      requiredField,
      submitRound,
      resultOptions,
      team,
      ...toRefs(form)
    };
  }
});
</script>
