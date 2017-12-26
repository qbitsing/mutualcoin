export default function ({ store, redirect }) {
  if (!store.state.inversion) {
    return redirect('/panel/user/home')
  }
}
