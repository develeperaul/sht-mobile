import components from 'src/components/core/'
export default ({ app }) => {
  components.forEach((component) => {
    console.log(component);
    
    app.component(component.name, component)
  })
}
