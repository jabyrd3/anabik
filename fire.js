const fire = (base, headers) => {
  return {
    PUT: ()=>console.log('stub'),
    POST: (body) => {
      return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', base, true)
        xhr.setRequestHeader('Content-Type',
          'application/json;charset=UTF-8');
        headers.forEach(header=>xhr.setRequestHeader(header[0], header[1]))
        xhr.send(JSON.stringify(body));
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            res({
              status: xhr.status,
              response: xhr.response
            });
          } else if (xhr.readyState === 4 && (xhr.status === 500 || xhr
              .status === 404)) {
            rej(xhr.status);
          }
        };

      });
    },
    PATCH: ()=>console.log('stub'),
    GET: ()=>console.log('stub'),
  }
};
export default fire;
