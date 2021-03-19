import Request from './Request';
import Sign from './Sign';
import View from './View';
import Wallets from './Wallets';

export default function Dialogs() {
  return (
    <>
      <Wallets />
      <View />
      <Request />
      <Sign />
    </>
  );
}
