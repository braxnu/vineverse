export const login = ({store}) => (req, res) => {
  const { login, password } = req.body

  const user = store.users.list({
    login,
    password
  })[0]

  if (user) {
    user.token = 'abc'

    res.cookie('token', 'abc', {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 3600 * 24 * 30)
    })

    res.status(200).send(user)
  } else {
    res.status(301).send({message: 'not authenticated'})
  }
}
