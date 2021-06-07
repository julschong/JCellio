// import axios from 'axios';
import axios from 'axios';
import { FETCH } from '../helper/url';

const swapTaskPos = async (srcTaskId, destCol, pos) => {
    const res = await axios.put(`${FETCH.BASE_URL}/tasks/${srcTaskId}`, {
        destColId: destCol,
        pos: pos
    });

    return res.data;
};

const deleteTaskById = async (taskId) => {
    const res = await axios.delete(`${FETCH.BASE_URL}/tasks/${taskId}`);

    return res.data;
};

const taskService = {
    swapTaskPos,
    deleteTaskById
};

export default taskService;
