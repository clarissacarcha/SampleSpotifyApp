import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector, useDispatch } from 'react-redux'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Home, Library, Search, Profile, Authorize } from './screens'
import { icons, COLORS, SIZES } from './constants'
import { TabBarIcon } from './components'
import * as authActions from './store/actions/auth'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSrc
          if (route.name === 'Search') iconSrc = icons.search
          if (route.name === 'Home') iconSrc = icons.home
          if (route.name === 'Library') iconSrc = icons.library
          if (route.name === 'Profile') iconSrc = icons.profile
          return (
            <TabBarIcon focused={focused} name={route.name} source={iconSrc} />
          )
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          marginBottom: 30,
          paddingBottom: 0,
          backgroundColor: COLORS.black,
          marginHorizontal: 12,
          borderRadius: 100,
          height: 100,
          borderTopColor: COLORS.black,
          // borderTopColor: COLORS.lightGray2,
          // borderTopWidth: 2,
          // borderColor: COLORS.lightGray2,
          // borderWidth: 2,
        },
      })}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Search' component={Search} />
      <Tab.Screen name='Library' component={Library} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}

const App = () => {
  const auth = useSelector((state) => state.auth)
  const [isAuth, setIsAuth] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  useEffect(() => {
    const tryLogin = async () => {
      const authData = await AsyncStorage.getItem('authData')
      if (!authData) {
        return
      }
      const { accessToken, refreshToken, accessTokenExpirationDate } =
        await JSON.parse(authData)
      if (
        new Date(accessTokenExpirationDate) <= new Date() ||
        !accessToken ||
        !refreshToken
      ) {
        dispatch(authActions.requestRefreshedAccessToken(refreshToken))
        return
      }
      dispatch(authActions.setTokens(accessToken, refreshToken))
      setIsAuth(true)
    }
    tryLogin()
  }, [dispatch])

  if (auth.tokenIsLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: COLORS.black,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <ActivityIndicator size='large' color={COLORS.primary} />
      </View>
    )
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: 'transparent' }}>
      <StatusBar
        translucent={true}
        animated={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Authorize'
          screenOptions={{ headerShown: false }}
        >
          {isAuth ? (
            <Stack.Screen name='Main' component={MainTabNavigator} />
          ) : (
            <Stack.Screen name='Authorize' component={Authorize} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
