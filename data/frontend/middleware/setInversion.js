export default function ({ store, redirect, route }) {
  let uuid = route.params.timeline
  let inversion = store.state.userInversions.filter(e => e.uuid === uuid)[0]
  if (!inversion) {
    return redirect('/panel/user/home')
  } else {
    store.commit('SET_INVERSION', inversion)
  }
}
