const browserAppData = this.browser || this.chrome;
const tabs = {};
const inspectFile = 'js/inspect.js';
const inspectSubFile = 'js/inspectSub.js';
const activeIcon = 'active_48.png';
const defaultIcon = 'inactive_48.png';

const inspect = {
    toggleActivate: (id, type, icon) => {
        this.id = id;
        browserAppData.tabs.executeScript(id, { file: inspectFile }, () => { browserAppData.tabs.sendMessage(id, { action: type, href: Href }); });
        browserAppData.browserAction.setIcon({ tabId: id, path: { 48: 'icons/' + icon } });
    },
    sendxpath: (id, DesignerXPath) => {
        this.id = id;
        browserAppData.tabs.executeScript(id, { file: inspectFile }, () => { browserAppData.tabs.sendMessage(id, { xpath: DesignerXPath }); });
    },
    sendxpathmultiple: (id, DesignerXPath, isTable) => {
        this.id = id;
        browserAppData.tabs.executeScript(id, { file: inspectFile }, () => { browserAppData.tabs.sendMessage(id, { xpathMultiple: DesignerXPath, isTable: isTable }); });
    },
    sendselector: (id, DesignerSelector) => {
        this.id = id;
        browserAppData.tabs.executeScript(id, { file: inspectFile }, () => { browserAppData.tabs.sendMessage(id, { selector: DesignerSelector }); });
    },
    sendselectormultiple: (id, DesignerSelector, isTable) => {
        this.id = id;
        browserAppData.tabs.executeScript(id, { file: inspectFile }, () => { browserAppData.tabs.sendMessage(id, { selectorMultiple: DesignerSelector, isTable: isTable }); });
    },
    sendData: (id) => {
        this.id = id;
        browserAppData.tabs.executeScript(id, { file: inspectFile }, () => { browserAppData.tabs.sendMessage(id, { action: 'getData' }); });
    },
    sendIsPause: (id, isPause) => {
        this.id = id;
        browserAppData.tabs.executeScript(id, { file: inspectFile }, () => { browserAppData.tabs.sendMessage(id, { isPause: isPause }); });
    },
    sendQueryToTopScript: (id, query, msg) => {
        this.id = id;
        browserAppData.tabs.executeScript(id, { file: inspectFile }, () => { browserAppData.tabs.sendMessage(id, { query: query, textMsg: msg }); });
    },
    sendTextInfo: (id, DiagonalType) => {
        this.id = id;
        browserAppData.tabs.executeScript(id, { file: inspectFile }, () => { browserAppData.tabs.sendMessage(id, { diagonalType: DiagonalType }); });
    },
    sendExtensionSelectMode: (id, mode) => {
        this.id = id;
        browserAppData.tabs.executeScript(id, { file: inspectFile }, () => { browserAppData.tabs.sendMessage(id, { selectMode: mode }); });
    },
    drawSelectedObject: (id, selectedAction, init) => {
        this.id = id;
        browserAppData.tabs.executeScript(id, { file: inspectFile }, () => { browserAppData.tabs.sendMessage(id, { action: selectedAction, init: init, multiSelectFullSrc: MultiSelectFullSrc, href: Href }); });
    },
	noticeStateMode: (id, stateMode, multiSelectFullSrc, multiSelectSrc, multiSelectSearchSrc) => { // stateMode : normal, readOnly, hide
        this.id = id;
        browserAppData.tabs.executeScript(id, { file: inspectFile }, () => { browserAppData.tabs.sendMessage(id, { stateMode: stateMode, multiSelectFullSrc: multiSelectFullSrc, multiSelectSrc: multiSelectSrc, multiSelectSearchSrc: multiSelectSearchSrc }); });
    },
};

