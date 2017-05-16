import {get} from '../get'

export function getAdData() {
  const result = get('/api/homead')
  // const result = require('http://demo.daryldong.com/React-dianping/mock/home/ad.js')
  return result
}

export function getListData(city, page) {
  const result = get('/api/homelist/' + encodeURIComponent(city) + '/' + page)
  return result
}