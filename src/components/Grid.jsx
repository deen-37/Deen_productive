import { useState, useEffect } from 'react'
import { productivityProgram as productivity_plan } from '../utilities/index.js'
import ProductivityCard from './ProductivityCard.jsx'
export default function Grid() {
    const [savedProductivity, setSavedProductivity] = useState(null)
    const [selectedProductivity, setSelectedProductivity] = useState(null)
    // const [completedProductivity] = Object.keys(savedProductivity || {}).filter((val) => {
    //     const entry = savedProductivity[val]
    //     return entry.isComplete
    // })
    const completedProductivity = Object.keys(savedProductivity || {}).filter((key) => {
        const entry = (savedProductivity || {})[key];
        return !!entry?.isComplete;
    });

    function handleSave(index, data) {
        //save to local storage and modify the saved productivity state
        const newObj = {
            ...savedProductivity,
            [index]: {
                ...data,
                isComplete: !!data.isComplete || !!savedProductivity?.[index]?.isComplete

            }
        }
        setSavedProductivity(newObj)
        localStorage.setItem('deen_productive', JSON.stringify(newObj))
        setSelectedProductivity(null)
    }


    function handleComplete(index, data) {
        //complete a work ( modify the completed status)
        const newObj = { ...data }
        newObj.isComplete = true
        handleSave(index, newObj)
    }
    useEffect(() => {
        if (!localStorage) { return }
        let savedData = {}
        if (localStorage.getItem('deen_productive')) {
            savedData = JSON.parse(localStorage.getItem('deen_productive'))
        }
        setSavedProductivity(savedData)

    }, [])
    return (
        <div className="productivity-grid-plan" >
            {Object.keys(productivity_plan).map((productivity, productivityIndex) => {
                const isLocked = productivityIndex === 0
                    ? false
                    : !((completedProductivity || []).includes(String(productivityIndex - 1)));
                // const isLocked = productivityIndex === 0 ?
                //     false :
                //     !completedProductivity.includes(`${productivityIndex - 1}`)
                console.log(productivityIndex, isLocked)
                const type = productivityIndex % 3 == 0 ?
                    'Focus' :
                    productivityIndex % 3 == 1 ?
                        'Connect' :
                        'Organize'

                const productivityPlan = productivity_plan[productivityIndex]
                const dayNum = ((productivityIndex / 8) <= 1) ? '0' + (productivityIndex
                    + 1) : productivityIndex + 1
                const icon = productivityIndex % 3 == 0 ? (
                    <i className='fa-solid fa-comments'></i>
                ) : (
                    productivityIndex % 3 == 1 ? (
                        <i className='fa-solid fa-bullseye'></i>
                    ) : (
                        <i className='fa-solid fa-screwdriver-wrench'></i>
                    )
                )

                if (productivityIndex === selectedProductivity) {
                    return (
                        <ProductivityCard savedIntensity={savedProductivity?.[productivityIndex]?.intensities}
                            handleSave={handleSave} handleComplete={handleComplete} key={productivityIndex} productivityPlan={productivityPlan}
                            type={type} productivityIndex={productivityIndex} icon={icon} dayNum={dayNum} />
                    )
                }

                return (
                    <button onClick={() => {
                        if (isLocked) return
                        setSelectedProductivity(productivityIndex)
                    }} className={'box plan-box ' + (isLocked ? 'inactive' : '')} key={productivityIndex}>
                        <div className='plan-box-header'>
                            <p>Day {dayNum}</p>
                        </div>
                        {isLocked ? (
                            <i className='fa-solid fa-lock'></i>
                        ) : (icon)}
                        <div className='plan-box-header'>
                            <h4><b>{type}</b></h4>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}