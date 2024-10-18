import { LS_USER_DATA_KEY } from "./constants";

export function addDataToLS(key, data) {
 localStorage.setItem(key, JSON.stringify(data));
}
export function getDataFromLS(key) {
 const data = localStorage.getItem(key);
 if (data) {
  return JSON.parse(data);
 } else {
  return null;
 }
}
export function removeDataFromLS(key) {
 localStorage.removeItem(key);
}
export function clearAllDataFromLS() {
 localStorage.clear();
}

export function getUserID() {
 const data = getDataFromLS(LS_USER_DATA_KEY)
 if (data) {
  return data['user_id'];
 } else {
  return null; 
 }
}
export function getUserName() {
 const data = getDataFromLS(LS_USER_DATA_KEY)
 if (data) {
  return data['user_name'];
 } else {
  return null; 
 }
}
export function getLoginName() {
 const data = getDataFromLS(LS_USER_DATA_KEY)
 if (data) {
  return data['login_name'];
 } else {
  return null; 
 }
}
export function getRoleID() {
 const data = getDataFromLS(LS_USER_DATA_KEY)
 if (data) {
  return data['role_id'];
 } else {
  return null; 
 }
}
