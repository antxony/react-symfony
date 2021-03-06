import React from 'react';
import { LogMethods } from '.';

interface MethodPropsI {
    method: LogMethods;
    no100?: boolean;
}

export default function Method(props: React.PropsWithChildren<MethodPropsI>): JSX.Element {
    return (
        <span className={
            "badge round "
            + (props.no100 ? "" : " w-100 ")
            + (() => {
                switch (props.method) {
                    case LogMethods.GET: return "badge-success";
                    case LogMethods.POST: return "badge-primary";
                    case LogMethods.PUT:
                    case LogMethods.PATCH: return "badge-warning";
                    case LogMethods.DELETE: return "badge-danger";
                    default: return "badge-light";
                }
            })()
        }>
            {props.method || props.children}
        </span>
    );
}