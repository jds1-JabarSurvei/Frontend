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
        <Login />
      </div>
      <Footer />
    </div>
  );
}

export default App;
