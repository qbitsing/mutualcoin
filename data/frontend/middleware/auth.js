export default function ({ store, redirect, route }) {
  const path = route.name.split('-')
  if (!store.state.authUser) {
    return redirect('/login')
  } else if (path[0] === 'panel') {
    if (path[1] === 'user' && store.state.authUser.admin) {
      return redirect(`/${path[0]}/admin/home`)
    } else if (path[1] === 'admin' && !store.state.authUser.admin) {
      return redirect(`/${path[0]}/user/home`)
    }
  }
}
