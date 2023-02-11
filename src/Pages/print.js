import React, { createRef } from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";

const PrintComponent = ({ Component, onPrintButtonSet }) => {
  const componentRef = createRef();

  return (
    <>
    <div style={{display:"none"}}>
      <ReactToPrint content={() => (componentRef.current) || <div />}>
        <PrintContextConsumer>
          {({ handlePrint }) => {
            onPrintButtonSet && onPrintButtonSet(() => handlePrint);
            return null;
          }}
        </PrintContextConsumer>
      </ReactToPrint>
      <Component ref={componentRef} />
      </div>
    </>
  );
};

export default PrintComponent;