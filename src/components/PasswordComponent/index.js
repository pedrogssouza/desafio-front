import { IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";

export default function PasswordComponent(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="input-container">
        <input
          {...props.register()}
          id={props.id}
          type={showPassword ? "text" : "password"}
          onChange={(e) => props.setInputPassword(e.target.value)}
        />
        <IconButton onClick={() => setShowPassword(!showPassword)} className>
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </div>
    </div>
  );
}
