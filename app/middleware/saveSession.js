

/**
 * 延长Session时间
 * 每次操作都会重新延长Session的过期时间，只有长时间未操作才会登出
 */
module.exports = () => {
  return function* (next) {
    yield next;
    // 如果 Session 是空的，则不保存
    if (!this.session.populated) return;
    this.session.save();
  };
};
