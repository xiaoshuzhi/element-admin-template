import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function rejest(data) {
  return request({
    url: '/user/validateRejest',
    method: 'post',
    data
  })
}

export function refrashToken() {
  return request({
    url: '/user/refrashToken',
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/api/getUserInfo',
    method: 'post',
    params: { token }
  })
}

export function getUserInfo() {
  return request({
    url: '/api/getUserDetailInfo',
    method: 'get'
  })
}

export function checkUsernameExist(data) {
  return request({
    url: '/user/checkUsername',
    method: 'get',
    params: data
  })
}

export function checkUsernameForUpdate(data) {
  return request({
    url: '/api/checkUsernameForUpdate',
    method: 'get',
    params: data
  })
}

export function updateInfo(data) {
  return request({
    url: '/api/user',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'post'
  })
}
