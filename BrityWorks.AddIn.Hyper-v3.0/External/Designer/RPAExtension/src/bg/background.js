const browserAppData = this.browser || this.chrome;
const tabs = {};
const inspectFile = 'js/inspect.js';
const inspectSubFile = 'js/inspectSub.js';
const activeIcon = 'active_48.png';
const defaultIcon = 'inactive_48.png';

const inspect = {
	toggleActivate: (id, type, icon, Href) => {
		this.id = id;
		browserAppData.scripting.executeScript({ target: { tabId: id, allFrames: true }, files: [inspectFile] }, () => { 
			if (browserAppData.runtime.lastError) {}
			browserAppData.tabs.sendMessage(id, { action: type, href: Href }, null, () => {
				if (browserAppData.runtime.lastError) {}
			});
		});
		browserAppData.action.setIcon({ path: '/icons/' + icon });
	},
	sendxpath: (id, DesignerXPath) => {
		this.id = id;
		browserAppData.scripting.executeScript({ target: { tabId: id }, files: [inspectFile] }, () => { browserAppData.tabs.sendMessage(id, { xpath: DesignerXPath }); });
	},
	sendxpathmultiple: (id, DesignerXPath, isTable) => {
		this.id = id;
		browserAppData.scripting.executeScript({ target: { tabId: id }, files: [inspectFile] }, () => { browserAppData.tabs.sendMessage(id, { xpathMultiple: DesignerXPath, isTable: isTable }); });
	},
	sendselector: (id, DesignerSelector) => {
		this.id = id;
		browserAppData.scripting.executeScript({ target: { tabId: id }, files: [inspectFile] }, () => { browserAppData.tabs.sendMessage(id, { selector: DesignerSelector }); });
	},
	sendselectormultiple: (id, DesignerSelector, isTable) => {
		this.id = id;
		browserAppData.scripting.executeScript({ target: { tabId: id }, files: [inspectFile] }, () => { browserAppData.tabs.sendMessage(id, { selectorMultiple: DesignerSelector, isTable: isTable }); });
	},
	sendData: (id) => {
		this.id = id;
		browserAppData.scripting.executeScript({ target: { tabId: id }, files: [inspectFile] }, () => { browserAppData.tabs.sendMessage(id, { action: 'getData' }); });
	},
	sendIsPause: (id, isPause) => {
		this.id = id;
		browserAppData.scripting.executeScript({ target: { tabId: id }, files: [inspectFile] }, () => { browserAppData.tabs.sendMessage(id, { isPause: isPause }); });
	},
	sendQueryToTopScript: (id, query, msg) => {
		this.id = id;
		browserAppData.scripting.executeScript({ target: { tabId: id }, files: [inspectFile] }, () => { browserAppData.tabs.sendMessage(id, { query: query, textMsg: msg }); });
	},
	sendTextInfo: (id, DiagonalType) => {
		this.id = id;
		browserAppData.scripting.executeScript({ target: { tabId: id }, files: [inspectFile] }, () => { browserAppData.tabs.sendMessage(id, { diagonalType: DiagonalType }); });
	},
	sendExtensionSelectMode: (id, mode) => {
		this.id = id;
		browserAppData.scripting.executeScript({ target: { tabId: id }, files: [inspectFile] }, () => { browserAppData.tabs.sendMessage(id, { selectMode: mode }); });
	},
	drawSelectedObject: (id, selectedAction, init, MultiSelectFullSrc, Href) => {
		this.id = id;
		browserAppData.scripting.executeScript({ target: { tabId: id }, files: [inspectFile] }, () => { 
		if (browserAppData.runtime.lastError) {}
		browserAppData.tabs.sendMessage(id, { action: selectedAction, init: init, multiSelectFullSrc: MultiSelectFullSrc, href: Href }); });
	},
	noticeStateMode: (id, stateMode, multiSelectFullSrc, multiSelectSrc, multiSelectSearchSrc) => { // stateMode : normal, readOnly, hide
		this.id = id;
		browserAppData.scripting.executeScript({ target: { tabId: id }, files: [inspectFile] }, () => { browserAppData.tabs.sendMessage(id, { stateMode: stateMode, multiSelectFullSrc: multiSelectFullSrc, multiSelectSrc: multiSelectSrc, multiSelectSearchSrc: multiSelectSearchSrc }); });
	},
	noticeStorageOptions: (id, key, value) => {
		this.id = id;
		browserAppData.scripting.executeScript({ target: { tabId: id }, files: [inspectFile] }, () => { browserAppData.tabs.sendMessage(id, { optionKey: key, optionValue: value }); });
	},
	notifyCustomKvpData: (id, dataKey, jsonVal) => {
		this.id = id;
		browserAppData.scripting.executeScript({ target: { tabId: id }, files: [inspectFile] }, () => { browserAppData.tabs.sendMessage(id, { title: 'notifyCustomKvpData', key: dataKey, jsonValue: jsonVal }); });
	},
};

