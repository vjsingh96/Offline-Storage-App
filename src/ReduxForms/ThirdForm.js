import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Item, Input, Content, Button, Text, } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import FormStyle from "./FormStyle"
import { Actions } from 'react-native-router-flux'



const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = 'Enter Email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    else if (!values.password) {
        errors.password = 'Enter Password'
    }
    else if (!values.conPassword) {
        errors.conPassword = 'Enter Password'
    }
    else if (values.password != values.conPassword) {
        errors.conPassword = 'Password does not match';
    }
    return errors
}


const nextHandle = (values, props) => {
    props.userData.email = values.email;
    props.userData.password = values.password;

    Actions.preview({ userData: props.userData });
}

class ThirdForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };
        this.renderInput = this.renderInput.bind(this);

    }


    renderInput({ input, secureTextEntry, placeholder, meta: { touched, error } }) {
        return (
            <View style={{ backgroundColor: "#fff" }}>
                <Item style={{ marginBottom: 10 }}>

                    <Input {...input} key={input.name} onChangeText={input.onChange} secureTextEntry={secureTextEntry}
                        placeholderTextColor={"#99A3A4"} placeholder={placeholder}
                        style={FormStyle.textInput} />
                </Item>
                {touched && (error && (<Text style={{ color: "red", fontSize: 13 }}>{error}</Text>
                ))}

            </View>
        )
    }


    render() {
        const { handleSubmit } = this.props;

        return (
            <Content>

                <Container style={FormStyle.container}>

                    <Field name="email" placeholder={"Email"} component={this.renderInput} />
                    <Field name="password" secureTextEntry={true} placeholder={"Password"} component={this.renderInput} />
                    <Field name="conPassword" secureTextEntry={true} placeholder={"Confirm Password"} component={this.renderInput} />


                    <Button style={{ marginTop: 20 }} block primary onPress={handleSubmit((value) => {
                        nextHandle(value, this.props)
                    })}>
                        <Text>Next</Text>
                    </Button>
                </Container>
            </Content>
        )
    }

}


export default reduxForm({
    form: 'thirdForm',
    validate,
})(ThirdForm)
