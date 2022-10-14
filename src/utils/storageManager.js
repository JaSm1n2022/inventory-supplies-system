/**
 * get user from localStorage
 * @returns {String} - auth token
 */
 import StorageUtil from './storageUtil';
 export const getUser = (): ?Object => {
   const token = StorageUtil.getUser()
   return token;
 };
 
 /**
  * set user to the localStorage
  * @param {user} user - user object
  * @returns {Undefined} -
  */
 export const setUser = (user: Object) => {
   StorageUtil.setUser(user);
 }
 
 /**
  * delete user from the localStorage
  * @returns {Undefined} undefined
  */
 export const removeUser = () => {
   StorageUtil.removeUser();
 };
 
 /**
  * get auth token from localStorage
  * @returns {String} - auth token
  */
 export const getAuthToken = (): ?string => {
   const token = StorageUtil.getToken();
   
   return token;
 };
 
 /**
  * delete auth token from the localStorage
  * @returns {Undefined} undefined
  */
 export const removeAuthToken = () => {
   StorageUtil.removeToken();
 };
 
 /**
  * set auth token to the localStorage
  * @param {String} token -
  * @returns {Undefined} undefined
  */
 export const setAuthToken = (token: string) => {
   if (token === null) return removeAuthToken();
   StorageUtil.setToken(token);
   return undefined;
 };
 
 /**
  * remove dashboard id from storage
  * @param {String} id -
  * @returns {Undefined} undefined
  */
 export const removeDashboardExists = () => {
   StorageUtil.removeDExist();
 };
 
 /**
  * set dashboard exists to the localStorage
  * @param {Boolean} exists -
  * @returns {Undefined} undefined
  */
 export const setDashboardExists = (exists: boolean) => {
   if (exists === null) return removeDashboardExists();
   StorageUtil.setDExists(exists);
   return undefined;
 };
 
 /**
  * @returns {Boolean} -
  */
 export const getDashboardExists = () => {
   const id = StorageUtil.getDExist();
   return id;
 };
 
 export default {
   getAuthToken,
   setAuthToken,
   getDashboardExists,
   setDashboardExists,
   removeAuthToken,
   removeDashboardExists
 };
 