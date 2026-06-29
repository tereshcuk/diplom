import type { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, clearSearhc } from '../actions/actionCreators';
import type { RootState } from '../types'


const SearchFilter = () => {

    const dispatch = useDispatch();   
    const filterSelector = useSelector((state: RootState) => state.filter);
            

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {        
        dispatch(setSearchTerm(e.target.value));        
    };

    const handleClear = () => {
        dispatch(clearSearhc());
        
    };

    return (      

        <div>        

            <div className="relative mb-6">
                <input                    
                    type="text"
                    placeholder="Поиск услуг..."
                    value={filterSelector.searchTerm}
                    onChange={handleChange}                    
                />                
                    🔍               
                {
                 filterSelector.searchTerm && 
                (
                    <button onClick={handleClear}>
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchFilter;
