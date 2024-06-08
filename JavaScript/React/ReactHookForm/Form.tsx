import { joinCss } from '@/utilities';
import { Children, ReactNode, createElement } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface Properties<TFormData extends FieldValues> {
    className?: string;
    children?: ReactNode | undefined;
    defaultValues?: never;
    onSubmit: SubmitHandler<TFormData>;
}

export const Form = ({
    children,
    className,
    defaultValues,
    onSubmit
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: Properties<any>) => {
    const {
        formState: { errors },
        handleSubmit,
        register
    } = useForm({ defaultValues });

    const css = joinCss('space-y-6', className);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={css}>
            {Children.map(children, child => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const element: any = child;

                if (element?.props?.name) {
                    return createElement(element.type, {
                        ...{
                            ...element.props,
                            register,
                            key: element.props.name,
                            errors
                        }
                    });
                }

                return child;
            })}
        </form>
    );
};
