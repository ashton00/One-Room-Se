
module.exports = {

    handleError(status, err, msg) {
        const res = this.ctx.response;
        const time = new Date();
        let stack = undefined;

        if(err) {
            console.error(err.stack);
            if(process.env.NODE_ENV !== 'production') {
                stack = err.stack;
            }
        }
        
        res.status = status;
        res.body = {
            time,
            msg,
            stack
        };
    },

    sendData(status, data, msg) {
        const res = this.ctx.response;
        const time = new Date();
        res.status = status;
        res.body = {
            time,
            data,
            msg
        };
    },

    debug(...info) {
        console.log(...info);
    }

};
