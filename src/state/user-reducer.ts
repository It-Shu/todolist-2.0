interface StateType {
    age: number
    childrenCount: number
    name: string
}

interface ActionType {
    type: string

    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state, age: ++state.age}
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state, childrenCount: ++state.childrenCount}
        case 'CHANGE-NAME':
            let newName = 'Serega'
            return {...state, name: newName}
        default:
            throw new Error('I don`t understand this type')
    }
}

