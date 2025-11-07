<script lang="ts">
import { Transition, KeepAlive } from 'vue'

export default defineComponent({
  name: 'TabContent',
  props: {
    modelValue: {
      required: true,
    },
    leaveClasses: {
      default: 'animated fadeIn',
      type: String,
    },
    enterClasses: {
      default: 'animated fadeOut',
      type: String,
    },
    keepAlive: {
      default: false,
      type: Boolean,
    },
  },
  render() {
    const slotDefault = this.$slots.default

    const newSlots = () => {
      if (slotDefault === undefined) return undefined
      const elements = slotDefault()
      const filterdElements = elements.filter(
        (el) => el.props?.name === this.modelValue
      )

      return filterdElements.length === 0 ? undefined : filterdElements
    }

    return h(
      'div',
      h(
        Transition,
        {
          appear: true,
          // enter-active-class="animated slideInRight"
          // leave-active-class="animated slideOutLeft"
          // mode="out-in"
          mode: 'out-in',
          'leave-active-class': this.leaveClasses,
          'enter-active-class': this.enterClasses,
        },
        this.keepAlive ? () => h(KeepAlive, newSlots()) : newSlots
      )
    )
  },
})
</script>
