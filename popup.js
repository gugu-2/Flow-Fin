document.getElementById('export').addEventListener('click', async () => {
  let tabs = await chrome.tabs.query({});
  let csv = 'Title,URL\n' + tabs.map(tab =>
    `"${tab.title.replace(/"/g, '""')}","${tab.url.replace(/"/g, '""')}"`
  ).join('\n');
  // Encode CSV as data URL
  let url = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  chrome.downloads.download({
    url: url,
    filename: 'tabs.csv',
    saveAs: true
  });
});  