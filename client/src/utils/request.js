const request = (path, options, headers = false) => {

  const URL = process.env.NODE_ENV === 'production' || process.env.REACT_APP_VARIABLE === 'docker' ? 
              '' : 'http://localhost:3001'

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

    if(headers)
      return {body: response.json(), headers: response.headers}

    return response.json()
  }).catch(error =>  { throw error })
}

export default request
