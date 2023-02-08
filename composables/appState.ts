export const useAppState = () => {
  const isInEditor = useState('inEditor', () => false)
  const isLoaded = useState('inLoaded', () => false)
  const isWaiting = useState('isWaiting', () => false)
  const isAuth = useState('isAuth', () => true)

  return { isInEditor, isLoaded, isWaiting, isAuth }
}
