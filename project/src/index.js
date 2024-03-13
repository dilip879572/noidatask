import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import ScrollToTop from 'react-scroll-to-top';
// import ScaleLoader from 'react-spinners/ScaleLoader';
// import App from './App';
// import './index.css';
// import './App.css';

// function Index() {
//    const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 3000);
//   }, []);

//   return (
//     <>
    
//       {loading ? (
//         <>
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '100vh',
//           }}
//         >
//           <ScaleLoader
//             color="red" size={400}  />
//           </div>
//         </>
        
//       ) : (
//         <>
//           <ScrollToTop smooth top={20} color="black"/>
//           <App/>

//         </>
        
//       )}
//     </>
//   );
// }

// ReactDOM.render(<Index />, document.getElementById('root'));
