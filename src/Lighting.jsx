import { useRef, useEffect } from 'react';

const Lightning = ({ hue = 230, xOffset = 0, speed = 1, intensity = 1, size = 1 }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w > 0 && h > 0) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;

      vec3 hsv2rgb(vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
        return c.z * mix(vec3(1.0), rgb, c.y);
      }

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord / iResolution.xy;
        uv = 2.0 * uv - 1.0;
        uv.x *= iResolution.x / iResolution.y;
        uv.x += uXOffset;

        float t = uv.y;
        float curve = 0.45 * sin(t * 1.4) + 0.25 * sin(t * 2.8 + 0.5);
        float centerX = curve * uSize;
        float dist = abs(uv.x - centerX);

        float coreWidth = 0.018;
        float glowWidth = 0.25;
        float core = 1.0 - smoothstep(0.0, coreWidth, dist);
        float glow = exp(-dist * (8.0 / uIntensity)) * (0.6 + 0.2 * sin(iTime * uSpeed));
        float outer = exp(-dist * (2.5 / uIntensity)) * 0.4;

        vec3 whiteCore = vec3(1.0, 1.0, 1.0);
        vec3 purple = hsv2rgb(vec3(uHue / 360.0, 0.65, 0.95));
        vec3 pink = hsv2rgb(vec3((uHue + 25.0) / 360.0, 0.5, 0.9));
        vec3 glowColor = mix(purple, pink, 0.3 + 0.2 * sin(iTime * uSpeed * 0.5));

        vec3 col = whiteCore * core + glowColor * glow + glowColor * outer * 0.6;
        col *= (0.85 + 0.15 * sin(iTime * uSpeed * 2.0));
        col *= uIntensity;

        float verticalFade = 0.7 + 0.3 * (1.0 - abs(uv.y));
        col *= verticalFade;

        fragColor = vec4(col, min(1.0, (core + glow + outer) * 1.2));
      }

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, 'iResolution');
    const iTimeLocation = gl.getUniformLocation(program, 'iTime');
    const uHueLocation = gl.getUniformLocation(program, 'uHue');
    const uXOffsetLocation = gl.getUniformLocation(program, 'uXOffset');
    const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');
    const uIntensityLocation = gl.getUniformLocation(program, 'uIntensity');
    const uSizeLocation = gl.getUniformLocation(program, 'uSize');

    const startTime = performance.now();
    let cancelled = false;
    const render = () => {
      if (cancelled) return;
      resizeCanvas();
      if (canvas.width > 0 && canvas.height > 0) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
        const currentTime = performance.now();
        gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);
        gl.uniform1f(uHueLocation, hue);
        gl.uniform1f(uXOffsetLocation, xOffset);
        gl.uniform1f(uSpeedLocation, speed);
        gl.uniform1f(uIntensityLocation, intensity);
        gl.uniform1f(uSizeLocation, size);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [hue, xOffset, speed, intensity, size]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      style={{ minHeight: '100%' }}
    />
  );
};

export default Lightning;
