
import { useSelector, useDispatch } from 'react-redux';
import {
    deleteService,
    startEditing,
    clearForm,
} from '../actions/actionCreators';
// ... импорт типов
import type { FormState, Service, RootState } from '../types';
// import { selectFilteredServices } from '../reducers/SelectorFilter';

// interface RootStateForm {
//     serviceForm: FormState;
// }

// interface RootState {
//     serviceList: Service[];
// }


const ServiceList = () => {
    const dispatch = useDispatch();
    const services = useSelector((state: RootState) => state.services.items);
    // const services = useSelector(selectFilteredServices);  // Здесь не работает  ????
    const formSelector = useSelector((state: RootState) => state.form);
    

    const handleEdit = (service: Service) => {
        dispatch(startEditing(service));
    };

    const handleDelete = (id: string) => {
        dispatch(deleteService(id));

        // Если удаляем редактируемую услугу - очищаем форму.        
        if (formSelector.editingId === id) {
            dispatch(clearForm());
        }
    };

    return (
        <>
            <h3>Список услуг ({services.length})</h3>            
            <ul>
                {services.map((service) => (
                    <li key={service.id}>

                        {service.name} - {service.price} ₽

                        {/* Кнопка "Редактировать" */}
                        <button onClick={() => handleEdit(service)}>
                            ✎
                        </button>

                        {/* Кнопка "Удалить" */}
                        <button onClick={() => handleDelete(service.id)}>
                             ✕
                        </button>

                    </li>
                ))}
            </ul>
        </>
    );
};

export default ServiceList;