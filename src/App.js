import Navbar from 'components/common/Navbar';
import Footer from 'components/common/Footer';
import Login from 'pages/Login';
import Register from 'pages/Register';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="page-container">
        {/* Route and PrivateRoute go here */}
        This is temporary landing page.
      </div>
      <Register/>
      <Footer />
    </div>
  );
}

export default App;
