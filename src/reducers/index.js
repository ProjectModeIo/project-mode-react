import {manageAccount} from './manageAccount'
import {manageLogin} from './manageLogin'
import {manageRoles} from './manageRoles'
import {manageStatus} from './manageStatus'
import {manageSkills} from './manageSkills'
import {manageInterests} from './manageInterests'
import {manageCurrentProject} from './manageCurrentProject'
import {manageFeed} from './manageFeed'
import {manageChannels} from './manageChannels'
import {manageCurrentProfile} from './manageCurrentProfile'
import {manageRooms} from './manageRooms'
import {manageNotifications} from './manageNotifications'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  manageAccount, manageLogin, manageRoles, manageStatus, manageSkills, manageInterests,
  manageCurrentProject, manageFeed, manageChannels, manageCurrentProfile, manageRooms,
  manageNotifications
})

export default rootReducer
