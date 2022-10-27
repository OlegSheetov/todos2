import { async } from '@firebase/util'
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, push, set, get, query } from "firebase/database"
import { remove } from 'firebase/database'
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
export async function add(user, deed) {
  const oRef = await push(
    ref(getDatabase(), `users/${user.uid}/todos`) // getDatabase получает базу дел ,
    // а второй прараметр создает путь по которому  будет храниться  коллекция дел. 
  )// реф возвращает обьект ссылки(ссылку) указывающай на этот путь. 
  await set(oRef, deed)// сэт берет ссылку и добавляет дело 
  const oSnapshot = await get(query(oRef))//гет берет это дело , а querry пруобразует ссылку в запрос
  const oDeed = oSnapshot.val() // вал преобразует ссылку в обьект дела 
  oDeed.key = oRef.key // ключ обьекта дела равен ключу обьекта ссылки 
  return oDeed
}
export async function getList(user) {
  const oSnapshot = await get(query(ref(getDatabase(), `user/${user.uid}/todos`)))
  const oArr = []
  let oDeed
  oSnapshot.forEach((oDoc) => {
    oDeed = oDoc.val()
    oDeed.key = oDoc.key
    oArr.push(oDeed)
  })
  return oArr
}
export async function setDone(user, key) {
  return set(ref(getDatabase() , `users/${user.uid}/todos/${key}/done`) , true)// назначает true по ссылке. 
}

export function del(user, key) {
  return remove(ref(getDatabase() , `user/${user.uid}/todos/${key}`))
}