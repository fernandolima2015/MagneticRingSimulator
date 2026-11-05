const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/SpacetimeStarfield-CbXAN0aF.js","assets/rolldown-runtime-QTnfLwEv.js","assets/vendor-r3f-Cy2v2uTY.js","assets/vendor-react-BVnWb422.js","assets/vendor-three-RqB-y9wz.js","assets/useSpacetimeField-CmhQbJ12.js","assets/index-B2AIcwJW.js","assets/sim-engine-uQrxjD8S.js","assets/index-BQwjLFVh.css","assets/spacetime-BPn1NgPL.js","assets/buildShader-CO1bC7zE.js","assets/createShaderMaterial-CSeXaZX3.js","assets/SpacetimeFabric-DcsXwhNU.js","assets/useRealityField-DLshToEu.js","assets/QuantumField-B4bYYmmX.js","assets/useQuantumField--tdHpzBF.js","assets/RealityTears-DR0ZnThQ.js","assets/HyperdimensionField-CyRpcxRK.js","assets/useHyperdimensionField-CxIyb5F_.js","assets/DecouplingBubble-C9ER1iQI.js","assets/useDecouplingField-GAbfvg9S.js","assets/VolumetricFog-BrL76Niw.js","assets/EffectsComposer-B56YqFMY.js","assets/vendor-post-CycdIFri.js","assets/useRenderQuality-D1AW9uSI.js"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{i as t,t as n}from"./vendor-react-BVnWb422.js";import{M as r,j as i,t as a,u as o}from"./sim-engine-uQrxjD8S.js";import{i as s,n as c,r as l,t as u}from"./vendor-r3f-Cy2v2uTY.js";import{h as d,m as f,t as p}from"./index-B2AIcwJW.js";import{F as m,G as h,t as g,w as _}from"./vendor-three-RqB-y9wz.js";import{a as v,i as y,t as b}from"./buildShader-CO1bC7zE.js";import{a as x,c as ee,i as te,n as ne,u as re}from"./createShaderMaterial-CSeXaZX3.js";import{t as S}from"./useRenderQuality-D1AW9uSI.js";import{t as C}from"./useSpacetimeField-CmhQbJ12.js";import{t as w}from"./useRealityField-DLshToEu.js";var T=e(t(),1),E=n(),D=4,O=.42,k=30;function ie(){let e=(0,T.useRef)(),t=(0,T.useRef)(),n=(0,T.useRef)();return s((r,i)=>{if(!e.current)return;let{visual:a,ringRadius:o}=f.getState(),s=a.ringRotationSpeed*i*60;e.current.rotation.y+=s,t.current.rotation.y-=s*.35,n.current.rotation.y+=s*.5;let c=o/D;e.current.scale.set(c,c,c),t.current.scale.set(c*.98,c*.98,c*.98),n.current.scale.set(c*1.02,c*1.02,c*1.02);let l=Math.min(2.2,(a.ringEmissive??.6)*1.4+.35);e.current.material.emissiveIntensity=l,t.current.material.emissiveIntensity=l*1.15,n.current.material.opacity=.55+l*.15}),(0,E.jsxs)(`group`,{renderOrder:k,children:[(0,E.jsxs)(`mesh`,{ref:e,renderOrder:k,children:[(0,E.jsx)(`torusGeometry`,{args:[D,O,64,320]}),(0,E.jsx)(`meshPhysicalMaterial`,{color:`#022a3a`,emissive:`#00bbee`,emissiveIntensity:1.1,metalness:.92,roughness:.15,clearcoat:1,clearcoatRoughness:.06,reflectivity:.9,depthWrite:!0,toneMapped:!0})]}),(0,E.jsxs)(`mesh`,{ref:t,renderOrder:31,children:[(0,E.jsx)(`torusGeometry`,{args:[D*.97,O*.5,48,256]}),(0,E.jsx)(`meshPhysicalMaterial`,{color:`#044455`,emissive:`#00ddff`,emissiveIntensity:1.25,metalness:.88,roughness:.2,transparent:!0,opacity:.95,clearcoat:.9,depthWrite:!0,toneMapped:!0})]}),(0,E.jsxs)(`mesh`,{ref:n,renderOrder:32,children:[(0,E.jsx)(`torusGeometry`,{args:[D,O*.22,32,200]}),(0,E.jsx)(`meshBasicMaterial`,{color:`#00eeff`,transparent:!0,opacity:.65,blending:2,depthWrite:!1,toneMapped:!0})]})]})}var A={vertexShader:v(`// Energy Core Vertex — núcleo de fusão com pulsação radial\r
\r
uniform float uTime;\r
uniform float uEnergy;\r
uniform float uRPM;\r
uniform float uOverload;\r
uniform float uInstability;\r
uniform float uTemperature;\r
\r
varying vec3 vNormal;\r
varying vec3 vViewDir;\r
varying vec2 vUv;\r
varying float vRadial;\r
varying float vNoise;\r
\r
void main() {\r
  vUv = uv;\r
  vNormal = normalize(normalMatrix * normal);\r
\r
  vec3 pos = position;\r
  float radial = length(pos);\r
\r
  float pulseVal = pulse(uTime, 4.0 + uRPM * 0.0001);\r
  float instability = uInstability * 0.3;\r
  vNoise = fbm(pos * 2.0 + uTime * 0.5, 5);\r
\r
  float displacement = vNoise * 0.12 * (uEnergy / 100.0)\r
    + sin(radial * 8.0 - uTime * 6.0) * 0.04 * pulseVal\r
    + instability * snoise(pos * 4.0 + uTime);\r
\r
  pos += normal * displacement * (1.0 + uOverload * 0.5);\r
\r
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);\r
  vViewDir = normalize(-mvPosition.xyz);\r
  // 0 no centro do disco visível, 1 na silhueta (a esfera tem raio constante)\r
  vRadial = 1.0 - clamp01(abs(dot(vNormal, vViewDir)));\r
  gl_Position = projectionMatrix * mvPosition;\r
}\r
`,y),fragmentShader:v(`// Energy Core Fragment — emissive pulsante, fluxo radial, instabilidade\r
\r
uniform float uTime;\r
uniform float uEnergy;\r
uniform float uRPM;\r
uniform float uOverload;\r
uniform float uInstability;\r
uniform float uTemperature;\r
uniform float uOpacity;\r
uniform vec3 uCoreColor;\r
uniform vec3 uHotColor;\r
\r
varying vec3 vNormal;\r
varying vec3 vViewDir;\r
varying vec2 vUv;\r
varying float vRadial;\r
varying float vNoise;\r
\r
void main() {\r
  float fres = fresnel(normalize(vNormal), normalize(vViewDir), 1.8);\r
  float core = 1.0 - smoothstep(0.0, 0.85, vRadial);\r
  float shell = smoothstep(0.5, 0.9, vRadial) * (1.0 - smoothstep(0.9, 1.0, vRadial) * 0.6);\r
\r
  float flow = sin(vRadial * 12.0 - uTime * (4.0 + uRPM * 0.00005)) * 0.5 + 0.5;\r
  float turbMix = turbulence(vNormal + uTime * 0.2, 4) * 0.5 + 0.5;\r
\r
  float heat = clamp01(uTemperature / 4000.0);\r
  float energyNorm = uEnergy / 100.0;\r
\r
  vec3 inner = mix(uCoreColor, uHotColor, heat * 0.6 + energyNorm * 0.3);\r
  inner += vec3(1.0, 0.6, 0.2) * uOverload * 0.5;\r
  inner *= 1.0 + flow * 0.35 + vNoise * 0.2;\r
\r
  vec3 col = inner * core;\r
  col += uCoreColor * shell * fres * 1.2;\r
  col += vec3(0.3, 0.55, 0.85) * turbMix * uInstability * 0.25;\r
  col = min(col, vec3(0.5, 0.85, 1.0));\r
\r
  float alpha = core * (0.45 + energyNorm * 0.25) + shell * fres * 0.28;\r
  alpha = min(clamp01(alpha + uOverload * 0.1), 0.72) * uOpacity;\r
\r
  // Cor negativa em mistura aditiva "apaga" a cena (manchas pretas no pós-processamento)\r
  gl_FragColor = vec4(max(col, vec3(0.0)), clamp(alpha, 0.0, 1.0));\r
}\r
`,b)},j=1.2;function ae(){let e=(0,T.useRef)(),t=S(),n=(0,T.useMemo)(()=>ne(),[]);return s(t=>{if(!e.current)return;let{visual:n,energy:r,physics:i,stability:a,singularity:o,fx:s,ringRadius:c}=f.getState(),l=c/4*n.corePulse;e.current.scale.setScalar(l);let u=e.current.material.uniforms;u.uTime.value=t.clock.elapsedTime,u.uEnergy.value=r.energyLevel??0,u.uRPM.value=i.rpm??0,u.uOverload.value=+!!r.overload+(s.overloadFlash??0),u.uInstability.value=1-(a.overall??1),u.uTemperature.value=r.temperature??300;let d=1-Math.min(1,(o.energyDensity??0)*1.1);u.uOpacity.value=d*(.55+(r.energyLevel??0)/200),e.current.visible=u.uOpacity.value>.01}),(0,E.jsxs)(`mesh`,{ref:e,renderOrder:8,children:[(0,E.jsx)(`sphereGeometry`,{args:[j,t.energyCoreSegments,t.energyCoreSegments]},t.energyCoreSegments),(0,E.jsx)(`shaderMaterial`,{transparent:!0,depthWrite:!1,side:2,blending:2,vertexShader:A.vertexShader,fragmentShader:A.fragmentShader,uniforms:n})]})}var M=12,N=4;function P(){let e=(0,T.useRef)(),t=(0,T.useRef)([]);return s((n,r)=>{let{visual:i,energy:a,ringRadius:o}=f.getState(),s=o/4,c=i.ringRotationSpeed*2*r*60,l=n.clock.elapsedTime;e.current&&e.current.scale.set(s,s,s),t.current.forEach((e,t)=>{if(!e)return;e.rotation.y+=c;let n=.15+a.energyLevel/100*.35;e.material.opacity=Math.max(0,n+Math.sin(l*5+t*.8)*.25)})}),(0,E.jsx)(`group`,{ref:e,children:Array.from({length:M},(e,n)=>{let r=Math.PI*2/M*n;return(0,E.jsxs)(`mesh`,{ref:e=>{t.current[n]=e},position:[Math.cos(r)*N,0,Math.sin(r)*N],rotation:[0,r,Math.PI/2],children:[(0,E.jsx)(`cylinderGeometry`,{args:[.04,.04,10,12]}),(0,E.jsx)(`meshBasicMaterial`,{color:`#00ffff`,transparent:!0,opacity:.5})]},n)})})}var F={vertexShader:v(`// Plasma Vertex — partículas orbitais GPU-ready
// Includes resolvidos via buildShader.js

