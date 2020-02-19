import React from "react";
import "./FilterButton.scss";
import { useDispatch } from "react-redux";
import { filterType } from "../../modules/postFilter";
import { diffBy } from "../../modules/postPage";

interface Filter {
  id: number;
  title: string;
}

function FilterButton(props: Filter) {
  const dispatch = useDispatch();
  const { id } = props;
  const onClick = (e: any) => {
    dispatch(filterType(id));
    dispatch(diffBy(0));
  };
  return (
    // <div>
    <button
      onClick={onClick}
      className="FilterButton_btn FilterButton_btn_base"
    >
      {props.title}
    </button>
    // </div>
  );
}

export default FilterButton;
