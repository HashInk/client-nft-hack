import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Img,
  Input,
  InputGroup,
  InputLeftAddon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import useStore from '../../store';
import Dialog from './Dialog';

export default function Enroll() {
  const { enrollModalIsOpen, toggleEnrollModal } = useStore();
  const [enrolledDetails, setEnrolledDetails] = useState({
    name: '',
    email: '',
    handle: '',
    numberOfFollowers: 0,
    profession: '',
    startingRate: 0,
  });
  const [signInDetails, setSignInDetails] = useState({
    email: '',
    password: '',
  });

  function onEnroll() {
    console.log('enrolledDetails:', enrolledDetails);
  }

  function onSignIn() {
    console.log('signInDetails:', signInDetails);
  }

  return (
    <Dialog
      isOpen={enrollModalIsOpen}
      onClose={toggleEnrollModal}
      header="Welcome!"
    >
      <Tabs variant="soft-rounded" colorScheme="blue" isFitted>
        <TabList>
          <Tab>Enroll</Tab>
          <Tab>Sign In</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="name"
                  placeholder="Name"
                  value={enrolledDetails.name}
                  onChange={(e: any) =>
                    setEnrolledDetails({
                      ...enrolledDetails,
                      name: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="john@gmail.com"
                  value={enrolledDetails.email}
                  onChange={(e: any) =>
                    setEnrolledDetails({
                      ...enrolledDetails,
                      email: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl id="handle" isRequired>
                <FormLabel>Handle</FormLabel>
                <Input
                  type="text"
                  placeholder="@jack"
                  value={enrolledDetails.handle}
                  onChange={(e: any) =>
                    setEnrolledDetails({
                      ...enrolledDetails,
                      handle: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl id="followers" isRequired>
                <FormLabel>Number of followers</FormLabel>
                <Input
                  type="text"
                  placeholder="200k"
                  value={enrolledDetails.numberOfFollowers}
                  onChange={(e: any) =>
                    setEnrolledDetails({
                      ...enrolledDetails,
                      numberOfFollowers: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl id="profession" isRequired>
                <FormLabel>Profession</FormLabel>
                <Input
                  type="text"
                  placeholder="Actor, Star of Show..."
                  value={enrolledDetails.profession}
                  onChange={(e: any) =>
                    setEnrolledDetails({
                      ...enrolledDetails,
                      profession: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl id="rate" isRequired>
                <FormLabel>Starting rate</FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    //eslint-disable-next-line
                    children="$"
                    pointerEvents="none"
                    color="white"
                  />
                  <Input
                    type="number"
                    placeholder="200"
                    alue={enrolledDetails.startingRate}
                    onChange={(e: any) =>
                      setEnrolledDetails({
                        ...enrolledDetails,
                        startingRate: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </FormControl>
              <Button w="100%" colorScheme="blue" onClick={() => onEnroll()}>
                Enroll as talent
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="john@gmail.com"
                  value={signInDetails.email}
                  onChange={(e: any) =>
                    setSignInDetails({
                      ...signInDetails,
                      email: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Password</FormLabel>
                <Input
                  type="text"
                  placeholder="********"
                  value={signInDetails.password}
                  onChange={(e: any) =>
                    setSignInDetails({
                      ...signInDetails,
                      password: e.target.value,
                    })
                  }
                />
              </FormControl>
              <Button w="100%" colorScheme="blue" onClick={() => onSignIn()}>
                Sign in
              </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Dialog>
  );
}
