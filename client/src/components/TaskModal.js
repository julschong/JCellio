import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StoreContext } from '../helper/Store';
import taskService from '../services/taskService';
import TaskDetail from './TaskDetail';
import './TaskModal.css';

const TaskModal = () => {
    // store variable and set method for the visibility of modal
    const { changeTaskModal, setChangeTaskModel } = useContext(StoreContext);

    const handleClick = useCallback(
        (e) => {
            if (e.target.className === 'modal-background') {
                setChangeTaskModel(null);
            }
        },
        [setChangeTaskModel]
    );

    const [taskData, setTaskData] = useState(null);

    useEffect(() => {
        if (changeTaskModal) {
            taskService
                .getTask(changeTaskModal)
                .then((res) => setTaskData(res.data));
        }
    }, [changeTaskModal]);

    const displayData = taskData ? <TaskDetail taskData={taskData} /> : null;

    // ref for container, for mouse click closing modal
    const container = useRef();

    useEffect(() => {
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [handleClick]);

    return (
        <aside ref={container} className="modal-background">
            <div className="modal-container">{displayData}</div>
        </aside>
    );
};

export default TaskModal;
