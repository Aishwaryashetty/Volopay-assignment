import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, ActivityIndicator} from 'react-native';

import {List, SearchBar, TextAnimator, ImageAnimator} from './index';
import * as ApiServices from '../Services/ApiServices';

const Home = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [offset, setOffset] = useState(0);
  const [giphyData, setGiphyData] = useState();

  const fetchGiphyData = (txt: string = '') => {
    //if searchPhrase is empty trending data is displayed else data based on searchPhrase
    ApiServices.getGiphyApiResponse(0, txt).then(res => {
      console.log('fetchGiphyData res', res);
      if (!res.success) {
        return;
      }
      setGiphyData(res.data);
    });
  };

  useEffect(() => {
    fetchGiphyData(searchPhrase);
  }, [searchPhrase]);

  return (
    <SafeAreaView style={styles.root}>
      <View>
        <View style={styles.animationStyle}>
          {/* Logo animation component */}
          <ImageAnimator />
          {/* Title animation component */}
          <TextAnimator onFinish={() => {}} />
        </View>
        {/* Search bar */}
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
          setOffset={setOffset}
          setGiphyData={setGiphyData}
        />
        {/* show loading indicator until data from api is set */}
        {!giphyData ? (
          <ActivityIndicator size="large" />
        ) : (
          <List
            searchPhrase={searchPhrase}
            giphyData={giphyData}
            offset={offset}
            setOffset={setOffset}
            setClicked={setClicked}
            setGiphyData={setGiphyData}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'black',
  },
  animationStyle: {
    flexDirection: 'row',
  },
});
