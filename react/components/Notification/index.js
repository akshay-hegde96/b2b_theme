import styles from "./notification.css"
import React, { Component } from "react";

class Notification extends Component {
  state = { showPopup: true };
  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  renderPopup = (props) => {
    let className = styles.info;

    if (this.props.type == "error") {
      className = styles.error;
    } else if (this.props.type == "info") {
      className = styles.info;
    } else if (this.props.type == "warning") {
      className = styles.warning;
    } else if (this.props.type == "success") {
      className = styles.success;
    } else if (this.props.type == "promotions") {
      className = styles.badges;
    } else if (this.props.type == "header") {
      className = styles.header;
    }

    if (this.props.type == "header") {
      return (
        <div className={styles.header}>
          <h4 className={styles.messageHeader}>{this.props.message}</h4>
        </div>
      )
    } else {
      return (
        <div className={styles.popup}>
          <div className={className}>
            <h2 className={styles.type}>{this.props.type} !!</h2>
            <h3 className={styles.title}>{this.props.title}</h3>
            <h4 className={styles.message}>{this.props.message}</h4>
            <button className={styles.btn} onClick={this.togglePopup}>close</button>
          </div>
        </div>
      )
    }   
  };
  render() {
    return (
      <div>
        {this.state.showPopup ? this.renderPopup() : null}
      </div>
    );
  }
}

export default Notification;