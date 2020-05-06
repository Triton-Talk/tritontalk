import React from 'react';
import { useHistory } from 'react-router-dom'

const Page = React.createContext();
export default Page;

export const PageProvider = (props) => {

  const history = useHistory()
  const [page, _setPage] = React.useState('/')

  const setPage = (newPage) => {
    _setPage(newPage)
    history.push(newPage)
  }

  return (
    <Page.Provider value={{page, setPage}}>
      {props.children}
    </Page.Provider>
  )
}
