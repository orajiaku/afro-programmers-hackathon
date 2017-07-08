/**
 * Created by orajiakuchukwudalu on 2017-07-08.
 */
'use strict';

function onCommentClick() {

}

function sendComment() {
    if ( $(".commentInput").val() ) {
        $(".media-list").append(
            '<li class="media">\
                <div class="media-left">\
                    <a href="#">\
                        <img class="media-object" src="https://tse2.mm.bing.net/th?id=OIP.Cybqo9gwLjeOX9WO8CZgbQDLEy&w=199&h=300&c=8&qlt=90&o=4&pid=1.7" alt="...">\
                    </a>\
                </div>\
                <div class="media-body">\
                    <h4 class="media-heading">'+$(".commentInput").val()+'</h4>\
                </div>\
            </li>'
        );
    }
}

function hideComments() {
    $( ".commentsView" ).hide();
}

function showComments() {
    $( ".commentsView" ).show();
}

function appendComment() {

}