import {BrowserRouter,  Route,  Routes,} from 'react-router-dom';
import React from 'react';
import Footer from './Common/Footer';
import Main from './Common/Main';
import Header from './Common/Header';
function App() {

  return (
    <div className="App">
      <BrowserRouter> {/* Header.js의 Link연동을 위해서 BrowserRouter추가해야됨 */}
         <Header />

            <Routes>
              <Route path="/" element={<Main />} />
            </Routes>

          <Footer />
      </BrowserRouter>
      
    </div>
    
  );
}

export default App;