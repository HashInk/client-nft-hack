import { useEagerConnect, useInactiveListener } from '../hooks';

export default function Web3Manager({ children }: { children: JSX.Element }) {
  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager);

  if (!triedEager) {
    return null;
  }

  return children;
}
