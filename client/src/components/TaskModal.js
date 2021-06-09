import { useCallback, useContext, useEffect, useRef } from 'react';
import { StoreContext } from '../helper/Store';
import './TaskModal.css';

const TaskModal = () => {
    const { setChangeTaskModel } = useContext(StoreContext);
    const handleClick = useCallback(
        (e) => {
            if (e.target.className === 'modal-background') {
                setChangeTaskModel(null);
            }
        },
        [setChangeTaskModel]
    );

    const container = useRef();
    useEffect(() => {
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [handleClick]);

    return (
        <aside ref={container} className="modal-background">
            <div className="modal-container"></div>
        </aside>
    );
};

export default TaskModal;
