import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { HeaderStyles } from "../styles/header.styles";
// header
export function Header() {
    return (
        <View style={HeaderStyles.container}>
            <Ionicons name="people-outline" size={24} color="#000" style={HeaderStyles.icon} />
            <Text style={HeaderStyles.title}>Liste de tous les utilisateurs</Text>
        </View>
    );
}