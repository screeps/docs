
hexo.extend.helper.register('is_ptr', function() {
    return process.env.IS_PTR === "1";
});

hexo.extend.helper.register('is_season', function() {
    return process.env.IS_SEASON === "1";
});