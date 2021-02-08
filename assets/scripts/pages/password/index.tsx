import React from 'react';
import Layout from '@components/layout';
import TextInput from '@components/form/textInput';
import HandleResponse from '@scripts/services/handleResponse';
import SubmitButton from '@components/form/submitButton';
import { Link, Redirect } from 'react-router-dom';
import { Router } from '@scripts/router';

const EmailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface PasswordPropsI {

}

interface PasswordStateI {
    error: boolean,
    errorMsg?: string,
    success: boolean,
    successMsg?: string,
    loading: boolean;
    inputs: {
        email: string;
    };
    errors: {
        email: boolean;
    }
}

export default class Password extends React.Component<PasswordPropsI, PasswordStateI> {
    constructor (props: PasswordPropsI) {
        super(props);
        this.state = {
            error: false,
            success: false,
            loading: false,
            inputs: {
                email: "",
            },
            errors: {
                email: false,
            }
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            inputs: {
                email: e.target.value,
            },
            errors: {
                email: false,
            }
        });
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let error = false;
        this.setState({
            errorMsg: undefined,
        });
        if (this.state.inputs.email == "" || !EmailRegExp.test(this.state.inputs.email)) {
            error = true;
        }
        this.setState({
            errors: {
                email: error,
            },
        });
        if(!error) {
            console.log(this.state.inputs);
        }
    }

    render = (): JSX.Element => {
        return (
            <Layout title="Recuperar contraseña" top={false}>
                <div className="vertical-center w-100">
                    <div className="card mx-auto wd-40-wm-95 mt-5 round shadow-lg">
                        <div className="card-body">
                            <h5 className="h3 mb-3 font-weight-normal text-center">Correo electrónico</h5>
                            <hr className="divide" />
                            {
                                this.state.error && (
                                    <div className="alert alert-danger round text-center">
                                        {this.state.errorMsg}
                                    </div>
                                )
                            }
                            {
                                this.state.success && (
                                    <div className="alert alert-success round text-center">
                                        {this.state.successMsg}
                                    </div>
                                )
                            }
                            <form onSubmit={this.handleSubmit}>
                                <TextInput
                                    name="email"
                                    onChange={this.handleChange}
                                    error={this.state.errors.email}
                                    errorMsg="Ingresa un correo válido"
                                    value={this.state.inputs.email}
                                />

                                <SubmitButton text="Enviar correo de recuperación" loading={this.state.loading} />
                            </form>
                            <hr/>
                            <div className="text-center">
                                <small>
                                    <Link to={(new Router(process.env.BASE_URL).get("login"))}>Inciar sesión</Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    };
}