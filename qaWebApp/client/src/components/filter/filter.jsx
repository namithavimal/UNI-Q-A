import "./filter.scss";

const Filter = ({ options, selectedOption, onChange }) => {
  return (
    <div className="container">
      <div className="filterContainer">
            <label htmlFor="filter" className="filterLabel">
              Filter By Category  
            </label>
            <select
              value={selectedOption}
              onChange={(e) => onChange(e.target.value)}
              className="filterSelect"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
    </div>
  )
}

export default Filter