$(function() {
    $('.collapsible-table__header').click(function() {
        $(this).parent().find('.collapsible-table__content').toggle();
        if($(this).parent().find('.collapsible-table__content:visible').length) {
            $(this).find('i.fa').addClass('fa-minus-square').removeClass('fa-plus-sqaure');
        }
        else {
            $(this).find('i.fa').addClass('fa-plus-square').removeClass('fa-minus-square');
        }
    })
});