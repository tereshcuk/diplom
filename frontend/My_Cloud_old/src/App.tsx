import ServiceList from './components/ServiceList';
import ServiceForm from './components/ServiceForm';
import SearchFilter from './components/SearchFilter';
import FilterStats from './components/FilterStats';

import './App.css';

function App() {
  return (
    <div>
      <h1>Управление услугами</h1>      
      <ServiceForm />
      <SearchFilter /> 
      <FilterStats/>     
      <ServiceList />      
    </div>
  )
}

export default App