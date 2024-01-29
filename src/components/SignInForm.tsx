'use client';

import { useState } from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Link } from '@nextui-org/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type Props = {
  callbackUrl?: string;
};

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Please enter your password'),
});

type InputType = z.infer<typeof formSchema>;

const SignInForm = ({ callbackUrl }: Props) => {
  const router = useRouter();
  const [visiblePass, setVisiblePass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn('credentials', {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success('Welcome!!!');
    router.push(callbackUrl || '/');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-2 border shadow w-[min(90%,64rem)] mx-auto rounded-md overflow-hidden'
    >
      <div className='bg-gradient-to-b from-white to-slate-200 dark:from-slate-700 dark:to-slate-900 p-2 text-center'>
        Sign In Form
      </div>
      <div className='p-2 flex flex-col gap-2'>
        <Input
          label='Email'
          {...register('email')}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <Input
          type={visiblePass ? 'text' : 'password'}
          label='Password'
          {...register('password')}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          endContent={
            <button onClick={() => setVisiblePass(!visiblePass)} type='button'>
              {visiblePass ? (
                <EyeSlashIcon className='w-4' />
              ) : (
                <EyeIcon className='w-4' />
              )}
            </button>
          }
        />
        <div className='flex items-center justify-center gap-2'>
          <Button
            color='primary'
            type='submit'
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
          <Button as={Link} href='/auth/signup'>
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
