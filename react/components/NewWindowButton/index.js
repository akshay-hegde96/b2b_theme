import React from "react";
import { Button } from 'vtex.styleguide'

const NewTabButton = (props) => {
  const url = props.url ? props.url : "";
  const height = props.height;
  const width = props.width;
  const buttonTitle = props.buttonTitle ? props.buttonTitle : "Button";
  const buttonVariation = props.buttonVariation ? props.buttonVariation : "primary";

  let windowProp = 'location=yes,scrollbars=yes,status=yes,fullscreen=yes';
  if(height && width) {
    windowProp = 'location=yes,height='+height+',width='+width+',scrollbars=yes,status=yes';
  }



  const openInNewWin = () => {
    window.open(url, '_blank', windowProp);
  };

  return (
    <div className="mb4">
      <div className='ma4'>
        <Button variation={buttonVariation} onClick={() => openInNewWin()}>{buttonTitle}</Button>
      </div>
    </div>
  );
};

export default NewTabButton;
