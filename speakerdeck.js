(function() {
  var IframePlayer = function(iframe) {
    this.iframe = iframe;
    this.player = iframe.contentWindow.player;
  };
  IframePlayer.prototype = {
    next: function() {
      this.player.nextSlide();
    },
    prev: function() {
      this.player.previousSlide();
    },
    fullscreen: function() {
      this.iframe.mozRequestFullScreen();
    }
  };

  var HandleSpeakerdeck = function() {
    var doc = content.document;
    if (doc.location.host !== 'speakerdeck.com') {
      return liberator.echoerr('This is not speakerdeck...');
    }
    var iframe = doc.wrappedJSObject.querySelector('iframe.speakerdeck-iframe');
    var iframePlayer = new IframePlayer(iframe);
    return iframePlayer;
  };

  liberator.modules.commands.addUserCommand(
    ['speakerdeck'],
    'Speakerdeck controller',
    function() {},
    {
      subCommands: [
        new Command(['n[ext]'], 'Go next page',
                    function() {HandleSpeakerdeck().next()}),
        new Command(['p[rev]'], 'Go prev page',
                    function() {HandleSpeakerdeck().prev()}),
        new Command(['f[ullscreen]'], 'Toggle fullscreen',
                    function() {HandleSpeakerdeck().fullscreen()})
      ]
    },
    true
  );
})();
