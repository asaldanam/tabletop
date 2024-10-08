import { useEffect } from 'react';
const Peer = window.Peer;

const Send = () => {
    useEffect(() => {
        (function () {
            var lastPeerId = null;
            var peer = null; // own peer object
            var conn = null;
            var recvIdInput = document.getElementById('receiver-id');
            var status = document.getElementById('status');
            var message = document.getElementById('message');
            var goButton = document.getElementById('goButton');
            var resetButton = document.getElementById('resetButton');
            var fadeButton = document.getElementById('fadeButton');
            var offButton = document.getElementById('offButton');
            var sendMessageBox = document.getElementById('sendMessageBox');
            var sendButton = document.getElementById('sendButton');
            var clearMsgsButton = document.getElementById('clearMsgsButton');
            var connectButton = document.getElementById('connect-button');
            var cueString = '<span class="cueMsg">Cue: </span>';

            /**
             * Create the Peer object for our end of the connection.
             *
             * Sets up callbacks that handle any events related to our
             * peer object.
             */
            async function initialize() {
                // Create own peer object with connection to shared PeerJS server
                // const media = await navigator.mediaDevices?.getUserMedia?.({ audio: true, video: true });
                // console.log('GET MEDIA', { media });

                peer = new Peer({
                    iceServers: [
                        {
                            urls: 'stun:stun.relay.metered.ca:80'
                        },
                        {
                            urls: 'turn:global.relay.metered.ca:80',
                            username: '72f8d2483176e6a31214a3a0',
                            credential: 'se8A8xoQLnCi6k+c'
                        },
                        {
                            urls: 'turn:global.relay.metered.ca:80?transport=tcp',
                            username: '72f8d2483176e6a31214a3a0',
                            credential: 'se8A8xoQLnCi6k+c'
                        },
                        {
                            urls: 'turn:global.relay.metered.ca:443',
                            username: '72f8d2483176e6a31214a3a0',
                            credential: 'se8A8xoQLnCi6k+c'
                        },
                        {
                            urls: 'turns:global.relay.metered.ca:443?transport=tcp',
                            username: '72f8d2483176e6a31214a3a0',
                            credential: 'se8A8xoQLnCi6k+c'
                        }
                    ]
                });

                peer.on('open', function (id) {
                    // Workaround for peer.reconnect deleting previous id
                    if (peer.id === null) {
                        console.log('Received null id from peer open');
                        peer.id = lastPeerId;
                    } else {
                        lastPeerId = peer.id;
                    }

                    console.log('ID: ' + peer.id);
                });
                peer.on('connection', function (c) {
                    // Disallow incoming connections
                    c.on('open', function () {
                        c.send('Sender does not accept incoming connections');
                        setTimeout(function () {
                            c.close();
                        }, 500);
                    });
                });
                peer.on('disconnected', function () {
                    status.innerHTML = 'Connection lost. Please reconnect';
                    console.log('Connection lost. Please reconnect');

                    // Workaround for peer.reconnect deleting previous id
                    peer.id = lastPeerId;
                    peer._lastServerId = lastPeerId;
                    peer.reconnect();
                });
                peer.on('close', function () {
                    conn = null;
                    status.innerHTML = 'Connection destroyed. Please refresh';
                    console.log('Connection destroyed');
                });
                peer.on('error', function (err) {
                    console.log(err);
                    alert('' + err);
                });
            }

            /**
             * Create the connection between the two Peers.
             *
             * Sets up callbacks that handle any events related to the
             * connection and data received on it.
             */
            async function join() {
                // Close old connection
                if (conn) {
                    conn.close();
                }

                // Create connection to destination peer specified in the input field
                conn = peer.connect(recvIdInput.value, {
                    reliable: true
                });

                console.log('Connecting to: ' + recvIdInput.value);

                conn.on('connection', function () {
                    console.log('connection');
                });

                conn.on('open', function () {
                    status.innerHTML = 'Connected to: ' + conn.peer;
                    console.log('Connected to: ' + conn.peer);

                    // Check URL params for comamnds that should be sent immediately
                    var command = getUrlParam('command');
                    if (command) conn.send(command);
                });
                // Handle incoming data (messages only since this is the signal sender)
                conn.on('data', function (data) {
                    addMessage('<span class="peerMsg">Peer:</span> ' + data);
                });
                conn.on('close', function () {
                    status.innerHTML = 'Connection closed';
                });
            }

            /**
             * Get first "GET style" parameter from href.
             * This enables delivering an initial command upon page load.
             *
             * Would have been easier to use location.hash.
             */
            function getUrlParam(name) {
                // eslint-disable-next-line no-useless-escape
                name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
                var regexS = '[\\?&]' + name + '=([^&#]*)';
                var regex = new RegExp(regexS);
                var results = regex.exec(window.location.href);
                if (results == null) return null;
                else return results[1];
            }

            /**
             * Send a signal via the peer connection and add it to the log.
             * This will only occur if the connection is still alive.
             */
            function signal(sigName) {
                if (conn && conn.open) {
                    conn.send(sigName);
                    console.log(sigName + ' signal sent');
                    addMessage(cueString + sigName);
                } else {
                    console.log('Connection is closed');
                }
            }

            goButton.addEventListener('click', function () {
                signal('Go');
            });
            resetButton.addEventListener('click', function () {
                signal('Reset');
            });
            fadeButton.addEventListener('click', function () {
                signal('Fade');
            });
            offButton.addEventListener('click', function () {
                signal('Off');
            });

            function addMessage(msg) {
                var now = new Date();
                var h = now.getHours();
                var m = addZero(now.getMinutes());
                var s = addZero(now.getSeconds());

                if (h > 12) h -= 12;
                else if (h === 0) h = 12;

                function addZero(t) {
                    if (t < 10) t = '0' + t;
                    return t;
                }

                message.innerHTML =
                    '<br><span class="msg-time">' + h + ':' + m + ':' + s + '</span>  -  ' + msg + message.innerHTML;
            }

            function clearMessages() {
                message.innerHTML = '';
                addMessage('Msgs cleared');
            }

            // Listen for enter in message box
            sendMessageBox.addEventListener('keypress', function (e) {
                var event = e || window.event;
                var char = event.which || event.keyCode;
                if (char === '13') sendButton.click();
            });
            // Send message
            sendButton.addEventListener('click', function () {
                if (conn && conn.open) {
                    var msg = sendMessageBox.value;
                    sendMessageBox.value = '';
                    conn.send(msg);
                    console.log('Sent: ' + msg);
                    addMessage('<span class="selfMsg">Self: </span> ' + msg);
                } else {
                    console.log('Connection is closed', conn);
                }
            });

            // Clear messages box
            clearMsgsButton.addEventListener('click', clearMessages);
            // Start peer connection on click
            connectButton.addEventListener('click', join);

            // Since all our callbacks are setup, start the process of obtaining an ID
            initialize();
        })();
    }, []);
    return (
        <>
            <h1>Peer-to-Peer Cue System --- Sender</h1>

            <table className="control">
                <tr>
                    <td className="title">Status:</td>
                    <td className="title">Messages:</td>
                </tr>
                <tr>
                    <td>
                        <span>ID: </span>
                        <input type="text" id="receiver-id" title="Input the ID from receive.html" />
                        <button id="connect-button">Connect</button>
                    </td>
                    <td>
                        <input type="text" id="sendMessageBox" placeholder="Enter a message..." autofocus="true" />
                        <button type="button" id="sendButton">
                            Send
                        </button>
                        <button type="button" id="clearMsgsButton">
                            Clear Msgs (Local)
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="status" className="status"></div>
                    </td>
                    <td>
                        <div className="message" id="message"></div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="button" className="control-button" id="resetButton">
                            Reset
                        </button>
                    </td>
                    <td>
                        <button type="button" className="control-button" id="goButton">
                            Go
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="button" className="control-button" id="fadeButton">
                            Fade
                        </button>
                    </td>
                    <td>
                        <button type="button" className="control-button" id="offButton">
                            Off
                        </button>
                    </td>
                </tr>
            </table>
        </>
    );
};

export default Send;
