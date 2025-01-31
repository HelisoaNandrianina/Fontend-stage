import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Button, Alert, StyleSheet, Image} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from '../styles/home.styles';
import UserList from "../components/listUser";
import { Header } from "../components/header";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import axios from "axios";
import { User } from "../models/User";
import { BASE_URL } from "../../constants/constants";

const API_URL = `${BASE_URL}/manager`;

// Affiche la list des utilisateur
function Home() {
    const goCreateUser = async () => {
        router.push('/pages/createUser');
      };

      async () =>{
        const token = await AsyncStorage.getItem('token');
        if(!token){
            router.push('/pages/login');
        }
      }
  return (
    <View style={styles.container}>
      <Header />
      <TouchableOpacity
  style={styles.buttonAddResponsable}
  onPress={goCreateUser}
>
  <Text style={styles.buttonAddResponsableText}>Ajouter un responsable</Text>
</TouchableOpacity>

      <UserList />
    </View>
  );
}
//recupere les ID de utilisateur 
function Profile() {
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    useEffect(() => {
        const getUserId = async () => {
            const id = await fetchUserId();
            setUserId(id);
        };
        getUserId();
    }, []);
    // Prend les ID des utilisateurs
    const fetchUserId = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (!token) {
                throw new Error('Token non trouvé');
            }

            const response = await axios.get(`${API_URL}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data && response.data.user && response.data.user.id) {
                return response.data.user.id;
            } else {
                throw new Error('ID utilisateur non trouvé');
            }
        } catch (error) {
            console.error("Erreur lors de la récupération de l'ID de l'utilisateur :", error);
            return null;
        }
    };


    const fetchUsers = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token non trouvé');
            }

            const response = await axios.get<User[]>(`${API_URL}/manager/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            console.log('Réponse reçue :', response.data);
            const users = response.data;
            users.forEach((user) => {
              console.log(`ID: ${user.id}, Nom: ${user.nom}, Email: ${user.email}`);
          });
            return response.data
        } catch (error) {
            Alert.alert('Erreur', 'Erreur lors de la récupération.');
            console.error('Erreur lors de la récupération :', error);
        } 
    };

     // Récupérer les informations complètes de l'utilisateur
     const fetchUserDetails = async (userId: number) => {
      try {
          const token = await AsyncStorage.getItem("token");
          if (!token) {
              throw new Error("Token non trouvé");
          }

          const response = await axios.get(`${API_URL}/manager/${userId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });

          console.log("Réponse de l'API :", response.data); // Vérifiez la réponse

          // Mise à jour des informations utilisateur
          setUserName(response.data.nom);  // Utilisez 'nom' selon votre interface
          setUserEmail(response.data.email);  // Utilisez 'email' selon votre interface
      } catch (error) {
          Alert.alert("Erreur", "Erreur lors de la récupération des informations utilisateur.");
          console.error("Erreur lors de la récupération :", error);
      }
  };

    const logout = async () => {
        try {
          await AsyncStorage.removeItem('token');
          Alert.alert('Déconnexion éffectuée !');
        } catch (error) {
          Alert.alert('Erreur', 'Impossible de se déconnecter.');
          console.error(error);
        }
        router.push('/pages/login');
      };
  return (
    <View style={styles.container}>
        <View style={profile.container}>
        <Image
            source={require("../../assets/images/OIP.jpg")} // Image locale
            style={styles.userImage}
        />
            <Text style={{ color: "white" }}>ID de l'utilisateur : {userId}</Text>
            <Text style={{ color: "white" }}>Nom : {userName}</Text>
            <Text style={{ color: "white" }}>Email : {userEmail}</Text>

            
            <Text style={{ color: "white" }}>Date de création : {userId && userId ? '2024-10-01' : 'Non disponible'}</Text>
            <Text style={{ color: "white" }}>Etat : {userId && userId ? 'Actif' : 'Non disponible'}</Text>
        </View>
         <TouchableOpacity style={styles.buttonAddResponsable}>
        <Text onPress={logout} style={styles.buttonAddResponsableText}>Se déconnecter</Text>
      </TouchableOpacity> 
    </View>
  );
}
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
      <Tab.Navigator //navigation par onglets qui permet à l'utilisateur de naviguer entre différentes sections de l'application via des onglets en bas de l'écran.
       // screenOptions est utilisée pour configurer les options de l'interface de chaque onglet.
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "All") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

           
            return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#0B4163",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
             height: 60,
             paddingBottom: 10,
             backgroundColor: '#000',
          }
        })}
      >
        <Tab.Screen name="All" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
  );
}

const profile = StyleSheet.create({
  container: {
   marginLeft: 25
  },
});