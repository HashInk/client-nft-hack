const axios = require('axios');
const FormData = require('form-data');

export default function pinFileToIPFS(image, params) {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

  const apiKey = process.env.PINATA_API_KEY;
  const secretKey = process.env.PINATA_API_SECRET;

  const data = new FormData();
  data.append('file', image);

  const metadata = JSON.stringify({
    name: params.name,
    keyvalues: params,
  });
  data.append('pinataMetadata', metadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: 'FRA1',
          desiredReplicationCount: 1,
        },
        {
          id: 'NYC1',
          desiredReplicationCount: 2,
        },
      ],
    },
  });
  data.append('pinataOptions', pinataOptions);

  return axios
    .post(url, data, {
      maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: apiKey,
        pinata_secret_api_key: secretKey,
      },
    })
    .then(function (response) {
      //handle response here
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
