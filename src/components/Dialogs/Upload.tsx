import { Button, Input } from '@chakra-ui/react';
import { useRef, useState } from 'react';

const axios = require('axios');
const FormData = require('form-data');

const pinFileToIPFS = (image, params) => {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

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
        pinata_api_key: process.env.PINATAKEY,
        pinata_secret_api_key: process.env.PINATASECRET,
      },
    })
    .then(function (response) {
      //handle response here
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
//

// const Input = styled.input`
//   padding: 5px;
//   margin-bottom: 20px;
// `;

export default function Upload() {
  const imageUploader = useRef(null);

  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);

  const handleChange = (event) => {
    if (event.target.id === 'name') {
      setName(event.target.value);
    }

    if (event.target.id === 'description') {
      setDescription(event.target.value);
    }

    if (event.target.id === 'price') {
      setPrice(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    pinFileToIPFS(image, {
      name: name,
      description: description,
      price: price,
    });
  };

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      setImage(file);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
        />
        <legend>Name</legend>
        <Input
          type="text"
          id="name"
          placeholder="e.g Some Collectible"
          onChange={handleChange}
          required
        />
        <legend>Description</legend>
        <Input
          type="text"
          id="description"
          placeholder="Optional"
          onChange={handleChange}
        />

        <Button type="submit" value="Submit" />
      </form>
    </div>
  );
}
