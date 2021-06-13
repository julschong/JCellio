// import axios from 'axios';
import axios from 'axios';
import { FETCH } from '../helper/url';

const token = JSON.parse(window.localStorage.getItem('token'));

const getTask = async (taskId) => {
    const res = await axios.get(`${FETCH.BASE_URL}/tasks/${taskId}`, {
        headers: { authorization: token }
    });
    return res.data;
};

const changeTask = async (taskId, content) => {
    const res = await axios.put(`${FETCH.BASE_URL}/tasks/${taskId}`, content, {
        headers: { authorization: token }
    });
    return res.data;
};

const swapTaskPos = async (srcTaskId, destCol, pos) => {
    const res = await axios.put(
        `${FETCH.BASE_URL}/tasks/${srcTaskId}`,
        {
            destColId: destCol,
            pos: pos
        },
        {
            headers: { authorization: token }
        }
    );

    return res.data;
};

const deleteTaskById = async (taskId) => {
    const res = await axios.delete(`${FETCH.BASE_URL}/tasks/${taskId}`, {
        headers: { authorization: token }
    });

    return res.data;
};

const createTask = async (newTask) => {
    const res = await axios.post(`${FETCH.BASE_URL}/tasks`, newTask, {
        headers: { authorization: token }
    });

    return res.data;
};

const taskService = {
    swapTaskPos,
    deleteTaskById,
    getTask,
    createTask,
    changeTask
};

export default taskService;
