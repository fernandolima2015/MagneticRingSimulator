import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{A as t,F as n,M as r,a as i,c as a,d as o,i as s,j as c,k as l,l as u,n as d,o as f,r as p,s as m,t as h}from"./vendor-post-NFUJjCzR.js";import{S as g,_,b as v,g as y,o as b,s as x,v as ee,x as S}from"./index-ipJfMC9t.js";import{t as C}from"./useRenderQuality-Bh33GxXX.js";import{t as w}from"./useSpacetimeField-yV7XD9tl.js";import{t as T}from"./useRealityField-C1HrIyWv.js";import{t as E}from"./useDecouplingField-L5t3thSN.js";import{t as D}from"./useHyperdimensionField-CGvkqa_a.js";import{t as O}from"./useQuantumField-0eQdWZLA.js";var k=e(n(),1),A=r();function j({lite:e=!1}){let t=g(b),n=g(x),r=C();return(0,A.jsx)(f,{intensity:Math.min(e?.85:1.15,r.bloomIntensity+t.energyLevel/100*.22+n.bloomBoost*.35+n.overloadFlash*.18),luminanceThreshold:Math.max(.45,r.bloomThreshold-t.energyLevel/100*.05),luminanceSmoothing:.65,mipmapBlur:!e,radius:e?Math.min(r.bloomRadius,.28):r.bloomRadius})}var M=(0,k.memo)(j);function N(){let e=g(_),n=g(x),r=g(y),i=C().chromaticBase+(e.relativisticIntensity??0)*.002+(n.chromaticBoost??0)*.003+(n.warpPulse??0)*.002+((r?.ruptureLevel??0)>=3?(r?.causalityFailure??0)*.003:0);return(0,A.jsx)(m,{offset:(0,k.useMemo)(()=>new t(i,i*.7),[i]),radialModulation:!0,modulationOffset:.15+(n.warpPulse??0)*.3})}var P=(0,k.memo)(N);function F(){let e=g(x),t=g(v),n=g(y),r=(n?.ruptureLevel??0)>=3?(n?.shaderCorruption??0)*.35:0;if(!(e.glitch>.2||t.criticalMode||e.magneticFlash>.3||e.realityRupture>.35||r>.25))return null;let i=Math.min(e.glitch+(t.criticalMode?.25:0)+e.realityRupture*.5+r,1);return i<.08?null:(0,A.jsx)(d,{delay:[1.5,3.5],duration:[.08,.2],strength:[i*.35,i*.65],mode:e.magneticFlash>.5||n?.critical?2:1,active:!0,ratio:i})}var I=(0,k.memo)(F),L=`// Gravitational Lensing — pós-processamento (Einstein ring + pull de luz)

uniform float uStrength;
uniform float uRadius;
uniform vec2 uCenter;
uniform float uTime;
uniform float uDistortion;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 toC = uCenter - uv;
  float dist = length(toC);
  vec2 dir = dist > 0.0001 ? normalize(toC) : vec2(0.0);

  float rs = uRadius;
  float pull = uStrength / (dist * dist + 0.06);
  pull = min(pull, 0.12 + uStrength * 0.08);

  float lens = 1.0 + uDistortion * 0.5;
  vec2 offset = dir * pull * lens;

  float chroma = uStrength * 0.004;
  vec2 uvR = uv + offset * (1.0 + chroma * 2.0);
  vec2 uvG = uv + offset;
  vec2 uvB = uv + offset * (1.0 - chroma * 2.0);

  vec3 col;
  col.r = texture2D(inputBuffer, uvR).r;
  col.g = texture2D(inputBuffer, uvG).g;
  col.b = texture2D(inputBuffer, uvB).b;

  float einsteinRing = smoothstep(rs * 0.9, rs * 1.05, dist)
    * smoothstep(rs * 1.8, rs * 1.15, dist);
  col += vec3(0.6, 0.75, 1.0) * einsteinRing * uStrength * 0.35;

  float voidMask = 1.0 - smoothstep(rs * 0.5, rs * 0.85, dist);
  col *= 1.0 - voidMask * uStrength * 0.85;

  float vignettePull = smoothstep(0.8, 0.2, dist) * uStrength * 0.15;
  col *= 1.0 - vignettePull;

  outputColor = vec4(col, inputColor.a);
}
`,R=class extends u{constructor(){super(`GravitationalLensing`,L,{uniforms:new Map([[`uStrength`,new l(0)],[`uRadius`,new l(.06)],[`uCenter`,new l(new t(.5,.5))],[`uTime`,new l(0)],[`uDistortion`,new l(0)]])})}},z=new c(0,0,0),B=new c,V=(0,k.forwardRef)(function(e,t){let n=g(ee),r=g(S),i=(0,k.useMemo)(()=>new R,[]);return o(e=>{let t=i.uniforms,a=n.lensingSmooth??n.lensingStrength??0,o=g.getState().fx?.gravitationalLensing??0,s=Math.min(1,a+o*.35+(r.gravitationalLensing??0)*.2);B.copy(z).project(e.camera),t.get(`uCenter`).value.set(B.x*.5+.5,B.y*.5+.5),t.get(`uStrength`).value=s*(n.active?1:.25),t.get(`uRadius`).value=.04+(n.eventHorizon??0)*.08,t.get(`uDistortion`).value=n.spacetimeDistortion??0,t.get(`uTime`).value=e.clock.elapsedTime}),(0,k.useEffect)(()=>()=>i.dispose(),[i]),(0,A.jsx)(`primitive`,{ref:t,object:i})}),te=`// Dilatação temporal visual — desaceleração perceptiva perto da singularidade

uniform float uTimeScale;
uniform float uStrength;
uniform float uDistortion;
uniform float uTime;
uniform vec2 uCenter;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 toC = uCenter - uv;
  float dist = length(toC);

  float slowZone = smoothstep(0.65, 0.05, dist) * uStrength;
  float tScale = mix(1.0, uTimeScale, slowZone);

  float ghost = (1.0 - tScale) * 0.35 * uDistortion;
  vec2 drift = normalize(toC + 0.0001) * ghost * 0.012;
  drift += vec2(sin(uTime * tScale * 2.0), cos(uTime * tScale * 1.7)) * ghost * 0.004;

  vec3 col = texture2D(inputBuffer, uv + drift).rgb;
  col = mix(col, texture2D(inputBuffer, uv - drift * 0.5).rgb, ghost * 0.4);

  float desat = slowZone * (1.0 - tScale) * 0.25;
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(col, vec3(lum), desat);

  float pulse = sin(uTime * tScale * 1.5) * 0.5 + 0.5;
  col *= 1.0 - slowZone * 0.08 * (1.0 - pulse);

  float ring = smoothstep(0.12, 0.08, dist) * smoothstep(0.02, 0.06, dist);
  col += vec3(0.35, 0.45, 0.7) * ring * uStrength * 0.12;

  outputColor = vec4(col, inputColor.a);
}
`,H=new c(0,0,0),U=new c,W=class extends u{constructor(){super(`SpacetimeTimeDilation`,te,{uniforms:new Map([[`uTimeScale`,new l(1)],[`uStrength`,new l(0)],[`uDistortion`,new l(0)],[`uTime`,new l(0)],[`uCenter`,new l(new t(.5,.5))]])})}},G=(0,k.forwardRef)(function(e,t){let n=w(),r=(0,k.useMemo)(()=>new W,[]);return o(e=>{let t=r.uniforms;U.copy(H).project(e.camera),t.get(`uCenter`).value.set(U.x*.5+.5,U.y*.5+.5),t.get(`uTimeScale`).value=n.timeScale,t.get(`uStrength`).value=n.lensing*(n.singularity.active?1:.35),t.get(`uDistortion`).value=n.distortion,t.get(`uTime`).value=e.clock.elapsedTime}),(0,k.useEffect)(()=>()=>r.dispose(),[r]),(0,A.jsx)(`primitive`,{ref:t,object:r})}),K=`// Interferência quântica — padrões de probabilidade em tela cheia

uniform float uFluctuation;
uniform float uDecoherence;
uniform float uTime;
uniform float uStrength;
uniform vec2 uCenter;

float qhash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 toC = uv - uCenter;
  float dist = length(toC);

  float wave = sin(dist * 120.0 - uTime * (3.0 + uFluctuation * 8.0)) * 0.5 + 0.5;
  float wave2 = cos(atan(toC.y, toC.x) * 24.0 + uTime * 2.0) * 0.5 + 0.5;
  float interference = wave * wave2 * uFluctuation * uStrength;

  float grain = qhash(uv * (uTime * 60.0 + 1.0)) * uDecoherence * 0.08;
  vec2 jitter = vec2(
    qhash(uv + uTime) - 0.5,
    qhash(uv - uTime * 1.3) - 0.5
  ) * uFluctuation * 0.003 * uStrength;

  vec3 col = texture2D(inputBuffer, uv + jitter).rgb;
  col += vec3(0.35, 0.55, 1.0) * interference * 0.06;
  col += vec3(0.9, 0.3, 0.8) * uDecoherence * grain;
  col = mix(col, col * (0.85 + interference * 0.15), uStrength * 0.3);

  float planck = smoothstep(0.4, 0.0, dist) * uFluctuation * 0.04;
  col += vec3(0.6, 0.8, 1.0) * planck * sin(uTime * 30.0) * 0.5;

  outputColor = vec4(col, inputColor.a);
}
`,q=class extends u{constructor(){super(`QuantumInterference`,K,{uniforms:new Map([[`uFluctuation`,new l(0)],[`uDecoherence`,new l(0)],[`uTime`,new l(0)],[`uStrength`,new l(0)],[`uCenter`,new l(new t(.5,.5))]])})}},J=(0,k.forwardRef)(function(e,t){let n=O(),r=(0,k.useMemo)(()=>new q,[]);return o(e=>{let t=r.uniforms;t.get(`uFluctuation`).value=n.fluctuation,t.get(`uDecoherence`).value=n.decoherence,t.get(`uTime`).value=e.clock.elapsedTime,t.get(`uStrength`).value=n.intensity<.2?0:Math.min(1,(n.intensity-.2)/.6),t.get(`uCenter`).value.set(.5,.5)}),(0,k.useEffect)(()=>()=>r.dispose(),[r]),(0,A.jsx)(`primitive`,{ref:t,object:r})}),Y=`// Ruptura da realidade — só distorce acima de limiar (evita tremor permanente)

uniform float uInstability;
uniform float uCorruption;
uniform float uCausality;
uniform float uVibration;
uniform float uTears;
uniform float uTime;
uniform vec2 uCenter;

float rhash(vec2 p) {
  return fract(sin(dot(p, vec2(41.3, 289.7))) * 45758.5453);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float peak = max(uInstability, max(uCorruption * 0.9, max(uCausality, uVibration)));
  float gate = smoothstep(0.18, 0.45, peak);

  if (gate < 0.001) {
    outputColor = inputColor;
    return;
  }

  float shakeAmp = 0.004 * gate * uVibration;
  vec2 shake = vec2(sin(uTime * 18.0), cos(uTime * 21.0)) * shakeAmp;
  vec2 uvS = uv + shake;

  float block = step(0.97, rhash(floor(uvS * (24.0 + uCorruption * 40.0)) / 24.0));
  vec2 blockOff = vec2(rhash(uvS + uTime) - 0.5, rhash(uvS - uTime) - 0.5) * uCorruption * 0.015 * gate;
  uvS += blockOff * block;

  float echoOff = uCausality * gate * 0.008;
  vec2 uvPast = uvS + vec2(echoOff, 0.0);
  vec2 uvFuture = uvS - vec2(echoOff * 0.5, 0.0);

  vec3 col;
  col.r = texture2D(inputBuffer, uvPast).r;
  col.g = texture2D(inputBuffer, uvS).g;
  col.b = texture2D(inputBuffer, uvFuture).b;

  float tearAngle = uTime * 0.2 + uTears * 6.28;
  vec2 tearDir = vec2(cos(tearAngle), sin(tearAngle));
  float tearDist = abs(dot(uv - uCenter, vec2(-tearDir.y, tearDir.x)));
  float tear = smoothstep(0.002, 0.0, tearDist - uTears * 0.06) * uTears * gate;
  col = mix(col, vec3(0.02, 0.0, 0.05), tear * 0.6);
  col += vec3(0.9, 0.5, 1.0) * tear * 0.8;

  float scan = step(0.98, fract(uvS.y * (120.0 + uCorruption * 180.0) + uTime * 6.0));
  col = mix(col, col.grb, scan * uCorruption * 0.15 * gate);

  float invert = step(0.992, rhash(floor(uvS * 20.0 + uTime)));
  col = mix(col, 1.0 - col, invert * uCorruption * 0.12 * gate);

  outputColor = vec4(col, inputColor.a);
}
`,X=class extends u{constructor(){super(`RealityRupture`,Y,{uniforms:new Map([[`uInstability`,new l(0)],[`uCorruption`,new l(0)],[`uCausality`,new l(0)],[`uVibration`,new l(0)],[`uTears`,new l(0)],[`uTime`,new l(0)],[`uCenter`,new l(new t(.5,.5))]])})}},Z=(0,k.forwardRef)(function(e,t){let n=T(),r=(0,k.useMemo)(()=>new X,[]);return o(e=>{let t=r.uniforms,i=Math.max(n.instability,n.shaderCorruption,n.causalityFailure,n.vibration),a=i<.2?0:Math.min(1,(i-.2)/.5);t.get(`uInstability`).value=n.instability*a,t.get(`uCorruption`).value=n.shaderCorruption*a,t.get(`uCausality`).value=n.causalityFailure*a,t.get(`uVibration`).value=n.vibration*a,t.get(`uTears`).value=n.tearIntensity*a,t.get(`uTime`).value=e.clock.elapsedTime,t.get(`uCenter`).value.set(.5,.5)}),(0,k.useEffect)(()=>()=>r.dispose(),[r]),(0,A.jsx)(`primitive`,{ref:t,object:r})}),Q=`// Distorção dimensional — dobra hiperbólica e aberracao do eixo W

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
`,ne=class extends u{constructor(){super(`HyperDistortion`,Q,{uniforms:new Map([[`uIntensity`,new l(0)],[`uFold`,new l(0)],[`uTime`,new l(0)],[`uWPhase`,new l(0)],[`uCenter`,new l(new t(.5,.5))]])})}},re=(0,k.forwardRef)(function(e,t){let n=D(),r=(0,k.useMemo)(()=>new ne,[]);return o(e=>{let t=r.uniforms;t.get(`uIntensity`).value=n.postStrength,t.get(`uFold`).value=n.fold,t.get(`uTime`).value=e.clock.elapsedTime,t.get(`uWPhase`).value=n.wPhase,t.get(`uCenter`).value.set(.5,.5)}),(0,k.useEffect)(()=>()=>r.dispose(),[r]),(0,A.jsx)(`primitive`,{ref:t,object:r})}),ie=`// Distorção local — bolha de desacoplamento (lente + vácuo)

uniform float uStrength;
uniform float uPhase;
uniform float uTime;
uniform vec2 uCenter;

vec2 decoupleLens(vec2 uv, float strength) {
  vec2 c = uv - uCenter;
  float r = length(c);
  float bubble = smoothstep(0.45, 0.05, r);
  float wobble = sin(r * 24.0 - uTime * 2.5 + uPhase) * 0.004 * strength;
  float shrink = 1.0 - bubble * strength * 0.08;
  return uCenter + c * shrink + normalize(c + 0.0001) * wobble * bubble;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  if (uStrength < 0.03) {
    outputColor = inputColor;
    return;
  }

  vec2 warped = decoupleLens(uv, uStrength);
  vec3 col = texture2D(inputBuffer, warped).rgb;

  float r = length(uv - uCenter);
  float edge = smoothstep(0.08, 0.32, r) * (1.0 - smoothstep(0.32, 0.48, r));
  float voidPulse = sin(uPhase * 2.0 + r * 30.0) * 0.5 + 0.5;

  col = mix(col, col * (0.92 + voidPulse * 0.06), uStrength * edge);
  col += vec3(0.35, 0.75, 1.0) * edge * uStrength * 0.04;

  float lattice = abs(sin((warped.x - warped.y) * 90.0 + uTime));
  lattice = smoothstep(0.97, 1.0, lattice) * uStrength * 0.06 * edge;
  col += vec3(0.4, 0.9, 1.0) * lattice;

  col = mix(texture2D(inputBuffer, uv).rgb, col, clamp(uStrength * 0.75, 0.0, 0.7));

  outputColor = vec4(col, inputColor.a);
}
`,ae=class extends u{constructor(){super(`DecouplingDistortion`,ie,{uniforms:new Map([[`uStrength`,new l(0)],[`uPhase`,new l(0)],[`uTime`,new l(0)],[`uCenter`,new l(new t(.5,.5))]])})}},oe=(0,k.forwardRef)(function(e,t){let n=E(),r=(0,k.useMemo)(()=>new ae,[]);return o(e=>{let t=r.uniforms;t.get(`uStrength`).value=n.postStrength,t.get(`uPhase`).value=n.phase??0,t.get(`uTime`).value=e.clock.elapsedTime,t.get(`uCenter`).value.set(.5,.5)}),(0,k.useEffect)(()=>()=>r.dispose(),[r]),(0,A.jsx)(`primitive`,{ref:t,object:r})});function $(){let e=g(x),t=g(S),n=g(v),r=t.warpFactor+e.warpPulse*.5,o=n.singularityMode?.3:0;return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(i,{eskil:!1,offset:.15+r*.1+o,darkness:.45+e.overloadFlash*.15}),(0,A.jsx)(h,{premultiply:!0,blendFunction:a.SOFT_LIGHT,opacity:(.012+r*.02+e.glitch*.03)*.5})]})}var se=(0,k.memo)($);function ce(){let e=g(b),t=C(),n=t.effectTier??`lite`,{enableDOF:r,dofFocusDistance:i,dofBokehScale:a,dofFocalLength:o}=t.cinematic,c=n===`standard`||n===`full`,l=n===`full`;return(0,A.jsxs)(s,{multisampling:0,enableNormalPass:!1,resolutionScale:t.composerResolutionScale??1,children:[(0,A.jsx)(M,{lite:n===`lite`}),(0,A.jsx)(P,{}),c&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(se,{}),(0,A.jsx)(I,{})]}),l&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(V,{}),(0,A.jsx)(G,{}),(0,A.jsx)(J,{}),(0,A.jsx)(re,{}),(0,A.jsx)(oe,{}),(0,A.jsx)(Z,{})]}),l&&r&&(0,A.jsx)(p,{focusDistance:i,focalLength:o,bokehScale:a+e.energyLevel/100*.4,height:480})]},`fx-${n}-${t.composerMultisampling}-${t.composerNormalPass}-${t.composerResolutionScale}`)}var le=(0,k.memo)(ce);export{le as default};