function calculateBmi(height, weight) {
    return (weight / Math.pow( (height/100), 2 )).toFixed(1)
  }

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

export { calculateBmi, calcPFPercentagePredicted, calcPFVariability, calcPFReversibility };