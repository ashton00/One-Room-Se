

module.exports = app => {
    class MerchantController extends app.Controller {

        * login() {
            const {ctx, service} = this;

            const body = ctx.request.body;
            const [phone,
                   password] = [
                                body.phone,
                                ctx.helper.sha1(body.password, this.config.salt)]
            const merchantInfo = yield service.merchant.login(phone, password);

            if(merchantInfo.length != 0) {
                const type   = "merchant-",
                      merchantId = merchantInfo[0].MerchantId;
                app.redis.set(type+merchantId, merchantInfo[0]);

                ctx.helper.sendData(200, merchantInfo, "登录成功");
                return ;
            } else {
                const isMerchantExist = yield service.merchant.findByPhone(phone);
                if(isMerchantExist.length == 1) {
                    ctx.helper.handleError(401, null, '登录失败，密码错误');
                } else{
                    ctx.helper.handleError(401, null, '登录失败，商户未注册');
                }
                return ;
            }


        }
        * register () {
            const {ctx, service} = this;

            const body = ctx.request.body;

            const [phone,
                   password,
                   realname,
                   email,
                   QQorWechat,
                   jobTitle,
                   company,
                   address,
                   zipCode,
                   description] = [
                       body.phone,
                       ctx.helper.sha1(body.password, this.config.salt),
                       body.realname,
                       body.email,
                       body.QQorWechat,
                       body.jobTitle,
                       body.company,
                       body.address,
                       body.zipCode,
                       body.description];
            try {
                const addMerchant = yield service.merchant.register(phone, password, realname, email, QQorWechat, jobTitle, company, address, zipCode, description);

                if(addMerchant.affectedRows == 0) {
                    ctx.helper.handleError(400, null, '注册商户失败');
                    return ;
                }
                ctx.helper.sendData(200, null, "注册成功");

            } catch(err) {
                ctx.helper.handleError(400, null, "当前商户已经存在");
                return ;
            }
        }

        * changePassword() {
            const {ctx, service} = this;
            const body = ctx.request.body;
            const [phone,
                   password] = [
                                body.phone,
                                ctx.helper.sha1(body.password)];
            try {
                const changeMerchantPassword = yield service.merchant.updatePswByMerchantId(password, phone);
                if(changeMerchantPassword) {
                    ctx.helper.sendData(200, null, "修改密码成功");
                    return ;
                }

                return ctx.helper.handleError(400, null, "修改密码失败");
            } catch(err) {
                ctx.helper.handleError(400, null, "商户不存在");
                return ;
            }
        }

    }
    return MerchantController;
}
