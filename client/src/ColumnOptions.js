import { useCallback, useEffect, useRef } from 'react';

const ColumnOptions = ({ deleteColumn, columnId, setShowDropdown }) => {
    const container = useRef();

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
