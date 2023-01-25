import React, { useCallback, useEffect, useState } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';


let isWithCheckItem = false;

const PrintTable = props => {
        const [columns,setColumns] = useState([]);
        const [dataSource,setDataSource] = useState([]);
        const [loading, setLoading] = useState(true);
        const [selected, setSelected] = useState({});
        useEffect(() => { 
          console.log('[Props]',props);
          setColumns(props.columns);
          setDataSource(props.dataSource);
          isWithCheckItem = props.dataSource.find(d => d.isChecked);
          if(!isWithCheckItem) {
            setSelected({});
          }
        }, [props]);
      
        useEffect(() => {
          setLoading(props.loading)
          // setReservedViewportWidth(null)
      
        }, [props.loading]);
     
        const onCellClick = useCallback((event, cellProps) => {
          event.stopPropagation();
        });
        const onRowClick = useCallback((rowProps, event) => {
          event.preventDefault();
          event.stopPropagation();
      
        });
        const onSelectionChange = useCallback(({ selected: selectedMap, data }) => {
          console.log('[onSelectChange]',data,selectedMap);
        if (JSON.stringify(selectedMap) === '{}') {
          // no selected
          props.onCheckboxSelectionHandler([], false,false);
        } else if (data && Array.isArray(data) && data.length >= 1) {
          // is Mark as All
          
          setSelected(selectedMap);
          props.onCheckboxSelectionHandler(data, true,true)
        } else {
          // there is selection
          setSelected(selectedMap);
          // find to distinguish if true or false
          console.log('[Object.keys(selectedMap)]',Object.keys(selectedMap));
        if(selectedMap && Array.isArray(Object.keys(selectedMap)) && Object.keys(selectedMap).length === 0) {
            props.onCheckboxSelectionHandler([data.id], false,false); 
        } else {
          const isChecked =  Object.keys(selectedMap).find(m => m.toString() === data.id.toString());
          props.onCheckboxSelectionHandler([data.id], false,isChecked || false);
        }
        }
      
      });
        const renderPaginationToolbar = useCallback((paginationProps) => {
          return <div style={{ height: 50,paddingLeft:8,paddingTop:8,paddingBottom:8 }}>
            <renderPaginationToolbar {...paginationProps} bordered={false} />
            <div>
            </div>
          </div>
        }, []);
      
        // use to save it in storage and 
         
          return (
            <ReactDataGrid
              idProperty="id"
              columns={columns}
              style={{height:760}}
              dataSource={dataSource}
            />
      
          )
        
        };
      
export default PrintTable;
