import React from "react";
import Swipe from "react-easy-swipe";

export default function SwipeWrapper(props) {
  const onSwipeMove = (position, props) => {
    if (position.x > 145 && position.y < 50 && position.y > -50) {
      props.history.goBack();
    } else if (position.x < -145 && position.y < 50 && position.y > -50) {
      props.history.goForward();
    }
  };
  return (
    <Swipe onSwipeMove={position => onSwipeMove(position, props)}>
      {props.children}
    </Swipe>
  );
}
