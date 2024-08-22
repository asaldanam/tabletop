import { P2PConnection } from 'app/lib/p2p/P2PConnection';

const peer = window.location.hash === '#host' ? 'host' : 'guest';

const $title = document.createElement('h1');
$title.innerText = `${peer}`;
document.body.appendChild($title);

const $chat = document.createElement('form');
const $input = document.createElement('input');
const $submit = document.createElement('button');
$submit.innerText = 'SEND';
$chat.appendChild($input);
$chat.appendChild($submit);
document.body.appendChild($chat);

const $offer = document.createElement('textarea');
$offer.placeholder = 'Offer SDP';
$offer.style.width = '100%';
$offer.style.height = '100px';
document.body.appendChild($offer);

const $answer = document.createElement('textarea');
$answer.placeholder = 'Answer SDP';
$answer.style.width = '100%';
$answer.style.height = '100px';
document.body.appendChild($answer);

(async () => {
    type Message = { text: string };
    const conn = new P2PConnection<Message>({ channel: 'my-channel', peer, debug: true });

    conn.subscribe((data) => console.log(data));

    if (peer === 'host') {
        const sdp = await conn.offer();

        $offer.value = sdp;

        $answer.oninput = async (e) => {
            await conn.accept($answer.value);
            await conn.open();
        };
    }

    if (peer === 'guest') {
        $offer.oninput = async (e) => {
            const sdp = await conn.answer($offer.value);
            $answer.value = sdp;
            await conn.open();
        };
    }

    $chat.onsubmit = (e) => {
        e.preventDefault();
        conn.send({ text: $input.value });
        $input.value = '';
    };
})();
