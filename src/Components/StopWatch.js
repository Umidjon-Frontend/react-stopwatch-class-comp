import React, { Component } from "react";
import "./StopWatch.css";

class StopWatch extends Component {
  state = {
    isStart: false,
    isStartSplit: false,
    isColor1: false,
    isColor2: false,
    isDisabled1: true,
    isDisabled2: true,
    secund: 0,
    minut: 0,
    hour: 0,
    spSecund: 0,
    spMinut: 0,
    spHour: 0,
    splitIntervalBox: [],
  };

  startStopwatch = () => {
    this.interval = setInterval(() => {
      const { secund, minut, hour } = this.state;
      if (secund === 59) {
        if (minut === 59) {
          this.setState({
            secund: 0,
            minut: 0,
            hour: hour + 1,
          });
        } else {
          this.setState({
            secund: 0,
            minut: minut + 1,
          });
        }
      } else {
        this.setState({
          secund: secund + 1,
        });
      }
    }, 1000);
    this.setState({
      isStart: true,
      isStartSplit: true,
      isColor1: true,
      isColor2: false,
      isDisabled1: false,
      isDisabled2: true,
    });
    this.spStartStopwatch();
  };
  spStartStopwatch = () => {
    this.splitInterval = setInterval(() => {
      const { spSecund, spMinut, spHour } = this.state;
      if (spSecund === 59) {
        if (spMinut === 59) {
          this.setState({
            spSecund: 0,
            spMinut: 0,
            spHour: spHour + 1,
          });
        } else {
          this.setState({
            spSecund: 0,
            spMinut: spMinut + 1,
          });
        }
      } else {
        this.setState({
          spSecund: spSecund + 1,
        });
      }
    }, 1000);
  };

  stopStopwatch = () => {
    clearInterval(this.interval);
    clearInterval(this.splitInterval);
    this.setState({
      isStart: false,
      isColor1: false,
      isColor2: true,
      isDisabled: true,
      isDisabled1: true,
      isDisabled2: false,
    });
  };

  resetStopwatch = () => {
    clearInterval(this.interval);
    clearInterval(this.splitInterval);
    this.setState({
      isStart: false,
      isStartSplit: false,
      isColor1: false,
      isColor2: false,
      isDisabled1: true,
      isDisabled2: true,
      secund: 0,
      minut: 0,
      hour: 0,
      spSecund: 0,
      spMinut: 0,
      spHour: 0,
      splitIntervalBox: [],
    });
  };

  splitStopwatch = () => {
    const { secund, minut, hour, spSecund, spMinut, spHour, splitIntervalBox } =
      this.state;
    let splitCountBox = splitIntervalBox;

    splitCountBox.push({
      split: `${spHour > 9 ? spHour : `0${spHour}`}:${
        spMinut > 9 ? spMinut : `0${spMinut}`
      }:${spSecund > 9 ? spSecund : `0${spSecund}`}`,
      count: `${hour > 9 ? hour : `0${hour}`}:${
        minut > 9 ? minut : `0${minut}`
      }:${secund > 9 ? secund : `0${secund}`}`,
      name: "Split",
    });
    this.setState({
      spSecund: 0,
      spMinut: 0,
      spHour: 0,
    });
    clearInterval(this.splitInterval);
    this.spStartStopwatch();
  };

  render() {
    const {
      isStart,
      isStartSplit,
      isColor1,
      isColor2,
      isDisabled1,
      isDisabled2,
      secund,
      minut,
      hour,
      spSecund,
      spMinut,
      spHour,
      splitIntervalBox,
    } = this.state;
    return (
      <div className="stopwatch-container">
        <div className="stopwatch-box">
          <div className="box-header">
            <h1>Online Stopwatch</h1>
          </div>
          <div className="box-body">
            <h1>
              {hour > 9 ? hour : `0${hour}`}:{minut > 9 ? minut : `0${minut}`}:
              {secund > 9 ? secund : `0${secund}`}
            </h1>
            {!isStartSplit ? (
              <h4>Split time</h4>
            ) : (
              <h4>
                {spHour > 9 ? spHour : `0${spHour}`}:
                {spMinut > 9 ? spMinut : `0${spMinut}`}:
                {spSecund > 9 ? spSecund : `0${spSecund}`}
              </h4>
            )}
          </div>
          <div className="box-footer">
            <div className="btn-wrapper">
              {!isStart ? (
                <button
                  className={"btn btn-start"}
                  onClick={this.startStopwatch}
                >
                  Start
                </button>
              ) : (
                <button className="btn btn-stop" onClick={this.stopStopwatch}>
                  Stop
                </button>
              )}
              <button
                className={"btn " + (isColor1 ? "btn-split" : "")}
                onClick={this.splitStopwatch}
                disabled={isDisabled1}
              >
                Split
              </button>
              <button
                className={"btn " + (isColor2 ? "btn-reset" : "")}
                onClick={this.resetStopwatch}
                disabled={isDisabled2}
              >
                Reset
              </button>
            </div>
            <div className="split-lists">
              {splitIntervalBox.map((item, index) => {
                return (
                  <p key={index} className="list-item">
                    <span>#{index + 1}</span>
                    <span>{item.split}</span>
                    <span>{item.count}</span>
                    <span>{item.name}</span>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StopWatch;
