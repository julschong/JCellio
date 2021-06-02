import { FETCH } from '../helper/url';
// import axios from 'axios';

import axios from 'axios';

const swapTaskPos = async (srcTaskId, destCol, pos) => {
    const res = await axios.put(`${FETCH.BASE_URL}/tasks/${srcTaskId}`, {
        destColId: destCol,
        pos: pos
    });

    return res.data;
};

const taskService = {
    swapTaskPos
};

export default taskService;
