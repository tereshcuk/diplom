import { createSelector } from 'reselect'; // npm install reselect
import type { Filter, Service} from '../types'

interface RootState {
    // serviceForm: FormState;
    // serviceError: Errors;
    serviceFilter: Filter;
    serviceList: Service[];
}


// Селектор для фильтрации услуг
export const selectFilteredServices = createSelector(
    [(state: RootState)  => state.serviceList, (state: RootState) => state.serviceFilter.searchTerm],
    (services, searchTerm) => {
        // if (!searchTerm.trim()) {
        if (typeof searchTerm !== 'string' || !searchTerm.trim()) {
            return services;
        }
        return services.filter(service =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
);

// Селектор для статистики
export const selectFilterStats = createSelector(
    [selectFilteredServices, (state: RootState) => state.serviceList],
    (filteredServices, allServices) => ({
        found: filteredServices.length,
        total: allServices.length
    })
);
