// Components
import Navbar from 'components/common/Navbar';
import Footer from 'components/common/Footer';
import ScrollToTop from 'components/common/ScrollToTop';
// Pages
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import Register from 'pages/Register';
import UserIndex from 'pages/user/Index';
import AdminIndex from 'pages/admin/Index';
import NewSurvey from 'pages/admin/NewSurvey';
import SurveyPage from 'pages/user/SurveyPage';
import SurveyEditPage from 'pages/admin/SurveyEditPage';
import SurveyResponsePage from 'pages/admin/SurveyResponsePage';
import EditCarouselPage from 'pages/admin/carousel/EditCarouselPage';

// Others
import './App.css';
import Loading from 'components/common/Loading';
import AuthContextProvider, { useAuth } from 'contexts/AuthContext';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

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
                <PrivateRoute exact path="/admin/carousel" component={EditCarouselPage} />
                <PrivateRoute exact path="/admin/survey/response/:id" component={SurveyResponsePage} />
                <PrivateRoute exact path="/admin/survey/edit/:id" component={SurveyEditPage} />
                <PrivateRoute exact path="/" component={UserIndex} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/survey/:id" component={SurveyPage} />
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
        rest.path == "/" ?
          currentUser ?
            <Redirect to="/admin" />
            :
            <Route {...rest} render={props => { return <Component {...props} /> }}></Route>
          :
          <Route {...rest} render={props => { return currentUser ? <Component {...props} /> : <NotFound /> }}></Route>
      }
    </>
  )
}

export default App;
