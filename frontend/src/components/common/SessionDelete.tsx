import React from 'react'

class SessionDelete extends React.Component {
  componentDidMount() {
    //alert('ss')
    window.sessionStorage.setItem('searchCategory', '0')
    window.sessionStorage.setItem('sendStatus', 'false')
    window.sessionStorage.setItem('readcheck', 'notyet')
    window.sessionStorage.setItem('searchText', '')
  }
  render() {
    return <></>
  }
}

export default SessionDelete
