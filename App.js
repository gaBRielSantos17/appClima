import React, { useState } from 'react';
import {  View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { buscarClima } from './src/service/api';

export default function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [clima, setClima] = useState(null); 

  async function functionBuscarClima() {
    if (latitude && longitude) {
      try {
        const dados = await buscarClima(latitude, longitude);
        setClima(dados); 
      } catch (erro) {
        console.error('Erro ao buscar o clima:', erro);
        alert('Não foi possível buscar os dados. Verifique as coordenadas!');
      }
    } else {
      alert('Por favor, preencha a latitude e longitude.');
    }
  }

  function Limpar() {
    setLatitude('');
    setLongitude('');
    setClima(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>App de Clima Simples</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite a latitude"
        keyboardType="numeric"
        value={latitude}
        onChangeText={setLatitude}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite a longitude"
        keyboardType="numeric"
        value={longitude}
        onChangeText={setLongitude}
      />

      <View style={styles.buscar}>
        <Button title="Buscar Clima" onPress={functionBuscarClima} />
      </View>

      <View style={styles.limpar}>
        <Button title="Limpar" color="red" onPress={Limpar} />
      </View>

      {clima && (
        <View style={styles.resultado}>
          <Text>Temperatura: {clima.main.temp}°C</Text>
          <Text>Umidade: {clima.main.humidity}%</Text>
          <Text>Descrição: {clima.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
  },
  titulo: {
    top: 50,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    top: 50,
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buscar: {
    top: 50,
    marginTop: 10,
  },
  limpar: {
    top: 50,
    marginTop: 10,
  },
  resultado: {
    top: 50,
    width: '80%',
    height: 80,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent:'center',
  },
});
