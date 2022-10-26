import { async } from '@firebase/util'
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'

export async function register(email, password) {
  try {
    const oUs = await createUserWithEmailAndPassword(
      getAuth(), email, password
    )
    return oUs.user
  }
  catch (err) {
    return err.code
  }
}
export async function login(email, password) {
  try {
    const oUC = await signInWithEmailAndPassword(getAuth(), email, password)
  }
  catch (error) {
    return error.code
  }
}
export async function logout() {
  await signOut(getAuth())
}