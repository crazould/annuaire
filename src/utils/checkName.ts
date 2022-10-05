import { Contact } from "../App"

const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const checkName = (newName: string, contacts: Contact[]) =>{
  let msg
  const isExists = contacts.find(
    (c) => newName === `${c.first_name} ${c.last_name}`
  );
  if (isExists) msg = "name already used";
  if (specialChars.test(newName)) msg ="please don't use special characters"
  return msg
}

export default checkName