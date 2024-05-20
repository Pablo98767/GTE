import { createContext, useContext, useState, useEffect } from 'react';

import axios from 'axios';

import { api } from '../services/api';

import * as Utils from '../utils/interfaces';

export type AuthContextType = {
  signIn: (credentials: Utils.userProps) => void;
  signOut: () => void;
  user: {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    birthday?: string;
    telephone?: [
      {
        id?: string;
        type?: string;
        number?: string;
      }
    ];
    message?: [
      {
        id?: string;
        title?: string;
        content?: string;
        type?: string;
      }
    ];
    deliveryAddress?: [
      {
        id?: string;
        street?: string;
        number?: string;
        complement?: string;
        sector?: string;
        city?: string;
        state?: string;
        country?: string;
        zipcode?: string;
        latitude?: string;
        longitude?: string;
      }
    ];
    userRestaurant?: [
      {
        id?: string;
        userId?: string;
        restaurantId?: string;
      }
    ];
    orders?: [
      {
        id?: string;
        createdAt?: string;
        updatedAt?: string;
        description?: string;
        status?: string;
        totalAmount?: string;
        userId?: string;
        restaurantId?: string;
        dishes?: [
          {
            id?: string;
            name?: string;
            price?: string;
            notes?: [
              {
                id?: string;
                content?: string;
                score?: string;
              }
            ]
          }
        ];
      }
    ];
    userFavoriteDishes?: [
      {
        id?: string;
        userId?: string;
        dishId?: string;
      },
    ];
    permissionGroup?: {
      id: string;
      role: string;
    };
    token?: string;
  };
  updateProfile: ({ userProfile, avatarFile }: Utils.updateUserProps) => void;
};

const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  user: {},
  updateProfile: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState({});

  const signIn = async ({ email, password }: Utils.userProps) => {
    try {
      const response = await api.post('/user/login', { email, password });
      const {
        categories,
        restaurants,
        currentUser,
        permissions,
        dishes,
        orders,
        tokenData,
      } = response.data;
console.log(dishes)
      const user = { ...currentUser, ...permissions[0] };
      const dishesList = dishes ?? [];

      localStorage.setItem(
        '@food-explorer-backend:categories',
        JSON.stringify(categories ? categories : [])
      );
      localStorage.setItem(
        '@food-explorer-backend:restaurants',
        JSON.stringify(restaurants ? restaurants : [])
      );
      localStorage.setItem(
        '@food-explorer-backend:dishes',
        JSON.stringify(dishesList ? dishesList : [])
      );
      localStorage.setItem(
        '@food-explorer-backend:orders',
        JSON.stringify(orders ? orders : [])
      );
      if (user.userFavoriteDishes) {
        const favoritesList: Utils.dishProps[] = user.userFavoriteDishes.map((item: Utils.favoriteDishProps) => {
          return dishesList.find((dish: Utils.dishProps) => dish.id === item.dishId);
        })
        localStorage.setItem('@food-explorer-backend:favorites', JSON.stringify(favoritesList ? favoritesList.filter((favorite) => favorite !== undefined) : []));
      }
      localStorage.setItem('@food-explorer-backend:token', tokenData.token);
      localStorage.setItem('@food-explorer-backend:user', JSON.stringify(user));

      api.defaults.headers.common['Authorization'] = tokenData.token;
      setData({ ...user, token: tokenData.token });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      } else {
        alert('Não foi possível entrar');
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem('@food-explorer-backend:categories');
    localStorage.removeItem('@food-explorer-backend:restaurants');
    localStorage.removeItem('@food-explorer-backend:dishes');
    localStorage.removeItem('@food-explorer-backend:orders');
    localStorage.removeItem('@food-explorer-backend:openOrder');
    localStorage.removeItem('@food-explorer-backend:editingDish');
    localStorage.removeItem('@food-explorer-backend:visualizedDish');
    localStorage.removeItem('@food-explorer-backend:restaurants');
    localStorage.removeItem('@food-explorer-backend:restaurant');
    localStorage.removeItem('@food-explorer-backend:permissions');
    localStorage.removeItem('@food-explorer-backend:token');
    localStorage.removeItem('@food-explorer-backend:users');
    localStorage.removeItem('@food-explorer-backend:user');
    localStorage.removeItem('@food-explorer-backend:favorites');

    setData('');
  };

  const updateProfile = async ({
    userProfile,
    avatarFile,
  }: Utils.updateUserProps) => {
    try {
      const token = localStorage.getItem('@food-explorer-backend:token');
      const user = localStorage.getItem('@food-explorer-backend:user');
      if (user) {
        const userInfo = JSON.parse(user);

        if (avatarFile) {
          const fileUploadForm = new FormData();
          fileUploadForm.append('avatar', avatarFile);

          const response = await api.patch(
            `/user/avatar/${userInfo.id}`,
            fileUploadForm
          );
          userInfo.avatar = response.data.avatar;
        }

        await api.put(`/user/${userInfo.id}`, userProfile);

        userInfo.name = userProfile.name ? userProfile.name : userInfo.name;
        userInfo.email = userProfile.email ? userProfile.email : userInfo.email;

        localStorage.setItem(
          '@food-explorer-backend:user',
          JSON.stringify(userInfo)
        );
        setData({ ...userInfo, token });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      } else {
        alert('Não foi possível entrar');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('@food-explorer-backend:token');
    const user = localStorage.getItem('@food-explorer-backend:user');
    if (user) {
      const userInfo = JSON.parse(user);

      if (token && user) {
        api.defaults.headers.common['Authorization'] = token;

        setData({ ...userInfo, token });
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user: data,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export {
  AuthProvider,
  useAuth,
}