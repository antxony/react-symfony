import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function ThSort(props: React.PropsWithChildren<{
    onClick?: (name: string) => void;
    name: string;
    activeOrder?: boolean;
    order?: "ASC" | "DESC";
    style?: any;
    [ key: string ]: any;
}>) {
    return (
        <th
            style={props.style}
            className={"cursor-pointer" + (props.clasName ? ` ${props.clasName}` : "")}
            onClick={() => {
                props.onClick && props.onClick(props.name);
            }}
        >
            {props.children || props.name}
            {
                props.activeOrder
                    ? props.order! === "ASC"
                        ? <SortUpIcon />
                        : <SortDownIcon />
                    : <SortIcon />
            }
        </th>
    );
}

function SortIcon() {
    return (
        <span className="float-right">
            <FontAwesomeIcon icon={faSort} />
        </span>
    );
}

function SortUpIcon() {
    return (
        <span className="float-right">
            <FontAwesomeIcon icon={faSortUp} />
        </span>
    );
}

function SortDownIcon() {
    return (
        <span className="float-right">
            <FontAwesomeIcon icon={faSortDown} />
        </span>
    );
}