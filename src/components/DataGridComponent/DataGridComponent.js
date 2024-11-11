import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './DataGridComponent.module.css';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, Container, Col, Row, Modal, Spinner } from 'react-bootstrap';

function DataGridComponent() {
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchRecords = async (page, pageSize) => {
    setLoading(true);
    //let host = 'http://localhost:8080';
    let host = 'https://eicsh1si41.execute-api.us-west-2.amazonaws.com/dev';
    try {
      const response = await axios.get(host + '/calculator/record/1', {
        params: {
          page: page,
          size: pageSize,
          sortBy: 'id',
          ascending: false
        }
      });
      console.log(response);
      setRows(response.data.content);
      setRowCount(response.data.totalElements);
    } catch (error) {
      console.error('Failed to fetch records:', error);
    }
    setLoading(false);
  };

  const handleRefresh = () => {
    fetchRecords(page, pageSize);
  };

  useEffect(() => {
    fetchRecords(page, pageSize);
  }, [page, pageSize]);

  return (
    <Container>

      <div className={styles.DataGridComponent} >
        <DataGrid
          rows={rows}
          columns={[
            { field: 'id', headerName: 'ID'},
            { field: 'operation', headerName: 'Operation', width:150 },
            { field: 'result', headerName: 'Result', width:150 },
            { field: 'cost', headerName: 'Cost' },
            { field: 'balance', headerName: 'User Balance', width:150 },
            { field: 'createdDate', headerName: 'CreatedAt', width:150 }
          ]}
          pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          rowCount={rowCount}
          paginationMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          loading={loading}
        />
      </div>

      <Button
        variant="primary" size="lg" 
        onClick={handleRefresh}
        style={{ marginBottom: '10px' }}
      >
        Refresh Data
      </Button>
    </Container>
  );
}

export default DataGridComponent;
