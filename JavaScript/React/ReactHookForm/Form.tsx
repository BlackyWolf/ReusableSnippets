import { joinCss } from '@/utilities';
import { Children, PropsWithChildren, createElement } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type Properties = PropsWithChildren<{
    className?: string;
    defaultValues?: never;
    onSubmit: SubmitHandler<FieldValues>;
}>;

export const Form = ({
    children,
    className,
    defaultValues,
    onSubmit
}: Properties) => {
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
