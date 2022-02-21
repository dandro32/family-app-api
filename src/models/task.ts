interface Task {
    creator: string,
    id: string,
    name: string,
    createDate: Date,
    owner: string,
    read: boolean,
}

export default Task;