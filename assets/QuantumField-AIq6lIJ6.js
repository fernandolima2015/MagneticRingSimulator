import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{F as t,M as n,d as r}from"./vendor-post-NFUJjCzR.js";import{a as i,i as a}from"./buildShader-7_z7RXOI.js";import{o}from"./createShaderMaterial-CROzoNMu.js";import{t as s}from"./useQuantumField-0eQdWZLA.js";var c=e(t(),1),l=`// Espuma quântica + flutuação — vértices caóticos no vácuo

uniform float uTime;
uniform float uFluctuation;
uniform float uFoam;
uniform float uCoherence;
uniform float uPhase;

attribute float aSeed;
attribute float aLayer;
attribute float aMode;

varying float vAlpha;
varying vec3 vColor;
varying float vFlicker;

void main() {
  vec3 pos = position;
  float t = uTime * (0.6 + uFluctuation * 2.5);
  float seed = aSeed * 97.13;

  float foamN = fbm(pos * 0.18 + vec3(seed, t * 0.3, aLayer), 5);
  float micro = snoise(pos * 2.5 + vec3(t * 1.7, seed, uPhase)) * uFluctuation;

  pos += normalize(pos + vec3(0.001, seed, aLayer)) * foamN * uFoam * 3.5;
  pos += vec3(
    snoise(vec3(seed, t, aLayer)),
    snoise(vec3(aLayer, seed, t * 1.3)),
    snoise(vec3(t, aLayer, seed))
  ) * uFluctuation * 1.8;

  if (aMode > 0.5) {
    float pulse = sin(t * 8.0 + seed * 40.0) * cos(t * 5.0 - seed * 20.0);
    pos *= 1.0 + pulse * uFluctuation * 0.15;
    micro += pulse * 0.4;
  }

  vFlicker = foamN + micro;
  vAlpha = (0.08 + foamN * uFoam * 0.5 + abs(micro) * 0.35) * (0.4 + uCoherence * 0.6);
  vAlpha *= 0.5 + 0.5 * sin(t * 12.0 + seed * 80.0);

  vec3 cold = vec3(0.15, 0.85, 1.0);
  vec3 hot = vec3(1.0, 0.15, 0.85);
  vec3 voidCol = vec3(0.55, 0.25, 1.0);
  vColor = mix(cold, hot, aLayer + foamN * 0.5);
  vColor = mix(vColor, voidCol, (1.0 - uCoherence) * 0.6);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float size = (0.8 + aLayer * 2.0 + foamN * 3.0) * (1.0 + uFoam * 2.0) * (90.0 / max(-mv.z, 1.0));
  gl_PointSize = clamp(size, 0.3, 6.0);
  gl_Position = projectionMatrix * mv;
}
`,u=`// Espuma quântica — pontos iridescentes e instáveis

varying float vAlpha;
varying vec3 vColor;
varying float vFlicker;

void main() {
  vec2 pc = gl_PointCoord - 0.5;
  float d = length(pc);
  if (d > 0.5) discard;

  float core = smoothstep(0.5, 0.0, d);
  float halo = exp(-d * 6.0) * 0.5;
  float sparkle = smoothstep(0.35, 0.0, abs(pc.x * pc.y) * 8.0) * vFlicker;

  vec3 col = vColor * (core + halo + sparkle * 0.6);
  col += vec3(0.6, 0.9, 1.0) * sparkle * 0.25;

  float alpha = (core + halo * 0.4) * vAlpha;
  if (alpha < 0.02) discard;

  gl_FragColor = vec4(col, alpha);
}
`,d=`// Tunelamento quântico — partículas atravessam barreiras de probabilidade

uniform float uTime;
uniform float uTunnelRate;
uniform float uFluctuation;
uniform float uPhase;

attribute float aSeed;
attribute vec3 aOrigin;
attribute vec3 aTarget;
attribute float aBarrier;

varying float vAlpha;
varying vec3 vColor;
varying float vTunnel;

void main() {
  float seed = aSeed * 131.7;
  float cycle = fract(uTime * (0.15 + uTunnelRate * 1.2) + seed);
  float tunneling = smoothstep(0.38, 0.42, cycle) * smoothstep(0.62, 0.58, cycle);
  tunneling *= uTunnelRate * (1.0 + sin(seed * 50.0) * 0.5);

  vec3 pos = mix(aOrigin, aTarget, cycle);
  if (tunneling > 0.01) {
    float ghost = sin(cycle * 3.14159 * 4.0);
    pos = mix(pos, (aOrigin + aTarget) * 0.5, abs(ghost) * 0.7);
    pos += vec3(fbm(vec3(seed, uTime, uPhase), 3)) * uFluctuation * 2.0;
  }

  vTunnel = tunneling;
  vAlpha = tunneling * 0.9 + (1.0 - tunneling) * 0.05 * uTunnelRate;
  vAlpha *= 0.4 + 0.6 * sin(uTime * 20.0 + seed);

  vColor = mix(vec3(0.2, 1.0, 0.9), vec3(1.0, 0.9, 0.2), tunneling);
  vColor += vec3(0.8, 0.4, 1.0) * aBarrier * tunneling;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float size = (1.5 + tunneling * 5.0) * (100.0 / max(-mv.z, 1.0));
  gl_PointSize = clamp(size, 0.5, 8.0);
  gl_Position = projectionMatrix * mv;
}
`,f=`// Tunelamento — flash de probabilidade

varying float vAlpha;
varying vec3 vColor;
varying float vTunnel;

void main() {
  vec2 pc = gl_PointCoord - 0.5;
  float d = length(pc);
  if (d > 0.5) discard;

  float ring = smoothstep(0.5, 0.35, d) * smoothstep(0.1, 0.25, d);
  float core = smoothstep(0.5, 0.0, d);

  vec3 col = vColor * (core + ring * vTunnel * 2.0);
  col += vec3(1.0) * vTunnel * ring * 0.4;

  float alpha = (core * 0.6 + ring * vTunnel) * vAlpha;
  gl_FragColor = vec4(col, alpha);
}
`,p=`// Pares virtuais — criação e aniquilação e⁺e⁻

uniform float uTime;
uniform float uPairRate;
uniform float uFluctuation;
uniform float uPhase;

attribute float aSeed;
attribute vec3 aCenter;
attribute vec3 aOffset;
attribute float aCharge;

varying float vAlpha;
varying vec3 vColor;
varying float vLife;

void main() {
  float seed = aSeed * 73.11;
  float period = 1.8 / (0.2 + uPairRate * 2.0);
  float life = fract(uTime / period + seed);
  float spawn = smoothstep(0.0, 0.08, life) * smoothstep(1.0, 0.75, life);
  float separation = life * (2.5 + uPairRate * 4.0);

  vec3 dir = normalize(aOffset + vec3(snoise(vec3(seed, 0.0, uPhase)), 0.01, 0.0));
  vec3 pos = aCenter + dir * separation * (0.5 + aCharge * 0.5);
  pos += vec3(snoise(pos * 0.5 + vec3(uTime, seed, uPhase))) * uFluctuation * 0.8;

  vLife = spawn;
  vAlpha = spawn * (0.5 + uPairRate * 0.5);
  vColor = aCharge > 0.0 ? vec3(1.0, 0.25, 0.55) : vec3(0.2, 0.85, 1.0);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float size = (1.0 + spawn * 4.0 + separation * 0.3) * (80.0 / max(-mv.z, 1.0));
  gl_PointSize = clamp(size, 0.4, 7.0);
  gl_Position = projectionMatrix * mv;
}
`,m=`// Par virtual — traço de annihilation

varying float vAlpha;
varying vec3 vColor;
varying float vLife;

void main() {
  vec2 pc = gl_PointCoord - 0.5;
  float d = length(pc);
  if (d > 0.5) discard;

  float core = smoothstep(0.5, 0.0, d);
  float trail = smoothstep(0.5, 0.2, abs(pc.x)) * smoothstep(0.5, 0.0, abs(pc.y));

  vec3 col = vColor * (core + trail * 0.3);
  col += vec3(1.0, 0.95, 0.8) * vLife * core * 0.5;

  float alpha = (core + trail * 0.2) * vAlpha * vLife;
  gl_FragColor = vec4(col, alpha);
}
`,h={vertexShader:i(l,a),fragmentShader:i(u,a)},g={vertexShader:i(d,a),fragmentShader:i(f,a)},_={vertexShader:i(p,a),fragmentShader:i(m,a)},v=n(),y=6500,b=2800;function x(e,t,n){let r=new Float32Array(e*3),i=new Float32Array(e),a=new Float32Array(e),o=new Float32Array(e);for(let s=0;s<e;s++){let c=Math.random()*Math.PI*2,l=Math.acos(2*Math.random()-1),u=t+Math.random()*(n-t);r[s*3]=u*Math.sin(l)*Math.cos(c),r[s*3+1]=u*Math.sin(l)*Math.sin(c)*.7,r[s*3+2]=u*Math.cos(l),i[s]=Math.random(),a[s]=Math.random(),o[s]=+(s<e*.45)}return{positions:r,seeds:i,layers:a,modes:o}}function S(){let e=(0,c.useRef)(),t=(0,c.useRef)(),n=s(),i=(0,c.useMemo)(()=>x(y,6,95),[]),a=(0,c.useMemo)(()=>x(b,3,45),[]),l=(0,c.useMemo)(()=>o(),[]),u=(0,c.useMemo)(()=>o(),[]);if(r(r=>{let i=r.clock.elapsedTime,a=e=>{if(!e.current)return;let t=e.current.uniforms;t.uTime.value=i,t.uFluctuation.value=n.fluctuation,t.uFoam.value=n.foam,t.uCoherence.value=n.coherence,t.uPhase.value=n.phase};a(e),a(t)}),!(n.intensity>.02))return null;let d={transparent:!0,depthWrite:!1,blending:2,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader};return(0,v.jsxs)(`group`,{renderOrder:-5,children:[(0,v.jsxs)(`points`,{frustumCulled:!1,renderOrder:-5,children:[(0,v.jsxs)(`bufferGeometry`,{children:[(0,v.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[i.positions,3]}),(0,v.jsx)(`bufferAttribute`,{attach:`attributes-aSeed`,args:[i.seeds,1]}),(0,v.jsx)(`bufferAttribute`,{attach:`attributes-aLayer`,args:[i.layers,1]}),(0,v.jsx)(`bufferAttribute`,{attach:`attributes-aMode`,args:[i.modes,1]})]}),(0,v.jsx)(`shaderMaterial`,{ref:e,...d,uniforms:l})]}),(0,v.jsxs)(`points`,{frustumCulled:!1,renderOrder:-4,children:[(0,v.jsxs)(`bufferGeometry`,{children:[(0,v.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[a.positions,3]}),(0,v.jsx)(`bufferAttribute`,{attach:`attributes-aSeed`,args:[a.seeds,1]}),(0,v.jsx)(`bufferAttribute`,{attach:`attributes-aLayer`,args:[a.layers,1]}),(0,v.jsx)(`bufferAttribute`,{attach:`attributes-aMode`,args:[a.modes,1]})]}),(0,v.jsx)(`shaderMaterial`,{ref:t,...d,uniforms:u})]})]})}var C=1200;function w(e){let t=new Float32Array(e*3),n=new Float32Array(e*3),r=new Float32Array(e*3),i=new Float32Array(e),a=new Float32Array(e);for(let o=0;o<e;o++){let e=Math.random()*Math.PI*2,s=2.5+Math.random()*3,c=5+Math.random()*12,l=(Math.random()-.5)*2,u=(Math.random()-.5)*4;n[o*3]=Math.cos(e)*s,n[o*3+1]=l,n[o*3+2]=Math.sin(e)*s;let d=e+(Math.random()-.5)*1.2;r[o*3]=Math.cos(d)*c,r[o*3+1]=u,r[o*3+2]=Math.sin(d)*c,t[o*3]=n[o*3],t[o*3+1]=n[o*3+1],t[o*3+2]=n[o*3+2],i[o]=Math.random(),a[o]=Math.random()}return{positions:t,origins:n,targets:r,seeds:i,barriers:a}}function T(){let e=(0,c.useRef)(),t=s(),n=(0,c.useMemo)(()=>w(C),[]),i=(0,c.useMemo)(()=>o(),[]);return r(n=>{if(!e.current)return;let r=e.current.uniforms;r.uTime.value=n.clock.elapsedTime,r.uTunnelRate.value=t.tunnel,r.uFluctuation.value=t.fluctuation,r.uPhase.value=t.phase}),t.tunnel<.03&&t.fluctuation<.05?null:(0,v.jsxs)(`points`,{renderOrder:3,frustumCulled:!1,children:[(0,v.jsxs)(`bufferGeometry`,{children:[(0,v.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[n.positions,3]}),(0,v.jsx)(`bufferAttribute`,{attach:`attributes-aOrigin`,args:[n.origins,3]}),(0,v.jsx)(`bufferAttribute`,{attach:`attributes-aTarget`,args:[n.targets,3]}),(0,v.jsx)(`bufferAttribute`,{attach:`attributes-aSeed`,args:[n.seeds,1]}),(0,v.jsx)(`bufferAttribute`,{attach:`attributes-aBarrier`,args:[n.barriers,1]})]}),(0,v.jsx)(`shaderMaterial`,{ref:e,transparent:!0,depthWrite:!1,blending:2,vertexShader:g.vertexShader,fragmentShader:g.fragmentShader,uniforms:i})]})}var E=900;function D(e){let t=new Float32Array(e*3),n=new Float32Array(e*3),r=new Float32Array(e*3),i=new Float32Array(e),a=new Float32Array(e);for(let o=0;o<e;o++){let e=Math.random()*Math.PI*2,s=Math.random()*8,c=(Math.random()-.5)*3;n[o*3]=Math.cos(e)*s*.4,n[o*3+1]=c,n[o*3+2]=Math.sin(e)*s*.4,r[o*3]=(Math.random()-.5)*2,r[o*3+1]=(Math.random()-.5)*2,r[o*3+2]=(Math.random()-.5)*2,t[o*3]=n[o*3],t[o*3+1]=n[o*3+1],t[o*3+2]=n[o*3+2],i[o]=Math.random(),a[o]=o%2==0?1:-1}return{positions:t,centers:n,offsets:r,seeds:i,charges:a}}function O(){let e=(0,c.useRef)(),t=s(),n=(0,c.useMemo)(()=>D(E),[]),i=(0,c.useMemo)(()=>o(),[]);return r(n=>{if(!e.current)return;let r=e.current.uniforms;r.uTime.value=n.clock.elapsedTime,r.uPairRate.value=t.virtual,r.uFluctuation.value=t.fluctuation,r.uPhase.value=t.phase}),t.virtual<.02&&t.planckGlow<.05?null:(0,v.jsxs)(`points`,{renderOrder:4,frustumCulled:!1,children:[(0,v.jsxs)(`bufferGeometry`,{children:[(0,v.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[n.positions,3]}),(0,v.jsx)(`bufferAttribute`,{attach:`attributes-aCenter`,args:[n.centers,3]}),(0,v.jsx)(`bufferAttribute`,{attach:`attributes-aOffset`,args:[n.offsets,3]}),(0,v.jsx)(`bufferAttribute`,{attach:`attributes-aSeed`,args:[n.seeds,1]}),(0,v.jsx)(`bufferAttribute`,{attach:`attributes-aCharge`,args:[n.charges,1]})]}),(0,v.jsx)(`shaderMaterial`,{ref:e,transparent:!0,depthWrite:!1,blending:2,vertexShader:_.vertexShader,fragmentShader:_.fragmentShader,uniforms:i})]})}function k(){return(0,v.jsxs)(`group`,{name:`quantum-field`,children:[(0,v.jsx)(S,{}),(0,v.jsx)(T,{}),(0,v.jsx)(O,{})]})}export{k as default};