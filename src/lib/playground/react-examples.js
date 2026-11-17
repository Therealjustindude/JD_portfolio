/**
 * Standalone React/JSX counterparts to the Svelte examples.
 * Physics lives in an effect closure; React state holds only rendered output.
 * @param {import('./experiments').Feature[]} features
 * @param {string} color
 * @param {boolean} triangle
 * @param {'toast' | 'clear' | undefined} reaction
 */
export function reactExample(features, color, triangle, reaction) {
	const has = (/** @type {import('./experiments').Feature} */ feature) =>
		features.includes(feature);
	const edge = has('edge'),
		spring = has('spring'),
		tether = has('tether');
	const inertia = has('inertia'),
		magnet = has('magnet'),
		ripple = has('ripple');
	const w = edge ? 160 : 96,
		h = edge ? 104 : 96;
	const geometry = edge
		? `    const { x, y, width, height } = m;
    const w = W, h = H;
    const [left, right, top, bottom] = [x-w/2, width-x-w/2, y-h/2, height-y-h/2]
      .map(distance => Math.pow(clamp(1-distance/70, 0, 1), 2));
    const drawW = w*(1+.25*Math.max(top,bottom)-.18*Math.max(left,right));
    const drawH = h*(1+.42*Math.max(left,right)-.18*Math.max(top,bottom));
    const drawX = x+(drawW/2-x)*left+(width-drawW/2-x)*right;
    const drawY = y+(drawH/2-y)*top+(height-drawH/2-y)*bottom;
    const radius = [Math.max(left,top),Math.max(right,top),
      Math.max(right,bottom),Math.max(left,bottom)]
      .map(pull => (h/2*(1-pull))+'px').join(' ');
    return { x:clamp(drawX,drawW/2,width-drawW/2),
      y:clamp(drawY,drawH/2,height-drawH/2),w:drawW,h:drawH,radius };`
		: `    return { x:m.x, y:m.y, w:W, h:H, radius:'${triangle ? '0' : tether ? '18px' : inertia ? '24px' : '50%'}' };`;
	const motion =
		spring || tether
			? `      if (${spring ? '' : '!drag && '}!reduced) {
        m.vx=(m.vx+(m.tx-m.x)*${tether ? '.035' : '.055'}*dt)*Math.pow(${spring && tether ? '.87' : '.84'},dt);
        m.vy=(m.vy+(m.ty-m.y)*${tether ? '.035' : '.055'}*dt)*Math.pow(${spring && tether ? '.87' : '.84'},dt);
        m.x=clamp(m.x+m.vx*dt,W/2,m.width-W/2);
        m.y=clamp(m.y+m.vy*dt,H/2,m.height-H/2);
      }`
			: inertia
				? `      if (!drag && !reduced) {
        m.x+=m.vx*dt; m.y+=m.vy*dt;
        if(m.x<W/2 || m.x>m.width-W/2) m.vx*=${edge ? '-.6' : '-.78'};
        if(m.y<H/2 || m.y>m.height-H/2) m.vy*=${edge ? '-.6' : '-.78'};
        m.x=clamp(m.x,W/2,m.width-W/2); m.y=clamp(m.y,H/2,m.height-H/2);
        m.vx*=Math.pow(.985,dt); m.vy*=Math.pow(.985,dt);
${
	magnet
		? `        const point=anchors().find(p=>Math.hypot(p.x-m.x,p.y-m.y)<48);
        if(point) { m.x=m.tx=point.x; m.y=m.ty=point.y; m.vx=m.vy=0; }`
		: ''
}
      }`
				: '';
	const css = ripple
		? `@keyframes motionEcho { from {scale:1;opacity:.55} to {scale:3.8;opacity:0} }
@media(prefers-reduced-motion:reduce){.motion-echo{display:none}}`
		: '';
	return `"use client";
import { useEffect, useRef, useState } from 'react';

export default function MotionExample() {
  const W=${w}, H=${h}, color='${color}';
  const shape=useRef(null);
  const [view,setView]=useState({x:240,y:180,w:W,h:H,radius:'50%',rings:[],anchors:[],homeX:240,homeY:180});
${reaction === 'toast' ? "  const [toast,setToast]=useState('');" : ''}
${reaction === 'clear' ? "  const [draft,setDraft]=useState('A wall hit will clear this…');\n  const [clearCount,setClearCount]=useState(0);" : ''}

  useEffect(()=>{
    const node=shape.current;
    if(!node) return;
    const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
    const m={x:240,y:180,tx:240,ty:180,vx:0,vy:0,width:800,height:600,homeX:240,homeY:180};
    let drag=null, frame=0, previous=0, reduced=false;
${ripple ? '    let rings=[], nextId=0, lastRing=0, echoX=240, echoY=180;' : ''}
${reaction === 'toast' ? '    let toastTimer, lastToastAt=-Infinity;' : ''}
    function geometry() {
${geometry}
    }
${
	magnet
		? `    function anchors() {
      const radius=Math.min(82,m.width*.12);
      return [0,1,2,3].map(i=>({x:m.homeX+Math.cos(i*Math.PI/2)*radius,
        y:m.homeY+Math.sin(i*Math.PI/2)*radius}));
    }`
		: ''
}
${
	ripple
		? `    function echo(now,force=false) {
      if(reduced || now-lastRing<95 || (!force && Math.hypot(m.x-echoX,m.y-echoY)<8)) return;
      lastRing=now; echoX=m.x; echoY=m.y;
      const g=geometry();
      rings.push({id:nextId++,x:g.x,y:g.y,born:now});
    }`
		: ''
}
${
	reaction
		? `    function onWallHit(walls) {
${
	reaction === 'clear'
		? "      setDraft(''); setClearCount(count=>count+1);"
		: `      const now=performance.now();
      if(now-lastToastAt<1000) return;
      lastToastAt=now;
      setToast('Ouch! That hurts. ('+walls.join(' + ')+' wall)');
      clearTimeout(toastTimer);
      toastTimer=setTimeout(()=>setToast(''),3500);`
}
    }
    function checkWalls(before) {
      const walls=[];
      if(before.x>W/2 && m.x<=W/2) walls.push('left');
      if(before.x<m.width-W/2 && m.x>=m.width-W/2) walls.push('right');
      if(before.y>H/2 && m.y<=H/2) walls.push('top');
      if(before.y<m.height-H/2 && m.y>=m.height-H/2) walls.push('bottom');
      if(walls.length) onWallHit(walls);
    }`
		: ''
}
    function down(e) {
      if(e.button!==0 || drag) return;
      node.setPointerCapture(e.pointerId);
      const g=geometry();
      drag={id:e.pointerId,ox:e.clientX-g.x,oy:e.clientY-g.y,
        x:e.clientX,y:e.clientY,time:performance.now()};
      m.vx=m.vy=0;
${ripple ? '      echo(performance.now(),true);' : ''}
    }
    function move(e) {
      if(!drag || drag.id!==e.pointerId) return;
${reaction ? '      const before={x:m.x,y:m.y};' : ''}
      const now=performance.now(), elapsed=Math.max(8,now-drag.time);
      m.tx=clamp(e.clientX-drag.ox,W/2,m.width-W/2);
      m.ty=clamp(e.clientY-drag.oy,H/2,m.height-H/2);
${
	inertia
		? `      m.vx=clamp((e.clientX-drag.x)/elapsed*16.67,-35,35);
      m.vy=clamp((e.clientY-drag.y)/elapsed*16.67,-35,35);`
		: ''
}
${
	magnet
		? `      const p=anchors().sort((a,b)=>Math.hypot(a.x-m.tx,a.y-m.ty)-Math.hypot(b.x-m.tx,b.y-m.ty))[0];
      if(Math.hypot(p.x-m.tx,p.y-m.ty)<48) {m.tx=p.x;m.ty=p.y;}`
		: ''
}
      ${spring ? 'if(reduced) ' : ''}{m.x=m.tx;m.y=m.ty;}
${reaction ? '      checkWalls(before);' : ''}
${ripple ? '      echo(now);' : ''}
      drag.x=e.clientX;drag.y=e.clientY;drag.time=now;
    }
    function up(e) {
      if(!drag || drag.id!==e.pointerId) return;
      if(e.type==='pointercancel' || performance.now()-drag.time>100) m.vx=m.vy=0;
      drag=null;
${spring || tether ? '      m.tx=m.homeX;m.ty=m.homeY;\n      if(reduced){m.x=m.tx;m.y=m.ty;}' : ''}
    }
    function key(e) {
      const direction={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];
      if(!direction) return;
      e.preventDefault();
${reaction ? '      const before={x:m.x,y:m.y};' : ''}
      m.x=m.tx=clamp(m.x+direction[0]*20,W/2,m.width-W/2);
      m.y=m.ty=clamp(m.y+direction[1]*20,H/2,m.height-H/2);
${reaction ? '      checkWalls(before);' : ''}
    }
    const media=matchMedia('(prefers-reduced-motion:reduce)');
    const preference=()=>{reduced=media.matches;};
    function resize() {
      m.width=innerWidth;m.height=innerHeight;
      m.x=m.tx=m.homeX=m.width/2; m.y=m.ty=m.homeY=m.height/2;
      m.vx=m.vy=0;drag=null;
    }
    preference();resize();
    media.addEventListener('change',preference);
    window.addEventListener('resize',resize);
    const events={pointerdown:down,pointermove:move,pointerup:up,
      pointercancel:up,lostpointercapture:up,keydown:key};
    Object.entries(events).forEach(([name,handler])=>node.addEventListener(name,handler));
    function tick(now) {
      const dt=Math.min((now-(previous||now))/16.67,2); previous=now;
${reaction ? '      const before={x:m.x,y:m.y};' : ''}
${motion}
${reaction ? '      checkWalls(before);' : ''}
${ripple ? '      echo(now);rings=rings.filter(r=>now-r.born<1400);' : ''}
      setView({...geometry(),homeX:m.homeX,homeY:m.homeY,
        anchors:${magnet ? 'anchors()' : '[]'},rings:${ripple ? '[...rings]' : '[]'}});
      frame=requestAnimationFrame(tick);
    }
    frame=requestAnimationFrame(tick);
    return ()=>{
      cancelAnimationFrame(frame);
${reaction === 'toast' ? '      clearTimeout(toastTimer);' : ''}
      media.removeEventListener('change',preference);
      window.removeEventListener('resize',resize);
      Object.entries(events).forEach(([name,handler])=>node.removeEventListener(name,handler));
    };
  },[W,H]); // The effect closure owns physics; handlers never read stale render state.

  return <div style={{position:'fixed',inset:0,overflow:'hidden',background:'#111412'}}>
${css ? `    <style>{${JSON.stringify(css)}}</style>` : ''}
${
	magnet || tether
		? `    <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}} aria-hidden="true">
