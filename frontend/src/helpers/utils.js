const getOnlyNumbersString = (value) => {
  return String(value).replace(/[^0-9]/g, '')
}

const getOnlyNumbers = (value) => {
  return Number(getOnlyNumbersString(value))
}

const formatDate = (value) => {
  return getOnlyNumbersString(value).slice(0, 8).replace(/(\d{2})(\d{2})(\d{4})/g, '$1/$2/$3')
}

export {
  getOnlyNumbersString,
  getOnlyNumbers,
  formatDate
}