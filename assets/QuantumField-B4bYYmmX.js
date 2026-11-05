import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{i as t,t as n}from"./vendor-react-BVnWb422.js";import{i as r}from"./vendor-r3f-Cy2v2uTY.js";import{m as i}from"./index-B2AIcwJW.js";import{a,i as o}from"./buildShader-CO1bC7zE.js";import{o as s}from"./createShaderMaterial-CSeXaZX3.js";import{t as c}from"./useQuantumField--tdHpzBF.js";var l=e(t(),1),u=`// Espuma quântica + flutuação — vértices caóticos no vácuo

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
`,d=`// Espuma quântica — pontos iridescentes e instáveis\r
\r
varying float vAlpha;\r
varying vec3 vColor;\r
varying float vFlicker;\r
\r
void main() {\r
  vec2 pc = gl_PointCoord - 0.5;\r
  float d = length(pc);\r
  if (d > 0.5) discard;\r
\r
  float core = (1.0 - smoothstep(0.0, 0.5, d));\r
  float halo = exp(-d * 6.0) * 0.5;\r
  float sparkle = (1.0 - smoothstep(0.0, 0.35, abs(pc.x * pc.y) * 8.0)) * vFlicker;\r
\r
  vec3 col = vColor * (core + halo + sparkle * 0.6);\r
  col += vec3(0.6, 0.9, 1.0) * sparkle * 0.25;\r
\r
  float alpha = (core + halo * 0.4) * vAlpha;\r
  if (alpha < 0.02) discard;\r
\r
  // Cor negativa em mistura aditiva "apaga" a cena (manchas pretas no pós-processamento)\r
  gl_FragColor = vec4(max(col, vec3(0.0)), clamp(alpha, 0.0, 1.0));\r
}\r
`,f=`// Tunelamento quântico — partículas atravessam barreiras de probabilidade\r
\r
uniform float uTime;\r
uniform float uTunnelRate;\r
uniform float uFluctuation;\r
uniform float uPhase;\r
\r
attribute float aSeed;\r
attribute vec3 aOrigin;\r
attribute vec3 aTarget;\r
attribute float aBarrier;\r
\r
varying float vAlpha;\r
varying vec3 vColor;\r
varying float vTunnel;\r
\r
void main() {\r
  float seed = aSeed * 131.7;\r
  float cycle = fract(uTime * (0.15 + uTunnelRate * 1.2) + seed);\r
  float tunneling = smoothstep(0.38, 0.42, cycle) * (1.0 - smoothstep(0.58, 0.62, cycle));\r
  tunneling *= uTunnelRate * (1.0 + sin(seed * 50.0) * 0.5);\r
\r
  vec3 pos = mix(aOrigin, aTarget, cycle);\r
  if (tunneling > 0.01) {\r
    float ghost = sin(cycle * 3.14159 * 4.0);\r
    pos = mix(pos, (aOrigin + aTarget) * 0.5, abs(ghost) * 0.7);\r
    pos += vec3(fbm(vec3(seed, uTime, uPhase), 3)) * uFluctuation * 2.0;\r
  }\r
\r
  vTunnel = tunneling;\r
  vAlpha = tunneling * 0.9 + (1.0 - tunneling) * 0.05 * uTunnelRate;\r
  vAlpha *= 0.4 + 0.6 * sin(uTime * 20.0 + seed);\r
\r
  vColor = mix(vec3(0.2, 1.0, 0.9), vec3(1.0, 0.9, 0.2), tunneling);\r
  vColor += vec3(0.8, 0.4, 1.0) * aBarrier * tunneling;\r
\r
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);\r
  float size = (1.5 + tunneling * 5.0) * (100.0 / max(-mv.z, 1.0));\r
  gl_PointSize = clamp(size, 0.5, 8.0);\r
  gl_Position = projectionMatrix * mv;\r
}\r
`,p=`// Tunelamento — flash de probabilidade\r
\r
varying float vAlpha;\r
varying vec3 vColor;\r
varying float vTunnel;\r
\r
void main() {\r
  vec2 pc = gl_PointCoord - 0.5;\r
  float d = length(pc);\r
  if (d > 0.5) discard;\r
\r
  float ring = (1.0 - smoothstep(0.35, 0.5, d)) * smoothstep(0.1, 0.25, d);\r
  float core = (1.0 - smoothstep(0.0, 0.5, d));\r
\r
  vec3 col = vColor * (core + ring * vTunnel * 2.0);\r
  col += vec3(1.0) * vTunnel * ring * 0.4;\r
\r
  float alpha = (core * 0.6 + ring * vTunnel) * vAlpha;\r
  // Cor negativa em mistura aditiva "apaga" a cena (manchas pretas no pós-processamento)\r
  gl_FragColor = vec4(max(col, vec3(0.0)), clamp(alpha, 0.0, 1.0));\r
}\r
`,m=`// Pares virtuais — criação e aniquilação e⁺e⁻\r
\r
uniform float uTime;\r
uniform float uPairRate;\r
uniform float uFluctuation;\r
uniform float uPhase;\r
\r
attribute float aSeed;\r
attribute vec3 aCenter;\r
attribute vec3 aOffset;\r
attribute float aCharge;\r
\r
varying float vAlpha;\r
varying vec3 vColor;\r
varying float vLife;\r
\r
void main() {\r
  float seed = aSeed * 73.11;\r
  float period = 1.8 / (0.2 + uPairRate * 2.0);\r
  float life = fract(uTime / period + seed);\r
  float spawn = smoothstep(0.0, 0.08, life) * (1.0 - smoothstep(0.75, 1.0, life));\r
  float separation = life * (2.5 + uPairRate * 4.0);\r
\r
  vec3 dir = normalize(aOffset + vec3(snoise(vec3(seed, 0.0, uPhase)), 0.01, 0.0));\r
  vec3 pos = aCenter + dir * separation * (0.5 + aCharge * 0.5);\r
  pos += vec3(snoise(pos * 0.5 + vec3(uTime, seed, uPhase))) * uFluctuation * 0.8;\r
\r
  vLife = spawn;\r
  vAlpha = spawn * (0.5 + uPairRate * 0.5);\r
  vColor = aCharge > 0.0 ? vec3(1.0, 0.25, 0.55) : vec3(0.2, 0.85, 1.0);\r
\r
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);\r
  float size = (1.0 + spawn * 4.0 + separation * 0.3) * (80.0 / max(-mv.z, 1.0));\r
  gl_PointSize = clamp(size, 0.4, 7.0);\r
  gl_Position = projectionMatrix * mv;\r
}\r
`,h=`// Par virtual — traço de annihilation\r
\r
varying float vAlpha;\r
varying vec3 vColor;\r
varying float vLife;\r
\r
void main() {\r
  vec2 pc = gl_PointCoord - 0.5;\r
  float d = length(pc);\r
  if (d > 0.5) discard;\r
\r
  float core = (1.0 - smoothstep(0.0, 0.5, d));\r
  float trail = (1.0 - smoothstep(0.2, 0.5, abs(pc.x))) * (1.0 - smoothstep(0.0, 0.5, abs(pc.y)));\r
\r
  vec3 col = vColor * (core + trail * 0.3);\r
  col += vec3(1.0, 0.95, 0.8) * vLife * core * 0.5;\r
\r
  float alpha = (core + trail * 0.2) * vAlpha * vLife;\r
  // Cor negativa em mistura aditiva "apaga" a cena (manchas pretas no pós-processamento)\r
  gl_FragColor = vec4(max(col, vec3(0.0)), clamp(alpha, 0.0, 1.0));\r
}\r
`,g={vertexShader:a(u,o),fragmentShader:a(d,o)},_={vertexShader:a(f,o),fragmentShader:a(p,o)},v={vertexShader:a(m,o),fragmentShader:a(h,o)},y=n(),b=6500,x=2800;function S(e,t,n){let r=new Float32Array(e*3),i=new Float32Array(e),a=new Float32Array(e),o=new Float32Array(e);for(let s=0;s<e;s++){let c=Math.random()*Math.PI*2,l=Math.acos(2*Math.random()-1),u=t+Math.random()*(n-t);r[s*3]=u*Math.sin(l)*Math.cos(c),r[s*3+1]=u*Math.sin(l)*Math.sin(c)*.7,r[s*3+2]=u*Math.cos(l),i[s]=Math.random(),a[s]=Math.random(),o[s]=+(s<e*.45)}return{positions:r,seeds:i,layers:a,modes:o}}function C(){let e=(0,l.useRef)(),t=(0,l.useRef)(),n=i(e=>c(e).intensity>.02),a=(0,l.useMemo)(()=>S(b,6,95),[]),o=(0,l.useMemo)(()=>S(x,3,45),[]),u=(0,l.useMemo)(()=>s(),[]),d=(0,l.useMemo)(()=>s(),[]);if(r(n=>{let r=c(),i=n.clock.elapsedTime,a=e=>{if(!e.current)return;let t=e.current.uniforms;t.uTime.value=i,t.uFluctuation.value=r.fluctuation,t.uFoam.value=r.foam,t.uCoherence.value=r.coherence,t.uPhase.value=r.phase};a(e),a(t)}),!n)return null;let f={transparent:!0,depthWrite:!1,blending:2,vertexShader:g.vertexShader,fragmentShader:g.fragmentShader};return(0,y.jsxs)(`group`,{renderOrder:-5,children:[(0,y.jsxs)(`points`,{frustumCulled:!1,renderOrder:-5,children:[(0,y.jsxs)(`bufferGeometry`,{children:[(0,y.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[a.positions,3]}),(0,y.jsx)(`bufferAttribute`,{attach:`attributes-aSeed`,args:[a.seeds,1]}),(0,y.jsx)(`bufferAttribute`,{attach:`attributes-aLayer`,args:[a.layers,1]}),(0,y.jsx)(`bufferAttribute`,{attach:`attributes-aMode`,args:[a.modes,1]})]}),(0,y.jsx)(`shaderMaterial`,{ref:e,...f,uniforms:u})]}),(0,y.jsxs)(`points`,{frustumCulled:!1,renderOrder:-4,children:[(0,y.jsxs)(`bufferGeometry`,{children:[(0,y.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[o.positions,3]}),(0,y.jsx)(`bufferAttribute`,{attach:`attributes-aSeed`,args:[o.seeds,1]}),(0,y.jsx)(`bufferAttribute`,{attach:`attributes-aLayer`,args:[o.layers,1]}),(0,y.jsx)(`bufferAttribute`,{attach:`attributes-aMode`,args:[o.modes,1]})]}),(0,y.jsx)(`shaderMaterial`,{ref:t,...f,uniforms:d})]})]})}var w=1200;function T(e){let t=new Float32Array(e*3),n=new Float32Array(e*3),r=new Float32Array(e*3),i=new Float32Array(e),a=new Float32Array(e);for(let o=0;o<e;o++){let e=Math.random()*Math.PI*2,s=2.5+Math.random()*3,c=5+Math.random()*12,l=(Math.random()-.5)*2,u=(Math.random()-.5)*4;n[o*3]=Math.cos(e)*s,n[o*3+1]=l,n[o*3+2]=Math.sin(e)*s;let d=e+(Math.random()-.5)*1.2;r[o*3]=Math.cos(d)*c,r[o*3+1]=u,r[o*3+2]=Math.sin(d)*c,t[o*3]=n[o*3],t[o*3+1]=n[o*3+1],t[o*3+2]=n[o*3+2],i[o]=Math.random(),a[o]=Math.random()}return{positions:t,origins:n,targets:r,seeds:i,barriers:a}}function E(){let e=(0,l.useRef)(),t=i(e=>{let t=c(e);return t.tunnel>=.03||t.fluctuation>=.05}),n=(0,l.useMemo)(()=>T(w),[]),a=(0,l.useMemo)(()=>s(),[]);return r(t=>{if(!e.current)return;let n=c(),r=e.current.uniforms;r.uTime.value=t.clock.elapsedTime,r.uTunnelRate.value=n.tunnel,r.uFluctuation.value=n.fluctuation,r.uPhase.value=n.phase}),t?(0,y.jsxs)(`points`,{renderOrder:3,frustumCulled:!1,children:[(0,y.jsxs)(`bufferGeometry`,{children:[(0,y.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[n.positions,3]}),(0,y.jsx)(`bufferAttribute`,{attach:`attributes-aOrigin`,args:[n.origins,3]}),(0,y.jsx)(`bufferAttribute`,{attach:`attributes-aTarget`,args:[n.targets,3]}),(0,y.jsx)(`bufferAttribute`,{attach:`attributes-aSeed`,args:[n.seeds,1]}),(0,y.jsx)(`bufferAttribute`,{attach:`attributes-aBarrier`,args:[n.barriers,1]})]}),(0,y.jsx)(`shaderMaterial`,{ref:e,transparent:!0,depthWrite:!1,blending:2,vertexShader:_.vertexShader,fragmentShader:_.fragmentShader,uniforms:a})]}):null}var D=900;function O(e){let t=new Float32Array(e*3),n=new Float32Array(e*3),r=new Float32Array(e*3),i=new Float32Array(e),a=new Float32Array(e);for(let o=0;o<e;o++){let e=Math.random()*Math.PI*2,s=Math.random()*8,c=(Math.random()-.5)*3;n[o*3]=Math.cos(e)*s*.4,n[o*3+1]=c,n[o*3+2]=Math.sin(e)*s*.4,r[o*3]=(Math.random()-.5)*2,r[o*3+1]=(Math.random()-.5)*2,r[o*3+2]=(Math.random()-.5)*2,t[o*3]=n[o*3],t[o*3+1]=n[o*3+1],t[o*3+2]=n[o*3+2],i[o]=Math.random(),a[o]=o%2==0?1:-1}return{positions:t,centers:n,offsets:r,seeds:i,charges:a}}function k(){let e=(0,l.useRef)(),t=i(e=>{let t=c(e);return t.virtual>=.02||t.planckGlow>=.05}),n=(0,l.useMemo)(()=>O(D),[]),a=(0,l.useMemo)(()=>s(),[]);return r(t=>{if(!e.current)return;let n=c(),r=e.current.uniforms;r.uTime.value=t.clock.elapsedTime,r.uPairRate.value=n.virtual,r.uFluctuation.value=n.fluctuation,r.uPhase.value=n.phase}),t?(0,y.jsxs)(`points`,{renderOrder:4,frustumCulled:!1,children:[(0,y.jsxs)(`bufferGeometry`,{children:[(0,y.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[n.positions,3]}),(0,y.jsx)(`bufferAttribute`,{attach:`attributes-aCenter`,args:[n.centers,3]}),(0,y.jsx)(`bufferAttribute`,{attach:`attributes-aOffset`,args:[n.offsets,3]}),(0,y.jsx)(`bufferAttribute`,{attach:`attributes-aSeed`,args:[n.seeds,1]}),(0,y.jsx)(`bufferAttribute`,{attach:`attributes-aCharge`,args:[n.charges,1]})]}),(0,y.jsx)(`shaderMaterial`,{ref:e,transparent:!0,depthWrite:!1,blending:2,vertexShader:v.vertexShader,fragmentShader:v.fragmentShader,uniforms:a})]}):null}function A(){return(0,y.jsxs)(`group`,{name:`quantum-field`,children:[(0,y.jsx)(C,{}),(0,y.jsx)(E,{}),(0,y.jsx)(k,{})]})}export{A as default};