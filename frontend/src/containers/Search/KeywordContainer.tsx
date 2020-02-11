import React, { Component } from "react";
import { keywordChange } from "../../modules/search";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../../modules";

interface Props {
  keyword: string;
  SearchAction: typeof keywordChange;
}

class KeywordContainer extends Component<Props> {
  onInsert = (text: string) => {
    const { SearchAction } = this.props;
    SearchAction(text);
  };
  render() {
    const { keyword } = this.props
    return <></>;
  }
}

export default connect(
  ({ search }: RootState) => ({
    keyword: search.text
  }),
  dispatch => ({
    SearchAction: bindActionCreators(keywordChange, dispatch)
  })
)(KeywordContainer);
