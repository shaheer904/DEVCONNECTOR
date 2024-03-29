import axios from 'axios'
import { setAlert } from './alert'

import {
  PROFILE_ERROR,
  GET_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
} from './types'

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me')
    dispatch({ type: GET_PROFILE, payload: res.data })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
//Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get('/api/profile')
    dispatch({ type: GET_PROFILES, payload: res.data })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
//Get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`)
    dispatch({ type: GET_PROFILE, payload: res.data })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
//Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`)
    dispatch({ type: GET_REPOS, payload: res.data })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
//Create and Update the profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await axios.post('/api/profile', formData, config)
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
      dispatch(
        setAlert(edit ? 'Profile-Updated' : 'Profile-Created', 'success')
      )
      if (!edit || edit) {
        history.push('/dashboard')
      }
    } catch (err) {
      const errors = err.response.data.errors
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
//Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.put('/api/profile/experience', formData, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert('Experience added', 'success'))
    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(err.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.put('/api/profile/education', formData, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert('Education added', 'success'))
    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(err.msg, 'primary')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert('Experience Removed', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
//Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert('Education Removed', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Delete Account and profile

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? this can NOT be undone!')) {
    try {
      await axios.delete('/api/profile')
      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: ACCOUNT_DELETED })
      dispatch(setAlert('Your account has been permanently deleted'))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}
