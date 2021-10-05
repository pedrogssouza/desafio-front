import "./styles.css";
import { IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";

export default function PasswordComponent(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <div className="input-container">
        <label className={props.class || ""} htmlFor={props.id}>
          {props.label}
        </label>
        <input
          {...props.register()}
          id={props.id}
          type={showPassword ? "text" : "password"}
          onChange={(e) => {
            if (!props.setInputPassword) {
              return;
            }
            props.setInputPassword(e.target.value);
          }}
          placeholder={props.placeholder || ""}
        />
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          className="button-password"
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </div>
    </div>
  );
}
