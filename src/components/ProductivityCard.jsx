import React, { useState } from "react"
import Modal from "./Modal"
import { taskDescriptions } from "../utilities"
export default function ProductivityCard(props) {
    const { productivityPlan, productivityIndex, type, dayNum, icon, savedIntensity, handleSave, handleComplete } = props

    const { morning, afternoon } = productivityPlan || {}
    const [showTaskDescription, setShowTaskDescription] = useState(null)
    const [intensities, setIntensities] = useState(savedIntensity || {})
    //const showTaskDescription = { name: 'asasd', description: 'asasd' }

    function handleAddIntensity(title, intensity) {
        const newObj = {
            ...intensities,
            [title]: intensity
        }
        setIntensities(newObj)
    }
    return (
        <div className="productivity-container">
            {showTaskDescription && (<Modal showTaskDescription={showTaskDescription}
                handleCloseModal={() => { setShowTaskDescription(null) }} />)}
            <div className="productivity-box">
                <div className="plan-box-header">
                    <p>Day {dayNum}</p>
                    {icon}
                </div>
                <div className="plan-box-header">
                    <h2><b>{type} Productivity</b></h2>
                </div>
            </div>
            <div className="productivity-grid">
                <div className="task-name">
                    <h4> Morning</h4>
                </div>
                <h6>Rounds</h6>
                <h6>Duration</h6>
                <h6 className="intensity-input">Intensity</h6>
                {morning.map((morningTask, morningIndex) => {
                    return (
                        <React.Fragment key={morningIndex}>
                            <div className="task-name">
                                <p>{morningIndex + 1}.{morningTask.name}</p>
                                <button onClick={() => (
                                    setShowTaskDescription({
                                        name: morningTask.name,
                                        description: taskDescriptions[morningTask.name]
                                    })
                                )} className="help-icon">
                                    <i className="fa-regular fa-circle-question" />
                                </button>
                            </div>
                            <p className="task-info">{morningTask.rounds}</p>
                            <p className=" task-info">{morningTask.duration}</p>
                            <input value={intensities[morningTask.name] || ''}
                                onChange={(e) => {
                                    handleAddIntensity(morningTask.name, e.target.value)
                                }}
                                className="intensity-input" placeholder="N/A" disabled />
                        </React.Fragment>
                    )
                })}
            </div>

            <div className="productivity-grid">
                <div className="task-name">
                    <h4>Afternoon</h4>
                </div>
                <h6>Rounds</h6>
                <h6>Duration</h6>
                <h6 className="intensity-input">Intensity</h6>
                {afternoon.map((afternoonTask, afternoonIndex) => {
                    return (
                        <React.Fragment key={afternoonIndex}>
                            <div className="task-name">
                                <p>{afternoonIndex + 1}.{afternoonTask.name}</p>
                                <button className="help-icon">
                                    <i className="fa-regular fa-circle-question" />
                                </button>
                            </div>
                            <p className="task-info">{afternoonTask.rounds}</p>
                            <p className="task-info">{afternoonTask.duration}</p>
                            <input
                                value={intensities[afternoonTask.name] || ''}
                                onChange={(e) => {
                                    handleAddIntensity(afternoonTask.name, e.target.value)
                                }}
                                className="intensity-input" placeholder="14" />
                        </React.Fragment>
                    )
                })}
            </div>


            <div className="productivity-button"></div>
            <button onClick={() => {
                handleSave(productivityIndex, { intensities })
            }}>Save and Exit</button>
            <button onClick={() => {
                handleComplete(productivityIndex, { intensities })
            }} disabled={Object.keys(intensities).length != afternoon.length}>Complete</button>
        </div>
    )
}