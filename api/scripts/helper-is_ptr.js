
hexo.extend.helper.register('is_ptr', function() {
    try {
        require('../../.ptr');
        return true;
    }
    catch(e) {
        return false;
    }
});