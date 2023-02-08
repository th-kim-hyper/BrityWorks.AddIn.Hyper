const browserAppData = this.browser || this.chrome;
//const updateAvailable = (typeof browserAppData.commands.update !== 'undefined') ? true : false;

//

var versionStatus = 'Checking Version';
var updateAvailable = false;

window.onload = function() {
	GetCurrentVersion();
	LoadPort();
	//CheckUpdate();
}

async function GetCurrentVersion() {
	var manifestData = browserAppData.runtime.getManifest();
	document.querySelector('#version').textContent = manifestData.version;
}

async function LoadPort() {
	var port = '';
	browserAppData.storage.local.get('port', function(result) {
		port = result.port;
		if (typeof port == 'undefined') {
			port = '9877';
		}
		document.querySelector('#port').value = port;
	});
}

function SaveVersionStatus(e) {
	browserAppData.storage.local.set({
		'versionStatus' : versionStatus
	}, null);
	
	e && e.preventDefault();
	
}

function LoadVersionStatus() {
	browserAppData.storage.local.get('versionStatus', function(result) {
		document.querySelector('#needUpdate').textContent = result.versionStatus;
		
		if (result.versionStatus == "NeedUpdate") {
			updateAvailable = true;
		} else {
			updateAvailable = false;
		}
		
		UpdateButtonControl();
	});
}

function CheckUpdate() {
	chrome.runtime.requestUpdateCheck(function(status) {
		if (status == "update_available") {
			versionStatus = 'NeedUpdate';
			SaveVersionStatus();
		} else if (status == "no_update") {
			versionStatus = 'LatestVersion';
			SaveVersionStatus();
		} else if (status == "throttled") {
			//LoadVersionStatus();
			//versionStatus = 'throttled';
			//console.log("Oops, I'm asking too frequently - I need to back off.");
		}
		LoadVersionStatus();
		//document.querySelector('#needUpdate').textContent = versionStatus;
	});
}

async function UpdateVersion() {
	chrome.runtime.onUpdateAvailable.addListener(function(details) {
	chrome.runtime.reload();
	});
}

//

function saveOptions(e) {
	browserAppData.storage.local.set({
		'port' : document.querySelector('#port').value
	}, function() {
		const status = document.querySelector('.status');
		status.textContent = 'Options saved.';
		//updateAvailable && updateShortcut();
	});
	
	e && e.preventDefault();
}

function restoreOptions() {
  browserAppData.storage.local.get({
    port: '9877'
  }, items => {
    document.querySelector('#port').value = '9877';
  });
}

function UpdateButtonControl() {
	if (updateAvailable) {
		document.querySelector('#update').addEventListener('click', UpdateVersion);
	} else {
		document.querySelector('#update').remove();
}
}

//document.querySelector('#update').addEventListener('click', UpdateVersion);
//document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#RPA-Options').addEventListener('submit', saveOptions);
