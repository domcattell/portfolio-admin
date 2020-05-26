import {useState} from 'react';

const useToggle = (init) =>  {
    const [state, setState] = useState(init);
    const toggle = () => {
        setState(!state);
    };
    return [state, toggle];
};

export default useToggle;