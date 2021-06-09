import { useCallback, useContext, useEffect, useRef } from 'react';
import { StoreContext } from './helper/Store';

const ColumnOptions = ({ columnId }) => {
    const container = useRef();

    const { setShowDropDown, deleteColumn } = useContext(StoreContext);

    const handleClick = useCallback(
        (e) => {
            if (container.current && !container.current.contains(e.target)) {
                setShowDropDown(false);
            }
        },
        [setShowDropDown]
    );

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [handleClick]);
    return (
        <ul className="options" ref={container}>
            <p>actions</p>
            <li>
                <button onClick={(e) => deleteColumn(columnId)}>delete</button>
            </li>
        </ul>
    );
};

export default ColumnOptions;
