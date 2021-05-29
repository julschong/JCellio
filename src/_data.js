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
        items: itemsFromBackend,
        index: 0
    },
    [uuid()]: {
        name: 'To do',
        items: [],
        index: 1
    },
    [uuid()]: {
        name: 'In Progress',
        items: [],
        index: 3
    },
    [uuid()]: {
        name: 'Done',
        items: [],
        index: 2
    }
};
