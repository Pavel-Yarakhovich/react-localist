import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

const StyledScrollbarWrapper = ({
  children,
  thumbColor,
  thumbBorderRadius,
  ...props
}) => {
  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: thumbBorderRadius ?? 6,
      backgroundColor: thumbColor ?? "white",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };
  return (
    <Scrollbars renderThumbVertical={renderThumb} {...props}>
      <div style={{ paddingRight: 12 }}>{children}</div>
    </Scrollbars>
  );
};

export default StyledScrollbarWrapper;
