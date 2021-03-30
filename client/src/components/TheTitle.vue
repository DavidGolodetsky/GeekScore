<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import GamesAddDialog from '@/components/GamesAddDialog.vue'
import TeamsAddDialog from '@/components/TeamsAddDialog.vue'
import RoundsAddDialog from '@/components/RoundsAddDialog.vue'
import { VIcon } from 'vuetify/lib'

export default defineComponent({
  name: 'TheTitle',
  components: {
    GamesAddDialog,
    TeamsAddDialog,
    RoundsAddDialog
  },
  props: {
    title: {
      type: String,
      required: true
    },
    component: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  render(h) {
    let template
    if (this.component === '') {
      template = h(
        'div',
        {
          class: 'row_between mb-6 pt-5'
        },
        [
          h(
            'div',
            {
              class: 'd-flex'
            },
            [
              h(
                VIcon,
                {
                  class: 'mx-2',
                  props: {
                    color: 'secondary'
                  }
                },
                `mdi-${this.icon}`
              ),
              h(
                'h1',
                {
                  class: 'app-headline'
                },
                this.title
              )
            ]
          )
        ]
      )
    }
    template = h(
      'div',
      {
        class: 'row_between mb-6'
      },
      [
        h(
          'div',
          {
            class: 'd-flex'
          },
          [
            h(
              VIcon,
              {
                class: 'mx-2',
                props: {
                  color: 'secondary'
                }
              },
              `mdi-${this.icon}`
            ),
            h(
              'h1',
              {
                class: 'app-headline'
              },
              this.title
            )
          ]
        ),
        h(this.component, {
          class: 'd-flex justify-end my-2',
          props: {
            ...this.props
          }
        })
      ]
    )

    return template
  }
})
</script>
