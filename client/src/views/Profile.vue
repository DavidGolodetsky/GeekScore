<template>
  <section>
    <the-title title="Profile" icon="account-details" />
    <!-- <div class="d-flex my-3">
      <v-icon class="mx-2" color="secondary"> mdi-account-details </v-icon>
      <h1 class="app-headline">Profile</h1>
    </div> -->
    <the-alert
      v-if="alertData.showAlert"
      :type="alertData.type"
      :text="alertData.text"
    />
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            v-model="formData.username"
            class="my-2"
            :rules="rules.username"
            label="Username"
            :readonly="isReadOnly"
            dark
            outlined
            required
          />
          <v-card-actions>
            <v-btn v-if="!isReadOnly" @click="resetForm"> Cancel </v-btn>
            <v-btn
              color="secondary"
              :disabled="!formIsValid"
              @click="updateUserData"
            >
              {{ isReadOnly ? "Edit" : "Save" }}
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import TheTitle from "@/components/TheTitle";
import TheAlert from "@/components/TheAlert";
import { mapActions, mapState } from "vuex";
import axios from "axios";

export default {
  name: "Profile",
  components: {
    TheAlert,
    TheTitle
  },
  data: () => {
    return {
      alertData: {
        showAlert: false,
        type: "success",
        text: ""
      },
      isReadOnly: true,
      defaultFormData: {
        username: ""
      },
      formData: {
        username: ""
      },
      rules: {
        username: [val => (val || "").length > 0 || "Username cannot be empty"]
      }
    };
  },
  computed: {
    ...mapState("user", {
      userData: state => state.user
    }),
    formIsValid() {
      return this.formData.username;
    }
  },
  created: function() {
    if (this.userData) {
      axios.get(`/api/users/${this.userData.id}`).then(user => {
        this.defaultFormData.username = user.data[0].username;
        this.formData.username = user.data[0].username;
      });
    }
  },
  methods: {
    ...mapActions("user", ["updateUsername"]),
    resetForm() {
      this.formData = Object.assign({}, this.formData, this.defaultFormData);
      this.isReadOnly = !this.isReadOnly;
    },
    updateUserData() {
      if (this.isReadOnly) {
        this.isReadOnly = !this.isReadOnly;
        return;
      }

      this.defaultFormData = Object.assign({}, this.formData);

      this.updateUsername({
        id: this.userData.id,
        username: this.formData.username
      })
        .then(() => {
          this.toggleAlert(true, "success", "Username has been updated");
          this.isReadOnly = !this.isReadOnly;
        })
        .catch(error => {
          this.toggleAlert(true, "error", "Username could not be updated");
          console.log(`An error has occurred: ${error}`);
        });
    },
    toggleAlert(isShown, type, text) {
      this.alertData = Object.assign({}, this.alertData, {
        showAlert: isShown,
        type: type,
        text: text
      });

      setTimeout(() => {
        this.alertData = Object.assign({}, this.alertData, {
          showAlert: false
        });
      }, 1500);
    }
  }
};
</script>
