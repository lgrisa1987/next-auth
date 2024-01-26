"use client";
import { useState } from "react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon, PhoneIcon, UserIcon } from "@heroicons/react/20/solid";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { z } from "zod";
import validator from "validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least characters")
      .max(45, "First name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    lastName: z
      .string()
      .min(2, "Last name must be at least characters")
      .max(45, "Last name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().refine(validator.isMobilePhone, "Please enter a valid phone number!"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z.string(),
    accepted: z.literal(true, { errorMap: () => ({ message: "Please accept all terms" }) }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const SignUpForm = () => {
  const { register, handleSubmit, reset, control } = useForm<InputType>({ resolver: zodResolver(FormSchema) });
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const toggleVisiblePass = () => setIsVisiblePassword((prev) => !prev);
  const saveUser: SubmitHandler<InputType> = async (data) => {
    console.log(data);
  };
  return (
    <form
      className="grid grid-cols-2 gap-3 p-2 shadow border rounded-md place-self-stretch"
      onSubmit={handleSubmit(saveUser)}
    >
      <Input {...register("firstName")} label="First Name" startContent={<UserIcon className="w-4" />} />
      <Input {...register("lastName")} label="Last Name" startContent={<UserIcon className="w-4" />} />
      <Input
        {...register("email")}
        label="Email"
        className="col-span-2"
        type="email"
        startContent={<EnvelopeIcon className="w-4" />}
      />
      <Input {...register("phone")} label="Phone" className="col-span-2" startContent={<PhoneIcon className="w-4" />} />
      <Input
        {...register("password")}
        label="Password"
        type={isVisiblePassword ? "text" : "password"}
        className="col-span-2"
        startContent={<KeyIcon className="w-4" />}
        endContent={
          isVisiblePassword ? (
            <EyeSlashIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass} />
          ) : (
            <EyeIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass} />
          )
        }
      />
      <Input
        {...register("confirmPassword")}
        label="Confirm Password"
        type={isVisiblePassword ? "text" : "password"}
        className="col-span-2"
        startContent={<KeyIcon className="w-4" />}
      />
      <Controller
        control={control}
        name="accepted"
        render={({ field }) => (
          <Checkbox className="col-span-2" onChange={field.onChange} onBlur={field.onBlur}>
            I accept The <Link href="/terms">Terms</Link>
          </Checkbox>
        )}
      ></Controller>

      <div className="flex justify-center col-span-2">
        <Button color="primary" type="submit" className="w-48">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