function isSupportedProtocolAndFileType(urlString) {
    if (!urlString) { return false; }
    const supportedProtocols = ['https:', 'http:'];
    const notSupportedFiles = ['xml', 'pdf', 'rss'];
    const extension = urlString.split('.').pop().split(/\#|\?/)[0];
    const url = document.createElement('a');
    url.href = urlString;
    return supportedProtocols.indexOf(url.protocol) !== -1 && notSupportedFiles.indexOf(extension) === -1;
}

function toggle(tab) {
    if (isSupportedProtocolAndFileType(tab.url)) {
        if (!tabs[tab.id]) {
            tabs[tab.id] = Object.create(inspect);
            inspect.toggleActivate(tab.id, 'activate', activeIcon);
        } else {
            inspect.toggleActivate(tab.id, 'deactivate', defaultIcon);
            for (const tabId in tabs) {
                if (tabId == tab.id) delete tabs[tabId];
            }
        }
    }
}

function deactivateItem(tab) {
    if (tab[0]) {
        if (isSupportedProtocolAndFileType(tab[0].url)) {
            for (const tabId in tabs) {
                if (tabId == tab[0].id) {
                    delete tabs[tabId];
                    inspect.toggleActivate(tab[0].id, 'deactivate', defaultIcon);
                }
            }
        }
    }
}

function getActiveTab() {
    browserAppData.tabs.query({ active: true, currentWindow: true }, tab => { deactivateItem(tab); });
}

var WS = null;
var IsSocketOpened = false;
var lastActivateTabId = -1;
var IsExtensionRunning = false;
var lastFocusWindowId = -1;
var DesignerXPath = '';
var DesignerSelector = '';
var IsUseXPath = false;
var IsMultiple = false;
var IsIFrame = false;
var IsTable = false;
var DiagonalType = '';
var IsPause = false;

var SelectMode = 'single'; //single, multiple, form

var Monitoring = 
{
	isReadOnlyModeVal: false,
	get isReadOnlyMode() {
		return this.isReadOnlyModeVal;
	},
	set isReadOnlyMode(value) {
		if (this.isReadOnlyModeVal == value)
			return;
		
		this.isReadOnlyModeVal = value;
		
		if (value == false) {
			MultiSelectFullSrc = '';
			MultiSelectSrc = '';
			MultiSelectSearchSrc = '';
		}
		
		chrome.tabs.query({ }, function (tabs) {
			tabs.forEach(tab => {
				inspect.noticeStateMode(tab.id, value == true ? 'readOnly' : 'normal', MultiSelectFullSrc, MultiSelectSrc, MultiSelectSearchSrc);
			});
		});
	},
	
	isHideModeVal: false,
	get isHideMode() {
		return this.isHideModeVal;
	},
	set isHideMode(value) {
		if (this.isHideModeVal == value)
			return;
		
		this.isHideModeVal = value;
		if (value == false) {
			MultiSelectFullSrc = '';
			MultiSelectSrc = '';
			MultiSelectSearchSrc = '';
		}
		
		chrome.tabs.query({ }, function (tabs) {
			tabs.forEach(tab => {
				inspect.noticeStateMode(tab.id, value == true ? 'hide' : 'normal', MultiSelectFullSrc, MultiSelectSrc, MultiSelectSearchSrc);
			});
		});
	}
}


var MultiSelectFullSrc = '';
var MultiSelectSrc = '';
var MultiSelectSearchSrc = '';

var Href = '';
var FullURL = '';
var URL = '';
var SearchURL = '';
var port = '';

function connect() {
    if (!IsSocketOpened) {
        loadPort();

        WS = new WebSocket('ws://localhost:' + port + '/IPASocket');

        WS.onopen = function () {
            WS.send(JSON.stringify({ SocketOpen: true }));
            IsSocketOpened = true;
        };

        WS.onmessage = function (e) {
			SetActionMessage(e);
            SetOptionMessage(e);
			SetModeMessage(e);
			SetDiagonalMessage(e);
        };

        WS.onclose = function () {
            if (IsExtensionRunning) {
                deactivateExtension();
            }
            if (IsSocketOpened) {
                WS.close();
            }

            IsSocketOpened = false;
            IsExtensionRunning = false;
        };

        WS.onerror = function () {
            if (IsExtensionRunning) {
				deactivateExtension();
            }
            if (IsSocketOpened) {
				WS.close();
            }
			
            IsSocketOpened = false;
            IsExtensionRunning = false;
        };
    }
}

function SetActionMessage(e) {
	if (e.data == 'run') {
		activateExtension();
		IsExtensionRunning = true;
	} else if (e.data == 'stop') {
		deactivateExtension(null, true);
		IsExtensionRunning = false;
		IsPause = false;
	} else if (e.data == 'wait') {
		deactivateExtension();
		IsExtensionRunning = false;
	} else if (e.data == 'sleep') {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
			inspect.toggleActivate(tab[0].id, 'sleep', defaultIcon);
		});
	} else if (e.data == 'close') {
		deactivateExtension(null, true);
		WS.close();
		IsSocketOpened = false;
		IsExtensionRunning = false;
	}
}

