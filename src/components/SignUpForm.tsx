'use client';
import { useEffect, useState } from 'react';
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/20/solid';
import { Button, Checkbox, Input, Link } from '@nextui-org/react';
import { z } from 'zod';
import validator from 'validator';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordStrength } from 'check-password-strength';
import { PasswordStrength } from '.';
import { registerUser } from '@/lib/actions/authActions';
import { toast } from 'react-toastify';

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'First name must be at least characters')
      .max(45, 'First name must be less than 45 characters')
      .regex(new RegExp('^[a-zA-Z]+$'), 'No special character allowed!'),
    lastName: z
      .string()
      .min(2, 'Last name must be at least characters')
      .max(45, 'Last name must be less than 45 characters')
      .regex(new RegExp('^[a-zA-Zñ]+$'), 'No special character allowed!'),
    email: z.string().email('Please enter a valid email address'),
    phone: z
      .string()
      .refine(validator.isMobilePhone, 'Please enter a valid phone number!'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must be less than 50 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters')
      .max(50, 'Confirm password must be less than 50 characters'),
    accepted: z.literal(true, {
      errorMap: () => ({ message: 'Please accept all terms' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

type InputType = z.infer<typeof FormSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [passStrength, setPassStrength] = useState(0);
  const toggleVisiblePass = () => setIsVisiblePassword((prev) => !prev);
  const saveUser: SubmitHandler<InputType> = async (data) => {
    const { accepted, confirmPassword, ...user } = data;
    try {
      const result = await registerUser(user);
      toast.success('The User Registered Successfully.');
    } catch (error) {
      toast.error('Something Went Wrong!!');
      console.log(error);
    }
  };

  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
  }, [watch().password]);

  return (
    <form
      className='grid grid-cols-2 gap-3 p-2 shadow border rounded-md place-self-stretch'
      onSubmit={handleSubmit(saveUser)}
    >
      <Input
        {...register('firstName')}
        label='First Name'
        errorMessage={errors.firstName?.message}
        isInvalid={!!errors.firstName}
        startContent={<UserIcon className='w-4' />}
      />
      <Input
        {...register('lastName')}
        errorMessage={errors.lastName?.message}
        isInvalid={!!errors.lastName}
        label='Last Name'
        startContent={<UserIcon className='w-4' />}
      />
      <Input
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        {...register('email')}
        label='Email'
        className='col-span-2'
        type='email'
        startContent={<EnvelopeIcon className='w-4' />}
      />
      <Input
        {...register('phone')}
        errorMessage={errors.phone?.message}
        isInvalid={!!errors.phone}
        label='Phone'
        className='col-span-2'
        startContent={<PhoneIcon className='w-4' />}
      />
      <Input
        {...register('password')}
        label='Password'
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        type={isVisiblePassword ? 'text' : 'password'}
        className='col-span-2'
        startContent={<KeyIcon className='w-4' />}
        endContent={
          isVisiblePassword ? (
            <EyeSlashIcon
              className='w-4 cursor-pointer'
              onClick={toggleVisiblePass}
            />
          ) : (
            <EyeIcon
              className='w-4 cursor-pointer'
              onClick={toggleVisiblePass}
            />
          )
        }
      />
      <PasswordStrength passStrength={passStrength} />
      <Input
        {...register('confirmPassword')}
        label='Confirm Password'
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        type={isVisiblePassword ? 'text' : 'password'}
        className='col-span-2'
        startContent={<KeyIcon className='w-4' />}
      />
      <Controller
        control={control}
        name='accepted'
        render={({ field }) => (
          <Checkbox
            className='col-span-2'
            onChange={field.onChange}
            onBlur={field.onBlur}
          >
            I accept The <Link href='/terms'>Terms</Link>
          </Checkbox>
        )}
      ></Controller>
      {!!errors.accepted && (
        <p className='text-[#f31260] text-xs'>{errors.accepted.message}</p>
      )}

      <div className='flex justify-center col-span-2'>
        <Button color='primary' type='submit' className='w-48'>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
