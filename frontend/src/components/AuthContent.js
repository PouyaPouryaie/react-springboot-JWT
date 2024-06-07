import React, { useEffect, useState } from 'react'
import { request, setAuthHeader } from '../axios_helper';

const AuthContent = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        const fetchData = async () => {


            // const response = await request(
            //     "GET",
            //     "/api/v1/messages",
            //     {}
            // );

            // setData(response.data);

            try {

                const response = await request(
                    "GET",
                    "/api/v1/messages",
                    {}
                );
    
                setData(response.data);

            } catch (error) {

                if(error.response.status === 401) {
                    setAuthHeader(null);
                } else {
                    setData(error.response.code);
                }
            }
        };

        fetchData();

    }, []);


  return (
    <div className="row justify-content-md-center">
        <div className="col col-4">
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Backend response</h5>
                    <p className="card-text">Content:</p>
                    <ul>
                    {
                        data && data.map((item) => <li key={item}>{item}</li>)
                    }
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthContent