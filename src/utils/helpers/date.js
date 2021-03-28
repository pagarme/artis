import dayjs from 'dayjs'

const today = dayjs()
const tomorrow = dayjs().add(1, 'days')
const formatYYYYMMDD = date => date.format('YYYY-MM-DD')

export {
  formatYYYYMMDD,
  today,
  tomorrow,
}
