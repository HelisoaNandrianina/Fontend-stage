import React, { useState } from 'react';
import { Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { Link, useRouter } from 'expo-router';
import { styles } from '../styles/login.styles';
import { login } from '../api/api.login';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../constants/type'; 
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';  


const LoginScreen: React.FC = () => {
  const router = useRouter(); 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');




  const handleLogin = async () => {
    console.log('handleLogin appelé'); // Debug
    setEmailError('');
    setPasswordError('');

    try {
      const data = await login(email, password);
      console.log('Données reçues:', data); // Debug

    
      if (data.token) {
       
         // Stocker le token dans AsyncStorage
       await AsyncStorage.setItem('token', data.token); 
       console.log('Token JWT:', data.token);
       router.replace('./home'); 
      }
    } catch (error: any) {
      console.log('Erreur dans le try-catch', error); // Debug
        console.log(error);
      if (error.message.includes('Utilisateur non trouvé')) {
        setEmailError(error.message); 
      } else if (error.message.includes('Mot de passe invalide')) {
        setPasswordError(error.message); 
      } else {
        setEmailError('Erreur inconnue, veuillez réessayer.'); 
      }
    }
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry); 
  };

  return (
    <View style={styles.container}>
       {/* <Image
        source={require('../../asset')}  // Assure-toi que le chemin est correct
        style={styles.image}

      /> */}
       <Animatable.Text
        style={styles.helloText}
        animation="zoomIn" // L'animation fadeIn, mais vous pouvez changer pour d'autres comme "bounceIn", "zoomIn", etc.
        iterationCount="infinite" // Pour que l'animation soit répétée en boucle
        direction="alternate" // Pour alterner entre les deux états de l'animation
        duration={3000} // Durée de l'animation en millisecondes
      >
       Hello BiblioAPP User
      </Animatable.Text>
      <Text style={styles.title}>CONNEXION</Text>
      {/* <Ionicons name="mail-outline" size={24} color="gray" /> */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaaaaa"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
  
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View style={styles.passwordContainer}>
      
        <TextInput
          style={styles.passwordInput}
          placeholder="Mot de passe"
          placeholderTextColor="#aaaaaa"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={secureTextEntry} 

        />
        {/* <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.iconContainer}>
          <Icon name={secureTextEntry ? 'visibility-off' : 'visibility'} size={18} color="#000" />
        </TouchableOpacity> */}
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
     <TouchableOpacity onPress={() => router.push('/pages/register')}>
                <Text style={styles.footerText}>Pas encore inscrit ? Inscrivez-vous ici</Text>
            </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
