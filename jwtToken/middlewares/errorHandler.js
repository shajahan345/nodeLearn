const errorHandler = (err, req, re, next) => {
    console.log(err.msg);
};
export { errorHandler }