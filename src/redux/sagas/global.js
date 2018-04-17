import { put, select, takeEvery, all } from 'redux-saga/effects'
import { Creators } from 'redux/actions/global'
import { NotificationManager } from 'react-notifications'
import { originalType } from 'utils/action'

function* listenAction(action) {
  try {
    console.log(action)
    const { status } = yield select(state => state.global)
    var newStatus;
    if (action.type.endsWith('/request')) {
      newStatus = {
        ...status,
        effects: {
          ...status.effects,
          [originalType(action.type)]: 'request',
        }
      }
      yield put(Creators.updateStates({ status: newStatus }))
    } else if (action.type.endsWith('/success')) {
      newStatus = {
        ...status,
        effects: {
          ...status.effects,
          [originalType(action.type)]: 'success',
        }
      }
      yield put(Creators.updateStates({ status: newStatus }))

      // const { result, show=0 } = action.payload;
      // if(show)
      //   yield put(Creators.showMessage({ visible: true, title: 'Success', text: result.message}))

    } else if (action.type.endsWith('/failure')) {
      newStatus = {
        ...status,
        effects: {
          ...status.effects,
          [originalType(action.type)]: 'failure',
        }
      }
      yield put(Creators.updateStates({ status: newStatus }))

      const { err, showAlert } = action.payload
      if (err && showAlert !== false) {
          NotificationManager.error(
            err.errorMessage || err.message,
            'Error...'
          )
      }

      // const { err, show=1 } = action.payload
      // if(show)
      //   yield put(Creators.showMessage({ visible: true, title: 'Error...', text: err.message || err.errorMessage }))
    }
  } catch (err) {
    if (err) {
      NotificationManager.error(
        err.errorMessage || err.message,
        'Error...'
      )
    }
  }
}

export function* globalSaga() {
  yield all([
    takeEvery('*', listenAction)
  ])
}
