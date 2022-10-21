
import { Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DataHandler from "./DataHandler";
import FilterTable from "./FilterTable";
import Table from "./Table";
import AddIcon from "@mui/icons-material/Add";

import { SAMPLE_LOCATION_DATA } from "../../../utils/constants";
import { useState } from "react";

import EditFunction from "./EditFunction";
import Form from "./Form";


const Vendor = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isFormModal, setIsFormModal] = useState(false);
  const [item, setItem] = useState(undefined);
  const [mode,setMode] = useState('create');
  const createFormHandler = (data,mode) => {
    setItem(data);
    setMode(mode || 'create');
    setIsFormModal(true);
  }
  const closeFormModalHandler = () => {

    
    setIsFormModal(false);
  }
  useEffect(() => {

    const source = SAMPLE_LOCATION_DATA;
    const cols = DataHandler.columns().map((col, index) => {
      if (col.name === 'edit') {
        return {
          ...col,
          editable: () => false,
						render: (cellProps) =>   <EditFunction createFormHandler={createFormHandler} data={{...cellProps.data}} />
        }
    
      } else {
        return {
          ...col,
          editable: () => false
        }
      }
    });
    setColumns(cols);
    setDataSource(source);
    }, [props.data]);
    return (
      <React.Fragment>
        <Grid container spacing={24} justify="space-between" style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
          <Grid item xs={12}>

            <Typography variant="h3">Location</Typography>
            <br />
          </Grid>
          <Grid item xs={12}>
            <FilterTable />
            <br />
          </Grid>

          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Divider variant="fullWidth" style={{
                height: '.02em',
                border: 'solid 1px rgba(0, 0, 0, 0.12)'
              }} orientation="horizontal" flexItem />
            </Grid>
            <br />
          </Grid>

          <Grid container spacing={24} justify="space-between" style={{ paddingBottom: 10 }}>
            <Button
              onClick={() => createFormHandler()}
              variant="contained"
              style={{
                border: 'solid 1px #2196f3',
                color: 'white',
                background: '#2196f3',
                fontFamily: "Roboto",
                fontSize: "12px",
                fontWeight: 500,
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: 1.71,
                letterSpacing: "0.4px",
                textAlign: "left",
                cursor: 'pointer'
              }}
              component="span"
              startIcon={<AddIcon />}
            >
              ADD LOCATION
            </Button>
          </Grid>
          <Grid item xs={12}>

            <Table columns={columns} dataSource={dataSource} />
          </Grid>
        </Grid>
        {isFormModal &&
          <Form mode={mode} isOpen={isFormModal} isEdit={false} item={item} onClose={closeFormModalHandler} />
        }
      </React.Fragment>
    )
  }
export default Vendor;