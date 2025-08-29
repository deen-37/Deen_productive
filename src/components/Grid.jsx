import { productivityProgram as productivity_plan } from '../utilities/index.js'
import ProductivityCard from './ProductivityCard.jsx'
export default function Grid() {
    const isLocked = true
    const selectedProductivity = 0
    return (
        <div className="productivity-grid-plan" >
            {Object.keys(productivity_plan).map((productivity, productivityIndex) => {
                const type = productivityIndex % 3 == 0 ?
                    'Push' :
                    productivityIndex % 3 === 1 ?
                        'Pull' :
                        'Legs'

                const productivityPlan = productivity_plan[productivityIndex]

                if (productivityIndex == selectedProductivity) {
                    return (
                        <roductivityCard key={productivityIndex} />
                    )
                }

                return (
                    <button className={'box plan-box ' + (isLocked ? 'inactive' : '')} key={productivityIndex}>
                        <div className='plan-box-header'>
                            <p>Day {((productivityIndex / 8) <= 1) ? '0' + (productivityIndex
                                + 1) : productivityIndex + 1}
                            </p>
                        </div>
                        {isLocked ? (
                            <i className='fa-solid fa-lock'></i>
                        ) : (
                            productivityIndex % 3 == 0 ? (
                                <i clasName='fa-solid fa-dumbbell'></i>
                            ) : (
                                productivityIndex % 3 == 1 ? (
                                    <i className='fa-solid fa-weight hanging'></i>
                                ) : (
                                    <i className='fa-solid fa-bolt'></i>
                                )
                            )
                        )}
                        <div className='plan-box-header'>
                            <h4><b>{type}</b></h4>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}