/**
 * @param {Binary} file - file
 * @param {String} signedUrl - url from back-end
 * @returns {Undefined} -
 */
export const uploadFile = (file, signedUrl) => new Promise((res, rej) => {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedUrl);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        res(200);
      } else {
        rej(xhr);
      }
    }
  };
  xhr.setRequestHeader('Content-Type', 'application/octet-stream');
  xhr.send(file);
});
