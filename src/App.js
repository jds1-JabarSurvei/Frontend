// Components
import Navbar from 'components/common/Navbar';
import Footer from 'components/common/Footer';
import ScrollToTop from 'components/common/ScrollToTop';
// Pages
import Login from 'pages/Login';
import Register from 'pages/Register';
import Index from 'pages/Index';
// Others
import './App.css';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <div className="App">
          <Navbar />
          <div className="page-container">
            <Switch>
              {/* Route and PrivateRoute go here */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route path="/" component={Index} />
            </Switch>

          </div>
          <Footer />
        </div>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