function isSupportedProtocolAndFileType(urlString) {
	if (!urlString) { return false; }
	const supportedProtocols = ['https', 'http'];
	const notSupportedFiles = ['xml', 'pdf', 'rss'];
	const extension = urlString.split('.').pop().split(/\#|\?/)[0];
	const protocol = urlString.split(':')[0];
	return supportedProtocols.indexOf(protocol) !== -1 && notSupportedFiles.indexOf(extension) === -1;
}

async function toggle(tab) {
	if (isSupportedProtocolAndFileType(tab.url)) {
		if (!tabs[tab.id]) {
			tabs[tab.id] = Object.create(inspect);
			inspect.toggleActivate(tab.id, 'activate', activeIcon, await storageOptions.GetHref());
		} else {
			inspect.toggleActivate(tab.id, 'deactivate', defaultIcon, await storageOptions.GetHref());
			for (const tabId in tabs) {
				if (tabId == tab.id) delete tabs[tabId];
			}
		}
	}
}

async function deactivateItem(tab) {
	if (tab[0]) {
		if (isSupportedProtocolAndFileType(tab[0].url)) {
			for (const tabId in tabs) {
				if (tabId == tab[0].id) {
					delete tabs[tabId];
					inspect.toggleActivate(tab[0].id, 'deactivate', defaultIcon, await storageOptions.GetHref());
				}
			}
		}
	}
}

var WS = null;
//

class StorageOptions {
	constructor() {
		this.isSocketOpened = undefined;
		this.isSocketStateChanged = true;
		this.lastActivateTabId = undefined;
		this.isExtensionRunning = undefined;
		this.isExtensionRunningStateChanged = true;
		this.lastFocusWindowId = undefined;
		this.designerXPath = undefined;
		this.designerSelector = undefined;
		this.isUseXPath = undefined;
		this.isMultiple = undefined;
		this.isIFrame = undefined;
		this.isIFrameStateChanged = true;
		this.isTable = undefined;
		this.diagonalType = undefined;
		this.isPause = undefined;
		this.selectMode = undefined; //single; multiple; form
		this.multiSelectFullSrc = undefined;
		this.multiSelectSrc = undefined;
		this.multiSelectSearchSrc = undefined;
		this.href = undefined;
		this.ishrefStateChanged = true;
		this.fullURL = undefined;
		this.url = undefined;
		this.searchURL = undefined;
		this.port = undefined;
		this.isPortChanged = true;
		this.isReadOnlyModeVal = undefined;
		this.isHideModeVal = undefined;

		this.isShowQueryGuide = undefined;
	}
	
	async GetIsSocketOpened() {
		if (!this.isSocketStateChanged)
			return this.isSocketOpened;

		this.isSocketOpened = await GetStorageData('isSocketOpened');
		if (this.isSocketOpened == undefined) {
			this.isSocketOpened = false;
			SetStorageData('isSocketOpened', false);
			this.isSocketStateChanged = true;
			return this.isSocketOpened;
		}
		this.isSocketStateChanged = false;
		return this.isSocketOpened;

	}
	async GetLastActivateTabId() {
		this.lastActivateTabId = await GetStorageData('lastActivateTabId');
		if (this.lastActivateTabId == undefined) {
			this.lastActivateTabId = -1;
			SetStorageData('lastActivateTabId', -1);
		}
		return this.lastActivateTabId;
	}
	async GetIsExtensionRunning() {
		if (!this.isExtensionRunningStateChanged)
			return this.isExtensionRunning;

		this.isExtensionRunning = await GetStorageData('isExtensionRunning');
		if (this.isExtensionRunning == undefined) {
			this.isExtensionRunning = false;
			SetStorageData('isExtensionRunning', false);
			this.isExtensionRunningStateChanged = true;
			return this.isExtensionRunning;
		}
		this.isExtensionRunningStateChanged = false;
		return this.isExtensionRunning;
	}
	async GetLastFocusWindowId() {
		this.lastFocusWindowId = await GetStorageData('lastFocusWindowId');
		if (this.lastFocusWindowId == undefined) {
			this.lastFocusWindowId = -1;
			SetStorageData('lastFocusWindowId', -1);
		}
		return this.lastFocusWindowId;
	}
	async GetDesignerXPath() {
		this.designerXPath = await GetStorageData('designerXPath');
		if (this.designerXPath == undefined) {
			this.designerXPath = '';
			SetStorageData('designerXPath', '');
		}
		return this.designerXPath;
	}
	async GetDesignerSelector() {
		this.designerSelector = await GetStorageData('designerSelector');
		if (this.designerSelector == undefined) {
			this.designerSelector = '';
			SetStorageData('designerSelector', '');
		}
		return this.designerSelector;
	}
	async GetIsUseXPath() {
		this.isUseXPath = await GetStorageData('isUseXPath');
		if (this.isUseXPath == undefined) {
			this.isUseXPath = false;
			SetStorageData('isUseXPath', false);
		}
		return this.isUseXPath;
	}
	async GetIsMultiple() {
		this.isMultiple = await GetStorageData('isMultiple');
		if (this.isMultiple == undefined) {
			this.isMultiple = false;
			SetStorageData('isMultiple', false);
		}
		return this.isMultiple;
	}
	async GetIsIFrame() {
		if (!this.isIFrameStateChanged)
			return this.isIFrame;

		this.isIFrame = await GetStorageData('isIFrame');
		if (this.isIFrame == undefined) {
			this.isIFrame = false;
			SetStorageData('isIFrame', false);
			this.isIFrameStateChanged = true;
			return false;
		}
		this.isIFrameStateChanged = false;
		return this.isIFrame;
	}
	async GetIsTable() {
		this.isTable = await GetStorageData('isTable');
		if (this.isTable == undefined) {
			this.isTable = false;
			SetStorageData('isTable', false);
		}
		return this.isTable;
	}
	async GetDiagonalType() {
		this.diagonalType = await GetStorageData('diagonalType');
		if (this.diagonalType == undefined) {
			this.diagonalType = '';
			SetStorageData('diagonalType', '');
		}
		return this.diagonalType;
	}
	async GetIsPause() {
		this.isPause = await GetStorageData('isPause');
		if (this.isPause == undefined) {
			this.isPause = false;
			SetStorageData('isPause', false);
		}
		return this.isPause;
	}
	async GetSelectMode() {
		this.selectMode = await GetStorageData('selectMode');
		if (this.selectMode == undefined) {
			this.selectMode = 'single';
			SetStorageData('selectMode', 'single');
		}
		return this.selectMode;
	}
	async GetMultiSelectFullSrc() {
		this.multiSelectFullSrc = await GetStorageData('multiSelectFullSrc');
		if (this.multiSelectFullSrc == undefined) {
			this.multiSelectFullSrc = '';
			SetStorageData('multiSelectFullSrc', '');
		}
		return this.multiSelectFullSrc;
	}
	async GetMultiSelectSrc() {
		this.multiSelectSrc = await GetStorageData('multiSelectSrc');
		if (this.multiSelectSrc == undefined) {
			this.multiSelectSrc = '';
			SetStorageData('multiSelectSrc', '');
		}
		return this.multiSelectSrc;
	}
	async GetMultiSelectSearchSrc() {
		this.multiSelectSearchSrc = await GetStorageData('multiSelectSearchSrc');
		if (this.multiSelectSearchSrc == undefined) {
			this.multiSelectSearchSrc = '';
			SetStorageData('multiSelectSearchSrc', '');
		}
		return this.multiSelectSearchSrc;
	}
	async GetHref() {
		if (!this.ishrefStateChanged)
			return this.href;

		this.href = await GetStorageData('href');
		if (this.href == undefined) {
			this.href = '';
			SetStorageData('href', '');
			this.ishrefStateChanged = true;
			return this.href;
		}
		this.ishrefStateChanged = false;
		return this.href;
	}
	async GetFullURL() {
		this.fullURL = await GetStorageData('fullURL');
		if (this.fullURL == undefined) {
			this.fullURL = '';
			SetStorageData('fullURL', '');
		}
		return this.fullURL;
	}
	async GetURL() {
		this.url = await GetStorageData('url');
		if (this.url == undefined) {
			this.url = '';
			SetStorageData('url', '');
		}
		return this.url;
	}
	async GetSearchURL() {
		this.searchURL = await GetStorageData('searchURL');
		if (this.searchURL == undefined) {
			this.searchURL = '';
			SetStorageData('searchURL', '');
		}
		return this.searchURL;
	}
	async GetIsReadOnlyModeVal() {
		this.isReadOnlyModeVal = await GetStorageData('isReadOnlyModeVal');
		if (this.isReadOnlyModeVal == undefined) {
			this.isReadOnlyModeVal = false;
			SetStorageData('isReadOnlyModeVal', false);
		}
		return this.isReadOnlyModeVal;
	}
	async GetIsHideModeVal() {
		this.isHideModeVal = await GetStorageData('isHideModeVal');
		if (this.isHideModeVal == undefined) {
			this.isHideModeVal = false;
			SetStorageData('isHideModeVal', false);
		}
		return this.isHideModeVal;
	}

	async GetPort() {
		if (!this.isPortChanged)
			return this.port;

		this.port = await GetStorageData('port');
		if (this.port == undefined) {
			this.port = '9877';
			SetStorageData('port', '9877');
			this.isPortChanged = true;
			return this.port;
		}
		this.isPortChanged = false;
		return this.port;
	}
	async GetIsShowQueryGuide() {
		this.isShowQueryGuide = await GetStorageData('isShowQueryGuide');
		if (this.isShowQueryGuide == undefined) {
			this.isShowQueryGuide = false;
			SetStorageData('isShowQueryGuide', false);
		}
		return this.isShowQueryGuide;
    }


	async SetIsSocketOpened(value) {
		if (this.isSocketOpened != value) {
			SetStorageData('isSocketOpened', value);
			this.isSocketOpened = value;
			this.isSocketStateChanged = true;
		}
	}
	async SetLastActivateTabId(value) {
		SetStorageData('lastActivateTabId', value);
	}
	async SetIsExtensionRunning(value) {
		if (this.isExtensionRunning != value) {
			SetStorageData('isExtensionRunning', value);
			this.isExtensionRunning = value;
			this.isExtensionRunningStateChanged = true;
		}
	}
	async SetLastFocusWindowId(value) {
		SetStorageData('lastFocusWindowId', value);
	}
	async SetDesignerXPath(value) {
		SetStorageData('designerXPath', value);
	}
	async SetDesignerSelector(value) {
		SetStorageData('designerSelector', value);
	}
	async SetIsUseXPath(value) {
		SetStorageData('isUseXPath', value);
	}
	async SetIsMultiple(value) {
		SetStorageData('isMultiple', value);
	}
	async SetIsIFrame(value) {
		if (this.isIFrame != value) {
			SetStorageData('isIFrame', value);
			this.isIFrame = value;
			this.isIFrameStateChanged = true;
		}
	}
	async SetIsTable(value) {
		SetStorageData('isTable', value);
	}
	async SetDiagonalType(value) {
		SetStorageData('diagonalType', value);
	}
	async SetIsPause(value) {
		SetStorageData('isPause', value);
	}
	async SetSelectMode(value) {
		SetStorageData('selectMode', value);
	}
	async SetMultiSelectFullSrc(value) {
		SetStorageData('multiSelectFullSrc', value);
	}
	async SetMultiSelectSrc(value) {
		SetStorageData('multiSelectSrc', value);
	}
	async SetMultiSelectSearchSrc(value) {
		SetStorageData('multiSelectSearchSrc', value);
	}
	async SetHref(value) {
		if (this.href != value) {
			SetStorageData('href', value);
			this.href = value;
			this.ishrefStateChanged = true;
		}
	}
	async SetFullURL(value) {
		SetStorageData('fullURL', value);
	}
	async SetURL(value) {
		SetStorageData('url', value);
	}
	async SetSearchURL(value) {
		SetStorageData('searchURL', value);
	}
	async SetIsReadOnlyModeVal(value) {

		if (await storageOptions.GetIsReadOnlyModeVal() == value)
			return;

		SetStorageData('isReadOnlyModeVal', value);

		if (value == false) {
			storageOptions.SetMultiSelectFullSrc('');
			storageOptions.SetMultiSelectSrc('');
			storageOptions.SetMultiSelectSearchSrc('');
		}

		let tabs = await chrome.tabs.query({});
		let multiselectfullsrc = await storageOptions.GetMultiSelectFullSrc();
		let multiselectsrc = await storageOptions.GetMultiSelectSrc()
		let multiselectsearchsrc = await storageOptions.GetMultiSelectSearchSrc();

		tabs.forEach(tab => {
			inspect.noticeStateMode(tab.id, value == true ? 'readOnly' : 'normal'
				, multiselectfullsrc, multiselectsrc, multiselectsearchsrc);
		});
	}
	async SetIsHideModeVal(value) {

		if (await storageOptions.GetIsHideModeVal() == value)
			return;

		SetStorageData('isHideModeVal', value);
		if (value == false) {
			storageOptions.SetMultiSelectFullSrc('');
			storageOptions.SetMultiSelectSrc('');
			storageOptions.SetMultiSelectSearchSrc('');
		}

		let tabs = await chrome.tabs.query({});
		let multiselectfullsrc = await storageOptions.GetMultiSelectFullSrc();
		let multiselectsrc = await storageOptions.GetMultiSelectSrc()
		let multiselectsearchsrc = await storageOptions.GetMultiSelectSearchSrc();

		tabs.forEach(tab => {
			inspect.noticeStateMode(tab.id, value == true ? 'hide' : 'normal'
				, multiselectfullsrc, multiselectsrc, multiselectsearchsrc);
		});
	}

	async SetPort(value) {
		if (this.port != value) {
			SetStorageData('port', value);
			this.port = value;
			this.isPortChanged = true;
		}
	}
}

const storageOptions = new StorageOptions();

async function GetStorageData(key) {
	let getDataPromise = new Promise(function (resolve, reject) {
		chrome.storage.local.get(key, function (items) {
			if (items) {
				resolve(items[key]);
			}
		});
	});

	return getDataPromise.then((x) => { return x; }).catch((err) => { console.log('p err : ' + err) });
}

function SetStorageData(key, value) {
	chrome.storage.local.set({
		[key]: value
	}, null);
}

function IsWSOpened() {
	if (WS == null)
		return false;
	if (WS.readyState == WebSocket.OPEN)
		return true;
	return false;
}

function Connect() {
	storageOptions.GetPort();
	storageOptions.GetIsSocketOpened();
	if (IsWSOpened() == false) {
		// chrome.alarms.onAlarm.removeListener(Connect);
		let wsport = storageOptions.port;
		if (wsport == undefined) {
			setTimeout(Connect, 1000);
			// chrome.alarms.onAlarm.addListener(Connect);
			// return;
        }
		else {
			WS = new WebSocket('ws://localhost:' + wsport + '/IPASocket');
		
			WS.onopen = function () {
				WS.send(JSON.stringify({ SocketOpen: true }));
				storageOptions.SetIsSocketOpened(true);
			};

			WS.onmessage = function (e) {
				(async() => {
					await SetActionMessage(e);
					await SetOptionMessage(e);
					SetModeMessage(e);
					SetDiagonalMessage(e);
				})();
			};

			WS.onclose = function () {
				DeactivateExtension();
				
				// chrome.alarms.onAlarm.removeListener(Connect);
				// chrome.alarms.onAlarm.addListener(Connect);

				storageOptions.SetIsSocketOpened(false);
				storageOptions.SetIsExtensionRunning(false);
				setTimeout(Connect, 1000);
			};

			WS.onerror = function () {
				DeactivateExtension();
				WS.close();
				
				storageOptions.SetIsSocketOpened(false);
				storageOptions.SetIsExtensionRunning(false);
			};
		}
	}
}

async function SetActionMessage(e) {
	if (e.data == 'run') {
		await ActivateExtension();
		await SyncqueryGuideOptions();
		storageOptions.SetIsExtensionRunning(true);
	} else if (e.data == 'stop') {
		await DeactivateExtension(null, true);
		storageOptions.SetIsExtensionRunning(false);
		storageOptions.SetIsPause(false);
	} else if (e.data == 'wait') {
		await DeactivateExtension();
		storageOptions.SetIsExtensionRunning(false);
	} else if (e.data == 'reload') {
		//ReloadExtension();
	} else if (e.data == 'sleep') {
		let tab = await chrome.tabs.query({ currentWindow: true, active: true });
		let href = await storageOptions.GetHref();
		inspect.toggleActivate(tab[0].id, 'sleep', defaultIcon, href);
	} else if (e.data == 'close') {
		await DeactivateExtension(null, true);
		WS.close();
		storageOptions.SetIsSocketOpened(false);
		storageOptions.SetIsExtensionRunning(false);
	}
}

async function SetOptionMessage(e) {
	if (e.data == 'initOption') {
		storageOptions.SetDiagonalType('');
		storageOptions.SetSelectMode('single');
		storageOptions.SetIsReadOnlyModeVal(false);
		storageOptions.SetIsHideModeVal(false);
		let tab = await chrome.tabs.query({ currentWindow: true, active: true });
		let href = await storageOptions.GetHref();
		
		if (tab[0] == undefined) { return; }
		inspect.toggleActivate(tab[0].id, 'initialize', defaultIcon, href);
	} else if (e.data.startsWith('xpath?')) {
		storageOptions.SetDesignerXPath(e.data.substring(6));
		storageOptions.SetIsUseXPath(true);
		storageOptions.SetIsMultiple(false);
	} else if (e.data.startsWith('xpathMultiple?')) {
		storageOptions.SetDesignerXPath(e.data.substring(14));
		storageOptions.SetIsUseXPath(true);
		storageOptions.SetIsMultiple(true);
	} else if (e.data.startsWith('selector?')) {
		storageOptions.SetDesignerSelector(e.data.substring(9));
		storageOptions.SetIsUseXPath(false);
		storageOptions.SetIsMultiple(false);
	} else if (e.data.startsWith('selectorMultiple?')) {
		storageOptions.SetDesignerSelector(e.data.substring(17));
		storageOptions.SetIsUseXPath(false);
		storageOptions.SetIsMultiple(true);
	} else if (e.data == 'table') {
		storageOptions.SetIsTable(true);
	} else if (e.data == 'list') {
		storageOptions.SetIsTable(false);
	} else if (e.data == 'initMultiSelectAction') {
		storageOptions.SetIsReadOnlyModeVal(false);
		let tab = await chrome.tabs.query({ currentWindow: true, active: true });
		inspect.drawSelectedObject(tab[0].id, 'multiSelectAction', true, await storageOptions.GetMultiSelectFullSrc(), await storageOptions.GetHref());
	} else if (e.data == 'multiSelectAction') {
		let tab = await chrome.tabs.query({ currentWindow: true, active: true });
		inspect.drawSelectedObject(tab[0].id, 'multiSelectAction', false, await storageOptions.GetMultiSelectFullSrc(), await storageOptions.GetHref());
	} else if (e.data == 'formSelectAction') {
		let tab = await chrome.tabs.query({ currentWindow: true, active: true });
		inspect.drawSelectedObject(tab[0].id, 'formSelectAction', false, await storageOptions.GetMultiSelectFullSrc(), await storageOptions.GetHref());
	} else if (e.data == 'get') {
		let tab = await chrome.tabs.query({ currentWindow: true, active: true });
		inspect.sendData(tab[0].id);
	} else if (e.data == 'pause') {
		let tab = await chrome.tabs.query({ currentWindow: true, active: true });
		inspect.sendIsPause(tab[0].id, true, await storageOptions.GetHref());
		storageOptions.SetIsPause(true);
	} else if (e.data == 'resume') {
		let tab = await chrome.tabs.query({ currentWindow: true, active: true });
		inspect.sendIsPause(tab[0].id, false, await storageOptions.GetHref());
		storageOptions.SetIsPause(false);
	}
}

function SetModeMessage(e) {
	if (e.data == 'multiSelectMode') {
		storageOptions.SetSelectMode('multiple');
	} else if (e.data == 'formSelectMode') {
		storageOptions.SetSelectMode('form');
	} else if (e.data == 'setReadOnlyStateMode') {
		storageOptions.SetIsReadOnlyModeVal(true);
	} else if (e.data == 'setNormalStateMode') {
		storageOptions.SetIsReadOnlyModeVal(false);
		storageOptions.SetIsHideModeVal(false);
	} else if (e.data == 'setHideStateMode') {
		storageOptions.SetIsHideModeVal(true);
	}
}

function SetDiagonalMessage(e) {
	if (e.data == 'text') {
		storageOptions.SetDiagonalType('text');
	} else if (e.data == 'credentialText') {
		storageOptions.SetDiagonalType('credentialText');
	} else if (e.data == 'selectList') {
		storageOptions.SetDiagonalType('selectList');
	} else if (e.data == 'checkBox') {
		storageOptions.SetDiagonalType('checkBox');
	}
}

async function SyncqueryGuideOptions() {
	let tab = await chrome.tabs.query({});
	let queryGuide = await GetStorageData('isShowQueryGuide');
	if (typeof queryGuide == 'undefined') {
		queryGuide = false;
	}
	if (tab[0].id != undefined) {
		inspect.noticeStorageOptions(tab[0].id, 'isShowQueryGuide', queryGuide);
	}
}

function WaitForConnection(callback, interval) {
	if (WS.readyState == 1) {
		callback();
	}
	else {
		setTimeout(function () {
			WaitForConnection(callback, interval);
		}, interval);
	}
}

async function SendQuery(msg) {
	msg.FullURL = await storageOptions.GetFullURL();
	msg.URL = await storageOptions.GetURL();
	msg.SearchURL = await storageOptions.GetSearchURL();

	if (msg.MultiSelectFullSrc == undefined
		|| msg.MultiSelectSrc == undefined
		|| msg.MultiSelectSearchSrc == undefined) {
		msg.MultiSelectFullSrc = await storageOptions.GetMultiSelectFullSrc();
		msg.MultiSelectSrc = await storageOptions.GetMultiSelectSrc();
		msg.MultiSelectSearchSrc = await storageOptions.GetMultiSelectSearchSrc();
	}

	WS.send(JSON.stringify(msg));
}

async function ActivateExtensionType() {

	let tab = await chrome.tabs.query({ currentWindow: true, active: true });

	if (await storageOptions.GetIsUseXPath() && !await storageOptions.GetIsMultiple()) {
		let xpath = await storageOptions.GetDesignerXPath();
		inspect.sendxpath(tab[0].id, xpath);
		
	} else if (await storageOptions.GetIsUseXPath() && await storageOptions.GetIsMultiple()) {
		let xpath = await storageOptions.GetDesignerXPath();
		let isTable = await storageOptions.GetIsTable();
		inspect.sendxpathmultiple(tab[0].id, xpath, isTable);
		
	} else if (await storageOptions.GetIsUseXPath() == false && await storageOptions.GetIsMultiple() == false) {
		let selector = await storageOptions.GetDesignerSelector();
		inspect.sendselector(tab[0].id, selector);
		
	} else if (await storageOptions.GetIsUseXPath() == false && await storageOptions.GetIsMultiple()) {
		let selector = await storageOptions.GetDesignerSelector();
		let isTable = await storageOptions.GetIsTable();
		inspect.sendselectormultiple(tab[0].id, selector, isTable);

	}
	let selectMode = await storageOptions.GetSelectMode();
	let diagonalType = await storageOptions.GetDiagonalType();
	inspect.sendExtensionSelectMode(tab[0].id, selectMode);
	inspect.sendTextInfo(tab[0].id, diagonalType);
}

async function SyncStateMode(request) {

	let stateMode = 'normal';

	if (request.evt) {
		if (request.evt == 'windowChange' && await storageOptions.GetSelectMode() == 'form') {
			return;
		}
	}

	if (await storageOptions.GetSelectMode() == 'multiple') {
		if (request.length == 0) {
			storageOptions.SetIsReadOnlyModeVal(false);
		} else {
			storageOptions.SetIsReadOnlyModeVal(true);
			stateMode = 'readOnly';

			storageOptions.SetMultiSelectFullSrc(request.multiSelectFullSrc);
			storageOptions.SetMultiSelectSrc(request.multiSelectSrc);
			storageOptions.SetMultiSelectSearchSrc(request.multiSelectSearchSrc);
		}
	} else if (await storageOptions.GetSelectMode() == 'form') {
		if (request.length == 0) {
			storageOptions.SetIsHideModeVal(false);
		} else {
			storageOptions.SetIsHideModeVal(true);
			stateMode = 'hide';

			storageOptions.SetMultiSelectFullSrc(request.multiSelectFullSrc);
			storageOptions.SetMultiSelectSrc(request.multiSelectSrc);
			storageOptions.SetMultiSelectSearchSrc(request.multiSelectSearchSrc);
		}
	}

	await SendQuery({
		SyncStateMode: true, StateMode: stateMode, MultiSelectFullSrc: await storageOptions.GetMultiSelectFullSrc()
		, MultiSelectSrc: await storageOptions.GetMultiSelectSrc(), MultiSelectSearchSrc: await storageOptions.GetMultiSelectSearchSrc()
	});
}

async function ActivateExtension(windowId = null) {
	await ActivateExtensionType();
	
	let tab = await chrome.tabs.query({ currentWindow: true, active: true });
	if (await isSupportedProtocolAndFileType(tab[0].url) == true) {
			inspect.toggleActivate(tab[0].id, 'activate', activeIcon, await storageOptions.GetHref());
		}
	storageOptions.SetLastActivateTabId(tab[0].id);
}

async function DeactivateExtension(windowId = null, isAll = false) {
	let href = await storageOptions.GetHref();
	
	if (isAll) {
		let tabs = await chrome.tabs.query({});
		if (tabs == undefined) { return; }
		tabs.forEach(function (tab) {
			inspect.toggleActivate(tab.id, 'deactivate', defaultIcon, href);
		});
			
		//chrome.storage.local.clear();
	} else {
		let winId = windowId;
		if (winId == null || winId == undefined) {
			let tab = await chrome.tabs.query({ currentWindow: true, active: true });
			if (tab[0] == undefined) { return; }
			inspect.toggleActivate(tab[0].id, 'deactivate', defaultIcon, href);
		}
		else {
			let tab = await chrome.tabs.query({ windowId: windowId, active: true });
			if (tab[0] == undefined) { return; }
			inspect.toggleActivate(tab[0].id, 'deactivate', defaultIcon, href);
		}
	}
}

async function ChangeTab() {
	if (await storageOptions.GetIsSocketOpened() && await storageOptions.GetIsExtensionRunning()) {
		if (await storageOptions.GetLastActivateTabId() != -1) {
			inspect.toggleActivate(await storageOptions.GetLastActivateTabId(), 'deactivate', defaultIcon, await storageOptions.GetHref());
		}
		storageOptions.SetLastActivateTabId(-1);
		await SyncStateMode({ length: 0 });
		await ActivateExtension();
		await SyncqueryGuideOptions();
	}
}

async function UpdateTab() {
	if (await storageOptions.GetIsSocketOpened() && await storageOptions.GetIsExtensionRunning()) {
		await DeactivateExtension(null, true);
		await SyncStateMode({ length: 0 });
		await ActivateExtension();
		await SyncqueryGuideOptions();
	}
}

async function SendQueryToTopScript(query, msg) {
	if (await storageOptions.GetIsSocketOpened() && await storageOptions.GetIsExtensionRunning()) {
		if (await storageOptions.GetLastActivateTabId() != -1) {
			inspect.sendQueryToTopScript(await storageOptions.GetLastActivateTabId(), query, msg);
		}
	}
}

async function ChangeWindow(windowId) {
	if (windowId == -1)
		return;

	if (await storageOptions.GetIsSocketOpened() && await storageOptions.GetIsExtensionRunning()) {
		await SyncStateMode({ length: 0, evt: 'windowChange' });
		await SyncqueryGuideOptions();

		if (await storageOptions.GetLastFocusWindowId() == windowId) {
			await DeactivateExtension(await storageOptions.GetLastFocusWindowId());
			await ActivateExtension(windowId);
		}
		else {
			await DeactivateExtension(await storageOptions.GetLastFocusWindowId());
			await ActivateExtension(windowId);
		}
	}

	chrome.windows.getLastFocused({ populate: true }, function (window) {
		storageOptions.SetLastFocusWindowId(window.id);
	});
}

function ReloadExtension() {
	chrome.runtime.reload();
}

function NotifyCustomKvpData(key, jsonValue) {
	let notice = false;
	switch (key) {
		case 'isIFrame':
			if (storageOptions.isIFrame != jsonValue.isIFrame
				|| storageOptions.href != jsonValue.href) {
				notice = true;
			}
			break;
		default:
			notice = false;
			break;
	}

	if (notice) {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
			inspect.notifyCustomKvpData(tab[0].id, key, jsonValue);
		});
	}
}

