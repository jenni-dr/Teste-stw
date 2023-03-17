import React, { useEffect, useState } from 'react';

type AccordionType = {
    children: React.ReactNode | React.ReactNode[],
    title: string,
    onChange?: (isOpened: boolean) => void,
    onColor?: boolean
}
export const Accordion: React.FC<AccordionType> = ({ children, title, onChange = () => { }, onColor }) => {
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        onChange(isOpened);
    }, [isOpened])

    return (
        <div className={"m-accordion" + (onColor ? ' oncolor' : '')}>
            <div className="d-flex noselect flex-fill justify-content-between align-items-center"
                onClick={() => setIsOpened(!isOpened)}>
                <div className="m-heading x-small">{title}</div>
                <div className={"m-btn-icon" + (isOpened ? ' open' : '')}>
                    <i className="material-icons">add</i>
                </div>
            </div>
            {/* {isOpened && */}
            <div ref={node => {
                if (node) {
                    const child = node.childNodes[0]; //DIV
                    if (!isOpened) {
                        node.style.height = '0';
                    } else {
                        node.style.height = (child as HTMLElement).offsetHeight + "px";
                    }
                }
            }} className={"content"}>
                <div>
                    {Array.isArray(children) ?
                        <>
                            {children.map((child, index) =>
                                <React.Fragment key={`accordion-child-${index}`}>{child}</React.Fragment>
                            )}
                        </>
                        :
                        <>
                            {children && children}
                        </>
                    }
                </div>
            </div>
            {/* } */}
        </div>
    )
}