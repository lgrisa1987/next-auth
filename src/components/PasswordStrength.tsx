import { cn } from 'clsx-tailwind-merge';

type Props = {
  passStrength: number;
};

const PasswordStrength = ({ passStrength }: Props) => {
  return (
    <div className='flex gap-2 relative'>
      <div className='absolute top-0 left-0 flex gap-2'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className='h-2 w-7 rounded-md bg-white/10' />
        ))}
      </div>
      {Array.from({ length: passStrength + 1 }).map((_, i) => (
        <div
          className={cn('h-2 w-7 rounded-md relative', {
            'bg-red-500': !passStrength,
            'bg-orange-500': passStrength === 1,
            'bg-yellow-500': passStrength === 2,
            'bg-green-500': passStrength === 3,
          })}
          key={i}
        />
      ))}
    </div>
  );
};

export default PasswordStrength;
