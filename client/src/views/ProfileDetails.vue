<template>
  <section>
    <the-title
      title="Profile"
      icon="account-details"
    />
    <v-row>
      <v-col>
        <div class="d-flex">
          <span class="mr-3">Username:</span>
          <span>{{ formData.username }}</span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          color="secondary"
          @click="onLogout"
        >
          <v-icon left>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import TheTitle from "@/components/TheTitle";
import { mapActions, mapState } from "vuex";
import axios from "axios";

export default {
  name: "ProfileDetails",
  components: {
    TheTitle
  },
  data () {
    return {
      formData: {
        username: ""
      }
    }
  },
  computed: {
    ...mapState("user", {
      userData: state => state.user
    }),
  },
  created: function () {
    // TODO:create action instead
    if (this.userData) {
      axios.get(`/api/users/${this.userData.id}`).then(user => {
        this.defaultFormData.username = user.data[0].username;
        this.formData.username = user.data[0].username;
      });
    }
  },
  methods: {
    ...mapActions("user", ["updateUsername", "logout"]),
    onLogout () {
      this.logout();
    },
  }
};
</script>
