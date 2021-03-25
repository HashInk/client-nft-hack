import Enroll from './Enroll';
import Request from './Request';
import Sign from './Sign';
import Video from './Video';
import View from './View';
import Wallets from './Wallets';

export default function Dialogs() {
  return (
    <>
      <Wallets />
      <View />
      <Request />
      <Sign />
      <Enroll />
      <Video />
    </>
  );
}
