<template>
  <the-dialog
    activator="pencil"
    color="#fff"
    header="Edit team info"
    simple
    :submitLogic="onSubmit"
  >
    <v-text-field
      clearable
      :rules="fieldRules"
      label="Name"
      v-model="name"
    ></v-text-field>
    <v-file-input
      clearable
      class="mb-2"
      :rules="showImageRules"
      accept="image/png, image/jpeg, image/bmp"
      prepend-icon="mdi-image"
      label="Image"
      @change="onFileUpload($event)"
    ></v-file-input>
    <v-img v-if="imageUrl" :src="imageUrl" height="200" contain></v-img>
    <v-switch
      v-model="isDelete"
      label="Delete team"
      color="error"
      hide-details
    ></v-switch>
  </the-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    team: {
      type: Object
      // required: true
    }
  },
  data() {
    return {
      name: this.team.name,
      isDelete: false,
      imageFile: null,
      imageUrl: this.team.imageUrl,
      fieldRules: [
        v => !!v || "Field is required",
        v => (!!v && v.length <= 60) || "Field is too long"
      ],
      imageRules: [
        v =>
          (v ? v.size < 2000000 : true) || "Image size should be less than 2 MB"
      ]
    };
  },
  computed: {
    showImageRules() {
      return this.imageFile ? this.imageRules : [];
    }
  },
  methods: {
    ...mapActions("teams", ["updateTeam", "updateTeamImage", "deleteTeam"]),
    onFileUpload(file) {
      if (file) {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(file);
        this.imageFile = file;
      } else {
        this.imageUrl = "";
        this.imageFile = null;
      }
    },
    onSubmit() {
      const team = {
        id: this.team.id,
        gameId: this.team.gameId,
        image: this.imageFile,
        name: this.name
      };
      if (this.isDelete) {
        this.deleteTeam(team);
        return;
      }
      if (this.imageFile) {
        const imageName = this.imageFile.name;
        team.ext = imageName.slice(imageName.lastIndexOf("."));
        this.updateTeamImage(team);
      } else {
        this.updateTeam(team);
      }
    }
  }
};
</script>
