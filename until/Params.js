
import map from 'lodash/map'
import join from 'lodash/join'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'


const url = (url, data) => {
  const urlPick = pickBy(data, identity)
  const urlMap = map(urlPick, (val, key) => {
    if (key === 'startDate' || key === 'endDate')
      return `${key}=${val.format('YYYY/MM/DD')}`
    return `${key}=${val}`
  })

  return `/${url}?${join(urlMap, '&')}`
}

const convertstatusText = (codeStatus) => {
  let textStatus 
  if (codeStatus === 1) {
    textStatus = 'Created'
  } else if (codeStatus === 2) {
    textStatus = 'Pending Approval'
  } else if (codeStatus === 3) {
    textStatus = 'Approved'
  } else if (codeStatus === 4) {
    textStatus = 'Rejected'
  } else if (codeStatus === 5) {
    textStatus = 'Modified'
  } else if (codeStatus === 6) {
    textStatus = 'Canceled'
  } else if (codeStatus === 7) {
    textStatus = 'Processed'
  } else if (codeStatus === 8) {
    textStatus = 'Deleted'
  } else if (codeStatus === 9) {
    textStatus = 'In Process'
  }
  return textStatus
}

const convertstatusColor = (codeStatus) => {
  
  let colorText 
  if (codeStatus === 1) {
    colorText = '#3498DB'
  } else if (codeStatus === 2) {
    colorText = '#F5B041'
  } else if (codeStatus === 3) {
    colorText = '#2ECC71'
  } else if (codeStatus === 4) {
    colorText = '#CB4335'
  } else if (codeStatus === 5) {
    colorText = '#7D3C98'
  } else if (codeStatus === 6) {
    colorText = '#95A5A6'
  } else if (codeStatus === 7) {
    colorText = '#17202A'
  } else if (codeStatus === 8) {
    colorText = '#95A5A6'
  } else if (codeStatus === 9) {
    colorText = '#2980B9'
  }
  
  return colorText
}

export {
  url,
  convertstatusText,
  convertstatusColor
}
