import request from '@/utils/request'

export function getAllProjects(data) {
  return request({
    url: '/api/allProjects',
    method: 'get',
    params: data
  })
}

export function updateProjects(data) {
  return request({
    url: '/api/project',
    method: 'post',
    data
  })
}

export function deleteProjects(id) {
  return request({
    url: '/api/project/' + id,
    method: 'delete'
  })
}

export function createProjects(data) {
  return request({
    url: '/api/project',
    method: 'put',
    data
  })
}
