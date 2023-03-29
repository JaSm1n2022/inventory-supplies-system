import { CameraAlt, Cameraswitch } from "@mui/icons-material";
import { Avatar, Button, Grid, Tooltip, Typography } from "@mui/material";
import { propsToClassKey } from "@mui/styles";
import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";

const CameraModal = (props) => {
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);
  const [faceMode, setFaceMode] = useState("environment");
  //...
  const switchCameraHandler = () => {
    if (faceMode === "user") {
      setFaceMode("environment");
    } else {
      setFaceMode("user");
    }
  };

  console.log("[faceMode]", faceMode);
  const usePhotoHandler = () => {
    props.onUsePhotoHandler(image);
  };
  return (
    <>
      <Camera
        ref={camera}
        aspectRatio={16 / 9}
        facingMode={faceMode}
        numberOfCamerasCallback={setNumberOfCameras}
      />

      <Grid container style={{ paddingTop: 10 }}>
        <div style={{ display: "inline-flex", gap: 10 }}>
          <Tooltip
            title={
              <h6 style={{ color: "lightblue" }}>
                <span>Take Photo</span>
              </h6>
            }
          >
            <CameraAlt
              style={{ fontSize: "24pt" }}
              onClick={() => {
                const photo = camera.current.takePhoto();
                setImage(photo);
              }}
            />
          </Tooltip>
          <Cameraswitch
            style={{ fontSize: "24pt" }}
            onClick={switchCameraHandler}
          />
        </div>
      </Grid>
      {image && (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="body">Image Preview</Typography>
          </Grid>
          <Grid item xs={12}>
            <img src={image} style={{ height: "64px", width: "64px" }}></img>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={usePhotoHandler}
              variant="contained"
              style={{
                border: "solid 1px #2196f3",
                color: "white",
                background: "#2196f3",
                fontFamily: "Roboto",
                fontSize: "8px",
                fontWeight: 500,
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: 1,
                letterSpacing: "0.4px",
                textAlign: "left",
                cursor: "pointer",
              }}
              component="span"
            >
              Use Photo
            </Button>
          </Grid>
        </Grid>
      )}
      <button
        hidden={numberOfCameras <= 1}
        onClick={() => {
          camera.current.switchCamera();
        }}
      />
    </>
  );
};

export default CameraModal;
