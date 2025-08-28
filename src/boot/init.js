import 'virtual:svg-icons-register'
import { vMaska } from 'maska/vue'
export default async ({ app }) => {
  app.directive('maska', vMaska)
  
}