uniform float uTime;
uniform float uIntensity;
uniform float uTurbulence;
uniform float uRPM;
uniform float uTemporalShift;
uniform float uLensing;
uniform float uSpacetimeDistortion;
uniform float uTimeScale;

attribute float aPhase;
attribute float aSpeed;
attribute float aRadius;
attribute float aRandom;

varying float vGlow;
varying float vNoise;
varying vec3 vWorldPos;

void main() {
  float t = uTime * uTimeScale;
  float rpmFactor = uRPM / 100000.0;
  float speedMult = (uIntensity / 40.0) * (1.0 + uTurbulence * 0.5);
  float angle = aPhase + t * aSpeed * speedMult;

  vec3 pos;
  float r = aRadius + snoise(vec3(aRandom, uTime * 0.3, aPhase)) * uTurbulence * 0.4;
  pos.x = cos(angle) * r;
  pos.z = sin(angle) * r;
  pos.y = position.y
    + sin(t * 2.5 + aPhase) * 0.25 * uTurbulence
    + fbm(vec3(pos.xz * 0.5, t * 0.2), 3) * 0.15 * uIntensity / 50.0;

  float pDist = length(pos.xz);
  float pull = uLensing * uSpacetimeDistortion * 0.35 / (pDist * 0.15 + 1.0);
  pos.xz -= normalize(pos.xz + 0.001) * pull;

  vNoise = turbulence(vec3(pos * 0.8 + t * 0.15), 4);
  vGlow = 0.5 + 0.5 * sin(t * 4.0 + aPhase * 3.0 + uTemporalShift * 0.001);
  vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = (2.8 + uIntensity * 0.05 + vNoise * 1.5) * (220.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`,y),fragmentShader:v(`// Plasma Fragment — halo ionizado contido (não lavar anéis)\r
\r
uniform float uTime;\r
uniform float uIntensity;\r
uniform float uTurbulence;\r
uniform float uTemperature;\r
uniform vec3 uColor;\r
uniform float uBurst;\r
\r
varying float vGlow;\r
varying float vNoise;\r
varying vec3 vWorldPos;\r
\r
void main() {\r
  vec2 uv = gl_PointCoord - 0.5;\r
  float dist = length(uv);\r
\r
  if (dist > 0.5) discard;\r
\r
  float core = (1.0 - smoothstep(0.08, 0.5, dist));\r
  float ring = (1.0 - smoothstep(0.28, 0.45, dist)) * smoothstep(0.12, 0.22, dist);\r
\r
  float n = fbm(vec3(uv * 4.0, uTime * 0.5 + vNoise), 3);\r
  float energy = core * (0.25 + vGlow * 0.35) + ring * 0.15;\r
  energy *= (0.35 + uIntensity / 120.0) * (1.0 + uTurbulence * 0.25);\r
  energy += n * 0.08 * uTurbulence;\r
  energy += uBurst * 0.25;\r
  energy = min(energy, 0.85);\r
\r
  vec3 hot = vec3(0.05, 0.55, 0.95);\r
  vec3 cool = vec3(0.0, 0.18, 0.45);\r
  vec3 accent = vec3(0.15, 0.75, 0.9);\r
  float temp = clamp01(uTemperature / 5000.0);\r
  vec3 col = mix(cool, hot, vGlow * 0.7);\r
  col = mix(col, accent, n * 0.35);\r
  col = mix(col, vec3(0.4, 0.5, 0.55), temp * 0.15);\r
  col *= energy * 1.1;\r
  col = min(col, vec3(0.35, 0.75, 0.95));\r
\r
  float alpha = energy * (0.28 + uBurst * 0.12);\r
  alpha = min(alpha, 0.38);\r
\r
  // Cor negativa em mistura aditiva "apaga" a cena (manchas pretas no pós-processamento)\r
  gl_FragColor = vec4(max(col, vec3(0.0)), clamp(alpha, 0.0, 1.0));\r
}\r
`,b)},I=2;function L(e,t){let n=new Float32Array(e*3),r=new Float32Array(e),i=new Float32Array(e),a=new Float32Array(e),o=new Float32Array(e);for(let t=0;t<e;t++){let e=Math.random()*Math.PI*2,s=4.2+Math.random()*2.2;n[t*3+1]=(Math.random()-.5)*1.8,r[t]=e,i[t]=Math.random()*.01+.003,a[t]=s,o[t]=Math.random()}let s=new Float32Array(t);for(let e=0;e<t;e++)s[e]=e/t*Math.PI*2;return{positions:n,phases:r,speeds:i,radii:a,randoms:o,instanceAngles:s,instanceCount:t}}function oe(){let e=(0,T.useRef)(),t=(0,T.useRef)(),n=(0,T.useRef)(),r=(0,T.useMemo)(()=>new _,[]),i=S(),a=(0,T.useMemo)(()=>L(i.plasmaParticleCount,i.plasmaInstanceCount),[i.plasmaParticleCount,i.plasmaInstanceCount]),o=(0,T.useMemo)(()=>{let e=x({uIntensity:f.getState().plasmaIntensity*.65});return e.uColor.value.set(.1,.55,.85),e},[]);return s(i=>{let o=f.getState(),{plasmaIntensity:s,ringRadius:c,plasma:l,physics:u,energy:d,relativity:p,fx:m}=o,h=C(o),g=c/4,_=i.clock.elapsedTime;if(e.current&&e.current.scale.setScalar(g),t.current&&t.current.scale.setScalar(g*.85),n.current){let e=n.current.uniforms;e.uTime.value=_,e.uIntensity.value=s*(.35+(l.confinement??1)*.35),e.uTurbulence.value=l.turbulence??0,e.uRPM.value=u.rpm??0,e.uTemperature.value=d.temperature??300,e.uTemporalShift.value=p.temporalShift??0,e.uBurst.value=m.plasmaBurst??0,e.uLensing.value=h.lensing,e.uSpacetimeDistortion.value=h.distortion,e.uTimeScale.value=h.timeScale}if(t.current){let{instanceAngles:e}=a,n=h.lensing*h.distortion*.2;for(let i=0;i<a.instanceCount;i++){let a=e[i]+_*h.timeScale*.3,o=4.6+Math.sin(_*h.timeScale+i)*.4,s=Math.cos(a)*o,c=Math.sin(a)*o,u=Math.sqrt(s*s+c*c)+.5;s-=s/u*(n/u),c-=c/u*(n/u),r.position.set(s,Math.sin(_*h.timeScale*2+i)*.25,c),r.scale.setScalar(.045+(l.luminosity??0)*.025),r.updateMatrix(),t.current.setMatrixAt(i,r.matrix)}t.current.instanceMatrix.needsUpdate=!0}}),(0,E.jsxs)(`group`,{renderOrder:I,children:[(0,E.jsxs)(`points`,{ref:e,frustumCulled:!1,renderOrder:I,children:[(0,E.jsxs)(`bufferGeometry`,{children:[(0,E.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[a.positions,3]}),(0,E.jsx)(`bufferAttribute`,{attach:`attributes-aPhase`,args:[a.phases,1]}),(0,E.jsx)(`bufferAttribute`,{attach:`attributes-aSpeed`,args:[a.speeds,1]}),(0,E.jsx)(`bufferAttribute`,{attach:`attributes-aRadius`,args:[a.radii,1]}),(0,E.jsx)(`bufferAttribute`,{attach:`attributes-aRandom`,args:[a.randoms,1]})]}),(0,E.jsx)(`shaderMaterial`,{ref:n,transparent:!0,depthWrite:!1,depthTest:!0,blending:2,vertexShader:F.vertexShader,fragmentShader:F.fragmentShader,uniforms:o})]},`plasma-${i.plasmaParticleCount}`),(0,E.jsxs)(`instancedMesh`,{ref:t,args:[null,null,a.instanceCount],frustumCulled:!1,renderOrder:I,children:[(0,E.jsx)(`icosahedronGeometry`,{args:[1,1]}),(0,E.jsx)(`meshBasicMaterial`,{color:`#1188bb`,transparent:!0,opacity:.1,blending:2,depthWrite:!1,depthTest:!0,toneMapped:!0})]},`plasma-inst-${i.plasmaInstanceCount}`)]})}var R={vertexShader:v(`// Magnetic Field Vertex — toroide com distorção eletromagnética

uniform float uTime;
uniform float uSaturation;
uniform float uFrequency;
uniform float uTwist;
uniform float uInterference;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vField;
varying vec3 vWorldPos;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);

  vec3 pos = position;
  float n = snoise(vec3(uv * 8.0, uTime * uFrequency * 0.001));
  pos += normal * n * uInterference * 0.15;

  float twistAngle = uTwist * pos.y;
  pos.xz = rot2d(twistAngle) * pos.xz;

  vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vViewDir = normalize(-mvPosition.xyz);
  vField = fbm(vec3(vUv * 6.0, uTime * 0.3), 4) * uSaturation;

  gl_Position = projectionMatrix * mvPosition;
}
`,y),fragmentShader:v(`// Magnetic Field Fragment — linhas de fluxo, glow e interferência\r
\r
uniform float uTime;\r
uniform float uSaturation;\r
uniform float uIntensity;\r
uniform float uFrequency;\r
uniform float uRPM;\r
uniform vec3 uColor;\r
\r
varying vec2 vUv;\r
varying vec3 vNormal;\r
varying vec3 vViewDir;\r
varying float vField;\r
varying vec3 vWorldPos;\r
\r
void main() {\r
  float linesU = abs(fract(vUv.x * 40.0 + uTime * uFrequency * 0.0005) - 0.5);\r
  float linesV = abs(fract(vUv.y * 20.0 - uTime * 0.1) - 0.5);\r
  float fieldLines = (1.0 - smoothstep(0.0, 0.48, min(linesU, linesV)));\r
\r
  float orbital = sin(vUv.x * TAU * 3.0 + uTime * 2.0 + vField * 4.0) * 0.5 + 0.5;\r
  float interference = turbulence(vec3(vUv * 4.0, uTime * 0.4), 3) * 0.5 + 0.5;\r
\r
  float pulseVal = pulse(uTime, 3.0 + uRPM * 0.00005);\r
  float strength = fieldLines * (0.4 + orbital * 0.4 + interference * 0.3);\r
  strength *= uSaturation * (0.5 + uIntensity / 100.0) * pulseVal;\r
\r
  float fres = fresnel(vNormal, vViewDir, 2.5);\r
  vec3 col = uColor * (1.0 + vField * 0.8);\r
  col += vec3(0.2, 0.6, 1.0) * fres * uSaturation;\r
  col *= strength * 1.0;\r
\r
  float alpha = strength * (0.1 + fres * 0.22 + uSaturation * 0.12);\r
  alpha = min(alpha, 0.35);\r
  // Cor negativa em mistura aditiva "apaga" a cena (manchas pretas no pós-processamento)\r
  gl_FragColor = vec4(max(col, vec3(0.0)), clamp(alpha, 0.0, 1.0));\r
}\r
`,b)},z=4;function B(){let e=(0,T.useRef)(),t=(0,T.useRef)(),n=(0,T.useRef)(),r=(0,T.useRef)(),i=(0,T.useMemo)(()=>te({uIntensity:f.getState().fieldStrength}),[]);return s((i,a)=>{let{ringRadius:o,fieldStrength:s,magnetic:c,energy:l,physics:u,fx:d}=f.getState(),p=a*60,m=o/z,h=i.clock.elapsedTime;if(e.current&&e.current.scale.setScalar(m),t.current){let e=t.current.uniforms;e.uTime.value=h,e.uSaturation.value=c.saturation??0,e.uIntensity.value=s,e.uFrequency.value=c.frequency??0,e.uTwist.value=c.toroidalTwist??0,e.uInterference.value=(c.interference??0)+(d.magneticFlash??0)*.5,e.uRPM.value=u.rpm??0}if(n.current&&(n.current.rotation.x+=(c.toroidalTwist??0)*.02*p,n.current.rotation.z+=(c.toroidalTwist??0)*.03*p,n.current.material.opacity=Math.min((c.saturation??0)*.2+.04,.25)),r.current){let e=1+(c.toroidalTwist??0)*.3+(l.energyLevel??0)/100*.2;r.current.rotation.x+=(u.rpm??0)/5e5*.8*p,r.current.rotation.y+=(u.rpm??0)/5e5*1.2*p,r.current.scale.setScalar(e),r.current.material.opacity=.08+(c.saturation??0)*.15}}),(0,E.jsxs)(`group`,{ref:e,renderOrder:5,children:[(0,E.jsxs)(`mesh`,{renderOrder:5,children:[(0,E.jsx)(`torusGeometry`,{args:[z,1.2,64,128]}),(0,E.jsx)(`shaderMaterial`,{ref:t,transparent:!0,depthWrite:!1,side:2,blending:2,vertexShader:R.vertexShader,fragmentShader:R.fragmentShader,uniforms:i})]}),(0,E.jsxs)(`mesh`,{ref:n,children:[(0,E.jsx)(`torusGeometry`,{args:[z,1.2,32,160]}),(0,E.jsx)(`meshBasicMaterial`,{color:`#00ffff`,transparent:!0,opacity:.12,wireframe:!0})]}),(0,E.jsxs)(`mesh`,{ref:r,children:[(0,E.jsx)(`torusKnotGeometry`,{args:[5,.12,200,32]}),(0,E.jsx)(`meshBasicMaterial`,{color:`#44ffff`,transparent:!0,opacity:.12,wireframe:!0})]})]})}var V={vertexShader:v(`// Warp Space Vertex — deformação gravitacional / dobra espacial\r
\r
uniform float uTime;\r
uniform float uWarp;\r
uniform float uDistortion;\r
uniform float uRelativity;\r
uniform float uStability;\r
uniform float uWarpPulse;\r
uniform float uSpacetimeDistortion;\r
uniform float uLensing;\r
uniform float uTimeScale;\r
\r
varying vec2 vUv;\r
varying float vDistortion;\r
varying float vDepth;\r
varying vec3 vWorldPos;\r
\r
void main() {\r
  vUv = uv;\r
  vec3 pos = position;\r
  float t = uTime * uTimeScale;\r
\r
  float singularity = 1.0 - uStability;\r
  float warpAmp = uWarp * 4.0 * (1.0 + uRelativity * 0.8 + singularity * 0.5 + uWarpPulse + uSpacetimeDistortion * 0.6);\r
\r
  // plano em XY (girado -90° em X no mundo): pos.z vira a altura\r
  vec2 centered = pos.xy;\r
  float dist = length(centered);\r
  float gravityWell = warpAmp / (dist + 1.0) + uLensing * uSpacetimeDistortion * 0.5 / (dist + 0.5);\r
\r
  float wave1 = sin(pos.x * 0.3 + t * 2.0) * cos(pos.y * 0.3 + t * 1.4);\r
  float wave2 = sin(pos.x * 0.7 - t * 3.0 + uRelativity * 10.0);\r
  float wave = wave1 + wave2 * 0.4;\r
  wave += fbm(vec3(pos.xy * 0.15, t * 0.2), 4) * uDistortion;\r
\r
  pos.z += wave * warpAmp + gravityWell * sin(t * 1.5) * 0.3;\r
\r
  // Lens-like radial pull toward center\r
  pos.xy -= normalize(centered + 0.001) * gravityWell * 0.08;\r
\r
  vDistortion = wave + gravityWell;\r
  vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;\r
  vDepth = - (modelViewMatrix * vec4(pos, 1.0)).z;\r
\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\r
}\r
`,y),fragmentShader:v(`// Warp Space Fragment — grid espaço-temporal com ondas temporais\r
\r
uniform float uTime;\r
uniform float uWarp;\r
uniform float uEnergy;\r
uniform float uRelativity;\r
uniform float uWarpPulse;\r
uniform vec3 uColor;\r
\r
varying vec2 vUv;\r
varying float vDistortion;\r
varying float vDepth;\r
varying vec3 vWorldPos;\r
\r
void main() {\r
  float gridScale = 40.0 + uWarp * 20.0;\r
  float gridX = step(0.965, fract(vUv.x * gridScale + vDistortion * 0.1));\r
  float gridZ = step(0.965, fract(vUv.y * gridScale - uTime * 0.05));\r
  float grid = max(gridX, gridZ);\r
\r
  float temporal = sin(uTime * 3.0 + length(vWorldPos.xz) * 0.5) * 0.5 + 0.5;\r
  float ripple = smoothstep(0.0, 0.8, sin(length(vWorldPos.xz) * 2.0 - uTime * 4.0 - uWarpPulse * 10.0) * 0.5 + 0.5);\r
\r
  float alpha = grid * (0.08 + abs(vDistortion) * 0.3 + uWarp * 0.5 + uEnergy * 0.25);\r
  alpha += ripple * uWarpPulse * 0.2;\r
  alpha *= 0.5 + temporal * 0.3;\r
\r
  vec3 col = uColor * (1.0 + vDistortion * 0.8 + uRelativity * 0.5);\r
  col = mix(col, vec3(0.8, 0.3, 1.0), uRelativity * 0.2 * temporal);\r
\r
  // Cor negativa em mistura aditiva "apaga" a cena (manchas pretas no pós-processamento)\r
  gl_FragColor = vec4(max(col, vec3(0.0)), clamp(alpha, 0.0, 1.0));\r
}\r
`,b)};function H(){let e=(0,T.useRef)(),t=(0,T.useRef)(),n=(0,T.useMemo)(()=>re(),[]);return s((n,r)=>{let i=f.getState(),{visual:a,relativity:o,magnetic:s,stability:c,energy:l,fx:u}=i,d=C(i),p=n.clock.elapsedTime;if(e.current&&(e.current.rotation.y+=a.warpFactor*.03*r*60),t.current){let e=t.current.uniforms;e.uTime.value=p,e.uWarp.value=a.warpFactor+u.warpPulse*.5,e.uDistortion.value=s.spatialDistortion??0,e.uRelativity.value=o.relativisticIntensity??0,e.uStability.value=c.overall??1,e.uEnergy.value=(l.energyLevel??0)/100,e.uWarpPulse.value=u.warpPulse??0,e.uLensing.value=d.lensing,e.uSpacetimeDistortion.value=d.distortion,e.uTimeScale.value=d.timeScale}}),(0,E.jsxs)(`group`,{position:[0,-5,0],children:[(0,E.jsx)(`gridHelper`,{ref:e,args:[80,80,`#003355`,`#001018`]}),(0,E.jsxs)(`mesh`,{rotation:[-Math.PI/2,0,0],position:[0,.02,0],children:[(0,E.jsx)(`planeGeometry`,{args:[80,80,128,128]}),(0,E.jsx)(`shaderMaterial`,{ref:t,transparent:!0,depthWrite:!1,vertexShader:V.vertexShader,fragmentShader:V.fragmentShader,uniforms:n})]})]})}var U={vertexShader:v(`// Singularity Vertex — disco de acreção e horizonte\r
\r
uniform float uTime;\r
uniform float uHorizon;\r
uniform float uDistortion;\r
\r
varying vec2 vUv;\r
varying vec3 vNormal;\r
varying vec3 vViewDir;\r
varying float vRadial;\r
varying vec3 vWorldPos;\r
\r
void main() {\r
  vUv = uv;\r
  vNormal = normalize(normalMatrix * normal);\r
  vec4 worldPos = modelMatrix * vec4(position, 1.0);\r
  vWorldPos = worldPos.xyz;\r
  vec4 mv = modelViewMatrix * vec4(position, 1.0);\r
  vViewDir = normalize(-mv.xyz);\r
  vRadial = length(position.xy) / max(uHorizon, 0.01);\r
\r
  vec3 pos = position;\r
  float warp = snoise(position * 0.5 + vec3(uTime * 0.2, uDistortion, 0.0)) * uDistortion * 0.15;\r
  pos += normal * warp;\r
\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\r
}\r
`,y),fragmentShader:v(`// Singularity Fragment — horizonte, anel de fótons, disco de acreção\r
\r
uniform float uTime;\r
uniform float uEnergyDensity;\r
uniform float uHorizon;\r
uniform float uCollapseRisk;\r
uniform float uAccretion;\r
uniform float uLensing;\r
uniform vec3 uHotColor;\r
uniform vec3 uColdColor;\r
\r
varying vec2 vUv;\r
varying vec3 vNormal;\r
varying vec3 vViewDir;\r
varying float vRadial;\r
varying vec3 vWorldPos;\r
\r
void main() {\r
  float fres = fresnel(vNormal, vViewDir, 2.2);\r
  float angle = atan(vWorldPos.z, vWorldPos.x);\r
  float spin = angle + uTime * (2.0 + uAccretion * 4.0);\r
\r
  float diskBand = smoothstep(0.35, 0.55, vRadial) * (1.0 - smoothstep(0.9, 1.4, vRadial));\r
  float diskFlow = sin(spin * 8.0 + vRadial * 12.0) * 0.5 + 0.5;\r
  float turbulence = fbm(vec3(vUv * 6.0, uTime * 0.3), 4) * 0.5 + 0.5;\r
\r
  float photonRing = smoothstep(0.52, 0.58, vRadial) * (1.0 - smoothstep(0.62, 0.68, vRadial));\r
  photonRing *= 1.0 + sin(uTime * 6.0 + angle * 3.0) * 0.2;\r
\r
  float innerVoid = 1.0 - smoothstep(0.0, 0.48, vRadial);\r
  float horizonGlow = smoothstep(0.45, 0.52, vRadial) * (1.0 - innerVoid);\r
\r
  vec3 accretionCol = mix(uColdColor, uHotColor, diskFlow * 0.7 + uEnergyDensity * 0.5);\r
  accretionCol += vec3(1.0, 0.5, 0.15) * turbulence * uAccretion * 0.4;\r
  accretionCol *= diskBand * (0.6 + uEnergyDensity * 0.8);\r
\r
  vec3 photonCol = vec3(0.9, 0.95, 1.0) * photonRing * (1.2 + fres);\r
  vec3 horizonCol = vec3(0.15, 0.05, 0.02) * horizonGlow;\r
  horizonCol += vec3(0.8, 0.3, 0.1) * horizonGlow * uCollapseRisk;\r
\r
  vec3 col = accretionCol + photonCol + horizonCol;\r
  col = mix(col, vec3(0.0), innerVoid * 0.95);\r
\r
  float alpha = diskBand * 0.55 + photonRing * 0.85 + horizonGlow * 0.4;\r
  alpha = min(alpha, 0.92) * (0.3 + uEnergyDensity * 0.7);\r
\r
  // Cor negativa em mistura aditiva "apaga" a cena (manchas pretas no pós-processamento)\r
  gl_FragColor = vec4(max(col, vec3(0.0)), clamp(alpha, 0.0, 1.0));\r
}\r
`,b)},W=15;function G(e){return e.singularity.active||e.stability.singularityMode?Math.min(1,.25+(e.singularity.energyDensity??0)*1.2):0}function K(){let e=(0,T.useRef)(),t=(0,T.useRef)(),n=(0,T.useRef)(),r=(0,T.useRef)(),i=S(),a=f(e=>e.stability.singularityMode||G(e)>=.02),o=(0,T.useMemo)(()=>ee(),[]);return s(i=>{let a=f.getState(),{singularity:o,ringRadius:s}=a,c=G(a),l=i.clock.elapsedTime,u=s/4*(.35+(o.eventHorizon??0)*1.8);if(e.current){e.current.rotation.z=l*(.8+(o.accretionRate??0)*2),e.current.scale.setScalar(u);let t=e.current.material.uniforms;t.uTime.value=l,t.uEnergyDensity.value=o.energyDensity??0,t.uHorizon.value=o.eventHorizon??.5,t.uCollapseRisk.value=o.collapseRisk??0,t.uAccretion.value=o.accretionRate??0,t.uLensing.value=o.lensingStrength??0,t.uDistortion.value=o.spacetimeDistortion??0}t.current&&(t.current.scale.setScalar(u*.42),t.current.material.opacity=.92*c),n.current&&(n.current.rotation.x=Math.PI/2,n.current.rotation.z=l*2.5,n.current.scale.setScalar(u*.95),n.current.material.opacity=.5+(o.lensingStrength??0)*.45),r.current&&(r.current.rotation.y=l*.15,r.current.scale.setScalar(u*2.2),r.current.material.opacity=(o.lensingStrength??0)*.12*c)}),a?(0,E.jsxs)(`group`,{renderOrder:W,children:[(0,E.jsxs)(`mesh`,{ref:t,renderOrder:W,children:[(0,E.jsx)(`sphereGeometry`,{args:[1,64,64]}),(0,E.jsx)(`meshBasicMaterial`,{color:`#000000`,toneMapped:!1,transparent:!0})]}),(0,E.jsxs)(`mesh`,{ref:n,renderOrder:16,children:[(0,E.jsx)(`torusGeometry`,{args:[1,.04,16,i.singularityDiskSegments]}),(0,E.jsx)(`meshBasicMaterial`,{color:`#e8f4ff`,transparent:!0,opacity:.6,blending:2,depthWrite:!1,toneMapped:!0})]}),(0,E.jsxs)(`mesh`,{ref:e,rotation:[Math.PI/2,0,0],renderOrder:17,children:[(0,E.jsx)(`torusGeometry`,{args:[1,.55,64,i.singularityDiskSegments]}),(0,E.jsx)(`shaderMaterial`,{transparent:!0,depthWrite:!1,side:2,blending:2,vertexShader:U.vertexShader,fragmentShader:U.fragmentShader,uniforms:o})]}),(0,E.jsxs)(`mesh`,{ref:r,renderOrder:W-1,children:[(0,E.jsx)(`sphereGeometry`,{args:[1,32,24]}),(0,E.jsx)(`meshBasicMaterial`,{color:`#4488ff`,wireframe:!0,transparent:!0,opacity:.08,blending:2,depthWrite:!1})]})]}):null}function q(){let e=(0,T.useRef)();return s(()=>{if(!e.current)return;let{visual:t}=f.getState();t.shockwaveActive?(e.current.material.opacity=t.shockwaveOpacity,e.current.scale.set(t.shockwaveScale,t.shockwaveScale,1)):e.current.material.opacity=0}),(0,E.jsxs)(`mesh`,{ref:e,rotation:[-Math.PI/2,0,0],position:[0,.05,0],children:[(0,E.jsx)(`ringGeometry`,{args:[2,2.5,128]}),(0,E.jsx)(`meshBasicMaterial`,{color:`#00ffff`,transparent:!0,opacity:0,side:2,blending:2,depthWrite:!1})]})}function J({id:e,labelPosition:t,children:n}){let r=f(t=>t.sceneLayers.visibility[e]!==!1),i=f(e=>e.sceneLayers.showLabels),a=d(e);if(!r)return null;let o=t??a?.labelPosition??[0,0,0];return(0,E.jsxs)(`group`,{name:`layer-${e}`,children:[n,i&&a&&(0,E.jsx)(c,{position:o,center:!0,distanceFactor:14,zIndexRange:[50,0],style:{pointerEvents:`none`},children:(0,E.jsxs)(`div`,{className:`scene-layer-label`,style:{"--layer-color":a.color},children:[(0,E.jsx)(`span`,{className:`scene-layer-label__dot`}),(0,E.jsxs)(`div`,{className:`scene-layer-label__text`,children:[(0,E.jsx)(`strong`,{children:a.label}),(0,E.jsx)(`small`,{children:a.shortDesc})]})]})})]})}var se=(0,T.lazy)(()=>p(()=>import(`./SpacetimeStarfield-CbXAN0aF.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]))),ce=(0,T.lazy)(()=>p(()=>import(`./SpacetimeFabric-DcsXwhNU.js`),__vite__mapDeps([12,1,6,2,3,4,7,8,13,5,9,10,11]))),le=(0,T.lazy)(()=>p(()=>import(`./QuantumField-B4bYYmmX.js`),__vite__mapDeps([14,1,6,2,3,4,7,8,15,10,11]))),ue=(0,T.lazy)(()=>p(()=>import(`./RealityTears-DR0ZnThQ.js`),__vite__mapDeps([16,6,1,2,3,4,7,8,13,10,11]))),de=(0,T.lazy)(()=>p(()=>import(`./HyperdimensionField-CyRpcxRK.js`),__vite__mapDeps([17,1,6,2,3,4,7,8,18,10,11]))),fe=(0,T.lazy)(()=>p(()=>import(`./DecouplingBubble-C9ER1iQI.js`),__vite__mapDeps([19,1,6,2,3,4,7,8,20,11]))),pe=(0,T.lazy)(()=>p(()=>import(`./VolumetricFog-BrL76Niw.js`),__vite__mapDeps([21,1,6,2,3,4,7,8])));function me({starCount:e}){return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(J,{id:`spacetimeStarfield`,children:(0,E.jsx)(T.Suspense,{fallback:null,children:(0,E.jsx)(se,{count:e},e)})}),(0,E.jsx)(J,{id:`spacetimeFabric`,children:(0,E.jsx)(T.Suspense,{fallback:null,children:(0,E.jsx)(ce,{})})}),(0,E.jsx)(J,{id:`quantumField`,children:(0,E.jsx)(T.Suspense,{fallback:null,children:(0,E.jsx)(le,{})})}),(0,E.jsx)(J,{id:`realityTears`,children:(0,E.jsx)(T.Suspense,{fallback:null,children:(0,E.jsx)(ue,{})})}),(0,E.jsx)(J,{id:`hyperdimension`,labelPosition:[0,11,0],children:(0,E.jsx)(T.Suspense,{fallback:null,children:(0,E.jsx)(de,{})})}),(0,E.jsx)(J,{id:`decouplingField`,labelPosition:[0,9.5,0],children:(0,E.jsx)(T.Suspense,{fallback:null,children:(0,E.jsx)(fe,{})})}),(0,E.jsx)(T.Suspense,{fallback:null,children:(0,E.jsx)(J,{id:`volumetricFog`,children:(0,E.jsx)(pe,{})})})]})}function he(){return s((e,t)=>{a().tick(t)}),null}var ge=2.5;function _e(){let e=f(e=>e.setFx);(0,T.useEffect)(()=>{let t={[i.REALITY_RUPTURE]:t=>e({realityRupture:.7+(t?.newLevel??0)*.08,glitch:.4+(t?.instability??0)*.4,causalityEcho:(t?.newLevel??0)>=3?.7:.35,universeVibration:(t?.instability??0)*.8,chromaticBoost:.35}),[i.OVERLOAD]:()=>e({overloadFlash:1,bloomBoost:.8,quantumBurst:.55}),[i.INSTABILITY]:()=>e({glitch:.7,chromaticBoost:.5}),[i.SINGULARITY_MODE]:()=>e({warpPulse:1,bloomBoost:.7,chromaticBoost:.6,gravitationalLensing:1,quantumBurst:.9}),[i.HORIZON_WARNING]:()=>e({gravitationalLensing:.85,chromaticBoost:.4,warpPulse:.6}),[i.KARDASHEV_TYPE_CHANGE]:()=>e({bloomBoost:.85,neuralPulse:1,quantumBurst:.5}),[i.IMPOSSIBLE_REGIME_CHANGE]:t=>{t?.enabled&&e({warpPulse:.28,chromaticBoost:.18,quantumBurst:.22})},[i.HYPERDIMENSION_SHIFT]:t=>{!t?.active&&!t?.enabled||e({warpPulse:.35,chromaticBoost:.28,quantumBurst:.4})},[i.DECOUPLING_ACTIVATED]:t=>{t?.active&&e({warpPulse:.25+(t.effectiveStrength??0)*.35,chromaticBoost:.15,quantumBurst:.3,gravitationalLensing:(t.effectiveStrength??0)*.4})},[i.DECOUPLING_COLLAPSE]:()=>e({warpPulse:.15,glitch:.12}),[i.GRAVITATIONAL_COLLAPSE]:()=>e({gravitationalLensing:1,glitch:.6,bloomBoost:1,warpPulse:1}),[i.PLASMA_BURST]:()=>e({plasmaBurst:1}),[i.MAGNETIC_COLLAPSE]:()=>e({glitch:1,magneticFlash:1}),[i.SHOCKWAVE]:()=>e({warpPulse:.9,bloomBoost:.6}),[i.ENERGY_RUPTURE]:()=>e({overloadFlash:1,glitch:.9,bloomBoost:1.2,realityRupture:1,causalityEcho:.85,universeVibration:.9}),[o.AI_TICK]:t=>{t.scanning&&e({neuralPulse:.5,aiScan:1}),(t.threatLevel===`CRITICAL`||t.threatLevel===`SINGULARITY`)&&e({glitch:.2})},[o.AI_PROTOCOL]:t=>e({glitch:.5,bloomBoost:.5,neuralPulse:.8,quantumBurst:t?.protocol===`QUANTUM_LOCK`?1:t?.protocol===`DECOUPLING_FIELD`?.65:.45}),[o.AI_MESSAGE]:t=>{t.priority===`CRITICAL`&&e({glitch:.85,overloadFlash:.7,neuralPulse:1})},[o.AI_MOOD_CHANGE]:t=>{t.instability>.6&&e({glitch:t.instability*.5,neuralPulse:t.instability})},[o.AI_PERSONALITY_SHIFT]:()=>e({neuralPulse:.8,aiScan:1}),[o.AI_AUTONOMOUS_ON]:()=>e({neuralPulse:.9,bloomBoost:.3})},n=Object.entries(t).map(([e,t])=>r.on(e,t));return()=>n.forEach(e=>e())},[e]),s((t,n)=>{let r=f.getState().fx,i={},a=!1;for(let e of Object.keys(r))typeof r[e]==`number`&&r[e]>.001&&(i[e]=Math.max(0,r[e]-ge*n),a=!0);a&&e(i)})}function ve(){return _e(),null}function ye(e,t=.08){return{x:Math.sin(e*.03)*t,y:Math.cos(e*.02)*t}}var be=(0,T.lazy)(()=>p(()=>import(`./EffectsComposer-B56YqFMY.js`),__vite__mapDeps([22,1,6,2,3,4,7,8,23,20,18,15,13,24,5]))),Y=new h;function xe(){return s(e=>{e.camera.position.sub(Y),Y.set(0,0,0)},-2),s(e=>{let{visual:t,reality:n}=Se(),r=e.clock.elapsedTime;if(t.cameraShake){let e=ye(r*1e3,t.singularityMode?.15:.08);Y.x+=e.x,Y.y+=e.y}if(n.vibration>.4&&(n.ruptureLevel??0)>=2){let e=n.vibration*.12;Y.x+=Math.sin(r*37)*e,Y.y+=Math.cos(r*41)*e,Y.z+=Math.sin(r*29)*e*.5}e.camera.position.add(Y)}),(0,E.jsx)(u,{enableDamping:!0,dampingFactor:.05,target:[0,0,0],maxPolarAngle:Math.PI*.85,minDistance:8,maxDistance:40})}function Se(){let e=f.getState();return{visual:e.visual,reality:w(e)}}function Ce(){let e=S(),{fogNear:t,fogFar:n,ambientIntensity:r,coreLightIntensity:i}=e.scene,a=(0,T.useMemo)(()=>[`#000008`,t,n],[t,n]);return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(he,{}),(0,E.jsx)(ve,{}),(0,E.jsx)(`color`,{attach:`background`,args:[`#000008`]}),(0,E.jsx)(`fog`,{attach:`fog`,args:a}),(0,E.jsx)(`ambientLight`,{intensity:r,color:`#667799`}),(0,E.jsx)(`pointLight`,{position:[0,0,0],color:`#00ffff`,intensity:i,distance:140,decay:2}),(0,E.jsx)(`pointLight`,{position:[12,8,-10],color:`#3355ff`,intensity:1.5,distance:90,decay:2}),(0,E.jsx)(`pointLight`,{position:[-10,-5,8],color:`#ff4400`,intensity:.4,distance:60,decay:2}),(0,E.jsx)(`directionalLight`,{position:[-8,12,6],color:`#99bbff`,intensity:.55}),(0,E.jsx)(`directionalLight`,{position:[6,4,10],color:`#00ffcc`,intensity:.25}),(0,E.jsx)(me,{starCount:e.starCount}),(0,E.jsx)(T.Suspense,{fallback:null,children:(0,E.jsxs)(`group`,{children:[(0,E.jsx)(J,{id:`warpGrid`,children:(0,E.jsx)(H,{})}),(0,E.jsx)(J,{id:`plasma`,children:(0,E.jsx)(oe,{})}),(0,E.jsx)(J,{id:`magneticField`,children:(0,E.jsx)(B,{})}),(0,E.jsx)(J,{id:`energyCore`,children:(0,E.jsx)(ae,{})}),(0,E.jsx)(J,{id:`singularityCore`,children:(0,E.jsx)(K,{})}),(0,E.jsx)(J,{id:`beams`,children:(0,E.jsx)(P,{})}),(0,E.jsx)(J,{id:`ring`,children:(0,E.jsx)(ie,{})}),(0,E.jsx)(J,{id:`shockwave`,children:(0,E.jsx)(q,{})})]})}),(0,E.jsx)(xe,{}),(0,E.jsx)(T.Suspense,{fallback:null,children:(0,E.jsx)(be,{})})]})}var X=class extends Error{constructor(e,t){super(`WebGL: ${e}`,t),this.name=`WebGLInitError`}};function Z(e){let t=e?.canvas??e;try{let e=new g({canvas:t,antialias:!1,alpha:!1,stencil:!1,depth:!0,failIfMajorPerformanceCaveat:!1,powerPreference:`default`});if(!e.getContext())throw e.dispose(),Error(`contexto não inicializado`);return e}catch(e){throw new X(e instanceof Error?e.message:`indisponível neste dispositivo`,{cause:e})}}function Q(e){if(e instanceof X)return!0;let t=String(e?.message??e??``);return/webgl|gl_out_of_memory|gl_invalid/i.test(t)}function $({message:e,onRetry:t}){return(0,E.jsxs)(`div`,{className:`viewport-webgl-lost viewport-webgl-lost--init`,role:`alert`,children:[(0,E.jsx)(`p`,{children:`Não foi possível iniciar o motor 3D (WebGL).`}),(0,E.jsx)(`p`,{className:`viewport-webgl-lost__detail`,children:e}),(0,E.jsx)(`button`,{type:`button`,onClick:t,children:`Recarregar simulador`}),(0,E.jsxs)(`ul`,{className:`viewport-webgl-lost__tips`,children:[(0,E.jsx)(`li`,{children:`Ative aceleração de hardware no navegador (Chrome: Configurações → Sistema)`}),(0,E.jsx)(`li`,{children:`Atualize o driver da placa de vídeo`}),(0,E.jsx)(`li`,{children:`Desative extensões que bloqueiam WebGL (bloqueadores, privacidade)`}),(0,E.jsx)(`li`,{children:`Feche outras abas 3D / jogos e tente novamente`})]})]})}var we=class extends T.Component{constructor(e){super(e),this.state={error:null}}static getDerivedStateFromError(e){return{error:e}}componentDidCatch(e){Q(e)&&this.props.onWebGLError?.(e)}render(){return this.state.error&&Q(this.state.error)?null:this.state.error?(0,E.jsx)($,{message:this.state.error.message,onRetry:()=>window.location.reload()}):this.props.children}};function Te({canvasKey:e,useLegacy:t}){let n=S(),r=f(e=>e.webglContextLost),i=typeof window<`u`?Math.min(window.devicePixelRatio,n.maxDpr):1,a=e=>{e.toneMapping=0,e.outputColorSpace=m;let t=e.domElement;t.addEventListener(`webglcontextlost`,e=>{e.preventDefault();let t=f.getState();t.setWebglContextLost(!0),t.renderMode!==`performance`&&t.setRenderMode(`performance`)}),t.addEventListener(`webglcontextrestored`,()=>{f.getState().setWebglContextLost(!1)})};return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(l,{legacy:t,camera:{position:[0,5.5,15],fov:62,near:.1,far:1e3},dpr:[1,i],gl:Z,onCreated:({gl:e})=>a(e),children:(0,E.jsx)(T.Suspense,{fallback:null,children:(0,E.jsx)(Ce,{})})},e),r&&(0,E.jsxs)(`div`,{className:`viewport-webgl-lost`,role:`alert`,children:[(0,E.jsx)(`p`,{children:`Memória gráfica esgotada — contexto WebGL perdido.`}),(0,E.jsx)(`button`,{type:`button`,onClick:()=>window.location.reload(),children:`Recarregar simulador`}),(0,E.jsxs)(`span`,{children:[`Use o modo `,(0,E.jsx)(`strong`,{children:`Performance`}),` e desative camadas 3D extras.`]})]})]})}function Ee(){let[e,t]=(0,T.useState)(`standard`),[n,r]=(0,T.useState)(0),[i,a]=(0,T.useState)(null),o=(0,T.useRef)(`standard`),s=(0,T.useRef)(0),c=(0,T.useCallback)(e=>{let n=performance.now();if(!(n-s.current<400)){if(s.current=n,o.current===`standard`){o.current=`legacy`,r(e=>e+1),t(`legacy`);return}o.current=`failed`,a(e?.message??`Erro ao criar contexto WebGL`),t(`failed`)}},[]);if((0,T.useEffect)(()=>{let e=e=>{Q(e.reason)&&(e.preventDefault(),c(e.reason))};return window.addEventListener(`unhandledrejection`,e),()=>window.removeEventListener(`unhandledrejection`,e)},[c]),e===`failed`||i)return(0,E.jsx)($,{message:i??`WebGL indisponível neste navegador ou GPU.`,onRetry:()=>window.location.reload()});let l=`${n}-${e}`;return(0,E.jsx)(we,{onWebGLError:c,children:(0,E.jsx)(Te,{canvasKey:l,useLegacy:e===`legacy`})},l)}export{Ee as default};