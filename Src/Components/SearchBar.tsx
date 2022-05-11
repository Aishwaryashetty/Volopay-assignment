import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

const SearchBar = (props: any) => {
  let filterTimeout: any;

  // throttle - wait for ms secs and then set the data of search phrase
  const throttle = (fn: any, ms: number) => {
    clearTimeout(filterTimeout);

    filterTimeout = setTimeout(() => {
      props.setGiphyData();
      fn;
      props.setOffset(0);
    }, ms);
  };

  return (
    <View style={styles.container}>
      <View
        style={
          !props.clicked
            ? styles.searchBar__unClicked
            : styles.searchBar__clicked
        }>
        <Image
          style={styles.searchIcon}
          source={require('../Assets/searchIcon.png')}
        />
        {/* search bar - on entering the data throttle   */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={props.searchPhrase}
          onChangeText={text => throttle(props.setSearchPhrase(text), 500)}
          onFocus={() => {
            props.setClicked(true);
          }}
        />
        {/* clear icon - on click, clear searchPhrase and set offset to 0 */}
        {props.clicked && (
          <TouchableOpacity
            style={{padding: 1}}
            onPress={() => {
              props.setSearchPhrase('');
              props.setOffset(0);
            }}>
            <Image
              style={styles.clearIcon}
              source={require('../Assets/clearIcon.png')}
            />
          </TouchableOpacity>
        )}
      </View>
      {props.clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              props.setClicked(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  searchBar__unClicked: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
  searchIcon: {
    height: 30,
    width: 30,
    marginRight: 15,
    resizeMode: 'contain',
  },
  clearIcon: {
    height: 30,
    width: 30,
    marginRight: 15,
    resizeMode: 'contain',
  },
});