import { cn } from '@/lib/utils';

const ProductPrice = ({
  value,
  className,
}: {
  value: number | string;
  className?: string;
}) => {
  // Convert value to number if it's a string
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  // Fallback to 0 if NaN
  const safeValue = isNaN(numValue) ? 0 : numValue;
  // Ensure 2 decimal places
  const formattedPrice = safeValue.toFixed(2);
  // get Int/float parts
  const [intPart, floatPart] = formattedPrice.split('.');

  return (
    <p className={cn('text-2xl', className)}>
      <span className='text-xs align-super'>$</span>
      {intPart}
      <span className='text-xs align-super'>.{floatPart}</span>
    </p>
  );
};

export default ProductPrice;
