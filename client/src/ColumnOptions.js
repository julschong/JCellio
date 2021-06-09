import { useCallback, useContext, useEffect, useRef } from 'react';
import { StoreContext } from './helper/Store';

const ColumnOptions = ({ columnId, setShowDropdown }) => {
    const container = useRef();

    const { deleteColumn } = useContext(StoreContext);

    const handleClick = useCallback(
        (e) => {
            if (container.current && !container.current.contains(e.target)) {
                setShowDropdown(false);
            }
        },
        [setShowDropdown]
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
