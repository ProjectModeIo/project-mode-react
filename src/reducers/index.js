import {manageAccount} from './manageAccount'
import {manageLogin} from './manageLogin'
import {manageRoles} from './manageRoles'
import {manageStatus} from './manageStatus'
import {manageSkills} from './manageSkills'
import {manageInterests} from './manageInterests'
import {manageCurrentProject} from './manageCurrentProject'
import {manageFeed} from './manageFeed'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  manageAccount, manageLogin, manageRoles, manageStatus, manageSkills, manageInterests,
  manageCurrentProject, manageFeed
})

export default rootReducer
