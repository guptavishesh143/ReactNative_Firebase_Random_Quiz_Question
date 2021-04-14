// Imported Libraries
import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
  Modal,
  Linking,
  Share,
  DeviceEventEmitter,
  Alert,
  Button,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

//Imported Firebase Libraries
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
// Importing Components Files
import {scale, moderateScale, verticalScale} from '../../../Scaling_utils';
import {
  Freshchat,
  FreshchatConfig,
  FreshchatUser,
} from 'react-native-freshchat-sdk';
//Main Function
function Home({navigation}) {
  const [ViewItems, setViewItems] = useState([]);
  const [title, settitle] = useState('');
  const [Options, setOptions] = useState([]);
  const [Datatems, setDatatems] = useState([]);

  const [Length, setLength] = useState('');
  const [IncrementalCounter, setIncrementalCounter] = useState(0);

  const ArrayModule = [];
  ArrayModule.push('sagar', 'gggg', 'aaaa', 'vishesh');
  //UseEffects
  useEffect(() => {
    // AddDataTOFirebase();

    FetchData();
  }, []);



  function ShowData(item) {
    return(
      <>
      <View>
        <Text>{item}</Text>
      </View>
      </>

    )
    
  }

  function HeaderData() {
    return(
      <>
      <View>
        <Text>{title}</Text>
      </View>
      </>

    )
    
  }
  function DataRepresent() {
    return (
      <>
        <View>
          <Button title="Click Me to get new question" onPress={() => {
            Helper();
          }} />
        </View>
      </>
    );
  }
  function AddDataTOFirebase() {
    firestore()
      .collection('test')

      .add({
        data: ArrayModule,
      });
  }

  var DataVar = [];
  function FetchData() {
    firestore()
      .collection('test')

      .get()
      .then(querySnapshot => {
        //  console.log(querySnapshot)
        querySnapshot.forEach(doc => {
          DataVar.push({...doc.data()});
        });
        console.log(DataVar);
        setViewItems(DataVar);
        let obj = DataVar[IncrementalCounter]
        settitle(obj.Question);
        setOptions(obj.data);
        

      });
  }

  function Helper() {
    let increment = IncrementalCounter + 1
    setIncrementalCounter(increment);
    if(increment < ViewItems.length){
      let obj = ViewItems[increment]
      console.log(obj);
      settitle(obj.Question);
      setOptions(obj.data);
    }

  }

  return (
    <>
      {/* Transparent Container  */}
      <View>
        <View
          style={{
            ...Platform.select({
              ios: {
                height: verticalScale(30),
              },
              android: {
                height: verticalScale(10),
              },
              default: {
                // other platforms, web for example
                height: verticalScale(30),
              },
            }),
            backgroundColor: 'transparent',
            width: '100%',
          }}></View>
        <View
          style={{
            height: verticalScale(50),
            backgroundColor: 'red',
            width: '100%',
          }}></View>

        <FlatList
          ListHeaderComponent={HeaderData()}
          data={Options}
          renderItem={({item, index}) => (
            <View style={{paddingRight: 36}}>{(() => {
              return ShowData(item)
            })()}</View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={DataRepresent()}
        />
      </View>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({});
