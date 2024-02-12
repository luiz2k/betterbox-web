import { ComponentProps, forwardRef, useId } from "react";

type LabelAndInputProps = ComponentProps<"input"> & {
  label: string;
  value?: string;
  error?: string;
};

const LabelAndInput = forwardRef<HTMLInputElement, LabelAndInputProps>(
  ({ label, value, type, name, placeholder, error, ...props }, ref) => {
    const id: string = useId();

    return (
      <div className="flex h-[4.5rem] flex-col space-y-0.5">
        <label htmlFor={id}>{label}</label>

        <input
          data-success={!!error === false && value !== undefined}
          data-error={!!error}
          id={id}
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          className="rounded border-2 bg-color-2 px-1 text-color-4 shadow-inner data-[error=true]:border-red-500 data-[success=true]:border-green-500"
          {...props}
        />

        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  },
);

LabelAndInput.displayName = "LabelAndInput";

export default LabelAndInput;
