import { CameraAlt, Cameraswitch } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import Webcam from "react-webcam";
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
  facingMode: FACING_MODE_USER,
};
const Proof = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isRetake, setIsRetake] = useState(false);
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

  const handleClick = React.useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);
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
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              ...videoConstraints,
              facingMode,
            }}
          />
          <CameraAlt
            onClick={capture}
            style={{ fontSize: "24pt", color: "green" }}
          />
          <Cameraswitch style={{ fontSize: "24pt" }} onClick={handleClick} />
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
export default Proof;
