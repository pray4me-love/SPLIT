const polls = [
 {cat:"FOOD",q:"Fries are better than pizza. Fight me.",a:"Absolutely",b:"Never"},
 {cat:"MUSIC",q:"Listening to an album in order is superior to shuffle.",a:"True",b:"Cap"},
 {cat:"LIFE",q:"Being left on read for 8 hours is rude.",a:"Yes",b:"No"},
 {cat:"MOVIES",q:"The villain was right in this movie.",a:"Probably",b:"You’re insane"},
 {cat:"TECH",q:"AI makes the internet more interesting.",a:"Agree",b:"Not a chance"},
 {cat:"RELATIONSHIPS",q:"Double texting is completely fine.",a:"Obviously",b:"Have dignity"}
];

function renderPolls(){
 const feed=document.getElementById('feed'); feed.innerHTML='';
 polls.forEach((p,i)=>{
  const el=document.createElement('article'); el.className='poll';
  el.innerHTML=`<div class="poll-meta"><span>${p.cat}</span><span>${Math.floor(300+i*217)} votes</span></div>
  <h3>${p.q}</h3><div class="vote">
  <button data-side="a" style="--w:50%"><span>${p.a}</span></button>
  <button data-side="b" style="--w:50%"><span>${p.b}</span></button></div>
  <div class="status">Tap to vote · results appear after your vote</div>`;
  el.querySelectorAll('.vote button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const a=Math.floor(35+Math.random()*40), b=100-a;
      el.querySelector('[data-side="a"]').style.setProperty('--w',a+'%');
      el.querySelector('[data-side="b"]').style.setProperty('--w',b+'%');
      el.querySelectorAll('button').forEach(x=>x.classList.remove('voted'));
      btn.classList.add('voted');
      el.querySelector('.status').textContent=`${a}% vs ${b}% · you voted ${btn.dataset.side.toUpperCase()}`;
    });
  });
  feed.appendChild(el);
 });
}
renderPolls();
document.getElementById('refreshBtn').onclick=()=>{renderPolls();document.getElementById('trending').scrollIntoView({behavior:'smooth'})};

const choices=document.querySelectorAll('#choice button');
choices.forEach(b=>b.onclick=()=>document.getElementById('choiceResult').textContent=`You picked: ${b.textContent}. Defend your choice.`);
const takes=[
 "“Brunch is just breakfast with better PR.”",
 "“Voice notes longer than 2 minutes are podcasts.”",
 "“The best part of a concert is the 10 seconds you film.”",
 "“Group chats are 90% memes and 10% emergency services.”"
];
let ti=0;
document.querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>document.getElementById('takeResult').textContent=`You rated it ${b.dataset.rate}/4. Very scientific.`);
setInterval(()=>{ti=(ti+1)%takes.length;document.getElementById('take').textContent=takes[ti]},5000);

let foods=["Ramen","Pizza","Fries","Ice cream"];
const rankList=document.getElementById('rankList');
function drawRank(){rankList.innerHTML='';foods.forEach((x,i)=>{let d=document.createElement('div');d.className='rank-item';d.draggable=true;d.innerHTML=`<b>${i+1}</b><span>${x}</span>`;d.ondragstart=e=>e.dataTransfer.setData('text/plain',i);d.ondragover=e=>e.preventDefault();d.ondrop=e=>{const from=+e.dataTransfer.getData('text/plain');const to=i;[foods[from],foods[to]]=[foods[to],foods[from]];drawRank()};rankList.appendChild(d)})}
drawRank();document.getElementById('rankBtn').onclick=()=>document.getElementById('rankResult').textContent=`Locked: ${foods.join(' → ')}`;

document.getElementById('ideaForm').onsubmit=e=>{e.preventDefault();document.getElementById('ideaMsg').textContent="Idea saved in this demo. Connect a database to collect real submissions.";e.target.reset()};
document.getElementById('shareHero').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);alert('Link copied.')}catch{alert('Copy this page URL to share it.')}};
document.getElementById('randomBtn').onclick=()=>{document.getElementById('games').scrollIntoView({behavior:'smooth'});document.getElementById('choiceResult').textContent='Surprise: pick one. No overthinking.'};
