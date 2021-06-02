import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Alert } from 'reactstrap';

const Register = () => {
    const history = useHistory();
    const [error, setError] = useState('');

    return (
        <div className="form container w-25 mt-2">
            <h2>Register</h2>
            {error === '' ? null : <Alert color="danger">{error}</Alert>}
            <Formik
                initialValues={{ email: '', password: '', name: '' }}
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
                    if (!values.password) {
                        errors.password = 'Required';
                    } else if (
                        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
                            values.password
                        )
                    ) {
                        errors.password = 'Invalid password';
                    }

                    if (!values.name) {
                        errors.name = 'Required';
                    } else if (
                        !/^(?=.*[A-Za-z])[A-Za-z\d\W]{2,}$/.test(values.name)
                    ) {
                        errors.name = 'Invalid name';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    axios
                        .post(
                            'http://localhost:3003/api/v1/auth/register',
                            values
                        )
                        .then((res) => {
                            if (res.data.success) {
                                // setToken('bearer=' + res.data.token);
                                setTimeout(() => {
                                    history.push('/login');
                                }, 2000);
                            }
                        })
                        .catch((err) => setError(err.response.data.error));
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
                        <label className="fs-4" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            placeholder="Enter your name"
                            spellCheck={false}
                        />
                        <p style={{ color: 'red' }}>
                            {errors.name && touched.name && errors.name}
                        </p>

                        <label className="fs-4" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Enter your email"
                        />
                        <p style={{ color: 'red' }}>
                            {errors.email && touched.email && errors.email}
                        </p>

                        <label className="fs-4" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="Enter your password"
                        />
                        <p style={{ color: 'red' }}>
                            {errors.password &&
                                touched.password &&
                                errors.password}
                        </p>

                        <button type="submit" disabled={isSubmitting}>
                            Register
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
