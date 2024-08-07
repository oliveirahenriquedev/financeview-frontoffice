import React from "react";
import { TrackedEventProps } from "../helpers";

type PixelTrackerProps = {
  trackedEvent: TrackedEventProps;
};

export function PixelTracker({ trackedEvent }: PixelTrackerProps) {
  return (
    <img
      src={`https://acauhi.trackpath.com.br/track/?event_id=LW6ybKHj&goal=${trackedEvent}&click_id=123&order_id=${
        Math.random() * (1000 - 0) + 0
      }&price=10.00&sub1=Finance&sub2=View&sub3=Testando&sub4=URL&sub5=CODIGO`}
      style={{
        width: 1,
        height: 1,
        border: 0,
      }}
    />
  );
}
