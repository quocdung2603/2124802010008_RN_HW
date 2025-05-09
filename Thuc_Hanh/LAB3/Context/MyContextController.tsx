// store/ContextController.tsx
import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  ReactNode,
  Dispatch,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

// Khai báo types
type UserType = {
  email: string;
  name?: string;
  // các trường khác nếu có
  [key: string]: any;
};

type StateType = {
  userLogin: UserType | null;
  services: any[];
};

type ActionType = {type: 'USER_LOGIN'; value: UserType} | {type: 'LOGOUT'};

type ContextType = [StateType, Dispatch<ActionType>];

const MyContext = createContext<ContextType | null>(null);
MyContext.displayName = 'vbvdabv';

// Reducer
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {...state, userLogin: action.value};
    case 'LOGOUT':
      return {...state, userLogin: null};
    default:
      throw new Error('Action not found');
  }
};

// Provider
export const MyContextControllerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const initialState: StateType = {
    userLogin: null,
    services: [],
  };

  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(
    () => [controller, dispatch] as ContextType,
    [controller, dispatch],
  );

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// Hook để dùng context
export const useMyContextController = (): ContextType => {
  const context = useContext(MyContext);
  if (context === null) {
    throw new Error(
      'useMyContextController must be used inside MyContextControllerProvider',
    );
  }
  return context;
};

// Firestore Collection
const USERS = firestore().collection('USERS');

// Actions
export const login = async (
  dispatch: Dispatch<ActionType>,
  email: string,
  password: string,
) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    USERS.doc(email).onSnapshot(u => {
      dispatch({type: 'USER_LOGIN', value: u.data() as UserType});
    });
  } catch (e) {
    Alert.alert('Sai email và password');
  }
};

export const logout = async (dispatch: Dispatch<ActionType>) => {
  await auth().signOut();
  dispatch({type: 'LOGOUT'});
};
