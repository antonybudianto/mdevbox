require('./modernizr');
require('./dom-serialize');
const socketHandler = require('./socket');

function MiniLogClient(options) {
  socketHandler(options);

  var _log = console.log;
  var _error = console.error;
  var _warning = console.warn;
  var _info = console.info;

  var logFetch = options.logFetch || false;

  if (!self.fetch) {
    _warning(
      'Minilog: "fetch" is not found and it\'s required. Please provide fetch polyfill and try again.'
    );
    return;
  }

  var baseUrl = options.baseUrl;
  self.oriFetch = self.fetch;

  function prepareFetchLogging() {
    self.oriFetch = self.fetch;
    self.fetch = function(url, init) {
      return self
        .oriFetch(url, init)
        .then(res => {
          res
            .clone()
            .text()
            .then(t => {
              var data = {
                url: res.url,
                init,
                status: res.status,
                statusText: res.statusText,
                result: t
              };
              postLog('fetch', [data]);
            });
          return res;
        })
        .catch(err => {
          var data = {
            url,
            init,
            errorMessage: err.message
          };
          postLog('fetch', [data]);
          throw err;
        });
    };
  }

  function argToArr(arg) {
    return Array.prototype.slice.call(arg);
  }

  function postLog(type, messages) {
    return self
      .oriFetch(baseUrl + '/api/v1/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            type,
            href: location.pathname + location.search,
            messages: messages.map(m => JSON.stringify(m))
          },
          function(k, v) {
            if (v === undefined) {
              return 'undefined';
            }
            return v;
          }
        )
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Error posting log: ' + res.statusText);
        }
      });
  }

  window.onerror = function(event, source, lineno, colno, error) {
    postLog('window:onerror', [
      `Event: ${event}; Source: ${source}; Line: ${lineno}; Col: ${colno}; Name: ${
        error.name
      }; Message: ${error.message}; Stack: ${error.stack}`
    ]);
  };

  console.error = function() {
    postLog('error', argToArr(arguments));
    _error.apply(console, arguments);
  };

  console.log = function() {
    postLog('log', argToArr(arguments));
    _log.apply(console, arguments);
  };

  console.warn = function() {
    postLog('warn', argToArr(arguments));
    _warning.apply(console, arguments);
  };

  console.info = function() {
    postLog('info', argToArr(arguments));
    _info.apply(console, arguments);
  };

  if (logFetch) {
    prepareFetchLogging();
  }

  window.minilog = {
    postLog: postLog
  };
}

window.MiniLogClient = MiniLogClient;
