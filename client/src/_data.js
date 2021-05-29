import { v4 as uuid } from 'uuid';

export const itemsFromBackend = [
    { id: uuid(), content: 'First task' },
    { id: uuid(), content: 'Second task' },
    { id: uuid(), content: 'Third task' },
    { id: uuid(), content: 'Fourth task' },
    { id: uuid(), content: 'Fifth task' }
];

export const columnsFromBackend = {
    [uuid()]: {
        name: 'Requested',
        items: itemsFromBackend
    },
    [uuid()]: {
        name: 'To do',
        items: []
    },
    [uuid()]: {
        name: 'In Progress',
        items: []
    },
    [uuid()]: {
        name: 'Done',
        items: []
    }
};
