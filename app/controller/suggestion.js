

module.exports = app => {
    class suggestionsController extends app.Controller {
        * create() {
            const {ctx, service} = this;
            const body = ctx.request.body;
            const [name,
                   phone,
                   description] = [body.name,
                                   body.phone,
                                   body.description]

            const isAddSuccess = yield service.suggestion.add(name, phone, description);
            if(isAddSuccess.affectedRows == 1) {
                ctx.helper.sendData(200, null, '提交建议成功');
                return ;
            } else {
                ctx.helper.handleError(401, null, '提交建议失败')
                return ;
            }
        }

        * retrives() {
            const {ctx, service} = this;
            const phone = ctx.query.phone;
            const suggestions = yield service.suggestion.findByPhone(phone);

            if(suggestions.length != 0) {
                ctx.helper.sendData(200, suggestions, "获取用户建议信息成功");
                return ;
            } else {
                ctx.helper.handleError(401, null, "获取用户建议信息失败");
                return ;
            }
        }

        * retrivesOneSug() {
            const {ctx, service} = this;
            const sugId = ctx.params.id;
            const suggestion = yield service.suggestion.findById(sugId);

            if(suggestion.length != 0) {
                ctx.helper.sendData(200, suggestion[0], '获取建议信息成功');
                return ;
            } else {
                ctx.helper.handleError(401, null, "获取建议信息失败");
                return ;
            }
        }
    }
    return suggestionsController;
}