function SetOptionMessage(e) {
	if (e.data == 'initOption') {
		DiagonalType = '';
		SelectMode = 'single';
		Monitoring.isReadOnlyMode = false;
		Monitoring.isHideMode = false;
		chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
			inspect.toggleActivate(tab[0].id, 'initialize', defaultIcon);
		});
	} else if (e.data.startsWith('xpath?')) {
		DesignerXPath = e.data.substring(6);
		IsUseXPath = true;
		IsMultiple = false;
	} else if (e.data.startsWith('xpathMultiple?')) {
		DesignerXPath = e.data.substring(14);
		IsUseXPath = true;
		IsMultiple = true;
	} else if (e.data.startsWith('selector?')) {
		DesignerSelector = e.data.substring(9);
		IsUseXPath = false;
		IsMultiple = false;
	} else if (e.data.startsWith('selectorMultiple?')) {
		DesignerSelector = e.data.substring(17);
		IsUseXPath = false;
		IsMultiple = true;
	} else if (e.data == 'table') {
		IsTable = true;
	} else if (e.data == 'list') {
		IsTable = false;
	} else if (e.data == 'initMultiSelectAction') {
		Monitoring.isReadOnlyMode = false;
		chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
			inspect.drawSelectedObject(tab[0].id, 'multiSelectAction', true);
		});
	} else if (e.data == 'multiSelectAction') {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
			inspect.drawSelectedObject(tab[0].id, 'multiSelectAction', false);
		});
	} else if (e.data == 'formSelectAction') {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
			inspect.drawSelectedObject(tab[0].id, 'formSelectAction', false);
		});
	}else if (e.data == 'get') {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
			inspect.sendData(tab[0].id);
		});
	} else if (e.data == 'pause') {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
			inspect.sendIsPause(tab[0].id, true, Href);
		});
		IsPause = true;
	} else if (e.data == 'resume') {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
			inspect.sendIsPause(tab[0].id, false, Href);
		});
		IsPause = false;
	}
}

function SetModeMessage(e) {
	if (e.data == 'multiSelectMode') {
		SelectMode = 'multiple';
	} else if (e.data == 'formSelectMode') {
		SelectMode = 'form';
	} else if (e.data == 'setReadOnlyStateMode') {
		Monitoring.isReadOnlyMode = true;
	} else if (e.data == 'setNormalStateMode') {
		Monitoring.isReadOnlyMode = false;
		Monitoring.isHideMode = false;
	} else if (e.data == 'setHideStateMode') {
		Monitoring.isHideMode = true;
	}
}

function SetDiagonalMessage(e) {
	if (e.data == 'text') {
		DiagonalType = 'text';
	} else if (e.data == 'credentialText') {
		DiagonalType = 'credentialText';
	} else if (e.data == 'selectList') {
		DiagonalType = 'selectList';
	} else if (e.data == 'checkBox') {
		DiagonalType = 'checkBox';
	} 
}

function loadPort() {
    browserAppData.storage.local.get('port', function (result) {
        port = result.port;
    });

    if (port == 'undefined' || port == '') {
        port = '9877';
        browserAppData.storage.local.set({
            'port': '9877'
        }, null);
    }
}

function waitForConnection(callback, interval) {
    if (WS.readyState == 1) {
        callback();
    }
    else {
        setTimeout(function () {
            waitForConnection(callback, interval);
        }, interval);
    }
}

function sendQuery(msg) {
    msg.FullURL = FullURL;
    msg.URL = URL;
    msg.SearchURL = SearchURL;
	
	msg.MultiSelectFullSrc = MultiSelectFullSrc;
	msg.MultiSelectSrc = MultiSelectSrc;
	msg.MultiSelectSearchSrc = MultiSelectSearchSrc;
	
    WS.send(JSON.stringify(msg));
}



function activateExtensionType() {
    if (IsUseXPath && !IsMultiple) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
            inspect.sendxpath(tab[0].id, DesignerXPath);
        });
    } else if (IsUseXPath && IsMultiple) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
            inspect.sendxpathmultiple(tab[0].id, DesignerXPath, IsTable);
        });
    } else if (!IsUseXPath && !IsMultiple) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
            inspect.sendselector(tab[0].id, DesignerSelector);
        });
    } else if (!IsUseXPath && IsMultiple) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
            inspect.sendselectormultiple(tab[0].id, DesignerSelector, IsTable);
        });
    }

    chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
        inspect.sendExtensionSelectMode(tab[0].id, SelectMode);
    });

    chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
        inspect.sendTextInfo(tab[0].id, DiagonalType);
    });
}

