import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,

} from 'react-native';
import { Container, Button, Text, } from 'native-base';
import { connect } from "react-redux"
import Toast from 'react-native-easy-toast'

import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';


class SecondForm extends React.Component {
  state = {
    imageUri: null
  };

  constructor(props) {
    super(props);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.props.add(response.uri);
      }
    });
  }


  handleNext = (props) => {
    if (props.imageUri == null) {
      this.refs.toast.show('Please select Image');
    } else {
      props.userData.imageUri = this.props.imageUri;
      Actions.thirdForm({ userData: props.userData });
    }
  }


  render() {

    return (
      <Container style={styles.container}>

        {this.setImage()}

        <Toast ref="toast" position='bottom'
          positionValue={200} />
        <Button onPress={() => {
          this.handleNext(this.props)
        }}
          block primary style={styles.btnStyle}>
          <Text>Next</Text>
        </Button>
      </Container>
    );
  }

  setImage() {
    if (this.props.imageUri == null) {
      return (
        <Container>
          <Image resizeMode={"contain"} style={styles.avatar}
            source={require("../img/user.png")} />
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <Text style={styles.text}>Select Image</Text>
          </TouchableOpacity>
        </Container>
      )
    } else {
      return (
        <Container>
          <Image resizeMode={"contain"} style={styles.avatar}
            source={{ uri: this.props.imageUri }} />
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <Text style={styles.text}>Change Image</Text>
          </TouchableOpacity>
        </Container>
      )
    }
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
    marginTop: 60
  },
  text: {
    fontSize: 18,
    color: "#2980B9",
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
    alignItems: "center"
  },
  btnStyle: {
    position: 'absolute',
    bottom: 0,
    width: "100%"
  },

});



function updateImage(data) {
  return {
    type: "IMAGE",
    payload: data
  };
}


const mapDispatchToProps = (dispatch) => {
  return {
    add: (imageUri) => {
      dispatch(updateImage(imageUri));
    }
  }
}

const mapStateToProps = state => {
  return {
    imageUri: state.selectImageReducer.imageUri,

  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SecondForm)