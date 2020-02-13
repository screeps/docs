
hexo.extend.helper.register('is_ptr', function() {
    return process.env.IS_PTR === "1";
});