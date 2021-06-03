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

const BoardService = {
    addBoard
};

export default BoardService;
