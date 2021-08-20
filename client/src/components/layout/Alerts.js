import React, { useContext } from 'react';
import alertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const { alerts } = useContext(alertContext);

  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'></i>
        {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
