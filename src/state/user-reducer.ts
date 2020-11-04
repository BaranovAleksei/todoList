import React, {useReducer} from 'react';

type StateType = {
  name: string
  age: number
  childrenCount: number
}

type ActionType = {
  type: string
  [key: string]: any
}

export const userReducer = ( user: StateType, action: ActionType) => {
  switch (action.type ) {
    case 'INCREMENT-AGE':
      return {...user, age: user.age+1};
    case 'INC-CHILDREN-COUNT':
      return {...user, childrenCount: user.childrenCount+1};
    case 'CHANGE-NAME':
      return {...user, name: action.name}
    default:
      throw new Error('What you say, my mam? ....');
  }
}