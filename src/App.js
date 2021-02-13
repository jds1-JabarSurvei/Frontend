import Navbar from 'components/common/Navbar';
import Footer from 'components/common/Footer';

// Pages
import Example from 'pages/Example';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="page-container">
        {/* Route and PrivateRoute go here */}
        <Example />
      </div>
      <Footer />
    </div>
  );
}

export default App;
