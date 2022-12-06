import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState({ height: "170", weight: "75", bmi: "null" })

  function handleChange(event) {
    let newData = {...data, [event.target.name]: event.target.value}
    setData(newData)
  }

  return (
    <div className="App">
      <div className="container">

        <div className="columnOne">
          <h4> Column 1</h4>
          <div className="Base Measurements">
            <h1>Base Measurements</h1>
            <form>
              <label>
                Height:
                <input type="text" name="height" value={data.height} onChange={handleChange}/>
              </label>
              <label>
                Weight:
                <input type="text" name="weight" value={data.weight} onChange={handleChange}/>
              </label>
              {/* <input type="submit" value="Submit" /> */}
            </form>
          </div>
        </div>

        {/* <div className="columnTwo">
          <h1> Column 2</h1>
        </div>

        <div className="columnThree">
          <h1> Column 3</h1>
        </div> */}
        
      </div>

      <div className="dataView">
        {JSON.stringify(data)}
      </div>
    </div>
  )
}

export default App
