import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

type ConfirmDialogType = {
    title?: string,
    text?: string,
    resolve: (value: any) => void,
    reject: (reason: any) => void,
    unmount: () => void,
}

export const ConfirmDialogResponse = {
    SUCCESS: 'SUCCESS',
    REJECT: 'REJECT',
}

const ConfirmDialogComponent: React.FC<ConfirmDialogType> = ({ title = "Confirmar ação", text = "Deseja confirmar essa ação?", resolve, reject, unmount }) => {

    function removeDialogFromDOM() {
        const div = document.querySelector("#confirm-dialog-container");
        const body = document.querySelector("body");
        if (!body) return
        if (!div) return
        unmount()
        body.removeChild(div);
    }

    function confirmar() {
        resolve(ConfirmDialogResponse.SUCCESS);
        removeDialogFromDOM();
    }

    function cancelar() {
        reject(ConfirmDialogResponse.REJECT);
        removeDialogFromDOM();
    }


    return (
        <div className="obscurator d-flex align-items-center justify-content-center">
            <div className={"modal confirm-dialog fadeIn"}>
                <header>
                    <div className="m-subtitle small">{title}</div>
                </header>
                <div className="content">
                    {text}
                </div>
                <footer>
                    <div className='d-flex justify-content-between'>
                        <div className='m-btn' onClick={() => cancelar()}>
                            Cancelar
                        </div>
                        <div className='m-btn primary' onClick={() => confirmar()}>
                            Confirmar
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export class ConfirmDialogService {
    static show(title?: string, text?: string) {
        return new Promise((resolve, reject) => {
            const body = document.querySelector("body");
            const div = document.createElement("div");
            div.setAttribute("id", "confirm-dialog-container");
            if (!body) return
            body.appendChild(div);

            const confirmDialogRoot = createRoot(div);

            confirmDialogRoot.render(
                <ConfirmDialogComponent title={title} text={text}
                    resolve={resolve} reject={reject} unmount={() => confirmDialogRoot.unmount()} />,
            );
        });
    }
}