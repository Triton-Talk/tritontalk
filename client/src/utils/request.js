const request = (path, options) => {

  const URL = process.env.NODE_ENV === 'production' ?
    '' : 'http://localhost:3001'

  options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options
  }

  if (options.body)
    options.body = JSON.stringify(options.body)


  return fetch(URL + path, options)
    .then(response => {
      if (response.status === 404)
        throw new Error()
      return response.json()
    })
    .catch((error) => {
      console.log("Api call error");
      alert(error.message + "Api call error");
    });
}

export default request
