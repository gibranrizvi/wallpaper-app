import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FLatList,
  Dimensions,
  Image
} from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    isLoading: true,
    images: []
  };

  componentDidMount() {
    this.loadWallpapers();
  }

  loadWallpapers = () => {
    axios
      .get(
        'https://api.unsplash.com/photos/random?count=30&client_id=c6dc42f21ea956b65a8e4bde68c825f6de8bf17425182317ed5c2802b8621fe1'
      )
      .then(({ data }) => {
        console.log(data);
        this.setState({ images: data, isLoading: false });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        console.log('Request completed');
      });
  };

  renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ActivityIndicator size="large" color="grey" />
        </View>
        <View style={{ height, width }}>
          <Image
            style={{ flex: 1, height: null, width: null, resizeMode: 'cover' }}
            source={{ uri: item.urls.regular }}
          />
        </View>
      </View>
    );
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    ) : (
      <View style={styles.container}>
        <FlatList
          horizontal
          pagingEnabled
          data={this.state.images}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
