import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { actions, types } from '../redux/counter'

export function* incrementAsync(action) {
  yield call(delay, 1000, null)
  yield put(actions.increment(action.payload))
}

export function* incrementAsyncSaga() {
  yield takeLatest(types.INCREMENT_ASYNC, incrementAsync)
}
