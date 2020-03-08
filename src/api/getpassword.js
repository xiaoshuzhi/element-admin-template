import request from '@/utils/request'

export function checkEmailExist(data) {
  return request({
    url: '/user/chechEmail',
    method: 'get',
    params: data
  })
}

export function sendEmailRejest(data) {
  return request({
    url: '/user/sendEmailCode',
    method: 'get',
    params: data
  })
}

export function sendEmail(data) {
  return request({
    url: '/user/sendEmail',
    method: 'get',
    params: data
  })
}

// email token
export function validataToken(data) {
  return request({
    url: '/user/validataPassword',
    method: 'post',
    data
  })
}

// uid password
export function changePassword(data) {
  return request({
    url: '/user/changePassword',
    method: 'post',
    data
  })
}
