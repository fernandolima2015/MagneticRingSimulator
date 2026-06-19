import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{F as t,M as n,_ as r,d as i,g as a,h as o,m as s}from"./vendor-post-NFUJjCzR.js";import{a as c,i as l,t as u}from"./buildShader-7_z7RXOI.js";import{r as d}from"./createShaderMaterial-CROzoNMu.js";import{t as f}from"./useHyperdimensionField-CGvkqa_a.js";var p=e(t(),1),m=(()=>{let e=[];for(let t=0;t<16;t++)e.push([t&1?1:-1,t&2?1:-1,t&4?1:-1,t&8?1:-1]);return e})(),h=(()=>{let e=[];for(let t=0;t<16;t++)for(let n=t+1;n<16;n++){let r=0;for(let e=0;e<4;e++)(t^n)>>e&1&&r++;r===1&&e.push([t,n])}return e})();function g(e,t,n,r,i,a,o){let s=Math.cos(o),c=Math.sin(o),l=[n,r,i,a],u=l[e],d=l[t];return l[e]=u*s-d*c,l[t]=u*c+d*s,l}function _(e,t,n=1){let[r,i,a,o]=e,s=t*n;return[[0,3,s*.7],[1,3,s*.55],[2,3,s*.62],[0,1,s*.25],[2,1,s*.18]].forEach(([e,t,n])=>{[r,i,a,o]=g(e,t,r,i,a,o,n)}),[r,i,a,o]}function v(e,t=`PERSPECTIVE`,n=2.8){let[r,i,a,o]=e;if(t===`STEREOGRAPHIC`){let e=1/(2.2-o*.35);return[r*e,i*e,a*e]}let s=1/Math.max(.15,n-o*.85);return[r*s,i*s,a*s]}function y(e,t=1){return v(_([0,0,0,1],e,t),`PERSPECTIVE`,2.2)}function b(e,t,n,r,i,a){let o=[],s=[];for(let[c,l]of h){let u=_(m[c].map((e,r)=>e*t+(n[r]??0)),e,r),d=_(m[l].map((e,r)=>e*t+(n[r]??0)),e,r),f=v(u,i,a),p=v(d,i,a);o.push(...f,...p);let h=(u[3]+1)*.5,g=(d[3]+1)*.5;s.push(h,.4,1-h,g,.4,1-g)}return{positions:o,colors:s}}var x=n(),S=[{dir:[1,0,0],color:`#ff4466`},{dir:[0,1,0],color:`#44ff88`},{dir:[0,0,1],color:`#4488ff`}];function C(){let e=new o;e.setAttribute(`position`,new r([0,0,0,0,3,0],3));let t=new o;return t.setAttribute(`position`,new r([0,0,0,0,2,0],3)),{wGeom:e,wGhostGeom:t}}var w;function T(){return w??(w=C()),w}function E(){let e=(0,p.useRef)(),t=(0,p.useRef)(),n=(0,p.useRef)(),c=f(),l=(0,p.useMemo)(()=>{let e=[],t=[];S.forEach(({dir:n,color:r})=>{let i=new a(r);e.push(0,0,0,n[0]*5,n[1]*5,n[2]*5),t.push(i.r,i.g,i.b,i.r*.6,i.g*.6,i.b*.6)});let n=new o;return n.setAttribute(`position`,new r(e,3)),n.setAttribute(`color`,new r(t,3)),n},[]);return i(r=>{if(!c.visible||!c.wAxisVisible)return;let{wGeom:i,wGhostGeom:a}=T(),o=r.clock.elapsedTime,l=c.wAxisScale??6,u=y(o,c.rotationSpeed??1),d=Math.hypot(u[0],u[1],u[2])||1,f=u[0]/d*l,p=u[1]/d*l,m=u[2]/d*l,h=.85+Math.sin(o*2.2+c.wPhase)*.15*Math.max(c.intensity,.3);i.setAttribute(`position`,new s(new Float32Array([0,0,0,f*h,p*h,m*h]),3)),i.attributes.position.needsUpdate=!0,a.setAttribute(`position`,new s(new Float32Array([0,0,0,f*.55,p*.55,m*.55]),3)),a.attributes.position.needsUpdate=!0,e.current&&(e.current.rotation.y=c.wAxisAngle*.15);let g=.55+c.intensity*.45;t.current&&(t.current.opacity=g),n.current&&(n.current.opacity=g*.35)}),!c.visible||!c.wAxisVisible?null:(0,x.jsxs)(`group`,{ref:e,renderOrder:12,children:[(0,x.jsx)(`lineSegments`,{geometry:l,renderOrder:12,children:(0,x.jsx)(`lineBasicMaterial`,{vertexColors:!0,transparent:!0,opacity:.45,depthWrite:!1})}),(0,x.jsx)(`lineSegments`,{geometry:T().wGhostGeom,renderOrder:13,children:(0,x.jsx)(`lineBasicMaterial`,{ref:n,color:`#ff66ff`,transparent:!0,opacity:.25,blending:2,depthWrite:!1})}),(0,x.jsx)(`lineSegments`,{geometry:T().wGeom,renderOrder:14,children:(0,x.jsx)(`lineBasicMaterial`,{ref:t,color:`#ee44ff`,transparent:!0,opacity:.85,blending:2,depthWrite:!1})}),(0,x.jsxs)(`mesh`,{renderOrder:15,children:[(0,x.jsx)(`sphereGeometry`,{args:[.15,16,16]}),(0,x.jsx)(`meshBasicMaterial`,{color:`#ffffff`,transparent:!0,opacity:.95,blending:2,depthWrite:!1})]})]})}var D=[[0,0,0,0],[2.2,.5,0,.8],[-1.8,1.2,.6,-.5],[.5,-2,1,1.2],[3,-.8,-.4,-1],[-2.5,-1.5,.8,.6]],O=384;function k(){let e=new Float32Array(O*3),t=new Float32Array(O*3),n=new Float32Array(O*3),r=new o;r.setAttribute(`position`,new s(e,3)),r.setAttribute(`color`,new s(t,3));let i=new o;return i.setAttribute(`position`,new s(n,3)),{positions:e,colors:t,ghostPositions:n,geom:r,ghostGeom:i}}var A;function j(){return A??(A=k()),A}function M(){let e=(0,p.useRef)(),t=(0,p.useRef)(),n=f();return i(r=>{if(!n.visible||!n.tesseractsVisible)return;let{positions:i,colors:a,ghostPositions:o,geom:s,ghostGeom:c}=j(),l=r.clock.elapsedTime,u=n.tesseractCount??0,d=0,f=0,p=0;for(let e=0;e<u;e++){let t=1.1+e*.35,r=l*(.3+e*.08)+e*1.2,s=[(D[e]?.[0]??0)+Math.sin(r)*.4,(D[e]?.[1]??0)+Math.cos(r*.9)*.4,D[e]?.[2]??0,(D[e]?.[3]??0)+Math.sin(r*1.3)*.3],{positions:c,colors:u}=b(l+e*.5,t,s,n.rotationSpeed??1,n.projectionMode??`PERSPECTIVE`,n.projectionDepth??2.8);for(let e=0;e<c.length;e++)i[d++]=c[e];for(let e=0;e<u.length;e++)a[f++]=u[e];for(let e=0;e<c.length;e++)o[p++]=c[e]*.92}let m=d/3;s.setDrawRange(0,m),s.attributes.position.needsUpdate=!0,s.attributes.color.needsUpdate=!0,c.setDrawRange(0,m),c.attributes.position.needsUpdate=!0,e.current&&(e.current.material.opacity=.35+n.intensity*.55),t.current&&(t.current.material.opacity=.08+n.intensity*.12)}),!n.visible||!n.tesseractsVisible||(n.tesseractCount??0)<1?null:(0,x.jsxs)(`group`,{renderOrder:11,children:[(0,x.jsx)(`lineSegments`,{ref:t,geometry:j().ghostGeom,renderOrder:10,children:(0,x.jsx)(`lineBasicMaterial`,{color:`#aa66ff`,transparent:!0,opacity:.1,blending:2,depthWrite:!1})}),(0,x.jsx)(`lineSegments`,{ref:e,geometry:j().geom,renderOrder:11,children:(0,x.jsx)(`lineBasicMaterial`,{vertexColors:!0,transparent:!0,opacity:.7,blending:2,depthWrite:!1})})]})}var N={vertexShader:c(`uniform float uTime;
uniform float uFold;
uniform float uSlicePhase;
uniform float uIntensity;
uniform float uDepth;

varying vec3 vWorldPos;
varying float vW;
varying float vSlice;

void main() {
  vec3 pos = position;
  float w = sin(pos.x * 0.4 + uSlicePhase) * cos(pos.y * 0.35 + uSlicePhase * 0.7);
  w += sin(pos.z * 0.5 - uTime * 0.8) * 0.5;
  vW = w;

  float fold = uFold * uIntensity;
  pos += normal * w * fold * 2.5;
  pos.x += sin(uTime * 0.6 + pos.y * 0.2) * fold * 0.35;
  pos.y += cos(uTime * 0.5 + pos.z * 0.2) * fold * 0.35;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
  vSlice = sin(w * 6.28 + uSlicePhase) * 0.5 + 0.5;
  gl_Position = projectionMatrix * mv;
}
`,l),fragmentShader:c(`uniform float uTime;
uniform float uIntensity;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorW;

varying vec3 vWorldPos;
varying float vW;
varying float vSlice;

void main() {
  float r = length(vWorldPos.xz);
  float grid = abs(sin(vWorldPos.x * 8.0 + uTime)) * abs(sin(vWorldPos.z * 8.0 - uTime * 0.7));
  grid = smoothstep(0.92, 1.0, grid);

  float hyper = smoothstep(0.2, 0.9, vSlice) * uIntensity;
  vec3 col = mix(uColorA, uColorB, vSlice);
  col = mix(col, uColorW, abs(vW) * 0.6 + 0.2);
  col += grid * vec3(0.4, 0.7, 1.0) * hyper * 0.35;

  float rings = sin(r * 12.0 - uTime * 2.0 + vW * 4.0) * 0.5 + 0.5;
  rings = pow(rings, 4.0) * hyper * 0.5;
  col += uColorW * rings;

  float alpha = (0.08 + hyper * 0.22) * (0.4 + grid * 0.6);
  gl_FragColor = vec4(col, alpha);
}
`,u)};function P(){let e=(0,p.useRef)(),t=(0,p.useRef)(),n=(0,p.useRef)(),r=f(),a=(0,p.useMemo)(()=>d(),[]);return i(i=>{if(!r.visible||!r.projectionsVisible)return;let a=i.clock.elapsedTime,o=1+r.fold*.4,s=Math.max(r.intensity,.25);if(n.current){let e=n.current.uniforms;e.uTime.value=a,e.uFold.value=r.fold,e.uSlicePhase.value=r.slicePhase,e.uIntensity.value=s,e.uDepth.value=r.projectionDepth}e.current&&(e.current.rotation.y=a*.12,e.current.rotation.x=Math.sin(a*.08)*.2,e.current.scale.setScalar(18*o)),t.current&&(t.current.rotation.y=-a*.18,t.current.rotation.z=a*.1,t.current.scale.setScalar(14*o),t.current.material&&(t.current.material.opacity=.06+s*.14))}),!r.visible||!r.projectionsVisible?null:(0,x.jsxs)(`group`,{renderOrder:2,children:[(0,x.jsxs)(`mesh`,{ref:e,renderOrder:2,children:[(0,x.jsx)(`icosahedronGeometry`,{args:[1,4]}),(0,x.jsx)(`shaderMaterial`,{ref:n,transparent:!0,depthWrite:!1,side:2,blending:2,vertexShader:N.vertexShader,fragmentShader:N.fragmentShader,uniforms:a})]}),(0,x.jsxs)(`mesh`,{ref:t,renderOrder:3,children:[(0,x.jsx)(`icosahedronGeometry`,{args:[1,2]}),(0,x.jsx)(`meshBasicMaterial`,{color:`#8844ff`,wireframe:!0,transparent:!0,opacity:.12,depthWrite:!1})]}),(0,x.jsxs)(`mesh`,{rotation:[Math.PI/2,0,0],renderOrder:1,children:[(0,x.jsx)(`torusGeometry`,{args:[12,.03,8,128]}),(0,x.jsx)(`meshBasicMaterial`,{color:`#44aaff`,transparent:!0,opacity:.08+r.intensity*.12,depthWrite:!1})]}),(0,x.jsxs)(`mesh`,{rotation:[0,0,Math.PI/2],renderOrder:1,children:[(0,x.jsx)(`torusGeometry`,{args:[12,.03,8,128]}),(0,x.jsx)(`meshBasicMaterial`,{color:`#ff44cc`,transparent:!0,opacity:.07+r.intensity*.11,depthWrite:!1})]})]})}function F(){let e=(0,p.useRef)(),t=(0,p.useRef)(),n=(0,p.useRef)(),r=(0,p.useRef)(),o=f(),s=(0,p.useMemo)(()=>d({uColorA:new a(`#110022`),uColorB:new a(`#4400aa`),uColorW:new a(`#ff22aa`)}),[]),c=(0,p.useMemo)(()=>d({uColorA:new a(`#220044`),uColorB:new a(`#6600cc`),uColorW:new a(`#ff66cc`)}),[]);return i(i=>{if(!o.visible||!o.distortionVisible)return;let a=i.clock.elapsedTime,s=Math.max(o.intensity,.2);if(n.current){let e=n.current.uniforms;e.uTime.value=a,e.uFold.value=o.fold*1.2,e.uSlicePhase.value=o.slicePhase,e.uIntensity.value=s*.55,e.uDepth.value=o.projectionDepth}if(r.current){let e=r.current.uniforms;e.uTime.value=a,e.uFold.value=o.fold*1.5,e.uSlicePhase.value=o.slicePhase+.5,e.uIntensity.value=s*.4,e.uDepth.value=o.projectionDepth}e.current&&(e.current.rotation.y=a*.05,e.current.rotation.x=Math.sin(a*.15)*.08*o.distortion),t.current&&(t.current.rotation.y=-a*.08,t.current.rotation.x=Math.cos(a*.12)*.06*o.distortion)}),!o.visible||!o.distortionVisible?null:(0,x.jsxs)(`group`,{renderOrder:1,children:[(0,x.jsxs)(`mesh`,{ref:e,renderOrder:0,children:[(0,x.jsx)(`sphereGeometry`,{args:[22,48,48]}),(0,x.jsx)(`shaderMaterial`,{ref:n,transparent:!0,depthWrite:!1,side:1,blending:2,vertexShader:N.vertexShader,fragmentShader:N.fragmentShader,uniforms:s})]}),(0,x.jsxs)(`mesh`,{ref:t,renderOrder:1,children:[(0,x.jsx)(`sphereGeometry`,{args:[10,32,32]}),(0,x.jsx)(`shaderMaterial`,{ref:r,transparent:!0,depthWrite:!1,side:0,blending:2,vertexShader:N.vertexShader,fragmentShader:N.fragmentShader,uniforms:c})]})]})}function I(){return(0,x.jsxs)(`group`,{name:`hyperdimension-field`,children:[(0,x.jsx)(F,{}),(0,x.jsx)(P,{}),(0,x.jsx)(M,{}),(0,x.jsx)(E,{})]})}export{I as default};