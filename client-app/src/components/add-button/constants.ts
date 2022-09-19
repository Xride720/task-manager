import { IPair } from "@types";
import React from "react";

export const positionStyle: IPair<React.CSSProperties> = {
  topLeft: {
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0
  },
  bottomLeft: {
    bottom: 0,
    left: 0
  },
  bottomRight: {
    bottom: 0,
    right: 0
  }
}