// ¹Ì»ç¿ë
async function LoadPort() {
	browserAppData.storage.local.get('port', function (result) {
		storageOptions.SetPort(result.port);
	});

	if (await storageOptions.GetPort() == 'undefined' || await storageOptions.GetPort() == '') {
		storageOptions.SetPort('9877');
		browserAppData.storage.local.set({
			'port': '9877'
		}, null);
	}
}
function OnStorageChanged(changes, namespace) {
	for (var key in changes) {
		chrome.tabs.query({}, function (tabs) {
			tabs.forEach(tab => {
				inspect.noticeStorageOptions(tab.id, key, changes[key].newValue);
			});
		});
	}
}
function ClearStorage() {
	chrome.storage.local.clear(); 
}

// chrome.alarms.create({ delayInMinutes: 0, periodInMinutes: 0.02 });
// chrome.alarms.onAlarm.addListener(Connect);

Connect();

//onMessageExternal
//onMessage

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (typeof request.title != 'undefined') {
			if (request.title === 'sendData') {
				SendQuery(request);
			} else if (request.title === 'loadIsPause') {
				(async () => {
					let isPause = await storageOptions.GetIsPause();
					sendResponse({ message: isPause });
				})();
				return true;
			} else if (request.title === 'saveiFrame') {
				storageOptions.SetIsIFrame(request.saveiframe);
				NotifyCustomKvpData('isIFrame', JSON.stringify({ isIFrame: request.saveiframe, href: request.href }));
				storageOptions.SetHref(request.href);
				(async () => {
					if (await storageOptions.GetIsExtensionRunning()) {
						await ActivateExtension();
					}
				})();
				return true;
			} else if (request.title === 'loadiFrame') {
				(async () => {
					let isIFrame = await storageOptions.GetIsIFrame();
					let href = await storageOptions.GetHref();
					sendResponse({ isiframe: isIFrame, href: href });
				})();
				return true;
			} else if (request.title === 'saveMainURL') {
				storageOptions.SetFullURL(request.FullURL);
				storageOptions.SetURL(request.URL);
				storageOptions.SetSearchURL(request.SearchURL);
			} else if (request.title === 'wake') {
				SendQuery(request);
			} else if (request.title === 'sendQueryToTopScript') {
				SendQueryToTopScript(request.query, request.textMsg);
			} else if (request.title === 'sendSelectedElementsLength') {
				SyncStateMode(request);
			} else if (request.title === 'getStorageOption') {
				if (request.key == 'isShowQueryGuide') {
					(async () => {
						let isShowQueryGuide = await storageOptions.GetIsShowQueryGuide();
						sendResponse({ message: isShowQueryGuide });
					})();
					return true;
                }
			}
		}
		else {
			SendQuery(request);
		}
	}
);

chrome.windows.onFocusChanged.addListener(ChangeWindow);
chrome.tabs.onActivated.addListener(ChangeTab);
chrome.tabs.onUpdated.addListener(UpdateTab);
var Host = chrome.runtime.connectNative('com.sds.rpa');

//chrome.storage.onChanged.addListener(OnStorageChanged);
//chrome.windows.onCreated.addListener(ClearStorage);




