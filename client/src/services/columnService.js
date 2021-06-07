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

const deleteColumn = async (columnId) => {
    const deletedColumn = await axios.delete(
        `${FETCH.BASE_URL}/columns/${columnId}`
    );
    return deletedColumn.date;
};

const ColumnService = {
    addColumn,
    changeColumnName,
    deleteColumn
};

export default ColumnService;
