
// import { useDispatch } from 'react-redux';


const FilterStats = () => {

    // const dispatch = useDispatch();
    // const filterSelector = useSelector((state: RootState) => state.serviceFilter);
    return (

        <p className="text-sm text-gray-600 mb-4">
            {/* Найдено: <strong>{filteredServices.length}</strong> из <strong>{entities.length}</strong> услуг. */}
            Найдено: <strong>{}</strong> из <strong>{}</strong> услуг.
        </p>
    );
};

export default FilterStats;
