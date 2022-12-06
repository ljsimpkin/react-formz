import { useState } from 'react'
import './App.css'

function calculateBmi(height, weight) {
  return (weight / Math.pow( (height/100), 2 )).toFixed(1)
}

// Predictability
// export function calcPFPredicted ( height, age, gender ) {
//   /*
//   Source URL: http://reference.medscape.com/calculator/peak-expiratory-flow
//   PEFFemale = e((0.376*ln(Age))-(0.012*Age)-(58.8/Height)+5.63)
//   PEFMale = e((0.544*ln(Age))-(0.0151*Age)-(74.7/Height)+5.48)
//   */
//  console.log('calcPFPredicted', height, age, gender)
//   if (!height || !age || !gender) return
//   const MALE = 1
//   const CHILD_CUTOFF_AGE = 15

//   let pefr = null
//   if ((height > 0) && (age > 0)) {
//     if (age >= CHILD_CUTOFF_AGE) {
//       if ((gender === MALE) || (gender === "M")) {
//         pefr = Math.exp(((0.544 * Math.log(age)) - (0.0151 * age) - (74.7 / height)) + 5.48)
//       } else {
//         pefr = Math.exp(((0.376 * Math.log(age)) - (0.0120 * age) - (58.8 / height)) + 5.63)
//       }
//     } else {
//       // Child - Equation formed from the figures we have by Prof Taylor.
//       if (height > 90) {
//         pefr = (5.2598 * height) - 427.56
//       } else {
//         pefr = 'n/a'
//       }
//     }
//     // FIXME: I have no idea why this formatting code is here; presume it should be removed
//     if (height > 90) {
//       pefr = pefr.toFixed()
//     } else {
//       pefr
//     }
//   }
//   return pefr
// }

function calcPFPercentagePredicted( current_pefr, highest_home_pefr, predicted_pefr ) {
  let pefr_percentage_predicted = null
  const pefr = parseFloat(current_pefr);
  const home_pefr = parseFloat(highest_home_pefr);
  // Caro&Laura want always use current_pefr to calculation pefr_percentage_predicted
  // pefr = home_pefr if isNaN(pefr) || home_pefr > pefr      
  const pred = parseFloat(predicted_pefr);
  if ((pefr > 0) && (pred > 0)) {
    pefr_percentage_predicted = Math.round((pefr / pred) * 100);        
  }
  return pefr_percentage_predicted;
}

// PEFR Variability %
function calcPFVariability( lowest_home_pefr, highest_home_pefr ) {
  let pefr_variability = null
  const low = parseFloat(lowest_home_pefr);
  const high = parseFloat(highest_home_pefr);
  if ((high > 0) && (low > 0)) {
    const average = (high + low) / 2;
    const remainder = high - low;
    pefr_variability = Math.round((remainder / average) * 100);
  }
  return pefr_variability;
}

// PEFR Reversibility %
function calcPFReversibility( post_bronchodilator, current_pefr ) {
  let pefr_reversibility = null
  const post = parseFloat(post_bronchodilator);
  const current = parseFloat(current_pefr);
  if ((post > 0) && (current > 0)) {
    pefr_reversibility = Math.round(((post - current) *100) / current);
  }
  return pefr_reversibility;
}

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
