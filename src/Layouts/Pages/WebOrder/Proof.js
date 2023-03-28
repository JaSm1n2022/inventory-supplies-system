import { Button } from "@mui/material";
import React, { useState } from "react";
import Webcam from "react-webcam";
const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isRetake, setIsRetake] = useState(false);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setIsRetake(!isRetake);
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);
  const retakeHandler = () => {
    setIsRetake(!isRetake);
  };
  return (
    <>
      {!isRetake && (
        <>
          <Webcam
            audio={false}
            height={100 + "%"}
            width={100 + "%"}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />

          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={capture}
          >
            Capture photo
          </Button>
        </>
      )}
      {imgSrc && isRetake && <img src={imgSrc} />}
      {isRetake && (
        <div style={{ display: "inline-flex", gap: 4 }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => retakeHandler()}
            color="primary"
          >
            Retake
          </Button>
          <Button size="small" variant="contained" color="success">
            Use Photo
          </Button>
        </div>
      )}
    </>
  );
};
export default WebcamCapture;
