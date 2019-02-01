import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import FirstForm from '../ReduxForms/FirstForm'
import SecondForm from "../ReduxForms/SecondForm"
import ThirdForm from "../ReduxForms/ThirdForm"
import Preview from "../ReduxForms/Preview"

export default Routes = () => (
   <Router>
      <Scene key="root">
         <Scene type={"reset"} key="firstForm" component={FirstForm} title="Basic Info" initial={true} />
         <Scene key="secondForm" component={SecondForm} title="Upload Image" />
         <Scene key="thirdForm" component={ThirdForm} title="Personal Info" />
         <Scene key="preview" component={Preview} title="Preview" />

      </Scene>
   </Router>
)
