import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#000',
      },
      title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#DDE6ED',  
        marginBottom: 20,
        textAlign: 'center',
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
      footerText: {
        textAlign: 'center',
        marginTop: 16,
        color: '#888888',
      },
})