import React, { useState, useEffect } from 'react';
import { useMediaQuery, Container, IconButton, Grid, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Typography, Button } from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';
import axios from 'axios'
import DashboardNav from '../../../components/dashboard/DashboardNav';

const PendingApprovalPDFs = ({ isLoggedIn }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [invoicesData, setInvoicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/pending_approval_invoices')
      .then(response => {
        setInvoicesData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      });
  }, []);

  const handleDeleteInvoice = (invoiceId) => {
    axios.delete(`/invoices/${invoiceId}`)
      .then((response) => {
        setInvoicesData((prevInvoices) =>
          prevInvoices.filter((invoice) => invoice.id !== invoiceId)
        );
        alert(`Invoice with ID ${invoiceId} has been deleted.`);
      })
      .catch((error) => {
        console.error(`Error deleting invoice with ID ${invoiceId}:`, error);
        alert(`Error deleting invoice with ID ${invoiceId}. Please try again later.`);
      });
  };

  const handleSendForApproval = (invoiceId) => {
    axios.post(`/invoices/pending_approval_pdfs/${invoiceId}`)
      .then(response => {
      })
      .catch(error => {
        console.error('Error while sending for approval:', error);
      });
  };

  return (
    <div>
      <DashboardNav isLoggedIn={isLoggedIn} />
      <Container style={{ marginTop: "90px", marginBottom: '20px' }}>
        <h2>PDF's Pending For Approval </h2><p style={{ marginTop: '0px' }}>Send for Approval from Here</p>
        {isSmallScreen ? (
          <Grid container spacing={3} justifyContent="center" style={{ marginTop: '8px' }}>
            {invoicesData.map((invoice) => (
              <Grid item key={invoice.id} xs={12} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                  <Typography variant="h6" gutterBottom>
                    Invoice ID: {invoice.invoice_id}
                  </Typography>
                  <Typography variant="body2">Total Amount: {invoice.total_amount}</Typography>
                  <Typography variant="body2">Due Date: {invoice.due_date}</Typography>
                  <Typography variant="body2">Buyer ID: {invoice.buyer_id}</Typography>
                  <Typography variant="body2">Buyer Metamask Address: {invoice.buyer_metamask_address}</Typography>
                  <Typography variant="body2">Approval Status: {invoice.approval_status}</Typography>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    <IconButton onClick={() => alert(`View Invoice ID: ${invoice.invoice_id}`)}>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteInvoice(invoice.id)}>
                      <Delete />
                    </IconButton>
                    <Button variant="contained"  color="secondary" style={{fontSize:'12px'}} onClick={()=>handleSendForApproval(invoice.id)}>
                      Send for approval
                    </Button>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <TableContainer component={Paper} style={{ width: '100%', marginTop: '25px' }}>
  <Table>
    <TableHead>
      <TableRow >
        <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }} >Invoice ID</TableCell>
        <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Total Amount</TableCell>
        <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Due Date</TableCell>
        <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Buyer ID</TableCell>
        <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Buyer Metamask Address</TableCell>
        <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Approval Status</TableCell>
        <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {invoicesData.map((invoice) => (
        <TableRow key={invoice.id} >
          <TableCell>{invoice.invoice_id}</TableCell>
          <TableCell>{invoice.total_amount}</TableCell>
          <TableCell>{invoice.due_date}</TableCell>
          <TableCell>{invoice.buyer_id}</TableCell>
          <TableCell>{invoice.buyer_metamask_address}</TableCell>
          <TableCell>{invoice.approval_status}</TableCell>
          <TableCell>
            <IconButton onClick={() => alert(`View Invoice ID: ${invoice.invoice_id}`)}>
              <Visibility />
            </IconButton>
            <IconButton onClick={() => handleDeleteInvoice(invoice.id)}>
              <Delete />
            </IconButton>
            <Button variant="contained" color="secondary" onClick={() => handleSendForApproval(invoice.id)}>
              Send for approval
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
        )}
      </Container>
    </div>
  );
};

export default PendingApprovalPDFs;
