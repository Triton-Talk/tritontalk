const request = async (path, options, headers = false) => {

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

  const response = await fetch(URL + path, options)
  if (response.status === 404)
    throw new Error()

  const body = await response.json()

  if(headers)
    return {body, headers: response.headers}

  return body
}

export default request
