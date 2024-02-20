import React from 'react'

function CountryOptions() {
    
  return (
    <div>
        <select id="countrySelect" required>
            <option value="">-Select-</option>
            <option value="AF">Afghanistan</option>
            <option value="AL">Albania</option>
        </select>
    </div>
  )
}

export default CountryOptions