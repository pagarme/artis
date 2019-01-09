import moment from 'moment'

const today = moment()
const tomorrow = moment().add(1, 'days')
const formatYYYYMMDD = date => date.format('YYYY-MM-DD')

export {
  formatYYYYMMDD,
  today,
  tomorrow,
}
