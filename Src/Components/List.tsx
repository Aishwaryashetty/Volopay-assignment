import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, Dimensions} from 'react-native';

import * as ApiServices from '../Services/ApiServices';
import * as Constants from '../Constants';
import {ProgressiveImage} from '../Components/index';

const width = Dimensions.get('window').width / 2.2;

const List = (props: any) => {

  useEffect(() => {
    props.setGiphyData(props.giphyData);
  }, [props.giphyData]);

  const renderItem = ({item}: any) => {
    return (
      // show loading gif until actual gif from api is set
      <ProgressiveImage
        placeholderSource={require('../Assets/buffering.gif')}
        source={{uri: item.url}}
        style={[styles.imageStyle]}
      />
    );
  };

  const fetchMoreData = async () => {
    props.setClicked(false);
    let offset = props.offset + Constants.Limit;
    //if searchPhrase is empty trending data is displayed else data based on searchPhrase

    ApiServices.getGiphyApiResponse(offset, props.searchPhrase).then(res => {
      if (!res.success) {
        return;
      }
      //increase offset on scrolling to fetch more data
      props.setOffset(offset);
      props.setGiphyData([...props.giphyData, ...res.data]);
    });
  };

  return (
    <FlatList
      data={props.giphyData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={2}
      onEndReachedThreshold={0.5}
      onEndReached={async () => await fetchMoreData()}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  imageStyle: {
    aspectRatio: 1,
    flex: 1,
    margin: 5,
    borderRadius: 5,
    width: width,
  },
});
