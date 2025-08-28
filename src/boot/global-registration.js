import components from 'src/components/core/'
export default ({ app }) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}
