import React from 'react';

type StepMenuType = {
    steps: Array<String>,
    current?: number
}

export const StepMenu: React.FC<StepMenuType> = ({ steps = [], current = 0 }) => {
    return (
        <div className="step-menu d-flex">
            {steps.map((step, index) =>
                <div key={`step-${step}-${index}`} className="d-flex align-items-center">
                    {index > 0 &&
                        <div className="separator"></div>
                    }
                    <div className={"step" + (current === index ? ' active' : current > index ? ' done' : '')}>
                        {current > index ?
                            <i className="material-icons">done</i>
                            :
                            <span>{current === index ? step : (index + 1)}</span>
                        }
                    </div>
                </div>
            )}
        </div>
    )
}