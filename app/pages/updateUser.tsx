import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet ,TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../constants/constants';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../constants/type';

interface User {
    id: number;
    nom: string;
    email: string;
}

type UpdateUserScreenProps = {
    route: RouteProp<RootStackParamList, 'pages/updateUser'>;
    navigation: StackNavigationProp<RootStackParamList, 'pages/updateUser'>;
};




const UpdateUser = ({ route, navigation }: UpdateUserScreenProps) => {
    
    const { user, onUpdateSuccess  } = route.params;
    const [nom, setNom] = useState(user.nom);
    const [email, setEmail] = useState(user.email);
    const API_URL = `${BASE_URL}`;

    const handleUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.put(`${API_URL}/manager/${user.id}`, { nom, email }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            Alert.alert("Succès", "Utilisateur mis à jour avec succès");

            navigation.goBack(); 
        } catch (error) {
            Alert.alert('Erreur', 'Erreur lors de la mise à jour de l’utilisateur.');
            console.error('Erreur lors de la mise à jour de l’utilisateur:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MODIFICATION</Text>
            <Text style={styles.label}>Nom:</Text>
            <TextInput
                style={styles.input}
                value={nom}
                onChangeText={setNom}
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Modifier</Text>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212',
        paddingTop: 60,
        justifyContent: 'center',
    },
    label: {
        marginBottom: 5,
        color: '#ffffff',
    },
    input: {
        height: 50,
        width: '100%',
        maxWidth: 400,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#ffffff',
    },
    button: {
        backgroundColor: '#27374D',
        borderRadius: 8,
        paddingVertical: 12,
        marginVertical: 12,
        width: '100%',
        maxWidth: 400,
      },
      buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
      },
    title:{
        fontSize: 36,
        fontWeight: 'bold',
        color: '#DDE6ED',  
        marginBottom: 20,
        textAlign: 'center',
    }
});

export default UpdateUser;  
