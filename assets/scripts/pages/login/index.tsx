import Authentication from '@services/authentication';
import SubmitButton from '@components/submitButton';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Router } from '@scripts/router';
import Layout from '@components/layout';
import TextInput from '@components/textInput';

declare type LoginFields = "username" | "password";

interface LoginProps {
    logged: boolean;
    onloggedinchange: (logged: boolean) => void;
}

interface LoginState {
    username: string;
    password: string;
    error: boolean;
    loading: boolean;
    isLoggedIn: boolean;
    errors: {
        username: boolean;
        password: boolean;
    };
}

export default class Login extends React.Component<LoginProps, LoginState>{
    constructor (props: LoginProps) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: false,
            loading: false,
            isLoggedIn: this.props.logged,
            errors: {
                username: false,
                password: false,
            },
        };
        this.handleChange = this.handleChange.bind(this);
    }

    changeStateValue = (key: string, value: any) => {
        let current = { ...this.state };
        current[ key as LoginFields ] = value;
        this.setState(current);
    };

    handleSubmit = (e: React.FormEvent) => {
        let error = false;
        const newState = { ...this.state };
        e.preventDefault();
        newState.errors = {
            username: false,
            password: false,
        };
        if (this.state.username.trim() == "") {
            newState.errors.username = true;
            error = true;
        }
        if (this.state.password == "") {
            newState.errors.password = true;
            error = true;
        }
        this.setState(newState);
        if (error) return;
        this.changeStateValue("loading", true);
        Authentication.logIn({
            username: this.state.username,
            password: this.state.password,
            onSuccess: () => {
                window.location.href = "/";
            },
            onError: () => {
                this.changeStateValue("error", true);
                this.changeStateValue("isLoggedIn", false);
                this.changeStateValue("loading", false);
                this.props.onloggedinchange(false);
            }
        });
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.changeStateValue(e.target.name, e.target.value);
    };

    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key.match(/\s/)) {
            e.preventDefault();
        }
    };

    render = (): JSX.Element => {
        return (
            <Layout title="Inicar sesión">
                {this.state.isLoggedIn ? (
                    <Redirect to={(new Router()).get("home")} />
                ) : (
                        <div className="vertical-center w-100">
                            <div className="card mx-auto wd-40-wm-95 mt-5 round shadow-lg">
                                <div className="card-body">
                                    <h5 className="h3 mb-3 font-weight-normal text-center">Inicia sesión</h5>
                                    <hr className="divide" />
                                    {this.state.error ? (
                                        <div className="alert alert-danger round text-center">
                                            Nombre de usuario o contraseña incorrecta
                                        </div>
                                    ) : <></>}
                                    <form onSubmit={this.handleSubmit}>
                                        <TextInput
                                            name="username"
                                            onChange={this.handleChange}
                                            onKeyDown={this.handleKeyDown}
                                            error={this.state.errors.username}
                                            errorMsg="Ingresa un nombre de usaurio válido"
                                        />
                                        <TextInput
                                            name="password"
                                            onChange={this.handleChange}
                                            error={this.state.errors.password}
                                            errorMsg="Ingresa una contraseña"
                                        />
                                        <SubmitButton text="Iniciar sesión" loading={this.state.loading} />
                                    </form>
                                    <hr />
                                    <div className="text-center">
                                        <small>
                                            <Link to="/">Olvidé mi contraseña</Link>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </Layout>
        );
    };
}