import { joinCss } from '@/utilities';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage } from '@hookform/error-message';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldErrors, FieldValues, UseFormRegister, Validate } from 'react-hook-form';

type ValidationFields = Pick<Properties, 'deps' | 'disabled' | 'max' | 'maxLength' | 'min' | 'minLength' | 'required' | 'validate'>;

interface Properties extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    className?: string;
    deps?: string | string[];
    errors?: FieldErrors<FieldValues>;
    icon?: IconProp;
    label: string;
    register?: UseFormRegister<FieldValues>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate?: Validate<any, FieldValues> | Record<string, Validate<any, FieldValues>>;
}

export const Input = ({
    className,
    errors,
    icon,
    id,
    label,
    name,
    register,
    ...rest
}: Properties) => {
    if (!name) throw new Error('The input name is required');

    const registration = register ? register(name, {
        ...rest as ValidationFields,
        pattern: rest.pattern ? new RegExp(rest.pattern) : undefined,
        // @ts-expect-error The typings in the code are incorrect
        valueAsNumber: rest.type === 'number',
        // @ts-expect-error The typings in the code are incorrect
        valueAsDate: rest.type === 'date' || rest.type === 'datetime-local'
    }) : {};

    const inputCss = joinCss(
        'block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1',
        'ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2',
        'focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
        icon ? 'pl-10' : undefined
    );

    return (
        <div className={className}>
            <label className="text-sm font-semibold leading-6 text-gray-900 flex items-center" htmlFor={id || name}>
                {label}
                {!rest.required && <span className="ml-auto text-xs text-gray-400">(optional)</span>}
            </label>

            <div className="relative mt-2 rounded-md shadow-sm">
                {icon && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FontAwesomeIcon icon={icon} className="text-primary-500" aria-hidden="true" />
                    </div>
                )}

                <input
                    className={inputCss}
                    id={id || name}
                    name={name}
                    {...registration}
                    {...rest}
                />
            </div>

            <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => (
                    <p className="mt-2 text-red-600 font-semibold text-sm">
                        <i className="fa-light fa-triangle-exclamation" />

                        {message}
                    </p>
                )}
            />
        </div>
    );
};
