// ==UserScript==
// @name            SidebarBtn.uc.js
// @description     侧边栏按钮以及功能增强
// @include         chrome://browser/content/browser.xul
// @charset         UTF-8
// @author          NightsoN 
// @note            从lastdream2013版的SidebarMod.uc.js修改而来，去除了某些我用不到的站点以及Splitter
                    //添加工具栏按钮，左键：侧栏历史 中键：侧栏书签 右键：附加组件
// ==/UserScript==
(function() {
    if (!document.getElementById('sidebar-box')) return;
	if (!window.SidebarMod) {
		window.SidebarMod = {
			sitelist:[{
				name: '书签',
				url: 'chrome://browser/content/bookmarks/bookmarksPanel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHCSURBVDhPlZE/SBxBFMY/olHEgFUStNVODKSSIAiBFJKApZAiYqWNWGqhYCPEO+90V43cYlC880BPFOz8U9hZKSEkpLFJYhEQNIfnzs4bYSZvLmNEPPTywQ/evPd9j9lZ3CXaQBfz1h3/T3oVNWoDOWbN1q5dvjj4Qq3jqAjXrl2eTICHKocRsQZlsbXtufH90hnU0wr21AqMxda258Y3pfOHTbTf06KW0SYz6KQsupmYWAKpLC9gRAaSlvGeeXeZxWu13dqqTz816/yXRtASfJHGuUqzuUzEAnSUxm/OetDfxuppAX44D0GLfN0ycN4ZfRhrKH6GMaMPonn0yxRO6COb7sB65GLtgM0Uw1cqvnyAPgrwkzEl+YAfKoVecxCU/iMXKX79WezSHJtLs12YwxNnvy3y8Vz4+EozbC6BmMZnvsUzZ78tOYVO4SFPHgeYMIFC6OHi6hx5OJWTeOPsN2VGUSmTGAnj0BwMKYktNYX2KImXNIkd27MzXjBojKlwsWuZWTyiODYpge9yAkPax2M3QsHDU5nAMM+OaQI5rX/VutG1zDjqZAypKI5XfJsq1/4nXljNsw4ZR2DOzur+doE/oEdo9V5pyj4AAAAASUVORK5CYII='
			},
			{
				name: '历史',
				url: 'chrome://browser/content/history/history-panel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH7SURBVDhPhVI9a9tQFBUeO4YOwZTSH+Ch1I2esIdi10jvPYsMmTLkH5Sm9lI8FIsOHUsU+gOMKSGEBNwiB5K9xJbdQJYQYtWIYEonL82HBhNe7316LnbT2AcOsu5759xzr6zdB+FoibPlTPL6OJMUQkuo8nwEtvGsx/TtgOuXASci6hripkMuoy7ZufaXnqtr/0eP69UeI7coDBjpH7JseLKXDW+6RhgbGbdg9F5dj3FeNAryyck7KeR6GHCDYs2y6JZpss/4O+rq5oRRFWsS0PEXRD4G4QjFOLc6mjJAXPlLi2iCSa78zFNZhK6tuDMRMELwo0hWcYF49q8BIvINiimAcR2EW2MDxcO+nX5sWdYT06TnlsXOKKWP5GWFeBQylC89Tj6gEEa5gD2syCIAujdALJCQ4hRYi8lp1CENTPH7e/ohGqyhyU87/UBpJUC4O2mA4yAhDc81aSPfhPqBuaCu3wXGHu+Ac76oyhJ5j4U5j8UjIF59+pYsua2N8uaR/Hyz8HKf2dg936R1VdK0dbeTeuO2R6WN1uD1ZntqYZMofCkkofsAOHrhFVOqHKPktt8CBZqsu77tOOLv/99xnETOo1yKoTvsoKKOpgFjVGQSZQT0QPAVBBcyNnS+VzwGjgNGdTAaopHsCAsD1u7Enofyx6OFmZ9K07Q/7iAmIuxhVMIAAAAASUVORK5CYII='
			},
			{
				name: '附加组件',
				url: 'chrome://mozapps/content/extensions/extensions.xul',
				favicon: "chrome://mozapps/skin/extensions/extensionGeneric-16.png#-moz-resolution=16,16"
			},
			{
				name: '谷歌翻译',
				url: 'http://translate.google.de/#auto/zh-CN/',
				favicon: 'http://translate.google.de/favicon.ico'
			},
			{
				name: '豆瓣电台',
				url: 'http://douban.fm/partner/sidebar',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKySURBVDhPpVJNSBtBFN7WQ6FQKIReemhBKCL04qFUFDFas5pkk12TXTc21p80qQaTCv4RazWbxEOoUBPjGlc02BA1teaQUlJEivRSL948lJyL50KhaBMzr7PrVmmt9NAPPt43s/O+efP2ERcBAC6p8t8YGhq6PTY29qC/v1+jbp3C7/df5jiuDMuLDb1e742mpiZPO8/HR0dHQ5OTk/zAwMB9n8/3m+HGxkaZbChT3TqP8vLyWxUVFXatVjvudDoHXS6Xc3h4mMSG19Uj55FOp+/m8/nura2tDlEU+flYjEomk9bt7e2JXC63ub6+9ml5eXkvlUoldnY+uHd3dy2SJF1V0wkiGAyuZbNvQVqQjl9n38Grj3uwlkrBykryaHFx5Ws8Lh1K0iLMzYkwMxOFXO596eDgy4toNHpFMXC73Zse71NEUVTB1N0L956/RBaTGbg2G3AcDyzLg8FAHet05LFW21j0+wXY39/PV1VV3VQM+vr63jwbn0CP7B2F7kEfosJLyNXjQE963ain5zHi+XbEcTZksz1EFgtXFIQgymTSn3GvTgw8Hs8m7gNEItGiKM6DGF8AEZeL+4HLnoMYphwjkQjCZZdWV1dRIpFYwgbXFAO73Z7BVYDZbC5arVZgrRaQ4xlZhTRDl0wmE0xPTxe6urpalGQZeFAUg9ZWpog1fvcfZE9iG8chhqFROBwudnZ2tqrpBEHTdMbhcCAjZSwwDINoWiaNDzNKgryWNW5yyWA0IkEQiizLnhno9fqszWaD+vr6EkmSQDbrQI46WZPNiiZ1siahoaEBRkZGEH4uq6YTBH5XanZ29kcgEPg+NTV1KASEI3yLysCpDoVCh3iMj2Kx2Dc8+gY1nSAqKyvv4Nup2tpafXV1dUtNTY3hb/z1ra6urlGj0Zz8gf8DQfwE+1lqxfLEhu8AAAAASUVORK5CYII='
			},
			{
				name: '百科',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANHSURBVDhPhZJdSJNRGMdXCQVFH0QGUURg1kWQNxFGF3VVVARRRnVRkJQxdTan++qdQ9MlxsCkbei2nHNbzNTmx2uzNd61MdP5tensY27vnKum7f3aNIlsvp2JmVTSH87NOf/nd57znD/jf6Jpeh3lNaZhA8oSvFfai1uKB0j45rsYwnfPRDxlS7a/BQrXzPidqZhHL8T6ZAjWr6zD3for08O6DGysOZtqz/LGXdXji2YEQVL8fn8qKEqhafHaBffDo3Tw+QlyrFUXHVCrp98jp6cCgZ2LZqAkPGpm3acsd9Bk8SaFQlEpk8k6DAbDrgXTqQMJ/f6xBHzePTvZkz001H8DnHe3tbU99vl8638BcAu7gkIEKEMikWwvKChws9lsv9FoTPvR/+BaQrs7nmg9Hlr4CKfr9fpCFotFNzQ0IJFIZGMSQJLBrdQrNkK46/uXARwOJ/DW2cQk3na4Yn0PmwhnFZ8MBrc2NjYuArRabZ/Vaj0Mw3B62GO6RL3MDZITzoplQMk97myoRzXcpK/DhEJhpLy83A2K0n4BxGLxNz6f/xmsT7D8NjZhFtriZPjSbwCfNedzdZSDtz7l8XgU2IvU1NQcTALy8/NpkQiiamtr+55Ul1AGYSZddV8wPv7By1k5AxTcuM9ut+8QCASOlYBkBxqNxj49bj8dtfLQxuqimby8vITD8drFsLTWpXOL7qLJIYKf2AMgG0EHtj8BxqcNPtwGIVGbSKnRqJtzc5k0DHegjLBDViXhZc+zCwtXBbBZTNosz/lOOiVvPgdcR6RSaQuTyUwgiKWX8ckm8VeKOTSXy412dXUdXwmQy+WH2puelKmFp2iT9HLUajYp6+vrlWCQsxAEEaOjg2UMrJsVUClqvhYXF//Q6XRSANlcWlqKiCCIfOcwSAOm3EkldGH+noA7B8AJDqcwIRKJpkDoBDgePsug2i94R3vhShCUWyCVGaFQaNugo7PC21k5+cXCiU0gjzR6rfq62Wy+qFKpbiV9IA/HgHcDSYZPMmIt50Yoc84I6dGWYS5FCYHwjcQL5hRpKbDhI8+yCCKwJZm+f2kREB/RCmbar/jjLWfQWOdVlLKJ3YTHABHo4N4l36rC8Y+ZPwEZMzc3tRZqkgAAAABJRU5ErkJggg==',
				childs: [
					{
						name: '维基百科',
						url: 'http://zh.m.wikipedia.org/',
						favicon: 'http://de.wikipedia.org/favicon.ico'
					},
					{
						name: '百度百科',
						url: 'http://wapbaike.baidu.com/',
						favicon: 'http://www.baidu.com/favicon.ico'
					},
					{
						name: '互动百科',
						url: 'http://3g.baike.com/',
						favicon: 'http://www.baike.com/favicon.ico'
					},
					{
						name: '糗事百科',
						url: 'http://wap2.qiushibaike.com/',
						favicon: 'http://www.qiushibaike.com/favicon.ico'
					}
				]
			}],
			makeButton: function (sitelist, parent) {
				var i,
					len = sitelist.length,
					item,
					btn,
					menu,
					menupopup,
					menuitem,
					frag = document.createDocumentFragment();
					insertpoint = document.querySelector('#sidebar-header .tabs-closebutton');
				for (i = 0; i < len; i++) {
					item = sitelist[i];
					if (item.childs) {
						if (!parent) {
							btn = frag.appendChild(document.createElement('toolbarbutton'));
							btn.setAttribute('tooltiptext', item.name);
							btn.setAttribute('type', 'menu');
							btn.setAttribute('style', 'list-style-image: url("' + item.favicon + '")');
							menupopup = btn.appendChild(document.createElement('menupopup'));
							SidebarMod.makeButton(item.childs, menupopup);
						} else {
							if (item === 'sep') {
								parent.appendChild(document.createElement('menuseparator'));
							} else {
								menu = parent.appendChild(document.createElement('menu'));
								menu.setAttribute('label', item.name);
								menu.setAttribute('class', 'menu-iconic');
								menu.setAttribute('style', 'list-style-image: url("' + item.favicon + '")');
								menupopup = menu.appendChild(document.createElement('menupopup'));
								SidebarMod.makeButton(item.childs, menupopup);
							}
						}
					} else if (parent) {
						if (item === 'sep') {
							parent.appendChild(document.createElement('menuseparator'));
						} else {
							menuitem = parent.appendChild(document.createElement('menuitem'));
							menuitem.setAttribute('label', item.name);
							menuitem.setAttribute('tooltiptext', item.name);
							menuitem.setAttribute('url', item.url);
							menuitem.setAttribute('class', 'menuitem-iconic');
							menuitem.setAttribute('src', item.favicon);
							menuitem.setAttribute('oncommand', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
						}
					} else {
						btn = frag.appendChild(document.createElement('toolbarbutton'));
						btn.setAttribute('tooltiptext', item.name);
						btn.setAttribute('style', 'list-style-image: url("' + item.favicon + '")');
						btn.setAttribute('url', item.url);
						btn.setAttribute('onclick', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
					}
				}
				insertpoint.parentNode.insertBefore(frag, insertpoint);
			},

			modifySidebarClickBehaviour: function () {
				var sidebar = document.getElementById('sidebar');
				sidebar.addEventListener('DOMContentLoaded', function(){
					if (sidebar.contentDocument){
						sidebar.removeEventListener('DOMContentLoaded', arguments.callee, false);
						var wpb = sidebar.contentDocument.getElementById('web-panels-browser');
						if (wpb) {
							wpb.onclick = null;
						}
					}
				}, false);
				
				eval("window.asyncOpenWebPanel = " + window.asyncOpenWebPanel.toString().slice(0, -1) + 
					'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
					'if (wpb) wpb.onclick = null;' + '}'
				);
				
				eval("window.openWebPanel = " + window.openWebPanel.toString().slice(0, -1) + 
					'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
					'if (wpb) wpb.onclick = null;' + '}'
				);
			},
			init: function() {
				this.makeButton(this.sitelist);
				this.modifySidebarClickBehaviour();
			}
		};
		
		SidebarMod.init();
	}
	//添加工具栏按钮
	(function() {
		var SidebarBtn = document.createElement("toolbarbutton");
		SidebarBtn.id = "Sidebar-button";
		SidebarBtn.setAttribute("type", "button");
		SidebarBtn.setAttribute("onclick", "toggleSidebar('viewHistorySidebar');");
		SidebarBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		SidebarBtn.setAttribute("label","侧栏");
		SidebarBtn.setAttribute("tooltiptext","左键：侧栏历史\n中键：侧栏书签\n右键：附加组件");
		SidebarBtn.addEventListener("click",
			function(event) {
				if (event.button == 2) {
					event.preventDefault();
					event.stopPropagation();
					openWebPanel('附加组件', 'chrome://mozapps/content/extensions/extensions.xul');
				} 
				else if(event.button == 1){
					toggleSidebar('viewBookmarksSidebar');
				}
			},
			false);
		SidebarBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB8SURBVDhPtZM7CoAwEET3jF7AVoO9WtlY2ntcJTCSOCMki/pgC+eHCNonhHk9mnZwXeygbvYUqDnU0wAei/w3EKbyt8gzqKeBvmIgz6Cur7Rs+z1AFAckQIjPggQI8VmQACE+CxIgxGdBAoT4l+A91M260f8zxQ7qbzA7AciyENfiut1TAAAAAElFTkSuQmCC)";
		
		document.getElementById("nav-bar").insertBefore(SidebarBtn, document.getElementById("urlbar-container"));
	})();
})();
