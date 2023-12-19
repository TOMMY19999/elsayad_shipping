'use client'
import { Provider } from 'react-redux';
import store from '../../components/store';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';


const WorkerRoot =({children})=>{


return(
    <Provider store={store}>
    {children}
    </Provider>
)
};
export default WorkerRoot ;