import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Modal } from "@mui/material";
import WebcamCapture from "./Proof";
import CameraModal from "./camera";
import Close from "@mui/icons-material/Close";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    margin: "auto",
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({}));

/***
 * Author
 * Nargel Velasco - Tech Team
 * @param {Object} data - header and rows data
 * @param {Function} exportHandler - handle export function
 * @param {Function} closeModal - close modal
 * @param {Function} isOpen - open modal if true
 *
 */

export default function Photo(props) {
  const { noHandler, yesHandler, description, isOpen } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  const body = (
    <Paper elevation={2} style={{ width: "200px", height: "300px" }}>
      <div style={{ paddingRight: 20, paddingLeft: 20, paddingTop: 20 }}>
        <Grid container justifyContent="space-between">
          <Typography variant="body">Photo</Typography>
          <Close onClick={() => props.closePhotoHandler()} />
        </Grid>

        <CameraModal
          closePhotoHandler={props.closePhotoHandler}
          onUsePhotoHandler={props.onUsePhotoHandler}
        />
      </div>
    </Paper>
  );

  return (
    <div>
      <Modal
        fullWidth={true}
        open={isOpen ? true : false}
        onClose={props.onClosePhotoHandler}
        aria-labelledby="yn-modal"
        aria-describedby="yes-or-no"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
