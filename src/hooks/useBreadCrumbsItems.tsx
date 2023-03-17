import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Route {
    route: string, name: string
}

export const useBreadCrumbsItems = () => {
    const ROUTE_NAMES: Array<Route> = [
        { route: 'dashboard', name: 'Dashboard' },
        { route: 'blockchain', name: 'blockchain' },
        { route: 'documentos', name: 'Documentos' },
        { route: 'notas-fiscais', name: 'Notas Fiscais' },
        { route: 'ocorrencias', name: 'Ocorrências' },
    ];
    const { pathname } = useLocation();

    const [ROUTES, setROUTES] = useState<Route[]>([]);

    useEffect(() => {
        const ROUTES_RAW = pathname.split('/').filter(item => item);
        const ROUTES = ROUTES_RAW.map(routeRaw => {
            const ROUTE_FOUND = ROUTE_NAMES.find(r => r.route === routeRaw);
            return ROUTE_FOUND ? ROUTE_FOUND : { route: routeRaw, name: routeRaw }
        });
        setROUTES(ROUTES);
    }, [pathname])


    return [{ route: '/', name: 'Home' }, ...ROUTES]
}