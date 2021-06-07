import axios from 'axios';
import { FETCH } from '../helper/url';

const addBoard = async (newBoardTitle, token) => {
    const savedColumn = await axios.post(
        `${FETCH.BASE_URL}/boards`,
        {
            name: newBoardTitle
        },
        { headers: { Authorization: token } }
    );
    return savedColumn.data;
};

const deleteBoard = async (boardId, token) => {
    await axios.delete(`${FETCH.BASE_URL}/boards/${boardId}`, {
        headers: { Authorization: token }
    });
};

const BoardService = {
    addBoard,
    deleteBoard
};

export default BoardService;
