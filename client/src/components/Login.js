import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Alert } from 'reactstrap';

const Login = ({ setToken, authed }) => {
    const history = useHistory();
    const [error, setError] = useState('');

    return (
        <div className="container w-25">
            {!authed ? (
                <>
                    <h2>Login</h2>
                    {error === '' ? null : (
                        <Alert color="danger">{error}</Alert>
                    )}
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    values.email
                                )
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            axios
                                .post(
                                    'http://localhost:3003/api/v1/auth/login',
                                    values
                                )
                                .then((res) => {
                                    if (res.data.success) {
                                        setToken('bearer=' + res.data.token);
                                        setTimeout(() => {
                                            history.push('/dashboard');
                                        }, 2000);
                                    }
                                })
                                .catch((err) =>
                                    setError(err.response.data.error)
                                )
                                .finally(setSubmitting(false));
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting
                            /* and other goodies */
                        }) => (
                            <form
                                className="d-flex flex-column gap-2"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                {errors.email && touched.email && errors.email}
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                {errors.password &&
                                    touched.password &&
                                    errors.password}
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </form>
                        )}
                    </Formik>
                </>
            ) : (
                <p>logged in as {authed.name}</p>
            )}
        </div>
    );
};

export default Login;
