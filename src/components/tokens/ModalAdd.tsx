import React from 'react';
import ReactDOM from 'react-dom';

type ModalType = {
    title?: string,
    children: React.ReactNode | React.ReactNode[],
    className?: string,
    onClose: () => void
}

export const ModalAdd: React.FC<ModalType> = ({ title, children, onClose = () => { }, className = "" }) => {
    return ReactDOM.createPortal(
        <div className="obscurators d-flex align-items-center justify-content-center">
            <div className={"modalAdd fadeIn" + (className.length ? ` ${className}` : '')}>
                <header>
                    <div className="m-subtitle small">{title}</div>
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