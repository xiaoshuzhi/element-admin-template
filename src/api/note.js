import request from '@/utils/request'

export function getNote(id) {
  return request({
    url: '/api/Note/' + id,
    method: 'get'
  })
}

export function createNote(data) {
  return request({
    url: '/api/Note',
    method: 'put',
    data
  })
}

export function updateNote(data) {
  return request({
    url: '/api/Note',
    method: 'post',
    data
  })
}

export function deleteNote(id) {
  return request({
    url: '/api/Note/' + id,
    method: 'delete'
  })
}

export function updateProject(data) {
  return request({
    url: '/api/project',
    method: 'post',
    data
  })
}
