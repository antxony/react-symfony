import React from 'react';

interface ButtonDeletePropsI<PT> {
    id: PT;
    onClick: (id: PT) => void;
}

export default class ButtonDelete<T> extends React.Component<ButtonDeletePropsI<T>, {}> {
    constructor (props: ButtonDeletePropsI<T>) {
        super(props);
    }

    handleClick = () => {
        this.props.onClick(this.props.id);
    };

    render = (): JSX.Element => {
        return (
            <button
                type="button"
                className="btn btn-sm btn-outline-dark border-0 w-100 round"
                onClick={this.handleClick}
            >
                <i className="fas fa-trash-alt"></i>
            </button>
        );
    };
}