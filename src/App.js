// Components
import Navbar from 'components/common/Navbar';
import Footer from 'components/common/Footer';
import ScrollToTop from 'components/common/ScrollToTop';
// Pages
import Login from 'pages/Login';
import Register from 'pages/Register';
import UserIndex from 'pages/user/Index';
import AdminIndex from 'pages/admin/Index';
import NewSurvey from 'pages/admin/NewSurvey';
import NotFound from 'pages/NotFound';
import SurveyPage from 'pages/user/SurveyPage';
// Others
import './App.css';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import AuthContextProvider, { useAuth } from 'contexts/AuthContext';
import { Component } from 'react';
import Loading from 'components/common/Loading';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ScrollToTop>
          <div className="App">
            <Navbar />
            <div className="page-container">
              <Switch>
                {/* Route and PrivateRoute go here */}
                <PrivateRoute exact path="/admin" component={AdminIndex} />
                <PrivateRoute exact path="/admin/register" component={Register} />
                <PrivateRoute exact path="/admin/survey/new" component={NewSurvey} />
                <Route exact path="/login" component={Login} />

                <Route exact path="/" component={UserIndex} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </ScrollToTop>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser, loading } = useAuth();

  return (
    <>
      {loading ? <Loading /> :
        <Route
          {...rest}
          render={props => {
            return currentUser ? <Component {...props} /> : <NotFound />
          }}
        ></Route>
      }
    </>
  )
}

export default App;
