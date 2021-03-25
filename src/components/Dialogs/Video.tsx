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
      header="NFT Hack Finale"
    >
      <AspectRatio maxW="500px" ratio={1}>
        {/* <iframe
          title="NFTHack Finale"
          src=""
          allowFullScreen
        /> */}
        <ReactPlayer width="400px" url="https://youtu.be/dPa3UsuTAsw" />
      </AspectRatio>
    </Dialog>
  );
}
