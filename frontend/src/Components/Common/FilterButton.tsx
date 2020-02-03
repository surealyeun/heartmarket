import React from "react";
import "./FilterButton.scss";

interface Filter {
    title: string
}

function FilterButton(props: Filter) {
  return (
    <div>
      <a className="FilterButton_btn FilterButton_btn_base" href="dfdf">{props.title}</a>
    </div>
  );
}

export default FilterButton;
