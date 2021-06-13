import { useState } from 'react';
import taskService from '../services/taskService';

const TaskDetail = ({ taskData }) => {
    const [fieldChanged, setFieldChanged] = useState(false);

    return (
        <form>
            <div>
                <label htmlFor="title">Task</label>
                <input
                    name="title"
                    defaultValue={taskData.name}
                    onChange={() => {
                        if (!fieldChanged) {
                            setFieldChanged(true);
                        }
                    }}
                    onBlur={async (e) => {
                        if (e.target.value.trim().length > 0 && fieldChanged) {
                            await taskService.changeTask(taskData.id, {
                                name: e.target.value.trim()
                            });
                            setFieldChanged(false);
                        }
                    }}
                    spellCheck={false}
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    defaultValue={taskData.description}
                    onBlur={async (e) => {
                        if (e.target.value.trim().length > 0 && fieldChanged) {
                            await taskService.changeTask(taskData.id, {
                                description: e.target.value.trim()
                            });
                            setFieldChanged(false);
                        }
                    }}
                    onChange={() => {
                        if (!fieldChanged) {
                            setFieldChanged(true);
                        }
                    }}
                    spellCheck={false}
                />
            </div>
            <div>
                <label>Start Date</label>
                <input
                    name="startDate"
                    defaultValue={
                        taskData.startDate
                            ? taskData.startDate.replace(/T.*Z$/, '')
                            : null
                    }
                    onBlur={async (e) => {
                        if (
                            e.target.value
                                .trim()
                                .match(/[\d]{4}-[\d]{2}-[\d]{2}/) &&
                            fieldChanged
                        ) {
                            await taskService.changeTask(taskData.id, {
                                startDate: new Date(
                                    e.target.value.trim()
                                ).toISOString()
                            });
                            setFieldChanged(false);
                        }
                    }}
                    onChange={() => {
                        if (!fieldChanged) {
                            setFieldChanged(true);
                        }
                    }}
                    type="date"
                />
            </div>
            <div>
                <label>Due Date</label>
                <input
                    name="endDate"
                    defaultValue={
                        taskData.endDate
                            ? taskData.endDate.replace(/T.*Z$/, '')
                            : null
                    }
                    onBlur={async (e) => {
                        if (
                            e.target.value
                                .trim()
                                .match(/[\d]{4}-[\d]{2}-[\d]{2}/) &&
                            fieldChanged
                        ) {
                            await taskService.changeTask(taskData.id, {
                                endDate: new Date(
                                    e.target.value.trim()
                                ).toISOString()
                            });
                            setFieldChanged(false);
                        }
                    }}
                    onChange={() => {
                        if (!fieldChanged) {
                            setFieldChanged(true);
                        }
                    }}
                    type="date"
                />
            </div>
        </form>
    );
};

export default TaskDetail;
