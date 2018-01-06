export default function ({ store, redirect, route }) {
  console.log(store.state)
  let uuid = route.path.split('/')[3]
  let inversion = store.state.userInversions.filter(e => e.uuid === uuid)[0]
  if (!inversion) {
    return redirect('/panel/user/home')
  } else {
    store.commit('SET_INVERSION', inversion)
  }
}
