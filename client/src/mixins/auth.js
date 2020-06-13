import LoginForm from "@/components/LoginForm";
import { mapActions, mapGetters } from "vuex";

export const auth = {
    components: {
        LoginForm
    },
    methods: {
        ...mapActions(["setError", "setBackTitle"]),
        onDismiss() {
            this.setError();
        }
    },
    computed: {
        ...mapGetters("user", ["user"]),
        ...mapGetters(["error"])
    },
    created() {
        this.setBackTitle();
    },
    beforeDestroy() {
        this.onDismiss();
    }
}


export default auth;