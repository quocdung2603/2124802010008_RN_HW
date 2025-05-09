import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Practice from '../Screens/Practice';
import ExerciseList1 from '../Thuc_Hanh/LAB1/ExerciseList1';
import Project1 from '../Thuc_Hanh/LAB1/Project1';
import Project2 from '../Thuc_Hanh/LAB1/Project2';
import Project3 from '../Thuc_Hanh/LAB1/Project3';
import Project4 from '../Thuc_Hanh/LAB1/Project4';
import Project5 from '../Thuc_Hanh/LAB1/Project5';
import Project6 from '../Thuc_Hanh/LAB1/Project6';
import Project7 from '../Thuc_Hanh/LAB1/Project7';
import Project8 from '../Thuc_Hanh/LAB1/Project8';
import CaculatorApp from '../Thuc_Hanh/LAB1/CaculatorApp';
import ExerciseList2 from '../Thuc_Hanh/LAB2/ExerciseList2';
import ContactAppStack from '../Thuc_Hanh/LAB2/Navigator/ContactAppStack';
import ContactAppBottomTab from '../Thuc_Hanh/LAB2/Navigator/ContactAppBottomTab';
import ContactAppDrawer from '../Thuc_Hanh/LAB2/Navigator/ContactAppDrawer';
import ExerciseList3 from '../Thuc_Hanh/LAB3/ExerciseList3';
import SpaApp from '../Thuc_Hanh/LAB3/SpaApp';

const Stack = createNativeStackNavigator();

interface PracticeListProps {
  RouterName: string;
  Component: React.FC<any>;
  title?: string;
  headerShow?: boolean;
}

const PracticeList: PracticeListProps[] = [
  {
    RouterName: 'PracticeHome',
    Component: Practice,
    title: 'Danh sách buổi thực hành',
  },
  {RouterName: 'ExerciseList1', Component: ExerciseList1, title: ''},
  {
    RouterName: 'Project1',
    Component: Project1,
    title: 'Bài 1',
  },
  {RouterName: 'Project2', Component: Project2, title: 'Bài 2'},
  {RouterName: 'Project3', Component: Project3, title: 'Bài 3'},
  {RouterName: 'Project4', Component: Project4, title: 'Bài 4'},
  {RouterName: 'Project5', Component: Project5, title: 'Bài 5'},
  {RouterName: 'Project6', Component: Project6, title: 'Bài 6'},
  {RouterName: 'Project7', Component: Project7, title: 'Bài 7'},
  {RouterName: 'Project8', Component: Project8, title: 'Bài 8'},
  {RouterName: 'CaculatorApp', Component: CaculatorApp, title: 'Caculator App'},
  {RouterName: 'ExerciseList2', Component: ExerciseList2, title: ''},
  {
    RouterName: 'ContactAppStack',
    Component: ContactAppStack,
    title: 'Contacts',
  },
  {
    RouterName: 'ContactAppBottomTab',
    Component: ContactAppBottomTab,
    title: 'Contacts',
    headerShow: false,
  },
  {
    RouterName: 'ContactAppDrawer',
    Component: ContactAppDrawer,
    title: 'Contacts',
    headerShow: false,
  },
  {RouterName: 'ExerciseList3', Component: ExerciseList3, title: ''},
  {
    RouterName: 'SpaApp',
    Component: SpaApp,
    title: 'Contacts',
    headerShow: false,
  },
];

const PracticeStack = () => {
  return (
    <Stack.Navigator>
      {PracticeList.map((item, index) => (
        <Stack.Screen
          key={index + 0}
          name={item.RouterName}
          component={item.Component}
          options={{
            title: item.title,
            headerShown: item.headerShow,
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default PracticeStack;
