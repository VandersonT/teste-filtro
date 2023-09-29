import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {

  const [cardapioApi, setCardapioApi] = useState([
      { 'tipo': 'café', 'data': '2023-09-24', 'oque': 'pão com leite' },
      { 'tipo': 'almoço', 'data': '2023-09-24', 'oque': 'arroz e feijão' },
      { 'tipo': 'janta', 'data': '2023-09-24', 'oque': 'frango grelhado' },
      { 'tipo': 'café', 'data': '2023-09-25', 'oque': 'ovos mexidos' },
      { 'tipo': 'almoço', 'data': '2023-09-25', 'oque': 'macarrão com queijo' },
      { 'tipo': 'janta', 'data': '2023-09-25', 'oque': 'salmão grelhado' },
      { 'tipo': 'café', 'data': '2023-09-26', 'oque': 'cappuccino' },
      { 'tipo': 'almoço', 'data': '2023-09-26', 'oque': 'salada de frutas' },
      { 'tipo': 'janta', 'data': '2023-09-26', 'oque': 'bife à parmegiana' },
      { 'tipo': 'café', 'data': '2023-09-27', 'oque': 'misto quente' },
      { 'tipo': 'almoço', 'data': '2023-09-27', 'oque': 'risoto de cogumelos' },
      { 'tipo': 'janta', 'data': '2023-09-27', 'oque': 'tacos de frango' },
      { 'tipo': 'café', 'data': '2023-09-28', 'oque': 'café com leite' },
      { 'tipo': 'almoço', 'data': '2023-09-28', 'oque': 'sopa de lentilhas' },
      { 'tipo': 'janta', 'data': '2023-09-28', 'oque': 'sanduíche de peru' },
      { 'tipo': 'café', 'data': '2023-09-29', 'oque': 'espresso' },
      { 'tipo': 'almoço', 'data': '2023-09-29', 'oque': 'hambúrguer vegetariano' },
      { 'tipo': 'janta', 'data': '2023-09-29', 'oque': 'wraps de frango' },
      { 'tipo': 'café', 'data': '2023-09-30', 'oque': 'cappuccino' },
      { 'tipo': 'almoço', 'data': '2023-09-30', 'oque': 'salada mista' },
      { 'tipo': 'janta', 'data': '2023-09-30', 'oque': 'sopa de legumes' },
      { 'tipo': 'café', 'data': '2023-10-01', 'oque': 'torradas com geleia' },
      { 'tipo': 'almoço', 'data': '2023-10-01', 'oque': 'lasanha' },
      { 'tipo': 'janta', 'data': '2023-10-01', 'oque': 'sanduíche de presunto' },
  ]);  
  const [ cafe, setCafe ] = useState([]);
  const [ almoco, setAlmoco ] = useState([]);
  const [ janta, setJanta ] = useState([]);
  const [ dataHoje, setDataHoje ] = useState('');
  const [ diaDaSemanaHoje, setDiaDaSemanaHoje ] = useState('');
  const [ diasFrente, setDiasFrente ] = useState(0);
  const [ diasTras, setDiasTras ] = useState(0);
  const [ cardapio, setCardapio ] = useState([
    {dia: 'Domingo', cafe: '', almoco: '', janta: ''}, // Domingo
    {dia: 'Segunda', cafe: '', almoco: '', janta: ''}, // Segunda
    {dia: 'Terça', cafe: '', almoco: '', janta: ''}, // Terça
    {dia: 'Quarta', cafe: '', almoco: '', janta: ''}, // Quarta
    {dia: 'Quinta', cafe: '', almoco: '', janta: ''}, // Quinta
    {dia: 'Sexta', cafe: '', almoco: '', janta: ''}, // Sexta
    {dia: 'Sabado', cafe: '', almoco: '', janta: ''}, // Sabado
  ]);


  const teste = () => {
    
    //Separa café, almoço e janta em um array para cada
    separaCardapioPorTipo();

    //Pega data atual e atualiza informações
    setarDataAtual()

    //le as informações
    console.log('Data Hoje:'+dataHoje)
    console.log('O dia da semana: '+diaDaSemanaHoje)
    console.log('Dias a frente: '+diasFrente)
    console.log('Dias a traz: '+diasTras)
    console.log('-------------------------')

    //Preenche o cardapio do dia atual
    preencheCardapioDia(dataHoje, diaDaSemanaHoje);

    //Preenche os proximos dias
    console.log('Proximos dias');
    for(let i = 1; i <= diasFrente; i++){
      let esteDiaDados = descobreProximosDias(dataHoje, i);

      preencheCardapioDia(esteDiaDados['data'], esteDiaDados['diaDaSemana']);
      console.log(esteDiaDados);
    }

    console.log('----------------------------------');
    console.log('Dias Passados');

    //Preenche os dias passados
    for(let i = 1; i <= diasTras; i++){
      let esteDiaDados = descobreDiasPassados(dataHoje, i);

      preencheCardapioDia(esteDiaDados['data'], esteDiaDados['diaDaSemana']);
      console.log(esteDiaDados);
    }

  }

  const descobreProximosDias = (dataAtual, quantosDiasAfrente) => {
    const dataOriginal = new Date(dataAtual);

    dataOriginal.setDate(dataOriginal.getDate() + quantosDiasAfrente+1);

    const ano = dataOriginal.getFullYear();
    const mes = String(dataOriginal.getMonth() + 1).padStart(2, '0'); // Os meses são base 0, então somamos 1.
    const dia = String(dataOriginal.getDate()).padStart(2, '0');

    // Formate a nova data de volta para o formato "aaaa-mm-dd"
    const novaDataString = `${ano}-${mes}-${dia}`;

    const diaDestaSemana = dataOriginal.getDay();


    return {'data': novaDataString, 'diaDaSemana': diaDestaSemana};
  }

  const descobreDiasPassados = (dataAtual, quantosDiasAfrente) => {
    const dataOriginal = new Date(dataAtual);

    dataOriginal.setDate(dataOriginal.getDate() - quantosDiasAfrente+1);

    const ano = dataOriginal.getFullYear();
    const mes = String(dataOriginal.getMonth() + 1).padStart(2, '0'); // Os meses são base 0, então somamos 1.
    const dia = String(dataOriginal.getDate()).padStart(2, '0');

    // Formate a nova data de volta para o formato "aaaa-mm-dd"
    const novaDataString = `${ano}-${mes}-${dia}`;

    const diaDestaSemana = dataOriginal.getDay();


    return {'data': novaDataString, 'diaDaSemana': diaDestaSemana};
  }

  const preencheCardapioDia = (dataProcurada, diaDaSemana) => {

    //Preenche o dia de hoje
    const novoCardapio = [...cardapio];

    cardapioApi.forEach(element => {
      if(element.data == dataProcurada){
        
          switch(element.tipo){
            case 'café':
              novoCardapio[diaDaSemana]['cafe'] = element.oque;
              break;
            case 'almoço':
              novoCardapio[diaDaSemana]['almoco'] = element.oque;
              break;
            case 'janta':
              novoCardapio[diaDaSemana]['janta'] = element.oque;
              break;
          }

      }
    });

    setCardapio(novoCardapio);

  }

  const setarDataAtual = () => {//2023-09-29
    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses são base 0, então somamos 1.
    const dia = String(data.getDate()).padStart(2, '0');

    //Pega a data formatada apenas sem hora nem nada mais
    const dataFormatada = `${ano}-${mes}-${dia}`;
    setDataHoje(dataFormatada)

    //Define o número correspondente a semana
    const diaDaSemana = data.getDay(); // 0 para domingo, 1 para segunda-feira, etc.
    setDiaDaSemanaHoje(diaDaSemana)

    //pega quantos dias anteriores e faltam para terminar a semana
    setDiasTras(diaDaSemana);
    setDiasFrente(6 - diaDaSemana);

  }

  const separaCardapioPorTipo = () => {

    cardapioApi.forEach(item => {
      if (item.tipo === 'café') {
        cafe.push(item);
      } else if (item.tipo === 'almoço') {
        almoco.push(item);
      } else if (item.tipo === 'janta') {
        janta.push(item);
      }
    })

  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.dia}>{item.dia}</Text>
      <Text>{(item.cafe) ? item.cafe : 'Não cadastrado'}</Text>
      <Text>{(item.almoco) ? item.almoco : 'Não cadastrado'}</Text>
      <Text>{(item.janta) ? item.janta : 'Não cadastrado'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text>Teste</Text>
      <Button title="Clica" onPress={teste} />


      <FlatList
        data={cardapio}
        renderItem={renderItem}
        keyExtractor={(item) => item.dia}
      />

    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      marginBottom: 80
    },
    item: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    dia: {
      fontWeight: 'bold',
    },
});
