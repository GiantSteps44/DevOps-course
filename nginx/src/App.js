import './App.css';
import React, {useState, useEffect}  from 'react';


const App = () => {
  const [payload, setPayload] = useState();
  
  const handleRequest = () => {
    fetch('http://localhost:8198/api')
        .then((res) => res.text())
        .then(data => setPayload(data))
        .catch(error => console.error("Error fetching data:", error));
        
  };

  const formatString = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
          {line}
          <br /> {/* Insert a line break for each line */}
      </span>
    ));
  };

  const handleTermination = () => {

  };

  return (
    <React.Fragment>
      <div className="login-container">
        <h1>Welcome!</h1> {/* Display the username here */}
        <p>This is the authorized page.</p>
        <button onClick={handleRequest}>REQUEST</button>
        <button onClick={handleTermination}>STOP</button>
      </div>
      
      <div>
        <pre className='info-container'>{payload}</pre>
      </div>
    </React.Fragment>  
    

    
  );
};

export default App;
