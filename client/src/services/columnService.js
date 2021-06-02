import axios from 'axios';
import { FETCH } from '../helper/url';

const addColumn = async (newColumnTitle) => {
    const savedColumn = await axios.post(
        `${FETCH.BASE_URL}/columns`,
        newColumnTitle
    );
    return savedColumn.data;
};

const ColumnService = {
    addColumn
};

export default ColumnService;
