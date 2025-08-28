import { defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import ru from '@vee-validate/i18n/dist/locale/ru.json'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
function cellphone(value) {
  // паттерн для чисел со знаком, дробная часть опциональна
  const pattern = /^\+7\s\(\d{3}\)-\d{3}\-\d{2}\-\d{2}$/
  // console.log(value);
  // const pattern = /[1-9]\d{8,14}$/;
  console.log(value)

  return pattern.test(value)
}

function confirmed(value, [secondValue]) {
  return value === secondValue
}

function password(value) {
  return typeof value === 'string' && value.length > 6
}

function dateformat(value, [currentTime]) {
  if (value) {
    const dateValue = value.split('-')
    if (dateValue.length === 3) {
      let y = +dateValue[2],
        m = +dateValue[1].replace(/^0/, ''),
        d = +dateValue[0].replace(/^0/, '')
      m = --m

      var x = new Date(y, m, d)
      if (y > 1900) {
        if (currentTime) {
          return +currentTime > dayjs(value, 'DD-MM-YYYY').unix()
        } else {
          return (
            x.getFullYear() === y && x.getMonth() === m && x.getDate() === d
          )
        }
      }
      return false
    }

    return false
  }
  return false
}

// глобальные правила
const rules = {
  required,
  cellphone,
  dateformat,
  min,
}
for (let ruleName in rules) {
  defineRule(ruleName, rules[ruleName])
}
localize({ ru })
configure({
  generateMessage: localize('ru', {
    names: {
      date: 'дата',
      password: 'пароль',
      email: 'почта',
    },
  }),
})
