import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import Verificar from './pages/VerificarLogin/Verificar';
import Login from './pages/Login';
import NewUser from './pages/NewUser';
import TabScreen from './pages/TabScreen';
import AddCar from './pages/AddCar';
import InfoCar from './pages/InfoCar';
import Profile from './pages/Profile';
import StoredCar from './pages/StoredCar';
import TabScreenSemConta from './pages/TabScreenSemConta';
import RescuedCars from './pages/RescuedCars'
import UpdateCar from './pages/UpdateCar';
import UpdatePassword from './pages/UpdatePassword';
import UpdateProfile from './pages/UpdateProfile';
import Help from './pages/Help';
import AdminListUser from './pages/AdminListUser';
import AdminListStands from './pages/AdminListStands';
import AdminAdd from './pages/AdminAdd'
import AddMarca from './pages/AddMarca'

const AppStack = createNativeStackNavigator();

export default function Routes(){ return(
    <NavigationContainer>
        <AppStack.Navigator screenOptions={{headerShown: false ,
            gestureEnabled: Platform.OS === 'ios' ? false : true}}>

            <AppStack.Screen name='Verificar' component={Verificar}/>
            <AppStack.Screen name='Login' component={Login}/>
            <AppStack.Screen name='NewUser'component={NewUser}/>
            <AppStack.Screen name='TabScreen' component={TabScreen}/>
            <AppStack.Screen name='AddCar' component={AddCar}/>
            <AppStack.Screen name='InfoCar' component={InfoCar}/>
            <AppStack.Screen name='Profile' component={Profile}/>
            <AppStack.Screen name='StoredCar' component={StoredCar}/>
            <AppStack.Screen name='TabScreenSemConta' component={TabScreenSemConta}/>
            <AppStack.Screen name='RescuedCars' component={RescuedCars}/>
            <AppStack.Screen name='UpdateCar' component={UpdateCar}/>
            <AppStack.Screen name='UpdatePassword' component={UpdatePassword}/>
            <AppStack.Screen name='UpdateProfile' component={UpdateProfile}/>
            <AppStack.Screen name='Help' component={Help}/>
            <AppStack.Screen name='AdminListUser' component={AdminListUser}/>
            <AppStack.Screen name='AdminListStands' component={AdminListStands}/>
            <AppStack.Screen name='AdminAdd' component={AdminAdd}/>
            <AppStack.Screen name='AddMarca' component={AddMarca}/>


        </AppStack.Navigator>
    </NavigationContainer>
)
}

