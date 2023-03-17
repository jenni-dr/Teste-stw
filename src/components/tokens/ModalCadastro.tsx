import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

type ModalType = {
    title?: string,
    children: React.ReactNode | React.ReactNode[],
    className?: string,
    onClose: () => void
}

export const ModalCadastro: React.FC<ModalType> = ({ title, children, onClose = () => { }, className = "" }) => {

    useEffect(() => {
        const body = document.body;
        body.style.overflowY = "hidden";
        return () => {
            body.style.overflowY = "auto";
        }

    }, [])

    return ReactDOM.createPortal(
        <div className="obscurator d-flex align-items-center justify-content-center">
            <div className={"modalCadastro  fadeIn" + (className.length ? ` ${className}` : '')}>
                <header>
                    <div className="m-heading x-small pl-3">{title}</div>
                    <div className="m-btn-icon" onClick={() => onClose()}>
                        <i className="material-icons">close</i>
                    </div>
                </header>
                <div className="content">
                    {Array.isArray(children) ? children[0] : children}
                </div>
                {Array.isArray(children) && children[1] &&
                    <footer>
                        {children[1]}
                    </footer>
                }
            </div>
        </div>
        , document.body)
}