import React, { useState, useEffect } from 'react'
import { openSession } from '../QlikConnection/enigmaApp'
import Chart from '../Charts/Chart'


const QlikObject = ({children}) => {

    const [model, setModel] = useState([])
    const objectId = 'MEAjCJ'

    useEffect(() => {
        const init = async () => {
            const qDoc = await openSession()
            const qObject = await qDoc.getObject(objectId)
            const properties = await qObject.getProperties()
            const newModel = await qDoc.createSessionObject(properties)
            const layout = await newModel.getLayout()
     
            const { qMatrix } = layout.qHyperCube.qDataPages[0]
            const data = qMatrix.map(([food, amount]) => ({dimension: food.qText, measure: amount.qNum}))

            setModel(data)
            console.log(data)
        }
        init()
    }, [])

    return model ?
        <div>
           <Chart data={model} />
        </div>
        : null
}

export default QlikObject;


 