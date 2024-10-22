import React, {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';

export const ModalScreen = () => {
  const [updateId, setUpdateId] = useState(-1);
  const [visibility, setVisibility] = useState(false);
  const [newFish, setFish] = useState('');
  const [fishList, addFish] = useState(['Bream', 'Burbot', 'Tench']);
  const fishInputHandler = enteredText => {
    setFish(enteredText);
  };
  const addFishToList = () => {
    if (newFish.trim().length > 0) {
      if (updateId >= 0) {
        fishList[updateId] = newFish.trim();
        addFish(fishList);
        setFish('');
      } else {
        addFish(fishList => [...fishList, newFish.trim()]); //With trim() leading and trailing white-space characters are removed
        setFish('');
      }
    }
    setVisibility(false);
    setUpdateId(-1);
  };
  const keyHandler = (item, index) => {
    return index.toString();
  };
  const deleteItem = removeIndex => {
    addFish(fishList => {
      return fishList.filter((fish, id) => {
        return id != removeIndex;
      });
    });
  };
  const showInputView = () => {
    setVisibility(true);
  };
  const cancelFish = () => {
    setVisibility(false);
    setUpdateId(-1);
    setFish('');
  };

  // UPDATE FISH

  // State variables

  const updateItem = id => {
    setUpdateId(id);
    setFish(fishList[id]);
    setVisibility(true);
  };

  const updateFishToList = () => {
    if (newFish.trim().length > 0) {
      if (updateId > 0) {
        fishList[updateId] = newFish.trim();
        addFish(fishList);
        setFish('');
      }
    }
    setVisibility(false);
    setUpdateId(-1);
  };

  ///

  const renderFish = item => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onLongPress={() => deleteItem(item.index)}
        onPress={() => updateItem(item.index)}>
        <View style={styles.listItemStyle}>
          <Text>
            {item.index}) {item.item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Modal visible={visibility} animationType="slide">
        <View style={styles.formView}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Fish breed..."
            onChangeText={fishInputHandler}
            value={newFish}
          />
          <View style={styles.okcancelStyle}>
            <View style={styles.buttonView}>
              <Button
                style={styles.buttonStyle}
                // title="Ok"
                title={updateId < 0 ? 'Add' : 'Update'} // Conditional rendering of the update and add buttons
                onPress={addFishToList}
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                style={styles.buttonStyle}
                title="Cancel"
                onPress={cancelFish}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.listStyle}>
        <Button
          style={styles.buttonStyle}
          title="Add new Fish"
          onPress={showInputView}
        />
        <FlatList
          style={styles.flatliststyle}
          keyExtractor={keyHandler}
          data={fishList}
          renderItem={renderFish}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatliststyle: {
    width: '80%',
    backgroundColor: 'blue',
  },
  listItemStyle: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 5,
    backgroundColor: '#abc',
    width: '80%',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  okcancelStyle: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-around',
  },
  formView: {
    // flex:1,
    // flexDirection:"row",
    backgroundColor: '#def',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  listStyle: {
    flex: 8,
    alignItems: 'center',
    backgroundColor: '#eee',
    borderColor: 'green',
    borderWidth: 2,
    width: '100%',
  },
  inputStyle: {
    backgroundColor: '#abc',
    borderColor: 'black',
    borderWidth: 2,
    margin: 2,
    padding: 5,
    width: '50%',
  },
  buttonStyle: {
    margin: 2,
    padding: 5,
  },
  buttonView: {
    width: 80,
  },
});

// export default ModalScreen;
