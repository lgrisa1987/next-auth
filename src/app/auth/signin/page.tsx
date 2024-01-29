import Link from 'next/link';
import { SignInForm } from '@/components';

type Props = {
  searchParams: {
    callbackUrl?: string;
  };
};

const SiginPage = ({ searchParams }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <SignInForm callbackUrl={searchParams.callbackUrl} />
      <Link href='/auth/forgot-pass'>Forgot your password?</Link>
    </div>
  );
};

export default SiginPage;
