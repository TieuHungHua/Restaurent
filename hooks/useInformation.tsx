import { useContext } from 'react';
import { InformationContext } from './InformationContext';

export const useInformation = () => {
    const context = useContext(InformationContext);
    if (!context) {
        throw new Error("useInformation must be used within an InformationProvider");
    }
    return context;
};
