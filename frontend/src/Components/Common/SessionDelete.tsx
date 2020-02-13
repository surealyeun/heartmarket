import React from "react";

class SessionDelete extends React.Component{
    componentDidMount(){
        //alert('ss')
        window.sessionStorage.setItem("searchCategory","0");
    }
    render(){
        return(<></>);
    }
}

export default SessionDelete;