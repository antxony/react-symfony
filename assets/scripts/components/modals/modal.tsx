import React from 'react';
import ButtonClose from '../buttons/buttonClose';
import LoaderH from '@components/loader/loaderH';
import Button from '../buttons/button';

interface ModalPropsI {
    show: boolean;
    size?: number;
    onClose: () => void;
    title?: string;
    loading: boolean;
}

export default class Modal extends React.Component<ModalPropsI, {}> {

    private size: number;

    constructor (props: ModalPropsI) {
        super(props);
        this.size = this.props.size || 50;
    }

    render = (): JSX.Element => {
        return (
            <div
                className={"modal-component" + (this.props.show ? " show" : "")}
            >
                <div
                    className="modal-component-content"
                    style={{
                        width: `${this.size}%`,
                    }}
                >
                    <div className="w-100 h-100 pt-2">
                        <h5 className="text-center">
                            {this.props.title}
                            <ButtonClose 
                            onClick={this.props.onClose} 
                            float="right" 
                            extraClass="hide-on-mobile"
                            />
                        </h5>
                        {this.props.title && <hr />}
                        <div className="modal-component-body">
                            {(this.props.loading && (
                                <LoaderH position="center" />
                            )) || (
                                    <>
                                        {this.props.children}
                                    </>
                                )}
                        </div>
                        <Button
                            color="danger"
                            content="Cerrar"
                            extraClass="w-100 mt-2 hide-on-desktop"
                            onClick={this.props.onClose}
                        />
                    </div>
                </div>
            </div>

        );
    };
}