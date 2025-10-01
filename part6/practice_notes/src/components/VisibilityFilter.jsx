import { useContext } from 'react'
import FilterContext from '../FilterContext'

const VisibilityFilter = () => {
  const [filter, dispatch] = useContext(FilterContext)

  return <div>
    all<input
      type="radio"
      name="filter"
      onChange={() => dispatch({ type: 'SET_FILTER', payload:'ALL'})} />
    important<input
      type="radio"
      name="filter"
      onChange={() => dispatch({ type: 'SET_FILTER',  payload:'IMPORTANT' })} />
    nonimportant<input
      type="radio"
      name="filter"
      onChange={() => dispatch({ type: 'SET_FILTER', payload:'NONIMPORTANT' })} />
  </div>
}

export default VisibilityFilter