${magnet ? '      {view.anchors.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="4" fill={color}/>)}' : ''}
${tether ? '      <line x1={view.homeX} y1={view.homeY} x2={view.x} y2={view.y} stroke={color}/>' : ''}
    </svg>`
		: ''
}
${
	ripple
		? `    {view.rings.map(r=><span key={r.id} className="motion-echo" style={{position:'absolute',
      left:r.x,top:r.y,width:W,height:W,translate:'-50% -50%',border:'1px solid '+color,
      borderRadius:'50%',pointerEvents:'none',animation:'motionEcho 1.4s ease-out both'}}/> )}`
		: ''
}
${
	reaction === 'toast'
		? `    <div role="status" style={{position:'absolute',top:24,left:'50%',translate:'-50% 0',
      zIndex:2,color:'#b6ed91',background:'#233022',padding:toast?16:0,borderRadius:12}}>{toast}</div>`
		: ''
}
${
	reaction === 'clear'
		? `    <div style={{position:'absolute',top:'72%',left:'50%',translate:'-50% 0',zIndex:2,color:'#ddd'}}>
      <label htmlFor="draft">Type something, then hit a wall.</label><br/>
      <input id="draft" value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Cleared by a collision"/>
      <button onClick={()=>setDraft('Try another wall hit')}>Refill</button>
      <p role="status">Cleared {clearCount} times</p>
    </div>`
		: ''
}
    <button ref={shape} aria-label="Drag to explore; arrow keys to move" style={{
      position:'absolute',zIndex:3,left:view.x,top:view.y,width:view.w,height:view.h,
      transform:'translate(-50%,-50%)',border:0,borderRadius:view.radius,
      background:color,cursor:'grab',touchAction:'none',userSelect:'none'
${triangle ? ",clipPath:'polygon(50% 0,100% 100%,0 100%)'" : ''}
    }}/>
  </div>;
}`;
}
