import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

export type TabsRef = {
    setCurrentTab: (index: number) => void
}

type TabsType = {
    tabs: Array<string>,
    onChangeTab?: (tabIndex: number) => void,
    children: React.ReactNode[],
    oncolor?: boolean,
    fading?: boolean
}
export const Tabs = forwardRef<TabsRef, TabsType>(({ tabs, children, oncolor, fading = false, onChangeTab = () => { } }, ref) => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        onChangeTab(active);
    }, [active])

    useImperativeHandle(ref, () => ({
        setCurrentTab(index) {
            setActive(index)
        },
    }))

    function tabClasses(index: number) {
        let classes = "";
        classes += active === index ? ' active' : '';
        classes += oncolor ? ' oncolor' : '';
        return classes
    }

    return (
        <div className="m-tabs" >
            <div className="d-flex" style={{position:'absolute', marginTop:'-80px'}}>
                {tabs?.map((tab, index) =>
                    <div  key={`tab-${tab}`} className={"m-tab noselect" + tabClasses(index)}
                        onClick={() => setActive(index)}>{tab}</div>
                )}
            </div>
            <div>
                {children?.length && children.map((child, index) =>
                    <>
                        {fading ?
                            <div className="fadeIn" key={`tab-${index}-${tabs[index]}`} style={{ display: index === active ? 'block' : 'none' }}>{child}</div>
                            :
                            <div className="fadeIn" key={`tab-${index}-${tabs[index]}`}>{index === active && child}</div>
                        }
                    </>
                )}
            </div>
        </div>
    )
})