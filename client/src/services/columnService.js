import axios from 'axios';
import { FETCH } from '../helper/url';

const addColumn = async (newColumnTitle) => {
    const savedColumn = await axios.post(
        `${FETCH.BASE_URL}/columns`,
        newColumnTitle
    );
    return savedColumn.data;
};

const changeColumnName = async (columnId, newTitle) => {
    const savedColumn = await axios.put(
        `${FETCH.BASE_URL}/columns/${columnId}`,
        { title: newTitle }
    );
    return savedColumn.data;
};

const ColumnService = {
    addColumn,
    changeColumnName
};

export default ColumnService;
