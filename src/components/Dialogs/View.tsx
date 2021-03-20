import { Button, Img } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { FaTwitter } from 'react-icons/fa';

import useStore from '../../store';
import { getEtherscanLink } from '../../utils';
import Dialog from './Dialog';

export default function View() {
  const { viewModalIsOpen, toggleViewModal } = useStore();
  const { chainId, account } = useWeb3React();
  const autographImage =
    'https://www.instantautographs.com/assets/ia-autograph-ddb0d9e55cf90a6d191a329322c6808d8bc991510b6f7902e377f368f962c8bb.png';

  return (
    <Dialog
      isOpen={viewModalIsOpen}
      onClose={toggleViewModal}
      header="Justin Shenkarow"
      footer={
        <>
          <Button
            as="a"
            mr={3}
            target="_blank"
            variant="ghost"
            href={getEtherscanLink(chainId, account, 'address')}
            rel="noopener noreferrer"
            aria-label="Etherscan"
            // leftIcon={getIcon('Etherscan', 4)}
          >
            Etherscan
          </Button>

          <Button colorScheme="twitter" leftIcon={<FaTwitter />}>
            Share
          </Button>
        </>
      }
    >
      <Img src={autographImage} alt="NFT Image" />
    </Dialog>
  );
}
