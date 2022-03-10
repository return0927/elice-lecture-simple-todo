import axios from "axios";
import { createContext, useReducer } from "react";

const initialValue = {
    isLoading: true,
    toDoList: [],
};

const airTableSync = {
    create: async (content) => {
        return (await axios.post("/", { records: [
            {
                fields: {
                    Name: content,
                    isCompleted: false,
                }
            }
        ] })).data.records[0];
    },
    patch: async (todo) => {
        return axios.patch(`/${todo.id}`, {fields: {
            Name: todo.content,
            isCompleted: todo.isCompleted
        }});
    },
    delete: async (id) => {
        console.log(`Airtable Deleting ${id}`)
        return axios.delete(`/${id}`)
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING': {
            return {
                ...state,
                isLoading: action.value
            };
        }
        case 'SET_TODOLIST': {
            return {
                ...state,
                toDoList: action.value
            }
        }
        case 'TOGGLE_TODO': {
            const { value: id } = action;

            let found = undefined;
            const mapped = state.toDoList.map((todo) => {
                if (todo.id === id) {
                    return found = { ...todo, isCompleted: !todo.isCompleted };
                }
                else
                    return { ...todo };
            });

            airTableSync.patch(found);

            return {
                ...state,
                toDoList: mapped
            }
        }
        case 'CREATE_TODO': {
            const { value, dispatch } = action;

            airTableSync.create(value).then(data => {
                console.log(data);
                dispatch({
                    type: 'SET_TODOLIST',
                    value: [
                        ...state.toDoList,
                        {
                            id: data.id,
                            content: data.fields.Name,
                            isCompleted: data.fields.isCompleted
                        }
                    ]
                });
            })

            return state;
        }
        case 'UPDATE_TODO': {
            const { value: todo } = action;

            airTableSync.patch(todo);

            return {
                ...state,
                toDoList: state.toDoList.map(v => {
                    if (v.id !== todo.id) return {...v};
                    else return todo;
                })
            }
        }
        case 'DELETE_TODO': {
            const { value: id } = action;

            console.log(`Deleting ${id}`)
            airTableSync.delete(id);

            return {
                ...state,
                toDoList: state.toDoList.filter(v => v.id !== id)
            }
        }
        default:
            throw new Error('지원되지 않는 행동 형식')
    }
}

const ToDoContext = createContext(initialValue);

const ToDoProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, initialValue);

    return (<ToDoContext.Provider value={{ state, dispatch }}>
        {children}
    </ToDoContext.Provider>)
}

export { ToDoContext, ToDoProvider };
