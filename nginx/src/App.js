import './App.css';
import React, {useState}  from 'react';



const App = () => {
  const [payload, setPayload] = useState();
  const [containerData, setContainerData] = useState();
  

  // Handles Request button pressing and forwards request message
  // through nginx to the service1  
  const handleRequest = () => {
    fetch('http://128.214.252.48:8198/api')
        .then((res) => res.text())
        .then(data => setPayload(data))
        .catch(error => console.error("Error fetching data:", error));
        
  };

  // Formats incoming long data string from service1 and service2
  // to multiple lines
  const formatString = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
          {line}
          <br /> {/* Insert a line break for each line */}
      </span>
    ));
  };

  // Forwards STOP button signal to through nginx to the services (not working)
  const handleTermination = () => {
    fetch('http://localhost:8198/stop')
        .then((res) => res.text())
        .then(data => setContainerData(data))
        .catch(error => console.error("Error fetching data:", error));
    
    
};
  // Since process id list is reversed compared with "df"-command
  // this function puts data to the same order.
  const getIds = (data) => {
    const ids = data
    .filter(item => item.id !== undefined)
    .map(item => item.id);
    ids = ids.reverse();
    return ids
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
      <div>
        <pre className='info-container'>{containerData}</pre>
      </div>
    </React.Fragment>  
    

    
  );
};

export default App;
