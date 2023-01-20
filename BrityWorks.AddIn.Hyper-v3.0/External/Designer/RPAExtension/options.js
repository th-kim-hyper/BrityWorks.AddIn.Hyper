const browserAppData = this.browser || this.chrome;

var versionStatus = 'Checking Version';
var updateAvailable = false;

function Init() {
	GetCurrentVersion();
	LoadOptions();
}

async function GetCurrentVersion() {
	var manifestData = browserAppData.runtime.getManifest();
	document.querySelector('#version').textContent = manifestData.version;
}

function SaveOptions(e) {
	chrome.storage.local.set({
		'port' : document.querySelector('#port').value,
		'isShowQueryGuide': document.querySelector('#isShowQueryGuide').checked
	}, function() {
		const status = document.querySelector('.status');
		status.textContent = 'Options saved.';
	});
	
	e && e.preventDefault();
}

async function LoadOptions() {
	await LoadPort();
	await LoadShowQueryGuide();
}

async function LoadPort() {
	var port = '';
	await chrome.storage.local.get('port', function(result) {
		port = result.port;
		if (port == undefined) {
			port = '9877';
		}
		document.querySelector('#port').value = port;
	});
}

async function LoadShowQueryGuide() {
	var isShowQueryGuide = false;
	await chrome.storage.local.get('isShowQueryGuide', function (result) {
		isShowQueryGuide = result.isShowQueryGuide;
		if (isShowQueryGuide == undefined) {
			isShowQueryGuide = false;
		}
		
		document.querySelector('#isShowQueryGuide').checked = isShowQueryGuide;
	});
}

document.querySelector('#RPA-Options').addEventListener('submit', SaveOptions);
document.addEventListener("DOMContentLoaded", Init);