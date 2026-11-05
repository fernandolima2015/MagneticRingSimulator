import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{i as t,t as n}from"./vendor-react-BVnWb422.js";import{i as r}from"./vendor-r3f-Cy2v2uTY.js";import{m as i}from"./index-Bx0g5MTh.js";import{G as a,V as o,W as s}from"./vendor-three-RqB-y9wz.js";import{t as c}from"./useRenderQuality-Dw4Z2XfU.js";import{t as l}from"./useSpacetimeField-C7L0IJ9w.js";import{t as u}from"./useRealityField-CT4L1UHa.js";import{t as d}from"./useDecouplingField-Dn3HKZFH.js";import{t as f}from"./useHyperdimensionField-CPqBtOAF.js";import{t as p}from"./useQuantumField-DQzX68f2.js";import{a as m,c as h,d as g,i as _,l as v,n as y,o as b,r as x,s as S,t as C,u as w}from"./vendor-post-CycdIFri.js";var T=e(t(),1),E=n();function D(e,t,n){let{energy:r,fx:a}=i.getState(),o=(r.energyLevel??0)/100;e.intensity=Math.min(n?.85:1.15,t.bloomIntensity+o*.22+a.bloomBoost*.35+a.overloadFlash*.18),e.luminanceMaterial.threshold=Math.max(.45,t.bloomThreshold-o*.05),n||(e.mipmapBlurPass.radius=t.bloomRadius)}function O({lite:e=!1}){let t=c(),[n]=(0,T.useState)(()=>new _({blendFunction:x.ADD,mipmapBlur:!e,luminanceSmoothing:.65}));return r(()=>D(n,t,e)),(0,E.jsx)(`primitive`,{object:n,dispose:null})}function k(e,t){let{relativity:n,fx:r,reality:a}=i.getState(),o=t.chromaticBase+(n.relativisticIntensity??0)*.002+(r.chromaticBoost??0)*.003+(r.warpPulse??0)*.002+((a?.ruptureLevel??0)>=3?(a?.causalityFailure??0)*.003:0);e.offset.set(o,o*.7),e.modulationOffset=.15+(r.warpPulse??0)*.3}function A(){let e=c(),[t]=(0,T.useState)(()=>new m({offset:new s(0,0),radialModulation:!0,modulationOffset:.15}));return r(()=>k(t,e)),(0,E.jsx)(`primitive`,{object:t,dispose:null})}function j(e){let{fx:t,stability:n,reality:r}=i.getState(),a=(r?.ruptureLevel??0)>=3?(r?.shaderCorruption??0)*.35:0,o=t.glitch>.2||n.criticalMode||t.magneticFlash>.3||t.realityRupture>.35||a>.25,s=Math.min(t.glitch+(n.criticalMode?.25:0)+t.realityRupture*.5+a,1);if(!o||s<.08){e.mode=v.DISABLED;return}e.mode=t.magneticFlash>.5||r?.critical?v.CONSTANT_MILD:v.SPORADIC,e.ratio=s,e.strength.set(s*.35,s*.65)}function M(){let[e]=(0,T.useState)(()=>new h({delay:new s(1.5,3.5),duration:new s(.08,.2),strength:new s(0,0)}));return r(()=>j(e)),(0,E.jsx)(`primitive`,{object:e,dispose:null})}var N=`// Gravitational Lensing — pós-processamento (Einstein ring + pull de luz)\r
\r
uniform float uStrength;\r
uniform float uRadius;\r
uniform vec2 uCenter;\r
uniform float uTime;\r
uniform float uDistortion;\r
\r
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {\r
  vec2 toC = uCenter - uv;\r
  float dist = length(toC);\r
  vec2 dir = dist > 0.0001 ? normalize(toC) : vec2(0.0);\r
\r
  float rs = uRadius;\r
  float pull = uStrength / (dist * dist + 0.06);\r
  pull = min(pull, 0.12 + uStrength * 0.08);\r
\r
  float lens = 1.0 + uDistortion * 0.5;\r
  vec2 offset = dir * pull * lens;\r
\r
  float chroma = uStrength * 0.004;\r
  vec2 uvR = uv + offset * (1.0 + chroma * 2.0);\r
  vec2 uvG = uv + offset;\r
  vec2 uvB = uv + offset * (1.0 - chroma * 2.0);\r
\r
  vec3 col;\r
  col.r = texture2D(inputBuffer, uvR).r;\r
  col.g = texture2D(inputBuffer, uvG).g;\r
  col.b = texture2D(inputBuffer, uvB).b;\r
\r
  float einsteinRing = smoothstep(rs * 0.9, rs * 1.05, dist)\r
    * (1.0 - smoothstep(rs * 1.15, rs * 1.8, dist));\r
  col += vec3(0.6, 0.75, 1.0) * einsteinRing * uStrength * 0.35;\r
\r
  float voidMask = 1.0 - smoothstep(rs * 0.5, rs * 0.85, dist);\r
  col *= 1.0 - voidMask * uStrength * 0.85;\r
\r
  float vignettePull = (1.0 - smoothstep(0.2, 0.8, dist)) * uStrength * 0.15;\r
  col *= 1.0 - vignettePull;\r
\r
  outputColor = vec4(col, inputColor.a);\r
}\r
`;function P(e,t){let[n]=(0,T.useState)(e),{composer:i}=(0,T.useContext)(C),a=(0,T.useRef)(null);return r((e,r)=>{let o=t(n,e,r),s=a.current;(!s||!i.passes.includes(s))&&(s=i.passes.find(e=>e.effects?.includes(n))??null,a.current=s),s&&(s.enabled=o)}),n}var F=class extends b{constructor(){super(`GravitationalLensing`,N,{attributes:S.CONVOLUTION,uniforms:new Map([[`uStrength`,new o(0)],[`uRadius`,new o(.06)],[`uCenter`,new o(new s(.5,.5))],[`uTime`,new o(0)],[`uDistortion`,new o(0)]])})}},I=new a(0,0,0),L=new a;function R(){return(0,E.jsx)(`primitive`,{object:P(()=>new F,(e,t)=>{let{singularity:n,visual:r,fx:a}=i.getState(),o=e.uniforms,s=n.lensingSmooth??n.lensingStrength??0,c=a?.gravitationalLensing??0,l=Math.min(1,s+c*.35+(r.gravitationalLensing??0)*.2)*(n.active?1:.25);return L.copy(I).project(t.camera),o.get(`uCenter`).value.set(L.x*.5+.5,L.y*.5+.5),o.get(`uStrength`).value=l,o.get(`uRadius`).value=.04+(n.eventHorizon??0)*.08,o.get(`uDistortion`).value=n.spacetimeDistortion??0,o.get(`uTime`).value=t.clock.elapsedTime,l>.005}),dispose:null})}var z=`// Dilatação temporal visual — desaceleração perceptiva perto da singularidade\r
\r
uniform float uTimeScale;\r
uniform float uStrength;\r
uniform float uDistortion;\r
uniform float uTime;\r
uniform vec2 uCenter;\r
\r
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {\r
  vec2 toC = uCenter - uv;\r
  float dist = length(toC);\r
\r
  float slowZone = (1.0 - smoothstep(0.05, 0.65, dist)) * uStrength;\r
  float tScale = mix(1.0, uTimeScale, slowZone);\r
\r
  float ghost = (1.0 - tScale) * 0.35 * uDistortion;\r
  vec2 drift = normalize(toC + 0.0001) * ghost * 0.012;\r
  drift += vec2(sin(uTime * tScale * 2.0), cos(uTime * tScale * 1.7)) * ghost * 0.004;\r
\r
  vec3 col = texture2D(inputBuffer, uv + drift).rgb;\r
  col = mix(col, texture2D(inputBuffer, uv - drift * 0.5).rgb, ghost * 0.4);\r
\r
  float desat = slowZone * (1.0 - tScale) * 0.25;\r
  float lum = dot(col, vec3(0.299, 0.587, 0.114));\r
  col = mix(col, vec3(lum), desat);\r
\r
  float pulse = sin(uTime * tScale * 1.5) * 0.5 + 0.5;\r
  col *= 1.0 - slowZone * 0.08 * (1.0 - pulse);\r
\r
  float ring = (1.0 - smoothstep(0.08, 0.12, dist)) * smoothstep(0.02, 0.06, dist);\r
  col += vec3(0.35, 0.45, 0.7) * ring * uStrength * 0.12;\r
\r
  outputColor = vec4(col, inputColor.a);\r
}\r
`,ee=new a(0,0,0),B=new a,V=class extends b{constructor(){super(`SpacetimeTimeDilation`,z,{attributes:S.CONVOLUTION,uniforms:new Map([[`uTimeScale`,new o(1)],[`uStrength`,new o(0)],[`uDistortion`,new o(0)],[`uTime`,new o(0)],[`uCenter`,new o(new s(.5,.5))]])})}};function H(){return(0,E.jsx)(`primitive`,{object:P(()=>new V,(e,t)=>{let n=l(),r=e.uniforms,i=n.lensing*(n.singularity.active?1:.35);return B.copy(ee).project(t.camera),r.get(`uCenter`).value.set(B.x*.5+.5,B.y*.5+.5),r.get(`uTimeScale`).value=n.timeScale,r.get(`uStrength`).value=i,r.get(`uDistortion`).value=n.distortion,r.get(`uTime`).value=t.clock.elapsedTime,i>.005}),dispose:null})}var U=`// Interferência quântica — padrões de probabilidade em tela cheia\r
\r
uniform float uFluctuation;\r
uniform float uDecoherence;\r
uniform float uTime;\r
uniform float uStrength;\r
uniform vec2 uCenter;\r
\r
float qhash(vec2 p) {\r
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);\r
}\r
\r
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {\r
  vec2 toC = uv - uCenter;\r
  float dist = length(toC);\r
\r
  float wave = sin(dist * 120.0 - uTime * (3.0 + uFluctuation * 8.0)) * 0.5 + 0.5;\r
  float wave2 = cos(atan(toC.y, toC.x) * 24.0 + uTime * 2.0) * 0.5 + 0.5;\r
  float interference = wave * wave2 * uFluctuation * uStrength;\r
\r
  float grain = qhash(uv * (uTime * 60.0 + 1.0)) * uDecoherence * 0.08 * uStrength;\r
  vec2 jitter = vec2(\r
    qhash(uv + uTime) - 0.5,\r
    qhash(uv - uTime * 1.3) - 0.5\r
  ) * uFluctuation * 0.003 * uStrength;\r
\r
  vec3 col = texture2D(inputBuffer, uv + jitter).rgb;\r
  col += vec3(0.35, 0.55, 1.0) * interference * 0.06;\r
  col += vec3(0.9, 0.3, 0.8) * uDecoherence * grain;\r
  col = mix(col, col * (0.85 + interference * 0.15), uStrength * 0.3);\r
\r
  float planck = (1.0 - smoothstep(0.0, 0.4, dist)) * uFluctuation * 0.04 * uStrength;\r
  col += vec3(0.6, 0.8, 1.0) * planck * sin(uTime * 30.0) * 0.5;\r
\r
  outputColor = vec4(col, inputColor.a);\r
}\r
`,W=class extends b{constructor(){super(`QuantumInterference`,U,{attributes:S.CONVOLUTION,uniforms:new Map([[`uFluctuation`,new o(0)],[`uDecoherence`,new o(0)],[`uTime`,new o(0)],[`uStrength`,new o(0)],[`uCenter`,new o(new s(.5,.5))]])})}};function G(){return(0,E.jsx)(`primitive`,{object:P(()=>new W,(e,t)=>{let n=p(),r=e.uniforms,i=n.intensity<.2?0:Math.min(1,(n.intensity-.2)/.6);return r.get(`uFluctuation`).value=n.fluctuation,r.get(`uDecoherence`).value=n.decoherence,r.get(`uTime`).value=t.clock.elapsedTime,r.get(`uStrength`).value=i,i>0}),dispose:null})}var K=`// Ruptura da realidade — só distorce acima de limiar (evita tremor permanente)\r
\r
uniform float uInstability;\r
uniform float uCorruption;\r
uniform float uCausality;\r
uniform float uVibration;\r
uniform float uTears;\r
uniform float uTime;\r
uniform vec2 uCenter;\r
\r
float rhash(vec2 p) {\r
  return fract(sin(dot(p, vec2(41.3, 289.7))) * 45758.5453);\r
}\r
\r
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {\r
  float peak = max(uInstability, max(uCorruption * 0.9, max(uCausality, uVibration)));\r
  float gate = smoothstep(0.18, 0.45, peak);\r
\r
  if (gate < 0.001) {\r
    outputColor = inputColor;\r
    return;\r
  }\r
\r
  float shakeAmp = 0.004 * gate * uVibration;\r
  vec2 shake = vec2(sin(uTime * 18.0), cos(uTime * 21.0)) * shakeAmp;\r
  vec2 uvS = uv + shake;\r
\r
  float block = step(0.97, rhash(floor(uvS * (24.0 + uCorruption * 40.0)) / 24.0));\r
  vec2 blockOff = vec2(rhash(uvS + uTime) - 0.5, rhash(uvS - uTime) - 0.5) * uCorruption * 0.015 * gate;\r
  uvS += blockOff * block;\r
\r
  float echoOff = uCausality * gate * 0.008;\r
  vec2 uvPast = uvS + vec2(echoOff, 0.0);\r
  vec2 uvFuture = uvS - vec2(echoOff * 0.5, 0.0);\r
\r
  vec3 col;\r
  col.r = texture2D(inputBuffer, uvPast).r;\r
  col.g = texture2D(inputBuffer, uvS).g;\r
  col.b = texture2D(inputBuffer, uvFuture).b;\r
\r
  float tearAngle = uTime * 0.2 + uTears * 6.28;\r
  vec2 tearDir = vec2(cos(tearAngle), sin(tearAngle));\r
  float tearDist = abs(dot(uv - uCenter, vec2(-tearDir.y, tearDir.x)));\r
  float tear = (1.0 - smoothstep(0.0, 0.002, tearDist - uTears * 0.06)) * uTears * gate;\r
  col = mix(col, vec3(0.02, 0.0, 0.05), tear * 0.6);\r
  col += vec3(0.9, 0.5, 1.0) * tear * 0.8;\r
\r
  float scan = step(0.98, fract(uvS.y * (120.0 + uCorruption * 180.0) + uTime * 6.0));\r
  col = mix(col, col.grb, scan * uCorruption * 0.15 * gate);\r
\r
  float invert = step(0.992, rhash(floor(uvS * 20.0 + uTime)));\r
  col = mix(col, 1.0 - col, invert * uCorruption * 0.12 * gate);\r
\r
  outputColor = vec4(col, inputColor.a);\r
}\r
`,q=class extends b{constructor(){super(`RealityRupture`,K,{attributes:S.CONVOLUTION,uniforms:new Map([[`uInstability`,new o(0)],[`uCorruption`,new o(0)],[`uCausality`,new o(0)],[`uVibration`,new o(0)],[`uTears`,new o(0)],[`uTime`,new o(0)],[`uCenter`,new o(new s(.5,.5))]])})}};function J(){return(0,E.jsx)(`primitive`,{object:P(()=>new q,(e,t)=>{let n=u(),r=e.uniforms,i=Math.max(n.instability,n.shaderCorruption,n.causalityFailure,n.vibration),a=i<.2?0:Math.min(1,(i-.2)/.5);return r.get(`uInstability`).value=n.instability*a,r.get(`uCorruption`).value=n.shaderCorruption*a,r.get(`uCausality`).value=n.causalityFailure*a,r.get(`uVibration`).value=n.vibration*a,r.get(`uTears`).value=n.tearIntensity*a,r.get(`uTime`).value=t.clock.elapsedTime,a>0}),dispose:null})}var Y=`// Distorção dimensional — dobra hiperbólica e aberracao do eixo W

uniform float uIntensity;
uniform float uFold;
uniform float uTime;
uniform float uWPhase;
uniform vec2 uCenter;

float h4hash(vec2 p) {
  return fract(sin(dot(p, vec2(41.7, 289.1))) * 45758.5453);
}

vec2 hyperWarp(vec2 uv, float strength) {
  vec2 c = uv - uCenter;
  float r = length(c);
  float theta = atan(c.y, c.x);
  float w = sin(theta * 3.0 + uWPhase * 2.0) * cos(r * 18.0 - uTime * 1.2);
  float fold = strength * (0.012 + uFold * 0.025);
  float hr = r + w * fold * (1.0 + r * 2.5);
  return uCenter + vec2(cos(theta), sin(theta)) * hr;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  if (uIntensity < 0.03) {
    outputColor = inputColor;
    return;
  }

  vec2 warped = hyperWarp(uv, uIntensity);
  vec2 warped2 = hyperWarp(uv + vec2(0.001, -0.001), uIntensity * 0.7);

  float r = length(uv - uCenter);
  float edge = smoothstep(0.15, 0.85, r) * uIntensity;

  vec3 colR = texture2D(inputBuffer, warped + vec2(uIntensity * 0.004, 0.0)).rgb;
  vec3 colG = texture2D(inputBuffer, warped).rgb;
  vec3 colB = texture2D(inputBuffer, warped - vec2(uIntensity * 0.004, 0.0)).rgb;
  vec3 col = vec3(colR.r, colG.g, colB.b);

  float wGlow = sin(uWPhase * 3.0 + r * 20.0) * 0.5 + 0.5;
  col += vec3(0.55, 0.2, 0.95) * wGlow * uIntensity * 0.04 * edge;

  float lattice = abs(sin((warped.x + warped.y) * 80.0 + uTime * 2.0));
  lattice = smoothstep(0.96, 1.0, lattice) * uIntensity * 0.08;
  col += vec3(0.3, 0.6, 1.0) * lattice;

  float ghost = h4hash(floor(uv * 120.0) + uTime * 0.1) * uFold * uIntensity * 0.03;
  col = mix(col, col * (1.0 + ghost), uIntensity * 0.5);

  col = mix(texture2D(inputBuffer, uv).rgb, col, clamp(uIntensity * 1.1, 0.0, 0.85));

  outputColor = vec4(col, inputColor.a);
}
`,X=class extends b{constructor(){super(`HyperDistortion`,Y,{attributes:S.CONVOLUTION,uniforms:new Map([[`uIntensity`,new o(0)],[`uFold`,new o(0)],[`uTime`,new o(0)],[`uWPhase`,new o(0)],[`uCenter`,new o(new s(.5,.5))]])})}};function Z(){return(0,E.jsx)(`primitive`,{object:P(()=>new X,(e,t)=>{let n=f(),r=e.uniforms;return r.get(`uIntensity`).value=n.postStrength,r.get(`uFold`).value=n.fold,r.get(`uTime`).value=t.clock.elapsedTime,r.get(`uWPhase`).value=n.wPhase,n.postStrength>=.03}),dispose:null})}var Q=`// Distorção local — bolha de desacoplamento (lente + vácuo)\r
\r
uniform float uStrength;\r
uniform float uPhase;\r
uniform float uTime;\r
uniform vec2 uCenter;\r
\r
vec2 decoupleLens(vec2 uv, float strength) {\r
  vec2 c = uv - uCenter;\r
  float r = length(c);\r
  float bubble = (1.0 - smoothstep(0.05, 0.45, r));\r
  float wobble = sin(r * 24.0 - uTime * 2.5 + uPhase) * 0.004 * strength;\r
  float shrink = 1.0 - bubble * strength * 0.08;\r
  return uCenter + c * shrink + normalize(c + 0.0001) * wobble * bubble;\r
}\r
\r
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {\r
  if (uStrength < 0.03) {\r
    outputColor = inputColor;\r
    return;\r
  }\r
\r
  vec2 warped = decoupleLens(uv, uStrength);\r
  vec3 col = texture2D(inputBuffer, warped).rgb;\r
\r
  float r = length(uv - uCenter);\r
  float edge = smoothstep(0.08, 0.32, r) * (1.0 - smoothstep(0.32, 0.48, r));\r
  float voidPulse = sin(uPhase * 2.0 + r * 30.0) * 0.5 + 0.5;\r
\r
  col = mix(col, col * (0.92 + voidPulse * 0.06), uStrength * edge);\r
  col += vec3(0.35, 0.75, 1.0) * edge * uStrength * 0.04;\r
\r
  float lattice = abs(sin((warped.x - warped.y) * 90.0 + uTime));\r
  lattice = smoothstep(0.97, 1.0, lattice) * uStrength * 0.06 * edge;\r
  col += vec3(0.4, 0.9, 1.0) * lattice;\r
\r
  col = mix(texture2D(inputBuffer, uv).rgb, col, clamp(uStrength * 0.75, 0.0, 0.7));\r
\r
  outputColor = vec4(col, inputColor.a);\r
}\r
`,$=class extends b{constructor(){super(`DecouplingDistortion`,Q,{attributes:S.CONVOLUTION,uniforms:new Map([[`uStrength`,new o(0)],[`uPhase`,new o(0)],[`uTime`,new o(0)],[`uCenter`,new o(new s(.5,.5))]])})}};function te(){return(0,E.jsx)(`primitive`,{object:P(()=>new $,(e,t)=>{let n=d(),r=e.uniforms;return r.get(`uStrength`).value=n.postStrength,r.get(`uPhase`).value=n.phase??0,r.get(`uTime`).value=t.clock.elapsedTime,n.postStrength>=.03}),dispose:null})}function ne(e,t){let{fx:n,visual:r,stability:a}=i.getState(),o=r.warpFactor+n.warpPulse*.5,s=a.singularityMode?.3:0;e.offset=.15+o*.1+s,e.darkness=.45+n.overloadFlash*.15,t.blendMode.opacity.value=(.012+o*.02+n.glitch*.03)*.5}function re(){let[e]=(0,T.useState)(()=>new g({eskil:!1,offset:.15,darkness:.45})),[t]=(0,T.useState)(()=>new w({premultiply:!0,blendFunction:x.SOFT_LIGHT}));return r(()=>ne(e,t)),(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`primitive`,{object:e,dispose:null}),(0,E.jsx)(`primitive`,{object:t,dispose:null})]})}function ie(e){let t=e===`standard`||e===`full`,n=e===`full`;return[(0,E.jsx)(O,{lite:e===`lite`},`bloom`),(0,E.jsx)(A,{},`chromatic`),t&&(0,E.jsx)(re,{},`warp`),t&&(0,E.jsx)(M,{},`glitch`),n&&(0,E.jsx)(R,{},`lensing`),n&&(0,E.jsx)(H,{},`dilation`),n&&(0,E.jsx)(G,{},`quantum`),n&&(0,E.jsx)(Z,{},`hyper`),n&&(0,E.jsx)(te,{},`decoupling`),n&&(0,E.jsx)(J,{},`rupture`)].filter(Boolean)}function ae({tier:e,multisampling:t}){let n=(0,T.useRef)(null),r=(0,T.useRef)([]),i=(0,T.useRef)(0),a=(0,T.useMemo)(()=>ie(e),[e]);return(0,T.useLayoutEffect)(()=>{clearTimeout(i.current);let e=n.current;r.current=e?[...e.passes]:[]}),(0,T.useEffect)(()=>{clearTimeout(i.current);let e=n.current;return()=>{let t=r.current;i.current=setTimeout(()=>{for(let e of t)e.dispose();e?.dispose()},0)}},[]),(0,E.jsx)(y,{ref:n,multisampling:t,enableNormalPass:!1,children:a})}function oe(){let e=c(),t=e.effectTier??`lite`,n=e.composerMultisampling??0;return(0,E.jsx)(ae,{tier:t,multisampling:n},`fx-${t}-${n}`)}var se=(0,T.memo)(oe);export{se as default};