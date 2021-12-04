import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet,FlatList ,TouchableHighlight} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {DragSortableView} from 'react-native-drag-sort';
import { DraxProvider, DraxView } from 'react-native-drax';
import DraggableFlatList from 'react-native-draggable-flatlist';


export default function UploadImage() {
  const [image, setImage] = useState();
  const [imageList, setImagelist] = useState([]);
  const [itemState, setitemState] = useState(imageList);



  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5,5],
      quality: 1,
    });

    console.log(JSON.stringify(_image));

    if (!_image.cancelled) {
      setImage(_image.uri);
    }
    const List = imageList.concat(_image.uri);
    setImagelist(List);
    setitemState(List);

  };

  const renderItem =({item, index, drag, isActive})=>{
    return(
      <View>
        {/* <TouchableOpacity
            style={{ 
          height: 100, 
          backgroundColor: isActive ? 'blue' : item.backgroundColor,
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
        onLongPress={drag}
          > */}
        <Image
        source={ {uri: item} }
        style={imageUploaderStyles.imageItem}/>
        <View style={imageUploaderStyles.deleteBtnContainer}>
          <TouchableHighlight
            onPress={() => {
              let _itemState = itemState.filter(
                (_item, _index) => _index !== index
              );
              setitemState(_itemState);
            }}
            style={imageUploaderStyles.deleteBtn} >
            <Ionicons name="md-trash-sharp" size={24} color="black" />
          </TouchableHighlight >
        </View>
        {/* </TouchableOpacity> */}
      </View>
  )}

  return (
    <View style={{flex:1}}>
      <View>
        <FlatList
          ItemSeparatorComponent={
            () => <View style={{ width: 10, backgroundColor: 'grey' }}/>
          }
          horizontal={true}
          data={itemState}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
          // onMoveEnd={({ data }) => setState(data)}
        />
      </View>

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>

  );
}

const imageUploaderStyles=StyleSheet.create({
    container:{
        width:'100%', 
        backgroundColor:'#efefef',
        alignItems: 'center', 
        justifyContent: 'center',
    },
    uploadBtnContainer:{
        position: 'relative',
        marginVertical:100,
        opacity:0.7,
        backgroundColor:'lightgrey',
        width:'20%',
        height:'20%',
        borderRadius:10,
    },
    deleteBtnContainer:{
      position: 'relative',
      marginVertical:100,
      opacity:0.7,
      backgroundColor:'lightgrey',
      width:'100%',
      height:'10%',
      borderRadius:10,
  },

    uploadBtn:{
      height:40,
      alignItems:"center",
      justifyContent:'center'
    },

    deleteBtn:{
      height:40,
      alignItems:"center",
      justifyContent:'center'
    },
    
    imageItem: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
      marginHorizontal: 5,
      marginVertical: 5,
    },
})

