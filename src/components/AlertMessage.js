import * as React from "react";
import { Alert, Zoom } from "@mui/material";

export default function AlertMessage(props) {
  return (
    <div>
      {props.message.length != 0 ? (
        <Zoom in={props.message.length != 0}>
          <Alert className="mb-3" severity={props.message.type}>
            {props.message.text}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
    </div>
  );
}
