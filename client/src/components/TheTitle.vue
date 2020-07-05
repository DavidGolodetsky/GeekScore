<script>
import GameAddDialog from "@/components/GameAddDialog";
import TeamAddDialog from "@/components/TeamAddDialog";
import RoundAddDialog from "@/components/RoundAddDialog";
import { VIcon } from "vuetify/lib";

export default {
  components: {
    GameAddDialog,
    TeamAddDialog,
    RoundAddDialog
  },
  props: {
    title: {
      type: String,
      required: true
    },
    component: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ""
    },
    props: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  render(h) {
    return h(
      "div",
      {
        class: "d-flex justify-space-between align-center mb-6"
      },
      [
        h(
          "div",
          {
            class: "d-flex"
          },
          [
            h(
              VIcon,
              {
                class: "mx-2",
                props: {
                  color: "secondary"
                }
              },
              `mdi-${this.icon}`
            ),
            h(
              "h1",
              {
                class: "app-headline"
              },
              this.title
            )
          ]
        ),
        h(this.component, {
          class: "d-flex justify-end my-2",
          props: {
            ...this.props
          }
        })
      ]
    );
  }
};
</script>
