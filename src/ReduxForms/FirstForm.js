import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Label, Picker } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import FormStyle from "./FormStyle"
import { connect } from "react-redux"
import CountryData from '../Data/CountryData'
import { Actions } from 'react-native-router-flux'
import {AsyncStorage} from 'react-native';



const validate = values => {
  const errors = {}
  if (!values.fName) {
    errors.fName = 'Enter First Name'
  }
  else if (!values.address) {
    errors.address = 'Enter Address'
  }
  else if (!values.city) {
    errors.city = 'Enter City'
  }
  else if (!values.state) {
    errors.state = 'Enter State'
  } else if (!values.country || values.country == "Country") {
    errors.country = "Select Country"
  }

  return errors
}


const nextHandle = (value) => {
  Actions.secondForm({ userData: value });
}

class FirstForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      countries: [],
      country: null
    };
    this.renderInput = this.renderInput.bind(this);
    this.renderPicker = this.renderPicker.bind(this);

  }

  componentDidMount() {
    let countries = this.state.countries;
    countries = CountryData;
    this.props.add(countries);
  }
  renderInput({ input, label, multiline, placeholder, type, meta: { touched, error, warning } }) {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        <Item style={{ marginBottom: 10 }}>

          <Input key={input.name} onChangeText={input.onChange} multiline={multiline}
            placeholderTextColor={"#99A3A4"} placeholder={placeholder}
            style={FormStyle.textInput} />
        </Item>
        {touched && (error && (<Text style={{ color: "red", fontSize: 13 }}>{error}</Text>
        ))}

      </View>
    )
  }

  renderPicker({ mode, itemStyle, input: { onChange, value, ...inputProps }, meta: { touched, error, warning } }) {

    let countriesComp = [];
    let countries = this.props.countries;
    if (countries != undefined) {
      for (let i = 0; i < countries.length; i++) {
        countriesComp.push(
          <Picker.Item key={i} label={countries[i].label} value={countries[i].value} />
        )
      }
    }
    return (
      <View style={{ backgroundColor: "#fff" }}>
        <Item style={{ marginBottom: 10 }}>

          <Picker mode={mode} itemStyle={itemStyle} selectedValue={value}
            onValueChange={value => this.updateCountry(value, onChange)}>
            {countriesComp}
          </Picker>
        </Item>
        {touched && (error && (<Text style={{ color: "red", fontSize: 13 }}>{error}</Text>
        ))}

      </View>
    )
  }


  render() {

    AsyncStorage.getItem("userObject")
    .then(async (response) => {
        console.log(response);
    })
    const { handleSubmit } = this.props;


    return (
      <Content>

        <Container style={FormStyle.container}>

          <Field name="fName" placeholder={"First Name"} component={this.renderInput} />
          <Field name="lName" placeholder={"Last Name"} component={this.renderInput} />
          <Field name="address" multiline={true} placeholder={"Address"} component={this.renderInput} />
          <Field name="city" placeholder={"City"} component={this.renderInput} />
          <Field name="state" placeholder={"State"} component={this.renderInput} />
          <Field name="country" mode={"dialog"} itemStyle={{ fontSize: 14 }} selectedValue={this.props.country}
            onValueChange={this.updateCountry.bind(this)} component={this.renderPicker} />


          <Button style={{ marginTop: 20 }} block primary onPress={handleSubmit((value) => {
            nextHandle(value)
          })}>
            <Text>Next</Text>
          </Button>
        </Container>
      </Content>
    )
  }

  updateCountry = (value, onChange) => {

    this.props.dispatch(updateData(value))
    return onChange(value);
  }

}


function updateData(data) {
  return {
    type: "COUNTRY",
    payload: data
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: (countries) => {
      dispatch(loadItems(countries));
    }
  }
}

function loadItems(data) {
  return {
    type: "COUNTRIES",
    payload: data
  };
}
const mapStateToProps = state => {
  return {
    countries: state.firstFormReducer.countries,
    country: state.firstFormReducer.country
  }
};


export default reduxForm({
  form: 'firstForm',
  validate,
})(connect(mapStateToProps, mapDispatchToProps)(FirstForm))
