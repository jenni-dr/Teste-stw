import React from 'react';
import ReactDOM from 'react-dom';

type ModalType = {
    title?: string,
    children: React.ReactNode | React.ReactNode[],
    className?: string,
    onClose: () => void
}

export const ModalAdicionar: React.FC<ModalType> = ({ title, children, onClose = () => { }, className = "" }) => {
    return ReactDOM.createPortal(
        <div className="obscurator2 d-flex align-items-center justify-content-center">
            <div className={"modal-adicionar fadeIn" + (className.length ? ` ${className}` : '')}>
                <header>
                    <div className="m-subtitle small">{title}</div>
                    <div className="m-btn-icon" onClick={() => onClose()}>
                        <i className="material-icons">close</i>
                    </div>
                </header>
                <div className="content1">
                {children}
            </div>
                
            </div>
        </div>
        , document.body)
}