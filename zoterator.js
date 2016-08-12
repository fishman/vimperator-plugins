/* NEW BSD LICENSE {{{
Copyright (c) 2009-2012, kozo2.
All rights reserved.
Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:
    1. Redistributions of source code must retain the above copyright notice,
       this list of conditions and the following disclaimer.
    2. Redistributions in binary form must reproduce the above copyright notice,
       this list of conditions and the following disclaimer in the documentation
       and/or other materials provided with the distribution.
    3. The names of the authors may not be used to endorse or promote products
       derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
THE POSSIBILITY OF SUCH DAMAGE.
###################################################################################
# http://sourceforge.jp/projects/opensource/wiki/licenses%2Fnew_BSD_license       #
# に参考になる日本語訳がありますが、有効なのは上記英文となります。                #
###################################################################################
}}} */

// INFO {{{
let INFO = xml`
  <plugin name="zoterator.js" version="1.0.0"
          href="http://vimpr.github.com/"
          summary="Zotero controller"
          lang="en-US"
          xmlns="http://vimperator.org/namespaces/liberator">
    <author email="knishida@riken.jp">kozo2</author>
    <license>New BSD License</license>
    <project name="Vimperator" minVersion="3.0"/>
    <p>Zotero commandline controller</p>
    <item>
      <tags>:zoterator mapping sample</tags>
      <description><p>
        Description for Command
      </p>
      <code><![CDATA[
javascript<<EOM
liberator.globalVariables.this_is_sample = [{
    neko_tails: 2,
    neko_eyes: 2,
    neko_legs: 4,
    neko_head: 1
  }];
EOM
      ]]></code>
      </description>
    </item>
  </plugin>
`;
// }}}


(function () {
  // XXX 以下は実行しないよ。
  //return;


  /********************************************************************************
   * ユーザコマンド定義
   ********************************************************************************/

  commands.addUserCommand(
    ['zote[ro]'],
    'Zotero controller',
    function () void 'Meow is best',
    {

    // function (args) {
    //   args.literalArg;
    //   args.length;
    //   args.bang;          // :command!
    //   args.count;         // :10command  入力されていない時は -1
    //   args['-option1'];
    // },
    // {
    //   literal: 0,
    //   bang: true,
    //   count: true,
    //   argCount: '*', // 0 1 + * ?
    //   options: [
    //     [['-force'], commands.OPTION_NOARG],
    //     [['-fullscreen', '-f'], commands.OPTION_BOOL],
    //     [['-language'], commands.OPTION_STRING, null, [['perl', 'llama'], ['ruby', 'rabbit']]],
    //     [['-speed'], commands.OPTION_INT],
    //     [['-acceleration'], commands.OPTION_FLOAT],
    //     [['-accessories'], commands.OPTION_LIST, validaterFunc, ['foo', 'bar']],
    //     [['-other'], commands.OPTION_ANY]
    //   ],
    //   completer: function (context, args) {
    //     context.title = ['value', 'description'];
    //     context.filters = [CompletionContext.Filter.textDescription]; // 説明(desc)もフィルタリング対象にする
    //     context.completions = [
    //       ['item1', 'desc1'],
    //     ];
    //   },

      // サブコマンド ( aptitude install ... みたいなもの)
      // Command のインスタンスの配列を渡します
      subCommands: [
        new Command(
          ['toggletab'],
          'toggle tab',
          function () {
	    // var Zotero = Components.classes["@zotero.org/Zotero;1"]
	    //                                 .getService(Components.interfaces.nsISupports)
	    //                                 .wrappedJSObject;

            var ZoteroPane = Components.classes["@mozilla.org/appshell/window-mediator;1"]
		                                .getService(Components.interfaces.nsIWindowMediator)
		                                .getMostRecentWindow("navigator:browser")
		                                .ZoteroPane;
            
	    ZoteroPane.toggleTab();
          },
	  {}
        ),

        new Command(
          ['subB'],
          'Sub command B',
          function (args) { },
          {}
        )

      ]
    },
    true // replace
  );


  /********************************************************************************
   * オプションの定義
   ********************************************************************************/

  // options.add(
  //   ['names'],
  //   'description',
  //   'string', // type: string, stringlist, charlist, boolean, number
  //   'defaultValue',
  //   {
  //     scope: Option.SCOPE_GLOBAL, // <- default
  //                                 // or Option.SCOPE_LOCAL, Option.SCOPE_BOTH
  //     setter: function (value) {
  //       /* mozo mozo */
  //       return value;
  //     },
  //     getter: function (value) {
  //       /* mozo mozo */
  //       return value;
  //     },
  //     completer: function () {
  //       return [
  //         ["value1", "description one"],
  //         ["value2", "description two"],
  //         ["value3", "description three"],
  //       ];
  //     },
  //     validator: function () {
  //     },
  //     checkHas: function () {
  //     }
  //   }
  // );


  /********************************************************************************
   * ヒント定義
   ********************************************************************************/

  // hints.addMode(
  //   'm', // mode char
  //   'description',
  //   function (elem, loc, count) {
  //   },
  //   function () '//*'
  // );


  /********************************************************************************
   * マッピング定義
   ********************************************************************************/

  // mappings.addUserMap(
  //   [modes.NORMAL, modes.INSERT, modes.COMMAND_LINE, modes.VISUAL],
  //   ['`moge'],
  //   'Description',
  //   // extraInfo で指定していない引数は渡されません
  //   //   count => 入力されていない場合は - 1
  //   function (motion, count, arg) {
  //   },
  //   {
  //     noremap: true,
  //     silent: true,
  //     rhs: '`rhs',
  //     motion: true,
  //     count: true,
  //     arg: true
  //   }
  // );


  /********************************************************************************
   * オートコマンド (各イベント発生時に自動的に呼ばれます)
   ********************************************************************************/

  // autocommands.add(
  //   'LocationChange',
  //   '.*',
  //   function (args) {
  //     args.url;
  //     args.state // at Fullscreen
  //   }
  //   // or 'js ex-command'
  // );

})();

// vim:sw=2 ts=2 et si fdm=marker:
