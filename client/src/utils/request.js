const request = (path, options) => {

  const URL = process.env.NODE_ENV === 'production' || process.env.DOCKER_RUN ? '' : 'http://localhost'

  options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options
  }

  if (options.body)
    options.body = JSON.stringify(options.body)


  return fetch(URL + path, options).then(response => {
    if (response.status === 404)
      throw new Error()
    return response.json()
  })
}

export default request
