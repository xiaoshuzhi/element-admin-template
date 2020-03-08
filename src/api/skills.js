import request from '@/utils/request'

export function getAllSkills() {
  return request({
    url: '/api/allSkills',
    method: 'get'
  })
}
