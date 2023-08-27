import React, { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import RegistrationForm from './pages/RegistrationForm';
import LoginForm from './pages/LoginForm';
import Dashboard from './pages/dashboard/Dashboard';
import Footer from './components/Footer';
import Invoice from './pages/dashboard/invoice/Invoice';
import ProfilePage from './pages/dashboard/Profilepage';
import InvoicesForApproval from './pages/dashboard/invoice/InvoicesForApproval';
import ApprovedPDFs from './pages/dashboard/invoice/ApprovedPDFs';
import PendingApprovalPDFs from './pages/dashboard/invoice/PendingApproval';
import EarlyPayment from './pages/dashboard/EarlyPayment';
import Settings from './pages/dashboard/Settings';
import Tokens from './pages/dashboard/Tokens'; // Import the Tokens component
import Support from './pages/dashboard/Support';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const handleLogin = () => {
    setIsLoggedIn(true);
    history.push('/dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    history.push('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isLoggedIn ? null : <Navbar />}
      <Container
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={RegistrationForm} />
          <Route exact path="/login">
            <LoginForm handleLogin={handleLogin} />
          </Route>
          {isLoggedIn && (
            <Route exact path="/dashboard">
              <Dashboard handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
            </Route>
          )}
          <Route exact path="/dashboard/profile">
            <ProfilePage isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/invoices">
            <Invoice isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/invoices/invoiceforapproval">
            <InvoicesForApproval isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/invoices/approved_invoices">
            <ApprovedPDFs isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/invoices/pending_approval_pdfs">
            <PendingApprovalPDFs isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/earlypayment">
            <EarlyPayment isLoggedIn={isLoggedIn} />
          </Route>
          {/* Include the Tokens route */}
          <Route exact path="/dashboard/tokens">
            <Tokens isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/support">
            <Support isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/settings">
            <Settings isLoggedIn={isLoggedIn} />
          </Route>
        </Switch>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
