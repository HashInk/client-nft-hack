import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import useStore from '../../store';
import Dialog from './Dialog';

export default function Email() {
  const { emailModalIsOpen, toggleEmailModal } = useStore();
  const [emailAddress, setEmailAddress] = useState('');

  const [isDisabled, setIsDisabled] = useState(true);

  const subscribe = async () => {
    try {
      const response = await axios.post('/api/newsletter', {
        emailAddress,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog
      isOpen={emailModalIsOpen}
      onClose={toggleEmailModal}
      header="Stay connected"
      footer={
        <>
          <Button variant="ghost" mr={3} onClick={toggleEmailModal}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => subscribe()}
            // isDisabled={}
            isDisabled={!emailAddress || isDisabled}
          >
            Submit
          </Button>
        </>
      }
    >
      <VStack>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="johnsmith@gmail.com"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </FormControl>
        <ReCAPTCHA
          sitekey="6LfioJIaAAAAAC-gG7dzsL2BGRiMBVM-FbIZx-Lu"
          onChange={() => setIsDisabled(false)}
        />
      </VStack>
    </Dialog>
  );
}
