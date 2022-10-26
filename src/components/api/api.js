import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'


export async function register(email, password) {
  try {
    const oUs = await createUserWithEmailAndPassword(
      getAuth(), email , password
    )
    return oUs.user
  }
  catch (err) {
    return err.code
  }
}