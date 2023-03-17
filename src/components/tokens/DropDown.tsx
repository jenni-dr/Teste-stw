import React, { useEffect, useRef, useState } from 'react';
import { createPopper, Instance } from '@popperjs/core';

type DropDownType = {
    children: React.ReactNode | Array<React.ReactNode>,
    icon?: string,
    label?: string
}

export const DropDown: React.FC<DropDownType> = ({ children, icon = "more_vert", label }) => {
    const [popper, setPopper] = useState<null | Instance>(null);
    const [show, setShow] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (buttonRef.current && menuRef.current) {
            const popperInstance = createPopper(buttonRef.current, menuRef.current, {
                placement: 'bottom-end'
            });
            setPopper(popperInstance);
        }
    }, [buttonRef.current, menuRef.current])

    useEffect(() => {
        if (popper) {
            function showMenu() {
                menuRef.current?.setAttribute('data-show', '');
                popper?.update();
            }

            function hide() {
                menuRef.current?.removeAttribute('data-show');
            }

            function clickTarget(event: Event) {
                const target = event.target as Node;
                let isClickInside = buttonRef.current?.contains(target);
                setShow(!!isClickInside);
            }

            show ? showMenu() : hide();

            document.addEventListener('click', clickTarget);
            return () => document.removeEventListener('click', clickTarget);
        }
    }, [popper, show])

    return (
        <>
            <div className="demanda-options">
                {label ?
                    <div className="m-btn borders" ref={node => {
                        if (node) {
                            buttonRef.current = node;
                        }
                    }}>
                        {label}
                    </div>
                    :
                    <div className="m-btn-icon" ref={node => {
                        if (node) {
                            buttonRef.current = node;
                        }
                    }}>
                        <i className="material-icons">{icon}</i>
                    </div>
                }
                <div ref={node => {
                    if (node) {
                        menuRef.current = node;
                    }
                }} className="m-dropdown" role="tooltip">
                    {Array.isArray(children) && children.map((child, index) =>
                        <React.Fragment key={`dropdown-child-${index}`}>{child}</React.Fragment>
                    )}
                    {!Array.isArray(children) &&
                        <>{children}</>
                    }
                </div>
            </div>
        </>
    )
}