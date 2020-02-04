import React from "react";
import "./Gauge.scss";
import LinearProgress from "@material-ui/core/LinearProgress";
import { lighten, withStyles } from "@material-ui/core/styles";

function Gauge() {
  const BorderLinearProgress = withStyles({
    root: {
      height: 10,
      backgroundColor: lighten("#ff6c5c", 0.5)
    },
    bar: {
      borderRadius: 20,
      backgroundColor: "#ff6c5c"
    }
  })(LinearProgress);

  return (
    <div className="Gauge">
      <p className="heart_title">심쿵지수</p>
      <p className="heart_index">80BPM</p>
      <img className="heart_img" alt="하트" src="https://image.flaticon.com/icons/svg/1142/1142172.svg"></img>
      <BorderLinearProgress className="progress"
        variant="determinate"
        color="secondary"
        value={50}
      />
    </div>
  );
}

export default Gauge;
