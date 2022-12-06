import { useState } from 'react'
import './App.css'
import {calculateBmi, calcPFPercentagePredicted, calcPFReversibility, calcPFVariability} from "./utils/calculators.js"

function fieldCalculations(data){
  let bmi = calculateBmi(data.height, data.weight)
  let pefr_variability = calcPFVariability( data.lowest_home_pefr, data.highest_home_pefr )
  let pefr_reversibility = calcPFReversibility( data.pefr_post, data.current_pefr )
  let pefr_predictability = calcPFPercentagePredicted( data.current_pefr, data.highest_home_pefr, data.predicted_pefr )

  return {...data, bmi, pefr_variability, pefr_reversibility, pefr_predictability}
}

function App() {
  const [data, setData] = useState({ height: 170, weight: 75, bmi: 26.0 , predicted_pefr: "504", highest_home_pefr: "", lowest_home_pefr: "", current_pefr: "", pefr_post: "", peak_flow_meter: null, highest_action_plan: null, pefr_variability: null, pefr_percentage_predicted: null, pefr_reversibility: null})

  function handleChange(event) {
    let newData = {...data, [event.target.name]: event.target.value}
    let updatedCalculations = fieldCalculations(newData)
    setData({...updatedCalculations})
  }

  return (
    <div className="App">
      <div className="container">

        <div className="columnOne">
          <h5> Column 1</h5>

          <div className="BaseMeasurements">
            <h3>Base Measurements</h3>
            <form className="form">
              <label>
                Height:
                <input type="number" name="height" value={data.height} onChange={handleChange} required/>
              </label>
              <label>
                Weight:
                <input type="number" name="weight" value={data.weight} onChange={handleChange} required/>
              </label>
              <label>
                BMI:
                <input type="number" name="bmi" value={data.bmi} onChange={handleChange}/>
              </label>
            </form>
          </div>

          <div className="History">
            <h4>History</h4>
          </div>

          <div className="Triggers">
            <h4>Triggers</h4>
          </div>

        </div>

        <div className="columnTwo">
          <h5> Column 2</h5>
          <form className="peakFlow">
            <h4>Peak Flow</h4>
              <label>
                Predicted:
                <input type="number" name="predicted_pefr" value={data.predicted_pefr} onChange={handleChange} readOnly/>
              </label>
              <label>
                Highest:
                <input type="number" name="highest_home_pefr" value={data.highest_home_pefr} onChange={handleChange} />
              </label>
              <label>
                Lowest:
                <input type="number" name="lowest_home_pefr" value={data.lowest_home_pefr} onChange={handleChange} />
              </label>
              <label>
                Current:
                <input type="number" name="current_pefr" value={data.current_pefr} onChange={handleChange} />
              </label>
              <label>
                Post Bronchodilator:
                <input type="number" name="pefr_post" value={data.pefr_post} onChange={handleChange} />
              </label>
          </form>

          <div>
            {`% Variability, ${data.pefr_variability} % Predicted, ${data.pefr_predictability} % Reversibility, ${data.pefr_reversibility}`}
          </div>
        </div>

        {/* <div className="columnThree">
          <h5> Column 3</h5>
        </div> */}
        
      </div>

      <div className="dataView">
        {JSON.stringify(data)}
      </div>
    </div>
  )
}

export default App
