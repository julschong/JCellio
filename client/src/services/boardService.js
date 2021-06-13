import axios from 'axios';
import { FETCH } from '../helper/url';

const token = JSON.parse(window.localStorage.getItem('token'));

const getBoards = () => {
    return fetch(`${FETCH.BASE_URL}/boards`, {
        headers: { Authorization: token }
    });
};

const addBoard = async (newBoardTitle) => {
    const savedColumn = await axios.post(
        `${FETCH.BASE_URL}/boards`,
        {
            name: newBoardTitle
        },
        { headers: { Authorization: token } }
    );
    return savedColumn.data;
};

const deleteBoard = async (boardId) => {
    await axios.delete(`${FETCH.BASE_URL}/boards/${boardId}`, {
        headers: { Authorization: token }
    });
};

const BoardService = {
    addBoard,
    deleteBoard,
    getBoards
};

export default BoardService;
