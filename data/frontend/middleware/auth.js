export default function ({ store, error }) {
  const token = localStorage.getItem('token')
  if (!token) {
    this.$router.push('/login')
  }
}
