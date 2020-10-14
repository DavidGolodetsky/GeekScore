<template>
  <section>
    <the-title title="Profile" icon="account-details" />
    <v-row v-if="user">
      <v-col>
        <div class="d-flex">
          <span class="mr-3">Username:</span>
          <span>{{ user.username }}</span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="secondary" @click="onLogout">
          <v-icon left>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import TheTitle from '@/components/TheTitle';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ProfileDetails',
  components: {
    TheTitle,
  },
  computed: {
    ...mapState('user', ['user']),
  },
  methods: {
    ...mapActions('user', ['updateUser', 'logout']),
    onLogout() {
      this.logout();
    },
  },
};
</script>
