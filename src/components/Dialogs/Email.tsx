import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

// import ReCAPTCHA from 'react-google-recaptcha';
import useStore from '../../store';
import Dialog from './Dialog';

export default function Email() {
  const { emailModalIsOpen, toggleEmailModal } = useStore();
  const [emailAddress, setEmailAddress] = useState('');
  const toast = useToast();

  const subscribe = async () => {
    try {
      await axios.post('/api/newsletter', {
        emailAddress,
      });
      toast({
        title: 'Subscribed!',
        description: "We'll be sure to keep you in the loop",
        status: 'success',
        variant: 'subtle',
        isClosable: true,
      });
      toggleEmailModal();
    } catch (e) {
      console.error(e);
      toast({
        title: 'Error',
        description: 'Please try again',
        status: 'error',
        variant: 'subtle',
        isClosable: true,
      });
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
            isDisabled={!emailAddress}
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
        {/* <ReCAPTCHA
          sitekey="6LfioJIaAAAAAC-gG7dzsL2BGRiMBVM-FbIZx-Lu"
          onChange={() => setIsDisabled(false)}
        /> */}
      </VStack>
    </Dialog>
  );
}
