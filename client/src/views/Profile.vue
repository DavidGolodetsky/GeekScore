<template>
  <section>
    <div class="d-flex my-3">
        <v-icon
            class="mx-2"
            color="secondary"
        >
            mdi-account-details
        </v-icon>
        <h1 class="app-headline">Profile</h1>
    </div>
    <user-profile />
  </section>
</template>

<script>
import UserProfile from "@/components/UserProfile";

export default {
    name: "Profile",
    components: {
        UserProfile
    }
}
</script>