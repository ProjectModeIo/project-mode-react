import {manageAccount} from './manageAccount'
import {manageLogin} from './manageLogin'
import {manageRoles} from './manageRoles'
import {manageStatus} from './manageStatus'
import {manageSkills} from './manageSkills'
import {manageInterests} from './manageInterests'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  manageAccount, manageLogin, manageRoles, manageStatus, manageSkills, manageInterests
})

export default rootReducer
