import { useCallback, useEffect, useRef } from 'react';
import './TaskModal.css';

const TaskModal = ({ showModal, setShowModal }) => {
    const handleClick = useCallback(
        (e) => {
            if (e.target.className === 'modal-background') {
                setShowModal(false);
            }
        },
        [setShowModal]
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
