import React from "react";

// 지갑상태변경

const AdminExAccountStatement = () => {
  
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <iframe 
        src="http://localhost:5601/app/dashboards#/view/de53cf50-1b55-11f0-9e74-5f51300943a0?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow%2Fd%2Cto%3Anow%2Fd))&show-time-filter=true" 
        height="600" 
        width="1200"
        frameBorder="0"
        title="Kibana Dashboard">
      </iframe>
    </div>
  );
};

export default AdminExAccountStatement;
