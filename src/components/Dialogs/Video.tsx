import { AspectRatio } from '@chakra-ui/react';
import ReactPlayer from 'react-player';

import useStore from '../../store';
import Dialog from './Dialog';

export default function Video() {
  const { videoModalIsOpen, toggleVideoModal } = useStore();

  return (
    <Dialog
      isOpen={videoModalIsOpen}
      onClose={toggleVideoModal}
      header="NFT Hack Finale Video"
    >
      <AspectRatio maxW="500px" ratio={1}>
        <ReactPlayer
          width="400px"
          url="https://www.youtube.com/watch?v=SDRL909UsZQ"
        />
      </AspectRatio>
    </Dialog>
  );
}
