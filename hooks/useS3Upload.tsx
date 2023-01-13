import React, { useState } from 'react'
import axios from 'axios';
import moment from "moment";

export const useS3Upload = () => {
    const [s3State, setS3State] = useState({
        name : "",
        file : ""
    });
    const uploadToS3 = async (file : any, signedRequest : any) => {
        const options = {
            headers: {
            "Content-Type": file.type,
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT"
            }
        };
        const res = await axios.put(signedRequest, file, options);
        return res;
    };
    
    const formatFilename = (filename : any) => {
        const date = moment().format("YYYYMMDD");
        const randomString = Math.random()
          .toString(36)
          .substring(2, 7);
        const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
        return newFilename.substring(0, 60);
      };
    
  return {
    s3State,
    setS3State,
    formatFilename,
    uploadToS3
  }
}
