import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const BiteKeyAPI = () => {
  const location = useLocation();
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mail = searchParams.get('searchKeyByEMail');
    const UID = searchParams.get('searchKeyByUID');

    if (!UID && !mail) {
      return (
        <>
        <pre>provide email or uid</pre> 
        </>
      )
    }

    const url = `https://biteyt.xyz/api?searchKeyBy${UID ? `UID=${UID}` : `EMail=${mail}`}`;

    axios.get(url)
      .then((response) => {
        setApiResponse(response.data);
      })
      .catch((err) => {
        setApiResponse(err);
      });

  }, [location.search]);

  return (
    <div>
      {apiResponse && (
        <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
      )}
    </div>
  );
};

export default BiteKeyAPI;
