

/*

Copyright (c) 2009 Anant Garg (anantgarg.com | inscripts.com)

This script may be used for non-commercial purposes only. For any
commercial purposes, please contact the author at 
anant.garg@inscripts.com

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/

var windowFocus = true;
var username;
var chatHeartbeatCount = 0;
var minChatHeartbeat = 1000;
var maxChatHeartbeat = 33000;
var chatHeartbeatTime = minChatHeartbeat;
var originalTitle;
var blinkOrder = 0;

var chatboxFocus = new Array();
var newMessages = new Array();
var newMessagesWin = new Array();
var chatBoxes = new Array();
var idChats=[];
$(document).ready(function(){
	originalTitle = document.title;
	

	$([window, document]).blur(function(){
		windowFocus = false;
	}).focus(function(){
		windowFocus = true;
		document.title = originalTitle;
	});
});

function restructureChatBoxes() {
	align = 0;
	for (x in chatBoxes) {
		chatboxtitle = chatBoxes[x];

		if ($("#chatbox_"+chatboxtitle).css('display') != 'none') {
			if (align == 0) {
				$("#chatbox_"+chatboxtitle).css('right', '20px');
			} else {
				width = (align)*(225+7)+20;
				$("#chatbox_"+chatboxtitle).css('right', width+'px');
			}
			align++;
		}
	}
}

function chatWith(chatuser) {
	createChatBox(chatuser);
	$("#chatbox_"+chatuser+" .chatboxtextarea").focus();
}

function createChatBox(chatboxtitle,minimizeChatBox,id,ida) {
	if ($("#chatbox_"+id).length > 0) {
		if ($("#chatbox_"+id).css('display') == 'none') {
			$("#chatbox_"+id).css('display','block');
			restructureChatBoxes();
		}
		$("#chatbox_"+id+" .chatboxtextarea").focus();
		return;
	}

	$(" <div />" ).attr("id","chatbox_"+id)
	.addClass("chatbox")
	.html('<div class="chatboxhead" id="chatboxhead_'+id+'"><div class="chatboxtitle">'+chatboxtitle+'</div><div class="chatboxoptions"><a href="javascript:void(0)" onclick="javascript:toggleChatBoxGrowth(\''+id+'\')">-</a> <a href="javascript:void(0)" onclick="javascript:closeChatBox(\''+id+'\')">X</a></div><br clear="all"/></div><div class="chatboxcontent"></div><div class="chatboxinput"><textarea class="chatboxtextarea" onkeydown="javascript:return checkChatBoxInputKey(event,this,\''+id+'\');"></textarea></div>')
	.appendTo($( "body" ));
			   
	$("#chatbox_"+id).css('bottom', '0px');
	
	chatBoxeslength = 0;

	for (x in chatBoxes) {
		if ($("#chatbox_"+chatBoxes[x]).css('display') != 'none') {
			chatBoxeslength++;
		}
	}

	if (chatBoxeslength == 0) {
		$("#chatbox_"+id).css('right', '20px');
	} else {
		width = (chatBoxeslength)*(225+7)+20;
		$("#chatbox_"+id).css('right', width+'px');
	}
	
	chatBoxes.push(id);
        idChats[id]=ida;
        

	if (minimizeChatBox == 1) {
		
		minimize = 0;
	

		if (minimize == 1) {
			$('#chatbox_'+id+' .chatboxcontent').css('display','none');
			$('#chatbox_'+id+' .chatboxinput').css('display','none');
		}
	}

	chatboxFocus[id] = false;

	$("#chatbox_"+id+" .chatboxtextarea").blur(function(){
		chatboxFocus[id] = false;
		$("#chatbox_"+id+" .chatboxtextarea").removeClass('chatboxtextareaselected');
	}).focus(function(){
		chatboxFocus[id] = true;
		newMessages[id] = false;
		$('#chatbox_'+id+' .chatboxhead').removeClass('chatboxblink');
		$("#chatbox_"+id+" .chatboxtextarea").addClass('chatboxtextareaselected');
	});

	$("#chatbox_"+id).click(function() {
		if ($('#chatbox_'+id+' .chatboxcontent').css('display') != 'none') {
			$("#chatbox_"+id+" .chatboxtextarea").focus();
		}
	});

	$("#chatbox_"+id).show();
}

function chatHeartbeat(){

	var itemsfound = 0;
	
	if (windowFocus == false) {
 
		var blinkNumber = 0;
		var titleChanged = 0;
		for (x in newMessagesWin) {
			if (newMessagesWin[x] == true) {
				++blinkNumber;
				if (blinkNumber >= blinkOrder) {
					document.title = x+' says...';
					titleChanged = 1;
					break;	
				}
			}
		}
		
		if (titleChanged == 0) {
			document.title = originalTitle;
			blinkOrder = 0;
		} else {
			++blinkOrder;
		}

	} else {
		for (x in newMessagesWin) {
			newMessagesWin[x] = false;
		}
	}

	for (x in newMessages) {
		if (newMessages[x] == true) {
			if (chatboxFocus[x] == false) {
				//FIXME: add toggle all or none policy, otherwise it looks funny
				$('#chatbox_'+x+' .chatboxhead').toggleClass('chatboxblink');
			}
		}
	}
	

}

function closeChatBox(chatboxtitle) {
	$('#chatbox_'+chatboxtitle).css('display','none');
        restructureChatBoxes();



}

function toggleChatBoxGrowth(id) {
    $('#chatboxhead_'+id).removeClass('chatboxheadslope');
	if ($('#chatbox_'+id+' .chatboxcontent').css('display') == 'none') {  
		
		var minimizedChatBoxes = new Array();
		
		if (cookie('chatbox_minimized')) {
			minimizedChatBoxes = cookie('chatbox_minimized').split(/\|/);
		}

		var newCookie = '';

		for (i=0;i<minimizedChatBoxes.length;i++) {
			if (minimizedChatBoxes[i] != id) {
				newCookie += id+'|';
			}
		}

		newCookie = newCookie.slice(0, -1)


		cookie('chatbox_minimized', newCookie);
		$('#chatbox_'+id+' .chatboxcontent').css('display','block');
		$('#chatbox_'+id+' .chatboxinput').css('display','block');
		$("#chatbox_"+id+" .chatboxcontent").scrollTop($("#chatbox_"+id+" .chatboxcontent")[0].scrollHeight);
	} else {
		
		var newCookie = id;

		if (cookie('chatbox_minimized')) {
			newCookie += '|'+cookie('chatbox_minimized');
		}


		cookie('chatbox_minimized',newCookie);
		$('#chatbox_'+id+' .chatboxcontent').css('display','none');
		$('#chatbox_'+id+' .chatboxinput').css('display','none');
	}
	
}

function checkChatBoxInputKey(event,chatboxtextarea,id) {
	$('#chatboxhead_'+id).removeClass('chatboxheadslope'); 
        
	if(event.keyCode == 13 && event.shiftKey == 0)  {
		message = $(chatboxtextarea).val();
		message = message.replace(/^\s+|\s+$/g,"");

		$(chatboxtextarea).val('');
		$(chatboxtextarea).focus();
		$(chatboxtextarea).css('height','44px');
		if (message != '') {
                    var msj='<xml><u>'+user+'</u><op>chat</op><data><m>em</m><msg>'+message+'</msg><ct>'+id+'</ct><idc>'+idChats[id]+'</idc></data></xml>';
                    canalNotificaciones.emit("nuevoMsg",{c:idChats[id],msj:msj,u:user,s:idS});
		
				//message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
				
		}
		chatHeartbeatTime = minChatHeartbeat;
		chatHeartbeatCount = 1;

		return false;
	}

	var adjustedHeight = chatboxtextarea.clientHeight;
	var maxHeight = 94;

	if (maxHeight > adjustedHeight) {
		adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);
		if (maxHeight)
			adjustedHeight = Math.min(maxHeight, adjustedHeight);
		if (adjustedHeight > chatboxtextarea.clientHeight)
			$(chatboxtextarea).css('height',adjustedHeight+8 +'px');
	} else {
		$(chatboxtextarea).css('overflow','auto');
	}
	 
}

function showMessage(us,msg,ct,id){
    if(idChats[ct]==null || ($('#chatbox_'+ct).css('display') == 'none')   ){
        var title=new String(id).replace(';','-');
        createChatBox(title,1,ct,id);
        var newCookie = ct;

		if (cookie('chatbox_minimized')) {
			newCookie += '|'+cookie('chatbox_minimized');
		}


		cookie('chatbox_minimized',newCookie);
		$('#chatbox_'+ct+' .chatboxcontent').css('display','none');
		$('#chatbox_'+ct+' .chatboxinput').css('display','none');
    }
    
    if ($('#chatbox_'+ct+' .chatboxcontent').css('display') == 'none') 
      $('#chatboxhead_'+ct).addClass('chatboxheadslope');
 
    var  usr=us;
    if(us==user)
        usr='Yo';

    

    $("#chatbox_"+ct+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+usr+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+msg+'</span></div>');
    $("#chatbox_"+ct+" .chatboxcontent").scrollTop($("#chatbox_"+ct+" .chatboxcontent")[0].scrollHeight);
		
}

