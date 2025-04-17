import React from "react";

// 지갑상태변경

const AdminExAccountStatement = () => {
  
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <iframe 
        src="http://localhost:5601/app/dashboards#/view/6913f560-1b98-11f0-9ab3-9f91ea40a18b?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A10000)%2Ctime%3A(from%3Anow-24h%2Cto%3Anow))&show-time-filter=true" 
        height="800" 
        width="1200"
        frameBorder="0"
        title="Kibana Dashboard">
      </iframe>
    </div>
  );
};

export default AdminExAccountStatement;
