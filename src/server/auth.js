export const setUser = ({store}) => (req, res, next) => {
  const { token } = req.cookies

  res.locals.user = token && store.users.list({token})[0]
  next()
}

export const protect = (req, res, next) => {
  if (!res.locals.user) {
    res.status(301).send({message: 'not authenticated'})
    return
  }

  next()
}
