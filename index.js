import { VimWasm } from '/node_modules/vim-wasm/vimwasm.js';
import fire from '/fire.js';
  const vim = new VimWasm({
    canvas: document.getElementById('vim-canvas'),
    input: document.getElementById('vim-input'),
    workerScriptPath: '/node_modules/vim-wasm/vim.js',
  });
  // this catches :w events from vim and fires query at local cores proxy
  window.writer = (query) => {
    console.log('writecatcher', query)
    fire('http://localhost:8010/proxy/api/console/proxy?path=_sql%3Fformat%3Dtxt&method=POST', [['kbn-version', '7.8.0'], ['Origin', 'http://kibana7.nsone.co:5601'], ['Referrer', 'http://kibana7.nsone.co:5601/app/kibana']])
      .POST({
        query: query
      })
      .then(out=>{
        document.querySelector('#output').innerText = out.response;
      })
      .catch(console.warn);
  } 
  // start vim. never go tthe persistence working, i think there might be a bug
  // with the indexeddb fs thingy they're using?
  // all apologies for the spacing with these mutiline strings
  vim.start({
    dirs: ['/scratch'],
    persistentDirs: ['/scratch'],
    files: {
      '/query': 'SELECT pop, host, syslog_hostname FROM logstash LIMIT 20',
      '/home/web_user/.vim/jailbreak.vim': `function! Jailbreak ()
  execute 'let buff=join(getline(1, "$"), "\\n")'
  call jsevalfunc("window.writer(arguments[0])", [buff])
endfunction
`,
      '/home/web_user/.vim/vimrc': `set expandtab tabstop=4 shiftwidth=4 softtabstop=4
colorscheme onedark
syntax enable
so /home/web_user/.vim/jailbreak.vim
autocmd BufWritePost * :execute Jailbreak()`
    },
    cmdArgs: ['/query']
  });
// lcp --proxyUrl http://kibana7.nsone.co:5601
// http-server -p 9090 --cors
