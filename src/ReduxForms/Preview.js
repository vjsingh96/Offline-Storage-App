import React, { Component } from 'react';
import { View, Image, StyleSheet, } from 'react-native';
import { Container, Text, Button } from 'native-base';
import { AsyncStorage } from 'react-native';
import Toast from 'react-native-easy-toast'
import { Actions } from 'react-native-router-flux';




class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }


    render() {
        let userData = this.props.userData;
        return (

            <Container style={styles.container}>

                <Image resizeMode={"contain"} style={styles.avatar}
                    source={{ uri: userData.imageUri }} />


                <View style={styles.horizontalView}>
                    <Text style={styles.label}>Full Name</Text>
                    <Text style={styles.value}>{userData.fName + " " + userData.lName}</Text>
                </View>
                <View style={styles.drawLine} />

                <View style={styles.horizontalView}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{userData.email}</Text>
                </View>
                <View style={styles.drawLine} />

                <View style={styles.horizontalView}>
                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.value}>{userData.address}</Text>
                </View>
                <View style={styles.drawLine} />

                <View style={styles.horizontalView}>
                    <Text style={styles.label}>City</Text>
                    <Text style={styles.value}>{userData.city}</Text>
                </View>
                <View style={styles.drawLine} />

                <View style={styles.horizontalView}>
                    <Text style={styles.label}>State</Text>
                    <Text style={styles.value}>{userData.state}</Text>
                </View>
                <View style={styles.drawLine} />

                <View style={styles.horizontalView}>
                    <Text style={styles.label}>Country</Text>
                    <Text style={styles.value}>{userData.country}</Text>
                </View>
                <View style={styles.drawLine} />

                <Toast ref="toast" position='bottom'
                    positionValue={200} />
                <Button style={styles.btnStyle} block primary onPress={() => {
                    this.nextHandle(this.props)
                }}>
                    <Text>Submit</Text>
                </Button>
            </Container>
        )
    }


    nextHandle = (props) => {
        let userData = props.userData;
        AsyncStorage.setItem("userObject", JSON.stringify(userData))
            .then(async (response) => {
                this.refs.toast.show('SignUp success!!');
                setTimeout(() => {
                    Actions.firstForm();
                }, 500);
            })


    }

}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1
    },

    avatar: {
        borderRadius: 40,
        width: 100,
        height: 100,
        marginTop: 20,
        marginBottom: 20
    },

    btnStyle: {
        position: 'absolute',
        bottom: 0,
        width: "100%"
    },
    drawLine: {
        backgroundColor: "#e3e3e3",
        height: 0.7,
        width: "100%",
        marginTop: 15,
        marginBottom: 15
    },
    label: {
        fontSize: 14,
        color: "#666",
        flex: 1
    },
    value: {
        fontSize: 14,
        color: "#000",
        flex: 1,
        textAlign: "right"
    },
    horizontalView: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15
    }

});

export default Preview;
