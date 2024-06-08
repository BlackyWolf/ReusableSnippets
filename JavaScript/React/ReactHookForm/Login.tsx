import { AlertText, Button, Form, Header, Input, useAppwrite } from '@/components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
    email: string;
    password: string
}

export const Login = () => {
    const [generalError, setGeneralError] = useState<string>();

    const navigate = useNavigate();

    const appwrite = useAppwrite();

    const submitForm = async ({ email, password }: FormData) => {
        setGeneralError(undefined);

        try {
            await appwrite.login(email, password);

            navigate('/my', { replace: true });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);

                setGeneralError(error.message);
            }
        }
    };

    return (
        <Form onSubmit={submitForm} className="space-y-6">
            <Header size="4" weight="font-black" className="text-center text-primary-600">
                Login
            </Header>

            <AlertText
                className="mt-6"
                icon={faTriangleExclamation}
                color="red" text={generalError}
                show={!!generalError}
            />

            <Input
                autoComplete="email"
                icon={faEnvelope}
                label="Email"
                placeholder="Your Email Address"
                name="email"
                required
                type="email"
            />

            <Input
                autoComplete="current-password"
                icon={faLock}
                label="Password"
                name="password"
                placeholder="Password"
                required
                type="password"
            />

            <div className="flex items-center justify-between space-x-4">
                <Button color="primary" type="submit" full>
                    Login
                </Button>
                <Link to="/auth/register">
                    <Button color="green" type="button" outline full>
                        Register
                    </Button>
                </Link>
            </div>
        </Form>
    );
};
