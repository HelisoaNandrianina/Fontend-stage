import React, { useState } from 'react';
import { View, Image, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import { registerUser } from '../api/api.register';
import { router } from 'expo-router';
import { createUser } from '../api/api.createUser';
import { styles } from '../styles/login.styles';
// Creation utilisTEUR
const CreateScreen: React.FC = () => {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [motdepasse, setMotdepasse] = useState('');
    const [confirmation, setConfirmation] = useState('');

    const addRegister = async () => {
        try {
            const response = await createUser(nom, email, motdepasse, confirmation);
            Alert.alert('Succès', 'Responsable créer avec succès !', [{ text: 'OK', onPress: () => router.push('./home') }]);
        } catch (error: unknown) { 
            if (error instanceof Error) {
                Alert.alert('Erreur', error.message, [{ text: 'OK' }]);
            } else {
                Alert.alert('Erreur', 'Une erreur est survenue.', [{ text: 'OK' }]);
            }
        }
    };

    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>Ajout d'utilisateur</Text>
            <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Mot de passe" value={motdepasse} onChangeText={setMotdepasse} secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirmer le mot de passe" value={confirmation} onChangeText={setConfirmation} secureTextEntry />
            <TouchableOpacity style={styles.button} onPress={addRegister}>
                <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={addRegister}>
                <Text style={styles.buttonText} onPress={() => router.push('./home')} >Retour</Text>
            </TouchableOpacity>
            {/* <Text style={{ color: 'white', marginTop: 20 , textAlign: 'center'}} >Retour</Text> */}
        </View>
    );
};



export default CreateScreen;
