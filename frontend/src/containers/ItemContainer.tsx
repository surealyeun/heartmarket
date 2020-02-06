import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "../Components/Search/Item";
import { getPostThunk, getUserThunk } from "../modules/searchItems";
import { RootState } from '../modules'

interface Props {
    getPost: typeof getPostThunk,
    getUsers: typeof getUserThunk,
    post: 
}

interface State {}

class ItemContainer extends Component<Props> {

  render() {
    return <Item loadingPost={} loadingUsers={} post={} users={} />;
  }
}

export default connect(
    ({ search: RootState }) => ({
        post: search.post,
        
    })
)(ItemContainer);