function syncStateMode(request) {
	
	let stateMode = 'normal';
	
	if (request.evt) {
		if (request.evt == 'windowChange' && SelectMode == 'form') {
			return;
		}
	}
	
	if (SelectMode == 'multiple') {
		if (request.length == 0) {
			Monitoring.isReadOnlyMode = false;
		} else {
			Monitoring.isReadOnlyMode = true;
			stateMode = 'readOnly';
			
			MultiSelectFullSrc = request.multiSelectFullSrc;
			MultiSelectSrc = request.multiSelectSrc;
			MultiSelectSearchSrc = request.multiSelectSearchSrc;
		}
	} else if (SelectMode == 'form') {
		if (request.length == 0) {
			Monitoring.isHideMode = false;
		} else {
			Monitoring.isHideMode = true; 
			stateMode = 'hide';
			
			MultiSelectFullSrc = request.multiSelectFullSrc;
			MultiSelectSrc = request.multiSelectSrc;
			MultiSelectSearchSrc = request.multiSelectSearchSrc;
		}
	}
	
	sendQuery({ SyncStateMode: true, StateMode: stateMode, MultiSelectFullSrc: MultiSelectFullSrc
	, MultiSelectSrc: MultiSelectSrc, MultiSelectSearchSrc: MultiSelectSearchSrc });
}

function activateExtension(windowId = null) {
    activateExtensionType();

    chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
        lastActivateTabId = tab[0].id;
        inspect.toggleActivate(tab[0].id, 'activate', activeIcon);
    });
}

function deactivateExtension(windowId = null, isAll = false) {
	if (isAll) {
		chrome.tabs.query({ }, function (tabs) {
			tabs.forEach(tab => {
				inspect.toggleActivate(tab.id, 'deactivate', defaultIcon);
			});
		});
	} else {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
			inspect.toggleActivate(tab[0].id, 'deactivate', defaultIcon);
		});
	}
}

function changeTab() {
    if (IsSocketOpened && IsExtensionRunning) {
        if (lastActivateTabId != -1) {
            inspect.toggleActivate(lastActivateTabId, 'deactivate', defaultIcon);
        }
        lastActivateTabId = -1;
		syncStateMode({length: 0});
		
		activateExtension();
    }
}

function updateTab() {
	if (IsSocketOpened && IsExtensionRunning) {
		deactivateExtension(null, true);
		syncStateMode({length: 0});
		activateExtension();
	}
}

function sendQueryToTopScript(query, msg) {
    if (IsSocketOpened && IsExtensionRunning) {
        if (lastActivateTabId != -1) {
            inspect.sendQueryToTopScript(lastActivateTabId, query, msg);
        }
    }
}

function changeWindow(windowId) {
    chrome.windows.getLastFocused({ populate: true }, function (window) {
        lastFocusWindowId = window.id;
    });
	
    if (windowId == -1)
        return;

    if (IsSocketOpened && IsExtensionRunning) {
		syncStateMode({length: 0, evt:'windowChange'});
		
        if (lastFocusWindowId == windowId) {
            deactivateExtension(lastFocusWindowId);
            activateExtension(windowId);
        }
        else {
            deactivateExtension(lastFocusWindowId);
            activateExtension(windowId);
        }
    }
}

function reloadOnStartUp() {
    chrome.runtime.reload();
    chrome.runtime.onStartup.removeListener(reloadOnStartUp);
}

setInterval(function () { connect() }, 1000);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (typeof request.title != 'undefined') {

            if (request.title === 'sendData') {
                sendQuery(request);
            } else if (request.title === 'loadIsPause') {
                sendResponse({ message: IsPause });
            } else if (request.title === 'saveiFrame') {
                IsIFrame = request.saveiframe;
                Href = request.href;
                if (IsExtensionRunning) {
                    activateExtension();
                }
            } else if (request.title === 'loadiFrame') {
                sendResponse({ isiframe: IsIFrame, href: Href });
            } else if (request.title === 'saveMainURL') {
                FullURL = request.FullURL;
                URL = request.URL;
                SearchURL = request.SearchURL;
            } else if (request.title === 'wake') {
                sendQuery(request);
            } else if (request.title === 'sendQueryToTopScript') {
                sendQueryToTopScript(request.query, request.textMsg);
            } else if (request.title === 'sendSelectedElementsLength') {
				syncStateMode(request);
			}
        }
        else {
            sendQuery(request);
        }
    }
);

//chrome.runtime.onStartup.addListener(reloadOnStartUp);
chrome.windows.onFocusChanged.addListener(changeWindow);
chrome.tabs.onActivated.addListener(changeTab);
chrome.tabs.onUpdated.addListener(updateTab);





